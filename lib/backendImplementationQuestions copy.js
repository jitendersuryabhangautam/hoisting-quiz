export const backendImplementationQuestions = [
  {
    id: "start-node-http-server",
    type: "implementation",
    topic: "Server Setup",
    title: "Start a basic Node.js HTTP server",
    prompt:
      "Write code to start a basic Node.js HTTP server that listens on port 3000 and responds with 'Hello World' to every request.",
    starter: `const http = require('http');
// your code here`,
    referenceSolution: `const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});
server.listen(3000, () => console.log('Server running on port 3000'));`,
    explanation:
      "The `http.createServer` method accepts a request handler. `listen` binds the server to a port.",
    hint: "Remember to set the response status code and end the response.",
  },
  {
    id: "start-express-server",
    type: "implementation",
    topic: "Server Setup",
    title: "Start an Express.js server",
    prompt:
      "Create an Express.js server that listens on port 3000 and responds with 'Hello Express' on GET /.",
    starter: `const express = require('express');
const app = express();
// your code here`,
    referenceSolution: `const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello Express'));
app.listen(3000, () => console.log('Express server on port 3000'));`,
    explanation:
      "Express provides a minimal routing system. `app.listen` starts the server.",
    hint: "Use `app.get` to handle GET requests.",
  },
  {
    id: "start-go-net-http",
    type: "implementation",
    topic: "Server Setup",
    title: "Start a Go HTTP server using net/http",
    prompt:
      "Write a Go program that starts an HTTP server on port 8080 and returns 'Hello Go' for any request.",
    starter: `package main
// your code here`,
    referenceSolution: `package main
import (
    "fmt"
    "net/http"
)
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello Go")
}
func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}`,
    explanation:
      "`http.HandleFunc` registers a handler. `ListenAndServe` starts the server.",
    hint: "Use `fmt.Fprintf` to write to the response writer.",
  },
  {
    id: "start-go-gin",
    type: "implementation",
    topic: "Server Setup",
    title: "Start a Go server using Gin framework",
    prompt:
      "Use Gin to create a server on port 8080 that responds with 'Hello Gin' on GET /.",
    starter: `package main
// your code here`,
    referenceSolution: `package main
import "github.com/gin-gonic/gin"
func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.String(200, "Hello Gin")
    })
    r.Run(":8080")
}`,
    explanation:
      "Gin provides a router with convenient methods. `Run` starts the server.",
    hint: "Install Gin first: `go get github.com/gin-gonic/gin`.",
  },
  {
    id: "server-port-env",
    type: "implementation",
    topic: "Server Setup",
    title: "Configure server port using environment variables",
    prompt:
      "Modify your Express server to read the port from the `PORT` environment variable (default to 3000).",
    starter: `const express = require('express');
const app = express();
// your code here`,
    referenceSolution: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Hello'));
app.listen(PORT, () => console.log(\`Server on \${PORT}\`));`,
    explanation:
      "`process.env.PORT` reads the environment variable; fallback with `||`.",
    hint: "Test with `PORT=5000 node server.js`.",
  },
  {
    id: "graceful-shutdown",
    type: "implementation",
    topic: "Server Setup",
    title: "Implement graceful server shutdown",
    prompt:
      "Add graceful shutdown to an Express server: close the server on SIGTERM/SIGINT and exit after pending requests finish.",
    starter: `const express = require('express');
const app = express();
const server = app.listen(3000);
// your shutdown logic here`,
    referenceSolution: `const express = require('express');
const app = express();
const server = app.listen(3000);
function shutdown() {
    console.log('Shutdown signal received, closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);`,
    explanation:
      "Listen for termination signals, call `server.close` to stop accepting new connections and wait for existing ones.",
    hint: "Listen for both SIGINT and SIGTERM, then close the server before exiting to allow pending requests to finish.",
  },
  {
    id: "request-logging-middleware",
    type: "implementation",
    topic: "Server Setup",
    title: "Implement request logging middleware",
    prompt:
      "Write an Express middleware that logs method, URL, and response time for each request.",
    starter: `const express = require('express');
const app = express();
// your logging middleware here
app.get('/', (req, res) => res.send('ok'));
app.listen(3000);`,
    referenceSolution: `const express = require('express');
const app = express();
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(\`\${req.method} \${req.url} - \${duration}ms\`);
    });
    next();
});
app.get('/', (req, res) => res.send('ok'));
app.listen(3000);`,
    explanation:
      "Capture start time, then listen to 'finish' event to log after response is sent.",
    hint: "`res.on('finish')` is triggered when the response is fully transmitted.",
  },
  {
    id: "request-timeout-middleware",
    type: "implementation",
    topic: "Server Setup",
    title: "Implement request timeout middleware",
    prompt:
      "Create an Express middleware that aborts requests taking longer than 5 seconds with a 408 status.",
    starter: `const express = require('express');
const app = express();
// your timeout middleware here
app.get('/slow', (req, res) => setTimeout(() => res.send('done'), 6000));
app.listen(3000);`,
    referenceSolution: `const express = require('express');
const app = express();
app.use((req, res, next) => {
    const timeout = 5000;
    req.setTimeout(timeout, () => {
        if (!res.headersSent) {
            res.status(408).send('Request Timeout');
        }
    });
    res.setTimeout(timeout, () => {
        if (!res.headersSent) {
            res.status(408).send('Response Timeout');
        }
    });
    next();
});
app.get('/slow', (req, res) => setTimeout(() => res.send('done'), 6000));
app.listen(3000);`,
    explanation:
      "Use `req.setTimeout` and `res.setTimeout` to abort slow requests. Guard `res.headersSent` so timeout handlers don't send after the response already started.",
    hint: "Set both request and response timeouts for reliable slow-request handling.",
  },
  {
    id: "health-check-endpoint",
    type: "implementation",
    topic: "Server Setup",
    title: "Implement health check endpoint (/health)",
    prompt: "Add a `/health` endpoint that returns `{ status: 'ok' }` as JSON.",
    starter: `const express = require('express');
const app = express();
// your code here
app.listen(3000);`,
    referenceSolution: `const express = require('express');
const app = express();
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(3000);`,
    explanation:
      "Health checks are used by load balancers and orchestrators to verify service liveness.",
    hint: "You can also add database connectivity checks in a production health endpoint.",
  },
  {
    id: "hot-reload",
    type: "implementation",
    topic: "Server Setup",
    title: "Implement hot reload in development (nodemon / air)",
    prompt:
      "Show how to set up nodemon for a Node.js project and air for a Go project.",
    starter: `// package.json scripts section
// your nodemon config here`,
    referenceSolution: `// For Node.js (package.json)
"scripts": {
  "dev": "nodemon server.js"
}
// For Go (using air)
// Install: go install github.com/cosmtrek/air@latest
// Run: air`,
    explanation:
      "Hot reload restarts the server automatically when source files change, speeding up development.",
    hint: "Nodemon can be installed globally or as a dev dependency.",
  },
  {
    id: "create-get-api-express",
    type: "implementation",
    topic: "API Development",
    title: "Create a GET API in Express",
    prompt:
      "Create an Express GET endpoint `/users` that returns an array of user objects.",
    starter: `const express = require('express');
const app = express();
app.get('/users', (req, res) => {
    // your handler
});
app.listen(3000);`,
    referenceSolution: `const express = require('express');
const app = express();
app.get('/users', (req, res) => {
    const users = [{ id: 1, name: 'Alice' }];
    res.json(users);
});
app.listen(3000);`,
    explanation:
      "`app.get` defines a GET route; `res.json` sends JSON response.",
    hint: "Use query parameters for filtering.",
  },
  {
    id: "create-post-api-express",
    type: "implementation",
    topic: "API Development",
    title: "Create a POST API in Express",
    prompt:
      "Create a POST endpoint `/users` that accepts a JSON body and returns the created user.",
    starter: `const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
    // your handler
});`,
    referenceSolution: `app.use(express.json());
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = Date.now();
    res.status(201).json(newUser);
});`,
    explanation:
      "`express.json()` middleware parses JSON body; `res.status(201)` indicates resource creation.",
    hint: "Validate the body before using it.",
  },
  {
    id: "route-parameters",
    type: "implementation",
    topic: "API Development",
    title: "Implement route parameters (/users/:id)",
    prompt:
      "Write an Express route `/users/:id` that returns a user object based on the `id` parameter.",
    starter: `app.get('/users/:id', (req, res) => {
    // your code
});`,
    referenceSolution: `app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (Number.isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    const user = { id: userId, name: 'User' + userId };
    res.json(user);
});`,
    explanation:
      "`req.params` contains route parameters. Parse route values explicitly and reject invalid IDs before using them.",
    hint: "Use `parseInt(..., 10)` and validate numeric input.",
  },
  {
    id: "query-parameters",
    type: "implementation",
    topic: "API Development",
    title: "Implement query parameters (pagination/filtering)",
    prompt:
      "Create a GET `/items` endpoint that supports `page` and `limit` query params for pagination.",
    starter: `app.get('/items', (req, res) => {
    // your pagination logic
});`,
    referenceSolution: `app.get('/items', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const start = (page - 1) * limit;
    const items = Array.from({ length: 100 }, (_, i) => ({ id: i+1 }));
    const paginated = items.slice(start, start + limit);
    res.json({ page, limit, data: paginated });
});`,
    explanation:
      "Query parameters are in `req.query`. Use `slice` for in‑memory pagination.",
    hint: "Add `total` and `totalPages` to the response for better UX.",
  },
  {
    id: "parse-json-body",
    type: "implementation",
    topic: "API Development",
    title: "Parse JSON request body",
    prompt:
      "Configure Express to parse JSON request bodies and show an example POST handler.",
    starter: `const express = require('express');
const app = express();
app.use(express.json());
app.post('/data', (req, res) => {
    // your code to handle parsed JSON
});
app.listen(3000);`,
    referenceSolution: `const express = require('express');
const app = express();
app.use(express.json());
app.post('/data', (req, res) => {
    console.log(req.body);
    res.json({ received: req.body });
});
app.listen(3000);`,
    explanation:
      "`express.json()` is built-in middleware that parses incoming JSON and populates `req.body` before route handlers run.",
    hint: "For URL-encoded data use `express.urlencoded({ extended: true })`.",
  },
  {
    id: "request-validation",
    type: "implementation",
    topic: "API Development",
    title: "Implement request validation",
    prompt:
      "Write a validation middleware that checks if POST `/user` has `name` and `email` fields.",
    starter: `const express = require('express');
const app = express();
app.use(express.json());
function validateUser(req, res, next) {
    // your validation
}
app.post('/user', validateUser, (req, res) => {
    res.send('ok');
});
app.listen(3000);`,
    referenceSolution: `function validateUser(req, res, next) {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email' });
    }
    next();
}
app.post('/user', validateUser, (req, res) => {
    res.json({ success: true });
});`,
    explanation:
      "Validation middleware checks required fields and returns a 400 response immediately for invalid requests, preventing bad data from reaching your business logic.",
    hint: "Use lightweight schema validators like Joi, Zod, or express-validator for input validation.",
    explanation:
      "Validation middleware checks required fields and returns a 400 response immediately for invalid requests, preventing bad data from reaching your business logic. Call `next()` only when validation passes.",
    hint: "Use schema validation libraries like Joi, Zod, or express-validator for more robust input checks.",
  },
  {
    id: "standard-api-response-format",
    type: "implementation",
    topic: "API Development",
    title: "Implement standard API response format",
    prompt:
      "Create a helper function that standardizes success and error responses.",
    starter: `function successResponse(res, data, message = 'Success') {}`,
    referenceSolution: `function successResponse(res, data, message = 'Success') {
    return res.json({ success: true, message, data });
}
function errorResponse(res, message = 'Error', status = 500) {
    return res.status(status).json({ success: false, message });
}`,
    explanation:
      "Standardized responses make API consumption predictable for frontend teams.",
    hint: "Include a `code` field for error categorization.",
  },
  {
    id: "error-handling-middleware",
    type: "implementation",
    topic: "API Development",
    title: "Implement error handling middleware",
    prompt:
      "Write an Express error handling middleware that logs errors and returns a generic message in production.",
    starter: `app.use((err, req, res, next) => {
    // your code
});`,
    referenceSolution: `app.use((err, req, res, next) => {
    console.error(err.stack);
    const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
    res.status(500).json({ error: message });
});`,
    explanation:
      "Error-handling middleware has four parameters. Place it after all routes.",
    hint: "Don't forget to call `next(err)` from route handlers.",
  },
  {
    id: "async-handler-wrapper",
    type: "implementation",
    topic: "API Development",
    title: "Implement async handler wrapper",
    prompt:
      "Create a wrapper function that catches errors in async route handlers and passes them to Express error middleware.",
    starter: `const asyncHandler = (fn) => (req, res, next) => {}`,
    referenceSolution: `const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Usage: app.get('/route', asyncHandler(async (req, res) => { ... }));`,
    explanation:
      "This eliminates repetitive try/catch in async route handlers.",
    hint: "Express 5 will support this natively.",
  },
  {
    id: "controller-service-repository",
    type: "implementation",
    topic: "API Development",
    title: "Implement Controller-Service-Repository pattern",
    prompt:
      "Sketch the three layers for a `getUser` feature: controller (route handler), service (business logic), repository (data access).",
    starter: `// Repository
class UserRepository { findById(id) {} }
// Service
class UserService { constructor(repo) {} }
// Controller
function getUserController(req, res) {}`,
    referenceSolution: `class UserRepository {
    async findById(id) { return { id, name: 'John' }; }
}
class UserService {
    constructor(userRepository) { this.userRepo = userRepository; }
    async getUser(id) { return this.userRepo.findById(id); }
}
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
async function getUserController(req, res) {
    const user = await userService.getUser(req.params.id);
    res.json(user);
}`,
    explanation:
      "Separation of concerns improves testability and maintainability.",
    hint: "Inject dependencies to allow mocking in tests.",
  },
  {
    id: "connect-node-postgres",
    type: "implementation",
    topic: "Database",
    title: "Connect Node.js to PostgreSQL",
    prompt:
      "Write code to connect a Node.js app to PostgreSQL using the 'pg' library.",
    starter: `const { Client } = require('pg');
// your connection code`,
    referenceSolution: `const { Client } = require('pg');
async function main() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'secret',
        database: 'mydb'
    });
    await client.connect();
    console.log('Connected to PostgreSQL');
    await client.end();
}
main().catch(console.error);`,
    explanation:
      "The `pg` client connects using a config object. Wrap connection logic in an async function and close the client with `end()` when finished.",
    hint: "Use environment variables for credentials.",
  },
  {
    id: "connect-go-postgres",
    type: "implementation",
    topic: "Database",
    title: "Connect Go to PostgreSQL",
    prompt:
      "Write a Go program that connects to PostgreSQL using `database/sql` and `lib/pq`.",
    starter: `package main
import (
    "database/sql"
    _ "github.com/lib/pq"
)
// your connection code`,
    referenceSolution: `package main
import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
)
func main() {
    connStr := "user=postgres dbname=mydb password=secret host=localhost sslmode=disable"
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        panic(err)
    }
    defer db.Close()
    err = db.Ping()
    if err != nil {
        panic(err)
    }
    fmt.Println("Connected")
}`,
    explanation:
      "`sql.Open` returns a connection pool; `Ping` verifies connectivity.",
    hint: "Use `defer db.Close()` to release resources.",
  },
  {
    id: "connection-pooling",
    type: "implementation",
    topic: "Database",
    title: "Implement database connection pooling",
    prompt:
      "Configure a connection pool in Node.js with `pg` that has max 20 connections, idle timeout 30s.",
    starter: `const { Pool } = require('pg');
// your pool config`,
    referenceSolution: `const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'secret',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000
});`,
    explanation:
      "Connection pools reuse connections, improving performance under load.",
    hint: "Always acquire a client with `pool.connect()` and release it.",
  },
  {
    id: "select-query",
    type: "implementation",
    topic: "Database",
    title: "Write SELECT query implementation",
    prompt:
      "Execute a SELECT query in Node.js to fetch all users from a `users` table.",
    starter: `async function fetchUsers() {
    const result = await pool.query('SELECT * FROM users');
    // your code to handle result
}
fetchUsers().catch(console.error);`,
    referenceSolution: `async function fetchUsers() {
    try {
        const result = await pool.query('SELECT * FROM users');
        console.log(result.rows);
    } catch (err) {
        console.error(err);
    }
}
fetchUsers();`,
    explanation:
      "`pool.query` returns a result object with `rows` array containing the data.",
    hint: "Use parameterized queries to avoid SQL injection.",
  },
  {
    id: "insert-query",
    type: "implementation",
    topic: "Database",
    title: "Write INSERT query implementation",
    prompt:
      "Insert a new user into the `users` table using parameterized query.",
    starter: `async function insertUser() {
    const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
    const values = ['Alice', 'alice@example.com'];
    // your code
}
insertUser().catch(console.error);`,
    referenceSolution: `async function insertUser() {
    try {
        const result = await pool.query(text, values);
        const newUser = result.rows[0];
        console.log('Inserted:', newUser);
    } catch (err) {
        console.error(err);
    }
}
insertUser();`,
    explanation:
      "Parameterized queries prevent SQL injection. `RETURNING *` gives back the inserted row.",
    hint: "Always use placeholders ($1, $2) instead of string interpolation.",
  },
  {
    id: "update-query",
    type: "implementation",
    topic: "Database",
    title: "Write UPDATE query implementation",
    prompt: "Update a user's email by ID using parameterized UPDATE.",
    starter: `async function updateUser() {
    const updateText = 'UPDATE users SET email = $1 WHERE id = $2 RETURNING *';
    const updateValues = ['newemail@example.com', 1];
    // your code
}
updateUser().catch(console.error);`,
    referenceSolution: `async function updateUser() {
    try {
        const result = await pool.query(updateText, updateValues);
        if (result.rowCount === 0) console.log('User not found');
        else console.log('Updated:', result.rows[0]);
    } catch (err) {
        console.error(err);
    }
}
updateUser();`,
    explanation: "`rowCount` tells you how many rows were affected.",
    hint: "Always check `rowCount` to handle missing records.",
  },
  {
    id: "delete-query",
    type: "implementation",
    topic: "Database",
    title: "Write DELETE query implementation",
    prompt: "Delete a user by ID using DELETE query.",
    starter: `async function deleteUser() {
    const deleteText = 'DELETE FROM users WHERE id = $1';
    const deleteId = 1;
    // your code
}
deleteUser().catch(console.error);`,
    referenceSolution: `async function deleteUser() {
    try {
        const result = await pool.query(deleteText, [deleteId]);
        if (result.rowCount === 0) console.log('No user deleted');
        else console.log('Deleted user id', deleteId);
    } catch (err) {
        console.error(err);
    }
}
deleteUser();`,
    explanation: "DELETE also returns `rowCount` to confirm deletion.",
    hint: "Consider soft deletes (e.g., `deleted_at` column) instead of hard deletes.",
  },
  {
    id: "fetch-single-record",
    type: "implementation",
    topic: "Database",
    title: "Fetch single record using QueryRow",
    prompt: "In Go, fetch a single user by ID using `QueryRow`.",
    starter: `var user User
err := db.QueryRow("SELECT id, name FROM users WHERE id = $1", 1).Scan(&user.ID, &user.Name)
// your error handling`,
    referenceSolution: `err := db.QueryRow("SELECT id, name FROM users WHERE id = $1", 1).Scan(&user.ID, &user.Name)
if err == sql.ErrNoRows {
    fmt.Println("No user found")
} else if err != nil {
    panic(err)
}`,
    explanation:
      "`QueryRow` returns at most one row; `Scan` copies columns into variables. Check `sql.ErrNoRows`.",
    hint: "Always handle `ErrNoRows` separately.",
  },
  {
    id: "database-transactions",
    type: "implementation",
    topic: "Database",
    title: "Implement database transactions",
    prompt:
      "Use a transaction to transfer money from account A to account B: update both balances or rollback.",
    starter: `async function transferMoney(amount, fromId, toId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // your updates
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}
transferMoney(100, 1, 2).catch(console.error);`,
    referenceSolution: `async function transferMoney(amount, fromId, toId) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const res1 = await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
        const res2 = await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId]);
        if (res1.rowCount !== 1 || res2.rowCount !== 1) throw new Error('Update failed');
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}
transferMoney(100, 1, 2).catch(console.error);`,
    explanation:
      "Transactions ensure atomicity. Always `COMMIT` on success and `ROLLBACK` on error, while releasing the client in `finally`.",
    hint: "Remember to release the client back to the pool.",
  },
  {
    id: "handle-database-errors",
    type: "implementation",
    topic: "Database",
    title: "Handle database errors properly",
    prompt:
      "Catch a unique constraint violation error from PostgreSQL and return a user-friendly message.",
    starter: `async function createUser() {
    try {
        await pool.query('INSERT INTO users(email) VALUES($1)', ['duplicate@example.com']);
    } catch (err) {
        // your error handling
    }
}
createUser().catch(console.error);`,
    referenceSolution: `async function createUser() {
    try {
        await pool.query('INSERT INTO users(email) VALUES($1)', ['duplicate@example.com']);
    } catch (err) {
        if (err.code === '23505') { // unique_violation
            console.log('Email already exists');
        } else {
            console.error('Database error:', err);
        }
    }
}
createUser();`,
    explanation:
      "PostgreSQL error codes are numeric strings. `23505` is unique violation. Use them to differentiate errors and return friendly messages.",
    hint: "Consult the PostgreSQL error code list for common codes like `23503` (foreign key violation).",
  },
  {
    id: "what-are-migrations",
    type: "implementation",
    topic: "Migrations",
    title: "What are database migrations",
    prompt:
      "Write a short explanation and a sample migration file for creating a 'products' table.",
    starter: `// Explain migrations in 2-3 sentences, then show a migration snippet`,
    referenceSolution: `// Database migrations are version-controlled scripts that incrementally change your database schema.
// Example migration (Knex):
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.decimal('price');
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('products');
};`,
    explanation:
      "Migrations allow consistent schema changes across environments and enable rollbacks.",
    hint: "Always provide a `down` method to revert changes.",
  },
  {
    id: "setup-knex-migrations",
    type: "implementation",
    topic: "Migrations",
    title: "Setup Knex migrations",
    prompt:
      "Show the commands to initialize Knex, create a migration, and run it.",
    starter: `// terminal commands`,
    referenceSolution: `npm install knex pg
npx knex init
npx knex migrate:make create_users_table
npx knex migrate:latest`,
    explanation:
      "Knex CLI helps generate and run migration files. Config is in `knexfile.js`.",
    hint: "Set your database connection in `knexfile.js` before running migrations.",
  },
  {
    id: "setup-prisma-migrations",
    type: "implementation",
    topic: "Migrations",
    title: "Setup Prisma migrations",
    prompt:
      "Initialize Prisma, define a User model, and generate the first migration.",
    starter: `// schema.prisma model definition and commands`,
    referenceSolution: `npx prisma init
// edit schema.prisma:
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
}
npx prisma migrate dev --name init`,
    explanation:
      "Prisma uses a declarative schema; `migrate dev` generates and applies SQL migrations.",
    hint: "Use `prisma migrate deploy` in production.",
  },
  {
    id: "setup-sequelize-migrations",
    type: "implementation",
    topic: "Migrations",
    title: "Setup Sequelize migrations",
    prompt: "Install Sequelize CLI, create a migration for a 'posts' table.",
    starter: `// commands and migration file`,
    referenceSolution: `npm install --save-dev sequelize-cli
npx sequelize-cli init
npx sequelize-cli migration:generate --name create-posts
// edit generated migration file
npx sequelize-cli db:migrate`,
    explanation:
      "Sequelize migrations are JavaScript files with `up` and `down` methods.",
    hint: "Use `queryInterface.createTable` inside the migration.",
  },
  {
    id: "setup-golang-migrate",
    type: "implementation",
    topic: "Migrations",
    title: "Setup golang-migrate tool",
    prompt:
      "Install golang-migrate, create a migration, and apply it to PostgreSQL.",
    starter: `// bash commands`,
    referenceSolution: `# Install
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.15.0/migrate.linux-amd64.tar.gz | tar xvz
sudo mv migrate /usr/local/bin
# Create migration
migrate create -ext sql -dir migrations -seq create_users_table
# Apply
migrate -path migrations -database "postgres://user:pass@localhost:5432/db?sslmode=disable" up`,
    explanation:
      "golang-migrate uses plain SQL files with `up` and `down` suffixes.",
    hint: "Store migration files in version control.",
  },
  {
    id: "create-users-table-migration",
    type: "implementation",
    topic: "Migrations",
    title: "Create users table migration",
    prompt:
      "Write a Knex migration that creates a 'users' table with id, name, email, timestamps.",
    starter: `exports.up = function(knex) {
    // your code
};`,
    referenceSolution: `exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.timestamps(true, true);
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};`,
    explanation:
      "`timestamps(true, true)` adds `created_at` and `updated_at` with default values.",
    hint: "Add indexes for columns used in WHERE clauses.",
  },
  {
    id: "add-column-migration",
    type: "implementation",
    topic: "Migrations",
    title: "Add column migration",
    prompt:
      "Write a migration that adds an 'age' integer column to the 'users' table.",
    starter: `exports.up = function(knex) {
    // your code
};`,
    referenceSolution: `exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.integer('age');
    });
};
exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('age');
    });
};`,
    explanation:
      "Use `schema.table` to alter an existing table. Always provide a `down` to drop the column.",
    hint: "For large tables, add nullable columns first, then backfill data.",
  },
  {
    id: "rollback-migration",
    type: "implementation",
    topic: "Migrations",
    title: "Rollback migration",
    prompt:
      "Show the commands to rollback the last migration in Knex, Prisma, and golang-migrate.",
    starter: `// commands for each tool`,
    referenceSolution: `# Knex
npx knex migrate:rollback
# Prisma
npx prisma migrate resolve --rolled-back "migration_name"
# golang-migrate
migrate -path migrations -database "postgres://..." down 1`,
    explanation:
      "Rollback reverts the last batch of migrations. Use carefully in production.",
    hint: "Test rollbacks in a staging environment first.",
  },
  {
    id: "add-index-migration",
    type: "implementation",
    topic: "Migrations",
    title: "Add index migration",
    prompt:
      "Write a migration that adds an index on the `email` column of the `users` table.",
    starter: `exports.up = function(knex) {
    // your code
};`,
    referenceSolution: `exports.up = function(knex) {
    return knex.schema.table('users', table => {
        table.index('email');
    });
};
exports.down = function(knex) {
    return knex.schema.table('users', table => {
        table.dropIndex('email');
    });
};`,
    explanation:
      "Indexes speed up read queries but add overhead on writes. Create them after data is inserted.",
    hint: "For composite indexes use `table.index(['col1', 'col2'])`.",
  },
  {
    id: "run-migrations-automatically",
    type: "implementation",
    topic: "Migrations",
    title: "Run migrations automatically at startup",
    prompt:
      "Modify your Node.js app to automatically run pending migrations on startup (in development).",
    starter: `const { migrate } = require('some-lib');
// your startup code`,
    referenceSolution: `const knex = require('knex')(config);
async function start() {
    await knex.migrate.latest();
    app.listen(3000);
}
start();`,
    explanation:
      "Running migrations automatically is convenient in dev but risky in production (use orchestration instead).",
    hint: "Check `process.env.NODE_ENV` to conditionally auto-migrate.",
  },
  {
    id: "password-hashing-bcrypt",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Implement password hashing using bcrypt",
    prompt:
      "Write a function to hash a plain text password and compare it later.",
    starter: `const bcrypt = require('bcrypt');
async function hashPassword(plain) {}`,
    referenceSolution: `async function hashPassword(plain) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plain, saltRounds);
    return hash;
}
async function comparePassword(plain, hash) {
    return await bcrypt.compare(plain, hash);
}`,
    explanation:
      "bcrypt salts and hashes passwords. Never store plain text passwords.",
    hint: "Use 10-12 salt rounds; higher rounds are slower but more secure.",
  },
  {
    id: "signup-api",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Create signup API",
    prompt:
      "Create a POST `/signup` endpoint that accepts email and password, hashes password, and saves user.",
    starter: `app.post('/signup', async (req, res) => {
    // your code
});`,
    referenceSolution: `app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        await db.query('INSERT INTO users(email, password_hash) VALUES($1, $2)', [email, hashed]);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        if (err.code === '23505') return res.status(400).json({ error: 'Email exists' });
        res.status(500).json({ error: 'Server error' });
    }
});`,
    explanation:
      "Hash before storing; handle duplicate email errors gracefully.",
    hint: "Always use HTTPS in production to protect passwords in transit.",
  },
  {
    id: "login-api",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Create login API",
    prompt:
      "Create POST `/login` that verifies email/password and returns a success message.",
    starter: `app.post('/login', async (req, res) => {
    // your code
});`,
    referenceSolution: `app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await db.query('SELECT id, password_hash FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful' });
});`,
    explanation:
      "Use generic 'Invalid credentials' to avoid user enumeration attacks.",
    hint: "Next step: return a JWT token instead of a simple message.",
  },
  {
    id: "generate-jwt-token",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Generate JWT token",
    prompt:
      "Write a function that generates a JWT containing user id and email, expires in 1 hour.",
    starter: `const jwt = require('jsonwebtoken');
function generateToken(user) {}`,
    referenceSolution: `function generateToken(user) {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}`,
    explanation:
      "JWT is signed with a secret; include non‑sensitive claims. Never store passwords in token.",
    hint: "Store JWT_SECRET in environment variables, not in code.",
  },
  {
    id: "jwt-verification-middleware",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Implement JWT verification middleware",
    prompt:
      "Create Express middleware that verifies the Authorization Bearer token and attaches user to req.",
    starter: `function authenticate(req, res, next) {
    // your code
}`,
    referenceSolution: `function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}`,
    explanation:
      "Extract token from `Bearer <token>` format. Attach decoded payload to `req.user`.",
    hint: "Handle both missing token and invalid token separately.",
  },
  {
    id: "protect-routes-auth",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Protect routes using authentication",
    prompt:
      "Apply the `authenticate` middleware to a `/profile` route to return user info.",
    starter: `app.get('/profile', authenticate, (req, res) => {
    // your code
});`,
    referenceSolution: `app.get('/profile', authenticate, (req, res) => {
    res.json({ user: req.user });
});`,
    explanation:
      "The middleware runs before the route handler; if authentication fails it sends 401.",
    hint: "You can also protect entire routers with `app.use('/api', authenticate)`.",
  },
  {
    id: "refresh-tokens",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Implement refresh tokens",
    prompt:
      "Implement a `/refresh` endpoint that accepts a refresh token (stored in HTTP‑only cookie) and issues a new access token.",
    starter: `app.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    // your logic
});`,
    referenceSolution: `app.post('/refresh', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });
    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const newAccessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: newAccessToken });
    } catch {
        res.status(403).json({ error: 'Invalid refresh token' });
    }
});`,
    explanation:
      "Refresh tokens are long‑lived, access tokens short‑lived. Store refresh tokens securely (httpOnly cookie).",
    hint: "Revoke refresh tokens on logout by deleting them from the database.",
  },
  {
    id: "role-based-authorization",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Implement role-based authorization",
    prompt:
      "Create an `authorize` middleware that checks if `req.user.role` includes an allowed role.",
    starter: `function authorize(...allowedRoles) {
    return (req, res, next) => {
        // your code
    };
}`,
    referenceSolution: `function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}
// Usage: app.delete('/admin', authenticate, authorize('admin'), handler);`,
    explanation:
      "Authorization happens after authentication. Roles are usually stored in the JWT.",
    hint: "For fine‑grained permissions, consider using claims like `permissions: ['read:posts']`.",
  },
  {
    id: "secure-password-storage",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Implement secure password storage practices",
    prompt:
      "List and explain best practices for storing passwords, and show how to implement pepper (optional).",
    starter: `// Write best practices and a code snippet for adding a pepper before hashing.`,
    referenceSolution: `// Best practices:
// 1. Use bcrypt with salt rounds >= 10.
// 2. Never store plain text.
// 3. Use a pepper (secret string appended to password) for extra security.
const pepper = process.env.PASSWORD_PEPPER;
const hashed = await bcrypt.hash(password + pepper, 10);
// 4. Enforce strong password policies.`,
    explanation:
      "Pepper adds a secret that is not stored in the database, mitigating certain attacks.",
    hint: "Store pepper in environment variables, never hardcode.",
  },
  {
    id: "logout-functionality",
    type: "implementation",
    topic: "Authentication & Security",
    title: "Implement logout functionality",
    prompt:
      "Create a logout endpoint that clears the refresh token cookie and optionally blacklists the access token.",
    starter: `app.post('/logout', (req, res) => {
    // your code
});`,
    referenceSolution: `app.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    // Optional: add access token to a blacklist in Redis
    res.json({ message: 'Logged out' });
});`,
    explanation:
      "Logout should invalidate refresh tokens (by clearing cookie or deleting from DB). Access tokens expire naturally.",
    hint: "For extra security, maintain a token blacklist until the access token expires.",
  },
  {
    id: "pagination-sql",
    type: "implementation",
    topic: "SQL",
    title: "Write pagination SQL query",
    prompt:
      "Write a PostgreSQL query that returns rows 11–20 from the `users` table ordered by id.",
    starter: `-- your SQL`,
    referenceSolution: `SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 10;`,
    explanation:
      "`LIMIT` sets number of rows, `OFFSET` skips rows. For large offsets, keyset pagination is more efficient.",
    hint: "Combine with `ORDER BY` to ensure consistent pagination.",
  },
  {
    id: "search-sql-like",
    type: "implementation",
    topic: "SQL",
    title: "Write search query using LIKE/ILIKE",
    prompt:
      "Write a query that searches for users whose name contains 'john' (case‑insensitive).",
    starter: `-- your SQL`,
    referenceSolution: `SELECT * FROM users WHERE name ILIKE '%john%';`,
    explanation:
      "`ILIKE` is case‑insensitive in PostgreSQL; `LIKE` is case‑sensitive. Leading/trailing `%` allows substring match.",
    hint: "For full‑text search, consider PostgreSQL's `tsvector`.",
  },
  {
    id: "join-sql",
    type: "implementation",
    topic: "SQL",
    title: "Write JOIN query (users + orders)",
    prompt:
      "Select user name and order total for all orders, including users who have no orders (LEFT JOIN).",
    starter: `-- your SQL`,
    referenceSolution: `SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
    explanation:
      "LEFT JOIN keeps all users, with NULLs for orders that don't exist.",
    hint: "Use `INNER JOIN` if you only want users with at least one order.",
  },
  {
    id: "group-by-sql",
    type: "implementation",
    topic: "SQL",
    title: "Write GROUP BY query",
    prompt:
      "Count the number of orders per user, showing user_id and order count.",
    starter: `-- your SQL`,
    referenceSolution: `SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id;`,
    explanation:
      "GROUP BY aggregates rows. Any column in SELECT that is not aggregated must be in GROUP BY.",
    hint: "Use `HAVING` to filter groups, e.g., `HAVING COUNT(*) > 5`.",
  },
  {
    id: "latest-record-per-user",
    type: "implementation",
    topic: "SQL",
    title: "Fetch latest record per user",
    prompt:
      "For each user, get the most recent order using a window function or DISTINCT ON.",
    starter: `-- your SQL (PostgreSQL)`,
    referenceSolution: `SELECT DISTINCT ON (user_id) user_id, created_at, total
FROM orders
ORDER BY user_id, created_at DESC;`,
    explanation:
      "`DISTINCT ON` keeps the first row per user_id based on ORDER BY. Alternative: `ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC)`.",
    hint: "Window functions are more flexible for complex ranking.",
  },
  {
    id: "count-query",
    type: "implementation",
    topic: "SQL",
    title: "Write COUNT query",
    prompt:
      "Count total number of users and also number of users who have placed an order.",
    starter: `-- your SQL`,
    referenceSolution: `SELECT COUNT(*) AS total_users FROM users;
SELECT COUNT(DISTINCT user_id) AS users_with_orders FROM orders;`,
    explanation:
      "`COUNT(*)` counts rows; `COUNT(DISTINCT column)` counts unique values.",
    hint: "Be careful with `COUNT(*)` on large tables – consider using approximate counts.",
  },
  {
    id: "find-duplicate-records",
    type: "implementation",
    topic: "SQL",
    title: "Find duplicate records",
    prompt:
      "Find all email addresses that appear more than once in the `users` table.",
    starter: `-- your SQL`,
    referenceSolution: `SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1;`,
    explanation:
      "HAVING filters groups. This query shows duplicate emails and their counts.",
    hint: "To see actual duplicate rows, use a self‑join or window functions.",
  },
  {
    id: "delete-duplicate-records",
    type: "implementation",
    topic: "SQL",
    title: "Delete duplicate records",
    prompt:
      "Delete duplicate users keeping only the one with the smallest id for each email.",
    starter: `-- your SQL`,
    referenceSolution: `DELETE FROM users
WHERE id NOT IN (
    SELECT MIN(id)
    FROM users
    GROUP BY email
);`,
    explanation:
      "Subquery identifies the smallest id per email; delete all others. Test on a backup first.",
    hint: "For very large tables, use a temporary table or `USING` with a self‑join.",
  },
  {
    id: "transaction-sql",
    type: "implementation",
    topic: "SQL",
    title: "Implement transaction SQL",
    prompt:
      "Write a transaction block that transfers $100 from account 1 to account 2, and check balances are non‑negative.",
    starter: `BEGIN;
-- your SQL`,
    referenceSolution: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- check if first update affected a row
COMMIT;`,
    explanation:
      "The `AND balance >= 100` prevents overdraft. Check row count to decide COMMIT or ROLLBACK.",
    hint: "In a stored procedure, use `GET DIAGNOSTICS` or `ROW_COUNT` to verify.",
  },
  {
    id: "create-index-optimize",
    type: "implementation",
    topic: "SQL",
    title: "Create index and optimize query",
    prompt:
      "Given a slow query `SELECT * FROM orders WHERE user_id = 123 AND status = 'pending'`, create an index to speed it up.",
    starter: `-- your CREATE INDEX statement`,
    referenceSolution: `CREATE INDEX idx_orders_user_status ON orders(user_id, status);`,
    explanation:
      "A composite index on both columns allows the database to filter by both efficiently.",
    hint: "Use `EXPLAIN ANALYZE` to verify index usage.",
  },
  {
    id: "connect-redis-node",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Connect Redis in Node.js",
    prompt: "Use `ioredis` or `redis` to connect to a local Redis instance.",
    starter: `const Redis = require('ioredis');
// your connection code`,
    referenceSolution: `const Redis = require('ioredis');
const redis = new Redis({
    host: 'localhost',
    port: 6379,
});
redis.on('connect', () => console.log('Connected to Redis'));`,
    explanation:
      "ioredis supports promises and cluster mode. Default port is 6379.",
    hint: "Use environment variables for Redis connection details.",
  },
  {
    id: "connect-redis-go",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Connect Redis in Go",
    prompt: "Connect to Redis using `go-redis` library.",
    starter: `package main

import (
    "context"
    "fmt"
    "github.com/go-redis/redis/v8"
)

func main() {
    // your code
}`,
    referenceSolution: `package main

import (
    "context"
    "fmt"
    "github.com/go-redis/redis/v8"
)

func main() {
    ctx := context.Background()
    rdb := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
        Password: "",
        DB: 0,
    })
    _, err := rdb.Ping(ctx).Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("Connected to Redis")
}`,
    explanation:
      "`go-redis` provides a client with connection pooling. Use `Ping` to verify connectivity.",
    hint: "Pass a context (e.g., `context.Background()`) to Redis commands.",
  },
  {
    id: "cache-get-api-response",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Cache GET API response",
    prompt:
      "Cache the response of a GET `/product/:id` endpoint in Redis for 60 seconds.",
    starter: `app.get('/product/:id', async (req, res) => {
    const cacheKey = \`product:\${req.params.id}\`;
    // your caching logic
});`,
    referenceSolution: `app.get('/product/:id', async (req, res) => {
    const cacheKey = \`product:\${req.params.id}\`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));
    const product = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    await redis.setex(cacheKey, 60, JSON.stringify(product.rows[0]));
    res.json(product.rows[0]);
});`,
    explanation:
      "Check cache first; if miss, fetch from DB, store, then respond. Reduces DB load.",
    hint: "Use `setex` to set expiry in one command.",
  },
  {
    id: "cache-aside-pattern",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Implement cache aside pattern",
    prompt:
      "Implement cache aside for updating a product: on update, invalidate cache and update DB.",
    starter: `app.put('/product/:id', async (req, res) => {
    // your code
});`,
    referenceSolution: `app.put('/product/:id', async (req, res) => {
    await db.query('UPDATE products SET name = $1 WHERE id = $2', [req.body.name, req.params.id]);
    await redis.del(\`product:\${req.params.id}\`);
    res.json({ updated: true });
});`,
    explanation:
      "After DB write, delete the cached entry. Next read will repopulate cache.",
    hint: "Consider using `DEL` or `UNLINK` for invalidation.",
  },
  {
    id: "redis-ttl",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Use Redis TTL (expiry)",
    prompt:
      "Set a key 'session:123' with value 'user_data' that expires in 30 minutes.",
    starter: `async function setSession() {
    // your redis command
}
setSession().catch(console.error);`,
    referenceSolution: `async function setSession() {
    await redis.setex('session:123', 1800, 'user_data');
}
setSession();`,
    explanation:
      "TTL (time to live) automatically removes keys after the specified seconds.",
    hint: "Use `expire` to set TTL on an existing key.",
  },
  {
    id: "cache-invalidation",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Implement cache invalidation",
    prompt:
      "When a user updates their profile, invalidate all cached keys that contain that user's data (pattern-based).",
    starter: `async function invalidateUserCache(userId) {
    // your code
}`,
    referenceSolution: `async function invalidateUserCache(userId) {
    const keys = await redis.keys(\`user:\${userId}:*\`);
    if (keys.length) await redis.del(keys);
}`,
    explanation:
      "`KEYS` is dangerous in production; prefer `SCAN`. Better: store cache keys in a set per user.",
    hint: "Use structured keys like `user:123:profile`, `user:123:orders` to make invalidation easier.",
  },
  {
    id: "rate-limiter-redis",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Implement rate limiter using Redis",
    prompt:
      "Implement a sliding window rate limiter: allow 100 requests per minute per IP.",
    starter: `async function rateLimit(ip) {
    const key = \`rate:\${ip}\`;
    // your Redis logic
}`,
    referenceSolution: `async function rateLimit(ip) {
    const key = \`rate:\${ip}\`;
    const now = Date.now();
    const window = 60000; // 1 min
    const limit = 100;
    const multi = redis.multi();
    multi.zremrangebyscore(key, 0, now - window);
    multi.zadd(key, now, \`\${now}-\${Math.random()}\`);
    multi.zcard(key);
    multi.expire(key, 60);
    const replies = await multi.exec();
    const countReply = replies[2];
    const count = Array.isArray(countReply) ? countReply[1] : 0;
    return count <= limit;
}`,
    explanation:
      "Sorted sets store timestamps; we remove old ones, add current, then count entries.",
    hint: "Lua scripts can make this atomic and more efficient.",
  },
  {
    id: "sessions-redis",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Store sessions in Redis",
    prompt:
      "Configure Express session store to use Redis (using `connect-redis`).",
    starter: `const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// your configuration`,
    referenceSolution: `app.use(session({
    store: new RedisStore({ client: redis }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}));`,
    explanation:
      "Redis session store makes sessions shareable across multiple server instances.",
    hint: "Set `secure: true` if using HTTPS.",
  },
  {
    id: "distributed-caching",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Implement distributed caching",
    prompt:
      "Explain how to set up a Redis Cluster for distributed caching and write a read‑through example.",
    starter: `// high‑level explanation and code sketch`,
    referenceSolution: `// Redis Cluster automatically shards keys across nodes.
// Client code remains similar:
const Redis = require('ioredis');
const cluster = new Redis.Cluster([{ host: 'node1', port: 6379 }]);
// Read‑through:
async function getProduct(id) {
    let data = await cluster.get(\`prod:\${id}\`);
    if (!data) {
        data = await db.find(id);
        await cluster.set(\`prod:\${id}\`, JSON.stringify(data), 'EX', 60);
    }
    return JSON.parse(data);
}`,
    explanation:
      "Distributed caching scales horizontally; consistent hashing or Redis Cluster handles distribution.",
    hint: "Be aware of network latency between cache and app servers.",
  },
  {
    id: "redis-pubsub",
    type: "implementation",
    topic: "Redis & Caching",
    title: "Implement Redis pub/sub",
    prompt:
      "Create a publisher that sends 'order.created' events and a subscriber that logs them.",
    starter: `// publisher
const pub = new Redis();
// subscriber
const sub = new Redis();`,
    referenceSolution: `// Publisher
await pub.publish('order.created', JSON.stringify({ orderId: 123 }));
// Subscriber
sub.subscribe('order.created', (err, count) => {});
sub.on('message', (channel, message) => {
    console.log(\`Received \${message} on \${channel}\`);
});`,
    explanation:
      "Pub/Sub decouples services. Messages are not persisted – if subscriber is down, message is lost.",
    hint: "For reliable messaging, consider Redis Streams or a message broker.",
  },
  {
    id: "simple-goroutine",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement simple goroutine",
    prompt:
      "Write a Go program that prints 'Hello' from a goroutine and 'World' from main.",
    starter: `package main
import "fmt"
func main() {
    // your code
}`,
    referenceSolution: `go func() {
    fmt.Println("Hello")
}()
fmt.Println("World")
time.Sleep(time.Millisecond)`,
    explanation:
      "Goroutines run concurrently. A sleep gives the goroutine time to execute before main exits.",
    hint: "Use `sync.WaitGroup` instead of sleep for proper synchronization.",
  },
  {
    id: "waitgroup-goroutines",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use WaitGroup with goroutines",
    prompt:
      "Launch 5 goroutines that each print a number, and wait for all to finish using WaitGroup.",
    starter: `var wg sync.WaitGroup
// your code`,
    referenceSolution: `for i := 1; i <= 5; i++ {
    wg.Add(1)
    go func(n int) {
        defer wg.Done()
        fmt.Println(n)
    }(i)
}
wg.Wait()`,
    explanation:
      "`Add` increments counter, `Done` decrements, `Wait` blocks until counter zero.",
    hint: "Pass loop variable as argument to avoid closure issues.",
  },
  {
    id: "channels",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement channels",
    prompt:
      "Create an unbuffered channel, send a string from a goroutine, and receive it in main.",
    starter: `ch := make(chan string)
// your code`,
    referenceSolution: `go func() {
    ch <- "ping"
}()
msg := <-ch
fmt.Println(msg)`,
    explanation:
      "Unbuffered channels block until both sender and receiver are ready.",
    hint: "Channels are first‑class values; they can be passed to functions.",
  },
  {
    id: "buffered-channels",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement buffered channels",
    prompt:
      "Create a buffered channel of size 3, send 3 integers without blocking, then receive them.",
    starter: `ch := make(chan int, 3)`,
    referenceSolution: `ch <- 1
ch <- 2
ch <- 3
fmt.Println(<-ch)
fmt.Println(<-ch)
fmt.Println(<-ch)`,
    explanation:
      "Buffered channels allow sends up to capacity without a corresponding receiver.",
    hint: "Sending to a full buffer blocks; receiving from an empty buffer blocks.",
  },
  {
    id: "worker-pool",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement worker pool",
    prompt:
      "Create a worker pool of 3 goroutines that process jobs from a channel and send results to another channel.",
    starter: `jobs := make(chan int, 10)
results := make(chan int, 10)
// your worker function`,
    referenceSolution: `func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}
// start 3 workers
for w := 1; w <= 3; w++ {
    go worker(w, jobs, results)
}
// send 5 jobs
for j := 1; j <= 5; j++ {
    jobs <- j
}
close(jobs)
// collect results
for r := 1; r <= 5; r++ {
    <-results
}`,
    explanation:
      "Worker pool pattern controls concurrency and distributes work.",
    hint: "Close the jobs channel to signal no more work.",
  },
  {
    id: "fan-out-fan-in",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement fan-out fan-in pattern",
    prompt:
      "Take a stream of numbers, fan‑out to two goroutines that square them, then fan‑in the results.",
    starter: `func fanOut(in <-chan int) (<-chan int, <-chan int) {
    out1 := make(chan int)
    out2 := make(chan int)
    // your code
}`,
    referenceSolution: `func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}
func fanIn(c1, c2 <-chan int) <-chan int {
    out := make(chan int)
    go func() { for n := range c1 { out <- n } }()
    go func() { for n := range c2 { out <- n } }()
    return out
}
// Usage: a := square(in); b := square(in); merged := fanIn(a, b)`,
    explanation:
      "Fan‑out distributes work to multiple workers; fan‑in merges their outputs.",
    hint: "Use separate goroutines for each merge to avoid blocking.",
  },
  {
    id: "mutex",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use mutex for shared resources",
    prompt:
      "Protect a shared counter with a mutex while incrementing from multiple goroutines.",
    starter: `var mu sync.Mutex
var counter int
// your code`,
    referenceSolution: `var wg sync.WaitGroup
for i := 0; i < 1000; i++ {
    wg.Add(1)
    go func() {
        mu.Lock()
        counter++
        mu.Unlock()
        wg.Done()
    }()
}
wg.Wait()
fmt.Println(counter)`,
    explanation:
      "Mutex ensures only one goroutine accesses the critical section at a time.",
    hint: "Use `defer mu.Unlock()` to avoid forgetting to unlock.",
  },
  {
    id: "parallel-api-calls",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement parallel API calls",
    prompt:
      "Fetch data from two external APIs concurrently and wait for both results.",
    starter: `func fetchAPI(url string) (string, error) {
    // simulate
}`,
    referenceSolution: `func fetchAPI(url string, ch chan<- string) {
    // simulate HTTP call
    time.Sleep(100 * time.Millisecond)
    ch <- url
}
func main() {
    ch := make(chan string, 2)
    go fetchAPI("https://api1.com", ch)
    go fetchAPI("https://api2.com", ch)
    result1 := <-ch
    result2 := <-ch
    fmt.Println(result1, result2)
}`,
    explanation:
      "Use channels to collect results as they arrive. Buffered channel prevents goroutine leak.",
    hint: "Consider using `errgroup` for error propagation.",
  },
  {
    id: "background-jobs-goroutines",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement background jobs using goroutines",
    prompt:
      "Start a background goroutine that processes a queue (channel) and runs indefinitely.",
    starter: `jobQueue := make(chan Job)
// background processor`,
    referenceSolution: `func backgroundProcessor(jobQueue <-chan Job) {
    for job := range jobQueue {
        process(job)
    }
}
// In main:
go backgroundProcessor(jobQueue)
// send jobs
jobQueue <- someJob`,
    explanation:
      "The background worker runs as long as the program lives; range over channel exits when channel closed.",
    hint: "Graceful shutdown: close jobQueue and wait for worker to finish (use WaitGroup).",
  },
  {
    id: "rate-limiter-goroutines",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement rate limiter using goroutines",
    prompt:
      "Implement a token bucket rate limiter using goroutines and a ticker.",
    starter: `type RateLimiter struct {
    tokens chan struct{}
}
func NewRateLimiter(rate int) *RateLimiter {}`,
    referenceSolution: `func NewRateLimiter(rate int) *RateLimiter {
    rl := &RateLimiter{tokens: make(chan struct{}, rate)}
    ticker := time.NewTicker(time.Second / time.Duration(rate))
    go func() {
        for range ticker.C {
            select {
            case rl.tokens <- struct{}{}:
            default:
            }
        }
    }()
    return rl
}
func (rl *RateLimiter) Allow() bool {
    select {
    case <-rl.tokens:
        return true
    default:
        return false
    }
}`,
    explanation:
      "Tokens are added at fixed rate; Allow consumes one token. Burst capacity equals buffer size.",
    hint: "Use `time.Ticker` for periodic token refill.",
  },
  {
    id: "upload-multer",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Upload file using Multer",
    prompt:
      "Create an Express endpoint that accepts a single file upload using Multer and saves it to disk.",
    starter: `const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => { });`,
    referenceSolution: `const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});`,
    explanation:
      "Multer parses multipart/form-data; `req.file` contains metadata about the uploaded file.",
    hint: "Always validate file type and size before saving.",
  },
  {
    id: "upload-to-s3",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Upload file to AWS S3",
    prompt:
      "After receiving a file via Multer, upload it to an S3 bucket using the AWS SDK.",
    starter: `const AWS = require('aws-sdk');
const s3 = new AWS.S3();
// your upload logic`,
    referenceSolution: `const uploadToS3 = async (file) => {
    const params = {
        Bucket: 'my-bucket',
        Key: \`uploads/\${Date.now()}-\${file.originalname}\`,
        Body: file.buffer,
        ContentType: file.mimetype
    };
    return s3.upload(params).promise();
};
// In route:
const result = await uploadToS3(req.file);
res.json({ url: result.Location });`,
    explanation:
      "Use `file.buffer` when using memory storage (instead of disk). `s3.upload` returns a promise.",
    hint: "Configure AWS credentials via environment variables or IAM roles.",
  },
  {
    id: "validate-file-size-type",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Validate file size and type",
    prompt: "Add Multer validation to only allow images (jpeg/png) under 5MB.",
    starter: `const upload = multer({
    limits: { fileSize: ... },
    fileFilter: (req, file, cb) => { ... }
});`,
    referenceSolution: `const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png'];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Invalid file type'));
    }
});`,
    explanation:
      "`limits.fileSize` in bytes; `fileFilter` is called for each file; call `cb` with error to reject.",
    hint: "Use a try/catch wrapper to send user‑friendly error messages.",
  },
  {
    id: "file-upload-go",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Implement file upload in Go",
    prompt:
      "Write a Go HTTP handler that reads a multipart file and saves it to disk.",
    starter: `package main

import (
    "fmt"
    "net/http"
)

func uploadHandler(w http.ResponseWriter, r *http.Request) {
    // your code
}`,
    referenceSolution: `package main

import (
    "fmt"
    "io"
    "net/http"
    "os"
)

func uploadHandler(w http.ResponseWriter, r *http.Request) {
    if err := r.ParseMultipartForm(10 << 20); err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }
    file, handler, err := r.FormFile("file")
    if err != nil {
        http.Error(w, "Bad request", http.StatusBadRequest)
        return
    }
    defer file.Close()
    dst, err := os.Create("uploads/" + handler.Filename)
    if err != nil {
        http.Error(w, "Unable to save file", http.StatusInternalServerError)
        return
    }
    defer dst.Close()
    if _, err := io.Copy(dst, file); err != nil {
        http.Error(w, "Unable to save file", http.StatusInternalServerError)
        return
    }
    fmt.Fprintf(w, "Uploaded file: %s", handler.Filename)
}`,
    explanation:
      "`ParseMultipartForm` parses multipart form data; `FormFile` returns the uploaded file handle. Save it safely with `io.Copy` and handle errors explicitly.",
    hint: "Limit memory usage with `ParseMultipartForm` and validate filenames before saving.",
  },
  {
    id: "signed-upload-urls",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Generate signed upload URLs",
    prompt: "Generate a pre‑signed S3 PUT URL for direct client uploads.",
    starter: `const getSignedUrl = async (key) => {
    const params = { Bucket: 'my-bucket', Key: key, Expires: 60 };
    return s3.getSignedUrlPromise('putObject', params);
};`,
    referenceSolution: `const getSignedUrl = async (key, contentType) => {
    const params = {
        Bucket: 'my-bucket',
        Key: key,
        Expires: 60,
        ContentType: contentType
    };
    return s3.getSignedUrlPromise('putObject', params);
};
// Client then does PUT directly to that URL.`,
    explanation:
      "Pre‑signed URLs allow clients to upload directly to S3 without exposing credentials.",
    hint: "Restrict allowed ContentType to prevent malicious uploads.",
  },
  {
    id: "pagination-api",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Implement pagination API",
    prompt:
      "Create a GET `/items` endpoint that supports `page` and `limit` and returns paginated results with metadata.",
    starter: `app.get('/items', async (req, res) => {
    // your pagination logic
});`,
    referenceSolution: `app.get('/items', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const data = await db.query('SELECT * FROM items ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
    const totalResult = await db.query('SELECT COUNT(*) FROM items');
    const total = parseInt(totalResult.rows[0].count);
    res.json({
        data: data.rows,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
});`,
    explanation: "Return both data and pagination metadata for a complete API.",
    hint: "Consider cursor‑based pagination for large datasets.",
  },
  {
    id: "search-api-filters",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Implement search API with filters",
    prompt:
      "Create a GET `/products` endpoint that filters by `category` and `minPrice` using query parameters.",
    starter: `app.get('/products', async (req, res) => {
    const { category, minPrice } = req.query;
    // dynamic SQL query
});`,
    referenceSolution: `app.get('/products', async (req, res) => {
    let query = 'SELECT * FROM products WHERE 1=1';
    const values = [];
    if (req.query.category) {
        query += ' AND category = $' + (values.length + 1);
        values.push(req.query.category);
    }
    if (req.query.minPrice) {
        query += ' AND price >= $' + (values.length + 1);
        values.push(parseFloat(req.query.minPrice));
    }
    const result = await db.query(query, values);
    res.json(result.rows);
});`,
    explanation:
      "Build SQL dynamically based on provided filters. Use parameterized queries to prevent injection.",
    hint: "Consider using an object‑to‑SQL query builder for complex filters.",
  },
  {
    id: "bulk-insert-api",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Implement bulk insert API",
    prompt:
      "Create a POST `/users/bulk` that accepts an array of users and inserts them in a single transaction.",
    starter: `app.post('/users/bulk', async (req, res) => {
    const users = req.body; // array
    // bulk insert
});`,
    referenceSolution: `app.post('/users/bulk', async (req, res) => {
    const users = req.body;
    if (!Array.isArray(users)) return res.status(400).json({ error: 'Expected array' });
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (const user of users) {
            await client.query('INSERT INTO users(name, email) VALUES($1, $2)', [user.name, user.email]);
        }
        await client.query('COMMIT');
        res.json({ inserted: users.length });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});`,
    explanation:
      "Wrap multiple inserts in a transaction for atomicity. For very large arrays, use a single `INSERT ... VALUES` multi‑row statement.",
    hint: "Use `pg`'s `array` helper or `unnest` for true bulk performance.",
  },
  {
    id: "api-response-compression",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Implement API response compression",
    prompt:
      "Enable gzip compression for all Express responses using `compression` middleware.",
    starter: `const express = require('express');
const compression = require('compression');
const app = express();
// your code`,
    referenceSolution: `app.use(compression());
// That's it - all responses will be compressed if client supports it.`,
    explanation:
      "Compression reduces bandwidth; Express's `compression` middleware uses `Accept-Encoding` header.",
    hint: "Don't compress very small responses (under 1KB) – overhead may not be worth it.",
  },
  {
    id: "transactions-in-api",
    type: "implementation",
    topic: "File Upload & Optimization",
    title: "Implement database transactions in API",
    prompt:
      "Create an API endpoint that creates an order and decreases inventory in a single transaction.",
    starter: `app.post('/orders', async (req, res) => {
    const { productId, quantity } = req.body;
    // transaction
});`,
    referenceSolution: `app.post('/orders', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const inv = await client.query('SELECT stock FROM products WHERE id = $1 FOR UPDATE', [productId]);
        if (inv.rows[0].stock < quantity) throw new Error('Insufficient stock');
        await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [quantity, productId]);
        await client.query('INSERT INTO orders(product_id, quantity) VALUES($1, $2)', [productId, quantity]);
        await client.query('COMMIT');
        res.json({ success: true });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(400).json({ error: err.message });
    } finally {
        client.release();
    }
});`,
    explanation:
      "Use `FOR UPDATE` to lock the product row until transaction completes, preventing race conditions.",
    hint: "Always release the client back to the pool, even on error.",
  },
  {
    id: "design-url-shortener",
    type: "implementation",
    topic: "System Design",
    title: "Design URL shortener system",
    prompt:
      "Describe the high‑level design and implement a simple in‑memory version with a `encode` and `decode` function.",
    starter: `class UrlShortener {
    encode(longUrl) {}
    decode(shortUrl) {}
}`,
    referenceSolution: `class UrlShortener {
    constructor() {
        this.map = new Map();
        this.counter = 1000;
        this.base = 'http://short.xyz/';
    }
    encode(longUrl) {
        const short = this.base + this.counter.toString(36);
        this.map.set(short, longUrl);
        this.counter++;
        return short;
    }
    decode(shortUrl) {
        return this.map.get(shortUrl);
    }
}`,
    explanation:
      "Shortener maps long URLs to short IDs (base36). Production uses distributed ID generation and persistent storage.",
    hint: "Handle collisions and custom aliases.",
  },
  {
    id: "design-rate-limiter",
    type: "implementation",
    topic: "System Design",
    title: "Design rate limiter system",
    prompt:
      "Design a token bucket rate limiter that can be used in a distributed system (e.g., with Redis).",
    starter: `// Pseudocode or explanation plus Redis Lua script`,
    referenceSolution: `-- Redis Lua script for token bucket
local key = KEYS[1]
local rate = tonumber(ARGV[1])
local capacity = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])
local lastRefill = redis.call('GET', key..':last')
local tokens = redis.call('GET', key..':tokens')
if not tokens then
    tokens = capacity
    lastRefill = now
else
    tokens = tonumber(tokens)
    lastRefill = tonumber(lastRefill)
    local elapsed = now - lastRefill
    tokens = math.min(capacity, tokens + elapsed * rate)
end
local allowed = tokens >= requested
if allowed then
    tokens = tokens - requested
    redis.call('SET', key..':tokens', tokens)
    redis.call('SET', key..':last', now)
end
return allowed`,
    explanation:
      "Distributed rate limiter uses Redis to share state. Lua script ensures atomicity.",
    hint: "Use `EVAL` to run the script from application code.",
  },
  {
    id: "design-notification-system",
    type: "implementation",
    topic: "System Design",
    title: "Design notification system",
    prompt:
      "Design a system that sends email/sms/push notifications asynchronously. Provide a queue‑based implementation sketch.",
    starter: `// Use a message queue (e.g., RabbitMQ) and workers`,
    referenceSolution: `// Producer
queue.publish('notifications', { type: 'email', to: 'user@example.com', body: 'Hello' });
// Consumer (worker)
queue.consume('notifications', async (msg) => {
    switch(msg.type) {
        case 'email': await sendEmail(msg); break;
        case 'sms': await sendSms(msg); break;
    }
});`,
    explanation:
      "Decouple notification sending via queue to improve reliability and scalability.",
    hint: "Store notifications in a database for retries and auditing.",
  },
  {
    id: "design-ecommerce-order-system",
    type: "implementation",
    topic: "System Design",
    title: "Design ecommerce order system",
    prompt:
      "Sketch the API and database schema for an order system with cart, checkout, and inventory reservation.",
    starter: `// Provide endpoints and table definitions`,
    referenceSolution: `// Endpoints: POST /cart/items, POST /checkout, GET /orders/:id
// Tables: users, products, cart_items (user_id, product_id, quantity), orders (id, user_id, status, total), order_items.
// Checkout flow: start transaction, reserve inventory, create order, clear cart, commit.`,
    explanation:
      "Key aspects: inventory management, idempotency, and state transitions (pending → paid → shipped).",
    hint: "Use `FOR UPDATE` on inventory rows during checkout.",
  },
  {
    id: "design-logging-system",
    type: "implementation",
    topic: "System Design",
    title: "Design logging system",
    prompt:
      "Design a centralized logging system that collects logs from many services and makes them searchable.",
    starter: `// Components and data flow`,
    referenceSolution: `// Agents (e.g., Fluentd) on each host tail log files and push to a message queue (Kafka).
// Consumers index logs into Elasticsearch.
// Kibana provides search UI.
// Alternative: use Loki with Promtail.`,
    explanation:
      "Logging systems need low overhead, structured logs (JSON), and retention policies.",
    hint: "Add correlation IDs to trace requests across services.",
  },
  {
    id: "design-caching-system",
    type: "implementation",
    topic: "System Design",
    title: "Design caching system",
    prompt:
      "Design a write‑through cache for a database, with cache invalidation on updates.",
    starter: `// Show the read and write flow`,
    referenceSolution: `// Read: check cache; if miss, read DB, write cache, return.
// Write: write to DB, then write/delete cache.
// Use TTL to avoid stale data.
// For distributed cache, use consistent hashing.`,
    explanation:
      "Write‑through ensures cache is always fresh but adds write latency. Can use `SETEX` after DB write.",
    hint: "Consider cache stampede prevention (e.g., `SETNX` with mutex).",
  },
  {
    id: "design-file-storage-system",
    type: "implementation",
    topic: "System Design",
    title: "Design file storage system",
    prompt:
      "Design a scalable file storage system (like S3) – discuss metadata, chunking, and replication.",
    starter: `// High‑level architecture`,
    referenceSolution: `// Metadata service (e.g., Cassandra) stores file info.
// Data nodes store chunks (e.g., 64MB) replicated across 3 nodes.
// Client uploads: get upload URL, split into chunks, upload each chunk.
// Download: get chunk locations from metadata, parallel fetch.`,
    explanation:
      "Use content‑addressed storage (hash of content as key) for deduplication.",
    hint: "Implement multipart upload for large files.",
  },
  {
    id: "design-message-queue-system",
    type: "implementation",
    topic: "System Design",
    title: "Design message queue system",
    prompt:
      "Design a simple message queue with at‑least‑once delivery semantics, using a database as storage.",
    starter: `// Tables: messages(id, queue, payload, visible_at, created_at)`,
    referenceSolution: `// Producer: INSERT INTO messages(queue, payload) VALUES('orders', '...');
// Consumer: BEGIN; SELECT ... FOR UPDATE SKIP LOCKED; DELETE; COMMIT;
// Use visible_at for delayed delivery.
// Polling or listen/notify.`,
    explanation:
      "Database as queue is simple but less performant than dedicated brokers (RabbitMQ, Kafka).",
    hint: "Add an index on (queue, visible_at) for efficient polling.",
  },
  {
    id: "design-background-worker-system",
    type: "implementation",
    topic: "System Design",
    title: "Design background worker system",
    prompt:
      "Design a system that runs periodic jobs (e.g., report generation) and ad‑hoc background tasks.",
    starter: `// Use a scheduler + worker pool`,
    referenceSolution: `// Scheduler: cron‑like process that enqueues jobs into Redis or DB.
// Workers: pull jobs, execute, and store results.
// Use separate queues for different priorities.
// Monitor with Prometheus.`,
    explanation: "Ensure idempotency and retries with exponential backoff.",
    hint: "Use a lock (e.g., Redis redlock) to prevent duplicate execution of scheduled jobs.",
  },
  {
    id: "design-scalable-api-architecture",
    type: "implementation",
    topic: "System Design",
    title: "Design scalable API architecture",
    prompt:
      "Design a scalable API backend that can handle millions of requests. Include load balancers, caching, database sharding, and microservices.",
    starter: `// Diagram description and component list`,
    referenceSolution: `// Load balancer (e.g., Nginx) distributes traffic to API gateway.
// API gateway routes to microservices (auth, users, orders).
// Each service uses a cache (Redis) and a database (sharded PostgreSQL or Cassandra).
// Use message queues for async tasks.
// Auto‑scaling groups based on CPU/memory.`,
    explanation:
      "Scalability requires stateless services, horizontal scaling, and efficient data partitioning.",
    hint: "Implement circuit breakers and retries for resilience.",
  },
];
