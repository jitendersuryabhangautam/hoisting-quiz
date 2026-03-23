export const conceptQuestions = [
  {
    id: "concept-closure",
    type: "concept",
    topic: "Closures",
    title: "What is a closure?",
    prompt: "Explain closure in one or two sentences.",
    expected:
      "A closure is a function that remembers the lexical scope where it was created.",
    keywords: ["closure", "lexical scope"],
    explanation:
      "A closure is a fundamental concept in JavaScript where an inner function has access to variables in its outer (enclosing) lexical scope, even after the outer function has finished executing and returned. This 'memory' of the outer scope allows the inner function to maintain state and create private variables. Closures are powerful for creating function factories, implementing data encapsulation, and enabling advanced patterns like modules and iterators. For example, they enable callbacks to retain context and support functional programming techniques.",
    code: `function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2 – count is remembered`,
  },
  {
    id: "concept-prototype",
    type: "concept",
    topic: "Prototype",
    title: "Prototype chain",
    prompt: "How does prototype lookup work?",
    expected:
      "JavaScript looks up properties on the object first, then walks the prototype chain until it finds the property or reaches null.",
    keywords: ["object", "prototype chain", "null"],
    explanation:
      "When accessing a property on an object, JavaScript first checks if the property exists directly on that object. If not found, it follows the prototype chain by checking the object's prototype (via the internal [[Prototype]] link), and continues up the chain until it finds the property or reaches the end (null). This mechanism enables inheritance in JavaScript, allowing objects to share methods and properties. The prototype chain is how JavaScript implements object-oriented programming without classes, supporting dynamic property lookup and method delegation. Understanding this is crucial for working with constructor functions, Object.create(), and the class syntax.",
    code: `const parent = { a: 1 };
const child = Object.create(parent);
child.b = 2;
console.log(child.a); // 1 – from parent
console.log(child.b); // 2 – own property
console.log(child.c); // undefined – not found`,
  },
  {
    id: "concept-equals",
    type: "concept",
    topic: "Operators",
    title: "== vs ===",
    prompt: "Explain the difference between == and === in JavaScript.",
    expected:
      "== performs type coercion, while === compares both value and type without coercion.",
    keywords: ["coercion", "strict equality", "type"],
    explanation:
      "The loose equality operator (==) performs type coercion, converting operands to the same type before comparing, which can lead to unexpected results and bugs. For instance, it converts strings to numbers, booleans to numbers, and handles null/undefined specially. The strict equality operator (===) compares both value and type without coercion, making it safer and generally preferred for reliable comparisons. Using === prevents subtle bugs from type coercion and is considered a best practice in modern JavaScript development. The only exception is when intentionally using == for null/undefined checks.",
    code: `console.log(1 == '1');   // true (coercion)
console.log(1 === '1');  // false (different types)
console.log(null == undefined);  // true
console.log(null === undefined); // false`,
  },
  {
    id: "concept-hoisting",
    type: "concept",
    topic: "Hoisting",
    title: "What is hoisting?",
    prompt: "Explain hoisting in JavaScript.",
    expected:
      "Hoisting is the behavior where variable and function declarations are moved to the top of their scope during compilation.",
    keywords: ["hoisting", "declaration", "scope"],
    explanation:
      "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation, before code execution. Variables declared with 'var' are hoisted and initialized with 'undefined', allowing access before declaration but potentially causing bugs. Function declarations are fully hoisted, including their implementation. Variables declared with 'let' and 'const' are hoisted but remain in the Temporal Dead Zone (TDZ) until their declaration line, causing a ReferenceError if accessed early. This TDZ prevents the undefined initialization issues of var and encourages better coding practices. Understanding hoisting is essential for debugging scope-related issues.",
    code: `console.log(x); // undefined (hoisted)
var x = 5;
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;`,
  },
  {
    id: "concept-prototype-chain",
    type: "concept",
    topic: "Prototypes",
    title: "Prototype chain explanation",
    prompt: "Explain how prototype chain works in JavaScript.",
    expected:
      "Objects have a hidden [[Prototype]] link to another object. When a property is accessed, JS looks up the chain until found or null.",
    keywords: ["prototype", "inheritance", "__proto__"],
    explanation:
      "Every object in JavaScript (except the root Object.prototype) has a hidden internal link called [[Prototype]] that points to another object, forming a chain. When accessing a property, JavaScript checks the object itself first, then traverses the prototype chain via these links until it finds the property or reaches null. This forms the basis of prototypal inheritance, allowing objects to inherit properties and methods from their prototypes. The chain enables shared behavior across instances, supports method overriding, and is manipulated using Object.setPrototypeOf(), Object.getPrototypeOf(), or the __proto__ property. Modern JavaScript's class syntax is syntactic sugar over this prototype system.",
    code: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { console.log(\`\${this.name} speaks\`); };
const dog = new Animal('Rex');
dog.speak(); // Rex speaks – speak found on Animal.prototype`,
  },
  {
    id: "concept-event-loop",
    type: "concept",
    topic: "Async JS",
    title: "Event Loop",
    prompt: "Explain the JavaScript event loop.",
    expected:
      "The event loop continuously checks the call stack and task queues, pushing callbacks to the stack when it's empty.",
    keywords: ["call stack", "queue", "microtask", "macrotask"],
    explanation:
      "JavaScript is single-threaded with a call stack for synchronous code execution. The event loop manages asynchronous operations by continuously monitoring the call stack and task queues. When the stack is empty, it prioritizes microtasks (Promise resolutions, MutationObserver callbacks) over macrotasks (setTimeout, setInterval, I/O operations). This two-tier queue system ensures Promises resolve before timers, explaining why async/await and Promise chains execute predictably. The event loop prevents blocking by deferring I/O and timers, enabling responsive UIs despite JavaScript's single-threaded nature. Understanding this is crucial for debugging async code and optimizing performance.",
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1,4,3,2 – microtask (3) runs before macrotask (2)`,
  },
  {
    id: "concept-microtask-macrotask",
    type: "concept",
    topic: "Async JS",
    title: "Microtask vs Macrotask",
    prompt: "What is the difference between microtasks and macrotasks?",
    expected:
      "Microtasks have higher priority and run before macrotasks after the current execution completes.",
    keywords: ["microtask", "macrotask", "priority"],
    explanation:
      "Microtasks (Promise.then, Promise.catch, queueMicrotask, MutationObserver) have higher priority and are processed immediately after the current execution context finishes, before yielding control back to the event loop. Macrotasks (setTimeout, setInterval, setImmediate, I/O operations, UI rendering) are processed in the next iteration of the event loop. This priority system ensures Promises resolve before timers, even with zero delay, and prevents UI blocking. The microtask queue is always emptied before checking macrotasks, which can lead to 'starvation' if microtasks continuously add more microtasks. This behavior is specified in the HTML5 event loop specification.",
    code: `setTimeout(() => console.log('macrotask'), 0);
queueMicrotask(() => console.log('microtask'));
console.log('sync');
// Output: sync, microtask, macrotask`,
  },
  {
    id: "concept-this",
    type: "concept",
    topic: "this",
    title: "this keyword",
    prompt: "How is 'this' determined in JavaScript?",
    expected:
      "'this' depends on how a function is called, not where it is defined.",
    keywords: ["call site", "context", "binding"],
    explanation:
      "The 'this' keyword refers to the execution context of a function, determined by how the function is called, not where it's defined. The four binding rules in precedence order are: 1) New binding (constructor calls with 'new'), 2) Explicit binding (call/apply/bind), 3) Implicit binding (object method calls), 4) Default binding (global/window in non-strict mode, undefined in strict mode). Arrow functions inherit 'this' lexically from their enclosing scope, making them unsuitable for methods but perfect for callbacks. Understanding 'this' binding is essential for object-oriented JavaScript and event handling, as incorrect binding is a common source of bugs.",
    code: `const obj = {
  name: 'Object',
  log() { console.log(this.name); }
};
obj.log(); // 'Object' – implicit binding
const log = obj.log;
log(); // undefined (or global) – default binding`,
  },
  {
    id: "concept-arrow-this",
    type: "concept",
    topic: "this",
    title: "Arrow vs Normal Function",
    prompt: "How does 'this' behave in arrow functions?",
    expected:
      "Arrow functions inherit 'this' from their surrounding lexical scope.",
    keywords: ["lexical", "arrow", "this"],
    explanation:
      "Arrow functions do not have their own 'this' binding, instead lexically capturing the 'this' value from their surrounding context at creation time. They also lack 'arguments' object and cannot be used as constructors. This makes them ideal for callbacks, array methods, and functional programming where lexical scoping is desired. However, they're unsuitable for object methods (where dynamic 'this' is needed), prototype methods, or any scenario requiring their own context. Arrow functions provide more predictable behavior in event handlers and promise chains but can cause issues when methods are extracted from objects or used in class definitions.",
    code: `const obj = {
  name: 'Object',
  log: function() {
    setTimeout(() => console.log(this.name), 0); // arrow captures outer this
    setTimeout(function() { console.log(this.name); }, 0); // own this (global)
  }
};
obj.log(); // 'Object', undefined`,
  },
  {
    id: "concept-debounce",
    type: "concept",
    topic: "Performance",
    title: "Debouncing",
    prompt: "What is debouncing?",
    expected:
      "Debouncing delays execution until a function stops being called for a specified time.",
    keywords: ["delay", "optimize", "performance"],
    explanation:
      "Debouncing delays function execution until after a specified wait time has elapsed since the last invocation, effectively grouping rapid successive calls into a single execution. It's used to optimize performance by preventing excessive function calls during frequent events like user input (typing, scrolling, resizing). The function only runs once after the user stops interacting for the specified delay period. This is particularly useful for API calls, search suggestions, and window resize handlers. Unlike throttling, debouncing doesn't guarantee execution intervals but ensures the function runs at most once per burst of activity, making it ideal for completion-based operations.",
    code: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Usage: window.addEventListener('resize', debounce(handleResize, 200));`,
  },
  {
    id: "concept-throttle",
    type: "concept",
    topic: "Performance",
    title: "Throttling",
    prompt: "What is throttling?",
    expected:
      "Throttling ensures a function executes at most once in a given time interval.",
    keywords: ["limit", "interval"],
    explanation:
      "Throttling limits function execution to at most once per specified time interval, regardless of how many times it's called within that window. Unlike debouncing, it guarantees execution at regular intervals, making it suitable for events that need continuous but controlled handling like scroll, mouse movement, or game loops. The function will execute immediately on the first call, then wait for the interval before allowing another execution. This ensures smooth, predictable behavior for real-time interactions while preventing performance degradation. Throttling is preferred when you need to maintain responsiveness during ongoing user actions.",
    code: `function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn.apply(this, args);
    }
  };
}
// Usage: window.addEventListener('scroll', throttle(handleScroll, 100));`,
  },
  {
    id: "concept-call-apply-bind",
    type: "concept",
    topic: "Functions",
    title: "call vs apply vs bind",
    prompt: "Explain call, apply, and bind.",
    expected:
      "call and apply invoke functions immediately, while bind returns a new function with bound context.",
    keywords: ["call", "apply", "bind"],
    explanation:
      "call() and apply() immediately invoke the function with a specified 'this' context and arguments, enabling explicit binding. call() takes arguments individually (fn.call(thisArg, arg1, arg2)), while apply() takes them as an array (fn.apply(thisArg, [arg1, arg2])). bind() returns a new function with the 'this' context permanently bound, without executing it immediately, allowing for partial application. All three are essential for borrowing methods, creating bound callbacks, and controlling execution context. They're particularly useful in functional programming, event handling, and when working with object methods that need different contexts.",
    code: `function greet(greeting) { return greeting + ' ' + this.name; }
const user = { name: 'Alice' };
console.log(greet.call(user, 'Hello')); // Hello Alice
console.log(greet.apply(user, ['Hi'])); // Hi Alice
const bound = greet.bind(user, 'Hey');
console.log(bound()); // Hey Alice`,
  },
  {
    id: "concept-shallow-deep-copy",
    type: "concept",
    topic: "Objects",
    title: "Shallow vs Deep Copy",
    prompt: "What is the difference between shallow copy and deep copy?",
    expected:
      "Shallow copy copies references, deep copy copies actual values recursively.",
    keywords: ["reference", "clone"],
    explanation:
      "A shallow copy creates a new object and copies the top-level properties, but nested objects and arrays still share references with the original, leading to unintended mutations. A deep copy recursively duplicates all nested objects, arrays, and primitive values, creating completely independent copies. Shallow copies (via Object.assign, spread operator, or Array.slice) are faster and sufficient for flat structures, but deep copies (using JSON.parse(JSON.stringify) or libraries like Lodash) are necessary for complex nested data. Deep copying primitives, dates, and functions requires special handling, as JSON methods don't preserve them correctly.",
    code: `const original = { a: 1, b: { c: 2 } };
const shallow = { ...original };
shallow.b.c = 3;
console.log(original.b.c); // 3 – mutated (shared reference)
const deep = JSON.parse(JSON.stringify(original)); // simple deep copy
deep.b.c = 4;
console.log(original.b.c); // still 3 – not mutated`,
  },
  {
    id: "concept-memoization",
    type: "concept",
    topic: "Performance",
    title: "Memoization",
    prompt: "What is memoization?",
    expected: "Memoization caches function results to avoid recomputation.",
    keywords: ["cache", "optimization"],
    explanation:
      "Memoization is an optimization technique that caches the results of expensive function calls based on their inputs, returning cached results for identical inputs instead of recomputing. It trades memory for performance, storing results in a cache (usually an object or Map) keyed by serialized arguments. This dramatically improves performance for functions with repeated calls, like recursive algorithms (Fibonacci, factorial), expensive computations, or API calls. Memoization requires pure functions (same inputs always produce same outputs) and careful cache key generation. Libraries like Lodash provide memoization utilities, but custom implementations allow fine-tuned control over caching strategy and invalidation.",
    code: `function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}
const fib = memoize(n => n <= 1 ? n : fib(n-1) + fib(n-2));
console.log(fib(40)); // fast due to caching`,
  },
  {
    id: "concept-tdz",
    type: "concept",
    topic: "Hoisting",
    title: "Temporal Dead Zone",
    prompt: "What is Temporal Dead Zone (TDZ)?",
    expected:
      "TDZ is the time between variable declaration and initialization where accessing it throws an error.",
    keywords: ["let", "const", "tdz"],
    explanation:
      "The Temporal Dead Zone (TDZ) is the period between the start of a block scope (function, block, module) and the variable's declaration line. Variables declared with 'let' and 'const' are hoisted to the top of their scope but cannot be accessed until initialized, throwing a ReferenceError. This prevents the undefined initialization issues of 'var' and catches potential bugs early. The TDZ exists for each variable individually, so accessing a variable before its declaration in the same scope causes an error, even if other variables in the same block are accessible. This behavior encourages better coding practices and clearer variable lifecycles.",
    code: `console.log(x); // undefined (var)
var x = 1;
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 2;`,
  },
  {
    id: "concept-currying",
    type: "concept",
    topic: "Functions",
    title: "Currying",
    prompt: "What is currying?",
    expected:
      "Currying transforms a function with multiple arguments into a sequence of functions each taking one argument.",
    keywords: ["function", "partial"],
    explanation:
      "Currying transforms a function that takes multiple arguments into a sequence of nested functions, each taking a single argument, enabling partial application where some arguments are fixed while others remain variable. This functional programming technique allows creating specialized function variants by pre-filling arguments, supporting function composition and reusable utilities. For example, a multiply function can be curried to create double or triple functions. Currying facilitates lazy evaluation, improves code modularity, and is fundamental in libraries like Ramda or functional programming paradigms. It requires the function to be designed with currying in mind or wrapped with a curry utility.",
    code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...more) => curried(...args, ...more);
  };
}
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6`,
  },
  {
    id: "concept-pure-function",
    type: "concept",
    topic: "Functional Programming",
    title: "Pure Functions",
    prompt: "What is a pure function?",
    expected:
      "A pure function returns the same output for the same input and has no side effects.",
    keywords: ["deterministic", "no side effects"],
    explanation:
      "A pure function is a function that, given the same input, always returns the same output and has no side effects. It doesn't modify external state, access global variables, or perform I/O operations. Pure functions are deterministic, testable, and predictable, making them easier to debug and reason about. They enable optimizations like memoization and are fundamental to functional programming paradigms. In React, pure components re-render only when props change, improving performance.",
    code: `// Impure – uses external state
