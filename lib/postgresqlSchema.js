export const postgresqlFullSchema = String.raw`-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing objects (safe reset)
DROP TABLE IF EXISTS stock_reservations CASCADE;
DROP TABLE IF EXISTS returns CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    category VARCHAR(100),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carts table
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Cart items table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, product_id)
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled', 'refunded')
    ),
    payment_method VARCHAR(10) NOT NULL CHECK (payment_method IN ('cc', 'dc', 'cod')),
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_time DECIMAL(10, 2) NOT NULL CHECK (price_at_time >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'processing', 'completed', 'failed', 'refunded')
    ),
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    payment_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Returns table
CREATE TABLE returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id),
    user_id UUID NOT NULL REFERENCES users(id),
    reason TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'requested' CHECK (
        status IN ('requested', 'approved', 'rejected', 'completed')
    ),
    refund_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock reservations table (for preventing overselling)
CREATE TABLE stock_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, cart_id)
);

-- Indexes for performance
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_stock_reservations_expires ON stock_reservations(expires_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_returns_updated_at BEFORE UPDATE ON returns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create default admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role)
VALUES ('admin@example.com', '$2a$10$YourHashedPasswordHere', 'Admin', 'User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO products (sku, name, description, price, stock_quantity, category, image_url) VALUES
('LAP-001', 'Gaming Laptop', 'High-performance gaming laptop with RTX 4080', 1499.99, 25, 'Electronics', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302'),
('PHN-001', 'Smartphone Pro', 'Latest smartphone with 5G and 256GB storage', 999.99, 50, 'Electronics', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd'),
('BOK-001', 'Go Programming', 'Learn Go programming from beginner to expert', 39.99, 100, 'Books', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'),
('HD-001', 'Wireless Headphones', 'Noise cancelling wireless headphones', 199.99, 75, 'Audio', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e')
ON CONFLICT (sku) DO NOTHING;

-- Sample users (password hash is a placeholder)
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('alice@example.com', '$2a$10$YourHashedPasswordHere', 'Alice', 'Nguyen', 'customer'),
('bob@example.com', '$2a$10$YourHashedPasswordHere', 'Bob', 'Singh', 'customer'),
('carol@example.com', '$2a$10$YourHashedPasswordHere', 'Carol', 'Diaz', 'customer')
ON CONFLICT (email) DO NOTHING;

-- Sample carts for users
WITH u AS (
    SELECT id, email FROM users WHERE email IN ('alice@example.com', 'bob@example.com', 'carol@example.com')
)
INSERT INTO carts (user_id)
SELECT id FROM u
ON CONFLICT (user_id) DO NOTHING;

-- Sample cart items
WITH
    c AS (
        SELECT c.id AS cart_id, u.email
        FROM carts c
        JOIN users u ON u.id = c.user_id
        WHERE u.email IN ('alice@example.com', 'bob@example.com')
    ),
    p AS (
        SELECT id, sku FROM products WHERE sku IN ('LAP-001', 'PHN-001', 'BOK-001')
    )
INSERT INTO cart_items (cart_id, product_id, quantity)
SELECT c.cart_id,
       CASE c.email
           WHEN 'alice@example.com' THEN (SELECT id FROM p WHERE sku = 'LAP-001')
           ELSE (SELECT id FROM p WHERE sku = 'BOK-001')
       END,
       CASE c.email
           WHEN 'alice@example.com' THEN 1
           ELSE 2
       END
FROM c
ON CONFLICT (cart_id, product_id) DO NOTHING;

-- Sample orders with items and payments
WITH
    u AS (
        SELECT id, email FROM users WHERE email IN ('alice@example.com', 'bob@example.com')
    ),
    p AS (
        SELECT id, sku, price FROM products WHERE sku IN ('LAP-001', 'PHN-001', 'HD-001')
    ),
    o AS (
        INSERT INTO orders (user_id, order_number, total_amount, status, payment_method, shipping_address, billing_address)
        SELECT
            u.id,
            CASE u.email
                WHEN 'alice@example.com' THEN 'ORD-1001'
                ELSE 'ORD-1002'
            END,
            CASE u.email
                WHEN 'alice@example.com' THEN (SELECT price FROM p WHERE sku = 'LAP-001')
                ELSE (SELECT price FROM p WHERE sku = 'HD-001') * 2
            END,
            'processing',
            'cc',
            jsonb_build_object(
                'full_name', CASE u.email WHEN 'alice@example.com' THEN 'Alice Nguyen' ELSE 'Bob Singh' END,
                'street', '123 Main St',
                'city', 'Austin',
                'state', 'TX',
                'country', 'USA',
                'postal_code', '78701',
                'phone', '+1-512-555-0101'
            ),
            jsonb_build_object(
                'full_name', CASE u.email WHEN 'alice@example.com' THEN 'Alice Nguyen' ELSE 'Bob Singh' END,
                'street', '123 Main St',
                'city', 'Austin',
                'state', 'TX',
                'country', 'USA',
                'postal_code', '78701',
                'phone', '+1-512-555-0101'
            )
        FROM u
        ON CONFLICT (order_number) DO NOTHING
        RETURNING id, user_id, order_number
    )
INSERT INTO order_items (order_id, product_id, quantity, price_at_time)
SELECT
    o.id,
    CASE o.order_number
        WHEN 'ORD-1001' THEN (SELECT id FROM p WHERE sku = 'LAP-001')
        ELSE (SELECT id FROM p WHERE sku = 'HD-001')
    END,
    CASE o.order_number
        WHEN 'ORD-1001' THEN 1
        ELSE 2
    END,
    CASE o.order_number
        WHEN 'ORD-1001' THEN (SELECT price FROM p WHERE sku = 'LAP-001')
        ELSE (SELECT price FROM p WHERE sku = 'HD-001')
    END
FROM o
ON CONFLICT DO NOTHING;

-- Payments for sample orders
WITH o AS (
    SELECT id, order_number, total_amount FROM orders WHERE order_number IN ('ORD-1001', 'ORD-1002')
)
INSERT INTO payments (order_id, amount, status, payment_method, transaction_id, payment_details)
SELECT
    o.id,
    o.total_amount,
    'completed',
    'credit_card',
    'txn_' || replace(o.order_number, '-', '_'),
    jsonb_build_object('provider', 'stripe', 'auth_code', 'AUTH123')
FROM o
ON CONFLICT DO NOTHING;

-- Sample returns
WITH
    o AS (
        SELECT id, order_number, user_id, total_amount
        FROM orders
        WHERE order_number = 'ORD-1002'
    )
INSERT INTO returns (order_id, user_id, reason, status, refund_amount)
SELECT
    o.id,
    o.user_id,
    'Item arrived damaged',
    'requested',
    o.total_amount
FROM o
ON CONFLICT DO NOTHING;

-- Sample stock reservations
WITH
    c AS (
        SELECT c.id AS cart_id, u.email
        FROM carts c
        JOIN users u ON u.id = c.user_id
        WHERE u.email = 'alice@example.com'
    ),
    p AS (
        SELECT id FROM products WHERE sku = 'LAP-001'
    )
INSERT INTO stock_reservations (product_id, cart_id, quantity, expires_at)
SELECT
    (SELECT id FROM p),
    c.cart_id,
    1,
    NOW() + INTERVAL '10 minutes'
FROM c
ON CONFLICT (product_id, cart_id) DO NOTHING;`;

