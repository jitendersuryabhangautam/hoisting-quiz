export const conceptQuestions = [
  {
    id: "concept-closure",
    type: "concept",
    topic: "JavaScript Core",
    title: "What is a closure?",
    prompt:
      "Explain what a closure is and how it works in JavaScript. Provide a real‑world use case.",
    expected:
      "A closure is a function that 'remembers' its lexical scope even when the function is executed outside that scope. It is created every time a function is defined, capturing variables from its outer scope.",
    keywords: ["closure", "lexical scope", "scope chain", "memory"],
    explanation:
      "A closure is a fundamental and often misunderstood concept in JavaScript. It occurs when a function is defined inside another function (the outer function) and references variables from the outer function's scope. Even after the outer function has finished executing and its execution context is popped off the call stack, the inner function retains a reference to the outer function's variables via a hidden property called [[Environment]]. This allows the inner function to access and modify those variables whenever it is called later. Closures are created automatically in JavaScript – every function is a closure, but the term is usually used when the inner function is returned or passed elsewhere.\n\n**How it works under the hood:** When a function is defined, the JavaScript engine stores the current lexical environment (including all local variables) in the function's internal [[Environment]] slot. When the function is invoked later, a new execution context is created, and its outer environment reference is set to that stored [[Environment]]. This forms the scope chain, enabling variable lookup across nested scopes.\n\n**Common use cases:**\n- **Data encapsulation / private variables** – emulate private members (before ES2022 class fields).\n- **Function factories** – create functions with pre‑configured behaviour (e.g., multiplier).\n- **Callbacks and event handlers** – maintain state across asynchronous operations.\n- **Memoization** – cache results based on arguments.\n- **Module pattern** – create singletons with public and private members.\n\n**Memory implications:** Because closures keep references to outer variables, they can prevent garbage collection if not used carefully, leading to memory leaks. For example, attaching a closure to a DOM element that references a large object can keep that object alive even after the element is removed.\n\n**Interview tip:** Be prepared to explain how closures interact with loops and `var` vs `let` (the classic “setTimeout loop” problem) and how to fix it using `let` or an IIFE.",
    code: "// Basic closure – function factory\nfunction createMultiplier(multiplier) {\n  return function (value) {\n    return value * multiplier;\n  };\n}\nconst double = createMultiplier(2);\nconsole.log(double(5)); // 10 – multiplier is remembered\n\n// Data encapsulation (private variable)\nfunction createCounter() {\n  let count = 0;\n  return {\n    increment() { count++; return count; },\n    decrement() { count--; return count; },\n    getCount() { return count; }\n  };\n}\nconst counter = createCounter();\nconsole.log(counter.increment()); // 1\nconsole.log(counter.increment()); // 2\n// `count` is not accessible directly – it's private.\n\n// Classic loop problem with var\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// Output: 3,3,3 – because all closures share the same `i`\n\n// Fix: use let (block scope creates new binding per iteration)\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// Output: 0,1,2\n\n// Fix with IIFE (pre‑ES6)\nfor (var i = 0; i < 3; i++) {\n  (function (j) {\n    setTimeout(() => console.log(j), 0);\n  })(i);\n}\n// Output: 0,1,2\n\n// Memoization using closure\nfunction memoize(fn) {\n  const cache = {};\n  return function (...args) {\n    const key = JSON.stringify(args);\n    if (cache[key] !== undefined) return cache[key];\n    const result = fn(...args);\n    cache[key] = result;\n    return result;\n  };\n}\nconst expensiveFib = memoize(n => n <= 1 ? n : expensiveFib(n-1) + expensiveFib(n-2));\nconsole.log(expensiveFib(40)); // fast due to caching",
  },
  {
    id: "concept-prototype",
    type: "concept",
    topic: "JavaScript Core",
    title: "Prototype chain (lookup mechanism)",
    prompt:
      "How does JavaScript resolve property access on an object? Explain the prototype chain.",
    expected:
      "JavaScript looks for the property on the object itself first; if not found, it traverses the [[Prototype]] chain until it finds the property or reaches null.",
    keywords: [
      "prototype",
      "[[Prototype]]",
      "inheritance",
      "__proto__",
      "Object.getPrototypeOf",
    ],
    explanation:
      "Every JavaScript object (except the root Object.prototype) has an internal property called [[Prototype]] (accessible via `Object.getPrototypeOf()` or the deprecated `__proto__`). This is a reference to another object, which itself may have its own prototype, forming a chain. When you read a property (e.g., `obj.foo`), the engine performs the following steps:\n1. Check if `obj` has its own property named `foo` (using `hasOwnProperty`). If yes, return that value.\n2. If not, get the object's prototype (obj.[[Prototype]]). If that prototype is `null`, return `undefined`.\n3. Otherwise, repeat the process on the prototype object (check its own properties, then its prototype, etc.).\n\nThis chain continues until either the property is found or the end (null) is reached. This mechanism is called **prototypal inheritance** and is how JavaScript implements inheritance without classical classes.\n\n**Important nuances:**\n- Setting a property (`obj.foo = 42`) never traverses the prototype chain; it always creates or updates an own property on the object itself. This is called \"shadowing\" – the own property hides the prototype property.\n- The prototype chain is live: adding properties to a prototype object instantly makes them available on all objects that inherit from it.\n- Functions have a `prototype` property (not to be confused with [[Prototype]]). This `prototype` is the object that will become the [[Prototype]] of instances created when the function is used as a constructor (`new Foo()`).\n- Using `Object.create()` you can set the prototype explicitly.\n\n**Performance tip:** Deep prototype chains can slow down property lookups because the engine has to walk many links. In practice, modern engines optimise common cases, but keeping chains shallow is good practice.\n\n**Interview tip:** Understand the difference between `Object.prototype`, `Function.prototype`, and the `prototype` property of constructor functions. Also be ready to explain how `class` syntax works under the hood (it's syntactic sugar over prototypes).",
    code: "// Creating objects with prototypes\nconst parent = { a: 1, b: 2 };\nconst child = Object.create(parent); // child.[[Prototype]] = parent\nchild.c = 3;\n\nconsole.log(child.a); // 1 – from parent\nconsole.log(child.c); // 3 – own property\nconsole.log(child.d); // undefined – not found\n\n// Shadowing\nchild.a = 100; // creates own property 'a' on child\nconsole.log(child.a); // 100 (own)\nconsole.log(parent.a); // 1 (unchanged)\n\n// Constructor function\nfunction Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.speak = function() {\n  return `${this.name} speaks`;\n};\nconst dog = new Animal('Rex');\nconsole.log(dog.speak()); // Rex speaks – found on Animal.prototype\nconsole.log(dog.hasOwnProperty('speak')); // false\nconsole.log(dog.__proto__ === Animal.prototype); // true\nconsole.log(Animal.prototype.__proto__ === Object.prototype); // true\nconsole.log(Object.prototype.__proto__); // null – end of chain\n\n// Checking the prototype chain\nconsole.log(Object.getPrototypeOf(dog) === Animal.prototype); // true\nconsole.log(Animal.prototype.isPrototypeOf(dog)); // true\n\n// Prototype chain with classes (syntactic sugar)\nclass Mammal {\n  breathe() { return 'inhale/exhale'; }\n}\nclass Human extends Mammal {\n  speak() { return 'Hello'; }\n}\nconst alice = new Human();\nconsole.log(alice.speak()); // own method\nconsole.log(alice.breathe()); // from Mammal.prototype\nconsole.log(alice.toString()); // from Object.prototype",
  },
  {
    id: "concept-equals",
    type: "concept",
    topic: "JavaScript Core",
    title: "== vs ===",
    prompt:
      "Explain the difference between == and === in JavaScript. When would you use one over the other?",
    expected:
      "== performs type coercion before comparison, while === compares both value and type without coercion. === is generally preferred because it avoids unexpected results.",
    keywords: [
      "loose equality",
      "strict equality",
      "coercion",
      "type conversion",
      "abstract equality algorithm",
    ],
    explanation:
      "JavaScript provides two equality operators:\n\n**== (loose equality)** – Compares values after performing type coercion if the operands are of different types. The coercion rules follow the **Abstract Equality Algorithm** (specified in ECMAScript). For example, when comparing a number and a string, the string is converted to a number. When comparing a boolean with a number, the boolean is converted to number (true -> 1, false -> 0). When comparing null and undefined, they are equal to each other but not to any other value. Objects are compared by reference unless they are compared to primitives (then `ToPrimitive` is called). The rules are complex and often lead to surprising results, which is why many linting rules (e.g., ESLint `eqeqeq`) forbid `==` except for checking `null` or `undefined`.\n\n**=== (strict equality)** – Compares both value and type without any coercion. If the types differ, it immediately returns false. This is predictable and faster, and it is the recommended default.\n\n**Special cases:**\n- `NaN` is not equal to anything, including itself: `NaN === NaN` is false. Use `Number.isNaN()` or `Object.is()` to check.\n- `+0` and `-0` are equal with both `==` and `===` (they are considered equal). Use `Object.is()` to distinguish them.\n- `Object.is()` behaves like `===` except for `NaN` and signed zero.\n\n**When to use `==`:**\n- Only acceptable when you explicitly want to check for `null` or `undefined` together: `if (value == null)` is equivalent to `if (value === null || value === undefined)`. This is a well‑known pattern.\n- In very rare cases where you need type coercion intentionally (e.g., comparing a number input from a form that comes as a string). But even then, explicit conversion (`Number(value)`) is clearer.\n\n**Interview tip:** Be ready to give examples of surprising `==` behaviour, such as `[] == false` being true, `[] == ![]` being true, or `'1' == true` being true. Explain that `==` can be dangerous and that strict equality should be the default.",
    code: "// Basic examples\nconsole.log(1 == '1');   // true  (coercion: string → number)\nconsole.log(1 === '1');  // false (type mismatch)\nconsole.log(0 == false); // true  (false → 0)\nconsole.log(0 === false);// false\nconsole.log(null == undefined);  // true  (special rule)\nconsole.log(null === undefined); // false\n\n// Surprising coercions\nconsole.log([] == false);   // true  ([] → '' → 0, false → 0)\nconsole.log([] == ![]);     // true  ([] truthy, ![] false → then [] == false)\nconsole.log('' == 0);       // true\nconsole.log('\\n\\t' == 0);   // true  (whitespace string → 0)\nconsole.log([1,2] == '1,2');// true  (array → string)\nconsole.log({} == '[object Object]'); // true (object → string via toString)\n\n// The safe pattern: checking null/undefined with ==\nfunction process(value) {\n  if (value == null) {   // covers both null and undefined\n    console.log('No value provided');\n    return;\n  }\n  console.log('Processing:', value);\n}\nprocess(null);   // 'No value provided'\nprocess(undefined); // 'No value provided'\nprocess(0);      // 'Processing: 0' (0 is not nullish)\n\n// Object.is for edge cases\nconsole.log(NaN === NaN);        // false\nconsole.log(Object.is(NaN, NaN));// true\nconsole.log(+0 === -0);          // true\nconsole.log(Object.is(+0, -0));  // false\n\n// Best practice: default to ===\nif (userInput === 'admin') { /* ... */ }\n// If coercion is needed, do it explicitly\nconst numericValue = Number(userInput);\nif (numericValue === 100) { /* ... */ }",
  },
  {
    id: "concept-hoisting",
    type: "concept",
    topic: "JavaScript Core",
    title: "What is hoisting?",
    prompt:
      "Explain hoisting in JavaScript. How does it affect variables declared with var, let, const, and function declarations?",
    expected:
      "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. Variables declared with var are hoisted and initialized with undefined; let/const are hoisted but not initialized (Temporal Dead Zone); function declarations are hoisted with their definition.",
    keywords: [
      "hoisting",
      "TDZ",
      "temporal dead zone",
      "var",
      "let",
      "const",
      "function declaration",
    ],
    explanation:
      "Hoisting is a JavaScript mechanism where variable and function declarations are moved (conceptually) to the top of their containing scope before code execution. This happens during the compilation phase, before the code is executed line by line.\n\n**How it works for different declarations:**\n\n1. **`var` variables** – The declaration is hoisted, and it is initialised with `undefined`. Therefore, you can access a `var` variable before its declaration line – it will be `undefined`, not throw a ReferenceError.\n\n2. **`let` and `const` variables** – The declaration is hoisted, but they are **not initialised**. The time between the start of the block and the actual declaration line is called the **Temporal Dead Zone (TDZ)**. Accessing a `let` or `const` variable during the TDZ throws a ReferenceError. This is a deliberate design to catch bugs.\n\n3. **Function declarations** – Both the declaration and the definition (body) are hoisted. This means you can call a function before it appears in the code. Function expressions (`var foo = function() {}`) follow the variable hoisting rules of `var`.\n\n4. **Class declarations** – Class declarations are hoisted but remain in the TDZ like `let`/`const`. You cannot use a class before its definition.\n\n**Why hoisting exists:** It allows functions to call each other without worrying about order and enables mutual recursion. It also supports the illusion that declarations are processed before code execution.\n\n**Interview tip:** Be prepared to explain the TDZ and how it prevents common bugs (like accessing a variable before assignment). Also, understand that `let`/`const` hoisting is often misunderstood – many think they are not hoisted, but they actually are, just with TDZ constraints.",
    code: "// var hoisting\nconsole.log(a); // undefined – not ReferenceError\nvar a = 5;\nconsole.log(a); // 5\n\n// What the engine sees after hoisting:\n// var a;\n// console.log(a);\n// a = 5;\n\n// let/const hoisting and TDZ\nconsole.log(b); // ReferenceError: Cannot access 'b' before initialization\nlet b = 10;\n\n// TDZ example with block scope\n{\n  // TDZ starts at the beginning of the block\n  console.log(c); // ReferenceError\n  let c = 20;\n}\n\n// Function declaration hoisting\nsayHello(); // 'Hello' – works because function is hoisted\nfunction sayHello() {\n  console.log('Hello');\n}\n\n// Function expression (not hoisted in the same way)\nsayGoodbye(); // TypeError: sayGoodbye is not a function (hoisted as var, initialized with undefined)\nvar sayGoodbye = function() {\n  console.log('Goodbye');\n};\n\n// Class hoisting (TDZ)\nconst obj = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization\nclass MyClass {}\n\n// Practical implication: always declare variables at the top of their scope\nfunction example() {\n  // good: declare at top\n  let x, y;\n  // ... code\n  x = 5;\n  y = 10;\n}\n\n// TDZ with default parameters\nfunction test(val = z) {  // z is in TDZ\n  let z = 5;\n  return val;\n}\ntest(); // ReferenceError: Cannot access 'z' before initialization",
  },
  {
    id: "concept-prototype-chain",
    type: "concept",
    topic: "JavaScript Core",
    title: "Prototype chain explanation (detailed)",
    prompt:
      "Explain the prototype chain in depth. How does inheritance work in JavaScript? What is the difference between [[Prototype]] and prototype?",
    expected:
      "The prototype chain is a series of links between objects that enables inheritance. Each object has a hidden [[Prototype]] link to its parent. The `prototype` property exists only on functions and is used to set the [[Prototype]] of instances created with that function as a constructor.",
    keywords: [
      "[[Prototype]]",
      "prototype property",
      "constructor",
      "inheritance",
      "__proto__",
      "Object.getPrototypeOf",
    ],
    explanation:
      "In JavaScript, inheritance is prototype‑based rather than class‑based. Every object has an internal slot called `[[Prototype]]` (standardised in ES5). This is a reference to another object, which can be accessed via `Object.getPrototypeOf()` (or the deprecated `__proto__` getter/setter). The prototype chain is the sequence of these links from an object up to `Object.prototype` and finally `null`.\n\n**Key concepts:**\n\n- **`[[Prototype]]`** – An internal reference that all objects have. It points to the object's prototype. This is what the engine traverses during property lookup.\n- **`prototype` property** – Exists only on **functions** (including constructors and classes). When a function is used as a constructor (with `new`), the newly created object's `[[Prototype]]` is set to the function's `prototype` property.\n- **`__proto__`** – A legacy getter/setter for `[[Prototype]]`. Not recommended for production; use `Object.getPrototypeOf` / `Object.setPrototypeOf`.\n- **`Object.prototype`** – The base prototype for most objects. Its `[[Prototype]]` is `null`, terminating the chain.\n\n**How inheritance works:**\n\n1. **Constructor functions** – Define a function, add methods to its `prototype`. Instances created with `new` inherit those methods via the prototype chain.\n2. **`Object.create()`** – Creates a new object with a specified prototype.\n3. **`class` syntax** – Syntactic sugar over constructor functions and prototypes, but more readable.\n\n**Property lookup with the chain:**\n- Own properties (defined directly on the object) are found first.\n- If not found, the engine moves up the `[[Prototype]]` chain.\n- This continues until either the property is found or `null` is reached.\n\n**Prototypal inheritance vs classical inheritance:**\n- Classical: classes inherit from classes; instances inherit from classes.\n- Prototypal: objects inherit directly from other objects. This is more flexible and allows dynamic inheritance (e.g., adding methods at runtime).\n\n**Interview tip:** Be prepared to explain how `instanceof` works (checks the `prototype` property of the right‑hand side against the left‑hand side's prototype chain). Also, know that modifying built‑in prototypes (e.g., `Array.prototype.myMethod = ...`) is generally discouraged because it can cause conflicts and performance issues.",
    code: "// Constructor function\nfunction Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function() {\n  return `Hello, I'm ${this.name}`;\n};\nconst alice = new Person('Alice');\nconsole.log(alice.greet()); // Hello, I'm Alice\nconsole.log(alice.__proto__ === Person.prototype); // true\nconsole.log(Person.prototype.__proto__ === Object.prototype); // true\nconsole.log(Object.prototype.__proto__); // null\n\n// Using Object.create for direct prototypal inheritance\nconst animal = { eats: true };\nconst rabbit = Object.create(animal);\nrabbit.jumps = true;\nconsole.log(rabbit.eats); // true (from animal)\nconsole.log(Object.getPrototypeOf(rabbit) === animal); // true\n\n// The difference between [[Prototype]] and prototype property\nfunction Foo() {}\nconst foo = new Foo();\nconsole.log(Object.getPrototypeOf(foo) === Foo.prototype); // true\nconsole.log(Foo.prototype.constructor === Foo); // true (circular reference)\n\n// Setting prototype chain for inheritance between constructors\nfunction Animal(name) {\n  this.name = name;\n}\nAnimal.prototype.speak = function() {\n  return `${this.name} makes a sound`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name); // call super constructor\n  this.breed = breed;\n}\n// Link prototypes\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog; // fix constructor reference\nDog.prototype.bark = function() {\n  return 'Woof!';\n};\nconst rex = new Dog('Rex', 'Lab');\nconsole.log(rex.speak()); // Rex makes a sound (inherited)\nconsole.log(rex.bark());  // Woof! (own)\n\n// Using class syntax (ES6)\nclass Mammal {\n  constructor(name) { this.name = name; }\n  breathe() { return 'breathing'; }\n}\nclass Whale extends Mammal {\n  swim() { return 'swimming'; }\n}\nconst willy = new Whale('Willy');\nconsole.log(willy.breathe()); // breathing – inherited via prototype chain\nconsole.log(Object.getPrototypeOf(Whale.prototype) === Mammal.prototype); // true\n\n// Checking instanceof\nconsole.log(rex instanceof Dog);     // true\nconsole.log(rex instanceof Animal);  // true (because Dog.prototype inherits from Animal.prototype)\nconsole.log(rex instanceof Object);  // true\n\n// Performance: deep chains slow down lookups\nlet obj = { a: 1 };\nfor (let i = 0; i < 100; i++) {\n  obj = Object.create(obj);\n}\nconsole.log(obj.a); // still 1, but engine traversed 100 links\n// Modern engines optimise, but deep chains are still not recommended.",
  },
  {
    id: "concept-event-loop",
    type: "concept",
    topic: "JavaScript Core",
    title: "Event Loop",
    prompt:
      "Explain the JavaScript event loop. How does it enable asynchronous programming in a single‑threaded environment?",
    expected:
      "The event loop continuously checks the call stack and task queues, pushing callbacks to the stack when it's empty. It prioritises microtasks over macrotasks, enabling non‑blocking I/O.",
    keywords: [
      "event loop",
      "call stack",
      "microtask",
      "macrotask",
      "non-blocking",
      "asynchronous",
    ],
    explanation:
      "JavaScript is single‑threaded, meaning it has one call stack and one thread of execution. The event loop is the mechanism that allows JavaScript to perform non‑blocking asynchronous operations despite being single‑threaded.\n\n**Core components:**\n- **Call stack** – where function execution contexts are pushed and popped (synchronous code).\n- **Web APIs / C++ APIs** – provided by the environment (browser or Node.js) for async tasks (setTimeout, fetch, DOM events).\n- **Task queues (macrotask queue)** – holds callbacks from async operations like setTimeout, setInterval, I/O, UI rendering.\n- **Microtask queue** – holds callbacks from promises (Promise.then, catch, finally), MutationObserver, queueMicrotask.\n\n**How it works:**\n1. Synchronous code runs, filling the call stack. When the stack is empty, the event loop checks the microtask queue.\n2. It executes **all** microtasks in the microtask queue until it is empty.\n3. Then it takes **one** macrotask from the macrotask queue and executes it.\n4. After that macrotask finishes, the loop goes back to step 2 (microtasks again), and the cycle repeats.\n\nThis prioritisation ensures that promise callbacks are executed before timers, even if both are ready. It also prevents microtask starvation if a microtask keeps adding more microtasks.\n\n**Why this matters:**\n- The event loop allows JavaScript to handle thousands of concurrent operations efficiently without multi‑threading complexity.\n- Understanding it helps debug order of execution (e.g., why a setTimeout with 0ms delay doesn't run immediately).\n- It explains why long‑running synchronous code blocks everything – the loop can't process tasks until the stack clears.\n\n**Interview tip:** Be ready to trace async code order (e.g., console.log order with promises, setTimeout, nextTick). Also know that in Node.js the event loop has more phases (timers, I/O, idle, poll, check, close) but the microtask/macrotask concept still applies.",
    code: "// Basic event loop demonstration\nconsole.log('1'); // sync\nsetTimeout(() => console.log('2'), 0); // macrotask\nPromise.resolve().then(() => console.log('3')); // microtask\nconsole.log('4'); // sync\n// Output: 1,4,3,2\n// Explanation: sync (1,4) → microtask (3) → macrotask (2)\n\n// Microtask that adds another microtask\nPromise.resolve().then(() => {\n  console.log('A');\n  Promise.resolve().then(() => console.log('B'));\n});\nsetTimeout(() => console.log('C'), 0);\n// Output: A, B, C – all microtasks run before the macrotask\n\n// Blocking the event loop – bad practice\nconsole.log('Start');\nconst start = Date.now();\nwhile (Date.now() - start < 3000) {\n  // busy wait – blocks everything\n}\nconsole.log('End'); // runs after 3 seconds\n// During this time, no setTimeout callbacks, no UI updates, no user interactions.\n\n// Visualising the order\nfunction delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n(async () => {\n  console.log('A');\n  await delay(0); // schedules a macrotask (setTimeout) and yields\n  console.log('B');\n})();\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');\n// Output: A, D, C, B\n// Explanation: A sync, D sync, then microtask C, then after that macrotask B\n\n// In Node.js, process.nextTick is a special microtask that runs before other microtasks\nif (typeof process !== 'undefined') {\n  process.nextTick(() => console.log('nextTick'));\n  Promise.resolve().then(() => console.log('promise'));\n  // Output: nextTick, promise (nextTick has higher priority in Node.js)\n}",
  },
  {
    id: "concept-microtask-macrotask",
    type: "concept",
    topic: "JavaScript Core",
    title: "Microtask vs Macrotask",
    prompt:
      "What is the difference between microtasks and macrotasks? How does their priority affect async execution order?",
    expected:
      "Microtasks (Promise.then, queueMicrotask) have higher priority and run immediately after the current synchronous code, before any macrotasks. Macrotasks (setTimeout, setInterval, I/O) run in the next iteration of the event loop.",
    keywords: [
      "microtask",
      "macrotask",
      "task queue",
      "event loop priority",
      "Promise",
      "setTimeout",
    ],
    explanation:
      "In the JavaScript event loop, there are multiple queues with different priorities. Understanding the distinction between microtasks and macrotasks is crucial for predicting async execution order and avoiding subtle bugs.\n\n**Macrotasks (also called tasks):**\n- Sources: `setTimeout`, `setInterval`, `setImmediate` (Node.js), I/O, UI rendering, `postMessage`, `MessageChannel`.\n- The event loop takes **one** macrotask from the queue per iteration.\n- After executing a macrotask, the event loop processes the entire microtask queue before taking the next macrotask.\n\n**Microtasks:**\n- Sources: `Promise.then` / `.catch` / `.finally`, `MutationObserver`, `queueMicrotask()`, `process.nextTick` (Node.js, higher priority).\n- The event loop processes **all** microtasks that are queued before moving to the next macrotask.\n- If a microtask queues another microtask, that new microtask will also be executed in the same cycle (can lead to infinite loops if not careful).\n\n**Why this matters:**\n- Promise callbacks always run before timers, even if the timer is set to 0ms.\n- Microtasks can block the event loop if they recursively queue themselves, preventing macrotasks (including UI updates) from ever running.\n- Understanding the difference helps in debugging race conditions and ensuring proper ordering of async operations.\n\n**Interview tip:** Be ready to trace complex async sequences with nested promises, timeouts, and process.nextTick. Also, know that in browsers, UI rendering is a macrotask, so heavy microtask processing can delay rendering and make the page unresponsive.",
    code: "// Basic priority demonstration\nsetTimeout(() => console.log('macrotask'), 0);\nPromise.resolve().then(() => console.log('microtask 1'));\nPromise.resolve().then(() => console.log('microtask 2'));\nconsole.log('sync');\n// Output: sync, microtask 1, microtask 2, macrotask\n\n// Microtask queue is emptied before next macrotask\nsetTimeout(() => {\n  console.log('timeout 1');\n  Promise.resolve().then(() => console.log('microtask from timeout'));\n}, 0);\nsetTimeout(() => console.log('timeout 2'), 0);\nPromise.resolve().then(() => console.log('microtask initial'));\n// Output: microtask initial, timeout 1, microtask from timeout, timeout 2\n\n// Microtask that queues another microtask\nfunction recursiveMicrotask(count) {\n  if (count <= 0) return;\n  queueMicrotask(() => {\n    console.log(`microtask ${count}`);\n    recursiveMicrotask(count - 1);\n  });\n}\nrecursiveMicrotask(5);\nsetTimeout(() => console.log('timeout'), 0);\n// Output: microtask 5,4,3,2,1, then timeout\n// All microtasks run before any macrotask.\n\n// Danger: infinite microtask loop (blocks the page)\nfunction infiniteLoop() {\n  Promise.resolve().then(() => {\n    console.log('loop');\n    infiniteLoop(); // never gives chance for macrotasks (like UI update)\n  });\n}\n// infiniteLoop(); // NEVER RUN – will freeze the tab\n\n// Real‑world: ensuring a callback runs after all microtasks\nfunction afterMicrotasks(cb) {\n  Promise.resolve().then(cb); // cb will run after all existing microtasks\n  // but before any new macrotask\n}\n\n// Node.js specific: process.nextTick vs Promise\nif (typeof process !== 'undefined') {\n  process.nextTick(() => console.log('nextTick'));\n  Promise.resolve().then(() => console.log('promise'));\n  setTimeout(() => console.log('timeout'), 0);\n  // Output: nextTick, promise, timeout (nextTick is technically a microtask with higher priority)\n}",
  },
  {
    id: "concept-this",
    type: "concept",
    topic: "JavaScript Core",
    title: "this keyword",
    prompt:
      "How is the 'this' keyword determined in JavaScript? Explain the four binding rules and their precedence.",
    expected:
      "'this' depends on how a function is called, not where it's defined. The four rules are: new binding, explicit binding (call/apply/bind), implicit binding (method call), and default binding (global/undefined in strict mode).",
    keywords: [
      "this",
      "binding",
      "call",
      "apply",
      "bind",
      "new",
      "execution context",
    ],
    explanation:
      "The `this` keyword is one of the most confusing concepts in JavaScript because its value is determined at call‑time, not definition‑time. The binding follows a set of rules in a specific precedence order.\n\n**The four binding rules (from highest to lowest precedence):**\n\n1. **New binding** – When a function is called with the `new` keyword, `this` is bound to the newly created object.\n   - Precedence: highest.\n\n2. **Explicit binding** – Using `call`, `apply`, or `bind` to explicitly set `this`.\n   - `fn.call(obj, arg1, arg2)` – invokes immediately, arguments passed individually.\n   - `fn.apply(obj, [args])` – invokes immediately, arguments as array.\n   - `fn.bind(obj)` – returns a new function with `this` permanently bound.\n   - Precedence: second highest.\n\n3. **Implicit binding** – When a function is called as a method of an object (e.g., `obj.method()`), `this` is bound to that object.\n   - If the method is detached from the object (e.g., `const method = obj.method; method()`), the binding is lost and falls back to default.\n   - Precedence: third.\n\n4. **Default binding** – When none of the above apply, `this` is bound to the global object (`window` in browsers, `global` in Node.js) in non‑strict mode, or `undefined` in strict mode.\n\n**Arrow functions** do not have their own `this` binding; they inherit `this` from their lexical (enclosing) scope. This makes them useful for callbacks but unsuitable for methods that need dynamic `this`.\n\n**Common pitfalls:**\n- Losing `this` when passing a method as a callback (use `bind` or arrow function).\n- Inner functions inside a method defaulting to global `this` (use arrow function or `const self = this`).\n- Event handlers: in DOM events, `this` refers to the element that received the event.\n\n**Interview tip:** Be prepared to determine `this` in complex scenarios: nested objects, event handlers, class methods, and strict vs non‑strict mode. Also know that `this` in class methods is not automatically bound – you need to bind them in the constructor or use arrow class fields.",
    code: "// Default binding (non‑strict mode)\nfunction showThis() {\n  console.log(this); // window/global\n}\nshowThis();\n\n// Strict mode default binding\nfunction strictShow() {\n  'use strict';\n  console.log(this); // undefined\n}\nstrictShow();\n\n// Implicit binding\nconst obj = {\n  name: 'Alice',\n  greet() {\n    console.log(this.name);\n  }\n};\nobj.greet(); // 'Alice' – this = obj\n\n// Lost implicit binding\nconst detached = obj.greet;\ndetached(); // undefined (or global) – binding lost\n\n// Explicit binding with call/apply\nfunction introduce(age) {\n  console.log(`${this.name} is ${age} years old`);\n}\nconst person = { name: 'Bob' };\nintroduce.call(person, 30);   // Bob is 30\nintroduce.apply(person, [31]); // Bob is 31\n\n// Explicit binding with bind\nconst boundIntroduce = introduce.bind(person, 32);\nboundIntroduce(); // Bob is 32\n\n// New binding\nfunction Car(model) {\n  this.model = model;\n}\nconst tesla = new Car('Model S');\nconsole.log(tesla.model); // 'Model S' – this = new object\n\n// Precedence example: new vs explicit\nfunction Foo() {\n  console.log(this);\n}\nconst boundFoo = Foo.bind({ x: 1 });\nnew boundFoo(); // logs the new object (not {x:1}) – new binding wins\n\n// Arrow functions – lexical this\nconst arrowObj = {\n  name: 'Charlie',\n  regular: function() {\n    setTimeout(function() {\n      console.log(this.name); // undefined (global or window)\n    }, 0);\n  },\n  arrow: function() {\n    setTimeout(() => {\n      console.log(this.name); // 'Charlie' – arrow inherits this from arrow method's scope\n    }, 0);\n  }\n};\narrowObj.regular();\narrowObj.arrow();\n\n// Class methods (not auto‑bound)\nclass Button {\n  constructor(label) { this.label = label; }\n  handleClick() { console.log(this.label); }\n}\nconst btn = new Button('Submit');\nconst clickHandler = btn.handleClick;\nclickHandler(); // undefined – 'this' lost\n// Fix: bind in constructor or use arrow class field\nclass FixedButton {\n  constructor(label) { this.label = label; this.handleClick = this.handleClick.bind(this); }\n  handleClick() { console.log(this.label); }\n}\n\n// DOM event handler (browser)\n// <button id=\"myBtn\">Click</button>\n// document.getElementById('myBtn').addEventListener('click', function() {\n//   console.log(this); // the button element\n// });",
  },
  {
    id: "concept-arrow-this",
    type: "concept",
    topic: "JavaScript Core",
    title: "Arrow vs Normal Function (this binding)",
    prompt:
      "How does 'this' binding differ between arrow functions and regular functions? When should you use each?",
    expected:
      "Arrow functions do not have their own 'this'; they inherit 'this' from their lexical (enclosing) scope. Regular functions determine 'this' based on how they are called (call site). Use arrow functions for callbacks and when you want to preserve the surrounding 'this'; use regular functions for methods that need their own dynamic 'this'.",
    keywords: ["arrow function", "this", "lexical scope", "callback", "method"],
    explanation:
      "Arrow functions (introduced in ES6) behave differently from regular functions in several ways, with `this` binding being the most important distinction.\n\n**Arrow function `this` behaviour:**\n- Arrow functions do not have their own `this` value. They capture the `this` value from the surrounding (lexical) scope at the time they are defined.\n- This `this` cannot be changed, even with `call`, `apply`, or `bind` (those methods are ignored for `this`, though they still pass arguments).\n- Arrow functions also do not have their own `arguments` object, `super`, or `new.target`. They cannot be used as constructors (cannot be called with `new`).\n\n**Regular function `this` behaviour:**\n- Regular functions have their own `this` that is determined by the call site (the four binding rules).\n- They can be used as constructors with `new`.\n- They have an `arguments` object (though rest parameters are preferred).\n\n**When to use arrow functions:**\n- As callbacks that need to preserve the outer `this` (e.g., `setTimeout`, `addEventListener`, `Promise.then`, array methods like `map`/`filter`).\n- In class fields to auto‑bind methods (experimental but common).\n- For functional programming where lexical scope is desired.\n\n**When to use regular functions:**\n- Object methods that need to access the object via `this` (unless you want lexical binding).\n- Constructor functions (arrow functions cannot be constructors).\n- Functions that need the dynamic `this` (e.g., event handlers that need the DOM element as `this`).\n- Functions that need the `arguments` object (though rest parameters can replace it).\n\n**Interview tip:** Be ready to explain the difference with examples and why arrow functions are not suitable for object methods when you need to access `this` dynamically. Also know that arrow functions are not a drop‑in replacement for all functions; they serve a different purpose.",
    code: "// Lexical this – arrow captures from enclosing scope\nconst obj = {\n  name: 'Alice',\n  greetRegular: function() {\n    setTimeout(function() {\n      console.log(this.name); // undefined (regular function, this = global)\n    }, 0);\n  },\n  greetArrow: function() {\n    setTimeout(() => {\n      console.log(this.name); // 'Alice' (arrow captures this from greetArrow's this)\n    }, 0);\n  }\n};\nobj.greetRegular();\nobj.greetArrow();\n\n// Arrow function as object method (not recommended)\nconst counter = {\n  count: 0,\n  increment: () => {\n    this.count++; // `this` is not the counter object! (lexical from global)\n  }\n};\ncounter.increment();\nconsole.log(counter.count); // 0 – not changed\n\n// Regular function method works\nconst counter2 = {\n  count: 0,\n  increment() {\n    this.count++;\n  }\n};\ncounter2.increment();\nconsole.log(counter2.count); // 1\n\n// Arrow function in class field (auto‑bind)\nclass Button {\n  constructor(label) { this.label = label; }\n  // Regular method (needs binding or arrow)\n  handleClickRegular() { console.log(this.label); }\n  // Arrow class field – automatically bound\n  handleClickArrow = () => { console.log(this.label); };\n}\nconst btn = new Button('Click');\nconst detached = btn.handleClickArrow;\ndetached(); // 'Click' – arrow captures instance this\n// const detachedRegular = btn.handleClickRegular; detachedRegular(); // undefined\n\n// Arrow functions cannot be constructors\nconst Foo = () => {};\n// new Foo(); // TypeError: Foo is not a constructor\n\n// Arrow functions ignore call/apply/bind for this\nconst arrow = () => console.log(this);\nconst context = { name: 'test' };\narrow.call(context); // still logs the lexical this (e.g., window), not {name:'test'}\n\n// Use case: array callbacks\nconst numbers = [1,2,3];\nconst doubled = numbers.map(n => n * 2); // perfect use for arrow\n\n// Use case: event handler needing dynamic this\n// document.getElementById('btn').addEventListener('click', function() {\n//   this.style.display = 'none'; // regular function – this = element\n// });\n// With arrow, you'd need event.target\n// document.getElementById('btn').addEventListener('click', (e) => {\n//   e.target.style.display = 'none'; // works, but different\n// });",
  },
  {
    id: "concept-debounce",
    type: "concept",
    topic: "JavaScript Core",
    title: "Debouncing",
    prompt:
      "What is debouncing? Implement a debounce function and explain its use cases.",
    expected:
      "Debouncing ensures a function is called only after a specified delay has passed since its last invocation, grouping rapid successive calls into a single execution. It is used to optimise performance for events like input typing, window resizing, or scroll events.",
    keywords: [
      "debounce",
      "delay",
      "performance",
      "event handler",
      "input",
      "setTimeout",
    ],
    explanation:
      "Debouncing is a programming technique used to limit the rate at which a function is executed. When a debounced function is called multiple times in rapid succession, only the last call (or the first, depending on configuration) is executed after a specified quiet period. This prevents unnecessary expensive operations (like API calls, DOM updates, or heavy calculations) from being performed too frequently.\n\n**How it works:**\n- Each time the debounced function is invoked, the previous timer is cancelled (`clearTimeout`) and a new timer is started.\n- The actual function execution is delayed until the timer expires without any new calls.\n\n**Leading vs trailing debounce:**\n- **Trailing (default):** Executes after the last call in a burst (good for search inputs).\n- **Leading:** Executes immediately on the first call, then ignores subsequent calls until the delay passes (good for button clicks to prevent double submission).\n- **Combined:** Executes both at the beginning and end of a burst.\n\n**Use cases:**\n- Search box autocomplete – wait until user stops typing before sending API request.\n- Window resize event – recalculate layout only after resizing finishes.\n- Scroll event – load more content only after scrolling stops.\n- Form validation – validate after user stops typing.\n- Save drafts – auto‑save after user stops editing.\n\n**Implementing a debounce function:**\nA good debounce implementation should preserve `this` context, accept arguments, and optionally support leading edge and cancellation.\n\n**Interview tip:** Be prepared to write a debounce function from scratch, explain the difference between debouncing and throttling, and discuss leading/trailing options. Also know how to use it with React hooks (`useCallback` to preserve identity).",
    code: "// Basic debounce (trailing edge)\nfunction debounce(fn, delay) {\n  let timerId;\n  return function(...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}\n\n// Usage: search input\nconst searchInput = document.getElementById('search');\nconst handleSearch = (event) => {\n  console.log('Searching for:', event.target.value);\n  // API call\n};\nsearchInput.addEventListener('input', debounce(handleSearch, 300));\n\n// Advanced debounce with leading/trailing options\nfunction debounceAdvanced(fn, delay, option = { leading: false, trailing: true }) {\n  let timerId;\n  let lastArgs;\n  let lastThis;\n  let lastCallTime;\n\n  function invoke() {\n    fn.apply(lastThis, lastArgs);\n    lastArgs = lastThis = null;\n  }\n\n  function trailingCall() {\n    timerId = null;\n    if (option.trailing && lastArgs) {\n      invoke();\n    }\n  }\n\n  return function(...args) {\n    lastArgs = args;\n    lastThis = this;\n    const now = Date.now();\n    const isInvoked = !timerId && option.leading;\n\n    clearTimeout(timerId);\n    timerId = setTimeout(trailingCall, delay);\n\n    if (isInvoked) {\n      invoke();\n    }\n  };\n}\n\n// Leading debounce – executes immediately, then ignores for delay\nconst debounceLeading = debounceAdvanced(expensiveFn, 300, { leading: true, trailing: false });\n// Good for button click to prevent double submission\n\n// Debounce with cancel method\nfunction debounceWithCancel(fn, delay) {\n  let timerId;\n  const debounced = function(...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn.apply(this, args), delay);\n  };\n  debounced.cancel = () => {\n    clearTimeout(timerId);\n    timerId = null;\n  };\n  return debounced;\n}\n\n// React hook example\nfunction useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = React.useState(value);\n  React.useEffect(() => {\n    const handler = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debouncedValue;\n}\n// Usage: const debouncedSearchTerm = useDebounce(searchTerm, 500);\n\n// Real‑world: window resize with debounce\nconst handleResize = debounce(() => {\n  console.log('Resized to:', window.innerWidth);\n}, 200);\nwindow.addEventListener('resize', handleResize);\n\n// Debounce vs throttle – debounce waits for pause, throttle ensures at most once per interval",
  },
  {
    id: "concept-throttle",
    type: "concept",
    topic: "JavaScript Core",
    title: "Throttling",
    prompt:
      "What is throttling? Implement a throttle function and explain when to use it instead of debouncing.",
    expected:
      "Throttling limits function execution to at most once per specified time interval, ensuring regular execution regardless of how many times it's called. Unlike debouncing (which waits for a pause), throttling guarantees execution at fixed intervals.",
    keywords: ["throttle", "rate limit", "performance", "scroll", "interval"],
    explanation:
      "Throttling is a technique that limits the rate at which a function can be called. It ensures that a function executes at most once in a given time window, no matter how many times it is invoked. This is particularly useful for events that fire continuously, such as scrolling, mouse movement, or resizing, where you want to handle the event at a controlled frequency without overwhelming the browser.\n\n**How throttling works:**\n- When the throttled function is called, it checks if enough time has elapsed since the last execution.\n- If the elapsed time is greater than or equal to the specified delay, it executes the function immediately and updates the last execution timestamp.\n- If not enough time has passed, the call is ignored (or optionally queued for trailing edge execution).\n\n**Throttling vs debouncing:**\n- **Debouncing** delays execution until after a burst of calls stops. Good for search inputs (wait for user to stop typing).\n- **Throttling** ensures regular execution during continuous calls. Good for scroll events (update progress bar every 200ms).\n\n**Variants:**\n- **Leading throttle (immediate):** Executes immediately on the first call, then ignores subsequent calls until the delay passes.\n- **Trailing throttle:** Waits for the delay after the last call (similar to debounce but ensures at least one execution).\n- **Both:** Executes at the leading edge and again after the trailing delay if there were calls.\n\n**Use cases:**\n- Scroll event handlers (infinite scroll, parallax effects).\n- Resize event handlers (recap layout at intervals).\n- Mouse move tracking (update coordinates for games or tooltips).\n- Rate limiting API calls from user interactions.\n- Progress updates during file upload or animation.\n\n**Implementing a throttle function:**\nA robust throttle should preserve `this` context, accept arguments, and support leading/trailing options. The simplest implementation uses timestamps or `setTimeout` with flags.\n\n**Interview tip:** Be ready to write a throttle function from scratch, explain the difference between leading and trailing, and discuss scenarios where throttle is preferable over debounce (e.g., scrolling, game loops). Also be aware of `requestAnimationFrame` as a throttling alternative for animations.",
    code: "// Basic throttle (timestamp – leading edge)\nfunction throttle(fn, delay) {\n  let lastCall = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastCall >= delay) {\n      lastCall = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\n// Usage: scroll event\nwindow.addEventListener('scroll', throttle(() => {\n  console.log('Scroll position:', window.scrollY);\n}, 200));\n\n// Throttle with trailing edge (setTimeout)\nfunction throttleTrailing(fn, delay) {\n  let timerId;\n  let lastArgs;\n  let lastThis;\n  return function(...args) {\n    lastArgs = args;\n    lastThis = this;\n    if (timerId) return;\n    timerId = setTimeout(() => {\n      fn.apply(lastThis, lastArgs);\n      timerId = null;\n    }, delay);\n  };\n}\n\n// Full throttle with leading and trailing options\nfunction throttleFull(fn, delay, option = { leading: true, trailing: true }) {\n  let lastCall = 0;\n  let timerId;\n  let lastArgs;\n  let lastThis;\n\n  function invoke() {\n    fn.apply(lastThis, lastArgs);\n    lastCall = Date.now();\n    lastArgs = lastThis = null;\n  }\n\n  function trailingCall() {\n    timerId = null;\n    if (option.trailing && lastArgs) {\n      invoke();\n    }\n  }\n\n  return function(...args) {\n    lastArgs = args;\n    lastThis = this;\n    const now = Date.now();\n    const remaining = delay - (now - lastCall);\n\n    if (remaining <= 0 || remaining > delay) {\n      if (timerId) {\n        clearTimeout(timerId);\n        timerId = null;\n      }\n      if (option.leading) {\n        invoke();\n      } else if (option.trailing && !timerId) {\n        timerId = setTimeout(trailingCall, delay);\n      }\n    } else if (option.trailing && !timerId) {\n      timerId = setTimeout(trailingCall, remaining);\n    }\n  };\n}\n\n// Real‑world example: infinite scroll with throttle\nlet isLoading = false;\nconst loadMore = throttle(() => {\n  if (isLoading) return;\n  isLoading = true;\n  fetchNextPage().finally(() => { isLoading = false; });\n}, 500);\nwindow.addEventListener('scroll', () => {\n  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {\n    loadMore();\n  }\n});\n\n// Throttle vs debounce demonstration\nconst log = (msg) => console.log(msg);\nconst throttledLog = throttle(log, 1000);\nconst debouncedLog = debounce(log, 1000);\n\n// Simulate rapid calls\nfor (let i = 0; i < 10; i++) {\n  throttledLog('throttle'); // executes immediately on first call, then once per second\n  debouncedLog('debounce'); // only executes after the last call\n}\n\n// React hook for throttle\nfunction useThrottle(value, delay) {\n  const [throttledValue, setThrottledValue] = React.useState(value);\n  const lastRun = React.useRef(Date.now());\n  React.useEffect(() => {\n    const handler = setTimeout(() => {\n      if (Date.now() - lastRun.current >= delay) {\n        setThrottledValue(value);\n        lastRun.current = Date.now();\n      }\n    }, delay - (Date.now() - lastRun.current));\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return throttledValue;\n}\n\n// Animation throttle with requestAnimationFrame (better for UI)\nfunction rafThrottle(fn) {\n  let rafId = null;\n  return function(...args) {\n    if (rafId) return;\n    rafId = requestAnimationFrame(() => {\n      fn.apply(this, args);\n      rafId = null;\n    });\n  };\n}\n// Use for smooth scrolling/animations\nwindow.addEventListener('scroll', rafThrottle(() => {\n  // update UI based on scroll position\n}));",
  },
  {
    id: "concept-call-apply-bind",
    type: "concept",
    topic: "JavaScript Core",
    title: "call vs apply vs bind",
    prompt:
      "Explain the differences between call, apply, and bind. Provide examples of when to use each.",
    expected:
      "call and apply invoke a function immediately with a specified 'this' context; call accepts arguments individually, apply accepts an array. bind returns a new function with a bound 'this' context, which can be called later.",
    keywords: [
      "call",
      "apply",
      "bind",
      "this",
      "function borrowing",
      "partial application",
    ],
    explanation:
      "`call`, `apply`, and `bind` are methods available on all JavaScript functions that allow you to control the `this` binding explicitly. They are essential for function borrowing, method chaining, and partial application.\n\n**`call(thisArg, arg1, arg2, ...)`**\n- Invokes the function immediately with the specified `this` value and individual arguments.\n- Use when you know the exact number of arguments to pass.\n\n**`apply(thisArg, [argsArray])`**\n- Invokes the function immediately with the specified `this` value and arguments provided as an array (or array‑like object).\n- Use when arguments are already in an array or when the number of arguments is variable.\n\n**`bind(thisArg, arg1, arg2, ...)`**\n- Returns a **new function** with the specified `this` value and optional preset arguments (partial application).\n- The original function is not invoked; the bound function can be called later.\n- Once bound, the `this` cannot be changed (even with call/apply).\n\n**Key differences:**\n| Method | Invocation | Arguments | Returns | Use case |\n|--------|-----------|-----------|---------|----------|\n| call | Immediate | Individual | Result of function | Borrowing methods with known args |\n| apply | Immediate | Array | Result of function | Borrowing with array of args |\n| bind | Delayed | Individual (partial) | New function | Event handlers, currying, preserving this |\n\n**Common use cases:**\n- **Borrowing methods:** `Array.prototype.slice.call(arguments)` to convert `arguments` object to array.\n- **Constructor chaining:** Call parent constructor from child constructor.\n- **Event handlers:** Bind `this` in class methods to maintain correct context.\n- **Partial application / currying:** Pre‑fill arguments using `bind`.\n- **Math.max with arrays:** `Math.max.apply(null, arr)`.\n\n**Interview tip:** Be prepared to implement a `bind` polyfill and explain how `call`/`apply` differ from `bind`. Also know that arrow functions cannot be rebound – they capture `this` lexically.",
    code: "// Basic examples\nfunction greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\nconst person = { name: 'Alice' };\n\nconsole.log(greet.call(person, 'Hello', '!')); // Hello, Alice!\nconsole.log(greet.apply(person, ['Hi', '?']));  // Hi, Alice?\nconst boundGreet = greet.bind(person, 'Hey');\nconsole.log(boundGreet('.')); // Hey, Alice.\n\n// Borrowing array methods\nfunction sumArguments() {\n  // arguments is array-like, not a real array\n  const args = Array.prototype.slice.call(arguments);\n  return args.reduce((a,b) => a+b, 0);\n}\nconsole.log(sumArguments(1,2,3,4)); // 10\n\n// Using apply with Math.max\nconst numbers = [5, 1, 9, 3];\nconst max = Math.max.apply(null, numbers); // 9\n// With spread operator (modern alternative)\nconst maxSpread = Math.max(...numbers);\n\n// Constructor chaining\nfunction Animal(name) {\n  this.name = name;\n}\nfunction Dog(name, breed) {\n  Animal.call(this, name); // call super constructor\n  this.breed = breed;\n}\nconst rex = new Dog('Rex', 'Labrador');\nconsole.log(rex.name); // Rex\n\n// Event handler binding (React/class components)\nclass Button {\n  constructor(label) {\n    this.label = label;\n    // Without bind, handleClick would lose this when used as callback\n    this.handleClick = this.handleClick.bind(this);\n  }\n  handleClick() {\n    console.log(this.label);\n  }\n}\n\n// Partial application with bind\nfunction multiply(a, b, c) {\n  return a * b * c;\n}\nconst double = multiply.bind(null, 2); // presets first argument to 2\nconsole.log(double(3, 4)); // 2 * 3 * 4 = 24\nconst doubleAndTriple = multiply.bind(null, 2, 3);\nconsole.log(doubleAndTriple(5)); // 2 * 3 * 5 = 30\n\n// Polyfill for bind (simplified)\nif (!Function.prototype.bind) {\n  Function.prototype.bind = function(context, ...boundArgs) {\n    const fn = this;\n    return function(...callArgs) {\n      return fn.apply(context, [...boundArgs, ...callArgs]);\n    };\n  };\n}\n\n// bind with setTimeout\nfunction Timer() {\n  this.seconds = 0;\n  setInterval(function() {\n    this.seconds++; // this = window (or undefined in strict mode)\n  }.bind(this), 1000); // bind fixes it\n  // Alternatively, use arrow function: setInterval(() => { this.seconds++; }, 1000);\n}\n\n// Call vs apply performance note: call is slightly faster because it doesn't need to unpack an array.\n// But the difference is negligible in practice.\n\n// Using bind for once: ensure a function runs only once\nfunction once(fn) {\n  let executed = false;\n  return function(...args) {\n    if (!executed) {\n      executed = true;\n      return fn.apply(this, args);\n    }\n  };\n}\nconst initialize = once(() => console.log('Initialized'));\ninitialize(); // logs\ninitialize(); // does nothing",
  },
  {
    id: "concept-shallow-deep-copy",
    type: "concept",
    topic: "JavaScript Core",
    title: "Shallow vs Deep Copy",
    prompt:
      "What is the difference between shallow copy and deep copy? How do you create each in JavaScript?",
    expected:
      "Shallow copy copies only the top‑level properties; nested objects and arrays are shared by reference. Deep copy recursively copies all nested structures, creating a completely independent copy. Use spread operator or Object.assign for shallow copy; JSON methods, structuredClone, or Lodash for deep copy.",
    keywords: [
      "shallow copy",
      "deep copy",
      "reference",
      "clone",
      "structuredClone",
      "JSON.parse",
      "Object.assign",
    ],
    explanation:
      "In JavaScript, objects and arrays are stored by reference. When you assign an object to a new variable, you copy the reference, not the actual object. Copying becomes more nuanced when dealing with nested structures.\n\n**Shallow copy:**\n- Creates a new object/array at the top level.\n- For properties that are primitives, copies the actual values.\n- For properties that are objects/arrays, copies the **references** to those nested objects.\n- Mutating a nested object in the copy will also mutate the original (and vice versa).\n- Methods: spread operator (`{...obj}`), `Object.assign()`, `Array.slice()`, `Array.concat()`.\n\n**Deep copy:**\n- Recursively copies every level of nested objects and arrays.\n- The copy is completely independent; changes in the copy do not affect the original.\n- More expensive in terms of performance and memory.\n- Methods:\n  - `JSON.parse(JSON.stringify(obj))` – limited (fails with functions, `undefined`, `Symbol`, `Infinity`, `Date`, `RegExp`, circular references).\n  - `structuredClone(obj)` – modern, supports `Date`, `RegExp`, `Map`, `Set`, `ArrayBuffer`, circular references, but not functions or DOM nodes.\n  - `_.cloneDeep(obj)` from Lodash – robust, handles many edge cases.\n  - Custom recursive function – full control but error‑prone.\n\n**Important edge cases:**\n- `Date` objects: JSON method converts to string; `structuredClone` preserves as Date.\n- `RegExp`: JSON method becomes empty object; `structuredClone` preserves.\n- `undefined`, `Function`, `Symbol`: JSON method omits them; `structuredClone` throws for functions.\n- Circular references: JSON method throws; `structuredClone` handles them.\n\n**Interview tip:** Be ready to write a simple deep clone function, discuss limitations of `JSON.parse(JSON.stringify)`, and explain when to use shallow vs deep copy (performance vs independence). Also know about the new `structuredClone` global function (available in modern browsers and Node.js 17+).",
    code: "// Shallow copy examples\nconst original = {\n  name: 'Alice',\n  age: 30,\n  address: { city: 'New York', zip: 10001 }\n};\nconst shallowSpread = { ...original };\nconst shallowAssign = Object.assign({}, original);\n\nshallowSpread.address.city = 'Boston';\nconsole.log(original.address.city); // 'Boston' – nested object mutated!\nshallowSpread.name = 'Bob';\nconsole.log(original.name); // 'Alice' – top‑level primitive unchanged\n\n// Array shallow copy\nconst arr = [1, 2, [3, 4]];\nconst shallowArr = [...arr];\nshallowArr[2][0] = 99;\nconsole.log(arr[2][0]); // 99 – nested array shared\n\n// Deep copy with JSON (limited)\nconst jsonDeep = JSON.parse(JSON.stringify(original));\njsonDeep.address.city = 'Chicago';\nconsole.log(original.address.city); // 'Boston' – unchanged\nconsole.log(jsonDeep.address.city); // 'Chicago'\n// Limitations:\nconst withDate = { date: new Date(), fn: () => {}, undef: undefined };\nconst jsonCopy = JSON.parse(JSON.stringify(withDate));\nconsole.log(jsonCopy.date); // string (ISO), not a Date object\nconsole.log(jsonCopy.fn); // undefined (function omitted)\nconsole.log(jsonCopy.undef); // undefined (omitted)\n\n// Deep copy with structuredClone (modern)\nconst structuredCopy = structuredClone(original);\nstructuredCopy.address.city = 'Miami';\nconsole.log(original.address.city); // 'Boston'\n// Works with Date, RegExp, Map, Set, circular refs\nconst circular = { self: null };\ncircular.self = circular;\nconst circularCopy = structuredClone(circular); // works\n// structuredClone throws for functions, DOM nodes, some others\n\n// Custom deep clone function (basic)\nfunction deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (obj instanceof Date) return new Date(obj);\n  if (obj instanceof RegExp) return new RegExp(obj);\n  if (Array.isArray(obj)) return obj.map(item => deepClone(item));\n  const cloned = {};\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      cloned[key] = deepClone(obj[key]);\n    }\n  }\n  return cloned;\n}\n\n// Using Lodash (if available)\n// const _ = require('lodash');\n// const lodashDeep = _.cloneDeep(original);\n\n// Performance considerations\n// Shallow copy is O(n) for top‑level properties; deep copy is O(deep size).\n// For large objects, avoid unnecessary deep copies.\n\n// When to use shallow copy:\n// - Immutable updates (React state): setState(prev => ({ ...prev, updatedProp }))\n// - Performance‑sensitive code where nested objects are not mutated\n// - When you deliberately want to share references\n\n// When to use deep copy:\n// - Saving application state for undo/redo\n// - Cloning data for independent modification (e.g., form editing with cancel)\n// - Passing data to worker threads (structuredClone)\n// - Working with serialisable data (JSON)\n\n// Beware of circular references in custom clones\nfunction safeDeepClone(obj, seen = new WeakMap()) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (seen.has(obj)) return seen.get(obj);\n  const clone = Array.isArray(obj) ? [] : {};\n  seen.set(obj, clone);\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      clone[key] = safeDeepClone(obj[key], seen);\n    }\n  }\n  return clone;\n}",
  },
  {
    id: "concept-memoization",
    type: "concept",
    topic: "JavaScript Core",
    title: "Memoization",
    prompt:
      "What is memoization? Implement a memoize function and explain when it's beneficial.",
    expected:
      "Memoization is an optimisation technique that caches the results of expensive function calls based on their arguments, returning cached results for repeated calls with the same inputs. It trades memory for speed.",
    keywords: [
      "memoization",
      "cache",
      "performance",
      "dynamic programming",
      "pure function",
    ],
    explanation:
      "Memoization is a specific form of caching where the return value of a function is stored in a cache keyed by its arguments. When the function is called again with the same arguments, the cached value is returned instead of recomputing the result. This is particularly effective for pure functions (deterministic, no side effects) that are called repeatedly with the same inputs.\n\n**How it works:**\n- The memoized function maintains a cache (typically an object or Map).\n- Before executing the function logic, it serialises the arguments into a cache key.\n- If the key exists in cache, return the cached value.\n- Otherwise, compute the result, store it in cache, and return it.\n\n**When to use memoization:**\n- Expensive computational functions (e.g., Fibonacci, factorial, matrix operations).\n- Recursive algorithms with overlapping subproblems (dynamic programming).\n- API calls that are idempotent and frequently repeated with the same parameters.\n- React components: `React.memo`, `useMemo`, `useCallback`.\n- Data transformation functions in selectors (Redux reselect).\n\n**When NOT to use memoization:**\n- Functions with side effects (e.g., logging, DOM manipulation).\n- Functions that depend on external state that can change.\n- Functions called with highly variable arguments (low cache hit rate).\n- Memory‑constrained environments (cache can grow large).\n\n**Limitations and considerations:**\n- Cache size can grow indefinitely – implement LRU (least recently used) or TTL (time to live).\n- Argument serialisation can be expensive; use `Map` with object keys via `WeakMap` for object arguments.\n- Not suitable for methods that rely on `this` binding (need to preserve context).\n\n**Interview tip:** Be ready to implement a memoization function with support for multiple arguments and object arguments. Also discuss trade‑offs (memory vs time) and real‑world usage in React and Redux.",
    code: "// Basic memoize (single argument)\nfunction memoizeSimple(fn) {\n  const cache = {};\n  return function(arg) {\n    if (cache[arg] !== undefined) {\n      console.log('cache hit', arg);\n      return cache[arg];\n    }\n    console.log('cache miss', arg);\n    const result = fn(arg);\n    cache[arg] = result;\n    return result;\n  };\n}\n\n// Expensive function: Fibonacci (naive recursive)\nconst fib = memoizeSimple((n) => {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n});\nconsole.log(fib(40)); // fast due to caching\n\n// Memoize with multiple arguments using JSON.stringify\nfunction memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache[key] !== undefined) return cache[key];\n    const result = fn.apply(this, args);\n    cache[key] = result;\n    return result;\n  };\n}\n\n// Using Map for better performance and any key type\nfunction memoizeMap(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\n// Memoize with WeakMap for object arguments (avoids memory leaks)\nfunction memoizeWeak(fn) {\n  const cache = new WeakMap(); // keys must be objects\n  return function(obj) {\n    if (cache.has(obj)) return cache.get(obj);\n    const result = fn(obj);\n    cache.set(obj, result);\n    return result;\n  };\n}\n\n// LRU cache implementation (least recently used, max size)\nclass LRUMemoize {\n  constructor(fn, maxSize = 100) {\n    this.fn = fn;\n    this.cache = new Map();\n    this.maxSize = maxSize;\n  }\n  get(...args) {\n    const key = JSON.stringify(args);\n    if (this.cache.has(key)) {\n      // move to end (most recent)\n      const value = this.cache.get(key);\n      this.cache.delete(key);\n      this.cache.set(key, value);\n      return value;\n    }\n    const result = this.fn(...args);\n    this.cache.set(key, result);\n    if (this.cache.size > this.maxSize) {\n      const firstKey = this.cache.keys().next().value;\n      this.cache.delete(firstKey);\n    }\n    return result;\n  }\n}\n\n// Real‑world: React useMemo (conceptual)\nfunction useMemo(callback, deps) {\n  const [cachedValue, setCachedValue] = useState(null);\n  const [cachedDeps, setCachedDeps] = useState([]);\n  if (!deps.every((dep, i) => dep === cachedDeps[i])) {\n    setCachedValue(callback());\n    setCachedDeps(deps);\n  }\n  return cachedValue;\n}\n\n// Memoizing async functions\nfunction memoizeAsync(fn) {\n  const cache = new Map();\n  return async function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const promise = fn.apply(this, args);\n    cache.set(key, promise);\n    try {\n      const result = await promise;\n      cache.set(key, result);\n      return result;\n    } catch (err) {\n      cache.delete(key);\n      throw err;\n    }\n  };\n}\n\n// Example: memoized API call\nconst fetchUser = memoizeAsync(async (userId) => {\n  const res = await fetch(`/api/users/${userId}`);\n  return res.json();\n});\n\n// Clearing cache\nfunction memoizeWithClear(fn) {\n  const cache = new Map();\n  const memoized = (...args) => {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(...args);\n    cache.set(key, result);\n    return result;\n  };\n  memoized.clear = () => cache.clear();\n  memoized.remove = (...args) => cache.delete(JSON.stringify(args));\n  return memoized;\n}\n\n// Performance comparison (conceptual)\n// Without memoization: O(2^n) for Fibonacci\n// With memoization: O(n)\n// For a function that takes 10ms to compute, 1000 calls with 10 unique args:\n// Without: 1000 * 10ms = 10 seconds\n// With: 10 * 10ms + 990 cache hits (~0ms) = 100ms",
  },
  {
    id: "concept-tdz",
    type: "concept",
    topic: "JavaScript Core",
    title: "Temporal Dead Zone",
    prompt:
      "What is the Temporal Dead Zone (TDZ) in JavaScript? How does it affect let and const variables?",
    expected:
      "The Temporal Dead Zone is the period between entering a scope and the actual declaration of a let or const variable, during which accessing the variable throws a ReferenceError. This prevents accessing variables before declaration, unlike var which is hoisted and initialised with undefined.",
    keywords: [
      "TDZ",
      "temporal dead zone",
      "let",
      "const",
      "hoisting",
      "ReferenceError",
    ],
    explanation:
      "The Temporal Dead Zone (TDZ) is a behaviour in JavaScript that applies to variables declared with `let` and `const`. It refers to the time between entering a block scope and the point where the variable is declared. During this period, the variable exists (hoisted) but is not initialised; accessing it results in a `ReferenceError`.\n\n**How it works:**\n- Both `var` and `let`/`const` are hoisted (the declaration is moved to the top of the scope during compilation).\n- For `var`, the variable is initialised with `undefined` at the start of the scope.\n- For `let`/`const`, the variable is **not initialised** until the declaration line is reached in the code execution. The interval from the start of the block to that line is the TDZ.\n\n**Why TDZ exists:**\n- Catches accidental usage of variables before declaration, preventing subtle bugs.\n- Makes code more predictable – you cannot read or write a variable before its declaration.\n- Allows `const` to guarantee that the variable is assigned exactly once (at declaration).\n\n**TDZ in different scopes:**\n- **Block scope:** TDZ starts at the beginning of the block `{` and ends at the declaration.\n- **Function scope:** Similar, but parameters have their own TDZ with default parameters.\n- **Class declarations:** Classes are also subject to TDZ; you cannot use a class before its definition.\n\n**Interview tip:** Be prepared to identify TDZ in code examples, explain why `typeof` is safe for `var` but not for `let`/`const` in TDZ, and know that accessing `let`/`const` variables in their TDZ throws, but accessing properties of an object that is itself in TDZ? No, the object would be undefined. Also understand that TDZ exists for `const` to enforce assignment at declaration.",
    code: "// Basic TDZ example\n{\n  console.log(a); // undefined (var hoisted with undefined)\n  var a = 1;\n}\n{\n  console.log(b); // ReferenceError: Cannot access 'b' before initialization\n  let b = 2;\n}\n{\n  console.log(c); // ReferenceError (same as let)\n  const c = 3;\n}\n\n// TDZ with block scope\nlet x = 'outer';\n{\n  console.log(x); // ReferenceError! Not the outer 'x', because inner 'x' creates TDZ\n  let x = 'inner';\n}\n\n// typeof operator in TDZ (dangerous)\nconsole.log(typeof y); // 'undefined' (var y is hoisted with undefined)\nvar y = 5;\nconsole.log(typeof z); // ReferenceError! z is in TDZ\nlet z = 10;\n\n// TDZ with function parameters and default values\nfunction test(arg = val) {\n  let val = 5; // val is in TDZ when default parameter is evaluated\n  return arg;\n}\ntest(); // ReferenceError: Cannot access 'val' before initialization\n\n// Fix: default parameters can reference previous parameters\nfunction test2(arg = 1, arg2 = arg) {\n  return arg2; // works\n}\n\n// TDZ with class\nconst obj = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization\nclass MyClass {}\n\n// TDZ does NOT apply to var or function declarations\nfunction foo() {\n  console.log(bar); // undefined (var)\n  var bar = 1;\n  console.log(baz); // ReferenceError (let)\n  let baz = 2;\n}\n\n// Temporal Dead Zone for const also prevents reassignment\nconst PI;\nPI = 3.14; // SyntaxError: Missing initializer in const declaration\n// const must be initialised at declaration\n\n// Practical implication: always declare let/const at the top of their scope\nfunction goodPractice() {\n  let result;\n  // code using result later\n  result = compute();\n  return result;\n}\n\n// TDZ with catch parameter (ES2019)\ntry {\n  throw new Error('oops');\n} catch (err) {\n  console.log(err); // works\n  console.log(err2); // ReferenceError if err2 is declared later with let? Actually err2 is not in scope\n}\n\n// TDZ with block and function\nlet func;\n{\n  func = () => console.log(x); // closure captures x, but x is in TDZ\n  let x = 10;\n}\nfunc(); // 10 – works because the function is called after x is initialised\n\n// This is valid because the function is called after TDZ ends.\n// But if we called it before declaration, error:\n{\n  const fn = () => console.log(value); // function defined\n  // console.log(value); // would throw\n  let value = 5;\n  fn(); // 5 – fine\n}",
  },
  {
    id: "concept-currying",
    type: "concept",
    topic: "JavaScript Core",
    title: "Currying",
    prompt:
      "What is currying? Implement a curry function that transforms a function taking multiple arguments into a sequence of functions each taking a single argument.",
    expected:
      "Currying is the transformation of a function that takes multiple arguments into a chain of functions each taking a single argument. It enables partial application and function composition.",
    keywords: [
      "currying",
      "partial application",
      "functional programming",
      "arity",
      "closure",
    ],
    explanation:
      "Currying is a technique in functional programming where a function that accepts multiple arguments is transformed into a series of functions that each accept a single argument. For example, a function `add(a, b, c)` becomes `add(a)(b)(c)`. The curried function returns a new function for each argument until all arguments have been provided, at which point the original function is executed.\n\n**Key concepts:**\n- **Arity:** The number of arguments a function takes. Currying reduces a function of arity N to N nested functions of arity 1.\n- **Partial application:** Closely related but different – partial application fixes some arguments, producing a function of smaller arity. Currying automatically enables partial application.\n- **Closure:** Currying relies on closures to remember previously provided arguments.\n\n**Currying vs Partial Application:**\n- Currying transforms `f(a, b, c)` into `f(a)(b)(c)`. It always produces unary functions.\n- Partial application fixes some arguments, producing a function that takes the remaining arguments. `partial(f, a)` produces `f(a, b, c)` where only `b` and `c` are left.\n- Currying is a specific transformation; partial application can be implemented without currying.\n\n**Implementing a curry function:**\nA robust `curry` function should:\n- Accept a function and optionally the arity (number of arguments).\n- Return a curried version that collects arguments until enough are provided.\n- Preserve `this` context.\n- Allow passing multiple arguments at once (not just one).\n\n**Use cases:**\n- Creating specialised functions from generic ones (e.g., `const double = multiply(2)`).\n- Function composition and pipelining.\n- Reducing repetition in functional code.\n- Libraries like Lodash provide `_.curry`.\n\n**Interview tip:** Be ready to implement `curry` from scratch, explain the difference between currying and partial application, and discuss how currying can improve code reusability. Also note that JavaScript doesn't have built-in currying, but it's easy to implement.",
    code: "// Basic currying implementation (fixed arity)\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    return function(...more) {\n      return curried.apply(this, args.concat(more));\n    };\n  };\n}\n\n// Usage\nfunction add(a, b, c) {\n  return a + b + c;\n}\nconst curriedAdd = curry(add);\nconsole.log(curriedAdd(1)(2)(3)); // 6\nconsole.log(curriedAdd(1, 2)(3)); // 6\nconsole.log(curriedAdd(1)(2, 3)); // 6\n\n// Real example: creating specialised functions\nfunction multiply(a, b) {\n  return a * b;\n}\nconst curriedMultiply = curry(multiply);\nconst double = curriedMultiply(2);\nconst triple = curriedMultiply(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15\n\n// Manual currying without helper\nconst manualCurry = a => b => c => a + b + c;\nconsole.log(manualCurry(1)(2)(3)); // 6\n\n// Currying with placeholders (advanced)\nfunction curryWithPlaceholders(fn) {\n  const placeholders = Symbol('placeholder');\n  return function curried(...args) {\n    const complete = args.length >= fn.length && !args.slice(0, fn.length).includes(placeholders);\n    if (complete) {\n      return fn.apply(this, args);\n    }\n    return function(...more) {\n      const combined = args.map(arg => arg === placeholders && more.length ? more.shift() : arg);\n      return curried.apply(this, combined.concat(more));\n    };\n  };\n}\n\n// ES6 arrow function currying (inline)\nconst log = level => message => console.log(`[${level}] ${message}`);\nconst info = log('INFO');\nconst error = log('ERROR');\ninfo('Application started'); // [INFO] Application started\nerror('Something failed');   // [ERROR] Something failed\n\n// Practical use: configuration functions\nconst makeRequest = baseURL => endpoint => params =>\n  fetch(`${baseURL}${endpoint}?${new URLSearchParams(params)}`);\n\nconst api = makeRequest('https://api.example.com');\nconst usersApi = api('/users');\nusersApi({ limit: 10 }).then(res => res.json());\n\n// Curry with variable arguments (rest parameters)\nfunction curryFlexible(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) {\n      return fn(...args);\n    }\n    return (...more) => curried(...args, ...more);\n  };\n}\n\n// Using bind for partial application (alternative to currying)\nfunction multiply(a, b) { return a * b; }\nconst doubleBind = multiply.bind(null, 2);\nconsole.log(doubleBind(5)); // 10\n\n// Lodash curry (if available)\n// const _ = require('lodash');\n// const curried = _.curry(add);\n\n// Performance note: Currying adds function call overhead.\n// For performance-critical code, use manual partial application or avoid deep currying.\n\n// Real-world: Redux middleware currying pattern\nconst logger = store => next => action => {\n  console.log('dispatching', action);\n  const result = next(action);\n  console.log('next state', store.getState());\n  return result;\n};\n\n// Converting a regular function to curried version dynamically\nfunction toCurried(fn) {\n  const arity = fn.length;\n  return function curried(...args) {\n    if (args.length >= arity) return fn(...args);\n    return (...rest) => curried(...args, ...rest);\n  };\n}\n\n// Example with a function that has default parameters (length doesn't count defaults)\nfunction greet(name, greeting = 'Hello') {\n  return `${greeting}, ${name}`;\n}\nconsole.log(greet.length); // 1 (default parameters are not counted)\n// Currying such a function requires manual arity specification",
  },
  {
    id: "concept-pure-function",
    type: "concept",
    topic: "JavaScript Core",
    title: "Pure Functions",
    prompt:
      "What is a pure function? Why are pure functions important in programming?",
    expected:
      "A pure function always returns the same output for the same input and has no side effects. It does not modify external state or depend on mutable external variables.",
    keywords: [
      "pure function",
      "deterministic",
      "side effect",
      "immutability",
      "functional programming",
    ],
    explanation:
      "A pure function is a fundamental concept in functional programming. It has two defining characteristics:\n\n1. **Deterministic:** Given the same inputs, it always returns the same output. It does not depend on any hidden state or external variables that could change.\n2. **No side effects:** It does not modify any external state (no mutation of global variables, no I/O operations, no DOM updates, no network requests, no database writes).\n\n**Benefits of pure functions:**\n- **Testability:** Pure functions are easy to test because they have no hidden dependencies. You only need to provide inputs and assert outputs.\n- **Predictability:** Code behaviour is predictable and easier to reason about.\n- **Memoizable:** Because they are deterministic, pure functions can be cached (memoised) for performance.\n- **Parallelisable:** Since they don't share mutable state, pure functions can be safely executed in parallel.\n- **Referential transparency:** A pure function call can be replaced with its return value without changing program behaviour (substitution model).\n- **Debuggability:** Pure functions are easier to debug because they don't cause unexpected changes elsewhere.\n\n**Examples of impure functions:**\n- Using `Math.random()` (different output for same input).\n- Using `Date.now()` (depends on external time).\n- Modifying a global variable or object property.\n- Logging to console (side effect).\n- DOM manipulation.\n- Making an API call.\n\n**Pure vs Impure:**\n- Pure: `const add = (a, b) => a + b;`\n- Impure: `let total = 0; const addToTotal = (x) => { total += x; return total; }`\n\n**Interview tip:** Be prepared to identify pure vs impure functions in code, explain how to refactor impure functions to be pure (e.g., passing dependencies as parameters), and discuss the trade-offs: pure functions are great for core logic, but applications need side effects to be useful. Isolate side effects at the boundaries.",
    code: "// Pure functions\nfunction add(a, b) {\n  return a + b;\n}\n\nfunction toUpperCase(str) {\n  return str.toUpperCase(); // doesn't modify original, returns new string\n}\n\nfunction getLength(arr) {\n  return arr.length;\n}\n\n// Impure functions\nlet counter = 0;\nfunction increment() {\n  counter++; // modifies external state\n  return counter;\n}\n\nfunction log(message) {\n  console.log(message); // I/O side effect\n  return message;\n}\n\nfunction getRandom() {\n  return Math.random(); // non-deterministic\n}\n\nfunction impureAddToArray(arr, item) {\n  arr.push(item); // mutates input\n  return arr;\n}\n\n// Pure version of addToArray\nfunction pureAddToArray(arr, item) {\n  return [...arr, item]; // returns new array, original unchanged\n}\n\n// Refactoring impure to pure: inject dependencies\n// Impure\nfunction saveUser(user) {\n  // directly uses fetch\n  return fetch('/api/users', { method: 'POST', body: JSON.stringify(user) });\n}\n// Pure (inject fetch as parameter)\nfunction saveUserPure(user, httpClient) {\n  return httpClient.post('/api/users', user);\n}\n\n// React component example: pure component\nconst PureGreeting = ({ name }) => {\n  return <div>Hello, {name}!</div>; // pure: output depends only on props\n};\n\n// Impure component (bad)\nlet count = 0;\nconst ImpureCounter = () => {\n  count++; // side effect\n  return <div>{count}</div>; // not deterministic\n};\n\n// Using pure functions for predictable state management (Redux reducer)\nconst initialState = { count: 0 };\nfunction counterReducer(state = initialState, action) {\n  switch (action.type) {\n    case 'INCREMENT':\n      return { ...state, count: state.count + 1 }; // pure\n    default:\n      return state;\n  }\n}\n\n// Testing pure functions is straightforward\ntest('add returns sum', () => {\n  expect(add(2, 3)).toBe(5);\n  expect(add(2, 3)).toBe(5); // always same\n});\n\n// Pure function with object argument – be careful not to mutate\nfunction updateName(user, newName) {\n  return { ...user, name: newName }; // returns new object\n}\n\n// Referential transparency example\nconst result = add(2, add(3, 4));\n// Since add is pure, add(3,4) can be replaced with 7\nconst equivalent = add(2, 7); // same result\n\n// Immutability helps maintain purity\nconst numbers = [1, 2, 3];\nconst doubled = numbers.map(n => n * 2); // map returns new array, pure\n// numbers is unchanged\n\n// Avoiding hidden state\nlet taxRate = 0.1; // hidden dependency\nfunction calculatePrice(base) {\n  return base * (1 + taxRate); // impure because taxRate could change\n}\n// Pure version\nfunction calculatePricePure(base, taxRate) {\n  return base * (1 + taxRate);\n}",
  },
  {
    id: "concept-side-effects",
    type: "concept",
    topic: "JavaScript Core",
    title: "Side Effects",
    prompt:
      "What are side effects in programming? Give examples and explain how to manage them.",
    expected:
      "Side effects are any operations that modify external state or interact with the outside world, such as I/O, DOM manipulation, network requests, or modifying global variables. Pure functions avoid side effects; side effects should be isolated at the boundaries of an application.",
    keywords: [
      "side effect",
      "I/O",
      "mutation",
      "functional programming",
      "impure",
    ],
    explanation:
      "A side effect occurs when a function or expression modifies something outside its own scope or interacts with the external world. In pure functional programming, side effects are considered undesirable because they make code harder to test, reason about, and debug. However, side effects are necessary for any useful program – a program with no side effects would be useless (it would compute nothing and produce no output).\n\n**Common side effects in JavaScript:**\n- **DOM manipulation:** `document.getElementById(...).innerHTML = ...`\n- **Console I/O:** `console.log()`, `console.error()`\n- **Network requests:** `fetch()`, `XMLHttpRequest`\n- **Timers:** `setTimeout()`, `setInterval()`\n- **Global variable mutation:** `window.x = 5`\n- **Local storage / session storage:** `localStorage.setItem()`\n- **File system operations (Node.js):** `fs.writeFile()`\n- **Database queries:** `db.insert()`\n- **Random number generation:** `Math.random()`\n- **Date/time access:** `Date.now()`\n\n**Why side effects are problematic:**\n- **Testing difficulty:** Functions with side effects need complex setup and teardown.\n- **Order dependence:** The result may depend on the order of execution.\n- **Harder to reason about:** You need to track external state.\n- **Concurrency issues:** Side effects can cause race conditions.\n\n**Managing side effects:**\n1. **Isolate them:** Push side effects to the edges of your application (e.g., React components, API handlers).\n2. **Use dependency injection:** Pass external dependencies as parameters, making them explicit.\n3. **Use effect systems:** In JavaScript, libraries like Redux Saga or Observables manage side effects.\n4. **Wrap impure code:** Create wrapper functions that clearly indicate they cause side effects.\n5. **Use immutable data structures:** Reduce mutation side effects.\n6. **Separate pure logic from impure actions:** Core business logic should be pure; only the outer layer should perform I/O.\n\n**Interview tip:** Be able to distinguish side effects in code and discuss patterns for managing them (e.g., command-query separation, effect handlers). Also understand that React's `useEffect` is named for side effects, and the framework's rendering cycle is designed to isolate them.",
    code: "// Examples of side effects\n\n// 1. Modifying external variable\nlet total = 0;\nfunction addToTotal(value) {\n  total += value; // side effect: modifies external state\n  return total;\n}\n\n// 2. Console I/O\nfunction logMessage(msg) {\n  console.log(msg); // side effect\n}\n\n// 3. DOM manipulation\nfunction updateTitle(newTitle) {\n  document.title = newTitle; // side effect\n}\n\n// 4. Network request\nasync function fetchData(url) {\n  const response = await fetch(url); // side effect\n  return response.json();\n}\n\n// 5. Timer\nfunction delayedAction(cb) {\n  setTimeout(cb, 1000); // side effect\n}\n\n// 6. Random number\nfunction rollDice() {\n  return Math.floor(Math.random() * 6) + 1; // non-deterministic, but not mutation\n}\n\n// Managing side effects\n\n// 1. Dependency injection (make side effects explicit)\nfunction saveUser(user, httpClient) {\n  // httpClient is injected, side effect is explicit\n  return httpClient.post('/users', user);\n}\n\n// 2. Effect wrapper pattern\nfunction withLogging(fn) {\n  return (...args) => {\n    console.log(`Calling ${fn.name} with`, args); // side effect isolated\n    const result = fn(...args);\n    console.log(`Result:`, result);\n    return result;\n  };\n}\nconst loggedAdd = withLogging((a, b) => a + b);\n\n// 3. Pure core, impure shell\n// Pure business logic\nfunction calculateDiscount(price, userTier) {\n  const discountMap = { gold: 0.2, silver: 0.1, bronze: 0.05 };\n  return price * (1 - (discountMap[userTier] || 0));\n}\n// Impure shell\nasync function processOrder(order) {\n  const discount = calculateDiscount(order.price, order.userTier);\n  await saveToDatabase(order); // side effect\n  await sendEmail(order.userEmail); // side effect\n  return discount;\n}\n\n// 4. React useEffect for side effects\nfunction Timer() {\n  const [seconds, setSeconds] = React.useState(0);\n  React.useEffect(() => {\n    const interval = setInterval(() => {\n      setSeconds(s => s + 1); // side effect: timer\n    }, 1000);\n    return () => clearInterval(interval); // cleanup side effect\n  }, []);\n  return <div>{seconds}s</div>;\n}\n\n// 5. Command-Query Separation (CQS)\n// Commands: cause side effects, return void or status\nfunction saveToLocalStorage(key, value) {\n  localStorage.setItem(key, JSON.stringify(value)); // command\n}\n// Queries: no side effects, return data\nfunction readFromLocalStorage(key) {\n  return JSON.parse(localStorage.getItem(key)); // pure-ish (reads but doesn't modify)\n}\n\n// 6. Using immutable data to avoid mutation side effects\nconst state = { count: 0 };\n// Bad (mutation)\nfunction incrementState() {\n  state.count++;\n}\n// Good (returns new state)\nfunction incrementStatePure(prevState) {\n  return { ...prevState, count: prevState.count + 1 };\n}\n\n// 7. Testing side effects: mock them\n// In tests, replace fetch with mock\n// jest.spyOn(global, 'fetch').mockResolvedValue({ json: () => mockData });",
  },
  {
    id: "concept-garbage-collection",
    type: "concept",
    topic: "JavaScript Core",
    title: "Garbage Collection",
    prompt:
      "How does garbage collection work in JavaScript? Explain the mark-and-sweep algorithm and generational collection.",
    expected:
      "JavaScript engines use automatic garbage collection to reclaim memory no longer reachable. The mark-and-sweep algorithm marks all reachable objects from roots, then sweeps (deletes) unmarked objects. Generational collection separates objects by age (young/old) for better performance.",
    keywords: [
      "garbage collection",
      "mark-and-sweep",
      "memory management",
      "generational collection",
      "reachability",
    ],
    explanation:
      "Garbage collection (GC) is the automatic process of identifying and freeing memory that is no longer in use by the program. In JavaScript, memory management is automatic; developers don't manually allocate or free memory (unlike C/C++). The garbage collector runs periodically to find objects that are no longer reachable from roots (global variables, stack variables, etc.) and reclaims their memory.\n\n**Core concepts:**\n- **Reachability:** An object is reachable if it can be accessed from a root (global object, currently executing function's variables, or any object reachable from them).\n- **Roots:** The starting points for reachability analysis. In browsers: `window`, `document`, DOM elements referenced from JS, stack frames.\n\n**Mark-and-Sweep algorithm (basic):**\n1. **Mark phase:** Start from roots, traverse all references, and mark every object that is reachable.\n2. **Sweep phase:** Iterate over all allocated memory, free any objects that were not marked.\n3. **Compact (optional):** Move live objects together to reduce fragmentation.\n\n**Generational collection (modern engines like V8):**\n- Based on observation that most objects die young (have short lifetimes).\n- Splits heap into **Young generation** (newly allocated objects) and **Old generation** (objects that survived multiple GC cycles).\n- **Minor GC (Scavenge):** Runs frequently, fast, collects young generation only.\n- **Major GC (Mark-Compact):** Runs less often, collects old generation (slower).\n- **Incremental GC:** Splits GC work into smaller chunks to reduce pauses.\n\n**V8 specifics (Chrome, Node.js):**\n- **New space (Young gen):** 1-8MB, collected by Scavenger (Cheney's algorithm).\n- **Old space (Old gen):** Rest of heap, collected by Mark-Compact.\n- **Large object space:** For objects > 1MB, rarely collected.\n- **Code space:** For JIT-compiled code.\n\n**When GC runs:**\n- When memory allocation reaches a certain threshold.\n- In idle time (idle-time GC).\n- When the engine determines pressure (e.g., before out-of-memory).\n\n**Memory leaks:** Occur when objects are unintentionally kept reachable, preventing GC.\n\n**Interview tip:** Be ready to explain how closures can cause memory leaks, the role of WeakMap/WeakSet, and how to profile memory with DevTools. Understand that manual GC invocation is not possible (except `global.gc()` in Node with flag).",
    code: "// Simple demonstration of reachability\nlet obj = { data: new Array(1000) };\nobj = null; // object becomes unreachable, eligible for GC\n\n// Reference counting pitfall (not used in modern JS engines but legacy IE)\n// Circular references prevented reference counting from freeing memory\nfunction createCircular() {\n  const a = {};\n  const b = {};\n  a.ref = b;\n  b.ref = a;\n  return a;\n}\nlet circular = createCircular();\ncircular = null; // With reference counting, this would leak. Mark-and-sweep handles it.\n\n// Memory leak with closures (common)\nfunction leaky() {\n  const bigData = new Array(1000000);\n  return function() {\n    console.log(bigData.length); // closure keeps reference to bigData\n  };\n}\nconst closure = leaky(); // bigData stays alive\nclosure = null; // now bigData can be GC'd\n\n// Memory leak with event listeners (unremoved)\nfunction addListener() {\n  const element = document.getElementById('btn');\n  const handler = () => console.log('clicked');\n  element.addEventListener('click', handler);\n  // If element is removed from DOM but handler not removed, it's leaked\n  // Modern browsers handle this better, but still good practice to remove\n}\n\n// Using WeakMap to avoid leaks (allow GC of keys)\nlet cache = new WeakMap();\nfunction process(obj) {\n  if (!cache.has(obj)) {\n    cache.set(obj, expensiveComputation(obj));\n  }\n  return cache.get(obj);\n}\n// When obj is no longer referenced, entry is automatically removed from WeakMap\n\n// Monitoring memory usage (Node.js)\nif (typeof process !== 'undefined') {\n  const used = process.memoryUsage();\n  console.log(`Heap used: ${used.heapUsed / 1024 / 1024} MB`);\n  // Force GC (requires --expose-gc flag)\n  // if (global.gc) global.gc();\n}\n\n// Chrome DevTools memory profiling\n// 1. Take heap snapshot\n// 2. Look for detached DOM nodes (yellow)\n// 3. Find objects with unexpected references\n\n// RequestAnimationFrame memory leak\nlet frames = [];\nfunction animate() {\n  frames.push({ timestamp: performance.now() }); // grows indefinitely\n  requestAnimationFrame(animate);\n}\n// animate(); // memory leak – frames array never cleared\n\n// Fixed: limit array size or clear periodically\n\n// Detached DOM tree leak\nlet detachedNodes = [];\nfunction createDetached() {\n  const div = document.createElement('div');\n  detachedNodes.push(div); // reference kept, div never GC'd\n}\n// Fix: remove reference when done\n\n// Node.js memory leak with caching\nconst cache2 = {};\nfunction addToCache(key, value) {\n  cache2[key] = value; // grows forever\n}\n// Fix: use LRU cache or limit size, or use WeakMap\n\n// Generational GC behaviour\n// Short-lived objects (e.g., temporary inside function) are collected quickly\nfunction temporary() {\n  const arr = new Array(1000); // allocated in young generation\n  return arr[0];\n}\n// After function returns, arr is unreachable → collected in next minor GC\n\n// Long-lived objects (global, cached) move to old generation\nconst cache3 = []; // stays in old generation, collected less frequently\n\n// Understanding garbage collection helps optimise:\n// 1. Avoid unnecessary object allocations in loops\n// 2. Nullify references when done (especially large objects)\n// 3. Use object pooling for frequently created objects\n// 4. Avoid closures that capture large objects unnecessarily",
  },
  {
    id: "concept-memory-leak",
    type: "concept",
    topic: "JavaScript Core",
    title: "Memory Leak",
    prompt:
      "What is a memory leak? What are common causes of memory leaks in JavaScript and how can you prevent them?",
    expected:
      "A memory leak occurs when memory that is no longer needed is not released, causing the application to consume increasing amounts of memory over time. Common causes: global variables, forgotten timers, event listeners not removed, closures holding large objects, detached DOM references.",
    keywords: [
      "memory leak",
      "garbage collection",
      "detached DOM",
      "closure leak",
      "event listener",
    ],
    explanation:
      "A memory leak happens when a program retains references to objects that are no longer needed, preventing the garbage collector from reclaiming that memory. Over time, these accumulated objects consume memory, leading to performance degradation, crashes, or browser tab termination. In long-running applications (SPAs, Node.js servers), memory leaks are critical.\n\n**Common causes in JavaScript:**\n\n1. **Accidental global variables:** Variables not declared with `var`, `let`, or `const` become global (in browsers, attached to `window`). They are never collected.\n\n2. **Forgotten timers and callbacks:** `setInterval` or `setTimeout` that reference large objects or closures, especially if not cleared when no longer needed.\n\n3. **Event listeners not removed:** When DOM elements are removed but event listeners remain attached, the element (and its entire subtree) may be retained.\n\n4. **Closures capturing large objects:** A closure that references a large object (or a scope containing large objects) will keep that object alive as long as the closure is accessible.\n\n5. **Detached DOM elements:** References to DOM elements that have been removed from the document but are still referenced in JavaScript (e.g., in an array).\n\n6. **Caches without eviction:** Using objects or Map as unlimited caches, never removing entries.\n\n7. **Out-of-scope references in modules:** Module-level variables that accumulate data.\n\n8. **WebSocket or connection listeners** not cleaned up.\n\n**Detection and debugging:**\n- Chrome DevTools Memory tab: heap snapshots, allocation timelines, comparison views.\n- Look for detached DOM nodes (yellow in heap snapshots).\n- Use `performance.memory` (Chrome) to monitor heap size.\n- Node.js: `process.memoryUsage()`, `--inspect` with DevTools.\n\n**Prevention strategies:**\n- Use `let`/`const` to avoid accidental globals.\n- Clean up timers with `clearInterval`/`clearTimeout` in component unmount (React `useEffect` cleanup).\n- Remove event listeners with `removeEventListener` (use named functions, not anonymous).\n- Be mindful of closures; nullify references when done.\n- Use WeakMap/WeakSet for caches where keys are objects (auto-GC).\n- Implement cache eviction policies (LRU, TTL).\n- In React, use `useEffect` cleanup function.\n\n**Interview tip:** Be prepared to identify memory leaks in code snippets and explain how to fix them. Also understand that modern browsers and frameworks help but don't eliminate leaks.",
    code: "// 1. Accidental global variable\nfunction leak() {\n  leaked = 'I am global'; // missing var/let/const – attaches to window\n}\nleak();\n// `leaked` remains in memory forever\n// Fix: use 'use strict' or declare properly\n\n// 2. Forgotten interval\nlet largeArray = new Array(1000000);\nsetInterval(() => {\n  console.log(largeArray.length); // interval keeps reference to largeArray\n}, 1000);\n// interval never cleared, largeArray never GC'd\n// Fix: clearInterval when no longer needed\nconst intervalId = setInterval(...);\nclearInterval(intervalId);\n\n// 3. Event listener not removed\nfunction addButtonListener() {\n  const button = document.getElementById('myButton');\n  const onClick = () => console.log('clicked');\n  button.addEventListener('click', onClick);\n  // If button is later removed from DOM, this listener keeps it alive\n}\n// Fix: store listener reference and remove\nfunction addButtonListenerSafe() {\n  const button = document.getElementById('myButton');\n  const onClick = () => console.log('clicked');\n  button.addEventListener('click', onClick);\n  // When done:\n  button.removeEventListener('click', onClick);\n}\n\n// 4. Closure capturing large object\nfunction createHandler() {\n  const hugeData = new Array(1000000);\n  return () => console.log('handler'); // closure captures hugeData\n}\nconst handler = createHandler(); // hugeData stays alive\n// Fix: avoid capturing large objects, or set to null\nfunction createHandlerFixed() {\n  const hugeData = new Array(1000000);\n  const handler = () => console.log('handler');\n  hugeData = null; // allow GC\n  return handler;\n}\n\n// 5. Detached DOM elements\nlet detachedElements = [];\nfunction createAndDetach() {\n  const div = document.createElement('div');\n  document.body.appendChild(div);\n  detachedElements.push(div); // still referenced\n  document.body.removeChild(div); // removed from DOM, but referenced in array\n}\n// Fix: clear array or use WeakRef\n\n// 6. Infinite cache\nconst cache = {};\nfunction memoize(key, value) {\n  cache[key] = value; // never deleted\n}\n// Fix: implement LRU or use WeakMap\nconst weakCache = new WeakMap(); // keys must be objects\nfunction weakMemoize(obj, value) {\n  weakCache.set(obj, value); // when obj is GC'd, entry auto-removed\n}\n\n// 7. React useEffect leak\nfunction TimerComponent() {\n  React.useEffect(() => {\n    const interval = setInterval(() => {\n      console.log('tick');\n    }, 1000);\n    // Missing cleanup → memory leak\n    return () => clearInterval(interval); // correct cleanup\n  }, []);\n}\n\n// 8. Node.js server memory leak\nconst express = require('express');\nconst app = express();\nconst logs = [];\napp.get('/log', (req, res) => {\n  logs.push(req.query.msg); // logs array grows forever\n  res.send('ok');\n});\n// Fix: limit size or stream to disk\n\n// 9. Detached DOM with closure in event listener\nfunction attachHandler() {\n  const element = document.getElementById('target');\n  const largeData = new Array(1000000);\n  element.addEventListener('click', () => {\n    console.log(largeData.length); // closure captures largeData\n  });\n  // element removed later, but listener keeps both element and largeData alive\n}\n\n// 10. Using WeakRef (experimental) for opt-in weak references\nlet weakRef = new WeakRef({ data: 'temp' });\n// The object may be GC'd at any time\nlet obj = weakRef.deref();\nif (obj) { /* use */ }\n\n// Debugging: take heap snapshot in Chrome DevTools\n// 1. Open DevTools > Memory\n// 2. Take heap snapshot\n// 3. Repeat action that might leak\n// 4. Take another snapshot, compare (select 'Comparison' view)\n// 5. Look for objects that should have been freed\n\n// Chrome memory inspector flags in DevTools\n// Enable 'Record allocation timeline' to see where objects were created",
  },
  {
    id: "concept-currying",
    type: "concept",
    topic: "JavaScript Core",
    title: "Currying",
    prompt:
      "What is currying? Implement a curry function that transforms a function taking multiple arguments into a sequence of functions each taking a single argument.",
    expected:
      "Currying is the transformation of a function that takes multiple arguments into a chain of functions each taking a single argument. It enables partial application and function composition.",
    keywords: [
      "currying",
      "partial application",
      "functional programming",
      "arity",
      "closure",
    ],
    explanation: `Currying is a technique in functional programming where a function that accepts multiple arguments is transformed into a series of functions that each accept a single argument. For example, a function add(a, b, c) becomes add(a)(b)(c). The curried function returns a new function for each argument until all arguments have been provided, at which point the original function is executed.

**Key concepts:**
- **Arity:** The number of arguments a function takes. Currying reduces a function of arity N to N nested functions of arity 1.
- **Partial application:** Closely related but different – partial application fixes some arguments, producing a function of smaller arity. Currying automatically enables partial application.
- **Closure:** Currying relies on closures to remember previously provided arguments.

**Currying vs Partial Application:**
- Currying transforms f(a, b, c) into f(a)(b)(c). It always produces unary functions.
- Partial application fixes some arguments, producing a function that takes the remaining arguments. partial(f, a) produces f(a, b, c) where only b and c are left.
- Currying is a specific transformation; partial application can be implemented without currying.

**Implementing a curry function:**
A robust curry function should:
- Accept a function and optionally the arity (number of arguments).
- Return a curried version that collects arguments until enough are provided.
- Preserve this context.
- Allow passing multiple arguments at once (not just one).

**Use cases:**
- Creating specialised functions from generic ones (e.g., const double = multiply(2)).
- Function composition and pipelining.
- Reducing repetition in functional code.
- Libraries like Lodash provide _.curry.

**Interview tip:** Be ready to implement curry from scratch, explain the difference between currying and partial application, and discuss how currying can improve code reusability.`,
    code: `// Basic currying implementation (fixed arity)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}

// Usage
function add(a, b, c) {
  return a + b + c;
}
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Real example: creating specialised functions
function multiply(a, b) {
  return a * b;
}
const curriedMultiply = curry(multiply);
const double = curriedMultiply(2);
const triple = curriedMultiply(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// Manual currying without helper
const manualCurry = a => b => c => a + b + c;
console.log(manualCurry(1)(2)(3)); // 6

// Currying with placeholders (advanced)
function curryWithPlaceholders(fn) {
  const placeholders = Symbol('placeholder');
  return function curried(...args) {
    const complete = args.length >= fn.length && !args.slice(0, fn.length).includes(placeholders);
    if (complete) {
      return fn.apply(this, args);
    }
    return function(...more) {
      const combined = args.map(arg => arg === placeholders && more.length ? more.shift() : arg);
      return curried.apply(this, combined.concat(more));
    };
  };
}

// ES6 arrow function currying (inline)
const log = level => message => console.log(\`[\${level}] \${message}\`);
const info = log('INFO');
const error = log('ERROR');
info('Application started'); // [INFO] Application started
error('Something failed');   // [ERROR] Something failed

// Practical use: configuration functions
const makeRequest = baseURL => endpoint => params =>
  fetch(\`\${baseURL}\${endpoint}?\${new URLSearchParams(params)}\`);

const api = makeRequest('https://api.example.com');
const usersApi = api('/users');
usersApi({ limit: 10 }).then(res => res.json());

// Curry with variable arguments (rest parameters)
function curryFlexible(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

// Using bind for partial application (alternative to currying)
function multiply(a, b) { return a * b; }
const doubleBind = multiply.bind(null, 2);
console.log(doubleBind(5)); // 10

// Lodash curry (if available)
// const _ = require('lodash');
// const curried = _.curry(add);

// Performance note: Currying adds function call overhead.
// For performance-critical code, use manual partial application or avoid deep currying.

// Real-world: Redux middleware currying pattern
const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// Converting a regular function to curried version dynamically
function toCurried(fn) {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) return fn(...args);
    return (...rest) => curried(...args, ...rest);
  };
}

// Example with a function that has default parameters (length doesn't count defaults)
function greet(name, greeting = 'Hello') {
  return \`\${greeting}, \${name}\`;
}
console.log(greet.length); // 1 (default parameters are not counted)
// Currying such a function requires manual arity specification`,
  },
  {
    id: "concept-promise",
    type: "concept",
    topic: "JavaScript Core",
    title: "Promise",
    prompt:
      "What is a Promise in JavaScript? Explain its states and how to chain promises.",
    expected:
      "A Promise represents the eventual completion or failure of an asynchronous operation. It has three states: pending, fulfilled, and rejected. Promises support chaining with .then() and .catch().",
    keywords: [
      "promise",
      "async",
      "then",
      "catch",
      "finally",
      "pending",
      "fulfilled",
      "rejected",
    ],
    explanation: `A Promise is a built-in JavaScript object that represents a value that may not be available yet but will be resolved in the future (or rejected with an error). It provides a cleaner, more manageable way to handle asynchronous operations compared to callbacks, avoiding "callback hell" and enabling better error propagation.

**States of a Promise:**
- **Pending:** Initial state, neither fulfilled nor rejected. The operation is still in progress.
- **Fulfilled (resolved):** The operation completed successfully, and the promise has a resulting value.
- **Rejected:** The operation failed, and the promise has a reason for the failure (an error).

Once a promise is settled (fulfilled or rejected), it becomes immutable – its state cannot change again.

**Creating a Promise:**
The Promise constructor takes an executor function with two parameters: resolve and reject. Calling resolve(value) fulfills the promise; calling reject(error) rejects it.

**Chaining:**
- .then(onFulfilled, onRejected) – schedules callbacks for fulfillment or rejection. Returns a new promise, enabling chaining.
- .catch(onRejected) – shorthand for .then(null, onRejected), handles rejections.
- .finally(onFinally) – schedules a callback that runs regardless of settlement (for cleanup).

**Promise resolution is always asynchronous:** Even if a promise resolves immediately, .then callbacks are placed in the microtask queue and run after the current synchronous code.

**Static methods:**
- Promise.all(iterable) – waits for all promises to resolve, or rejects immediately if any rejects. Returns array of results.
- Promise.allSettled(iterable) – waits for all promises to settle, never rejects. Returns array of status objects.
- Promise.race(iterable) – resolves or rejects with the first settled promise.
- Promise.any(iterable) – resolves with the first fulfilled promise, rejects only if all reject.
- Promise.resolve(value) – returns a promise resolved with the given value.
- Promise.reject(reason) – returns a promise rejected with the given reason.

**Interview tip:** Be ready to explain the event loop interaction (microtask priority), how promise chaining works, and the difference between Promise.all and Promise.allSettled. Also understand error handling: an unhandled rejection can cause problems (now detected by Node.js/browsers).`,
    code: `// Creating a Promise
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ data: 'Hello, World!' });
    } else {
      reject(new Error('Failed to fetch'));
    }
  }, 1000);
});

// Consuming a Promise
fetchData
  .then(result => {
    console.log(result.data); // 'Hello, World!'
    return result.data.toUpperCase();
  })
  .then(upper => {
    console.log(upper); // 'HELLO, WORLD!'
  })
  .catch(error => {
    console.error(error.message);
  })
  .finally(() => {
    console.log('Cleanup'); // always runs
  });

// Promise chaining with returning values
function asyncAdd(a, b) {
  return Promise.resolve(a + b);
}
asyncAdd(2, 3)
  .then(sum => asyncAdd(sum, 4))
  .then(sum => asyncAdd(sum, 5))
  .then(result => console.log(result)); // 14

// Static methods
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject(new Error('fail'));

Promise.all([promise1, promise2])
  .then(results => console.log(results)); // [1, 2]

Promise.allSettled([promise1, promise2, promise3])
  .then(results => console.log(results));
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 2 },
//   { status: 'rejected', reason: Error: fail }
// ]

Promise.race([
  new Promise(resolve => setTimeout(() => resolve('fast'), 100)),
  new Promise(resolve => setTimeout(() => resolve('slow'), 500))
]).then(result => console.log(result)); // 'fast'

Promise.any([
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.reject('error2')
]).then(result => console.log(result)); // 'success'

// Converting callback-based APIs to Promises
const fs = require('fs');
const readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

// Promise.resolve() wrapping
Promise.resolve(42)
  .then(val => console.log(val)); // 42

// Microtask behavior
console.log('1');
Promise.resolve().then(() => console.log('2'));
setTimeout(() => console.log('3'), 0);
console.log('4');
// Output: 1,4,2,3 (promise microtask runs before timeout macrotask)

// Unhandled rejection warning (modern Node.js/Chrome detect this)
// Promise.reject(new Error('Unhandled')); // will cause warning
// Always attach catch or use try/catch with async/await

// Converting to async/await (covered in next question)
// async function getData() {
//   try {
//     const result = await fetchData;
//     console.log(result);
//   } catch (err) {
//     console.error(err);
//   }
// }`,
  },
  {
    id: "concept-async-await",
    type: "concept",
    topic: "JavaScript Core",
    title: "async/await",
    prompt:
      "How does async/await work in JavaScript? How is it different from raw Promises?",
    expected:
      "async functions return a Promise. await pauses function execution until the awaited Promise settles, then resumes with the resolved value (or throws an exception). async/await provides syntactic sugar over Promises, making asynchronous code look synchronous.",
    keywords: [
      "async",
      "await",
      "promise",
      "syntactic sugar",
      "error handling",
      "try-catch",
    ],
    explanation: `async/await is syntactic sugar built on top of Promises, introduced in ES2017 (ES8). It allows writing asynchronous code that reads like synchronous code, improving readability and reducing boilerplate.

**Key rules:**
- An async function always returns a Promise. If you return a non-promise value, it is implicitly wrapped in Promise.resolve().
- The await keyword can only be used inside an async function (except in modules with top-level await in modern environments).
- await pauses the execution of the async function, yields control back to the event loop, and resumes when the awaited Promise settles.
- If the awaited Promise resolves, await returns the resolved value.
- If the awaited Promise rejects, await throws the rejection reason, which can be caught with try/catch.

**Comparison with raw Promises:**
| Feature | Promises | async/await |
|---------|----------|-------------|
| Syntax | .then().catch() chains | Looks like synchronous code |
| Error handling | .catch() or second .then() argument | try/catch blocks |
| Debugging | Stack traces can be messy | Cleaner, more linear |
| Conditional logic | Need to nest or use Promise constructs | Natural if/else and loops |
| Multiple awaits | Chaining or Promise.all | await sequentially (or Promise.all for parallel) |

**Error handling:** Always wrap await calls in try/catch unless you want the error to propagate to the caller (where it can be caught). Unhandled rejections in async functions behave like uncaught Promise rejections.

**Parallel execution:** To run multiple independent async operations in parallel, use await Promise.all([...]). Sequential await (one after another) waits for each to finish before starting the next, which may be slower.

**Top-level await:** In ES modules (and Node.js with appropriate flags), you can use await outside of an async function at the module top level. This is useful for initialization.

**Interview tip:** Be ready to convert Promise chains to async/await and explain the trade-offs (readability vs. needing to understand Promises). Also discuss that async/await is not a replacement for Promise.all when you need parallel execution.`,
    code: `// Basic async function
async function greet() {
  return 'Hello'; // implicitly wrapped in Promise.resolve
}
greet().then(console.log); // 'Hello'

// Using await
async function fetchUser() {
  const response = await fetch('https://api.example.com/user');
  const data = await response.json();
  return data;
}

// Error handling with try/catch
async function fetchUserSafe() {
  try {
    const response = await fetch('https://api.example.com/user');
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    return null; // graceful fallback
  }
}

// Sequential vs parallel execution
// Sequential (bad for independent operations)
async function sequential() {
  const user = await fetchUser();
  const posts = await fetchPosts(); // waits for user to finish
  return { user, posts };
}
// Parallel (good when independent)
async function parallel() {
  const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
  return { user, posts };
}

// Loops with await
async function processItems(items) {
  for (const item of items) {
    await processItem(item); // waits for each to finish before next
  }
}

// For parallel processing in loops, use Promise.all
async function processAll(items) {
  const promises = items.map(item => processItem(item));
  await Promise.all(promises);
}

// Converting Promise chain to async/await
// Promise chain
function getDataChain() {
  return fetchUser()
    .then(user => fetchPosts(user.id))
    .then(posts => ({ user, posts }))
    .catch(err => ({ error: err.message }));
}
// async/await equivalent
async function getDataAsync() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    return { user, posts };
  } catch (err) {
    return { error: err.message };
  }
}

// Top-level await (in ES modules)
// const config = await fetch('/config.json');
// export default config;

// Async function with Promise.all error handling
async function fetchMultiple() {
  try {
    const results = await Promise.all([
      fetch('/api/1'),
      fetch('/api/2'),
      fetch('/api/3')
    ]);
    // If any fails, all fail
    return results;
  } catch (err) {
    console.error('One of the requests failed', err);
  }
}

// Using Promise.allSettled with async/await for partial success
async function fetchPartial() {
  const results = await Promise.allSettled([
    fetch('/api/1'),
    fetch('/api/2')
  ]);
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  return { successful, failed };
}

// Async function with timeout
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// Remember: await only works inside async function (except top-level)
// This would cause syntax error:
// const result = await Promise.resolve(42); // SyntaxError unless in module`,
  },
  {
    id: "concept-module",
    type: "concept",
    topic: "JavaScript Core",
    title: "ES Modules",
    prompt:
      "What are ES modules? Explain import and export syntax, including default vs named exports.",
    expected:
      "ES modules (ESM) are the official JavaScript module system, using import and export statements. Modules are statically analyzable, support tree shaking, and run in strict mode by default. Exports can be named (multiple per module) or default (one per module).",
    keywords: [
      "es modules",
      "import",
      "export",
      "default export",
      "named export",
      "module scope",
    ],
    explanation: `ES modules (ECMAScript modules) are the standardized module system for JavaScript, introduced in ES6 (ES2015). They provide a way to encapsulate code, share functionality across files, and manage dependencies.

**Key characteristics:**
- **Static structure:** import and export statements are static (cannot be conditional or dynamic, except dynamic import()). This enables static analysis, tree shaking, and better optimisation.
- **Strict mode by default:** Module code automatically runs in strict mode.
- **Module scope:** Variables and functions declared in a module are not globally accessible unless explicitly exported.
- **Single execution:** Modules are evaluated only once, even if imported multiple times.
- **Asynchronous loading (in browsers):** Module scripts are deferred by default.

**Export types:**
1. **Named exports:** Multiple per module. Exported entities are referenced by their exact names.
   - Inline: export const foo = 42;
   - At end: const foo = 42; export { foo, bar };
   - Aliasing: export { foo as bar };

2. **Default export:** One per module. Represents the "main" export of the module. Can be imported with any name.
   - export default function() {} or export default 42;
   - Cannot be aliased with as in export; can be renamed on import.

**Import types:**
- Named import: import { foo, bar } from './module.js';
- Default import: import something from './module.js';
- Namespace import: import * as module from './module.js';
- Combination: import defaultExport, { named1, named2 } from './module.js';
- Side-effect only: import './module.js'; (executes module but imports nothing).

**Dynamic imports:** import('./module.js') returns a Promise and allows conditional/lazy loading. Useful for code splitting.

**File extension and MIME type:** In browsers, modules must be served with type="module" script tag. In Node.js, .mjs extension or "type": "module" in package.json.

**Interview tip:** Understand the difference between ES modules and CommonJS (next question). Be prepared to explain static vs dynamic imports, tree shaking, and the purpose of import.meta. Also know that ES modules are hoisted (imports are resolved before code execution).`,
    code: `// ---- math.js (named exports) ----
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class Calculator { /* ... */ }

// Also valid:
const E = 2.718;
function multiply(a, b) { return a * b; }
export { E, multiply as times };

// ---- main.js (importing named exports) ----
import { PI, add, times } from './math.js';
console.log(add(2, 3)); // 5
console.log(times(4, 5)); // 20

// ---- greeting.js (default export) ----
export default function greet(name) {
  return \`Hello, \${name}!\`;
}
// Or: export default class Greeter { ... }

// ---- app.js (importing default) ----
import greet from './greeting.js'; // can rename arbitrarily
console.log(greet('Alice')); // Hello, Alice!

// ---- Combined exports ----
export default function main() {}
export const helper = () => {};

// Combined import
import main, { helper } from './combined.js';

// Namespace import
import * as math from './math.js';
console.log(math.PI); // 3.14159
console.log(math.add(1, 2)); // 3

// Dynamic import (lazy loading)
button.addEventListener('click', async () => {
  const module = await import('./heavy-module.js');
  module.doSomething();
});

// Import for side effects only
import './init.js'; // runs init.js but imports nothing

// Re-exporting (aggregating modules)
export { add, PI } from './math.js';
export { default as greet } from './greeting.js';

// Import.meta (module metadata)
console.log(import.meta.url); // file URL of the current module

// In HTML (browser)
// <script type="module" src="main.js"></script>
// <script type="module">
//   import { add } from './math.js';
//   console.log(add(1,2));
// </script>

// Node.js: use .mjs file extension or "type":"module" in package.json
// Also supports import.meta.resolve() for module resolution

// Cyclic dependencies are handled (modules are evaluated but may have incomplete exports)
// a.js
export const a = 'a';
import { b } from './b.js';
console.log(b); // 'b' (after evaluation)
// b.js
export const b = 'b';
import { a } from './a.js';
// Works fine, but accessing a before initialization might be undefined if not careful`,
  },
  {
    id: "concept-commonjs",
    type: "concept",
    topic: "JavaScript Core",
    title: "CommonJS vs ES Modules",
    prompt:
      "What is the difference between CommonJS (require/module.exports) and ES modules (import/export)?",
    expected:
      "CommonJS is the module system used in Node.js, with synchronous loading and runtime resolution. ES modules are the official standard, with static analysis, asynchronous loading, and better tree shaking. CommonJS uses require() and module.exports; ES modules use import and export.",
    keywords: [
      "commonjs",
      "require",
      "module.exports",
      "es modules",
      "import",
      "export",
      "dynamic",
      "static",
    ],
    explanation: `CommonJS and ES modules are two different module systems for JavaScript. CommonJS is the traditional module system for Node.js, while ES modules are the official ECMAScript standard, supported in both browsers and modern Node.js.

**CommonJS (CJS):**
- **Syntax:** const fs = require('fs'); module.exports = { ... };
- **Loading:** Synchronous – modules are loaded and executed at runtime when require() is called.
- **Resolution:** Dynamic – require() can accept expressions (require(\`./\${name}\`)).
- **Copy of exports:** require() returns a copy of the exports object. Changes to the exported object after require are not reflected.
- **Caching:** Modules are cached after first require; subsequent requires return the cached version.
- **Top-level this:** Points to exports, not undefined.
- **File extension:** Typically .js (in Node.js, unless type: module).
- **Default export:** No built-in default export; can emulate with module.exports = value.

**ES Modules (ESM):**
- **Syntax:** import fs from 'fs'; export const foo = 42;
- **Loading:** Asynchronous by default (in browsers), but in Node.js ESM is also asynchronous (improves performance and enables top-level await).
- **Resolution:** Static – import and export must be at top level; dynamic import via import() is asynchronous.
- **Live bindings:** Exports are live bindings; changes in the exporting module are reflected in importing modules.
- **Caching:** Similar caching, but with live bindings.
- **Top-level this:** undefined.
- **File extension:** .mjs or .js with "type": "module" in package.json.
- **Default export:** Native export default.

**Key differences table:**
| Feature | CommonJS | ES Modules |
|---------|----------|-------------|
| Syntax | require(), module.exports | import, export |
| Load timing | Synchronous | Asynchronous (browsers/Node) |
| Static analysis | No (dynamic) | Yes (static) |
| Tree shaking | Limited | Excellent |
| Dynamic import | No (but require is dynamic) | Yes (import()) |
| Live bindings | No (exports are copies) | Yes |
| Top-level await | No | Yes (in modules) |
| Interoperability | Can import ESM (with limitations) | Can import CJS (with default import) |

**Interoperability in Node.js:**
- ESM can import CJS using default import (import pkg from 'cjs-package').
- CJS can import ESM only using dynamic import() (since ESM is asynchronous).

**Interview tip:** Be prepared to explain when to use each, the implications of synchronous vs asynchronous loading, and the practical impact of live bindings (e.g., why changes in a module are reflected in importers for ESM but not for CJS). Also discuss the migration path and how to write dual-mode packages.`,
    code: `// ---- CommonJS example (file: math.cjs) ----
const PI = 3.14159;
function add(a, b) { return a + b; }
module.exports = { PI, add };

// ---- CommonJS importing (file: main.cjs) ----
const math = require('./math.cjs');
console.log(math.add(2, 3)); // 5

// Destructuring works but note: it's not a live binding
const { PI } = require('./math.cjs');

// Dynamic require (allowed)
const moduleName = './math';
const dynamicMath = require(moduleName);

// ---- ES Modules example (file: math.mjs) ----
export const PI = 3.14159;
export function add(a, b) { return a + b; }
// or export default { PI, add };

// ---- ES Modules importing (file: main.mjs) ----
import { add, PI } from './math.mjs';
console.log(add(2, 3)); // 5

// Default import
import math from './math.mjs';

// Live binding demonstration (ESM)
// counter.mjs
export let count = 0;
export function increment() { count++; }
// main.mjs
import { count, increment } from './counter.mjs';
console.log(count); // 0
increment();
console.log(count); // 1 (live binding – reflects change)

// CommonJS would not reflect:
// counter.cjs
let count = 0;
function increment() { count++; }
module.exports = { count, increment };
// main.cjs
const { count, increment } = require('./counter.cjs');
console.log(count); // 0
increment();
console.log(count); // still 0 (copy, not live binding)

// Dynamic import in ESM (returns Promise)
const module = await import('./some-module.mjs');

// In Node.js, to mix: ESM importing CJS
import fs from 'fs'; // CJS package works via default import

// CJS importing ESM (only dynamic)
// const { default: something } = await import('./esm-module.mjs');

// Conditional exports in package.json for dual-mode packages
// "exports": {
//   "require": "./index.cjs",
//   "import": "./index.mjs"
// }

// Circular dependencies: ESM handles them better (live bindings ensure values are eventually updated)
// CommonJS circulars can lead to incomplete exports (the module.exports object is partially built)`,
  },
  {
    id: "concept-immutability",
    type: "concept",
    topic: "JavaScript Core",
    title: "Immutability",
    prompt:
      "What is immutability? How can you achieve immutability in JavaScript? Why is it important?",
    expected:
      "Immutability means data cannot be changed after creation. In JavaScript, primitives are immutable; objects/arrays are mutable. Achieve immutability with Object.freeze, spread operator, libraries (Immer, Immutable.js), or by using immutable patterns (returning new objects instead of mutating).",
    keywords: [
      "immutability",
      "mutable",
      "immutable",
      "Object.freeze",
      "spread",
      "Immer",
      "persistent data structures",
    ],
    explanation: `Immutability is a core concept in functional programming where data, once created, cannot be changed. Instead of modifying existing data, you create new copies with the desired changes. This approach brings predictability, easier debugging, and enables powerful optimizations (e.g., React's shallow equality checks).

**Mutable vs Immutable:**
- **Mutable:** Data can be modified in place (default for objects/arrays in JavaScript).
- **Immutable:** Data cannot be modified; any "change" creates a new reference.

**Why immutability matters:**
1. **Predictability:** Functions that don't mutate data are easier to reason about.
2. **Debugging:** No unexpected side effects; values stay as expected.
3. **Concurrency safety:** No race conditions when sharing immutable data across threads (though JS is single-threaded, but workers exist).
4. **Change detection:** In React, immutable data allows cheap reference equality checks (prevState !== nextState) to determine if a component should re-render.
5. **Undo/Redo:** Immutable data structures make it trivial to store previous states.
6. **Time travel debugging:** Redux DevTools relies on immutability.

**Achieving immutability in JavaScript:**
- **Primitives** (string, number, boolean, null, undefined, symbol, bigint) are immutable by nature.
- **Objects and arrays** are mutable by default. To make them immutable:
  1. **Object.freeze():** Shallow freezes an object; properties cannot be added, removed, or changed. Nested objects remain mutable.
  2. **Spread operator / Object.assign():** Create shallow copies. Useful for updates at one level.
  3. **Deep copy:** structuredClone() or JSON.parse(JSON.stringify()) (limited) or libraries.
  4. **Libraries:** Immer (write mutable-looking code that produces immutable updates), Immutable.js (persistent data structures).
  5. **const:** Prevents reassignment, but does NOT make the object immutable (only the variable binding).

**Common patterns for immutable updates:**
- Array: [...array, newItem], array.filter(...), array.map(...), array.slice()
- Object: { ...obj, newProp: value }
- Nested updates: { ...obj, nested: { ...obj.nested, prop: newValue } }

**Interview tip:** Be ready to demonstrate immutable update patterns, explain why const does not guarantee immutability, and discuss the performance trade-offs (immutable updates can be more expensive; libraries like Immer mitigate boilerplate). Also understand the connection to Redux and React.`,
    code: `// Primitives are immutable
let str = 'hello';
str.toUpperCase(); // returns 'HELLO', but str is still 'hello'
str = str.toUpperCase(); // assignment changes the variable, not the string

// Objects are mutable by default
const obj = { a: 1 };
obj.a = 2; // mutation – allowed even with const

// Object.freeze (shallow)
const frozen = Object.freeze({ a: 1, nested: { b: 2 } });
frozen.a = 3; // silently ignored (or error in strict mode)
frozen.nested.b = 4; // works! nested is not frozen
// Deep freeze requires recursion

// Shallow copy with spread
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };
copy.a = 10; // does not affect original
copy.b.c = 20; // affects original (shallow copy)

// Deep copy (structuredClone)
const deepCopy = structuredClone(original);
deepCopy.b.c = 30; // original unchanged

// Immutable array operations
const arr = [1, 2, 3];
// Adding
const added = [...arr, 4]; // [1,2,3,4]
// Removing
const removed = arr.filter(x => x !== 2); // [1,3]
// Updating
const updated = arr.map(x => x === 2 ? 99 : x); // [1,99,3]
// Insert at index
const inserted = [...arr.slice(0, 1), 99, ...arr.slice(1)]; // [1,99,2,3]

// Immutable object updates
const user = { name: 'Alice', address: { city: 'NYC', zip: 10001 } };
// Update top-level property
const updatedUser = { ...user, name: 'Bob' };
// Update nested property
const updatedAddress = {
  ...user,
  address: { ...user.address, city: 'Boston' }
};

// Using Immer for simpler immutable updates
import { produce } from 'immer';
const nextState = produce(user, draft => {
  draft.name = 'Charlie';
  draft.address.city = 'Chicago';
});
// Immer creates a new object with changes while keeping unchanged parts shared

// Redux reducer example (requires immutability)
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }; // immutable
    default:
      return state;
  }
}

// React state update (immutable)
const [user, setUser] = useState({ name: 'Alice', age: 30 });
// Correct
setUser(prev => ({ ...prev, age: 31 }));
// Wrong (mutation)
// user.age = 31; setUser(user); // won't trigger re-render

// Performance consideration: creating new objects has cost
// But for React and Redux, the benefits outweigh.

// Persistent data structures (Immutable.js)
import { Map } from 'immutable';
const map1 = Map({ a: 1, b: 2 });
const map2 = map1.set('a', 10); // returns new Map, map1 unchanged
console.log(map1.get('a')); // 1

// Object.assign for immutability (older style)
const newObj = Object.assign({}, oldObj, { prop: newValue });

// Freezing to prevent accidental mutations in development
const config = Object.freeze({ apiUrl: 'https://api.example.com' });
// config.apiUrl = 'other'; // fails in strict mode

// Note: const does NOT make objects immutable
const obj2 = { value: 1 };
obj2.value = 2; // allowed (object mutated, but binding unchanged)
// obj2 = {}; // error (cannot reassign const)

// Best practice: treat all data as immutable by convention, use TypeScript readonly modifiers
interface Point {
  readonly x: number;
  readonly y: number;
}
const point: Point = { x: 10, y: 20 };
// point.x = 30; // TypeScript error`,
  },
  {
    id: "concept-idempotent",
    type: "concept",
    topic: "JavaScript Core",
    title: "Idempotent Operations",
    prompt:
      "What is an idempotent operation? Why is it important in API design and distributed systems?",
    expected:
      "An idempotent operation produces the same result no matter how many times it is executed. In HTTP, GET, PUT, and DELETE are idempotent; POST is not. Idempotency enables safe retries in unreliable networks.",
    keywords: [
      "idempotent",
      "idempotency",
      "retry",
      "HTTP method",
      "API design",
      "distributed systems",
    ],
    explanation: `Idempotence is a property of an operation where applying it multiple times has the same effect as applying it once. In other words, the result is unchanged after the first successful execution, regardless of how many additional times it is repeated.

**Idempotence in HTTP methods:**
- **GET:** Always idempotent (retrieving the same resource multiple times returns the same representation).
- **PUT:** Idempotent because replacing a resource with the same data multiple times results in the same state.
- **DELETE:** Idempotent – deleting a resource once leaves it deleted; subsequent deletes have no additional effect.
- **POST:** Not idempotent – submitting the same data multiple times may create multiple resources (e.g., duplicate orders).
- **PATCH:** Not guaranteed idempotent (unless explicitly designed; can be idempotent if the patch operation is applied in a way that subsequent patches don't change state).

**Why idempotency matters:**
1. **Network resilience:** Clients can safely retry requests after timeouts or transient failures without causing unintended duplicate actions.
2. **Message queues:** Idempotent consumers can process the same message multiple times without corrupting state.
3. **Distributed systems:** Idempotent operations simplify error handling and reduce the need for complex distributed transactions.
4. **API reliability:** Idempotent endpoints can be safely called multiple times by proxies, load balancers, or retry mechanisms.

**Achieving idempotency in APIs:**
- **Idempotency keys:** Clients generate a unique key for each operation; the server stores the key along with the result. If the same key is received again, the server returns the previous result without executing the operation again.
- **Natural idempotence:** Design operations to be naturally idempotent (e.g., "set value to X" rather than "increment by 1").
- **Conditional updates:** Use version numbers or timestamps to ensure an update only applies once (e.g., UPDATE ... WHERE version = old_version).

**Interview tip:** Be ready to explain the difference between idempotence and safety (idempotent operations may change state but the final state is the same after repeated calls; safe operations do not change state at all). Also discuss idempotency keys in payment systems (e.g., Stripe's idempotency_key header).`,
    code: `// Example: non-idempotent operation
let orderCount = 0;
function createOrder() {
  orderCount++;
  return orderCount; // each call returns a different number
}

// Example: idempotent operation (setter)
let order = null;
function setOrder(orderData) {
  order = orderData; // calling multiple times with same data results in same state
  return order;
}

// Idempotent DELETE
function deleteUser(userId) {
  if (users.has(userId)) {
    users.delete(userId);
  }
  return true; // after first call, subsequent calls have no effect
}

// Idempotency key implementation (pseudo)
const idempotencyStore = new Map();
function processPayment(idempotencyKey, paymentData) {
  if (idempotencyStore.has(idempotencyKey)) {
    return idempotencyStore.get(idempotencyKey); // return cached result
  }
  const result = chargeCard(paymentData);
  idempotencyStore.set(idempotencyKey, result);
  return result;
}

// HTTP PUT example – idempotent
// PUT /users/123 { name: "Alice" }
// First request: creates/updates user to name "Alice"
// Second request: same effect – user remains "Alice"

// HTTP POST example – NOT idempotent
// POST /orders { productId: 42 }
// First request: creates order #1001
// Second request: creates order #1002 (duplicate)

// Using idempotency keys in fetch
async function createOrderWithIdempotency(orderData) {
  const idempotencyKey = crypto.randomUUID();
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey
    },
    body: JSON.stringify(orderData)
  });
  return response.json();
}
// On retry, same idempotency key is sent; server returns original result without creating duplicate.

// Idempotent update with version
async function updateUser(userId, newData, expectedVersion) {
  const result = await db.query(
    'UPDATE users SET name = $1, version = version + 1 WHERE id = $2 AND version = $3',
    [newData.name, userId, expectedVersion]
  );
  return result.rowCount === 1; // if false, someone else updated – retry needed
}

// In React Query, mutations can be made idempotent by using unique mutation keys
// const mutation = useMutation({
//   mutationFn: (data) => api.createOrder(data),
//   onMutate: (variables) => ({ idempotencyKey: crypto.randomUUID() })
// });`,
  },
  {
    id: "concept-execution-context",
    type: "concept",
    topic: "JavaScript Core",
    title: "Execution Context & Call Stack",
    prompt: "Explain execution context and the call stack in JavaScript.",
    expected:
      "An execution context is the environment where JavaScript code is evaluated and executed. The call stack is a LIFO data structure that tracks execution contexts, pushing a new context for each function call and popping it when the function returns.",
    keywords: [
      "execution context",
      "call stack",
      "LIFO",
      "variable environment",
      "this binding",
    ],
    explanation: `In JavaScript, an execution context is an abstract concept representing the environment in which code is evaluated. Every time a function is called, a new execution context is created and pushed onto the call stack.

**Components of an Execution Context:**
- **Variable Environment:** Stores variables declared with var, function declarations, and the arguments object.
- **Lexical Environment:** Holds variables declared with let and const, plus the reference to the outer environment (for closures).
- **This binding:** Determines the value of the 'this' keyword within the context.

**Types of Execution Contexts:**
1. **Global Execution Context:** Created when the script first runs. It creates the global object (window in browsers, global in Node.js) and sets 'this' to that global object. Only one global context exists.
2. **Function Execution Context:** Created each time a function is invoked. Each function gets its own context.
3. **Eval Execution Context:** Created when code is executed inside eval() (rarely used).

**The Call Stack:**
- The call stack is a LIFO (Last In, First Out) data structure that manages execution contexts.
- When a function is called, a new context is pushed onto the stack.
- When a function returns, its context is popped off the stack, and execution resumes in the previous context.
- If the stack exceeds its limit (e.g., infinite recursion), a "stack overflow" error occurs.

**Creation vs Execution Phases:**
Each execution context goes through two phases:
1. **Creation Phase:** The variable environment, lexical environment, and 'this' binding are set up. Hoisting occurs here.
2. **Execution Phase:** Code is executed line by line, assigning values and performing operations.

**Interview tip:** Be prepared to trace the call stack in complex recursion or nested function calls. Understand how asynchronous callbacks (setTimeout, promises) interact with the call stack via the event loop (they don't go directly on the stack; they go through task queues).`,
    code: `// Global execution context
var globalVar = 'I am global';
function first() {
  console.log('first starts');
  second();
  console.log('first ends');
}
function second() {
  console.log('second starts');
  third();
  console.log('second ends');
}
function third() {
  console.log('third starts');
  console.log('third ends');
}
first();
// Call stack evolution:
// 1. [global]
// 2. [global, first]
// 3. [global, first, second]
// 4. [global, first, second, third]
// 5. [global, first, second] (third pops)
// 6. [global, first] (second pops)
// 7. [global] (first pops)

// Stack overflow example (infinite recursion)
function recurse() {
  recurse();
}
// recurse(); // RangeError: Maximum call stack size exceeded

// Visualising execution contexts with closures
function outer(x) {
  return function inner(y) {
    return x + y;
  };
}
const add5 = outer(5);
console.log(add5(3)); // 8
// When add5 is called, inner's execution context has a reference to outer's variable environment (x = 5)

// Inspecting call stack in debugger
function debugStack() {
  console.trace('Stack trace');
}
function a() { b(); }
function b() { c(); }
function c() { debugStack(); }
a(); // prints call stack: a -> b -> c -> debugStack

// Execution context phases example
console.log(foo); // undefined (hoisted but not yet assigned)
var foo = 'bar';
console.log(foo); // 'bar'

function test() {
  console.log(baz); // ReferenceError: Cannot access 'baz' before initialization (TDZ)
  let baz = 'qux';
}
// test();

// Global execution context in Node.js vs browser
// In browser: this === window (non-strict mode), this === undefined in modules
// In Node.js REPL: global context; in modules: not global

// Call stack size limit (varies by engine)
function countStack(depth) {
  try {
    return countStack(depth + 1);
  } catch (e) {
    return depth;
  }
}
console.log(countStack(0)); // around 10,000-15,000 depending on engine`,
  },
  {
    id: "concept-closure-loop",
    type: "concept",
    topic: "JavaScript Core",
    title: "Closure in Loops",
    prompt:
      "Why does using var in a loop cause issues with closures? How can you fix it?",
    expected:
      "var is function-scoped, so all closures created in a loop share the same variable. By the time callbacks execute, the loop has finished and the variable holds its final value. Use let (block-scoped) or an IIFE to capture the current value.",
    keywords: ["closure", "loop", "var", "let", "IIFE", "block scope"],
    explanation: `The classic closure-in-loop problem demonstrates a common JavaScript pitfall when combining closures with loops using the 'var' keyword. Understanding why it happens and how to fix it is essential for any JavaScript developer.

**The problem:**
When you create functions (closures) inside a loop that reference a variable declared with 'var', all closures capture the same variable reference (not a snapshot of the value). By the time these closures execute (often asynchronously), the loop has already completed and the variable holds its final value.

**Why var causes this:**
- 'var' is function-scoped, not block-scoped. All iterations of the loop share the same binding of the variable.
- Each closure created inside the loop closes over the same variable environment.
- When the closures run later (e.g., after setTimeout), they all see the current value of that shared variable (the last value after the loop finishes).

**Solutions:**
1. **Use 'let' instead of 'var':** 'let' creates a new binding for each iteration (block scope). Each closure captures a different variable with the value from that iteration.
2. **IIFE (Immediately Invoked Function Expression):** Create a new function scope for each iteration, capturing the current value as a parameter.
3. **Function factory:** Extract the closure creation into a separate function that receives the value as an argument.
4. **Use .bind():** Bind the current value as an argument to the function.

**Interview tip:** Be ready to explain the difference between capturing a variable vs capturing a value. Also discuss how modern ESLint rules (no-loop-func) catch this issue. Understand that the same problem can occur with event listeners, promises, or any asynchronous callback created inside a loop.`,
    code: `// Problem: using var in a loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3,3,3 (not 0,1,2)
  }, 0);
}
// Why? All three closures reference the same 'i' variable.
// By the time setTimeout callbacks run, the loop has finished and i = 3.

// Solution 1: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0,1,2
  }, 0);
}
// let creates a new binding for each iteration.

// Solution 2: IIFE to capture current value
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j); // 0,1,2
    }, 0);
  })(i);
}

// Solution 3: Function factory
function createCallback(value) {
  return () => console.log(value);
}
for (var i = 0; i < 3; i++) {
  setTimeout(createCallback(i), 0);
}

// Solution 4: Using .bind() (creates a new function with bound argument)
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(console, i), 0);
}

// Real-world example: adding event listeners in a loop
const buttons = document.querySelectorAll('button');
// Wrong: all buttons log the same index (last index)
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = () => console.log(i);
}
// Correct: use let
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = () => console.log(i);
}
// Or use forEach (creates new scope per iteration)
buttons.forEach((btn, i) => {
  btn.onclick = () => console.log(i);
});

// Promise example
for (var i = 0; i < 3; i++) {
  Promise.resolve().then(() => console.log(i)); // 3,3,3
}
// Fix with let or IIFE

// Async/await inside loop (no problem because each iteration awaits)
async function run() {
  for (var i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
    console.log(i); // 0,1,2 (because console.log runs synchronously within the loop iteration)
  }
}
// But closures created inside still capture the variable:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // still 3,3,3
}

// Using Array.from to create array and forEach (already block-scoped)
Array.from({ length: 3 }, (_, i) => i).forEach(i => {
  setTimeout(() => console.log(i), 0);
});`,
  },
  {
    id: "concept-generator",
    type: "concept",
    topic: "JavaScript Core",
    title: "Generator Functions",
    prompt:
      "What are generator functions? How do they differ from regular functions?",
    expected:
      "Generator functions (function*) can be paused and resumed, yielding multiple values over time. They return a Generator object with next() method, which returns { value, done }. Generators enable lazy evaluation, infinite sequences, and custom iterators.",
    keywords: [
      "generator",
      "yield",
      "iterator",
      "next",
      "function*",
      "lazy evaluation",
    ],
    explanation: `Generator functions are a special type of function in JavaScript that can be paused and resumed, allowing them to produce a sequence of values over time. They are defined with the 'function*' syntax and use the 'yield' keyword to pause execution and return a value.

**Key characteristics:**
- **Pausable:** Execution can be paused with 'yield' and resumed by calling next() on the generator object.
- **Multiple returns:** A generator can yield many values (unlike regular functions that return only once).
- **Lazy evaluation:** Values are computed on demand, not all at once.
- **Memory efficient:** Generators can represent infinite sequences without storing all values.
- **Two-way communication:** You can pass values back into the generator using next(value).

**How generators work:**
- Calling a generator function returns a Generator object, which is an iterator.
- The generator object has a next() method that resumes execution until the next 'yield' or 'return'.
- Each call to next() returns an object with { value, done } where value is the yielded value and done indicates if the generator has finished.
- 'yield' pauses the generator; 'yield*' delegates to another generator or iterable.
- A 'return' statement or reaching the end of the function sets done: true.

**Use cases:**
- Implementing custom iterables (e.g., tree traversal, range generator).
- Handling infinite sequences (e.g., Fibonacci numbers, random numbers).
- Simplifying asynchronous code (historically, before async/await, generators were used with promises).
- State machines and cooperative multitasking.

**Interview tip:** Be ready to implement a simple generator, explain the difference between yield and return, and discuss how generators can be used to create custom iterables. Also know that generators can receive values from next() – the argument becomes the result of the yield expression.`,
    code: `// Basic generator
function* simpleGenerator() {
  console.log('start');
  yield 1;
  console.log('after first yield');
  yield 2;
  console.log('after second yield');
  return 3;
}
const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false } (logs 'start')
console.log(gen.next()); // { value: 2, done: false } (logs 'after first yield')
console.log(gen.next()); // { value: 3, done: true } (logs 'after second yield')

// Infinite sequence generator
function* counter() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
const counterGen = counter();
console.log(counterGen.next().value); // 0
console.log(counterGen.next().value); // 1
console.log(counterGen.next().value); // 2
// Can go forever without allocating memory for all values

// Generator that receives values from next()
function* twoWay() {
  const a = yield 'first yield';
  console.log('received a:', a);
  const b = yield 'second yield';
  console.log('received b:', b);
  return a + b;
}
const t = twoWay();
console.log(t.next());        // { value: 'first yield', done: false }
console.log(t.next(10));      // { value: 'second yield', done: false } (logs 'received a: 10')
console.log(t.next(20));      // { value: 30, done: true } (logs 'received b: 20')

// yield* delegation
function* inner() {
  yield 'a';
  yield 'b';
}
function* outer() {
  yield 1;
  yield* inner(); // delegates to inner generator
  yield 2;
}
for (const val of outer()) {
  console.log(val); // 1, 'a', 'b', 2
}

// Using generator to implement custom iterable
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}
const range = new Range(3, 7);
console.log([...range]); // [3,4,5,6,7]

// Lazy Fibonacci sequence
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3

// Generator for paginated API requests (lazy loading)
async function* paginatedFetch(url, pageSize = 10) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const response = await fetch(\`\${url}?page=\${page}&size=\${pageSize}\`);
    const data = await response.json();
    if (data.items.length === 0) hasMore = false;
    yield data.items;
    page++;
  }
}
// Usage: for await (const page of paginatedFetch('/api/users')) { ... }

// Generator as async alternative (pre-async/await)
function* asyncSequence() {
  const data = yield fetch('/api/data');
  const processed = yield process(data);
  return processed;
}
// Helper to run generator with promises (simple co function)
function run(genFn) {
  const gen = genFn();
  function next(value) {
    const result = gen.next(value);
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(next);
  }
  return next();
}
run(asyncSequence).then(result => console.log(result));

// Generators are not constructible (cannot use 'new')
// const obj = new myGenerator(); // TypeError`,
  },
  {
    id: "concept-weakmap-weakset",
    type: "concept",
    topic: "JavaScript Core",
    title: "WeakMap and WeakSet",
    prompt:
      "What are WeakMap and WeakSet? How do they differ from Map and Set?",
    expected:
      "WeakMap and WeakSet hold weak references to objects, allowing them to be garbage collected when no other references exist. Keys in WeakMap must be objects; WeakSet values must be objects. They are not iterable and have no size property.",
    keywords: [
      "WeakMap",
      "WeakSet",
      "garbage collection",
      "weak reference",
      "memory leak",
    ],
    explanation: `WeakMap and WeakSet are specialized data structures introduced in ES6 that hold "weak" references to objects. Unlike Map and Set, they do not prevent their keys (or values in WeakSet) from being garbage collected when there are no other references to those objects.

**WeakMap:**
- Keys must be objects (not primitives). Values can be any type.
- Holds weak references to its keys. If a key object is no longer referenced elsewhere, it can be garbage collected, and its entry is automatically removed from the WeakMap.
- Not iterable: No .keys(), .values(), .entries(), or .forEach(). Cannot get size.
- Methods: .set(key, value), .get(key), .has(key), .delete(key).

**WeakSet:**
- Values must be objects (not primitives).
- Holds weak references to its values. If a value object is no longer referenced elsewhere, it can be garbage collected and removed from the WeakSet.
- Not iterable; no .size property.
- Methods: .add(value), .has(value), .delete(value).

**Why use WeakMap/WeakSet?**
- **Prevent memory leaks:** When you need to associate additional data with an object without preventing that object from being garbage collected (e.g., DOM element metadata, caching, private data).
- **Better memory management:** Useful for caches that should not keep objects alive indefinitely.
- **Metadata storage:** Attach information to objects that have their own lifecycle.

**When NOT to use WeakMap/WeakSet:**
- When you need to iterate over keys/values (WeakMap doesn't support iteration).
- When you need to know the size of the collection.
- When keys are primitives (strings, numbers).

**Interview tip:** Be ready to explain the practical use cases: storing private data for instances, caching DOM elements without leaking, and implementing object metadata. Also understand that WeakMap/WeakSet are not enumerable because the contents can change due to garbage collection at any time.`,
    code: `// WeakMap example – storing private data
const privateData = new WeakMap();
class Person {
  constructor(name, age) {
    privateData.set(this, { name, age });
  }
  getName() {
    return privateData.get(this).name;
  }
  getAge() {
    return privateData.get(this).age;
  }
}
const alice = new Person('Alice', 30);
console.log(alice.getName()); // 'Alice'
// When alice is no longer referenced, the entry in privateData is automatically removed

// WeakMap for DOM element metadata
const elementMetadata = new WeakMap();
function trackClicks(element) {
  let count = elementMetadata.get(element) || 0;
  count++;
  elementMetadata.set(element, count);
  console.log(\`Clicks: \${count}\`);
}
const button = document.getElementById('myButton');
trackClicks(button); // 1
trackClicks(button); // 2
// When button is removed from DOM and no longer referenced, the metadata is garbage collected

// WeakSet for tracking seen objects without preventing GC
const visited = new WeakSet();
function process(obj) {
  if (visited.has(obj)) return;
  visited.add(obj);
  // process obj
}
const data = { id: 1 };
process(data);
process(data); // won't process again
// When data is no longer referenced, it is removed from visited automatically

// Map vs WeakMap comparison
let obj = { key: 'value' };
const strongMap = new Map();
const weakMap = new WeakMap();
strongMap.set(obj, 'metadata');
weakMap.set(obj, 'metadata');
obj = null; // remove strong reference
// After this, strongMap still holds a reference to the object (prevents GC)
// weakMap does NOT prevent GC – the entry will be removed automatically

// WeakMap is not iterable
// for (const [key, value] of weakMap) {} // TypeError
// console.log(weakMap.size); // undefined

// Practical: caching with WeakMap (auto-cleanup)
const cache = new WeakMap();
function compute(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveComputation(obj);
  cache.set(obj, result);
  return result;
}
// When obj is no longer needed, cache entry disappears automatically

// WeakSet example: marking objects without preventing GC
const activeRequests = new WeakSet();
function makeRequest(obj) {
  if (activeRequests.has(obj)) return;
  activeRequests.add(obj);
  fetch('/api').finally(() => {
    activeRequests.delete(obj);
  });
}
// Prevents duplicate requests while allowing GC of request objects

// WeakMap for storing event listeners (prevent leaks)
const listeners = new WeakMap();
function addWeakListener(element, event, handler) {
  if (!listeners.has(element)) listeners.set(element, new Map());
  const elementListeners = listeners.get(element);
  elementListeners.set(event, handler);
  element.addEventListener(event, handler);
}
// When element is removed, the listener map is automatically cleaned up

// Note: WeakMap/WeakSet keys/values must be objects
// weakMap.set('string', 'value'); // TypeError: Invalid value used as weak map key
// weakSet.add(123); // TypeError`,
  },
  {
    id: "concept-symbol",
    type: "concept",
    topic: "JavaScript Core",
    title: "Symbol Type",
    prompt: "What are Symbols in JavaScript? When would you use them?",
    expected:
      "Symbols are unique, immutable primitive values often used as object property keys to avoid naming collisions and to define well-known protocol methods (e.g., Symbol.iterator).",
    keywords: [
      "symbol",
      "unique",
      "property key",
      "well-known symbol",
      "iterator",
    ],
    explanation: `Symbol is a primitive data type introduced in ES6. Every symbol value returned from Symbol() is guaranteed to be unique, even if created with the same description. Symbols are primarily used as property keys for objects, offering several advantages over string keys.

**Key characteristics:**
- **Uniqueness:** Each symbol is distinct; Symbol('id') !== Symbol('id').
- **Not auto-converted to string:** console.log(Symbol('foo')) works, but 'foo' + Symbol() throws TypeError.
- **Hidden from normal iteration:** Symbol-keyed properties are not enumerable in for...in or Object.keys() (but can be accessed via Object.getOwnPropertySymbols()).
- **Well-known symbols:** Built-in symbols like Symbol.iterator, Symbol.toStringTag, Symbol.hasInstance that define language protocol behavior.

**Creating Symbols:**
- Symbol(description) – creates a new unique symbol.
- Symbol.for(key) – retrieves a symbol from the global symbol registry; same key returns same symbol.
- Symbol.keyFor(sym) – returns the key for a symbol in the global registry.

**Use cases:**
- **Avoiding property name collisions** – especially in libraries or when extending objects from third-party code.
- **Defining "hidden" properties** – properties that won't show up in normal enumeration.
- **Implementing iteration protocols** – using Symbol.iterator to make an object iterable.
- **Customizing language behaviour** – e.g., Symbol.toPrimitive for type conversion, Symbol.hasInstance for instanceof.

**Interview tip:** Understand the difference between Symbol() and Symbol.for() – the former creates a new unique symbol each time, the latter retrieves/reuses a global symbol. Be ready to implement an iterable object using Symbol.iterator. Also know that symbols are not completely private (they can be discovered with Object.getOwnPropertySymbols).`,
    code: `// Creating symbols
const sym1 = Symbol('id');
const sym2 = Symbol('id');
console.log(sym1 === sym2); // false (each symbol is unique)
console.log(typeof sym1); // 'symbol'

// Using symbols as property keys
const user = {
  name: 'Alice',
  [sym1]: 12345
};
console.log(user[sym1]); // 12345
// Symbols are not enumerable in for...in
for (const key in user) {
  console.log(key); // 'name' (sym1 not shown)
}
console.log(Object.keys(user)); // ['name']
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(id)]

// Global symbol registry
const globalSym1 = Symbol.for('app.global');
const globalSym2 = Symbol.for('app.global');
console.log(globalSym1 === globalSym2); // true
console.log(Symbol.keyFor(globalSym1)); // 'app.global'
// Symbol.keyFor works only for symbols in global registry; for local symbols returns undefined

// Well-known symbol: Symbol.iterator (make an object iterable)
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]: function* () {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
};
console.log([...range]); // [1,2,3,4,5]

// Symbol.toPrimitive – custom type conversion
const amount = {
  value: 100,
  [Symbol.toPrimitive](hint) {
    if (hint === 'string') return \`$\{this.value}\`;
    if (hint === 'number') return this.value;
    return this.value;
  }
};
console.log(String(amount)); // '100'
console.log(+amount); // 100
console.log(amount + 50); // 150

// Symbol.toStringTag – custom Object.prototype.toString result
class MyClass {
  get [Symbol.toStringTag]() {
    return 'MyCustomClass';
  }
}
const obj = new MyClass();
console.log(Object.prototype.toString.call(obj)); // '[object MyCustomClass]'

// Symbol.hasInstance – custom instanceof behaviour
class EvenNumber {
  static [Symbol.hasInstance](instance) {
    return Number(instance) % 2 === 0;
  }
}
console.log(2 instanceof EvenNumber); // true
console.log(3 instanceof EvenNumber); // false

// Symbol.species – controlling return type in derived arrays (advanced)
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
const myArr = new MyArray(1,2,3);
const mapped = myArr.map(x => x * 2);
console.log(mapped instanceof MyArray); // false (returns Array, not MyArray)

// Preventing property name collisions in mixins
const mixin = (target, source) => {
  const symbols = Object.getOwnPropertySymbols(source);
  for (const sym of symbols) {
    target[sym] = source[sym];
  }
  return target;
};
const methods = {
  [Symbol('greet')]() { return 'Hello'; },
  [Symbol('farewell')]() { return 'Goodbye'; }
};
class Person {}
mixin(Person.prototype, methods);
const p = new Person();
console.log(p[Object.getOwnPropertySymbols(p)[0]]()); // 'Hello'

// Symbol cannot be used with new (not a constructor)
// new Symbol('test'); // TypeError

// Conversion to string or number
try {
  const sym = Symbol('test');
  // console.log('value: ' + sym); // TypeError: Cannot convert a Symbol value to a string
  console.log(String(sym)); // 'Symbol(test)'
  console.log(sym.toString()); // 'Symbol(test)'
} catch(e) {}`,
  },
  {
    id: "concept-proxy",
    type: "concept",
    topic: "JavaScript Core",
    title: "Proxy and Reflect",
    prompt: "What is a Proxy in JavaScript? How does it work with Reflect?",
    expected:
      "A Proxy wraps an object and intercepts operations (get, set, deleteProperty, etc.) through traps. Reflect provides default implementations of these operations, making it easier to delegate to the target object.",
    keywords: ["proxy", "reflect", "trap", "metaprogramming", "intercept"],
    explanation: `Proxy is a powerful metaprogramming feature that allows you to create a wrapper around an object, intercepting and customising fundamental operations like property access, assignment, function invocation, and more. Reflect is a built-in object that provides methods with the same names as the Proxy traps, offering default behaviour.

**How Proxy works:**
- new Proxy(target, handler) creates a proxy object that wraps the target.
- The handler object contains traps (methods) that intercept operations on the proxy.
- Each trap corresponds to a specific operation (get, set, has, deleteProperty, apply, construct, etc.).
- If a trap is not defined, the operation forwards to the target by default.

**Common traps:**
- get(target, prop, receiver) – intercepts property reading.
- set(target, prop, value, receiver) – intercepts property assignment.
- has(target, prop) – intercepts the 'in' operator.
- deleteProperty(target, prop) – intercepts delete.
- apply(target, thisArg, args) – intercepts function calls.
- construct(target, args, newTarget) – intercepts new operator.

**Reflect:**
- Provides static methods (Reflect.get, Reflect.set, etc.) that mirror the proxy traps.
- Reflect methods return appropriate values (e.g., Reflect.set returns boolean success).
- Using Reflect inside traps makes it easy to forward operations to the target with default behaviour.

**Use cases for Proxy:**
- Validation (reject invalid property assignments).
- Logging / auditing (log all property accesses).
- Computed properties (dynamic properties based on pattern).
- Deprecation warnings (warn when accessing deprecated properties).
- Auto-binding (automatically bind methods to instance).
- Negative array indices (allow arr[-1] to mean last element).
- Revocable proxies (create proxies that can be revoked).

**Interview tip:** Be ready to implement a validation proxy, explain the relationship between Proxy and Reflect, and discuss performance implications (proxy traps add overhead). Also know that proxies can be used with arrays, functions, and even other proxies.`,
    code: `// Basic proxy – logging property access
const target = { name: 'Alice', age: 30 };
const handler = {
  get(target, prop, receiver) {
    console.log(\`GET \${prop}\`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(\`SET \${prop} = \${value}\`);
    return Reflect.set(target, prop, value, receiver);
  }
};
const proxy = new Proxy(target, handler);
console.log(proxy.name); // GET name, logs 'Alice'
proxy.age = 31; // SET age = 31
console.log(target.age); // 31

// Validation proxy – prevent negative numbers
const validator = {
  set(target, prop, value) {
    if (prop === 'age' && value < 0) {
      throw new Error('Age cannot be negative');
    }
    return Reflect.set(target, prop, value);
  }
};
const person = new Proxy({}, validator);
person.age = 25; // works
// person.age = -5; // Error: Age cannot be negative

// Read-only proxy
function readOnly(obj) {
  return new Proxy(obj, {
    set() { throw new Error('Object is read-only'); },
    deleteProperty() { throw new Error('Object is read-only'); },
    defineProperty() { throw new Error('Object is read-only'); }
  });
}
const config = readOnly({ apiUrl: 'https://api.example.com' });
// config.apiUrl = 'other'; // Error

// Negative array index proxy
function createArrayWithNegativeIndex(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      let index = Number(prop);
      if (!isNaN(index) && index < 0) {
        index = target.length + index;
      }
      return Reflect.get(target, index, receiver);
    }
  });
}
const arr = createArrayWithNegativeIndex([10, 20, 30, 40]);
console.log(arr[-1]); // 40
console.log(arr[-2]); // 30

// Auto-binding methods (so destructured methods keep 'this')
function autoBind(obj) {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === 'function') {
        return value.bind(target);
      }
      return value;
    }
  });
}
const greeter = autoBind({
  name: 'Alice',
  greet() { console.log(this.name); }
});
const { greet } = greeter;
greet(); // 'Alice' (would be undefined without autoBind)

// Revocable proxy – can be turned off
const target2 = { secret: 'classified' };
const { proxy: revocableProxy, revoke } = Proxy.revocable(target2, {});
console.log(revocableProxy.secret); // 'classified'
revoke();
// console.log(revocableProxy.secret); // TypeError: Cannot perform 'get' on a proxy that has been revoked

// Apply trap – for function proxies
function sum(a, b) { return a + b; }
const loggingSum = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log(\`sum called with \${args}\`);
    return Reflect.apply(target, thisArg, args);
  }
});
console.log(loggingSum(3, 5)); // logs 'sum called with 3,5' then 8

// Construct trap – for class interception
class Animal {
  constructor(name) { this.name = name; }
}
const AnimalProxy = new Proxy(Animal, {
  construct(target, args, newTarget) {
    console.log(\`Creating animal with name \${args[0]}\`);
    return Reflect.construct(target, args, newTarget);
  }
});
const dog = new AnimalProxy('Rex'); // logs 'Creating animal with name Rex'

// Proxy for computed properties (dynamic properties)
const dynamic = new Proxy({}, {
  get(target, prop) {
    if (prop === 'now') return Date.now();
    return Reflect.get(target, prop);
  }
});
console.log(dynamic.now); // current timestamp
console.log(dynamic.something); // undefined

// Performance note: proxies are slower than direct access; use only when needed`,
  },
  {
    id: "concept-intersection-observer",
    type: "concept",
    topic: "Browser APIs",
    title: "Intersection Observer",
    prompt:
      "What is Intersection Observer? How does it improve performance compared to scroll event listeners?",
    expected:
      "Intersection Observer asynchronously observes changes in the intersection of a target element with an ancestor or viewport. It is more efficient than scroll event listeners because it offloads intersection calculations to the browser's rendering engine and batches updates.",
    keywords: [
      "intersection observer",
      "lazy loading",
      "infinite scroll",
      "viewport",
      "performance",
    ],
    explanation: `Intersection Observer is a browser API that provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or the document's viewport. It eliminates the need for expensive scroll event handlers and manual position calculations.

**Key benefits over scroll events:**
- **Performance:** Intersection calculations happen in the browser's compositor thread, not the main thread. No layout thrashing.
- **Asynchronous:** Callbacks run after changes occur, not on every scroll frame.
- **Batched updates:** Multiple elements can be observed with a single observer; changes are batched.
- **Threshold control:** You can specify at what percentage of visibility to trigger callbacks.
- **No need for requestAnimationFrame or debouncing.**

**Common use cases:**
- **Lazy loading images:** Load images only when they are about to enter the viewport.
- **Infinite scrolling:** Load more content when user scrolls near the bottom.
- **Scroll‑triggered animations:** Play animations when elements become visible.
- **Ad impression tracking:** Report when an ad becomes visible to the user.
- **Virtual scrolling:** Efficiently render only visible items in a long list.

**Constructor options:**
- root – the element used as the viewport (default: browser viewport).
- rootMargin – margin around the root (e.g., '50px 0px').
- threshold – number or array of numbers (0 to 1) indicating at what percentage of visibility to trigger.

**Methods:**
- observe(target) – start observing an element.
- unobserve(target) – stop observing.
- disconnect() – stop observing all elements.

**Interview tip:** Be ready to implement lazy loading images with Intersection Observer and explain why it's better than listening to scroll events. Also discuss the browser support (all modern browsers, with polyfill for IE).`,
    code: `// Basic Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible:', entry.target);
      // Optionally stop observing after it becomes visible
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 }); // trigger when 50% visible
const targetElement = document.querySelector('.target');
observer.observe(targetElement);

// Lazy loading images
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.dataset.src;
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
      }
      obs.unobserve(img);
    }
  });
}, { rootMargin: '100px 0px' }); // start loading 100px before entering viewport
document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

// Infinite scrolling
let page = 1;
const sentinel = document.querySelector('#sentinel');
const infiniteObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreItems(page++);
    }
  });
});
infiniteObserver.observe(sentinel);
async function loadMoreItems(pageNum) {
  const items = await fetch(\`/api/items?page=\${pageNum}\`);
  // append to DOM
  if (!items.hasMore) infiniteObserver.unobserve(sentinel);
}

// Multiple thresholds
const multiObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log(\`Visibility: \${entry.intersectionRatio * 100}%\`);
    if (entry.intersectionRatio > 0.75) {
      entry.target.classList.add('fully-visible');
    }
  });
}, { threshold: [0, 0.25, 0.5, 0.75, 1] });

// rootMargin for pre‑loading (negative values)
const preloadObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // element is within 200px of viewport
      preloadContent(entry.target);
    }
  });
}, { rootMargin: '200px 0px' });

// Using with React (useEffect)
// function LazyImage({ src, alt }) {
//   const imgRef = useRef();
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         imgRef.current.src = src;
//         observer.disconnect();
//       }
//     });
//     if (imgRef.current) observer.observe(imgRef.current);
//     return () => observer.disconnect();
//   }, [src]);
//   return <img ref={imgRef} data-src={src} alt={alt} />;
// }

// Observing multiple elements and disconnecting
const container = document.querySelector('.container');
const items = container.querySelectorAll('.item');
const batchObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // do something
  });
});
items.forEach(item => batchObserver.observe(item));
// Later: batchObserver.disconnect(); // stops observing all

// Detecting when element leaves viewport
const leaveObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      console.log('Element left viewport');
    }
  });
}, { threshold: 0 }); // trigger when visibility changes from >0 to 0

// Browser compatibility check
if ('IntersectionObserver' in window) {
  // use Intersection Observer
} else {
  // fallback to scroll events (or load polyfill)
}`,
  },
  {
    id: "concept-service-worker",
    type: "concept",
    topic: "Browser APIs",
    title: "Service Workers",
    prompt:
      "What are service workers? How do they enable Progressive Web Apps (PWAs)?",
    expected:
      "Service workers are background scripts that act as network proxies, enabling offline support, push notifications, background sync, and caching strategies. They are essential for Progressive Web Apps.",
    keywords: [
      "service worker",
      "PWA",
      "offline",
      "cache",
      "fetch",
      "push notification",
    ],
    explanation: `Service workers are JavaScript files that run separately from the main browser thread, acting as a programmable network proxy between the web application, the browser, and the network. They are the technical foundation of Progressive Web Apps (PWAs), enabling features that were previously only available to native apps.

**Key capabilities:**
- **Offline support:** Intercept fetch requests and serve cached responses when network is unavailable.
- **Push notifications:** Receive push messages from a server even when the app is not open.
- **Background sync:** Defer actions until the device has stable network connectivity.
- **Caching strategies:** Implement custom caching patterns (Cache First, Network First, Stale‑While‑Revalidate).
- **Background updates:** Keep content fresh in the background.

**Lifecycle:**
1. **Registration:** The main page registers the service worker (navigator.serviceWorker.register).
2. **Installation:** The service worker's install event fires – good for caching static assets.
3. **Activation:** The activate event fires – good for cleaning up old caches.
4. **Idle/Termination:** Service workers are terminated when idle to save memory; they are restarted when needed.
5. **Fetch/Message:** Intercept network requests or receive messages from the main page.

**Security restrictions:**
- Service workers only work over HTTPS (or localhost for development).
- They run in a separate thread and have no direct DOM access.
- They are event-driven and terminate when not in use.

**Cache Storage API:**
Service workers use the CacheStorage API (caches object) to store responses. This is separate from HTTP cache and localStorage.

**Interview tip:** Be ready to explain the lifecycle, caching strategies, and how to implement a basic offline fallback. Understand that service workers can be updated, and clients need to be controlled (clients.claim) for immediate takeover. Also discuss the difference between service workers and web workers.`,
    code: `// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered:', reg))
      .catch(err => console.error('SW registration failed:', err));
  });
}

// sw.js – Basic service worker with caching
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/offline.html'
];

// Install event – cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // activate immediately
  );
});

// Fetch event – serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).catch(() => {
          // If both cache and network fail, show offline page
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Activate event – clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // take control of uncontrolled clients
  );
});

// Advanced caching strategy: Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});

// Push notification
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://example.com')
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-queue') {
    event.waitUntil(sendQueuedData());
  }
});
async function sendQueuedData() {
  const queue = await getQueueFromIndexedDB();
  for (const item of queue) {
    await fetch(item.url, { method: 'POST', body: item.data });
  }
}

// Communication between main page and service worker
// In main page
navigator.serviceWorker.controller?.postMessage({ type: 'GET_CACHE_SIZE' });
// In service worker
self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_CACHE_SIZE') {
    caches.open(CACHE_NAME).then(cache => {
      // compute size and reply
      event.source.postMessage({ type: 'CACHE_SIZE', size: 12345 });
    });
  }
});

// Skip waiting and claim clients for immediate update
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// Unregister service worker (for development)
// navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));`,
  },
  {
    id: "concept-web-workers",
    type: "concept",
    topic: "Browser APIs",
    title: "Web Workers",
    prompt: "What are Web Workers? How do they differ from service workers?",
    expected:
      "Web Workers run scripts in background threads, allowing CPU-intensive tasks without blocking the main UI thread. Unlike service workers, they have a direct communication channel with the page (postMessage) and do not intercept network requests.",
    keywords: [
      "web worker",
      "background thread",
      "postMessage",
      "dedicated worker",
      "shared worker",
    ],
    explanation: `Web Workers are a browser API that allows JavaScript to run in background threads, separate from the main execution thread. This prevents CPU-intensive operations (e.g., image processing, heavy calculations, parsing large JSON) from blocking the user interface.

**Key characteristics:**
- **Parallel execution:** Workers run in a separate thread, utilising multi‑core CPUs.
- **No DOM access:** Workers cannot directly access the DOM, window, document, or parent page objects.
- **Communication:** Use postMessage() and onmessage to exchange data with the main thread (data is serialised via structured cloning).
- **Lifecycle:** Workers are terminated when no longer needed (worker.terminate() or from inside self.close()).
- **Same-origin restriction:** Worker scripts must be served from the same origin as the page.

**Types of Web Workers:**
1. **Dedicated Workers:** Used by a single script (one-to-one). Most common.
2. **Shared Workers:** Can be used by multiple scripts from different windows/tabs (same origin). Communicate via ports.
3. **Service Workers:** Specialised workers that act as network proxies (covered separately).
4. **Worklet:** Lightweight workers for rendering pipelines (e.g., AnimationWorklet, PaintWorklet).

**Communication data:**
- postMessage transfers data using structured cloning (supports most types except DOM nodes, functions, and some built-in objects).
- For large data (TypedArrays), you can use transferable objects (ownership is transferred, not copied) for better performance.

**Use cases:**
- Image/video processing (filters, resizing, compression).
- Heavy mathematical calculations (fractals, crypto, simulations).
- Parsing large JSON or CSV files.
- Real-time data processing (audio, WebSocket data streams).
- Offloading expensive computations to keep UI responsive.

**Comparison with Service Workers:**
| Feature | Web Worker | Service Worker |
|---------|-----------|----------------|
| Thread | Background | Background |
| DOM access | No | No |
| Network interception | No | Yes (fetch event) |
| Lifecycle | Page-bound | Browser-managed (persistent) |
| Offline support | No (requires Service Worker) | Yes (cache API) |
| Push notifications | No | Yes |
| Use case | Heavy computation | PWA, offline, caching |

**Interview tip:** Be ready to implement a worker for a computationally expensive task and explain how to transfer large buffers efficiently. Also understand the difference between dedicated and shared workers. Know that workers can import other scripts using importScripts().`,
    code: `// Main thread (main.js)
// Create a dedicated worker
const worker = new Worker('worker.js');
// Send data to worker
worker.postMessage({ type: 'CALCULATE', data: [1, 2, 3, 4, 5] });
// Receive data from worker
worker.onmessage = (event) => {
  console.log('Result from worker:', event.data);
  // { type: 'RESULT', value: 15 }
};
// Handle errors
worker.onerror = (error) => {
  console.error('Worker error:', error);
};
// Terminate worker (when no longer needed)
// worker.terminate();

// worker.js – Dedicated Worker
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  if (type === 'CALCULATE') {
    const result = data.reduce((a,b) => a + b, 0);
    self.postMessage({ type: 'RESULT', value: result });
  }
});

// Worker with importScripts (load external libraries)
// worker.js
importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js');
self.addEventListener('message', (event) => {
  const result = _.sum(event.data);
  self.postMessage(result);
});

// Using transferable objects (TypedArray) for performance
// main.js
const buffer = new ArrayBuffer(1024 * 1024 * 10); // 10MB
const view = new Uint8Array(buffer);
worker.postMessage({ buffer }, [buffer]); // transfer ownership, main thread can no longer access buffer

// Shared Worker (can be used by multiple tabs)
// main.js (both tabs)
const sharedWorker = new SharedWorker('shared-worker.js');
sharedWorker.port.start();
sharedWorker.port.postMessage('Hello from tab');
sharedWorker.port.onmessage = (e) => console.log(e.data);
// shared-worker.js
const ports = [];
self.onconnect = (event) => {
  const port = event.ports[0];
  ports.push(port);
  port.onmessage = (e) => {
    ports.forEach(p => p.postMessage('Broadcast: ' + e.data));
  };
  port.start();
};

// Error handling inside worker
self.addEventListener('error', (error) => {
  console.error('Worker internal error:', error.message);
  self.postMessage({ error: error.message });
});

// Closing worker from inside
self.close();

// Worker pool pattern for parallel processing
class WorkerPool {
  constructor(workerScript, poolSize = navigator.hardwareConcurrency || 4) {
    this.workers = [];
    this.queue = [];
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript);
      worker.isIdle = true;
      worker.onmessage = (e) => this.handleResult(e);
      this.workers.push(worker);
    }
  }
  handleResult(event) {
    const worker = event.target;
    worker.isIdle = true;
    const callback = worker.currentCallback;
    callback(event.data);
    this.runNext();
  }
  runTask(data, callback) {
    this.queue.push({ data, callback });
    this.runNext();
  }
  runNext() {
    if (this.queue.length === 0) return;
    const idleWorker = this.workers.find(w => w.isIdle);
    if (idleWorker) {
      const task = this.queue.shift();
      idleWorker.isIdle = false;
      idleWorker.currentCallback = task.callback;
      idleWorker.postMessage(task.data);
    }
  }
}
// Usage: const pool = new WorkerPool('worker.js', 4);
// pool.runTask([1,2,3], result => console.log(result));

// Inline worker using Blob (no separate file)
const blob = new Blob([\`
  self.onmessage = (e) => {
    self.postMessage(e.data * 2);
  };
\`], { type: 'application/javascript' });
const inlineWorker = new Worker(URL.createObjectURL(blob));
inlineWorker.postMessage(21);
inlineWorker.onmessage = (e) => console.log(e.data); // 42

// Browser support check
if (window.Worker) {
  // Web Workers supported
} else {
  // fallback to main thread computation
}`,
  },
];