let counter = 0;
function increment() { return ++counter; }

// Pure – no side effects, deterministic
function add(a, b) { return a + b; }`,
  },
  {
    id: "concept-side-effects",
    type: "concept",
    topic: "Functional Programming",
    title: "Side Effects",
    prompt: "What are side effects?",
    expected: "Side effects are changes to external state outside a function.",
    keywords: ["mutation", "external"],
    explanation:
      "Side effects are any operations that modify state outside the function's local scope or interact with the external world. This includes modifying global variables, DOM manipulation, API calls, file I/O, console logging, and even reading from external sources. While side effects are often necessary, minimizing them leads to more predictable, testable, and maintainable code. In functional programming, side effects are isolated and controlled, often using techniques like dependency injection or monads to make them explicit and manageable.",
    code: `// Side effects
let total = 0;
function addToTotal(x) { total += x; } // mutates external variable
console.log('Hello'); // I/O is a side effect
document.body.textContent = 'Hello'; // DOM mutation`,
  },
  {
    id: "concept-garbage-collection",
    type: "concept",
    topic: "Memory",
    title: "Garbage Collection",
    prompt: "How does garbage collection work in JavaScript?",
    expected: "JavaScript uses mark-and-sweep to remove unreachable objects.",
    keywords: ["memory", "mark", "sweep"],
    explanation:
      "JavaScript engines use automatic garbage collection to manage memory, typically employing a mark-and-sweep algorithm. The process identifies reachable objects (those accessible from root references like global variables, call stack, etc.) and marks them as alive, then sweeps away unmarked objects. Modern engines use generational collection (young/old generations) and incremental collection to minimize pauses. Memory leaks occur when references to unused objects are unintentionally retained, preventing garbage collection. Understanding GC helps in writing memory-efficient code and debugging performance issues.",
    code: `let obj = { data: new Array(1000) };
obj = null; // object becomes unreachable → eligible for GC`,
  },
  {
    id: "concept-memory-leak",
    type: "concept",
    topic: "Memory",
    title: "Memory Leak",
    prompt: "What is a memory leak?",
    expected:
      "A memory leak occurs when unused memory is not released due to lingering references.",
    keywords: ["memory", "leak"],
    explanation:
      "A memory leak occurs when memory that is no longer needed is not released back to the system, causing the application to consume increasing amounts of memory over time. Common causes include accidental global variables, closures that capture large objects, event listeners not removed, timers not cleared, and DOM references preventing element cleanup. Memory leaks lead to performance degradation, increased garbage collection pauses, and can eventually crash applications. Tools like Chrome DevTools Memory tab help identify leaks through heap snapshots and allocation timelines.",
    code: `// Memory leak: global variable
window.leaked = { data: new Array(1000000) };

// Memory leak: event listener not removed
function addListener() {
  const element = document.getElementById('btn');
  element.addEventListener('click', () => {
    console.log('clicked');
  });
}
// element retains the listener, preventing GC`,
  },
  {
    id: "concept-promise",
    type: "concept",
    topic: "Async JS",
    title: "Promise",
    prompt: "What is a Promise?",
    expected:
      "A Promise represents a future value of an asynchronous operation.",
    keywords: ["pending", "fulfilled", "rejected"],
    explanation:
      "A Promise represents the eventual completion or failure of an asynchronous operation, providing a cleaner way to handle async code compared to callbacks. A Promise can be in one of three states: pending (initial), fulfilled (successful completion), or rejected (failed). Promises support chaining with .then() and .catch() methods, allowing sequential async operations. They resolve the 'callback hell' problem by flattening nested callbacks into linear chains. Promises are the foundation for async/await syntax and are used extensively in modern JavaScript for API calls, file operations, and any async task.",
    code: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});
