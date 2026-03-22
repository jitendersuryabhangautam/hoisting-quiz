import { outputQuestions } from "@/lib/outputQuestions";
import { implementationQuestions } from "@/lib/implementationQuestions";
import { conceptQuestions } from "@/lib/conceptQuestions";

export const practiceQuestions = [
  ...outputQuestions,
  ...implementationQuestions,
  ...conceptQuestions,
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
  const answer = (rawAnswer ?? "").trim();

  if (question.type === "output") {
    if (normalizeText(answer) === normalizeText(question.expected ?? "")) {
      return true;
    }

    if ((question.expected ?? "").includes("\n")) {
      const expectedLines = normalizeLines(question.expected ?? "");
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

