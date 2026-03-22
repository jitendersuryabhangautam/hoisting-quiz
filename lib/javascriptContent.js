export const practiceQuestions = [
  {
    id: "hoist-var",
    type: "output",
    topic: "Hoisting",
    title: "var and undefined",
    prompt: "What does this log?",
    code: `console.log(a);
var a = 5;`,
    expected: "undefined",
    explanation:
      "var declarations are hoisted and initialized to undefined. The declaration exists before execution reaches the assignment, so the first log sees undefined.",
  },
  {
    id: "tdz-let",
    type: "output",
    topic: "TDZ",
    title: "let before declaration",
    prompt: "What happens here?",
    code: `console.log(a);
let a = 5;`,
    expected: "ReferenceError",
    explanation:
      "let is hoisted but stays in the Temporal Dead Zone until the declaration line runs. Accessing it early throws a ReferenceError.",
  },
  {
    id: "fn-hoist",
    type: "output",
    topic: "Functions",
    title: "function declarations",
    prompt: "What gets printed?",
    code: `foo();
function foo() {
  console.log("Hello");
}`,
    expected: "Hello",
    explanation:
      "Function declarations are fully hoisted, including their body. The call works even though the function appears later in the file.",
  },
  {
    id: "closure-var-loop",
    type: "output",
    topic: "Closures",
    title: "var in a loop",
    prompt: "What does the timeout print?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    expected: "3\n3\n3",
    explanation:
      "var is function scoped, so every callback closes over the same i binding. By the time the timeouts run, i is already 3.",
  },
  {
    id: "closure-let-loop",
    type: "output",
    topic: "Closures",
    title: "let in a loop",
    prompt: "What does the timeout print?",
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    expected: "0\n1\n2",
    explanation:
      "let creates a fresh binding for every loop iteration, so each callback captures a different value.",
  },
  {
    id: "shadowing-var",
    type: "output",
    topic: "Scope",
    title: "shadowed var",
    prompt: "What is logged?",
    code: `var x = 10;
function foo() {
  console.log(x);
  var x = 20;
}
foo();`,
    expected: "undefined",
    explanation:
      "The inner var x is hoisted inside foo and shadows the outer x. The log sees the inner binding before assignment, so it prints undefined.",
  },
  {
    id: "this-method",
    type: "output",
    topic: "this",
    title: "method call binding",
    prompt: "What does this print?",
    code: `const user = {
  name: "Vijay",
  getName() {
    return this.name;
  }
};
console.log(user.getName());`,
    expected: "Vijay",
    explanation:
      "When a function is called as a method, this points to the object on the left side of the dot.",
  },
  {
    id: "this-arrow",
    type: "output",
    topic: "this",
    title: "arrow inherits this",
    prompt: "What does this print?",
    code: `var name = "Global";
const user = {
  name: "Vijay",
  getName() {
    const inner = () => this.name;
    return inner();
  }
};
console.log(user.getName());`,
    expected: "Vijay",
    explanation:
      "Arrow functions do not create their own this. They use the this value from the surrounding function, which is user here.",
  },
  {
    id: "class-before-declare",
    type: "output",
    topic: "Classes",
    title: "class TDZ",
    prompt: "What happens?",
    code: `const person = new Person();
class Person {}`,
    expected: "ReferenceError",
    explanation:
      "Class declarations are not usable before their declaration line. They live in a TDZ too, so early access throws a ReferenceError.",
  },
  {
    id: "function-vs-var",
    type: "output",
    topic: "Hoisting",
    title: "function wins first",
    prompt: "What gets logged?",
    code: `console.log(foo);
function foo() {}
var foo = 1;`,
    expected: "[Function: foo]",
    explanation:
      "Function declarations are hoisted before var assignments. The first log sees the function object, then the later assignment replaces it with 1.",
  },
  {
    id: "output-async",
    type: "output",
    topic: "Async",
    title: "async plus hoisting",
    prompt: "What does this log?",
    code: `async function test() {
  console.log(a);
  var a = 10;
  await Promise.resolve();
  console.log(a);
}
test();`,
    expected: "undefined\n10",
    explanation:
      "The var binding is hoisted inside the async function. The await does not change hoisting; it only pauses execution after the assignment has already happened.",
  },
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
  },
  {
    id: "merge-arrays",
    type: "implementation",
    topic: "Arrays",
    title: "Merge two arrays",
    prompt:
      "Write a function that merges two arrays without mutating either one.",
    starter: `function mergeArrays(first, second) {
  // your solution here
}`,
    referenceSolution: `function mergeArrays(first, second) {
  return [...first, ...second];
}`,
    explanation:
      "Spread syntax is the cleanest way to merge arrays immutably. If you need sorting or deduping, apply that as a separate step.",
    hint: "Keep the inputs unchanged and preserve order.",
  },
  {
    id: "merge-unique",
    type: "implementation",
    topic: "Arrays",
    title: "Merge and dedupe",
    prompt:
      "Write a function that merges two arrays and removes duplicate values.",
    starter: `function mergeUnique(first, second) {
  // your solution here
}`,
    referenceSolution: `function mergeUnique(first, second) {
  return [...new Set([...first, ...second])];
}`,
    explanation:
      "Set removes duplicates while preserving insertion order. Spread the arrays first, then wrap the combined result in a Set.",
    hint: "Think of Set as a quick dedupe layer.",
  },
  {
    id: "flatten-one-level",
    type: "implementation",
    topic: "Arrays",
    title: "Flatten one level",
    prompt: "Write a function that flattens one level of nesting.",
    starter: `function flattenOneLevel(items) {
  // your solution here
}`,
    referenceSolution: `function flattenOneLevel(items) {
  return items.flat();
}`,
    explanation:
      "Array.prototype.flat() is the direct solution for one-level flattening. A reduce-based version is also valid if you want the manual approach.",
    hint: "One level only, not deep flattening.",
  },
  {
    id: "counter-closure",
    type: "implementation",
    topic: "Closures",
    title: "Counter with closure",
    prompt: "Create a counter that remembers its private state.",
    starter: `function createCounter() {
  // return increment and get methods
}`,
    referenceSolution: `function createCounter() {
  let count = 0;
  return {
    increment() {
      count += 1;
      return count;
    },
    get() {
      return count;
    },
  };
}`,
    explanation:
      "The counter value stays private inside the factory function. The returned methods close over count and can update it safely.",
    hint: "Use a factory function and keep count in local scope.",
  },
  {
    id: "debounce",
    type: "implementation",
    topic: "Functions",
    title: "Debounce",
    prompt: "Implement debounce(fn, delay).",
    starter: `function debounce(fn, delay) {
  // your solution here
}`,
    referenceSolution: `function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    explanation:
      "Debounce delays execution until calls stop for the specified time. Each new call resets the timer.",
    hint: "You need a timer variable that survives between calls.",
  },
  {
    id: "group-by",
    type: "implementation",
    topic: "Arrays",
    title: "Group by key",
    prompt: "Group objects by a chosen property.",
    starter: `function groupBy(list, key) {
  // your solution here
}`,
    referenceSolution: `function groupBy(list, key) {
  return list.reduce((acc, item) => {
    const group = item[key];
    (acc[group] ??= []).push(item);
    return acc;
  }, {});
}`,
    explanation:
      "reduce is a natural fit for building grouped collections. The accumulator stores arrays keyed by the chosen property.",
    hint: "Return an object whose values are arrays.",
  },
  {
    id: "hoist-function-factory",
    type: "implementation",
    topic: "Closures",
    title: "Function factory with hoisting",
    prompt:
      "Create a function that returns functions remembering their creation order.",
    starter: `function createFunctions(count) {
  // return an array of functions
}`,
    referenceSolution: `function createFunctions(count) {
  const functions = [];
  for (let i = 0; i < count; i++) {
    functions.push(() => i);
  }
  return functions;
}`,
    explanation:
      "Use let in the loop to create a fresh binding for each iteration. Each function closes over its own i value.",
    hint: "Avoid var in the loop - it would share one binding.",
  },
  {
    id: "debounce-advanced",
    type: "implementation",
    topic: "Functions",
    title: "Debounce with immediate option",
    prompt: "Implement debounce with an immediate execution option.",
    starter: `function debounce(fn, delay, immediate = false) {
  // your solution here
}`,
    referenceSolution: `function debounce(fn, delay, immediate = false) {
  let timerId;
  let lastCallTime;
  return function (...args) {
    const now = Date.now();
    if (immediate && !lastCallTime) {
      fn.apply(this, args);
      lastCallTime = now;
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (!immediate) fn.apply(this, args);
        lastCallTime = now;
      }, delay);
    }
  };
}`,
    explanation:
      "When immediate is true, execute on the first call and ignore subsequent calls until the delay passes.",
    hint: "Track the last execution time to handle the immediate case.",
  },
  {
    id: "memoize",
    type: "implementation",
    topic: "Functions",
    title: "Memoize a function",
    prompt: "Cache function results to avoid recomputation.",
    starter: `function memoize(fn) {
  // return memoized version
}`,
    referenceSolution: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
    explanation:
      "Store results keyed by arguments. JSON.stringify works for simple cases but may not handle complex objects.",
    hint: "Use a Map or object to store cached results.",
  },
  {
    id: "curry",
    type: "implementation",
    topic: "Functions",
    title: "Curry a function",
    prompt: "Transform a function to accept arguments one at a time.",
    starter: `function curry(fn) {
  // return curried version
}`,
    referenceSolution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}`,
    explanation:
      "Check if we have enough arguments to call the original function. If not, return a new function that collects more arguments.",
    hint: "Use fn.length to check the expected number of parameters.",
  },
  {
    id: "deep-clone",
    type: "implementation",
    topic: "Objects",
    title: "Deep clone an object",
    prompt: "Create a deep copy of an object without references.",
    starter: `function deepClone(obj) {
  // your solution here
}`,
    referenceSolution: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(deepClone);
  if (typeof obj === 'object') {
    const copy = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepClone(obj[key]);
      }
    }
    return copy;
  }
}`,
    explanation:
      "Recursively copy all properties. Handle arrays, dates, and plain objects differently.",
    hint: "Check for primitives first, then handle complex types.",
  },
  {
    id: "throttle",
    type: "implementation",
    topic: "Functions",
    title: "Throttle function calls",
    prompt: "Limit function execution to once per time window.",
    starter: `function throttle(fn, delay) {
  // your solution here
}`,
    referenceSolution: `function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}`,
    explanation:
      "Track the last execution time and only allow calls after the delay has passed.",
    hint: "Use timestamps to control execution frequency.",
  },
  {
    id: "promise-race",
    type: "implementation",
    topic: "Promises",
    title: "Implement Promise.race",
    prompt:
      "Return a promise that resolves/rejects with the first settled promise.",
    starter: `function promiseRace(promises) {
  // your solution here
}`,
    referenceSolution: `function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise.then(resolve).catch(reject);
    }
  });
}`,
    explanation:
      "Attach resolve/reject to each promise. The first one to settle will trigger the result.",
    hint: "Don't wait for all promises - just the first one.",
  },
  {
    id: "event-emitter",
    type: "implementation",
    topic: "Objects",
    title: "Simple event emitter",
    prompt: "Create an object that can emit and listen to events.",
    starter: `class EventEmitter {
  // implement on, off, emit
}`,
    referenceSolution: `class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(...args));
  }
}`,
    explanation:
      "Store callbacks in an object keyed by event name. Call all listeners when emitting.",
    hint: "Use an object to map event names to arrays of callbacks.",
  },
  {
    id: "binary-search",
    type: "implementation",
    topic: "Algorithms",
    title: "Binary search",
    prompt: "Find an item in a sorted array using binary search.",
    starter: `function binarySearch(arr, target) {
  // return index or -1
}`,
    referenceSolution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    explanation:
      "Divide the search space in half each iteration. Requires a sorted array.",
    hint: "Use two pointers to track the current search range.",
  },
  {
    id: "fibonacci-memo",
    type: "implementation",
    topic: "Recursion",
    title: "Fibonacci with memoization",
    prompt: "Compute nth Fibonacci number efficiently.",
    starter: `function fibonacci(n) {
  // your solution here
}`,
    referenceSolution: `function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
    explanation:
      "Cache results to avoid recomputing the same values. Reduces exponential time to linear.",
    hint: "Use an object or Map to store computed values.",
  },
  {
    id: "bind-polyfill",
    type: "implementation",
    topic: "Functions",
    title: "Implement Function.prototype.bind",
    prompt: "Create a bind method that sets function context.",
    starter: `function myBind(fn, context) {
  // return bound function
}`,
    referenceSolution: `function myBind(fn, context, ...boundArgs) {
  return function (...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
}`,
    explanation:
      "Return a function that calls the original with the specified context and pre-bound arguments.",
    hint: "Use apply to set the context and combine arguments.",
  },
  {
    id: "object-assign",
    type: "implementation",
    topic: "Objects",
    title: "Implement Object.assign",
    prompt: "Merge properties from source objects to target.",
    starter: `function objectAssign(target, ...sources) {
  // your solution here
}`,
    referenceSolution: `function objectAssign(target, ...sources) {
  for (const source of sources) {
    if (source) {
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
  }
  return target;
}`,
    explanation:
      "Copy enumerable properties from sources to target. Later sources override earlier ones.",
    hint: "Iterate through sources and copy their properties.",
  },
  {
    id: "sleep-promise",
    type: "implementation",
    topic: "Promises",
    title: "Sleep with promises",
    prompt: "Create a function that resolves after a delay.",
    starter: `function sleep(ms) {
  // return a promise
}`,
    referenceSolution: `function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}`,
    explanation:
      "Wrap setTimeout in a promise. The promise resolves after the timeout fires.",
    hint: "Use setTimeout inside a Promise constructor.",
  },
  {
    id: "intersection",
    type: "implementation",
    topic: "Arrays",
    title: "Array intersection",
    prompt: "Find common elements between two arrays.",
    starter: `function intersection(arr1, arr2) {
  // your solution here
}`,
    referenceSolution: `function intersection(arr1, arr2) {
  const set = new Set(arr1);
  return arr2.filter(item => set.has(item));
}`,
    explanation:
      "Use a Set for O(1) lookups. Filter the second array based on presence in the first.",
    hint: "Sets provide fast membership testing.",
  },
];