promise.then(result => console.log(result)); // 'done' after 1s`,
  },
  {
    id: "concept-async-await",
    type: "concept",
    topic: "Async JS",
    title: "async/await",
    prompt: "How does async/await work?",
    expected:
      "async functions return promises and await pauses execution until the promise resolves.",
    keywords: ["await", "promise"],
    explanation:
      "async/await is syntactic sugar built on top of Promises that makes asynchronous code look and behave like synchronous code. An async function always returns a Promise, and the await keyword pauses execution until the Promise resolves, without blocking the main thread. await can only be used inside async functions and unwraps Promise values, making error handling with try/catch straightforward. This syntax improves code readability and maintainability, especially for complex async flows involving multiple sequential or parallel operations. It's the preferred modern approach for handling asynchronous operations in JavaScript.",
    code: `async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}`,
  },
  {
    id: "concept-module",
    type: "concept",
    topic: "Modules",
    title: "ES Modules",
    prompt: "What are ES modules?",
    expected:
      "ES modules allow code to be split into reusable files using import and export.",
    keywords: ["import", "export"],
    explanation:
      "ES modules (ESM) are the official standard for modular JavaScript code, allowing developers to split code into reusable files using import and export statements. Unlike CommonJS, ES modules are statically analyzable, enabling tree shaking (removing unused code) and better optimization by bundlers. They support both named exports (export const foo) and default exports (export default foo), with strict mode automatically enabled. ES modules load asynchronously and support top-level await. They're the modern replacement for CommonJS and are natively supported in browsers and Node.js (with .mjs extension or package.json type field).",
    code: `// math.js
export const add = (a, b) => a + b;
// main.js
import { add } from './math.js';
console.log(add(2, 3));`,
  },
  {
    id: "concept-commonjs",
    type: "concept",
    topic: "Modules",
    title: "CommonJS vs ES Modules",
    prompt: "Difference between CommonJS and ES Modules?",
    expected:
      "CommonJS uses require and is synchronous, ES Modules use import/export and are asynchronous.",
    keywords: ["require", "import"],
    explanation:
      "CommonJS (require/module.exports) is the synchronous module system used in Node.js, where modules are loaded and executed immediately upon require(). ES modules (import/export) are the modern standard, loaded asynchronously and statically analyzable, enabling better tree shaking and optimization. CommonJS uses runtime loading with dynamic requires, while ES modules use static imports that must be at the top level. ES modules have strict mode by default and support top-level await. While CommonJS is still prevalent in Node.js ecosystems, ES modules are the future and are increasingly adopted across JavaScript environments.",
    code: `// CommonJS
const fs = require('fs');
module.exports = { foo: 1 };
// ES Modules
import fs from 'fs';
export const foo = 1;`,
  },
  {
    id: "concept-immutability",
    type: "concept",
    topic: "Data",
    title: "Immutability",
    prompt: "What is immutability?",
    expected: "Immutability means data cannot be changed after creation.",
    keywords: ["immutable", "state"],
    explanation:
      "Immutability means data structures cannot be modified after creation; instead of changing existing data, new copies are created with the desired changes. This approach prevents unintended side effects and makes state changes predictable and traceable. In React, immutability enables efficient re-rendering by allowing shallow comparisons to detect changes. Libraries like Immer provide convenient ways to work with immutable data. Immutability is fundamental to functional programming and helps prevent bugs caused by shared mutable state, though it can have performance implications for large data structures that require frequent updates.",
    code: `const arr = [1, 2, 3];
const newArr = [...arr, 4]; // arr unchanged
// In React state
const [state, setState] = useState({ count: 0 });
setState(prev => ({ ...prev, count: prev.count + 1 })); // immutably update`,
  },
  {
    id: "concept-idempotent",
    type: "concept",
    topic: "API",
    title: "Idempotent Operations",
    prompt: "What is an idempotent operation?",
    expected:
      "An operation that produces the same result no matter how many times it is executed.",
    keywords: ["api", "repeat"],
    explanation:
      "An idempotent operation produces the same result regardless of how many times it's executed with the same input. This property is crucial for building reliable systems, especially in distributed environments where network failures might cause retries. HTTP methods like GET, PUT, and DELETE are idempotent (reading the same resource or updating to the same state multiple times has no additional effect), while POST is not (creating multiple resources). Idempotency enables safe retries, caching, and optimistic UI updates. In APIs, implementing idempotency keys prevents duplicate operations from user double-clicks or network issues.",
    code: `// Idempotent GET
fetch('/users/123'); // same result each time
// Non-idempotent POST
fetch('/users', { method: 'POST', body: JSON.stringify({ name: 'John' }) }); // creates a new user each time`,
  },

  // ========== NEW CONCEPT QUESTIONS WITH CODE EXAMPLES ==========
  {
    id: "concept-execution-context",
    type: "concept",
    topic: "Execution Context",
    title: "Execution Context & Call Stack",
    prompt: "Explain execution context and call stack.",
    expected:
      "Execution context contains the environment for code execution. The call stack manages execution contexts in LIFO order.",
    keywords: ["context", "stack", "environment"],
    explanation:
      "An execution context is the environment in which JavaScript code runs, containing the variable environment (local variables), lexical environment (closure scope), and 'this' binding. Each function call creates a new execution context pushed onto the call stack (LIFO structure). The call stack tracks the execution order, with the currently running function at the top. When a function completes, its context is popped, and execution returns to the previous context. Understanding the call stack is essential for debugging stack overflow errors, recursion depth, and asynchronous execution flow.",
    code: `function a() {
  console.log('a');
  b();
}
function b() {
  console.log('b');
}
a(); // Call stack: a → b → (after b returns) a → (after a returns) empty`,
  },
  {
    id: "concept-closure-loop",
    type: "concept",
    topic: "Closures",
    title: "Closure in Loops",
    prompt: "Why does var cause closure issues in loops?",
    expected:
      "var is function-scoped, so all callbacks share the same i; let creates a new binding per iteration.",
    keywords: ["loop", "var", "let"],
    explanation:
      "When using 'var' in loops with closures (like setTimeout callbacks), all closures capture the same variable reference, leading to all callbacks accessing the final loop value. This happens because 'var' is function-scoped, not block-scoped. Using 'let' creates a new block-scoped binding for each iteration, preserving the correct value. This is a classic JavaScript gotcha that demonstrates the importance of understanding scoping rules and how closures interact with variable declarations. Modern code should use 'let' or 'const' in loops to avoid this issue.",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
} // 3,3,3
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
} // 0,1,2`,
  },
  {
    id: "concept-generator",
    type: "concept",
    topic: "Generators",
    title: "Generator Functions",
    prompt: "What are generator functions and what are they used for?",
    expected:
      "Generators can pause execution and yield multiple values using yield.",
    keywords: ["generator", "yield", "iterator"],
    explanation:
      "Generator functions (defined with function*) are special functions that can pause execution midway and resume later, yielding multiple values over time. They return a Generator object that implements the Iterator protocol. The 'yield' keyword pauses execution and returns a value, while 'yield*' delegates to another generator. Generators are useful for creating lazy sequences, handling infinite data streams, implementing coroutines, and managing complex async flows. They're the foundation for async/await (which can be transpiled to generators) and enable memory-efficient processing of large datasets.",
    code: `function* countUpTo(limit) {
  let i = 1;
  while (i <= limit) yield i++;
}
const gen = countUpTo(3);
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done); // true`,
  },
  {
    id: "concept-weakmap-weakset",
    type: "concept",
    topic: "Memory",
    title: "WeakMap and WeakSet",
    prompt: "What are WeakMap and WeakSet used for?",
    expected:
      "They hold weak references to objects, allowing garbage collection when no other references exist.",
    keywords: ["weakmap", "weakset", "garbage collection"],
    explanation:
      "WeakMap and WeakSet are collections that hold 'weak' references to objects, allowing those objects to be garbage collected when no other references exist. WeakMap keys must be objects (not primitives), and entries are automatically removed when keys are GC'd. WeakSet only stores objects. These structures prevent memory leaks by not preventing cleanup of their contents. They're ideal for caching, storing metadata, or tracking object relationships without interfering with garbage collection. However, they don't support iteration or size properties since entries may disappear unpredictably.",
    code: `let obj = {};
const wm = new WeakMap();
wm.set(obj, 'secret');
obj = null; // entry can be garbage collected`,
  },
  {
    id: "concept-symbol",
    type: "concept",
    topic: "Symbols",
    title: "Symbol Type",
    prompt: "What are Symbols in JavaScript?",
    expected:
      "Symbols are unique primitive values, often used as object property keys to avoid collisions.",
    keywords: ["symbol", "unique", "property"],
    explanation:
      "Symbols are unique, immutable primitive values introduced in ES6, guaranteed to be unique even when created with identical descriptions. They're often used as object property keys to avoid naming collisions, especially for internal properties or when extending objects from external libraries. JavaScript has several well-known symbols (like Symbol.iterator, Symbol.toStringTag) that define protocol behavior. Symbols are not enumerable in for...in loops and are ignored by JSON.stringify, making them perfect for metadata. They provide a way to add 'hidden' properties to objects without risking conflicts with user-defined properties.",
    code: `const sym1 = Symbol('id');
const sym2 = Symbol('id');
console.log(sym1 === sym2); // false
const obj = { [sym1]: 123 };
console.log(obj[sym1]); // 123`,
  },
  {
    id: "concept-proxy",
    type: "concept",
    topic: "Proxy",
    title: "Proxy and Reflect",
    prompt: "What is a Proxy in JavaScript?",
    expected:
      "Proxy allows you to intercept and customize operations on objects.",
    keywords: ["proxy", "trap", "intercept"],
    explanation:
      "Proxy is a powerful metaprogramming feature that creates a wrapper around an object, intercepting and customizing fundamental operations like property access, assignment, function calls, and more. The handler object defines 'traps' for these operations. Reflect provides methods that correspond to these traps, offering default behavior and enabling delegation. Proxies enable creating virtual properties, validation, logging, and implementing patterns like negative array indices or automatic property expansion. They're used in frameworks for reactivity systems, ORM libraries, and creating domain-specific languages within JavaScript.",
    code: `const target = { name: 'Alice' };
const handler = {
  get: (obj, prop) => prop in obj ? obj[prop] : 'default'
};
const proxy = new Proxy(target, handler);
console.log(proxy.name); // Alice
console.log(proxy.age);  // default`,
  },
  {
    id: "concept-intersection-observer",
    type: "concept",
    topic: "Browser APIs",
    title: "Intersection Observer",
    prompt: "What is Intersection Observer used for?",
    expected:
      "Intersection Observer detects when an element enters or leaves the viewport.",
    keywords: ["intersection", "lazy loading", "viewport"],
    explanation:
      "Intersection Observer is a modern browser API that efficiently detects when an element enters or exits the viewport or intersects with another element, without needing scroll event listeners. It uses the browser's rendering engine to asynchronously observe changes, making it more performant than traditional scroll-based approaches. Common use cases include lazy loading images/videos, infinite scrolling, triggering animations on scroll, and tracking ad visibility for analytics. The API provides detailed intersection information including intersection ratio and bounding rectangles, enabling sophisticated scroll-based interactions.",
    code: `const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
observer.observe(document.querySelector('.target'));`,
  },
  {
    id: "concept-service-worker",
    type: "concept",
    topic: "PWA",
    title: "Service Workers",
    prompt: "What are service workers used for?",
    expected:
      "Service workers act as proxies between the browser and network, enabling offline support and push notifications.",
    keywords: ["offline", "cache", "pwa"],
    explanation:
      "Service workers are JavaScript files that run in the background, separate from the main browser thread, acting as a proxy between web applications and the network. They enable Progressive Web App features like offline functionality, background sync, and push notifications. Service workers can intercept network requests, cache resources, and serve cached content when offline. They have their own lifecycle (installing, waiting, activated) and can only be used over HTTPS. Service workers are essential for creating reliable, offline-first web applications and are used by major platforms for caching strategies and background processing.",
    code: `// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Registered'))
    .catch(err => console.error(err));
}`,
  },
  {
    id: "concept-web-workers",
    type: "concept",
    topic: "Web Workers",
    title: "Web Workers",
    prompt: "What are web workers used for?",
    expected:
      "Web workers allow running scripts in background threads to avoid blocking the main thread.",
    keywords: ["thread", "background", "performance"],
    explanation:
      "Web Workers are a browser feature that allows running JavaScript in background threads, preventing CPU-intensive tasks from blocking the main UI thread. Workers communicate with the main thread via postMessage, sending structured cloneable data (not functions or DOM elements). They're ideal for heavy computations, image processing, or data parsing. There are different types: Dedicated Workers (single thread), Shared Workers (multiple tabs), and Service Workers (network proxy). Workers don't have access to DOM or many browser APIs, but can use XMLHttpRequest, WebSockets, and other APIs. They're essential for maintaining responsive UIs during complex operations.",
    code: `// main.js
const worker = new Worker('worker.js');
worker.postMessage('start');
worker.onmessage = (e) => console.log(e.data);
// worker.js
self.onmessage = (e) => {
  // heavy computation
  self.postMessage('done');
};`,
  },
  {
    id: "concept-strict-mode",
    type: "concept",
    topic: "Strict Mode",
    title: "Strict Mode",
    prompt: "What does 'use strict' do?",
    expected:
      "Strict mode enforces stricter parsing and error handling, preventing certain silent errors.",
    keywords: ["strict", "mode"],
    explanation:
      "'use strict' enables strict mode, a restricted variant of JavaScript that catches common coding mistakes and prevents potentially problematic features. It eliminates silent errors by throwing exceptions, forbids certain syntax likely to be defined in future versions, and improves security by disallowing access to certain properties. Key changes include: variables must be declared, 'this' in functions is undefined instead of global, duplicate object properties throw errors, and octal literals are forbidden. Strict mode is automatically enabled in ES modules, classes, and arrow functions. It's a best practice for modern JavaScript development to catch bugs early and write more maintainable code.",
    code: `// Without strict: accidental global
function foo() { x = 10; } // x becomes global
// With strict
function foo() { 'use strict'; x = 10; } // ReferenceError`,
  },
  {
    id: "concept-bubbling-capturing",
    type: "concept",
    topic: "Events",
    title: "Event Bubbling and Capturing",
    prompt: "Explain event bubbling and capturing.",
    expected:
      "Bubbling: events propagate from target to ancestors. Capturing: events propagate from ancestors to target.",
    keywords: ["bubbling", "capturing", "event propagation"],
    explanation:
      "Event propagation in the DOM occurs in three phases: capturing (trickling down from window to target), target (at the element), and bubbling (bubbling up from target to window). By default, event handlers are called during the bubbling phase. The third parameter in addEventListener (useCapture) controls this: true for capturing phase, false (default) for bubbling. stopPropagation() prevents further propagation, while preventDefault() prevents the default action. Understanding these phases is crucial for event delegation, preventing unwanted event triggering, and building complex UI interactions. Event capturing is less commonly used but useful for intercepting events before they reach their target.",
    code: `// Add event listener in capturing phase
element.addEventListener('click', () => {}, true);
// Bubbling phase (default)
element.addEventListener('click', () => {});`,
  },
  {
    id: "concept-requestanimationframe",
    type: "concept",
    topic: "Animation",
    title: "requestAnimationFrame",
    prompt: "What is requestAnimationFrame used for?",
    expected:
      "requestAnimationFrame schedules a function to run before the next repaint, optimal for animations.",
    keywords: ["animation", "performance", "frame"],
    explanation:
      "requestAnimationFrame is a browser API that schedules a function to run before the next repaint, synchronizing with the browser's refresh rate (typically 60fps). It's designed specifically for animations and visual updates, providing smoother animations than setTimeout/setInterval by aligning with the browser's rendering cycle. The callback receives a timestamp parameter for precise timing calculations. It's more efficient than timers for animations as it pauses when the tab is inactive and automatically adjusts to the display's refresh rate. Modern animation libraries and CSS transitions/animations often use this under the hood for optimal performance.",
    code: `function animate() {
  // update animation
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);`,
  },
  {
    id: "concept-custom-elements",
    type: "concept",
    topic: "Web Components",
    title: "Custom Elements",
    prompt: "What are custom elements?",
    expected:
      "Custom elements allow you to define your own HTML tags with custom behavior.",
    keywords: ["web components", "custom element", "shadow dom"],
    explanation:
      "Custom Elements are part of the Web Components specification, allowing developers to define their own HTML tags with custom behavior and styling. They extend HTMLElement and are registered using customElements.define(). Custom elements have lifecycle callbacks (connectedCallback, disconnectedCallback, etc.) for reacting to insertion/removal from DOM. They can use Shadow DOM for encapsulation and can be autonomous (standalone) or customized built-ins (extending existing elements). Custom elements enable reusable, encapsulated components without framework dependencies, promoting interoperability across different JavaScript frameworks and vanilla JS applications.",
    code: `class MyButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', () => alert('clicked'));
  }
}
customElements.define('my-button', MyButton);`,
  },
  {
    id: "concept-shadow-dom",
    type: "concept",
    topic: "Web Components",
    title: "Shadow DOM",
    prompt: "What is Shadow DOM?",
    expected:
      "Shadow DOM encapsulates styles and markup, preventing leakage to/from the main document.",
    keywords: ["encapsulation", "shadow root"],
    explanation:
      "Shadow DOM is a scoped DOM subtree that provides encapsulation for Web Components, preventing styles and scripts from leaking in or out of the component. It creates a separate DOM tree with its own elements, styles, and scripts that don't interfere with the main document. Shadow DOM uses a shadow root (created with attachShadow()) and can be 'open' (accessible via element.shadowRoot) or 'closed' (encapsulated). Styles defined inside shadow DOM are scoped to that component, avoiding CSS conflicts. Shadow DOM is fundamental to Web Components and enables building truly reusable, framework-agnostic UI components with proper encapsulation.",
    code: `const div = document.createElement('div');
const shadow = div.attachShadow({ mode: 'open' });
shadow.innerHTML = '<style>p { color: red; }</style><p>Hello</p>';`,
  },
  {
    id: "concept-bigint",
    type: "concept",
    topic: "Data Types",
    title: "BigInt",
    prompt: "What is BigInt used for?",
    expected:
      "BigInt represents arbitrarily large integers beyond Number.MAX_SAFE_INTEGER.",
    keywords: ["bigint", "large number"],
    explanation:
      "BigInt is a built-in object that provides a way to represent whole numbers larger than 2^53 - 1 (Number.MAX_SAFE_INTEGER), which is the largest number JavaScript can reliably represent with the Number primitive. BigInt can handle arbitrarily large integers, making it suitable for cryptography, financial calculations, and working with large datasets. BigInt literals use the 'n' suffix (123n) and the BigInt() constructor. BigInt operations return BigInt values, and mixing with regular numbers requires explicit conversion. While BigInt provides precision for large integers, it lacks decimal support and has different behavior in some operations.",
    code: `const big = 9007199254740991n;
const bigger = big + 1n; // safe
console.log(bigger); // 9007199254740992n`,
  },
  {
    id: "concept-optional-chaining",
    type: "concept",
    topic: "ES2020",
    title: "Optional Chaining",
    prompt: "What is optional chaining (?.)?",
    expected:
      "Optional chaining allows safe access to deeply nested properties without throwing errors if intermediate properties are null/undefined.",
    keywords: ["optional chaining", "safe navigation"],
    explanation:
      "Optional chaining (?.) is a safe way to access deeply nested object properties without having to check each level for null or undefined. It returns undefined if any part of the chain is null or undefined, preventing TypeError exceptions. It works with property access (obj?.prop), method calls (obj?.method()), and array access (arr?.[0]). Optional chaining can be combined with nullish coalescing (??) for default values. It's particularly useful when working with APIs that may return incomplete data or when accessing properties that might not exist. This feature significantly reduces defensive programming code and makes JavaScript more ergonomic.",
    code: `const obj = { a: { b: { c: 5 } } };
console.log(obj.a?.b?.c); // 5
console.log(obj.a?.x?.y); // undefined`,
  },
  {
    id: "concept-nullish-coalescing",
    type: "concept",
    topic: "ES2020",
    title: "Nullish Coalescing",
    prompt: "What is nullish coalescing (??)?",
    expected:
      "?? returns the right operand when the left is null or undefined, otherwise the left.",
    keywords: ["nullish", "default value"],
    explanation:
      "Nullish coalescing (??) is a logical operator that returns the right operand when the left operand is null or undefined, otherwise returns the left operand. Unlike the logical OR (||) operator, which considers all falsy values (0, '', false, NaN) as false, ?? only considers null and undefined as 'nullish'. This makes it perfect for providing default values when a variable might legitimately be falsy but not null/undefined. It's commonly used with optional chaining (?.) to safely access nested properties with fallbacks. This operator helps avoid bugs where 0 or empty strings are incorrectly treated as missing values.",
    code: `const count = 0;
console.log(count || 10); // 10 (0 is falsy)
console.log(count ?? 10); // 0 (0 is not nullish)`,
  },
  {
    id: "concept-dynamic-import",
    type: "concept",
    topic: "Modules",
    title: "Dynamic Imports",
    prompt: "What are dynamic imports?",
    expected: "Dynamic imports allow loading modules asynchronously on demand.",
    keywords: ["import", "async", "code splitting"],
    explanation:
      "Dynamic imports allow loading ES modules asynchronously at runtime using the import() function, which returns a Promise resolving to the module's exports. Unlike static imports (which must be at the top level), dynamic imports can be used conditionally, in response to user actions, or for code splitting. This enables lazy loading, reducing initial bundle size and improving performance. Dynamic imports support loading modules based on runtime conditions and are essential for implementing code splitting in modern web applications. They're particularly useful for loading heavy libraries only when needed or for implementing plugin architectures.",
    code: `async function loadModule() {
  const module = await import('./some-module.js');
  module.doSomething();
}`,
  },
  // Append these to the existing conceptQuestions array
  {
    id: "concept-map-vs-object",
    type: "concept",
    topic: "Data Structures",
    title: "Map vs Object",
    prompt: "When should you use Map instead of Object?",
    expected:
      "Map preserves insertion order, accepts any key type, and has better performance for frequent additions/deletions.",
    keywords: ["map", "object", "keys", "performance"],
    explanation:
      "Map and Object both store key-value pairs, but Map offers several advantages: keys can be any type (including objects, functions, primitives), insertion order is preserved, size is directly accessible via size property, and it's optimized for frequent additions and removals. Object keys are limited to strings and Symbols, and the prototype chain can cause collisions. Use Map when keys are dynamic or not strings, when order matters, or when you need to frequently add/delete entries. Use Object when you need JSON serialization, simple string-keyed storage, or when working with existing object APIs. Map also provides built-in iteration methods (forEach, entries, keys, values) that are more convenient than Object's methods.",
    code: `const map = new Map();
map.set('a', 1);
map.set({}, 2); // object key
console.log(map.size); // 2
// Preserves insertion order
for (const [key, value] of map) {
  console.log(key, value);
}
const obj = { a: 1 };
console.log(Object.keys(obj).length); // must compute keys array`,
  },
  {
    id: "concept-set-vs-array",
    type: "concept",
    topic: "Data Structures",
    title: "Set vs Array",
    prompt: "What are the differences between Set and Array?",
    expected:
      "Set stores unique values and provides O(1) membership testing, while Array allows duplicates and indexed access.",
    keywords: ["set", "array", "unique", "membership"],
    explanation:
      "Set is a collection of unique values, while Array can contain duplicates and maintains indexed order. Set excels at membership tests (has method is O(1) vs Array's indexOf O(n)) and automatically deduplicates values. Set doesn't allow random access by index (you can convert to Array if needed). Use Set when uniqueness matters and when you frequently need to check if a value exists. Use Array when you need order, indexing, or when you need to store duplicates. Set also provides native iteration and size property. Set can be used to efficiently remove duplicates from an Array: [...new Set(arr)].",
    code: `const set = new Set([1, 2, 2, 3]); // {1, 2, 3}
console.log(set.has(2)); // true, O(1)
const arr = [1, 2, 2, 3];
console.log(arr.includes(2)); // true, but O(n)
// Remove duplicates
const unique = [...new Set(arr)]; // [1, 2, 3]`,
  },
  {
    id: "concept-rest-vs-spread",
    type: "concept",
    topic: "ES6+",
    title: "Rest vs Spread Operators",
    prompt: "What is the difference between rest and spread operators?",
    expected:
      "Rest collects elements into an array; spread expands elements from an iterable.",
    keywords: ["rest", "spread", "operator"],
    explanation:
      "The rest operator (...) collects multiple elements into a single array or object, used in function parameters (to handle variable arguments) and destructuring assignments. The spread operator expands iterable elements (like arrays, strings) into individual items, or expands object properties, used in array literals, function calls, and object literals. Both use the same syntax but context determines whether it's rest (collection) or spread (expansion). Rest must be the last element when used in destructuring or parameters. Spread can be used multiple times and in any position. Understanding the difference is crucial for writing concise, modern JavaScript.",
    code: `// Rest: collects remaining elements
function sum(...args) { return args.reduce((a,b)=>a+b,0); }
const [first, ...rest] = [1,2,3,4]; // first=1, rest=[2,3,4]
// Spread: expands elements
const arr = [1, 2];
const newArr = [...arr, 3, 4]; // [1,2,3,4]
Math.max(...[1,2,3]); // 3
const obj = { a: 1 };
const newObj = { ...obj, b: 2 }; // { a:1, b:2 }`,
  },
  {
    id: "concept-promise-combinators",
    type: "concept",
    topic: "Async JS",
    title: "Promise Combinators (all, race, any, allSettled)",
    prompt:
      "Explain the differences between Promise.all, Promise.race, Promise.any, and Promise.allSettled.",
    expected:
      "all waits for all to resolve or rejects on first error; race settles with first settled promise; any settles with first fulfilled; allSettled waits for all to settle (fulfill or reject).",
    keywords: ["promise", "all", "race", "any", "allSettled"],
    explanation:
      "Promise combinators handle multiple promises: Promise.all() fails fast (rejects on first rejection) and returns array of results. Promise.race() resolves or rejects with the first settled promise. Promise.any() resolves with first fulfilled promise or rejects only if all reject. Promise.allSettled() waits for all to settle (fulfill or reject) and returns array of status objects. Use all when you need all results or fast failure; race for timeout patterns; any for first success; allSettled when you need to know outcome of all operations regardless of failures. These combinators enable sophisticated concurrent control flows.",
    code: `const p1 = Promise.resolve(1);
const p2 = Promise.reject('err');
const p3 = Promise.resolve(3);
Promise.all([p1, p3]).then(console.log); // [1,3]
Promise.allSettled([p1, p2]).then(console.log);
// [{status:'fulfilled',value:1}, {status:'rejected',reason:'err'}]
Promise.any([p1, p2]).then(console.log); // 1
Promise.race([p1, p2]).then(console.log); // 1 (first settled)`,
  },
  {
    id: "concept-event-delegation",
    type: "concept",
    topic: "Events",
    title: "Event Delegation",
    prompt: "What is event delegation and why is it useful?",
    expected:
      "Event delegation uses a single parent listener to handle events on child elements, reducing memory usage and supporting dynamic content.",
    keywords: ["delegation", "event", "performance"],
    explanation:
      "Event delegation is a technique that takes advantage of event bubbling to attach a single event listener to a parent element, handling events for all current and future child elements that match a selector. This reduces memory usage (fewer listeners), simplifies code, and automatically supports dynamically added elements. The event's target is checked to determine if it matches the desired child element. Event delegation is essential for performance in lists, tables, or any dynamic content. It also works well with components that need to handle events without managing individual listeners. However, it requires careful handling of the target to ensure it's the intended element, and it may not work for events that don't bubble (like focus, blur, load).",
    code: `// Without delegation: attach listener to each button
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});
// With delegation: single listener on parent
document.querySelector('.container').addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    handleClick(e);
  }
});`,
  },
  {
    id: "concept-storage",
    type: "concept",
    topic: "Browser APIs",
    title: "localStorage vs sessionStorage vs cookies",
    prompt: "Compare localStorage, sessionStorage, and cookies.",
    expected:
      "localStorage persists until cleared; sessionStorage lasts per session; cookies are sent with requests, limited to 4KB, and have expiration.",
    keywords: ["localstorage", "sessionstorage", "cookies", "storage"],
    explanation:
      "localStorage provides persistent storage (until manually cleared) with 5-10MB capacity, synchronous API, and data is not sent to server. sessionStorage is similar but cleared when tab/browser closes. Cookies are smaller (4KB), sent with every HTTP request, can be set with expiration, and have flags like HttpOnly (blocked from JS) and Secure (HTTPS only). Use localStorage for client-only data (themes, preferences). Use sessionStorage for temporary, tab-specific data. Use cookies for authentication tokens (with HttpOnly, Secure flags) or data that must be sent to server automatically. Both storages are synchronous and block main thread, so avoid large synchronous operations.",
    code: `// localStorage
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
// sessionStorage
sessionStorage.setItem('tabId', '123');
// Cookie
document.cookie = 'token=abc123; path=/; max-age=3600; Secure; HttpOnly';`,
  },
  {
    id: "concept-cors",
    type: "concept",
    topic: "Security",
    title: "CORS (Cross-Origin Resource Sharing)",
    prompt: "What is CORS and how does it work?",
    expected:
      "CORS is a security mechanism that allows servers to specify which origins can access their resources via browsers.",
    keywords: ["cors", "origin", "preflight", "security"],
    explanation:
      "CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts web pages from making requests to a different origin than the one that served the page. It uses HTTP headers to determine if a request is allowed. Simple requests (GET, POST with specific headers) are sent directly, and the browser checks the response's Access-Control-Allow-Origin. Preflighted requests (PUT, DELETE, custom headers) first send an OPTIONS request to check permissions. Servers must respond with appropriate CORS headers. CORS prevents malicious sites from reading sensitive data from other origins. For development, proxies or server configuration can bypass restrictions. CORS is not a security enforcement on the server side; it's a browser-enforced policy.",
    code: `// Server response headers
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type
// Preflight OPTIONS request automatically sent by browser`,
  },
  {
    id: "concept-websockets",
    type: "concept",
    topic: "Network",
    title: "WebSockets",
    prompt: "What are WebSockets and when would you use them?",
    expected:
      "WebSockets provide full-duplex, persistent communication between client and server over a single TCP connection.",
    keywords: ["websocket", "real-time", "bidirectional"],
    explanation:
      "WebSockets enable real-time, bidirectional communication between client and server without the overhead of HTTP request/response cycles. After an initial handshake (HTTP upgrade), the connection remains open, allowing both parties to send messages asynchronously. This is ideal for applications requiring low latency and frequent updates: chat apps, live notifications, collaborative editing, gaming, financial tickers, and IoT. Unlike HTTP/1.1 polling (which wastes resources), WebSockets maintain a persistent connection with minimal overhead. They work over port 80/443 and can carry any data format (text/binary). WebSockets are supported in all modern browsers and can be used with libraries like Socket.IO for additional features like auto-reconnection and fallbacks.",
    code: `const ws = new WebSocket('wss://example.com/socket');
ws.onopen = () => ws.send('Hello');
ws.onmessage = (event) => console.log(event.data);
ws.onclose = () => console.log('Disconnected');
// Server would use ws library or similar`,
  },
  {
    id: "concept-performance-optimization",
    type: "concept",
    topic: "Performance",
    title: "Performance Optimization Techniques",
    prompt: "What are key techniques for optimizing JavaScript performance?",
    expected:
      "Minimize DOM manipulation, use debouncing/throttling, lazy load resources, optimize rendering (avoid layout thrashing), and leverage browser caching.",
    keywords: ["optimization", "performance", "rendering"],
    explanation:
      "JavaScript performance optimization involves multiple strategies: 1) Minimize DOM access by batching reads/writes and using document fragments. 2) Use debouncing/throttling for event handlers (scroll, resize, input). 3) Lazy load images, scripts, and components to reduce initial payload. 4) Avoid layout thrashing by batching style reads before writes. 5) Use Web Workers for heavy computations. 6) Optimize images, use code splitting, and leverage browser caching. 7) Reduce reflows by using CSS transforms and opacity for animations. 8) Use requestAnimationFrame for smooth animations. 9) Profile and identify bottlenecks using DevTools. 10) Avoid memory leaks by cleaning up event listeners and timers. Performance optimization is an ongoing process focused on user experience, especially on mobile devices and slow networks.",
    code: `// Batch DOM updates
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // single reflow

// Avoid layout thrashing
const elements = document.querySelectorAll('.box');
// Read all widths first
const widths = Array.from(elements).map(el => el.offsetWidth);
// Then write
widths.forEach((width, i) => {
  elements[i].style.width = width + 10 + 'px';
});`,
  },
  {
    id: "concept-jsonp-vs-cors",
    type: "concept",
    topic: "Network",
    title: "JSONP vs CORS",
    prompt: "What is JSONP and how does it compare to CORS?",
    expected:
      "JSONP is a legacy technique using <script> tags to bypass CORS, limited to GET requests. CORS is the modern, secure standard.",
    keywords: ["jsonp", "cors", "cross-origin"],
    explanation:
      "JSONP (JSON with Padding) was an early workaround for cross-origin requests before CORS existed. It works by dynamically adding a <script> tag to the page, which loads a JavaScript file from another origin. The server wraps JSON data in a callback function defined by the client. However, JSONP only supports GET requests, has security risks (executing arbitrary code), and lacks error handling. CORS is the modern, secure standard that supports all HTTP methods, works with XHR/Fetch, and provides fine-grained control via HTTP headers. JSONP is now obsolete; CORS should be used for all cross-origin requests. If you need legacy support, consider a server proxy instead of JSONP.",
    code: `// JSONP example (deprecated)
function handleData(data) { console.log(data); }
const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleData';
document.body.appendChild(script);
// Server response: handleData({...})
// Modern CORS with fetch
fetch('https://api.example.com/data', {
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' }
}).then(res => res.json());`,
  }, // React & JSX concept questions
  {
    id: "react-jsx",
    type: "concept",
    topic: "React/JSX",
    title: "What is JSX?",
    prompt: "Explain JSX and how it differs from HTML.",
    expected:
      "JSX is a syntax extension that allows writing HTML-like markup inside JavaScript, which gets transpiled to React.createElement calls.",
    keywords: ["jsx", "syntax", "react"],
    explanation:
      "JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML but is actually transformed into JavaScript objects (React elements) by tools like Babel. Unlike HTML, JSX allows embedding JavaScript expressions inside curly braces, uses camelCase for attributes (e.g., className instead of class), and requires self-closing tags. It enforces that all tags are properly closed. JSX is not required to use React, but it's the preferred way to describe UI because it's more readable and declarative. Under the hood, JSX compiles to React.createElement calls, creating a tree of React elements.",
    code: `// JSX
const element = <h1 className="greeting">Hello, {name}!</h1>;
// Compiled to:
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, ', name, '!');`,
  },
  {
    id: "react-virtual-dom",
    type: "concept",
    topic: "React",
    title: "Virtual DOM and Reconciliation",
    prompt: "What is the Virtual DOM and how does reconciliation work?",
    expected:
      "The Virtual DOM is an in-memory representation of the real DOM. Reconciliation is the algorithm that updates the real DOM by comparing previous and current virtual DOM trees and applying only the necessary changes.",
    keywords: ["virtual dom", "reconciliation", "diffing"],
    explanation:
      "The Virtual DOM is a lightweight JavaScript object tree that mirrors the actual DOM. When state changes, React creates a new Virtual DOM tree and compares it with the previous one using a diffing algorithm. This process, called reconciliation, identifies the minimal set of changes needed to update the real DOM. The key optimizations include: comparing element types (different types = rebuild tree), using keys for list items, and batching updates. This approach improves performance by reducing expensive DOM manipulations and allows React to manage updates predictably.",
    code: `// Without virtual DOM: manual DOM updates are slow
document.getElementById('app').innerHTML = '<div>New content</div>';
// React handles it efficiently:
function App({ count }) {
  return <div>{count}</div>;
}
// Only the changed text node is updated, not the whole div.`,
  },
  {
    id: "react-hooks",
    type: "concept",
    topic: "React",
    title: "React Hooks",
    prompt: "What are React Hooks and why were they introduced?",
    expected:
      "Hooks allow using state and other React features in functional components, enabling better code reuse and composition without classes.",
    keywords: ["hooks", "useState", "useEffect", "functional components"],
    explanation:
      "Hooks are functions that let you 'hook into' React state and lifecycle features from functional components. Introduced in React 16.8, they solved several class component issues: complex components became hard to split, logic reuse was cumbersome (HOCs/render props), and classes introduced confusion around 'this' binding. Core hooks: useState for local state, useEffect for side effects (replacing lifecycle methods), useContext for consuming context, and custom hooks for reusable logic. Hooks follow rules: only call at top level (not inside loops/conditions) and only in React functions. They enable simpler, more predictable code and easier testing.",
    code: `import React, { useState, useEffect } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}`,
  },
  {
    id: "react-props-vs-state",
    type: "concept",
    topic: "React",
    title: "Props vs State",
    prompt: "What is the difference between props and state in React?",
    expected:
      "Props are read-only data passed from parent to child. State is internal, mutable data managed within a component.",
    keywords: ["props", "state", "immutable"],
    explanation:
      "Props (short for properties) are read-only values passed to a component from its parent. They cannot be modified by the receiving component. State is private data managed within a component using the useState hook (or this.state in classes) that can change over time, triggering re-renders. Changes to state cause the component to re-render; changes to props from the parent also cause a re-render. State should be used for data that changes based on user interaction or asynchronous operations. Props are used for configuration and data flow from parent to child. Both are plain JavaScript objects but serve different purposes in React's unidirectional data flow.",
    code: `// Parent passes props
function Parent() {
  const [user, setUser] = useState('John');
  return <Child name={user} />;
}
// Child receives props (read-only)
function Child({ name }) {
  // name cannot be reassigned
  return <div>Hello, {name}</div>;
}`,
  },
  {
    id: "react-keys",
    type: "concept",
    topic: "React",
    title: "Keys in React Lists",
    prompt: "Why do we need keys when rendering lists in React?",
    expected:
      "Keys help React identify which items have changed, been added, or removed, enabling efficient re-renders and preserving component state.",
    keywords: ["key", "list", "reconciliation"],
    explanation:
      "Keys are special string attributes that give each element in a list a stable identity. During reconciliation, React uses keys to match items between the old and new tree. Without keys, React may reorder or re-mount components unnecessarily, causing performance issues and state loss. Keys should be unique among siblings (not globally) and stable (not based on index if the list can reorder). Using array index as a key is a common anti-pattern when the list can change order, because it can lead to bugs with component state. A stable ID from the data is the best practice.",
    code: `// Good: stable unique IDs
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
// Bad: using index (can cause bugs if order changes)
{todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}`,
  },
  {
    id: "react-controlled-uncontrolled",
    type: "concept",
    topic: "React",
    title: "Controlled vs Uncontrolled Components",
    prompt:
      "What is the difference between controlled and uncontrolled components in React forms?",
    expected:
      "Controlled components have form data handled by React state; uncontrolled components use the DOM to manage their own state, accessed via refs.",
    keywords: ["controlled", "uncontrolled", "forms", "refs"],
    explanation:
      "In controlled components, form input values are controlled by React state: the input's value is set from state and changes are handled via onChange. This gives full control over the input and makes it easier to validate or format data. Uncontrolled components let the DOM handle the input's internal state; you access the current value using a ref when needed (e.g., on submit). Uncontrolled components can be simpler for non-interactive forms but lose React's centralized control. Use controlled for most forms; use uncontrolled when integrating with non-React code or when you don't need real-time validation. React recommends controlled components for consistency and predictability.",
    code: `// Controlled
function Controlled() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
// Uncontrolled
function Uncontrolled() {
  const inputRef = useRef();
  const handleSubmit = () => alert(inputRef.current.value);
  return <input ref={inputRef} defaultValue="" />;
}`,
  },
  {
    id: "react-useEffect-vs-useLayoutEffect",
    type: "concept",
    topic: "React",
    title: "useEffect vs useLayoutEffect",
    prompt: "What is the difference between useEffect and useLayoutEffect?",
    expected:
      "useEffect runs asynchronously after paint, while useLayoutEffect runs synchronously before paint, allowing DOM measurements and preventing flicker.",
    keywords: ["useEffect", "useLayoutEffect", "side effects", "paint"],
    explanation:
      "Both hooks run after the DOM is updated, but the timing differs. useEffect runs after the browser has painted, making it non-blocking and ideal for most side effects (data fetching, subscriptions). useLayoutEffect runs synchronously immediately after React calculates DOM mutations but before the browser paints, allowing you to read layout (e.g., element dimensions) and make synchronous updates before the user sees the result. Use useLayoutEffect when you need to measure DOM elements or avoid flicker due to visual updates. However, it can block painting, so use it sparingly. For SSR, useLayoutEffect warns and falls back to useEffect.",
    code: `useLayoutEffect(() => {
  // Measure element height before paint
  const height = elementRef.current.offsetHeight;
  // Update state synchronously to avoid layout shift
  setHeight(height);
}, []);
// useEffect would cause a flicker because the browser paints first`,
  },
  {
    id: "react-context",
    type: "concept",
    topic: "React",
    title: "React Context API",
    prompt: "What is the Context API and when should you use it?",
    expected:
      "Context provides a way to pass data through the component tree without prop drilling, useful for global state like themes, auth, or localization.",
    keywords: ["context", "prop drilling", "global state"],
    explanation:
      "Context is a built-in React API that allows sharing values across the component tree without explicitly passing props through every level. It consists of a Provider component (that supplies the value) and a Consumer (or useContext hook) that consumes it. Context is ideal for data that is needed by many components at different nesting levels, such as theme, user authentication, language preferences, or current user. However, it's not a complete state management solution; overusing context can lead to re-rendering issues. For complex state logic, consider combining with useReducer or using dedicated state management libraries like Redux.",
    code: `const ThemeContext = React.createContext('light');
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}`,
  },
  {
    id: "react-memo",
    type: "concept",
    topic: "React",
    title: "React.memo, useMemo, and useCallback",
    prompt:
      "Explain the differences between React.memo, useMemo, and useCallback.",
    expected:
      "React.memo prevents re-renders of functional components; useMemo caches computed values; useCallback caches function references to prevent unnecessary child re-renders.",
    keywords: ["memo", "usememo", "usecallback", "optimization"],
    explanation:
      "React.memo is a higher-order component that memoizes a component, preventing re-renders if props haven't changed (shallow comparison). useMemo memoizes the result of a function, recomputing only when dependencies change, useful for expensive calculations. useCallback returns a memoized callback function, preserving its identity across renders, preventing child components that rely on referential equality from re-rendering unnecessarily. Both useMemo and useCallback accept a dependency array. They should be used for performance optimization, not as a guarantee. Overusing them can be counterproductive; apply only when you notice performance issues or when passing callbacks to memoized children.",
    code: `const MemoizedComponent = React.memo(MyComponent);
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const handleClick = useCallback(() => doSomething(a), [a]);`,
  },
  {
    id: "react-fragments",
    type: "concept",
    topic: "React",
    title: "React Fragments",
    prompt: "What are React Fragments and why are they useful?",
    expected:
      "Fragments allow grouping multiple elements without adding extra DOM nodes, avoiding unnecessary wrapper elements.",
    keywords: ["fragment", "grouping", "dom"],
    explanation:
      "Fragments let you return multiple elements from a component without introducing an extra container element (like a div). This helps keep the DOM structure clean, prevents layout issues (e.g., with flex/grid), and avoids invalid HTML (e.g., adding a div inside a <p> or table). Fragments can be written as <React.Fragment> or the shorthand <> </>. They can also accept a key attribute when used in lists. Fragments are lightweight and don't affect CSS or JavaScript selectors. Using fragments is a best practice to keep the component tree semantic and efficient.",
    code: `function Table() {
  return (
    <table>
      <tbody>
        <tr>
          <Columns />
        </tr>
      </tbody>
    </table>
  );
}
function Columns() {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
}`,
  },
  {
    id: "react-ssr-vs-csr",
    type: "concept",
    topic: "React",
    title: "Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)",
    prompt:
      "What is the difference between server-side rendering and client-side rendering in React?",
    expected:
      "CSR renders UI in the browser, SSR renders HTML on the server and sends it to the client for better SEO and initial load speed.",
    keywords: ["ssr", "csr", "rendering", "performance"],
    explanation:
      "Client-side rendering (CSR) sends a minimal HTML shell to the browser, then JavaScript loads and renders the UI. This can lead to slower initial content visibility (FCP) and hurts SEO because crawlers may not execute JS. Server-side rendering (SSR) renders the React component tree to HTML on the server and sends the fully formed page, improving initial load time and SEO. After hydration, the page becomes interactive. SSR frameworks like Next.js combine both: initial page is SSR, subsequent navigation is CSR. SSR is ideal for content-heavy sites (blogs, e-commerce) and SEO-critical pages, while CSR is fine for dashboards, internal tools, or apps behind authentication.",
    code: `// SSR with Next.js (pages/index.js)
export default function Home({ data }) {
  return <div>{data}</div>;
}
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
// CSR: React app served as static files, data fetched on client.`,
  },
  {
    id: "react-lifting-state",
    type: "concept",
    topic: "React",
    title: "Lifting State Up",
    prompt: "What does 'lifting state up' mean in React?",
    expected:
      "Lifting state up means moving shared state to the closest common ancestor of components that need it, enabling data flow via props.",
    keywords: ["lifting state", "shared state", "data flow"],
    explanation:
      "When multiple components need to share or react to the same state, you should move that state to their closest common parent. The parent manages the state and passes it down via props, along with functions to update it. This centralizes state management, keeps components in sync, and maintains React's unidirectional data flow. Lifting state up avoids the need for complex patterns like callback hell and makes the application easier to debug and understand. It's a fundamental pattern for React development.",
    code: `function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <ChildInput value={value} onChange={setValue} />
      <ChildDisplay value={value} />
    </>
  );
}
function ChildInput({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
function ChildDisplay({ value }) {
  return <div>{value}</div>;
}`,
  },
  {
    id: "react-synthetic-events",
    type: "concept",
    topic: "React",
    title: "Synthetic Events",
    prompt: "What are synthetic events in React?",
    expected:
      "Synthetic events are a cross-browser wrapper around native events that provide consistent API and performance optimizations.",
    keywords: ["synthetic event", "event pooling", "cross-browser"],
    explanation:
      "React's SyntheticEvent is a wrapper around the browser's native event that normalizes event behavior across different browsers, ensuring a consistent API. It also implements event pooling to reuse event objects, improving performance by nullifying properties after the event handler finishes. This pooling means you cannot access the event asynchronously unless you call event.persist(). Synthetic events bubble through the React tree, not the DOM tree, and provide additional properties like `nativeEvent`. Understanding synthetic events is important for handling events in React, especially when dealing with asynchronous code or performance-sensitive applications.",
    code: `function handleClick(event) {
  console.log(event.type); // 'click' – consistent
  // event.persist(); // needed for async access
  setTimeout(() => {
    // Without persist, event is nullified
    console.log(event.type);
  }, 0);
}
<button onClick={handleClick}>Click</button>`,
  },
  {
    id: "react-higher-order-components",
    type: "concept",
    topic: "React",
    title: "Higher-Order Components (HOCs)",
    prompt: "What is a higher-order component (HOC) and when would you use it?",
    expected:
      "An HOC is a function that takes a component and returns an enhanced component, used for cross-cutting concerns like authentication, logging, or data fetching.",
    keywords: ["hoc", "higher-order component", "reuse"],
    explanation:
      "A higher-order component (HOC) is a pattern where a function takes a component and returns a new component with additional props or behavior. It's a way to reuse component logic without inheritance. Common uses: adding authentication checks, injecting data, tracking analytics, or applying styles. HOCs are pure functions and don't mutate the wrapped component. However, with the introduction of hooks, many HOC use cases are now replaced with custom hooks, which are simpler and avoid issues like prop name collisions and wrapper hell. Still, HOCs are used in libraries like React Redux (connect) and React Router (withRouter).",
    code: `function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) return <Redirect to="/login" />;
    return <WrappedComponent {...props} />;
  };
}
const ProtectedDashboard = withAuth(Dashboard);`,
  },
  {
    id: "react-render-props",
    type: "concept",
    topic: "React",
    title: "Render Props",
    prompt: "What is the render props pattern?",
    expected:
      "Render props is a pattern where a component accepts a function as a prop that returns React elements, enabling code reuse and sharing logic.",
    keywords: ["render props", "code reuse", "function as child"],
    explanation:
      "The render props pattern involves passing a function (often named `render`) as a prop to a component. This function is called with some internal data, and returns JSX to be rendered. It allows components to share logic while letting the consumer control the rendering. This pattern predates hooks and was used for cross-cutting concerns like mouse tracking, data fetching, or state sharing. While powerful, it can lead to nested callbacks. Hooks have largely replaced render props and HOCs for many use cases, but the pattern is still useful in some scenarios, especially in libraries.",
    code: `class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };
  handleMouseMove = (e) => this.setState({ x: e.clientX, y: e.clientY });
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}
// Usage
<MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />`,
  },
  {
    id: "react-strict-mode",
    type: "concept",
    topic: "React",
    title: "React Strict Mode",
    prompt: "What is React Strict Mode and what does it do?",
    expected:
      "Strict Mode is a tool for highlighting potential problems in an application, performing additional checks and warnings during development.",
    keywords: ["strict mode", "development", "warnings"],
    explanation:
      "React Strict Mode is a wrapper component that activates additional checks and warnings for its descendants in development builds. It does not affect the production build. It helps identify unsafe lifecycle methods, legacy string refs, unexpected side effects (by double-invoking certain functions), and deprecated APIs. It also warns about the use of findDOMNode, and ensures that components are resilient to future React features like concurrent rendering. Wrapping your root component with <React.StrictMode> is recommended to catch potential issues early. It doesn't render any visible UI and can be applied to part of the tree.",
    code: `function App() {
  return (
    <React.StrictMode>
      <MyComponent />
    </React.StrictMode>
  );
}
// In development, useEffect may run twice to detect side effects`,
  },
  {
    id: "react-error-boundaries",
    type: "concept",
    topic: "React",
    title: "Error Boundaries",
    prompt: "What are error boundaries in React?",
    expected:
      "Error boundaries are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.",
    keywords: ["error boundary", "error handling", "fallback"],
    explanation:
      "Error boundaries are class components that implement either `static getDerivedStateFromError()` or `componentDidCatch()`. They catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them. They do not catch errors in event handlers (use try/catch there) or asynchronous code. Error boundaries help prevent the entire app from unmounting due to a UI error, allowing you to show a graceful fallback. With hooks, you can use the `react-error-boundary` library for a functional approach. Error boundaries are essential for robust applications.",
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`,
  },
  {
    id: "react-portals",
    type: "concept",
    topic: "React",
    title: "Portals",
    prompt: "What are portals in React and when would you use them?",
    expected:
      "Portals allow rendering children into a DOM node outside the parent component's hierarchy, useful for modals, tooltips, and dropdowns.",
    keywords: ["portal", "dom node", "modals"],
    explanation:
      "React portals provide a way to render a component's children into a DOM node that exists outside the parent component's DOM hierarchy, while still maintaining React's event bubbling and context. They are created with `ReactDOM.createPortal(child, container)`. Portals are essential for UI elements that need to break out of the normal document flow, such as modals, tooltips, dropdowns, and toasts. Using portals ensures proper stacking context, overflow handling, and accessibility. Portals also preserve event bubbling: events fired from inside a portal will propagate to ancestors in the React tree, even if those ancestors are not DOM ancestors.",
    code: `import { createPortal } from 'react-dom';
function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,
    document.body // render outside the React root
  );
}
function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Open Modal</button>
      {show && <Modal onClose={() => setShow(false)}>Content</Modal>}
    </div>
  );
}`,
  },
  {
    id: "nextjs-app-router",
    type: "concept",
    topic: "Next.js",
    title: "App Router vs Pages Router",
    prompt:
      "What are the differences between the App Router and the Pages Router in Next.js?",
    expected:
      "App Router is the newer routing system based on React Server Components, offering nested layouts, parallel routes, and improved data fetching, while Pages Router uses file-based routing with pages/ directory.",
    keywords: ["app router", "pages router", "routing"],
    explanation:
      "Next.js introduced the App Router in version 13 as a new way to build applications using React Server Components, nested layouts, and improved data fetching patterns. The Pages Router (the traditional approach) uses a pages/ directory where each file maps to a route. App Router uses an app/ directory with conventions like layout.js, page.js, loading.js, and error.js. It supports nested layouts, parallel routes, and intercepting routes. Data fetching is simplified with async components and fetch caching. While both can coexist, App Router is the recommended path forward, offering better performance, easier code organization, and more powerful features.",
    code: `// Pages Router (pages/index.js)
