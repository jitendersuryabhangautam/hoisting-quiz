export const backendQuestions = [
  {
    id: "go-goroutines",
    type: "concept",
    topic: "Go",
    title: "Goroutines vs Threads",
    prompt: "What are goroutines and how do they differ from OS threads?",
    expected:
      "Goroutines are lightweight concurrent functions managed by Go runtime, with small stack size and multiplexed onto OS threads.",
    keywords: ["goroutine", "concurrency", "thread"],
    explanation:
      "Goroutines are functions that run concurrently in Go. Unlike OS threads, goroutines are managed by the Go scheduler, have a tiny initial stack (2KB) that grows dynamically, and are multiplexed onto a smaller number of OS threads. This allows hundreds of thousands of goroutines to run efficiently. Goroutines communicate via channels, promoting the mantra 'Do not communicate by sharing memory; instead, share memory by communicating.' They are cheap to create and schedule, making concurrency idiomatic in Go.",
    code: `func main() {
    go printNumbers() // starts a new goroutine
    time.Sleep(time.Second) // wait for it to finish (real code would use sync.WaitGroup)
}
func printNumbers() {
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }
}`,
  },
  {
    id: "go-channels",
    type: "concept",
    topic: "Go",
    title: "Channels in Go",
    prompt: "What are channels and how are they used for communication?",
    expected:
      "Channels are typed conduits for goroutines to communicate and synchronize; they can be buffered or unbuffered.",
    keywords: ["channel", "goroutine", "synchronization"],
    explanation:
      "Channels provide a way for goroutines to communicate and synchronize. They are typed (e.g., chan int) and can be unbuffered (block until both sender and receiver are ready) or buffered (block only when buffer is full). Channels can be used to pass data and signals between goroutines. The `select` statement allows a goroutine to wait on multiple channel operations. Closing a channel indicates no more values will be sent. Channels are a fundamental concurrency primitive in Go, enabling safe communication without explicit locks.",
    code: `func worker(jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}
func main() {
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    go worker(jobs, results)
    for i := 0; i < 5; i++ {
        jobs <- i
    }
    close(jobs)
    for res := range results {
        fmt.Println(res)
    }
}`,
  },
  {
    id: "go-interfaces",
    type: "concept",
    topic: "Go",
    title: "Interfaces and Implicit Implementation",
    prompt: "How do interfaces work in Go?",
    expected:
      "Interfaces define behavior; types implement them implicitly by providing methods, enabling polymorphism and decoupling.",
    keywords: ["interface", "implicit", "polymorphism"],
    explanation:
      "In Go, an interface is a set of method signatures. A type automatically implements an interface if it defines all the methods. There's no explicit 'implements' keyword. This allows for flexible, decoupled designs and easy mocking. The empty interface `interface{}` can hold any value (like `any`). Interfaces are satisfied implicitly, which encourages small, focused interfaces (e.g., `io.Reader`, `io.Writer`). This is a key aspect of Go's type system, promoting composition over inheritance.",
    code: `type Speaker interface {
    Speak() string
}
type Dog struct{}
func (d Dog) Speak() string { return "Woof!" }
type Cat struct{}
func (c Cat) Speak() string { return "Meow!" }
func saySomething(s Speaker) {
    fmt.Println(s.Speak())
}
func main() {
    dog := Dog{}
    cat := Cat{}
    saySomething(dog)
    saySomething(cat)
}`,
  },
  {
    id: "go-error-handling",
    type: "concept",
    topic: "Go",
    title: "Error Handling in Go",
    prompt: "How does error handling work in Go compared to try/catch?",
    expected:
      "Go uses explicit error returns; functions return an error value that the caller must check, promoting clear control flow.",
    keywords: ["error", "handling", "panic"],
    explanation:
      "Go's error handling is explicit: functions often return an error as the last value. The caller is expected to check and handle it. This avoids exceptions and makes error paths visible. For exceptional cases, `panic` can be used, but it's typically reserved for unrecoverable states. The `defer` statement ensures cleanup. This design encourages robust error handling but can lead to repetitive `if err != nil` blocks. Common patterns include wrapping errors with `fmt.Errorf` (using `%w` for unwrapping) and using `errors.Is` and `errors.As` to inspect errors.",
    code: `func readFile(filename string) (string, error) {
    data, err := os.ReadFile(filename)
    if err != nil {
        return "", fmt.Errorf("readFile: %w", err)
    }
    return string(data), nil
}
func main() {
    content, err := readFile("example.txt")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(content)
}`,
  },
  {
    id: "go-structs",
    type: "concept",
    topic: "Go",
    title: "Structs and Methods",
    prompt: "How do structs and methods work in Go?",
    expected:
      "Structs are composite data types; methods can be defined on struct types, supporting object-oriented-like behavior without classes.",
    keywords: ["struct", "method", "receiver"],
    explanation:
      "A struct is a collection of fields. Methods can be attached to any named type (including structs) using receivers, which can be value or pointer receivers. Methods promote encapsulation and enable interface satisfaction. Go doesn't have inheritance but supports composition via embedding (struct embedding). Methods are similar to functions but with a receiver parameter, allowing a form of polymorphism through interfaces. Structs can be instantiated using literals or the `new` keyword.",
    code: `type Person struct {
    Name string
    Age  int
}
// Value receiver
func (p Person) Greet() string {
    return fmt.Sprintf("Hello, I'm %s", p.Name)
}
// Pointer receiver (can modify)
func (p *Person) Birthday() {
    p.Age++
}
func main() {
    p := Person{Name: "Alice", Age: 30}
    fmt.Println(p.Greet())
    p.Birthday()
}`,
  },
  {
    id: "dbms-acid",
    type: "concept",
    topic: "PostgreSQL",
    title: "ACID Properties",
    prompt: "What are ACID properties in database transactions?",
    expected:
      "Atomicity, Consistency, Isolation, Durability - guarantees for reliable transaction processing.",
    keywords: ["acid", "transactions", "database"],
    explanation:
      "ACID is a set of properties ensuring reliable transaction processing. Atomicity: all operations in a transaction succeed or fail together. Consistency: a transaction brings the database from one valid state to another, preserving integrity constraints. Isolation: concurrent transactions appear to run sequentially. Durability: committed changes persist even after a system failure. These properties are fundamental for data integrity, especially in critical applications like financial systems. Different isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) provide trade-offs between concurrency and consistency.",
    code: `-- Example transaction in PostgreSQL
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- If both succeed
COMMIT;
-- If error occurs, rollback
ROLLBACK;`,
  },
  {
    id: "dbms-indexing",
    type: "concept",
    topic: "PostgreSQL",
    title: "Database Indexing",
    prompt: "What is an index and how does it improve query performance?",
    expected:
      "An index is a data structure (e.g., B-tree) that speeds up data retrieval at the cost of additional storage and write overhead.",
    keywords: ["index", "b-tree", "performance"],
    explanation:
      "Indexes are data structures that provide fast access to rows based on column values. Without an index, the database performs a full table scan (O(n)). With an index (typically B-tree), lookups become O(log n). Indexes also support unique constraints and sorting. However, they add overhead on INSERT/UPDATE/DELETE operations. Index selection should consider query patterns: composite indexes for multiple columns, covering indexes to include all needed columns, and functional indexes for expressions. Monitoring with `EXPLAIN` helps identify missing or unused indexes.",
    code: `-- Create index on single column
CREATE INDEX idx_users_email ON users(email);
-- Composite index
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;
-- See query plan
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@example.com';`,
  },
  {
    id: "postgresql-jsonb",
    type: "concept",
    topic: "PostgreSQL",
    title: "JSONB in PostgreSQL",
    prompt: "What is JSONB and when should you use it?",
    expected:
      "JSONB is a binary JSON data type that supports indexing and efficient querying, bridging relational and document storage.",
    keywords: ["jsonb", "postgresql", "nosql"],
    explanation:
      "JSONB stores JSON data in a decomposed binary format, allowing efficient indexing and querying. Unlike JSON type (which stores text), JSONB supports GIN indexes for fast searches on keys and values. It's ideal for semi-structured data, dynamic schemas, or when integrating with microservices. JSONB operators (`->`, `->>`, `@>`, `?`) enable powerful queries. It can be combined with relational features (foreign keys, transactions) to get the best of both worlds. However, using JSONB extensively may lead to complex queries and less strict data validation.",
    code: `-- Create table with JSONB column
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    attributes JSONB
);
-- Insert data
INSERT INTO products (name, attributes) VALUES
('Laptop', '{"brand": "Dell", "ram": 16, "ssd": 512}');
-- Query by key
SELECT * FROM products WHERE attributes->>'brand' = 'Dell';
-- Index for JSONB
CREATE INDEX idx_products_attributes ON products USING GIN (attributes);
-- Search for existence of key
SELECT * FROM products WHERE attributes ? 'ssd';`,
  },
  {
    id: "postgresql-window-functions",
    type: "concept",
    topic: "PostgreSQL",
    title: "Window Functions",
    prompt: "What are window functions and how do they differ from GROUP BY?",
    expected:
      "Window functions perform calculations across a set of rows related to the current row without collapsing them, enabling ranking, running totals, etc.",
    keywords: ["window functions", "over", "partition"],
    explanation:
      "Window functions operate on a 'window' of rows defined by the `OVER` clause. Unlike `GROUP BY`, they do not collapse rows; each row retains its identity while gaining aggregated values. Common functions: `ROW_NUMBER()`, `RANK()`, `SUM()`, `AVG()`, `LAG()`, `LEAD()`. They are powerful for analytics, ranking, time-series calculations, and calculating differences between rows. Window functions can be partitioned (by `PARTITION BY`) and ordered (by `ORDER BY`) within the window. They often simplify complex queries that would otherwise require self-joins or subqueries.",
    code: `-- Rank employees by salary within each department
SELECT
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;
-- Running total of sales per day
SELECT
    sale_date,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) as running_total
FROM sales;
-- Compare to previous month's sales
SELECT
    month,
    sales,
    LAG(sales, 1) OVER (ORDER BY month) as prev_month_sales
FROM monthly_revenue;`,
  },
  {
    id: "postgresql-cte",
    type: "concept",
    topic: "PostgreSQL",
    title: "Common Table Expressions (CTE)",
    prompt: "What are CTEs and when would you use them?",
    expected:
      "CTEs (WITH queries) define temporary named result sets that can be referenced within a query, improving readability and enabling recursion.",
    keywords: ["cte", "with", "recursive"],
    explanation:
      "CTEs are temporary result sets defined with `WITH` that can be used in `SELECT`, `INSERT`, `UPDATE`, or `DELETE`. They improve query readability by breaking complex queries into named steps. CTEs can be recursive (using `WITH RECURSIVE`), which is essential for traversing hierarchical data (like org charts, bill of materials). While CTEs are materialized by default (except with optimization), they can help organize complex logic. Recursive CTEs are a powerful tool for graph and tree structures.",
    code: `-- Simple CTE
WITH high_value_orders AS (
    SELECT customer_id, SUM(amount) as total
    FROM orders
    GROUP BY customer_id
    HAVING SUM(amount) > 1000
)
SELECT c.name, h.total
FROM customers c
JOIN high_value_orders h ON c.id = h.customer_id;
-- Recursive CTE for tree traversal (org chart)
WITH RECURSIVE org_tree AS (
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id, ot.level + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT * FROM org_tree;`,
  },
  {
    id: "postgresql-explain",
    type: "concept",
    topic: "PostgreSQL",
    title: "EXPLAIN and Query Optimization",
    prompt: "How do you analyze and optimize slow queries using EXPLAIN?",
    expected:
      "EXPLAIN shows query execution plan; ANALYZE executes it, revealing actual costs, row estimates, and operations (sequential scan, index scan, join types).",
    keywords: ["explain", "optimization", "query plan"],
    explanation:
      "`EXPLAIN` displays the execution plan the planner generates, showing operations like sequential scans, index scans, joins, etc. `EXPLAIN ANALYZE` actually runs the query and shows real row counts and timings. Key indicators: high cost, mismatched row estimates, sequential scans on large tables, nested loops with large rows. Optimization techniques: add appropriate indexes, analyze tables (to update statistics), rewrite queries (avoid functions in WHERE), use covering indexes, or change join strategies. The `auto_explain` module can log plans for slow queries automatically. Understanding query plans is critical for database performance tuning.",
    code: `-- Basic explain
EXPLAIN SELECT * FROM orders WHERE customer_id = 123;
-- With analyze (runs the query)
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE customer_id = 123;
-- Common optimization: add index
CREATE INDEX idx_orders_customer ON orders(customer_id);
-- Then re-run explain to see index scan instead of seq scan`,
  },
  {
    id: "backend-restful-api",
    type: "concept",
    topic: "Backend",
    title: "RESTful API Design Principles",
    prompt: "What are the key principles for designing a RESTful API?",
    expected:
      "Use resources, HTTP methods, statelessness, proper status codes, and versioning; follow naming conventions and idempotency.",
    keywords: ["rest", "api design", "http"],
    explanation:
      "REST (Representational State Transfer) is an architectural style for APIs. Key principles: resources identified by URIs, manipulation via HTTP methods (GET, POST, PUT, PATCH, DELETE), statelessness (no session state stored on server), use of proper status codes (200, 201, 400, 404, 500), and idempotency (GET, PUT, DELETE are idempotent). Resources should be nouns, not verbs (e.g., `/users` not `/getUsers`). Versioning can be via URL or headers. Responses should be consistent (JSON), include hypermedia (HATEOAS) optionally. Good API design improves maintainability, developer experience, and client consumption.",
    code: `// Example RESTful endpoints
GET    /api/v1/users           // List users
POST   /api/v1/users           // Create user
GET    /api/v1/users/{id}      // Get user
PUT    /api/v1/users/{id}      // Replace user (idempotent)
PATCH  /api/v1/users/{id}      // Partial update
DELETE /api/v1/users/{id}      // Delete user
// Status codes
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error`,
  },
  {
    id: "backend-middleware",
    type: "concept",
    topic: "Backend",
    title: "Middleware in Backend Frameworks",
    prompt: "What is middleware and how is it used in backend development?",
    expected:
      "Middleware functions intercept requests before they reach route handlers, enabling cross-cutting concerns like logging, auth, compression, and error handling.",
    keywords: ["middleware", "request pipeline", "express"],
    explanation:
      "Middleware functions are executed sequentially in the request-response cycle. They have access to the request and response objects and can modify them, end the response, or call the next middleware. Common use cases: authentication, logging, request parsing, CORS, compression, rate limiting, and error handling. Middleware promotes separation of concerns and code reusability. In frameworks like Express (Node.js), Gin (Go), or Django (Python), middleware can be global or route-specific. Error-handling middleware has an extra `err` parameter and should be placed after all other middleware.",
    code: `// Express.js middleware example
// Logging middleware
app.use((req, res, next) => {
    console.log(\`\${req.method} \${req.url}\`);
    next();
});
// Authentication middleware (route-specific)
const requireAuth = (req, res, next) => {
    if (req.session.user) return next();
    res.status(401).json({ error: 'Unauthorized' });
};
app.get('/profile', requireAuth, (req, res) => {
    res.json({ user: req.session.user });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});`,
  },
  {
    id: "backend-authentication",
    type: "concept",
    topic: "Backend",
    title: "Authentication vs Authorization",
    prompt: "What is the difference between authentication and authorization?",
    expected:
      "Authentication verifies identity; authorization determines what an authenticated user is allowed to do.",
    keywords: ["authentication", "authorization", "security"],
    explanation:
      "Authentication is the process of verifying a user's identity (e.g., via password, token, biometrics). Authorization determines which resources or operations the authenticated user can access. Common authentication methods: session-based (cookies), token-based (JWT), OAuth2, or SSO. Authorization often involves roles (RBAC) or permissions (ABAC). It's crucial to separate concerns: authentication validates credentials, then authorization enforces policies. Implementing both correctly is vital for security.",
    code: `// Pseudocode for auth flow
// 1. Authentication (login)
POST /login
{ username, password }
-> validate credentials
-> create session/JWT
-> return token/cookie
// 2. Authorization middleware
func RequireRole(role string) gin.HandlerFunc {
    return func(c *gin.Context) {
        user := c.MustGet("user").(User)
        if !user.HasRole(role) {
            c.JSON(403, gin.H{"error": "forbidden"})
            c.Abort()
            return
        }
        c.Next()
    }
}
// Usage: require 'admin' role
router.GET("/admin", RequireRole("admin"), adminHandler)`,
  },
  {
    id: "backend-caching",
    type: "concept",
    topic: "Backend",
    title: "Caching Strategies",
    prompt: "What are common caching strategies for backend systems?",
    expected:
      "Strategies include cache-aside, write-through, write-behind, and cache invalidation, using tools like Redis or Memcached.",
    keywords: ["cache", "redis", "performance"],
    explanation:
      "Caching stores frequently accessed data to reduce latency and database load. Cache-aside: application reads from cache; if miss, reads DB and populates cache. Write-through: writes update both cache and DB synchronously. Write-behind (write-back): writes update cache immediately, DB asynchronously. Cache invalidation is hard; common patterns include time-based expiration, event-based invalidation (e.g., on update), or versioning. Redis and Memcached are popular in-memory stores. Caching can be applied at multiple levels: CDN, API gateway, application, database query cache. Proper caching improves response times and scalability.",
    code: `// Redis cache-aside in Go
func GetUser(id string) (*User, error) {
    // Try cache
    val, err := redisClient.Get(ctx, "user:"+id).Result()
    if err == nil {
        var user User
        json.Unmarshal([]byte(val), &user)
        return &user, nil
    }
    // Cache miss, get from DB
    user, err := db.GetUser(id)
    if err != nil {
        return nil, err
    }
    // Store in cache
    data, _ := json.Marshal(user)
    redisClient.Set(ctx, "user:"+id, data, 10*time.Minute)
    return user, nil
}`,
  },
  {
    id: "backend-api-versioning",
    type: "concept",
    topic: "Backend",
    title: "API Versioning Strategies",
    prompt: "What are the strategies for versioning REST APIs?",
    expected:
      "URL path (e.g., /v1/), query parameter (?version=1), header (Accept-Version), or content negotiation.",
    keywords: ["versioning", "api", "backward compatibility"],
    explanation:
      "API versioning allows introducing breaking changes without disrupting existing clients. Common strategies: 1) URL path: `/v1/users` (most common, visible). 2) Query parameter: `/users?version=1`. 3) Custom header: `Accept-Version: v1`. 4) Content negotiation via Accept header. Each has trade-offs. URL path is simple and cache-friendly; header versioning keeps URLs clean but can be less discoverable. Backward compatibility can also be achieved through adding optional fields, not removing existing ones. Versioning should be planned early to avoid refactoring pain.",
    code: `// URL path versioning (Express)
const v1Router = express.Router();
v1Router.get('/users', (req, res) => { ... });
app.use('/v1', v1Router);
// Header versioning
app.use('/api', (req, res, next) => {
    const version = req.headers['api-version'] || '1.0';
    req.apiVersion = version;
    next();
});
app.get('/api/users', (req, res) => {
    if (req.apiVersion === '2.0') {
        // handle v2 response
    } else {
        // handle v1
    }
});`,
  },
  {
    id: "backend-database-transactions",
    type: "concept",
    topic: "Backend",
    title: "Managing Database Transactions",
    prompt: "How do you handle database transactions in backend applications?",
    expected:
      "Use transaction boundaries with BEGIN/COMMIT/ROLLBACK, ensure proper error handling, and consider isolation levels.",
    keywords: ["transaction", "database", "isolation"],
    explanation:
      "Transactions ensure data consistency when performing multiple operations. In backend code, you typically start a transaction, execute queries, and commit if all succeed, otherwise rollback. Key considerations: keep transactions short to avoid locks; handle errors to rollback; choose appropriate isolation level (Read Committed is default in PostgreSQL); watch for deadlocks. In Go with `database/sql`, you can use `db.Begin()`, `tx.Commit()`, and `tx.Rollback()`. In web frameworks, transaction middleware can help. Distributed transactions (across multiple services) require more complex patterns like Saga.",
    code: `// Transaction in Go
func TransferMoney(db *sql.DB, from, to int, amount float64) error {
    tx, err := db.Begin()
    if err != nil {
        return err
    }
    // Defer rollback in case of panic or error
    defer tx.Rollback()
    _, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, from)
    if err != nil {
        return err
    }
    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, to)
    if err != nil {
        return err
    }
    return tx.Commit()
}`,
  },
  {
    id: "backend-rate-limiting",
    type: "concept",
    topic: "Backend",
    title: "Rate Limiting",
    prompt: "What is rate limiting and how is it implemented?",
    expected:
      "Rate limiting restricts request frequency to prevent abuse and ensure fair usage, often using algorithms like token bucket or sliding window.",
    keywords: ["rate limit", "throttling", "security"],
    explanation:
      "Rate limiting controls the number of requests a client can make in a given time window. It protects APIs from abuse (DoS, brute force) and ensures resource availability. Common algorithms: Token Bucket (allows bursts), Leaky Bucket (smooths traffic), Fixed Window (simple but can cause bursts at boundaries), Sliding Window (more accurate). Implementation often uses Redis for distributed counting. Headers like `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After` inform clients. Rate limiting can be applied per user, IP, API key, or globally.",
    code: `// Token bucket rate limiter in Go (using redis)
func RateLimit(ctx context.Context, key string, limit int, window time.Duration) bool {
    pipe := redisClient.TxPipeline()
    pipe.Incr(ctx, key)
    pipe.Expire(ctx, key, window)
    res, _ := pipe.Exec(ctx)
    count, _ := res[0].(*redis.IntCmd).Result()
    return count <= int64(limit)
}
// Middleware example
func RateLimitMiddleware(limit int, window time.Duration) gin.HandlerFunc {
    return func(c *gin.Context) {
        clientIP := c.ClientIP()
        if !RateLimit(c.Request.Context(), clientIP, limit, window) {
            c.AbortWithStatusJSON(429, gin.H{"error": "Too Many Requests"})
            return
        }
        c.Next()
    }
}`,
  },
  {
    id: "backend-metrics-logging",
    type: "concept",
    topic: "Backend",
    title: "Observability: Logging, Metrics, Tracing",
    prompt: "What are the three pillars of observability?",
    expected:
      "Logging (structured events), metrics (aggregated counters/gauges), and tracing (distributed request flows).",
    keywords: ["observability", "logging", "metrics", "tracing"],
    explanation:
      "Observability helps understand system behavior. Logging: structured events with context (JSON). Metrics: aggregated numerical data (request rates, latency, error rates) for dashboards and alerts. Tracing: follows a request across services, identifying bottlenecks and failures. Tools: ELK/Loki for logs, Prometheus for metrics, Jaeger/Zipkin for tracing. Best practices: log in structured format, include request IDs, use correlation IDs across services, instrument with OpenTelemetry. Good observability reduces debugging time and improves reliability.",
    code: `// Structured logging with slog (Go 1.21+)
import "log/slog"
slog.Info("user created",
    "user_id", user.ID,
    "email", user.Email,
    "request_id", requestID,
)
// Prometheus metrics
var httpRequests = prometheus.NewCounterVec(
    prometheus.CounterOpts{
        Name: "http_requests_total",
        Help: "Total number of HTTP requests",
    },
    []string{"method", "endpoint", "status"},
)
// In middleware
httpRequests.WithLabelValues(r.Method, r.URL.Path, strconv.Itoa(status)).Inc()`,
  },
  {
    id: "dbms-joins",
    type: "concept",
    topic: "PostgreSQL",
    title: "SQL Joins",
    prompt: "Explain the different types of SQL joins and when to use them.",
    expected:
      "INNER JOIN (matching rows), LEFT/RIGHT JOIN (all rows from left/right), FULL JOIN (all rows from both), CROSS JOIN (Cartesian product).",
    keywords: ["join", "inner join", "outer join"],
    explanation:
      "Joins combine rows from two or more tables based on a related column. INNER JOIN returns only rows with matching keys in both tables. LEFT JOIN returns all rows from left table, with matching rows from right (nulls if no match). RIGHT JOIN is the opposite. FULL JOIN returns all rows from both tables, with nulls where no match. CROSS JOIN gives Cartesian product (rarely used). Understanding join types is essential for retrieving related data efficiently. Join order and indexes heavily impact performance; use EXPLAIN to analyze.",
    code: `-- INNER JOIN: customers with orders
SELECT c.name, o.order_date
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;
-- LEFT JOIN: all customers, even without orders
SELECT c.name, COUNT(o.id) as order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.name;
-- FULL JOIN: combine employees and departments
SELECT e.name, d.name
FROM employees e
FULL JOIN departments d ON e.dept_id = d.id;`,
  },
  {
    id: "dbms-normalization",
    type: "concept",
    topic: "PostgreSQL",
    title: "Database Normalization",
    prompt: "What is database normalization and what are the normal forms?",
    expected:
      "Normalization reduces data redundancy and anomalies through progressive rules: 1NF (atomic), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF.",
    keywords: ["normalization", "normal forms", "redundancy"],
    explanation:
      "Normalization organizes data to minimize redundancy and improve integrity. 1NF: atomic values, no repeating groups. 2NF: in 1NF and no partial dependency on composite keys. 3NF: in 2NF and no transitive dependency (non-key attributes depend only on primary key). BCNF is stricter. Higher normal forms exist but are rarely used. Denormalization (introducing redundancy) may be done for performance in read-heavy applications. Understanding normalization helps design clean, maintainable schemas.",
    code: `-- Unnormalized (repeating groups)
Customers (id, name, orders) -> orders stored as comma-separated
-- 1NF: separate order rows
Customers (id, name)
Orders (id, customer_id, product)
-- 2NF: if composite key (order_id, product_id) but product_name depends only on product_id -> split
OrderItems (order_id, product_id, quantity)
Products (product_id, product_name)
-- 3NF: remove transitive dependency (e.g., customer_zip depends on customer_id, but we store customer_city)
Customers (id, name, zip)
Zips (zip, city)`,
  },
  {
    id: "postgresql-index-types",
    type: "concept",
    topic: "PostgreSQL",
    title: "PostgreSQL Index Types",
    prompt:
      "What index types are available in PostgreSQL and when to use them?",
    expected:
      "B-tree (default, general purpose), GIN (array, JSONB, full-text), GiST (geometric, range), BRIN (very large tables, block ranges).",
    keywords: ["index types", "gin", "gist", "brin"],
    explanation:
      "PostgreSQL supports several index types for different use cases: B-tree is default for equality and range queries. GIN (Generalized Inverted Index) is for composite types: arrays, JSONB, full-text search (tsvector). GiST is for geometric data, range types, and custom operators. BRIN (Block Range INdex) is compact for very large tables where values are correlated with physical location. SP-GiST is for space-partitioned data. Choosing the right index type can dramatically improve performance for specific query patterns.",
    code: `-- B-tree (default)
CREATE INDEX idx_users_email ON users(email);
-- GIN for JSONB
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);
-- GIN for full-text search
CREATE INDEX idx_posts_fts ON posts USING GIN (to_tsvector('english', content));
-- BRIN for huge time-series data
CREATE INDEX idx_sensor_time ON sensor_data USING BRIN (timestamp);`,
  },
  {
    id: "go-concurrency-patterns",
    type: "concept",
    topic: "Go",
    title: "Common Concurrency Patterns",
    prompt: "What are common concurrency patterns in Go?",
    expected:
      "Worker pools, fan-out/fan-in, pipeline, context cancellation, and select with timeouts.",
    keywords: ["concurrency", "patterns", "worker pool"],
    explanation:
      "Go provides powerful concurrency primitives. Common patterns: Worker pool: fixed number of workers processing jobs from a channel. Fan-out/fan-in: distribute work to multiple goroutines and combine results. Pipeline: stage-based processing with channels. Context: propagate cancellation and deadlines across goroutines. Select with default: non-blocking channel operations. These patterns help structure concurrent programs for efficiency and reliability.",
    code: `// Worker pool
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}
func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    for w := 0; w < 5; w++ {
        go worker(w, jobs, results)
    }
    for j := 0; j < 50; j++ {
        jobs <- j
    }
    close(jobs)
    for r := 0; r < 50; r++ {
        <-results
    }
}
// Context with timeout
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
select {
case <-ctx.Done():
    fmt.Println("timeout")
case result := <-longRunningTask(ctx):
    fmt.Println(result)
}`,
  },
  {
    id: "go-context",
    type: "concept",
    topic: "Go",
    title: "Context Package",
    prompt: "What is the context package and how is it used in Go?",
    expected:
      "Context carries deadlines, cancellation signals, and request-scoped values across API boundaries and goroutines.",
    keywords: ["context", "cancellation", "deadline"],
    explanation:
      "The context package provides a standard way to manage deadlines, cancellation signals, and request-scoped values. It's particularly important for handling timeouts and graceful shutdown in server applications. Contexts are passed as the first argument to functions (usually named ctx). They can be derived from parent contexts using WithCancel, WithTimeout, WithDeadline, or WithValue. A context's Done channel signals cancellation. Proper context usage prevents goroutine leaks and improves application reliability.",
    code: `// Server with context timeout
func handleRequest(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
    defer cancel()
    result, err := doWork(ctx)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    w.Write([]byte(result))
}
// Function respecting context
func doWork(ctx context.Context) (string, error) {
    select {
    case <-time.After(3 * time.Second):
        return "done", nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}`,
  },
  {
    id: "go-sync-package",
    type: "concept",
    topic: "Go",
    title: "Sync Package: Mutex, WaitGroup, Once",
    prompt: "What synchronization primitives does the sync package provide?",
    expected:
      "Mutex (mutual exclusion), RWMutex (read-write lock), WaitGroup (goroutine coordination), Once (single execution), Cond (condition variables).",
    keywords: ["mutex", "waitgroup", "sync", "once"],
    explanation:
      "The sync package provides low-level synchronization primitives. Mutex ensures mutual exclusion; RWMutex allows multiple readers or one writer. WaitGroup waits for a collection of goroutines to finish. Once executes a function exactly once, useful for initialization. Cond provides condition variables for goroutines waiting on certain conditions. For most cases, use channels for communication, but sync primitives are essential for protecting shared state.",
    code: `// Mutex for protecting shared counter
type Counter struct {
    mu    sync.Mutex
    value int
}
func (c *Counter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}
// WaitGroup for goroutine coordination
var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        // do work
    }()
}
wg.Wait()
// Once for singleton initialization
var once sync.Once
var instance *MyType
func GetInstance() *MyType {
    once.Do(func() {
        instance = &MyType{}
    })
    return instance
}`,
  },
  {
    id: "go-embed",
    type: "concept",
    topic: "Go",
    title: "Embed Directive",
    prompt: "What is the embed directive and when would you use it?",
    expected:
      "//go:embed allows embedding static files (templates, assets) into the binary at compile time, simplifying deployment.",
    keywords: ["embed", "files", "static assets"],
    explanation:
      "The embed directive (introduced in Go 1.16) embeds files and directories into the Go binary during compilation. This eliminates the need to distribute separate asset files, simplifying deployment. Files are embedded as string, []byte, or embed.FS (a read-only filesystem). Common uses: embedding templates, static web assets, configuration files, or SQL migration scripts.",
    code: `import _ "embed"
//go:embed index.html
var indexHTML string
//go:embed static/*
var staticFS embed.FS
func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte(indexHTML))
    })
    http.Handle("/static/", http.FileServer(http.FS(staticFS)))
    http.ListenAndServe(":8080", nil)
}`,
  },
  {
    id: "dbms-mvcc",
    type: "concept",
    topic: "DBMS",
    title: "MVCC (Multi-Version Concurrency Control)",
    prompt: "How does MVCC work in databases like PostgreSQL?",
    expected:
      "MVCC keeps multiple versions of rows, allowing readers to see a consistent snapshot without blocking writers, improving concurrency.",
    keywords: ["mvcc", "snapshot", "concurrency"],
    explanation:
      "MVCC is a concurrency control method that maintains multiple versions of a row. When a transaction reads, it sees a snapshot of the database at a point in time (based on transaction ID), without being blocked by concurrent writes. PostgreSQL implements MVCC using row versioning with xmin/xmax transaction IDs. This allows high concurrency: readers never block writers, and writers never block readers. MVCC is fundamental to PostgreSQL's performance under concurrent workloads.",
    code: `-- In PostgreSQL, you can see row versions with system columns
SELECT xmin, xmax, cmin, cmax, * FROM my_table;
-- xmin: transaction ID that inserted the row
-- xmax: transaction ID that deleted/updated the row (0 if active)
-- Visibility rules: rows are visible if xmin is committed and xmax is not committed`,
  },
  {
    id: "postgresql-partitioning",
    type: "concept",
    topic: "PostgreSQL",
    title: "Table Partitioning",
    prompt: "What is table partitioning and when should you use it?",
    expected:
      "Partitioning splits a large table into smaller physical pieces (by range, list, or hash) to improve query performance and maintenance.",
    keywords: ["partitioning", "performance", "declarative"],
    explanation:
      "Partitioning divides a large table into smaller, more manageable pieces called partitions, based on a partition key (range, list, or hash). Benefits include: improved query performance (partition pruning), easier maintenance (dropping old partitions), and better bulk data loading. PostgreSQL supports declarative partitioning (since v10). Common use cases: time-series data (partition by date), geographical data (by region), or any table with natural partition key. Partitions are also useful for data archiving.",
    code: `-- Range partitioning by date
CREATE TABLE sales (
    id SERIAL,
    sale_date DATE NOT NULL,
    amount DECIMAL
) PARTITION BY RANGE (sale_date);
-- Create partitions
CREATE TABLE sales_2024_q1 PARTITION OF sales
    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
CREATE TABLE sales_2024_q2 PARTITION OF sales
    FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
-- Queries automatically prune to relevant partitions
EXPLAIN SELECT * FROM sales WHERE sale_date BETWEEN '2024-02-01' AND '2024-02-28';`,
  },
  {
    id: "postgresql-full-text-search",
    type: "concept",
    topic: "PostgreSQL",
    title: "Full-Text Search",
    prompt: "How does full-text search work in PostgreSQL?",
    expected:
      "Uses tsvector (lexemes) and tsquery (search terms) with GIN indexes for efficient text search, including ranking and language-specific dictionaries.",
    keywords: ["full-text search", "tsvector", "tsquery"],
    explanation:
      "PostgreSQL provides built-in full-text search using tsvector and tsquery types. tsvector stores lexemes (normalized words) and their positions; tsquery represents search terms. Use to_tsvector and to_tsquery functions, and create GIN indexes for performance. Features include ranking with ts_rank, stemming, stop words, and dictionary support. This is a powerful alternative to external search engines for many applications.",
    code: `-- Create a table with text
CREATE TABLE articles (
    id SERIAL,
    title TEXT,
    body TEXT,
    document tsvector
);
-- Update the tsvector column
UPDATE articles SET document = to_tsvector('english', title || ' ' || body);
-- Create GIN index
CREATE INDEX idx_articles_search ON articles USING GIN(document);
-- Search query
SELECT * FROM articles
WHERE document @@ to_tsquery('english', 'postgresql & indexing');
-- Rank results
SELECT title, ts_rank(document, query) as rank
FROM articles, to_tsquery('english', 'postgresql') query
WHERE document @@ query
ORDER BY rank DESC;`,
  },
  {
    id: "backend-graceful-shutdown",
    type: "concept",
    topic: "Backend",
    title: "Graceful Shutdown",
    prompt: "What is graceful shutdown and how do you implement it?",
    expected:
      "Graceful shutdown allows a server to finish existing requests before terminating, preventing client errors and data loss.",
    keywords: ["graceful shutdown", "signal", "cleanup"],
    explanation:
      "Graceful shutdown ensures that a server stops accepting new connections while completing existing requests, then closes resources. In Go, this involves listening for OS signals (SIGINT, SIGTERM), stopping the HTTP server with a context, and performing cleanup (closing database connections, flushing logs). Without graceful shutdown, abrupt termination can cause connection resets, incomplete transactions, or corrupted state.",
    code: `func main() {
    server := &http.Server{Addr: ":8080", Handler: router}
    // Run server in goroutine
    go func() {
        if err := server.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()
    // Wait for interrupt signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    log.Println("Shutting down server...")
    // Allow up to 30 seconds for existing connections
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    if err := server.Shutdown(ctx); err != nil {
        log.Fatal("Server forced shutdown:", err)
    }
    log.Println("Server exited gracefully")
}`,
  },
  {
    id: "backend-circuit-breaker",
    type: "concept",
    topic: "Backend",
    title: "Circuit Breaker Pattern",
    prompt: "What is the circuit breaker pattern and why is it used?",
    expected:
      "Circuit breaker prevents cascading failures by stopping requests to a failing service, allowing it time to recover.",
    keywords: ["circuit breaker", "resilience", "fault tolerance"],
    explanation:
      "The circuit breaker pattern protects a system from repeatedly calling a failing dependency. It has three states: Closed (requests flow, failures counted), Open (requests fail immediately, after threshold), Half-Open (limited requests to test recovery). This pattern prevents resource exhaustion and gives downstream services time to recover. Implementations: Netflix Hystrix, resilience4j, or custom using go-resiliency.",
    code: `// Simplified circuit breaker in Go
type CircuitBreaker struct {
    failures    int
    threshold   int
    state       string // "closed", "open", "half-open"
    timeout     time.Duration
    lastFailure time.Time
    mu          sync.Mutex
}
func (cb *CircuitBreaker) Call(fn func() error) error {
    cb.mu.Lock()
    if cb.state == "open" && time.Since(cb.lastFailure) < cb.timeout {
        cb.mu.Unlock()
        return errors.New("circuit breaker open")
    }
    if cb.state == "open" {
        cb.state = "half-open"
    }
    cb.mu.Unlock()
    err := fn()
    cb.mu.Lock()
    defer cb.mu.Unlock()
    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()
        if cb.failures >= cb.threshold {
            cb.state = "open"
        }
        return err
    }
    // success
    if cb.state == "half-open" {
        cb.state = "closed"
        cb.failures = 0
    }
    return nil
}`,
  },
  {
    id: "backend-otel",
    type: "concept",
    topic: "Backend",
    title: "OpenTelemetry",
    prompt: "What is OpenTelemetry and how does it help with observability?",
    expected:
      "OpenTelemetry is an observability framework for generating, collecting, and exporting telemetry data (traces, metrics, logs) across services.",
    keywords: ["opentelemetry", "tracing", "observability"],
    explanation:
      "OpenTelemetry (OTel) provides a single set of APIs and SDKs for instrumenting applications to emit telemetry data: traces (request flows), metrics (quantitative data), and logs. It standardizes collection and integrates with backends like Jaeger, Prometheus, or commercial tools. Key concepts: TracerProvider, Span, Context propagation, and exporters. OTel is critical for understanding distributed system behavior and debugging microservices.",
    code: `// Go example with OpenTelemetry
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/stdout"
    "go.opentelemetry.io/otel/sdk/trace"
)
func initTracer() func() {
    exporter, _ := stdout.New(stdout.WithPrettyPrint())
    tp := trace.NewTracerProvider(trace.WithBatcher(exporter))
    otel.SetTracerProvider(tp)
    return func() { tp.Shutdown(context.Background()) }
}
func handleRequest(w http.ResponseWriter, r *http.Request) {
    tracer := otel.Tracer("my-service")
    ctx, span := tracer.Start(r.Context(), "handleRequest")
    defer span.End()
    // do work
    result := doWork(ctx)
    w.Write([]byte(result))
}`,
  },
  {
    id: "backend-database-migrations",
    type: "concept",
    topic: "Backend",
    title: "Database Migrations",
    prompt: "What are database migrations and how do you manage them?",
    expected:
      "Migrations are version-controlled scripts that evolve the database schema incrementally, using tools like Flyway, Liquibase, or golang-migrate.",
    keywords: ["migrations", "schema", "version control"],
    explanation:
      "Database migrations manage schema changes in a repeatable, version-controlled manner. Each migration is an idempotent script (up/down) that applies or reverts changes. Benefits: team collaboration, environment consistency, rollback capability. Tools: golang-migrate (Go), Flyway (Java), Alembic (Python). Best practices: always have forward and backward migrations, keep migrations small, never modify existing migrations after merging.",
    code: `// Using golang-migrate CLI
migrate create -ext sql -dir migrations -seq create_users_table
// migrations/000001_create_users_table.up.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
// migrations/000001_create_users_table.down.sql
DROP TABLE users;
// Run migrations
migrate -path ./migrations -database "postgres://..." up
// In Go code
import "github.com/golang-migrate/migrate/v4"
m, _ := migrate.New("file://migrations", "postgres://...")
m.Up()`,
  },
  {
    id: "backend-sql-injection",
    type: "concept",
    topic: "Backend",
    title: "SQL Injection Prevention",
    prompt: "How do you prevent SQL injection in backend applications?",
    expected:
      "Use parameterized queries (prepared statements) and ORMs; never concatenate user input into SQL strings.",
    keywords: ["sql injection", "security", "prepared statements"],
    explanation:
      "SQL injection occurs when untrusted data is concatenated into SQL queries, allowing attackers to modify query logic. Prevention: always use parameterized queries (placeholders) that separate SQL code from data. In Go, use db.Query with '?' or '$1' placeholders. In any language, avoid string concatenation. Also, use ORMs that parameterize queries, validate input, and apply least-privilege database users.",
    code: `// BAD: string concatenation
query := fmt.Sprintf("SELECT * FROM users WHERE name = '%s'", userInput)
rows, _ := db.Query(query) // Vulnerable

// GOOD: parameterized query
rows, err := db.Query("SELECT * FROM users WHERE name = $1", userInput)

// With prepared statement
stmt, err := db.Prepare("SELECT * FROM users WHERE name = $1")
defer stmt.Close()
rows, err := stmt.Query(userInput)`,
  },
  {
    id: "backend-http-client",
    type: "concept",
    topic: "Backend",
    title: "HTTP Client Best Practices",
    prompt:
      "What are best practices for making HTTP requests from backend services?",
    expected:
      "Set timeouts, reuse client instances, handle response body close, implement retries with backoff, and use context for cancellation.",
    keywords: ["http client", "timeouts", "retries"],
    explanation:
      "HTTP clients in backend services must be robust. Use a single, reusable client with configured timeouts (Dial, TLS handshake, response header, overall). Always close response bodies. Set reasonable timeouts to avoid hanging requests. Implement retries with exponential backoff for transient errors. Use context to propagate deadlines and cancellation. Avoid default client (http.DefaultClient) because it has no timeout.",
    code: `// Configure HTTP client
client := &http.Client{
    Timeout: 10 * time.Second,
    Transport: &http.Transport{
        MaxIdleConns:    100,
        IdleConnTimeout: 90 * time.Second,
        TLSHandshakeTimeout: 5 * time.Second,
    },
}
// Make request with context
ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
defer cancel()
req, _ := http.NewRequestWithContext(ctx, "GET", "https://api.example.com/data", nil)
resp, err := client.Do(req)
if err != nil {
    // handle error
}
defer resp.Body.Close()
body, _ := io.ReadAll(resp.Body)
// Simple retry with backoff
for i := 0; i < 3; i++ {
    resp, err := client.Do(req)
    if err == nil && resp.StatusCode < 500 {
        break
    }
    time.Sleep(time.Duration(1<<i) * time.Second)
}`,
  },
  {
    id: "postgresql-vacuum",
    type: "concept",
    topic: "PostgreSQL",
    title: "Vacuum and Autovacuum",
    prompt: "What is VACUUM and why is it important in PostgreSQL?",
    expected:
      "VACUUM reclaims storage occupied by dead rows (updated/deleted) and updates statistics, preventing transaction ID wraparound.",
    keywords: ["vacuum", "autovacuum", "dead rows"],
    explanation:
      "PostgreSQL's MVCC leaves dead row versions after updates/deletes. VACUUM marks space as reusable and updates visibility map. Without regular vacuum, tables bloat and performance degrades; transaction ID wraparound can cause database shutdown. Autovacuum is the automated background process that handles this. Monitor vacuum activity and configure parameters (autovacuum_vacuum_threshold, autovacuum_vacuum_scale_factor) based on workload.",
    code: `-- Manual vacuum (can be run on large tables, but use autovacuum)
VACUUM (VERBOSE, ANALYZE) my_table;
-- See table bloat
SELECT pg_size_pretty(pg_total_relation_size('my_table'));
-- Check last autovacuum
SELECT relname, last_vacuum, last_autovacuum, last_analyze
FROM pg_stat_user_tables;
-- Configure autovacuum per table
ALTER TABLE my_table SET (autovacuum_vacuum_scale_factor = 0.05);`,
  },
  {
    id: "postgresql-replication",
    type: "concept",
    topic: "PostgreSQL",
    title: "Replication and High Availability",
    prompt:
      "What replication methods does PostgreSQL offer for high availability?",
    expected:
      "Streaming replication (primary-standby), logical replication (selective tables), and tools like Patroni, repmgr for failover.",
    keywords: ["replication", "high availability", "streaming replication"],
    explanation:
      "PostgreSQL supports streaming replication where a standby server continuously applies WAL from the primary. Logical replication allows replicating specific tables with row-level filtering. For automated failover and HA, use tools like Patroni, repmgr, or cloud-managed solutions (RDS, Aurora). Replication can be synchronous (no data loss) or asynchronous (better performance). Replication is crucial for read scaling, disaster recovery, and zero-downtime upgrades.",
    code: `-- Primary configuration (postgresql.conf)
wal_level = replica
max_wal_senders = 3
-- Standby configuration (recovery.conf or standby.signal)
primary_conninfo = 'host=primary port=5432 user=replicator'
-- Create replication slot
SELECT pg_create_physical_replication_slot('standby1');
-- Logical replication (publisher)
CREATE PUBLICATION mypub FOR TABLE users, orders;
-- Subscriber
CREATE SUBSCRIPTION mysub CONNECTION 'host=primary dbname=mydb' PUBLICATION mypub;`,
  },
  {
    id: "go-modules",
    type: "concept",
    topic: "Go",
    title: "Go Modules and Dependency Management",
    prompt: "How do Go modules manage dependencies?",
    expected:
      "Go modules use go.mod and go.sum files to define module paths, version constraints, and checksums, with semantic import versioning.",
    keywords: ["go modules", "dependency", "versioning"],
    explanation:
      "Go modules (introduced in 1.11, default 1.16) provide a dependency management system. go.mod defines the module path and dependencies with version constraints (e.g., require github.com/foo/bar v1.2.3). go.sum contains cryptographic checksums for integrity. Semantic import versioning (v2+) requires the major version in the import path. Commands: go mod init, go get, go mod tidy, go mod vendor. Modules enable reproducible builds and are the standard way to manage Go dependencies.",
    code: `// Create a new module
go mod init example.com/myapp
// Add a dependency
go get github.com/gorilla/mux@v1.8.0
// go.mod after
module example.com/myapp
go 1.21
require github.com/gorilla/mux v1.8.0
// go.sum: contains hashes
github.com/gorilla/mux v1.8.0 h1:...
github.com/gorilla/mux v1.8.0/go.mod h1:...
// Update dependencies
go get -u
// Remove unused
go mod tidy`,
  },
  {
    id: "go-testing",
    type: "concept",
    topic: "Go",
    title: "Testing in Go",
    prompt: "How do you write and organize tests in Go?",
    expected:
      "Tests are functions with names starting with Test in *_test.go files; use go test, table-driven tests, and sub-tests for organized testing.",
    keywords: ["testing", "go test", "table-driven tests"],
    explanation:
      "Go testing is built-in. Test files end with _test.go. Functions starting with Test take *testing.T. Table-driven tests use struct slices for multiple test cases. Subtests (t.Run) provide isolation and better output. Benchmark functions start with Benchmark and use *testing.B. Examples in docs are also tests. Use testify for assertions, or httptest for HTTP testing.",
    code: `// main_test.go
package main
import "testing"
// Table-driven test
func TestAdd(t *testing.T) {
    tests := []struct {
        name string
        a, b int
        want int
    }{
        {"positive", 1, 2, 3},
        {"negative", -1, -2, -3},
        {"zero", 0, 0, 0},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if got := Add(tt.a, tt.b); got != tt.want {
                t.Errorf("Add(%d,%d) = %d, want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
// Benchmark
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}`,
  },
  {
    id: "backend-jwt-refresh",
    type: "concept",
    topic: "Backend",
    title: "JWT Refresh Tokens",
    prompt: "How do refresh tokens work with JWT authentication?",
    expected:
      "Refresh token is a long-lived token used to obtain a new short-lived access token, improving security and user experience.",
    keywords: ["jwt", "refresh token", "authentication"],
    explanation:
      "Access tokens (short-lived, e.g., 15 minutes) are used for API requests. Refresh tokens (long-lived, e.g., 7 days) are stored securely (httpOnly cookie) and used to request new access tokens. This balances security (short-lived tokens limit exposure) and usability (no frequent re-login). When access token expires, client sends refresh token to refresh endpoint; server validates and issues new access token (and optionally new refresh token). Best practice: store refresh token in httpOnly secure cookie, rotate on each use.",
    code: `// Login endpoint (generate both tokens)
accessToken := jwt.Generate(userID, 15*time.Minute)
refreshToken := jwt.Generate(userID, 7*24*time.Hour)
http.SetCookie(w, &http.Cookie{
    Name:     "refresh_token",
    Value:    refreshToken,
    HttpOnly: true,
    Secure:   true,
    SameSite: http.SameSiteStrictMode,
    Path:     "/refresh",
})
// Refresh endpoint
func refresh(w http.ResponseWriter, r *http.Request) {
    cookie, err := r.Cookie("refresh_token")
    if err != nil {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }
    claims, err := jwt.Verify(cookie.Value)
    if err != nil {
        http.Error(w, "Invalid refresh token", http.StatusUnauthorized)
        return
    }
    newAccessToken := jwt.Generate(claims.UserID, 15*time.Minute)
    json.NewEncoder(w).Encode(map[string]string{"access_token": newAccessToken})
}`,
  },
  {
    id: "backend-microservices",
    type: "concept",
    topic: "Backend",
    title: "Microservices vs Monolith",
    prompt:
      "What are the trade-offs between microservices and monolithic architectures?",
    expected:
      "Monolith: simpler development, deployment; Microservices: independent scaling, technology diversity, but added complexity (network, data consistency).",
    keywords: ["microservices", "monolith", "architecture"],
    explanation:
      "Monolithic applications are built as a single unit: easier to develop, test, deploy initially; but can become hard to scale teams, introduce tech lock-in, and require full redeploy. Microservices break the app into independently deployable services: each can scale individually, use different tech, enable team autonomy. Downsides: distributed complexity (network latency, data consistency, service discovery, observability), operational overhead, and eventual consistency. Start with monolith, extract services when boundaries are clear.",
    code: `// Monolith: single binary handling everything
func main() {
    http.HandleFunc("/api/users", usersHandler)
    http.HandleFunc("/api/orders", ordersHandler)
    http.ListenAndServe(":8080", nil)
}
// Microservices: separate services
// User service (port 8081)
func main() {
    http.HandleFunc("/users", usersHandler)
    http.ListenAndServe(":8081", nil)
}
// Order service (port 8082)
func main() {
    http.HandleFunc("/orders", ordersHandler)
    http.ListenAndServe(":8082", nil)
}
// API gateway routes to appropriate service`,
  },
  {
    id: "backend-message-queue",
    type: "concept",
    topic: "Backend",
    title: "Message Queues (RabbitMQ, Kafka)",
    prompt: "What are message queues and when would you use them?",
    expected:
      "Message queues decouple components, provide async communication, and enable reliable processing, with RabbitMQ (AMQP) and Kafka (distributed log) serving different use cases.",
    keywords: ["message queue", "rabbitmq", "kafka", "async"],
    explanation:
      "Message queues enable asynchronous communication between services. RabbitMQ (AMQP) is a traditional broker for task queues, RPC, and fan-out; it supports complex routing and reliable delivery. Kafka is a distributed log optimized for high-throughput event streaming, replayability, and durable storage. Use queues to decouple producers from consumers, handle spikes, ensure reliability, and build event-driven architectures.",
    code: `// RabbitMQ producer (Go)
conn, _ := amqp.Dial("amqp://guest:guest@localhost:5672/")
ch, _ := conn.Channel()
ch.QueueDeclare("tasks", false, false, false, false, nil)
ch.Publish("", "tasks", false, false, amqp.Publishing{
    Body: []byte("process this"),
})
// Consumer
msgs, _ := ch.Consume("tasks", "", true, false, false, false, nil)
for msg := range msgs {
    process(msg.Body)
}
// Kafka producer (using segmentio/kafka-go)
writer := kafka.NewWriter(kafka.WriterConfig{
    Brokers: []string{"localhost:9092"},
    Topic:   "events",
})
writer.WriteMessages(context.Background(),
    kafka.Message{Value: []byte("event data")},
)`,
  },
  {
    id: "backend-grpc",
    type: "concept",
    topic: "Backend",
    title: "gRPC vs REST",
    prompt: "What is gRPC and how does it compare to REST?",
    expected:
      "gRPC uses HTTP/2, Protocol Buffers, and generates strongly-typed clients, offering better performance and bi-directional streaming; REST uses HTTP/1.1, JSON, and is more human-readable.",
    keywords: ["grpc", "rest", "protocol buffers"],
    explanation:
      "gRPC is a high-performance RPC framework from Google. It uses HTTP/2 for multiplexing and server push, Protocol Buffers (binary serialization) for efficiency, and generates client/server code. Benefits: speed, streaming, strong typing, polyglot. REST is more human-friendly, cacheable, and widely adopted. Choose gRPC for internal microservices communication where performance matters; REST for public APIs or browser clients.",
    code: `// Define service in .proto
service Greeter {
    rpc SayHello (HelloRequest) returns (HelloReply);
}
message HelloRequest { string name = 1; }
message HelloReply { string message = 1; }
// Server implementation (Go)
type server struct{ pb.UnimplementedGreeterServer }
func (s *server) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
    return &pb.HelloReply{Message: "Hello " + req.Name}, nil
}
// Client
conn, _ := grpc.Dial("localhost:50051", grpc.WithInsecure())
client := pb.NewGreeterClient(conn)
resp, _ := client.SayHello(context.Background(), &pb.HelloRequest{Name: "World"})`,
  },
  {
    id: "dbms-transaction-isolation",
    type: "concept",
    topic: "DBMS",
    title: "Transaction Isolation Levels",
    prompt: "What are the transaction isolation levels and their trade-offs?",
    expected:
      "Read Uncommitted (dirty reads), Read Committed (prevents dirty reads), Repeatable Read (prevents non-repeatable reads), Serializable (full isolation).",
    keywords: ["isolation", "dirty read", "serializable"],
    explanation:
      "Isolation levels determine how transaction concurrency is handled. Read Uncommitted allows dirty reads (uncommitted data). Read Committed (default in many DBs) prevents dirty reads but allows non-repeatable reads (a row changes between reads). Repeatable Read (default in PostgreSQL) prevents non-repeatable reads but may allow phantom reads (new rows). Serializable is the strictest, preventing all anomalies but potentially reducing concurrency. Choose based on correctness vs performance.",
    code: `-- Set isolation level (PostgreSQL)
BEGIN ISOLATION LEVEL READ COMMITTED;
-- or
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- In Go with database/sql
tx, err := db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted})
// Anomaly: non-repeatable read
-- Session 1
BEGIN;
SELECT balance FROM accounts WHERE id = 1; -- 100
-- Session 2
UPDATE accounts SET balance = 200 WHERE id = 1; COMMIT;
-- Session 1 again
SELECT balance FROM accounts WHERE id = 1; -- 200 (different)
-- Repeatable Read would still show 100`,
  },
  {
    id: "redis-basics",
    type: "concept",
    topic: "Redis",
    title: "Redis Basics",
    prompt: "What is Redis and what are its primary use cases?",
    expected:
      "Redis is an in-memory data structure store used for caching, session management, real-time analytics, and message brokering.",
    keywords: ["redis", "cache", "in-memory"],
    explanation:
      "Redis (REmote DIctionary Server) is an open-source, in-memory key-value store known for its speed and versatility. It supports various data structures: strings, hashes, lists, sets, sorted sets, bitmaps, and streams. Redis is commonly used for caching to reduce database load, session storage (e.g., user sessions), real-time analytics (counters, leaderboards), rate limiting, pub/sub messaging, and as a lightweight message broker. It can persist data to disk (RDB snapshots, AOF logs) and supports replication and clustering. Redis is single-threaded (for commands), making it atomic and easy to reason about.",
    code: `// Redis CLI examples
SET user:1000 '{"name":"Alice"}'
GET user:1000
HSET user:1000 name Alice age 30
HGETALL user:1000
// In Go using go-redis
rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
err := rdb.Set(ctx, "key", "value", 0).Err()
val, err := rdb.Get(ctx, "key").Result()`,
  },
  {
    id: "redis-data-structures",
    type: "concept",
    topic: "Redis",
    title: "Redis Data Structures",
    prompt: "What data structures does Redis support and when to use each?",
    expected:
      "Strings (simple values), Hashes (objects), Lists (queues), Sets (unique items), Sorted Sets (leaderboards), and Streams (event logs).",
    keywords: ["data structures", "hash", "sorted set"],
    explanation:
      "Redis offers a rich set of data structures. Strings are the simplest, good for caching single values. Hashes are perfect for storing objects (e.g., user profiles). Lists are ordered collections, ideal for queues (LPUSH/RPOP) or stacks. Sets provide uniqueness and set operations (union, intersection) – great for tags or unique IDs. Sorted Sets have scores for ranking – perfect for leaderboards or rate-limiting windows. Streams are append-only logs for event sourcing or message queues. Choosing the right structure improves performance and code clarity.",
    code: `// Hashes for objects
HSET user:1 name "John" email "john@example.com"
HGETALL user:1
// Lists as queues
LPUSH queue "task1" "task2"
RPOP queue
// Sorted Sets for leaderboard
ZADD leaderboard 100 "player1" 95 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
// Sets for tags
SADD article:1 "tech" "golang"
SINTER article:1 article:2`,
  },
  {
    id: "redis-caching-strategies",
    type: "concept",
    topic: "Redis",
    title: "Caching Strategies with Redis",
    prompt: "What caching strategies can be implemented with Redis?",
    expected:
      "Cache-aside, write-through, write-behind, and time-based expiration; also consider invalidation patterns.",
    keywords: ["caching", "strategies", "cache-aside"],
    explanation:
      "Redis is widely used for caching. Common strategies: Cache-aside (lazy loading) – application checks cache first, loads from DB on miss and stores in cache. Write-through – writes go to both cache and DB synchronously. Write-behind – writes to cache immediately, updates DB asynchronously. Time-based expiration (TTL) automatically evicts stale data. Invalidation strategies include explicit deletion on updates, using versioning, or event-based invalidation. Choose strategy based on data consistency requirements and write patterns.",
    code: `// Cache-aside pattern in Go
func GetUser(ctx context.Context, id string) (*User, error) {
    val, err := redisClient.Get(ctx, "user:"+id).Result()
    if err == nil {
        var user User
        json.Unmarshal([]byte(val), &user)
        return &user, nil
    }
    user, err := db.GetUser(id)
    if err != nil {
        return nil, err
    }
    data, _ := json.Marshal(user)
    redisClient.Set(ctx, "user:"+id, data, 10*time.Minute) // TTL
    return user, nil
}
// Delete cache on update
func UpdateUser(ctx context.Context, user *User) error {
    if err := db.UpdateUser(user); err != nil {
        return err
    }
    return redisClient.Del(ctx, "user:"+user.ID).Err()
}`,
  },
  {
    id: "redis-persistence",
    type: "concept",
    topic: "Redis",
    title: "Redis Persistence",
    prompt: "How does Redis persist data to disk?",
    expected:
      "Redis supports RDB snapshots (point-in-time) and AOF (Append-Only File) logs, which can be used together for durability.",
    keywords: ["persistence", "rdb", "aof"],
    explanation:
      "Redis is primarily in-memory but can persist data to disk. RDB (Redis Database) creates point-in-time snapshots of the dataset at configurable intervals (e.g., every 60 seconds if changes >1000 keys). RDB is compact for backups but may lose recent data. AOF (Append-Only File) logs every write operation, allowing reconstruction of the dataset on restart; it can be configured to fsync every second or per command. AOF provides better durability but larger files. Combining both (RDB for backups, AOF for crash recovery) is common. Redis Enterprise also supports active-active geo-replication.",
    code: `# redis.conf settings
save 900 1      # RDB: save after 900 sec if at least 1 change
save 300 10     # RDB: save after 300 sec if at least 10 changes
appendonly yes  # enable AOF
appendfsync everysec  # fsync every second
# Command to trigger RDB save
BGSAVE
# AOF rewrite to compact
BGREWRITEAOF`,
  },
  {
    id: "aws-s3-basics",
    type: "concept",
    topic: "AWS",
    title: "AWS S3 Basics",
    prompt: "What is Amazon S3 and what are its core concepts?",
    expected:
      "S3 is object storage with buckets, objects, keys, and regions; used for static assets, backups, data lakes, and cloud-native apps.",
    keywords: ["s3", "bucket", "object"],
    explanation:
      "Amazon Simple Storage Service (S3) is a scalable object storage service. Core concepts: Buckets (containers for objects, globally unique name), Objects (files + metadata), Keys (unique identifier within a bucket), and Regions (where data is stored). S3 offers high durability (11 nines), versioning, lifecycle policies, and various storage classes (Standard, Intelligent-Tiering, Glacier). It's used for static website hosting, backups, data archiving, big data analytics, and as a backend for cloud applications. S3 integrates with other AWS services and supports strong consistency for all operations.",
    code: `// AWS CLI commands
# Create bucket
aws s3 mb s3://my-bucket --region us-east-1
# Upload file
aws s3 cp file.txt s3://my-bucket/path/file.txt
# List objects
aws s3 ls s3://my-bucket/
# Sync directory
aws s3 sync ./local-folder s3://my-bucket/folder/
# Set public read (if allowed)
aws s3api put-object-acl --bucket my-bucket --key file.txt --acl public-read`,
  },
  {
    id: "aws-s3-storage-classes",
    type: "concept",
    topic: "AWS",
    title: "S3 Storage Classes",
    prompt:
      "What are the different S3 storage classes and when should you use them?",
    expected:
      "S3 Standard (frequent access), Intelligent-Tiering (unknown patterns), Standard-IA (infrequent), One Zone-IA, Glacier (archive), Glacier Deep Archive (long-term).",
    keywords: ["storage classes", "s3", "cost optimization"],
    explanation:
      "S3 offers multiple storage classes to optimize cost based on access patterns. S3 Standard: high durability, low latency, for frequently accessed data. S3 Intelligent-Tiering: automatically moves data between tiers based on access patterns, with monitoring fee. S3 Standard-IA (Infrequent Access): lower storage cost but retrieval fee, for long-lived, infrequently accessed data. S3 One Zone-IA: lower cost but stored in single AZ, suitable for recreatable data. S3 Glacier Instant Retrieval: archive with millisecond retrieval, for rarely accessed data needing quick access. S3 Glacier Flexible Retrieval: minutes to hours retrieval, for backup and DR. S3 Glacier Deep Archive: lowest cost, retrieval in 12-48 hours, for long-term compliance. Lifecycle policies automate transitions.",
    code: `# Upload with specific storage class
aws s3 cp file.txt s3://my-bucket/ --storage-class STANDARD_IA
# Set lifecycle policy (JSON)
{
  "Rules": [
    {
      "Id": "transition to IA after 30 days",
      "Status": "Enabled",
      "Prefix": "",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        }
      ]
    }
  ]
}
# Apply policy
aws s3api put-bucket-lifecycle-configuration --bucket my-bucket --lifecycle-configuration file://policy.json`,
  },
  {
    id: "aws-s3-security",
    type: "concept",
    topic: "AWS",
    title: "S3 Security Best Practices",
    prompt: "How do you secure S3 buckets and objects?",
    expected:
      "Use bucket policies, IAM, ACLs; enable block public access, encryption at rest (SSE-S3, SSE-KMS, or client-side), and versioning.",
    keywords: ["security", "encryption", "bucket policy"],
    explanation:
      "S3 security follows defense-in-depth: Block public access (default recommended), use bucket policies to grant granular permissions (e.g., allow only specific IAM roles or IP ranges), and use IAM for user-level access. Enable encryption at rest: SSE-S3 (AES-256), SSE-KMS (managed keys), or client-side. Enable versioning to protect against accidental deletions or overwrites. Use S3 Access Logs and CloudTrail for auditing. Use pre-signed URLs for temporary access to private objects. Set appropriate object ACLs if needed. Regularly review permissions and avoid public buckets unless necessary.",
    code: `// Bucket policy to deny unencrypted uploads
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-bucket/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      }
    }
  ]
}
# Enable default encryption
aws s3api put-bucket-encryption --bucket my-bucket --server-side-encryption-configuration '{
  "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
}'
# Generate pre-signed URL (Go)
svc := s3.New(session.Must(session.NewSession()))
req, _ := svc.GetObjectRequest(&s3.GetObjectInput{Bucket: aws.String("my-bucket"), Key: aws.String("secret.pdf")})
url, err := req.Presign(15 * time.Minute)`,
  },
  {
    id: "docker-basics-intro",
    type: "concept",
    topic: "Docker",
    title: "Docker Basics: Images and Containers",
    prompt: "What are Docker images and containers?",
    expected:
      "Images are read-only templates; containers are runnable instances of images, isolated with their own filesystem and network.",
    keywords: ["docker", "image", "container"],
    explanation:
      "Docker images are lightweight, standalone, executable packages that include everything needed to run software: code, runtime, libraries, environment variables, and config files. They are built from a Dockerfile. Containers are runtime instances of images – they add a writable layer on top of the image and run in isolated environments. Containers share the host OS kernel, making them more efficient than virtual machines. Key operations: `docker build` to create an image, `docker run` to start a container, `docker ps` to list containers, and `docker stop` to stop them.",
    code: `# Build an image from Dockerfile
docker build -t myapp:latest .
# Run a container
docker run -d -p 8080:80 --name myapp-container myapp:latest
# List running containers
docker ps
# Execute a command inside a running container
docker exec -it myapp-container sh
# Stop and remove container
docker stop myapp-container
docker rm myapp-container`,
  },
  {
    id: "docker-dockerfile",
    type: "concept",
    topic: "Docker",
    title: "Dockerfile and Best Practices",
    prompt: "What is a Dockerfile and what are common best practices?",
    expected:
      "Dockerfile defines image build steps; best practices: use multi-stage builds, minimize layers, leverage .dockerignore, and use specific base image tags.",
    keywords: ["dockerfile", "layers", "multi-stage"],
    explanation:
      "A Dockerfile is a text document with instructions to build a Docker image. Each instruction creates a layer, which can be cached. Best practices: use official base images with specific tags (not `latest`); combine `RUN` commands to reduce layers; use `.dockerignore` to exclude unnecessary files; use multi-stage builds to keep final images small; order layers from least to most frequently changing to maximize cache; run containers as non-root user; and use `COPY` instead of `ADD` unless needed. These practices improve build speed, security, and image size.",
    code: `# Multi-stage Dockerfile example
# Stage 1: Build
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o myapp ./cmd/server
# Stage 2: Runtime
FROM alpine:3.18
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup
WORKDIR /app
COPY --from=builder /app/myapp .
COPY --from=builder /app/config ./config
USER appuser
EXPOSE 8080
CMD ["./myapp"]`,
  },
  {
    id: "docker-volumes",
    type: "concept",
    topic: "Docker",
    title: "Docker Volumes and Data Persistence",
    prompt: "How do you persist data in Docker containers?",
    expected:
      "Use volumes (managed by Docker) or bind mounts (host directories) to store data outside the container's writable layer.",
    keywords: ["volumes", "bind mounts", "persistence"],
    explanation:
      "Containers are ephemeral; data written to the container's writable layer disappears when the container is removed. For persistence, use volumes (managed by Docker) or bind mounts (map a host directory). Volumes are preferred for production: they are easier to backup/migrate, work on all platforms, and are managed by Docker commands. Bind mounts are convenient for development (live code sync). Named volumes can be created explicitly or automatically. Use `docker volume` commands to manage them. For databases or stateful apps, always use volumes.",
    code: `# Create a named volume
docker volume create mydata
# Use volume with container
docker run -d -v mydata:/data --name app alpine
# Bind mount (host directory)
docker run -d -v /host/path:/container/path alpine
# Using docker-compose
version: '3.8'
services:
  db:
    image: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:`,
  },
  {
    id: "docker-compose",
    type: "concept",
    topic: "Docker",
    title: "Docker Compose",
    prompt: "What is Docker Compose and how is it used?",
    expected:
      "Docker Compose defines and runs multi-container applications using a YAML file, simplifying orchestration for development and testing.",
    keywords: ["docker-compose", "orchestration", "yaml"],
    explanation:
      "Docker Compose is a tool for defining and running multi-container Docker applications. You define services, networks, and volumes in a `docker-compose.yml` file. With a single command (`docker-compose up`), you start all services. Compose is ideal for development, testing, and staging environments. It supports environment variables, build contexts, and service dependencies. For production, consider swarm or Kubernetes.",
    code: `# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - redis
      - postgres
  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pg_data:/var/lib/postgresql/data
volumes:
  redis_data:
  pg_data:
# Commands
docker-compose up -d
docker-compose logs -f web
docker-compose down`,
  },
  {
    id: "kubernetes-basics",
    type: "concept",
    topic: "Kubernetes",
    title: "Kubernetes Core Concepts",
    prompt: "What are the core concepts in Kubernetes?",
    expected:
      "Pods (smallest deployable units), Deployments (desired state), Services (stable networking), ConfigMaps (configuration), Secrets (sensitive data).",
    keywords: ["kubernetes", "pod", "deployment", "service"],
    explanation:
      "Kubernetes is a container orchestration platform. Key concepts: Pod – the smallest deployable unit, one or more containers sharing network and storage. Deployment – manages desired state (replicas, updates) for pods. Service – provides stable networking and load balancing for pods. ConfigMap – decouples configuration from container images. Secret – stores sensitive data (passwords, tokens). Namespace – logical isolation. Ingress – HTTP routing. PersistentVolume – storage abstraction. Control Plane components: API server, scheduler, etcd, controller manager. Node – worker machine running pods. Understanding these is essential for deploying and managing applications.",
    code: `# Pod definition (pod.yaml)
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
# Deployment (deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 8080`,
  },
  {
    id: "kubernetes-services",
    type: "concept",
    topic: "Kubernetes",
    title: "Kubernetes Services and Networking",
    prompt: "What types of Services exist in Kubernetes and when to use them?",
    expected:
      "ClusterIP (internal), NodePort (external via node port), LoadBalancer (cloud LB), Ingress (HTTP routing).",
    keywords: ["service", "clusterip", "loadbalancer"],
    explanation:
      "Kubernetes Services provide stable endpoints for pods. ClusterIP is the default – internal IP only, for intra-cluster communication. NodePort exposes the service on a static port on each node (30000-32767), suitable for development. LoadBalancer provisions a cloud load balancer (AWS ELB, GCP LB) for external access – used in production. Ingress is not a Service type but an API object that manages external HTTP/HTTPS routing, providing host-based or path-based routing, SSL termination, and can route to multiple Services.",
    code: `# ClusterIP Service
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
# NodePort Service
type: NodePort
ports:
  - port: 80
    targetPort: 8080
    nodePort: 30080
# LoadBalancer Service
type: LoadBalancer
# Ingress for HTTP routing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80`,
  },
  {
    id: "kubernetes-configmaps-secrets",
    type: "concept",
    topic: "Kubernetes",
    title: "ConfigMaps and Secrets",
    prompt: "How do you manage configuration and secrets in Kubernetes?",
    expected:
      "ConfigMaps store non-sensitive config as key-value pairs; Secrets store sensitive data (base64 encoded); both can be mounted as volumes or environment variables.",
    keywords: ["configmap", "secret", "environment"],
    explanation:
      "ConfigMaps and Secrets decouple configuration from container images. ConfigMaps hold non-sensitive data (e.g., application config). Secrets hold sensitive data (passwords, tokens) and are stored base64-encoded (not encrypted by default, but can be encrypted at rest). Both can be injected as environment variables or mounted as volumes. Secrets should be used with RBAC and possibly external key management (e.g., AWS Secrets Manager, Vault). For production, enable encryption at rest (using KMS) and use `sealed-secrets` or external operators for GitOps.",
    code: `# ConfigMap from literal
kubectl create configmap app-config --from-literal=db_host=postgres --from-literal=log_level=debug
# ConfigMap YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app.properties: |
    db.host=postgres
    log.level=debug
---
# Secret YAML (values base64 encoded)
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  password: cGFzc3dvcmQxMjM=  # "password123" base64
# Mount in pod
spec:
  containers:
  - name: app
    image: myapp
    env:
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password
    volumeMounts:
    - name: config
      mountPath: /config
  volumes:
  - name: config
    configMap:
      name: app-config`,
  },
  {
    id: "kubernetes-helm",
    type: "concept",
    topic: "Kubernetes",
    title: "Helm Basics",
    prompt: "What is Helm and how does it simplify Kubernetes deployments?",
    expected:
      "Helm is a package manager for Kubernetes, using Charts to bundle and templatize Kubernetes manifests for easy deployment, versioning, and sharing.",
    keywords: ["helm", "charts", "templates"],
    explanation:
      "Helm is a Kubernetes package manager. A Chart is a collection of templated YAML files that define Kubernetes resources. Helm allows you to install, upgrade, rollback, and share applications with parameterization via values files. It manages releases (installed instances). Helm 3 no longer requires Tiller (server-side component). Charts can be stored in repositories (e.g., Artifact Hub). Helm simplifies complex deployments (like a database) by providing a single command to install with customizable configurations.",
    code: `# Install Helm chart
helm install my-release bitnami/postgresql --set postgresqlPassword=secret
# Create a new chart
helm create my-chart
# Chart structure:
my-chart/
  Chart.yaml
  values.yaml
  templates/
    deployment.yaml
    service.yaml
# Package chart
helm package my-chart
# Install from local chart with custom values
helm install my-release ./my-chart -f custom-values.yaml
# List releases
helm list
# Upgrade
helm upgrade my-release ./my-chart --set image.tag=v2
# Rollback
helm rollback my-release 1`,
  },
  {
    id: "kubernetes-pv-pvc",
    type: "concept",
    topic: "Kubernetes",
    title: "Persistent Volumes and Persistent Volume Claims",
    prompt: "How does Kubernetes handle persistent storage?",
    expected:
      "PersistentVolume (PV) is cluster storage provisioned by admin; PersistentVolumeClaim (PVC) is a request for storage by a user; pods consume PVCs to get persistent data.",
    keywords: ["pv", "pvc", "storage"],
    explanation:
      "Kubernetes abstracts storage using PersistentVolumes (PVs) – storage resources provisioned by the cluster admin (e.g., NFS, EBS, local disk). PersistentVolumeClaims (PVCs) are requests for storage by users. When a PVC matches a PV (based on size, access modes, storage class), they are bound. Pods then mount the PVC as a volume, ensuring data persists beyond pod lifetime. StorageClasses allow dynamic provisioning – the cluster automatically creates PVs when PVCs are created, using cloud provider integrations.",
    code: `# PersistentVolume (static provisioning)
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data
---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
---
# Pod using PVC
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: my-pvc
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - mountPath: /data
      name: data
# StorageClass for dynamic provisioning
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3`,
  },
  {
    id: "kubernetes-rollouts",
    type: "concept",
    topic: "Kubernetes",
    title: "Deployment Strategies",
    prompt: "What deployment strategies does Kubernetes support?",
    expected:
      "RollingUpdate (default, gradual replacement), Recreate (terminate all then create), and canary/blue-green via tools like Argo Rollouts.",
    keywords: ["deployment", "rolling update", "blue-green"],
    explanation:
      "Kubernetes Deployments support two update strategies: RollingUpdate (default) replaces pods gradually with configurable maxSurge and maxUnavailable, ensuring zero downtime. Recreate terminates all old pods before creating new ones, causing downtime. For advanced strategies (canary, blue-green), you can use tools like Argo Rollouts, Flagger, or manually manage multiple services. RollingUpdate is suitable for most applications; for stateful or critical services, consider blue-green for safe cutover.",
    code: `# RollingUpdate strategy
apiVersion: apps/v1
kind: Deployment
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%      # extra pods allowed during update
      maxUnavailable: 25% # pods unavailable during update
  replicas: 4
# Blue-green via two Deployments and Service switching
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    version: blue   # switch to green after testing
# Argo Rollouts canary
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-rollout
spec:
  strategy:
    canary:
      steps:
      - setWeight: 20
      - pause: {duration: 1h}
      - setWeight: 100`,
  },
{
  id: "go-gin-routing",
  type: "concept",
  topic: "Go/Gin",
  title: "Gin Routing and Parameters",
  prompt: "How does Gin handle routing and path parameters?",
  expected: "Gin uses a radix tree for efficient routing; path parameters are defined with colon (:id) and accessed with c.Param().",
  keywords: ["gin", "routing", "parameters"],
  explanation: "Gin is a high-performance HTTP web framework for Go. It uses a radix tree (prefix tree) to route requests efficiently. Path parameters are defined using colons (e.g., `/users/:id`). Query parameters are accessed via `c.Query()` or `c.DefaultQuery()`. Body parameters can be bound to structs using `c.ShouldBindJSON()` or `c.ShouldBind()`. Gin supports grouped routes for organizing API versions or modules. It also provides middleware support for cross-cutting concerns.",
  code: `func main() {
    r := gin.Default()
    // Path parameter
    r.GET("/users/:id", func(c *gin.Context) {
        id := c.Param("id")
        c.JSON(200, gin.H{"user_id": id})
    })
    // Query parameter
    r.GET("/search", func(c *gin.Context) {
        q := c.DefaultQuery("q", "default")
        page := c.Query("page")
        c.JSON(200, gin.H{"query": q, "page": page})
    })
    // Body binding
    type User struct { Name string \`json:"name"\` }
    r.POST("/users", func(c *gin.Context) {
        var user User
        if err := c.ShouldBindJSON(&user); err != nil {
            c.JSON(400, gin.H{"error": err.Error()})
            return
        }
        c.JSON(201, user)
    })
    r.Run(":8080")
}`,
},
{
  id: "go-gin-middleware",
  type: "concept",
  topic: "Go/Gin",
  title: "Custom Middleware in Gin",
  prompt: "How do you create custom middleware in Gin?",
  expected: "Middleware is a function returning gin.HandlerFunc; use c.Next() to pass control; can be applied globally or to route groups.",
  keywords: ["gin", "middleware", "handler"],
  explanation: "Gin middleware are functions that process requests before reaching the handler. They can perform authentication, logging, rate limiting, etc. Custom middleware functions typically accept a gin.HandlerFunc and return one. Inside, you can execute code before and after calling `c.Next()`. Middleware can be registered globally with `r.Use()` or to specific route groups. They can also abort the request with `c.Abort()`.",
  code: `// Custom auth middleware
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
            return
        }
        // validate token...
        c.Set("userID", "123") // pass data to next handlers
        c.Next()
    }
}
// Usage
func main() {
    r := gin.Default()
    // Global middleware
    r.Use(gin.Logger())
    // Group with middleware
    api := r.Group("/api", AuthMiddleware())
    {
        api.GET("/profile", profileHandler)
    }
    r.Run()
}`,
},
{
  id: "go-gin-validation",
  type: "concept",
  topic: "Go/Gin",
  title: "Request Validation in Gin",
  prompt: "How do you validate request data in Gin?",
  expected: "Use binding structs with validation tags (binding:required, min, max, email) and c.ShouldBind to get errors.",
  keywords: ["validation", "binding", "gin"],
  explanation: "Gin integrates with the validator package (go-playground/validator) via binding tags. Define structs with validation tags like `binding:\"required,min=3\"` or `binding:\"email\"`. Use `c.ShouldBindJSON()` or `c.ShouldBindQuery()` to bind and validate. If validation fails, Gin returns a 400 with detailed error messages. You can also implement custom validators or use `c.Bind()` for automatic response on error.",
   code: `type CreateUserRequest struct {
     Name  string \`json:"name" binding:"required,min=3,max=50"\`
     Email string \`json:"email" binding:"required,email"\`
     Age   int    \`json:"age" binding:"min=0,max=150"\`
 }
 func createUser(c *gin.Context) {
     var req CreateUserRequest
     if err := c.ShouldBindJSON(&req); err != nil {
         c.JSON(400, gin.H{"error": err.Error()})
         return
     }
     // process request
     c.JSON(200, gin.H{"message": "user created"})
 }`,
},
{
  id: "go-gin-error-handling",
  type: "concept",
  topic: "Go/Gin",
  title: "Error Handling Patterns in Gin",
  prompt: "What are best practices for error handling in Gin applications?",
  expected: "Use consistent error responses, centralized error handling middleware, and custom error types for domain-specific errors.",
  keywords: ["error handling", "gin", "middleware"],
  explanation: "Error handling in Gin can be organized by returning errors from handlers and using a central error handling middleware. Define custom error types to differentiate between client errors (4xx) and server errors (5xx). Use `c.Error(err)` to add errors to the context, and a middleware to format and respond. Alternatively, handle errors inline and return JSON responses. For validation errors, use `c.ShouldBind()` which automatically responds with 400. For panic recovery, Gin includes a recovery middleware.",
  code: `// Custom error type
type AppError struct {
    Code    int
    Message string
    Err     error
}
func (e *AppError) Error() string {
    return e.Message
}
// Error handling middleware
func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        if len(c.Errors) > 0 {
            err := c.Errors.Last().Err
            if appErr, ok := err.(*AppError); ok {
                c.JSON(appErr.Code, gin.H{"error": appErr.Message})
                return
            }
            c.JSON(500, gin.H{"error": "internal server error"})
        }
    }
}
// Usage in handler
func getUser(c *gin.Context) {
    user, err := db.GetUser(c.Param("id"))
    if err != nil {
        _ = c.Error(&AppError{Code: 404, Message: "user not found", Err: err})
        return
    }
    c.JSON(200, user)
}`,
},
{
  id: "postgresql-connection-pooling",
  type: "concept",
  topic: "PostgreSQL",
  title: "Connection Pooling in PostgreSQL",
  prompt: "What is connection pooling and how do you implement it in Go?",
  expected: "Connection pooling reuses database connections to reduce overhead; in Go, use sql.DB which manages a connection pool with SetMaxOpenConns, SetMaxIdleConns.",
  keywords: ["connection pooling", "pgx", "performance"],
  explanation: "Connection pooling is crucial for performance in web applications. Opening a new database connection for each request is expensive. Go's `database/sql` includes built-in connection pooling. You can configure `SetMaxOpenConns` (max simultaneous connections), `SetMaxIdleConns` (idle connections kept open), and `SetConnMaxLifetime` (max time a connection can be reused). For PostgreSQL, the `pgx` driver offers additional pooling options. Proper pool sizing avoids connection exhaustion and reduces latency. Use tools like `pgbouncer` as a lightweight connection pooler between app and database for larger deployments.",
  code: `import (
    "database/sql"
    _ "github.com/lib/pq"
)
func initDB() (*sql.DB, error) {
    db, err := sql.Open("postgres", "postgres://user:pass@localhost/db?sslmode=disable")
    if err != nil {
        return nil, err
    }
    db.SetMaxOpenConns(25)          // default 0 (unlimited)
    db.SetMaxIdleConns(5)           // default 2
    db.SetConnMaxLifetime(5 * time.Minute)
    if err := db.Ping(); err != nil {
        return nil, err
    }
    return db, nil
}`,
},
{
  id: "postgresql-transaction-isolation-go",
  type: "concept",
  topic: "PostgreSQL",
  title: "Transaction Isolation in Go",
  prompt: "How do you manage transaction isolation levels in Go with PostgreSQL?",
  expected: "Use sql.Tx with options: sql.TxOptions{Isolation: sql.LevelRepeatableRead}. PostgreSQL isolation levels affect concurrency behavior.",
  keywords: ["isolation", "transactions", "go"],
  explanation: "Go's `database/sql` allows setting transaction isolation levels via `sql.TxOptions`. PostgreSQL supports four isolation levels: Read Uncommitted (maps to Read Committed), Read Committed (default), Repeatable Read, and Serializable. Each level provides different guarantees regarding dirty reads, non-repeatable reads, and phantom reads. Choosing the right isolation level balances consistency and performance. In Go, you can start a transaction with `db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelRepeatableRead})`. Always handle errors and commit/rollback appropriately.",
  code: `func transfer(ctx context.Context, db *sql.DB, from, to int, amount float64) error {
    opts := &sql.TxOptions{Isolation: sql.LevelRepeatableRead}
    tx, err := db.BeginTx(ctx, opts)
    if err != nil {
        return err
    }
    defer tx.Rollback() // safe rollback if commit fails
    _, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, from)
    if err != nil {
        return err
    }
    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, to)
    if err != nil {
        return err
    }
    return tx.Commit()
}`,
},
{
  id: "postgresql-locking",
  type: "concept",
  topic: "PostgreSQL",
  title: "Locking Mechanisms in PostgreSQL",
  prompt: "What locking mechanisms does PostgreSQL provide and when to use them?",
  expected: "Row-level locks (SELECT FOR UPDATE), table-level locks (LOCK TABLE), advisory locks (custom application locks).",
  keywords: ["locking", "row-level", "advisory"],
  explanation: "PostgreSQL offers various locking options. Row-level locks: `SELECT ... FOR UPDATE` locks rows for update, preventing concurrent modifications. Table-level locks: `LOCK TABLE` can lock entire tables with different modes (ACCESS SHARE, ROW EXCLUSIVE, etc.). Advisory locks are application-specific locks managed by the database, useful for coordinating operations across processes. For optimistic concurrency, you can use version numbers or timestamps. Choosing the right lock depends on the use case: row locks for updating specific rows, table locks for bulk operations, advisory locks for distributed coordination.",
  code: `-- Row-level lock (pessimistic)
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
-- Perform update
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;
-- Advisory lock (application level)
SELECT pg_advisory_lock(12345);
-- critical section
SELECT pg_advisory_unlock(12345);
-- In Go with sqlx
var user User
err := db.Get(&user, "SELECT * FROM users WHERE id = $1 FOR UPDATE", id)`,
},
{
  id: "backend-api-documentation",
  type: "concept",
  topic: "Backend",
  title: "API Documentation (OpenAPI/Swagger)",
  prompt: "How do you document REST APIs effectively?",
  expected: "Use OpenAPI/Swagger specification to define endpoints, request/response schemas, and generate interactive documentation.",
  keywords: ["swagger", "openapi", "documentation"],
  explanation: "API documentation is crucial for maintainability and developer experience. OpenAPI (formerly Swagger) is a standard specification for describing REST APIs. You can write YAML/JSON files manually or generate them from code annotations. Tools like Swagger UI provide interactive documentation. In Go, libraries like `swaggo/swag` generate OpenAPI spec from comments. Benefits: auto-generated client SDKs, contract testing, and clear communication between teams.",
  code: `// Using swaggo/swag with Gin
// @Summary Get user by ID
// @Description Returns a single user
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} User
// @Failure 404 {object} ErrorResponse
// @Router /users/{id} [get]
func getUser(c *gin.Context) {
    // implementation
}
// Generate docs: swag init
// Serve Swagger UI at /swagger/index.html`,
},
{
  id: "backend-pagination",
  type: "concept",
  topic: "Backend",
  title: "API Pagination Strategies",
  prompt: "What are the different pagination strategies for APIs?",
  expected: "Offset/limit (simple but inefficient for large datasets), keyset/cursor (efficient for infinite scroll), and page-based.",
  keywords: ["pagination", "cursor", "offset"],
  explanation: "Pagination is essential for APIs returning large datasets. Offset/limit (`?offset=0&limit=10`) is simple but suffers from performance issues when offset grows large (database scans many rows). Keyset/cursor pagination (`?cursor=...`) uses a unique, sortable field (e.g., ID, timestamp) and is more efficient for large datasets, ideal for infinite scroll. It requires ordering by the cursor field. Page-based (`?page=1&size=10`) is similar to offset/limit but often implemented as offset/limit. Choose based on dataset size and client requirements.",
  code: `// Offset/limit (simple)
SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2
// Keyset/cursor (efficient)
SELECT * FROM users WHERE id > $1 ORDER BY id LIMIT 10
// In Go handler
func listUsers(c *gin.Context) {
    cursor := c.Query("cursor")
    limit := 10
    var users []User
    query := "SELECT * FROM users"
    args := []interface{}{}
    if cursor != "" {
        query += " WHERE id > $1"
        args = append(args, cursor)
    }
    query += " ORDER BY id LIMIT $2"
    args = append(args, limit)
    db.Select(&users, query, args...)
    // Return next cursor from last item
    nextCursor := ""
    if len(users) == limit {
        nextCursor = users[len(users)-1].ID
    }
    c.JSON(200, gin.H{"data": users, "next_cursor": nextCursor})
}`,
},
{
  id: "backend-rate-limiting-go",
  type: "concept",
  topic: "Backend",
  title: "Rate Limiting in Go",
  prompt: "How do you implement rate limiting in Go backend services?",
  expected: "Use token bucket (golang.org/x/time/rate) for per-request limiting; or Redis-based sliding window for distributed rate limiting.",
  keywords: ["rate limit", "token bucket", "golang"],
  explanation: "Rate limiting protects APIs from abuse. In Go, the `golang.org/x/time/rate` package implements a token bucket limiter suitable for single-instance limiting. For distributed rate limiting across multiple servers, use Redis with Lua scripts (sliding window, token bucket) to maintain state. Gin middleware can wrap the limiter. Choose algorithms: token bucket (allows bursts), leaky bucket (smooths traffic), fixed window (simple but spike-prone), sliding window (more accurate).",
  code: `// Single-instance token bucket
import "golang.org/x/time/rate"
var limiter = rate.NewLimiter(rate.Limit(100), 50) // 100 requests/sec, burst 50
func rateLimitMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        if !limiter.Allow() {
            c.AbortWithStatusJSON(429, gin.H{"error": "Too Many Requests"})
            return
        }
        c.Next()
    }
}
// Redis-based sliding window (simplified)
func slidingWindow(ctx context.Context, rdb *redis.Client, key string, limit int, window time.Duration) bool {
    now := time.Now().UnixNano()
    windowStart := now - window.Nanoseconds()
    pipe := rdb.Pipeline()
    pipe.ZRemRangeByScore(ctx, key, "0", strconv.FormatInt(windowStart, 10))
    pipe.ZAdd(ctx, key, redis.Z{Score: float64(now), Member: now})
    pipe.Expire(ctx, key, window)
    count := pipe.ZCard(ctx, key)
    _, _ = pipe.Exec(ctx)
    return count.Val() <= int64(limit)
}`,
},
{
  id: "backend-logging-structure",
  type: "concept",
  topic: "Backend",
  title: "Structured Logging",
  prompt: "What is structured logging and why is it important?",
  expected: "Structured logging outputs logs as structured data (JSON) with key-value pairs, enabling easier searching, filtering, and analysis.",
  keywords: ["logging", "structured", "json"],
  explanation: "Structured logging writes logs as structured data (e.g., JSON) instead of plain text. Each log entry includes fields like timestamp, level, message, and additional context (user ID, request ID, etc.). This makes logs machine-parseable and easier to query in log aggregators like ELK, Loki, or CloudWatch. In Go, use `log/slog` (standard library) or `zerolog` for high-performance structured logging. Include request IDs to trace requests across services.",
  code: `// Using log/slog (Go 1.21+)
import "log/slog"
slog.Info("user created",
    "user_id", user.ID,
    "email", user.Email,
    "request_id", reqID,
)
// Using zerolog
import "github.com/rs/zerolog/log"
log.Info().
    Str("user_id", user.ID).
    Str("email", user.Email).
    Msg("user created")
// Gin middleware to add request ID
func requestID() gin.HandlerFunc {
    return func(c *gin.Context) {
        reqID := uuid.New().String()
        c.Set("request_id", reqID)
        c.Header("X-Request-ID", reqID)
        c.Next()
    }
}`,
},
{
  id: "backend-configuration",
  type: "concept",
  topic: "Backend",
  title: "Configuration Management",
  prompt: "How do you manage configuration in backend applications?",
  expected: "Use environment variables for deployment, config files for defaults, and libraries like viper for unified access.",
  keywords: ["config", "environment", "viper"],
  explanation: "Configuration management involves handling settings that vary across environments. Best practice: use environment variables for secrets and deployment-specific values (12-factor app). Use config files (YAML, JSON, TOML) for defaults and complex structures. Libraries like `viper` in Go can merge from multiple sources: env vars, config files, flags. Validate config at startup. Never commit secrets to source control; use secret management tools (AWS Secrets Manager, HashiCorp Vault) in production.",
  code: `// Using viper
import "github.com/spf13/viper"
func initConfig() {
    viper.SetConfigName("config")   // name of config file (without extension)
    viper.SetConfigType("yaml")
    viper.AddConfigPath(".")
    viper.AutomaticEnv()            // read environment variables
    viper.SetDefault("server.port", 8080)
    if err := viper.ReadInConfig(); err != nil {
        log.Fatal("Failed to read config", err)
    }
}
// Access config
port := viper.GetInt("server.port")
dbURL := viper.GetString("database.url")
// env var overrides: DATABASE_URL`,
},
{
  id: "backend-health-checks",
  type: "concept",
  topic: "Backend",
  title: "Health Checks and Readiness Probes",
  prompt: "What are health checks and why are they important?",
  expected: "Health endpoints (/health, /ready) indicate service liveness and readiness for traffic, used by orchestrators for rolling updates and self-healing.",
  keywords: ["health checks", "readiness", "liveness"],
  explanation: "Health checks are endpoints that report the service's status. Liveness probes indicate if the application is running (should restart if failing). Readiness probes indicate if the application can accept traffic (remove from load balancer if failing). In Kubernetes, these are configured in pod specs. For a backend service, check database connectivity, external dependencies, and internal state. Implement separate endpoints for liveness (lightweight) and readiness (check all dependencies).",
  code: `// Health check endpoint in Gin
func healthHandler(c *gin.Context) {
    // Lightweight liveness check (always ok)
    c.JSON(200, gin.H{"status": "alive"})
}
func readyHandler(c *gin.Context) {
    // Check database
    if err := db.Ping(); err != nil {
        c.JSON(503, gin.H{"status": "not ready", "reason": "database unavailable"})
        return
    }
    // Check other dependencies...
    c.JSON(200, gin.H{"status": "ready"})
}
// In Kubernetes deployment
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5`,
},
{
  id: "backend-dependency-injection",
  type: "concept",
  topic: "Backend",
  title: "Dependency Injection in Go",
  prompt: "How do you implement dependency injection in Go?",
  expected: "Pass dependencies explicitly via constructors or function parameters; use interfaces for testability; avoid global variables.",
  keywords: ["dependency injection", "interfaces", "testing"],
  explanation: "Dependency injection (DI) is a design pattern where components receive their dependencies rather than creating them internally. In Go, this is done by passing dependencies as parameters to functions or structs, often via constructor functions. Use interfaces to decouple from concrete implementations, making testing easier with mocks. Popular DI libraries like `wire` (compile-time) or `fx` (runtime) can help manage complex graphs. Explicit DI improves testability, modularity, and readability.",
  code: `// Define interfaces
type UserRepository interface {
    GetByID(ctx context.Context, id string) (*User, error)
}
type UserService struct {
    repo UserRepository
}
func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}
func (s *UserService) GetUser(ctx context.Context, id string) (*User, error) {
    return s.repo.GetByID(ctx, id)
}
// Production implementation
type postgresUserRepo struct { db *sql.DB }
func (r *postgresUserRepo) GetByID(ctx context.Context, id string) (*User, error) { ... }
func main() {
    db := connectDB()
    repo := &postgresUserRepo{db: db}
    svc := NewUserService(repo)
    // Use svc
}`,
},
{
  id: "go-sqlc",
  type: "concept",
  topic: "Go",
  title: "SQLc for Type-Safe Queries",
  prompt: "What is SQLc and how does it improve database interactions in Go?",
  expected: "SQLc generates type-safe Go code from SQL queries, catching errors at compile time and eliminating manual mapping.",
  keywords: ["sqlc", "type-safe", "code generation"],
  explanation: "SQLc is a tool that generates type-safe Go code from SQL queries. You write SQL queries in `.sql` files, and SQLc generates corresponding Go functions with parameter and return types. This eliminates runtime reflection, reduces boilerplate, and catches errors at compile time. SQLc supports PostgreSQL, MySQL, and SQLite. It integrates well with `database/sql` or `pgx`. It's an alternative to ORMs that prioritizes SQL visibility and type safety.",
  code: `-- schema.sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);
-- query.sql
-- name: GetUser :one
SELECT id, name FROM users WHERE id = $1;
-- name: ListUsers :many
SELECT id, name FROM users ORDER BY name;
-- generated code
type GetUserRow struct {
    ID   uuid.UUID
    Name string
}
func (q *Queries) GetUser(ctx context.Context, id uuid.UUID) (GetUserRow, error) { ... }
// Usage
user, err := queries.GetUser(ctx, userID)`,
},
{
  id: "backend-soft-delete",
  type: "concept",
  topic: "Backend",
  title: "Soft Delete Pattern",
  prompt: "What is soft delete and how do you implement it?",
  expected: "Soft delete marks records as deleted without removing them, allowing recovery and audit trails, using a deleted_at column.",
  keywords: ["soft delete", "audit", "deleted_at"],
  explanation: "Soft delete is a pattern where records are flagged as deleted rather than physically removed. This preserves data for auditing, allows restoration, and avoids cascading deletions. Implementation: add a `deleted_at` timestamp (nullable) column. Queries filter by `deleted_at IS NULL`. In Go, you can create a scope (or default where clause) in your repository layer. For unique constraints, you may need a partial index. Soft deletion requires careful handling of foreign keys and uniqueness constraints.",
  code: `-- Add column
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP;
-- Create partial index for uniqueness on email (only active)
CREATE UNIQUE INDEX idx_users_email_active ON users(email) WHERE deleted_at IS NULL;
-- Query filtered
SELECT * FROM users WHERE deleted_at IS NULL;
-- In Go repository
func (r *userRepo) GetByID(id string) (*User, error) {
    var user User
    err := r.db.Get(&user, "SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL", id)
    return &user, err
}
func (r *userRepo) Delete(id string) error {
    _, err := r.db.Exec("UPDATE users SET deleted_at = NOW() WHERE id = $1", id)
    return err
}`,
},
{
  id: "backend-multitenancy",
  type: "concept",
  topic: "Backend",
  title: "Multi-Tenancy Patterns",
  prompt: "What are approaches for implementing multi-tenancy in backend applications?",
  expected: "Database per tenant (isolated), schema per tenant (shared database), or row-level tenant_id (shared schema).",
  keywords: ["multi-tenancy", "tenant", "isolation"],
  explanation: "Multi-tenancy allows a single application instance to serve multiple tenants (customers). Approaches: 1) Database per tenant – highest isolation, but operational overhead. 2) Schema per tenant (PostgreSQL schemas) – moderate isolation, easier backup. 3) Row-level with tenant_id column – simplest, but risk of cross-tenant leaks. In Go, you typically inject tenant ID via middleware (from JWT or header) and ensure all queries filter by tenant_id. Use PostgreSQL RLS (Row Level Security) for added safety.",
  code: `-- Row-level approach
CREATE TABLE users (
    id SERIAL,
    tenant_id INT NOT NULL,
    name TEXT
);
CREATE INDEX idx_users_tenant ON users(tenant_id);
-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON users
    USING (tenant_id = current_setting('app.current_tenant')::int);
-- In Go middleware
func tenantMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tenantID := c.GetHeader("X-Tenant-ID")
        // Validate tenant
        c.Set("tenant_id", tenantID)
        c.Next()
    }
}
// Repository always filters
func (r *userRepo) GetByID(id string) (*User, error) {
    tenantID := ctx.Value("tenant_id")
    query := "SELECT * FROM users WHERE id = $1 AND tenant_id = $2"
    // ...
}`,
},
{
  id: "postgresql-full-text-search-go",
  type: "concept",
  topic: "PostgreSQL",
  title: "Full-Text Search with PostgreSQL and Go",
  prompt: "How do you implement full-text search in PostgreSQL and use it in Go?",
  expected: "Use tsvector/tsquery with GIN indexes; in Go, pass search terms as parameters and execute queries.",
  keywords: ["full-text search", "tsvector", "gin index"],
  explanation: "PostgreSQL's full-text search is efficient and can be integrated into Go applications. Create a tsvector column, build a GIN index, and query using tsquery. In Go, you can use raw SQL with parameters, being careful about SQL injection. For ranking, use ts_rank. For complex search, you can combine with JSONB or trigram similarity. Consider using `to_tsquery` with user input escaping to prevent injection. This is a good alternative to Elasticsearch for simpler search needs.",
  code: `-- Migration
ALTER TABLE articles ADD COLUMN search_vector tsvector
    GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || content)) STORED;
CREATE INDEX idx_articles_search ON articles USING GIN(search_vector);
-- Query
SELECT id, title, ts_rank(search_vector, query) as rank
FROM articles, plainto_tsquery('english', $1) query
WHERE search_vector @@ query
ORDER BY rank DESC;
-- In Go
func (r *articleRepo) Search(ctx context.Context, term string) ([]Article, error) {
    var articles []Article
    err := r.db.SelectContext(ctx, &articles, \`
        SELECT id, title, content,
               ts_rank(search_vector, query) as rank
        FROM articles,
             plainto_tsquery('english', $1) query
        WHERE search_vector @@ query
        ORDER BY rank DESC
        LIMIT 20
    \`, term)
    return articles, err
}`,
}
];