export const theorySections = [
  {
    title: "Hoisting",
    question: "What is hoisting really?",
    answer:
      "Hoisting is JavaScript's compile-time setup step where declarations are registered before execution starts. var gets initialized to undefined, function declarations get their full body, and let/const/class stay uninitialized until their line runs.",
    example: `console.log(x); // undefined
var x = 10;`,
    takeaway: "Declarations move, assignments do not.",
  },
  {
    title: "TDZ",
    question: "Why do let and const throw ReferenceError?",
    answer:
      "let, const, and class declarations are in the Temporal Dead Zone from the start of their scope until execution reaches the declaration line. Accessing them early is a runtime error, not undefined.",
    example: `{
  console.log(value); // ReferenceError
  let value = 1;
}`,
    takeaway: "TDZ protects you from using a binding before it is ready.",
  },
  {
    title: "Scope",
    question: "How does scope resolution work?",
    answer:
      "JavaScript first looks in the current scope, then moves outward through the lexical scope chain until it finds the identifier or fails with ReferenceError.",
    example: `function outer() {
  const name = "outer";
  function inner() {
    console.log(name);
  }
}`,
    takeaway:
      "Lexical scope is decided by where code is written, not where it runs.",
  },
  {
    title: "Closures",
    question: "Why are closures useful?",
    answer:
      "Closures let functions remember private state, build factories, and keep values alive after the outer function has returned.",
    example: `function makeCounter() {
  let count = 0;
  return () => ++count;
}`,
    takeaway: "Private state is the most common closure use case.",
  },
  {
    title: "this",
    question: "What decides the value of this?",
    answer:
      "this is decided by the call site for regular functions. Method calls bind this to the object, plain calls usually bind it to the global object or undefined in strict mode, and arrow functions inherit this from the surrounding scope.",
    example: `const obj = {
  name: "A",
  getName() {
    return this.name;
  },
};`,
    takeaway: "Arrow functions do not create their own this.",
  },
  {
    title: "Arrays",
    question: "When should you mutate an array?",
    answer:
      "Prefer immutable updates when possible. Methods like map, filter, slice, concat, flat, and spread create new arrays and make state changes easier to reason about.",
    example: `const merged = [...first, ...second];`,
    takeaway:
      "Favor new values over in-place mutation unless performance demands otherwise.",
  },
  {
    title: "Prototype",
    question: "How is inheritance modeled in JavaScript?",
    answer:
      "Objects inherit from other objects through the prototype chain. Classes are mostly syntax on top of that model, not a separate inheritance system.",
    example: `function User() {}
User.prototype.sayHi = function () {
  return "hi";
};`,
    takeaway: "Classes are syntax sugar over prototypes.",
  },
  {
    title: "Async",
    question: "What is the event loop doing?",
    answer:
      "The event loop coordinates synchronous execution, microtasks such as promise callbacks, and macrotasks such as timers. It decides when queued work gets a turn after the current call stack clears.",
    example: `Promise.resolve().then(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);`,
    takeaway: "Promise callbacks run before timers.",
  },
  {
    title: "Promises",
    question: "Promise.all vs Promise.allSettled?",
    answer:
      "Promise.all fails fast when any promise rejects. Promise.allSettled waits for every promise to finish and reports the final status of each one.",
    example: `await Promise.all([taskA(), taskB()]);
await Promise.allSettled([taskA(), taskB()]);`,
    takeaway:
      "Use all for all-or-nothing work, allSettled for reporting every result.",
  },
  {
    title: "Immutability",
    question: "Why does immutability help?",
    answer:
      "Immutable updates make debugging, memoization, and change detection easier because you can compare references and treat previous values as snapshots.",
    example: `const next = [...items, newItem];`,
    takeaway:
      "Small pure helpers are easier to test than shared mutable state.",
  },
];

