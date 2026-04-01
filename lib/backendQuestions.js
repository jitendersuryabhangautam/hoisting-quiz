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
      "Goroutines are lightweight threads managed by the Go runtime, enabling concurrent execution of functions. Unlike traditional OS threads, which are expensive and managed by the operating system, goroutines have a small initial stack size (typically 2KB) that grows dynamically as needed. The Go scheduler multiplexes multiple goroutines onto a smaller number of OS threads, allowing for efficient concurrency. This M:N threading model means you can run hundreds of thousands of goroutines without overwhelming the system. Goroutines communicate and synchronize through channels, following Go's philosophy: 'Do not communicate by sharing memory; instead, share memory by communicating.' They are created by prefixing a function call with 'go', making concurrency idiomatic and easy to use in Go programs. The scheduler uses cooperative scheduling, where goroutines yield control at I/O operations or explicit calls, ensuring fair execution.",
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
      "Channels in Go are typed conduits that enable safe communication and synchronization between goroutines. They act as pipes through which values can be sent and received, ensuring that data exchange happens in a thread-safe manner without the need for explicit locks or mutexes. Channels can be unbuffered, where a send operation blocks until a corresponding receive is ready, or buffered, where sends block only when the buffer is full. The direction of channels can be specified using arrow notation (e.g., chan<- int for send-only, <-chan int for receive-only), which helps enforce proper usage patterns. The 'select' statement allows a goroutine to wait on multiple channel operations simultaneously, enabling non-blocking communication and timeouts. Closing a channel signals that no more values will be sent, and attempting to send on a closed channel causes a panic, while receiving from a closed channel returns the zero value and a false 'ok' flag. Channels are fundamental to Go's concurrency model, promoting CSP (Communicating Sequential Processes) and making concurrent programming more structured and less error-prone.",
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
      "In Go, interfaces define a set of method signatures that a type must implement to satisfy the interface. Unlike many object-oriented languages, Go uses implicit implementation: a type automatically satisfies an interface if it implements all the required methods, without needing an explicit 'implements' declaration. This design promotes flexibility and decoupling, allowing for easy composition and testing through mocking. The empty interface, `interface{}`, can hold values of any type, serving as a generic container (similar to `any` in Go 1.18+). Interfaces encourage the use of small, focused interfaces like `io.Reader` and `io.Writer`, which define minimal contracts. This approach supports polymorphism through interfaces rather than inheritance, leading to more modular and testable code. Type assertions and type switches allow checking and converting interface values back to concrete types, enabling dynamic behavior while maintaining type safety.",
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
      "Go's error handling differs significantly from try/catch exception models used in languages like Java or Python. Instead of throwing exceptions, Go functions typically return an error as the last return value, making errors explicit and part of the function signature. Callers are responsible for checking and handling these errors, which makes error paths visible in the code and prevents silent failures. For truly exceptional situations that should terminate the program, Go provides `panic`, which unwinds the stack and can be recovered with `recover` if needed. The `defer` statement ensures cleanup code runs regardless of how the function exits, commonly used for closing resources. While this approach can lead to repetitive 'if err != nil' checks, it encourages robust error handling. Modern Go (1.13+) supports error wrapping with `fmt.Errorf` using `%w` verb, and inspection with `errors.Is` and `errors.As` for checking error types or unwrapping chains. This design promotes clear, predictable error propagation and better code reliability.",
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
      "Structs in Go are composite data types that group together zero or more fields of different types. They provide a way to create custom data structures, similar to classes in other languages but without inheritance. Methods can be defined on any named type, including structs, by using receivers. Receivers can be value receivers (which work on copies) or pointer receivers (which can modify the original struct and are more efficient for large structs). This allows structs to have behavior attached to them, enabling encapsulation and object-oriented-like programming. Go promotes composition over inheritance through struct embedding, where one struct can include another as an anonymous field, inheriting its methods and fields. Structs can be instantiated using struct literals, the `new()` function, or composite literals. Methods with receivers enable polymorphism through interfaces, allowing different types to implement the same interface. This design keeps Go's type system simple while providing powerful abstraction capabilities.",
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
      "ACID (Atomicity, Consistency, Isolation, Durability) is a set of properties that guarantee reliable processing of database transactions. Atomicity ensures that all operations within a transaction are treated as a single unit - either all succeed or all fail, preventing partial updates. Consistency maintains the database's integrity constraints, ensuring transitions between valid states. Isolation makes concurrent transactions appear to execute serially, preventing interference between them. Durability guarantees that once a transaction is committed, its changes persist even in the event of system failures. These properties are crucial for applications requiring data reliability, such as financial systems or e-commerce platforms. Different databases implement ACID differently, and SQL standard defines isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) that trade off between consistency and performance. Understanding ACID helps developers design robust transaction logic and handle concurrency issues effectively.",
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
      "Database indexes are data structures that improve the speed of data retrieval operations on database tables at the cost of additional storage space and slower write operations. Without indexes, queries perform full table scans (O(n) time complexity), checking every row. With indexes, typically implemented as B-trees or B+-trees, lookups can be performed in O(log n) time. Indexes can enforce uniqueness constraints and support efficient sorting and range queries. However, they add overhead to INSERT, UPDATE, and DELETE operations because the index must be maintained. Effective indexing strategies include creating indexes on frequently queried columns, using composite indexes for multi-column queries, partial indexes for filtered data, and covering indexes that include all columns needed by a query to avoid table lookups. Tools like EXPLAIN plans help identify missing indexes, and monitoring index usage prevents unnecessary maintenance overhead. Proper indexing is crucial for database performance optimization.",
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
      "JSONB is PostgreSQL's advanced binary JSON data type that stores JSON data in a decomposed, optimized format for efficient querying and indexing. Unlike the JSON type which stores data as text, JSONB allows for fast access to individual keys and values, supports advanced querying with operators like `->`, `->>`, `@>`, `?`, and `?&`, and can be indexed using GIN (Generalized Inverted Index) for rapid searches. It's ideal for applications dealing with semi-structured data, dynamic schemas, or when integrating with document-oriented systems while maintaining relational database benefits. JSONB enables powerful queries such as existence checks, path operations, and complex filtering, making it suitable for metadata storage, configuration data, or API responses. However, it trades some storage efficiency and update performance for query flexibility. When designing schemas, consider using JSONB for flexible attributes alongside traditional columns for frequently queried, structured data to balance performance and adaptability.",
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
      "Window functions in SQL perform calculations across a set of table rows related to the current row, without collapsing the result set like aggregate functions with GROUP BY. They operate on a 'window' defined by the OVER clause, which can include PARTITION BY for grouping and ORDER BY for sorting within partitions. Unlike GROUP BY, window functions preserve individual row identities while adding computed values. Common functions include ranking functions (ROW_NUMBER, RANK, DENSE_RANK), aggregate functions (SUM, AVG, COUNT), and navigation functions (LAG, LEAD, FIRST_VALUE, LAST_VALUE). They excel at analytical queries like running totals, moving averages, percentile calculations, and comparing values across rows. Window functions can significantly simplify complex queries that would otherwise require self-joins, subqueries, or application-side processing. They are particularly powerful for time-series analysis, financial reporting, and data science applications, enabling sophisticated analytics directly in the database layer.",
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
      "Common Table Expressions (CTEs) are temporary named result sets defined within a SQL statement using the WITH clause, allowing for more readable and modular query construction. They can be referenced multiple times within the main query and can reference other CTEs, enabling complex query decomposition. Recursive CTEs (using WITH RECURSIVE) are particularly powerful for traversing hierarchical or tree-structured data, such as organizational charts, bill of materials, or graph structures. CTEs improve code maintainability by breaking down complex queries into logical steps and can sometimes provide performance benefits through optimization opportunities. While CTEs are generally materialized in PostgreSQL, they help organize query logic and support advanced patterns like recursive queries. They are essential for handling self-referential data and complex analytical queries that would be difficult or impossible with standard SQL constructs.",
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
      "EXPLAIN in PostgreSQL displays the execution plan chosen by the query planner, showing how the database intends to execute a query. It reveals operations like sequential scans, index scans, joins, sorts, and aggregations, along with estimated costs and row counts. EXPLAIN ANALYZE actually executes the query and provides real execution times, actual row counts, and buffer usage, helping identify discrepancies between estimates and reality. Key optimization indicators include high costs, sequential scans on large tables, nested loop joins with many rows, and inaccurate row estimates. Common optimization techniques involve adding appropriate indexes, updating table statistics with ANALYZE, rewriting queries to avoid functions in WHERE clauses, using covering indexes, or restructuring joins. The auto_explain module can automatically log execution plans for slow queries. Mastering EXPLAIN is essential for database performance tuning and understanding why queries run slowly.",
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
      "REST (Representational State Transfer) is an architectural style for designing networked applications, particularly APIs. Key principles include identifying resources with URIs (Uniform Resource Identifiers), manipulating resources through standard HTTP methods (GET for retrieval, POST for creation, PUT for full updates, PATCH for partial updates, DELETE for removal), and maintaining statelessness where each request contains all necessary information. APIs should use appropriate HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error) and ensure idempotency for safe retry operations. Resource naming should use nouns rather than verbs, following patterns like /users, /users/{id}, /users/{id}/posts. Versioning strategies include URL paths (/v1/users), query parameters, or headers. Responses should be consistent, typically JSON, and may include hypermedia links (HATEOAS) for discoverability. Well-designed REST APIs are intuitive, cacheable, and promote loose coupling between clients and servers.",
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
      "Middleware functions are software components that intercept and process requests and responses in a pipeline architecture, commonly used in web frameworks. They execute sequentially, having access to request and response objects, and can modify them, terminate the request, or pass control to the next middleware. Common use cases include authentication (verifying user credentials), authorization (checking permissions), logging (recording request details), request parsing (handling JSON/form data), CORS (Cross-Origin Resource Sharing) configuration, compression (reducing response size), rate limiting (preventing abuse), and error handling (catching and formatting errors). Middleware promotes separation of concerns by extracting cross-cutting functionality from route handlers. In frameworks like Express.js, Gin, or Django, middleware can be applied globally or to specific routes. Error-handling middleware typically has an additional error parameter and should be placed after other middleware. Well-designed middleware enhances code reusability, maintainability, and allows for modular request processing.",
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
      "Authentication and authorization are two fundamental security concepts that work together but serve different purposes. Authentication is the process of verifying a user's identity, confirming 'who you are' through mechanisms like passwords, tokens, biometrics, or certificates. Once authenticated, authorization determines what resources or operations the user can access, answering 'what you can do.' Common authentication methods include session-based (using cookies), token-based (JWT, OAuth2), or single sign-on (SSO). Authorization often implements role-based access control (RBAC) where users have roles with associated permissions, or attribute-based access control (ABAC) considering multiple factors. In backend systems, authentication typically happens at login, while authorization occurs on each request through middleware. Proper separation ensures that authentication validates credentials and establishes identity, while authorization enforces access policies. Both are critical for secure applications, with authentication preventing unauthorized access and authorization limiting what authenticated users can do.",
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
      "Caching is a technique to store frequently accessed data in fast-access storage to reduce latency and database load. Common strategies include cache-aside (lazy loading), where the application checks cache first, loads from database on miss, and populates cache; write-through, where writes update both cache and database synchronously; and write-behind (write-back), where writes update cache immediately and database asynchronously. Cache invalidation is challenging, often handled through time-based expiration, event-driven invalidation (e.g., on data updates), or cache versioning. Multi-level caching can be implemented at various layers: CDN for static content, API gateway for responses, application layer for computed results, and database query cache. Tools like Redis or Memcached provide distributed, in-memory storage with features like TTL, pub/sub for invalidation, and data structures. Effective caching strategies consider cache hit ratios, memory usage, consistency requirements, and cache warming. Proper implementation significantly improves application performance and scalability.",
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
      "API versioning allows introducing breaking changes without disrupting existing clients, ensuring backward compatibility. Common strategies include URL path versioning (e.g., /v1/users), which is explicit and cache-friendly but can lead to URL proliferation; query parameter versioning (/users?version=1), which keeps URLs clean but may be less discoverable; custom header versioning (Accept-Version: v1), which maintains clean URLs and is flexible but requires client awareness; and content negotiation using Accept headers. Each approach has trade-offs: URL versioning is simple and visible, header versioning keeps URLs clean but can be overlooked. Semantic versioning (major.minor.patch) helps communicate change impact. Backward compatibility can also be maintained by adding optional fields rather than removing existing ones. Effective versioning strategies consider client migration timelines, deprecation policies, and clear documentation to minimize disruption.",
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
      "Database transactions ensure data consistency when performing multiple related operations, treating them as a single atomic unit. In backend applications, transactions are managed by starting with BEGIN, executing operations, and either COMMIT on success or ROLLBACK on failure. Key considerations include keeping transactions short to minimize lock duration and avoid deadlocks, handling errors properly to ensure rollback, and choosing appropriate isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) balancing consistency and performance. In code, frameworks provide transaction management: in Go with database/sql using db.Begin(), tx.Commit(), tx.Rollback(); in Node.js with connection pooling; in Python with context managers. For distributed systems spanning multiple services, patterns like Saga or two-phase commit handle complex transactions. Proper transaction handling prevents data corruption, ensures atomicity, and maintains database integrity under concurrent access.",
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
      "Rate limiting controls the number of requests a client can make to an API within a specified time window, protecting against abuse and ensuring fair resource usage. It prevents denial-of-service attacks, brute force attempts, and helps maintain service availability. Common algorithms include token bucket (allows bursts up to capacity, refills at a steady rate), leaky bucket (smooths traffic by processing requests at a constant rate), fixed window (simple counter reset at interval boundaries, prone to boundary bursts), and sliding window (more accurate, tracks requests in rolling time windows). Implementation often uses Redis for distributed counting and atomic operations. Rate limits can be applied per user, IP address, API key, or endpoint. HTTP headers like X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After inform clients of limits and when to retry. Effective rate limiting requires considering legitimate usage patterns, providing clear error responses, and possibly implementing different tiers for various user types.",
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
      "Observability is the ability to understand a system's internal state from its external outputs, crucial for monitoring and debugging complex systems. The three pillars are: Logging captures discrete events with structured data and context, useful for debugging specific issues and auditing; Metrics provide aggregated quantitative data like request counts, latency percentiles, and error rates, enabling trend analysis and alerting; Tracing follows requests across service boundaries, showing the complete execution path and identifying performance bottlenecks. Together, they provide comprehensive visibility. Best practices include using structured logging (JSON format), implementing distributed tracing with correlation IDs, collecting business and infrastructure metrics, and using standards like OpenTelemetry for instrumentation. Effective observability reduces mean time to resolution (MTTR) for incidents and supports proactive system optimization.",
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
      "SQL joins combine rows from two or more tables based on related columns, enabling retrieval of related data across normalized schemas. INNER JOIN returns only rows with matching values in both tables, effectively finding intersections. LEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table with matching rows from the right table, filling nulls where no match exists. RIGHT JOIN is the mirror of LEFT JOIN. FULL JOIN (or FULL OUTER JOIN) returns all rows from both tables with nulls for non-matching rows. CROSS JOIN creates a Cartesian product of all rows. Understanding join types is crucial for efficient data retrieval; join order and appropriate indexes significantly impact query performance. Use EXPLAIN to analyze execution plans and optimize join strategies.",
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
      "Database normalization is the process of organizing data to minimize redundancy and improve data integrity through progressive rules called normal forms. First Normal Form (1NF) requires atomic values and no repeating groups. Second Normal Form (2NF) eliminates partial dependencies on composite primary keys. Third Normal Form (3NF) removes transitive dependencies where non-key attributes depend on other non-key attributes. Boyce-Codd Normal Form (BCNF) is a stricter version of 3NF. Higher normal forms exist but are rarely used in practice. Normalization reduces update anomalies and ensures data consistency, but can sometimes require complex joins. Denormalization (introducing controlled redundancy) may be applied for performance in read-heavy applications. Proper normalization is fundamental to database design.",
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
      "PostgreSQL supports multiple index types optimized for different query patterns. B-tree indexes are the default, handling equality and range queries efficiently with O(log n) performance. GIN (Generalized Inverted Index) excels with composite data types like arrays, JSONB documents, and full-text search vectors, enabling fast searches on contained elements. GiST (Generalized Search Tree) supports geometric data, range types, and custom operators with flexible indexing strategies. BRIN (Block Range INdex) provides compact indexes for very large tables where data is correlated with physical storage order, such as time-series data. SP-GiST offers space-partitioned indexing for hierarchical data. Choosing the appropriate index type based on data characteristics and query patterns can dramatically improve performance.",
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
      "Go provides powerful concurrency primitives through goroutines and channels. Common patterns include: Worker pools for distributing tasks among a fixed number of goroutines to limit resource usage. Fan-out/fan-in for distributing work to multiple goroutines and collecting results. Pipelines for chaining operations where each stage processes data and passes it to the next via channels. Context propagation for cancellation and deadlines across goroutine hierarchies. Select statements with default cases for non-blocking operations. Generator patterns for producing values on channels. These patterns leverage Go's CSP model to build scalable, maintainable concurrent systems.",
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
      "The context package is fundamental to Go's approach to managing request lifecycles, cancellation, and request-scoped values. Contexts carry deadlines, cancellation signals, and key-value pairs across API boundaries and goroutine trees. They are typically passed as the first parameter (conventionally named 'ctx') to functions that might take time. Key functions include WithCancel (for manual cancellation), WithTimeout (for time limits), WithDeadline (for absolute deadlines), and WithValue (for request-scoped data). Contexts form a tree structure where cancelling a parent context cancels all its children. The Done() channel signals when a context is cancelled or times out. Proper context usage is crucial for preventing goroutine leaks, implementing graceful shutdowns, and building responsive, cancellable operations.",
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
      "The sync package provides essential low-level synchronization primitives for coordinating goroutines and protecting shared state. Mutex (mutual exclusion) ensures only one goroutine accesses a critical section at a time, preventing race conditions. RWMutex allows multiple concurrent readers but exclusive access for writers, optimizing read-heavy scenarios. WaitGroup enables waiting for a collection of goroutines to complete, useful for coordinating parallel work. Once guarantees a function executes exactly once, even in concurrent environments, commonly used for lazy initialization. Cond (condition variables) allow goroutines to wait for certain conditions to be met. While channels are preferred for goroutine communication, sync primitives are necessary when protecting shared memory or implementing complex synchronization patterns.",
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
      "The embed directive, introduced in Go 1.16, allows embedding static files and directories directly into the compiled binary at build time. This eliminates the need to distribute separate asset files, simplifying deployment and ensuring assets are always available. Files can be embedded as string literals, byte slices, or as an embed.FS (read-only filesystem interface). Common use cases include embedding HTML templates, CSS/JavaScript assets, configuration files, SQL migration scripts, or any static resources. The embedded files become part of the binary, reducing the number of deployment artifacts and preventing issues with missing files. However, embedded files cannot be modified at runtime, so they're best suited for read-only assets.",
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
      "Multi-Version Concurrency Control (MVCC) is a database concurrency control method that maintains multiple versions of each row to enable high concurrency without blocking. Instead of locking rows during reads, MVCC creates snapshots of the database at specific points in time. In PostgreSQL, each row has system columns xmin (transaction ID that created the row) and xmax (transaction ID that deleted/modified the row). When a transaction reads data, it sees only rows visible according to its snapshot - rows created by committed transactions before the snapshot and not deleted by any transaction. This allows readers and writers to operate simultaneously without conflicts, significantly improving performance in concurrent environments. MVCC eliminates the need for read locks and reduces deadlock scenarios.",
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
      "Table partitioning in PostgreSQL divides large tables into smaller, more manageable physical pieces called partitions, based on a partition key. This improves performance through partition pruning (queries only scan relevant partitions), simplifies maintenance (easily drop old partitions for archiving), and enhances bulk loading efficiency. PostgreSQL supports range partitioning (by date ranges), list partitioning (by discrete values), and hash partitioning (for even distribution). Declarative partitioning (introduced in PostgreSQL 10) makes partition management automatic. Ideal for time-series data, geographical data, or any table with a natural partitioning key. Partitioning is particularly beneficial for tables larger than what fits in memory or when queries frequently filter by the partition key.",
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
      "PostgreSQL's full-text search enables efficient searching through large text documents using specialized data types and functions. Text is converted to tsvector (stores normalized words/lexemes with positions) and searched using tsquery (represents search terms with operators). The @@ operator performs the match. GIN indexes on tsvector columns provide fast searches. Features include ranking with ts_rank/ts_rank_cd, stemming, stop words, and language-specific dictionaries. Full-text search supports phrase searches, prefix matching, and complex boolean queries. It's suitable for document search, content management, and can be combined with regular SQL queries. For advanced needs, consider integrating with Elasticsearch, but PostgreSQL's built-in FTS handles many use cases effectively.",
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
      "Graceful shutdown ensures that a server completes processing existing requests and closes connections cleanly before terminating, preventing client errors and data corruption. In Go, this involves listening for OS signals (SIGINT, SIGTERM), calling server.Shutdown() with a context timeout to allow ongoing requests to finish, and performing cleanup tasks like closing database connections and flushing logs. Without graceful shutdown, abrupt termination can cause connection resets, incomplete transactions, and resource leaks. This is crucial for maintaining service reliability during deployments and scaling operations.",
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
      "The circuit breaker pattern protects systems from cascading failures by monitoring calls to a service and temporarily stopping requests when failures exceed a threshold. It has three states: Closed (normal operation, failures counted), Open (requests fail immediately after threshold reached, allowing the failing service time to recover), and Half-Open (limited test requests to check if service has recovered). This pattern prevents resource exhaustion and gives downstream services recovery time. Implementations include Netflix Hystrix, resilience4j, or custom logic. Circuit breakers are essential for building resilient microservices architectures.",
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
      "OpenTelemetry (OTel) is a vendor-neutral observability framework that provides standardized APIs, SDKs, and tools for generating and collecting telemetry data (traces, metrics, logs) across different languages and platforms. It enables distributed tracing to follow requests across service boundaries, identifying performance bottlenecks and failure points. Metrics collection supports counters, gauges, and histograms for quantitative monitoring. OTel integrates with various backends like Jaeger, Prometheus, and commercial observability platforms. Key concepts include TracerProvider for trace management, Span for individual operations, and Context propagation for distributed tracing. OTel is crucial for understanding complex microservices behavior and implementing effective monitoring strategies.",
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
      "SQL injection occurs when malicious SQL code is inserted into a query through untrusted input, potentially allowing attackers to read, modify, or delete database data. It happens when user input is directly concatenated into SQL strings without proper sanitization. Prevention requires using parameterized queries (prepared statements) where SQL code and data are separated, making injection impossible. In Go, use database/sql with placeholders like $1, $2. ORMs automatically parameterize queries. Additional defenses include input validation, stored procedures, and least-privilege database accounts. Always treat user input as untrusted and use secure coding practices to prevent this common vulnerability.",
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
      "HTTP clients in backend services require careful configuration for reliability and performance. Always set appropriate timeouts (connection, TLS handshake, response header, and overall request) to prevent hanging requests that consume resources. Reuse HTTP client instances rather than creating new ones for each request, as clients maintain connection pools. Close response bodies immediately after use to prevent memory leaks. Implement retries with exponential backoff for transient failures (network issues, 5xx errors). Use context for cancellation and deadlines to handle request lifecycle properly. Avoid the default http.DefaultClient which has no timeout. Consider connection pooling limits and keep-alive settings for high-throughput applications.",
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
      "Monolithic applications are built as a single, unified codebase where all components are tightly coupled and deployed together. They offer simpler development, testing, and deployment initially, with easier debugging and performance optimization. However, they become difficult to scale teams around, introduce technology lock-in, and require full redeployment for any change. Microservices architecture decomposes applications into independently deployable services, each handling a specific business capability. Benefits include independent scaling, technology diversity per service, and team autonomy. Drawbacks include distributed system complexity (network latency, data consistency challenges, service discovery), increased operational overhead, and eventual consistency issues. Most organizations start with a monolith and gradually extract services as clear boundaries emerge.",
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
      "Message queues enable asynchronous communication between services, decoupling producers from consumers and providing reliable message delivery. RabbitMQ is a traditional message broker using AMQP protocol, offering advanced routing capabilities, message persistence, and complex patterns like fan-out and topic exchanges. Kafka is a distributed streaming platform optimized for high-throughput event streaming, with durable log-based storage and replay capabilities. Queues are essential for handling traffic spikes, ensuring reliability through persistence and acknowledgments, and building event-driven architectures. They support patterns like work queues for load distribution, pub/sub for broadcasting, and request-reply for RPC-style communication.",
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
      "gRPC is a high-performance RPC framework developed by Google that uses HTTP/2 for transport, Protocol Buffers for efficient binary serialization, and generates strongly-typed client and server code. It excels in performance, streaming capabilities (unary, server-streaming, client-streaming, bidirectional), and strongly-typed APIs. REST uses HTTP/1.1 with JSON payloads, is more human-readable, cacheable, and widely adopted with extensive tooling. Choose gRPC for internal microservice communication where performance and type safety are critical; use REST for public APIs, browser clients, or when broad interoperability is needed. gRPC supports advanced features like load balancing, authentication, and deadline propagation.",
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
      "Transaction isolation levels determine how concurrent transactions interact and what anomalies they can prevent. Read Uncommitted allows dirty reads (seeing uncommitted changes from other transactions). Read Committed (default in PostgreSQL) prevents dirty reads but allows non-repeatable reads (a row changes between reads in the same transaction) and phantom reads (new rows appear in subsequent queries). Repeatable Read prevents non-repeatable reads but may allow phantom reads. Serializable provides the strongest isolation, preventing all anomalies by making transactions appear to execute sequentially. Higher isolation levels reduce concurrency and can cause more lock conflicts, so choose based on your application's consistency requirements versus performance needs.",
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
      "Redis (REmote DIctionary Server) is an open-source, in-memory data structure store known for its exceptional speed and versatility. It supports various data structures including strings, hashes, lists, sets, sorted sets with range queries, bitmaps for compact data, and streams for event processing. Redis is commonly used for caching to reduce database load, session storage, real-time analytics with counters and leaderboards, rate limiting, pub/sub messaging, and as a lightweight message broker. Its single-threaded architecture ensures atomic operations, while persistence options (RDB snapshots, AOF logs) and replication provide durability. Redis clusters enable horizontal scaling and high availability.",
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
      "Redis offers a rich set of data structures beyond simple key-value pairs, enabling complex data modeling and operations. Strings are the basic type for storing text or binary data, supporting operations like incrementing numbers. Hashes store field-value pairs, ideal for representing objects with multiple attributes. Lists are ordered collections supporting push/pop operations from both ends, perfect for queues, stacks, or recent items. Sets provide unique, unordered collections with set operations like union and intersection. Sorted Sets add scoring and ranking capabilities, enabling leaderboards and priority queues. Bitmaps allow compact storage and manipulation of binary data. Streams provide append-only logs for event sourcing and real-time data processing. Choosing the appropriate data structure optimizes memory usage, performance, and code simplicity for specific use cases.",
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
      "Redis is an excellent caching layer due to its speed and data structures. Cache-aside (lazy loading) pattern: application checks cache first, queries database on miss, then populates cache. Write-through ensures writes update both cache and database synchronously, maintaining consistency. Write-behind (write-back) updates cache immediately and defers database writes asynchronously for better performance. Time-based expiration (TTL) automatically removes stale data. Cache invalidation strategies include explicit deletion on updates, cache versioning to handle concurrent modifications, and event-driven invalidation using pub/sub. The choice depends on consistency requirements, write patterns, and acceptable staleness levels. Redis also supports advanced patterns like cache warming and probabilistic expiration.",
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
      "Although Redis is primarily an in-memory store, it provides persistence mechanisms to ensure data durability. RDB (Redis Database) snapshots create point-in-time backups of the entire dataset at configured intervals, based on time elapsed and number of changes. RDB files are compact and efficient for backups but may lose recent data between snapshots. AOF (Append-Only File) logs every write operation in a human-readable format, allowing complete reconstruction of the dataset on restart. AOF can be configured to fsync immediately, every second, or never, balancing durability with performance. Combining both (RDB for fast loading and AOF for durability) provides comprehensive data safety. Redis Enterprise offers additional persistence options like active-active replication across regions.",
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
      "Amazon Simple Storage Service (S3) is a highly scalable, durable object storage service designed for storing and retrieving any amount of data from anywhere on the web. Core concepts include buckets (globally unique containers for objects), objects (the fundamental entities stored in S3, consisting of data, metadata, and a unique key), and keys (unique identifiers for objects within a bucket). S3 operates across multiple regions for low-latency access and disaster recovery. Key features include 99.999999999% (11 nines) durability, versioning for data protection, lifecycle policies for automatic data management, and various storage classes optimized for different access patterns and costs. S3 integrates seamlessly with other AWS services and supports strong read-after-write consistency for all operations.",
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
      "S3 offers multiple storage classes optimized for different access patterns and cost requirements. S3 Standard provides high durability and low latency for frequently accessed data. S3 Intelligent-Tiering automatically moves objects between access tiers based on changing patterns, with a small monitoring fee. S3 Standard-IA offers lower storage costs for infrequently accessed data but charges retrieval fees. S3 One Zone-IA provides even lower costs but stores data in a single Availability Zone, suitable for secondary backups. S3 Glacier classes are for archival storage: Glacier Instant Retrieval for archives needing millisecond access, Glacier Flexible Retrieval for minutes to hours access, and Glacier Deep Archive for the lowest cost with 12-48 hour retrieval times. Lifecycle policies can automatically transition objects between classes based on age or other criteria.",
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
      "S3 security implements defense-in-depth principles. Block public access by default and use bucket policies to grant granular permissions based on IAM roles, IP addresses, or conditions. Implement encryption at rest using SSE-S3 (server-side AES-256), SSE-KMS (customer-managed keys), or client-side encryption. Enable versioning to protect against accidental deletions and overwrites. Use pre-signed URLs for temporary access to private objects. Configure appropriate object ACLs when needed. Enable S3 Access Logs and AWS CloudTrail for comprehensive auditing. Regularly review bucket permissions and avoid public buckets unless absolutely necessary. Use VPC endpoints for secure access from within AWS networks.",
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
      "Docker images are immutable, layered filesystems containing everything needed to run an application: code, runtime, system tools, libraries, and configurations. They are built from Dockerfiles using instructions that create cached layers. Containers are running instances of images, adding a thin writable layer for temporary data while maintaining isolation through namespaces and cgroups. Unlike virtual machines, containers share the host kernel, making them lightweight and fast to start. Key operations include building images with `docker build`, running containers with `docker run`, listing containers with `docker ps`, and managing the container lifecycle with commands like `docker stop` and `docker rm`. Docker enables consistent deployment across development, testing, and production environments.",
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
      "A Dockerfile contains instructions for building Docker images, with each instruction creating a cached layer. Best practices include using specific, official base images (avoid 'latest' tag for reproducibility), combining RUN commands to minimize layers, using .dockerignore to exclude unnecessary files, and implementing multi-stage builds to reduce final image size. Order instructions from least to most frequently changing to maximize layer caching. Run containers as non-root users for security, use COPY instead of ADD unless extracting archives, and leverage build arguments and environment variables appropriately. These practices improve build performance, security, maintainability, and reduce attack surface.",
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
      "Docker containers are ephemeral by design; data written to the container's writable layer disappears when the container is removed. To persist data, use volumes (managed by Docker) or bind mounts (direct mapping to host directories). Volumes are the preferred approach for production: they are platform-agnostic, easier to backup and migrate, and managed through Docker commands. Named volumes can be created explicitly and reused across containers. Bind mounts are useful for development (live code reloading) but less portable. For stateful applications like databases, always use volumes to ensure data persistence. Docker Compose simplifies volume management in multi-container applications.",
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
      "Docker Compose is a tool for defining and managing multi-container Docker applications using a declarative YAML configuration file. It allows you to define services, networks, and volumes in a single file, then start the entire application stack with simple commands. Compose is ideal for development, testing, and staging environments where you need to run interconnected services. It supports environment variable substitution, build contexts, service dependencies, and scaling. While Compose is great for local development, production deployments typically use Docker Swarm or Kubernetes for orchestration at scale.",
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
      "Kubernetes is a powerful container orchestration platform that automates deployment, scaling, and management of containerized applications. Core concepts include: Pod - the smallest deployable unit containing one or more tightly coupled containers that share network and storage. Deployment - manages the desired state and rollout strategy for pods, handling updates and scaling. Service - provides stable networking and load balancing to access pods. ConfigMap - stores non-sensitive configuration data. Secret - securely stores sensitive information. Namespace - provides logical isolation within a cluster. Ingress - manages external HTTP/HTTPS access with routing rules. PersistentVolume - abstracts storage details for stateful applications. The control plane (API server, scheduler, etcd, controller manager) manages the cluster, while nodes run the actual workloads.",
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
      "Kubernetes Services provide stable networking endpoints for accessing pods, abstracting away the dynamic nature of pod IP addresses. ClusterIP (default) creates an internal cluster IP accessible only within the cluster, ideal for internal service-to-service communication. NodePort exposes the service on a static port (30000-32767) on each cluster node, useful for development or single-node clusters. LoadBalancer provisions a cloud provider's load balancer for external access, automatically routing traffic to healthy pods. Ingress is not a Service type but manages HTTP/HTTPS routing at the application layer, supporting host-based and path-based routing, SSL termination, and integration with external load balancers. Service discovery is automatic through DNS (service-name.namespace.svc.cluster.local).",
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
      "ConfigMaps and Secrets enable decoupling configuration from container images for better portability and security. ConfigMaps store non-sensitive configuration data as key-value pairs, environment variables, or files. They can be created from literals, files, or directories. Secrets store sensitive data like passwords, tokens, and certificates, with values base64-encoded (not encrypted by default). Both can be injected into pods as environment variables or mounted as volumes. For enhanced security, enable encryption at rest for Secrets and consider external secret management solutions like AWS Secrets Manager or HashiCorp Vault. Use RBAC to control access to Secrets, and avoid storing Secrets in version control. ConfigMaps are ideal for application settings, while Secrets handle credentials and sensitive configuration.",
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
      "Helm is the package manager for Kubernetes, simplifying the deployment and management of complex applications. A Helm Chart is a collection of templated Kubernetes manifests that can be parameterized and versioned. Charts define resources like Deployments, Services, ConfigMaps, and Secrets with Go templating syntax. Values files allow customization without modifying the chart. Helm manages releases (named installations) and supports install, upgrade, rollback, and uninstall operations. Charts can be shared through repositories like Artifact Hub. Helm 3 removed the server-side Tiller component for improved security. It's essential for managing application lifecycles in Kubernetes environments.",
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
      "Kubernetes abstracts persistent storage through PersistentVolumes (PVs) and PersistentVolumeClaims (PVCs). PVs are cluster-wide storage resources provisioned by administrators, representing physical storage (NFS, cloud disks, local storage). PVCs are requests for storage by users, specifying size, access modes (ReadWriteOnce, ReadOnlyMany, ReadWriteMany), and optionally storage class. The scheduler binds matching PVs to PVCs. Pods consume PVCs by mounting them as volumes, ensuring data persistence across pod restarts. StorageClasses enable dynamic provisioning, where the cluster automatically creates PVs when PVCs are requested. This abstraction decouples applications from underlying storage infrastructure.",
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
      "Kubernetes supports multiple deployment strategies for updating applications. RollingUpdate (default) gradually replaces old pods with new ones, configurable with maxSurge (extra pods allowed) and maxUnavailable (pods that can be unavailable), ensuring zero-downtime updates. Recreate terminates all existing pods before creating new ones, causing temporary downtime but ensuring clean state transitions. For advanced strategies, tools like Argo Rollouts enable canary deployments (gradual traffic shifting with automated rollback on failures) and blue-green deployments (running both old and new versions simultaneously). RollingUpdate works for most stateless applications; stateful applications may require careful consideration of data consistency.",
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
    expected:
      "Gin uses a radix tree for efficient routing; path parameters are defined with colon (:id) and accessed with c.Param().",
    keywords: ["gin", "routing", "parameters"],
    explanation:
      "Gin is a high-performance HTTP web framework for Go. It uses a radix tree (prefix tree) to route requests efficiently. Path parameters are defined using colons (e.g., `/users/:id`). Query parameters are accessed via `c.Query()` or `c.DefaultQuery()`. Body parameters can be bound to structs using `c.ShouldBindJSON()` or `c.ShouldBind()`. Gin supports grouped routes for organizing API versions or modules. It also provides middleware support for cross-cutting concerns.",
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
    expected:
      "Middleware is a function returning gin.HandlerFunc; use c.Next() to pass control; can be applied globally or to route groups.",
    keywords: ["gin", "middleware", "handler"],
    explanation:
      "Gin middleware are functions that process requests before reaching the handler. They can perform authentication, logging, rate limiting, etc. Custom middleware functions typically accept a gin.HandlerFunc and return one. Inside, you can execute code before and after calling `c.Next()`. Middleware can be registered globally with `r.Use()` or to specific route groups. They can also abort the request with `c.Abort()`.",
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
    expected:
      "Use binding structs with validation tags (binding:required, min, max, email) and c.ShouldBind to get errors.",
    keywords: ["validation", "binding", "gin"],
    explanation:
      'Gin integrates with the validator package (go-playground/validator) via binding tags. Define structs with validation tags like `binding:"required,min=3"` or `binding:"email"`. Use `c.ShouldBindJSON()` or `c.ShouldBindQuery()` to bind and validate. If validation fails, Gin returns a 400 with detailed error messages. You can also implement custom validators or use `c.Bind()` for automatic response on error.',
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
    expected:
      "Use consistent error responses, centralized error handling middleware, and custom error types for domain-specific errors.",
    keywords: ["error handling", "gin", "middleware"],
    explanation:
      "Error handling in Gin can be organized by returning errors from handlers and using a central error handling middleware. Define custom error types to differentiate between client errors (4xx) and server errors (5xx). Use `c.Error(err)` to add errors to the context, and a middleware to format and respond. Alternatively, handle errors inline and return JSON responses. For validation errors, use `c.ShouldBind()` which automatically responds with 400. For panic recovery, Gin includes a recovery middleware.",
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
    expected:
      "Connection pooling reuses database connections to reduce overhead; in Go, use sql.DB which manages a connection pool with SetMaxOpenConns, SetMaxIdleConns.",
    keywords: ["connection pooling", "pgx", "performance"],
    explanation:
      "Connection pooling is crucial for performance in web applications. Opening a new database connection for each request is expensive. Go's `database/sql` includes built-in connection pooling. You can configure `SetMaxOpenConns` (max simultaneous connections), `SetMaxIdleConns` (idle connections kept open), and `SetConnMaxLifetime` (max time a connection can be reused). For PostgreSQL, the `pgx` driver offers additional pooling options. Proper pool sizing avoids connection exhaustion and reduces latency. Use tools like `pgbouncer` as a lightweight connection pooler between app and database for larger deployments.",
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
    prompt:
      "How do you manage transaction isolation levels in Go with PostgreSQL?",
    expected:
      "Use sql.Tx with options: sql.TxOptions{Isolation: sql.LevelRepeatableRead}. PostgreSQL isolation levels affect concurrency behavior.",
    keywords: ["isolation", "transactions", "go"],
    explanation:
      "Go's `database/sql` allows setting transaction isolation levels via `sql.TxOptions`. PostgreSQL supports four isolation levels: Read Uncommitted (maps to Read Committed), Read Committed (default), Repeatable Read, and Serializable. Each level provides different guarantees regarding dirty reads, non-repeatable reads, and phantom reads. Choosing the right isolation level balances consistency and performance. In Go, you can start a transaction with `db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelRepeatableRead})`. Always handle errors and commit/rollback appropriately.",
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
    prompt:
      "What locking mechanisms does PostgreSQL provide and when to use them?",
    expected:
      "Row-level locks (SELECT FOR UPDATE), table-level locks (LOCK TABLE), advisory locks (custom application locks).",
    keywords: ["locking", "row-level", "advisory"],
    explanation:
      "PostgreSQL offers various locking options. Row-level locks: `SELECT ... FOR UPDATE` locks rows for update, preventing concurrent modifications. Table-level locks: `LOCK TABLE` can lock entire tables with different modes (ACCESS SHARE, ROW EXCLUSIVE, etc.). Advisory locks are application-specific locks managed by the database, useful for coordinating operations across processes. For optimistic concurrency, you can use version numbers or timestamps. Choosing the right lock depends on the use case: row locks for updating specific rows, table locks for bulk operations, advisory locks for distributed coordination.",
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
    expected:
      "Use OpenAPI/Swagger specification to define endpoints, request/response schemas, and generate interactive documentation.",
    keywords: ["swagger", "openapi", "documentation"],
    explanation:
      "API documentation is crucial for maintainability and developer experience. OpenAPI (formerly Swagger) is a standard specification for describing REST APIs. You can write YAML/JSON files manually or generate them from code annotations. Tools like Swagger UI provide interactive documentation. In Go, libraries like `swaggo/swag` generate OpenAPI spec from comments. Benefits: auto-generated client SDKs, contract testing, and clear communication between teams.",
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
    expected:
      "Offset/limit (simple but inefficient for large datasets), keyset/cursor (efficient for infinite scroll), and page-based.",
    keywords: ["pagination", "cursor", "offset"],
    explanation:
      "Pagination is essential for APIs returning large datasets. Offset/limit (`?offset=0&limit=10`) is simple but suffers from performance issues when offset grows large (database scans many rows). Keyset/cursor pagination (`?cursor=...`) uses a unique, sortable field (e.g., ID, timestamp) and is more efficient for large datasets, ideal for infinite scroll. It requires ordering by the cursor field. Page-based (`?page=1&size=10`) is similar to offset/limit but often implemented as offset/limit. Choose based on dataset size and client requirements.",
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
    expected:
      "Use token bucket (golang.org/x/time/rate) for per-request limiting; or Redis-based sliding window for distributed rate limiting.",
    keywords: ["rate limit", "token bucket", "golang"],
    explanation:
      "Rate limiting protects APIs from abuse. In Go, the `golang.org/x/time/rate` package implements a token bucket limiter suitable for single-instance limiting. For distributed rate limiting across multiple servers, use Redis with Lua scripts (sliding window, token bucket) to maintain state. Gin middleware can wrap the limiter. Choose algorithms: token bucket (allows bursts), leaky bucket (smooths traffic), fixed window (simple but spike-prone), sliding window (more accurate).",
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
    expected:
      "Structured logging outputs logs as structured data (JSON) with key-value pairs, enabling easier searching, filtering, and analysis.",
    keywords: ["logging", "structured", "json"],
    explanation:
      "Structured logging writes logs as structured data (e.g., JSON) instead of plain text. Each log entry includes fields like timestamp, level, message, and additional context (user ID, request ID, etc.). This makes logs machine-parseable and easier to query in log aggregators like ELK, Loki, or CloudWatch. In Go, use `log/slog` (standard library) or `zerolog` for high-performance structured logging. Include request IDs to trace requests across services.",
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
    expected:
      "Use environment variables for deployment, config files for defaults, and libraries like viper for unified access.",
    keywords: ["config", "environment", "viper"],
    explanation:
      "Configuration management involves handling settings that vary across environments. Best practice: use environment variables for secrets and deployment-specific values (12-factor app). Use config files (YAML, JSON, TOML) for defaults and complex structures. Libraries like `viper` in Go can merge from multiple sources: env vars, config files, flags. Validate config at startup. Never commit secrets to source control; use secret management tools (AWS Secrets Manager, HashiCorp Vault) in production.",
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
    expected:
      "Health endpoints (/health, /ready) indicate service liveness and readiness for traffic, used by orchestrators for rolling updates and self-healing.",
    keywords: ["health checks", "readiness", "liveness"],
    explanation:
      "Health checks are endpoints that report the service's status. Liveness probes indicate if the application is running (should restart if failing). Readiness probes indicate if the application can accept traffic (remove from load balancer if failing). In Kubernetes, these are configured in pod specs. For a backend service, check database connectivity, external dependencies, and internal state. Implement separate endpoints for liveness (lightweight) and readiness (check all dependencies).",
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
    expected:
      "Pass dependencies explicitly via constructors or function parameters; use interfaces for testability; avoid global variables.",
    keywords: ["dependency injection", "interfaces", "testing"],
    explanation:
      "Dependency injection (DI) is a design pattern where components receive their dependencies rather than creating them internally. In Go, this is done by passing dependencies as parameters to functions or structs, often via constructor functions. Use interfaces to decouple from concrete implementations, making testing easier with mocks. Popular DI libraries like `wire` (compile-time) or `fx` (runtime) can help manage complex graphs. Explicit DI improves testability, modularity, and readability.",
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
    expected:
      "SQLc generates type-safe Go code from SQL queries, catching errors at compile time and eliminating manual mapping.",
    keywords: ["sqlc", "type-safe", "code generation"],
    explanation:
      "SQLc is a tool that generates type-safe Go code from SQL queries. You write SQL queries in `.sql` files, and SQLc generates corresponding Go functions with parameter and return types. This eliminates runtime reflection, reduces boilerplate, and catches errors at compile time. SQLc supports PostgreSQL, MySQL, and SQLite. It integrates well with `database/sql` or `pgx`. It's an alternative to ORMs that prioritizes SQL visibility and type safety.",
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
    expected:
      "Soft delete marks records as deleted without removing them, allowing recovery and audit trails, using a deleted_at column.",
    keywords: ["soft delete", "audit", "deleted_at"],
    explanation:
      "Soft delete is a pattern where records are flagged as deleted rather than physically removed. This preserves data for auditing, allows restoration, and avoids cascading deletions. Implementation: add a `deleted_at` timestamp (nullable) column. Queries filter by `deleted_at IS NULL`. In Go, you can create a scope (or default where clause) in your repository layer. For unique constraints, you may need a partial index. Soft deletion requires careful handling of foreign keys and uniqueness constraints.",
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
    prompt:
      "What are approaches for implementing multi-tenancy in backend applications?",
    expected:
      "Database per tenant (isolated), schema per tenant (shared database), or row-level tenant_id (shared schema).",
    keywords: ["multi-tenancy", "tenant", "isolation"],
    explanation:
      "Multi-tenancy allows a single application instance to serve multiple tenants (customers). Approaches: 1) Database per tenant – highest isolation, but operational overhead. 2) Schema per tenant (PostgreSQL schemas) – moderate isolation, easier backup. 3) Row-level with tenant_id column – simplest, but risk of cross-tenant leaks. In Go, you typically inject tenant ID via middleware (from JWT or header) and ensure all queries filter by tenant_id. Use PostgreSQL RLS (Row Level Security) for added safety.",
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
    prompt:
      "How do you implement full-text search in PostgreSQL and use it in Go?",
    expected:
      "Use tsvector/tsquery with GIN indexes; in Go, pass search terms as parameters and execute queries.",
    keywords: ["full-text search", "tsvector", "gin index"],
    explanation:
      "PostgreSQL's full-text search provides powerful, built-in search capabilities without needing external tools like Elasticsearch. Full-text search indexes text content and supports natural language queries. Key components: tsvector (tokenized, stemmed, normalized text), tsquery (search query), and GIN indexes for fast lookups. In Go, you can use `plainto_tsquery` for simple searches or `to_tsquery` for advanced boolean queries. Ranking with `ts_rank` or `ts_rank_cd` helps order results by relevance. For multi-language support, specify language in `to_tsvector`. Consider using generated columns for automatic vector updates. This approach is efficient for moderate datasets and integrates seamlessly with your existing PostgreSQL database.",
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
  },
];