const sectionDefs = [
  {
    id: "setup",
    marker: "-- Enable UUID extension",
    keywords: ["schema", "uuid", "extension", "reset", "drop table"],
  },
  { id: "users", marker: "-- Users table", keywords: ["users", "user"] },
  {
    id: "products",
    marker: "-- Products table",
    keywords: ["products", "product", "sku", "stock_quantity", "category"],
  },
  { id: "carts", marker: "-- Carts table", keywords: ["carts", "cart"] },
  {
    id: "cart_items",
    marker: "-- Cart items table",
    keywords: ["cart_items", "cart item"],
  },
  { id: "orders", marker: "-- Orders table", keywords: ["orders", "order"] },
  {
    id: "order_items",
    marker: "-- Order items table",
    keywords: ["order_items", "order item"],
  },
  {
    id: "payments",
    marker: "-- Payments table",
    keywords: ["payments", "payment", "transaction"],
  },
  {
    id: "returns",
    marker: "-- Returns table",
    keywords: ["returns", "refund", "return"],
  },
  {
    id: "stock_reservations",
    marker: "-- Stock reservations table (for preventing overselling)",
    keywords: ["stock_reservations", "reservation", "overselling", "expires_at"],
  },
  {
    id: "indexes",
    marker: "-- Indexes for performance",
    keywords: ["index", "indexes", "performance", "explain"],
  },
  {
    id: "trigger_function",
    marker: "-- Function to update updated_at timestamp",
    keywords: ["trigger", "updated_at", "function"],
  },
  {
    id: "triggers",
    marker: "-- Triggers for updated_at",
    keywords: ["trigger", "updated_at"],
  },
  {
    id: "seed_admin",
    marker: "-- Create default admin user (password: admin123)",
    keywords: ["insert", "admin", "seed"],
  },
  {
    id: "seed_products",
    marker: "-- Insert sample products",
    keywords: ["sample products", "insert products"],
  },
  {
    id: "seed_users",
    marker: "-- Sample users (password hash is a placeholder)",
    keywords: ["sample users", "insert users"],
  },
  {
    id: "seed_carts",
    marker: "-- Sample carts for users",
    keywords: ["sample carts"],
  },
  {
    id: "seed_cart_items",
    marker: "-- Sample cart items",
    keywords: ["sample cart items"],
  },
  {
    id: "seed_orders",
    marker: "-- Sample orders with items and payments",
    keywords: ["sample orders", "insert orders"],
  },
  {
    id: "seed_payments",
    marker: "-- Payments for sample orders",
    keywords: ["sample payments", "insert payments"],
  },
  {
    id: "seed_returns",
    marker: "-- Sample returns",
    keywords: ["sample returns", "insert returns"],
  },
  {
    id: "seed_stock_reservations",
    marker: "-- Sample stock reservations",
    keywords: ["sample stock reservations"],
  },
];

