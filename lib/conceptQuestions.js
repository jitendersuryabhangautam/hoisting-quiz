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
  {
    id: "concept-strict-mode",
    type: "concept",
    topic: "JavaScript Core",
    title: "Strict Mode",
    prompt: "What does 'use strict' do and why is it important?",
    expected:
      "Strict mode enforces stricter parsing and error handling, disallowing certain silent failures and making JavaScript more secure and optimisable.",
    keywords: ["strict mode", "use strict", "error handling", "security"],
    explanation: `Strict mode is a feature introduced in ES5 that enables a restricted variant of JavaScript, where silent errors become thrown exceptions and certain problematic features are disabled. It can be applied to entire scripts or individual functions by including the directive 'use strict'; at the beginning.

**Key changes in strict mode:**
- **Cannot accidentally create global variables:** Assigning to an undeclared variable throws a ReferenceError instead of creating a global property.
- **Silent failures become thrown errors:** Attempting to assign to non-writable properties, define duplicate property names, or delete non-configurable properties throws errors.
- **Eliminates 'this' coercion:** In functions, 'this' is undefined instead of the global object when not in a method context.
- **No duplicate parameter names:** Functions cannot have parameters with the same name.
- **No octal literals:** Syntax like 0123 (octal) is disallowed.
- **Restricted identifiers:** 'eval' and 'arguments' cannot be used as variable/parameter names.
- **Safer eval:** Variables declared inside eval do not leak into the surrounding scope.
- **No deleting variables:** delete cannot be used on variables (only object properties).
- **No 'with' statement:** 'with' is completely forbidden.

**Benefits:**
- **Catches common coding mistakes** early (e.g., typos creating globals).
- **Improves security** by preventing certain language features that can be misused.
- **Enables engine optimisations** because the code is more predictable.
- **Future‑proofs code** by disallowing syntax that may conflict with future ECMAScript versions.

**How to enable:**
- Script level: "use strict"; at the very top of a script file.
- Function level: inside a function body.
- Modules and classes are automatically in strict mode (no directive needed).

**Interview tip:** Be ready to list at least 5 differences between strict and non‑strict mode. Also understand that strict mode cannot be undone once enabled for a scope. Know that modern JavaScript (ES modules, classes) is automatically strict, so the directive is often omitted in those contexts.`,
    code: `// Non-strict mode: accidental global
function nonStrict() {
  x = 10; // creates global variable 'x'
}
nonStrict();
console.log(window.x); // 10 (in browser)

// Strict mode: throws error
function strict() {
  'use strict';
  y = 20; // ReferenceError: y is not defined
}
// strict();

// this coercion difference
function showThis() {
  'use strict';
  console.log(this); // undefined (non-strict would log window/global)
}
showThis();

// Duplicate parameter names
function duplicate(a, a) { // allowed in non-strict
  console.log(a);
}
// 'use strict'; function duplicate(a, a) {} // SyntaxError

// Deleting variables
var z = 5;
// delete z; // SyntaxError in strict mode (non-strict returns false)

// Octal literals
// var oct = 0123; // SyntaxError in strict mode (allowed in non-strict, value 83)

// eval does not leak
'use strict';
eval('var leaked = 42');
console.log(typeof leaked); // 'undefined' (in non-strict, would be 'number')

// Cannot use 'eval' or 'arguments' as variable names
// 'use strict'; var eval = 5; // SyntaxError

// Safe from future reserved words
// 'use strict'; var private = 'test'; // SyntaxError (private is a future reserved word)

// With statement forbidden
// 'use strict'; with (Math) { console.log(PI); } // SyntaxError

// Assigning to non-writable property
const obj = {};
Object.defineProperty(obj, 'readOnly', { value: 42, writable: false });
// obj.readOnly = 100; // TypeError in strict mode, silent fail in non-strict

// Modules and classes are automatically strict
// In a module file (type="module" or .mjs):
// var globalVar = 10; // creates variable in module scope, not global
// this === undefined inside module

// In a class:
class MyClass {
  constructor() {
    // automatically strict
  }
}

// Practical: using strict mode to catch typos
function calculateTotal(price, tax) {
  'use strict';
  total = price + (price * tax); // ReferenceError: total is not defined
  return price + (price * tax);
}

// IIFE with strict mode to avoid polluting global scope
(function() {
  'use strict';
  // code here is strict
})();

// Browser console may be in strict or non-strict depending on settings.`,
  },
  {
    id: "concept-bubbling-capturing",
    type: "concept",
    topic: "Browser APIs",
    title: "Event Bubbling and Capturing",
    prompt:
      "Explain event bubbling and capturing in the DOM. How do you stop propagation?",
    expected:
      "Bubbling: events propagate from target element up to ancestors. Capturing: events propagate from ancestors down to target. Use stopPropagation() to prevent further propagation.",
    keywords: [
      "bubbling",
      "capturing",
      "event propagation",
      "stopPropagation",
      "event delegation",
    ],
    explanation: `Event propagation in the DOM describes the order in which event handlers are called when an event occurs on a nested element. It consists of three phases:

1. **Capturing phase (trickling):** The event starts from the window and goes down through ancestors to the target element. This phase is rarely used.
2. **Target phase:** The event reaches the target element (the one that triggered the event).
3. **Bubbling phase:** The event bubbles up from the target element back up through ancestors to the window.

**Event listeners can be attached to either phase:** The third parameter of addEventListener (useCapture) determines the phase:
- false (default) – listener runs during bubbling phase.
- true – listener runs during capturing phase.

**Bubbling example:** Clicking a button inside a div inside a body will trigger handlers on: button (target), then div (bubbling), then body (bubbling).

**Event delegation:** A technique that leverages bubbling to handle events on many elements with a single parent listener. Instead of attaching listeners to each child, you attach one to a parent and use event.target to identify the actual clicked element. This is memory-efficient and works for dynamically added elements.

**Stopping propagation:**
- event.stopPropagation() – prevents further propagation through the DOM tree (both bubbling and capturing).
- event.stopImmediatePropagation() – also prevents other listeners on the same element from firing.

**Note:** stopPropagation does not prevent other event handlers on the same element from running – only propagation to other elements.

**Interview tip:** Understand the difference between stopPropagation and preventDefault. Be able to implement event delegation and explain why it's useful for dynamic content. Also know that some events (e.g., focus, scroll, load) do not bubble.`,
    code: `// HTML structure:
// <div id="parent">
//   <button id="child">Click me</button>
// </div>

// Bubbling example (default)
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked (bubbling)');
});
document.getElementById('child').addEventListener('click', () => {
  console.log('Child clicked');
});
// Clicking child outputs: 'Child clicked', then 'Parent clicked (bubbling)'

// Capturing example (useCapture = true)
document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked (capturing)');
}, true);
document.getElementById('child').addEventListener('click', () => {
  console.log('Child clicked');
}, true);
// Clicking child outputs: 'Parent clicked (capturing)', then 'Child clicked'

// Complete propagation flow
// Capturing: window → document → html → body → parent → child
// Target: child
// Bubbling: child → parent → body → html → document → window

// Stopping propagation
document.getElementById('child').addEventListener('click', (e) => {
  e.stopPropagation(); // prevents parent from receiving the event
  console.log('Child only');
});

// stopImmediatePropagation (prevents other listeners on same element)
document.getElementById('child').addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  console.log('First listener');
});
document.getElementById('child').addEventListener('click', () => {
  console.log('Second listener'); // never runs
});

// Event delegation
document.getElementById('parent').addEventListener('click', (e) => {
  if (e.target && e.target.matches('button')) {
    console.log('Button clicked:', e.target.textContent);
  }
});
// Works even for dynamically added buttons:
const newBtn = document.createElement('button');
newBtn.textContent = 'Dynamic';
document.getElementById('parent').appendChild(newBtn);

// Event delegation with data attributes
document.querySelector('.container').addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.delete-btn');
  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    console.log('Delete item:', id);
  }
});

// Checking if an event is cancelable
if (event.cancelable) {
  event.preventDefault();
}

// Events that do NOT bubble: focus, blur, load, unload, scroll, resize
// But their counterparts focusin/focusout do bubble

// Using event phase property
document.getElementById('child').addEventListener('click', (e) => {
  console.log(e.eventPhase); // 2 (AT_TARGET)
});
// 0: NONE, 1: CAPTURING_PHASE, 2: AT_TARGET, 3: BUBBLING_PHASE

// Removing event listeners (must reference the same function)
function handler(e) { console.log('clicked'); }
element.addEventListener('click', handler);
element.removeEventListener('click', handler);

// One-time event listener (automatically removed after firing)
element.addEventListener('click', handler, { once: true });

// Passive event listeners (for scroll performance)
element.addEventListener('touchstart', handler, { passive: true });
// prevents calling preventDefault() inside the handler

// Event delegation with filtering by class
document.querySelector('ul').addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (li && li.parentElement === document.querySelector('ul')) {
    console.log('List item clicked:', li.textContent);
  }
});`,
  },
  {
    id: "concept-requestanimationframe",
    type: "concept",
    topic: "Browser APIs",
    title: "requestAnimationFrame",
    prompt:
      "What is requestAnimationFrame and how is it better than setTimeout for animations?",
    expected:
      "requestAnimationFrame schedules a function to run before the next repaint, synchronising with the browser's refresh rate (typically 60fps). It is more efficient than setTimeout for animations because it pauses when tab is inactive and reduces dropped frames.",
    keywords: [
      "requestAnimationFrame",
      "animation",
      "performance",
      "frame rate",
      "RAF",
    ],
    explanation: `requestAnimationFrame (RAF) is a browser API that tells the browser to run a function before the next repaint. It is specifically designed for animations and visual updates, offering several advantages over setTimeout/setInterval.

**How it works:**
- You pass a callback function to requestAnimationFrame.
- The browser calls the callback before the next repaint, synchronised with the display's refresh rate (usually 60Hz, i.e., every 16.6ms).
- The callback receives a high-resolution timestamp (DOMHighResTimeStamp) indicating when the frame started.
- To create an animation loop, you recursively call requestAnimationFrame inside the callback.

**Advantages over setTimeout/setInterval:**
1. **Synchronised with screen refresh:** Avoids unnecessary renders and reduces dropped frames.
2. **Efficient when tab is inactive:** RAF pauses when the tab is not visible, saving CPU and battery.
3. **Batchers multiple animations:** All RAF callbacks in the same frame are executed together.
4. **Better timing accuracy:** Uses the browser's internal timing, reducing drift.
5. **No need to specify frame rate:** Automatically matches the display's capabilities (e.g., 144Hz monitors).

**Common use cases:**
- Smooth animations (transitions, scrolling effects, canvas animations).
- Game loops (update and render).
- Progressive rendering (loading spinners, progress bars).
- Throttling high‑frequency events (like scroll) while still keeping smoothness.

**Performance tip:** Always measure the time delta between frames to make animations frame‑rate independent (e.g., move objects by delta * speed).

**Cancelation:** Use cancelAnimationFrame(id) to stop the animation.

**Interview tip:** Be ready to implement a simple animation loop with RAF and explain why it's preferred over setTimeout for visual updates. Also discuss the fallback to setTimeout for older browsers.`,
    code: `// Basic animation loop
let start = null;
function animate(timestamp) {
  if (!start) start = timestamp;
  const progress = timestamp - start;
  const element = document.getElementById('box');
  element.style.transform = \`translateX(\${Math.min(progress / 10, 200)}px)\`;
  if (progress < 2000) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);

// Frame‑rate independent animation (using delta time)
let lastTimestamp = 0;
let position = 0;
const speed = 100; // pixels per second
function smoothAnimate(timestamp) {
  if (lastTimestamp) {
    const delta = Math.min(100, timestamp - lastTimestamp); // cap at 100ms
    position += speed * (delta / 1000);
    element.style.transform = \`translateX(\${position}px)\`;
  }
  lastTimestamp = timestamp;
  requestAnimationFrame(smoothAnimate);
}
requestAnimationFrame(smoothAnimate);

// Cancelling animation
let animationId = requestAnimationFrame(function frame() {
  // do animation
  animationId = requestAnimationFrame(frame);
});
// Later:
cancelAnimationFrame(animationId);

// Using RAF for scroll throttling (smooth scroll handling)
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      console.log('Scroll position:', window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
});

// Fallback for browsers that don't support RAF
const requestAnimationFrameFallback = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { setTimeout(callback, 1000 / 60); };

// Canvas animation example
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let x = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(x, 50, 50, 50);
  x = (x + 2) % canvas.width;
  requestAnimationFrame(draw);
}
draw();

// RAF with Promise for frame readiness
function waitForFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}
async function animateSequentially() {
  await waitForFrame();
  // do first frame
  await waitForFrame();
  // do second frame
}

// Measuring frame rate
let frameCount = 0;
let lastTime = performance.now();
function measureFPS(timestamp) {
  frameCount++;
  const delta = timestamp - lastTime;
  if (delta >= 1000) {
    console.log(\`FPS: \${frameCount}\`);
    frameCount = 0;
    lastTime = timestamp;
  }
  requestAnimationFrame(measureFPS);
}
requestAnimationFrame(measureFPS);

// RAF with setTimeout fallback for long tasks
function longTask() {
  // heavy computation
  requestAnimationFrame(() => {
    // continue after frame
  });
}

// Pre‑RAF: using setInterval for animation (bad)
// let interval = setInterval(() => {
//   // update position
//   element.style.left = x + 'px';
// }, 16); // not synchronised with repaint, can cause jank

// Comparison: setTimeout may run even when tab is inactive (wasting resources)
// RAF automatically pauses, saving battery

// Using RAF to measure layout thrashing
let rafId;
function smoothScrollTo(targetY) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 500;
  let startTime;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + distance * progress);
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    }
  }
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(step);
}`,
  },
  {
    id: "concept-custom-elements",
    type: "concept",
    topic: "Web Components",
    title: "Custom Elements",
    prompt:
      "What are custom elements in Web Components? How do you define and use them?",
    expected:
      "Custom elements allow developers to define their own HTML tags with custom behaviour, using the CustomElementRegistry API. They can have lifecycle callbacks (connectedCallback, disconnectedCallback, etc.) and can be autonomous (extending HTMLElement) or customised built‑ins (extending specific HTML elements).",
    keywords: [
      "custom elements",
      "web components",
      "customElementRegistry",
      "connectedCallback",
      "lifecycle",
    ],
    explanation: `Custom elements are a core part of the Web Components specification, enabling developers to create new HTML tags with their own JavaScript behaviour, styles, and markup. They allow for reusable, encapsulated components that work across any framework (or no framework).

**Key concepts:**
- **CustomElementRegistry:** The global registry where custom elements are defined (customElements.define()).
- **Element name:** Must contain a hyphen (e.g., 'my-button', 'user-card') to avoid conflicts with future native elements.
- **Class definition:** Must extend HTMLElement (or an existing HTML element for customised built‑ins).
- **Lifecycle callbacks:**
  - connectedCallback() – when the element is added to the DOM.
  - disconnectedCallback() – when removed from the DOM.
  - attributeChangedCallback(attrName, oldVal, newVal) – when observed attributes change.
  - adoptedCallback() – when the element is moved to a new document.

**Observed attributes:** Define static get observedAttributes() to specify which attributes trigger attributeChangedCallback.

**Two types of custom elements:**
1. **Autonomous custom elements:** Extend HTMLElement. Define completely new elements.
2. **Customised built‑in elements:** Extend built‑in elements (e.g., HTMLButtonElement). Use 'is' attribute in HTML. Not supported in all browsers (Safari lacks support).

**Benefits:**
- Framework‑agnostic components.
- Native browser support (no extra libraries needed).
- Encapsulated via Shadow DOM (optional but recommended).
- Reusable across projects.

**Interview tip:** Be ready to define a simple custom element, explain the lifecycle callbacks, and discuss the difference between autonomous and customised built‑in elements. Also mention that Shadow DOM is often used together with custom elements for style encapsulation.`,
    code: `// Defining an autonomous custom element
class MyButton extends HTMLElement {
  constructor() {
    super();
    // Do not manipulate DOM here – wait for connectedCallback
  }
  connectedCallback() {
    // Called when element is added to DOM
    this.innerHTML = \`<button>\${this.textContent || 'Click me'}</button>\`;
    this.querySelector('button').addEventListener('click', () => {
      console.log('Button clicked');
      this.dispatchEvent(new CustomEvent('my-click', { detail: { timestamp: Date.now() } }));
    });
  }
  disconnectedCallback() {
    // Cleanup: remove event listeners, timers, etc.
    const btn = this.querySelector('button');
    if (btn) btn.removeEventListener('click');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'label') {
      const btn = this.querySelector('button');
      if (btn) btn.textContent = newValue;
    }
  }
  static get observedAttributes() {
    return ['label'];
  }
}
// Register the element
customElements.define('my-button', MyButton);

// Usage in HTML:
// <my-button label="Submit">Submit</my-button>

// Custom element with Shadow DOM for encapsulation
class UserCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('user-card-template');
    shadow.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    this.shadowRoot.querySelector('.name').textContent = this.getAttribute('name');
    this.shadowRoot.querySelector('.email').textContent = this.getAttribute('email');
  }
  static get observedAttributes() {
    return ['name', 'email'];
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (this.shadowRoot) {
      if (name === 'name') this.shadowRoot.querySelector('.name').textContent = newVal;
      if (name === 'email') this.shadowRoot.querySelector('.email').textContent = newVal;
    }
  }
}
customElements.define('user-card', UserCard);

// HTML template for the shadow DOM
// <template id="user-card-template">
//   <style>
//     .card { border: 1px solid #ccc; padding: 10px; border-radius: 8px; }
//   </style>
//   <div class="card">
//     <div class="name"></div>
//     <div class="email"></div>
//   </div>
// </template>

// Customised built‑in element (less supported)
class HighlightButton extends HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => {
      this.style.backgroundColor = 'yellow';
    });
  }
}
customElements.define('highlight-button', HighlightButton, { extends: 'button' });
// Usage: <button is="highlight-button">Click</button>

// Checking if element is already defined
if (!customElements.get('my-button')) {
  customElements.define('my-button', MyButton);
}

// Upgrading elements already in the DOM
customElements.whenDefined('my-button').then(() => {
  console.log('my-button is ready');
});

// Creating elements dynamically
const btn = document.createElement('my-button');
btn.setAttribute('label', 'Dynamic');
document.body.appendChild(btn);

// Lifecycle order demonstration
class LifecycleDemo extends HTMLElement {
  constructor() { super(); console.log('constructor'); }
  connectedCallback() { console.log('connected'); }
  disconnectedCallback() { console.log('disconnected'); }
  adoptedCallback() { console.log('adopted'); }
  attributeChangedCallback() { console.log('attribute changed'); }
}
customElements.define('lifecycle-demo', LifecycleDemo);

// Element removal triggers disconnectedCallback
const demo = document.createElement('lifecycle-demo');
document.body.appendChild(demo); // logs: constructor, connected
demo.remove(); // logs: disconnected

// Accessing the custom element class from the registry
const MyButtonClass = customElements.get('my-button');
console.log(MyButtonClass === MyButton); // true

// Extending another custom element
class SpecialButton extends MyButton {
  connectedCallback() {
    super.connectedCallback();
    this.style.fontWeight = 'bold';
  }
}
customElements.define('special-button', SpecialButton);`,
  },
  {
    id: "concept-shadow-dom",
    type: "concept",
    topic: "Web Components",
    title: "Shadow DOM",
    prompt:
      "What is Shadow DOM? How does it provide encapsulation for Web Components?",
    expected:
      "Shadow DOM allows a DOM subtree to be attached to an element with encapsulation, isolating styles and markup from the main document. It enables true component scoping for Web Components.",
    keywords: [
      "shadow DOM",
      "encapsulation",
      "shadow root",
      "slot",
      "style isolation",
    ],
    explanation: `Shadow DOM is a browser API that enables a DOM tree (shadow tree) to be attached to an element (shadow host), with the shadow tree's contents being hidden from the main document's DOM and styles. This provides encapsulation for Web Components, preventing style conflicts and DOM queries from leaking in or out.

**Key concepts:**
- **Shadow host:** The regular DOM element that hosts the shadow tree.
- **Shadow root:** The root node of the shadow tree. Can be 'open' (accessible via element.shadowRoot) or 'closed' (not accessible).
- **Shadow tree:** The encapsulated DOM structure inside the shadow root.
- **Slot:** A placeholder inside the shadow tree where light DOM content can be projected (similar to React children).

**Encapsulation benefits:**
1. **Style encapsulation:** CSS rules inside the shadow DOM do not leak out, and external CSS does not affect the shadow DOM (except inherited properties and custom CSS properties).
2. **DOM encapsulation:** querySelector and getElementById from the main document cannot find elements inside the shadow DOM.
3. **Event retargeting:** Events that originate from inside the shadow DOM appear as if they came from the shadow host (event.target is retargeted).

**Modes:**
- **open:** The shadow root is accessible via element.shadowRoot. Allows external scripts to interact with the shadow DOM.
- **closed:** element.shadowRoot returns null. Provides stronger encapsulation but prevents external customisation (use with caution).

**Slots:** Allow users to provide content to the component. Named slots can be used for multiple insertion points.

**Interview tip:** Be ready to explain the difference between open and closed shadow roots, how slots work, and why style encapsulation is valuable. Also understand that global CSS custom properties (variables) do pierce the shadow boundary, enabling theming. Know that event retargeting can affect event delegation patterns.`,
    code: `// Basic Shadow DOM (open mode)
const host = document.getElementById('host');
const shadowRoot = host.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = \`
  <style>
    p { color: red; background: black; }
    .container { border: 1px solid #ccc; padding: 10px; }
  </style>
  <div class="container">
    <p>This text is styled inside shadow DOM</p>
    <slot></slot>
  </div>
\`;
// External styles do not affect the red paragraph, and internal styles don't leak out.

// Closed shadow DOM (inaccessible)
const closedHost = document.getElementById('closed-host');
const closedShadow = closedHost.attachShadow({ mode: 'closed' });
closedShadow.innerHTML = '<p>Hidden from external JS</p>';
console.log(closedHost.shadowRoot); // null

// Using slots for content projection
// In component definition:
const card = document.getElementById('card-host');
const cardShadow = card.attachShadow({ mode: 'open' });
cardShadow.innerHTML = \`
  <style>
    .card { border: 1px solid; padding: 16px; border-radius: 8px; }
    slot[name="header"] { font-weight: bold; display: block; }
    slot[name="footer"] { font-size: small; color: gray; margin-top: 8px; }
  </style>
  <div class="card">
    <slot name="header">Default header</slot>
    <div class="content">
      <slot>Default content</slot>
    </div>
    <slot name="footer">Default footer</slot>
  </div>
\`;
// HTML usage:
// <div id="card-host">
//   <span slot="header">My Title</span>
//   <p>Main content goes here</p>
//   <span slot="footer">Posted by Alice</span>
// </div>

// Styling the host element from inside shadow DOM (using :host)
cardShadow.innerHTML += \`
  <style>
    :host {
      display: block;
      margin: 10px;
    }
    :host-context(.dark-theme) {
      background-color: #333;
      color: white;
    }
  </style>
\`;

// Event retargeting example
const buttonHost = document.getElementById('button-host');
const buttonShadow = buttonHost.attachShadow({ mode: 'open' });
buttonShadow.innerHTML = '<button>Click me</button>';
buttonHost.addEventListener('click', (e) => {
  console.log(e.target); // logs the host element (retargeted), not the button
  console.log(e.composedPath()); // array containing button, shadow root, host, etc.
});

// Accessing slotted content
const slot = cardShadow.querySelector('slot');
const assignedNodes = slot.assignedNodes();
const assignedElements = slot.assignedElements();

// Custom CSS properties pierce shadow DOM (for theming)
// In main document:
// <style> body { --primary-color: blue; } </style>
// In shadow DOM:
// <style> button { background-color: var(--primary-color); } </style>

// Using Shadow DOM with custom elements (Web Components)
class ThemedButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      <style>
        button {
          background-color: var(--button-bg, #007bff);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
        }
      </style>
      <button><slot>Click</slot></button>
    \`;
  }
}
customElements.define('themed-button', ThemedButton);

// Adding multiple shadow roots? Not allowed – only one per host.
// Attempting to attach another will throw an error.

// Using adoptedStyleSheets (constructable stylesheets) for better performance
const sheet = new CSSStyleSheet();
sheet.replaceSync('p { color: green; }');
shadowRoot.adoptedStyleSheets = [sheet];

// Getting the host element from inside shadow DOM
// Inside shadow DOM script: this.getRootNode().host

// Checking if an element has a shadow root
console.log(host.shadowRoot); // not null for open mode

// Slotted content can be styled with ::slotted()
shadowRoot.innerHTML += \`
  <style>
    ::slotted(img) {
      max-width: 100%;
    }
  </style>
\`;`,
  },
  {
    id: "concept-set-vs-array",
    type: "concept",
    topic: "JavaScript Core",
    title: "Set vs Array",
    prompt:
      "What are the differences between Set and Array in JavaScript? When would you use one over the other?",
    expected:
      "Set stores unique values and provides O(1) membership testing, while Array allows duplicates and indexed access. Use Set when uniqueness and fast lookup matter; use Array when order, duplicates, or indexed access is needed.",
    keywords: ["Set", "Array", "unique", "membership", "performance"],
    explanation:
      "Set and Array are both collections, but they serve different purposes.\n\n**Array:**\n- Ordered collection with integer indices.\n- Allows duplicate values.\n- Provides indexed access (arr[0]).\n- Methods: push, pop, shift, unshift, map, filter, reduce, etc.\n- Membership test: .includes() or .indexOf() – O(n) time.\n- Iteration order is guaranteed (by index).\n\n**Set:**\n- Unordered collection of unique values (no duplicates).\n- Does not support indexed access (no arr[0]).\n- Methods: add, delete, has, clear, forEach, keys, values, entries.\n- Membership test: .has() – O(1) average time.\n- Iteration order is insertion order.\n- Automatically deduplicates values.\n\n**When to use Array:**\n- Need to store ordered data (e.g., list of tasks).\n- Need indexed access.\n- Duplicates are allowed or desired.\n- Need array-specific methods (map, filter, reduce).\n- Working with JSON serialisation (Set is not natively serialisable).\n\n**When to use Set:**\n- Need to store unique values (e.g., tags, IDs).\n- Frequent membership checks (has is much faster than includes for large collections).\n- Need automatic deduplication.\n- Order is not important (or insertion order is sufficient).\n- Mathematical set operations (union, intersection, difference) – can be implemented with Set.\n\n**Performance:**\n- Set.has() is O(1); Array.includes() is O(n). For large collections, Set is dramatically faster.\n- Array iteration (for loop) is generally faster than Set iteration for simple operations.\n- Memory: Set can be more memory efficient for unique collections.\n\n**Interview tip:** Be ready to convert Array to Set and vice versa ([...new Set(arr)]), and explain how to implement set operations (union, intersection, difference) using Set.",
    code: '// Basic differences\nconst arr = [1, 2, 2, 3, 3];\nconsole.log(arr); // [1, 2, 2, 3, 3] – duplicates allowed\n\nconst set = new Set([1, 2, 2, 3, 3]);\nconsole.log(set); // Set {1, 2, 3} – duplicates removed\n\n// Adding elements\narr.push(4); // [1,2,2,3,3,4]\nset.add(4); // Set {1,2,3,4}\n\n// Removing elements\nconst index = arr.indexOf(2);\narr.splice(index, 1); // removes first 2\nset.delete(2);\n\n// Membership test\nconsole.log(arr.includes(3)); // true (O(n))\nconsole.log(set.has(3)); // true (O(1))\n\n// Indexed access\nconsole.log(arr[0]); // 1\nconsole.log(set[0]); // undefined (Set does not support indexing)\n\n// Iteration\narr.forEach(v => console.log(v));\nset.forEach(v => console.log(v));\n\n// Convert between Set and Array\nconst uniqueArr = [...new Set([1, 2, 2, 3])]; // [1,2,3]\nconst newSet = new Set([1, 2, 3]);\n\n// Set operations using Set\nfunction union(setA, setB) {\n  return new Set([...setA, ...setB]);\n}\nfunction intersection(setA, setB) {\n  return new Set([...setA].filter(x => setB.has(x)));\n}\nfunction difference(setA, setB) {\n  return new Set([...setA].filter(x => !setB.has(x)));\n}\nconst a = new Set([1,2,3]);\nconst b = new Set([2,3,4]);\nconsole.log(union(a, b)); // Set {1,2,3,4}\nconsole.log(intersection(a, b)); // Set {2,3}\nconsole.log(difference(a, b)); // Set {1}\n\n// Performance comparison (conceptual)\n// For large collections, Set.has() is much faster than Array.includes()\nconst largeArray = Array.from({length: 10000}, (_,i) => i);\nconst largeSet = new Set(largeArray);\nconsole.time(\'Array includes\');\nlargeArray.includes(9999);\nconsole.timeEnd(\'Array includes\');\nconsole.time(\'Set has\');\nlargeSet.has(9999);\nconsole.timeEnd(\'Set has\');\n\n// When order matters – Array\nconst tasks = ["Write code", "Test", "Deploy"];\ntasks.push("Monitor");\n\n// When uniqueness matters – Set\nconst uniqueTags = new Set();\nuniqueTags.add("javascript");\nuniqueTags.add("javascript"); // ignored\nconsole.log(uniqueTags.size); // 1',
  },
  {
    id: "concept-rest-vs-spread",
    type: "concept",
    topic: "JavaScript Core",
    title: "Rest vs Spread Operators",
    prompt:
      "What is the difference between the rest operator and the spread operator?",
    expected:
      "The rest operator (...) collects multiple elements into an array or object; the spread operator expands an iterable into individual elements. Rest is used in function parameters and destructuring; spread is used in array literals, function calls, and object literals.",
    keywords: ["rest", "spread", "...", "destructuring", "iterable"],
    explanation:
      "Both the rest and spread operators use the same syntax (...) but behave oppositely depending on context. Understanding the difference is crucial for modern JavaScript.\n\n**Rest operator – collects elements:**\n- Used in function parameters: function sum(...args) – collects all arguments into an array.\n- Used in array destructuring: const [first, ...rest] = arr – collects remaining elements.\n- Used in object destructuring: const {a, ...rest} = obj – collects remaining properties.\n- Always appears on the left side of assignment or in function parameters.\n- Must be the last element in destructuring.\n\n**Spread operator – expands elements:**\n- Used in array literals: [...arr1, ...arr2] – expands array into individual elements.\n- Used in function calls: Math.max(...arr) – expands array into arguments.\n- Used in object literals: {...obj1, ...obj2} – expands object properties.\n- Always appears on the right side of assignment or in literals.\n- Works on any iterable (arrays, strings, maps, sets, etc.).\n\n**Key differences:**\n| Aspect | Rest | Spread |\n|--------|------|--------|\n| Purpose | Collects | Expands |\n| Position | Left side (destructuring/params) | Right side (literals/calls) |\n| Context | Function parameters, destructuring | Array/object literals, function calls |\n| Returns | Array or object | Individual elements/properties |\n\n**Interview tip:** Be ready to write examples of both and explain that rest collects remaining items while spread unpacks. Also note that spread works on any iterable (including strings, Map, Set) and object spread (ES2018) copies own enumerable properties.",
    code: '// Rest parameters (function)\nfunction sum(...numbers) {\n  return numbers.reduce((a,b) => a + b, 0);\n}\nconsole.log(sum(1,2,3,4)); // 10\n\n// Rest in array destructuring\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(first); // 1\nconsole.log(second); // 2\nconsole.log(rest); // [3,4,5]\n\n// Rest in object destructuring\nconst user = { name: "Alice", age: 30, city: "NYC", country: "USA" };\nconst { name, age, ...address } = user;\nconsole.log(name); // "Alice"\nconsole.log(age); // 30\nconsole.log(address); // { city: "NYC", country: "USA" }\n\n// Spread in array literals\nconst arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combined = [...arr1, ...arr2]; // [1,2,3,4,5,6]\nconst copy = [...arr1]; // shallow copy\n\n// Spread in function calls\nconst numbers = [5, 2, 9, 1];\nconst max = Math.max(...numbers); // 9\n\n// Spread in object literals (ES2018)\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { c: 3, d: 4 };\nconst merged = { ...obj1, ...obj2 }; // { a:1, b:2, c:3, d:4 }\nconst clone = { ...obj1 }; // shallow copy\n\n// Spread with strings\nconst chars = [..."hello"]; // [\'h\',\'e\',\'l\',\'l\',\'o\']\n\n// Spread with Set\nconst unique = [...new Set([1,2,2,3])]; // [1,2,3]\n\n// Rest must be last\n// const [a, ...rest, b] = arr; // SyntaxError\n\n// Spread can be used multiple times and anywhere\nconst result = [1, ...arr1, 10, ...arr2, 100];\n\n// Rest parameter with default values (must come after rest? Actually default before rest)\nfunction log(prefix, ...messages) {\n  messages.forEach(m => console.log(prefix, m));\n}\nlog("INFO:", "Started", "Finished");\n\n// Object rest only includes own enumerable properties\nconst obj = Object.create({ inherited: "value" });\nobj.own = "own";\nconst { own, ...restObj } = obj;\nconsole.log(restObj); // {} (inherited not included)\n\n// Practical: merging configurations\nconst defaultConfig = { theme: "light", showHeader: true };\nconst userConfig = { theme: "dark" };\nconst finalConfig = { ...defaultConfig, ...userConfig };\nconsole.log(finalConfig); // { theme: "dark", showHeader: true }',
  },
  {
    id: "concept-promise-combinators",
    type: "concept",
    topic: "JavaScript Core",
    title: "Promise Combinators",
    prompt:
      "Explain the differences between Promise.all, Promise.race, Promise.any, and Promise.allSettled.",
    expected:
      "Promise.all rejects on first error, returns array of results; Promise.race settles with first settled promise; Promise.any resolves with first fulfilled, rejects only if all reject; Promise.allSettled waits for all to settle, never rejects.",
    keywords: [
      "Promise.all",
      "Promise.race",
      "Promise.any",
      "Promise.allSettled",
      "combinators",
    ],
    explanation:
      'Promise combinators are static methods that handle multiple promises in different ways, allowing you to coordinate concurrent asynchronous operations.\n\n**Promise.all(iterable):**\n- Waits for **all** promises to resolve.\n- Returns an array of results in the same order as the input.\n- If **any** promise rejects, immediately rejects with that error (fail‑fast).\n- Use when you need all operations to succeed (e.g., loading multiple required resources).\n\n**Promise.race(iterable):**\n- Resolves or rejects with the **first** settled promise (fulfilled or rejected).\n- Returns a single value (or error).\n- Use for timeouts (race a promise against a timer), or to get the fastest response from multiple sources.\n\n**Promise.any(iterable):**\n- Resolves with the **first fulfilled** promise.\n- Ignores rejections; only rejects if **all** promises reject (with an AggregateError).\n- Use when you only need one successful result (e.g., multiple backup APIs).\n\n**Promise.allSettled(iterable):**\n- Waits for **all** promises to settle (either fulfill or reject).\n- Returns array of objects: `{status: "fulfilled", value}` or `{status: "rejected", reason}`.\n- Never rejects.\n- Use when you need to know the outcome of all operations regardless of failures (e.g., logging, analytics).\n\n**Comparison table:**\n| Method | Rejection behaviour | Result | Use case |\n|--------|---------------------|--------|----------|\n| all | First rejection | Array of values | All must succeed |\n| race | First settled | Single value | Fastest response or timeout |\n| any | First fulfillment | Single value | Any success is enough |\n| allSettled | Never rejects | Array of status objects | Know all outcomes |\n\n**Interview tip:** Be able to implement a timeout using Promise.race, and explain how Promise.allSettled is safer than Promise.all when some operations may fail. Also note that these methods work with any iterable, not just arrays.',
    code: '// Sample promises\nconst p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.reject(new Error("fail"));\nconst p4 = new Promise(resolve => setTimeout(() => resolve(4), 100));\n\n// Promise.all – all succeed\nPromise.all([p1, p2]).then(results => console.log(results)); // [1,2]\n\n// Promise.all – one fails\nPromise.all([p1, p3]).catch(err => console.error(err.message)); // "fail"\n\n// Promise.race – first settles (p2 wins)\nPromise.race([p4, p2]).then(result => console.log(result)); // 2 (immediate)\n\n// Promise.race with timeout\nfunction timeout(promise, ms) {\n  const timeoutPromise = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error("Timeout")), ms)\n  );\n  return Promise.race([promise, timeoutPromise]);\n}\ntimeout(fetch("/api"), 5000).catch(err => console.log("Request timed out"));\n\n// Promise.any – first fulfillment\nPromise.any([p3, p1, p2]).then(result => console.log(result)); // 1\n\n// Promise.any – all reject\nPromise.any([p3, Promise.reject("another")]).catch(err => {\n  console.log(err instanceof AggregateError); // true\n  console.log(err.errors); // [Error: fail, "another"]\n});\n\n// Promise.allSettled – never rejects\nPromise.allSettled([p1, p3, p2]).then(results => {\n  results.forEach(r => {\n    if (r.status === "fulfilled") console.log("Value:", r.value);\n    else console.log("Reason:", r.reason.message);\n  });\n});\n// Output:\n// Value: 1\n// Reason: fail\n// Value: 2\n\n// Practical: loading multiple resources with fallback\nasync function loadResources() {\n  const results = await Promise.allSettled([\n    fetch("/api/users"),\n    fetch("/api/posts"),\n    fetch("/api/comments")\n  ]);\n  const successful = results.filter(r => r.status === "fulfilled");\n  const failed = results.filter(r => r.status === "rejected");\n  console.log(`Loaded ${successful.length}, failed ${failed.length}`);\n  return successful.map(r => r.value);\n}\n\n// Using Promise.any for redundant APIs\nconst apiEndpoints = [\n  fetch("https://api1.example.com/data"),\n  fetch("https://api2.example.com/data"),\n  fetch("https://api3.example.com/data")\n];\nPromise.any(apiEndpoints).then(response => response.json());\n\n// Empty iterable behaviour\nPromise.all([]); // resolves with []\nPromise.race([]); // never settles\nPromise.any([]); // rejects with AggregateError\nPromise.allSettled([]); // resolves with []',
  },
  {
    id: "concept-event-delegation",
    type: "concept",
    topic: "Browser APIs",
    title: "Event Delegation",
    prompt: "What is event delegation and why is it useful?",
    expected:
      "Event delegation is a technique that attaches a single event listener to a parent element to handle events on its children, leveraging event bubbling. It reduces memory usage and supports dynamically added elements.",
    keywords: [
      "event delegation",
      "bubbling",
      "performance",
      "dynamic elements",
    ],
    explanation:
      "Event delegation is a pattern where a single event listener is attached to a parent element instead of multiple listeners on individual child elements. When an event occurs on a child, it bubbles up to the parent, and the parent's listener checks the event target to determine which child was actually clicked.\n\n**Benefits:**\n- **Memory efficiency:** Only one listener instead of hundreds.\n- **Dynamic content:** Automatically works for elements added later to the DOM (no need to reattach listeners).\n- **Simpler code:** Less boilerplate for attaching/removing listeners.\n- **Performance:** Faster initialisation, especially for large lists.\n\n**How it works:**\n1. Attach a listener to a parent container.\n2. Inside the listener, use `event.target` to identify the actual clicked element.\n3. Use `closest()` or `matches()` to check if the target matches the desired child selector.\n4. Handle the event accordingly.\n\n**Limitations:**\n- Not all events bubble (focus, blur, load, scroll, etc. – use focusin/focusout instead).\n- `event.target` may be a descendant of the desired element (use `closest`).\n- The parent listener may need to differentiate between multiple child types.\n\n**Interview tip:** Be prepared to implement event delegation for a dynamic list (e.g., todo items that can be added and removed). Also explain the difference between `event.target` and `event.currentTarget` (the element the listener is attached to).",
    code: "// Without delegation – inefficient\nconst buttons = document.querySelectorAll('.btn');\nbuttons.forEach(btn => {\n  btn.addEventListener('click', () => {\n    console.log('Button clicked');\n  });\n});\n// New buttons added later will NOT have listeners\n\n// With delegation – one listener for all\nconst container = document.getElementById('button-container');\ncontainer.addEventListener('click', (event) => {\n  const button = event.target.closest('.btn');\n  if (button) {\n    console.log('Button clicked:', button.textContent);\n  }\n});\n// Works for existing and future buttons\n\n// Adding dynamic content\nconst newBtn = document.createElement('button');\nnewBtn.className = 'btn';\nnewBtn.textContent = 'Dynamic';\ncontainer.appendChild(newBtn); // works automatically\n\n// Handling multiple element types in one container\nconst todoList = document.getElementById('todo-list');\ntodoList.addEventListener('click', (event) => {\n  const deleteBtn = event.target.closest('.delete');\n  if (deleteBtn) {\n    const item = deleteBtn.closest('.todo-item');\n    item.remove();\n    return;\n  }\n  const editBtn = event.target.closest('.edit');\n  if (editBtn) {\n    // edit logic\n  }\n});\n\n// Using matches for direct matching\ncontainer.addEventListener('click', (event) => {\n  if (event.target.matches('.btn')) {\n    console.log('Direct click on button');\n  } else if (event.target.closest('.card')) {\n    console.log('Click inside card');\n  }\n});\n\n// Event delegation for form submission (dynamic form fields)\nconst form = document.getElementById('dynamic-form');\nform.addEventListener('submit', (event) => {\n  event.preventDefault();\n  const data = new FormData(form);\n  console.log([...data]);\n});\n\n// Caveat: event.target vs event.currentTarget\nparent.addEventListener('click', (event) => {\n  console.log('Target:', event.target); // the actual clicked element\n  console.log('CurrentTarget:', event.currentTarget); // the parent element\n});\n\n// For non-bubbling events, use capture or alternative events\n// focus does not bubble, but focusin does\nconst container2 = document.getElementById('container');\ncontainer2.addEventListener('focusin', (event) => {\n  if (event.target.matches('input')) {\n    console.log('Input focused:', event.target.name);\n  }\n});\n\n// Performance: single observer vs many\n// Good for large tables, lists, menus\ndocument.querySelector('table').addEventListener('click', (e) => {\n  const row = e.target.closest('tr');\n  if (row) console.log('Row clicked', row.dataset.id);\n});\n\n// Event delegation with data attributes\nmenu.addEventListener('click', (e) => {\n  const item = e.target.closest('[data-action]');\n  if (item) {\n    const action = item.dataset.action;\n    console.log('Action:', action);\n  }\n});",
  },
  {
    id: "concept-storage",
    type: "concept",
    topic: "Browser APIs",
    title: "localStorage vs sessionStorage vs cookies",
    prompt:
      "Compare localStorage, sessionStorage, and cookies. When would you use each?",
    expected:
      "localStorage persists until cleared, sessionStorage lasts per session, cookies are sent with requests and have expiration. Use localStorage for client-only data, sessionStorage for tab-specific data, cookies for authentication or data that must reach the server.",
    keywords: [
      "localStorage",
      "sessionStorage",
      "cookies",
      "storage",
      "persistence",
    ],
    explanation:
      "All three are client-side storage mechanisms, but they differ in capacity, lifespan, scope, and whether data is sent to the server.\n\n**localStorage:**\n- Persists until explicitly cleared (no expiration).\n- Data persists across browser sessions and tabs/windows.\n- Capacity: ~5-10MB (varies by browser).\n- Synchronous API (blocks main thread).\n- Data is **not** sent to the server automatically.\n- Accessible from any tab/window with the same origin.\n\n**sessionStorage:**\n- Persists only for the duration of the page session (tab/window).\n- Cleared when the tab or window is closed.\n- Data is **not** shared between tabs (each tab has its own independent storage).\n- Capacity: ~5-10MB.\n- Synchronous API.\n- Not sent to the server.\n\n**Cookies:**\n- Can have expiration dates (session or specific time).\n- Small capacity: ~4KB per cookie, limited number per domain.\n- Sent to the server with every HTTP request (adds overhead).\n- Can be marked HttpOnly (not accessible via JS) for security.\n- Can be marked Secure (only sent over HTTPS).\n- Can have SameSite attribute to control cross-site requests.\n- Accessible via document.cookie (unless HttpOnly).\n\n**Comparison table:**\n| Feature | localStorage | sessionStorage | cookies |\n|---------|-------------|----------------|---------|\n| Capacity | ~5-10MB | ~5-10MB | ~4KB |\n| Lifetime | Persistent | Tab session | Configurable |\n| Sent to server | No | No | Yes |\n| Shared across tabs | Yes | No | Yes |\n| API | Simple (sync) | Simple (sync) | Complex |\n| HttpOnly support | N/A | N/A | Yes |\n\n**Use cases:**\n- **localStorage:** User preferences, theme settings, offline data, cached API responses (read-only).\n- **sessionStorage:** Temporary form data, scroll position restoration, single‑session workflows, multi‑step wizards.\n- **cookies:** Authentication tokens (HttpOnly, Secure), session identifiers, tracking (consent required), cross-origin state (with proper attributes).\n\n**Security considerations:**\n- Never store sensitive data in localStorage/sessionStorage (XSS can read them).\n- For authentication, use HttpOnly, Secure, SameSite cookies.\n- localStorage is synchronous – large writes can block the main thread.\n\n**Interview tip:** Be able to explain why cookies are still needed for authentication even though localStorage has more capacity (security and automatic sending). Also discuss the difference between session and persistent cookies, and the HttpOnly flag.",
    code: "// localStorage\nlocalStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme');\nlocalStorage.removeItem('theme');\nlocalStorage.clear();\n\n// sessionStorage\nsessionStorage.setItem('scrollPos', window.scrollY);\nconst pos = sessionStorage.getItem('scrollPos');\nsessionStorage.removeItem('scrollPos');\n\n// Cookies\ndocument.cookie = \"user=Alice; path=/; max-age=3600; Secure; SameSite=Lax\";\ndocument.cookie = \"theme=dark; path=/\";\n// Read all cookies\nconst cookies = document.cookie; // \"user=Alice; theme=dark\"\n// Parse cookies\nconst parseCookies = () => {\n  return document.cookie.split('; ').reduce((acc, cookie) => {\n    const [key, value] = cookie.split('=');\n    acc[key] = value;\n    return acc;\n  }, {});\n};\n\n// Storing objects in localStorage\nconst user = { name: \"Alice\", age: 30 };\nlocalStorage.setItem('user', JSON.stringify(user));\nconst storedUser = JSON.parse(localStorage.getItem('user'));\n\n// Checking storage availability\nfunction storageAvailable(type) {\n  try {\n    const storage = window[type];\n    const x = '__storage_test__';\n    storage.setItem(x, x);\n    storage.removeItem(x);\n    return true;\n  } catch (e) {\n    return false;\n  }\n}\n\n// Session storage for multi-step form\n// Step 1\nsessionStorage.setItem('formData', JSON.stringify({ name: \"Alice\" }));\n// Step 2\nconst formData = JSON.parse(sessionStorage.getItem('formData'));\n\n// Cookie with expiration\nfunction setCookie(name, value, days) {\n  const expires = new Date(Date.now() + days * 864e5).toUTCString();\n  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;\n}\n\n// Delete cookie\nfunction deleteCookie(name) {\n  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;\n}\n\n// Security: HttpOnly cookie (set by server, not JS)\n// Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict\n\n// Listening to storage events (cross-tab communication)\nwindow.addEventListener('storage', (event) => {\n  console.log(`Key ${event.key} changed from ${event.oldValue} to ${event.newValue}`);\n  // Can sync UI across tabs\n});\n\n// Practical: save user preference\nif (localStorage.getItem('theme') === 'dark') {\n  document.body.classList.add('dark-theme');\n}\n// Preference survives page reload and browser restart",
  },
  {
    id: "concept-cors",
    type: "concept",
    topic: "Browser APIs",
    title: "CORS (Cross-Origin Resource Sharing)",
    prompt: "What is CORS and how does it work?",
    expected:
      "CORS is a security mechanism that allows servers to specify which origins can access their resources via browsers. It uses HTTP headers (Access-Control-Allow-Origin) and preflight OPTIONS requests for non‑simple requests.",
    keywords: [
      "CORS",
      "cross-origin",
      "preflight",
      "Access-Control-Allow-Origin",
      "same-origin policy",
    ],
    explanation:
      "Cross-Origin Resource Sharing (CORS) is a browser security feature that relaxes the same-origin policy, allowing web pages from one origin to request resources from a different origin. Without CORS, browsers block cross-origin requests by default to prevent malicious sites from reading sensitive data.\n\n**How it works:**\n- The browser sends an HTTP request to a different origin.\n- For **simple requests** (GET, POST with specific headers, Content-Type: text/plain, etc.), the browser adds an `Origin` header and checks the response for `Access-Control-Allow-Origin`.\n- If the response header matches the requesting origin (or is `*`), the browser allows the response; otherwise, it blocks it.\n- For **non‑simple requests** (PUT, DELETE, custom headers, JSON Content-Type), the browser first sends a **preflight** `OPTIONS` request to check permissions. The server must respond with appropriate CORS headers before the actual request is sent.\n\n**Important headers:**\n- `Access-Control-Allow-Origin` – specifies allowed origins (`*` or specific domain).\n- `Access-Control-Allow-Methods` – allowed HTTP methods.\n- `Access-Control-Allow-Headers` – allowed custom headers.\n- `Access-Control-Allow-Credentials` – allows cookies/authorization headers.\n- `Access-Control-Max-Age` – caches preflight results.\n\n**Common CORS errors:**\n- Missing `Access-Control-Allow-Origin` header.\n- Credentials (cookies) not allowed when `withCredentials` is used.\n- Preflight fails due to missing method/header allowance.\n\n**Interview tip:** Understand the difference between simple and preflighted requests, the role of the `Origin` header, and how to configure CORS on the server (e.g., using middleware). Be ready to troubleshoot common CORS issues.",
    code: "// Simple request example (browser)\nfetch('https://api.example.com/data', {\n  method: 'GET',\n  headers: { 'Content-Type': 'text/plain' }\n});\n// Browser adds Origin: https://my-site.com\n// Server must respond with: Access-Control-Allow-Origin: https://my-site.com or *\n\n// Preflighted request (custom header, JSON)\nfetch('https://api.example.com/data', {\n  method: 'PUT',\n  headers: { 'Content-Type': 'application/json', 'X-Custom-Header': 'value' },\n  body: JSON.stringify({ id: 1 })\n});\n// Browser sends OPTIONS preflight first, then actual PUT if allowed.\n\n// Server-side CORS configuration (Express.js example)\nconst express = require('express');\nconst app = express();\napp.use((req, res, next) => {\n  res.setHeader('Access-Control-Allow-Origin', 'https://my-site.com');\n  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');\n  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');\n  res.setHeader('Access-Control-Allow-Credentials', 'true');\n  if (req.method === 'OPTIONS') {\n    return res.sendStatus(204); // respond to preflight\n  }\n  next();\n});\n\n// Using credentials (cookies) with CORS\nfetch('https://api.example.com/user', {\n  credentials: 'include', // send cookies\n  headers: { 'Content-Type': 'application/json' }\n});\n// Server must also set Access-Control-Allow-Credentials: true\n// and cannot use '*' for Allow-Origin (must be specific origin)\n\n// Debugging CORS issues in browser console\n// Look for messages like: 'Access-Control-Allow-Origin' header is missing\n\n// Configuring CORS in popular frameworks\n// Go (Gin): c.Header(\"Access-Control-Allow-Origin\", \"*\")\n// Next.js (API route): res.setHeader('Access-Control-Allow-Origin', '*')",
  },
  {
    id: "concept-websockets",
    type: "concept",
    topic: "Browser APIs",
    title: "WebSockets",
    prompt: "What are WebSockets and when would you use them?",
    expected:
      "WebSockets provide full‑duplex, persistent communication channels over a single TCP connection, enabling real‑time, low‑latency data exchange. They are ideal for chat, live notifications, gaming, and collaborative applications.",
    keywords: [
      "WebSocket",
      "real-time",
      "full-duplex",
      "persistent connection",
      "ws",
    ],
    explanation:
      "WebSockets are a browser API that establishes a persistent, bidirectional communication channel between a client and a server over a single TCP connection. Unlike HTTP (request‑response), WebSockets allow both parties to send messages at any time without the overhead of opening new connections.\n\n**Key characteristics:**\n- **Full‑duplex:** Both client and server can send messages simultaneously.\n- **Persistent:** The connection stays open, reducing latency for subsequent messages.\n- **Low overhead:** No HTTP headers per message after the initial handshake.\n- **Real‑time:** Ideal for applications requiring instant updates.\n\n**How it works:**\n1. Client initiates a WebSocket handshake via HTTP (Upgrade header).\n2. Server upgrades the connection to the WebSocket protocol.\n3. Once established, both sides can send frames (text or binary) until the connection is closed.\n\n**WebSocket vs HTTP:**\n- HTTP is half‑duplex; client must request to receive data (polling/long‑polling).\n- WebSocket is full‑duplex; server can push data anytime.\n- WebSocket has much lower per‑message overhead.\n\n**Use cases:**\n- Live chat applications.\n- Real‑time notifications (sports scores, stock tickers).\n- Collaborative editing (Google Docs).\n- Online gaming.\n- IoT device control.\n\n**Limitations:**\n- Not automatically reconnected; you need to implement reconnection logic.\n- Load balancing and scaling WebSockets is more complex than HTTP.\n- Some corporate firewalls block WebSocket traffic.\n\n**Interview tip:** Understand the WebSocket lifecycle (open, message, error, close), the difference between WebSocket and HTTP/2 Server‑Sent Events (SSE), and how to handle reconnection and backoff. Also be aware of libraries like Socket.IO that provide fallbacks and additional features.",
    code: "// Client-side WebSocket\nconst socket = new WebSocket('wss://echo.websocket.org');\n\n// Connection opened\nsocket.addEventListener('open', (event) => {\n  console.log('Connected');\n  socket.send('Hello Server!');\n});\n\n// Listen for messages\nsocket.addEventListener('message', (event) => {\n  console.log('Message from server:', event.data);\n});\n\n// Error handling\nsocket.addEventListener('error', (event) => {\n  console.error('WebSocket error:', event);\n});\n\n// Connection closed\nsocket.addEventListener('close', (event) => {\n  console.log('Disconnected', event.code, event.reason);\n});\n\n// Send binary data\nconst buffer = new ArrayBuffer(8);\nconst view = new DataView(buffer);\nview.setFloat64(0, Math.PI);\nsocket.send(buffer);\n\n// Close connection\nsocket.close(1000, 'Work complete');\n\n// Reconnection logic with exponential backoff\nfunction connectWebSocket(url, retries = 5) {\n  let attempt = 0;\n  function connect() {\n    const ws = new WebSocket(url);\n    ws.onclose = () => {\n      if (attempt < retries) {\n        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);\n        setTimeout(connect, delay);\n        attempt++;\n      }\n    };\n    return ws;\n  }\n  return connect();\n}\n\n// Server-side (Node.js with ws library)\nimport { WebSocketServer } from 'ws';\nconst wss = new WebSocketServer({ port: 8080 });\nwss.on('connection', (ws) => {\n  ws.on('message', (data) => {\n    console.log('received:', data.toString());\n    ws.send(`Echo: ${data}`);\n  });\n  ws.send('Welcome!');\n});\n\n// Using Socket.IO (fallbacks, rooms, auto-reconnect)\nimport { io } from 'socket.io-client';\nconst socketIO = io('https://example.com');\nsocketIO.on('connect', () => console.log('connected'));\nsocketIO.emit('chat message', 'Hello');\nsocketIO.on('chat message', (msg) => console.log(msg));\n\n// Checking WebSocket readyState\nif (socket.readyState === WebSocket.OPEN) {\n  socket.send('data');\n}\n// 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED",
  },
  {
    id: "concept-performance-optimization",
    type: "concept",
    topic: "Performance",
    title: "Performance Optimization Techniques",
    prompt:
      "What are key techniques for optimising JavaScript and web application performance?",
    expected:
      "Optimise with: code splitting, lazy loading, debouncing/throttling, efficient DOM manipulation, using Web Workers, reducing layout thrashing, caching, image optimisation, and minimising main thread work.",
    keywords: [
      "performance",
      "optimisation",
      "lazy loading",
      "code splitting",
      "throttling",
      "debouncing",
      "Web Workers",
    ],
    explanation:
      'Web performance optimisation involves many techniques to improve load time, runtime smoothness, and responsiveness.\n\n**Loading optimisation:**\n- **Code splitting:** Split JavaScript bundles into smaller chunks loaded on demand (dynamic imports).\n- **Lazy loading:** Load images, components, or routes only when needed.\n- **Minification & compression:** Minify JS/CSS/HTML and enable gzip/Brotli compression.\n- **Critical CSS:** Inline above‑the‑fold styles and defer non‑critical CSS.\n- **Preload/prefetch:** Use `<link rel="preload">` for critical resources, `<link rel="prefetch">` for future navigations.\n- **Image optimisation:** Use modern formats (WebP, AVIF), responsive images (srcset), lazy loading (loading="lazy").\n\n**Runtime optimisation:**\n- **Debounce/Throttle:** Limit the frequency of event handlers (scroll, resize, input).\n- **Efficient DOM manipulation:** Batch reads/writes, use document fragments, avoid forced synchronous layouts (layout thrashing).\n- **Virtualisation:** Render only visible items in long lists (react‑window, react‑virtualised).\n- **Web Workers:** Offload heavy computations to background threads.\n- **Avoid memory leaks:** Clean up event listeners, timers, and references.\n- **Use `requestAnimationFrame` for animations:** Synchronises with browser repaint.\n\n**Network optimisation:**\n- **Caching:** Use HTTP caching (Cache-Control, ETag) and service workers for offline support.\n- **CDN:** Serve static assets from a content delivery network.\n- **HTTP/2 or HTTP/3:** Multiplexing reduces latency.\n\n**Measuring performance:**\n- Lighthouse, PageSpeed Insights, WebPageTest.\n- Core Web Vitals: LCP (loading), FID (interactivity), CLS (layout shift).\n- Chrome DevTools Performance tab.\n\n**Interview tip:** Be ready to explain specific techniques with examples, such as how to implement lazy loading, debounce a search input, or use a Web Worker for a heavy calculation. Also discuss how to measure performance before and after optimisations.',
    code: '// Lazy loading images\n<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" alt="..." />\n\n// Dynamic import for code splitting\nbutton.addEventListener(\'click\', async () => {\n  const module = await import(\'./heavy-module.js\');\n  module.run();\n});\n\n// Debouncing search input\nconst debounce = (fn, delay) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};\nsearchInput.addEventListener(\'input\', debounce((e) => {\n  fetchSearchResults(e.target.value);\n}, 300));\n\n// Throttling scroll events\nconst throttle = (fn, limit) => {\n  let inThrottle;\n  return (...args) => {\n    if (!inThrottle) {\n      fn(...args);\n      inThrottle = setTimeout(() => inThrottle = false, limit);\n    }\n  };\n};\nwindow.addEventListener(\'scroll\', throttle(() => {\n  console.log(\'Scroll position\', window.scrollY);\n}, 100));\n\n// Efficient DOM updates (batch reads/writes)\nconst elements = document.querySelectorAll(\'.item\');\n// Read all widths first\nconst widths = Array.from(elements).map(el => el.offsetWidth);\n// Then write\nwidths.forEach((width, i) => {\n  elements[i].style.width = `${width + 10}px`;\n});\n\n// Web Worker for heavy computation\nconst worker = new Worker(\'worker.js\');\nworker.postMessage(largeData);\nworker.onmessage = (e) => {\n  console.log(\'Result:\', e.data);\n};\n// worker.js\nself.onmessage = (e) => {\n  const result = e.data.reduce((a,b) => a + b, 0);\n  self.postMessage(result);\n};\n\n// Using requestAnimationFrame for smooth animation\nfunction animate() {\n  // update styles\n  requestAnimationFrame(animate);\n}\nrequestAnimationFrame(animate);\n\n// Preload critical resources\n<link rel="preload" href="critical.js" as="script">\n<link rel="preconnect" href="https://api.example.com">\n\n// Image optimisation with srcset\n<img srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"\n     sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"\n     src="fallback.jpg" alt="...">\n\n// Avoiding memory leaks (cleanup)\nfunction addListener() {\n  const element = document.getElementById(\'btn\');\n  const handler = () => console.log(\'clicked\');\n  element.addEventListener(\'click\', handler);\n  // Later: element.removeEventListener(\'click\', handler);\n}',
  },
  {
    id: "concept-jsonp-vs-cors",
    type: "concept",
    topic: "Browser APIs",
    title: "JSONP vs CORS",
    prompt: "What is JSONP and how does it compare to CORS?",
    expected:
      "JSONP (JSON with Padding) is an older technique to bypass same-origin policy using <script> tags, but it only supports GET requests and poses security risks. CORS is the modern, secure standard supporting all HTTP methods and fine‑grained control.",
    keywords: ["JSONP", "CORS", "cross-origin", "script tag", "callback"],
    explanation:
      'JSONP (JSON with Padding) is a technique developed before CORS to make cross-origin requests. It works by dynamically adding a `<script>` tag with a `src` attribute pointing to the target URL. The server wraps the JSON response in a JavaScript function call (the \'padding\'), which is executed when the script loads.\n\n**How JSONP works:**\n1. Client defines a callback function (e.g., `handleData`).\n2. Client creates a `<script>` tag with `src="https://api.example.com/data?callback=handleData"`.\n3. Server returns `handleData({"name":"Alice"})`.\n4. The browser executes this script, calling `handleData` with the JSON data.\n\n**Limitations of JSONP:**\n- Only supports GET requests.\n- No error handling (script onerror is limited).\n- Security risks: the server could inject malicious code (XSS).\n- Cannot set custom headers or use credentials (cookies) properly.\n- The callback function must be global.\n\n**Why CORS is better:**\n- Supports all HTTP methods (POST, PUT, DELETE, etc.).\n- Secure: uses standard HTTP headers, no code execution.\n- Supports credentials (cookies) with `withCredentials`.\n- Provides fine‑grained control via preflight requests.\n- Error handling via promise/catch.\n\n**Modern usage:** JSONP is obsolete and should be avoided. CORS is the recommended standard for cross-origin requests. If you need to support legacy APIs, consider a server‑side proxy instead.\n\n**Interview tip:** Understand that JSONP is a hack exploiting `<script>` tag behaviour, while CORS is an official W3C standard. Be able to explain why JSONP is insecure and limited.',
    code: "// JSONP example (legacy, not recommended)\nfunction jsonp(url, callbackName, callback) {\n  window[callbackName] = callback;\n  const script = document.createElement('script');\n  script.src = `${url}?callback=${callbackName}`;\n  document.body.appendChild(script);\n}\njsonp('https://api.example.com/data', 'handleData', (data) => {\n  console.log('JSONP response:', data);\n});\n// Server must respond with: handleData({ \"name\": \"Alice\" })\n\n// CORS equivalent (modern)\nfetch('https://api.example.com/data', {\n  method: 'GET',\n  mode: 'cors',\n  headers: { 'Content-Type': 'application/json' }\n})\n.then(res => res.json())\n.then(data => console.log('CORS response:', data));\n\n// JSONP error handling is poor\n// CORS provides proper error handling\nfetch('https://api.example.com/data').catch(err => console.error(err));\n\n// JSONP only GET; CORS supports all methods\nfetch('https://api.example.com/data', { method: 'POST', body: JSON.stringify({ id: 1 }) });\n\n// Security: JSONP executes arbitrary JavaScript from the server\n// CORS only reads data; no code execution\n\n// Server-side proxy as alternative to JSONP\n// Your server: /api/proxy -> forwards request to external API\nfetch('/api/proxy?url=https://api.example.com/data')\n  .then(res => res.json());",
  },
  {
    id: "concept-indexeddb",
    type: "concept",
    topic: "Browser APIs",
    title: "IndexedDB",
    prompt: "What is IndexedDB and when would you use it?",
    expected:
      "IndexedDB is a low‑level, NoSQL database in the browser for storing large amounts of structured data with high performance, supporting indexes, transactions, and queries. It is used for offline‑first apps, caching complex data, and client‑side storage beyond localStorage limits.",
    keywords: [
      "IndexedDB",
      "client-side storage",
      "NoSQL",
      "offline",
      "transactions",
    ],
    explanation:
      "IndexedDB is a powerful client‑side storage API for storing large amounts of structured data (including files/blobs) in the browser. Unlike localStorage (limited to ~5‑10MB, synchronous), IndexedDB can store gigabytes, supports asynchronous operations, indexes for fast queries, and ACID transactions.\n\n**Key features:**\n- **Asynchronous API:** Non‑blocking, uses promises or callbacks.\n- **Key‑value store with indexes:** Store objects (any structured cloneable data) indexed by keys and custom indexes.\n- **Transactions:** ACID properties, with versioning for schema upgrades.\n- **Large capacity:** Typically >50MB, up to hundreds of MB or more (browser‑dependent).\n- **Binary data:** Supports Blobs, ArrayBuffers, and Files.\n\n**Common use cases:**\n- Offline‑first applications (Progressive Web Apps).\n- Caching API responses for offline access.\n- Client‑side databases for complex data (email clients, note‑taking apps).\n- File storage (images, documents).\n\n**Limitations:**\n- Verbose, callback‑heavy API (though modern wrappers like Dexie.js simplify it).\n- Not directly queryable with SQL; uses cursor‑based iteration.\n- Storage is per origin (domain), not shared across sites.\n- Asynchronous nature makes it more complex than localStorage.\n\n**Interview tip:** Be prepared to open a database, create an object store, add/get data, and use indexes. Also discuss when to use IndexedDB vs localStorage vs WebSQL (deprecated) and the role of service workers for offline caching.",
    code: "// Opening a database (request-based API)\nconst request = indexedDB.open('MyDatabase', 1);\n\nrequest.onerror = (event) => {\n  console.error('Database error:', event.target.error);\n};\n\nrequest.onsuccess = (event) => {\n  const db = event.target.result;\n  console.log('Database opened');\n  // use db\n};\n\nrequest.onupgradeneeded = (event) => {\n  const db = event.target.result;\n  // Create object store\n  const store = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });\n  // Create an index on the name field\n  store.createIndex('by_name', 'name', { unique: false });\n  store.createIndex('by_email', 'email', { unique: true });\n};\n\n// Adding data (within a transaction)\nconst db = request.result;\nconst transaction = db.transaction(['users'], 'readwrite');\nconst store = transaction.objectStore('users');\nconst user = { name: 'Alice', email: 'alice@example.com' };\nconst addRequest = store.add(user);\naddRequest.onsuccess = () => console.log('User added');\naddRequest.onerror = (e) => console.error('Error', e.target.error);\n\n// Getting data by key\nconst getRequest = store.get(1);\ngetRequest.onsuccess = () => console.log(getRequest.result);\n\n// Using an index to query by name\nconst index = store.index('by_name');\nconst nameRequest = index.get('Alice');\nnameRequest.onsuccess = () => console.log(nameRequest.result);\n\n// Cursor iteration\nconst cursorRequest = store.openCursor();\ncursorRequest.onsuccess = (event) => {\n  const cursor = event.target.result;\n  if (cursor) {\n    console.log('User:', cursor.value);\n    cursor.continue();\n  }\n};\n\n// Deleting data\nconst deleteRequest = store.delete(1);\n\n// Using Dexie.js (simpler Promise-based wrapper)\nimport Dexie from 'dexie';\nconst db = new Dexie('MyDatabase');\ndb.version(1).stores({\n  users: '++id, name, email'\n});\nawait db.users.add({ name: 'Bob', email: 'bob@example.com' });\nconst user = await db.users.get(1);\nconst alice = await db.users.where('name').equals('Alice').first();\n\n// Clearing database (delete all data)\nindexedDB.deleteDatabase('MyDatabase');\n\n// Using IndexedDB with service worker for offline caching\nself.addEventListener('fetch', (event) => {\n  event.respondWith(\n    caches.match(event.request).then(cached => cached || fetch(event.request))\n  );\n});\n// Store API responses in IndexedDB for offline use\n\n// Browser support check\nif ('indexedDB' in window) {\n  // supported\n}",
  },
  {
    id: "concept-nodejs-event-loop",
    type: "concept",
    topic: "Node.js",
    title: "Node.js Event Loop vs Browser Event Loop",
    prompt:
      "How does the Node.js event loop differ from the browser event loop?",
    expected:
      "Node.js event loop has more phases (timers, I/O, idle, poll, check, close) and is designed for server-side I/O. The browser event loop prioritises rendering and user interactions, with microtasks and macrotasks.",
    keywords: [
      "Node.js",
      "event loop",
      "phases",
      "libuv",
      "setImmediate",
      "process.nextTick",
    ],
    explanation:
      "Both Node.js and browsers use event loops for asynchronous operations, but they have different implementations and priorities.\n\n**Browser event loop:**\n- Simplifies with macroTask queue (setTimeout, events) and microTask queue (Promise callbacks, MutationObserver).\n- Prioritises rendering (requestAnimationFrame) and user interactions.\n- After each macroTask, microtasks are drained, then possible rendering.\n\n**Node.js event loop (libuv):**\n- Has **six phases** that run in a fixed order:\n  1. **timers:** executes setTimeout and setInterval callbacks whose time has expired.\n  2. **pending callbacks:** executes I/O callbacks deferred to the next loop iteration.\n  3. **idle, prepare:** internal use.\n  4. **poll:** retrieves new I/O events; executes I/O callbacks (except timers, close, setImmediate).\n  5. **check:** executes setImmediate callbacks.\n  6. **close callbacks:** executes close event callbacks (e.g., socket.on('close')).\n- Between each phase, `process.nextTick` and microtasks are drained.\n\n**Key differences:**\n- **`setImmediate`:** Node.js specific; runs in the 'check' phase after I/O.\n- **`process.nextTick`:** Not part of the event loop phases; runs before the next phase after current operation completes, even before microtasks.\n- **Timers:** In browsers, setTimeout(..., 0) runs after microtasks; in Node.js, timer callbacks run in the timers phase, which may be delayed by poll phase.\n- **Performance:** Node.js event loop optimises for many concurrent I/O operations (e.g., thousands of connections).\n\n**Interview tip:** Understand the order: `process.nextTick` > microtasks (Promise) > timers (setTimeout) > setImmediate (in Node.js). Also know that `setImmediate` vs `setTimeout(...,0)` order is non‑deterministic in Node.js depending on phase when scheduled.",
    code: "// Node.js specific: nextTick vs microtask vs setImmediate vs setTimeout\nprocess.nextTick(() => console.log('nextTick 1'));\nPromise.resolve().then(() => console.log('promise 1'));\nsetTimeout(() => console.log('timeout 1'), 0);\nsetImmediate(() => console.log('immediate 1'));\n// Typical output order in Node.js:\n// nextTick 1\n// promise 1\n// timeout 1 (or immediate 1, depending on event loop state)\n// immediate 1 (or timeout 1)\n\n// Browser equivalent (no nextTick or setImmediate)\nPromise.resolve().then(() => console.log('promise'));\nsetTimeout(() => console.log('timeout'), 0);\n// Output: promise, timeout\n\n// Node.js event loop phases order demonstration\nconst fs = require('fs');\nfs.readFile(__filename, () => {\n  console.log('I/O callback (poll phase)');\n  setImmediate(() => console.log('setImmediate inside I/O'));\n  setTimeout(() => console.log('setTimeout inside I/O'), 0);\n  process.nextTick(() => console.log('nextTick inside I/O'));\n});\n// Output order:\n// I/O callback (poll phase)\n// nextTick inside I/O\n// setImmediate inside I/O\n// setTimeout inside I/O\n\n// nextTick recursion can starve the event loop\nfunction recursiveNextTick() {\n  process.nextTick(recursiveNextTick);\n}\n// recursiveNextTick(); // blocks I/O and timers\n\n// Using setImmediate for non‑blocking recursion\nfunction recursiveSetImmediate() {\n  setImmediate(recursiveSetImmediate);\n}\n// safer\n\n// setTimeout(...,0) vs setImmediate order non‑deterministic in main module\nsetTimeout(() => console.log('timeout'), 0);\nsetImmediate(() => console.log('immediate'));\n// order can be immediate, timeout (if poll phase has no pending I/O)\n\n// process.nextTick vs Promise microtask: nextTick runs first in Node.js\nprocess.nextTick(() => console.log('nextTick'));\nPromise.resolve().then(() => console.log('promise'));\n// nextTick then promise",
  },
  {
    id: "concept-express-middleware",
    type: "concept",
    topic: "Node.js",
    title: "Express Middleware",
    prompt: "What is Express middleware and how does it work?",
    expected:
      "Middleware functions have access to req, res, and next. They can execute code, modify the request/response, end the request cycle, or call next() to pass control to the next middleware.",
    keywords: ["Express", "middleware", "request pipeline", "next", "app.use"],
    explanation:
      "Express middleware are functions that run during the request-response cycle, sitting between the incoming request and the final route handler. They are executed sequentially in the order they are registered.\n\n**Middleware function signature:**\n```\nfunction(req, res, next) { ... }\n```\n\n**What middleware can do:**\n- Execute any code.\n- Modify the request (req) or response (res) objects.\n- End the request-response cycle (by sending a response).\n- Call the next middleware in the stack using `next()`.\n- If a middleware does not end the request nor call `next()`, the request will hang.\n\n**Types of middleware:**\n- **Application-level:** `app.use()`, `app.METHOD()` – applies to all routes or specific HTTP methods.\n- **Router-level:** Bound to an instance of `express.Router()`.\n- **Error-handling:** Takes four arguments (err, req, res, next) – must be defined after all other middleware.\n- **Built-in:** `express.json()`, `express.urlencoded()`, `express.static()`.\n- **Third-party:** `cors`, `morgan`, `helmet`, etc.\n\n**Order matters:** Middleware registered first executes first. Error-handling middleware must be last.\n\n**Interview tip:** Be able to write custom middleware for logging, authentication, request validation, and error handling. Understand the difference between `app.use()` and `app.METHOD()` (e.g., `app.get()`). Also know that calling `next('route')` skips to the next route handler (only in router middleware).",
    code: "// Basic Express application with middleware\nconst express = require('express');\nconst app = express();\n\n// 1. Application-level middleware (executes for every request)\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next(); // pass control to next middleware\n});\n\n// 2. Built-in middleware\napp.use(express.json()); // parses JSON bodies\napp.use(express.urlencoded({ extended: true })); // parses URL-encoded bodies\napp.use(express.static('public')); // serves static files\n\n// 3. Third-party middleware (example)\nconst morgan = require('morgan');\napp.use(morgan('combined'));\n\n// 4. Route-specific middleware\nconst authMiddleware = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) {\n    return res.status(401).json({ error: 'Unauthorized' });\n  }\n  // verify token...\n  req.user = { id: 1, name: 'Alice' };\n  next();\n};\napp.get('/profile', authMiddleware, (req, res) => {\n  res.json(req.user);\n});\n\n// 5. Middleware that modifies the request\napp.use((req, res, next) => {\n  req.requestTime = Date.now();\n  next();\n});\n\n// 6. Error-handling middleware (four arguments, must be last)\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: 'Something went wrong!' });\n});\n\n// 7. Middleware that ends the request (no next())\napp.use((req, res, next) => {\n  if (req.path === '/blocked') {\n    res.status(403).send('Access Denied');\n  } else {\n    next();\n  }\n});\n\n// 8. Router-level middleware\nconst router = express.Router();\nrouter.use((req, res, next) => {\n  console.log('Router middleware');\n  next();\n});\nrouter.get('/users', (req, res) => res.json([{ name: 'Alice' }]));\napp.use('/api', router);\n\n// 9. Middleware with async operations (always handle errors with next)\napp.use(async (req, res, next) => {\n  try {\n    const data = await fetchData();\n    req.data = data;\n    next();\n  } catch (err) {\n    next(err); // pass to error handler\n  }\n});\n\n// 10. Skipping remaining middleware (calling next('route'))\napp.get('/user/:id', (req, res, next) => {\n  if (req.params.id === '0') next('route'); // skip to next route handler\n  else next();\n}, (req, res) => {\n  res.send('regular user');\n});\napp.get('/user/:id', (req, res) => {\n  res.send('special user');\n});\n\napp.listen(3000);",
  },
  {
    id: "concept-jwt-authentication",
    type: "concept",
    topic: "Security",
    title: "JWT Authentication",
    prompt: "What is JWT and how is it used for authentication?",
    expected:
      "JWT (JSON Web Token) is a compact, self‑contained token for securely transmitting information between parties. It consists of header, payload, and signature. In authentication, the server issues a signed JWT after login; the client stores it and sends it with each request (usually in Authorization header).",
    keywords: ["JWT", "authentication", "token", "signature", "Bearer"],
    explanation:
      'JWT (JSON Web Token) is an open standard (RFC 7519) that defines a compact and self‑contained way to transmit information between parties as a JSON object. The token is digitally signed, so it can be verified and trusted.\n\n**JWT structure:**\n`xxxxx.yyyyy.zzzzz` – three parts separated by dots:\n- **Header:** algorithm and token type (e.g., `{"alg": "HS256", "typ": "JWT"}`).\n- **Payload:** claims (registered, public, private). Example: `{"sub": "1234567890", "name": "Alice", "iat": 1516239022}`.\n- **Signature:** created by signing the header and payload with a secret (HMAC) or private key (RSA).\n\n**How JWT authentication works:**\n1. User logs in with credentials.\n2. Server validates credentials and generates a JWT (signed with a secret).\n3. Server sends JWT to client (usually in response body or cookie).\n4. Client stores JWT (localStorage/sessionStorage or httpOnly cookie).\n5. Client sends JWT in `Authorization: Bearer <token>` header for each authenticated request.\n6. Server verifies the signature and extracts claims (e.g., user ID).\n7. Server processes the request.\n\n**Advantages:**\n- Stateless: No session storage on server; scales easily.\n- Self‑contained: Contains user information, reducing database lookups.\n- Cross‑domain/device: Works across different services.\n\n**Security considerations:**\n- Keep JWT secret secure; use strong keys.\n- Set short expiration times (e.g., 15 minutes) and use refresh tokens.\n- Store JWT in httpOnly, Secure, SameSite cookies to prevent XSS.\n- Never store sensitive data in payload (it is base64 encoded, not encrypted).\n- Use HTTPS always.\n\n**Interview tip:** Be able to sign and verify a JWT using a library like `jsonwebtoken`. Understand the difference between access tokens (short‑lived) and refresh tokens (long‑lived). Discuss where to store tokens securely (httpOnly cookies vs localStorage).',
    code: "// Signing a JWT (Node.js with jsonwebtoken)\nconst jwt = require('jsonwebtoken');\nconst secret = 'my-secret-key';\n\nconst payload = { userId: 123, role: 'admin' };\nconst token = jwt.sign(payload, secret, { expiresIn: '1h' });\nconsole.log(token);\n\n// Verifying a JWT\njwt.verify(token, secret, (err, decoded) => {\n  if (err) console.error('Invalid token');\n  else console.log(decoded); // { userId: 123, role: 'admin', iat: ..., exp: ... }\n});\n\n// Express authentication middleware\nconst authenticateJWT = (req, res, next) => {\n  const authHeader = req.headers.authorization;\n  if (authHeader) {\n    const token = authHeader.split(' ')[1]; // Bearer <token>\n    jwt.verify(token, secret, (err, user) => {\n      if (err) return res.sendStatus(403);\n      req.user = user;\n      next();\n    });\n  } else {\n    res.sendStatus(401);\n  }\n};\n\napp.get('/profile', authenticateJWT, (req, res) => {\n  res.json(req.user);\n});\n\n// Login endpoint that issues JWT\napp.post('/login', (req, res) => {\n  const { username, password } = req.body;\n  // validate credentials (e.g., compare with database)\n  if (username === 'alice' && password === 'secret') {\n    const token = jwt.sign({ userId: 1, username }, secret, { expiresIn: '15m' });\n    res.json({ token });\n  } else {\n    res.status(401).json({ error: 'Invalid credentials' });\n  }\n});\n\n// Refresh token pattern\nlet refreshTokens = []; // store in database in production\napp.post('/token', (req, res) => {\n  const refreshToken = req.body.token;\n  if (!refreshToken || !refreshTokens.includes(refreshToken)) return res.sendStatus(403);\n  jwt.verify(refreshToken, refreshSecret, (err, user) => {\n    if (err) return res.sendStatus(403);\n    const accessToken = jwt.sign({ userId: user.userId }, secret, { expiresIn: '15m' });\n    res.json({ accessToken });\n  });\n});\n\n// Client-side usage (JavaScript)\nconst token = localStorage.getItem('token');\nfetch('/api/profile', {\n  headers: { 'Authorization': `Bearer ${token}` }\n});\n\n// Using httpOnly cookie (more secure)\nres.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });\n// Client does not need to store token; browser sends cookie automatically\n\n// Decoding without verifying (for reading payload, not trusted)\nconst decoded = jwt.decode(token);",
  },
  {
    id: "concept-mongodb-basics",
    type: "concept",
    topic: "Database",
    title: "MongoDB Basics",
    prompt:
      "What are the key concepts of MongoDB and how does it differ from SQL databases?",
    expected:
      "MongoDB is a NoSQL document database storing data in flexible, JSON-like documents (BSON) within collections. Unlike SQL tables with fixed schemas, MongoDB allows dynamic schemas, embedded documents, and horizontal scaling via sharding.",
    keywords: [
      "MongoDB",
      "document",
      "collection",
      "NoSQL",
      "BSON",
      "sharding",
    ],
    explanation:
      "MongoDB is a leading NoSQL document database that stores data in flexible, JSON-like documents (BSON). Instead of tables with rows and columns, MongoDB uses collections (similar to tables) and documents (similar to rows). Each document can have a different structure, allowing for schema flexibility and rapid iteration.\n\n**Core concepts:**\n- **Database:** Container for collections.\n- **Collection:** Group of documents (similar to table).\n- **Document:** A record, stored as BSON (binary JSON).\n- **Field:** Key-value pair within a document (similar to column).\n- **Index:** Improves query performance (supports single field, compound, text, geospatial, etc.).\n- **Aggregation pipeline:** Powerful data processing framework (similar to SQL GROUP BY, JOIN, etc.).\n- **Sharding:** Horizontal partitioning to distribute data across multiple servers.\n- **Replica set:** Primary-secondary replication for high availability.\n\n**Key differences from SQL databases:**\n| Feature | SQL | MongoDB |\n|---------|-----|---------|\n| Schema | Fixed, predefined | Flexible, dynamic |\n| Relationships | Foreign keys, JOINs | Embedded documents or manual references |\n| Query language | SQL | MongoDB Query Language (MQL) |\n| Transactions | ACID | ACID (multi‑document since 4.0) |\n| Scaling | Vertical (mostly) | Horizontal (sharding built-in) |\n| Data model | Normalised | Denormalised, nested documents |\n\n**When to use MongoDB:**\n- Rapidly evolving schema.\n- Nested, hierarchical data (e.g., product catalog, user profiles).\n- High write volume and horizontal scaling.\n- JSON-centric applications.\n- Prototyping and MVP.\n\n**When to avoid MongoDB:**\n- Complex transactions across many documents.\n- Heavy relational data with complex joins.\n- Applications requiring strict referential integrity (though MongoDB has some support).\n- Reporting/analytics that need complex aggregations (though aggregation pipeline is powerful).\n\n**Interview tip:** Be able to explain the trade‑offs between embedded documents and references, and when to use each. Also discuss how MongoDB achieves eventual consistency and the role of the primary in replica sets.",
    code: "// MongoDB shell commands\n// Switch to database\nuse mydb;\n\n// Insert a document (auto-creates collection)\ndb.users.insertOne({ name: 'Alice', email: 'alice@example.com', age: 30 });\n\n// Insert multiple\ndb.users.insertMany([\n  { name: 'Bob', email: 'bob@example.com', age: 25 },\n  { name: 'Charlie', email: 'charlie@example.com', age: 35 }\n]);\n\n// Find documents\ndb.users.find({ age: { $gt: 28 } });\ndb.users.findOne({ name: 'Alice' });\n\n// Update document\ndb.users.updateOne(\n  { name: 'Alice' },\n  { $set: { age: 31 } }\n);\n\n// Delete document\ndb.users.deleteOne({ name: 'Bob' });\n\n// Create index\ndb.users.createIndex({ email: 1 }, { unique: true });\n\n// Aggregation pipeline\ndb.users.aggregate([\n  { $match: { age: { $gte: 30 } } },\n  { $group: { _id: null, avgAge: { $avg: '$age' } } }\n]);\n\n// Embedded document example\ndb.orders.insertOne({\n  orderId: 1001,\n  user: { name: 'Alice', email: 'alice@example.com' },\n  items: [\n    { product: 'Laptop', price: 999, quantity: 1 },\n    { product: 'Mouse', price: 19, quantity: 2 }\n  ],\n  total: 1037\n});\n\n// Reference (manual) example\n// users collection\n// { _id: ObjectId('...'), name: 'Alice' }\n// orders collection\n// { userId: ObjectId('...'), amount: 100 }\n\n// Using Node.js driver\nconst { MongoClient } = require('mongodb');\nconst client = new MongoClient('mongodb://localhost:27017');\nawait client.connect();\nconst db = client.db('mydb');\nconst users = db.collection('users');\nconst user = await users.findOne({ name: 'Alice' });\nawait client.close();\n\n// Mongoose ODM (Node.js)\nconst mongoose = require('mongoose');\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, unique: true },\n  age: Number\n});\nconst User = mongoose.model('User', userSchema);\nconst user = new User({ name: 'Alice', email: 'alice@example.com', age: 30 });\nawait user.save();\nconst found = await User.findOne({ name: 'Alice' });",
  },
  {
    id: "concept-docker-basics",
    type: "concept",
    topic: "DevOps",
    title: "Docker Basics",
    prompt: "What is Docker and why is it used in development?",
    expected:
      "Docker containers package applications with their dependencies, providing consistent environments across development, testing, and production. Containers are lightweight, isolated, and share the host OS kernel.",
    keywords: ["Docker", "container", "image", "Dockerfile", "orchestration"],
    explanation:
      "Docker is a platform for developing, shipping, and running applications in containers – lightweight, portable units that package code and all its dependencies. Containers are isolated but share the host OS kernel, making them more efficient than virtual machines.\n\n**Key concepts:**\n- **Image:** Read‑only template with instructions to create a container (e.g., `node:18`).\n- **Container:** Runnable instance of an image.\n- **Dockerfile:** Script with instructions to build an image.\n- **Registry:** Storage for images (Docker Hub, private registry).\n- **Volume:** Persistent data storage for containers.\n- **Network:** Communication between containers (bridge, host, overlay).\n- **Docker Compose:** Tool to define and run multi‑container applications.\n\n**Benefits:**\n- **Consistency:** Runs the same on any machine (no 'works on my machine' issues).\n- **Isolation:** Dependencies don't conflict between projects.\n- **Portability:** Move containers between environments.\n- **Scalability:** Easy to scale horizontally with orchestration (Kubernetes, Docker Swarm).\n- **CI/CD integration:** Build, test, and deploy with containers.\n\n**Common commands:**\n- `docker build` – build image from Dockerfile.\n- `docker run` – run a container.\n- `docker ps` – list running containers.\n- `docker stop` / `docker rm` – manage containers.\n- `docker exec` – run command in running container.\n- `docker compose up` – start multi‑container app.\n\n**Interview tip:** Be able to write a simple Dockerfile for a Node.js app, explain the difference between `CMD` and `ENTRYPOINT`, and discuss best practices (multi‑stage builds, layer caching, `.dockerignore`).",
    code: '# Example Dockerfile for a Node.js app\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nRUN npm run build\n\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nEXPOSE 3000\nCMD ["node", "dist/server.js"]\n\n# .dockerignore\nnode_modules\ndist\n.git\n.env\n\n# Build image\ndocker build -t myapp:latest .\n\n# Run container\ndocker run -d -p 3000:3000 --name myapp-container myapp:latest\n\n# Execute command inside container\ndocker exec -it myapp-container sh\n\n# Stop and remove container\ndocker stop myapp-container\ndocker rm myapp-container\n\n# View logs\ndocker logs myapp-container\n\n# docker-compose.yml example\nversion: \'3.8\'\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n    depends_on:\n      - redis\n      - postgres\n  redis:\n    image: redis:alpine\n    volumes:\n      - redis_data:/data\n  postgres:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - pg_data:/var/lib/postgresql/data\nvolumes:\n  redis_data:\n  pg_data:\n\n# Start services\ndocker compose up -d\n\n# Stop services\ndocker compose down\n\n# Check Docker version\ndocker --version\n\n# List images\ndocker images\n\n# Remove unused images\ndocker image prune\n\n# Run a temporary container for debugging\ndocker run -it --rm node:18 node\n\n# Copy files into/from container\ndocker cp myfile.txt myapp-container:/app/myfile.txt',
  },
  {
    id: "concept-github-actions",
    type: "concept",
    topic: "CI/CD",
    title: "GitHub Actions",
    prompt: "What are GitHub Actions and how do they enable CI/CD?",
    expected:
      "GitHub Actions is a CI/CD platform that automates software workflows directly in GitHub repositories. Workflows are defined in YAML files and can run on events like push, pull request, or schedule.",
    keywords: ["GitHub Actions", "CI/CD", "workflow", "YAML", "automation"],
    explanation:
      "GitHub Actions is a powerful automation platform integrated into GitHub. It allows you to create custom workflows that build, test, and deploy your code based on repository events (push, pull request, issue, schedule, etc.).\n\n**Key concepts:**\n- **Workflow:** An automated process defined in a YAML file (.github/workflows/*.yml).\n- **Event:** Triggers the workflow (e.g., push, pull_request, schedule).\n- **Job:** A set of steps that run on the same runner. Jobs can run sequentially or in parallel.\n- **Step:** An individual task (e.g., run a command, use an action).\n- **Action:** A reusable unit of code (can be custom or from the Marketplace).\n- **Runner:** A server that executes the workflow (GitHub‑hosted or self‑hosted).\n\n**Benefits:**\n- Native GitHub integration (no external CI tools).\n- Free for public repositories; generous free minutes for private.\n- Matrix builds (test against multiple Node versions, OS).\n- Secrets management for sensitive data.\n- Caching dependencies for faster builds.\n- Artifacts for persisting build outputs.\n\n**Common use cases:**\n- Run tests on every pull request.\n- Lint and format code.\n- Build and deploy to hosting services (Vercel, Netlify, AWS).\n- Publish packages to npm or Docker Hub.\n- Schedule cron jobs (e.g., daily database backup).\n\n**Interview tip:** Be able to write a basic workflow that runs tests on Node.js projects, understand how to use secrets, and know the difference between `push` and `pull_request` triggers. Also discuss caching (`actions/cache`) and matrix strategies.",
    code: "# .github/workflows/ci.yml\nname: CI\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n  schedule:\n    - cron: '0 2 * * *'  # daily at 2am\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        node-version: [18.x, 20.x]\n        os: [ubuntu-latest, windows-latest]\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v4\n\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node-version }}\n          cache: 'npm'\n\n      - name: Install dependencies\n        run: npm ci\n\n      - name: Run linter\n        run: npm run lint\n\n      - name: Run tests\n        run: npm test\n\n      - name: Upload coverage\n        uses: actions/upload-artifact@v4\n        with:\n          name: coverage-report\n          path: coverage/\n\n  build:\n    needs: test\n    runs-on: ubuntu-latest\n    if: github.ref == 'refs/heads/main'\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20.x'\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: dist\n          path: dist/\n\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    environment: production\n    steps:\n      - uses: actions/download-artifact@v4\n        with:\n          name: dist\n          path: dist\n      - name: Deploy to Vercel\n        uses: amondnet/vercel-action@v20\n        with:\n          vercel-token: ${{ secrets.VERCEL_TOKEN }}\n          vercel-org-id: ${{ secrets.ORG_ID}}\n          vercel-project-id: ${{ secrets.PROJECT_ID }}\n          vercel-args: '--prod'\n\n# Using cache for dependencies\n      - name: Cache node modules\n        uses: actions/cache@v3\n        with:\n          path: ~/.npm\n          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}\n          restore-keys: |\n            ${{ runner.os }}-node-\n\n# Manual trigger (workflow_dispatch)\non:\n  workflow_dispatch:\n    inputs:\n      environment:\n        description: 'Deployment environment'\n        required: true\n        default: 'staging'\n\n# Environment variables and secrets\nenv:\n  NODE_ENV: test\n\nsteps:\n  - name: Use secret\n    run: echo \"API key is ${{ secrets.API_KEY }}\"\n\n# Self-hosted runner\nruns-on: self-hosted",
  },
  {
    id: "concept-webpack",
    type: "concept",
    topic: "Build Tools",
    title: "Webpack",
    prompt: "What is Webpack and what problems does it solve?",
    expected:
      "Webpack is a static module bundler that processes JavaScript, CSS, images, and other assets, creating dependency graphs and outputting optimized bundles for the browser. It solves dependency management, code splitting, and asset optimisation.",
    keywords: [
      "Webpack",
      "module bundler",
      "loader",
      "plugin",
      "code splitting",
    ],
    explanation:
      "Webpack is a powerful module bundler for modern JavaScript applications. It takes modules with dependencies (JS, CSS, images, fonts, etc.) and generates static assets (bundles) that the browser can load efficiently.\n\n**Core concepts:**\n- **Entry:** The starting point of the dependency graph (e.g., `src/index.js`).\n- **Output:** Where to emit the bundles (e.g., `dist/bundle.js`).\n- **Loaders:** Transform non‑JS files (e.g., `css-loader`, `babel-loader`, `file-loader`).\n- **Plugins:** Perform broader tasks (e.g., `HtmlWebpackPlugin`, `MiniCssExtractPlugin`).\n- **Mode:** `development` (fast, readable) or `production` (optimised, minified).\n- **Code splitting:** Split bundles into smaller chunks loaded on demand.\n- **Hot Module Replacement (HMR):** Update modules in the browser without full reload.\n\n**What problems does Webpack solve?**\n- **Dependency management:** Automatically resolves `import`/`require` graphs.\n- **Browser compatibility:** Transpile modern JS (with Babel) and handle assets.\n- **Performance:** Minify, tree shaking (remove dead code), and chunk splitting.\n- **Development experience:** HMR, source maps, and dev server.\n\n**When to use Webpack:**\n- Large single‑page applications (React, Vue, Angular).\n- Projects with complex asset pipelines.\n- Custom builds where you need fine‑grained control.\n\n**Alternatives:** Vite, Rollup, Parcel, esbuild (often faster, simpler).\n\n**Interview tip:** Be able to configure a basic Webpack setup, explain the purpose of loaders vs plugins, and discuss code splitting strategies (entry points, dynamic imports, SplitChunksPlugin).",
    code: "// webpack.config.js\nconst path = require('path');\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\nconst MiniCssExtractPlugin = require('mini-css-extract-plugin');\n\nmodule.exports = {\n  mode: 'production',\n  entry: {\n    main: './src/index.js',\n    vendor: './src/vendor.js'\n  },\n  output: {\n    filename: '[name].[contenthash].js',\n    path: path.resolve(__dirname, 'dist'),\n    clean: true, // clean dist before build\n  },\n  module: {\n    rules: [\n      {\n        test: /\\.jsx?$/,\n        exclude: /node_modules/,\n        use: {\n          loader: 'babel-loader',\n          options: {\n            presets: ['@babel/preset-env', '@babel/preset-react']\n          }\n        }\n      },\n      {\n        test: /\\.css$/,\n        use: [MiniCssExtractPlugin.loader, 'css-loader']\n      },\n      {\n        test: /\\.(png|svg|jpg|jpeg|gif)$/i,\n        type: 'asset/resource',\n      },\n      {\n        test: /\\.(woff|woff2|eot|ttf|otf)$/i,\n        type: 'asset/resource',\n      }\n    ]\n  },\n  plugins: [\n    new HtmlWebpackPlugin({\n      template: './src/index.html',\n      title: 'My App'\n    }),\n    new MiniCssExtractPlugin({\n      filename: '[name].[contenthash].css'\n    })\n  ],\n  optimization: {\n    splitChunks: {\n      chunks: 'all',\n      cacheGroups: {\n        vendor: {\n          test: /[\\/]node_modules[\\/]/,\n          name: 'vendors',\n          chunks: 'all',\n        },\n      },\n    },\n    runtimeChunk: 'single',\n  },\n  devServer: {\n    static: './dist',\n    hot: true,\n    port: 3000,\n  },\n  devtool: 'source-map',\n};\n\n// package.json scripts\n// \"build\": \"webpack --mode production\",\n// \"dev\": \"webpack serve --mode development\"\n\n// Using dynamic imports for code splitting\nbutton.addEventListener('click', () => {\n  import('./heavy-module.js').then(module => {\n    module.doSomething();\n  });\n});\n\n// Tree shaking – ensure sideEffects: false in package.json\n// package.json\n{\n  \"sideEffects\": false\n}\n\n// or specify files\n{\n  \"sideEffects\": [\"*.css\", \"*.scss\"]\n}",
  },
  {
    id: "concept-design-patterns",
    type: "concept",
    topic: "Architecture",
    title: "JavaScript Design Patterns",
    prompt: "What are common design patterns in JavaScript?",
    expected:
      "Common patterns include Module, Singleton, Observer (Event Emitter), Factory, and Revealing Module pattern. These provide reusable solutions to common software design problems.",
    keywords: ["design patterns", "module", "singleton", "observer", "factory"],
    explanation:
      "Design patterns are reusable solutions to recurring problems in software design. In JavaScript, several patterns are particularly useful due to the language's flexibility and prototypal nature.\n\n**1. Module Pattern:**\n- Encapsulates private variables and methods using closures.\n- Returns a public API (object with methods).\n- Prevents global namespace pollution.\n\n**2. Revealing Module Pattern:**\n- Similar to Module pattern but returns an object literal with pointers to private functions.\n- Makes intent clearer.\n\n**3. Singleton Pattern:**\n- Ensures a class has only one instance and provides a global access point.\n- Useful for shared resources (database connection, logger).\n\n**4. Factory Pattern:**\n- Creates objects without specifying the exact class.\n- Useful when object creation logic is complex or varies.\n\n**5. Observer Pattern (Pub/Sub):**\n- Defines a one‑to‑many dependency so that when one object changes state, all dependents are notified.\n- Implemented with `EventEmitter` or custom event listeners.\n\n**6. Constructor Pattern:**\n- Using `new` with a constructor function or class.\n\n**7. Prototype Pattern:**\n- Creating objects based on a prototype (using `Object.create`).\n\n**8. Decorator Pattern:**\n- Wraps an object to add new behaviour (higher‑order functions, React HOCs).\n\n**Interview tip:** Be prepared to implement a Singleton, Module, or Observer pattern from scratch. Explain when each pattern is appropriate and how modern JavaScript features (ES modules, classes) affect their implementation.",
    code: "// Module Pattern\nconst Counter = (function() {\n  let count = 0;\n  function increment() { count++; }\n  function decrement() { count--; }\n  function getCount() { return count; }\n  return { increment, decrement, getCount };\n})();\nCounter.increment();\nconsole.log(Counter.getCount()); // 1\n\n// Revealing Module Pattern\nconst MyModule = (function() {\n  function privateMethod() { console.log('private'); }\n  function publicMethod() { privateMethod(); }\n  return { publicMethod };\n})();\n\n// Singleton Pattern\nconst DatabaseConnection = (function() {\n  let instance;\n  function createConnection() {\n    return { connection: 'DB connected' };\n  }\n  return {\n    getInstance: function() {\n      if (!instance) instance = createConnection();\n      return instance;\n    }\n  };\n})();\nconst db1 = DatabaseConnection.getInstance();\nconst db2 = DatabaseConnection.getInstance();\nconsole.log(db1 === db2); // true\n\n// Factory Pattern\nfunction createUser(role) {\n  const user = { name: 'Guest' };\n  if (role === 'admin') {\n    user.admin = true;\n    user.delete = () => console.log('deleting');\n  } else if (role === 'editor') {\n    user.edit = () => console.log('editing');\n  }\n  return user;\n}\nconst admin = createUser('admin');\n\n// Observer Pattern (Event Emitter)\nclass EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  on(event, listener) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(listener);\n  }\n  emit(event, data) {\n    if (this.events[event]) {\n      this.events[event].forEach(fn => fn(data));\n    }\n  }\n  off(event, listener) {\n    if (this.events[event]) {\n      this.events[event] = this.events[event].filter(fn => fn !== listener);\n    }\n  }\n}\nconst emitter = new EventEmitter();\nemitter.on('userLogin', (user) => console.log(`${user.name} logged in`));\nemitter.emit('userLogin', { name: 'Alice' });\n\n// Constructor Pattern\nclass Animal {\n  constructor(name) { this.name = name; }\n  speak() { console.log(`${this.name} speaks`); }\n}\nconst dog = new Animal('Rex');\n\n// Prototype Pattern\nconst animalPrototype = { eat() { console.log('eating'); } };\nconst cat = Object.create(animalPrototype);\ncat.meow = () => console.log('meow');\n\n// Decorator Pattern\nfunction withLogging(fn) {\n  return function(...args) {\n    console.log(`Calling ${fn.name} with`, args);\n    return fn(...args);\n  };\n}\nconst add = (a,b) => a + b;\nconst loggedAdd = withLogging(add);",
  },
  {
    id: "concept-styled-components",
    type: "concept",
    topic: "CSS",
    title: "CSS-in-JS with styled-components",
    prompt: "What is CSS-in-JS and how does styled-components work?",
    expected:
      "CSS-in-JS allows writing CSS directly within JavaScript components, scoping styles to individual components. styled-components uses tagged template literals to define styled elements, generating unique class names and injecting styles at runtime.",
    keywords: [
      "CSS-in-JS",
      "styled-components",
      "scoped styles",
      "tagged template literal",
    ],
    explanation:
      "CSS-in-JS is an approach where CSS is written inside JavaScript files, typically within component definitions. styled-components is a popular library for React that implements this pattern.\n\n**How styled-components works:**\n- Uses tagged template literals to define styled elements.\n- Generates a unique class name for each styled component.\n- Injects the corresponding CSS into a `<style>` tag at runtime.\n- Styles are scoped to the component, preventing conflicts.\n- Supports dynamic styling based on props.\n\n**Advantages:**\n- **Scoped styles:** No CSS class name collisions.\n- **Dynamic styling:** Change styles based on props or theme.\n- **No dead code:** Unused styles are eliminated with component removal.\n- **Theming:** Built‑in ThemeProvider for consistent design tokens.\n- **Server‑side rendering:** Works with Next.js (critical CSS extraction).\n\n**Disadvantages:**\n- Runtime overhead (though minimal).\n- Larger bundle size compared to plain CSS.\n- Learning curve.\n\n**Alternatives:** Emotion, JSS, Linaria (zero‑runtime).\n\n**Interview tip:** Be able to create a styled component with dynamic props, explain how the class names are generated, and discuss when CSS-in-JS is preferable over traditional CSS (component libraries, design systems).",
    code: "import styled from 'styled-components';\n\n// Basic styled component\nconst Button = styled.button`\n  background: palevioletred;\n  color: white;\n  font-size: 1em;\n  padding: 0.5em 1em;\n  border-radius: 3px;\n  cursor: pointer;\n  &:hover {\n    opacity: 0.8;\n  }\n`;\n\n// Dynamic styling based on props\nconst DynamicButton = styled.button`\n  background: ${props => props.primary ? 'blue' : 'gray'};\n  color: white;\n  padding: ${props => props.large ? '12px 24px' : '8px 16px'};\n  font-size: ${props => props.large ? '1.2rem' : '1rem'};\n`;\n\n// Extending styles\nconst BigButton = styled(Button)`\n  font-size: 2em;\n  padding: 1em 2em;\n`;\n\n// Wrapping a custom component\nconst Link = ({ className, children }) => (\n  <a className={className} href=\"#\">{children}</a>\n);\nconst StyledLink = styled(Link)`\n  color: blue;\n  text-decoration: none;\n  &:hover { text-decoration: underline; }\n`;\n\n// Using props to conditionally render\nconst Card = styled.div`\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 16px;\n  background: ${props => props.active ? '#f0f0f0' : 'white'};\n`;\n\n// Theme support\nimport { ThemeProvider } from 'styled-components';\nconst theme = {\n  colors: {\n    primary: '#007bff',\n    secondary: '#6c757d',\n  },\n  spacing: {\n    small: '8px',\n    medium: '16px',\n  }\n};\nconst ThemedButton = styled.button`\n  background: ${props => props.theme.colors.primary};\n  padding: ${props => props.theme.spacing.medium};\n`;\nfunction App() {\n  return (\n    <ThemeProvider theme={theme}>\n      <ThemedButton>Click me</ThemedButton>\n    </ThemeProvider>\n  );\n}\n\n// Global styles\nimport { createGlobalStyle } from 'styled-components';\nconst GlobalStyle = createGlobalStyle`\n  body {\n    margin: 0;\n    padding: 0;\n    font-family: sans-serif;\n  }\n`;\n\n// Keyframes animation\nimport { keyframes } from 'styled-components';\nconst spin = keyframes`\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n`;\nconst Spinner = styled.div`\n  animation: ${spin} 1s linear infinite;\n`;\n\n// Usage in React component\nfunction MyComponent() {\n  return <Button primary>Submit</Button>;\n}\n\n// As prop (render as different element)\nconst StyledDiv = styled.div`\n  color: red;\n`;\n<StyledDiv as=\"span\">Rendered as span</StyledDiv>\n\n// attrs for static props\nconst Input = styled.input.attrs(props => ({\n  type: props.type || 'text',\n  placeholder: props.placeholder || 'Enter text',\n}))`\n  border: 1px solid #ccc;\n  padding: 8px;\n`;",
  },
  {
    id: "concept-tailwind-css",
    type: "concept",
    topic: "CSS",
    title: "Tailwind CSS",
    prompt: "What is Tailwind CSS and what are its advantages?",
    expected:
      "Tailwind CSS is a utility‑first CSS framework that provides low‑level utility classes (flex, pt‑4, text‑center) for building custom designs directly in markup, without writing custom CSS. It promotes consistency, rapid development, and purges unused styles.",
    keywords: [
      "Tailwind CSS",
      "utility-first",
      "purgeCSS",
      "responsive design",
    ],
    explanation:
      "Tailwind CSS is a highly popular utility‑first CSS framework. Instead of providing pre‑styled components (like Bootstrap), it gives you a set of low‑level utility classes that you can compose to build any design directly in your HTML or JSX.\n\n**Core philosophy:**\n- **Utility‑first:** Classes do one thing (`flex`, `pt‑4`, `text‑center`).\n- **Composable:** Combine utilities to create complex designs.\n- **No custom CSS:** Design in markup, not separate style sheets.\n- **Highly configurable:** Tailwind config file (`tailwind.config.js`) controls design tokens.\n\n**Advantages:**\n- **Speed:** No context switching between HTML and CSS.\n- **Consistency:** Design constraints enforced by configuration.\n- **Small production CSS:** PurgeCSS removes unused utilities; often <10KB.\n- **Responsive:** Built‑in breakpoint prefixes (`md:flex`, `lg:text‑lg`).\n- **Dark mode:** `dark:` variant.\n- **Hover/focus variants:** `hover:bg-blue`.\n- **No naming fatigue:** Avoid inventing class names.\n- **Customizable:** Override or extend the default theme.\n\n**Disadvantages:**\n- HTML becomes verbose (many classes).\n- Learning curve for utility names.\n- Some developers miss semantic class names.\n\n**Integration:** Works with any framework (React, Vue, Svelte, Next.js, etc.) via PostCSS.\n\n**Interview tip:** Be able to explain the difference between utility‑first and semantic CSS, how PurgeCSS works, and how to configure custom breakpoints or colors. Also mention Tailwind's `@apply` directive for extracting component classes when needed.",
    code: '// Installing Tailwind CSS with PostCSS\n// npm install -D tailwindcss postcss autoprefixer\n// npx tailwindcss init -p\n\n// tailwind.config.js\nmodule.exports = {\n  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],\n  theme: {\n    extend: {\n      colors: {\n        \'brand\': \'#ff6b6b\',\n      },\n      spacing: {\n        \'128\': \'32rem\',\n      },\n      screens: {\n        \'xs\': \'475px\',\n      },\n    },\n  },\n  plugins: [],\n  darkMode: \'class\', // or \'media\'\n};\n\n// src/index.css (import Tailwind)\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n// Custom component layer (optional)\n@layer components {\n  .btn-primary {\n    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;\n  }\n}\n\n// React component using Tailwind classes\nfunction Button({ children, primary, large }) {\n  return (\n    <button\n      className={`\n        px-4 py-2 rounded font-semibold\n        ${primary ? \'bg-blue-500 hover:bg-blue-600 text-white\' : \'bg-gray-200 hover:bg-gray-300 text-gray-800\'}\n        ${large ? \'text-lg px-6 py-3\' : \'text-base\'}\n        transition duration-200\n      `}\n    >\n      {children}\n    </button>\n  );\n}\n\n// Responsive design\n<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">\n  <div className="col-span-2">Wide column</div>\n</div>\n\n// Dark mode\n<div className="bg-white dark:bg-gray-800 text-black dark:text-white">\n  Content\n</div>\n\n// Hover, focus, active variants\n<button className="bg-blue-500 hover:bg-blue-700 focus:ring-2 active:bg-blue-800">\n  Click\n</button>\n\n// Arbitrary values (when config doesn\'t have it)\n<div className="top-[117px] w-[calc(100% - 2rem)]">\n  Custom value\n</div>\n\n// Using with @apply (extract component class)\n// In CSS file\n.card {\n  @apply bg-white rounded-lg shadow-md p-6;\n}\n\n// PurgeCSS in production (automatically removes unused classes)\n// Build command: NODE_ENV=production npx tailwindcss -i input.css -o output.css --minify\n\n// VSCode extension: Tailwind CSS IntelliSense\n\n// Example: responsive navbar\n<nav className="flex flex-wrap items-center justify-between p-4 bg-gray-100">\n  <div className="text-xl font-bold">Logo</div>\n  <div className="hidden md:flex space-x-4">\n    <a href="#" className="hover:text-blue-500">Home</a>\n    <a href="#" className="hover:text-blue-500">About</a>\n  </div>\n  <button className="md:hidden">Menu</button>\n</nav>',
  },
  {
    id: "concept-lifting-state",
    type: "concept",
    topic: "React",
    title: "Lifting State Up",
    prompt: "What does 'lifting state up' mean in React?",
    expected:
      "Lifting state up means moving shared state to the closest common ancestor of components that need it, enabling data flow via props. It avoids duplication and keeps components in sync.",
    keywords: ["lifting state", "shared state", "props", "react", "data flow"],
    explanation:
      "Lifting state up is a pattern in React where you move the state that is shared between multiple components to their closest common parent. The parent manages the state and passes it down via props, along with functions to update it.\n\n**Why lift state up?**\n- **Single source of truth:** One component owns the state, avoiding duplication and inconsistency.\n- **Synchronisation:** All child components receive the same state and can update it through callbacks.\n- **Predictability:** Data flows down, events bubble up (unidirectional data flow).\n\n**How it works:**\n1. Identify the components that need to share state.\n2. Find their closest common ancestor.\n3. Move the state to that ancestor.\n4. Pass the state down as props to the children.\n5. Pass down callbacks so children can update the state.\n\n**Common use cases:**\n- Form inputs where multiple fields affect each other.\n- Search/filter components that share filter criteria.\n- Toggle or selection state across sibling components.\n- Data fetching and caching for multiple views.\n\n**Interview tip:** Be ready to refactor code that duplicates state into a lifted state pattern. Understand that lifting state up can lead to 'prop drilling' (passing props through many levels), which can be solved with Context or state management libraries.",
    code: "// Without lifting state up (duplicated state – bug prone)\nfunction Input1() {\n  const [text, setText] = useState('');\n  return <input value={text} onChange={e => setText(e.target.value)} />;\n}\nfunction Input2() {\n  const [text, setText] = useState('');\n  return <input value={text} onChange={e => setText(e.target.value)} />;\n}\nfunction App() {\n  return (\n    <div>\n      <Input1 />\n      <Input2 />\n      {/* They are independent – not synced */}\n    </div>\n  );\n}\n\n// With lifting state up (shared state)\nfunction SyncedInput({ value, onChange }) {\n  return <input value={value} onChange={onChange} />;\n}\nfunction App() {\n  const [text, setText] = useState('');\n  const handleChange = (e) => setText(e.target.value);\n  return (\n    <div>\n      <SyncedInput value={text} onChange={handleChange} />\n      <SyncedInput value={text} onChange={handleChange} />\n      <p>Both inputs are synced: {text}</p>\n    </div>\n  );\n}\n\n// More complex: temperature converter\nfunction toCelsius(fahrenheit) {\n  return ((fahrenheit - 32) * 5) / 9;\n}\nfunction toFahrenheit(celsius) {\n  return (celsius * 9) / 5 + 32;\n}\nfunction TemperatureInput({ scale, temperature, onTemperatureChange }) {\n  const scaleName = scale === 'c' ? 'Celsius' : 'Fahrenheit';\n  return (\n    <fieldset>\n      <legend>Enter temperature in {scaleName}:</legend>\n      <input value={temperature} onChange={(e) => onTemperatureChange(e.target.value)} />\n    </fieldset>\n  );\n}\nfunction Calculator() {\n  const [temperature, setTemperature] = useState('');\n  const [scale, setScale] = useState('c');\n  function handleCelsiusChange(value) {\n    setTemperature(value);\n    setScale('c');\n  }\n  function handleFahrenheitChange(value) {\n    setTemperature(value);\n    setScale('f');\n  }\n  const celsius = scale === 'f' ? toCelsius(parseFloat(temperature)) : temperature;\n  const fahrenheit = scale === 'c' ? toFahrenheit(parseFloat(temperature)) : temperature;\n  return (\n    <div>\n      <TemperatureInput scale=\"c\" temperature={celsius} onTemperatureChange={handleCelsiusChange} />\n      <TemperatureInput scale=\"f\" temperature={fahrenheit} onTemperatureChange={handleFahrenheitChange} />\n    </div>\n  );\n}\n\n// Lifting state with arrays (shared list)\nfunction TodoItem({ todo, onToggle }) {\n  return (\n    <li>\n      <input type=\"checkbox\" checked={todo.completed} onChange={() => onToggle(todo.id)} />\n      {todo.text}\n    </li>\n  );\n}\nfunction TodoList() {\n  const [todos, setTodos] = useState([\n    { id: 1, text: 'Learn React', completed: false },\n    { id: 2, text: 'Build app', completed: false },\n  ]);\n  function toggleTodo(id) {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  }\n  return (\n    <ul>\n      {todos.map(todo => (\n        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />\n      ))}\n    </ul>\n  );\n}",
  },
  {
    id: "concept-synthetic-events",
    type: "concept",
    topic: "React",
    title: "Synthetic Events",
    prompt: "What are synthetic events in React?",
    expected:
      "Synthetic events are cross‑browser wrappers around native events, providing a consistent API and performance optimisations (event pooling). They bubble through the React tree, not the DOM tree.",
    keywords: [
      "synthetic event",
      "event pooling",
      "react",
      "cross-browser",
      "SyntheticEvent",
    ],
    explanation:
      "SyntheticEvent is React's cross‑browser wrapper around the browser's native event. It has the same interface as native events (stopPropagation, preventDefault, etc.) but works identically across all browsers.\n\n**Key characteristics:**\n- **Cross‑browser consistency:** Normalises event behaviour (e.g., `event.target` vs `event.srcElement`).\n- **Event pooling (prior to React 17):** For performance, SyntheticEvent objects were reused and nullified after the event handler finished. In React 17+, pooling was removed.\n- **Bubbling through React tree:** Events bubble through the virtual DOM hierarchy, not the actual DOM tree. This allows event handling on components that aren't directly nested in the DOM.\n- **Access to native event:** `event.nativeEvent` gives the original browser event.\n\n**Important differences from native events:**\n- Event handlers receive a SyntheticEvent instance.\n- In React 16 and earlier, you cannot access the event asynchronously without `event.persist()`.\n- In React 17+, `event.persist()` is no longer needed (pooling removed).\n\n**Interview tip:** Understand event pooling (legacy) and why React introduced it. Know that you can still access the native event. Also be aware that synthetic events do not bubble through shadow DOM boundaries.",
    code: "// Basic synthetic event usage\nfunction MyButton() {\n  const handleClick = (event) => {\n    console.log(event.type); // 'click'\n    console.log(event.target); // the DOM element\n    console.log(event.nativeEvent); // native MouseEvent\n    event.preventDefault(); // works\n    event.stopPropagation(); // works\n  };\n  return <button onClick={handleClick}>Click me</button>;\n}\n\n// In React 16 and earlier: event pooling\nfunction LegacyExample() {\n  const handleClick = (event) => {\n    // event is pooled – properties will be nullified after this function\n    setTimeout(() => {\n      console.log(event.type); // null in React 16, works in React 17+\n    }, 100);\n    // Fix: event.persist() in React 16\n    event.persist();\n    setTimeout(() => {\n      console.log(event.type); // 'click' – works after persist\n    }, 100);\n  };\n  return <button onClick={handleClick}>Click</button>;\n}\n\n// Accessing native event\nfunction InputWithNative() {\n  const handleChange = (e) => {\n    const native = e.nativeEvent;\n    console.log('Native event:', native);\n    console.log('Input type:', native.inputType);\n  };\n  return <input onChange={handleChange} />;\n}\n\n// Synthetic events bubble through React tree, not just DOM\nfunction Parent() {\n  const handleParentClick = () => console.log('Parent clicked (React tree)');\n  return (\n    <div onClick={handleParentClick}>\n      <Child />\n    </div>\n  );\n}\nfunction Child() {\n  const handleChildClick = (e) => {\n    console.log('Child clicked');\n    e.stopPropagation(); // stops propagation in React tree\n  };\n  return <button onClick={handleChildClick}>Click</button>;\n}\n\n// Synthetic events support the same methods as native\nfunction Form() {\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log('Form submitted');\n  };\n  return (\n    <form onSubmit={handleSubmit}>\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n}\n\n// Event pooling removed in React 17 – no need for persist\nfunction ModernExample() {\n  const handleClick = (event) => {\n    setTimeout(() => {\n      console.log(event.type); // 'click' – works without persist\n    }, 100);\n  };\n  return <button onClick={handleClick}>Click</button>;\n}",
  },
  {
    id: "concept-hoc",
    type: "concept",
    topic: "React",
    title: "Higher-Order Components (HOCs)",
    prompt: "What is a higher-order component (HOC) in React?",
    expected:
      "A higher-order component is a function that takes a component and returns a new component with additional props or behaviour. It is used for cross‑cutting concerns like authentication, logging, or data fetching.",
    keywords: [
      "HOC",
      "higher-order component",
      "reusability",
      "wrapper",
      "props",
    ],
    explanation:
      "A higher-order component (HOC) is an advanced pattern in React for reusing component logic. It is a function that takes a component and returns an enhanced version of that component. HOCs are not part of the React API; they are a pattern that emerges from React's compositional nature.\n\n**How HOCs work:**\n- Accept a component as input.\n- Add additional state, side effects, or props.\n- Return a new component that renders the original component with additional props.\n\n**Common use cases:**\n- **Authentication:** Redirect unauthenticated users.\n- **Logging:** Log prop changes or component lifecycle.\n- **Data fetching:** Fetch data and pass it as props.\n- **Conditional rendering:** Show loading spinners while data loads.\n- **Styling:** Inject CSS classes or theme.\n\n**Important conventions:**\n- HOC names should start with `with` (e.g., `withAuth`, `withData`).\n- Pass through unrelated props to the wrapped component (using `{...this.props}`).\n- Avoid mutating the original component; compose by wrapping.\n- Use `displayName` for easier debugging.\n\n**Alternatives:** Hooks have largely replaced many HOC use cases (especially data fetching and state logic). However, HOCs are still useful for wrapper components that need to add DOM structure or for libraries that rely on this pattern (e.g., `connect` in Redux, `withRouter` in React Router).\n\n**Interview tip:** Be able to write a simple HOC (e.g., `withLoading`) and explain its pros and cons compared to hooks and render props. Understand that HOCs can compose (chaining multiple HOCs).",
    code: "// Basic HOC that adds loading functionality\nfunction withLoading(WrappedComponent) {\n  return function WithLoading({ isLoading, ...props }) {\n    if (isLoading) {\n      return <div>Loading...</div>;\n    }\n    return <WrappedComponent {...props} />;\n  };\n}\nconst UserList = ({ users }) => (\n  <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>\n);\nconst UserListWithLoading = withLoading(UserList);\n\n// Authentication HOC\nfunction withAuth(WrappedComponent) {\n  return function WithAuth(props) {\n    const isAuthenticated = checkAuth();\n    if (!isAuthenticated) {\n      return <Redirect to=\"/login\" />;\n    }\n    return <WrappedComponent {...props} />;\n  };\n}\nconst Dashboard = () => <div>Secret dashboard</div>;\nconst ProtectedDashboard = withAuth(Dashboard);\n\n// Data fetching HOC\nfunction withData(url, mapDataToProps) {\n  return function(WrappedComponent) {\n    return class WithData extends React.Component {\n      state = { data: null, loading: true, error: null };\n      componentDidMount() {\n        fetch(url)\n          .then(res => res.json())\n          .then(data => this.setState({ data, loading: false }))\n          .catch(error => this.setState({ error, loading: false }));\n      }\n      render() {\n        const { data, loading, error } = this.state;\n        const extraProps = mapDataToProps ? mapDataToProps(data) : { data };\n        return <WrappedComponent {...this.props} {...extraProps} loading={loading} error={error} />;\n      }\n    };\n  };\n}\nconst UserProfile = ({ user }) => <div>{user?.name}</div>;\nconst UserProfileWithData = withData('/api/user', (data) => ({ user: data }))(UserProfile);\n\n// Logging HOC\nfunction withLogging(WrappedComponent) {\n  return class extends React.Component {\n    componentDidMount() {\n      console.log(`Component ${WrappedComponent.name} mounted`);\n    }\n    componentWillUnmount() {\n      console.log(`Component ${WrappedComponent.name} unmounted`);\n    }\n    render() {\n      return <WrappedComponent {...this.props} />;\n    }\n  };\n}\n\n// Setting display name for debugging\nfunction withAuth(WrappedComponent) {\n  const WithAuth = (props) => { /* ... */ };\n  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;\n  return WithAuth;\n}\n\n// Composing multiple HOCs\nconst EnhancedComponent = withAuth(withLogging(withData(UserProfile)));\n// Using compose utility (Redux)\nimport { compose } from 'redux';\nconst enhance = compose(withAuth, withLogging, withData);\nconst Enhanced = enhance(UserProfile);\n\n// HOC that adds style\nfunction withStyle(styles) {\n  return function(WrappedComponent) {\n    return function(props) {\n      return <div style={styles}><WrappedComponent {...props} /></div>;\n    };\n  };\n}\nconst StyledButton = withStyle({ color: 'red', fontWeight: 'bold' })(Button);\n\n// Avoiding HOC in favour of hook (modern)\n// Instead of withData, use custom hook:\nfunction useData(url) {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch(url).then(res => res.json()).then(setData);\n  }, [url]);\n  return data;\n}\nfunction UserProfile() {\n  const user = useData('/api/user');\n  return <div>{user?.name}</div>;\n}",
  },
  {
    id: "concept-render-props",
    type: "concept",
    topic: "React",
    title: "Render Props",
    prompt: "What is the render props pattern in React?",
    expected:
      "Render props is a pattern where a component accepts a function as a prop (usually called `render` or `children`) that returns React elements. The component calls that function with its internal state, enabling code reuse and sharing logic.",
    keywords: [
      "render props",
      "function as child",
      "children as function",
      "code reuse",
    ],
    explanation:
      "The render props pattern is a technique for sharing code between React components using a prop whose value is a function. This function returns React elements, and the component calls it with its internal state or data.\n\n**How it works:**\n- A component (the provider) receives a function prop (commonly named `render` or `children`).\n- The component executes this function, passing some data (often its internal state) as arguments.\n- The function returns JSX that uses that data.\n\n**Common use cases:**\n- Sharing mouse position, window size, or other dynamic data.\n- Data fetching and exposing loading/error states.\n- Form handling and validation logic.\n- Animation libraries (e.g., React Spring).\n\n**Advantages:**\n- Reusable logic without HOC wrapper hell.\n- Inversion of control: the consumer decides how to render.\n- More flexible than HOCs (no prop name collisions).\n\n**Disadvantages:**\n- Can lead to nested render prop functions ('callback hell' style).\n- Performance considerations if the function is recreated on each render.\n\n**Comparison with HOCs:** HOCs add props, while render props give the consumer the data to use. Render props are often more explicit and avoid prop name clashes.\n\n**Modern alternative:** Custom hooks (useMouse, useWindowSize, useFetch) have largely replaced render props for logic sharing, but render props are still useful when the rendering logic itself needs to be customised per consumer.\n\n**Interview tip:** Be able to implement a simple render prop component (e.g., MouseTracker) and explain the difference between render props and HOCs. Also discuss the 'children as function' variant.",
    code: "// Basic render prop: MouseTracker\nclass MouseTracker extends React.Component {\n  state = { x: 0, y: 0 };\n  handleMouseMove = (event) => {\n    this.setState({ x: event.clientX, y: event.clientY });\n  };\n  render() {\n    return (\n      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>\n        {this.props.render(this.state)}\n      </div>\n    );\n  }\n}\n// Usage with render prop\n<MouseTracker render={({ x, y }) => (\n  <h1>The mouse position is ({x}, {y})</h1>\n)} />\n\n// Alternative: children as function (common pattern)\nclass MouseTrackerChildren extends React.Component {\n  state = { x: 0, y: 0 };\n  handleMouseMove = (e) => this.setState({ x: e.clientX, y: e.clientY });\n  render() {\n    return (\n      <div onMouseMove={this.handleMouseMove}>\n        {this.props.children(this.state)}\n      </div>\n    );\n  }\n}\n// Usage with children as function\n<MouseTrackerChildren>\n  {({ x, y }) => <p>Position: {x}, {y}</p>}\n</MouseTrackerChildren>\n\n// Data fetching with render prop\nclass Fetch extends React.Component {\n  state = { data: null, loading: true, error: null };\n  componentDidMount() {\n    fetch(this.props.url)\n      .then(res => res.json())\n      .then(data => this.setState({ data, loading: false }))\n      .catch(error => this.setState({ error, loading: false }));\n  }\n  render() {\n    return this.props.children(this.state);\n  }\n}\n// Usage\n<Fetch url=\"/api/user\">\n  {({ data, loading, error }) => {\n    if (loading) return <div>Loading...</div>;\n    if (error) return <div>Error: {error.message}</div>;\n    return <div>User: {data.name}</div>;\n  }}\n</Fetch>\n\n// Combining multiple render props\n<MouseTracker render={({ x, y }) => (\n  <Fetch url={`/api/color/${x},${y}`}>\n    {({ data }) => <div style={{ color: data?.color }}>Color at mouse</div>}\n  </Fetch>\n)} />\n\n// Render prop with imperative handle (e.g., toggle)\nclass Toggle extends React.Component {\n  state = { on: false };\n  toggle = () => this.setState(prev => ({ on: !prev.on }));\n  render() {\n    return this.props.children({ on: this.state.on, toggle: this.toggle });\n  }\n}\n<Toggle>\n  {({ on, toggle }) => (\n    <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>\n  )}\n</Toggle>\n\n// Performance optimisation: prevent creating new function on each render\n// Use useCallback or class property\nclass Optimised extends React.Component {\n  renderContent = (data) => {\n    return <div>{data}</div>;\n  };\n  render() {\n    return <DataProvider render={this.renderContent} />;\n  }\n}\n\n// Custom hook alternative (modern)\nfunction useMouse() {\n  const [pos, setPos] = useState({ x: 0, y: 0 });\n  useEffect(() => {\n    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });\n    window.addEventListener('mousemove', handler);\n    return () => window.removeEventListener('mousemove', handler);\n  }, []);\n  return pos;\n}\nfunction Component() {\n  const { x, y } = useMouse();\n  return <div>{x}, {y}</div>;\n}",
  },
  {
    id: "concept-strict-mode",
    type: "concept",
    topic: "React",
    title: "React Strict Mode",
    prompt: "What is React Strict Mode and what does it do?",
    expected:
      "Strict Mode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants (e.g., unsafe lifecycles, legacy refs, unexpected side effects) during development only.",
    keywords: [
      "StrictMode",
      "development",
      "warnings",
      "side effects",
      "React",
    ],
    explanation:
      "React Strict Mode is a wrapper component that activates extra checks and warnings for its descendants in development builds. It does not affect the production build.\n\n**What Strict Mode does:**\n- **Detects unsafe lifecycle methods** (componentWillMount, componentWillReceiveProps, componentWillUpdate).\n- **Warns about legacy string refs** and deprecated APIs (findDOMNode).\n- **Detects unexpected side effects** by double‑invoking certain functions (constructor, render, setState updaters, useEffect cleanup).\n- **Warns about legacy context API.**\n- **Prepares for future React features** like concurrent rendering.\n\n**Double‑invocation behaviour:**\nIn development, Strict Mode intentionally calls the following functions twice to help detect side effects:\n- Class component constructor, render, and shouldComponentUpdate.\n- Function component bodies.\n- State updater functions (the first argument to setState).\n- Functions passed to useState, useMemo, useReducer.\n- Effects (setup + cleanup) are run one extra time.\n\nThis helps ensure that components are pure and can handle being re‑run.\n\n**What Strict Mode does NOT do:**\n- It does not render any visible UI.\n- It does not work in production builds.\n- It does not catch all problems; it's a helper, not a guarantee.\n\n**Where to apply:**\nWrap any part of the component tree; it only checks descendants.\n\n**Interview tip:** Be ready to explain why double invocation helps find side effects (e.g., API calls in useEffect might be called twice in dev, revealing missing cleanup). Understand that Strict Mode is a development aid and should be removed from production builds automatically (React ignores it in production).",
    code: "// Basic usage – wrap the whole app\nimport { StrictMode } from 'react';\nReactDOM.render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n  document.getElementById('root')\n);\n\n// Or wrap only part of the app\nfunction App() {\n  return (\n    <div>\n      <Header />\n      <StrictMode>\n        <ExperimentalComponent />\n      </StrictMode>\n    </div>\n  );\n}\n\n// StrictMode double‑invokes effects in development\nfunction EffectExample() {\n  useEffect(() => {\n    console.log('Effect ran'); // logs twice in development\n    return () => console.log('Cleanup'); // runs cleanup and then effect again\n  }, []);\n  return <div>Check console</div>;\n}\n\n// Detects unsafe lifecycle\nclass LegacyComponent extends React.Component {\n  componentWillMount() {\n    // Warning: componentWillMount is deprecated\n  }\n  render() {\n    return <div>Legacy</div>;\n  }\n}\n\n// Detects legacy string refs\nclass StringRefComponent extends React.Component {\n  componentDidMount() {\n    console.log(this.refs.myDiv); // warning\n  }\n  render() {\n    return <div ref=\"myDiv\">String ref</div>;\n  }\n}\n\n// Detects findDOMNode usage\nclass FindDOMNodeExample extends React.Component {\n  componentDidMount() {\n    ReactDOM.findDOMNode(this); // warning\n  }\n  render() {\n    return <div>Example</div>;\n  }\n}\n\n// Double invocation of setState updater\nfunction StateExample() {\n  const [count, setCount] = useState(0);\n  function handleClick() {\n    setCount(prev => {\n      console.log('Updater called'); // logs twice in development\n      return prev + 1;\n    });\n  }\n  return <button onClick={handleClick}>Count: {count}</button>;\n}\n\n// Helps detect missing cleanup in useEffect\nfunction MissingCleanup() {\n  useEffect(() => {\n    const interval = setInterval(() => console.log('tick'), 1000);\n    // Missing cleanup – Strict Mode will run effect twice, creating two intervals\n    // This would cause memory leak; cleanup fixes it\n    return () => clearInterval(interval);\n  }, []);\n  return <div>Check intervals</div>;\n}\n\n// Detects legacy context API (contextTypes)\nclass LegacyContextConsumer extends React.Component {\n  static contextTypes = { theme: PropTypes.string };\n  render() {\n    return <div>{this.context.theme}</div>;\n  }\n}\n\n// StrictMode does not affect production build\n// In production, <StrictMode> is ignored\n// You can test by building and serving the production build",
  },
  {
    id: "concept-error-boundaries",
    type: "concept",
    topic: "React",
    title: "Error Boundaries",
    prompt: "What are error boundaries in React?",
    expected:
      "Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole application.",
    keywords: [
      "error boundary",
      "componentDidCatch",
      "getDerivedStateFromError",
      "fallback UI",
    ],
    explanation:
      "Error boundaries are special React components that catch JavaScript errors during rendering, in lifecycle methods, and in constructors of the whole tree below them. They prevent the entire application from unmounting due to a UI error and allow you to display a graceful fallback.\n\n**How to create an error boundary:**\n- Implement either `static getDerivedStateFromError(error)` (to update state and render fallback UI) or `componentDidCatch(error, info)` (to log errors).\n- You can use both: `getDerivedStateFromError` for rendering fallback, `componentDidCatch` for logging.\n\n**What error boundaries catch:**\n- Rendering errors (during render).\n- Lifecycle method errors (e.g., componentDidMount, componentDidUpdate).\n- Constructor errors (in class components).\n\n**What they do NOT catch:**\n- Errors in event handlers (use try/catch).\n- Asynchronous code (setTimeout, requestAnimationFrame).\n- Server‑side rendering errors.\n- Errors thrown in the error boundary itself (not propagated).\n\n**Placement:**\n- Wrap top‑level routes to catch whole page errors.\n- Wrap individual components to provide isolated fallbacks.\n\n**Alternatives with hooks:** There is no hook equivalent; you still need a class component for error boundaries. Libraries like `react-error-boundary` provide a functional wrapper.\n\n**Interview tip:** Be ready to implement a simple error boundary class. Understand that error boundaries are the React equivalent of try/catch for declarative UI. Also know that in production, error boundaries prevent white screens and improve user experience.",
    code: "// Basic error boundary class component\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false, error: null };\n  }\n  static getDerivedStateFromError(error) {\n    // Update state so the next render shows fallback UI\n    return { hasError: true, error };\n  }\n  componentDidCatch(error, errorInfo) {\n    // Log error to an error reporting service\n    console.error('Error caught by boundary:', error, errorInfo);\n    logErrorToService(error, errorInfo);\n  }\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong. Please try again later.</h1>;\n    }\n    return this.props.children;\n  }\n}\n\n// Usage: wrap components that might throw\n<ErrorBoundary>\n  <MyComponent />\n</ErrorBoundary>\n\n// Nested error boundaries – each can handle errors in its subtree\n<ErrorBoundary fallback={<div>Widget error</div>}>\n  <Widget />\n</ErrorBoundary>\n<ErrorBoundary fallback={<div>Sidebar error</div>}>\n  <Sidebar />\n</ErrorBoundary>\n\n// Error boundary with custom fallback prop\nclass CustomErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  render() {\n    if (this.state.hasError) {\n      return this.props.fallback || <div>Error occurred</div>;\n    }\n    return this.props.children;\n  }\n}\n\n// Using with React Router – wrap routes\n<ErrorBoundary>\n  <Routes>\n    <Route path=\"/\" element={<Home />} />\n    <Route path=\"/profile\" element={<Profile />} />\n  </Routes>\n</ErrorBoundary>\n\n// Error boundary does NOT catch errors in event handlers\nfunction BuggyButton() {\n  const handleClick = () => {\n    throw new Error('Event handler error');\n  };\n  return <button onClick={handleClick}>Click</button>;\n}\n// Solution: use try/catch inside event handler\nconst safeClick = () => {\n  try {\n    // risky code\n  } catch (err) {\n    // handle error\n  }\n};\n\n// Using react-error-boundary library (functional)\nimport { ErrorBoundary } from 'react-error-boundary';\nfunction fallbackRender({ error, resetErrorBoundary }) {\n  return (\n    <div role=\"alert\">\n      <p>Something went wrong:</p>\n      <pre>{error.message}</pre>\n      <button onClick={resetErrorBoundary}>Try again</button>\n    </div>\n  );\n}\n<ErrorBoundary fallbackRender={fallbackRender} onReset={() => window.location.reload()}>\n  <BuggyComponent />\n</ErrorBoundary>\n\n// Resetting error boundary (imperative)\nclass ResettableErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  reset = () => this.setState({ hasError: false });\n  render() {\n    if (this.state.hasError) {\n      return <button onClick={this.reset}>Try again</button>;\n    }\n    return this.props.children;\n  }\n}\n\n// In production, error boundaries prevent unmounting the whole app\n// Without error boundary: any render error unmounts the entire React tree",
  },
  {
    id: "concept-portals",
    type: "concept",
    topic: "React",
    title: "Portals",
    prompt: "What are portals in React?",
    expected:
      "Portals provide a way to render children into a DOM node that exists outside the parent component's DOM hierarchy, while still preserving the React context and event bubbling.",
    keywords: ["portal", "createPortal", "modal", "tooltip", "DOM node"],
    explanation:
      "Portals are a React feature that allow you to render a component's children into a different part of the DOM tree than the parent component's location, while keeping the React context and event propagation intact.\n\n**Why use portals?**\n- Modals, tooltips, dropdowns, and toasts need to break out of overflow/stacking context.\n- Avoid CSS issues (z-index, overflow: hidden).\n- Keep logical component hierarchy for event handling.\n\n**How it works:**\n- `ReactDOM.createPortal(child, container)` where `container` is a DOM element.\n- The portal still follows React's context flow (the portal component's context is the same as its parent, not the container's).\n- Events bubble through the React tree, not the DOM tree, so events from portals propagate to ancestors in the React component tree.\n\n**Common use cases:**\n- Modal dialogs (render at document.body level).\n- Tooltips and popovers (avoid parent clipping).\n- Dropdown menus that need to overflow.\n- Notification toasts.\n\n**Interview tip:** Be able to implement a simple modal using portals. Understand that portals are not just for modals; they solve any situation where you need to render outside the parent DOM hierarchy. Also know that you can stack portals and that event handling works as expected.",
    code: "// Basic portal usage\nimport { createPortal } from 'react-dom';\nfunction Modal({ children, onClose }) {\n  return createPortal(\n    <div className=\"modal-overlay\" onClick={onClose}>\n      <div className=\"modal\" onClick={(e) => e.stopPropagation()}>\n        {children}\n        <button onClick={onClose}>Close</button>\n      </div>\n    </div>,\n    document.body // render into body\n  );\n}\nfunction App() {\n  const [showModal, setShowModal] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setShowModal(true)}>Open Modal</button>\n      {showModal && (\n        <Modal onClose={() => setShowModal(false)}>\n          <h2>Modal Content</h2>\n          <p>This is rendered at the body level</p>\n        </Modal>\n      )}\n    </div>\n  );\n}\n\n// Portal with custom container (create and append)\nfunction Portal({ children, containerId = 'portal-root' }) {\n  const [container, setContainer] = useState(null);\n  useEffect(() => {\n    let element = document.getElementById(containerId);\n    if (!element) {\n      element = document.createElement('div');\n      element.id = containerId;\n      document.body.appendChild(element);\n    }\n    setContainer(element);\n    return () => {\n      if (element.parentNode && element.childNodes.length === 0) {\n        element.parentNode.removeChild(element);\n      }\n    };\n  }, [containerId]);\n  if (!container) return null;\n  return createPortal(children, container);\n}\n\n// Tooltip portal\nfunction Tooltip({ children, text, position = 'top' }) {\n  const [show, setShow] = useState(false);\n  const [coords, setCoords] = useState({ top: 0, left: 0 });\n  const triggerRef = useRef();\n  const showTooltip = () => {\n    const rect = triggerRef.current.getBoundingClientRect();\n    setCoords({ top: rect.top - 30, left: rect.left + rect.width / 2 });\n    setShow(true);\n  };\n  return (\n    <>\n      <span ref={triggerRef} onMouseEnter={showTooltip} onMouseLeave={() => setShow(false)}>\n        {children}\n      </span>\n      {show && createPortal(\n        <div style={{ position: 'fixed', top: coords.top, left: coords.left }}>\n          {text}\n        </div>,\n        document.body\n      )}\n    </>\n  );\n}\n\n// Event bubbling with portals – events bubble through React tree\nfunction Parent() {\n  const handleClick = () => console.log('Parent clicked');\n  return (\n    <div onClick={handleClick}>\n      <Modal>Click inside modal – Parent handler still fires</Modal>\n    </div>\n  );\n}\n\n// Multiple portals (e.g., notification stack)\nfunction Notifications() {\n  const [notifications, setNotifications] = useState([]);\n  const addNotification = (msg) => {\n    const id = Date.now();\n    setNotifications(prev => [...prev, { id, msg }]);\n    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);\n  };\n  return (\n    <>\n      <button onClick={() => addNotification('New message')}>Notify</button>\n      {createPortal(\n        <div className=\"toast-container\">\n          {notifications.map(n => <div key={n.id} className=\"toast\">{n.msg}</div>)}\n        </div>,\n        document.body\n      )}\n    </>\n  );\n}\n\n// Portal with context (context works through portals)\nconst ThemeContext = React.createContext('light');\nfunction ThemedModal() {\n  const theme = useContext(ThemeContext);\n  return createPortal(\n    <div className={`modal ${theme}`}>Modal with theme</div>,\n    document.body\n  );\n}\n// Theme from parent component is accessible inside portal\n\n// Portal with focus management (for accessibility)\nfunction AccessibleModal({ open, onClose, children }) {\n  const modalRef = useRef();\n  useEffect(() => {\n    if (open) {\n      const previousFocus = document.activeElement;\n      modalRef.current?.focus();\n      return () => previousFocus?.focus();\n    }\n  }, [open]);\n  if (!open) return null;\n  return createPortal(\n    <div role=\"dialog\" aria-modal=\"true\" tabIndex={-1} ref={modalRef}>\n      {children}\n      <button onClick={onClose}>Close</button>\n    </div>,\n    document.body\n  );\n}",
  },
  {
    id: "concept-app-router",
    type: "concept",
    topic: "Next.js",
    title: "App Router vs Pages Router",
    prompt:
      "What are the differences between the App Router and the Pages Router in Next.js?",
    expected:
      "The App Router is the newer routing system based on React Server Components, offering nested layouts, parallel routes, and improved data fetching. The Pages Router uses file‑based routing with a pages/ directory and is simpler but less powerful.",
    keywords: [
      "App Router",
      "Pages Router",
      "Next.js",
      "routing",
      "React Server Components",
    ],
    explanation:
      "Next.js introduced the App Router in version 13 as a new way to build applications. It coexists with the traditional Pages Router.\n\n**Pages Router (traditional):**\n- Files in `pages/` directory map to routes (e.g., `pages/about.js` → `/about`).\n- Uses `getStaticProps`, `getServerSideProps`, `getStaticPaths` for data fetching.\n- Layouts are custom (wrapping components in `_app.js`).\n- Client‑centric with some server‑side capabilities.\n- Limited nested layouts.\n\n**App Router (new):**\n- Files in `app/` directory with special file conventions: `page.js`, `layout.js`, `loading.js`, `error.js`, `route.js`.\n- Based on React Server Components (RSC) – components are server‑side by default.\n- Nested layouts (each folder can have its own `layout.js`).\n- Simplified data fetching with `async` components and `fetch` with caching.\n- Parallel routes (`@folder`) and intercepting routes.\n- Streaming with `loading.js` and Suspense.\n- Middleware and route handlers (`route.js` for API).\n\n**When to use which:**\n- Use Pages Router for existing projects or when you need simpler, well‑tested patterns.\n- Use App Router for new projects, especially when you need nested layouts, React Server Components, or advanced routing features.\n- You can use both in the same project (but routes cannot conflict).\n\n**Interview tip:** Understand that App Router is the future direction of Next.js. Be able to explain the benefits of React Server Components (zero client‑side JS for static parts) and nested layouts. Also know that `pages/` will continue to be supported.",
    code: "// Pages Router (pages/index.js)\nexport default function Home() {\n  return <div>Home Page</div>;\n}\n// Data fetching in Pages Router\nexport async function getServerSideProps() {\n  const data = await fetchData();\n  return { props: { data } };\n}\n\n// App Router (app/page.js)\nexport default function Home() {\n  return <div>Home Page</div>;\n}\n// Data fetching in App Router – async component\nexport default async function Home() {\n  const data = await fetch('https://api.example.com').then(res => res.json());\n  return <div>{data.title}</div>;\n}\n\n// Nested layouts in App Router\n// app/layout.js (root layout)\nexport default function RootLayout({ children }) {\n  return (\n    <html>\n      <body>\n        <header>Global Header</header>\n        {children}\n      </body>\n    </html>\n  );\n}\n// app/dashboard/layout.js (nested layout for /dashboard)\nexport default function DashboardLayout({ children }) {\n  return (\n    <div>\n      <aside>Sidebar</aside>\n      <main>{children}</main>\n    </div>\n  );\n}\n// app/dashboard/page.js\n// will be rendered inside both layouts\n\n// Loading states (app/dashboard/loading.js)\nexport default function Loading() {\n  return <div>Loading dashboard...</div>;\n}\n\n// Error boundaries (app/dashboard/error.js)\n'use client';\nexport default function Error({ error, reset }) {\n  return (\n    <div>\n      <h2>Something went wrong!</h2>\n      <button onClick={reset}>Try again</button>\n    </div>\n  );\n}\n\n// API routes in App Router (app/api/hello/route.js)\nexport async function GET(request) {\n  return Response.json({ message: 'Hello from App Router' });\n}\n\n// Parallel routes (app/dashboard/@analytics/page.js)\n// Slot rendered alongside main page\n\n// Intercepting routes (app/photos/(..)image/[id]/page.js)\n// Intercepts navigation to /photos/[...] to show modal\n\n// Using both routers together\n// pages/old-page.js and app/new-page.js can coexist\n// but route conflicts are not allowed",
  },
  {
    id: "concept-server-components",
    type: "concept",
    topic: "Next.js",
    title: "Server Components vs Client Components",
    prompt:
      "Explain the difference between Server Components and Client Components in Next.js App Router.",
    expected:
      "Server Components render on the server, have no client‑side JavaScript, and can directly access backend resources. Client Components render on the client, include interactivity and browser APIs, and are marked with 'use client'.",
    keywords: [
      "Server Components",
      "Client Components",
      "use client",
      "RSC",
      "Next.js",
    ],
    explanation:
      "React Server Components (RSC) are a new paradigm introduced in Next.js App Router. Components are server‑side by default unless marked with 'use client'.\n\n**Server Components:**\n- **Execution:** Only on the server, never on the client.\n- **Bundle size:** No JavaScript shipped to the client → smaller bundles.\n- **Capabilities:** Direct database access, file system, environment variables, sensitive logic.\n- **No state or effects:** Cannot use useState, useEffect, or browser APIs.\n- **Async:** Can be async functions (await data fetching).\n- **Caching:** Results can be cached and reused across requests.\n- **Default:** Every component in App Router is a Server Component by default.\n\n**Client Components:**\n- **Execution:** On the server once (for SSR) and then on the client (hydration).\n- **Bundle size:** JavaScript is sent to the client.\n- **Capabilities:** useState, useEffect, event handlers, browser APIs (localStorage, etc.).\n- **Interactivity:** Can have click handlers, form submissions, etc.\n- **Marked with:** `'use client'` directive at the top of the file.\n\n**When to use which:**\n- Use Server Components for static content, data fetching, SEO‑critical pages, and heavy dependencies that you don't want to send to the client.\n- Use Client Components for interactive parts: buttons, forms, stateful components, components that use browser APIs.\n\n**Composition:** Client Components can import Server Components as children (but not the other way around – a Server Component cannot import a Client Component that then imports a Server Component? Actually, Server Components can import Client Components; they work together via composition.)\n\n**Interview tip:** Understand that Server Components reduce client‑side JS, improve performance, and allow direct backend access. Be able to explain the 'use client' boundary and why you cannot use hooks in Server Components.",
    code: "// Server Component (default, no directive)\n// app/products/page.js\nasync function getProducts() {\n  const res = await fetch('https://api.example.com/products');\n  return res.json();\n}\nexport default async function ProductsPage() {\n  const products = await getProducts();\n  return (\n    <ul>\n      {products.map(p => <li key={p.id}>{p.name}</li>)}\n    </ul>\n  );\n}\n\n// Client Component (with 'use client')\n// app/components/Counter.js\n'use client';\nimport { useState } from 'react';\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}\n\n// Server Component importing a Client Component\n// app/page.js\nimport Counter from './components/Counter';\nimport ServerData from './components/ServerData';\nexport default function Page() {\n  return (\n    <div>\n      <h1>Server Rendered Title</h1>\n      <Counter /> {/* interactive */}\n      <ServerData /> {/* server component */}\n    </div>\n  );\n}\n\n// Client Component cannot directly import a Server Component as a child?\n// Actually, Client Component can import Server Component – but the Server Component\n// is already rendered on the server and embedded in the client bundle as static HTML.\n// The 'use client' boundary stops server components from being re‑executed on client.\n\n// Passing props from Server to Client Component\n// app/page.js (Server)\nimport InteractiveCard from './InteractiveCard';\nexport default async function Page() {\n  const userData = await fetchUser();\n  return <InteractiveCard user={userData} />;\n}\n// InteractiveCard.js (Client)\n'use client';\nexport default function InteractiveCard({ user }) {\n  const [liked, setLiked] = useState(false);\n  return (\n    <div>\n      <p>{user.name}</p>\n      <button onClick={() => setLiked(!liked)}>{liked ? 'Unlike' : 'Like'}</button>\n    </div>\n  );\n}\n\n// Streaming with Server Components\n// app/products/page.js\nimport { Suspense } from 'react';\nimport ProductList from './ProductList';\nimport ProductSidebar from './ProductSidebar';\nexport default function ProductsPage() {\n  return (\n    <div>\n      <Suspense fallback={<div>Loading products...</div>}>\n        <ProductList />\n      </Suspense>\n      <Suspense fallback={<div>Loading sidebar...</div>}>\n        <ProductSidebar />\n      </Suspense>\n    </div>\n  );\n}\n\n// Server Component with database access (Prisma example)\nimport { prisma } from '@/lib/prisma';\nexport default async function Users() {\n  const users = await prisma.user.findMany();\n  return <pre>{JSON.stringify(users, null, 2)}</pre>;\n}\n\n// Client Component with browser API\n'use client';\nimport { useEffect, useState } from 'react';\nexport default function WindowSize() {\n  const [size, setSize] = useState({ width: 0, height: 0 });\n  useEffect(() => {\n    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });\n    window.addEventListener('resize', update);\n    update();\n    return () => window.removeEventListener('resize', update);\n  }, []);\n  return <div>Window size: {size.width}x{size.height}</div>;\n}",
  },
  {
    id: "concept-nextjs-data-fetching",
    type: "concept",
    topic: "Next.js",
    title: "Data Fetching in Next.js (SSR, SSG, ISR)",
    prompt:
      "What are the different data fetching methods in Next.js (SSR, SSG, ISR)?",
    expected:
      "SSR (Server‑Side Rendering) fetches data on each request; SSG (Static Site Generation) fetches at build time; ISR (Incremental Static Regeneration) updates static pages after build at runtime. In App Router, these are replaced by fetch caching and dynamic segment config.",
    keywords: [
      "SSR",
      "SSG",
      "ISR",
      "data fetching",
      "Next.js",
      "getStaticProps",
      "getServerSideProps",
    ],
    explanation:
      "Next.js provides multiple data fetching strategies to balance performance, freshness, and scalability.\n\n**Pages Router methods:**\n- **SSG (Static Site Generation):** `getStaticProps` – fetches data at build time. Generates static HTML. Ideal for blogs, documentation, marketing pages.\n- **SSR (Server‑Side Rendering):** `getServerSideProps` – fetches data on each request. Good for user‑specific content (dashboards, profiles).\n- **ISR (Incremental Static Regeneration):** `getStaticProps` with `revalidate` – generates static pages at build time, then regenerates them in the background after a specified interval. Combines static speed with freshness.\n- **Client‑side fetching:** using `swr` or `useEffect` – fetch data after page loads.\n\n**App Router equivalent:**\n- `fetch()` with caching options: `force-cache` (SSG), `no-store` (SSR), `next: { revalidate: 60 }` (ISR).\n- `export const dynamic = 'force-dynamic'` – force SSR.\n- `export const dynamic = 'force-static'` – force SSG.\n\n**Comparison:**\n| Strategy | Build time | Request time | Freshness | Use case |\n|----------|------------|--------------|-----------|----------|\n| SSG | Runs | Serves cached | Stale | Public, infrequent changes |\n| SSR | – | Runs each time | Always fresh | User‑specific, real‑time |\n| ISR | Runs initially | Serves cached + background refresh | Stale‑while‑revalidate | Large catalogs, news |\n\n**Interview tip:** Understand when to use each strategy. Know that ISR solves the problem of rebuilding thousands of pages on every change. In App Router, caching is more granular and configurable per fetch.",
    code: "// Pages Router: SSG (Static Site Generation)\nexport async function getStaticProps() {\n  const data = await fetch('https://api.example.com/posts').then(res => res.json());\n  return { props: { posts: data } };\n}\n\n// Pages Router: ISR (revalidate every 60 seconds)\nexport async function getStaticProps() {\n  const data = await fetch('https://api.example.com/posts').then(res => res.json());\n  return {\n    props: { posts: data },\n    revalidate: 60, // seconds\n  };\n}\n\n// Pages Router: SSR (Server‑Side Rendering)\nexport async function getServerSideProps(context) {\n  const { userId } = context.params;\n  const user = await fetch(`https://api.example.com/users/${userId}`).then(res => res.json());\n  return { props: { user } };\n}\n\n// Pages Router: dynamic routes with SSG\nexport async function getStaticPaths() {\n  const posts = await fetch('https://api.example.com/posts').then(res => res.json());\n  const paths = posts.map(post => ({ params: { id: post.id.toString() } }));\n  return { paths, fallback: 'blocking' };\n}\n\n// App Router: SSG equivalent (force-cache)\nexport default async function Page() {\n  const data = await fetch('https://api.example.com/data', { cache: 'force-cache' });\n  const json = await data.json();\n  return <div>{json.title}</div>;\n}\n\n// App Router: ISR equivalent (revalidate)\nexport default async function Page() {\n  const data = await fetch('https://api.example.com/data', { next: { revalidate: 60 } });\n  const json = await data.json();\n  return <div>{json.title}</div>;\n}\n\n// App Router: SSR equivalent (no-store)\nexport default async function Page() {\n  const data = await fetch('https://api.example.com/data', { cache: 'no-store' });\n  const json = await data.json();\n  return <div>{json.title}</div>;\n}\n\n// App Router: segment config for entire page\nexport const dynamic = 'force-dynamic'; // SSR\nexport const dynamic = 'force-static'; // SSG\nexport const revalidate = 60; // ISR\n\n// Client‑side data fetching with SWR (Pages or App)\nimport useSWR from 'swr';\nfunction Profile() {\n  const { data, error } = useSWR('/api/user', fetcher);\n  if (error) return <div>Failed to load</div>;\n  if (!data) return <div>Loading...</div>;\n  return <div>Hello {data.name}!</div>;\n}\n\n// Streaming SSR in App Router (with Suspense)\nimport { Suspense } from 'react';\nasync function SlowComponent() {\n  const data = await fetch('https://slow-api.com', { cache: 'no-store' });\n  return <div>{await data.text()}</div>;\n}\nexport default function Page() {\n  return (\n    <div>\n      <h1>Fast content</h1>\n      <Suspense fallback={<div>Loading slow component...</div>}>\n        <SlowComponent />\n      </Suspense>\n    </div>\n  );\n}",
  },
  {
    id: "concept-nextjs-routing",
    type: "concept",
    topic: "Next.js",
    title: "File-based Routing",
    prompt: "How does routing work in Next.js?",
    expected:
      "Next.js uses file-system based routing: files in the pages/ directory (Pages Router) or app/ directory (App Router) become routes. Dynamic routes use brackets ([id]), catch‑all ([...slug]), and optional catch‑all ([[...slug]]).",
    keywords: [
      "routing",
      "file-based",
      "dynamic routes",
      "catch-all",
      "Next.js",
    ],
    explanation:
      "Next.js routing is based on the file structure. There are two routing systems: the traditional Pages Router (pages/) and the newer App Router (app/).\n\n**Pages Router (conventions):**\n- `pages/index.js` → `/`\n- `pages/about.js` → `/about`\n- `pages/blog/index.js` → `/blog`\n- `pages/blog/[slug].js` → `/blog/post-1` (dynamic segment)\n- `pages/docs/[...slug].js` → `/docs/a/b/c` (catch‑all route, matches /docs/a, /docs/a/b, etc.)\n- `pages/docs/[[...slug]].js` → matches `/docs` (empty) and `/docs/a/b` (optional catch‑all)\n\n**App Router (conventions):**\n- `app/page.js` → `/`\n- `app/about/page.js` → `/about`\n- `app/blog/page.js` → `/blog`\n- `app/blog/[slug]/page.js` → `/blog/post-1`\n- `app/docs/[...slug]/page.js` → `/docs/a/b/c`\n- `app/docs/[[...slug]]/page.js` → optional catch‑all\n- Special files: `layout.js` (shared layout), `loading.js` (loading UI), `error.js` (error boundary), `not-found.js` (404).\n\n**Dynamic route parameters:**\n- Pages Router: `useRouter().query`\n- App Router: `params` prop in server component, `useParams()` in client component.\n\n**Interview tip:** Understand the difference between optional and required catch‑all routes. Know that file names with brackets are dynamic, and `index.js` is the default route for a directory. Be able to create nested dynamic routes (e.g., `pages/blog/[year]/[month]/[slug].js`).",
    code: "// Pages Router examples\n// pages/index.js → /\nexport default function Home() { return <div>Home</div>; }\n\n// pages/about.js → /about\nexport default function About() { return <div>About</div>; }\n\n// pages/blog/[slug].js → /blog/hello-world\nimport { useRouter } from 'next/router';\nexport default function BlogPost() {\n  const router = useRouter();\n  const { slug } = router.query;\n  return <div>Post: {slug}</div>;\n}\n\n// pages/docs/[...slug].js → /docs/api/auth/login\n// slug = ['api', 'auth', 'login']\nexport default function Docs({ params }) { // using getStaticProps\n  return <div>{params.slug.join('/')}</div>;\n}\n\n// App Router examples\n// app/page.js → /\nexport default function Home() { return <div>Home</div>; }\n\n// app/blog/[slug]/page.js → /blog/hello-world\nexport default function BlogPost({ params }) {\n  const { slug } = params;\n  return <div>Post: {slug}</div>;\n}\n\n// app/docs/[...slug]/page.js\nexport default function DocsPage({ params }) {\n  const { slug } = params;\n  return <div>Path: {slug.join(' / ')}</div>;\n}\n\n// Optional catch-all: app/shop/[[...filters]]/page.js\n// /shop → filters = undefined\n// /shop/electronics → filters = ['electronics']\nexport default function ShopPage({ params }) {\n  const filters = params.filters || [];\n  return <div>Filters: {filters.join(', ')}</div>;\n}\n\n// Link navigation\nimport Link from 'next/link';\n<Link href=\"/about\">About</Link>\n<Link href=\"/blog/first-post\">First Post</Link>\n<Link href={`/blog/${post.id}`}>{post.title}</Link>\n\n// Programmatic navigation (Pages Router)\nimport { useRouter } from 'next/router';\nconst router = useRouter();\nrouter.push('/about');\nrouter.push(`/blog/${id}`);\n\n// Programmatic navigation (App Router)\n'use client';\nimport { useRouter } from 'next/navigation';\nconst router = useRouter();\nrouter.push('/about');\n\n// Active link detection (Pages Router)\nimport { useRouter } from 'next/router';\nconst { pathname } = useRouter();\n<Link href=\"/about\" className={pathname === '/about' ? 'active' : ''}>About</Link>\n\n// Not found page\n// Pages Router: pages/404.js\n// App Router: app/not-found.js\n// Trigger: notFound() inside getStaticProps or server component",
  },
  {
    id: "concept-nextjs-middleware",
    type: "concept",
    topic: "Next.js",
    title: "Next.js Middleware",
    prompt: "What is middleware in Next.js and what can it do?",
    expected:
      "Middleware runs before requests complete, enabling authentication checks, redirects, rewrites, geolocation‑based routing, and adding headers. It runs on the Edge Runtime.",
    keywords: ["middleware", "Edge", "request", "response", "Next.js"],
    explanation:
      "Next.js Middleware is code that executes before a request is completed, running on the Edge Runtime (V8 isolates) for low latency. It can be used to modify the request/response, redirect, rewrite, or add headers.\n\n**Key capabilities:**\n- **Authentication:** Check cookies/tokens, redirect to login.\n- **Geolocation:** Serve different content based on country.\n- **A/B testing:** Rewrite to different page versions.\n- **Bot detection:** Block or redirect bots.\n- **Logging:** Record request details.\n- **Headers:** Add security headers (CSP, HSTS).\n\n**How to create middleware:**\n- Create `middleware.js` (or `.ts`) at the root of your project (same level as `pages/` or `app/`).\n- Export a `middleware` function that receives `request` and optionally `NextResponse`.\n- Use `NextResponse.next()`, `NextResponse.redirect()`, `NextResponse.rewrite()`, or `NextResponse.json()`.\n\n**Matcher:** Use `config.matcher` to specify which routes run middleware.\n\n**Limitations:**\n- Edge Runtime has limited Node.js APIs (no `fs`, `path`, etc.).\n- Cannot directly access database (use fetch or environment variables).\n- Not for heavy computation.\n\n**Interview tip:** Understand the difference between redirect and rewrite. Know that middleware runs before the route handler and can be used for both Pages Router and App Router. Be able to implement simple authentication middleware.",
    code: "// middleware.js (root directory)\nimport { NextResponse } from 'next/server';\n\nexport function middleware(request) {\n  // Example 1: Authentication check\n  const token = request.cookies.get('auth-token');\n  const isLoginPage = request.nextUrl.pathname.startsWith('/login');\n  \n  if (!token && !isLoginPage) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n  \n  // Example 2: Geolocation (Vercel only)\n  const country = request.geo?.country || 'US';\n  if (country === 'GB') {\n    const url = request.nextUrl.clone();\n    url.pathname = `/uk${url.pathname}`;\n    return NextResponse.rewrite(url);\n  }\n  \n  // Example 3: Add custom headers\n  const response = NextResponse.next();\n  response.headers.set('X-Custom-Header', 'value');\n  response.headers.set('X-Frame-Options', 'DENY');\n  \n  // Example 4: Bot blocking\n  const userAgent = request.headers.get('user-agent') || '';\n  if (userAgent.includes('bot') && !userAgent.includes('Googlebot')) {\n    return new NextResponse('Forbidden', { status: 403 });\n  }\n  \n  // Example 5: A/B testing\n  const cookie = request.cookies.get('ab-test');\n  const url = request.nextUrl.clone();\n  if (!cookie && url.pathname === '/') {\n    const variant = Math.random() < 0.5 ? 'a' : 'b';\n    url.pathname = `/ab-${variant}`;\n    const response = NextResponse.rewrite(url);\n    response.cookies.set('ab-test', variant);\n    return response;\n  }\n  \n  return response;\n}\n\n// Matcher configuration (optional)\nexport const config = {\n  matcher: [\n    // Apply to all routes except api, static, _next\n    '/((?!api|_next/static|favicon.ico).*)',\n  ],\n};\n\n// Or specific paths\nexport const config = {\n  matcher: ['/dashboard/:path*', '/profile/:path*'],\n};\n\n// Using environment variables in middleware\nexport function middleware(request) {\n  const apiKey = process.env.API_KEY;\n  // ...\n}\n\n// Edge Runtime – some APIs are not available\n// console.log(fs.readFileSync) // not available\n\n// Logging middleware example\nexport function middleware(request) {\n  console.log(`${request.method} ${request.nextUrl.pathname}`);\n  return NextResponse.next();\n}\n\n// Rate limiting (simplified, for production use Upstash)\nconst rateLimit = new Map();\nexport function middleware(request) {\n  const ip = request.ip ?? 'anonymous';\n  const now = Date.now();\n  const windowStart = now - 60 * 1000;\n  const requests = rateLimit.get(ip)?.filter(t => t > windowStart) || [];\n  if (requests.length >= 10) {\n    return new NextResponse('Too Many Requests', { status: 429 });\n  }\n  requests.push(now);\n  rateLimit.set(ip, requests);\n  return NextResponse.next();\n}",
  },
  {
    id: "concept-nextjs-image",
    type: "concept",
    topic: "Next.js",
    title: "next/image Optimization",
    prompt: "What does next/image do and why is it beneficial?",
    expected:
      "next/image is an optimized Image component that automatically lazy loads, resizes, and serves images in modern formats (WebP/AVIF) based on browser support, improving Core Web Vitals (LCP).",
    keywords: [
      "next/image",
      "image optimization",
      "lazy loading",
      "WebP",
      "LCP",
    ],
    explanation:
      "Next.js provides a built‑in `next/image` component that extends the HTML `<img>` element with automatic image optimisation. It is designed to improve performance and Core Web Vitals, especially Largest Contentful Paint (LCP).\n\n**Key features:**\n- **Lazy loading:** Images load only when they enter the viewport (using Intersection Observer).\n- **Responsive images:** Automatically generates multiple sizes and serves the appropriate size based on device.\n- **Modern formats:** Serves WebP or AVIF images if the browser supports them (reduces file size).\n- **Prevents layout shift:** Requires `width` and `height` attributes; the component reserves space.\n- **On‑demand resizing:** Images are resized and optimised at request time (via Next.js server or image CDN).\n- **Priority loading:** Use `priority` for LCP images (preloads the image).\n- **Placeholder:** Blur‑up or background colour while loading.\n\n**Configuration:**\n- `remotePatterns` in `next.config.js` to allow external domains.\n- `deviceSizes` and `imageSizes` to configure breakpoints.\n- `formats` to control image formats (WebP, AVIF).\n\n**When to use:**\n- Any image in your Next.js application, especially above‑the‑fold images.\n- User‑uploaded images (from CMS, cloud storage).\n- External images (configure remotePatterns).\n\n**Interview tip:** Understand that `next/image` replaces `<img>` for most use cases. Know how to configure remote images and the trade‑offs (e.g., custom loader for external CDNs). Be able to explain why specifying width/height prevents CLS.",
    code: '// Basic usage\nimport Image from \'next/image\';\nexport default function Page() {\n  return (\n    <Image\n      src="/hero.jpg"\n      alt="Hero image"\n      width={1200}\n      height={600}\n      priority // preload for LCP\n    />\n  );\n}\n\n// Remote image (requires config)\n<Image\n  src="https://cdn.example.com/image.jpg"\n  alt="Remote"\n  width={800}\n  height={400}\n/>\n\n// next.config.js for remote images\nmodule.exports = {\n  images: {\n    remotePatterns: [\n      {\n        protocol: \'https\',\n        hostname: \'cdn.example.com\',\n        port: \'\',\n        pathname: \'/images/**\',\n      },\n    ],\n  },\n};\n\n// Fill parent container (responsive)\n<div style={{ position: \'relative\', width: \'100%\', height: \'400px\' }}>\n  <Image src="/banner.jpg" alt="Banner" fill style={{ objectFit: \'cover\' }} />\n</div>\n\n// Custom sizes for art direction\n<Image\n  src="/product.jpg"\n  alt="Product"\n  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"\n  fill\n/>\n\n// Blur placeholder (blurDataURL)\n<Image\n  src="/hero.jpg"\n  alt="Hero"\n  width={1200}\n  height={600}\n  placeholder="blur"\n  blurDataURL="data:image/jpeg;base64,..."\n/>\n\n// Custom loader (for CDN like Cloudinary)\nconst customLoader = ({ src, width, quality }) => {\n  return `https://res.cloudinary.com/my-cloud/image/upload/w_${width},q_${quality || 75}/${src}`;\n};\n<Image loader={customLoader} src="profile.jpg" alt="Profile" width={200} height={200} />\n\n// Next.js Image component automatically adds:\n// - loading="lazy" (unless priority)\n// - srcset with multiple resolutions\n// - sizes attribute\n// - onload handler to remove placeholder\n\n// Performance monitoring: LCP improvement is measurable\n// Without next/image: LCP often > 2.5s\n// With next/image: LCP often < 1.5s\n\n// Unoptimized prop (disable optimization for local development)\n<Image src="/icon.png" width={64} height={64} alt="Icon" unoptimized />\n\n// Static import for images (optimised at build time)\nimport profilePic from \'../public/me.png\';\n<Image src={profilePic} alt="Profile" />',
  },
  {
    id: "concept-nextjs-api-routes",
    type: "concept",
    topic: "Next.js",
    title: "API Routes / Route Handlers",
    prompt: "How do you create API endpoints in Next.js?",
    expected:
      "In Pages Router, create files in pages/api/; each file exports a function that handles requests. In App Router, create route.js files inside app/ directory exporting named functions (GET, POST, etc.).",
    keywords: [
      "API routes",
      "route handlers",
      "Next.js",
      "backend",
      "endpoint",
    ],
    explanation:
      "Next.js allows building API endpoints directly within the same project, enabling full‑stack applications without a separate backend.\n\n**Pages Router (API Routes):**\n- Files in `pages/api/` map to `/api/*` endpoints.\n- Each file exports a default function `(req, res) => { ... }`.\n- Supports `req.method` to handle different HTTP methods.\n- Can use Node.js runtime (full Node.js APIs).\n\n**App Router (Route Handlers):**\n- Files named `route.js` inside `app/` directory.\n- Export named functions for HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.\n- Returns `Response` objects (Web Fetch API standard).\n- Can use Edge Runtime or Node.js runtime (configurable).\n\n**Common use cases:**\n- Form submission handling.\n- Webhooks (Stripe, GitHub).\n- Authentication callbacks (OAuth).\n- Proxying external APIs (with added security).\n- Serverless functions.\n\n**Limitations:**\n- API routes are not separate servers; they run as serverless functions (cold start possible).\n- Not suitable for long‑running processes (use background workers).\n- File size limits (e.g., Vercel has 50MB limit).\n\n**Interview tip:** Understand the difference between Pages Router and App Router API handling. Be able to parse JSON bodies, handle errors, and set appropriate status codes. Know that you can connect to a database from API routes.",
    code: "// Pages Router: pages/api/hello.js\nexport default function handler(req, res) {\n  const { method } = req;\n  if (method === 'GET') {\n    res.status(200).json({ message: 'Hello from API' });\n  } else if (method === 'POST') {\n    const { name } = req.body;\n    res.status(201).json({ message: `Hello ${name}` });\n  } else {\n    res.setHeader('Allow', ['GET', 'POST']);\n    res.status(405).end(`Method ${method} Not Allowed`);\n  }\n}\n\n// Parsing JSON in Pages Router\n// req.body needs body-parser middleware (Next.js includes it automatically)\n// For raw body, use req.body directly after enabling config\n\nexport const config = {\n  api: {\n    bodyParser: {\n      sizeLimit: '1mb',\n    },\n  },\n};\n\n// App Router: app/api/hello/route.js\nexport async function GET(request) {\n  return Response.json({ message: 'Hello from App Router' });\n}\n\nexport async function POST(request) {\n  const body = await request.json();\n  const { name } = body;\n  return Response.json({ message: `Hello ${name}` }, { status: 201 });\n}\n\n// Dynamic API routes (Pages Router)\n// pages/api/users/[id].js\nexport default function handler(req, res) {\n  const { id } = req.query;\n  res.status(200).json({ userId: id });\n}\n\n// Dynamic API routes (App Router)\n// app/api/users/[id]/route.js\nexport async function GET(request, { params }) {\n  const { id } = params;\n  return Response.json({ userId: id });\n}\n\n// Connecting to database (example with Prisma)\nimport { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\nexport default async function handler(req, res) {\n  if (req.method === 'GET') {\n    const users = await prisma.user.findMany();\n    res.status(200).json(users);\n  }\n}\n\n// Error handling\nexport default async function handler(req, res) {\n  try {\n    // logic\n  } catch (error) {\n    console.error(error);\n    res.status(500).json({ error: 'Internal Server Error' });\n  }\n}\n\n// Middleware for API routes (e.g., authentication)\nfunction withAuth(handler) {\n  return async (req, res) => {\n    const token = req.headers.authorization;\n    if (!token) {\n      return res.status(401).json({ error: 'Unauthorized' });\n    }\n    // verify token\n    return handler(req, res);\n  };\n}\nexport default withAuth((req, res) => {\n  res.status(200).json({ data: 'secret' });\n});\n\n// File upload (Pages Router)\nimport formidable from 'formidable';\nexport const config = { api: { bodyParser: false } };\nexport default async function handler(req, res) {\n  const form = new formidable.IncomingForm();\n  form.parse(req, (err, fields, files) => {\n    res.status(200).json({ fields, files });\n  });\n}",
  },
  {
    id: "concept-nextjs-caching",
    type: "concept",
    topic: "Next.js",
    title: "Next.js Caching",
    prompt: "How does caching work in Next.js?",
    expected:
      "Next.js has multiple caching layers: Data Cache (persists fetch results across deployments), Full Route Cache (static page output), Router Cache (client‑side navigation), and Request Memoization (dedupes fetch calls during render).",
    keywords: [
      "caching",
      "data cache",
      "router cache",
      "full route cache",
      "Next.js",
    ],
    explanation:
      "Next.js implements several caching strategies to improve performance and reduce server load. Understanding them is key to controlling data freshness.\n\n**Caching layers in App Router:**\n1. **Request Memoization (per‑render):** Deduplicates identical fetch requests within the same render pass. Cache lasts for the duration of the render.\n2. **Data Cache (persistent):** Stores fetch responses across deployments and user sessions. Controlled by `fetch` options (`force-cache`, `no-store`, `revalidate`).\n3. **Full Route Cache:** Stores the rendered HTML of static routes (SSG). Revalidated via `revalidate` or `force‑static`.\n4. **Router Cache (client‑side):** Stores prefetched pages in browser memory for instant back/forward navigation. Duration is session‑based.\n\n**Pages Router caching:**\n- `getStaticProps` with `revalidate` (ISR).\n- `getServerSideProps` (no cache).\n- Client‑side caching via `next/link` prefetch.\n\n**Important configuration:**\n- `export const dynamic = 'force-static'` – force static caching.\n- `export const dynamic = 'force-dynamic'` – disable full route cache (SSR).\n- `export const revalidate = 60` – ISR revalidation interval.\n\n**Interview tip:** Understand the difference between Data Cache (fetch results) and Full Route Cache (rendered HTML). Know that Router Cache is client‑side and can be disabled via `prefetch={false}`. Be able to debug stale data by adjusting `revalidate` or using `no-store`.",
    code: "// Data Cache – persist fetch results\nexport default async function Page() {\n  // Cached indefinitely (default)\n  const data1 = await fetch('https://api.example.com/data');\n  // Never cache (SSR)\n  const data2 = await fetch('https://api.example.com/live', { cache: 'no-store' });\n  // Revalidate every 60 seconds (ISR)\n  const data3 = await fetch('https://api.example.com/feed', { next: { revalidate: 60 } });\n  // ...\n}\n\n// Segment config – apply to all fetches in the file\nexport const dynamic = 'force-dynamic'; // disables Data Cache and Full Route Cache\nexport const revalidate = 60; // ISR for all fetches\n\n// Full Route Cache (static generation)\nexport default async function Page() {\n  const data = await fetch('https://api.example.com/static', { cache: 'force-cache' });\n  return <div>{data.title}</div>;\n}\n// This page is statically generated at build time and served from cache.\n\n// Router Cache (client‑side)\nimport Link from 'next/link';\n// Prefetch pages in background (default)\n<Link href=\"/dashboard\">Dashboard</Link>\n// Disable prefetch\n<Link href=\"/dashboard\" prefetch={false}>Dashboard</Link>\n\n// Revalidating Data Cache manually\n// Using `revalidateTag` or `revalidatePath` (Server Actions)\nimport { revalidateTag } from 'next/cache';\nexport async function updatePost(formData) {\n  'use server';\n  await db.updatePost(formData);\n  revalidateTag('posts'); // revalidate all fetch with tag 'posts'\n}\n\n// Tagging fetch requests\nconst data = await fetch('https://api.example.com/posts', { next: { tags: ['posts'] } });\n\n// Caching in Pages Router (ISR)\nexport async function getStaticProps() {\n  const data = await fetch('https://api.example.com/data');\n  return {\n    props: { data },\n    revalidate: 60, // ISR\n  };\n}\n\n// Debugging cache status\n// Add headers to see if response came from cache\n// In middleware or API route:\nresponse.headers.set('X-Cache', 'HIT');\n\n// Router Cache behaviour:\n// - When navigating via <Link>, the page is prefetched and stored.\n// - Full page reload clears the Router Cache.\n// - Programmatic navigation (router.push) also uses cache.\n\n// Opting out of Full Route Cache for dynamic content\nexport const dynamic = 'force-dynamic'; // page will be SSR, not cached\n\n// Cache busting with version query parameter\nconst data = await fetch(`https://api.example.com/data?v=${process.env.BUILD_ID}`);",
  },
  {
    id: "concept-nextjs-dynamic-routes",
    type: "concept",
    topic: "Next.js",
    title: "Dynamic Routes",
    prompt: "How do you create dynamic routes in Next.js?",
    expected:
      "Dynamic routes are created using brackets in file/folder names: [param] for single parameter, [...param] for catch‑all, and [[...param]] for optional catch‑all. Parameters are accessed via useRouter (Pages Router) or params prop (App Router).",
    keywords: [
      "dynamic routes",
      "catch-all",
      "optional catch-all",
      "useRouter",
      "params",
    ],
    explanation:
      "Dynamic routes in Next.js allow you to create pages that match URL patterns with variable segments. They are essential for blog posts, product pages, user profiles, and any content that is identified by a slug or ID.\n\n**Pages Router syntax:**\n- `pages/blog/[slug].js` → matches `/blog/post-1`, `/blog/hello-world`\n- `pages/docs/[...slug].js` → matches `/docs/a`, `/docs/a/b`, `/docs/a/b/c` (catch‑all)\n- `pages/docs/[[...slug]].js` → matches `/docs` (empty) and `/docs/a/b` (optional catch‑all)\n- Nested: `pages/blog/[year]/[month]/[slug].js`\n\n**App Router syntax:**\n- `app/blog/[slug]/page.js` → matches `/blog/post-1`\n- `app/docs/[...slug]/page.js` → catch‑all\n- `app/docs/[[...slug]]/page.js` → optional catch‑all\n- `app/blog/[year]/[month]/[slug]/page.js`\n\n**Accessing parameters:**\n- Pages Router: `const router = useRouter(); const { slug } = router.query;`\n- App Router (server component): `export default function Page({ params }) { const { slug } = params; }`\n- App Router (client component): `'use client'; import { useParams } from 'next/navigation'; const params = useParams();`\n\n**Static generation with dynamic routes:**\n- `getStaticPaths` (Pages Router) or `generateStaticParams` (App Router) to pre‑render known paths.\n- `fallback: false | true | 'blocking'` controls behaviour for paths not pre‑rendered.\n\n**Interview tip:** Understand the difference between required, catch‑all, and optional catch‑all routes. Be able to implement `getStaticPaths` with `fallback` options. Know that dynamic routes can be used with both SSR and SSG.",
    code: "// Pages Router: pages/blog/[slug].js\nimport { useRouter } from 'next/router';\nexport default function BlogPost() {\n  const router = useRouter();\n  const { slug } = router.query;\n  return <div>Post: {slug}</div>;\n}\n\n// getStaticPaths for SSG with dynamic routes\nexport async function getStaticPaths() {\n  const posts = await fetch('https://api.example.com/posts').then(res => res.json());\n  const paths = posts.map(post => ({ params: { slug: post.slug } }));\n  return { paths, fallback: 'blocking' };\n}\n\nexport async function getStaticProps({ params }) {\n  const post = await fetch(`https://api.example.com/posts/${params.slug}`).then(res => res.json());\n  return { props: { post }, revalidate: 60 };\n}\n\n// Catch‑all route: pages/docs/[...slug].js\nexport default function DocsPage({ params }) {\n  const { slug } = params; // slug is an array, e.g., ['api', 'auth']\n  return <div>Path: {slug.join(' / ')}</div>;\n}\n\nexport async function getStaticPaths() {\n  return {\n    paths: [{ params: { slug: ['getting-started'] } }, { params: { slug: ['api', 'reference'] } }],\n    fallback: true,\n  };\n}\n\n// App Router: app/blog/[slug]/page.js\nexport default async function BlogPost({ params }) {\n  const { slug } = params;\n  const post = await fetch(`https://api.example.com/posts/${slug}`).then(res => res.json());\n  return <div>{post.title}</div>;\n}\n\n// generateStaticParams (App Router SSG)\nexport async function generateStaticParams() {\n  const posts = await fetch('https://api.example.com/posts').then(res => res.json());\n  return posts.map(post => ({ slug: post.slug }));\n}\n\n// App Router catch‑all: app/docs/[...slug]/page.js\nexport default function DocsPage({ params }) {\n  const { slug } = params;\n  return <div>Slug: {slug.join('/')}</div>;\n}\n\nexport async function generateStaticParams() {\n  return [\n    { slug: ['getting-started'] },\n    { slug: ['api', 'reference'] },\n  ];\n}\n\n// Optional catch‑all: app/shop/[[...filters]]/page.js\nexport default function ShopPage({ params }) {\n  const filters = params.filters || [];\n  return <div>Filters: {filters.join(', ')}</div>;\n}\n\n// Client component accessing params (App Router)\n'use client';\nimport { useParams } from 'next/navigation';\nexport default function ClientBlogPost() {\n  const params = useParams();\n  const { slug } = params;\n  return <div>Slug: {slug}</div>;\n}\n\n// Linking to dynamic routes\nimport Link from 'next/link';\n<Link href=\"/blog/first-post\">First Post</Link>\n<Link href={`/blog/${post.slug}`}>{post.title}</Link>\n\n// Programmatic navigation (Pages Router)\nimport { useRouter } from 'next/router';\nconst router = useRouter();\nrouter.push(`/blog/${slug}`);\n\n// Fallback options explained\n// fallback: false – 404 for non‑pre‑rendered paths\n// fallback: true – serves a fallback page, generates page on the fly\n// fallback: 'blocking' – server‑side renders the page, then caches it",
  },
  {
    id: "concept-nextjs-deployment",
    type: "concept",
    topic: "Next.js",
    title: "Next.js Deployment and Optimization",
    prompt:
      "What are the key considerations for deploying a Next.js application?",
    expected:
      "Consider output target (standalone vs default), environment variables, image domains configuration, and choosing the right platform (Vercel, self‑hosted, or other providers). Optimisations include enabling compression, using middleware for edge functions, and implementing ISR.",
    keywords: [
      "deployment",
      "Vercel",
      "standalone",
      "environment variables",
      "optimization",
    ],
    explanation:
      "Deploying a Next.js application requires understanding the build output, environment configuration, and platform choices. Next.js can be deployed to various environments: Vercel (optimised), Netlify, AWS (Amplify, ECS, Lambda), or any Node.js hosting.\n\n**Key configuration in `next.config.js`:**\n- `output: 'standalone'` – reduces size for self‑hosting (copies only necessary files).\n- `images.remotePatterns` – required for external images.\n- `compression: true` – enables gzip/Brotli compression.\n- `swcMinify: true` – faster minification (default).\n- `trailingSlash: true/false` – URL behaviour.\n- `basePath` – serve app under a sub‑path.\n\n**Environment variables:**\n- `NEXT_PUBLIC_*` – exposed to the browser.\n- Server‑side variables – only available in Node.js environment (API routes, `getServerSideProps`).\n- `.env.local`, `.env.production` – loaded based on environment.\n\n**Deployment platforms:**\n- **Vercel:** Recommended; automatic optimisations, preview deployments, edge functions, image optimisation, analytics.\n- **Netlify:** Supports Next.js via plugin (limited features compared to Vercel).\n- **AWS Amplify:** Supports Next.js (some features require configuration).\n- **Self‑hosted (Node.js):** Use `next start` or `npm run start`; requires `output: 'standalone'` to reduce size.\n- **Docker:** Multi‑stage builds with standalone output.\n\n**Performance optimisations:**\n- Enable ISR for static pages that need freshness.\n- Use middleware for edge‑side logic (A/B testing, geolocation).\n- Configure caching headers for static assets.\n- Use `next/image` with remote patterns.\n- Analyse bundles with `@next/bundle-analyzer`.\n\n**Monitoring:**\n- Vercel Analytics, Datadog, Sentry for errors and performance.\n\n**Interview tip:** Understand the difference between `next build` and `next export`. Know that `next export` produces static HTML only (no server‑side features). For self‑hosting, `standalone` output is critical to reduce size. Also discuss how to handle environment variables securely.",
    code: "// next.config.js\n/** @type {import('next').NextConfig} */\nconst nextConfig = {\n  output: 'standalone', // reduces self‑hosted size\n  images: {\n    remotePatterns: [\n      {\n        protocol: 'https',\n        hostname: 'cdn.example.com',\n        port: '',\n        pathname: '/images/**',\n      },\n    ],\n  },\n  compress: true,\n  swcMinify: true,\n  trailingSlash: false,\n  basePath: '/app', // optional: serve under sub‑path\n  headers: async () => [\n    {\n      source: '/static/(.*)',\n      headers: [\n        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },\n      ],\n    },\n  ],\n};\nmodule.exports = nextConfig;\n\n// Environment variables\n// .env.local\nNEXT_PUBLIC_API_URL=https://api.example.com\nDATABASE_URL=postgresql://...\n\n// Using in code\nconst apiUrl = process.env.NEXT_PUBLIC_API_URL;\nconst dbUrl = process.env.DATABASE_URL; // server only\n\n// Dockerfile for self‑hosted Next.js\n# Stage 1: Build\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Stage 2: Production\nFROM node:18-alpine\nWORKDIR /app\nENV NODE_ENV=production\nCOPY --from=builder /app/.next/standalone ./\nCOPY --from=builder /app/.next/static ./.next/static\nCOPY --from=builder /app/public ./public\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]\n\n// Deploy to Vercel (CLI)\n// vercel --prod\n\n// Deploy to self‑hosted with PM2\n// npm run build\n// pm2 start npm --name \"next-app\" -- start\n\n// Bundle analysis\nnpm install @next/bundle-analyzer\n// next.config.js\nconst withBundleAnalyzer = require('@next/bundle-analyzer')({\n  enabled: process.env.ANALYZE === 'true',\n});\nmodule.exports = withBundleAnalyzer(nextConfig);\n\n// Edge runtime for API routes (App Router)\nexport const runtime = 'edge';\n\n// ISR configuration for static pages\nexport const revalidate = 60; // seconds\n\n// Using middleware for geolocation (Vercel)\n// middleware.js\nexport function middleware(request) {\n  const country = request.geo?.country || 'US';\n  const response = NextResponse.next();\n  response.cookies.set('country', country);\n  return response;\n}\n\n// Optimisation: disable prefetching for non‑critical links\n<Link href=\"/heavy\" prefetch={false}>Heavy Page</Link>\n\n// Check build size\n// npm run build will show page sizes\n// Use .env.production for production‑specific variables\n\n// Self‑hosting: ensure Node.js version matches Next.js requirement (>=18.17.0 for Next.js 14+)\n// Use process managers (PM2, systemd) for uptime",
  },
  {
    id: "concept-typescript-basics",
    type: "concept",
    topic: "TypeScript",
    title: "TypeScript Basics",
    prompt:
      "What are the key benefits of using TypeScript over plain JavaScript?",
    expected:
      "TypeScript adds static typing, early error detection, better IDE support, self‑documenting code, and advanced features like interfaces, generics, and enums, improving maintainability and reducing runtime bugs.",
    keywords: [
      "TypeScript",
      "static typing",
      "type inference",
      "interfaces",
      "generics",
    ],
    explanation:
      "TypeScript is a superset of JavaScript that adds optional static typing. It compiles to plain JavaScript, so it runs anywhere JavaScript runs.\n\n**Key benefits:**\n- **Static type checking:** Catches errors at compile time (e.g., passing string to number parameter).\n- **Better IDE support:** Autocompletion, refactoring, navigation, and inline documentation.\n- **Self‑documenting code:** Types serve as documentation for function contracts.\n- **Advanced type features:** Interfaces, unions, intersections, generics, mapped types, conditional types.\n- **Non‑null safety:** Strict null checks prevent `undefined is not a function` errors.\n- **Code maintainability:** Refactoring is safer and easier.\n- **Modern JavaScript features:** Use future ES features now (compiled down to target version).\n\n**Basic types:**\n- `string`, `number`, `boolean`, `null`, `undefined`, `void`, `never`, `unknown`, `any`.\n- Arrays: `number[]` or `Array<number>`.\n- Tuples: `[string, number]`.\n- Objects: `{ name: string; age: number }`.\n- Unions: `string | number`.\n- Type aliases: `type UserId = string | number`.\n- Interfaces: `interface User { name: string; age?: number }`.\n\n**When to use TypeScript:**\n- Large applications with multiple developers.\n- Libraries and frameworks that need stable APIs.\n- Projects that will be maintained long‑term.\n- Teams that value safety and tooling.\n\n**Trade‑offs:**\n- Adds build step.\n- Learning curve.\n- Can be overly verbose (but inference reduces this).\n\n**Interview tip:** Be able to explain the difference between `interface` and `type`. Understand type inference and when to use explicit annotations. Discuss the `any` type (avoid it) and `unknown` (prefer it). Also know about `strict` mode flags.",
    code: "// Basic types\nlet name: string = 'Alice';\nlet age: number = 30;\nlet isActive: boolean = true;\nlet nullable: string | null = null;\nlet anything: any = 42; // avoid if possible\nlet unknownValue: unknown = 'maybe string';\n\n// Functions with types\nfunction greet(person: string, times: number): string {\n  return `${person} says hello ${times} times`;\n}\n\n// Arrow function with type inference\nconst add = (a: number, b: number) => a + b;\n\n// Interface\ninterface User {\n  id: number;\n  name: string;\n  email?: string; // optional\n  readonly createdAt: Date;\n}\n\nconst user: User = {\n  id: 1,\n  name: 'Alice',\n  createdAt: new Date(),\n};\n\n// Type alias\ntype ID = string | number;\ntype UserRole = 'admin' | 'user' | 'guest';\n\nconst role: UserRole = 'admin';\n\n// Array and tuple\nlet numbers: number[] = [1, 2, 3];\nlet tuple: [string, number] = ['age', 30];\n\n// Generics\nfunction identity<T>(value: T): T {\n  return value;\n}\nconst num = identity<number>(5);\n\n// Generic interface\ninterface ApiResponse<T> {\n  data: T;\n  status: number;\n  error?: string;\n}\nconst userResponse: ApiResponse<User> = {\n  data: { id: 1, name: 'Alice', createdAt: new Date() },\n  status: 200,\n};\n\n// Union and intersection\ntype A = { a: number };\ntype B = { b: string };\ntype C = A | B; // union – either a or b\ntype D = A & B; // intersection – both a and b\n\n// Type assertion (when you know better than compiler)\nconst input = document.getElementById('input') as HTMLInputElement;\n\n// Strict null checks\nfunction getLength(str: string | null): number {\n  // return str.length; // error: Object is possibly 'null'\n  return str?.length ?? 0; // optional chaining\n}\n\n// Utility types\ninterface Todo {\n  title: string;\n  description: string;\n  completed: boolean;\n}\ntype PartialTodo = Partial<Todo>; // all optional\ntype RequiredTodo = Required<Todo>; // all required\ntype PickTodo = Pick<Todo, 'title' | 'completed'>;\ntype OmitTodo = Omit<Todo, 'description'>;\n\n// Using tsconfig.json\n// {\n//   \"compilerOptions\": {\n//     \"strict\": true,\n//     \"target\": \"ES2020\",\n//     \"module\": \"commonjs\",\n//     \"esModuleInterop\": true,\n//     \"skipLibCheck\": true\n//   }\n// }\n\n// Discriminated unions\ninterface Circle {\n  kind: 'circle';\n  radius: number;\n}\ninterface Square {\n  kind: 'square';\n  sideLength: number;\n}\ntype Shape = Circle | Square;\nfunction getArea(shape: Shape): number {\n  switch (shape.kind) {\n    case 'circle': return Math.PI * shape.radius ** 2;\n    case 'square': return shape.sideLength ** 2;\n  }\n}",
  },
  {
    id: "concept-redux-toolkit",
    type: "concept",
    topic: "State Management",
    title: "Redux Toolkit",
    prompt: "What is Redux Toolkit and why is it recommended over plain Redux?",
    expected:
      "Redux Toolkit is the official, opinionated toolset for Redux that simplifies configuration, reduces boilerplate, and includes utilities like createSlice, createAsyncThunk, and configureStore.",
    keywords: [
      "Redux Toolkit",
      "createSlice",
      "configureStore",
      "createAsyncThunk",
      "RTK Query",
    ],
    explanation:
      "Redux Toolkit (RTK) is the official, recommended way to write Redux logic. It addresses common complaints about Redux: complex store setup, excessive boilerplate, and the need for additional packages (Immer, Thunk).\n\n**Key features:**\n- `configureStore()` – sets up store with good defaults (middleware, devtools).\n- `createSlice()` – generates actions and reducers together, with built‑in Immer for immutable updates.\n- `createAsyncThunk()` – handles asynchronous action creation.\n- `createEntityAdapter()` – provides reducers and selectors for CRUD operations.\n- `createSelector()` – memoised selectors (from Reselect).\n- RTK Query – data fetching and caching (optional).\n\n**Why RTK over plain Redux:**\n- **Less boilerplate:** No more action constants, action creators, and switch reducers.\n- **Immer integrated:** Write mutable‑looking code that produces immutable updates.\n- **Good defaults:** DevTools, Thunk, and serialisable checks enabled by default.\n- **TypeScript first:** Excellent type inference.\n- **One dependency:** Everything you need out of the box.\n\n**Interview tip:** Be able to create a slice, use `useSelector` and `useDispatch`, and explain how `createAsyncThunk` works. Understand that RTK does not replace Redux; it is Redux with utilities. Also know RTK Query for advanced data fetching.",
    code: "// store.js (Redux Toolkit)\nimport { configureStore, createSlice } from '@reduxjs/toolkit';\n\n// Creating a slice\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => { state.value += 1; },\n    decrement: (state) => { state.value -= 1; },\n    incrementByAmount: (state, action) => { state.value += action.payload; },\n  },\n});\n\n// Export actions\nexport const { increment, decrement, incrementByAmount } = counterSlice.actions;\n\n// Configure store\nconst store = configureStore({\n  reducer: {\n    counter: counterSlice.reducer,\n  },\n});\n\nexport default store;\n\n// React component using Redux Toolkit\nimport { useSelector, useDispatch } from 'react-redux';\nfunction Counter() {\n  const count = useSelector((state) => state.counter.value);\n  const dispatch = useDispatch();\n  return (\n    <div>\n      <button onClick={() => dispatch(decrement())}>-</button>\n      <span>{count}</span>\n      <button onClick={() => dispatch(increment())}>+</button>\n      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>\n    </div>\n  );\n}\n\n// Async thunk\nimport { createAsyncThunk } from '@reduxjs/toolkit';\nexport const fetchUser = createAsyncThunk('user/fetch', async (userId) => {\n  const response = await fetch(`/api/users/${userId}`);\n  return response.json();\n});\n\nconst userSlice = createSlice({\n  name: 'user',\n  initialState: { data: null, status: 'idle', error: null },\n  reducers: {},\n  extraReducers: (builder) => {\n    builder\n      .addCase(fetchUser.pending, (state) => { state.status = 'loading'; })\n      .addCase(fetchUser.fulfilled, (state, action) => {\n        state.status = 'succeeded';\n        state.data = action.payload;\n      })\n      .addCase(fetchUser.rejected, (state, action) => {\n        state.status = 'failed';\n        state.error = action.error.message;\n      });\n  },\n});\n\n// Entity adapter for CRUD\nimport { createEntityAdapter } from '@reduxjs/toolkit';\nconst todosAdapter = createEntityAdapter();\nconst todosSlice = createSlice({\n  name: 'todos',\n  initialState: todosAdapter.getInitialState(),\n  reducers: {\n    addTodo: todosAdapter.addOne,\n    removeTodo: todosAdapter.removeOne,\n    updateTodo: todosAdapter.updateOne,\n  },\n});\n// Selectors: todosAdapter.getSelectors(state => state.todos)\n\n// Memoised selectors with createSelector\nimport { createSelector } from '@reduxjs/toolkit';\nconst selectTodos = state => state.todos;\nconst selectCompletedTodos = createSelector([selectTodos], (todos) =>\n  todos.filter(todo => todo.completed)\n);\n\n// RTK Query (simplified)\nimport { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';\nexport const api = createApi({\n  reducerPath: 'api',\n  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),\n  endpoints: (builder) => ({\n    getPosts: builder.query({ query: () => 'posts' }),\n  }),\n});\nexport const { useGetPostsQuery } = api;\n\n// In component\nconst { data, error, isLoading } = useGetPostsQuery();",
  },
  {
    id: "concept-graphql",
    type: "concept",
    topic: "API",
    title: "GraphQL",
    prompt: "What is GraphQL and how does it differ from REST?",
    expected:
      "GraphQL is a query language for APIs that allows clients to request exactly the data they need in a single request, with a strongly typed schema. Unlike REST, which has multiple endpoints and fixed structures, GraphQL provides flexibility and reduces over‑fetching.",
    keywords: ["GraphQL", "REST", "query", "schema", "resolver"],
    explanation:
      "GraphQL is an open‑source data query and manipulation language for APIs, developed by Facebook. It allows clients to define the structure of the response, requesting only the fields they need.\n\n**Core concepts:**\n- **Schema:** Defines types, queries, mutations, and subscriptions (strongly typed).\n- **Query:** Read operation (like GET).\n- **Mutation:** Write operation (POST, PUT, DELETE).\n- **Subscription:** Real‑time events via WebSockets.\n- **Resolver:** Function that fetches data for a field.\n\n**Key differences from REST:**\n| Aspect | REST | GraphQL |\n|--------|------|---------|\n| Endpoints | Multiple (resource‑based) | Single endpoint |\n| Over‑fetching | Common (fixed responses) | None (client requests exactly needed fields) |\n| Under‑fetching | Requires multiple requests | One request can fetch nested resources |\n| Versioning | URL or header versioning | Evolve schema; deprecated fields |\n| Tooling | Swagger/OpenAPI | GraphiQL, Apollo Studio |\n| Caching | HTTP caching | Requires client‑side caching (Apollo) |\n| File uploads | Native | Needs extra setup |\n\n**When to use GraphQL:**\n- Complex data relationships (mobile apps, dashboards).\n- Multiple clients (web, mobile, IoT) with different data needs.\n- Rapidly evolving APIs.\n- Real‑time data (subscriptions).\n\n**When to use REST:**\n- Simple CRUD applications.\n- Strong HTTP caching requirements.\n- File uploads/downloads.\n- Projects where simplicity is paramount.\n\n**Interview tip:** Understand the problem of over‑fetching and under‑fetching. Be able to write a basic GraphQL query and mutation. Know about resolvers, and the role of a GraphQL server (e.g., Apollo Server, GraphQL Yoga).",
    code: '// GraphQL schema (SDL)\ntype User {\n  id: ID!\n  name: String!\n  email: String!\n  posts: [Post!]!\n}\n\ntype Post {\n  id: ID!\n  title: String!\n  content: String!\n  author: User!\n}\n\ntype Query {\n  user(id: ID!): User\n  posts(limit: Int): [Post!]!\n}\n\ntype Mutation {\n  createPost(title: String!, content: String!): Post!\n  updatePost(id: ID!, title: String): Post!\n  deletePost(id: ID!): Boolean!\n}\n\n// Example query\nquery {\n  user(id: "1") {\n    name\n    posts {\n      title\n    }\n  }\n}\n\n// Example response\n{\n  "data": {\n    "user": {\n      "name": "Alice",\n      "posts": [\n        { "title": "Hello GraphQL" }\n      ]\n    }\n  }\n}\n\n// Mutation example\nmutation {\n  createPost(title: "New Post", content: "Content") {\n    id\n    title\n  }\n}\n\n// Resolver example (Apollo Server)\nconst resolvers = {\n  Query: {\n    user: (_, { id }, { dataSources }) => {\n      return dataSources.db.getUserById(id);\n    },\n  },\n  User: {\n    posts: (parent, _, { dataSources }) => {\n      return dataSources.db.getPostsByUserId(parent.id);\n    },\n  },\n  Mutation: {\n    createPost: (_, { title, content }, { dataSources, user }) => {\n      if (!user) throw new Error(\'Unauthorized\');\n      return dataSources.db.createPost({ title, content, authorId: user.id });\n    },\n  },\n};\n\n// Client‑side query with Apollo Client\nimport { gql, useQuery } from \'@apollo/client\';\nconst GET_USER = gql`\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      name\n      email\n    }\n  }\n`;\nfunction UserProfile({ userId }) {\n  const { loading, error, data } = useQuery(GET_USER, { variables: { id: userId } });\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n  return <div>{data.user.name}</div>;\n}\n\n// Using fragments\nconst userFields = gql`\n  fragment UserFields on User {\n    id\n    name\n    email\n  }\n`;\nconst GET_USERS = gql`\n  ${userFields}\n  query GetUsers {\n    users {\n      ...UserFields\n    }\n  }\n`;\n\n// Subscriptions (WebSocket)\nconst COMMENT_ADDED = gql`\n  subscription OnCommentAdded($postId: ID!) {\n    commentAdded(postId: $postId) {\n      id\n      text\n    }\n  }\n`;\n\n// Using variables in queries\nconst query = `\n  query GetPost($id: ID!, $includeComments: Boolean!) {\n    post(id: $id) {\n      title\n      content\n      comments @include(if: $includeComments) {\n        text\n      }\n    }\n  }\n`;\n\n// Directives: @include, @skip, @deprecated\n// Schema directives for documentation',
  },
  {
    id: "concept-web-vitals",
    type: "concept",
    topic: "Performance",
    title: "Core Web Vitals",
    prompt: "What are Core Web Vitals and why are they important?",
    expected:
      "Core Web Vitals are user‑centric metrics that measure loading (LCP), interactivity (FID/INP), and visual stability (CLS). They are used by Google as ranking signals and are critical for user experience.",
    keywords: [
      "LCP",
      "FID",
      "CLS",
      "INP",
      "Core Web Vitals",
      "performance",
      "SEO",
    ],
    explanation:
      "Core Web Vitals are a set of real‑world, user‑centric metrics that quantify key aspects of the user experience on the web. They are part of Google's Page Experience signals and influence search rankings.\n\n**The three Core Web Vitals:**\n1. **Largest Contentful Paint (LCP):** Measures loading performance. Marks the time when the largest visible element (image, video, block‑level text) is rendered. Good: ≤ 2.5 seconds.\n2. **First Input Delay (FID) / Interaction to Next Paint (INP):** Measures interactivity. FID measures the delay from the first user interaction to the browser's ability to respond. INP (newer) measures overall responsiveness across all interactions. Good: ≤ 100 ms.\n3. **Cumulative Layout Shift (CLS):** Measures visual stability. Quantifies unexpected layout shifts. Good: ≤ 0.1.\n\n**Why they matter:**\n- **SEO ranking:** Google uses Core Web Vitals as ranking signals.\n- **User experience:** Poor vitals correlate with higher bounce rates and lower conversions.\n- **Business metrics:** Faster, stable pages lead to higher engagement.\n\n**How to measure:**\n- **Field tools:** Chrome User Experience Report (CrUX), PageSpeed Insights, Search Console.\n- **Lab tools:** Lighthouse, WebPageTest, Chrome DevTools.\n- **Real‑user monitoring (RUM):** `web-vitals` JavaScript library.\n\n**Common optimisations:**\n- LCP: Optimise images (lazy loading, modern formats), improve server response time, preload critical resources.\n- FID/INP: Break up long tasks, defer non‑critical JavaScript, use web workers.\n- CLS: Set explicit width/height on images and videos, reserve space for ads/dynamic content, use `aspect-ratio` CSS.\n\n**Interview tip:** Be able to explain each metric, how to measure it, and common optimisations. Understand the difference between lab and field data. Know that INP will eventually replace FID as the official Core Web Vital for responsiveness.",
    code: '// Measuring Core Web Vitals with the web-vitals library\nimport { onLCP, onFID, onCLS, onINP } from \'web-vitals\';\n\nfunction sendToAnalytics(metric) {\n  console.log(metric.name, metric.value, metric.rating);\n  // Send to Google Analytics, custom endpoint, etc.\n  navigator.sendBeacon(\'/api/metrics\', JSON.stringify(metric));\n}\n\nonLCP(sendToAnalytics);\nonFID(sendToAnalytics);\nonCLS(sendToAnalytics);\nonINP(sendToAnalytics); // when available\n\n// Lighthouse CLI (lab measurement)\n// npx lighthouse https://example.com --view --preset=desktop\n\n// Optimising LCP: preload critical hero image\n<link rel="preload" as="image" href="hero.jpg" fetchpriority="high">\n<img src="hero.jpg" alt="Hero" width="1200" height="600" />\n\n// Optimising CLS: reserve space with aspect-ratio\n<style>\n  .image-container {\n    aspect-ratio: 16 / 9;\n    background: #f0f0f0;\n  }\n  img {\n    width: 100%;\n    height: auto;\n    display: block;\n  }\n</style>\n\n// Using fetchpriority for important images\n<img src="hero.jpg" fetchpriority="high" />\n\n// Defer non‑critical JavaScript to improve FID\n<script defer src="non-critical.js"></script>\n\n// In Next.js, use next/image for automatic optimisation\nimport Image from \'next/image\';\n<Image src="/hero.jpg" width={1200} height={600} priority />\n\n// Checking Core Web Vitals in Search Console\n// Google Search Console > Enhancements > Core Web Vitals\n\n// Chrome DevTools: Performance panel with Web Vitals overlay\n// Enable: More tools > Rendering > Core Web Vitals',
  },
  {
    id: "concept-accessibility",
    type: "concept",
    topic: "Accessibility",
    title: "Web Accessibility (a11y)",
    prompt:
      "What are key principles of web accessibility and how do you implement them?",
    expected:
      "Accessibility ensures websites work for all users, including those with disabilities. Key principles (POUR): Perceivable, Operable, Understandable, Robust. Implement with semantic HTML, ARIA labels, keyboard navigation, sufficient colour contrast, and testing with screen readers.",
    keywords: [
      "accessibility",
      "a11y",
      "ARIA",
      "WCAG",
      "screen reader",
      "keyboard navigation",
    ],
    explanation:
      "Web accessibility (a11y) means designing and developing websites that can be used by people with various disabilities: visual, auditory, motor, cognitive, and neurological. It is a legal requirement in many countries and improves usability for everyone.\n\n**WCAG 2.1 Principles (POUR):**\n1. **Perceivable:** Information must be presentable to users in ways they can perceive.\n   - Provide text alternatives for non‑text content (alt text).\n   - Provide captions for video.\n   - Ensure sufficient colour contrast (minimum 4.5:1 for normal text).\n   - Don't rely only on colour to convey information.\n\n2. **Operable:** Interface components must be operable.\n   - All functionality must be available via keyboard.\n   - Provide skip navigation links.\n   - Give users enough time to read content.\n   - Avoid flashing content that could cause seizures.\n\n3. **Understandable:** Information and operation must be understandable.\n   - Use clear, predictable navigation.\n   - Provide instructions for forms.\n   - Error messages should be descriptive.\n\n4. **Robust:** Content must be robust enough to be interpreted by a wide range of user agents, including assistive technologies.\n   - Use valid, semantic HTML.\n   - Ensure ARIA attributes are used correctly.\n\n**Implementation checklist:**\n- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<h1>`–`<h6>`).\n- Add `alt` attributes to images.\n- Ensure all interactive elements are focusable and have visible focus indicators.\n- Use `aria-label` or `aria-labelledby` when needed.\n- Test with keyboard (Tab, Enter, Space).\n- Test with screen readers (NVDA, VoiceOver).\n- Use colour contrast checkers (WebAIM, axe).\n- Provide captions and transcripts for media.\n\n**Tools:**\n- Lighthouse (automated accessibility audits).\n- axe DevTools.\n- WAVE.\n- Screen readers (VoiceOver, NVDA, JAWS).\n\n**Interview tip:** Understand the difference between `aria-label`, `aria-labelledby`, and `aria-describedby`. Know that native HTML elements have built‑in accessibility; prefer them over divs. Be able to explain how to make a custom dropdown accessible (role, aria-expanded, keyboard handling).",
    code: '// Semantic HTML (good)\n<button onClick={handleClick}>Submit</button>\n<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n  </ul>\n</nav>\n\n// Non‑semantic (bad)\n<div onClick={handleClick} role="button" tabIndex="0">Submit</div>\n\n// Image alt text\n<img src="profile.jpg" alt="User profile picture" />\n// Decorative image (screen readers ignore)\n<img src="divider.png" alt="" role="presentation" />\n\n// Form labelling\n<label htmlFor="email">Email address</label>\n<input id="email" type="email" aria-required="true" />\n\n// Using aria-label for icon buttons\n<button aria-label="Close menu">\n  <svg>...</svg>\n</button>\n\n// Skip navigation link (for keyboard users)\n<a href="#main" class="skip-link">Skip to main content</a>\n// CSS: .skip-link { position: absolute; left: -9999px; }\n// .skip-link:focus { position: static; }\n\n// ARIA live regions (for dynamic content)\n<div aria-live="polite" aria-atomic="true">\n  {statusMessage}\n</div>\n\n// Custom dropdown accessibility\n<div className="dropdown">\n  <button\n    aria-haspopup="listbox"\n    aria-expanded={isOpen}\n    onClick={() => setIsOpen(!isOpen)}\n  >\n    Select an option\n  </button>\n  {isOpen && (\n    <ul role="listbox" onKeyDown={handleKeyDown}>\n      <li role="option" tabIndex={-1}>Option 1</li>\n    </ul>\n  )}\n</div>\n\n// Focus management (modal)\nuseEffect(() => {\n  const previousFocus = document.activeElement;\n  modalRef.current?.focus();\n  return () => previousFocus?.focus();\n}, []);\n\n// Colour contrast check (CSS example)\n// Good: background #fff, text #333 (contrast ~12:1)\n// Bad: background #ddd, text #aaa (contrast ~1.5:1)\n\n// Testing with VoiceOver (Mac): Cmd+F5\n// Testing with NVDA (Windows): Insert+NumPad0\n// Testing keyboard: Tab, Shift+Tab, Enter, Space, Arrow keys\n\n// React: Ensure focus is visible (don\'t use outline: none without replacement)\nbutton:focus {\n  outline: 2px solid blue;\n  outline-offset: 2px;\n}\n\n// Using React Aria (library) for complex components\nimport { useButton } from \'@react-aria/button\';\n\n// Accessibility linting in React (eslint-plugin-jsx-a11y)\n// npm install eslint-plugin-jsx-a11y',
  },
  {
    id: "concept-testing-jest-rtl",
    type: "concept",
    topic: "Testing",
    title: "Jest & React Testing Library",
    prompt:
      "What is the purpose of Jest and React Testing Library, and how do they complement each other?",
    expected:
      "Jest is a test runner, assertion library, and mocking tool. React Testing Library provides utilities to test React components from a user's perspective, querying by text, role, or label. Together they enable robust, maintainable tests that resemble how the application is used.",
    keywords: [
      "Jest",
      "React Testing Library",
      "unit test",
      "integration test",
      "user event",
      "mock",
    ],
    explanation:
      "Jest and React Testing Library (RTL) are the standard testing tools for React applications. They complement each other: Jest provides the test framework, and RTL provides React‑specific rendering and querying utilities.\n\n**Jest:**\n- Test runner (discovers and runs tests).\n- Assertion library (`expect`).\n- Mocking (`jest.fn()`, `jest.mock()`).\n- Snapshot testing.\n- Code coverage.\n\n**React Testing Library:**\n- Renders components into a virtual DOM (jsdom).\n- Provides query methods to find elements (by text, role, label, placeholder, test ID).\n- Encourages testing behaviour, not implementation details.\n- `userEvent` for realistic user interactions (click, type, tab).\n- `waitFor` for async updates.\n\n**Why they work well together:**\n- RTL's queries work with Jest's assertions (`expect(screen.getByText(...)).toBeInTheDocument()`).\n- Jest handles async tests (promises, `async/await`).\n- RTL's `cleanup` runs automatically after each test.\n\n**Testing philosophy:**\n- Test how users interact with your app, not implementation details.\n- Prefer queries that reflect real user experience: `getByRole`, `getByLabelText`, `getByText`, `getByPlaceholderText`.\n- Avoid testing internal state or props directly.\n- Use `data-testid` only as a last resort.\n\n**Interview tip:** Be able to write a simple test for a React component (render, fire event, assert). Understand the difference between `getBy`, `queryBy`, and `findBy`. Know how to mock API calls and test asynchronous behaviour. Also discuss the `userEvent` library (simulates keyboard/mouse events more realistically than `fireEvent`).",
    code: "// Component to test\nfunction Greeting({ name }) {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>\n    </div>\n  );\n}\n\n// Test with Jest + React Testing Library\nimport { render, screen, fireEvent, waitFor } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport Greeting from './Greeting';\n\ntest('renders greeting with name', () => {\n  render(<Greeting name=\"Alice\" />);\n  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();\n});\n\ntest('button increments count when clicked', async () => {\n  const user = userEvent.setup();\n  render(<Greeting name=\"Bob\" />);\n  const button = screen.getByRole('button', { name: /count: 0/i });\n  await user.click(button);\n  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();\n});\n\n// Query methods\n// getBy* – throws error if not found (use when element must exist)\n// queryBy* – returns null if not found (use for absence check)\n// findBy* – returns promise, waits for appearance (async)\n\ntest('query vs get', () => {\n  render(<Greeting name=\"Alice\" />);\n  expect(screen.queryByText('Not present')).toBeNull();\n  // screen.getByText('Not present'); // would throw\n});\n\n// Mocking API calls\njest.mock('axios');\nimport axios from 'axios';\nconst mockData = { name: 'Alice' };\naxios.get.mockResolvedValue({ data: mockData });\n\ntest('fetches data on mount', async () => {\n  render(<UserProfile userId={1} />);\n  await waitFor(() => {\n    expect(screen.getByText('Alice')).toBeInTheDocument();\n  });\n});\n\n// Mocking fetch (using jest.spyOn)\nglobal.fetch = jest.fn(() =>\n  Promise.resolve({ json: () => Promise.resolve({ name: 'Alice' }) })\n);\n\n// Snapshot testing (use sparingly)\ntest('matches snapshot', () => {\n  const { container } = render(<Greeting name=\"Alice\" />);\n  expect(container).toMatchSnapshot();\n});\n\n// Testing custom hooks (with @testing-library/react-hooks)\nimport { renderHook, act } from '@testing-library/react-hooks';\nimport useCounter from './useCounter';\ntest('increments counter', () => {\n  const { result } = renderHook(() => useCounter(0));\n  act(() => result.current.increment());\n  expect(result.current.count).toBe(1);\n});\n\n// Testing async components with findBy\nimport { screen } from '@testing-library/react';\nrender(<AsyncComponent />);\nconst element = await screen.findByText('Loaded content');\nexpect(element).toBeInTheDocument();\n\n// Running tests: npm test -- --coverage",
  },
  {
    id: "concept-security-xss-csrf",
    type: "concept",
    topic: "Security",
    title: "XSS and CSRF",
    prompt: "What are XSS and CSRF attacks, and how do you prevent them?",
    expected:
      "XSS (Cross‑Site Scripting) injects malicious scripts into trusted websites. Prevent by sanitising input, using CSP, and escaping output. CSRF (Cross‑Site Request Forgery) tricks users into executing unwanted actions. Prevent with anti‑CSRF tokens, SameSite cookies, and referer validation.",
    keywords: ["XSS", "CSRF", "security", "CSP", "SameSite", "token"],
    explanation:
      "XSS and CSRF are two of the most common web security vulnerabilities. Understanding them is critical for building secure applications.\n\n**Cross‑Site Scripting (XSS):**\n- **What it is:** An attacker injects malicious JavaScript into a trusted website, which then executes in victims' browsers.\n- **Types:**\n  - **Stored XSS:** Malicious script is stored on the server (e.g., in a comment).\n  - **Reflected XSS:** Script is reflected off a server (e.g., in a search query).\n  - **DOM‑based XSS:** Script runs due to client‑side manipulation (e.g., `location.hash`).\n- **Impact:** Steal cookies, session tokens, keylogging, defacement, phishing.\n- **Prevention:**\n  - **Output encoding:** Escape user input when rendering (React does this by default).\n  - **Input sanitisation:** Use libraries like DOMPurify for rich text.\n  - **Content Security Policy (CSP):** Restrict which scripts can execute.\n  - **HttpOnly cookies:** Prevent access to session cookies via JavaScript.\n\n**Cross‑Site Request Forgery (CSRF):**\n- **What it is:** An attacker tricks a logged‑in user into making an unintended request to a trusted site (e.g., transferring money).\n- **How it works:** The attacker embeds a malicious request (image, form, fetch) that uses the victim's existing cookies.\n- **Impact:** Unauthorised actions (change email, password, transfer funds).\n- **Prevention:**\n  - **Anti‑CSRF tokens:** Include a unique, unpredictable token in forms; server validates it.\n  - **SameSite cookies:** Set `SameSite=Strict` or `Lax` to prevent cross‑origin requests.\n  - **Custom headers:** Require `X-Requested-By` or similar.\n  - **Referer/Origin validation:** Check that the request comes from your domain.\n\n**Interview tip:** Be able to explain the difference between XSS and CSRF (XSS targets the user, CSRF targets the server). Understand that modern frameworks (React, Angular) escape output by default, preventing many XSS attacks. Know that GET requests should be idempotent and not change state to reduce CSRF risk. Also discuss the `__Host-` prefix for cookies.",
    code: "// XSS vulnerable code (do NOT do this)\nconst userInput = '<img src=x onerror=alert(\"XSS\")>';\nelement.innerHTML = userInput; // dangerous\n\n// Safe alternative\nelement.textContent = userInput; // escapes HTML\n\n// React escapes by default\n<div>{userInput}</div> // safe\n\n// But dangerouslySetInnerHTML bypasses escaping (use with caution)\n<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />\n\n// Sanitising HTML with DOMPurify\nimport DOMPurify from 'dompurify';\nconst safeHtml = DOMPurify.sanitize(userInput);\n\n// CSP header (Content Security Policy)\n// In server response headers\nContent-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-cdn.com; object-src 'none';\n\n// HttpOnly cookie (set by server)\nSet-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict\n\n// CSRF token in form (server generates token, stores in session, sends to client)\n<form method=\"POST\" action=\"/transfer\">\n  <input type=\"hidden\" name=\"csrf_token\" value=\"{{ token }}\" />\n  <input name=\"amount\" />\n  <button type=\"submit\">Transfer</button>\n</form>\n\n// Server validation (Node.js/Express)\nconst csrf = require('csurf');\nconst csrfProtection = csrf({ cookie: true });\napp.post('/transfer', csrfProtection, (req, res) => {\n  // token automatically validated\n});\n\n// SameSite cookie attributes\n// SameSite=Strict – never sent cross‑origin (best for CSRF)\n// SameSite=Lax – sent for top‑level navigation (e.g., clicking link)\n// SameSite=None – sent cross‑origin (requires Secure)\nres.cookie('session', token, { httpOnly: true, secure: true, sameSite: 'strict' });\n\n// Custom header for API requests (e.g., X-Requested-With)\nfetch('/api/transfer', {\n  method: 'POST',\n  headers: { 'X-Requested-With': 'XMLHttpRequest' },\n  body: formData\n});\n\n// Server checks for custom header\nif (req.headers['x-requested-with'] !== 'XMLHttpRequest') {\n  return res.status(403).send('Invalid request');\n}\n\n// Referer validation\nconst allowedOrigin = 'https://myapp.com';\nconst referer = req.headers.referer;\nif (!referer || !referer.startsWith(allowedOrigin)) {\n  return res.status(403).send('Invalid origin');\n}\n\n// In React, using helmet for CSP\nimport helmet from 'helmet';\napp.use(helmet.contentSecurityPolicy({\n  directives: {\n    defaultSrc: [\"'self'\"],\n    scriptSrc: [\"'self'\", \"'unsafe-inline'\", 'https://cdn.example.com'],\n  },\n}));",
  },
  {
    id: "concept-custom-hooks",
    type: "concept",
    topic: "React",
    title: "Custom Hooks",
    prompt: "What are custom hooks in React? When should you create them?",
    expected:
      "Custom hooks are JavaScript functions that encapsulate reusable stateful logic using React's built‑in hooks. They promote code reuse, separation of concerns, and testing. Create them when you find duplicate logic across components (e.g., data fetching, form handling, subscriptions).",
    keywords: [
      "custom hooks",
      "reusable logic",
      "useEffect",
      "useState",
      "abstraction",
    ],
    explanation:
      "Custom hooks are a mechanism to reuse stateful logic across multiple components. They are regular JavaScript functions whose names start with `use` and may call other hooks (useState, useEffect, useContext, etc.).\n\n**Why custom hooks?**\n- **Reusability:** Share logic without changing component hierarchy (unlike HOCs or render props).\n- **Separation of concerns:** Extract complex logic out of components.\n- **Testability:** Hooks can be tested in isolation.\n- **Readability:** Components become simpler and focus on rendering.\n\n**When to create a custom hook:**\n- Duplicated `useEffect` or `useState` patterns across components.\n- Complex state logic that can be abstracted (e.g., form handling, local storage, window events).\n- Data fetching with loading/error states.\n- Subscriptions (WebSocket, event listeners).\n- Any logic that doesn't directly involve JSX.\n\n**Rules for custom hooks:**\n- Name must start with `use` (React convention).\n- Can call other hooks inside.\n- Should be pure (no side effects outside the hook's own scope).\n- Can return values (state, functions) or nothing.\n\n**Interview tip:** Be able to write a custom hook (e.g., `useLocalStorage`, `useFetch`, `useWindowSize`). Understand the difference between custom hooks and utility functions (custom hooks can use other hooks). Know that custom hooks can call other custom hooks, enabling composition. Also discuss testing custom hooks with `@testing-library/react-hooks`.",
    code: "// Custom hook: useLocalStorage\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      console.error(error);\n      return initialValue;\n    }\n  });\n\n  const setValue = (value) => {\n    try {\n      const valueToStore = value instanceof Function ? value(storedValue) : value;\n      setStoredValue(valueToStore);\n      window.localStorage.setItem(key, JSON.stringify(valueToStore));\n    } catch (error) {\n      console.error(error);\n    }\n  };\n\n  return [storedValue, setValue];\n}\n\n// Usage in component\nfunction ThemeToggle() {\n  const [theme, setTheme] = useLocalStorage('theme', 'light');\n  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\n    Current theme: {theme}\n  </button>;\n}\n\n// Custom hook: useFetch\nfunction useFetch(url, options = {}) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const abortController = new AbortController();\n    const fetchData = async () => {\n      try {\n        setLoading(true);\n        const response = await fetch(url, { ...options, signal: abortController.signal });\n        if (!response.ok) throw new Error(`HTTP ${response.status}`);\n        const result = await response.json();\n        setData(result);\n        setError(null);\n      } catch (err) {\n        if (err.name !== 'AbortError') setError(err.message);\n      } finally {\n        setLoading(false);\n      }\n    };\n    fetchData();\n    return () => abortController.abort();\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Usage\nfunction UserProfile({ userId }) {\n  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  return <div>{user.name}</div>;\n}\n\n// Custom hook: useWindowSize\nfunction useWindowSize() {\n  const [windowSize, setWindowSize] = useState({\n    width: window.innerWidth,\n    height: window.innerHeight,\n  });\n  useEffect(() => {\n    const handleResize = () => {\n      setWindowSize({ width: window.innerWidth, height: window.innerHeight });\n    };\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n  return windowSize;\n}\n\n// Custom hook: useDebounce\nfunction useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debouncedValue;\n}\n\n// Composing custom hooks\nfunction useUserWithPreferences(userId) {\n  const { data: user } = useFetch(`/api/users/${userId}`);\n  const [preferences, setPreferences] = useLocalStorage(`preferences_${userId}`, {});\n  return { user, preferences, setPreferences };\n}\n\n// Testing custom hooks (with @testing-library/react-hooks)\nimport { renderHook, act } from '@testing-library/react-hooks';\ntest('useLocalStorage reads and writes', () => {\n  const { result } = renderHook(() => useLocalStorage('test', 'initial'));\n  expect(result.current[0]).toBe('initial');\n  act(() => result.current[1]('updated'));\n  expect(result.current[0]).toBe('updated');\n});",
  },
];
