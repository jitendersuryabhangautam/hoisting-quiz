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
      "A closure is the combination of a function and the outer variables it can still access after the outer function has returned.",
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
      "Property access checks the own object first. If the property is missing, the engine keeps walking through the prototype chain.",
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
      "== converts operands to the same type before comparison, which can lead to unexpected results. === does not coerce, so it's generally preferred.",
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
      "Variables declared with var are hoisted and initialized with undefined. Function declarations are hoisted completely. let and const are hoisted but not initialized (TDZ).",
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
      "Every object (except null) has a prototype. When accessing a property, JavaScript checks the object itself, then its prototype, and so on. This forms the prototype chain.",
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
      "JavaScript is single-threaded. The event loop manages execution by monitoring the call stack. When the stack is empty, it takes tasks from the microtask queue (Promises) first, then macrotask queue (setTimeout, setInterval). This explains async behavior and execution order.",
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
      "Microtasks include Promise.then, queueMicrotask. Macrotasks include setTimeout, setInterval, setImmediate. After the current script runs, all microtasks are executed before moving to macrotasks. This is why Promises run before setTimeout even with 0 delay.",
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
      "There are 4 rules: default binding (global), implicit binding (object), explicit binding (call/apply/bind), and new binding. Arrow functions do not have their own this — they inherit it lexically.",
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
      "Arrow functions do not have their own this. Instead, they capture the this value of the enclosing context. This makes them useful in callbacks but problematic for methods.",
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
      "Debouncing is used to limit function calls (e.g., search input). It ensures the function runs only after a pause in events, reducing unnecessary calls.",
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
      "Unlike debouncing, throttling guarantees execution every fixed interval. Useful for scroll or resize events where continuous execution is needed but limited.",
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
      "call takes arguments individually, apply takes them as an array, and bind returns a new function without executing it immediately. All are used to control 'this'.",
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
      "Shallow copy (Object.assign, spread) copies only top-level properties. Nested objects still share references. Deep copy duplicates everything, preventing unintended mutations.",
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
      "Memoization improves performance by storing previous results. If the same inputs occur again, the cached result is returned instead of recalculating.",
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
      "Variables declared with let and const are hoisted but not initialized. Accessing them before declaration results in ReferenceError.",
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
      "Currying allows partial application and function reuse. Example: f(a)(b)(c). It helps create reusable and composable functions.",
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
      "Pure functions do not modify external state. They are predictable and easier to test and debug.",
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
      "Examples include modifying global variables, DOM manipulation, API calls. Minimizing side effects leads to better code predictability.",
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
      "The engine marks reachable objects and removes those that are not referenced. Memory leaks occur when references are unintentionally retained.",
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
      "Common causes include closures, global variables, and event listeners not removed. Leads to performance degradation over time.",
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
      "A Promise has three states: pending, fulfilled, rejected. It allows chaining and better async handling compared to callbacks.",
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
      "async/await simplifies async code by making it look synchronous. await only works inside async functions and pauses execution until resolved.",
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
      "Modules improve maintainability and encapsulation. They are statically analyzed and support tree shaking.",
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
      "CommonJS is used in Node.js, while ES modules are modern standard. ES modules support static analysis and better optimization.",
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
      "Instead of modifying data, new copies are created. This is crucial in React and functional programming for predictable state updates.",
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
      "GET, PUT are idempotent, while POST is not. Important for designing reliable APIs.",
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
      "Each time a function is called, a new execution context is created and pushed onto the call stack. It contains variable environment, this binding, and lexical environment. When the function returns, its context is popped.",
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
      "When using var, the same variable is captured by all closures. With let, each iteration has its own block-scoped variable, preserving the value.",
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
      "Generator functions are defined with function* and can be paused using yield. They return an iterator. Useful for lazy sequences, infinite lists, and async control flow.",
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
      "WeakMap keys must be objects, and entries are removed when the key is garbage collected. Used for caching or storing metadata without preventing cleanup.",
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
      "Each Symbol is guaranteed to be unique. They can be used for hidden properties or well-known symbols like Symbol.iterator.",
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
      "Proxy creates a wrapper that intercepts operations like property access, assignment, etc. Reflect provides methods for default behavior.",
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
      "Useful for infinite scrolling, lazy loading images, or tracking ad visibility. It's more performant than scroll event listeners.",
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
      "Service workers are JavaScript workers that can intercept network requests, cache assets, and provide offline experiences.",
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
      "Web workers are ideal for CPU-intensive tasks. They communicate with the main thread via postMessage.",
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
      "Strict mode eliminates some silent errors, forbids certain syntax, and improves security. It's automatically enabled in ES modules and classes.",
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
      "Events flow in three phases: capturing (from window to target), target, and bubbling (from target back to window). The default is bubbling.",
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
      "It aligns with the browser's refresh rate, usually 60fps. Use instead of setTimeout/setInterval for smooth animations.",
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
      "Part of Web Components. Use class MyElement extends HTMLElement and customElements.define('my-element', MyElement).",
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
      "Shadow DOM provides component-level scoping for CSS and HTML. Used in Web Components.",
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
      "BigInt is a primitive type for integers larger than 2^53-1. Use n suffix or BigInt() constructor.",
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
      "It returns undefined if any part of the chain is null or undefined, preventing runtime errors.",
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
      "Unlike ||, ?? only considers null/undefined as falsey, not 0 or ''.",
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
      "They return a promise and enable code splitting, lazy loading, and better performance.",
    code: `async function loadModule() {
  const module = await import('./some-module.js');
  module.doSomething();
}`,
  },
];
