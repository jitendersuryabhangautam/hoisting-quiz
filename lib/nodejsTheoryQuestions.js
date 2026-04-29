export const nodejsTheoryQuestions = [
  [
    {
      id: "node-basics-event-loop",
      type: "concept",
      topic: "Node.js Core",
      title: "Node.js Event Loop (Phases, Microtasks, Macrotasks)",
      difficulty: "Basic",
      prompt:
        "Explain the Node.js event loop phases and the order of execution for microtasks and macrotasks.",
      expected:
        "The Node.js event loop (libuv) has phases: timers, I/O callbacks, idle/prepare, poll, check, close. Microtasks (nextTick, Promise) run between phases, with nextTick having higher priority than Promise microtasks.",
      keywords: [
        "event loop",
        "libuv",
        "phases",
        "microtask",
        "macrotask",
        "nextTick",
        "setImmediate",
      ],
      explanation:
        "The Node.js event loop is what allows Node.js to perform non‑blocking I/O operations despite being single‑threaded. It is implemented by the libuv library. Understanding the order of execution is critical for writing performant and predictable asynchronous code.\n\n**Phases of the event loop (in order):**\n1. **timers:** Executes callbacks scheduled by `setTimeout()` and `setInterval()` whose time has elapsed.\n2. **pending callbacks:** Executes I/O callbacks deferred to the next loop iteration (e.g., some system errors).\n3. **idle, prepare:** Used internally by libuv; not exposed to JavaScript.\n4. **poll:** Retrieves new I/O events; executes I/O callbacks (except timers, close, setImmediate). This phase will block if no other work is pending.\n5. **check:** Executes `setImmediate()` callbacks.\n6. **close callbacks:** Executes close event callbacks (e.g., `socket.on('close')`).\n\n**Between phases**, the event loop processes the microtask queues:\n- `process.nextTick()` callbacks (highest priority)\n- Promise microtasks (`.then`, `.catch`, `.finally`)\n\n**Key takeaways:**\n- `process.nextTick` runs immediately after the current operation, before any other async callback (even before Promise microtasks). It can starve the event loop if used recursively.\n- Promise microtasks run after all `nextTick` callbacks in the same phase, but before moving to the next event loop phase.\n- `setImmediate` runs in the check phase (after I/O).\n- `setTimeout(...,0)` has a minimum delay of 1ms (but can behave similarly).\n\n**Common interview question:** Order of logs in mixed async code (like the example below).",
      code: "// Demonstrating event loop phases and microtask priorities\nconst fs = require('fs');\n\nconsole.log('sync 1');\n\nprocess.nextTick(() => console.log('nextTick 1'));\nPromise.resolve().then(() => console.log('promise 1'));\n\nsetTimeout(() => console.log('setTimeout (timers)'), 0);\nsetImmediate(() => console.log('setImmediate (check)'));\n\nfs.readFile(__filename, () => {\n  console.log('I/O callback (poll)');\n  process.nextTick(() => console.log('nextTick inside I/O'));\n  Promise.resolve().then(() => console.log('promise inside I/O'));\n  setImmediate(() => console.log('setImmediate inside I/O'));\n  setTimeout(() => console.log('setTimeout inside I/O'), 0);\n});\n\nconsole.log('sync 2');\n\n// Expected output order (approximate, may vary depending on event loop state):\n// sync 1\n// sync 2\n// nextTick 1\n// promise 1\n// setTimeout (timers)   OR   setImmediate (check) – order may vary in main module\n// I/O callback (poll)\n// nextTick inside I/O\n// promise inside I/O\n// setImmediate inside I/O   (check phase after I/O)\n// setTimeout inside I/O      (timers phase after I/O)\n\n// Explanation:\n// 1. Synchronous code runs first.\n// 2. After sync, microtasks (nextTick, then Promise) are drained.\n// 3. The timers phase checks for expired timers (setTimeout with 0 may be ready).\n// 4. The I/O callback is queued after the file read; it runs in the poll phase.\n// 5. Inside I/O callback, microtasks run immediately before moving to the next phase.\n// 6. In the I/O callback, setImmediate runs in the subsequent check phase (not same tick).\n// 7. setTimeout inside I/O runs in the following timers phase.\n",
    },
    {
      id: "node-basics-modules",
      type: "concept",
      topic: "Node.js Core",
      title: "Modules: CommonJS vs ES Modules, require, module.exports",
      difficulty: "Basic",
      prompt:
        "What are the differences between CommonJS and ES Modules in Node.js? How do you use require and module.exports?",
      expected:
        "CommonJS uses `require()` and `module.exports`; ES Modules use `import` and `export`. CommonJS is synchronous and loads modules at runtime; ES Modules are static (but dynamic import() is async). In Node.js, ES Modules require .mjs extension or `type:module` in package.json.",
      keywords: [
        "CommonJS",
        "ES Modules",
        "require",
        "module.exports",
        "import",
        "export",
        "cjs",
        "mjs",
      ],
      explanation:
        "Node.js supports two module systems: CommonJS (historically the default) and ES Modules (the ECMAScript standard).\n\n**CommonJS (CJS):**\n- Used by default in Node.js (files ending with `.js`, no `type` field in package.json).\n- Loading is **synchronous** – the module is read and executed at the point of `require()`.\n- Exports: `module.exports = { ... }` or `exports.hello = ...` (note: `exports` is a reference).\n- Import: `const fs = require('fs')`.\n- Dynamic: `require(variable)` works.\n- Cached after first load.\n\n**ES Modules (ESM):**\n- Standardised by ECMAScript.\n- Enabling: use `.mjs` extension or set `\"type\": \"module\"` in package.json.\n- Loading is **asynchronous** (can load modules in parallel).\n- Exports: `export const name = ...` or `export default ...`.\n- Import: `import fs from 'fs/promises'` or `import { readFile } from 'fs'`.\n- Static: imports are resolved at compile time, cannot import variable paths (except dynamic `import()`).\n- Supports top‑level `await`.\n- Strict mode by default.\n\n**Interoperability:**\n- CJS can load ESM using dynamic `import()` (because ESM is async).\n- ESM can load CJS modules using default import (the whole module is provided as default).\n- Default imports from CJS are the `module.exports` object.\n\n**Interview tip:** Understand that `exports` is an alias for `module.exports`; replacing `exports` breaks the reference. Also know about circular dependencies handling.",
      code: "// ========== CommonJS (file: math.cjs or .js without type:module) ==========\n// Exporting\nconst add = (a, b) => a + b;\nconst multiply = (a, b) => a * b;\nmodule.exports = { add, multiply };\n// Or using exports shorthand:\n// exports.add = add;\n\n// Importing\nconst { add, multiply } = require('./math.cjs');\nconsole.log(add(2, 3)); // 5\n\n// ========== ES Modules (file: math.mjs or .js with type:module) ==========\n// Exporting\nexport const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;\n// Default export\nexport default function greet(name) { return `Hello ${name}`; }\n\n// Importing\nimport greet, { add, multiply } from './math.mjs';\nconsole.log(add(2, 3)); // 5\nconsole.log(greet('Alice')); // Hello Alice\n\n// ========== Dynamic import (works in both systems) ==========\nasync function loadModule(path) {\n  const module = await import(path);\n  console.log(module.add(2, 3));\n}\n\n// ========== CommonJS importing ES Module ==========\n// (Only works with dynamic import)\nasync function load() {\n  const { readFile } = await import('fs/promises');\n  const data = await readFile('file.txt', 'utf8');\n  console.log(data);\n}\n\n// ========== ES Module importing CommonJS ==========\nimport pkg from './math.cjs';\nconst { add, multiply } = pkg;\nconsole.log(add(1, 2));\n",
    },
    {
      id: "node-basics-global",
      type: "concept",
      topic: "Node.js Core",
      title: "Global Objects (global, process, __dirname, __filename)",
      difficulty: "Basic",
      prompt:
        "What are the global objects in Node.js? Explain `global`, `process`, `__dirname`, `__filename`.",
      expected:
        "`global` is the global namespace object (similar to `window` in browsers). `process` provides information and control over the current Node.js process. `__dirname` is the directory name of the current module. `__filename` is the file name of the current module with absolute path.",
      keywords: [
        "global",
        "process",
        "__dirname",
        "__filename",
        "process.env",
        "process.argv",
      ],
      explanation:
        "Node.js provides several global objects that are available in all modules without requiring them.\n\n**global:**\n- The global namespace object (similar to `window` in browsers).\n- Variables declared without `var`, `let`, or `const` become properties of `global` (but this is not recommended).\n- In modules, top‑level `this` is not `global` (it is `module.exports`).\n\n**process:**\n- Provides information about the current Node.js process.\n- Commonly used properties:\n  - `process.env` – environment variables.\n  - `process.argv` – command line arguments.\n  - `process.cwd()` – current working directory.\n  - `process.exit(code)` – terminate the process.\n  - `process.on('uncaughtException', handler)` – catch unhandled errors.\n  - `process.nextTick()` – schedule a microtask.\n\n**__dirname:**\n- The absolute path of the directory containing the current module file.\n- Useful for constructing paths to resources (e.g., `path.join(__dirname, 'data.json')`).\n\n**__filename:**\n- The absolute path of the current module file (including the file name).\n\n**Other globals:**\n- `console`, `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, `Buffer`, `URL`, `TextEncoder`, etc.\n\n**Interview tip:** Understand the difference between `process.cwd()` (the directory from which the Node.js process was started) and `__dirname` (the directory of the current script).",
      code: "// Accessing globals\nconsole.log(global); // global object (may have many properties)\n\n// __dirname and __filename\nconsole.log('__dirname:', __dirname);   // /home/user/project/src\nconsole.log('__filename:', __filename); // /home/user/project/src/app.js\n\n// process object\nconsole.log('Node version:', process.version);\nconsole.log('Platform:', process.platform); // 'darwin', 'linux', 'win32'\nconsole.log('Arguments:', process.argv);    // [ 'node', '/path/to/app.js', ... ]\nconsole.log('Current working directory:', process.cwd());\nprocess.env.MY_VAR = 'some value';\nconsole.log('ENV:', process.env.MY_VAR);\n\n// Using __dirname to construct absolute path\nconst path = require('path');\nconst dataPath = path.join(__dirname, 'data', 'users.json');\nconsole.log(dataPath); // /home/user/project/src/data/users.json\n\n// process exit\n// process.exit(1); // terminates with error code\n\n// Uncaught exception handling\nprocess.on('uncaughtException', (err) => {\n  console.error('Uncaught exception:', err);\n  // perform cleanup\n  process.exit(1); // optional\n});\n\n// Process signals (e.g., Ctrl+C)\nprocess.on('SIGINT', () => {\n  console.log('Received SIGINT. Exiting gracefully.');\n  process.exit(0);\n});\n\n// global in modules vs REPL\n// In a module, `var x = 5` does NOT create global.x.\n// To create a global variable (bad practice):\nglobal.myGlobal = 'accessible everywhere';\n\n// However, use `global` sparingly. Prefer passing dependencies explicitly.\n",
    },
    {
      id: "node-basics-buffer",
      type: "concept",
      topic: "Node.js Core",
      title: "Buffer – Binary Data Handling",
      difficulty: "Basic",
      prompt:
        "What is a Buffer in Node.js? How do you create, manipulate, and convert Buffers?",
      expected:
        "Buffer is a built‑in global class for handling raw binary data directly in memory (outside V8 heap). Buffers are created with `Buffer.from()`, `Buffer.alloc()`, or `Buffer.allocUnsafe()`. They can be converted to/from strings, JSON, or other Buffers.",
      keywords: [
        "Buffer",
        "binary",
        "encoding",
        "alloc",
        "from",
        "toString",
        "TypedArray",
      ],
      explanation:
        "A `Buffer` is a fixed‑size chunk of raw memory allocated outside the JavaScript heap (managed by Node.js). It is used when dealing with binary data from TCP streams, file system operations, or cryptographic functions.\n\n**Creating Buffers:**\n- `Buffer.alloc(size)` – creates a zero‑filled buffer of `size` bytes (safe).\n- `Buffer.allocUnsafe(size)` – creates a buffer without zero‑filling (slightly faster but may contain old data – must be filled manually).\n- `Buffer.from(array)` – from an array of bytes.\n- `Buffer.from(string [, encoding])` – from a string (default encoding: 'utf8').\n- `Buffer.from(buffer)` – copies an existing buffer.\n\n**Manipulation:**\n- Access bytes via index (0‑255).\n- `buf.write(string[, offset[, length]][, encoding])` – writes a string.\n- `buf.toString([encoding[, start[, end]]])` – decodes to string.\n- `buf.subarray(start, end)` – returns a new buffer referencing the same memory (shallow).\n- `buf.slice()` – alias for subarray (deprecated for some uses).\n\n**Encodings:** 'utf8', 'ascii', 'hex', 'base64', 'latin1', 'ucs2', etc.\n\n**Performance:** Buffers are efficient for binary operations; avoid converting back and forth to strings unnecessarily.\n\n**Relationship with `Uint8Array`:** `Buffer` extends `Uint8Array`, so it works with TypedArray methods.\n\n**Interview tip:** Know the difference between `alloc` and `allocUnsafe`. Understand that `Buffer.from(string)` creates a new buffer; modifying it does not affect the original string.",
      code: "// Creating Buffers\nconst buf1 = Buffer.alloc(10);            // 10 bytes, all zero\nconsole.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>\n\nconst buf2 = Buffer.from('Hello', 'utf8');\nconsole.log(buf2); // <Buffer 48 65 6c 6c 6f>\nconsole.log(buf2.length); // 5\n\nconst buf3 = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // same as 'Hello'\n\n// Reading and writing\nconst buf = Buffer.alloc(10);\nconst written = buf.write('Node.js', 0, 'utf8');\nconsole.log(written); // 7\nconsole.log(buf.toString('utf8', 0, 7)); // 'Node.js'\n\n// Convert to string\nconst str = buf2.toString('utf8'); // 'Hello'\nconst hexStr = buf2.toString('hex'); // '48656c6c6f'\nconst base64Str = buf2.toString('base64'); // 'SGVsbG8='\n\n// Convert back from base64\nconst restored = Buffer.from(base64Str, 'base64');\nconsole.log(restored.toString()); // 'Hello'\n\n// Buffer comparison (for equality)\nconst a = Buffer.from('foo');\nconst b = Buffer.from('foo');\nconsole.log(Buffer.compare(a, b) === 0); // true\nconsole.log(a.equals(b)); // true\n\n// Copy between buffers\nconst dest = Buffer.alloc(10);\na.copy(dest, 0, 0, a.length);\nconsole.log(dest.toString()); // 'foo'\n\n// Buffer as Uint8Array\nconsole.log(buf2 instanceof Uint8Array); // true\n\n// Danger: AllocUnsafe may contain sensitive data (old memory)\nconst unsafe = Buffer.allocUnsafe(10);\n// Always fill if you don't want old data:\nunsafe.fill(0);\n\n// Working with JSON\nconst json = buf2.toJSON();\nconsole.log(json); // { type: 'Buffer', data: [ 72, 101, 108, 108, 111 ] }\n\n// Concatenating Buffers\nconst combined = Buffer.concat([buf1, buf2, buf3]);\n\n// Note: Buffers are not resizable; create new ones if size changes.\n",
    },
    {
      id: "node-basics-streams",
      type: "concept",
      topic: "Node.js Core",
      title: "Streams (Readable, Writable, Duplex, Transform, Pipeline)",
      difficulty: "Medium",
      prompt:
        "What are Node.js streams? Explain Readable, Writable, Duplex, Transform streams and how to use them. What is backpressure and how does .pipe() handle it?",
      expected:
        "Streams are abstract interfaces for handling streaming data piece by piece. Readable reads data, Writable writes data, Duplex is both, Transform modifies data as it passes. Backpressure occurs when a writable cannot keep up; .pipe() automatically handles it by pausing the readable.",
      keywords: [
        "Readable",
        "Writable",
        "Duplex",
        "Transform",
        "pipe",
        "backpressure",
        "pipeline",
        "stream",
      ],
      explanation:
        "Node.js streams are a fundamental abstraction for processing data incrementally. They allow you to read from a source or write to a destination without loading the entire dataset into memory.\n\n**Types of streams:**\n- **Readable:** Sources of data (e.g., `fs.createReadStream`, HTTP requests).\n- **Writable:** Destinations (e.g., `fs.createWriteStream`, HTTP responses).\n- **Duplex:** Both readable and writable (e.g., TCP sockets).\n- **Transform:** A duplex stream that modifies data as it passes (e.g., compression, encryption).\n\n**Stream modes:**\n- **Flowing mode:** Data is read automatically and emitted via `'data'` events.\n- **Paused mode:** You must call `.read()` to pull data.\n\n**Backpressure:**\n- When a writable stream cannot process data as fast as it is received, it signals backpressure. The readable stream will pause until the writable is ready again. This prevents memory exhaustion.\n- The `.pipe()` method handles backpressure automatically.\n\n**Modern API:**\n- Node.js provides stream constructors (since v10) via `stream.Readable`, `stream.Writable`, etc.\n- `stream/promises` provides `pipeline` promise API.\n- `pipeline` (callback version) and `finished` for detecting stream completion/errors.\n\n**Interview tip:** Be ready to implement a custom transform stream (e.g., uppercase transform). Understand the difference between `pipe` and `pipeline` (pipeline provides better error handling and cleanup). Also know that `async`/`await` with Node.js 18+ stream utilities is possible.",
      code: "// ========== Reading from a readable stream ==========\nconst fs = require('fs');\nconst readStream = fs.createReadStream('largefile.txt', { highWaterMark: 64 * 1024 }); // 64KB chunks\n\n// Flowing mode (data events)\nreadStream.on('data', (chunk) => {\n  console.log(`Received ${chunk.length} bytes`);\n});\nreadStream.on('end', () => console.log('No more data'));\nreadStream.on('error', (err) => console.error(err));\n\n// Paused mode (pull manually)\nconst pausedStream = fs.createReadStream('file.txt');\npausedStream.on('readable', () => {\n  let chunk;\n  while ((chunk = pausedStream.read()) !== null) {\n    console.log(chunk.toString());\n  }\n});\n\n// ========== Writing to a writable stream ==========\nconst writeStream = fs.createWriteStream('output.txt');\nwriteStream.write('Hello ');\nwriteStream.write('World');\nwriteStream.end('!');\nwriteStream.on('finish', () => console.log('Write completed'));\n\n// ========== Using pipe (automatic backpressure) ==========\nconst src = fs.createReadStream('source.txt');\nconst dest = fs.createWriteStream('dest.txt');\nsrc.pipe(dest);\ndest.on('finish', () => console.log('Copy done'));\n\n// ========== Custom Transform stream ==========\nconst { Transform } = require('stream');\nconst upperCaseTransform = new Transform({\n  transform(chunk, encoding, callback) {\n    // chunk is a Buffer; convert to string, uppercase, push\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  }\n});\nprocess.stdin.pipe(upperCaseTransform).pipe(process.stdout);\n\n// ========== Duplex stream (socket) ==========\nconst { Duplex } = require('stream');\nconst inOutStream = new Duplex({\n  read(size) { /* push data */ },\n  write(chunk, encoding, callback) { /* handle data */ callback(); }\n});\n\n// ========== Using pipeline for better error handling ==========\nconst { pipeline } = require('stream');\npipeline(\n  fs.createReadStream('input.txt'),\n  upperCaseTransform,\n  fs.createWriteStream('output.txt'),\n  (err) => {\n    if (err) console.error('Pipeline failed', err);\n    else console.log('Pipeline succeeded');\n  }\n);\n\n// ========== Promise version (Node.js 15+) ==========\nconst { pipeline } = require('stream/promises');\nasync function run() {\n  try {\n    await pipeline(\n      fs.createReadStream('input.txt'),\n      upperCaseTransform,\n      fs.createWriteStream('output.txt')\n    );\n    console.log('Pipeline succeeded');\n  } catch (err) {\n    console.error('Pipeline failed', err);\n  }\n}\n\n// ========== Finished helper ==========\nconst { finished } = require('stream');\nconst rs = fs.createReadStream('file.txt');\nfinished(rs, (err) => {\n  if (err) console.error('Stream failed', err);\n  else console.log('Stream completed');\n});\n\n// ========== Creating a custom readable stream ==========\nconst { Readable } = require('stream');\nclass Counter extends Readable {\n  constructor(max) {\n    super();\n    this.max = max;\n    this.current = 1;\n  }\n  _read() {\n    if (this.current <= this.max) {\n      this.push(this.current.toString() + '\\n');\n      this.current++;\n    } else {\n      this.push(null); // end\n    }\n  }\n}\nconst counter = new Counter(5);\ncounter.pipe(process.stdout); // outputs 1 2 3 4 5\n",
    },
  ],
];