export const outputQuestions = practiceQuestions.filter(
  (question) => question.type === "output"
);

export const implementationQuestions = practiceQuestions.filter(
  (question) => question.type === "implementation"
);

export const conceptQuestions = practiceQuestions.filter(
  (question) => question.type === "concept"
);

export function shuffleQuestions(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function hashSeed(seed) {
  const text = String(seed);
  let hash = 2166136261;

  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed) {
  let state = hashSeed(seed) || 1;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffleQuestions(items, seed) {
  const copy = [...items];
  const random = createSeededRandom(seed);

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function normalizeLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

export function normalizeCodeBlock(code) {
  const lines = code.replace(/\t/g, "  ").split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
  const minIndent = nonEmptyLines.reduce((min, line) => {
    const indent = line.match(/^\s*/)?.[0].length ?? 0;
    return Math.min(min, indent);
  }, Infinity);

  if (!Number.isFinite(minIndent)) {
    return code.trim();
  }

  return lines
    .map((line) => line.slice(Math.min(minIndent, line.length)))
    .join("\n")
    .trim();
}

export function isAnswerCorrect(question, rawAnswer) {
  const answer = rawAnswer.trim();

  if (question.type === "output") {
    if (normalizeText(answer) === normalizeText(question.expected)) {
      return true;
    }

    if (question.expected.includes("\n")) {
      const expectedLines = normalizeLines(question.expected);
      const typedLines = normalizeLines(answer);

      if (
        typedLines.length === expectedLines.length &&
        typedLines.every((line, index) => line === expectedLines[index])
      ) {
        return true;
      }

      const typedParts = answer
        .split(/[,\n ]+/)
        .map((part) => part.trim())
        .filter(Boolean);

      if (
        typedParts.length === expectedLines.length &&
        typedParts.every((part, index) => part === expectedLines[index])
      ) {
        return true;
      }
    }

    return false;
  }

  if (question.type === "concept" && question.keywords) {
    const normalized = normalizeText(answer);
    return question.keywords.every((keyword) =>
      normalized.includes(keyword.toLowerCase())
    );
  }

  return false;
}