function sliceByMarkers(content, currentMarker, nextMarker) {
  const start = content.indexOf(currentMarker);
  if (start === -1) return "";
  const end = nextMarker ? content.indexOf(nextMarker, start) : -1;
  return end === -1
    ? content.slice(start).trim()
    : content.slice(start, end).trim();
}

const schemaSections = sectionDefs.map((section, index) => ({
  ...section,
  content: sliceByMarkers(
    postgresqlFullSchema,
    section.marker,
    sectionDefs[index + 1]?.marker
  ),
}));

function getQuestionText(question) {
  return [
    question?.topic,
    question?.title,
    question?.prompt,
    question?.starter,
    question?.referenceSolution,
    question?.hint,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

const tableToSection = {
  users: "users",
  products: "products",
  carts: "carts",
  cart_items: "cart_items",
  orders: "orders",
  order_items: "order_items",
  payments: "payments",
  returns: "returns",
  stock_reservations: "stock_reservations",
};

const tableDependencies = {
  users: [],
  products: [],
  carts: ["users"],
  cart_items: ["carts", "products"],
  orders: ["users"],
  order_items: ["orders", "products"],
  payments: ["orders"],
  returns: ["orders", "users"],
  stock_reservations: ["products", "carts"],
};


function extractMentionedTables(text) {
  const found = new Set();
  const tableNames = Object.keys(tableToSection);

  for (const table of tableNames) {
    const pattern = new RegExp(`\\b${table}\\b`, "i");
    if (pattern.test(text)) found.add(table);
  }

  return found;
}

function includeTableWithDependencies(table, tableSet) {
  if (tableSet.has(table)) return;
  tableSet.add(table);
  for (const dep of tableDependencies[table] ?? []) {
    includeTableWithDependencies(dep, tableSet);
  }
}

export function getRelevantSchemaForQuestion(question) {
  if (!question) return postgresqlFullSchema;

  const text = getQuestionText(question);
  const matchedIds = new Set(["setup"]);
  const mentionedTables = extractMentionedTables(text);
  const expandedTables = new Set();

  for (const table of mentionedTables) {
    includeTableWithDependencies(table, expandedTables);
  }

  for (const table of expandedTables) {
    const sectionId = tableToSection[table];
    if (sectionId) matchedIds.add(sectionId);
  }

  if (/\b(index|indexes|explain)\b/i.test(text)) {
    matchedIds.add("indexes");
  }

  if (/\b(trigger|updated_at)\b/i.test(text)) {
    matchedIds.add("trigger_function");
    matchedIds.add("triggers");
  }

  if (/\bpartition\b/i.test(text)) {
    includeTableWithDependencies("orders", expandedTables);
    includeTableWithDependencies("payments", expandedTables);
    includeTableWithDependencies("stock_reservations", expandedTables);
    matchedIds.add("orders");
    matchedIds.add("payments");
    matchedIds.add("stock_reservations");
  }

  if (/\b(sample|seed|default admin)\b/i.test(text)) {
    matchedIds.add("seed_admin");
    for (const table of expandedTables) {
      if (table === "products") matchedIds.add("seed_products");
      if (table === "users") matchedIds.add("seed_users");
      if (table === "carts") matchedIds.add("seed_carts");
      if (table === "cart_items") matchedIds.add("seed_cart_items");
      if (table === "orders" || table === "order_items") {
        matchedIds.add("seed_orders");
      }
      if (table === "payments") matchedIds.add("seed_payments");
      if (table === "returns") matchedIds.add("seed_returns");
      if (table === "stock_reservations") {
        matchedIds.add("seed_stock_reservations");
      }
    }
  }

  if (matchedIds.size === 1) {
    const fallbackNonSeed = schemaSections.filter(
      (section) =>
        !section.id.startsWith("seed_") &&
        section.id !== "seed_admin" &&
        section.keywords.some((keyword) => text.includes(keyword))
    );
    for (const section of fallbackNonSeed) matchedIds.add(section.id);
  }

  const blocks = [];
  for (const section of schemaSections) {
    if (matchedIds.has(section.id) && section.content) {
      blocks.push(section.content);
    }
  }

  if (!blocks.length) return postgresqlFullSchema;

  return blocks.join("\n\n");
}