export default function Home() { return <div>Home</div>; }

// App Router (app/page.js)
export default function Home() { return <div>Home</div>; }
// With layout (app/layout.js)
export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}`,
  },
  {
    id: "nextjs-server-components",
    type: "concept",
    topic: "Next.js",
    title: "Server Components vs Client Components",
    prompt:
      "Explain the difference between Server Components and Client Components in Next.js App Router.",
    expected:
      "Server Components render on the server, have no client-side JavaScript, and can directly access backend resources; Client Components render on the client, include interactivity and browser APIs, and are marked with 'use client'.",
    keywords: ["server components", "client components", "use client"],
    explanation:
      "React Server Components (RSC) are a new paradigm where components run exclusively on the server, reducing client bundle size and enabling direct database/file access. They cannot use hooks (useState, useEffect) or browser APIs. Client Components are traditional components that run on the client and are marked with 'use client'. They hydrate and can use interactivity. Next.js App Router defaults to Server Components, and you opt into client components with the 'use client' directive. This separation allows for better performance: server components handle data fetching and static rendering, while client components add interactivity only where needed.",
    code: `// Server Component (default, no directive)
async function ServerComponent() {
  const data = await db.query('SELECT * FROM users');
  return <div>{data.map(...)}</div>;
}
// Client Component
'use client';
import { useState } from 'react';
function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count+1)}>{count}</button>;
}`,
  },
  {
    id: "nextjs-data-fetching",
    type: "concept",
    topic: "Next.js",
    title: "Data Fetching in Next.js",
    prompt:
      "What are the different data fetching methods in Next.js (SSR, SSG, ISR)?",
    expected:
      "SSR (Server-Side Rendering) fetches data on each request; SSG (Static Site Generation) fetches at build time; ISR (Incremental Static Regeneration) updates static pages after build.",
    keywords: ["ssr", "ssg", "isr", "data fetching"],
    explanation:
      "Next.js provides multiple rendering strategies: Server-Side Rendering (SSR) with getServerSideProps fetches data per request, ideal for dynamic content. Static Site Generation (SSG) with getStaticProps fetches at build time, serving cached HTML for speed and SEO. Incremental Static Regeneration (ISR) extends SSG by allowing pages to be regenerated at runtime after a set interval. In App Router, these are replaced by fetch caching, static/dynamic segment config, and revalidate options. Choose SSR for user-specific content, SSG for content that rarely changes, and ISR for a balance of static speed with occasional updates.",
    code: `// Pages Router
