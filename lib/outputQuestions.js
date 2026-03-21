const rawOutputQuestions = [
  {
    id: "hoist-var",
    topic: "Hoisting",
    title: "var and undefined",
    prompt: "What does this log?",
    code: `console.log(a);
var a = 5;`,
    expected: "undefined",
    explanation:
      "HOISTING PHASE (before execution):\n1. JavaScript engine scans the code and 'hoists' var a → creates a binding with value undefined\n2. The assignment (a = 5) stays in place\n\nEXECUTION PHASE:\n1. console.log(a) runs → var a exists but is still undefined\n2. Then a = 5 is executed\n\n📌 KEY: var declarations are split — the declaration is hoisted and set to undefined, but the assignment stays at its original line.",
  },
  {
    id: "tdz-let",
    topic: "TDZ",
    title: "let before declaration",
    prompt: "What happens here?",
    code: `console.log(a);
let a = 5;`,
    expected: "ReferenceError",
    explanation:
      "HOISTING PHASE:\n1. let a is hoisted BUT placed in 'Temporal Dead Zone' (TDZ)\n2. let bindings are NOT initialized to undefined (unlike var)\n\nEXECUTION PHASE:\n1. console.log(a) tries to access 'a' while it's in TDZ\n2. ReferenceError is thrown: 'Cannot access 'a' before initialization'\n3. Code stops here\n\n📌 KEY: let/const are 'hoisted' but unusable until their declaration line is reached. They stay in TDZ from scope start to declaration.",
  },
  {
    id: "fn-hoist",
    topic: "Functions",
    title: "function declarations",
    prompt: "What gets printed?",
    code: `foo();
function foo() {
  console.log("Hello");
}`,
    expected: "Hello",
    explanation:
      "HOISTING PHASE (before any code runs):\n1. Function declarations are FULLY hoisted with their complete body\n2. foo() is available in memory with its full implementation\n\nEXECUTION PHASE:\n1. foo() is called — it's already there\n2.'Hello' is logged\n\n📌 KEY: Function declarations are special — the ENTIRE function (not just the name) is hoisted. You can call it before it appears in code.",
  },
  {
    id: "fn-expr-var",
    topic: "Functions",
    title: "function expression on var",
    prompt: "What happens when foo is called?",
    code: `foo();
var foo = function() {
  console.log("Hello");
};`,
    expected: "TypeError",
    explanation:
      "HOISTING PHASE:\n1. var foo is hoisted and initialized to undefined\n2. The function body is NOT hoisted (it's an expression, not a declaration)\n\nEXECUTION PHASE:\n1. foo() tries to call foo\n2. But foo is currently undefined\n3. TypeError: foo is not a function ❌\n\n📌 KEY: Function expressions are different from declarations. Only the var binding is hoisted (as undefined), not the function itself.",
  },
  {
    id: "multi-var",
    topic: "Hoisting",
    title: "multiple var assignments",
    prompt: "What are the two logs?",
    code: `console.log(a);
var a = 1;
var a = 2;
console.log(a);`,
    expected: "undefined\n2",
    explanation:
      'HOISTING PHASE:\n1. var a appears twice, but hoisting only creates ONE binding\n2. a is initialized to undefined\n\nEXECUTION PHASE:\n1. console.log(a) → a is undefined → logs "undefined"\n2. a = 1 → a is now 1\n3. a = 2 → a is now 2 (overwrites previous)\n4. console.log(a) → a is 2 → logs "2"\n\n📌 KEY: Multiple var declarations of the same name don\'t create multiple bindings. Only one binding exists, and assignments overwrite the previous value.',
  },
  {
    id: "loop-var-timeout",
    topic: "Closures",
    title: "var in a loop",
    prompt: "What do the timeouts print?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    expected: "3\n3\n3",
    explanation:
      "SCOPE ISSUE:\n1. var i is FUNCTION-SCOPED (not block-scoped)\n2. The var i hoisting brings it to the function level — only ONE i binding\n\nEXECUTION PHASE:\n1. Loop runs: i=0, i=1, i=2\n2. Each iteration schedules a callback with setTimeout\n3. Loop finishes: i=3 (from i++ when condition became false)\n4. Callbacks execute: they all close over the SAME i binding\n5. i is now 3, so all callbacks log 3\n\n📌 KEY: var is function-scoped. All callbacks share ONE i binding. By the time they run asynchronously, i has already reached 3.",
  },
  {
    id: "loop-let-timeout",
    topic: "Closures",
    title: "let in a loop",
    prompt: "What do the timeouts print?",
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    expected: "0\n1\n2",
    explanation:
      "SCOPE DIFFERENCE:\n1. let i is BLOCK-SCOPED\n2. JavaScript creates a NEW binding for each iteration\n3. Each callback captures its OWN i value\n\nEXECUTION PHASE:\n1. Iteration 0: new i binding = 0, callback scheduled → captures i=0\n2. Iteration 1: new i binding = 1, callback scheduled → captures i=1\n3. Iteration 2: new i binding = 2, callback scheduled → captures i=2\n4. Callbacks execute: each has its own i value\n5. Logs: 0, 1, 2\n\n📌 KEY: let creates a per-iteration binding. Each callback closes over its own i. This is the major difference between var and let in loops.",
  },
  {
    id: "function-scope-var",
    topic: "Scope",
    title: "function scope hoisting",
    prompt: "What is logged?",
    code: `function test() {
  console.log(a);
  var a = 10;
}
test();`,
    expected: "undefined",
    explanation:
      'HOISTING PHASE:\n1. Function test is hoisted (fully)\n2. Inside test, var a is hoisted to the TOP of the function\n\nEXECUTION PHASE:\n1. test() is called\n2. Inside test, console.log(a) runs\n3. a exists (hoisted) but is undefined\n4. Logs "undefined"\n5. Then a = 10 is executed\n\n📌 KEY: Hoisting happens at FUNCTION SCOPE. Variables are hoisted to the top of their containing function, not the global scope.',
  },
  {
    id: "shadowed-var",
    topic: "Scope",
    title: "shadowed var",
    prompt: "What is logged?",
    code: `var x = 10;
function foo() {
  console.log(x);
  var x = 20;
}
foo();
console.log(x);`,
    expected: "undefined\n10",
    explanation:
      'HOISTING PHASE:\n1. Global var x = 10 is hoisted\n2. Inside foo, a LOCAL var x is also hoisted (shadows global x)\n\nEXECUTION PHASE:\n1. foo() is called\n2. console.log(x) looks for x: finds the LOCAL x (hoisted, undefined)\n3. Logs "undefined"\n4. x = 20 assigns to the local x\n5. Function ends\n6. console.log(x) looks for x: finds the GLOBAL x (still 10)\n7. Logs "10"\n\n📌 KEY: Local scope shadows outer scope. The function\'s own hoisted var x blocks access to the global x until inside the function scope.',
  },
  {
    id: "inner-shadow",
    topic: "Scope",
    title: "nested scope shadowing",
    prompt: "What is logged by inner?",
    code: `function outer() {
  var a = 10;
  function inner() {
    console.log(a);
    var a = 20;
  }
  inner();
}
outer();`,
    expected: "undefined",
    explanation:
      "HOISTING PHASE:\n1. outer and inner are hoisted as full functions\n2. Inside inner, var a is hoisted to the top of inner's scope\n\nEXECUTION PHASE:\n1. outer() is called\n2. var a = 10 is executed (outer's a)\n3. inner() is called\n4. console.log(a) inside inner: finds the LOCAL a (hoisted, undefined)\n5. Logs \"undefined\"\n6. a = 20 assigns to locally scoped a\n\n📌 KEY: Even though outer has a = 10, inner's local var a shadows it completely. The local undefined binding wins.",
  },
  {
    id: "function-before-var",
    topic: "Hoisting",
    title: "function beats var initially",
    prompt: "What are the logs?",
    code: `console.log(foo);
function foo() {}
var foo = 10;
console.log(foo);`,
    expected: "[Function: foo]\n10",
    explanation:
      'HOISTING PHASE:\n1. function foo() {} is fully hoisted — foo becomes a function object\n2. var foo is hoisted, but foo is already a function, so the declaration is ignored\n\nEXECUTION PHASE:\n1. console.log(foo) → foo is the function object → logs "[Function: foo]"\n2. foo = 10 → ASSIGNMENT overwrites foo with the number 10\n3. console.log(foo) → foo is now 10 → logs "10"\n\n📌 KEY: Functions are hoisted BEFORE var declarations. Assignments always overwrite any previous binding.',
  },
  {
    id: "var-overwrites-function",
    topic: "Hoisting",
    title: "var overwrites function value",
    prompt: "What is logged?",
    code: `var foo = 10;
function foo() { return 20; }
console.log(foo);`,
    expected: "10",
    explanation:
      'HOISTING PHASE:\n1. function foo() {} is fully hoisted\n2. var foo is hoisted (but foo is already a function, so ignored)\n\nEXECUTION PHASE:\n1. foo = 10 → ASSIGNMENT happens, overwrites the function\n2. console.log(foo) → foo is 10 → logs "10"\n\n📌 KEY: Hoisting order matters! Functions are hoisted first, but runtime assignments always win. foo ends up as 10, not the function.',
  },
  {
    id: "named-fn-expression",
    topic: "Functions",
    title: "named function expression",
    prompt: "What does this print?",
    code: `var foo = function bar() {
  console.log(typeof bar);
};
foo();
console.log(typeof bar);`,
    expected: "function\nundefined",
    explanation:
      "FUNCTION EXPRESSION SCOPE:\n1. The name 'bar' is special: it's ONLY available INSIDE the function body\n2. Outside the function, bar does NOT exist in any scope\n\nEXECUTION PHASE:\n1. foo() is called\n2. Inside the function: console.log(typeof bar) → bar exists → logs \"function\"\n3. After foo() returns\n4. console.log(typeof bar) → bar is NOT in global scope → logs \"undefined\"\n\n📌 KEY: Named function expressions create a hidden inner binding. The name is useful for recursion but doesn't pollute outer scope.",
  },
  {
    id: "method-this",
    topic: "this",
    title: "method call binding",
    prompt: "What does this print?",
    code: `const user = {
  name: "Vijay",
  getName: function() { return this.name; }
};
console.log(user.getName());`,
    expected: "Vijay",
    explanation:
      'THIS BINDING (method call):\n1. user.getName() is a METHOD CALL (dot notation)\n2. When a function is called as a method, \'this\' points to the object BEFORE the dot\n\nEXECUTION PHASE:\n1. user.getName() is called\n2. this = user (the object before the dot)\n3. return this.name = return user.name = return "Vijay"\n4. Logs "Vijay"\n\n📌 KEY: THIS is determined by HOW you call the function. Method call (obj.method()) → this = obj.',
  },
  {
    id: "inner-this-regular",
    topic: "this",
    title: "regular inner function",
    prompt: "What does this print?",
    code: `var name = "Global";
const user = {
  name: "Vijay",
  getName: function() {
    function inner() { return this.name; }
    return inner();
  }
};
console.log(user.getName());`,
    expected: "Global",
    explanation:
      'THIS BINDING (regular function):\n1. Inner is NOT called as a method or with a receiver\n2. inner() is a plain function call (no dot notation)\n3. In non-strict mode, plain function calls use the GLOBAL object\n\nEXECUTION PHASE:\n1. user.getName() is called → this = user\n2. Inside: inner() is called (plain, no receiver)\n3. this in inner = global object (not user!)\n4. return this.name = return global.name = return "Global"\n5. Logs "Global"\n\n📌 KEY: THIS is lost in nested regular functions. Even inside a method, a plain function call gets global this (or undefined in strict mode).',
  },
  {
    id: "inner-this-arrow",
    topic: "this",
    title: "arrow inherits this",
    prompt: "What does this print?",
    code: `var name = "Global";
const user = {
  name: "Vijay",
  getName: function() {
    const inner = () => this.name;
    return inner();
  }
};
console.log(user.getName());`,
    expected: "Vijay",
    explanation:
      "THIS BINDING (arrow function):\n1. Arrow functions DON'T create their own 'this'\n2. They INHERIT 'this' from the surrounding LEXICAL scope\n3. Here, the surrounding scope is the getName method\n\nEXECUTION PHASE:\n1. user.getName() is called → this = user\n2. Inside: const inner = () => { } → arrow function inherits this from getName\n3. inner() is called → this is still user (inherited)\n4. return this.name = return user.name = return \"Vijay\"\n5. Logs \"Vijay\"\n\n📌 KEY: Arrow functions capture 'this' lexically. No matter how you call an arrow function, 'this' stays the same.",
  },
  {
    id: "method-extracted",
    topic: "this",
    title: "extracted method",
    prompt: "What is logged?",
    code: `const obj = { a: 10, b: function() { console.log(this.a); } };
var fn = obj.b;
fn();`,
    expected: "undefined",
    explanation:
      "THIS BINDING (lost binding):\n1. obj.b is extracted into fn\n2. fn is now a standalone function (no receiver)\n3. When fn() is called, it's a plain function call\n4. In non-strict mode, this = global object\n\nEXECUTION PHASE:\n1. var fn = obj.b → fn reference to the method\n2. fn() is called (plain call, no obj. prefix)\n3. this = global object\n4. this.a = global.a = undefined (doesn't exist globally)\n5. Logs \"undefined\"\n\n📌 KEY: 'this' is bound at CALL TIME, not definition time. Extracting a method loses the binding context.",
  },
  {
    id: "class-before",
    topic: "Classes",
    title: "class before declaration",
    prompt: "What happens?",
    code: `const obj = new Person();
class Person {}`,
    expected: "ReferenceError",
    explanation:
      "CLASS HOISTING (special behavior):\n1. Classes ARE hoisted, but they enter TDZ (like let/const)\n2. Classes are NOT initialized to anything\n3. Accessing a class in TDZ throws ReferenceError\n\nEXECUTION PHASE:\n1. const obj = new Person() tries to use Person\n2. Person is in TDZ (hoisted but uninitialized)\n3. ReferenceError: Cannot access 'Person' before initialization\n\n📌 KEY: Classes behave like let/const (block-scoped, TDZ). They're hoisted but not usable before their declaration line.",
  },
  {
    id: "class-field-timing",
    topic: "Classes",
    title: "class field initialization",
    prompt: "What is printed?",
    code: `class Person {
  constructor() { console.log(this.name); }
  name = "Vijay";
}
new Person();`,
    expected: "undefined",
    explanation:
      'CLASS FIELD TIMING:\n1. Constructor runs FIRST\n2. Class fields are initialized AFTER constructor body completes\n3. Inside constructor, fields are still undefined\n\nEXECUTION PHASE:\n1. new Person() creates an instance\n2. Constructor runs immediately\n3. console.log(this.name) → name field not initialized yet → undefined\n4. Logs "undefined"\n5. After constructor, name = "Vijay" is assigned\n\n📌 KEY: Constructor runs before field initialization. This differs from assignment in the constructor.',
  },
  {
    id: "typeof-class",
    topic: "Classes",
    title: "typeof class in TDZ",
    prompt: "What happens?",
    code: `console.log(typeof Person);
class Person {}`,
    expected: "ReferenceError",
    explanation:
      "TYPEOF AND TDZ:\n1. typeof usually safely returns \"undefined\" for undeclared variables\n2. BUT for let/const/class in TDZ, typeof still throws ReferenceError\n3. Classes are in TDZ before declaration\n\nEXECUTION PHASE:\n1. console.log(typeof Person) tries to access Person\n2. Person is in TDZ (not just undeclared)\n3. ReferenceError: Cannot access 'Person' before initialization\n4. typeof does NOT protect you from TDZ!\n\n📌 KEY: TDZ is stricter than undeclared variables. Even typeof cannot bypass TDZ safely.",
  },
  {
    id: "class-redeclare",
    topic: "Classes",
    title: "class redeclaration",
    prompt: "What happens here?",
    code: `function Person() {}
class Person {}`,
    expected: "SyntaxError",
    explanation:
      "IDENTIFIER CONFLICTS:\n1. You cannot use the same identifier in the same scope with different declaration types when one is a class\n2. Class declarations are block-scoped (like let/const)\n3. This is a SyntaxError (caught before execution)\n\nRESULT:\n- SyntaxError: Identifier 'Person' has already been declared\n- Code doesn't even run\n\n📌 KEY: Classes reserve their identifier at parse time. Duplicate identifiers are syntax errors.",
  },
  {
    id: "var-prototype",
    topic: "Hoisting",
    title: "var on prototype access",
    prompt: "What happens?",
    code: `console.log(Person.prototype);
var Person = function() {};`,
    expected: "TypeError",
    explanation:
      "HOISTING + PROPERTY ACCESS:\n1. var Person is hoisted to undefined\n2. Trying to access .prototype on undefined throws TypeError\n3. Assignment hasn't run yet\n\nEXECUTION PHASE:\n1. console.log(Person.prototype) tries to read prototype\n2. Person exists (hoisted) but is undefined\n3. undefined.prototype → TypeError: Cannot read property 'prototype' of undefined\n\n📌 KEY: Property access on undefined or null always throws TypeError. Hoisting puts the binding there, but with undefined value.",
  },
  {
    id: "function-prototype",
    topic: "Functions",
    title: "function prototype",
    prompt: "What is logged?",
    code: `function Person() {}
console.log(Person.prototype);`,
    expected: "[object Object]",
    explanation:
      'FUNCTION PROTOTYPE:\n1. Every function automatically has a .prototype property\n2. This property is an object (used for inheritance)\n3. For a simple function, prototype is an empty object\n\nEXECUTION PHASE:\n1. function Person() {} is fully hoisted\n2. console.log(Person.prototype) reads the auto-created prototype\n3. Logs "[Object Object]" (an object)\n\n📌 KEY: Functions inherit from Function.prototype and have their own .prototype property for constructor patterns.',
  },
  {
    id: "block-let-shadow",
    topic: "TDZ",
    title: "block scoped let",
    prompt: "What happens?",
    code: `let a = 10;
{
  console.log(a);
  let a = 20;
}`,
    expected: "ReferenceError",
    explanation:
      "BLOCK SCOPE + TDZ:\n1. Outer 'let a = 10' creates a global binding\n2. Inside the block, 'let a = 20' creates a NEW binding\n3. This new binding SHADOWS the outer one\n4. But it's in TDZ until the declaration line\n\nEXECUTION PHASE:\n1. console.log(a) looks for 'a'\n2. Finds the local 'let a' (in TDZ, not initialized)\n3. ReferenceError: Cannot access 'a' before initialization\n4. The outer 'a' is unreachable due to shadowing\n\n📌 KEY: Shadowing happens before object is initialized. The inner binding blocks access to outer even though it's in TDZ.",
  },
  {
    id: "block-const-access",
    topic: "Scope",
    title: "block can see outer const",
    prompt: "What is logged?",
    code: `const a = 10;
{
  console.log(a);
}`,
    expected: "10",
    explanation:
      "SCOPE CHAIN:\n1. Block creates a new scope\n2. There's NO 'a' declared inside the block\n3. Scope chain: local block → outer global\n4. Finds 'a' in global scope\n\nEXECUTION PHASE:\n1. console.log(a) looks for 'a'\n2. Not in block scope → looks in parent scope\n3. Finds global const a = 10\n4. Logs \"10\"\n\n📌 KEY: Without shadowing, inner scopes can access outer scope variables. Scope chain is automatic.",
  },
  {
    id: "block-tdz",
    topic: "TDZ",
    title: "block TDZ access",
    prompt: "What happens?",
    code: `{
  console.log(a);
  let a = 5;
}`,
    expected: "ReferenceError",
    explanation:
      "BLOCK SCOPE + TDZ:\n1. Block starts: let a is hoisted to the block scope (in TDZ)\n2. No outer 'a' exists to fall back on\n3. Hoisting brings 'a' into the block, putting it in TDZ\n\nEXECUTION PHASE:\n1. console.log(a) tries to access 'a'\n2. 'a' exists in block scope but is in TDZ (uninitialized)\n3. ReferenceError: Cannot access 'a' before initialization\n\n📌 KEY: Hoisting puts the variable in TDZ for the entire block. TDZ starts at block beginning, not at var declaration position.",
  },
  {
    id: "iife-shadow",
    topic: "Scope",
    title: "IIFE shadowing",
    prompt: "What is logged?",
    code: `var a = 10;
(function() {
  console.log(a);
  var a = 20;
})();`,
    expected: "undefined",
    explanation:
      "HOISTING INSIDE IIFE:\n1. Global var a = 10\n2. Inside IIFE, var a is hoisted to function top (undefined)\n3. This shadows the global 'a'\n\nEXECUTION PHASE:\n1. IIFE is executed\n2. console.log(a) looks for 'a'\n3. Finds local var a (hoisted, undefined)\n4. Logs \"undefined\"\n5. a = 20 then executes\n6. Global 'a' remains 10 (untouched)\n\n📌 KEY: Function scope overrides global scope. Local hoisting creates a shadow immediately.",
  },
  {
    id: "iife-local-var",
    topic: "Scope",
    title: "local var inside function",
    prompt: "What are the three logs?",
    code: `var a = 1;
function foo() {
  console.log(a);
  a = 20;
  console.log(a);
  var a = 30;
}
foo();
console.log(a);`,
    expected: "undefined\n20\n1",
    explanation:
      'SCOPE SEPARATION:\n1. Global var a = 1\n2. Inside foo, var a is hoisted (shadows global)\n\nEXECUTION PHASE:\n1. console.log(a) → local a (hoisted, undefined) → logs "undefined"\n2. a = 20 → assigns to LOCAL a\n3. console.log(a) → local a is now 20 → logs "20"\n4. var a = 30 → assigns to LOCAL a (already hoisted)\n5. Function ends\n6. console.log(a) → GLOBAL a (unchanged) → logs "1"\n\n📌 KEY: Local var completely shadows global. Assignments inside function don\'t affect outer scope.',
  },
  {
    id: "hoisted-call-chain",
    topic: "Functions",
    title: "hoisted function chain",
    prompt: "What is logged?",
    code: `console.log(foo());
function foo() { return bar(); }
function bar() { return "Hello"; }`,
    expected: "Hello",
    explanation:
      'FULL HOISTING:\n1. Both function declarations are fully hoisted\n2. foo and bar are both available before any execution\n\nEXECUTION PHASE:\n1. console.log(foo()) calls foo\n2. foo() calls bar()\n3. bar() returns "Hello"\n4. Result bubbles back: foo returns "Hello"\n5. console.log prints "Hello"\n\n📌 KEY: Function declarations are hoisted completely. Chained function calls work fine when both are declared (in any order).',
  },
  {
    id: "closure-lexical",
    topic: "Closures",
    title: "lexical scope closure",
    prompt: "What is logged?",
    code: `var x = 1;
function foo() { console.log(x); }
function bar() { var x = 2; foo(); }
bar();`,
    expected: "1",
    explanation:
      "LEXICAL vs DYNAMIC SCOPE:\n1. foo is DEFINED in global scope (where x = 1)\n2. foo closes over global scope, capturing x = 1\n3. bar creates its own local x = 2\n\nEXECUTION PHASE:\n1. bar() is called\n2. bar sets local x = 2\n3. bar calls foo()\n4. foo looks for 'x' in ITS closure (global, not bar's scope)\n5. Finds global x = 1 → logs \"1\"\n6. bar's x = 2 is ignored\n\n📌 KEY: LEXICAL scope is static (where defined). Functions don't use caller's scope, they use definition scope.",
  },
  {
    id: "async-hoist",
    topic: "Async",
    title: "async and hoisting",
    prompt: "What are the logs?",
    code: `async function test() {
  console.log(a);
  var a = 10;
  await Promise.resolve();
  console.log(a);
}
test();`,
    expected: "undefined\n10",
    explanation:
      'HOISTING IN ASYNC FUNCTION:\n1. var a is hoisted (like any function)\n2. Initialized to undefined\n3. await doesn\'t affect hoisting\n\nEXECUTION PHASE:\n1. test() is called\n2. console.log(a) → a is undefined (hoisted) → logs "undefined"\n3. a = 10 → assignment\n4. await Promise.resolve() → pauses, resumes\n5. console.log(a) → a is now 10 → logs "10"\n6. Function completes\n\n📌 KEY: Hoisting works the same in async functions. await doesn\'t change hoisting behavior.',
  },
  {
    id: "timeout-hoist",
    topic: "Async",
    title: "timeout plus hoisting",
    prompt: "What are the logs?",
    code: `console.log(a);
setTimeout(() => console.log(a), 0);
var a = 5;`,
    expected: "undefined\n5",
    explanation:
      'ASYNC CALLBACK TIMING:\n1. var a is hoisted globally, starts as undefined\n2. setTimeout schedules a callback (but doesn\'t run it yet)\n\nEXECUTION PHASE:\n1. console.log(a) → a is undefined (hoisted) → logs "undefined"\n2. setTimeout schedules callback (callback doesn\'t run yet)\n3. a = 5 → assignment\n4. Synchronous code done\n5. Event loop picks up setTimeout callback\n6. Callback runs: console.log(a) → a is 5 → logs "5"\n\n📌 KEY: Hoisting finishes before any async callbacks run. Callbacks execute AFTER all sync code.',
  },
  {
    id: "function-over-var-1",
    topic: "Hoisting",
    title: "function and var interaction",
    prompt: "What are the logs?",
    code: `console.log(foo);
var foo = 1;
function foo() { return 2; }
console.log(foo);`,
    expected: "[Function: foo]\n1",
    explanation:
      'HOISTING ORDER:\n1. function foo() {} is hoisted first (FULLY hoisted)\n2. var foo is hoisted second, but foo already exists, so ignored\n3. Both point to the same identifier\n\nEXECUTION PHASE:\n1. console.log(foo) → foo is the function → logs "[Function: foo]"\n2. foo = 1 → ASSIGNMENT overwrites function with number 1\n3. console.log(foo) → foo is 1 → logs "1"\n4. function foo() { } line is ignored (already executed at hoist time)\n\n📌 KEY: Functions are hoisted before var. Assignments always overwrite.',
  },
  {
    id: "function-call-before-var",
    topic: "Functions",
    title: "call hoisted function before var",
    prompt: "What does this log?",
    code: `console.log(foo());
var foo = 10;
function foo() { return 20; }`,
    expected: "20",
    explanation:
      'HOISTING + CALL:\n1. function foo() {} is fully hoisted\n2. var foo is ignored (identifier already exists)\n\nEXECUTION PHASE:\n1. console.log(foo()) calls foo\n2. foo is the function (hoisted) → returns 20\n3. console.log prints "20"\n4. var foo = 10 executes (overwrites foo, but AFTER the call)\n\n📌 KEY: Function call happens before var assignment in execution order. Function hoisting wins timing.',
  },

  {
    id: "typeof-var",
    topic: "Hoisting",
    title: "typeof a hoisted var",
    prompt: "What is logged?",
    code: `console.log(typeof foo);
var foo = function bar() {};`,
    expected: "undefined",
    explanation:
      'HOISTING + TYPEOF:\n1. var foo is hoisted and initialized to undefined\n2. The function body is NOT hoisted (expression, not declaration)\n\nEXECUTION PHASE:\n1. console.log(typeof foo) evaluates typeof on foo\n2. foo exists (hoisted) but is undefined\n3. typeof undefined → returns string "undefined"\n4. Logs "undefined"\n5. Assignment (function value) hasn\'t run yet\n\n📌 KEY: typeof undefined returns the string "undefined". Hoisting creates the binding with undefined value.',
  },
  {
    id: "iife-typeof",
    topic: "Scope",
    title: "typeof inside IIFE",
    prompt: "What is logged?",
    code: `(function() {
  console.log(typeof foo);
  var foo = 10;
})();`,
    expected: "undefined",
    explanation:
      'HOISTING INSIDE IIFE:\n1. Inside IIFE, var foo is hoisted to function scope (undefined)\n2. typeof checks the hoisted binding\n\nEXECUTION PHASE:\n1. IIFE executes\n2. console.log(typeof foo) evaluates\n3. foo is hoisted but undefined inside IIFE scope\n4. typeof undefined → "undefined"\n5. Logs "undefined"\n\n📌 KEY: Hoisting happens at function scope. IIFE doesn\'t escape function-level hoisting.',
  },
  {
    id: "iife-function",
    topic: "Functions",
    title: "hoisted function inside IIFE",
    prompt: "What does this log?",
    code: `(function() {
  console.log(foo());
  function foo() { return 10; }
})();`,
    expected: "10",
    explanation:
      'FUNCTION HOISTING INSIDE IIFE:\n1. Inside IIFE, function foo() is fully hoisted\n2. Available before execution reaches the declaration\n\nEXECUTION PHASE:\n1. IIFE executes\n2. console.log(foo()) calls foo\n3. foo is hoisted function inside IIFE → returns 10\n4. Logs "10"\n\n📌 KEY: Function declarations are hoisted at any scope level. IIFE scopes don\'t prevent hoisting.',
  },
  {
    id: "iife-fn-expr",
    topic: "Functions",
    title: "function expression inside IIFE",
    prompt: "What happens?",
    code: `(function() {
  console.log(foo());
  var foo = function() { return 10; };
})();`,
    expected: "TypeError",
    explanation:
      "FUNCTION EXPRESSION VS DECLARATION:\n1. var foo is hoisted to IIFE scope (undefined)\n2. Function expression is NOT hoisted\n3. Assignment hasn't run yet\n\nEXECUTION PHASE:\n1. IIFE executes\n2. console.log(foo()) tries to call foo\n3. foo exists but is undefined\n4. undefined() → TypeError: foo is not a function\n\n📌 KEY: Function expressions require var/let/const + assignment. Hoisting only saves the binding.",
  },
  {
    id: "lexical-a",
    topic: "Scope",
    title: "lexical scope and block shadowing",
    prompt: "What is logged?",
    code: `let a = 10;
function test() { console.log(a); }
{
  let a = 20;
  test();
}`,
    expected: "10",
    explanation:
      "LEXICAL vs BLOCK SCOPE:\n1. test() is DEFINED at outer level (where a = 10)\n2. test() closes over outer scope\n3. Block creates new scope with let a = 20\n\nEXECUTION PHASE:\n1. test() is called INSIDE the block\n2. test() looks for 'a' in ITS closure (outer level)\n3. Finds outer 'a' = 10 (not block's a = 20)\n4. Logs \"10\"\n\n📌 KEY: LEXICAL scope is where function is DEFINED, not where it's CALLED. Block scope doesn't affect lexical closure.",
  },
  {
    id: "block-vs-var",
    topic: "Scope",
    title: "block let does not affect var",
    prompt: "What is logged?",
    code: `var a = 10;
{ let a = 20; }
console.log(a);`,
    expected: "10",
    explanation:
      "SCOPE ISOLATION:\n1. var a = 10 at global level\n2. Inside block: let a = 20 (block scope only)\n3. Block scope ends\n\nEXECUTION PHASE:\n1. var a = 10 is set globally\n2. Block executes, let a = 20 creates block binding\n3. Block ends: block scope is destroyed\n4. console.log(a) looks for 'a' globally\n5. Finds global var a = 10\n6. Logs \"10\"\n\n📌 KEY: Block scope (let/const) is temporary. Variables disappear when block ends. var remains global.",
  },
  {
    id: "function-hoist-wins",
    topic: "Hoisting",
    title: "function hoisting wins at log time",
    prompt: "What is logged?",
    code: `console.log(foo);
function foo() {}
var foo = 1;`,
    expected: "[Function: foo]",
    explanation:
      "EXECUTION TIMING:\n1. Functions are hoisted FIRST\n2. var declarations are hoisted SECOND (but foo already exists)\n\nEXECUTION PHASE:\n1. console.log(foo) prints current value of foo\n2. At this point, foo is the hoisted function\n3. var assignment hasn't run yet\n4. Logs \"[Function: foo]\"\n\n📌 KEY: Hoisting order: functions first, then var, then let/const. At log time, function hasn't been overwritten yet.",
  },
  {
    id: "named-fn-outside",
    topic: "Functions",
    title: "named function expression scope",
    prompt: "What is logged?",
    code: `var foo = function bar() {};
console.log(typeof bar);`,
    expected: "undefined",
    explanation:
      "FUNCTION EXPRESSION NAMING:\n1. foo = function bar() {} is a named function expression\n2. 'bar' is the NAME, only accessible INSIDE the function\n3. Global scope: 'bar' doesn't exist\n\nEXECUTION PHASE:\n1. Assignment creates function and assigns to foo\n2. console.log(typeof bar) checks global bar\n3. bar is not defined globally\n4. typeof bar → typeof undefined → \"undefined\"\n5. Logs \"undefined\"\n\n📌 KEY: Named function expression names are like local variables inside their own function. Outside is unreachable.",
  },
  {
    id: "global-closure",
    topic: "Closures",
    title: "global closure capture",
    prompt: "What is logged?",
    code: `function foo() { console.log(a); }
var a = 10;
(function() {
  var a = 20;
  foo();
})();`,
    expected: "10",
    explanation:
      "CLOSURE SCOPE CHAIN:\n1. foo is DEFINED at global scope\n2. foo closes over GLOBAL scope (a = 10)\n3. IIFE creates its own scope (a = 20)\n4. foo is CALLED inside IIFE\n\nEXECUTION PHASE:\n1. Global a = 10\n2. IIFE executes\n3. Local a = 20 inside IIFE\n4. foo() is called\n5. foo looks for 'a' in ITS closure (global)\n6. Finds global a = 10 (not IIFE's a = 20)\n7. Logs \"10\"\n\n📌 KEY: Closures capture DEFINITION scope, not CALL scope. Where foo is defined determines which 'a' it sees.",
  },
  {
    id: "strict-this",
    topic: "this",
    title: "strict mode this",
    prompt: "What is logged?",
    code: `function foo() { console.log(this.a); }
var a = 10;
foo();`,
    expected: "10",
    explanation:
      "NON-STRICT THIS BINDING:\n1. Regular function call (plain call, no receiver)\n2. In non-strict mode, plain calls use global object as 'this'\n3. Global a = 10\n\nEXECUTION PHASE:\n1. foo() is called (no receiver like obj.foo())\n2. this = global object (browser: window, Node: global)\n3. this.a = global.a = 10\n4. Logs \"10\"\n\n📌 KEY: Non-strict mode is forgiving. Plain function calls get global 'this'. Modern code should use strict mode.",
  },
  {
    id: "strict-undefined-this",
    topic: "this",
    title: "strict mode regular call",
    prompt: "What is logged?",
    code: `"use strict";
function foo() { console.log(this); }
foo();`,
    expected: "undefined",
    explanation:
      "STRICT MODE THIS BINDING:\n1. 'use strict' activates strict mode\n2. In strict mode, plain function calls get undefined as 'this'\n3. No automatic global fallback\n\nEXECUTION PHASE:\n1. \"use strict\" is set\n2. foo() is called (plain call)\n3. this = undefined (strict mode enforces this)\n4. console.log(this) prints undefined\n5. Logs \"undefined\"\n\n📌 KEY: Strict mode is safer. 'this' is only bound when explicitly provided (method call, .call/.apply, constructor).",
  },
  {
    id: "let-fn-conflict",
    topic: "TDZ",
    title: "let and function conflict",
    prompt: "What happens?",
    code: `console.log(x);
let x = 10;
function x() {}`,
    expected: "ReferenceError",
    explanation:
      "LET BLOCKS FUNCTION HOISTING:\n1. let x is hoisted to TDZ\n2. function x() would create a binding\n3. But let x is already there → conflict!\n\nEXECUTION PHASE:\n1. console.log(x) tries to access x\n2. let x is in TDZ (hoisted but uninitialized)\n3. ReferenceError: Cannot access 'x' before initialization\n4. Function declaration doesn't matter (let won)\n\n📌 KEY: let/const declarations block function declarations with the same name. let/const have priority.",
  },
  {
    id: "if-function-typeof",
    topic: "Scope",
    title: "function in if condition",
    prompt: "What is logged?",
    code: `var a = 1;
if (function f(){}) { a += typeof f; }
console.log(a);`,
    expected: "1undefined",
    explanation:
      'FUNCTION EXPRESSION IN CONDITION:\n1. (function f(){}) is a function EXPRESSION (not declaration)\n2. f is NOT available in outer scope\n3. The condition is truthy (function exists)\n\nEXECUTION PHASE:\n1. if (function f(){}) → condition is truthy\n2. Block executes\n3. a += typeof f\n4. typeof f in outer scope → f doesn\'t exist → "undefined"\n5. a = 1 + "undefined" = "1undefined" (number + string concatenation)\n6. console.log(a) logs "1undefined"\n\n📌 KEY: Function expressions in conditions don\'t create usable names in outer scope. They\'re expressions, not declarations.',
  },
  {
    id: "return-bar",
    topic: "Functions",
    title: "return a hoisted inner function",
    prompt: "What is logged?",
    code: `function foo() {
  return bar;
  var bar = 10;
  function bar() {}
}
console.log(typeof foo());`,
    expected: "function",
    explanation:
      'HOISTING INSIDE FUNCTION:\n1. Inside foo, function bar() is fully hoisted\n2. var bar is also hoisted but ignored (bar already exists)\n3. return statement comes before var assignment\n\nEXECUTION PHASE:\n1. foo() is called\n2. return bar executes\n3. bar is the hoisted function (not yet assigned 10)\n4. foo returns the function\n5. typeof function → "function"\n6. Logs "function"\n\n📌 KEY: Function declarations are hoisted above statements. Return gets the function, not the later value.',
  },
  {
    id: "let-tdz-inner",
    topic: "TDZ",
    title: "TDZ inside function",
    prompt: "What happens?",
    code: `var a = 1;
function foo() {
  console.log(a);
  let a = 2;
}
foo();`,
    expected: "ReferenceError",
    explanation:
      "LOCAL LET CREATES TDZ:\n1. Global var a = 1\n2. Inside foo, let a = 2 creates LOCAL binding\n3. This local binding shadows global and enters TDZ\n\nEXECUTION PHASE:\n1. foo() is called\n2. console.log(a) looks for 'a'\n3. Finds LOCAL let a (in TDZ, not global)\n4. ReferenceError: Cannot access 'a' before initialization\n5. Global a = 1 is unreachable (shadowed)\n\n📌 KEY: let/const declarations shadow outer scope completely, even when in TDZ. TDZ prevents access to any version.",
  },
  {
    id: "function-a-overshadows-var",
    topic: "Hoisting",
    title: "function inside function shadows var",
    prompt: "What is logged?",
    code: `var a = 1;
function foo() {
  console.log(a);
  var a = 2;
  function a() {}
}
foo();`,
    expected: "[Function: a]",
    explanation:
      "HOISTING PRECEDENCE INSIDE FUNCTION:\n1. Inside foo, function a() is fully hoisted FIRST\n2. var a is hoisted SECOND, but 'a' already exists (ignored)\n3. Both use the same identifier\n\nEXECUTION PHASE:\n1. foo() is called\n2. console.log(a) logs the hoisted value\n3. 'a' is the hoisted function (function declaration wins)\n4. Logs \"[Function: a]\"\n5. var a = 2 overwrites later (after the log)\n\n📌 KEY: Inside a function, hoisting order: functions FIRST, then var. Function wins the identifier.",
  },
  {
    id: "arrow-vs-regular",
    topic: "Functions",
    title: "arrow function vs regular function",
    prompt: "What is logged?",
    code: `var name = "Global";
const obj = {
  name: "Object",
  regular: function() { return this.name; },
  arrow: () => this.name
};
console.log(obj.regular());
console.log(obj.arrow());`,
    expected: "Object\nundefined",
    explanation:
      'THIS BINDING DIFFERENCES:\n1. Regular function: this = obj (method call)\n2. Arrow function: this = lexical scope (global, undefined in strict mode)\n\nEXECUTION PHASE:\n1. obj.regular() → this = obj → returns "Object"\n2. obj.arrow() → arrow inherits this from global → undefined\n3. Logs "Object\\nundefined"\n\n📌 KEY: Arrow functions don\'t have their own \'this\'. They inherit from lexical scope.',
  },
  {
    id: "default-params-hoist",
    topic: "Functions",
    title: "default parameters and TDZ",
    prompt: "What happens when foo() is called?",
    code: `function foo(a = b, b = 5) {
  return a + b;
}
console.log(foo());`,
    expected: "ReferenceError",
    explanation:
      "DEFAULT PARAMETERS TDZ:\n1. Default parameters are evaluated left-to-right\n2. When evaluating a = b, parameter b is still in TDZ (not initialized)\n3. Accessing b in TDZ throws ReferenceError\n\nEXECUTION PHASE:\n1. foo() called with no arguments\n2. Parameter evaluation: a = b (b is in TDZ) → ReferenceError\n3. Function never executes\n\n📌 KEY: Default parameters create TDZ for subsequent parameters. You cannot reference a later parameter in an earlier parameter's default value.",
  },
  {
    id: "destructuring-hoist",
    topic: "Scope",
    title: "destructuring and hoisting",
    prompt: "What is logged?",
    code: `let { a, b } = { a: 1, b: 2 };
console.log(a);
{
  let { a } = { a: 3 };
  console.log(a);
}
console.log(a);`,
    expected: "1\n3\n1",
    explanation:
      'DESTRUCTURING SCOPE:\n1. Outer destructuring: a=1, b=2\n2. Block creates new scope\n3. Inner destructuring: a=3 (shadows outer)\n4. Block ends, inner a disappears\n\nEXECUTION PHASE:\n1. console.log(a) → outer a=1 → logs "1"\n2. Block: let { a } = { a: 3 } → inner a=3\n3. console.log(a) → inner a=3 → logs "3"\n4. Block ends\n5. console.log(a) → outer a=1 → logs "1"\n\n📌 KEY: Destructuring creates block-scoped variables. Inner destructuring shadows outer.',
  },
  {
    id: "template-literal-hoist",
    topic: "Scope",
    title: "template literals with hoisting",
    prompt: "What is logged?",
    code: `console.log(\`\${a}\`);
var a = "Hello";`,
    expected: "undefined",
    explanation:
      'TEMPLATE LITERAL EVALUATION:\n1. Template literals are expressions, evaluated at runtime\n2. var a is hoisted but undefined at log time\n\nEXECUTION PHASE:\n1. console.log(\`\${a}\`) → a is undefined → logs "undefined"\n2. a = "Hello" executes after\n\n📌 KEY: Template literals don\'t change hoisting. They\'re just string interpolation.',
  },
  {
    id: "generator-hoist",
    topic: "Functions",
    title: "generator function hoisting",
    prompt: "What is logged?",
    code: `console.log(typeof foo);
function* foo() {}`,
    expected: "function",
    explanation:
      'GENERATOR HOISTING:\n1. function* declarations are hoisted like regular functions\n2. They create function objects\n\nEXECUTION PHASE:\n1. console.log(typeof foo) → foo is hoisted function → "function"\n\n📌 KEY: Generator functions (*) are hoisted the same as regular function declarations.',
  },
  {
    id: "class-constructor-hoist",
    topic: "Classes",
    title: "class constructor field hoisting",
    prompt: "What is logged?",
    code: `class Person {
  constructor(name) {
    this.name = name;
    console.log(this.age);
  }
  age = 25;
}
new Person("John");`,
    expected: "undefined",
    explanation:
      'CLASS FIELD TIMING:\n1. Constructor runs first\n2. this.name = "John" executes\n3. console.log(this.age) → age field not initialized yet → undefined\n4. After constructor, age = 25 is assigned\n\n📌 KEY: Class fields are initialized after constructor body, not before.',
  },
  {
    id: "strict-mode-var",
    topic: "Scope",
    title: "strict mode and var hoisting",
    prompt: "What happens?",
    code: `"use strict";
console.log(a);
var a = 5;`,
    expected: "undefined",
    explanation:
      "STRICT MODE HOISTING:\n1. Strict mode doesn't change hoisting behavior\n2. var a is still hoisted and initialized to undefined\n\nEXECUTION PHASE:\n1. console.log(a) → a is undefined → logs \"undefined\"\n2. a = 5 executes\n\n📌 KEY: Strict mode affects 'this' and some errors, but not hoisting.",
  },
  {
    id: "const-reassign",
    topic: "TDZ",
    title: "const reassignment attempt",
    prompt: "What happens?",
    code: `const a = 10;
a = 20;`,
    expected: "TypeError",
    explanation:
      "CONST IMMUTABILITY:\n1. const creates immutable binding\n2. Assignment after declaration throws TypeError\n\nEXECUTION PHASE:\n1. const a = 10 → binding created\n2. a = 20 → TypeError: Assignment to constant variable\n\n📌 KEY: const bindings cannot be reassigned after initialization.",
  },
  {
    id: "let-redeclare",
    topic: "TDZ",
    title: "let redeclaration in same scope",
    prompt: "What happens?",
    code: `let a = 10;
let a = 20;`,
    expected: "SyntaxError",
    explanation:
      "LET REDECLARATION:\n1. let doesn't allow redeclaration in same scope\n2. This is a SyntaxError (parse time)\n\nRESULT:\n- SyntaxError: Identifier 'a' has already been declared\n- Code doesn't run\n\n📌 KEY: let/const don't allow redeclaration in the same scope (unlike var).",
  },
  {
    id: "closure-complex",
    topic: "Closures",
    title: "complex closure with IIFE",
    prompt: "What is logged?",
    code: `(function() {
  var a = 10;
  function inner() {
    console.log(a);
  }
  return inner;
})()();`,
    expected: "10",
    explanation:
      'CLOSURE CAPTURE:\n1. IIFE creates scope with a = 10\n2. inner() closes over IIFE\'s scope\n3. IIFE returns inner, then () calls it\n\nEXECUTION PHASE:\n1. IIFE executes, a = 10\n2. inner is returned (with closure)\n3. () calls inner → inner looks for a in closure → finds 10\n4. Logs "10"\n\n📌 KEY: Closures capture the entire scope chain where the function was defined.',
  },
  {
    id: "async-await-hoist",
    topic: "Async",
    title: "async/await with hoisting",
    prompt: "What are the logs?",
    code: `async function test() {
  console.log(a);
  var a = await Promise.resolve(10);
  console.log(a);
}
test();`,
    expected: "undefined\n10",
    explanation:
      'ASYNC HOISTING:\n1. var a hoisted to undefined\n2. await pauses execution\n\nEXECUTION PHASE:\n1. console.log(a) → undefined → logs "undefined"\n2. a = await Promise.resolve(10) → pauses\n3. Promise resolves, a = 10\n4. console.log(a) → 10 → logs "10"\n\n📌 KEY: await doesn\'t change hoisting. var is still hoisted.',
  },
  {
    id: "module-hoist",
    topic: "Scope",
    title: "module scope hoisting",
    prompt: "What is logged? (assuming ES modules)",
    code: `console.log(typeof foo);
export function foo() {}`,
    expected: "function",
    explanation:
      'MODULE HOISTING:\n1. In ES modules, function declarations are hoisted\n2. Available before execution\n\nEXECUTION PHASE:\n1. console.log(typeof foo) → foo is hoisted → "function"\n\n📌 KEY: ES modules have hoisting for function declarations.',
  },
  {
    id: "try-catch-hoist",
    topic: "Scope",
    title: "try-catch block hoisting",
    prompt: "What is logged?",
    code: `try {
  console.log(a);
  let a = 5;
} catch (e) {
  console.log(e.name);
}`,
    expected: "ReferenceError",
    explanation:
      'BLOCK SCOPE IN TRY:\n1. let a is in TDZ for the try block\n2. console.log(a) throws ReferenceError\n3. catch catches it\n\nEXECUTION PHASE:\n1. console.log(a) → TDZ → ReferenceError\n2. catch(e) → e.name = "ReferenceError" → logs "ReferenceError"\n\n📌 KEY: TDZ applies to block scopes, including try blocks.',
  },
  {
    id: "for-loop-let",
    topic: "Closures",
    title: "for loop with let and function",
    prompt: "What is logged?",
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(function() { console.log(i); }, 0);
}`,
    expected: "0\n1\n2",
    explanation:
      "LET IN FOR LOOP:\n1. let i creates per-iteration binding\n2. Each setTimeout gets its own i value\n\nEXECUTION PHASE:\n1. Iteration 0: i=0, callback captures i=0\n2. Iteration 1: i=1, callback captures i=1\n3. Iteration 2: i=2, callback captures i=2\n4. Callbacks execute: 0, 1, 2\n\n📌 KEY: let in for loops creates fresh bindings each iteration.",
  },
  {
    id: "object-method-arrow",
    topic: "this",
    title: "object method with arrow function",
    prompt: "What is logged?",
    code: `const obj = {
  name: "Test",
  method: function() {
    return () => this.name;
  }
};
const arrow = obj.method();
console.log(arrow());`,
    expected: "Test",
    explanation:
      'ARROW IN METHOD:\n1. obj.method() returns an arrow function\n2. Arrow inherits this from method\'s scope (obj)\n3. arrow() calls the arrow → this = obj\n\nEXECUTION PHASE:\n1. const arrow = obj.method() → arrow function returned\n2. arrow() → this = obj (inherited) → "Test"\n3. Logs "Test"\n\n📌 KEY: Arrow functions in methods inherit this from the method\'s lexical scope.',
  },
];

export const outputQuestions = rawOutputQuestions.map((question) => ({
  ...question,
  type: "output",
}));
