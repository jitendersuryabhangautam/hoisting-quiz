export const postgresqlImplementationQuestions = [
  // 🟢 TOPIC 1: Basic SELECT & Filtering
  {
    id: "pg-select-001",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all users",
    prompt:
      "Write a SQL query to retrieve every column from the `users` table.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM users;",
    explanation:
      "`SELECT *` returns all columns. `FROM users` specifies the table.",
    hint: "Use the asterisk (*) to select all columns.",
  },
  {
    id: "pg-select-002",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all admin users",
    prompt: "Retrieve all columns for users whose role is 'admin'.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM users WHERE role = 'admin';",
    explanation: "The `WHERE` clause filters rows where the condition is true.",
    hint: "Compare the `role` column with the string 'admin'.",
  },
  {
    id: "pg-select-003",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all customers",
    prompt: "Fetch all users with role 'customer'.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM users WHERE role = 'customer';",
    explanation: "Filters users based on the `role` column.",
    hint: "Use `WHERE role = 'customer'`.",
  },
  {
    id: "pg-select-004",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all products under 'Electronics'",
    prompt: "Select all products that belong to the 'Electronics' category.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products WHERE category = 'Electronics';",
    explanation: "Filters products by the `category` column.",
    hint: "The category column stores the product's department.",
  },
  {
    id: "pg-select-005",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get products priced above 500",
    prompt: "Find all products with a price greater than 500.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products WHERE price > 500;",
    explanation: "Uses a numeric comparison on the `price` column.",
    hint: "Use `>` operator for greater than.",
  },
  {
    id: "pg-select-006",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get products with stock less than 10",
    prompt: "Retrieve products where `stock_quantity` is below 10.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products WHERE stock_quantity < 10;",
    explanation: "Filters products with low inventory.",
    hint: "Use `<` operator.",
  },
  {
    id: "pg-select-007",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Find product by SKU",
    prompt:
      "Given a specific SKU (e.g., 'LAP-001'), find the corresponding product.",
    starter: "-- Replace 'LAP-001' with the SKU you want",
    referenceSolution: "SELECT * FROM products WHERE sku = 'LAP-001';",
    explanation: "SKU is unique, so this returns at most one row.",
    hint: "Use equality on the `sku` column.",
  },
  {
    id: "pg-select-008",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all orders with status = 'processing'",
    prompt: "Select all orders that are currently being processed.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM orders WHERE status = 'processing';",
    explanation: "Filters orders by their `status` column.",
    hint: "Status is a text column – use single quotes.",
  },
  {
    id: "pg-select-009",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all payments with status = 'completed'",
    prompt: "Retrieve all payments that have been successfully completed.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM payments WHERE status = 'completed';",
    explanation: "Filters the payments table by status.",
    hint: "Check the `status` column in the `payments` table.",
  },
  {
    id: "pg-select-010",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all returns that are still requested",
    prompt:
      "Find all returns where the status is 'requested' (not yet approved/rejected).",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM returns WHERE status = 'requested';",
    explanation: "Shows only returns that are waiting for action.",
    hint: "Use `WHERE status = 'requested'`.",
  },
  {
    id: "pg-select-011",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Find all carts created in last 7 days",
    prompt: "Select carts that were created within the past week from today.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM carts WHERE created_at > NOW() - INTERVAL '7 days';",
    explanation:
      "`NOW()` returns current timestamp; subtract interval to get cutoff.",
    hint: "Use `NOW() - INTERVAL '7 days'`.",
  },
  {
    id: "pg-select-012",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all stock reservations expiring in next 5 minutes",
    prompt:
      "Find reservations whose `expires_at` is within the next 5 minutes from now.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM stock_reservations WHERE expires_at BETWEEN NOW() AND NOW() + INTERVAL '5 minutes';",
    explanation: "`BETWEEN` captures rows expiring in the near future.",
    hint: "Use `NOW() + INTERVAL '5 minutes'` as upper bound.",
  },
  {
    id: "pg-select-013",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get users created today",
    prompt:
      "Retrieve all users who were created on the current date (ignoring time).",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM users WHERE DATE(created_at) = CURRENT_DATE;",
    explanation:
      "`DATE(created_at)` extracts the date part; compare with `CURRENT_DATE`.",
    hint: "Cast timestamp to date using `DATE()`.",
  },
  {
    id: "pg-select-014",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Find all products without category",
    prompt: "Select products where the category field is NULL.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products WHERE category IS NULL;",
    explanation: "`IS NULL` checks for missing value, not `= NULL`.",
    hint: "Use `IS NULL` operator.",
  },
  {
    id: "pg-select-015",
    type: "implementation",
    topic: "Basic SELECT & Filtering",
    title: "Get all orders using COD",
    prompt: "Find orders paid with Cash on Delivery (payment_method = 'cod').",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM orders WHERE payment_method = 'cod';",
    explanation: "Filters orders by the `payment_method` column.",
    hint: "Allowed values: 'cc', 'dc', 'cod'.",
  },

  // 🟢 TOPIC 2: Sorting & Pagination
  {
    id: "pg-sort-001",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Get products sorted by price ASC",
    prompt: "List all products ordered from cheapest to most expensive.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products ORDER BY price ASC;",
    explanation: "`ORDER BY price ASC` sorts ascending (low to high).",
    hint: "ASC is the default, you can omit it.",
  },
  {
    id: "pg-sort-002",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Get products sorted by price DESC",
    prompt: "List all products ordered from most expensive to cheapest.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products ORDER BY price DESC;",
    explanation: "`DESC` sorts descending (high to low).",
    hint: "Use `ORDER BY price DESC`.",
  },
  {
    id: "pg-sort-003",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Get latest 10 orders",
    prompt: "Retrieve the 10 most recently created orders.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;",
    explanation:
      "`ORDER BY created_at DESC` puts newest first, `LIMIT 10` returns only ten.",
    hint: "Combine `ORDER BY` with `LIMIT`.",
  },
  {
    id: "pg-sort-004",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Paginate products (page 2, 10 per page)",
    prompt: "Show the second page of products, assuming 10 products per page.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;",
    explanation:
      "`LIMIT 10` gives 10 rows, `OFFSET 10` skips the first 10 rows (page 1).",
    hint: "Offset = (page_number - 1) * page_size.",
  },
  {
    id: "pg-sort-005",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Get top 5 most expensive products",
    prompt: "Find the five highest‑priced products.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM products ORDER BY price DESC LIMIT 5;",
    explanation: "Sort by price descending then restrict to 5 rows.",
    hint: "Use `ORDER BY price DESC LIMIT 5`.",
  },
  {
    id: "pg-sort-006",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Get oldest users",
    prompt: "Retrieve the 5 users who registered earliest (by `created_at`).",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM users ORDER BY created_at ASC LIMIT 5;",
    explanation: "Ascending order puts oldest records first.",
    hint: "Order by `created_at` ascending.",
  },
  {
    id: "pg-sort-007",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Sort orders by total amount highest first",
    prompt: "List all orders sorted from largest `total_amount` to smallest.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT * FROM orders ORDER BY total_amount DESC;",
    explanation: "Descending order on the monetary value.",
    hint: "Use `ORDER BY total_amount DESC`.",
  },
  {
    id: "pg-sort-008",
    type: "implementation",
    topic: "Sorting & Pagination",
    title: "Paginate users alphabetically",
    prompt: "Show the first 10 users sorted by last name, then first name.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM users ORDER BY last_name, first_name LIMIT 10;",
    explanation:
      "`ORDER BY` can take multiple columns; rows are sorted by last_name, ties by first_name.",
    hint: "List columns in order of priority.",
  },

  // 🟢 TOPIC 3: Aggregation (COUNT, SUM, AVG)
  {
    id: "pg-agg-001",
    type: "implementation",
    topic: "Aggregation",
    title: "Count total users",
    prompt: "Return the total number of rows in the `users` table.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT COUNT(*) FROM users;",
    explanation: "`COUNT(*)` counts all rows regardless of NULLs.",
    hint: "Use the aggregate function `COUNT`.",
  },
  {
    id: "pg-agg-002",
    type: "implementation",
    topic: "Aggregation",
    title: "Count total customers",
    prompt: "Count how many users have role = 'customer'.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT COUNT(*) FROM users WHERE role = 'customer';",
    explanation: "Filter first, then count.",
    hint: "Add a `WHERE` clause before counting.",
  },
  {
    id: "pg-agg-003",
    type: "implementation",
    topic: "Aggregation",
    title: "Count total orders",
    prompt: "Get the total number of orders placed.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT COUNT(*) FROM orders;",
    explanation: "Simple row count of the orders table.",
    hint: "No filter needed.",
  },
  {
    id: "pg-agg-004",
    type: "implementation",
    topic: "Aggregation",
    title: "Count orders per status",
    prompt:
      "For each order status, show the status and how many orders have it.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT status, COUNT(*) FROM orders GROUP BY status;",
    explanation: "`GROUP BY` groups rows by status, then `COUNT` per group.",
    hint: "Use `GROUP BY status`.",
  },
  {
    id: "pg-agg-005",
    type: "implementation",
    topic: "Aggregation",
    title: "Total revenue generated",
    prompt:
      "Calculate the sum of all completed payments (payments with status = 'completed').",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT SUM(amount) FROM payments WHERE status = 'completed';",
    explanation: "`SUM` adds up the `amount` column for completed payments.",
    hint: "Filter `status = 'completed'` before summing.",
  },
  {
    id: "pg-agg-006",
    type: "implementation",
    topic: "Aggregation",
    title: "Average order value",
    prompt: "Compute the average total amount of all orders.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT AVG(total_amount) FROM orders;",
    explanation: "`AVG` returns the arithmetic mean.",
    hint: "Use `AVG(total_amount)`.",
  },
  {
    id: "pg-agg-007",
    type: "implementation",
    topic: "Aggregation",
    title: "Total revenue per user",
    prompt:
      "For each user, show their user ID and the sum of `total_amount` of their orders.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT user_id, SUM(total_amount) FROM orders GROUP BY user_id;",
    explanation: "Group orders by user, then sum the order totals.",
    hint: "`GROUP BY user_id` is required.",
  },
  {
    id: "pg-agg-008",
    type: "implementation",
    topic: "Aggregation",
    title: "Total revenue per product",
    prompt:
      "Calculate total revenue generated by each product (sum of `quantity * price_at_time` from `order_items`).",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT product_id, SUM(quantity * price_at_time) AS revenue FROM order_items GROUP BY product_id;",
    explanation:
      "Multiply quantity by price at time of order, then sum per product.",
    hint: "Use `SUM(quantity * price_at_time)`.",
  },
  {
    id: "pg-agg-009",
    type: "implementation",
    topic: "Aggregation",
    title: "Count items in each cart",
    prompt:
      "For every cart, show the cart ID and the number of distinct products in it.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT cart_id, COUNT(*) FROM cart_items GROUP BY cart_id;",
    explanation:
      "Each row in `cart_items` is one product in a cart; count rows per cart.",
    hint: "Group by `cart_id` and use `COUNT(*)`.",
  },
  {
    id: "pg-agg-010",
    type: "implementation",
    topic: "Aggregation",
    title: "Total stock value (price * quantity)",
    prompt:
      "Compute the total monetary value of current inventory (`price * stock_quantity`).",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT SUM(price * stock_quantity) AS total_stock_value FROM products;",
    explanation:
      "Multiply price by stock for each product, then sum across all products.",
    hint: "Use `SUM(price * stock_quantity)`.",
  },
  {
    id: "pg-agg-011",
    type: "implementation",
    topic: "Aggregation",
    title: "Count returns per status",
    prompt: "For each return status, show how many returns have that status.",
    starter: "-- Write your query here",
    referenceSolution: "SELECT status, COUNT(*) FROM returns GROUP BY status;",
    explanation: "Group by the `status` column and count rows.",
    hint: "Similar to orders per status.",
  },
  {
    id: "pg-agg-012",
    type: "implementation",
    topic: "Aggregation",
    title: "Total refund amount requested",
    prompt:
      "Sum of `refund_amount` for all returns that have been requested or approved.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT SUM(refund_amount) FROM returns WHERE status IN ('requested', 'approved');",
    explanation:
      "Filter returns that are not yet completed/rejected, then sum refund amounts.",
    hint: "Use `WHERE status IN (...)`.",
  },
  {
    id: "pg-agg-013",
    type: "implementation",
    topic: "Aggregation",
    title: "Total completed payments amount",
    prompt: "Sum of all payment amounts where status = 'completed'.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT SUM(amount) FROM payments WHERE status = 'completed';",
    explanation: "Same as total revenue, but from payments table.",
    hint: "Remember to filter by status.",
  },

  // 🟢 TOPIC 4: JOINS
  {
    id: "pg-join-001",
    type: "implementation",
    topic: "JOINS",
    title: "Get orders with user details",
    prompt:
      "Retrieve every order along with the associated user's email and full name.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT o.*, u.email, u.first_name, u.last_name FROM orders o JOIN users u ON o.user_id = u.id;",
    explanation: "`JOIN` links orders and users via `user_id` / `id`.",
    hint: "Use `ON` to specify the join condition.",
  },
  {
    id: "pg-join-002",
    type: "implementation",
    topic: "JOINS",
    title: "Get order items with product details",
    prompt:
      "Show each order item together with the product name, SKU, and price at time.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT oi.*, p.name, p.sku FROM order_items oi JOIN products p ON oi.product_id = p.id;",
    explanation: "Join order_items to products to enrich with product info.",
    hint: "The foreign key is `product_id`.",
  },
  {
    id: "pg-join-003",
    type: "implementation",
    topic: "JOINS",
    title: "Get cart items with product info",
    prompt:
      "For each cart item, display the product name, price, and quantity.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT ci.*, p.name, p.price FROM cart_items ci JOIN products p ON ci.product_id = p.id;",
    explanation: "Join cart_items with products using product_id.",
    hint: "Use `JOIN products`.",
  },
  {
    id: "pg-join-004",
    type: "implementation",
    topic: "JOINS",
    title: "Get payment info along with order_number",
    prompt:
      "Show payment details (amount, status, method) and the associated order number.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT p.*, o.order_number FROM payments p JOIN orders o ON p.order_id = o.id;",
    explanation:
      "Join payments with orders to get the human‑readable order_number.",
    hint: "`order_id` in payments references `orders.id`.",
  },
  {
    id: "pg-join-005",
    type: "implementation",
    topic: "JOINS",
    title: "Get return details with user email",
    prompt:
      "Display each return together with the email of the user who requested it.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT r.*, u.email FROM returns r JOIN users u ON r.user_id = u.id;",
    explanation: "Join returns to users on `user_id`.",
    hint: "The returns table has a direct `user_id` column.",
  },
  {
    id: "pg-join-006",
    type: "implementation",
    topic: "JOINS",
    title: "Get orders with payment status",
    prompt:
      "Show order number, order total, and the payment status for each order.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT o.order_number, o.total_amount, p.status AS payment_status FROM orders o LEFT JOIN payments p ON o.id = p.order_id;",
    explanation:
      "`LEFT JOIN` ensures orders without a payment record still appear.",
    hint: "Use `LEFT JOIN` to include all orders.",
  },
  {
    id: "pg-join-007",
    type: "implementation",
    topic: "JOINS",
    title: "Get users who never placed an order",
    prompt: "Find all customers who have no rows in the orders table.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT u.* FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.id IS NULL;",
    explanation: "Left join and filter where order id is null (no match).",
    hint: "Check `o.id IS NULL` after left join.",
  },
  {
    id: "pg-join-008",
    type: "implementation",
    topic: "JOINS",
    title: "Get products never ordered",
    prompt: "List products that have never appeared in any order_item.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT p.* FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id WHERE oi.id IS NULL;",
    explanation:
      "Left join from products to order_items, keep only products with no match.",
    hint: "Use `LEFT JOIN` and `WHERE oi.id IS NULL`.",
  },
  {
    id: "pg-join-009",
    type: "implementation",
    topic: "JOINS",
    title: "Get users with more than 2 orders",
    prompt: "Show users who have placed at least 3 orders.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT u.id, u.email, COUNT(o.id) AS order_count FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.id HAVING COUNT(o.id) > 2;",
    explanation: "Join, group by user, then filter groups with `HAVING`.",
    hint: "`HAVING` is used for aggregate conditions.",
  },
  {
    id: "pg-join-010",
    type: "implementation",
    topic: "JOINS",
    title: "Get most purchased product",
    prompt:
      "Find the product that has been ordered the highest total quantity across all orders.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT p.id, p.name, SUM(oi.quantity) AS total_qty FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id ORDER BY total_qty DESC LIMIT 1;",
    explanation:
      "Join, group by product, sum quantities, sort descending, take first.",
    hint: "Use `SUM(oi.quantity)` and `ORDER BY ... DESC LIMIT 1`.",
  },
  {
    id: "pg-join-011",
    type: "implementation",
    topic: "JOINS",
    title: "Get users who have items in cart but no orders",
    prompt: "Find users with at least one cart item but zero orders.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT u.* FROM users u JOIN carts c ON u.id = c.user_id JOIN cart_items ci ON c.id = ci.cart_id LEFT JOIN orders o ON u.id = o.user_id WHERE o.id IS NULL GROUP BY u.id;",
    explanation: "Users must exist in cart_items chain, but no matching order.",
    hint: "Combine `JOIN` for cart and `LEFT JOIN` for orders with NULL check.",
  },
  {
    id: "pg-join-012",
    type: "implementation",
    topic: "JOINS",
    title: "Get total cart value per user",
    prompt:
      "For each user, compute the sum of (cart quantity * product price) in their current cart.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT u.id, u.email, SUM(ci.quantity * p.price) AS cart_total FROM users u JOIN carts c ON u.id = c.user_id JOIN cart_items ci ON c.id = ci.cart_id JOIN products p ON ci.product_id = p.id GROUP BY u.id;",
    explanation:
      "Chain joins from users → carts → cart_items → products, then aggregate.",
    hint: "Be careful to join all necessary tables.",
  },

  // 🟢 TOPIC 5: Subqueries & CTE
  {
    id: "pg-sub-001",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get products with price greater than average price",
    prompt:
      "Select all products whose price is above the overall average product price.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);",
    explanation: "Subquery computes average price once; outer query compares.",
    hint: "The subquery must return a single value.",
  },
  {
    id: "pg-sub-002",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get users whose total order amount > 1000",
    prompt: "Find users where the sum of their order totals exceeds 1000.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT user_id, SUM(total_amount) FROM orders GROUP BY user_id HAVING SUM(total_amount) > 1000;",
    explanation:
      "`HAVING` filters groups after aggregation – a form of subquery alternative.",
    hint: "You can also use a subquery in the FROM clause.",
  },
  {
    id: "pg-sub-003",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get products with stock less than average stock",
    prompt:
      "Retrieve products where `stock_quantity` is below the average stock quantity of all products.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM products WHERE stock_quantity < (SELECT AVG(stock_quantity) FROM products);",
    explanation: "Similar to price comparison, but with stock quantity.",
    hint: "Compute average inside a subquery.",
  },
  {
    id: "pg-sub-004",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get latest order per user",
    prompt: "For each user, show their most recent order (by `created_at`).",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT DISTINCT ON (user_id) * FROM orders ORDER BY user_id, created_at DESC;",
    explanation:
      "`DISTINCT ON` keeps first row per user after sorting by date descending.",
    hint: "Or use a subquery with `ROW_NUMBER()` window function.",
  },
  {
    id: "pg-sub-005",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get users with highest spending",
    prompt:
      "Find the user who has spent the most money (sum of `total_amount`).",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT user_id, SUM(total_amount) AS total_spent FROM orders GROUP BY user_id ORDER BY total_spent DESC LIMIT 1;",
    explanation: "Group, sum, sort descending, take first.",
    hint: "Use `LIMIT 1` after ordering.",
  },
  {
    id: "pg-sub-006",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get product with highest revenue",
    prompt:
      "Determine which product generated the highest total revenue (`SUM(quantity * price_at_time)`).",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT product_id, SUM(quantity * price_at_time) AS revenue FROM order_items GROUP BY product_id ORDER BY revenue DESC LIMIT 1;",
    explanation: "Group by product, compute revenue, sort, limit one.",
    hint: "Join with products if you need name.",
  },
  {
    id: "pg-sub-007",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Use CTE to calculate monthly revenue",
    prompt:
      "Write a CTE that groups completed payments by year and month, then select from it.",
    starter:
      "WITH monthly_revenue AS ( -- your query ) SELECT * FROM monthly_revenue;",
    referenceSolution:
      "WITH monthly_revenue AS ( SELECT DATE_TRUNC('month', created_at) AS month, SUM(amount) AS revenue FROM payments WHERE status = 'completed' GROUP BY DATE_TRUNC('month', created_at) ) SELECT * FROM monthly_revenue ORDER BY month;",
    explanation:
      "CTE simplifies complex queries. `DATE_TRUNC` rounds to month.",
    hint: "Use `DATE_TRUNC('month', created_at)`.",
  },
  {
    id: "pg-sub-008",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Use CTE to get user lifetime value",
    prompt:
      "Create a CTE that computes total spend per user, then list users with LTV above 500.",
    starter:
      "WITH user_ltv AS ( -- your query ) SELECT * FROM user_ltv WHERE total_spent > 500;",
    referenceSolution:
      "WITH user_ltv AS ( SELECT user_id, SUM(total_amount) AS total_spent FROM orders GROUP BY user_id ) SELECT u.*, ltv.total_spent FROM users u JOIN user_ltv ltv ON u.id = ltv.user_id WHERE ltv.total_spent > 500;",
    explanation: "CTE holds per‑user totals; main query joins and filters.",
    hint: "Remember to join the CTE result with users.",
  },
  {
    id: "pg-sub-009",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get orders above global average order value",
    prompt:
      "Select orders where `total_amount` is greater than the average order value of all orders.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders);",
    explanation: "Simple subquery returning a single scalar average.",
    hint: "The subquery is independent and runs once.",
  },
  {
    id: "pg-sub-010",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get products ordered more than 5 times",
    prompt:
      "Find products that have appeared in at least 6 distinct order_items (i.e., ordered at least 6 times in total, not quantity).",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT product_id, COUNT(*) FROM order_items GROUP BY product_id HAVING COUNT(*) > 5;",
    explanation:
      "Each order_item row represents one line item; count rows per product.",
    hint: "Use `HAVING COUNT(*) > 5`.",
  },
  {
    id: "pg-sub-011",
    type: "implementation",
    topic: "Subqueries & CTE",
    title: "Get users who requested returns more than once",
    prompt: "List users who have at least two return requests.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT user_id, COUNT(*) FROM returns GROUP BY user_id HAVING COUNT(*) > 1;",
    explanation: "Group by user, count returns, filter with HAVING.",
    hint: "`HAVING` works on aggregated values.",
  },

  // 🟢 TOPIC 6: JSONB Queries
  {
    id: "pg-json-001",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Get all orders shipped to city = 'Austin'",
    prompt:
      "Find orders where the `shipping_address` JSONB field has a city property equal to 'Austin'.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM orders WHERE shipping_address->>'city' = 'Austin';",
    explanation: "`->>` extracts text value of a JSON key.",
    hint: "Use `->>` for text, `->` for JSON object.",
  },
  {
    id: "pg-json-002",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Get all orders where shipping country = 'USA'",
    prompt:
      "Retrieve orders whose `shipping_address->>'country'` equals 'USA'.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM orders WHERE shipping_address->>'country' = 'USA';",
    explanation: "Same pattern as city, but for country.",
    hint: "Check the key name: 'country'.",
  },
  {
    id: "pg-json-003",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Extract phone number from billing address",
    prompt:
      "Select order_number and the phone number stored inside `billing_address`.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT order_number, billing_address->>'phone' AS phone FROM orders;",
    explanation: "Use `->>` to extract phone as text.",
    hint: "The key is 'phone'.",
  },
  {
    id: "pg-json-004",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Update postal_code inside shipping_address",
    prompt:
      "Write an UPDATE statement that changes the `postal_code` of shipping_address to '90210' for a specific order_number.",
    starter: "-- Replace 'ORD-1001' with actual order number",
    referenceSolution:
      "UPDATE orders SET shipping_address = jsonb_set(shipping_address, '{postal_code}', '\"90210\"') WHERE order_number = 'ORD-1001';",
    explanation:
      "`jsonb_set` modifies a JSONB field; the path is an array of keys.",
    hint: "The new value must be a JSONB literal, so wrap in double quotes.",
  },
  {
    id: "pg-json-005",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Add new key to billing JSON",
    prompt:
      "Add a key `'landmark'` with value `'Near City Park'` to every `billing_address`.",
    starter: "-- Write your query here",
    referenceSolution:
      'UPDATE orders SET billing_address = billing_address || \'{"landmark": "Near City Park"}\'::jsonb;',
    explanation: "The `||` operator merges JSONB objects.",
    hint: "Cast the string to jsonb using `::jsonb`.",
  },
  {
    id: "pg-json-006",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Find orders where phone starts with +1",
    prompt:
      "Retrieve orders where the billing_address phone number begins with '+1'.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM orders WHERE billing_address->>'phone' LIKE '+1%';",
    explanation: "Extract phone as text and use `LIKE` pattern matching.",
    hint: "Use `->>` then `LIKE '+1%'`.",
  },
  {
    id: "pg-json-007",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Index JSON field for faster search",
    prompt:
      "Create an index on `shipping_address->>'city'` to speed up city searches.",
    starter: "-- Write your CREATE INDEX statement",
    referenceSolution:
      "CREATE INDEX idx_orders_shipping_city ON orders ((shipping_address->>'city'));",
    explanation: "Expression index on the extracted text value.",
    hint: "Double parentheses are required for the expression.",
  },
  {
    id: "pg-json-008",
    type: "implementation",
    topic: "JSONB Queries",
    title: "Filter orders by state inside JSON",
    prompt: "Select all orders where `shipping_address->>'state'` equals 'TX'.",
    starter: "-- Write your query here",
    referenceSolution:
      "SELECT * FROM orders WHERE shipping_address->>'state' = 'TX';",
    explanation: "Direct extraction and equality.",
    hint: "Same as city filter, different key.",
  },

  // 🟢 TOPIC 7: Window Functions
  {
    id: "pg-win-001",
    type: "implementation",
    topic: "Window Functions",
    title: "Rank users by total spending",
    prompt:
      "Assign a rank to each user based on their total order amount (highest spender gets rank 1).",
    starter: "-- Write your query using RANK() or DENSE_RANK()",
    referenceSolution:
      "SELECT u.id, u.email, COALESCE(SUM(o.total_amount), 0) AS total_spent, RANK() OVER (ORDER BY COALESCE(SUM(o.total_amount), 0) DESC) AS spending_rank FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id;",
    explanation: "Window function `RANK()` orders by total_spent descending.",
    hint: "Use `LEFT JOIN` to include users with no orders.",
  },
  {
    id: "pg-win-002",
    type: "implementation",
    topic: "Window Functions",
    title: "Running total revenue by date",
    prompt:
      "Show daily total revenue (from completed payments) and a cumulative sum over time.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT DATE(created_at) AS day, SUM(amount) AS daily_revenue, SUM(SUM(amount)) OVER (ORDER BY DATE(created_at)) AS running_total FROM payments WHERE status = 'completed' GROUP BY DATE(created_at) ORDER BY day;",
    explanation: "Aggregate by day, then use window sum over days.",
    hint: "`SUM(SUM(amount))` – inner sum per day, outer running sum.",
  },
  {
    id: "pg-win-003",
    type: "implementation",
    topic: "Window Functions",
    title: "Dense rank products by revenue",
    prompt: "Rank products by total revenue (dense rank, no gaps).",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT p.id, p.name, COALESCE(SUM(oi.quantity * oi.price_at_time), 0) AS revenue, DENSE_RANK() OVER (ORDER BY COALESCE(SUM(oi.quantity * oi.price_at_time), 0) DESC) AS rank FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id;",
    explanation: "`DENSE_RANK` gives same rank for ties, no skipping.",
    hint: "Use `DENSE_RANK()` instead of `RANK()`.",
  },
  {
    id: "pg-win-004",
    type: "implementation",
    topic: "Window Functions",
    title: "Find second highest spending user",
    prompt:
      "Use a window function to find the user with the second highest total spend.",
    starter: "-- Write your query",
    referenceSolution:
      "WITH user_spend AS ( SELECT u.id, SUM(o.total_amount) AS total_spent, RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS rnk FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.id ) SELECT * FROM user_spend WHERE rnk = 2;",
    explanation: "CTE with rank, then filter rank = 2.",
    hint: "`RANK()` may skip if ties; adjust with `DENSE_RANK` if needed.",
  },
  {
    id: "pg-win-005",
    type: "implementation",
    topic: "Window Functions",
    title: "Row number for orders per user",
    prompt:
      "Assign a sequential row number to each order for every user, ordered by `created_at`.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS order_seq FROM orders;",
    explanation: "`PARTITION BY` resets numbering per user.",
    hint: "Use `ROW_NUMBER()` with `PARTITION BY user_id`.",
  },
  {
    id: "pg-win-006",
    type: "implementation",
    topic: "Window Functions",
    title: "Moving average revenue (7 days)",
    prompt:
      "Calculate a 7‑day moving average of daily revenue from completed payments.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT DATE(created_at) AS day, SUM(amount) AS daily_revenue, AVG(SUM(amount)) OVER (ORDER BY DATE(created_at) ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7day FROM payments WHERE status = 'completed' GROUP BY DATE(created_at) ORDER BY day;",
    explanation: "Window frame of current row and previous 6 rows.",
    hint: "Use `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`.",
  },
  {
    id: "pg-win-007",
    type: "implementation",
    topic: "Window Functions",
    title: "Cumulative order count",
    prompt: "Show the cumulative number of orders placed over time (by date).",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT DATE(created_at) AS order_date, COUNT(*) AS orders_on_day, SUM(COUNT(*)) OVER (ORDER BY DATE(created_at)) AS cumulative_orders FROM orders GROUP BY DATE(created_at) ORDER BY order_date;",
    explanation: "Count per day, then window sum over days.",
    hint: "Similar to running total.",
  },
  {
    id: "pg-win-008",
    type: "implementation",
    topic: "Window Functions",
    title: "Partition by user and rank orders",
    prompt: "For each user, rank their orders by total_amount (highest first).",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT *, RANK() OVER (PARTITION BY user_id ORDER BY total_amount DESC) AS order_rank_by_amount FROM orders;",
    explanation: "`PARTITION BY user_id` restarts ranking per user.",
    hint: "Use `RANK()` with `PARTITION BY` and `ORDER BY`.",
  },

  // 🟢 TOPIC 8: Transactions & Concurrency
  {
    id: "pg-tx-001",
    type: "implementation",
    topic: "Transactions & Concurrency",
    title: "Deduct stock safely during checkout",
    prompt:
      "Write a transaction that reduces `stock_quantity` for a product only if enough stock exists. Rollback if insufficient.",
    starter: "BEGIN; -- your code here",
    referenceSolution:
      "BEGIN; UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 'product-uuid' AND stock_quantity >= 1; IF NOT FOUND THEN ROLLBACK; ELSE COMMIT; END IF;",
    explanation: "Conditional update; check row count, rollback on failure.",
    hint: "Use `IF NOT FOUND` in plpgsql or check row count from client.",
  },
  {
    id: "pg-tx-002",
    type: "implementation",
    topic: "Transactions & Concurrency",
    title: "Reserve stock using transaction",
    prompt:
      "Insert a row into `stock_reservations` and decrement `stock_quantity` atomically.",
    starter: "BEGIN; -- your statements",
    referenceSolution:
      "BEGIN; INSERT INTO stock_reservations (product_id, cart_id, quantity, expires_at) VALUES ('prod-id', 'cart-id', 1, NOW() + INTERVAL '10 minutes'); UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 'prod-id'; COMMIT;",
    explanation:
      "Both operations happen together; no intermediate state visible.",
    hint: "Ensure foreign keys exist before insert.",
  },
  {
    id: "pg-tx-003",
    type: "implementation",
    topic: "Transactions & Concurrency",
    title: "Cancel order and restore stock",
    prompt:
      "When an order is cancelled, restore the stock quantities of its products. Wrap in a transaction.",
    starter: "BEGIN; -- your code",
    referenceSolution:
      "BEGIN; UPDATE products SET stock_quantity = stock_quantity + oi.quantity FROM order_items oi WHERE products.id = oi.product_id AND oi.order_id = 'order-uuid'; UPDATE orders SET status = 'cancelled' WHERE id = 'order-uuid'; COMMIT;",
    explanation:
      "Increase stock by the ordered quantity, then update order status.",
    hint: "Join `order_items` inside the UPDATE.",
  },
  {
    id: "pg-tx-004",
    type: "implementation",
    topic: "Transactions & Concurrency",
    title: "Handle payment failure rollback",
    prompt:
      "Simulate a payment failure: attempt to insert a payment with status 'failed' and roll back any stock deduction.",
    starter: "BEGIN; -- attempt payment",
    referenceSolution:
      "BEGIN; INSERT INTO payments (order_id, amount, status) VALUES ('order-id', 100, 'failed'); -- if payment fails, rollback entire transaction ROLLBACK;",
    explanation: "Rollback undoes all changes made in the transaction.",
    hint: "Use `ROLLBACK` when payment processor returns error.",
  },
  {
    id: "pg-tx-005",
    type: "implementation",
    topic: "Transactions & Concurrency",
    title: "Prevent overselling using FOR UPDATE",
    prompt:
      "Lock a product row before checking stock and updating, to avoid overselling in concurrent requests.",
    starter: "BEGIN; -- your SELECT FOR UPDATE",
    referenceSolution:
      "BEGIN; SELECT stock_quantity FROM products WHERE id = 'prod-id' FOR UPDATE; -- if stock >= requested, then UPDATE products SET stock_quantity = stock_quantity - requested WHERE id = 'prod-id'; COMMIT;",
    explanation:
      "`FOR UPDATE` locks the row until commit, preventing other transactions from modifying it.",
    hint: "Place the SELECT ... FOR UPDATE before any update.",
  },
  {
    id: "pg-tx-006",
    type: "implementation",
    topic: "Transactions & Concurrency",
    title: "Delete expired stock reservations",
    prompt:
      "Write a transaction that deletes expired reservations and restores the stock quantities.",
    starter: "BEGIN; -- your DELETE ... RETURNING",
    referenceSolution:
      "BEGIN; WITH expired AS ( DELETE FROM stock_reservations WHERE expires_at < NOW() RETURNING product_id, quantity ) UPDATE products SET stock_quantity = stock_quantity + expired.quantity FROM expired WHERE products.id = expired.product_id; COMMIT;",
    explanation:
      "Delete expired rows and use `RETURNING` to restore stock in one transaction.",
    hint: "Use a CTE with `DELETE ... RETURNING`.",
  },

  // 🟢 TOPIC 9: Index Optimization
  {
    id: "pg-idx-001",
    type: "implementation",
    topic: "Index Optimization",
    title: "Check execution plan of order query",
    prompt:
      "Write a command to analyze the query plan for `SELECT * FROM orders WHERE user_id = 'some-uuid'`.",
    starter: "-- Write your EXPLAIN command",
    referenceSolution:
      "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE user_id = 'some-uuid';",
    explanation: "`EXPLAIN ANALYZE` shows actual execution statistics.",
    hint: "Use `EXPLAIN (ANALYZE)` to see runtime and row estimates.",
  },
  {
    id: "pg-idx-002",
    type: "implementation",
    topic: "Index Optimization",
    title: "Add composite index on (user_id, status)",
    prompt:
      "Create a composite index to speed up queries filtering by both `user_id` and `status` on orders.",
    starter: "-- Write CREATE INDEX",
    referenceSolution:
      "CREATE INDEX idx_orders_user_status ON orders (user_id, status);",
    explanation: "Composite index supports equality on both columns.",
    hint: "Order of columns matters: put more selective first.",
  },
  {
    id: "pg-idx-003",
    type: "implementation",
    topic: "Index Optimization",
    title: "Optimize product search by category + price",
    prompt:
      "Create an index that helps queries with `WHERE category = X ORDER BY price`.",
    starter: "-- Write CREATE INDEX",
    referenceSolution:
      "CREATE INDEX idx_products_category_price ON products (category, price);",
    explanation:
      "Index can filter by category and also avoid sorting for price.",
    hint: "Include both columns in the index.",
  },
  {
    id: "pg-idx-004",
    type: "implementation",
    topic: "Index Optimization",
    title: "Create partial index on completed orders",
    prompt:
      "Create an index only for orders with status = 'completed' to save space.",
    starter: "-- Write CREATE INDEX ... WHERE",
    referenceSolution:
      "CREATE INDEX idx_orders_completed ON orders (created_at) WHERE status = 'completed';",
    explanation: "Partial index contains only rows meeting the condition.",
    hint: "Use `WHERE status = 'completed'`.",
  },
  {
    id: "pg-idx-005",
    type: "implementation",
    topic: "Index Optimization",
    title: "Index JSON city field",
    prompt: "Create an index on the `city` key inside `shipping_address`.",
    starter: "-- Write CREATE INDEX",
    referenceSolution:
      "CREATE INDEX idx_orders_shipping_city ON orders ((shipping_address->>'city'));",
    explanation: "Expression index on the extracted text value.",
    hint: "Double parentheses needed.",
  },
  {
    id: "pg-idx-006",
    type: "implementation",
    topic: "Index Optimization",
    title: "Create covering index for order listing",
    prompt:
      "Create an index that covers the query: `SELECT order_number, total_amount, status FROM orders WHERE user_id = ?`.",
    starter: "-- Write CREATE INDEX",
    referenceSolution:
      "CREATE INDEX idx_orders_user_covering ON orders (user_id) INCLUDE (order_number, total_amount, status);",
    explanation:
      "`INCLUDE` adds extra columns to the leaf level, making it a covering index.",
    hint: "Use `INCLUDE` for columns not used in WHERE/ORDER BY.",
  },
  {
    id: "pg-idx-007",
    type: "implementation",
    topic: "Index Optimization",
    title: "Compare query with and without index",
    prompt:
      "Explain how to measure performance difference before and after creating an index.",
    starter: "-- Write two EXPLAIN commands",
    referenceSolution:
      "EXPLAIN (ANALYZE, TIMING) SELECT * FROM orders WHERE user_id = 'id'; -- then after CREATE INDEX, run again",
    explanation: "Compare execution time and rows scanned.",
    hint: "Use `EXPLAIN (ANALYZE, TIMING)` for precise numbers.",
  },

  // 🟢 TOPIC 10: Data Modification
  {
    id: "pg-dml-001",
    type: "implementation",
    topic: "Data Modification",
    title: "Update product price by 10%",
    prompt: "Increase the price of all products by 10 percent.",
    starter: "-- Write your UPDATE",
    referenceSolution: "UPDATE products SET price = price * 1.10;",
    explanation: "Multiply each price by 1.10 to add 10%.",
    hint: "Use `price * 1.10`.",
  },
  {
    id: "pg-dml-002",
    type: "implementation",
    topic: "Data Modification",
    title: "Reduce stock after purchase",
    prompt:
      "After an order is placed, reduce stock_quantity for the ordered products.",
    starter: "-- Write UPDATE using order_items",
    referenceSolution:
      "UPDATE products SET stock_quantity = stock_quantity - oi.quantity FROM order_items oi WHERE products.id = oi.product_id AND oi.order_id = 'order-uuid';",
    explanation: "Join with order_items to subtract exact quantities.",
    hint: "Use `FROM` in UPDATE.",
  },
  {
    id: "pg-dml-003",
    type: "implementation",
    topic: "Data Modification",
    title: "Soft delete a product",
    prompt:
      "Instead of deleting, set a `deleted_at` column (assume it exists) to mark product as deleted. Write the ALTER TABLE to add the column and then an UPDATE to soft delete a product.",
    starter: "-- First ALTER TABLE, then UPDATE",
    referenceSolution:
      "ALTER TABLE products ADD COLUMN deleted_at TIMESTAMP; UPDATE products SET deleted_at = NOW() WHERE id = 'product-id';",
    explanation: "Soft delete preserves data while hiding from normal queries.",
    hint: "Remember to modify SELECT queries to ignore deleted rows.",
  },
  {
    id: "pg-dml-004",
    type: "implementation",
    topic: "Data Modification",
    title: "Change user role",
    prompt:
      "Update a user's role from 'customer' to 'admin' given their email.",
    starter: "-- Write UPDATE",
    referenceSolution:
      "UPDATE users SET role = 'admin' WHERE email = 'user@example.com';",
    explanation: "Simple update on the role column.",
    hint: "Use `WHERE email = ...`",
  },
  {
    id: "pg-dml-005",
    type: "implementation",
    topic: "Data Modification",
    title: "Bulk insert products",
    prompt: "Insert three new products in a single query.",
    starter: "INSERT INTO products (sku, name, price, stock_quantity) VALUES",
    referenceSolution:
      "INSERT INTO products (sku, name, price, stock_quantity) VALUES ('KEY-01', 'Keyboard', 49.99, 30), ('MOU-01', 'Mouse', 29.99, 50), ('MON-01', 'Monitor', 199.99, 15);",
    explanation: "Multiple rows in one INSERT, comma separated.",
    hint: "Separate each row with a comma.",
  },
  {
    id: "pg-dml-006",
    type: "implementation",
    topic: "Data Modification",
    title: "Delete abandoned carts (30 days old)",
    prompt: "Remove carts that have not been updated in the last 30 days.",
    starter: "-- Write DELETE",
    referenceSolution:
      "DELETE FROM carts WHERE updated_at < NOW() - INTERVAL '30 days';",
    explanation: "Cascading delete will remove cart_items automatically.",
    hint: "Use `updated_at` column.",
  },
  {
    id: "pg-dml-007",
    type: "implementation",
    topic: "Data Modification",
    title: "Refund an order",
    prompt:
      "Update the order status to 'refunded' and the payment status to 'refunded'.",
    starter: "BEGIN; -- two UPDATE statements",
    referenceSolution:
      "BEGIN; UPDATE orders SET status = 'refunded' WHERE id = 'order-id'; UPDATE payments SET status = 'refunded' WHERE order_id = 'order-id'; COMMIT;",
    explanation: "Both statuses must be updated consistently.",
    hint: "Use a transaction to keep them in sync.",
  },
  {
    id: "pg-dml-008",
    type: "implementation",
    topic: "Data Modification",
    title: "Change order status from processing → shipped",
    prompt: "Update the status of a specific order to 'shipped'.",
    starter: "-- Write UPDATE",
    referenceSolution:
      "UPDATE orders SET status = 'shipped' WHERE order_number = 'ORD-1001';",
    explanation: "Change status string.",
    hint: "Use `order_number` or `id` to identify order.",
  },
  {
    id: "pg-dml-009",
    type: "implementation",
    topic: "Data Modification",
    title: "Expire stock reservations",
    prompt:
      "Manually expire all reservations for a given cart by setting `expires_at` to NOW().",
    starter: "-- Write UPDATE",
    referenceSolution:
      "UPDATE stock_reservations SET expires_at = NOW() WHERE cart_id = 'cart-uuid';",
    explanation: "Forcing expiration so they become eligible for cleanup.",
    hint: "Set `expires_at` to current timestamp.",
  },
  {
    id: "pg-dml-010",
    type: "implementation",
    topic: "Data Modification",
    title: "Update payment status to completed",
    prompt:
      "Set a payment's status to 'completed' and record a transaction_id.",
    starter: "-- Write UPDATE",
    referenceSolution:
      "UPDATE payments SET status = 'completed', transaction_id = 'txn_abc123' WHERE id = 'payment-id';",
    explanation: "Updates two columns in one statement.",
    hint: "Separate column assignments with commas.",
  },

  // 🟢 TOPIC 11: Partitioning (Advanced Production Topic)
  {
    id: "pg-part-001",
    type: "implementation",
    topic: "Partitioning",
    title: "Partition orders by created_at (monthly)",
    prompt:
      "Write the SQL to create a partitioned `orders` table by month on `created_at`.",
    starter:
      "CREATE TABLE orders_partitioned ( ... ) PARTITION BY RANGE (created_at);",
    referenceSolution:
      "CREATE TABLE orders_partitioned ( LIKE orders INCLUDING ALL ) PARTITION BY RANGE (created_at); -- then create monthly partitions",
    explanation: "Range partitioning splits data by time intervals.",
    hint: "Use `PARTITION BY RANGE (created_at)`.",
  },
  {
    id: "pg-part-002",
    type: "implementation",
    topic: "Partitioning",
    title: "Partition payments by status",
    prompt: "Create a list partition on `payments` table based on `status`.",
    starter:
      "CREATE TABLE payments_partitioned ( ... ) PARTITION BY LIST (status);",
    referenceSolution:
      "CREATE TABLE payments_partitioned ( LIKE payments ) PARTITION BY LIST (status);",
    explanation:
      "List partitioning groups rows by discrete values (e.g., 'completed', 'failed').",
    hint: "Use `PARTITION BY LIST`.",
  },
  {
    id: "pg-part-003",
    type: "implementation",
    topic: "Partitioning",
    title: "Partition stock_reservations by expires_at",
    prompt:
      "Range partition `stock_reservations` on `expires_at` (daily or weekly).",
    starter:
      "CREATE TABLE stock_reservations_partitioned ... PARTITION BY RANGE (expires_at);",
    referenceSolution:
      "CREATE TABLE stock_reservations_partitioned ( LIKE stock_reservations ) PARTITION BY RANGE (expires_at);",
    explanation: "Useful for efficient cleanup of expired rows.",
    hint: "Choose a suitable interval (e.g., daily).",
  },
  {
    id: "pg-part-004",
    type: "implementation",
    topic: "Partitioning",
    title: "Create yearly partition for orders",
    prompt:
      "Assuming a partitioned orders table, create a partition for the year 2025.",
    starter: "CREATE TABLE orders_2025 PARTITION OF orders_partitioned",
    referenceSolution:
      "CREATE TABLE orders_2025 PARTITION OF orders_partitioned FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');",
    explanation: "Attach a new partition for a specific year range.",
    hint: "Use `FOR VALUES FROM ... TO ...` for range partitions.",
  },
  {
    id: "pg-part-005",
    type: "implementation",
    topic: "Partitioning",
    title: "Move old orders to archive partition",
    prompt:
      "Detach a partition containing old orders and attach it to an archive table.",
    starter: "ALTER TABLE orders_partitioned DETACH PARTITION orders_2020;",
    referenceSolution:
      "ALTER TABLE orders_partitioned DETACH PARTITION orders_2020; -- then ATTACH to archive table",
    explanation:
      "Detach removes the partition from the partitioned table without deleting data.",
    hint: "Use `DETACH PARTITION` and then `ATTACH PARTITION` elsewhere.",
  },
  {
    id: "pg-part-006",
    type: "implementation",
    topic: "Partitioning",
    title: "Query only current month partition",
    prompt:
      "Write a query that directly accesses the current month's partition of orders (assuming naming like `orders_2026_04`).",
    starter: "SELECT * FROM orders_2026_04",
    referenceSolution:
      "SELECT * FROM orders_2026_04 WHERE created_at >= '2026-04-01' AND created_at < '2026-05-01';",
    explanation:
      "Direct partition access avoids the partition pruning overhead.",
    hint: "Use the partition name explicitly.",
  },
  {
    id: "pg-part-007",
    type: "implementation",
    topic: "Partitioning",
    title: "Compare performance with partition vs no partition",
    prompt:
      "How would you measure the performance benefit of partitioning? Write two EXPLAIN queries.",
    starter:
      "-- On non-partitioned table\nEXPLAIN SELECT ...;\n-- On partitioned table",
    referenceSolution:
      "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders_non_partitioned WHERE created_at BETWEEN '2026-01-01' AND '2026-01-31'; -- then same on partitioned",
    explanation: "Compare the number of buffers and actual time.",
    hint: "Look for `Append` and `Subplans` in partitioned plan.",
  },
  {
    id: "pg-part-008",
    type: "implementation",
    topic: "Partitioning",
    title: "Create partitioned index",
    prompt: "Create an index on the partitioned `orders` table on `user_id`.",
    starter: "CREATE INDEX ON orders_partitioned (user_id);",
    referenceSolution:
      "CREATE INDEX idx_orders_partitioned_user_id ON orders_partitioned (user_id);",
    explanation: "PostgreSQL automatically creates indexes on each partition.",
    hint: "The syntax is the same as for a normal table.",
  },
  {
    id: "pg-part-009",
    type: "implementation",
    topic: "Partitioning",
    title: "Attach new partition",
    prompt:
      "Attach a new partition for the next month to a range‑partitioned orders table.",
    starter:
      "CREATE TABLE orders_2026_05 (LIKE orders); ALTER TABLE orders_partitioned ATTACH PARTITION",
    referenceSolution:
      "CREATE TABLE orders_2026_05 (LIKE orders INCLUDING DEFAULTS); ALTER TABLE orders_partitioned ATTACH PARTITION orders_2026_05 FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');",
    explanation: "Attaching makes the new table part of the partitioned set.",
    hint: "Ensure the partition bounds do not overlap.",
  },
  {
    id: "pg-part-010",
    type: "implementation",
    topic: "Partitioning",
    title: "Detach old partition",
    prompt:
      "Detach the partition for the year 2024 from the orders partitioned table.",
    starter: "ALTER TABLE orders_partitioned DETACH PARTITION orders_2024;",
    referenceSolution:
      "ALTER TABLE orders_partitioned DETACH PARTITION orders_2024;",
    explanation:
      "The data remains but is no longer part of the partitioned table.",
    hint: "After detaching, you can drop or archive the partition table.",
  },

  // 🟢 TOPIC 12: Advanced Real Business Queries
  {
    id: "pg-biz-001",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Monthly revenue report",
    prompt: "Show total completed payments grouped by year and month.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT DATE_TRUNC('month', created_at) AS month, SUM(amount) AS revenue FROM payments WHERE status = 'completed' GROUP BY DATE_TRUNC('month', created_at) ORDER BY month;",
    explanation: "`DATE_TRUNC` rounds to month start; then sum and group.",
    hint: "Use `DATE_TRUNC('month', created_at)`.",
  },
  {
    id: "pg-biz-002",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Top 5 customers of all time",
    prompt: "Find the 5 users with the highest total order amount.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT u.id, u.email, SUM(o.total_amount) AS total_spent FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.id ORDER BY total_spent DESC LIMIT 5;",
    explanation: "Join, aggregate, sort, limit.",
    hint: "Use `LIMIT 5` after ordering.",
  },
  {
    id: "pg-biz-003",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Daily sales breakdown",
    prompt:
      "For each day, show number of orders and total revenue (from orders).",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT DATE(created_at) AS day, COUNT(*) AS orders, SUM(total_amount) AS revenue FROM orders GROUP BY DATE(created_at) ORDER BY day;",
    explanation: "Group by date, count orders, sum totals.",
    hint: "Use `DATE(created_at)`.",
  },
  {
    id: "pg-biz-004",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Conversion rate (cart → order)",
    prompt:
      "Calculate the percentage of users who have an order out of those who have a cart.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT (COUNT(DISTINCT o.user_id)::float / COUNT(DISTINCT c.user_id)::float) * 100 AS conversion_rate FROM carts c LEFT JOIN orders o ON c.user_id = o.user_id;",
    explanation:
      "Distinct users with orders divided by distinct users with carts.",
    hint: "Cast to float to get decimal.",
  },
  {
    id: "pg-biz-005",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Average delivery time",
    prompt:
      "Assume an order has `shipped_at` and `delivered_at` columns (add them conceptually). Compute average days between shipped and delivered.",
    starter: "-- ALTER TABLE ADD COLUMN shipped_at, delivered_at; then query",
    referenceSolution:
      "SELECT AVG(delivered_at - shipped_at) AS avg_delivery_days FROM orders WHERE shipped_at IS NOT NULL AND delivered_at IS NOT NULL;",
    explanation: "Subtract timestamps to get interval, then average.",
    hint: "You can use `EXTRACT(DAY FROM ...)` if needed.",
  },
  {
    id: "pg-biz-006",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Return percentage",
    prompt: "Calculate the percentage of completed orders that have a return.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT (COUNT(DISTINCT r.order_id)::float / COUNT(DISTINCT o.id)::float) * 100 AS return_rate FROM orders o LEFT JOIN returns r ON o.id = r.order_id WHERE o.status = 'completed';",
    explanation:
      "Distinct returned orders divided by distinct completed orders.",
    hint: "Consider only completed orders as denominator.",
  },
  {
    id: "pg-biz-007",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Most refunded product",
    prompt: "Find the product that has been refunded the highest total amount.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT p.id, p.name, SUM(r.refund_amount) AS total_refunded FROM products p JOIN order_items oi ON p.id = oi.product_id JOIN returns r ON oi.order_id = r.order_id GROUP BY p.id ORDER BY total_refunded DESC LIMIT 1;",
    explanation:
      "Join chain from products → order_items → returns, sum refunds.",
    hint: "Refund amount is stored in returns table.",
  },
  {
    id: "pg-biz-008",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Stock turnover rate",
    prompt:
      "Calculate the ratio of total quantity sold to average stock quantity for each product.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT p.id, COALESCE(SUM(oi.quantity), 0) AS sold, p.stock_quantity AS current_stock, (COALESCE(SUM(oi.quantity), 0)::float / NULLIF(p.stock_quantity, 0)) AS turnover FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id GROUP BY p.id;",
    explanation:
      "Turnover = units sold / average stock (here using current stock as proxy).",
    hint: "Use `NULLIF` to avoid division by zero.",
  },
  {
    id: "pg-biz-009",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Revenue by category",
    prompt: "Show total revenue generated from each product category.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT p.category, SUM(oi.quantity * oi.price_at_time) AS revenue FROM products p JOIN order_items oi ON p.id = oi.product_id GROUP BY p.category ORDER BY revenue DESC;",
    explanation:
      "Join products to order_items, group by category, sum revenue.",
    hint: "Categories may be NULL – handle accordingly.",
  },
  {
    id: "pg-biz-010",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Revenue by payment method",
    prompt: "Show total order amount for each payment method (cc, dc, cod).",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT payment_method, SUM(total_amount) FROM orders GROUP BY payment_method;",
    explanation: "Group directly on the orders table's payment_method.",
    hint: "Use `GROUP BY payment_method`.",
  },
  {
    id: "pg-biz-011",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Active users in last 30 days",
    prompt:
      "Find users who have placed at least one order in the past 30 days.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT DISTINCT u.* FROM users u JOIN orders o ON u.id = o.user_id WHERE o.created_at > NOW() - INTERVAL '30 days';",
    explanation:
      "Join users with recent orders, use DISTINCT to avoid duplicates.",
    hint: "Use `NOW() - INTERVAL '30 days'`.",
  },
  {
    id: "pg-biz-012",
    type: "implementation",
    topic: "Advanced Real Business Queries",
    title: "Cart abandonment list",
    prompt:
      "List users who have a cart older than 7 days but never placed any order.",
    starter: "-- Write your query",
    referenceSolution:
      "SELECT u.* FROM users u JOIN carts c ON u.id = c.user_id LEFT JOIN orders o ON u.id = o.user_id WHERE c.created_at < NOW() - INTERVAL '7 days' AND o.id IS NULL;",
    explanation: "Join carts, left join orders, filter old cart and no order.",
    hint: "Use `LEFT JOIN` and `o.id IS NULL`.",
  },
];
