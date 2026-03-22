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
];