export async function getStaticProps() { // SSG
  const data = await fetchData();
  return { props: { data }, revalidate: 60 }; // ISR
}
export async function getServerSideProps() { // SSR
  const data = await fetchData();
  return { props: { data } };
}
// App Router
export default async function Page() {
  const data = await fetch('https://api.example.com', { next: { revalidate: 60 } });
  return <div>{data}</div>;
}`,
  },
  {
    id: "nextjs-routing",
    type: "concept",
    topic: "Next.js",
    title: "File-based Routing",
    prompt: "How does routing work in Next.js?",
    expected:
      "Next.js uses file-system based routing where files in the pages/ or app/ directory become routes, with special files for dynamic segments and layouts.",
    keywords: ["routing", "file-based", "dynamic routes"],
    explanation:
      "Next.js routing is based on the file structure. In the Pages Router, a file pages/about.js creates the /about route. Dynamic routes use brackets: [id].js. In App Router, the folder structure defines routes, with page.js as the route endpoint. App Router supports nested layouts, loading states (loading.js), error boundaries (error.js), and parallel routes. Both systems support catch-all routes ([...slug]) and optional catch-all ([[...slug]]). Navigation is done with Link component or useRouter hook. The file-based routing simplifies development by reducing configuration and encouraging a predictable structure.",
    code: `// Pages Router
// pages/about.js -> /about
// pages/posts/[id].js -> /posts/1
// pages/[...slug].js -> /a/b/c

// App Router
// app/about/page.js -> /about
// app/posts/[id]/page.js -> /posts/1
// app/layout.js -> root layout
// app/posts/layout.js -> nested layout`,
  },
  {
    id: "nextjs-middleware",
    type: "concept",
    topic: "Next.js",
    title: "Next.js Middleware",
    prompt: "What is middleware in Next.js and what can it do?",
    expected:
      "Middleware runs before requests complete, enabling authentication checks, redirects, rewrites, and modifying response headers.",
    keywords: ["middleware", "request", "edge"],
    explanation:
      "Middleware in Next.js is code that executes before a request is completed, running at the Edge for low latency. It can be used for authentication, redirecting users based on session, rewriting URLs for A/B testing, adding headers, or implementing geolocation-based routing. Middleware is defined in a middleware.js (or .ts) file at the root of the project. It runs on all routes by default but can be configured with matchers. Middleware uses the Edge Runtime and has access to the request object, allowing powerful modifications before the page is rendered.",
    code: `// middleware.js
import { NextResponse } from 'next/server';
export function middleware(request) {
  const token = request.cookies.get('token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*'] };`,
  },
  {
    id: "nextjs-image",
    type: "concept",
    topic: "Next.js",
    title: "next/image Optimization",
    prompt: "What does next/image do and why is it beneficial?",
    expected:
      "next/image is an optimized Image component that automatically optimizes images with lazy loading, responsive sizing, and modern formats like WebP.",
    keywords: ["image", "optimization", "next/image"],
    explanation:
      "The Next.js Image component (next/image) extends the HTML <img> element with automatic image optimization. It lazy loads images, serves them in modern formats (WebP/AVIF) based on browser support, resizes images on-demand, and prevents layout shift by requiring width/height. It also supports remote images with domains configuration, placeholder blur effects, and priority loading for above-the-fold images. Using next/image improves Core Web Vitals, particularly Largest Contentful Paint (LCP), and reduces bandwidth usage. It's a drop-in replacement that significantly improves performance with minimal effort.",
    code: `import Image from 'next/image';
export default function Page() {
  return (
    <Image
      src="/hero.png"
      width={1200}
      height={800}
      alt="Hero"
      priority // for LCP images
      placeholder="blur"
      blurDataURL="data:image/jpeg..."
    />
  );
}`,
  },
  {
    id: "nextjs-api-routes",
    type: "concept",
    topic: "Next.js",
    title: "API Routes / Route Handlers",
    prompt: "How do you create API endpoints in Next.js?",
    expected:
      "API Routes (Pages Router) are created in pages/api/; Route Handlers (App Router) are defined in route.js files, allowing backend functionality within the same project.",
    keywords: ["api routes", "route handlers", "backend"],
    explanation:
      "Next.js allows building API endpoints alongside your frontend. In Pages Router, you place files in pages/api/; each file exports a function that handles requests. In App Router, you define route.js files in the app directory (e.g., app/api/hello/route.js). Route handlers support HTTP methods (GET, POST, etc.) and can use middleware, cookies, and edge runtime. API routes enable building full-stack applications with a single codebase, eliminating the need for a separate backend for many use cases. They are server-side only and not included in client bundles.",
    code: `// Pages Router (pages/api/hello.js)
export default function handler(req, res) {
  res.status(200).json({ name: 'John' });
}
// App Router (app/api/hello/route.js)
export async function GET(request) {
  return Response.json({ name: 'John' });
}
export async function POST(request) {
  const data = await request.json();
  // process data
  return Response.json({ success: true });
}`,
  },
  {
    id: "nextjs-caching",
    type: "concept",
    topic: "Next.js",
    title: "Next.js Caching",
    prompt: "How does caching work in Next.js?",
    expected:
      "Next.js has multiple caching layers: Data Cache (persists fetch results), Full Route Cache (stores rendered pages), Router Cache (client-side navigation), and Request Memoization (dedupes fetch calls).",
    keywords: ["caching", "data cache", "router cache"],
    explanation:
      "Next.js implements several caching strategies to optimize performance. The Data Cache persists the results of fetch requests across deployments, controllable with options like 'force-cache' (default) or 'no-store'. The Full Route Cache caches the output of static routes at build time. The Router Cache stores route segments on the client for instant navigation. Request Memoization deduplicates identical fetch calls within a render pass. In App Router, you can configure cache behavior with fetch options, segment config (export const dynamic = 'force-dynamic'), and revalidate intervals. Understanding these layers helps balance performance with data freshness.",
    code: `// Data Cache – fetch with revalidation
fetch('https://api.example.com', { next: { revalidate: 3600 } });
// Force dynamic rendering (disable cache)
export const dynamic = 'force-dynamic';
// Router Cache: prefetch with Link prefetch prop
<Link href="/about" prefetch={false}>About</Link>`,
  },
  {
    id: "nextjs-dynamic-routes",
    type: "concept",
    topic: "Next.js",
    title: "Dynamic Routes",
    prompt: "How do you create dynamic routes in Next.js?",
    expected:
      "Dynamic routes use brackets in file/folder names to capture URL parameters, accessible via useRouter or params prop.",
    keywords: ["dynamic routes", "params", "catch-all"],
    explanation:
      "Dynamic routes allow matching URL patterns to generate pages based on parameters. In Pages Router, use [param].js for a single parameter or [...slug].js for catch-all. In App Router, create folders with brackets: [id]/page.js. Access parameters via the params prop in server components or use useRouter in client components. Optional catch-all routes use [[...slug]]. Dynamic routes are commonly used for blog posts, product pages, and user profiles. They work with getStaticPaths for static generation or be server-rendered.",
    code: `// App Router: app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>;
}
// Generate static paths for SSG
export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map(post => ({ slug: post.slug }));
}
// Catch-all: app/docs/[...slug]/page.js
export default function Docs({ params }) {
  return <div>Slug: {params.slug.join('/')}</div>;
}`,
  },
  {
    id: "nextjs-deployment",
    type: "concept",
    topic: "Next.js",
    title: "Next.js Deployment and Optimization",
    prompt:
      "What are the key considerations for deploying a Next.js application?",
    expected:
      "Consider output target (standalone vs server), environment variables, image domains configuration, and choosing the right platform (Vercel, self-hosted, etc.)",
    keywords: ["deployment", "optimization", "vercel"],
    explanation:
      "Deploying Next.js involves several optimizations. The output can be standalone (output: 'standalone') for smaller deployments, or standard. Environment variables need to be properly set (public ones with NEXT_PUBLIC prefix). Image optimization requires configuring remotePatterns for external images. For self-hosting, you need Node.js server setup. Vercel provides the smoothest experience with automatic optimizations, preview deployments, and built-in analytics. Key optimizations: enable compression, set caching headers for static assets, use middleware for edge functions, and implement ISR for dynamic static content. Monitoring Core Web Vitals and implementing proper error boundaries are also crucial.",
    code: `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // reduce size for self-hosting
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com' },
    ],
  },
  compress: true,
  swcMinify: true,
};
module.exports = nextConfig;`,
  },
  {
    id: "typescript-basics",
    type: "concept",
    topic: "TypeScript",
    title: "TypeScript Basics",
    prompt:
      "What are the key benefits of using TypeScript over plain JavaScript?",
    expected:
      "TypeScript adds static typing, enhances IDE support, catches errors at compile time, and improves code maintainability.",
    keywords: ["typescript", "static typing", "type safety"],
    explanation:
      "TypeScript is a superset of JavaScript that adds optional static typing. Benefits include: early error detection during development, better IDE autocompletion and refactoring, self-documenting code through explicit types, improved team collaboration through interfaces, and seamless integration with modern JavaScript features. TypeScript compiles to plain JavaScript, so it works anywhere JS runs. It supports features like unions, generics, and type guards that help write more robust code. For large applications, TypeScript reduces runtime bugs and makes refactoring safer. It's widely adopted in enterprise and open-source projects.",
    code: `// JavaScript (potential runtime error)
function add(a, b) { return a + b; }
add(5, '10'); // '510' – unexpected

// TypeScript – catches at compile time
function add(a: number, b: number): number {
  return a + b;
}
add(5, '10'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'`,
  },
  {
    id: "redux-toolkit",
    type: "concept",
    topic: "State Management",
    title: "Redux Toolkit",
    prompt: "What is Redux Toolkit and why is it recommended over plain Redux?",
    expected:
      "Redux Toolkit simplifies Redux setup with utilities like configureStore, createSlice, and createAsyncThunk, reducing boilerplate and promoting best practices.",
    keywords: ["redux", "redux toolkit", "state management"],
    explanation:
      "Redux Toolkit (RTK) is the official, opinionated toolset for efficient Redux development. It addresses common Redux pain points: complex store configuration, excessive boilerplate, and the need for additional packages (like Immer, Redux Thunk). RTK includes configureStore (which sets up the store with good defaults), createSlice (which generates actions and reducers together), and createAsyncThunk (for async logic). It uses Immer internally, allowing mutable-like code that produces immutable updates. RTK also includes the RTK Query data fetching layer. It's now the standard way to write Redux applications, reducing code by 70% or more while enforcing best practices.",
    code: `// Without RTK (plain Redux)
const ADD_TODO = 'ADD_TODO';
const addTodo = text => ({ type: ADD_TODO, payload: text });
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO: return [...state, { text: action.payload }];
    default: return state;
  }
};
// With RTK
import { createSlice, configureStore } from '@reduxjs/toolkit';
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => { state.push({ text: action.payload }); }
  }
});
export const { addTodo } = todosSlice.actions;
const store = configureStore({ reducer: todosSlice.reducer });`,
  },
  {
    id: "graphql-basics",
    type: "concept",
    topic: "API",
    title: "GraphQL",
    prompt: "What is GraphQL and how does it differ from REST?",
    expected:
      "GraphQL is a query language that allows clients to request exactly the data they need in a single request, unlike REST which uses multiple endpoints and returns fixed structures.",
    keywords: ["graphql", "rest", "api"],
    explanation:
      "GraphQL is a query language and runtime for APIs that enables clients to specify exactly what data they need. Key advantages over REST: single endpoint (vs multiple), eliminates over/under-fetching, strongly typed schema, real-time updates via subscriptions, and introspection for documentation. GraphQL allows fetching related resources in one request, reducing round trips. It's language-agnostic and supported by many clients (Apollo, Relay). Downsides include complexity for simple APIs, potential performance issues with deep queries, and caching challenges compared to REST's HTTP caching. GraphQL is ideal for applications with complex data relationships and evolving requirements.",
    code: `// REST: multiple endpoints or overfetching
GET /users/123
GET /users/123/posts
// GraphQL: one query, exactly what you need
query {
  user(id: 123) {
    name
    posts {
      title
    }
  }
}
// Response matches query shape
{
  "data": {
    "user": { "name": "John", "posts": [{ "title": "Hello" }] }
  }
}`,
  },
  {
    id: "web-vitals",
    type: "concept",
    topic: "Performance",
    title: "Core Web Vitals",
    prompt: "What are Core Web Vitals and why are they important?",
    expected:
      "Core Web Vitals are metrics that measure user experience: Largest Contentful Paint (loading), First Input Delay (interactivity), and Cumulative Layout Shift (visual stability).",
    keywords: ["web vitals", "lcp", "fid", "cls", "performance"],
    explanation:
      "Core Web Vitals are a set of user-centric metrics defined by Google to measure real-world user experience. LCP (Largest Contentful Paint) measures perceived load speed – should be under 2.5 seconds. FID (First Input Delay) measures interactivity – under 100 milliseconds. CLS (Cumulative Layout Shift) measures visual stability – under 0.1. These metrics impact SEO ranking and user engagement. Tools like Lighthouse, PageSpeed Insights, and the web-vitals library help measure them. Improving these metrics involves optimizing images, reducing JavaScript execution, and ensuring elements have reserved space to prevent layout shifts.",
    code: `// Measure using web-vitals library
import { getLCP, getFID, getCLS } from 'web-vitals';
function sendToAnalytics(metric) {
  console.log(metric.name, metric.value);
}
getLCP(sendToAnalytics);
getFID(sendToAnalytics);
getCLS(sendToAnalytics);
// Next.js built-in reporting
export function reportWebVitals(metric) {
  console.log(metric);
}`,
  },
  {
    id: "accessibility-a11y",
    type: "concept",
    topic: "Accessibility",
    title: "Web Accessibility (a11y)",
    prompt:
      "What are key principles of web accessibility and how do you implement them?",
    expected:
      "Accessibility ensures that websites work for all users, including those with disabilities, through semantic HTML, ARIA labels, keyboard navigation, and proper color contrast.",
    keywords: ["accessibility", "a11y", "aria", "semantic html"],
    explanation:
      "Web accessibility (a11y) ensures that people with disabilities can perceive, understand, navigate, and interact with the web. Key principles (POUR): Perceivable (text alternatives, captions), Operable (keyboard accessible, enough time), Understandable (predictable, input assistance), Robust (compatible with assistive tech). Implement by using semantic HTML (<button> instead of div), providing alt text for images, managing focus for modals, using ARIA labels when needed, ensuring sufficient color contrast, and testing with screen readers. Tools like axe, Lighthouse, and manual keyboard testing help verify accessibility. Accessibility improves SEO and overall usability for everyone.",
    code: `// Bad: non-semantic, missing labels
<div onClick={handleClick}>Submit</div>
<img src="icon.png" />

// Good: semantic, accessible
<button onClick={handleClick}>Submit</button>
<img src="icon.png" alt="Settings icon" aria-label="Settings" />
// Manage focus in modal
useEffect(() => {
  const modal = document.getElementById('modal');
  modal?.focus();
  return () => modal?.blur();
}, []);`,
  },
  {
    id: "testing-jest-rtl",
    type: "concept",
    topic: "Testing",
    title: "Jest & React Testing Library",
    prompt:
      "What is the purpose of Jest and React Testing Library, and how do they complement each other?",
    expected:
      "Jest is a test runner; React Testing Library provides utilities to test components from a user perspective, encouraging tests that resemble how the app is used.",
    keywords: ["jest", "react testing library", "testing"],
    explanation:
      "Jest is a JavaScript testing framework with a test runner, assertions, mocking, and code coverage. React Testing Library (RTL) is a companion library that provides utilities to query and interact with React components in a way that mimics user behavior. The combination encourages testing components as users would: by finding elements by text, labels, or roles, not by implementation details (like component instances). This leads to more maintainable, reliable tests. RTL's philosophy is that the more your tests resemble the way your software is used, the more confidence they give. Together with Jest's snapshot testing and mocking, they form the standard testing stack for React applications.",
    code: `// Component
function Greeting({ name }) {
  return <div>Hello, {name}!</div>;
}
// Test with Jest + RTL
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
test('displays greeting', () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
});
test('interactive test', async () => {
  render(<Button />);
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Clicked')).toBeInTheDocument();
});`,
  },
  {
    id: "security-xss-csrf",
    type: "concept",
    topic: "Security",
    title: "XSS and CSRF",
    prompt: "What are XSS and CSRF attacks, and how do you prevent them?",
    expected:
      "XSS (Cross-Site Scripting) injects malicious scripts into trusted websites; CSRF (Cross-Site Request Forgery) tricks users into executing unwanted actions. Prevent XSS by sanitizing input and using Content Security Policy; prevent CSRF with anti-CSRF tokens and SameSite cookies.",
    keywords: ["xss", "csrf", "security", "csp"],
    explanation:
      "XSS occurs when an attacker injects malicious scripts into a web page, often via unsanitized user input. Prevention: never use innerHTML with unsanitized strings; use textContent or frameworks like React that escape by default; implement Content Security Policy (CSP). CSRF tricks a logged-in user into submitting a request without their knowledge. Prevention: use anti-CSRF tokens (sent in forms, verified on server), set cookies with SameSite=Strict or Lax, and validate origin/referer headers. Both are critical web security threats that can lead to data theft, account takeover, and more. Modern frameworks provide built-in protections but developers must still follow best practices.",
    code: `// XSS vulnerable
element.innerHTML = userInput; // dangerous
// Safe
element.textContent = userInput; // escapes
// React escapes by default
<div>{userInput}</div> // safe

// CSRF token in form
<form method="POST" action="/transfer">
  <input type="hidden" name="csrf_token" value={csrfToken} />
  ...
</form>

// Secure cookie config
res.cookie('session', token, { httpOnly: true, sameSite: 'strict' });`,
  },
  {
    id: "custom-hooks",
    type: "concept",
    topic: "React",
    title: "Custom Hooks",
    prompt: "What are custom hooks and when should you create them?",
    expected:
      "Custom hooks are functions that encapsulate reusable stateful logic, allowing sharing of logic between components without repeating code.",
    keywords: ["custom hooks", "reusable logic", "hooks"],
    explanation:
      "Custom hooks are JavaScript functions whose names start with 'use' and may call other hooks. They allow you to extract component logic into reusable functions. This is React's primary way of sharing non-visual logic between components. Common examples: useFetch for data fetching, useLocalStorage for persistence, useWindowSize for responsive logic, and useDebounce for performance. Custom hooks follow the same rules as hooks: only call at top level, only in React functions. They promote separation of concerns, improve testability, and reduce duplication. When you find yourself writing similar useEffect, useState patterns across components, it's time to extract a custom hook.",
    code: `// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };
  return [storedValue, setValue];
}
// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    {theme}
  </button>;
}`,
  },
  {
    id: "micro-frontends",
    type: "concept",
    topic: "Architecture",
    title: "Micro-frontends",
    prompt: "What are micro-frontends and what problems do they solve?",
    expected:
      "Micro-frontends extend microservices to the frontend, allowing independent teams to develop, deploy, and scale parts of the UI independently.",
    keywords: ["micro-frontends", "architecture", "module federation"],
    explanation:
      "Micro-frontends are an architectural style where a frontend application is decomposed into smaller, independent pieces that can be developed, tested, and deployed by different teams. They solve problems in large organizations: scalability of teams (multiple teams can work on different features), technology freedom (each micro-frontend can use different frameworks), independent deployments (reducing coordination overhead), and incremental upgrades. Implementation approaches include server-side composition, build-time integration, client-side integration with Webpack Module Federation, or using iframes. Trade-offs include increased complexity, potential bundle duplication, and more challenging cross-cutting concerns (authentication, styling).",
    code: `// Webpack Module Federation (host app)
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js',
    app2: 'app2@http://localhost:3002/remoteEntry.js',
  },
});
// Consume remote component
const RemoteButton = React.lazy(() => import('app1/Button'));
function App() {
  return (
    <React.Suspense fallback="Loading...">
      <RemoteButton />
    </React.Suspense>
  );
}`,
  },
  {
    id: "webassembly",
    type: "concept",
    topic: "Performance",
    title: "WebAssembly (Wasm)",
    prompt: "What is WebAssembly and when should you use it?",
    expected:
      "WebAssembly is a binary instruction format that runs near-native performance in browsers, enabling high-performance applications like games, video editors, and compute-heavy tasks.",
    keywords: ["webassembly", "wasm", "performance"],
    explanation:
      "WebAssembly (Wasm) is a low-level, portable binary format that runs alongside JavaScript in browsers, providing near-native performance. It allows languages like C, C++, Rust, and Go to be compiled to run on the web. Use cases include computationally intensive tasks: video/audio processing, 3D rendering (games), cryptography, image manipulation, and porting existing C++ libraries. Wasm modules are sandboxed for security and can interact with JavaScript via imports/exports. While Wasm is not a replacement for JavaScript, it complements it for performance-critical parts. The toolchain (Emscripten, wasm-pack) simplifies compilation.",
    code: `// Using a Rust-compiled Wasm module
import init, { add } from './wasm_module.js';
async function run() {
  await init();
  console.log(add(5, 3)); // 8
}
// Wasm module loaded and executed efficiently
// Example use case: heavy image processing
import { grayscale } from './image_wasm.js';
const processedImage = grayscale(imageData);`,
  },
  {
    id: "browser-storage-indexeddb",
    type: "concept",
    topic: "Browser APIs",
    title: "IndexedDB",
    prompt: "What is IndexedDB and when would you use it?",
    expected:
      "IndexedDB is a low-level, NoSQL database in the browser for storing large amounts of structured data with high performance, suitable for offline apps and complex data.",
    keywords: ["indexeddb", "offline", "storage"],
    explanation:
      "IndexedDB is a browser API for client-side storage of large amounts of structured data (including files/blobs). Unlike localStorage (limited to ~5-10MB, synchronous), IndexedDB allows storing gigabytes, supports indexes for fast queries, and operates asynchronously. It's ideal for Progressive Web Apps (PWAs) that need offline capabilities, caching complex datasets, or building full-fledged client-side applications. IndexedDB is used by libraries like Dexie.js for a simpler promise-based API. Use cases: offline-first apps, email clients, note-taking apps, and caching API responses. The API is low-level but powerful; libraries abstract complexity.",
    code: `// Opening a database
const request = indexedDB.open('MyDatabase', 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
  store.createIndex('title', 'title', { unique: false });
};
request.onsuccess = (event) => {
  const db = event.target.result;
  // Add a note
  const tx = db.transaction('notes', 'readwrite');
  tx.objectStore('notes').add({ title: 'Hello', content: 'World' });
  tx.oncomplete = () => console.log('Saved');
};
// Using Dexie.js (simpler)
import Dexie from 'dexie';
const db = new Dexie('MyDatabase');
db.version(1).stores({ notes: '++id, title' });
await db.notes.add({ title: 'Hello', content: 'World' });`,
  },
  {
    id: "nodejs-event-loop",
    type: "concept",
    topic: "Node.js",
    title: "Node.js Event Loop vs Browser Event Loop",
    prompt:
      "How does the Node.js event loop differ from the browser event loop?",
    expected:
      "Node.js has a more complex event loop with phases (timers, I/O, idle, poll, check, close) designed for server-side I/O, while the browser focuses on UI updates and user interactions.",
    keywords: ["nodejs", "event loop", "phases"],
    explanation:
      "Both Node.js and browsers use event loops for asynchronous operations, but Node.js has a more structured, multi-phase loop: timers (setTimeout, setInterval), pending callbacks (I/O), idle/prepare (internal), poll (retrieve new I/O events), check (setImmediate), close (close handlers). This design optimizes for server-side I/O. The browser event loop prioritizes rendering and user interactions, with microtasks (promises) and macrotasks (setTimeout, events). Node.js also has process.nextTick, which executes before the next phase, and setImmediate which runs after poll. Understanding differences helps write cross-platform code.",
    code: `// Node.js specific
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('timeout'), 0);
process.nextTick(() => console.log('nextTick'));
// Output: nextTick, timeout, setImmediate (order can vary slightly)
// Browser: nextTick doesn't exist; setImmediate not standard`,
  },
  {
    id: "express-middleware",
    type: "concept",
    topic: "Node.js",
    title: "Express Middleware",
    prompt: "What is Express middleware and how does it work?",
    expected:
      "Middleware functions have access to req, res, and next; they can execute code, modify requests, end the response, or pass control to the next middleware.",
    keywords: ["express", "middleware", "request pipeline"],
    explanation:
      "Express middleware are functions that run in the request-response cycle. They can perform tasks like logging, authentication, parsing bodies, compressing responses, and handling errors. Middleware is executed in the order it's registered. A middleware must either call next() to pass control or send a response. Error-handling middleware has an extra error parameter. Express has built-in (express.json, express.static), third-party (cors, morgan, helmet), and custom middleware. This pattern enables modular, reusable request processing logic.",
    code: `// Custom logging middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next(); // pass to next middleware
});
// Built-in
app.use(express.json());
app.use(express.static('public'));
// Error-handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});`,
  },
  {
    id: "jwt-authentication",
    type: "concept",
    topic: "Security",
    title: "JWT Authentication",
    prompt: "What is JWT and how is it used for authentication?",
    expected:
      "JWT (JSON Web Token) is a compact, self-contained token used for stateless authentication, containing a header, payload, and signature to verify integrity.",
    keywords: ["jwt", "authentication", "token"],
    explanation:
      "JWT is an open standard (RFC 7519) that defines a compact way to securely transmit information between parties as a JSON object. It consists of three parts: header (algorithm), payload (claims, like user ID), and signature (to verify token hasn't been tampered). In authentication, the server issues a signed JWT after successful login; the client stores it (usually in httpOnly cookie or localStorage) and sends it with each request (in Authorization header). The server verifies the signature and extracts user data. JWTs are stateless (no session storage) and can include expiration, making them ideal for distributed systems.",
    code: `// Login endpoint (Node.js with jsonwebtoken)
const jwt = require('jsonwebtoken');
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});
// Protect route
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) { res.sendStatus(403); }
}`,
  },
  {
    id: "mongodb-basics",
    type: "concept",
    topic: "Database",
    title: "MongoDB Basics",
    prompt:
      "What are the key concepts of MongoDB and how does it differ from SQL databases?",
    expected:
      "MongoDB is a NoSQL document database using collections and documents, with flexible schemas, horizontal scaling, and BSON storage.",
    keywords: ["mongodb", "nosql", "document database"],
    explanation:
      "MongoDB stores data in flexible, JSON-like documents (BSON) within collections. Unlike SQL databases (tables with fixed schemas), MongoDB allows dynamic schemas, meaning documents in the same collection can have different fields. It supports powerful querying, indexing, aggregation pipelines, and sharding for horizontal scaling. Common use cases: content management, real-time analytics, IoT, and applications with evolving data models. MongoDB uses a document model that maps naturally to objects in code, reducing the need for ORMs. However, it may not be ideal for complex transactions or highly relational data.",
    code: `// Using MongoDB with Mongoose (Node.js)
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
// Create
const user = new User({ name: 'Alice', email: 'alice@example.com' });
await user.save();
// Read
const users = await User.find({ name: 'Alice' });
// Update
await User.updateOne({ email: 'alice@example.com' }, { name: 'Alice Updated' });
// Delete
await User.deleteOne({ email: 'alice@example.com' });`,
  },
  {
    id: "docker-basics",
    type: "concept",
    topic: "DevOps",
    title: "Docker Basics",
    prompt: "What is Docker and why is it used in development?",
    expected:
      "Docker containers package applications with their dependencies, ensuring consistent environments across development, testing, and production.",
    keywords: ["docker", "containers", "devops"],
    explanation:
      "Docker is a platform for developing, shipping, and running applications in containers—lightweight, isolated environments that include everything needed to run the software. Containers share the host OS kernel, making them more efficient than virtual machines. Benefits: consistency across environments, easy dependency management, scalability, and simplified CI/CD. Common use cases: local development with services (databases, message brokers), containerizing Node.js apps, and orchestrating microservices with Kubernetes. Docker uses a Dockerfile to define the environment and docker-compose for multi-container setups.",
    code: `# Dockerfile for a Node.js app
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - mongo
  mongo:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:`,
  },
  {
    id: "github-actions",
    type: "concept",
    topic: "CI/CD",
    title: "GitHub Actions",
    prompt: "What are GitHub Actions and how do they enable CI/CD?",
    expected:
      "GitHub Actions automates software workflows directly in GitHub repositories, supporting CI/CD, testing, and deployment with YAML-defined pipelines.",
    keywords: ["github actions", "ci/cd", "automation"],
    explanation:
      "GitHub Actions is a CI/CD platform that lets you automate tasks based on repository events (push, PR, schedule). Workflows are defined in YAML files in .github/workflows. Each workflow consists of jobs that run on runners (Ubuntu, Windows, macOS). Jobs can run sequentially or in parallel, and you can use pre-built actions from the marketplace or create custom ones. GitHub Actions is free for public repositories and provides generous minutes for private. It supports matrix builds, caching, artifacts, and seamless integration with GitHub's ecosystem. It's widely used for testing, linting, building, and deploying applications.",
    code: `# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm run deploy
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}`,
  },
  {
    id: "webpack",
    type: "concept",
    topic: "Build Tools",
    title: "Webpack",
    prompt: "What is Webpack and what problems does it solve?",
    expected:
      "Webpack is a module bundler that takes modules with dependencies and generates static assets, enabling code splitting, hot module replacement, and asset optimization.",
    keywords: ["webpack", "bundler", "build tool"],
    explanation:
      "Webpack is a static module bundler for modern JavaScript applications. It recursively builds a dependency graph from an entry point, then bundles all modules into one or more bundles. Key features: loaders (transform files like TypeScript, CSS, images), plugins (optimize, manage assets, inject environment variables), code splitting (split code into chunks loaded on demand), and hot module replacement (HMR) for live reloading during development. Webpack solves problems like managing complex dependencies, reducing HTTP requests, and optimizing assets for production. While newer tools like Vite are gaining popularity, Webpack remains a mature, widely used bundler.",
    code: `// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg)$/, type: 'asset/resource' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  optimization: {
    splitChunks: { chunks: 'all' },
  },
};`,
  },
  {
    id: "design-patterns",
    type: "concept",
    topic: "Architecture",
    title: "JavaScript Design Patterns",
    prompt: "What are common design patterns in JavaScript?",
    expected:
      "Common patterns include Module, Singleton, Observer (Event Emitter), Factory, and Revealing Module pattern, each solving specific code organization challenges.",
    keywords: ["design patterns", "module", "singleton", "observer"],
    explanation:
      "Design patterns are reusable solutions to common software design problems. In JavaScript: Module pattern encapsulates private state and exposes public API via closures. Singleton ensures a class has only one instance (e.g., database connection). Observer pattern (pub/sub) allows objects to subscribe to events (used in event emitters). Factory pattern creates objects without specifying the exact class. Revealing Module pattern returns object literal with pointers to private functions. These patterns improve code maintainability, reduce complexity, and facilitate team communication. Modern JavaScript with ES modules, classes, and Proxy offers built-in ways to implement these patterns.",
    code: `// Module pattern
const counter = (() => {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
})();
// Singleton
class DatabaseConnection {
  static instance;
  constructor() {
    if (DatabaseConnection.instance) return DatabaseConnection.instance;
    this.connection = this.connect();
    DatabaseConnection.instance = this;
  }
  connect() { /* ... */ }
}
// Observer (EventEmitter)
class EventEmitter {
  events = {};
  on(event, listener) { /* ... */ }
  emit(event, data) { /* ... */ }
}`,
  },
  {
    id: "styled-components",
    type: "concept",
    topic: "CSS",
    title: "CSS-in-JS with styled-components",
    prompt: "What is CSS-in-JS and how does styled-components work?",
    expected:
      "CSS-in-JS allows writing CSS directly in JavaScript components, with styled-components generating unique class names and scoped styles dynamically.",
    keywords: ["css-in-js", "styled-components", "scoped styles"],
    explanation:
      "CSS-in-JS libraries like styled-components enable writing CSS within JavaScript, keeping styles co-located with components. They generate unique class names, ensuring styles are scoped to components, preventing conflicts. Styled-components uses tagged template literals to define styled elements. Benefits: dynamic styling based on props, automatic vendor prefixing, server-side rendering support, and easy theme management. Potential downsides: runtime cost, larger bundle size, and tooling complexity. Styled-components is popular in React ecosystems, with alternatives like Emotion and vanilla-extract. It's particularly useful for component libraries and design systems.",
    code: `import styled from 'styled-components';
// Styled component
const Button = styled.button\`
  background: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  &:hover {
    opacity: 0.8;
  }
\`;
// Usage with props
<Button primary>Click me</Button>
// Theming
const theme = { primary: 'blue' };
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>`,
  },
  {
    id: "tailwind-css",
    type: "concept",
    topic: "CSS",
    title: "Tailwind CSS",
    prompt: "What is Tailwind CSS and what are its advantages?",
    expected:
      "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes for rapid UI development without writing custom CSS.",
    keywords: ["tailwind", "utility-first", "css framework"],
    explanation:
      "Tailwind CSS takes a utility-first approach, offering classes like 'flex', 'pt-4', 'text-center' that can be composed to build designs directly in markup. This eliminates the need to context-switch between HTML and CSS, encourages consistency, and reduces CSS bundle size through PurgeCSS (removing unused styles). Advantages: rapid prototyping, consistent design system, responsive design utilities, and highly customizable via configuration file. Downsides: learning curve for utility naming, HTML can become verbose, and it may not be ideal for highly customized designs. Tailwind is widely adopted with frameworks like Next.js and integrates with PostCSS.",
    code: `// React component with Tailwind
function Button({ children, primary }) {
  return (
    <button
      className={\`
        px-4 py-2 rounded font-semibold
        \${primary ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
        transition-colors duration-200
      \`}
    >
      {children}
    </button>
  );
}
// Configuration (tailwind.config.js)
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};`,
  },
  {
    id: "monorepos",
    type: "concept",
    topic: "Architecture",
    title: "Monorepos with Turborepo/Nx",
    prompt: "What is a monorepo and how do tools like Turborepo help?",
    expected:
      "A monorepo is a single repository containing multiple projects, enabling shared code, unified tooling, and efficient builds with caching and task orchestration.",
    keywords: ["monorepo", "turborepo", "nx", "workspace"],
    explanation:
      "Monorepos consolidate multiple related projects (apps, packages) in one repository, facilitating code sharing, atomic commits, and consistent tooling. Tools like Turborepo and Nx optimize monorepo development by providing: remote caching (avoid redundant builds), task orchestration (run tasks in parallel, dependency graph), affected commands (run only what changed), and intelligent incremental builds. They support many frameworks (React, Next.js, Node) and package managers (npm, yarn, pnpm). Benefits include easier cross-project changes, simplified dependency management, and faster CI/CD. However, they require careful structuring and tooling adoption.",
    code: `// Turborepo: turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "dev": {
      "cache": false
    }
  }
}
// Nx: nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"]
      }
    }
  }
}
// Directory structure
apps/
  web/
  api/
packages/
  ui/
  shared-types/`,
  },
  {
    id: "git-workflows",
    type: "concept",
    topic: "Version Control",
    title: "Git Branching Strategies",
    prompt: "What are common Git branching strategies and when to use them?",
    expected:
      "Common strategies include Git Flow (feature branches, develop, main), GitHub Flow (short-lived feature branches, main only), and trunk-based development (small, frequent merges to main).",
    keywords: ["git", "branching", "git flow", "trunk-based"],
    explanation:
      "Git branching strategies define how teams manage code changes. Git Flow uses two main branches: main (production-ready) and develop (integration), with feature branches off develop, and release/hotfix branches. Suitable for projects with scheduled releases. GitHub Flow simplifies to one main branch; developers create feature branches, open PRs, and merge after review. Works well for continuous deployment. Trunk-based development emphasizes small, frequent merges to main (trunk) with short-lived feature branches, enabling rapid integration and reducing merge conflicts. Choose based on team size, release cadence, and deployment practices. All strategies benefit from PR reviews and CI checks.",
    code: `# Git Flow
git checkout -b feature/new-login develop
git commit -m "Add login"
git checkout develop
git merge --no-ff feature/new-login
git checkout main
git merge --no-ff release/1.0.0
# GitHub Flow
git checkout -b feature/new-login
git push origin feature/new-login
# Create PR, review, then merge to main
git checkout main
git pull
git branch -d feature/new-login`,
  },
  {
    id: "performance-profiling",
    type: "concept",
    topic: "Performance",
    title: "Chrome DevTools Performance Tab",
    prompt: "How do you profile JavaScript performance using Chrome DevTools?",
    expected:
      "Use the Performance tab to record runtime performance, analyze flame charts, identify long tasks, memory leaks, and optimize rendering.",
    keywords: ["performance", "devtools", "profiling"],
    explanation:
      "Chrome DevTools Performance tab is essential for analyzing runtime performance. Record a session, then examine: flame chart shows call stacks and durations; summary tab categorizes activity (scripting, rendering, painting); long tasks (yellow) indicate main thread blocking. Key optimizations: reduce JavaScript execution, debounce/throttle events, optimize reflows, use web workers for heavy computations. The Memory tab helps detect leaks with heap snapshots and allocation timelines. The Network tab reveals resource loading bottlenecks. Effective profiling identifies performance bottlenecks, improving Core Web Vitals and user experience. Combine with Lighthouse for automated audits.",
    code: `// Example performance issue: layout thrashing
const elements = document.querySelectorAll('.item');
elements.forEach(el => {
  const width = el.offsetWidth; // read
  el.style.width = width + 10 + 'px'; // write – causes reflow each iteration
});
// Fix: batch reads
const widths = Array.from(elements).map(el => el.offsetWidth);
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';
});`,
  },
  {
    id: "webrtc",
    type: "concept",
    topic: "Browser APIs",
    title: "WebRTC",
    prompt: "What is WebRTC and what are its use cases?",
    expected:
      "WebRTC (Web Real-Time Communication) enables peer-to-peer audio, video, and data sharing between browsers without plugins, used for video calls, file sharing, and gaming.",
    keywords: ["webrtc", "real-time", "peer-to-peer"],
    explanation:
      "WebRTC is a free, open-source project providing real-time communication capabilities via simple APIs. It enables direct browser-to-browser connections (peer-to-peer) for audio/video calls, data channels, and screen sharing. Key components: getUserMedia (access camera/mic), RTCPeerConnection (handle peer connection, signaling, STUN/TURN for NAT traversal), RTCDataChannel (low-latency data transfer). Use cases include video conferencing (Zoom, Google Meet), live streaming, online gaming, file sharing, and IoT. Challenges include signaling server setup, ICE negotiation, and NAT/firewall traversal. Libraries like Socket.io help with signaling.",
    code: `// Simplified WebRTC setup
const pc = new RTCPeerConnection(config);
// Get local stream
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
stream.getTracks().forEach(track => pc.addTrack(track, stream));
// Offer/Answer signaling (via WebSocket)
pc.onicecandidate = (event) => {
  if (event.candidate) sendToServer({ candidate: event.candidate });
};
// When remote stream arrives
pc.ontrack = (event) => {
  remoteVideo.srcObject = event.streams[0];
};
// Create offer
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
sendToServer({ offer });`,
  },
  {
    id: "serverless",
    type: "concept",
    topic: "Architecture",
    title: "Serverless Architecture",
    prompt: "What is serverless computing and what are its benefits?",
    expected:
      "Serverless allows running code without managing servers, using Functions-as-a-Service (FaaS) like AWS Lambda, with auto-scaling, pay-per-execution, and reduced operational overhead.",
    keywords: ["serverless", "lambda", "faas"],
    explanation:
      "Serverless is a cloud computing model where the cloud provider manages infrastructure, automatically scaling and billing only for actual usage. Functions-as-a-Service (FaaS) run code in response to events (HTTP requests, database changes). Benefits: no server management, automatic scaling, reduced costs (pay per invocation), faster deployment. Use cases: APIs, scheduled tasks, data processing, webhooks. Frameworks like Serverless Framework and AWS SAM simplify development. Challenges: cold starts, execution time limits (15 min max for AWS Lambda), vendor lock-in, debugging complexity. Serverless pairs well with microservices and event-driven architectures.",
    code: `// AWS Lambda function (Node.js)
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Process request
  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello ' + body.name })
  };
  return response;
};
// serverless.yml configuration
service: my-api
provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: post`,
  },
  {
    id: "graphql-vs-rest-deep",
    type: "concept",
    topic: "API",
    title: "GraphQL vs REST Deep Dive",
    prompt: "What are the trade-offs between GraphQL and REST for API design?",
    expected:
      "REST is simpler, cacheable, and leverages HTTP; GraphQL provides flexibility, reduces over-fetching, and has a strong type system but adds complexity and potential performance issues.",
    keywords: ["graphql", "rest", "api design", "comparison"],
    explanation:
      "REST uses resource-oriented endpoints with HTTP methods, benefiting from HTTP caching, simple tooling, and wide adoption. However, it often leads to over/under-fetching and requires versioning. GraphQL allows clients to request exactly needed fields, consolidates requests, and provides a self-documenting schema. Trade-offs: GraphQL adds complexity (resolvers, batching, caching), may have performance issues with nested queries (N+1 problem), and lacks native HTTP caching. Use REST for simple, cache-heavy APIs; use GraphQL for complex data requirements, mobile apps, and when client needs vary. Many teams adopt a hybrid approach, using GraphQL as a unified gateway over existing REST services.",
    code: `// REST: multiple requests or overfetching
GET /users/123
GET /users/123/posts
// GraphQL: one query
query {
  user(id: 123) {
    name
    posts { title }
  }
}
// Solving N+1 with DataLoader
const DataLoader = require('dataloader');
const userLoader = new DataLoader(async (userIds) => {
  const users = await db.findUsersByIds(userIds);
  return userIds.map(id => users.find(u => u.id === id));
});
// In resolver
User: {
  posts: (parent) => postLoader.loadMany(parent.postIds)
}`,
  },
  {
    id: "state-management-comparison",
    type: "concept",
    topic: "State Management",
    title: "State Management Patterns: Context, Redux, Zustand",
    prompt:
      "How do you choose between Context API, Redux, and Zustand for state management?",
    expected:
      "Context is built-in and simple for prop drilling; Redux offers predictable state with middleware and devtools; Zustand provides minimal API with no boilerplate and efficient re-renders.",
    keywords: ["state management", "context", "redux", "zustand"],
    explanation:
      "Context API is built into React, best for simple, low-frequency state (theme, auth) but can cause unnecessary re-renders. Redux is a mature, opinionated library with predictable state updates, middleware (thunk, saga), and powerful devtools; ideal for large, complex apps with many interactions. Zustand is a modern, minimalistic state management with a simple API, no boilerplate, and automatic re-render optimization; great for medium-sized apps or when you want less ceremony. Consider factors: team familiarity, app complexity, performance requirements, and developer experience. Newer tools like Jotai and Recoil offer atomic state management, giving fine-grained subscriptions.",
    code: `// Context (simple)
const ThemeContext = React.createContext();
<ThemeContext.Provider value={theme}>
  {children}
</ThemeContext.Provider>
const theme = useContext(ThemeContext);
// Redux (boilerplate)
const slice = createSlice({ name: 'counter', initialState: 0, reducers: { increment: state => state + 1 } });
const dispatch = useDispatch();
dispatch(increment());
// Zustand (minimal)
import { create } from 'zustand';
const useStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 }))
}));
const { count, increment } = useStore();`,
  },
  {
    id: "error-handling",
    type: "concept",
    topic: "Best Practices",
    title: "Error Handling Patterns",
    prompt:
      "What are best practices for error handling in JavaScript and React?",
    expected:
      "Use try/catch for synchronous code, .catch() for promises, error boundaries in React, centralized error logging, and graceful fallbacks for users.",
    keywords: ["error handling", "try-catch", "error boundary"],
    explanation:
      "Effective error handling improves user experience and debuggability. In synchronous code, use try/catch blocks. For promises, chain .catch() or use try/catch with async/await. In React, error boundaries (class components with componentDidCatch) catch render errors. Global error handlers: window.onerror and unhandledrejection. Always provide user-friendly fallbacks (error messages, retry buttons) and log errors to a service (Sentry, LogRocket). Distinguish between expected errors (validation) and unexpected (network failures). Graceful degradation ensures the app remains usable. Avoid silent failures and always propagate or handle errors at appropriate levels.",
    code: `// Async error handling
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    logError(err);
    return { error: 'Failed to load data' };
  }
}
// React error boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logError(error, info); }
  render() {
    if (this.state.hasError) return <h1>Something went wrong</h1>;
    return this.props.children;
  }
}
// Global handlers
window.onerror = (msg, url, line, col, error) => logError(error);
window.addEventListener('unhandledrejection', event => logError(event.reason));`,
  },
];
