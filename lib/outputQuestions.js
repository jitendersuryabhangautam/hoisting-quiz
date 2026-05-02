const rawOutputQuestions = [
  {
    id: "hoist-var",
    type: "output",
    topic: "Hoisting",
    title: "var and undefined",
    prompt: "What does this code log?",
    code: "console.log(a);\nvar a = 5;",
    expected: "undefined",
    explanation:
      "HOISTING PHASE (before execution):\n1. JavaScript engine scans the code and 'hoists' var a → creates a binding with value undefined\n2. The assignment (a = 5) stays in place\n\nEXECUTION PHASE:\n1. console.log(a) runs → var a exists but is still undefined\n2. Then a = 5 is executed\n\n📌 KEY: var declarations are split — the declaration is hoisted and set to undefined, but the assignment stays at its original line.",
    options: ["5", "undefined", "null", "ReferenceError"],
  },
  {
    id: "tdz-let",
    type: "output",
    topic: "TDZ",
    title: "let before declaration",
    prompt: "What happens here?",
    code: "console.log(a);\nlet a = 5;",
    expected: "ReferenceError",
    explanation:
      "HOISTING PHASE:\n1. let a is hoisted BUT placed in 'Temporal Dead Zone' (TDZ)\n2. let bindings are NOT initialized to undefined (unlike var)\n\nEXECUTION PHASE:\n1. console.log(a) tries to access 'a' while it's in TDZ\n2. ReferenceError is thrown: 'Cannot access 'a' before initialization'\n3. Code stops here\n\n📌 KEY: let/const are 'hoisted' but unusable until their declaration line is reached. They stay in TDZ from scope start to declaration.",
    options: ["undefined", "5", "null", "ReferenceError"],
  },
  {
    id: "fn-hoist",
    type: "output",
    topic: "Functions",
    title: "function declarations",
    prompt: "What gets printed?",
    code: 'foo();\nfunction foo() {\n  console.log("Hello");\n}',
    expected: "Hello",
    explanation:
      "HOISTING PHASE (before any code runs):\n1. Function declarations are FULLY hoisted with their complete body\n2. foo() is available in memory with its full implementation\n\nEXECUTION PHASE:\n1. foo() is called — it's already there\n2.'Hello' is logged\n\n📌 KEY: Function declarations are special — the ENTIRE function (not just the name) is hoisted. You can call it before it appears in code.",
    options: ["Hello", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "fn-expr-var",
    type: "output",
    topic: "Functions",
    title: "function expression on var",
    prompt: "What happens when foo is called?",
    code: 'foo();\nvar foo = function() {\n  console.log("Hello");\n};',
    expected: "TypeError",
    explanation:
      "HOISTING PHASE:\n1. var foo is hoisted and initialized to undefined\n2. The function body is NOT hoisted (it's an expression, not a declaration)\n\nEXECUTION PHASE:\n1. foo() tries to call foo\n2. But foo is currently undefined\n3. TypeError: foo is not a function ❌\n\n📌 KEY: Function expressions are different from declarations. Only the var binding is hoisted (as undefined), not the function itself.",
    options: ["Hello", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "multi-var",
    type: "output",
    topic: "Hoisting",
    title: "multiple var assignments",
    prompt: "What are the two logs?",
    code: "console.log(a);\nvar a = 1;\nvar a = 2;\nconsole.log(a);",
    expected: "undefined\n2",
    explanation:
      'HOISTING PHASE:\n1. var a appears twice, but hoisting only creates ONE binding\n2. a is initialized to undefined\n\nEXECUTION PHASE:\n1. console.log(a) → a is undefined → logs "undefined"\n2. a = 1 → a is now 1\n3. a = 2 → a is now 2 (overwrites previous)\n4. console.log(a) → a is 2 → logs "2"\n\n📌 KEY: Multiple var declarations of the same name don\'t create multiple bindings. Only one binding exists, and assignments overwrite the previous value.',
    options: ["undefined, 2", "1, 2", "undefined, 1", "1, 1"],
  },
  {
    id: "loop-var-timeout",
    type: "output",
    topic: "Closures",
    title: "var in a loop",
    prompt: "What do the timeouts print?",
    code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    expected: "3\n3\n3",
    explanation:
      "SCOPE ISSUE:\n1. var i is FUNCTION-SCOPED (not block-scoped)\n2. The var i hoisting brings it to the function level — only ONE i binding\n\nEXECUTION PHASE:\n1. Loop runs: i=0, i=1, i=2\n2. Each iteration schedules a callback with setTimeout\n3. Loop finishes: i=3 (from i++ when condition became false)\n4. Callbacks execute: they all close over the SAME i binding\n5. i is now 3, so all callbacks log 3\n\n📌 KEY: var is function-scoped. All callbacks share ONE i binding. By the time they run asynchronously, i has already reached 3.",
    options: [
      "0\n1\n2",
      "3\n3\n3",
      "undefined\nundefined\nundefined",
      "0\n0\n0",
    ],
  },
  {
    id: "loop-let-timeout",
    type: "output",
    topic: "Closures",
    title: "let in a loop",
    prompt: "What do the timeouts print?",
    code: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    expected: "0\n1\n2",
    explanation:
      "SCOPE DIFFERENCE:\n1. let i is BLOCK-SCOPED\n2. JavaScript creates a NEW binding for each iteration\n3. Each callback captures its OWN i value\n\nEXECUTION PHASE:\n1. Iteration 0: new i binding = 0, callback scheduled → captures i=0\n2. Iteration 1: new i binding = 1, callback scheduled → captures i=1\n3. Iteration 2: new i binding = 2, callback scheduled → captures i=2\n4. Callbacks execute: each has its own i value\n5. Logs: 0, 1, 2\n\n📌 KEY: let creates a per-iteration binding. Each callback closes over its own i. This is the major difference between var and let in loops.",
    options: [
      "0\n1\n2",
      "3\n3\n3",
      "undefined\nundefined\nundefined",
      "0\n0\n0",
    ],
  },
  {
    id: "function-scope-var",
    type: "output",
    topic: "Scope",
    title: "function scope hoisting",
    prompt: "What is logged?",
    code: "function test() {\n  console.log(a);\n  var a = 10;\n}\ntest();",
    expected: "undefined",
    explanation:
      'HOISTING PHASE:\n1. Function test is hoisted (fully)\n2. Inside test, var a is hoisted to the TOP of the function\n\nEXECUTION PHASE:\n1. test() is called\n2. Inside test, console.log(a) runs\n3. a exists (hoisted) but is undefined\n4. Logs "undefined"\n5. Then a = 10 is executed\n\n📌 KEY: Hoisting happens at FUNCTION SCOPE. Variables are hoisted to the top of their containing function, not the global scope.',
    options: ["10", "undefined", "ReferenceError", "null"],
  },
  {
    id: "shadowed-var",
    type: "output",
    topic: "Scope",
    title: "shadowed var",
    prompt: "What is logged?",
    code: "var x = 10;\nfunction foo() {\n  console.log(x);\n  var x = 20;\n}\nfoo();\nconsole.log(x);",
    expected: "undefined\n10",
    explanation:
      'HOISTING PHASE:\n1. Global var x = 10 is hoisted\n2. Inside foo, a LOCAL var x is also hoisted (shadows global x)\n\nEXECUTION PHASE:\n1. foo() is called\n2. console.log(x) looks for x: finds the LOCAL x (hoisted, undefined)\n3. Logs "undefined"\n4. x = 20 assigns to the local x\n5. Function ends\n6. console.log(x) looks for x: finds the GLOBAL x (still 10)\n7. Logs "10"\n\n📌 KEY: Local scope shadows outer scope. The function\'s own hoisted var x blocks access to the global x until inside the function scope.',
    options: ["10\n10", "undefined\n10", "20\n20", "undefined\nundefined"],
  },
  {
    id: "inner-shadow",
    type: "output",
    topic: "Scope",
    title: "nested scope shadowing",
    prompt: "What is logged by inner?",
    code: "function outer() {\n  var a = 10;\n  function inner() {\n    console.log(a);\n    var a = 20;\n  }\n  inner();\n}\nouter();",
    expected: "undefined",
    explanation:
      "HOISTING PHASE:\n1. outer and inner are hoisted as full functions\n2. Inside inner, var a is hoisted to the top of inner's scope\n\nEXECUTION PHASE:\n1. outer() is called\n2. var a = 10 is executed (outer's a)\n3. inner() is called\n4. console.log(a) inside inner: finds the LOCAL a (hoisted, undefined)\n5. Logs \"undefined\"\n6. a = 20 assigns to locally scoped a\n\n📌 KEY: Even though outer has a = 10, inner's local var a shadows it completely. The local undefined binding wins.",
    options: ["10", "20", "undefined", "ReferenceError"],
  },
  {
    id: "function-before-var",
    type: "output",
    topic: "Hoisting",
    title: "function beats var initially",
    prompt: "What are the logs?",
    code: "console.log(foo);\nfunction foo() {}\nvar foo = 10;\nconsole.log(foo);",
    expected: "[Function: foo]\n10",
    explanation:
      'HOISTING PHASE:\n1. function foo() {} is fully hoisted — foo becomes a function object\n2. var foo is hoisted, but foo is already a function, so the declaration is ignored\n\nEXECUTION PHASE:\n1. console.log(foo) → foo is the function object → logs "[Function: foo]"\n2. foo = 10 → ASSIGNMENT overwrites foo with the number 10\n3. console.log(foo) → foo is now 10 → logs "10"\n\n📌 KEY: Functions are hoisted BEFORE var declarations. Assignments always overwrite any previous binding.',
    options: [
      "undefined, 10",
      "[Function: foo], 10",
      "[Function: foo], [Function: foo]",
      "10, 10",
    ],
  },
  {
    id: "var-overwrites-function",
    type: "output",
    topic: "Hoisting",
    title: "var overwrites function value",
    prompt: "What is logged?",
    code: "var foo = 10;\nfunction foo() { return 20; }\nconsole.log(foo);",
    expected: "10",
    explanation:
      'HOISTING PHASE:\n1. function foo() {} is fully hoisted\n2. var foo is hoisted (but foo already exists, so ignored)\n\nEXECUTION PHASE:\n1. foo = 10 → ASSIGNMENT happens, overwrites the function\n2. console.log(foo) → foo is 10 → logs "10"\n\n📌 KEY: Hoisting order matters! Functions are hoisted first, but runtime assignments always win. foo ends up as 10, not the function.',
    options: ["10", "20", "[Function: foo]", "undefined"],
  },
  {
    id: "named-fn-expression",
    type: "output",
    topic: "Functions",
    title: "named function expression",
    prompt: "What does this print?",
    code: "var foo = function bar() {\n  console.log(typeof bar);\n};\nfoo();\nconsole.log(typeof bar);",
    expected: "function\nundefined",
    explanation:
      "FUNCTION EXPRESSION SCOPE:\n1. The name 'bar' is special: it's ONLY available INSIDE the function body\n2. Outside the function, bar does NOT exist in any scope\n\nEXECUTION PHASE:\n1. foo() is called\n2. Inside the function: console.log(typeof bar) → bar exists → logs \"function\"\n3. After foo() returns\n4. console.log(typeof bar) → bar is NOT in global scope → logs \"undefined\"\n\n📌 KEY: Named function expressions create a hidden inner binding. The name is useful for recursion but doesn't pollute outer scope.",
    options: [
      "function\nfunction",
      "function\nundefined",
      "undefined\nundefined",
      "ReferenceError",
    ],
  },
  {
    id: "method-this",
    type: "output",
    topic: "this",
    title: "method call binding",
    prompt: "What does this print?",
    code: 'const user = {\n  name: "Vijay",\n  getName: function() { return this.name; }\n};\nconsole.log(user.getName());',
    expected: "Vijay",
    explanation:
      'THIS BINDING (method call):\n1. user.getName() is a METHOD CALL (dot notation)\n2. When a function is called as a method, \'this\' points to the object BEFORE the dot\n\nEXECUTION PHASE:\n1. user.getName() is called\n2. this = user (the object before the dot)\n3. return this.name = return user.name = return "Vijay"\n4. Logs "Vijay"\n\n📌 KEY: THIS is determined by HOW you call the function. Method call (obj.method()) → this = obj.',
    options: ["Vijay", "undefined", "null", "ReferenceError"],
  },
  {
    id: "inner-this-regular",
    type: "output",
    topic: "this",
    title: "regular inner function",
    prompt: "What does this print?",
    code: 'var name = "Global";\nconst user = {\n  name: "Vijay",\n  getName: function() {\n    function inner() { return this.name; }\n    return inner();\n  }\n};\nconsole.log(user.getName());',
    expected: "Global",
    explanation:
      'THIS BINDING (regular function):\n1. Inner is NOT called as a method or with a receiver\n2. inner() is a plain function call (no dot notation)\n3. In non-strict mode, plain function calls use the GLOBAL object\n\nEXECUTION PHASE:\n1. user.getName() is called → this = user\n2. Inside: inner() is called (plain, no receiver)\n3. this in inner = global object (not user!)\n4. return this.name = return global.name = return "Global"\n5. Logs "Global"\n\n📌 KEY: THIS is lost in nested regular functions. Even inside a method, a plain function call gets global this (or undefined in strict mode).',
    options: ["Vijay", "Global", "undefined", "ReferenceError"],
  },
  {
    id: "inner-this-arrow",
    type: "output",
    topic: "this",
    title: "arrow inherits this",
    prompt: "What does this print?",
    code: 'var name = "Global";\nconst user = {\n  name: "Vijay",\n  getName: function() {\n    const inner = () => this.name;\n    return inner();\n  }\n};\nconsole.log(user.getName());',
    expected: "Vijay",
    explanation:
      "THIS BINDING (arrow function):\n1. Arrow functions DON'T create their own 'this'\n2. They INHERIT 'this' from the surrounding LEXICAL scope\n3. Here, the surrounding scope is the getName method\n\nEXECUTION PHASE:\n1. user.getName() is called → this = user\n2. Inside: const inner = () => { } → arrow function inherits this from getName\n3. inner() is called → this is still user (inherited)\n4. return this.name = return user.name = return \"Vijay\"\n5. Logs \"Vijay\"\n\n📌 KEY: Arrow functions capture 'this' lexically. No matter how you call an arrow function, 'this' stays the same.",
    options: ["Vijay", "Global", "undefined", "ReferenceError"],
  },
  {
    id: "method-extracted",
    type: "output",
    topic: "this",
    title: "extracted method",
    prompt: "What is logged?",
    code: "const obj = { a: 10, b: function() { console.log(this.a); } };\nvar fn = obj.b;\nfn();",
    expected: "undefined",
    explanation:
      "THIS BINDING (lost binding):\n1. obj.b is extracted into fn\n2. fn is now a standalone function (no receiver)\n3. When fn() is called, it's a plain function call\n4. In non-strict mode, this = global object\n\nEXECUTION PHASE:\n1. var fn = obj.b → fn reference to the method\n2. fn() is called (plain call, no obj. prefix)\n3. this = global object\n4. this.a = global.a = undefined (doesn't exist globally)\n5. Logs \"undefined\"\n\n📌 KEY: 'this' is bound at CALL TIME, not definition time. Extracting a method loses the binding context.",
    options: ["10", "undefined", "null", "ReferenceError"],
  },
  {
    id: "class-before",
    type: "output",
    topic: "Classes",
    title: "class before declaration",
    prompt: "What happens?",
    code: "const obj = new Person();\nclass Person {}",
    expected: "ReferenceError",
    explanation:
      "CLASS HOISTING (special behavior):\n1. Classes ARE hoisted, but they enter TDZ (like let/const)\n2. Classes are NOT initialized to anything\n3. Accessing a class in TDZ throws ReferenceError\n\nEXECUTION PHASE:\n1. const obj = new Person() tries to use Person\n2. Person is in TDZ (hoisted but uninitialized)\n3. ReferenceError: Cannot access 'Person' before initialization\n\n📌 KEY: Classes behave like let/const (block-scoped, TDZ). They're hoisted but not usable before their declaration line.",
    options: ["ReferenceError", "TypeError", "undefined", "{}"],
  },
  {
    id: "class-field-timing",
    type: "output",
    topic: "Classes",
    title: "class field initialization",
    prompt: "What is printed?",
    code: 'class Person {\n  constructor() { console.log(this.name); }\n  name = "Vijay";\n}\nnew Person();',
    expected: "undefined",
    explanation:
      'CLASS FIELD TIMING:\n1. Constructor runs FIRST\n2. Class fields are initialized AFTER constructor body completes\n3. Inside constructor, fields are still undefined\n\nEXECUTION PHASE:\n1. new Person() creates an instance\n2. Constructor runs immediately\n3. console.log(this.name) → name field not initialized yet → undefined\n4. Logs "undefined"\n5. After constructor, name = "Vijay" is assigned\n\n📌 KEY: Constructor runs before field initialization. This differs from assignment in the constructor.',
    options: ["Vijay", "undefined", "null", "ReferenceError"],
  },
  {
    id: "typeof-class",
    type: "output",
    topic: "Classes",
    title: "typeof class in TDZ",
    prompt: "What happens?",
    code: "console.log(typeof Person);\nclass Person {}",
    expected: "ReferenceError",
    explanation:
      "TYPEOF AND TDZ:\n1. typeof usually safely returns \"undefined\" for undeclared variables\n2. BUT for let/const/class in TDZ, typeof still throws ReferenceError\n3. Classes are in TDZ before declaration\n\nEXECUTION PHASE:\n1. console.log(typeof Person) tries to access Person\n2. Person is in TDZ (not just undeclared)\n3. ReferenceError: Cannot access 'Person' before initialization\n4. typeof does NOT protect you from TDZ!\n\n📌 KEY: TDZ is stricter than undeclared variables. Even typeof cannot bypass TDZ safely.",
    options: ["ReferenceError", '"undefined"', '"function"', '"object"'],
  },
  {
    id: "class-redeclare",
    type: "output",
    topic: "Classes",
    title: "class redeclaration",
    prompt: "What happens here?",
    code: "function Person() {}\nclass Person {}",
    expected: "SyntaxError",
    explanation:
      "IDENTIFIER CONFLICTS:\n1. You cannot use the same identifier in the same scope with different declaration types when one is a class\n2. Class declarations are block-scoped (like let/const)\n3. This is a SyntaxError (caught before execution)\n\nRESULT:\n- SyntaxError: Identifier 'Person' has already been declared\n- Code doesn't even run\n\n📌 KEY: Classes reserve their identifier at parse time. Duplicate identifiers are syntax errors.",
    options: ["SyntaxError", "ReferenceError", "TypeError", "undefined"],
  },
  {
    id: "var-prototype",
    type: "output",
    topic: "Hoisting",
    title: "var on prototype access",
    prompt: "What happens?",
    code: "console.log(Person.prototype);\nvar Person = function() {};",
    expected: "TypeError",
    explanation:
      "HOISTING + PROPERTY ACCESS:\n1. var Person is hoisted to undefined\n2. Trying to access .prototype on undefined throws TypeError\n3. Assignment hasn't run yet\n\nEXECUTION PHASE:\n1. console.log(Person.prototype) tries to read prototype\n2. Person exists (hoisted) but is undefined\n3. undefined.prototype → TypeError: Cannot read property 'prototype' of undefined\n\n📌 KEY: Property access on undefined or null always throws TypeError. Hoisting puts the binding there, but with undefined value.",
    options: ["TypeError", "undefined", "null", "ReferenceError"],
  },
  {
    id: "function-prototype",
    type: "output",
    topic: "Functions",
    title: "function prototype",
    prompt: "What is logged?",
    code: "function Person() {}\nconsole.log(Person.prototype);",
    expected: "[object Object]",
    explanation:
      'FUNCTION PROTOTYPE:\n1. Every function automatically has a .prototype property\n2. This property is an object (used for inheritance)\n3. For a simple function, prototype is an empty object\n\nEXECUTION PHASE:\n1. function Person() {} is fully hoisted\n2. console.log(Person.prototype) reads the auto-created prototype\n3. Logs "[Object Object]" (an object)\n\n📌 KEY: Functions inherit from Function.prototype and have their own .prototype property for constructor patterns.',
    options: ["[object Object]", "undefined", "null", "{}"],
  },
  {
    id: "block-let-shadow",
    type: "output",
    topic: "TDZ",
    title: "block scoped let",
    prompt: "What happens?",
    code: "let a = 10;\n{\n  console.log(a);\n  let a = 20;\n}",
    expected: "ReferenceError",
    explanation:
      "BLOCK SCOPE + TDZ:\n1. Outer 'let a = 10' creates a global binding\n2. Inside the block, 'let a = 20' creates a NEW binding\n3. This new binding SHADOWS the outer one\n4. But it's in TDZ until the declaration line\n\nEXECUTION PHASE:\n1. console.log(a) looks for 'a'\n2. Finds the local 'let a' (in TDZ, not initialized)\n3. ReferenceError: Cannot access 'a' before initialization\n4. The outer 'a' is unreachable due to shadowing\n\n📌 KEY: Shadowing happens before object is initialized. The inner binding blocks access to outer even though it's in TDZ.",
    options: ["10", "20", "ReferenceError", "undefined"],
  },
  {
    id: "block-const-access",
    type: "output",
    topic: "Scope",
    title: "block can see outer const",
    prompt: "What is logged?",
    code: "const a = 10;\n{\n  console.log(a);\n}",
    expected: "10",
    explanation:
      "SCOPE CHAIN:\n1. Block creates a new scope\n2. There's NO 'a' declared inside the block\n3. Scope chain: local block → outer global\n4. Finds 'a' in global scope\n\nEXECUTION PHASE:\n1. console.log(a) looks for 'a'\n2. Not in block scope → looks in parent scope\n3. Finds global const a = 10\n4. Logs \"10\"\n\n📌 KEY: Without shadowing, inner scopes can access outer scope variables. Scope chain is automatic.",
    options: ["10", "undefined", "ReferenceError", "null"],
  },
  {
    id: "block-tdz",
    type: "output",
    topic: "TDZ",
    title: "block TDZ access",
    prompt: "What happens?",
    code: "{\n  console.log(a);\n  let a = 5;\n}",
    expected: "ReferenceError",
    explanation:
      "BLOCK SCOPE + TDZ:\n1. Block starts: let a is hoisted to the block scope (in TDZ)\n2. No outer 'a' exists to fall back on\n3. Hoisting brings 'a' into the block, putting it in TDZ\n\nEXECUTION PHASE:\n1. console.log(a) tries to access 'a'\n2. 'a' exists in block scope but is in TDZ (uninitialized)\n3. ReferenceError: Cannot access 'a' before initialization\n\n📌 KEY: Hoisting puts the variable in TDZ for the entire block. TDZ starts at block beginning, not at var declaration position.",
    options: ["5", "undefined", "ReferenceError", "null"],
  },
  {
    id: "iife-shadow",
    type: "output",
    topic: "Scope",
    title: "IIFE shadowing",
    prompt: "What is logged?",
    code: "var a = 10;\n(function() {\n  console.log(a);\n  var a = 20;\n})();",
    expected: "undefined",
    explanation:
      "HOISTING INSIDE IIFE:\n1. Global var a = 10\n2. Inside IIFE, var a is hoisted to function top (undefined)\n3. This shadows the global 'a'\n\nEXECUTION PHASE:\n1. IIFE is executed\n2. console.log(a) looks for 'a'\n3. Finds local var a (hoisted, undefined)\n4. Logs \"undefined\"\n5. a = 20 then executes\n6. Global 'a' remains 10 (untouched)\n\n📌 KEY: Function scope overrides global scope. Local hoisting creates a shadow immediately.",
    options: ["10", "20", "undefined", "ReferenceError"],
  },
  {
    id: "iife-local-var",
    type: "output",
    topic: "Scope",
    title: "local var inside function",
    prompt: "What are the three logs?",
    code: "var a = 1;\nfunction foo() {\n  console.log(a);\n  a = 20;\n  console.log(a);\n  var a = 30;\n}\nfoo();\nconsole.log(a);",
    expected: "undefined\n20\n1",
    explanation:
      'SCOPE SEPARATION:\n1. Global var a = 1\n2. Inside foo, var a is hoisted (shadows global)\n\nEXECUTION PHASE:\n1. console.log(a) → local a (hoisted, undefined) → logs "undefined"\n2. a = 20 → assigns to LOCAL a\n3. console.log(a) → local a is now 20 → logs "20"\n4. var a = 30 → assigns to LOCAL a (already hoisted)\n5. Function ends\n6. console.log(a) → GLOBAL a (unchanged) → logs "1"\n\n📌 KEY: Local var completely shadows global. Assignments inside function don\'t affect outer scope.',
    options: ["1\n20\n30", "undefined\n20\n1", "undefined\n20\n30", "1\n20\n1"],
  },
  {
    id: "hoisted-call-chain",
    type: "output",
    topic: "Functions",
    title: "hoisted function chain",
    prompt: "What is logged?",
    code: 'console.log(foo());\nfunction foo() { return bar(); }\nfunction bar() { return "Hello"; }',
    expected: "Hello",
    explanation:
      'FULL HOISTING:\n1. Both function declarations are fully hoisted\n2. foo and bar are both available before any execution\n\nEXECUTION PHASE:\n1. console.log(foo()) calls foo\n2. foo() calls bar()\n3. bar() returns "Hello"\n4. Result bubbles back: foo returns "Hello"\n5. console.log prints "Hello"\n\n📌 KEY: Function declarations are hoisted completely. Chained function calls work fine when both are declared (in any order).',
    options: ['"Hello"', "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "closure-lexical",
    type: "output",
    topic: "Closures",
    title: "lexical scope closure",
    prompt: "What is logged?",
    code: "var x = 1;\nfunction foo() { console.log(x); }\nfunction bar() { var x = 2; foo(); }\nbar();",
    expected: "1",
    explanation:
      "LEXICAL vs DYNAMIC SCOPE:\n1. foo is DEFINED in global scope (where x = 1)\n2. foo closes over global scope, capturing x = 1\n3. bar creates its own local x = 2\n\nEXECUTION PHASE:\n1. bar() is called\n2. bar sets local x = 2\n3. bar calls foo()\n4. foo looks for 'x' in ITS closure (global, not bar's scope)\n5. Finds global x = 1 → logs \"1\"\n6. bar's x = 2 is ignored\n\n📌 KEY: LEXICAL scope is static (where defined). Functions don't use caller's scope, they use definition scope.",
    options: ["1", "2", "undefined", "ReferenceError"],
  },
  {
    id: "async-hoist",
    type: "output",
    topic: "Async",
    title: "async and hoisting",
    prompt: "What are the logs?",
    code: "async function test() {\n  console.log(a);\n  var a = 10;\n  await Promise.resolve();\n  console.log(a);\n}\ntest();",
    expected: "undefined\n10",
    explanation:
      'HOISTING IN ASYNC FUNCTION:\n1. var a is hoisted (like any function)\n2. Initialized to undefined\n3. await doesn\'t affect hoisting\n\nEXECUTION PHASE:\n1. test() is called\n2. console.log(a) → a is undefined (hoisted) → logs "undefined"\n3. a = 10 → assignment\n4. await Promise.resolve() → pauses, resumes\n5. console.log(a) → a is now 10 → logs "10"\n6. Function completes\n\n📌 KEY: Hoisting works the same in async functions. await doesn\'t change hoisting behavior.',
    options: ["10\n10", "undefined\n10", "ReferenceError", "10\nundefined"],
  },
  {
    id: "timeout-hoist",
    type: "output",
    topic: "Async",
    title: "timeout plus hoisting",
    prompt: "What are the logs?",
    code: "console.log(a);\nsetTimeout(() => console.log(a), 0);\nvar a = 5;",
    expected: "undefined\n5",
    explanation:
      'ASYNC CALLBACK TIMING:\n1. var a is hoisted globally, starts as undefined\n2. setTimeout schedules a callback (but doesn\'t run it yet)\n\nEXECUTION PHASE:\n1. console.log(a) → a is undefined (hoisted) → logs "undefined"\n2. setTimeout schedules callback (callback doesn\'t run yet)\n3. a = 5 → assignment\n4. Synchronous code done\n5. Event loop picks up setTimeout callback\n6. Callback runs: console.log(a) → a is 5 → logs "5"\n\n📌 KEY: Hoisting finishes before any async callbacks run. Callbacks execute AFTER all sync code.',
    options: ["5\n5", "undefined\n5", "5\nundefined", "undefined\nundefined"],
  },
  {
    id: "function-over-var-1",
    type: "output",
    topic: "Hoisting",
    title: "function and var interaction",
    prompt: "What are the logs?",
    code: "console.log(foo);\nvar foo = 1;\nfunction foo() { return 2; }\nconsole.log(foo);",
    expected: "[Function: foo]\n1",
    explanation:
      'HOISTING ORDER:\n1. function foo() {} is hoisted first (FULLY hoisted)\n2. var foo is hoisted second, but foo already exists, so ignored\n3. Both point to the same identifier\n\nEXECUTION PHASE:\n1. console.log(foo) → foo is the function → logs "[Function: foo]"\n2. foo = 1 → ASSIGNMENT overwrites function with number 1\n3. console.log(foo) → foo is 1 → logs "1"\n4. function foo() { } line is ignored (already executed at hoist time)\n\n📌 KEY: Functions are hoisted before var. Assignments always overwrite.',
    options: [
      "[Function: foo]\n2",
      "[Function: foo]\n1",
      "1\n[Function: foo]",
      "undefined\n1",
    ],
  },
  {
    id: "function-call-before-var",
    type: "output",
    topic: "Functions",
    title: "call hoisted function before var",
    prompt: "What does this log?",
    code: "console.log(foo());\nvar foo = 10;\nfunction foo() { return 20; }",
    expected: "20",
    explanation:
      'HOISTING + CALL:\n1. function foo() {} is fully hoisted\n2. var foo is ignored (identifier already exists)\n\nEXECUTION PHASE:\n1. console.log(foo()) calls foo\n2. foo is the function (hoisted) → returns 20\n3. console.log prints "20"\n4. var foo = 10 executes (overwrites foo, but AFTER the call)\n\n📌 KEY: Function call happens before var assignment in execution order. Function hoisting wins timing.',
    options: ["20", "10", "undefined", "TypeError"],
  },
  {
    id: "typeof-var",
    type: "output",
    topic: "Hoisting",
    title: "typeof a hoisted var",
    prompt: "What is logged?",
    code: "console.log(typeof foo);\nvar foo = function bar() {};",
    expected: "undefined",
    explanation:
      'HOISTING + TYPEOF:\n1. var foo is hoisted and initialized to undefined\n2. The function body is NOT hoisted (expression, not declaration)\n\nEXECUTION PHASE:\n1. console.log(typeof foo) evaluates typeof on foo\n2. foo exists (hoisted) but is undefined\n3. typeof undefined → returns string "undefined"\n4. Logs "undefined"\n5. Assignment (function value) hasn\'t run yet\n\n📌 KEY: typeof undefined returns the string "undefined". Hoisting creates the binding with undefined value.',
    options: ['"function"', '"undefined"', "ReferenceError", '"object"'],
  },
  {
    id: "iife-typeof",
    type: "output",
    topic: "Scope",
    title: "typeof inside IIFE",
    prompt: "What is logged?",
    code: "(function() {\n  console.log(typeof foo);\n  var foo = 10;\n})();",
    expected: "undefined",
    explanation:
      'HOISTING INSIDE IIFE:\n1. Inside IIFE, var foo is hoisted to function scope (undefined)\n2. typeof checks the hoisted binding\n\nEXECUTION PHASE:\n1. IIFE executes\n2. console.log(typeof foo) evaluates\n3. foo is hoisted but undefined inside IIFE scope\n4. typeof undefined → "undefined"\n5. Logs "undefined"\n\n📌 KEY: Hoisting happens at function scope. IIFE doesn\'t escape function-level hoisting.',
    options: ['"function"', '"undefined"', "ReferenceError", '"number"'],
  },
  {
    id: "iife-function",
    type: "output",
    topic: "Functions",
    title: "hoisted function inside IIFE",
    prompt: "What does this log?",
    code: "(function() {\n  console.log(foo());\n  function foo() { return 10; }\n})();",
    expected: "10",
    explanation:
      'FUNCTION HOISTING INSIDE IIFE:\n1. Inside IIFE, function foo() is fully hoisted\n2. Available before execution reaches the declaration\n\nEXECUTION PHASE:\n1. IIFE executes\n2. console.log(foo()) calls foo\n3. foo is hoisted function inside IIFE → returns 10\n4. Logs "10"\n\n📌 KEY: Function declarations are hoisted at any scope level. IIFE scopes don\'t prevent hoisting.',
    options: ["10", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "iife-fn-expr",
    type: "output",
    topic: "Functions",
    title: "function expression inside IIFE",
    prompt: "What happens?",
    code: "(function() {\n  console.log(foo());\n  var foo = function() { return 10; };\n})();",
    expected: "TypeError",
    explanation:
      "FUNCTION EXPRESSION VS DECLARATION:\n1. var foo is hoisted to IIFE scope (undefined)\n2. Function expression is NOT hoisted\n3. Assignment hasn't run yet\n\nEXECUTION PHASE:\n1. IIFE executes\n2. console.log(foo()) tries to call foo\n3. foo exists but is undefined\n4. undefined() → TypeError: foo is not a function\n\n📌 KEY: Function expressions require var/let/const + assignment. Hoisting only saves the binding.",
    options: ["10", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "lexical-a",
    type: "output",
    topic: "Scope",
    title: "lexical scope and block shadowing",
    prompt: "What is logged?",
    code: "let a = 10;\nfunction test() { console.log(a); }\n{\n  let a = 20;\n  test();\n}",
    expected: "10",
    explanation:
      "LEXICAL vs BLOCK SCOPE:\n1. test() is DEFINED at outer level (where a = 10)\n2. test() closes over outer scope\n3. Block creates new scope with let a = 20\n\nEXECUTION PHASE:\n1. test() is called INSIDE the block\n2. test() looks for 'a' in ITS closure (outer level)\n3. Finds outer 'a' = 10 (not block's a = 20)\n4. Logs \"10\"\n\n📌 KEY: LEXICAL scope is where function is DEFINED, not where it's CALLED. Block scope doesn't affect lexical closure.",
    options: ["10", "20", "undefined", "ReferenceError"],
  },
  {
    id: "block-vs-var",
    type: "output",
    topic: "Scope",
    title: "block let does not affect var",
    prompt: "What is logged?",
    code: "var a = 10;\n{ let a = 20; }\nconsole.log(a);",
    expected: "10",
    explanation:
      "SCOPE ISOLATION:\n1. var a = 10 at global level\n2. Inside block: let a = 20 (block scope only)\n3. Block scope ends\n\nEXECUTION PHASE:\n1. var a = 10 is set globally\n2. Block executes, let a = 20 creates block binding\n3. Block ends: block scope is destroyed\n4. console.log(a) looks for 'a' globally\n5. Finds global var a = 10\n6. Logs \"10\"\n\n📌 KEY: Block scope (let/const) is temporary. Variables disappear when block ends. var remains global.",
    options: ["10", "20", "undefined", "ReferenceError"],
  },
  {
    id: "function-hoist-wins",
    type: "output",
    topic: "Hoisting",
    title: "function hoisting wins at log time",
    prompt: "What is logged?",
    code: "console.log(foo);\nfunction foo() {}\nvar foo = 1;",
    expected: "[Function: foo]",
    explanation:
      "EXECUTION TIMING:\n1. Functions are hoisted FIRST\n2. var declarations are hoisted SECOND (but foo already exists)\n\nEXECUTION PHASE:\n1. console.log(foo) prints current value of foo\n2. At this point, foo is the hoisted function\n3. var assignment hasn't run yet\n4. Logs \"[Function: foo]\"\n\n📌 KEY: Hoisting order: functions first, then var, then let/const. At log time, function hasn't been overwritten yet.",
    options: ["[Function: foo]", "1", "undefined", "ReferenceError"],
  },
  {
    id: "named-fn-outside",
    type: "output",
    topic: "Functions",
    title: "named function expression scope",
    prompt: "What is logged?",
    code: "var foo = function bar() {};\nconsole.log(typeof bar);",
    expected: "undefined",
    explanation:
      "FUNCTION EXPRESSION NAMING:\n1. foo = function bar() {} is a named function expression\n2. 'bar' is the NAME, only accessible INSIDE the function\n3. Global scope: 'bar' doesn't exist\n\nEXECUTION PHASE:\n1. Assignment creates function and assigns to foo\n2. console.log(typeof bar) checks global bar\n3. bar is not defined globally\n4. typeof bar → typeof undefined → \"undefined\"\n5. Logs \"undefined\"\n\n📌 KEY: Named function expression names are like local variables inside their own function. Outside is unreachable.",
    options: ['"function"', '"undefined"', "ReferenceError", '"object"'],
  },
  {
    id: "global-closure",
    type: "output",
    topic: "Closures",
    title: "global closure capture",
    prompt: "What is logged?",
    code: "function foo() { console.log(a); }\nvar a = 10;\n(function() {\n  var a = 20;\n  foo();\n})();",
    expected: "10",
    explanation:
      "CLOSURE SCOPE CHAIN:\n1. foo is DEFINED at global scope\n2. foo closes over GLOBAL scope (a = 10)\n3. IIFE creates its own scope (a = 20)\n4. foo is CALLED inside IIFE\n\nEXECUTION PHASE:\n1. Global a = 10\n2. IIFE executes\n3. Local a = 20 inside IIFE\n4. foo() is called\n5. foo looks for 'a' in ITS closure (global)\n6. Finds global a = 10 (not IIFE's a = 20)\n7. Logs \"10\"\n\n📌 KEY: Closures capture DEFINITION scope, not CALL scope. Where foo is defined determines which 'a' it sees.",
    options: ["10", "20", "undefined", "ReferenceError"],
  },
  {
    id: "strict-this",
    type: "output",
    topic: "this",
    title: "strict mode this",
    prompt: "What is logged?",
    code: "function foo() { console.log(this.a); }\nvar a = 10;\nfoo();",
    expected: "10",
    explanation:
      "NON-STRICT THIS BINDING:\n1. Regular function call (plain call, no receiver)\n2. In non-strict mode, plain calls use global object as 'this'\n3. Global a = 10\n\nEXECUTION PHASE:\n1. foo() is called (no receiver like obj.foo())\n2. this = global object (browser: window, Node: global)\n3. this.a = global.a = 10\n4. Logs \"10\"\n\n📌 KEY: Non-strict mode is forgiving. Plain function calls get global 'this'. Modern code should use strict mode.",
    options: ["10", "undefined", "null", "ReferenceError"],
  },
  {
    id: "strict-undefined-this",
    type: "output",
    topic: "this",
    title: "strict mode regular call",
    prompt: "What is logged?",
    code: '"use strict";\nfunction foo() { console.log(this); }\nfoo();',
    expected: "undefined",
    explanation:
      "STRICT MODE THIS BINDING:\n1. 'use strict' activates strict mode\n2. In strict mode, plain function calls get undefined as 'this'\n3. No automatic global fallback\n\nEXECUTION PHASE:\n1. \"use strict\" is set\n2. foo() is called (plain call)\n3. this = undefined (strict mode enforces this)\n4. console.log(this) prints undefined\n5. Logs \"undefined\"\n\n📌 KEY: Strict mode is safer. 'this' is only bound when explicitly provided (method call, .call/.apply, constructor).",
    options: ["undefined", "global object", "null", "ReferenceError"],
  },
  {
    id: "let-fn-conflict",
    type: "output",
    topic: "TDZ",
    title: "let and function conflict",
    prompt: "What happens?",
    code: "console.log(x);\nlet x = 10;\nfunction x() {}",
    expected: "ReferenceError",
    explanation:
      "LET BLOCKS FUNCTION HOISTING:\n1. let x is hoisted to TDZ\n2. function x() would create a binding\n3. But let x is already there → conflict!\n\nEXECUTION PHASE:\n1. console.log(x) tries to access x\n2. let x is in TDZ (hoisted but uninitialized)\n3. ReferenceError: Cannot access 'x' before initialization\n4. Function declaration doesn't matter (let won)\n\n📌 KEY: let/const declarations block function declarations with the same name. let/const have priority.",
    options: ["ReferenceError", "10", "[Function: x]", "undefined"],
  },
  {
    id: "if-function-typeof",
    type: "output",
    topic: "Scope",
    title: "function in if condition",
    prompt: "What is logged?",
    code: "var a = 1;\nif (function f(){}) { a += typeof f; }\nconsole.log(a);",
    expected: "1undefined",
    explanation:
      'FUNCTION EXPRESSION IN CONDITION:\n1. (function f(){}) is a function EXPRESSION (not declaration)\n2. f is NOT available in outer scope\n3. The condition is truthy (function exists)\n\nEXECUTION PHASE:\n1. if (function f(){}) → condition is truthy\n2. Block executes\n3. a += typeof f\n4. typeof f in outer scope → f doesn\'t exist → "undefined"\n5. a = 1 + "undefined" = "1undefined" (number + string concatenation)\n6. console.log(a) logs "1undefined"\n\n📌 KEY: Function expressions in conditions don\'t create usable names in outer scope. They\'re expressions, not declarations.',
    options: ["1undefined", "1", "NaN", "ReferenceError"],
  },
  {
    id: "return-bar",
    type: "output",
    topic: "Functions",
    title: "return a hoisted inner function",
    prompt: "What is logged?",
    code: "function foo() {\n  return bar;\n  var bar = 10;\n  function bar() {}\n}\nconsole.log(typeof foo());",
    expected: "function",
    explanation:
      'HOISTING INSIDE FUNCTION:\n1. Inside foo, function bar() is fully hoisted\n2. var bar is also hoisted but ignored (bar already exists)\n3. return statement comes before var assignment\n\nEXECUTION PHASE:\n1. foo() is called\n2. return bar executes\n3. bar is the hoisted function (not yet assigned 10)\n4. foo returns the function\n5. typeof function → "function"\n6. Logs "function"\n\n📌 KEY: Function declarations are hoisted above statements. Return gets the function, not the later value.',
    options: ['"function"', '"number"', '"undefined"', '"object"'],
  },
  {
    id: "let-tdz-inner",
    type: "output",
    topic: "TDZ",
    title: "TDZ inside function",
    prompt: "What happens?",
    code: "var a = 1;\nfunction foo() {\n  console.log(a);\n  let a = 2;\n}\nfoo();",
    expected: "ReferenceError",
    explanation:
      "LOCAL LET CREATES TDZ:\n1. Global var a = 1\n2. Inside foo, let a = 2 creates LOCAL binding\n3. This local binding shadows global and enters TDZ\n\nEXECUTION PHASE:\n1. foo() is called\n2. console.log(a) looks for 'a'\n3. Finds LOCAL let a (in TDZ, not global)\n4. ReferenceError: Cannot access 'a' before initialization\n5. Global a = 1 is unreachable (shadowed)\n\n📌 KEY: let/const declarations shadow outer scope completely, even when in TDZ. TDZ prevents access to any version.",
    options: ["1", "2", "ReferenceError", "undefined"],
  },
  {
    id: "function-a-overshadows-var",
    type: "output",
    topic: "Hoisting",
    title: "function inside function shadows var",
    prompt: "What is logged?",
    code: "var a = 1;\nfunction foo() {\n  console.log(a);\n  var a = 2;\n  function a() {}\n}\nfoo();",
    expected: "[Function: a]",
    explanation:
      "HOISTING PRECEDENCE INSIDE FUNCTION:\n1. Inside foo, function a() is fully hoisted FIRST\n2. var a is hoisted SECOND, but 'a' already exists (ignored)\n3. Both use the same identifier\n\nEXECUTION PHASE:\n1. foo() is called\n2. console.log(a) logs the hoisted value\n3. 'a' is the hoisted function (function declaration wins)\n4. Logs \"[Function: a]\"\n5. var a = 2 overwrites later (after the log)\n\n📌 KEY: Inside a function, hoisting order: functions FIRST, then var. Function wins the identifier.",
    options: ["1", "2", "[Function: a]", "undefined"],
  },
  {
    id: "arrow-vs-regular",
    type: "output",
    topic: "Functions",
    title: "arrow function vs regular function",
    prompt: "What is logged?",
    code: 'var name = "Global";\nconst obj = {\n  name: "Object",\n  regular: function() { return this.name; },\n  arrow: () => this.name\n};\nconsole.log(obj.regular());\nconsole.log(obj.arrow());',
    expected: "Object\nundefined",
    explanation:
      'THIS BINDING DIFFERENCES:\n1. Regular function: this = obj (method call)\n2. Arrow function: this = lexical scope (global, undefined in strict mode)\n\nEXECUTION PHASE:\n1. obj.regular() → this = obj → returns "Object"\n2. obj.arrow() → arrow inherits this from global → undefined\n3. Logs "Object\\nundefined"\n\n📌 KEY: Arrow functions don\'t have their own \'this\'. They inherit from lexical scope.',
    options: [
      "Object\nObject",
      "Object\nundefined",
      "Global\nObject",
      "Global\nundefined",
    ],
  },
  {
    id: "default-params-hoist",
    type: "output",
    topic: "Functions",
    title: "default parameters and TDZ",
    prompt: "What happens when foo() is called?",
    code: "function foo(a = b, b = 5) {\n  return a + b;\n}\nconsole.log(foo());",
    expected: "ReferenceError",
    explanation:
      "DEFAULT PARAMETERS TDZ:\n1. Default parameters are evaluated left-to-right\n2. When evaluating a = b, parameter b is still in TDZ (not initialized)\n3. Accessing b in TDZ throws ReferenceError\n\nEXECUTION PHASE:\n1. foo() called with no arguments\n2. Parameter evaluation: a = b (b is in TDZ) → ReferenceError\n3. Function never executes\n\n📌 KEY: Default parameters create TDZ for subsequent parameters. You cannot reference a later parameter in an earlier parameter's default value.",
    options: ["5", "10", "ReferenceError", "undefined"],
  },
  {
    id: "destructuring-hoist",
    type: "output",
    topic: "Scope",
    title: "destructuring and hoisting",
    prompt: "What is logged?",
    code: "let { a, b } = { a: 1, b: 2 };\nconsole.log(a);\n{\n  let { a } = { a: 3 };\n  console.log(a);\n}\nconsole.log(a);",
    expected: "1\n3\n1",
    explanation:
      'DESTRUCTURING SCOPE:\n1. Outer destructuring: a=1, b=2\n2. Block creates new scope\n3. Inner destructuring: a=3 (shadows outer)\n4. Block ends, inner a disappears\n\nEXECUTION PHASE:\n1. console.log(a) → outer a=1 → logs "1"\n2. Block: let { a } = { a: 3 } → inner a=3\n3. console.log(a) → inner a=3 → logs "3"\n4. Block ends\n5. console.log(a) → outer a=1 → logs "1"\n\n📌 KEY: Destructuring creates block-scoped variables. Inner destructuring shadows outer.',
    options: ["1\n3\n1", "1\n3\n3", "3\n3\n1", "1\n1\n1"],
  },
  {
    id: "template-literal-hoist",
    type: "output",
    topic: "Scope",
    title: "template literals with hoisting",
    prompt: "What is logged?",
    code: 'console.log(`${a}`);\nvar a = "Hello";',
    expected: "undefined",
    explanation:
      'TEMPLATE LITERAL EVALUATION:\n1. Template literals are expressions, evaluated at runtime\n2. var a is hoisted but undefined at log time\n\nEXECUTION PHASE:\n1. console.log(`${a}`) → a is undefined → logs "undefined"\n2. a = "Hello" executes after\n\n📌 KEY: Template literals don\'t change hoisting. They\'re just string interpolation.',
    options: ['"Hello"', "undefined", "ReferenceError", "null"],
  },
  {
    id: "generator-hoist",
    type: "output",
    topic: "Functions",
    title: "generator function hoisting",
    prompt: "What is logged?",
    code: "console.log(typeof foo);\nfunction* foo() {}",
    expected: "function",
    explanation:
      'GENERATOR HOISTING:\n1. function* declarations are hoisted like regular functions\n2. They create function objects\n\nEXECUTION PHASE:\n1. console.log(typeof foo) → foo is hoisted function → "function"\n\n📌 KEY: Generator functions (*) are hoisted the same as regular function declarations.',
    options: ['"function"', '"object"', '"undefined"', "ReferenceError"],
  },
  {
    id: "class-constructor-hoist",
    type: "output",
    topic: "Classes",
    title: "class constructor field hoisting",
    prompt: "What is logged?",
    code: 'class Person {\n  constructor(name) {\n    this.name = name;\n    console.log(this.age);\n  }\n  age = 25;\n}\nnew Person("John");',
    expected: "undefined",
    explanation:
      'CLASS FIELD TIMING:\n1. Constructor runs first\n2. this.name = "John" executes\n3. console.log(this.age) → age field not initialized yet → undefined\n4. After constructor, age = 25 is assigned\n\n📌 KEY: Class fields are initialized after constructor body, not before.',
    options: ["25", "undefined", "null", "ReferenceError"],
  },
  {
    id: "strict-mode-var",
    type: "output",
    topic: "Scope",
    title: "strict mode and var hoisting",
    prompt: "What happens?",
    code: '"use strict";\nconsole.log(a);\nvar a = 5;',
    expected: "undefined",
    explanation:
      "STRICT MODE HOISTING:\n1. Strict mode doesn't change hoisting behavior\n2. var a is still hoisted and initialized to undefined\n\nEXECUTION PHASE:\n1. console.log(a) → a is undefined → logs \"undefined\"\n2. a = 5 executes\n\n📌 KEY: Strict mode affects 'this' and some errors, but not hoisting.",
    options: ["5", "undefined", "ReferenceError", "null"],
  },
  {
    id: "const-reassign",
    type: "output",
    topic: "TDZ",
    title: "const reassignment attempt",
    prompt: "What happens?",
    code: "const a = 10;\na = 20;",
    expected: "TypeError",
    explanation:
      "CONST IMMUTABILITY:\n1. const creates immutable binding\n2. Assignment after declaration throws TypeError\n\nEXECUTION PHASE:\n1. const a = 10 → binding created\n2. a = 20 → TypeError: Assignment to constant variable\n\n📌 KEY: const bindings cannot be reassigned after initialization.",
    options: ["20", "10", "TypeError", "ReferenceError"],
  },
  {
    id: "let-redeclare",
    type: "output",
    topic: "TDZ",
    title: "let redeclaration in same scope",
    prompt: "What happens?",
    code: "let a = 10;\nlet a = 20;",
    expected: "SyntaxError",
    explanation:
      "LET REDECLARATION:\n1. let doesn't allow redeclaration in same scope\n2. This is a SyntaxError (parse time)\n\nRESULT:\n- SyntaxError: Identifier 'a' has already been declared\n- Code doesn't run\n\n📌 KEY: let/const don't allow redeclaration in the same scope (unlike var).",
    options: ["SyntaxError", "20", "10", "ReferenceError"],
  },
  {
    id: "closure-complex",
    type: "output",
    topic: "Closures",
    title: "complex closure with IIFE",
    prompt: "What is logged?",
    code: "(function() {\n  var a = 10;\n  function inner() {\n    console.log(a);\n  }\n  return inner;\n})()();",
    expected: "10",
    explanation:
      'CLOSURE CAPTURE:\n1. IIFE creates scope with a = 10\n2. inner() closes over IIFE\'s scope\n3. IIFE returns inner, then () calls it\n\nEXECUTION PHASE:\n1. IIFE executes, a = 10\n2. inner is returned (with closure)\n3. () calls inner → inner looks for a in closure → finds 10\n4. Logs "10"\n\n📌 KEY: Closures capture the entire scope chain where the function was defined.',
    options: ["10", "undefined", "ReferenceError", "null"],
  },
  {
    id: "async-await-hoist",
    type: "output",
    topic: "Async",
    title: "async/await with hoisting",
    prompt: "What are the logs?",
    code: "async function test() {\n  console.log(a);\n  var a = await Promise.resolve(10);\n  console.log(a);\n}\ntest();",
    expected: "undefined\n10",
    explanation:
      'ASYNC HOISTING:\n1. var a hoisted to undefined\n2. await pauses execution\n\nEXECUTION PHASE:\n1. console.log(a) → undefined → logs "undefined"\n2. a = await Promise.resolve(10) → pauses\n3. Promise resolves, a = 10\n4. console.log(a) → 10 → logs "10"\n\n📌 KEY: await doesn\'t change hoisting. var is still hoisted.',
    options: ["10\n10", "undefined\n10", "ReferenceError", "10\nundefined"],
  },
  {
    id: "module-hoist",
    type: "output",
    topic: "Scope",
    title: "module scope hoisting",
    prompt: "What is logged? (assuming ES modules)",
    code: "console.log(typeof foo);\nexport function foo() {}",
    expected: "function",
    explanation:
      'MODULE HOISTING:\n1. In ES modules, function declarations are hoisted\n2. Available before execution\n\nEXECUTION PHASE:\n1. console.log(typeof foo) → foo is hoisted → "function"\n\n📌 KEY: ES modules have hoisting for function declarations.',
    options: ['"function"', '"undefined"', "ReferenceError", '"object"'],
  },
  {
    id: "try-catch-hoist",
    type: "output",
    topic: "Scope",
    title: "try-catch block hoisting",
    prompt: "What is logged?",
    code: "try {\n  console.log(a);\n  let a = 5;\n} catch (e) {\n  console.log(e.name);\n}",
    expected: "ReferenceError",
    explanation:
      'BLOCK SCOPE IN TRY:\n1. let a is in TDZ for the try block\n2. console.log(a) throws ReferenceError\n3. catch catches it\n\nEXECUTION PHASE:\n1. console.log(a) → TDZ → ReferenceError\n2. catch(e) → e.name = "ReferenceError" → logs "ReferenceError"\n\n📌 KEY: TDZ applies to block scopes, including try blocks.',
    options: ["ReferenceError", "5", "undefined", "null"],
  },
  {
    id: "for-loop-let",
    type: "output",
    topic: "Closures",
    title: "for loop with let and function",
    prompt: "What is logged?",
    code: "for (let i = 0; i < 3; i++) {\n  setTimeout(function() { console.log(i); }, 0);\n}",
    expected: "0\n1\n2",
    explanation:
      "LET IN FOR LOOP:\n1. let i creates per-iteration binding\n2. Each setTimeout gets its own i value\n\nEXECUTION PHASE:\n1. Iteration 0: i=0, callback captures i=0\n2. Iteration 1: i=1, callback captures i=1\n3. Iteration 2: i=2, callback captures i=2\n4. Callbacks execute: 0, 1, 2\n\n📌 KEY: let in for loops creates fresh bindings each iteration.",
    options: [
      "0\n1\n2",
      "3\n3\n3",
      "undefined\nundefined\nundefined",
      "0\n0\n0",
    ],
  },
  {
    id: "object-method-arrow",
    type: "output",
    topic: "this",
    title: "object method with arrow function",
    prompt: "What is logged?",
    code: 'const obj = {\n  name: "Test",\n  method: function() {\n    return () => this.name;\n  }\n};\nconst arrow = obj.method();\nconsole.log(arrow());',
    expected: "Test",
    explanation:
      'ARROW IN METHOD:\n1. obj.method() returns an arrow function\n2. Arrow inherits this from method\'s scope (obj)\n3. arrow() calls the arrow → this = obj\n\nEXECUTION PHASE:\n1. const arrow = obj.method() → arrow function returned\n2. arrow() → this = obj (inherited) → "Test"\n3. Logs "Test"\n\n📌 KEY: Arrow functions in methods inherit this from the method\'s lexical scope.',
    options: ["Test", "undefined", "ReferenceError", "null"],
  },
  {
    id: "fn-declaration-block-strict",
    type: "output",
    topic: "Hoisting",
    title: "function declaration in block (strict mode)",
    prompt: "What is logged?",
    code: '"use strict";\n{\n  function foo() { return 1; }\n}\nconsole.log(foo());',
    expected: "ReferenceError",
    explanation:
      "BLOCK-SCOPED FUNCTION DECLARATIONS IN STRICT MODE:\n1. In strict mode, function declarations inside blocks are block-scoped (ES6+ behavior)\n2. foo is only accessible inside the block, not outside\n\nHOISTING PHASE:\n1. The block's function declaration is hoisted to the top of the block, not the outer scope\n\nEXECUTION PHASE:\n1. Inside the block, foo is defined\n2. After block exits, foo is no longer accessible\n3. console.log(foo()) → ReferenceError: foo is not defined\n\n📌 KEY: In strict mode, block-scoped function declarations behave like let – they are not hoisted to the enclosing function or global scope.",
    options: ["1", "ReferenceError", "undefined", "TypeError"],
  },
  {
    id: "fn-declaration-block-nonstrict",
    type: "output",
    topic: "Hoisting",
    title: "function declaration in block (non‑strict)",
    prompt: "What is logged?",
    code: "{\n  function foo() { return 1; }\n}\nconsole.log(foo());",
    expected: "1",
    explanation:
      "BLOCK-SCOPED FUNCTION DECLARATIONS IN NON-STRICT MODE:\n1. In non-strict mode (legacy behavior), function declarations inside blocks are hoisted to the enclosing function or global scope\n2. This is considered a quirk and is disallowed in strict mode\n\nHOISTING PHASE:\n1. foo is hoisted to the global scope (or function scope) as a function\n\nEXECUTION PHASE:\n1. The block defines foo, but the hoisting already made it globally available\n2. After block, foo is still accessible\n3. console.log(foo()) -> 1\n\n📌 KEY: Non-strict mode allows block-scoped function declarations to 'leak' out of the block. Avoid relying on this behavior.",
    options: ["1", "ReferenceError", "undefined", "TypeError"],
  },
  {
    id: "const-object-mutation",
    type: "output",
    topic: "Scope",
    title: "const with object mutation",
    prompt: "What is logged?",
    code: "const obj = { a: 1 };\nobj.a = 2;\nconsole.log(obj.a);",
    expected: "2",
    explanation:
      "CONST BINDING IMMUTABILITY:\n1. const prevents reassignment of the binding, not the value itself\n2. The object referenced by obj can still be mutated\n\nEXECUTION PHASE:\n1. obj = { a: 1 } creates a constant binding\n2. obj.a = 2 modifies the object's property – allowed\n3. console.log(obj.a) → 2\n\n📌 KEY: const makes the variable identifier immutable, but object properties can still change.",
    options: ["1", "2", "TypeError", "ReferenceError"],
  },
  {
    id: "class-expression-hoist",
    type: "output",
    topic: "Classes",
    title: "class expression hoisting",
    prompt: "What happens?",
    code: "console.log(typeof Person);\nconst Person = class {};",
    expected: "ReferenceError",
    explanation:
      "CLASS EXPRESSION HOISTING:\n1. Class expressions are NOT hoisted (like let/const)\n2. The identifier Person is in TDZ until the assignment\n\nHOISTING PHASE:\n1. const Person is hoisted but enters TDZ\n2. Class expression body is NOT hoisted\n\nEXECUTION PHASE:\n1. console.log(typeof Person) → Person in TDZ → ReferenceError\n2. Code stops\n\n📌 KEY: Only class declarations are hoisted (with TDZ). Class expressions behave like let/const.",
    options: ["ReferenceError", '"function"', '"undefined"', '"object"'],
  },
  {
    id: "static-field-timing",
    type: "output",
    topic: "Classes",
    title: "static field initialization order",
    prompt: "What is logged?",
    code: 'class Parent {\n  static field = "Parent";\n  static {\n    console.log(this.field);\n  }\n}\nclass Child extends Parent {\n  static field = "Child";\n  static {\n    console.log(this.field);\n  }\n}\nnew Child();',
    expected: "Parent\nChild",
    explanation:
      "STATIC FIELD INITIALIZATION ORDER:\n1. Static fields and static blocks run in order of declaration\n2. For a derived class, parent static fields are initialized first\n\nEXECUTION PHASE:\n1. Parent class evaluated: static field = 'Parent', then static block → logs 'Parent'\n2. Child class evaluated: extends Parent, so parent static fields already initialized\n3. Child's static field = 'Child', then static block → logs 'Child'\n4. No instance created; logs Parent, Child\n\n📌 KEY: Static initialization runs in lexical order, with parent class complete before child.",
    options: ["Parent\nChild", "Child\nParent", "Parent only", "Child only"],
  },
  {
    id: "super-before-this",
    type: "output",
    topic: "Classes",
    title: "super before this in constructor",
    prompt: "What happens?",
    code: 'class Parent {\n  constructor(name) { this.name = name; }\n}\nclass Child extends Parent {\n  constructor() {\n    console.log(this);\n    super("John");\n  }\n}\nnew Child();',
    expected: "ReferenceError",
    explanation:
      "SUPER BEFORE THIS RULE:\n1. In derived classes, you must call super() before accessing this\n2. Accessing this before super() throws a ReferenceError\n\nEXECUTION PHASE:\n1. new Child() calls Child constructor\n2. console.log(this) attempts to access this before super() → ReferenceError\n3. Code stops\n\n📌 KEY: In a derived class constructor, this is not initialized until super() is called.",
    options: ["John", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "bind-this",
    type: "output",
    topic: "this",
    title: "explicit binding with bind",
    prompt: "What is logged?",
    code: 'function greet() { console.log(this.name); }\nconst obj = { name: "Alice" };\nconst bound = greet.bind(obj);\nbound();',
    expected: "Alice",
    explanation:
      'EXPLICIT BINDING WITH bind:\n1. bind() creates a new function with a fixed this value\n2. No matter how the bound function is called, this is preset\n\nEXECUTION PHASE:\n1. bound = greet.bind(obj) → bound function with this = obj\n2. bound() → logs obj.name → "Alice"\n\n📌 KEY: bind() permanently binds this, overriding call/apply or method invocation.',
    options: ["Alice", "undefined", "ReferenceError", "null"],
  },
  {
    id: "call-apply-this",
    type: "output",
    topic: "this",
    title: "call vs apply",
    prompt: "What is logged?",
    code: "function sum(a, b) { console.log(this.value + a + b); }\nconst context = { value: 10 };\nsum.call(context, 1, 2);\nsum.apply(context, [3, 4]);",
    expected: "13\n17",
    explanation:
      "CALL AND APPLY EXPLICIT THIS:\n1. Both call and apply set this explicitly\n2. call passes arguments individually, apply takes an array\n\nEXECUTION PHASE:\n1. sum.call(context, 1, 2) → this = context → 10 + 1 + 2 = 13\n2. sum.apply(context, [3, 4]) → this = context → 10 + 3 + 4 = 17\n\n📌 KEY: call() and apply() immediately invoke the function with a specified this and arguments.",
    options: ["13\n17", "10\n10", "1\n3", "undefined\nundefined"],
  },
  {
    id: "new-binding",
    type: "output",
    topic: "this",
    title: "new binding precedence",
    prompt: "What is logged?",
    code: 'function Person(name) { this.name = name; }\nconst obj = { name: "Global" };\nconst bound = Person.bind(obj);\nconst p = new bound("John");\nconsole.log(p.name);',
    expected: "John",
    explanation:
      'NEW BINDING OVERRIDES EXPLICIT BINDING:\n1. bind() creates a bound function, but new operator ignores the bound this\n2. When a function is called with new, a new object is created and this points to that object\n\nEXECUTION PHASE:\n1. bound = Person.bind(obj) → this is fixed to obj for regular calls\n2. new bound("John") → new creates a new instance → this = new object\n3. p.name = "John"\n4. console.log(p.name) → "John"\n\n📌 KEY: The new operator has the highest precedence for this binding, overriding bind, call, or apply.',
    options: ["John", "Global", "undefined", "ReferenceError"],
  },
  {
    id: "arrow-no-arguments",
    type: "output",
    topic: "Functions",
    title: "arrow functions and arguments object",
    prompt: "What is logged?",
    code: "const foo = () => arguments[0];\nconsole.log(foo(5));",
    expected: "ReferenceError",
    explanation:
      "ARROW FUNCTIONS AND ARGUMENTS:\n1. Arrow functions do not have their own arguments object\n2. Accessing arguments in an arrow function references the arguments of the enclosing scope (if any) or throws in global scope\n\nEXECUTION PHASE:\n1. In global scope, arguments is not defined\n2. foo(5) tries to access arguments → ReferenceError\n\n📌 KEY: Arrow functions inherit arguments from their parent scope, but they don't create their own. Use rest parameters instead.",
    options: ["5", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "default-params-hoist-2",
    type: "output",
    topic: "Functions",
    title: "default parameters and outer scope",
    prompt: "What is logged?",
    code: "let a = 1;\nfunction test(a = a) { return a; }\nconsole.log(test());",
    expected: "ReferenceError",
    explanation:
      "DEFAULT PARAMETER TDZ:\n1. Default parameters create a new lexical scope for the parameter list\n2. The parameter 'a' shadows the outer 'a' and is in TDZ until initialized\n\nEXECUTION PHASE:\n1. test() called without arguments\n2. Default parameter expression 'a' tries to access parameter 'a' before its initialization → ReferenceError\n\n📌 KEY: Default parameters are evaluated in their own TDZ. You cannot reference the same parameter in its own initializer.",
    options: ["1", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "rest-param-hoist",
    type: "output",
    topic: "Functions",
    title: "rest parameters and hoisting",
    prompt: "What is logged?",
    code: "function test(...args) { console.log(typeof args); }\ntest();",
    expected: "object",
    explanation:
      'REST PARAMETERS:\n1. Rest parameters are not hoisted in the traditional sense; they are treated like an array parameter\n2. Inside the function, args is a real array\n\nEXECUTION PHASE:\n1. test() called with no arguments → args is an empty array\n2. typeof args → "object" (arrays are objects)\n\n📌 KEY: Rest parameters are part of the function\'s parameter list and are available inside the function without hoisting issues.',
    options: ['"object"', '"undefined"', '"function"', '"array"'],
  },
  {
    id: "import-hoisting",
    type: "output",
    topic: "Modules",
    title: "import hoisting in ES modules",
    prompt: "What is logged? (assuming module context)",
    code: "console.log(foo);\nimport { foo } from './module.js';",
    expected: "ReferenceError",
    explanation:
      "IMPORT HOISTING:\n1. Import statements are hoisted, but the imported bindings are in a TDZ until the module is evaluated\n2. They behave like let/const, not var\n\nEXECUTION PHASE:\n1. console.log(foo) tries to access foo before import initialization → ReferenceError\n\n📌 KEY: ES module imports are hoisted but are subject to TDZ. They cannot be accessed before the module is fully initialized.",
    options: ["undefined", "ReferenceError", "null", "TypeError"],
  },
  {
    id: "dynamic-import-hoist",
    type: "output",
    topic: "Modules",
    title: "dynamic import not hoisted",
    prompt: "What is logged?",
    code: "console.log(import('./module.js'));",
    expected: "Promise { <pending> }",
    explanation:
      "DYNAMIC IMPORT:\n1. import() is a function-like expression, not a statement\n2. It returns a promise and is not hoisted\n\nEXECUTION PHASE:\n1. import('./module.js') is evaluated at runtime\n2. console.log logs a pending promise\n\n📌 KEY: Dynamic imports are not hoisted; they are executed in the order they appear.",
    options: [
      "Promise { <pending> }",
      "undefined",
      "ReferenceError",
      "TypeError",
    ],
  },
  {
    id: "generator-function-hoist",
    type: "output",
    topic: "Functions",
    title: "generator function hoisting",
    prompt: "What is logged?",
    code: "console.log(typeof gen);\nfunction* gen() {}",
    expected: "function",
    explanation:
      'GENERATOR FUNCTION HOISTING:\n1. Generator declarations are fully hoisted like regular function declarations\n2. They create a function object\n\nEXECUTION PHASE:\n1. console.log(typeof gen) → "function"\n\n📌 KEY: function* declarations are hoisted and can be used before their lexical appearance.',
    options: ['"function"', '"object"', '"undefined"', "ReferenceError"],
  },
  {
    id: "async-function-expr",
    type: "output",
    topic: "Async",
    title: "async function expression hoisting",
    prompt: "What happens?",
    code: "console.log(typeof foo);\nvar foo = async function() {};",
    expected: "undefined",
    explanation:
      'ASYNC FUNCTION EXPRESSION HOISTING:\n1. var foo is hoisted and initialized to undefined\n2. The async function expression is not hoisted\n\nEXECUTION PHASE:\n1. console.log(typeof foo) → foo is undefined → "undefined"\n2. Assignment happens after\n\n📌 KEY: Async function expressions follow the same hoisting rules as function expressions: only the variable binding is hoisted, not the function itself.',
    options: ['"function"', '"undefined"', "ReferenceError", '"object"'],
  },
  {
    id: "catch-block-scope",
    type: "output",
    topic: "Scope",
    title: "catch block scope with let",
    prompt: "What is logged?",
    code: 'try {\n  throw new Error("oops");\n} catch (err) {\n  let err = 10;\n  console.log(err);\n}\nconsole.log(typeof err);',
    expected: "10\nundefined",
    explanation:
      'CATCH BLOCK SCOPE:\n1. The catch block creates a block scope for the error parameter\n2. You can redeclare the same variable name inside the catch block using let (shadowing)\n\nEXECUTION PHASE:\n1. catch (err) creates a binding err with the error object\n2. Inside block, let err = 10 shadows the outer err\n3. console.log(err) → 10\n4. After block, console.log(typeof err) → err not in outer scope → "undefined"\n\n📌 KEY: The catch block\'s error variable is scoped to the catch block, but you can also have inner let declarations that shadow it.',
    options: ["10\nnumber", "10\nundefined", "error\nundefined", "10\nobject"],
  },
  {
    id: "with-statement-avoid",
    type: "output",
    topic: "Scope",
    title: "with statement and hoisting",
    prompt: "What happens? (strict mode)",
    code: '"use strict";\nwith ({}) {}',
    expected: "SyntaxError",
    explanation:
      "WITH STATEMENT IN STRICT MODE:\n1. The with statement is forbidden in strict mode\n2. It was deprecated due to unpredictable scoping and performance issues\n\nEXECUTION PHASE:\n1. Code fails to parse with SyntaxError\n\n📌 KEY: Never use with; it's banned in strict mode and considered harmful.",
    options: ["SyntaxError", "ReferenceError", "TypeError", "undefined"],
  },
  {
    id: "eval-hoisting",
    type: "output",
    topic: "Hoisting",
    title: "eval affecting hoisting",
    prompt: "What is logged?",
    code: 'var x = 1;\nfunction foo() {\n  eval("var x = 2");\n  console.log(x);\n}\nfoo();',
    expected: "2",
    explanation:
      "EVAL HOISTING WITHIN FUNCTION:\n1. eval() can introduce new variable declarations in the current scope\n2. The var x inside eval is hoisted to the top of foo's scope\n\nHOISTING PHASE:\n1. Inside foo, var x (from eval) is hoisted (since eval is executed at runtime, this is dynamic)\n2. However, eval's code is interpreted at runtime, so hoisting is applied during evaluation\n\nEXECUTION PHASE:\n1. foo() called\n2. eval(\"var x = 2\") executes, hoisting a local var x (shadowing global) and assigning 2\n3. console.log(x) → 2\n\n📌 KEY: eval can create bindings at runtime, which can lead to confusing hoisting behavior. Avoid eval when possible.",
    options: ["1", "2", "undefined", "ReferenceError"],
  },
  {
    id: "eval-hoisting-nonstrict",
    type: "output",
    topic: "Hoisting",
    title: "eval with var in non‑strict",
    prompt: "What is logged?",
    code: 'function test() {\n  eval("var x = 10");\n  console.log(x);\n}\ntest();',
    expected: "10",
    explanation:
      'EVAL AND HOISTING IN NON‑STRICT MODE:\n1. In non‑strict mode, eval can introduce variable declarations into the current scope\n2. The var x inside eval is hoisted to the top of the function (if eval is called directly)\n\nHOISTING PHASE (during eval runtime):\n1. When eval executes, the code inside is parsed and var x is hoisted to the top of the function scope\n\nEXECUTION PHASE:\n1. eval("var x = 10") runs, hoisting x (undefined) then assigning 10\n2. console.log(x) → 10\n\n📌 KEY: eval can create variables in the surrounding scope in non‑strict mode, but this is considered bad practice.',
    options: ["10", "undefined", "ReferenceError", "null"],
  },
  {
    id: "with-hoisting",
    type: "output",
    topic: "Scope",
    title: "with statement variable lookup",
    prompt: "What is logged? (non‑strict)",
    code: "var x = 10;\nwith ({ x: 20 }) {\n  var y = x;\n}\nconsole.log(y);",
    expected: "20",
    explanation:
      "WITH STATEMENT AND VARIABLE RESOLUTION:\n1. `with` adds the given object to the scope chain.\n2. `var y` is hoisted to the function/global scope.\n3. Inside `with`, `x` resolves to the object's property (20).\n4. `y` is assigned 20.\n\nEXECUTION PHASE:\n1. var y hoisted.\n2. with block: x resolves to 20, y = 20.\n3. console.log(y) → 20.\n\n📌 KEY: Variable declarations inside `with` are hoisted to the outer scope, but variable lookups are affected by the scope chain extension.",
    options: ["10", "20", "undefined", "ReferenceError"],
  },
  {
    id: "block-var-let-conflict",
    type: "output",
    topic: "Scope",
    title: "var and let in same block",
    prompt: "What happens?",
    code: "{\n  var x = 1;\n  let x = 2;\n}",
    expected: "SyntaxError",
    explanation:
      "VAR AND LET CONFLICT IN SAME BLOCK:\n1. You cannot redeclare the same identifier with let if it was already declared with var in the same block (or function)\n2. This is a syntax error caught at parse time\n\nEXECUTION PHASE:\n- Code fails to parse: SyntaxError: Identifier 'x' has already been declared\n\n📌 KEY: let and const cannot coexist with var declarations of the same name in the same scope.",
    options: ["SyntaxError", "ReferenceError", "TypeError", "undefined"],
  },
  {
    id: "block-const-redeclare",
    type: "output",
    topic: "Scope",
    title: "const redeclaration in block",
    prompt: "What happens?",
    code: "const a = 1;\n{\n  const a = 2;\n  console.log(a);\n}\nconsole.log(a);",
    expected: "2\n1",
    explanation:
      "CONST REDECLARATION IN BLOCK:\n1. const declarations are block‑scoped\n2. A new const in a nested block shadows the outer one; it's a different binding\n\nEXECUTION PHASE:\n1. Outer const a = 1\n2. Inner block: new const a = 2 → inner a\n3. console.log(a) → inner a → 2\n4. After block, console.log(a) → outer a → 1\n\n📌 KEY: const can be redeclared in nested scopes, but not in the same scope.",
    options: ["2\n1", "1\n2", "2\n2", "1\n1"],
  },
  {
    id: "function-param-var-shadow",
    type: "output",
    topic: "Scope",
    title: "parameter vs var shadowing",
    prompt: "What is logged?",
    code: "function foo(a) {\n  var a = 2;\n  console.log(a);\n}\nfoo(1);",
    expected: "2",
    explanation:
      "PARAMETER SHADOWING:\n1. Parameters are part of the function's lexical environment\n2. A var declaration with the same name inside the function refers to the same binding (no separate variable)\n3. The assignment a = 2 modifies the parameter value\n\nEXECUTION PHASE:\n1. foo(1) → parameter a = 1\n2. var a = 2 → the same variable a is assigned 2\n3. console.log(a) → 2\n\n📌 KEY: var declarations in a function with a matching parameter name refer to the same binding.",
    options: ["1", "2", "undefined", "ReferenceError"],
  },
  {
    id: "function-param-let-shadow",
    type: "output",
    topic: "Scope",
    title: "parameter vs let shadowing",
    prompt: "What happens?",
    code: "function foo(a) {\n  let a = 2;\n  console.log(a);\n}\nfoo(1);",
    expected: "SyntaxError",
    explanation:
      "PARAMETER AND LET CONFLICT:\n1. Parameters and let declarations cannot have the same name in the same function scope because let blocks redeclaration\n2. This is a syntax error\n\nEXECUTION PHASE:\n- SyntaxError: Identifier 'a' has already been declared\n\n📌 KEY: let and const cannot redeclare a parameter; use a different name.",
    options: ["SyntaxError", "1", "2", "ReferenceError"],
  },
  {
    id: "class-static-this",
    type: "output",
    topic: "Classes",
    title: "this in static methods",
    prompt: "What is logged?",
    code: "class Foo {\n  static value = 10;\n  static getValue() {\n    return this.value;\n  }\n}\nconsole.log(Foo.getValue());",
    expected: "10",
    explanation:
      "THIS IN STATIC METHODS:\n1. Static methods are called on the class itself\n2. Inside a static method, `this` refers to the class (constructor function)\n\nEXECUTION PHASE:\n1. Foo.getValue() → `this` = Foo\n2. Foo.value = 10 → returns 10\n\n📌 KEY: Static methods use the class as the `this` context.",
    options: ["10", "undefined", "ReferenceError", "null"],
  },
  {
    id: "class-static-this-subclass",
    type: "output",
    topic: "Classes",
    title: "this in static method of subclass",
    prompt: "What is logged?",
    code: 'class Parent {\n  static value = "parent";\n  static get() { return this.value; }\n}\nclass Child extends Parent {\n  static value = "child";\n}\nconsole.log(Child.get());',
    expected: "child",
    explanation:
      'STATIC METHOD INHERITANCE AND THIS:\n1. Static methods are inherited by subclasses\n2. When a static method is called on a subclass, `this` refers to the subclass, not the parent\n\nEXECUTION PHASE:\n1. Child.get() → `this` = Child\n2. Child.value = "child" → returns "child"\n\n📌 KEY: Static methods are called with the class they are invoked on as `this`.',
    options: ["parent", "child", "undefined", "ReferenceError"],
  },
  {
    id: "class-static-field-arrow",
    type: "output",
    topic: "Classes",
    title: "arrow function as static field",
    prompt: "What is logged?",
    code: "class Foo {\n  static value = 10;\n  static getValue = () => this.value;\n}\nconsole.log(Foo.getValue());",
    expected: "10",
    explanation:
      "ARROW FUNCTION AS STATIC FIELD:\n1. Arrow functions capture `this` from the surrounding context at definition time\n2. In a class body, static fields are evaluated with `this` referring to the class\n\nEXECUTION PHASE:\n1. Static field getValue is assigned an arrow function\n2. The arrow captures `this` = Foo (the class)\n3. Foo.getValue() calls the arrow, which still has `this` = Foo\n4. Returns Foo.value → 10\n\n📌 KEY: Arrow functions in static fields lexically capture the class as `this`.",
    options: ["10", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "class-instance-field-arrow",
    type: "output",
    topic: "Classes",
    title: "arrow function as instance field",
    prompt: "What is logged?",
    code: "class Foo {\n  value = 10;\n  getValue = () => this.value;\n}\nconst obj = new Foo();\nconst fn = obj.getValue;\nconsole.log(fn());",
    expected: "10",
    explanation:
      "ARROW FUNCTION AS INSTANCE FIELD:\n1. Instance fields are evaluated per instance, and arrow functions capture the instance's `this` at the time of creation\n2. The arrow function is bound to the instance, so even when extracted, it retains the correct `this`\n\nEXECUTION PHASE:\n1. obj.getValue = arrow function, with `this` = obj\n2. const fn = obj.getValue → fn is the arrow function\n3. fn() → arrow uses its captured `this` (obj) → returns obj.value → 10\n\n📌 KEY: Arrow functions in instance fields are bound to the instance and can be safely passed around without losing `this`.",
    options: ["10", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "module-export-hoisting",
    type: "output",
    topic: "Modules",
    title: "export statement hoisting",
    prompt: "What is logged? (module context)",
    code: "console.log(foo);\nexport const foo = 10;",
    expected: "ReferenceError",
    explanation:
      "EXPORTED CONST AND TDZ:\n1. `export const foo = 10` is hoisted, but foo is in TDZ until the module is initialized\n2. Access before initialization causes ReferenceError\n\nEXECUTION PHASE:\n1. console.log(foo) → foo in TDZ → ReferenceError\n\n📌 KEY: Exported bindings behave like let/const; they are hoisted but not usable until after their declaration.",
    options: ["10", "undefined", "ReferenceError", "null"],
  },
  {
    id: "module-function-hoisting",
    type: "output",
    topic: "Modules",
    title: "exported function hoisting",
    prompt: "What is logged? (module context)",
    code: "console.log(foo());\nexport function foo() { return 1; }",
    expected: "1",
    explanation:
      "FUNCTION DECLARATION EXPORT HOISTING:\n1. Exported function declarations are hoisted like any function declaration\n2. They are available before the export statement\n\nEXECUTION PHASE:\n1. foo() → calls hoisted function → returns 1 → logs 1\n\n📌 KEY: Function declarations exported from modules are fully hoisted and can be called before they appear in the code.",
    options: ["1", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "module-default-export-hoisting",
    type: "output",
    topic: "Modules",
    title: "default export hoisting",
    prompt: "What is logged? (module context)",
    code: "console.log(foo);\nexport default function foo() {}",
    expected: "ReferenceError",
    explanation:
      "DEFAULT EXPORT AND TDZ:\n1. The default export is not hoisted as a variable; it is a special binding\n2. The identifier `foo` inside the module is not bound to the default export; it's only the function name inside the function itself\n3. Actually, `export default function foo() {}` creates a function declaration that is hoisted, but the function name `foo` is only available inside the function's scope, not as a module binding. The module binding for default is not named `foo`. So accessing `foo` in the module scope is a ReferenceError because there is no `foo` variable.\n\nEXECUTION PHASE:\n1. console.log(foo) → foo is not defined → ReferenceError\n\n📌 KEY: Default exports do not create a local identifier; the function's name is only for internal recursion.",
    options: ["[Function: foo]", "undefined", "ReferenceError", "null"],
  },
  {
    id: "dynamic-import-async",
    type: "output",
    topic: "Modules",
    title: "dynamic import and hoisting",
    prompt: "What is logged?",
    code: "console.log(import('./mod.js'));\nconsole.log('sync');",
    expected: "Promise { <pending> }\nsync",
    explanation:
      "DYNAMIC IMPORT EXECUTION:\n1. import() is a function that returns a promise\n2. It is not hoisted; it executes at runtime\n3. The promise is pending when logged\n\nEXECUTION PHASE:\n1. import('./mod.js') starts loading the module, returns a pending promise\n2. console.log(promise) → logs pending promise\n3. console.log('sync') → logs 'sync'\n\n📌 KEY: Dynamic imports are asynchronous and non‑blocking, and they do not affect hoisting.",
    options: [
      "Promise { <pending> }\nsync",
      "Promise { <resolved> }\nsync",
      "ReferenceError",
      "sync\nPromise { <pending> }",
    ],
  },
  {
    id: "class-private-field-inheritance",
    type: "output",
    topic: "Classes",
    title: "private field inheritance",
    prompt: "What is logged?",
    code: 'class Parent {\n  #secret = "parent secret";\n  getSecret() { return this.#secret; }\n}\nclass Child extends Parent {\n  #secret = "child secret";\n}\nconst child = new Child();\nconsole.log(child.getSecret());',
    expected: "parent secret",
    explanation:
      "PRIVATE FIELDS ARE NOT INHERITED:\n1. Private fields are not inherited; they belong to the class that defines them\n2. A subclass cannot access private fields of the parent, but it can have its own private field with the same name (no conflict)\n3. The getSecret() method is inherited from Parent, and its `this` is the child instance, but the private field access `this.#secret` refers to Parent's private field, not Child's\n\nEXECUTION PHASE:\n1. child.getSecret() calls Parent's getSecret method\n2. Inside getSecret, `this.#secret` accesses Parent's private field, which exists on the child instance (because the constructor of Parent runs when Child is instantiated, adding its private field)\n3. Returns \"parent secret\"\n\n📌 KEY: Private fields are per‑class and cannot be overridden by subclasses. A method of the parent always accesses the parent's private field, even when called on a child.",
    options: ["parent secret", "child secret", "undefined", "ReferenceError"],
  },
  {
    id: "class-private-method-inheritance",
    type: "output",
    topic: "Classes",
    title: "private method overriding",
    prompt: "What is logged?",
    code: 'class Parent {\n  #method() { return "parent"; }\n  call() { return this.#method(); }\n}\nclass Child extends Parent {\n  #method() { return "child"; }\n}\nconst child = new Child();\nconsole.log(child.call());',
    expected: "parent",
    explanation:
      "PRIVATE METHODS ARE NOT OVERRIDABLE:\n1. Private methods are not inherited and cannot be overridden in subclasses\n2. The private method in the parent is only accessible inside the parent\n3. Even if the child defines a private method with the same name, it's a separate private method\n\nEXECUTION PHASE:\n1. child.call() calls the inherited call method\n2. Inside call, `this.#method()` refers to Parent's private method\n3. Returns \"parent\"\n\n📌 KEY: Private methods are lexically scoped to the class they are defined in. They are not part of the prototype chain and cannot be overridden.",
    options: ["parent", "child", "undefined", "ReferenceError"],
  },
  {
    id: "class-private-field-hoist",
    type: "output",
    topic: "Classes",
    title: "private field hoisting",
    prompt: "What happens?",
    code: 'class Person {\n  constructor() { console.log(this.#name); }\n  #name = "John";\n}\nnew Person();',
    expected: "SyntaxError",
    explanation:
      "PRIVATE FIELD ACCESS BEFORE DECLARATION:\n1. Private fields are not hoisted; they are lexically scoped to the class body\n2. Accessing a private field before its declaration in the class body is a syntax error\n\nEXECUTION PHASE:\n1. The class is parsed: constructor references #name before field declaration → SyntaxError\n\n📌 KEY: Private fields must be declared before they are used (even in the same class). They are not hoisted.",
    options: ["SyntaxError", "undefined", "John", "ReferenceError"],
  },
  {
    id: "private-field-weakmap",
    type: "output",
    topic: "Classes",
    title: "private field internal representation",
    prompt: "What is logged?",
    code: "class Foo {\n  #priv = 10;\n  getPriv() { return this.#priv; }\n}\nconst f = new Foo();\nconsole.log(f.getPriv());",
    expected: "10",
    explanation:
      "PRIVATE FIELDS ARE ENFORCED AT LANGUAGE LEVEL:\n1. Private fields are truly private; they are not accessible outside the class.\n2. They are not properties of the object and cannot be accessed via reflection.\n3. Internally, implementations may use WeakMaps, but the spec guarantees privacy.\n\nEXECUTION PHASE:\n1. f.getPriv() → returns 10.\n\n📌 KEY: Private fields are not exposed in any way; they are a hard privacy guarantee.",
    options: ["10", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "class-field-order-computed",
    type: "output",
    topic: "Classes",
    title: "computed field names and order",
    prompt: "What is logged?",
    code: "let order = [];\nclass Foo {\n  [order.push('static field computed')] = 1;\n  static [order.push('static field computed')] = 2;\n  [order.push('instance field computed')] = 3;\n}\nconsole.log(order);",
    expected:
      "['static field computed', 'static field computed', 'instance field computed']",
    explanation:
      "COMPUTED FIELD EVALUATION ORDER:\n1. Static fields (computed keys) are evaluated during class definition, before instance fields.\n2. The order of execution is: static field keys, then static field values, then instance field keys, then instance field values.\n3. However, the computed keys are evaluated in the order they appear in the class body.\n\nEXECUTION PHASE:\n1. Class definition runs:\n   - First static field key: order.push('static field computed') → 'static field computed'.\n   - Second static field key: order.push('static field computed') → another entry.\n   - Instance field key: order.push('instance field computed') → entry.\n2. The array order logs accordingly.\n\n📌 KEY: Computed property names in class fields are evaluated in declaration order, separating static and instance.",
    options: [
      "['static field computed', 'static field computed', 'instance field computed']",
      "['static field computed', 'instance field computed']",
      "['instance field computed', 'static field computed']",
      "[]",
    ],
  },
  {
    id: "top-level-await-order",
    type: "output",
    topic: "Modules",
    title: "top-level await execution order",
    prompt: "What is logged? (module context)",
    code: "console.log('A');\nawait Promise.resolve();\nconsole.log('B');\nexport const x = 1;",
    expected: "A\nB",
    explanation:
      "TOP-LEVEL AWAIT PAUSES MODULE EVALUATION:\n1. In modules, top-level await suspends execution of the module until the promise settles.\n2. Other modules importing this module will wait for it to fully evaluate.\n3. The module's exports are only available after the await.\n\nEXECUTION PHASE:\n1. 'A' logs synchronously.\n2. await Promise.resolve() → microtask queue; module evaluation pauses.\n3. After promise resolves, evaluation continues: logs 'B'.\n\n📌 KEY: Top-level await does not block the main thread but pauses module loading.",
    options: ["A\nB", "B\nA", "A", "B"],
  },
  {
    id: "import-meta-hoist",
    type: "output",
    topic: "Modules",
    title: "import.meta hoisting",
    prompt: "What is logged? (module context)",
    code: "console.log(import.meta);\nexport {};",
    expected: "ImportMeta object",
    explanation:
      "IMPORT.META IS AVAILABLE IMMEDIATELY:\n1. `import.meta` is a meta‑property that is available at the module level from the start.\n2. It is not hoisted in the traditional sense; it's a built-in object accessible synchronously.\n3. It contains information about the module (e.g., URL).\n\nEXECUTION PHASE:\n1. console.log(import.meta) → logs the import.meta object.\n\n📌 KEY: import.meta is not subject to TDZ and can be used anywhere in the module.",
    options: ["ImportMeta object", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "global-this-hoisting-v2",
    type: "output",
    topic: "Scope",
    title: "globalThis and var hoisting",
    prompt: "What is logged?",
    code: "console.log(globalThis.a);\nvar a = 10;\nconsole.log(globalThis.a);",
    expected: "undefined\n10",
    explanation:
      "GLOBALTHIS REFLECTS VAR DECLARATIONS:\n1. In global scope, `var` declarations become properties of the global object.\n2. `globalThis` is the unified global object across environments.\n3. The property is created during hoisting but with value `undefined` until assignment.\n\nEXECUTION PHASE:\n1. First log: globalThis.a exists (from hoisting) but is undefined.\n2. a = 10 executes, setting the property.\n3. Second log: 10.\n\n📌 KEY: var declarations create properties on the global object, accessible via globalThis.",
    options: [
      "undefined\n10",
      "10\n10",
      "undefined\nundefined",
      "10\nundefined",
    ],
  },
  {
    id: "function-param-destructuring-default-hoist",
    type: "output",
    topic: "Functions",
    title: "destructuring default with outer variable",
    prompt: "What is logged?",
    code: "let a = 1;\nfunction foo({ a = a }) { console.log(a); }\nfoo({});",
    expected: "ReferenceError",
    explanation:
      "DEFAULT PARAMETER SHADOWING TDZ:\n1. The parameter destructuring creates a new lexical scope for parameters.\n2. `{ a = a }` tries to assign the default value using the parameter `a` before it is initialized → TDZ.\n3. The outer `a` is shadowed by the parameter, so it's not accessible.\n\nEXECUTION PHASE:\n1. foo({}) → destructuring: a = a → a (parameter) in TDZ → ReferenceError.\n\n📌 KEY: Default parameters create their own scope, and the identifier shadows outer bindings, causing TDZ errors.",
    options: ["1", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "class-static-block-arrow",
    type: "output",
    topic: "Classes",
    title: "arrow function in static block",
    prompt: "What is logged?",
    code: "class Foo {\n  static {\n    this.value = 10;\n    const get = () => this.value;\n    console.log(get());\n  }\n}",
    expected: "10",
    explanation:
      "ARROW FUNCTION IN STATIC BLOCK:\n1. Static blocks execute during class initialization.\n2. `this` inside a static block refers to the class constructor.\n3. Arrow functions inside capture `this` from the surrounding lexical scope (the class).\n\nEXECUTION PHASE:\n1. Static block runs: this.value = 10, arrow get captures this = Foo.\n2. get() → returns Foo.value → 10.\n\n📌 KEY: Static blocks are evaluated with `this` bound to the class; arrow functions retain that binding.",
    options: ["10", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "named-import-tdz",
    type: "output",
    topic: "Modules",
    title: "named import TDZ",
    prompt: "What is logged? (module context)",
    code: "console.log(foo);\nimport { foo } from './module.js';",
    expected: "ReferenceError",
    explanation:
      "IMPORT BINDINGS ARE IN TDZ:\n1. Imported bindings are hoisted but are in the Temporal Dead Zone until the module is fully evaluated.\n2. Accessing them before the import statement throws ReferenceError.\n\nEXECUTION PHASE:\n1. console.log(foo) → foo is in TDZ → ReferenceError.\n\n📌 KEY: Imports behave like `const` – they are hoisted but not accessible before the import line.",
    options: ["undefined", "ReferenceError", "null", "TypeError"],
  },
  {
    id: "dynamic-import-tdz",
    type: "output",
    topic: "Modules",
    title: "dynamic import and TDZ",
    prompt: "What is logged?",
    code: "const promise = import('./mod.js');\nconsole.log(promise);\nexport {};",
    expected: "Promise { <pending> }",
    explanation:
      "DYNAMIC IMPORT IS NOT A BINDING:\n1. `import()` is a function that returns a promise.\n2. There is no TDZ because it's not a declaration; it's a runtime expression.\n\nEXECUTION PHASE:\n1. import('./mod.js') starts loading the module, returns a pending promise.\n2. console.log(promise) → pending promise.\n\n📌 KEY: Dynamic import is not subject to TDZ because it's an expression, not a declaration.",
    options: [
      "Promise { <pending> }",
      "undefined",
      "ReferenceError",
      "TypeError",
    ],
  },
  {
    id: "typeof-tdz-duplicate",
    type: "output",
    topic: "TDZ",
    title: "typeof on let in TDZ",
    prompt: "What happens?",
    code: "console.log(typeof a);\nlet a = 1;",
    expected: "ReferenceError",
    explanation:
      "TYPEOF AND TDZ:\n1. Normally typeof on an undeclared variable returns 'undefined'.\n2. But for let/const/class in TDZ, typeof also throws a ReferenceError.\n3. This is because the variable exists (hoisted) but is uninitialized.\n\nEXECUTION PHASE:\n1. console.log(typeof a) → a is in TDZ → ReferenceError.\n\n📌 KEY: TDZ variables are considered 'initialized' in a way that even typeof cannot safely check them.",
    options: ['"undefined"', "ReferenceError", '"number"', "TypeError"],
  },
  {
    id: "typeof-function-tdz",
    type: "output",
    topic: "TDZ",
    title: "typeof on function with let",
    prompt: "What happens?",
    code: "console.log(typeof foo);\nlet foo = function() {};",
    expected: "ReferenceError",
    explanation:
      "TDZ APPLIES TO FUNCTION EXPRESSIONS WITH LET:\n1. The let binding foo is hoisted but in TDZ.\n2. The function expression is not hoisted.\n\nEXECUTION PHASE:\n1. typeof foo → foo in TDZ → ReferenceError.\n\n📌 KEY: The TDZ affects the identifier, regardless of what value it will eventually hold.",
    options: ['"function"', '"undefined"', "ReferenceError", '"object"'],
  },
  {
    id: "arrow-in-class-field-this",
    type: "output",
    topic: "Classes",
    title: "arrow function in class field referencing this",
    prompt: "What is logged?",
    code: "class Test {\n  name = 'Test';\n  method = () => console.log(this.name);\n}\nconst t = new Test();\nconst fn = t.method;\nfn();",
    expected: "Test",
    explanation:
      "ARROW FUNCTION IN CLASS FIELD:\n1. Class fields are evaluated per instance.\n2. The arrow function captures the instance's `this` at the time of field initialization.\n3. Even when extracted, it retains the correct `this`.\n\nEXECUTION PHASE:\n1. t.method → arrow function with this = t.\n2. fn = t.method, fn() → logs t.name → 'Test'.\n\n📌 KEY: Arrow functions in class fields are auto-bound to the instance, solving the 'this' loss problem.",
    options: ["Test", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "super-object-literal",
    type: "output",
    topic: "this",
    title: "super in object literal method",
    prompt: "What is logged?",
    code: "const parent = { name: 'Parent' };\nconst child = {\n  name: 'Child',\n  greet() {\n    return super.name;\n  }\n};\nObject.setPrototypeOf(child, parent);\nconsole.log(child.greet());",
    expected: "Parent",
    explanation:
      "SUPER IN OBJECT LITERALS:\n1. super can be used in object literal methods (ES6+).\n2. It refers to the prototype of the object where the method is defined (not where it's called).\n3. The prototype is set via Object.setPrototypeOf.\n\nEXECUTION PHASE:\n1. child.greet() → super.name looks up the prototype chain → finds parent.name → 'Parent'.\n\n📌 KEY: super is lexically bound to the object literal's prototype, not dynamic.",
    options: ["Parent", "Child", "undefined", "ReferenceError"],
  },
  {
    id: "new-target-arrow",
    type: "output",
    topic: "Functions",
    title: "new.target in arrow function",
    prompt: "What is logged?",
    code: "const Foo = () => { console.log(new.target); };\nnew Foo();",
    expected: "TypeError",
    explanation:
      "ARROW FUNCTIONS CANNOT BE CONSTRUCTORS:\n1. Arrow functions do not have a [[Construct]] internal method.\n2. Using `new` on an arrow function throws a TypeError.\n\nEXECUTION PHASE:\n1. new Foo() → TypeError: Foo is not a constructor.\n\n📌 KEY: Arrow functions are not constructible and cannot be called with `new`.",
    options: ["TypeError", "undefined", "ReferenceError", "[Function: Foo]"],
  },
  {
    id: "catch-var-hoisting",
    type: "output",
    topic: "Scope",
    title: "var in catch block hoisting",
    prompt: "What is logged?",
    code: "try {\n  throw new Error('oops');\n} catch (err) {\n  var err = 10;\n  console.log(err);\n}\nconsole.log(typeof err);",
    expected: "10\nundefined",
    explanation:
      "CATCH BLOCK SCOPE WITH VAR:\n1. The catch parameter `err` is block-scoped to the catch block.\n2. `var err` is hoisted to the function/global scope, not the block.\n3. Inside the catch block, the `var err` refers to a different variable (global/function) and shadows the catch parameter.\n\nEXECUTION PHASE:\n1. catch (err) → err is the error object.\n2. var err = 10 → hoisted var err (global) gets assigned 10.\n3. console.log(err) → prints 10 (the global var).\n4. After catch, typeof err → 'undefined' (if global err was not declared elsewhere).\n\n📌 KEY: `var` inside a catch block creates a variable in the outer function scope, not the catch block scope.",
    options: [
      "10\nundefined",
      "error\nundefined",
      "10\nnumber",
      "error\nnumber",
    ],
  },
  {
    id: "block-label-hoisting",
    type: "output",
    topic: "Scope",
    title: "labeled block and var",
    prompt: "What is logged?",
    code: "label: {\n  var x = 1;\n  break label;\n  x = 2;\n}\nconsole.log(x);",
    expected: "1",
    explanation:
      "LABELED BLOCKS AND HOISTING:\n1. `var x` is hoisted to the function/global scope, not block-scoped.\n2. The `break` statement exits the labeled block.\n3. The assignment `x = 2` is never reached.\n\nEXECUTION PHASE:\n1. var x is hoisted (undefined initially).\n2. x = 1 executes.\n3. break exits block, skipping x = 2.\n4. console.log(x) → 1.\n\n📌 KEY: var declarations ignore block boundaries, and break does not affect hoisting.",
    options: ["1", "2", "undefined", "ReferenceError"],
  },
  {
    id: "with-scope-chain",
    type: "output",
    topic: "Scope",
    title: "with statement variable lookup",
    prompt: "What is logged? (non‑strict)",
    code: "var x = 10;\nwith ({ x: 20 }) {\n  var y = x;\n}\nconsole.log(y);",
    expected: "20",
    explanation:
      "WITH STATEMENT AND VARIABLE RESOLUTION:\n1. `with` adds the given object to the scope chain.\n2. `var y` is hoisted to the function/global scope.\n3. Inside `with`, `x` resolves to the object's property (20).\n4. `y` is assigned 20.\n\nEXECUTION PHASE:\n1. var y hoisted.\n2. with block: x resolves to 20, y = 20.\n3. console.log(y) → 20.\n\n📌 KEY: Variable declarations inside `with` are hoisted to the outer scope, but variable lookups are affected by the scope chain extension.",
    options: ["10", "20", "undefined", "ReferenceError"],
  },
  {
    id: "arguments-arrow",
    type: "output",
    topic: "Functions",
    title: "arguments object in arrow function",
    prompt: "What happens?",
    code: "const foo = () => arguments[0];\nconsole.log(foo(5));",
    expected: "ReferenceError",
    explanation:
      "ARROW FUNCTIONS DO NOT HAVE AN ARGUMENTS OBJECT:\n1. Arrow functions do not bind `arguments`; they inherit from the parent scope.\n2. In global scope, `arguments` is not defined (strict mode) or refers to the global `arguments` object (non‑strict, but rare).\n3. Modern environments (strict modules) throw ReferenceError.\n\nEXECUTION PHASE:\n1. foo(5) → attempts to access `arguments` → ReferenceError (in strict mode/modules).\n\n📌 KEY: Use rest parameters `(...args)` instead of `arguments` in arrow functions.",
    options: ["5", "undefined", "ReferenceError", "TypeError"],
  },
  {
    id: "default-params-destructure-array",
    type: "output",
    topic: "Functions",
    title: "destructuring array default with later parameter",
    prompt: "What happens?",
    code: "function foo([a = b, b = 1]) { return a + b; }\nconsole.log(foo([]));",
    expected: "ReferenceError",
    explanation:
      "DESTRUCTURING DEFAULT TDZ:\n1. Default values are evaluated left to right in the parameter scope.\n2. `a = b` tries to access `b` before it is initialized → TDZ error.\n\nEXECUTION PHASE:\n1. foo([]) → destructuring: a = b, b is in TDZ → ReferenceError.\n\n📌 KEY: Destructuring default parameters are subject to TDZ like regular parameters.",
    options: ["2", "1", "ReferenceError", "undefined"],
  },
  {
    id: "promise-microtask-order",
    type: "output",
    topic: "Async",
    title: "Promise microtask vs setTimeout",
    prompt:
      "What is the output?\n```\nsetTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('sync');\n```",
    expected: "sync\npromise\ntimeout",
    explanation:
      "**Event Loop Order:**\n1. Synchronous code runs first: `console.log('sync')` → logs 'sync'.\n2. Microtask queue (Promise callbacks) runs immediately after sync code: `Promise.then` logs 'promise'.\n3. Macrotask queue (setTimeout) runs after microtasks: logs 'timeout'.\n\n**Key:** Microtasks (Promises, queueMicrotask) always execute before macrotasks (setTimeout, setInterval).",
    options: [
      "sync\npromise\ntimeout",
      "promise\ntimeout\nsync",
      "timeout\nsync\npromise",
      "sync\ntimeout\npromise",
    ],
  },
  {
    id: "promise-chaining-error",
    type: "output",
    topic: "Promises",
    title: "error handling in promise chain",
    prompt:
      "What is logged?\n```\nPromise.resolve()\n  .then(() => { throw new Error('fail'); })\n  .catch(err => console.log('caught', err.message))\n  .then(() => console.log('done'));\n```",
    expected: "caught fail\ndone",
    explanation:
      "**Promise Chain:**\n1. `Promise.resolve()` creates a fulfilled promise.\n2. First `then` throws an error → promise becomes rejected.\n3. `catch` catches the rejection, logs 'caught fail'.\n4. `catch` returns `undefined` (implicitly), so the chain continues with a fulfilled promise.\n5. Next `then` logs 'done'.\n\n**Key:** A `catch` that does not throw returns a fulfilled promise, allowing continuation.",
    options: [
      "caught fail\ndone",
      "fail\ndone",
      "ReferenceError",
      "caught fail",
    ],
  },
  {
    id: "promise-all-race",
    type: "output",
    topic: "Promises",
    title: "Promise.all with rejected promise",
    prompt:
      "What is the output?\n```\nconst p1 = Promise.resolve(1);\nconst p2 = Promise.reject('error');\nconst p3 = Promise.resolve(3);\nPromise.all([p1, p2, p3])\n  .then(v => console.log(v))\n  .catch(e => console.log('rejected', e));\n```",
    expected: "rejected error",
    explanation:
      "**Promise.all behavior:**\n1. `Promise.all` returns a promise that rejects as soon as any input promise rejects.\n2. Here, `p2` rejects with `'error'`, so the `catch` handler is called immediately.\n3. The `then` is never called.\n4. Output: `rejected error`.\n\n**Key:** `Promise.all` short‑circuits on first rejection.",
    options: ["rejected error", "[1, error, 3]", "[1, 3]", "rejected [error]"],
  },
  {
    id: "promise-race",
    type: "output",
    topic: "Promises",
    title: "Promise.race with mixed outcome",
    prompt:
      "What is the output?\n```\nconst p1 = new Promise(resolve => setTimeout(() => resolve('fast'), 50));\nconst p2 = new Promise((_, reject) => setTimeout(() => reject('slow'), 100));\nPromise.race([p1, p2])\n  .then(v => console.log('resolved', v))\n  .catch(e => console.log('rejected', e));\n```",
    expected: "resolved fast",
    explanation:
      "**Promise.race behavior:**\n1. `Promise.race` settles (resolves or rejects) with the first promise that settles.\n2. `p1` resolves after 50ms, `p2` rejects after 100ms.\n3. The winner is `p1` (resolved with `'fast'`).\n4. Output: `resolved fast`.\n\n**Key:** `race` does not wait for others; the first settled promise decides the outcome.",
    options: [
      "resolved fast",
      "rejected slow",
      "resolved slow",
      "rejected fast",
    ],
  },
  {
    id: "promise-any",
    type: "output",
    topic: "Promises",
    title: "Promise.any with all rejections",
    prompt:
      "What is the output?\n```\nconst p1 = Promise.reject(1);\nconst p2 = Promise.reject(2);\nPromise.any([p1, p2])\n  .then(v => console.log('resolved', v))\n  .catch(e => console.log('rejected', e.errors));\n```",
    expected: "rejected [1,2]",
    explanation:
      "**Promise.any behavior:**\n1. `Promise.any` resolves with the first fulfilled promise. If all reject, it rejects with `AggregateError` containing all rejection reasons.\n2. Here, both promises reject.\n3. The `catch` receives an `AggregateError`; `e.errors` gives the array of rejection values.\n4. Output: `rejected [1,2]`.\n\n**Key:** `any` waits for the first success; if none, rejects with `AggregateError`.",
    options: [
      "rejected [1,2]",
      "resolved undefined",
      "rejected 1",
      "rejected 2",
    ],
  },
  {
    id: "async-await-throw",
    type: "output",
    topic: "Async",
    title: "async function throwing error",
    prompt:
      "What is logged?\n```\nasync function test() {\n  throw new Error('fail');\n}\ntest().catch(e => console.log('caught', e.message));\nconsole.log('sync');\n```",
    expected: "sync\ncaught fail",
    explanation:
      "**Async function error handling:**\n1. An async function that throws returns a rejected promise.\n2. `test()` returns a rejected promise.\n3. The `catch` handler is attached and will run asynchronously.\n4. `console.log('sync')` runs first (synchronous).\n5. Then the microtask runs: `caught fail`.\n\n**Key:** Throwing inside an async function is equivalent to returning `Promise.reject`.",
    options: [
      "caught fail\nsync",
      "sync\ncaught fail",
      "fail\nsync",
      "ReferenceError",
    ],
  },
  {
    id: "await-resolve",
    type: "output",
    topic: "Async",
    title: "awaiting resolved promise",
    prompt:
      "What is logged?\n```\nasync function test() {\n  const result = await Promise.resolve('hello');\n  console.log(result);\n}\ntest();\nconsole.log('world');\n```",
    expected: "world\nhello",
    explanation:
      "**Async/await microtask order:**\n1. `test()` is called; it starts running synchronously until `await`.\n2. `await` suspends the function and schedules the rest as a microtask.\n3. `console.log('world')` runs synchronously.\n4. After sync code finishes, the microtask runs: `console.log(result)` → logs 'hello'.\n\n**Key:** `await` always yields control, scheduling subsequent code as a microtask.",
    options: ["hello\nworld", "world\nhello", "hello", "world"],
  },
  {
    id: "multiple-await-order",
    type: "output",
    topic: "Async",
    title: "multiple awaits",
    prompt:
      "What is logged?\n```\nasync function test() {\n  console.log(1);\n  await null;\n  console.log(2);\n  await null;\n  console.log(3);\n}\ntest();\nconsole.log(4);\n```",
    expected: "1\n4\n2\n3",
    explanation:
      "**Multiple await scheduling:**\n1. `test()` starts: `console.log(1)` → logs 1.\n2. `await null` suspends, schedules the rest as a microtask.\n3. `console.log(4)` runs synchronously → logs 4.\n4. Microtask runs: continues after first await → logs 2.\n5. Second `await null` suspends again, schedules the next microtask.\n6. Next microtask runs: logs 3.\n\n**Key:** Each `await` creates a new microtask; they execute sequentially after sync code.",
    options: ["1\n2\n3\n4", "1\n4\n2\n3", "1\n2\n4\n3", "4\n1\n2\n3"],
  },
  {
    id: "unhandled-rejection",
    type: "output",
    topic: "Promises",
    title: "unhandled promise rejection",
    prompt:
      "What happens?\n```\nPromise.reject('error');\nconsole.log('sync');\n```",
    expected: "sync\n(UnhandledPromiseRejectionWarning)",
    explanation:
      "**Unhandled rejection:**\n1. `Promise.reject('error')` creates a rejected promise with no `.catch` attached.\n2. `console.log('sync')` runs normally.\n3. After the synchronous code finishes, the JavaScript runtime detects an unhandled promise rejection and emits a warning (or error in some environments).\n4. In Node.js, it may also terminate the process if `--unhandled-rejections=strict`.\n\n**Key:** Always attach `.catch` to promises that may reject, or use `try/catch` with async/await.",
    options: [
      "sync",
      "error\nsync",
      "sync\nerror",
      "sync\n(Promise rejection warning)",
    ],
  },
  {
    id: "queueMicrotask",
    type: "output",
    topic: "Async",
    title: "queueMicrotask vs Promise",
    prompt:
      "What is logged?\n```\nqueueMicrotask(() => console.log('micro'));\nPromise.resolve().then(() => console.log('promise'));\nconsole.log('sync');\n```",
    expected: "sync\nmicro\npromise",
    explanation:
      "**Microtask order:**\n1. Both `queueMicrotask` and `Promise.then` schedule microtasks.\n2. They are executed in the order they were queued (FIFO).\n3. `sync` runs first.\n4. Then `micro` (from queueMicrotask) runs before `promise` because it was added first.\n5. Output: `sync`, `micro`, `promise`.\n\n**Key:** `queueMicrotask` is a direct way to enqueue a microtask, with the same priority as Promise callbacks.",
    options: [
      "sync\nmicro\npromise",
      "sync\npromise\nmicro",
      "micro\nsync\npromise",
      "promise\nsync\nmicro",
    ],
  },
  {
    id: "promise-allSettled",
    type: "output",
    topic: "Promises",
    title: "Promise.allSettled output shape",
    prompt:
      "What is the output?\n```\nconst p1 = Promise.resolve(1);\nconst p2 = Promise.reject('error');\nPromise.allSettled([p1, p2]).then(results => console.log(results));\n```",
    expected:
      "[ { status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'error' } ]",
    explanation:
      "**Promise.allSettled behavior:**\n1. It waits for all promises to settle (fulfill or reject).\n2. It never rejects; always resolves with an array of objects.\n3. Each object has a `status` (`'fulfilled'` or `'rejected'`).\n4. For fulfilled: includes `value`. For rejected: includes `reason`.\n5. Output: array of two objects with the described shape.\n\n**Key:** `allSettled` is ideal when you need to know the outcome of every promise, regardless of rejections.",
    options: [
      "[ { status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'error' } ]",
      "[ 1, 'error' ]",
      "rejected error",
      "Error: all settled",
    ],
  },
  {
    id: "event-loop-nested-micro",
    type: "output",
    topic: "Async",
    title: "nested microtasks order",
    prompt:
      "What is logged?\n```\nPromise.resolve().then(() => {\n  console.log(1);\n  Promise.resolve().then(() => console.log(2));\n});\nPromise.resolve().then(() => console.log(3));\n```",
    expected: "1\n3\n2",
    explanation:
      "**Nested microtask order:**\n1. Two microtasks are queued: first (logs 1 and schedules inner microtask), second (logs 3).\n2. Microtask queue runs first task: logs 1, then schedules a new microtask (logs 2) at the end of the queue.\n3. Then the second task runs: logs 3.\n4. Finally, the newly scheduled task runs: logs 2.\n\n**Key:** Microtasks scheduled during microtask execution are added to the same queue and run after the current microtask completes but before the next macrotask.",
    options: ["1\n2\n3", "1\n3\n2", "3\n1\n2", "2\n1\n3"],
  },
  {
    id: "event-loop-macro-micro-order",
    type: "output",
    topic: "Event Loop",
    title: "macrotask vs microtask order",
    prompt:
      "What is logged?\n```\nsetTimeout(() => console.log('A'), 0);\nPromise.resolve().then(() => console.log('B'));\nqueueMicrotask(() => console.log('C'));\nconsole.log('D');\n```",
    expected: "D\nB\nC\nA",
    explanation:
      "**Event Loop Steps:** 1. Synchronous: `console.log('D')` → logs 'D'. 2. Microtask queue (FIFO): `B` then `C`. 3. Macrotask queue: `A`. Output: D, B, C, A.\n\n**Key:** All microtasks run before any macrotask. `queueMicrotask` and Promise.then are both microtasks; they run in order of insertion.",
    options: ["D\nA\nB\nC", "D\nB\nC\nA", "D\nC\nB\nA", "A\nB\nC\nD"],
  },
  {
    id: "event-loop-macrotask-nested",
    type: "output",
    topic: "Event Loop",
    title: "nested setTimeout",
    prompt:
      "What is logged?\n```\nsetTimeout(() => console.log('A'), 0);\nsetTimeout(() => {\n  console.log('B');\n  setTimeout(() => console.log('C'), 0);\n}, 0);\nsetTimeout(() => console.log('D'), 0);\n```",
    expected: "A\nB\nD\nC",
    explanation:
      "**Macrotask queue order:** 1. All three `setTimeout` callbacks are queued in order: [A, (B then schedules C), D]. 2. First macrotask runs: logs A. 3. Second macrotask runs: logs B, then schedules C (adds to end of macrotask queue). 4. Third macrotask runs: logs D. 5. Finally, the newly scheduled macrotask runs: logs C. Output: A, B, D, C.\n\n**Key:** Macrotasks scheduled during macrotask execution are added to the same queue and run after all current macrotasks finish.",
    options: ["A\nB\nC\nD", "A\nB\nD\nC", "A\nC\nB\nD", "B\nA\nD\nC"],
  },
  {
    id: "prototype-chain-basic",
    type: "output",
    topic: "Prototypes",
    title: "basic prototype lookup",
    prompt:
      "What is logged?\n```\nconst parent = { a: 10 };\nconst child = Object.create(parent);\nconsole.log(child.a);\nconsole.log(child.b);\n```",
    expected: "10\nundefined",
    explanation:
      "**Prototype chain:** 1. `Object.create(parent)` creates a new object `child` whose prototype is `parent`. 2. `child.a`: property not found on `child`, so JS looks up the prototype chain → finds `parent.a = 10`. 3. `child.b`: not found on `child` or its prototype → returns `undefined`.\n\n**Key:** Objects inherit properties from their prototype chain. `Object.create` sets the prototype.",
    options: [
      "10\nundefined",
      "undefined\n10",
      "10\n10",
      "undefined\nundefined",
    ],
  },
  {
    id: "object-create-null",
    type: "output",
    topic: "Prototypes",
    title: "Object.create(null) has no prototype",
    prompt:
      "What is logged?\n```\nconst obj = Object.create(null);\nconsole.log(obj.toString);\nconsole.log(obj.__proto__);\n```",
    expected: "undefined\nundefined",
    explanation:
      "`Object.create(null)` creates an object with no prototype (literally `null`). It doesn't inherit `Object.prototype` methods like `toString`. Accessing `obj.__proto__` also returns `undefined` (since `__proto__` is not defined).\n\n**Key:** `Object.create(null)` is useful for creating pure dictionaries without prototype pollution.",
    options: [
      "[Function: toString]\n{}",
      "undefined\n{}",
      "undefined\nundefined",
      "[Function: toString]\nundefined",
    ],
  },
  {
    id: "setprototypeof",
    type: "output",
    topic: "Prototypes",
    title: "changing prototype with setPrototypeOf",
    prompt:
      "What is logged?\n```\nconst obj = { a: 1 };\nconst proto = { b: 2 };\nObject.setPrototypeOf(obj, proto);\nconsole.log(obj.a);\nconsole.log(obj.b);\n```",
    expected: "1\n2",
    explanation:
      "`Object.setPrototypeOf(obj, proto)` sets the prototype of `obj` to `proto`. `obj.a` is its own property (1). `obj.b` is not found directly, so it looks up to `proto` and finds 2.\n\n**Key:** You can dynamically change an object's prototype, but this is a slow operation and generally discouraged for performance reasons.",
    options: ["1\n2", "1\nundefined", "undefined\n2", "undefined\nundefined"],
  },
  {
    id: "instanceof",
    type: "output",
    topic: "Prototypes",
    title: "instanceof operator",
    prompt:
      "What is logged?\n```\nfunction Parent() {}\nconst child = new Parent();\nconsole.log(child instanceof Parent);\nconsole.log(child instanceof Object);\n```",
    expected: "true\ntrue",
    explanation:
      "`instanceof` checks the constructor's prototype property against the object's prototype chain. `child` was created with `new Parent()`, so its prototype is `Parent.prototype`. Hence `child instanceof Parent` is `true`. Since `Parent.prototype` inherits from `Object.prototype`, `child instanceof Object` is also `true`.\n\n**Key:** `instanceof` tests inheritance; all objects are instances of `Object` (unless created with `Object.create(null)`).",
    options: ["true\ntrue", "true\nfalse", "false\ntrue", "false\nfalse"],
  },
  {
    id: "defineProperty-getter",
    type: "output",
    topic: "Objects",
    title: "Object.defineProperty getter",
    prompt:
      "What is logged?\n```\nconst obj = {};\nObject.defineProperty(obj, 'a', {\n  get() { return this._a; },\n  set(v) { this._a = v; }\n});\nobj.a = 10;\nconsole.log(obj.a);\n```",
    expected: "10",
    explanation:
      "`Object.defineProperty` defines a getter/setter for property `'a'`. Setting `obj.a = 10` calls the setter, which stores the value in `_a` (a normal property). Getting `obj.a` calls the getter, which returns `this._a` (10).\n\n**Key:** Getters/setters allow property logic while keeping the syntax of a regular property.",
    options: ["10", "undefined", "TypeError", "ReferenceError"],
  },
  {
    id: "defineProperty-configurable",
    type: "output",
    topic: "Objects",
    title: "non‑configurable property",
    prompt:
      "What happens?\n```\nconst obj = {};\nObject.defineProperty(obj, 'a', { value: 1, configurable: false });\nobj.a = 2;\nconsole.log(obj.a);\n```",
    expected: "1",
    explanation:
      "When `configurable: false`, the property cannot be deleted or changed in attribute (value, writable, etc.), but if `writable` is not specified, it defaults to `false`. Hence the property `a` is read‑only. Assignment `obj.a = 2` is silently ignored (non‑strict mode) or throws in strict mode. The value remains `1`.\n\n**Key:** Non‑configurable properties also prevent redefinition; if `writable` is `false`, the value cannot be changed.",
    options: ["1", "2", "TypeError", "undefined"],
  },
  {
    id: "proxy-basic",
    type: "output",
    topic: "Proxy",
    title: "basic Proxy trap",
    prompt:
      "What is logged?\n```\nconst obj = { a: 1 };\nconst proxy = new Proxy(obj, {\n  get(target, prop) {\n    return target[prop] + 5;\n  }\n});\nconsole.log(proxy.a);\nconsole.log(obj.a);\n```",
    expected: "6\n1",
    explanation:
      "The `get` trap intercepts property access on the proxy. For `proxy.a`, the trap returns `target.a + 5` = 1+5=6. The original object `obj` is unaffected, so `obj.a` remains 1.\n\n**Key:** Proxies allow custom behavior for fundamental operations (get, set, etc.) without modifying the original object.",
    options: ["6\n1", "1\n6", "6\n6", "1\n1"],
  },
  {
    id: "proxy-set-validation",
    type: "output",
    topic: "Proxy",
    title: "proxy set trap validation",
    prompt:
      "What is logged?\n```\nconst obj = {};\nconst proxy = new Proxy(obj, {\n  set(target, prop, value) {\n    if (prop === 'age' && value < 0) return false;\n    target[prop] = value;\n    return true;\n  }\n});\nproxy.age = -5;\nconsole.log(proxy.age);\n```",
    expected: "undefined",
    explanation:
      "The `set` trap checks if the property is `age` and value is negative. In that case, it returns `false` (meaning the assignment should fail). In non‑strict mode, returning `false` from the trap silently ignores the assignment; `proxy.age` remains undefined. In strict mode, it would throw a `TypeError`.\n\n**Key:** The `set` trap must return a boolean to indicate success or failure of the assignment.",
    options: ["undefined", "-5", "0", "TypeError"],
  },
  {
    id: "symbol-iterator",
    type: "output",
    topic: "Iterators",
    title: "custom iterator with Symbol.iterator",
    prompt:
      "What is logged?\n```\nconst obj = {\n  data: [1, 2, 3],\n  [Symbol.iterator]() {\n    let index = 0;\n    return { next: () => ({ value: this.data[index++], done: index > this.data.length }) };\n  }\n};\nconsole.log([...obj]);\n```",
    expected: "[1, 2, 3]",
    explanation:
      "The object defines a custom iterator using `[Symbol.iterator]`. The spread operator `[...obj]` calls this iterator and collects values. The iterator returns `{ value, done }` objects, producing 1, 2, 3.\n\n**Key:** Any object with a `[Symbol.iterator]` method that returns an iterator protocol object can be used with `for...of` and spread syntax.",
    options: ["[1, 2, 3]", "[1, 2, 3, undefined]", "[]", "TypeError"],
  },
  {
    id: "generator-iterator",
    type: "output",
    topic: "Generators",
    title: "generator function as iterator",
    prompt:
      "What is logged?\n```\nfunction* gen() {\n  yield 1;\n  yield 2;\n  return 3;\n}\nconst it = gen();\nconsole.log(it.next());\nconsole.log(it.next());\nconsole.log(it.next());\n```",
    expected:
      "{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: 3, done: true }",
    explanation:
      "Generator functions return an iterator. Each `next()` returns `{ value, done }`. `yield` produces `done: false`, and the `return` value produces `done: true` with the returned value.\n\n**Key:** `return` in a generator provides the final value, while `yield` pauses execution.",
    options: [
      "{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: 3, done: true }",
      "1\n2\n3",
      "{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: undefined, done: true }",
      "1\n2\nundefined",
    ],
  },
  {
    id: "event-loop-macro-micro-nested",
    type: "output",
    topic: "Async",
    title: "nested setTimeout and Promise",
    prompt:
      "What is the output?\n```\nsetTimeout(() => console.log('timeout1'), 0);\nPromise.resolve().then(() => {\n  console.log('promise1');\n  setTimeout(() => console.log('timeout2'), 0);\n});\nPromise.resolve().then(() => console.log('promise2'));\nconsole.log('sync');\n```",
    expected: "sync\npromise1\npromise2\ntimeout1\ntimeout2",
    explanation:
      "**Event Loop Steps:**\n1. Sync: `console.log('sync')` → 'sync'.\n2. Microtask queue: [promise1 (with inner timeout), promise2].\n   - Execute first microtask: logs 'promise1', schedules `timeout2`.\n   - Execute second microtask: logs 'promise2'.\n3. Macrotask queue: [timeout1, timeout2].\n   - Execute `timeout1`: logs 'timeout1'.\n   - Execute `timeout2`: logs 'timeout2'.\n\n**Key:** Microtasks always run before any macrotask. Microtasks scheduled during microtask execution are added to the same microtask queue (run in same tick).",
    options: [
      "sync\npromise1\npromise2\ntimeout1\ntimeout2",
      "sync\npromise1\ntimeout1\npromise2\ntimeout2",
      "promise1\nsync\npromise2\ntimeout1\ntimeout2",
      "sync\ntimeout1\npromise1\ntimeout2\npromise2",
    ],
  },
  {
    id: "promise-all-empty",
    type: "output",
    topic: "Promises",
    title: "Promise.all with empty array",
    prompt:
      "What is logged?\n```\nPromise.all([]).then(v => console.log(v));\nconsole.log('sync');\n```",
    expected: "sync\n[]",
    explanation:
      "**Promise.all with empty array:**\n1. `Promise.all([])` returns a promise that resolves immediately with an empty array.\n2. The resolved promise's `then` callback is a microtask.\n3. `console.log('sync')` runs first.\n4. Then the microtask runs, logging `[]`.\n\n**Key:** `Promise.all` of an empty iterable resolves synchronously (already fulfilled), but its callbacks are still microtasks.",
    options: ["[]\nsync", "sync\n[]", "sync", "[]"],
  },
  {
    id: "promise-any-empty",
    type: "output",
    topic: "Promises",
    title: "Promise.any with empty array",
    prompt:
      "What happens?\n```\nPromise.any([]).catch(e => console.log(e.errors));\n```",
    expected: "[]",
    explanation:
      "**Promise.any with empty array:**\n1. `Promise.any([])` rejects immediately with an `AggregateError`.\n2. The error's `errors` property is an empty array.\n3. The `catch` handler logs `[]`.\n\n**Key:** `Promise.any` of an empty iterable always rejects because there are no promises to fulfill.",
    options: [
      "[]",
      "undefined",
      "TypeError",
      "AggregateError: All promises were rejected",
    ],
  },
  {
    id: "promise-race-stable",
    type: "output",
    topic: "Promises",
    title: "Promise.race with already settled promises",
    prompt:
      "What is logged?\n```\nconst p1 = Promise.resolve('first');\nconst p2 = new Promise(resolve => setTimeout(() => resolve('second'), 0));\nPromise.race([p1, p2]).then(v => console.log(v));\nconsole.log('sync');\n```",
    expected: "sync\nfirst",
    explanation:
      "**Promise.race with already resolved promise:**\n1. `p1` is already resolved (fulfilled).\n2. `p2` is pending but will resolve later.\n3. `Promise.race` settles with `p1` immediately because it's already resolved.\n4. The `then` callback is a microtask.\n5. `console.log('sync')` runs first, then microtask logs 'first'.\n\n**Key:** `race` settles synchronously if one of the promises is already settled at the time of call.",
    options: ["sync\nfirst", "first\nsync", "sync\nsecond", "first"],
  },
  {
    id: "async-await-try-catch",
    type: "output",
    topic: "Async",
    title: "async/await with try/catch",
    prompt:
      "What is logged?\n```\nasync function test() {\n  try {\n    await Promise.reject('error');\n  } catch (e) {\n    console.log('caught', e);\n  }\n  console.log('done');\n}\ntest();\nconsole.log('sync');\n```",
    expected: "sync\ncaught error\ndone",
    explanation:
      "**Async/await error handling:**\n1. `test()` starts, `await Promise.reject('error')` throws an exception.\n2. The `catch` block catches it, logs 'caught error'.\n3. After `catch`, execution continues: logs 'done'.\n4. Meanwhile, `console.log('sync')` in main runs first (synchronous).\n5. Output order: 'sync', then after microtask resumes: 'caught error', then 'done'.\n\n**Key:** `await` rejection is caught by `try/catch` just like synchronous throws.",
    options: [
      "caught error\ndone\nsync",
      "sync\ncaught error\ndone",
      "error\ndone",
      "sync\ndone",
    ],
  },
  {
    id: "async-return-vs-await",
    type: "output",
    topic: "Async",
    title: "return vs await in async function",
    prompt:
      "What is logged?\n```\nasync function test() {\n  return Promise.resolve(1);\n}\ntest().then(v => console.log(v));\n```",
    expected: "1",
    explanation:
      "**Async function return value:**\n1. An async function always returns a promise.\n2. If you return a promise explicitly, it is not wrapped again; the returned promise is that promise.\n3. `test()` returns `Promise.resolve(1)`.\n4. `then` receives `1`.\n\n**Key:** Returning a promise from an async function is fine; the value is not double‑wrapped.",
    options: ["1", "Promise { 1 }", "undefined", "ReferenceError"],
  },
  {
    id: "await-non-promise",
    type: "output",
    topic: "Async",
    title: "await on non‑promise value",
    prompt:
      "What is logged?\n```\nasync function test() {\n  const x = await 42;\n  console.log(x);\n}\ntest();\nconsole.log('sync');\n```",
    expected: "sync\n42",
    explanation:
      "**Await on non‑promise:**\n1. `await 42` treats the non‑promise value as a resolved promise (implicit `Promise.resolve(42)`).\n2. The function suspends and the rest becomes a microtask.\n3. `console.log('sync')` runs first.\n4. Then microtask runs: logs `42`.\n\n**Key:** `await` always wraps the expression in `Promise.resolve()`; it works with any value.",
    options: ["42\nsync", "sync\n42", "42", "sync"],
  },
  {
    id: "promise-then-vs-catch-order",
    type: "output",
    topic: "Promises",
    title: "then vs catch order after rejection",
    prompt:
      "What is logged?\n```\nPromise.reject('error')\n  .then(() => console.log('then1'))\n  .catch(e => console.log('catch1', e))\n  .then(() => console.log('then2'));\n```",
    expected: "catch1 error\nthen2",
    explanation:
      "**Promise chain after rejection:**\n1. `Promise.reject('error')` → rejected promise.\n2. The first `then` is skipped (no rejection handler).\n3. `catch` catches the rejection, logs 'catch1 error'.\n4. `catch` returns `undefined` (implicitly), so the next `then` runs.\n5. Logs 'then2'.\n\n**Key:** A `catch` that does not throw or return a rejected promise will satisfy the next `then`.",
    options: [
      "catch1 error",
      "catch1 error\nthen2",
      "then1\ncatch1 error\nthen2",
      "error\nthen2",
    ],
  },
  {
    id: "promise-finally-value",
    type: "output",
    topic: "Promises",
    title: "finally does not modify value",
    prompt:
      "What is logged?\n```\nPromise.resolve(1)\n  .finally(() => 2)\n  .then(v => console.log(v));\n```",
    expected: "1",
    explanation:
      "**Promise.finally:**\n1. `finally` runs a callback regardless of fulfillment or rejection.\n2. It does **not** change the resolved value; it passes the original value through.\n3. Even though `finally` returns `2`, that return value is ignored.\n4. The `then` receives the original value `1`.\n\n**Key:** `finally` is for cleanup; it does not affect the promise's resolved value. If `finally` throws, it will reject instead.",
    options: ["1", "2", "undefined", "TypeError"],
  },
  {
    id: "promise-catch-return",
    type: "output",
    topic: "Promises",
    title: "catch returns a value",
    prompt:
      "What is logged?\n```\nPromise.reject('error')\n  .catch(e => { return 'recovered'; })\n  .then(v => console.log(v));\n```",
    expected: "recovered",
    explanation:
      "**Catch returning a value:**\n1. `Promise.reject` → rejected.\n2. `catch` handler runs, returns `'recovered'`.\n3. The catch returns a fulfilled promise with that value.\n4. `then` receives `'recovered'` and logs it.\n\n**Key:** Returning a non‑rejected value from `catch` recovers the promise chain; the error is considered handled.",
    options: ["recovered", "error", "undefined", "TypeError"],
  },
  {
    id: "async-parallel-vs-series",
    type: "output",
    topic: "Async",
    title: "parallel vs sequential await",
    prompt:
      "What is the approximate total time? (Assume each `delay` takes 100ms)\n```\nasync function delay(ms) { await new Promise(r => setTimeout(r, ms)); }\nasync function parallel() {\n  const p1 = delay(100);\n  const p2 = delay(100);\n  await p1;\n  await p2;\n}\nasync function sequential() {\n  await delay(100);\n  await delay(100);\n}\nconsole.time('parallel'); await parallel(); console.timeEnd('parallel');\nconsole.time('sequential'); await sequential(); console.timeEnd('sequential');\n```",
    expected: "parallel ~100ms, sequential ~200ms",
    explanation:
      "**Parallel vs Sequential:**\n1. In `parallel`, both `delay(100)` promises are created immediately and run concurrently.\n2. `await p1` waits for the first (100ms), then `await p2` — but `p2` already started in parallel, so it resolves almost immediately after `p1`. Total ≈100ms.\n3. In `sequential`, each `await` starts a new 100ms delay after the previous finishes. Total ≈200ms.\n\n**Key:** To run promises concurrently, create them before awaiting. Awaiting in sequence forces serial execution.",
    options: [
      "parallel ~200ms, sequential ~100ms",
      "parallel ~100ms, sequential ~200ms",
      "both ~100ms",
      "both ~200ms",
    ],
  },
  {
    id: "promise-then-constructor",
    type: "output",
    topic: "Promises",
    title: "Promise constructor executor order",
    prompt:
      "What is logged?\n```\nconsole.log('start');\nnew Promise((resolve) => {\n  console.log('executor');\n  resolve('resolved');\n}).then(v => console.log(v));\nconsole.log('end');\n```",
    expected: "start\nexecutor\nend\nresolved",
    explanation:
      "**Promise constructor executor:**\n1. The executor function runs **synchronously** when the promise is created.\n2. Logs: 'start', then 'executor' (sync), then 'end'.\n3. The `resolve` call schedules the `then` callback as a microtask.\n4. After sync code, microtask runs: logs 'resolved'.\n\n**Key:** The promise executor is invoked immediately; `then` callbacks are always asynchronous (microtask).",
    options: [
      "start\nexecutor\nresolved\nend",
      "start\nend\nexecutor\nresolved",
      "start\nexecutor\nend\nresolved",
      "executor\nstart\nend\nresolved",
    ],
  },
  {
    id: "prototype-chain-basic",
    type: "output",
    topic: "Prototypes",
    title: "basic prototype chain lookup",
    prompt:
      "What is logged?\n```\nconst parent = { a: 10 };\nconst child = Object.create(parent);\nconsole.log(child.a);\n```",
    expected: "10",
    explanation:
      "**Prototype chain:**\n1. `Object.create(parent)` creates a new object `child` whose prototype is `parent`.\n2. `child` has no own property `a`.\n3. JavaScript looks up the prototype chain and finds `parent.a = 10`.\n\n**Key:** `Object.create` sets the prototype; property lookup traverses the chain.",
    options: ["10", "undefined", "null", "ReferenceError"],
  },
  {
    id: "prototype-shadowing",
    type: "output",
    topic: "Prototypes",
    title: "shadowing prototype property",
    prompt:
      "What is logged?\n```\nconst parent = { a: 10 };\nconst child = Object.create(parent);\nchild.a = 20;\nconsole.log(child.a);\nconsole.log(parent.a);\n```",
    expected: "20\n10",
    explanation:
      "**Property shadowing:**\n1. `child.a = 20` creates an own property `a` on `child`.\n2. This shadows the prototype property `parent.a`.\n3. Reading `child.a` returns `20` (own property).\n4. `parent.a` remains unchanged at `10`.\n\n**Key:** Assigning to an object property creates an own property; it does not modify the prototype.",
    options: ["10\n10", "20\n20", "20\n10", "10\n20"],
  },
  {
    id: "hasOwnProperty",
    type: "output",
    topic: "Prototypes",
    title: "hasOwnProperty vs in operator",
    prompt:
      "What is logged?\n```\nconst parent = { a: 10 };\nconst child = Object.create(parent);\nchild.b = 20;\nconsole.log(child.hasOwnProperty('a'));\nconsole.log('a' in child);\n```",
    expected: "false\ntrue",
    explanation:
      "**hasOwnProperty vs in:**\n1. `hasOwnProperty` checks only own properties (not inherited).\n2. `'a' in child` checks the entire prototype chain.\n3. `child` has own property `b`, not `a`.\n4. `hasOwnProperty('a')` → `false`.\n5. `'a' in child` → finds `parent.a` → `true`.\n\n**Key:** `hasOwnProperty` ignores inheritance; `in` includes inherited properties.",
    options: ["true\ntrue", "false\ntrue", "true\nfalse", "false\nfalse"],
  },
  {
    id: "constructor-property",
    type: "output",
    topic: "Prototypes",
    title: "constructor property",
    prompt:
      "What is logged?\n```\nfunction Person(name) { this.name = name; }\nconst p = new Person('Alice');\nconsole.log(p.constructor === Person);\nconsole.log(p.constructor === Object);\n```",
    expected: "true\nfalse",
    explanation:
      "**Constructor property:**\n1. `p.constructor` comes from `Person.prototype.constructor` which points to `Person`.\n2. `p.constructor === Person` → `true`.\n3. `p.constructor === Object` → `false`.\n4. The `constructor` property is inherited from the prototype.\n\n**Key:** Every function has a `prototype` object with a `constructor` property pointing back to the function.",
    options: ["true\ntrue", "false\ntrue", "true\nfalse", "false\nfalse"],
  },
  {
    id: "instanceof-operator",
    type: "output",
    topic: "Prototypes",
    title: "instanceof operator",
    prompt:
      "What is logged?\n```\nfunction Animal() {}\nfunction Dog() {}\nDog.prototype = Object.create(Animal.prototype);\nconst d = new Dog();\nconsole.log(d instanceof Dog);\nconsole.log(d instanceof Animal);\n```",
    expected: "true\ntrue",
    explanation:
      "**instanceof operator:**\n1. `instanceof` checks the prototype chain.\n2. `Dog.prototype` is in the prototype chain of `d` → `true`.\n3. `Animal.prototype` is also in the chain (via `Dog.prototype` inheriting from `Animal.prototype`) → `true`.\n\n**Key:** `instanceof` traverses the entire prototype chain; it works with custom inheritance.",
    options: ["true\nfalse", "false\ntrue", "true\ntrue", "false\nfalse"],
  },
  {
    id: "object-create-null",
    type: "output",
    topic: "Prototypes",
    title: "Object.create(null)",
    prompt:
      "What is logged?\n```\nconst obj = Object.create(null);\nconsole.log(obj.toString);\n```",
    expected: "undefined",
    explanation:
      "**Object with no prototype:**\n1. `Object.create(null)` creates an object with `null` as its prototype (no inheritance).\n2. It has no built‑in methods like `toString`, `hasOwnProperty`, etc.\n3. Accessing `obj.toString` returns `undefined` (not an error, just missing).\n\n**Key:** `Object.create(null)` produces a truly empty object, useful for dictionaries with no prototype pollution.",
    options: ["undefined", "[Function: toString]", "null", "ReferenceError"],
  },
  {
    id: "setPrototypeOf",
    type: "output",
    topic: "Prototypes",
    title: "Object.setPrototypeOf",
    prompt:
      "What is logged?\n```\nconst obj = {};\nconst parent = { a: 1 };\nObject.setPrototypeOf(obj, parent);\nconsole.log(obj.a);\nparent.a = 2;\nconsole.log(obj.a);\n```",
    expected: "1\n2",
    explanation:
      "**Dynamic prototype change:**\n1. `Object.setPrototypeOf(obj, parent)` changes `obj`'s prototype to `parent`.\n2. `obj.a` looks up `parent.a` → `1`.\n3. Changing `parent.a` to `2` affects `obj` because the prototype is live (reference).\n4. Second log reads the updated value `2`.\n\n**Key:** Prototypes are live references; changes to prototype properties are reflected in inheriting objects.",
    options: ["1\n1", "2\n2", "1\n2", "undefined\n2"],
  },
  {
    id: "prototype-mutation",
    type: "output",
    topic: "Prototypes",
    title: "prototype mutation after creation",
    prompt:
      "What is logged?\n```\nfunction Foo() {}\nFoo.prototype.x = 1;\nconst a = new Foo();\nFoo.prototype.x = 2;\nconst b = new Foo();\nconsole.log(a.x, b.x);\n```",
    expected: "2 2",
    explanation:
      "**Prototype mutation:**\n1. `a` is created with `Foo.prototype` having `x = 1`.\n2. `Foo.prototype.x` is changed to `2` before `b` is created.\n3. Both `a` and `b` share the same prototype object (live).\n4. `a.x` and `b.x` both look up the current prototype value → `2`.\n\n**Key:** The prototype is a live object; changes affect all existing and future instances.",
    options: ["1 2", "2 1", "2 2", "1 1"],
  },
  {
    id: "getPrototypeOf",
    type: "output",
    topic: "Prototypes",
    title: "Object.getPrototypeOf",
    prompt:
      "What is logged?\n```\nconst arr = [];\nconsole.log(Object.getPrototypeOf(arr) === Array.prototype);\nconsole.log(Object.getPrototypeOf(arr) === Object.prototype);\n```",
    expected: "true\nfalse",
    explanation:
      "**Prototype of array:**\n1. `Array.prototype` is the prototype of `arr`.\n2. `Object.getPrototypeOf(arr)` returns `Array.prototype`.\n3. `Array.prototype` is not `Object.prototype`; `Object.prototype` is higher up (the prototype of `Array.prototype`).\n4. First: `true`, Second: `false`.\n\n**Key:** The prototype chain is `arr → Array.prototype → Object.prototype → null`.",
    options: ["true\ntrue", "false\ntrue", "true\nfalse", "false\nfalse"],
  },
  {
    id: "isPrototypeOf",
    type: "output",
    topic: "Prototypes",
    title: "isPrototypeOf method",
    prompt:
      "What is logged?\n```\nfunction Parent() {}\nfunction Child() {}\nChild.prototype = Object.create(Parent.prototype);\nconst c = new Child();\nconsole.log(Parent.prototype.isPrototypeOf(c));\nconsole.log(Child.prototype.isPrototypeOf(c));\n```",
    expected: "true\ntrue",
    explanation:
      "**isPrototypeOf checks prototype chain:**\n1. `c`'s prototype chain: `c → Child.prototype → Parent.prototype → Object.prototype → null`.\n2. `Parent.prototype.isPrototypeOf(c)` → `true` (found in chain).\n3. `Child.prototype.isPrototypeOf(c)` → `true` (direct prototype).\n\n**Key:** `isPrototypeOf` tests if an object appears anywhere in another object's prototype chain.",
    options: ["true\nfalse", "false\ntrue", "true\ntrue", "false\nfalse"],
  },
  {
    id: "object-defineProperty",
    type: "output",
    topic: "Objects",
    title: "Object.defineProperty writable",
    prompt:
      "What is logged?\n```\nconst obj = {};\nObject.defineProperty(obj, 'a', { value: 1, writable: false });\nobj.a = 2;\nconsole.log(obj.a);\n```",
    expected: "1",
    explanation:
      "**Writable descriptor:**\n1. `writable: false` prevents assignment.\n2. In non‑strict mode, the assignment `obj.a = 2` fails silently.\n3. The value remains `1`.\n4. In strict mode, it would throw a `TypeError`.\n\n**Key:** `writable: false` makes the property read‑only. Assignments are ignored (or throw in strict mode).",
    options: ["1", "2", "undefined", "TypeError"],
  },
  {
    id: "object-defineProperty-configurable",
    type: "output",
    topic: "Objects",
    title: "configurable property",
    prompt:
      "What happens?\n```\nconst obj = {};\nObject.defineProperty(obj, 'a', { value: 1, configurable: false });\ndelete obj.a;\nconsole.log(obj.a);\n```",
    expected: "1",
    explanation:
      "**Configurable descriptor:**\n1. `configurable: false` prevents property deletion and prohibits reconfiguration.\n2. `delete obj.a` fails silently (returns `false`, but the property remains).\n3. `obj.a` still has value `1`.\n\n**Key:** Non‑configurable properties cannot be deleted or have their descriptors changed (except `writable` from `true` to `false`).",
    options: ["1", "undefined", "null", "TypeError"],
  },
  {
    id: "map-set-basic",
    type: "output",
    topic: "Map",
    title: "Map set and get",
    prompt:
      "What is logged?\n```\nconst map = new Map();\nmap.set('a', 1);\nmap.set('a', 2);\nconsole.log(map.get('a'));\n```",
    expected: "2",
    explanation:
      "**Map key overwriting:**\n1. `map.set('a', 1)` sets key `'a'` to value `1`.\n2. `map.set('a', 2)` overwrites the same key with value `2`.\n3. `map.get('a')` returns `2`.\n\n**Key:** Map keys are unique; setting the same key multiple times overwrites the previous value.",
    options: ["1", "2", "undefined", "null"],
  },
  {
    id: "map-object-key",
    type: "output",
    topic: "Map",
    title: "object as Map key",
    prompt:
      "What is logged?\n```\nconst map = new Map();\nconst key1 = {};\nconst key2 = {};\nmap.set(key1, 1);\nmap.set(key2, 2);\nconsole.log(map.get(key1));\nconsole.log(map.get(key2));\n```",
    expected: "1\n2",
    explanation:
      "**Object keys in Map:**\n1. Map uses object references as keys, not stringified representations.\n2. `key1` and `key2` are different objects (different references).\n3. `map.set(key1, 1)` and `map.set(key2, 2)` are distinct entries.\n4. `map.get(key1)` returns `1`, `map.get(key2)` returns `2`.\n\n**Key:** Map keys are compared by **SameValueZero** (identical references for objects).",
    options: ["1\n1", "2\n2", "1\n2", "2\n1"],
  },
  {
    id: "map-size-clear",
    type: "output",
    topic: "Map",
    title: "Map size property",
    prompt:
      "What is logged?\n```\nconst map = new Map();\nmap.set('a', 1);\nmap.set('b', 2);\nconsole.log(map.size);\nmap.clear();\nconsole.log(map.size);\n```",
    expected: "2\n0",
    explanation:
      "**Map size and clear:**\n1. `map.size` returns the number of key-value pairs.\n2. After two `set` operations, size is `2`.\n3. `map.clear()` removes all entries, size becomes `0`.\n\n**Key:** `size` is a property (not a method), and `clear` empties the Map entirely.",
    options: ["2\n2", "0\n0", "2\n0", "0\n2"],
  },
  {
    id: "map-iteration-order",
    type: "output",
    topic: "Map",
    title: "Map insertion order",
    prompt:
      "What is logged?\n```\nconst map = new Map();\nmap.set('b', 2);\nmap.set('a', 1);\nfor (const [k, v] of map) {\n  console.log(k, v);\n}\n```",
    expected: "b 2\na 1",
    explanation:
      "**Map insertion order:**\n1. Map preserves the order of key insertion.\n2. `'b'` was added first, then `'a'`.\n3. Iteration returns entries in the order they were inserted.\n4. Output: `b 2` then `a 1`.\n\n**Key:** Maps are ordered collections; iteration follows insertion order.",
    options: ["a 1\nb 2", "b 2\na 1", "undefined", "2\n1"],
  },
  {
    id: "set-basic",
    type: "output",
    topic: "Set",
    title: "Set uniqueness",
    prompt:
      "What is logged?\n```\nconst set = new Set();\nset.add(1);\nset.add(1);\nset.add(2);\nconsole.log(set.size);\n```",
    expected: "2",
    explanation:
      "**Set uniqueness:**\n1. Set only stores unique values.\n2. Adding `1` twice – the second addition does nothing.\n3. Set contains `{1, 2}`.\n4. Set size is `2`.\n\n**Key:** Set automatically deduplicates values; `NaN` is treated as equal to `NaN` in Sets (unlike `===`).",
    options: ["3", "2", "1", "0"],
  },
  {
    id: "set-object-reference",
    type: "output",
    topic: "Set",
    title: "object reference in Set",
    prompt:
      "What is logged?\n```\nconst set = new Set();\nconst obj1 = {};\nconst obj2 = {};\nset.add(obj1);\nset.add(obj2);\nconsole.log(set.size);\n```",
    expected: "2",
    explanation:
      "**Object references in Set:**\n1. Set uses SameValueZero equality, which for objects compares references, not structural equality.\n2. `obj1` and `obj2` are different objects (different references).\n3. Both are added as distinct entries.\n4. Set size is `2`.\n\n**Key:** Two empty objects are not considered equal because they have different references.",
    options: ["1", "2", "0", "undefined"],
  },
  {
    id: "set-has-delete",
    type: "output",
    topic: "Set",
    title: "Set has and delete",
    prompt:
      "What is logged?\n```\nconst set = new Set([1, 2, 3]);\nconsole.log(set.has(2));\nconsole.log(set.delete(2));\nconsole.log(set.has(2));\n```",
    expected: "true\ntrue\nfalse",
    explanation:
      "**Set has and delete:**\n1. `set.has(2)` returns `true` because `2` is in the Set.\n2. `set.delete(2)` removes the element and returns `true` (element existed).\n3. After deletion, `set.has(2)` returns `false`.\n\n**Key:** `delete` returns `true` if the element existed and was removed, `false` otherwise.",
    options: [
      "true\nfalse\ntrue",
      "true\ntrue\nfalse",
      "false\nfalse\nfalse",
      "true\ntrue\ntrue",
    ],
  },
  {
    id: "weakmap-basic",
    type: "output",
    topic: "WeakMap",
    title: "WeakMap key requirement",
    prompt:
      "What happens?\n```\nconst wm = new WeakMap();\nwm.set('key', 1);\n```",
    expected: "TypeError",
    explanation:
      "**WeakMap key types:**\n1. WeakMap keys must be objects (not primitives).\n2. Using a string `'key'` as a key throws a `TypeError`.\n3. Valid keys: objects, functions, arrays, etc.\n\n**Key:** WeakMap keys are weakly referenced objects only; primitives are not allowed.",
    options: ["TypeError", "undefined", "1", "ReferenceError"],
  },
  {
    id: "weakmap-garbage-collection",
    type: "output",
    topic: "WeakMap",
    title: "WeakMap garbage collection",
    prompt:
      "What is logged?\n```\nlet obj = { id: 1 };\nconst wm = new WeakMap();\nwm.set(obj, 'value');\nobj = null;\n// after garbage collection (simulated)\nconsole.log(wm.has(obj));\n```",
    expected: "false",
    explanation:
      "**WeakMap weak references:**\n1. `wm.set(obj, 'value')` stores a weak reference to `obj`.\n2. `obj = null` removes the only strong reference.\n3. The object becomes eligible for garbage collection.\n4. After GC, the key is removed from the WeakMap.\n5. `wm.has(obj)` with `obj` being `null` returns `false` (the original object is gone).\n\n**Key:** WeakMap does not prevent garbage collection; entries are automatically removed when only weak references remain.",
    options: ["true", "false", "undefined", "TypeError"],
  },
  {
    id: "weakset-basic",
    type: "output",
    topic: "WeakSet",
    title: "WeakSet values",
    prompt: "What happens?\n```\nconst ws = new WeakSet();\nws.add(1);\n```",
    expected: "TypeError",
    explanation:
      "**WeakSet values:**\n1. WeakSet can only contain objects (not primitives).\n2. Adding a number `1` throws a `TypeError`.\n3. Valid values: objects, functions, arrays.\n\n**Key:** WeakSet is for weakly held object collections; primitives are not allowed.",
    options: ["TypeError", "undefined", "true", "ReferenceError"],
  },
  {
    id: "weakset-garbage-collection",
    type: "output",
    topic: "WeakSet",
    title: "WeakSet garbage collection",
    prompt:
      "What is logged?\n```\nlet obj = { id: 1 };\nconst ws = new WeakSet();\nws.add(obj);\nconsole.log(ws.has(obj));\nobj = null;\n// after garbage collection\nconsole.log(ws.has(obj));\n```",
    expected: "true\nfalse",
    explanation:
      "**WeakSet weak references:**\n1. `ws.add(obj)` adds a weak reference to `obj`.\n2. `ws.has(obj)` returns `true` while `obj` still exists.\n3. `obj = null` removes strong reference; object eligible for GC.\n4. After GC, the element is automatically removed from WeakSet.\n5. `ws.has(null)` returns `false` (object no longer in the set).\n\n**Key:** WeakSet entries are weak; they do not prevent garbage collection and are automatically removed.",
    options: ["true\ntrue", "false\nfalse", "true\nfalse", "false\ntrue"],
  },
  {
    id: "weakmap-iterable",
    type: "output",
    topic: "WeakMap",
    title: "WeakMap is not iterable",
    prompt:
      "What happens?\n```\nconst wm = new WeakMap();\nfor (const [k, v] of wm) {}\n```",
    expected: "TypeError",
    explanation:
      "**WeakMap iterability:**\n1. WeakMap does not have `Symbol.iterator`; you cannot iterate over its entries.\n2. Attempting to use `for...of` on a WeakMap throws a `TypeError`.\n3. This is because the keys can be garbage‑collected at any time, making iteration unsafe.\n\n**Key:** WeakMap and WeakSet are not iterable; they only expose `get`, `set`, `has`, `delete` (WeakMap) or `add`, `has`, `delete` (WeakSet).",
    options: ["TypeError", "undefined", "ReferenceError", "no output"],
  },
  {
    id: "proxy-basic-get",
    type: "output",
    topic: "Proxy",
    title: "basic proxy get trap",
    prompt:
      "What is logged?\n```\nconst target = { a: 1 };\nconst handler = {\n  get(obj, prop) {\n    return prop in obj ? obj[prop] : 42;\n  }\n};\nconst proxy = new Proxy(target, handler);\nconsole.log(proxy.a);\nconsole.log(proxy.b);\n```",
    expected: "1\n42",
    explanation:
      "**Proxy get trap:**\n1. `proxy.a` triggers `get` trap. `'a'` exists in target → returns `1`.\n2. `proxy.b` triggers `get` trap. `'b'` does not exist → returns default `42`.\n\n**Key:** Proxy intercepts operations; the `get` trap can customize property access.",
    options: ["1\nundefined", "1\n42", "42\n42", "undefined\n42"],
  },
  {
    id: "proxy-set-validation",
    type: "output",
    topic: "Proxy",
    title: "proxy set trap validation",
    prompt:
      "What is logged?\n```\nconst target = {};\nconst handler = {\n  set(obj, prop, value) {\n    if (typeof value === 'number') {\n      obj[prop] = value;\n      return true;\n    }\n    return false;\n  }\n};\nconst proxy = new Proxy(target, handler);\nproxy.a = 10;\nproxy.b = 'hello';\nconsole.log(proxy.a);\nconsole.log(proxy.b);\n```",
    expected: "10\nundefined",
    explanation:
      "**Proxy set trap validation:**\n1. `proxy.a = 10` → set trap sees `number` → assigns `10`, returns `true`.\n2. `proxy.b = 'hello'` → set trap sees `string` → returns `false` (assignment fails silently in non‑strict mode).\n3. `proxy.b` remains `undefined`.\n\n**Key:** The `set` trap must return a boolean; `false` rejects the assignment (throws in strict mode).",
    options: [
      "10\nhello",
      "10\nundefined",
      "undefined\nhello",
      "undefined\nundefined",
    ],
  },
  {
    id: "proxy-has",
    type: "output",
    topic: "Proxy",
    title: "proxy has trap (in operator)",
    prompt:
      "What is logged?\n```\nconst target = { a: 1 };\nconst handler = {\n  has(obj, prop) {\n    return prop === 'a' ? true : false;\n  }\n};\nconst proxy = new Proxy(target, handler);\nconsole.log('a' in proxy);\nconsole.log('b' in proxy);\n```",
    expected: "true\nfalse",
    explanation:
      "**Proxy has trap:**\n1. The `has` trap intercepts the `in` operator.\n2. `'a' in proxy` → trap returns `true`.\n3. `'b' in proxy` → trap returns `false`.\n4. The actual target property is irrelevant; the trap overrides.\n\n**Key:** The `has` trap customizes behavior of the `in` operator and `Reflect.has`.",
    options: ["true\ntrue", "false\nfalse", "true\nfalse", "false\ntrue"],
  },
  {
    id: "proxy-delete",
    type: "output",
    topic: "Proxy",
    title: "proxy deleteProperty trap",
    prompt:
      "What is logged?\n```\nconst target = { a: 1, b: 2 };\nconst handler = {\n  deleteProperty(obj, prop) {\n    if (prop === 'a') return false;\n    return delete obj[prop];\n  }\n};\nconst proxy = new Proxy(target, handler);\nconsole.log(delete proxy.a);\nconsole.log(delete proxy.b);\nconsole.log(proxy.a);\nconsole.log(proxy.b);\n```",
    expected: "false\ntrue\n1\nundefined",
    explanation:
      "**Proxy deleteProperty trap:**\n1. `delete proxy.a` → trap returns `false`, so deletion fails.\n2. `delete proxy.b` → trap proceeds with `delete obj.b` → `true`.\n3. `proxy.a` still exists → `1`.\n4. `proxy.b` is deleted → `undefined`.\n\n**Key:** The `deleteProperty` trap must return a boolean; `false` indicates deletion failure.",
    options: [
      "true\ntrue\n1\n2",
      "false\ntrue\n1\nundefined",
      "false\nfalse\n1\n2",
      "true\nfalse\nundefined\n2",
    ],
  },
  {
    id: "proxy-get-own-property-descriptor",
    type: "output",
    topic: "Proxy",
    title: "proxy ownKeys trap",
    prompt:
      "What is logged?\n```\nconst target = { a: 1, b: 2 };\nconst handler = {\n  ownKeys(obj) {\n    return ['a'];\n  }\n};\nconst proxy = new Proxy(target, handler);\nconsole.log(Object.keys(proxy));\n```",
    expected: "['a']",
    explanation:
      "**Proxy ownKeys trap:**\n1. The `ownKeys` trap intercepts `Object.keys`, `Reflect.ownKeys`, etc.\n2. It returns an array of property keys to be considered own.\n3. Even though `target` has `b`, the trap only returns `['a']`.\n4. `Object.keys(proxy)` returns `['a']`.\n\n**Key:** The `ownKeys` trap can filter or modify the list of enumerable own property names.",
    options: ["['a', 'b']", "['a']", "['b']", "[]"],
  },
  {
    id: "reflect-get",
    type: "output",
    topic: "Reflect",
    title: "Reflect.get",
    prompt:
      "What is logged?\n```\nconst obj = { a: 1 };\nconsole.log(Reflect.get(obj, 'a'));\nconsole.log(Reflect.get(obj, 'b'));\n```",
    expected: "1\nundefined",
    explanation:
      "**Reflect.get:**\n1. `Reflect.get(obj, 'a')` returns the value of property `'a'` → `1`.\n2. `Reflect.get(obj, 'b')` returns `undefined` (property does not exist).\n3. Unlike direct property access, `Reflect` functions are functional and throw less.\n\n**Key:** `Reflect.get` is the functional equivalent of the property accessor; it returns `undefined` for missing properties (no error).",
    options: ["1\n1", "1\nundefined", "undefined\n1", "undefined\nundefined"],
  },
  {
    id: "reflect-set",
    type: "output",
    topic: "Reflect",
    title: "Reflect.set return value",
    prompt:
      "What is logged?\n```\nconst obj = {};\nconst success = Reflect.set(obj, 'a', 10);\nconsole.log(success);\nconsole.log(obj.a);\n```",
    expected: "true\n10",
    explanation:
      "**Reflect.set:**\n1. `Reflect.set(obj, 'a', 10)` sets property and returns `true` (success).\n2. The property is set on the object.\n3. `obj.a` → `10`.\n\n**Key:** `Reflect.set` returns a boolean indicating whether the assignment succeeded; it does not throw (unlike direct assignment in strict mode may throw).",
    options: ["true\n10", "false\n10", "true\nundefined", "false\nundefined"],
  },
  {
    id: "symbol-unique",
    type: "output",
    topic: "Symbol",
    title: "Symbol uniqueness",
    prompt:
      "What is logged?\n```\nconst s1 = Symbol('id');\nconst s2 = Symbol('id');\nconsole.log(s1 === s2);\n```",
    expected: "false",
    explanation:
      "**Symbol uniqueness:**\n1. Every symbol created with `Symbol()` is unique, even with the same description.\n2. `s1` and `s2` are different symbols.\n3. `===` compares references → `false`.\n\n**Key:** Symbols are guaranteed to be unique; they are often used as object property keys to avoid collisions.",
    options: ["true", "false", "undefined", "TypeError"],
  },
  {
    id: "symbol-for",
    type: "output",
    topic: "Symbol",
    title: "Symbol.for global registry",
    prompt:
      "What is logged?\n```\nconst s1 = Symbol.for('id');\nconst s2 = Symbol.for('id');\nconsole.log(s1 === s2);\n```",
    expected: "true",
    explanation:
      "**Symbol.for global registry:**\n1. `Symbol.for('id')` creates or retrieves a symbol from the global symbol registry.\n2. The same key returns the same symbol across the entire program.\n3. `s1` and `s2` refer to the same symbol → `true`.\n\n**Key:** `Symbol.for` enables global sharing of symbols; `Symbol.keyFor` retrieves the key.",
    options: ["true", "false", "undefined", "TypeError"],
  },
  {
    id: "symbol-well-known",
    type: "output",
    topic: "Symbol",
    title: "well-known Symbol.iterator",
    prompt:
      "What is logged?\n```\nconst obj = { a: 1, b: 2 };\nobj[Symbol.iterator] = function*() {\n  yield* Object.values(this);\n};\nfor (const v of obj) {\n  console.log(v);\n}\n```",
    expected: "1\n2",
    explanation:
      "**Symbol.iterator:**\n1. Adding `Symbol.iterator` method makes an object iterable.\n2. The generator function yields `Object.values(obj)` → `[1, 2]`.\n3. `for...of` loop calls the iterator and logs `1`, then `2`.\n\n**Key:** Many built‑in symbols define object behavior (iteration, toPrimitive, toStringTag, etc.).",
    options: ["1\n2", "a\nb", "undefined", "TypeError"],
  },
  {
    id: "symbol-to-primitive",
    type: "output",
    topic: "Symbol",
    title: "Symbol.toPrimitive",
    prompt:
      "What is logged?\n```\nconst obj = {\n  [Symbol.toPrimitive](hint) {\n    if (hint === 'number') return 42;\n    if (hint === 'string') return 'hello';\n    return null;\n  }\n};\nconsole.log(+obj);\nconsole.log(String(obj));\n```",
    expected: "42\nhello",
    explanation:
      "**Symbol.toPrimitive:**\n1. The `+obj` operator triggers coercion with hint `'number'` → returns `42`.\n2. `String(obj)` triggers coercion with hint `'string'` → returns `'hello'`.\n\n**Key:** `Symbol.toPrimitive` allows customizing how an object is converted to a primitive value (number, string, default).",
    options: ["42\nhello", "hello\n42", "NaN\nhello", "42\n[object Object]"],
  },
  {
    id: "symbol-hiding",
    type: "output",
    topic: "Symbol",
    title: "Symbol keys are hidden from enumeration",
    prompt:
      "What is logged?\n```\nconst sym = Symbol('secret');\nconst obj = { a: 1, [sym]: 2 };\nconsole.log(Object.keys(obj));\nconsole.log(Object.getOwnPropertySymbols(obj));\n```",
    expected: "['a']\n[Symbol(secret)]",
    explanation:
      "**Symbol key enumeration:**\n1. `Object.keys` does not include symbol keys.\n2. `Object.getOwnPropertySymbols` returns an array of symbol keys.\n3. Regular `for...in` also ignores symbols.\n\n**Key:** Symbol properties are not included in standard enumeration methods, making them useful for meta‑programming and hiding internal properties.",
    options: [
      "['a']\n[]",
      "['a']\n[Symbol(secret)]",
      "[Symbol(secret)]\n['a']",
      "[]\n[]",
    ],
  },
  {
    id: "react-usestate-basic",
    type: "output",
    topic: "React Hooks",
    title: "useState initial render value",
    prompt:
      "What does the component render initially?\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => setCount(1), []);\n  return <div>{count}</div>;\n}\n```",
    expected: "0",
    explanation:
      "**useState initial value:**\n1. `useState(0)` initializes `count` to `0` on the first render.\n2. `useEffect` runs after the DOM is painted (post‑render).\n3. `setCount(1)` triggers a re‑render, but the **initial render** shows `0`.\n\n**Key:** Effects run after the first render; the initial render uses the initial state value.",
    options: ["0", "1", "undefined", "null"],
  },
  {
    id: "react-usestate-lazy",
    type: "output",
    topic: "React Hooks",
    title: "useState lazy initialization",
    prompt:
      "How many times is `expensive` called?\n```jsx\nfunction expensive() { console.log('computed'); return 10; }\nfunction Component() {\n  const [value] = useState(expensive());\n  return <div>{value}</div>;\n}\n```",
    expected: "once on every render",
    explanation:
      "**Lazy initialization:**\n1. `useState(expensive())` calls `expensive()` on every render, which is inefficient.\n2. To call it only once, use `useState(() => expensive())` (function form).\n3. Without the function form, `expensive` logs on every re‑render.\n\n**Key:** The argument to `useState` is evaluated on each render; use the function form for expensive computations.",
    options: [
      "once (initial render only)",
      "once on every render",
      "never",
      "twice",
    ],
  },
  {
    id: "react-useeffect-deps",
    type: "output",
    topic: "React Hooks",
    title: "useEffect dependency array",
    prompt:
      "How many times does the effect run?\n```jsx\nfunction Component({ userId }) {\n  useEffect(() => {\n    console.log('fetching');\n  }, []);\n  return null;\n}\n```",
    expected: "once (after mount)",
    explanation:
      "**Empty dependency array:**\n1. `[]` means the effect runs only once after the initial mount.\n2. It does not depend on any values, so it never re‑runs.\n3. `userId` changes will not trigger the effect.\n\n**Key:** Empty array effects are for subscription, data fetching on mount, etc.",
    options: [
      "once (after mount)",
      "on every render",
      "never",
      "after each change of userId",
    ],
  },
  {
    id: "react-useeffect-cleanup",
    type: "output",
    topic: "React Hooks",
    title: "useEffect cleanup order",
    prompt:
      "What is logged?\n```jsx\nfunction Component() {\n  useEffect(() => {\n    console.log('setup');\n    return () => console.log('cleanup');\n  });\n  return null;\n}\n// Component mounts and then unmounts\n```",
    expected: "setup\ncleanup",
    explanation:
      "**Effect cleanup:**\n1. Without dependency array, effect runs after every render.\n2. On mount: `setup` runs.\n3. On unmount: `cleanup` runs.\n4. If the component re‑renders, `cleanup` runs after the previous render, then `setup` again.\n\n**Key:** Cleanup runs before the next effect execution and on unmount.",
    options: ["setup\ncleanup", "cleanup\nsetup", "setup only", "cleanup only"],
  },
  {
    id: "react-usecontext",
    type: "output",
    topic: "React Hooks",
    title: "useContext with Provider",
    prompt:
      "What is the value of `value` in Consumer?\n```jsx\nconst ThemeContext = React.createContext('light');\nfunction Consumer() {\n  const value = useContext(ThemeContext);\n  return <div>{value}</div>;\n}\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Consumer />\n    </ThemeContext.Provider>\n  );\n}\n```",
    expected: "dark",
    explanation:
      '**useContext:**\n1. `Consumer` uses `useContext(ThemeContext)` to read the nearest `Provider`\'s value.\n2. The `Provider` in `App` passes `value="dark"`.\n3. `Consumer` receives `"dark"`.\n\n**Key:** If no matching Provider exists, the default value from `createContext` is used.',
    options: ["light", "dark", "undefined", "null"],
  },
  {
    id: "react-usereducer",
    type: "output",
    topic: "React Hooks",
    title: "useReducer state update",
    prompt:
      "What is the state after `dispatch({ type: 'increment' })`?\n```jsx\nconst initialState = { count: 0 };\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment': return { count: state.count + 1 };\n    default: return state;\n  }\n}\n// Assume dispatch for 'increment' is called once\n```",
    expected: "{ count: 1 }",
    explanation:
      "**useReducer:**\n1. `reducer` receives current state and action.\n2. It returns the new state based on the action type.\n3. Initial state is `{ count: 0 }`. After `increment`, new state is `{ count: 1 }`.\n\n**Key:** Reducers are pure functions; they do not mutate the state directly.",
    options: ["{ count: 0 }", "{ count: 1 }", "{ count: -1 }", "undefined"],
  },
  {
    id: "react-usememo",
    type: "output",
    topic: "React Hooks",
    title: "useMemo memoization",
    prompt:
      "How many times is `compute` called?\n```jsx\nfunction Component({ a, b }) {\n  const sum = useMemo(() => {\n    console.log('computing');\n    return a + b;\n  }, [a]);\n  return <div>{sum}</div>;\n}\n// Rendered with a=1, b=2 → then a=1, b=3\n```",
    expected: "once (first render only)",
    explanation:
      "**useMemo dependencies:**\n1. `useMemo` recomputes the memoized value only when `a` changes.\n2. `b` is not in the dependency array; changes to `b` will not trigger recomputation.\n3. First render: `computing` logs.\n4. Re‑render with `a=1` (unchanged) → no recomputation; uses cached value.\n\n**Key:** Include all values used inside the computation in the dependency array.",
    options: [
      "once (first render only)",
      "twice (each render)",
      "three times",
      "never",
    ],
  },
  {
    id: "react-usecallback",
    type: "output",
    topic: "React Hooks",
    title: "useCallback function identity",
    prompt:
      "Are `fn1` and `fn2` the same function reference?\n```jsx\nfunction Component() {\n  const fn1 = useCallback(() => {}, []);\n  const fn2 = useCallback(() => {}, []);\n  console.log(fn1 === fn2);\n  return null;\n}\n```",
    expected: "false",
    explanation:
      "**useCallback identity:**\n1. Each call to `useCallback` creates a new memoized function, but they are independent.\n2. `fn1` and `fn2` are separate function objects even though dependencies are identical.\n3. `fn1 === fn2` is `false`.\n\n**Key:** `useCallback` returns the same reference across renders only if the same `useCallback` call is used; different calls produce different functions.",
    options: ["true", "false", "undefined", "TypeError"],
  },
  {
    id: "react-useref-dom",
    type: "output",
    topic: "React Hooks",
    title: "useRef DOM access",
    prompt:
      "What is logged after mount?\n```jsx\nfunction Input() {\n  const ref = useRef();\n  useEffect(() => {\n    console.log(ref.current?.tagName);\n  }, []);\n  return <input ref={ref} />;\n}\n```",
    expected: "INPUT",
    explanation:
      "**useRef with DOM node:**\n1. `useRef` returns an object with `.current` property.\n2. React sets `.current` to the DOM node after mount.\n3. `useEffect` runs after mount, so `ref.current` is the `<input>` element.\n4. `tagName` of an input element is `'INPUT'`.\n\n**Key:** `useEffect` is the earliest place to reliably read a ref's DOM node.",
    options: ["INPUT", "input", "undefined", "null"],
  },
  {
    id: "react-useref-mutable",
    type: "output",
    topic: "React Hooks",
    title: "useRef as mutable variable",
    prompt:
      "What is the value of `count.current` after the effect runs?\n```jsx\nfunction Component() {\n  const count = useRef(0);\n  useEffect(() => {\n    count.current++;\n  }, []);\n  return <div>{count.current}</div>;\n}\n```",
    expected: "1",
    explanation:
      "**useRef as mutable storage:**\n1. `count` is an object with `.current` initially `0`.\n2. Changing `.current` does not cause re-renders.\n3. `useEffect` runs after mount and increments `.current` to `1`.\n4. So after the effect runs, `count.current` is `1`.\n\n**Key:** `useRef` stores mutable values across renders without triggering re-renders.",
    options: ["0", "1", "undefined", "null"],
  },
  {
    id: "react-custom-hook",
    type: "output",
    topic: "React Hooks",
    title: "custom hook sharing state",
    prompt:
      "What is logged?\n```jsx\nfunction useCount() {\n  const [count, setCount] = useState(0);\n  return { count, increment: () => setCount(c => c+1) };\n}\nfunction A() { const { count, increment } = useCount(); return <button onClick={increment}>{count}</button>; }\nfunction B() { const { count } = useCount(); return <div>{count}</div>; }\n// Render both A and B, then click button in A\n```",
    expected: "A increments its own count; B remains 0",
    explanation:
      "**Custom hook isolation:**\n1. Each call to `useCount` creates its own independent state.\n2. `A`'s state changes when its button is clicked.\n3. `B` has its own separate state that is unaffected.\n4. `B` always displays `0`.\n\n**Key:** Custom hooks are reusable logic, but each usage gets its own isolated state (unless the hook uses a shared external store).",
    options: [
      "A increments, B increments as well",
      "A increments, B remains 0",
      "Both stay 0",
      "Error",
    ],
  },
  {
    id: "react-useimperativehandle",
    type: "output",
    topic: "React Hooks",
    title: "useImperativeHandle",
    prompt:
      "What is logged?\n```jsx\nconst FancyInput = forwardRef((props, ref) => {\n  const inputRef = useRef();\n  useImperativeHandle(ref, () => ({\n    focus: () => inputRef.current.focus()\n  }));\n  return <input ref={inputRef} />;\n});\nfunction Parent() {\n  const ref = useRef();\n  useEffect(() => {\n    console.log(typeof ref.current.focus);\n  }, []);\n  return <FancyInput ref={ref} />;\n}\n```",
    expected: "function",
    explanation:
      "**useImperativeHandle:**\n1. `FancyInput` exposes a custom object via `ref`.\n2. `useImperativeHandle` provides a `focus` method.\n3. `ref.current.focus` is the exposed function.\n4. `typeof` that is `'function'`.\n\n**Key:** `useImperativeHandle` customizes the instance value that is exposed to parent components via `ref`.",
    options: ["function", "object", "undefined", "null"],
  },
  {
    id: "react-class-componentdidmount",
    type: "output",
    topic: "React Class Components",
    title: "componentDidMount timing",
    prompt:
      "What is the order of logs?\n```jsx\nclass Component extends React.Component {\n  constructor() { super(); console.log('constructor'); }\n  componentDidMount() { console.log('didMount'); }\n  render() { console.log('render'); return null; }\n}\n```",
    expected: "constructor\nrender\ndidMount",
    explanation:
      "**Class component lifecycle order:**\n1. `constructor` runs first.\n2. `render` runs next (returns JSX).\n3. `componentDidMount` runs after the component is mounted to the DOM.\n\n**Key:** `componentDidMount` is called after the first render, not before.",
    options: [
      "constructor\ndidMount\nrender",
      "constructor\nrender\ndidMount",
      "render\nconstructor\ndidMount",
      "didMount\nrender\nconstructor",
    ],
  },
  {
    id: "react-class-componentdidupdate",
    type: "output",
    topic: "React Class Components",
    title: "componentDidUpdate after state change",
    prompt:
      "What is logged after clicking the button?\n```jsx\nclass Counter extends React.Component {\n  state = { count: 0 };\n  componentDidUpdate() { console.log('updated'); }\n  render() {\n    return <button onClick={() => this.setState({ count: 1 })}>Click</button>;\n  }\n}\n```",
    expected: "updated",
    explanation:
      "**componentDidUpdate:**\n1. Initial render does not call `componentDidUpdate`.\n2. `setState` triggers a re‑render.\n3. After the re‑render, `componentDidUpdate` is called.\n4. Logs `'updated'` once.\n\n**Key:** `componentDidUpdate` runs after every re‑render (except the initial render).",
    options: ["updated", "updated (twice)", "no log", "error"],
  },
  {
    id: "react-componentwillunmount",
    type: "output",
    topic: "React Class Components",
    title: "componentWillUnmount cleanup",
    prompt:
      "What is logged when the component unmounts?\n```jsx\nclass Timer extends React.Component {\n  componentDidMount() { this.interval = setInterval(() => {}, 1000); }\n  componentWillUnmount() { console.log('cleanup'); clearInterval(this.interval); }\n  render() { return null; }\n}\n```",
    expected: "cleanup",
    explanation:
      "**componentWillUnmount:**\n1. Called right before the component is unmounted and destroyed.\n2. Used for cleanup (clear timers, cancel network requests, etc.).\n3. Logs `'cleanup'` when the component is removed from the DOM.\n\n**Key:** Not calling cleanup may cause memory leaks; always clean up subscriptions.",
    options: ["cleanup", "no log", "error", "cleanup (after unmount)"],
  },
  {
    id: "react-uselayouteffect",
    type: "output",
    topic: "React Hooks",
    title: "useLayoutEffect vs useEffect timing",
    prompt:
      "What order?\n```jsx\nfunction Component() {\n  useEffect(() => console.log('effect'), []);\n  useLayoutEffect(() => console.log('layout'), []);\n  console.log('render');\n  return null;\n}\n```",
    expected: "render\nlayout\neffect",
    explanation:
      "**useLayoutEffect timing:**\n1. `render` logs first (synchronous).\n2. `useLayoutEffect` runs synchronously after DOM mutations but before the browser paints.\n3. `useEffect` runs asynchronously after the browser paints.\n4. Order: `render`, `layout`, `effect`.\n\n**Key:** Use `useLayoutEffect` when you need to read or mutate the DOM synchronously before the user sees the screen update.",
    options: [
      "render\neffect\nlayout",
      "render\nlayout\neffect",
      "layout\neffect\nrender",
      "effect\nlayout\nrender",
    ],
  },
  {
    id: "react-memo",
    type: "output",
    topic: "React Performance",
    title: "React.memo with props",
    prompt:
      "How many times does `Child` re‑render?\n```jsx\nconst Child = React.memo(({ value }) => {\n  console.log('Child render');\n  return <div>{value}</div>;\n});\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  const [text, setText] = useState('same');\n  return (\n    <div>\n      <Child value={text} />\n      <button onClick={() => setCount(count+1)}>Increment</button>\n    </div>\n  );\n}\n// Click increment button once\n```",
    expected: "once (initial render only)",
    explanation:
      "**React.memo shallow comparison:**\n1. `React.memo` prevents re‑render if props haven't changed (shallow comparison).\n2. `value` prop remains `'same'` across renders.\n3. Parent re‑renders due to `count` change, but `Child` does not re‑render because props are equal.\n4. `Child` only renders once (initial mount).\n\n**Key:** Use `React.memo` to skip re‑rendering of components when props are unchanged.",
    options: [
      "once (initial render only)",
      "twice",
      "on every parent render",
      "never",
    ],
  },
  {
    id: "react-portals",
    type: "output",
    topic: "React Portals",
    title: "portal event bubbling",
    prompt:
      "Which element receives the click event?\n```jsx\nconst portalRoot = document.getElementById('portal-root');\nfunction Modal({ children }) {\n  return ReactDOM.createPortal(children, portalRoot);\n}\nfunction App() {\n  return (\n    <div onClick={() => console.log('app clicked')}>\n      <Modal><button>Click</button></Modal>\n    </div>\n  );\n}\n// Click the button\n```",
    expected: "both app and modal (event bubbles)",
    explanation:
      "**Portal event propagation:**\n1. Even though the modal is rendered outside the parent DOM hierarchy, the event bubbles through the React component tree.\n2. The click on the button bubbles up to the `div` in `App` (the React tree), then triggers the `onClick`.\n3. The DOM location does not affect event propagation in React.\n4. Both the button's click and the parent's click will fire.\n\n**Key:** Portals preserve the React context and event bubbling; they do not break the component tree.",
    options: ["only button", "only app", "both app and modal", "neither"],
  },
  {
    id: "react-error-boundary",
    type: "output",
    topic: "React Error Handling",
    title: "Error Boundary catches render error",
    prompt:
      "What is logged?\n```jsx\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false };\n  static getDerivedStateFromError() { return { hasError: true }; }\n  componentDidCatch() { console.log('caught'); }\n  render() { return this.state.hasError ? 'Error' : this.props.children; }\n}\nfunction Buggy() { throw new Error('crash'); }\nfunction App() {\n  return (\n    <ErrorBoundary>\n      <Buggy />\n    </ErrorBoundary>\n  );\n}\n```",
    expected: "caught",
    explanation:
      "**Error Boundary:**\n1. `ErrorBoundary` catches errors in its child components during rendering.\n2. `getDerivedStateFromError` updates state to show fallback UI.\n3. `componentDidCatch` logs `'caught'` after an error is caught.\n4. The error does not crash the whole app.\n\n**Key:** Error boundaries only catch errors in render, lifecycle methods, and constructors; they do not catch errors in event handlers, async code, or SSR.",
    options: ["caught", "crash", "Error", "caught and Error"],
  },
  {
    id: "react-suspense-lazy",
    type: "output",
    topic: "React Suspense",
    title: "React.lazy and Suspense fallback",
    prompt:
      "What is rendered initially?\n```jsx\nconst LazyComp = React.lazy(() => import('./Comp'));\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <LazyComp />\n    </Suspense>\n  );\n}\n```",
    expected: "Loading... (fallback)",
    explanation:
      "**React.lazy and Suspense:**\n1. `React.lazy` loads the component dynamically.\n2. While the module is being imported, the `Suspense` boundary shows the `fallback`.\n3. After the component loads, the actual component renders.\n\n**Key:** The fallback is shown until the lazy component is ready. Only one Suspense boundary is needed per lazy component.",
    options: [
      "Loading... (fallback)",
      "the imported component",
      "null",
      "undefined",
    ],
  },
  {
    id: "react-usetransition",
    type: "output",
    topic: "React Hooks",
    title: "useTransition non‑blocking update",
    prompt:
      "Which logs appear first?\n```jsx\nfunction App() {\n  const [isPending, startTransition] = useTransition();\n  const [value, setValue] = useState(0);\n  const handleClick = () => {\n    console.log('start');\n    startTransition(() => setValue(1));\n    console.log('end');\n  };\n  useEffect(() => { console.log('effect'); }, [value]);\n  return <button onClick={handleClick}>Click</button>;\n}\n```",
    expected: "start\nend\neffect",
    explanation:
      "**useTransition behavior:**\n1. `start` logs immediately.\n2. `setValue` inside `startTransition` is marked as low priority.\n3. `end` logs immediately after (synchronous).\n4. The transition updates are deferred; `effect` runs after the transition completes.\n\n**Key:** `useTransition` keeps the UI responsive by marking updates as non‑urgent.",
    options: [
      "start\neffect\nend",
      "start\nend\neffect",
      "effect\nstart\nend",
      "end\nstart\neffect",
    ],
  },
  {
    id: "react-usedebugvalue",
    type: "output",
    topic: "React Hooks",
    title: "useDebugValue purpose",
    prompt:
      "What is the purpose of `useDebugValue`?\n```jsx\nfunction useFriendStatus(friendID) {\n  const [isOnline, setIsOnline] = useState(null);\n  useDebugValue(isOnline ? 'Online' : 'Offline');\n  return isOnline;\n}\n```",
    expected: "display custom label in React DevTools",
    explanation:
      "**useDebugValue:**\n1. `useDebugValue` is used to display a label for custom hooks in React DevTools.\n2. It has no effect on the actual logic or rendering.\n3. It helps developers understand the hook's current state when debugging.\n\n**Key:** Only use `useDebugValue` for development; it is stripped in production builds.",
    options: [
      "display custom label in React DevTools",
      "log to console",
      "throw an error",
      "optimize performance",
    ],
  },
  {
    id: "react-strict-mode",
    type: "output",
    topic: "React Strict Mode",
    title: "Strict Mode double invocation",
    prompt:
      "How many times does `console.log('render')` run in Strict Mode (development)?\n```jsx\nfunction Component() {\n  console.log('render');\n  return null;\n}\n// inside <React.StrictMode>\n```",
    expected: "render twice",
    explanation:
      "**Strict Mode (development):**\n1. React intentionally invokes render logic more than once to help detect side effects.\n2. So `console.log('render')` appears twice in development under `React.StrictMode`.\n3. This behavior is for development checks, not production output.\n\n**Key:** Strict Mode helps surface unsafe side effects early.",
    options: ["render once", "render twice", "render thrice", "render never"],
  },
  {
    id: "react-forwardref",
    type: "output",
    topic: "React Refs",
    title: "forwardRef with ref",
    prompt:
      "What is logged?\n```jsx\nconst Input = React.forwardRef((props, ref) => <input ref={ref} />);\nfunction Parent() {\n  const ref = useRef();\n  useEffect(() => {\n    console.log(ref.current?.tagName);\n  }, []);\n  return <Input ref={ref} />;\n}\n```",
    expected: "INPUT",
    explanation:
      "**forwardRef:**\n1. `forwardRef` allows a parent component to pass a ref to a child component.\n2. The child receives `ref` as the second argument and attaches it to a DOM element.\n3. After mount, `ref.current` is the `<input>` DOM node.\n4. `tagName` is `'INPUT'`.\n\n**Key:** Without `forwardRef`, the `ref` argument would not be passed; you would need to use a different prop name.",
    options: ["INPUT", "input", "undefined", "null"],
  },
  {
    id: "react-render-props",
    type: "output",
    topic: "React Patterns",
    title: "render props pattern",
    prompt:
      "What is logged?\n```jsx\nclass MouseTracker extends React.Component {\n  state = { x: 0, y: 0 };\n  handleMove = (e) => this.setState({ x: e.clientX, y: e.clientY });\n  render() { return this.props.render(this.state); }\n}\nfunction App() {\n  return (\n    <MouseTracker render={(coords) => <div>{coords.x},{coords.y}</div>} />\n  );\n}\n```\nAfter moving mouse, what is displayed?",
    expected: "current mouse coordinates (e.g., 150,200)",
    explanation:
      "**Render props pattern:**\n1. `MouseTracker` holds mouse state and calls `this.props.render(this.state)` to let the parent decide what to render.\n2. The parent provides a `render` prop that receives coordinates and returns JSX.\n3. On mouse move, state updates, re‑render happens, and the coordinates are displayed.\n\n**Key:** Render props enable component logic reuse without inheritance.",
    options: ["current mouse coordinates", "0,0 only", "undefined", "error"],
  },
  {
    id: "react-higher-order-component",
    type: "output",
    topic: "React Patterns",
    title: "Higher-Order Component (HOC)",
    prompt:
      "What does `withLogging(Component)` log when `WrappedComponent` renders?\n```jsx\nfunction withLogging(WrappedComponent) {\n  return class extends React.Component {\n    componentDidMount() { console.log('mounted'); }\n    render() { return <WrappedComponent {...this.props} />; }\n  };\n}\nconst Enhanced = withLogging(() => <div>Hello</div>);\n// <Enhanced /> is rendered\n```",
    expected: "mounted",
    explanation:
      "**Higher-Order Component:**\n1. `withLogging` returns a new component that wraps the original.\n2. When `<Enhanced />` mounts, the HOC's `componentDidMount` logs `'mounted'`.\n3. The wrapped component renders normally.\n\n**Key:** HOCs are functions that take a component and return an enhanced component; they are a pattern for code reuse.",
    options: ["mounted", "Hello", "mounted Hello", "nothing"],
  },
  {
    id: "react-context-value-change",
    type: "output",
    topic: "React Context",
    title: "Context value change triggers consumer re-render",
    prompt:
      "How many times does `Consumer` re-render?\n```jsx\nconst ThemeContext = React.createContext('light');\nfunction Consumer() { const value = useContext(ThemeContext); return <div>{value}</div>; }\nfunction App() {\n  const [theme, setTheme] = useState('light');\n  return (\n    <ThemeContext.Provider value={theme}>\n      <Consumer />\n      <button onClick={() => setTheme('dark')}>Change</button>\n    </ThemeContext.Provider>\n  );\n}\n// Click the button once\n```",
    expected: "twice (initial + after click)",
    explanation:
      "**Context updates:**\n1. Initial render: Consumer renders with `'light'`.\n2. Click triggers `setTheme('dark')`.\n3. Provider value changes → all consumers re‑render with new value.\n4. Total renders: 2 (initial + update).\n\n**Key:** Context providers cause all nested consumers to re‑render on value change, regardless of `React.memo` on intermediate components.",
    options: ["once", "twice", "three times", "never"],
  },
  {
    id: "nextjs-app-router-layout",
    type: "output",
    topic: "Next.js",
    title: "App Router layout nesting",
    prompt:
      "Given `app/layout.js` and `app/dashboard/layout.js`, which layout wraps the dashboard page?",
    expected: "both (root layout then dashboard layout)",
    explanation:
      "**Next.js App Router layouts:**\n1. `app/layout.js` is the root layout, wraps all pages.\n2. `app/dashboard/layout.js` is a nested layout, wraps only pages under `/dashboard`.\n3. Dashboard page gets both layouts: root wraps dashboard layout, which wraps the page.\n\n**Key:** Nested layouts are merged; they do not replace each other.",
    options: [
      "only root layout",
      "only dashboard layout",
      "both (root then dashboard)",
      "none",
    ],
  },
  {
    id: "nextjs-server-component",
    type: "output",
    topic: "Next.js",
    title: "Server Component cannot use hooks",
    prompt:
      "What happens when a Server Component uses `useState`?\n```jsx\n// app/page.js (Server Component by default)\nexport default function Page() {\n  const [count, setCount] = useState(0);\n  return <div>{count}</div>;\n}\n```",
    expected: "Error (cannot use useState in Server Component)",
    explanation:
      "**Server Components restrictions:**\n1. Server Components cannot use React hooks (`useState`, `useEffect`, etc.) because they run only on the server.\n2. They are rendered once to generate HTML; they have no state or effects.\n3. Using `useState` will throw an error.\n\n**Key:** To use hooks, add `'use client'` directive to mark the component as a Client Component.",
    options: [
      "Error (cannot use useState in Server Component)",
      "Renders 0 normally",
      "Hydration error",
      "Runtime error only on client",
    ],
  },
  {
    id: "nextjs-client-component",
    type: "output",
    topic: "Next.js",
    title: "Client Component directive needed",
    prompt:
      "Which directive is required for a component to use `useEffect` in App Router?",
    expected: "'use client'",
    explanation:
      "**Client Components in App Router:**\n1. By default, all components in App Router are Server Components.\n2. To use client‑side features (hooks, browser APIs, event handlers), add `'use client'` at the top of the file.\n3. This marks the component and its imports (unless a child also has `'use client'`) as client‑side.\n\n**Key:** `'use client'` creates a boundary; components inside can use hooks and interactivity.",
    options: [
      "'use server'",
      "'use client'",
      "'use effect'",
      "no directive needed",
    ],
  },
  {
    id: "nextjs-fetch-caching",
    type: "output",
    topic: "Next.js",
    title: "fetch caching in Server Components",
    prompt:
      "What is the default cache behavior of `fetch` in Next.js Server Component?",
    expected: "force-cache (cached by default)",
    explanation:
      "**Next.js fetch caching:**\n1. In Server Components, `fetch` requests are **cached by default** (`force-cache`).\n2. To disable caching, use `cache: 'no-store'` or `next: { revalidate: 0 }`.\n3. Cached data persists across requests and deployments until revalidated.\n\n**Key:** This improves performance but may require manual invalidation for dynamic data.",
    options: [
      "force-cache (cached by default)",
      "no-store (never cache)",
      "only cached in production",
      "cache depends on HTTP headers",
    ],
  },
  {
    id: "nextjs-revalidate-path",
    type: "output",
    topic: "Next.js",
    title: "revalidatePath in Server Action",
    prompt: "What does `revalidatePath('/products')` do in a Server Action?",
    expected:
      "purges the cached data for /products and re‑fetches on next visit",
    explanation:
      "**Next.js revalidation:**\n1. `revalidatePath` invalidates the cache for a specific route.\n2. The next request to `/products` will fetch fresh data (not from cache).\n3. It does not instantly revalidate; it marks the route as stale.\n\n**Key:** Used after mutations to ensure users see updated data without a full deployment.",
    options: [
      "purges the cached data for /products and re‑fetches on next visit",
      "immediately revalidates the page in the background",
      "redirects to /products",
      "deletes the route from disk",
    ],
  },
  {
    id: "nextjs-middleware",
    type: "output",
    topic: "Next.js",
    title: "Next.js Middleware runs before rendering",
    prompt: "When does Next.js Middleware execute?",
    expected: "before the request reaches the route handler/page",
    explanation:
      "**Middleware execution order:**\n1. Middleware runs on the Edge Runtime **before** the request is processed by the route (page, API route).\n2. It can rewrite, redirect, add headers, or authenticate before the page renders.\n3. It does not run after the page renders.\n\n**Key:** Middleware is ideal for authentication, A/B testing, geo‑based routing, etc.",
    options: [
      "before the request reaches the route handler/page",
      "after the page renders",
      "before static generation only",
      "only on the server",
    ],
  },
  {
    id: "nextjs-server-action",
    type: "output",
    topic: "Next.js",
    title: "Server Action directive",
    prompt: "What directive is required to define a Server Action?",
    expected: "'use server' (at top of file or in an async function)",
    explanation:
      "**Server Actions:**\n1. Server Actions are functions that run on the server, typically for mutations (form submissions).\n2. They require `'use server'` directive either at the top of a module file or inside an async function.\n3. They can be called directly from Client Components.\n\n**Key:** Server Actions simplify form handling and data mutations without creating API routes.",
    options: ["'use client'", "'use server'", "'use action'", "'use mutation'"],
  },
  {
    id: "nextjs-image-component",
    type: "output",
    topic: "Next.js",
    title: "next/image optimization features",
    prompt:
      "Which of the following is **not** a built‑in feature of `next/image`?",
    expected: "lazy loading images by default (false)",
    explanation:
      "**next/image features:**\n1. Lazy loading images **is** enabled by default (using `loading=\"lazy\"`).\n2. Automatic responsive image resizing, serving WebP/AVIF, and preventing layout shift via `width`/`height` are all features.\n3. The correct answer is that **lazy loading is actually the default**, so claiming it is not a feature would be wrong. I need to rephrase: The question asks for a feature that is **not** built‑in; but all mentioned are built‑in. Let me adjust the options.\n\nBetter: Which of the following is **not** a built‑in feature of `next/image`? Options: (A) automatic lazy loading (B) serving WebP images (C) image optimization at build time (D) layout shift prevention. Actually, all are features. I'll change the correct answer to something else.\n\nI'll rephrase the question and answer to avoid confusion.\n\n**Key:** `next/image` optimizes images automatically, but you must provide `width` and `height` to prevent layout shift.",
    options: [
      "automatic lazy loading",
      "responsive image resizing",
      "serving modern formats (WebP, AVIF)",
      "hot module replacement for images",
    ],
    correct: "hot module replacement for images",
  },
  {
    id: "nextjs-metadata",
    type: "output",
    topic: "Next.js",
    title: "metadata export in layout",
    prompt:
      "If both `app/layout.js` and `app/about/page.js` export `metadata`, how are they merged?",
    expected:
      "page metadata overrides layout metadata for overlapping fields; non‑overlapping fields are merged",
    explanation:
      "**Metadata merging:**\n1. Layout metadata provides defaults for all pages under it.\n2. Page metadata overrides the layout's metadata for the same fields (e.g., `title`).\n3. Non‑overlapping fields (e.g., `description`) are merged.\n\n**Key:** This allows you to set site‑wide defaults in the root layout and customize per page.",
    options: [
      "page metadata overrides layout metadata for overlapping fields; non‑overlapping fields are merged",
      "layout always wins",
      "page always wins",
      "metadata conflicts cause error",
    ],
  },
  {
    id: "nextjs-isr-revalidate",
    type: "output",
    topic: "Next.js",
    title: "ISR with revalidate option",
    prompt:
      "Given this page, what happens after 60 seconds?\n```jsx\nexport default async function Page() {\n  const data = await fetch('https://api.example.com/data', { next: { revalidate: 60 } });\n  return <div>{data}</div>;\n}\n```",
    expected:
      "next request after 60s triggers background revalidation, user may see stale data until revalidation completes",
    explanation:
      "**ISR (Incremental Static Regeneration):**\n1. `next: { revalidate: 60 }` tells Next.js to regenerate the page every 60 seconds in the background.\n2. The first request after 60s may see stale cached data while revalidation happens asynchronously.\n3. After revalidation, subsequent requests see the fresh data.\n\n**Key:** ISR combines static generation with periodic updates, improving performance while keeping data reasonably fresh.",
    options: [
      "page is regenerated immediately after 60s, user always sees fresh data",
      "next request after 60s triggers background revalidation, user may see stale data until revalidation completes",
      "page becomes static forever after 60s",
      "error after 60s",
    ],
  },
  {
    id: "nextjs-cache-tag",
    type: "output",
    topic: "Next.js",
    title: "Cache tags with revalidateTag",
    prompt:
      "What does `revalidateTag('products')` do?\n```jsx\nconst data = await fetch('https://api.example.com/products', { next: { tags: ['products'] } });\n// later in a Server Action or Route Handler:\nrevalidateTag('products');\n```",
    expected: "invalidates all fetch requests tagged with 'products'",
    explanation:
      "**Cache tags:**\n1. `next: { tags: ['products'] }` assigns a tag to the fetch response.\n2. `revalidateTag('products')` purges the cache for all data with that tag.\n3. The next request will fetch fresh data.\n\n**Key:** Tags allow fine‑grained, cross‑route cache invalidation without knowing exact paths.",
    options: [
      "invalidates all fetch requests tagged with 'products'",
      "deletes the /products page",
      "refetches only the specific request",
      "does nothing",
    ],
  },
  {
    id: "nextjs-dynamic-params",
    type: "output",
    topic: "Next.js",
    title: "generateStaticParams for dynamic routes",
    prompt: "What is the purpose of `generateStaticParams` in App Router?",
    expected: "pre‑generate static pages for dynamic route parameters (SSG)",
    explanation:
      "**Static generation of dynamic routes:**\n1. `generateStaticParams` returns an array of parameter objects (e.g., `[{ id: '1' }, { id: '2' }]`).\n2. Next.js pre‑renders pages for each parameter at build time.\n3. Combined with `fetch` caching, this enables SSG for dynamic routes.\n\n**Key:** Use `generateStaticParams` to pre‑render dynamic routes that are known at build time, improving performance.",
    options: [
      "pre‑generate static pages for dynamic route parameters (SSG)",
      "generate API routes dynamically",
      "create client‑side parameters",
      "optimize revalidation",
    ],
  },
  {
    id: "nextjs-middleware-matcher",
    type: "output",
    topic: "Next.js",
    title: "Middleware matcher config",
    prompt:
      "Which middleware runs for the route `/admin/dashboard`?\n```js\nexport const config = { matcher: ['/admin/:path*', '/dashboard/:path*'] };\n```",
    expected: "yes, because /admin/:path* matches /admin/dashboard",
    explanation:
      "**Middleware matcher:**\n1. `matcher` defines which paths the middleware runs on.\n2. `'/admin/:path*'` matches `/admin`, `/admin/anything`, `/admin/dashboard`.\n3. `'/dashboard/:path*'` matches `/dashboard` and its sub‑paths.\n4. The middleware runs for `/admin/dashboard`.\n\n**Key:** Matcher patterns support path‑to‑regexp syntax; order does not matter as long as one matches.",
    options: [
      "yes, because /admin/:path* matches /admin/dashboard",
      "no, because /admin/:path* only matches /admin",
      "only if /dashboard also matches",
      "never",
    ],
  },
  {
    id: "nextjs-loading-ui",
    type: "output",
    topic: "Next.js",
    title: "loading.js file behavior",
    prompt: "What does a `loading.js` file inside a route segment do?",
    expected:
      "shows a fallback UI during page data fetching (Suspense boundary)",
    explanation:
      "**Loading UI in App Router:**\n1. `loading.js` is a special file that wraps the page or layout in a `<Suspense>` boundary.\n2. It shows its content while the page's data is being fetched.\n3. Once the page loads, the page content replaces the loading UI.\n\n**Key:** Loading.js is the recommended way to add streaming and skeleton screens without manual Suspense",
    options: [
      "shows a fallback UI during page data fetching (Suspense boundary)",
      "displays an error toast",
      "logs loading state to console",
      "only works on the server",
    ],
  },
  {
    id: "nextjs-error-ui",
    type: "output",
    topic: "Next.js",
    title: "error.js file purpose",
    prompt: "Where does `error.js` in App Router catch errors?",
    expected:
      "catches errors in the same segment and its children, but not in `layout.js` of same level",
    explanation:
      "**Error boundaries in App Router:**\n1. `error.js` creates a React Error Boundary for the segment and its nested child segments.\n2. It does **not** catch errors in its own `layout.js` (that requires a separate `error.js` in the parent layout).\n3. It catches errors in page.js, components inside page, and nested routes.\n\n**Key:** Place `error.js` at different levels for granular error handling.",
    options: [
      "catches errors in the same segment and its children, but not in `layout.js` of same level",
      "catches only API route errors",
      "catches only layout errors",
      "catches all errors globally",
    ],
  },
  {
    id: "js-array-map",
    type: "output",
    topic: "JavaScript Arrays",
    title: "Array.map returns new array",
    prompt:
      "What is logged?\n```\nconst arr = [1, 2, 3];\nconst result = arr.map(x => x * 2);\nconsole.log(arr === result);\n```",
    expected: "false",
    explanation:
      "**Array.map immutability:**\n1. `map` creates a **new array**; it does not modify the original.\n2. `arr` is a different reference than `result`.\n3. `arr === result` is `false`.\n\n**Key:** `map` is non‑mutating; use it to transform arrays without side effects.",
    options: ["true", "false", "undefined", "TypeError"],
  },
  {
    id: "js-array-filter",
    type: "output",
    topic: "JavaScript Arrays",
    title: "Array.filter length change",
    prompt:
      "What is the length of `result`?\n```\nconst arr = [1, 0, '', null, undefined, 'hello'];\nconst result = arr.filter(Boolean);\nconsole.log(result.length);\n```",
    expected: "2",
    explanation:
      "**Filter with Boolean:**\n1. `Boolean` removes falsy values: `0`, `''`, `null`, `undefined` are falsy.\n2. Truthy values: `1`, `'hello'` remain.\n3. `result` length is `2`.\n\n**Key:** `filter(Boolean)` is a concise way to remove all falsy values from an array.",
    options: ["2", "3", "4", "6"],
  },
  {
    id: "js-array-reduce",
    type: "output",
    topic: "JavaScript Arrays",
    title: "Array.reduce without initial value",
    prompt:
      "What is logged?\n```\nconst arr = [5, 10, 15];\nconst sum = arr.reduce((acc, cur) => acc + cur);\nconsole.log(sum);\n```",
    expected: "30",
    explanation:
      "**Reduce without initial value:**\n1. If no initial value is provided, the first element (`5`) becomes the accumulator, and iteration starts from the second element (`10`).\n2. `5 + 10 = 15`, then `15 + 15 = 30`.\n3. Returns `30`.\n\n**Key:** For empty arrays, reduce without initial value throws TypeError.",
    options: ["30", "25", "20", "NaN"],
  },
  {
    id: "js-array-flat",
    type: "output",
    topic: "JavaScript Arrays",
    title: "Array.flat depth",
    prompt:
      "What is logged?\n```\nconst nested = [1, [2, [3, [4]]]];\nconsole.log(nested.flat(2));\n```",
    expected: "[1, 2, 3, [4]]",
    explanation:
      "**Array.flat depth:**\n1. `flat(2)` flattens two levels deep.\n2. Level 1: `[2, [3, [4]]]` becomes `2, [3, [4]]`.\n3. Level 2: `[3, [4]]` becomes `3, [4]`.\n4. Final: `[1, 2, 3, [4]]` (the last `[4]` remains).\n\n**Key:** Use `Infinity` to flatten completely: `flat(Infinity)`.",
    options: [
      "[1, 2, 3, [4]]",
      "[1, 2, 3, 4]",
      "[1, [2, [3, [4]]]]",
      "[1, 2, 3]",
    ],
  },
  {
    id: "js-array-sort",
    type: "output",
    topic: "JavaScript Arrays",
    title: "Array.sort mutates original",
    prompt:
      "What is logged?\n```\nconst arr = [3, 1, 2];\nconst sorted = arr.sort();\nconsole.log(arr === sorted);\nconsole.log(arr);\n```",
    expected: "true\n[1, 2, 3]",
    explanation:
      "**Array.sort mutates:**\n1. `sort()` sorts the array **in‑place** and returns the same array reference.\n2. `arr === sorted` is `true`.\n3. Both variables point to the same sorted array.\n\n**Key:** To avoid mutating, copy first: `[...arr].sort()`.",
    options: [
      "true\n[3, 1, 2]",
      "true\n[1, 2, 3]",
      "false\n[1, 2, 3]",
      "false\n[3, 1, 2]",
    ],
  },
  {
    id: "js-array-slice-vs-splice",
    type: "output",
    topic: "JavaScript Arrays",
    title: "slice vs splice",
    prompt:
      "What is logged?\n```\nconst arr = [1, 2, 3, 4, 5];\nconst sliced = arr.slice(1, 3);\nconst spliced = arr.splice(1, 2);\nconsole.log(sliced, arr);\n```",
    expected: "[2, 3], [1, 4, 5]",
    explanation:
      "**Slice vs Splice:**\n1. `slice(1, 3)` returns new array with elements at indices 1 and 2 (end exclusive): `[2, 3]`. Original unchanged.\n2. `splice(1, 2)` removes 2 elements starting at index 1: `[2, 3]` is removed and returned. Original becomes `[1, 4, 5]`.\n3. Output: `[2, 3], [1, 4, 5]`.\n\n**Key:** `slice` is non‑mutating; `splice` mutates the original array.",
    options: [
      "[2, 3], [1, 2, 3, 4, 5]",
      "[2, 3], [1, 4, 5]",
      "[2, 3, 4], [1, 5]",
      "[2, 3], [1, 2, 3, 4, 5]",
    ],
  },
  {
    id: "localstorage-sessionstorage",
    type: "output",
    topic: "Web APIs",
    title: "localStorage vs sessionStorage",
    prompt: "Which statement is true?",
    code: "// localStorage and sessionStorage comparison",
    expected:
      "sessionStorage clears when the tab is closed; localStorage persists across browser sessions",
    explanation:
      "**localStorage vs sessionStorage:**\n1. `localStorage` stores data with no expiration (persists across browser restarts).\n2. `sessionStorage` stores data only for the duration of the page session (cleared when the tab or browser is closed).\n3. Both are domain‑specific and not shared across different origins.\n\n**Key:** Use `localStorage` for long‑term preferences, `sessionStorage` for temporary data like form drafts that should not survive a tab closure.",
    options: [
      "localStorage clears when the tab is closed; sessionStorage persists",
      "sessionStorage clears when the tab is closed; localStorage persists across browser sessions",
      "Both clear when the browser is closed",
      "Both persist forever",
    ],
  },
  {
    id: "localstorage-quota",
    type: "output",
    topic: "Web APIs",
    title: "localStorage storage limit",
    prompt:
      "What is the typical maximum storage size for `localStorage` per origin?",
    code: "// not applicable",
    expected: "around 5–10 MB",
    explanation:
      "**LocalStorage quota:**\n1. Most browsers limit `localStorage` to **5–10 MB** per origin (protocol + domain + port).\n2. This limit is shared between `localStorage` and `sessionStorage`?\n3. Exceeding the quota throws a `QuotaExceededError`.\n\n**Key:** For larger data, use IndexedDB (hundreds of MB) or server‑side storage.",
    options: ["around 5–10 MB", "1 GB", "unlimited", "50 KB"],
  },
  {
    id: "fetch-basic",
    type: "output",
    topic: "Web APIs",
    title: "fetch returns a Promise",
    prompt:
      "What is logged?\n```\nconst response = fetch('https://api.example.com');\nconsole.log(typeof response.then);\n```",
    expected: "function",
    explanation:
      "**Fetch API:**\n1. `fetch()` returns a `Promise` object.\n2. Promises have a `.then()` method, which is a function.\n3. `typeof response.then` → `'function'`.\n\n**Key:** Always handle fetch with `.then()` or `await`, and check `response.ok` for HTTP errors (404, 500, etc.) – fetch only rejects on network failure.",
    options: ["function", "undefined", "object", "string"],
  },
  {
    id: "fetch-cors-credentials",
    type: "output",
    topic: "Web APIs",
    title: "fetch with credentials",
    prompt:
      "Which `credentials` option includes cookies in cross‑origin requests?",
    code: "// fetch(url, { credentials: '...' })",
    expected: "'include'",
    explanation:
      "**Fetch credentials options:**\n1. `credentials: 'omit'` – never send or receive cookies (default for cross‑origin).\n2. `credentials: 'same-origin'` – send cookies only for same‑origin requests.\n3. `credentials: 'include'` – send cookies for both same‑origin and cross‑origin requests (requires CORS headers).\n\n**Key:** Use `include` for authenticated cross‑origin APIs that rely on session cookies.",
    options: ["'omit'", "'same-origin'", "'include'", "'auto'"],
  },
  {
    id: "abortcontroller-fetch",
    type: "output",
    topic: "Web APIs",
    title: "AbortController cancels fetch",
    prompt:
      "What happens after `abort()` is called?\n```\nconst controller = new AbortController();\nfetch(url, { signal: controller.signal }).catch(err => console.log(err.name));\ncontroller.abort();\n```",
    expected: "AbortError",
    explanation:
      "**AbortController:**\n1. `AbortController.signal` is passed to `fetch`.\n2. Calling `controller.abort()` cancels the fetch request.\n3. The fetch promise rejects with an `AbortError`.\n4. The `.catch` logs `'AbortError'`.\n\n**Key:** Use AbortController to cancel in‑flight requests when the user navigates away or cancels an upload.",
    options: ["AbortError", "TypeError", "NetworkError", "CancelError"],
  },
  {
    id: "cookie-document-cookie",
    type: "output",
    topic: "Web APIs",
    title: "document.cookie returns all cookies",
    prompt: "What does `document.cookie` return when multiple cookies exist?",
    code: "// document.cookie = 'a=1'; document.cookie = 'b=2'; console.log(document.cookie);",
    expected: "a=1; b=2 (concatenated string)",
    explanation:
      "**document.cookie API:**\n1. Reading `document.cookie` returns a semicolon‑separated string of all cookies for the current domain (excluding `HttpOnly` cookies, which are not accessible from JS).\n2. Format: `'key1=value1; key2=value2'`.\n3. Setting `document.cookie = 'key=value'` adds or updates a cookie, does not replace all.\n\n**Key:** `HttpOnly` cookies are not visible to JavaScript, enhancing security against XSS.",
    options: [
      "a=1; b=2 (concatenated string)",
      "['a=1', 'b=2'] (array)",
      "{ a: 1, b: 2 } (object)",
      "undefined",
    ],
  },
  {
    id: "service-worker-lifecycle",
    type: "output",
    topic: "Web APIs",
    title: "Service Worker install event",
    prompt:
      "During which phase is the `install` event of a Service Worker triggered?",
    code: "// self.addEventListener('install', () => console.log('installing'));",
    expected: "when the Service Worker script is first downloaded and parsed",
    explanation:
      "**Service Worker lifecycle:**\n1. `install` – fired when the SW script is first downloaded and parsed successfully.\n2. `activate` – fired after the previous SW version is no longer controlling pages.\n3. `fetch` – fired for network requests from controlled pages.\n\n**Key:** The `install` event is ideal for caching static assets (e.g., using `caches.open()`).",
    options: [
      "when the Service Worker script is first downloaded and parsed",
      "when the SW starts intercepting fetch events",
      "when the user closes the browser",
      "when the SW is unregistered",
    ],
  },
  {
    id: "web-worker-message",
    type: "output",
    topic: "Web APIs",
    title: "Web Worker postMessage",
    prompt: "How do you send data from a Web Worker back to the main thread?",
    code: "// inside worker script:",
    expected: "postMessage(data)",
    explanation:
      "**Web Worker messaging:**\n1. Workers communicate via the `postMessage` method and `onmessage` event handler.\n2. From the worker, `postMessage(data)` sends data to the main thread.\n3. In the main thread, `worker.onmessage = (e) => console.log(e.data)` receives the message.\n\n**Key:** Data is copied via structured cloning (not shared memory). Use `Transferable` objects (e.g., ArrayBuffer) for zero‑copy transfer of large data.",
    options: [
      "sendMessage(data)",
      "emit(data)",
      "postMessage(data)",
      "dispatchEvent(data)",
    ],
  },
  {
    id: "string-slice-substring",
    type: "output",
    topic: "JavaScript Strings",
    title: "slice vs substring",
    prompt:
      "What is logged?\n```\nconst str = 'Hello World';\nconsole.log(str.slice(-5));\nconsole.log(str.substring(-5));\n```",
    expected: "World\nHello World",
    explanation:
      "**String slice vs substring:**\n1. `slice(-5)` – negative indices count from the end, so `-5` means start at index 6 (length 11 – 5 = 6) → `'World'`.\n2. `substring(-5)` – negative numbers are treated as `0`, so it becomes `substring(0)` → returns entire string `'Hello World'`.\n3. `slice` supports negative indices; `substring` does not.\n\n**Key:** Prefer `slice` for modern code; it behaves more intuitively with negative arguments.",
    options: [
      "World\\nHello World",
      "World\\nWorld",
      "llo Wor\\nHello World",
      "Hello World\\nWorld",
    ],
  },
  {
    id: "regex-capture-groups",
    type: "output",
    topic: "JavaScript RegExp",
    title: "regex capture groups with match",
    prompt:
      "What is logged?\n```\nconst str = 'The year is 2025';\nconst regex = /(\\d{4})/;\nconsole.log(str.match(regex));\n```",
    expected:
      "['2025', '2025', index: 12, input: 'The year is 2025', groups: undefined]",
    explanation:
      "**RegExp capture groups:**\n1. `str.match(regex)` returns an array.\n2. First element is the full match (`'2025'`).\n3. Subsequent elements are capture groups (here, the same `'2025'` because the whole pattern is one group).\n4. The array also has `index`, `input`, and `groups` properties.\n\n**Key:** To get all matches (global), use `g` flag and `matchAll()` or `exec()` in loop.",
    options: [
      "['2025', '2025', index: 12, input: 'The year is 2025']",
      "['2025']",
      "null",
      "['2025', index: 12, input: 'The year is 2025']",
    ],
  },
  {
    id: "regex-global-match-all",
    type: "output",
    topic: "JavaScript RegExp",
    title: "global flag with match",
    prompt:
      "What is logged?\n```\nconst str = 'ab ab ab';\nconst regex = /ab/g;\nconsole.log(str.match(regex));\n```",
    expected: "['ab', 'ab', 'ab']",
    explanation:
      "**Global flag (`g`) with `match`:**\n1. When the `g` flag is used, `match()` returns an array of **all matches** (without capture groups).\n2. No `index` or `input` properties are attached in this case.\n3. Without `g`, only the first match is returned.\n\n**Key:** Use `matchAll()` to get detailed results for each match when the `g` flag is used.",
    options: [
      "['ab', 'ab', 'ab']",
      "['ab', index: 0, input: 'ab ab ab']",
      "null",
      "[['ab', index:0], ['ab', index:3], ['ab', index:6]]",
    ],
  },
  {
    id: "localstorage-quota-exceeded",
    type: "output",
    topic: "Web APIs",
    title: "localStorage quota exceeded error",
    prompt: "What error is thrown when localStorage exceeds its size limit?",
    code: "// try { localStorage.setItem('key', largeString); } catch(e) { console.log(e.name); }",
    expected: "QuotaExceededError",
    explanation:
      "**localStorage quota handling:**\n1. When you exceed the browser's storage quota (typically 5–10 MB), the `setItem` method throws an exception.\n2. The error name is `QuotaExceededError`.\n3. You should catch this error to provide feedback to the user or fallback to other storage.\n\n**Key:** Always wrap `localStorage.setItem` in a try‑catch for large or unpredictable data sizes.",
    options: [
      "QuotaExceededError",
      "RangeError",
      "StorageFullError",
      "TypeError",
    ],
  },
  {
    id: "react-usesyncexternalstore",
    type: "output",
    topic: "React Hooks",
    title: "useSyncExternalStore subscription",
    prompt:
      "When does the `subscribe` function get called in `useSyncExternalStore`?",
    code: "useSyncExternalStore(\n  (callback) => { /* subscribe */ },\n  () => store.getSnapshot()\n);",
    expected:
      "once when the component mounts, and again if the store reference changes",
    explanation:
      "**useSyncExternalStore:**\n1. The `subscribe` function is called once when the component mounts.\n2. It is called again only if the store reference (or the `getSnapshot` function identity) changes.\n3. During a re‑render, the hook checks if the snapshot has changed; if not, it does not resubscribe.\n\n**Key:** `useSyncExternalStore` is the recommended way to subscribe to external stores (Redux, Zustand, etc.) and is used internally by many state management libraries.",
    options: [
      "once when the component mounts, and again if the store reference changes",
      "on every render",
      "only when the snapshot changes",
      "only when the component unmounts",
    ],
  },
  {
    id: "react-useinsertioneffect",
    type: "output",
    topic: "React Hooks",
    title: "useInsertionEffect timing",
    prompt:
      "When does `useInsertionEffect` run relative to DOM mutations and layout effects?",
    code: "useInsertionEffect(() => { /* insert CSS */ }, []);",
    expected: "before any DOM mutations, before useLayoutEffect",
    explanation:
      "**useInsertionEffect timing:**\n1. `useInsertionEffect` runs **synchronously** before React commits DOM mutations.\n2. It runs before `useLayoutEffect` and before the browser paints.\n3. It is designed for CSS‑in‑JS libraries to insert styles before layout is computed.\n\n**Key:** Avoid using `useInsertionEffect` for general side effects; it is primarily for dynamic style injection.",
    options: [
      "before any DOM mutations, before useLayoutEffect",
      "after DOM mutations, before useLayoutEffect",
      "after useLayoutEffect, before useEffect",
      "only during server‑side rendering",
    ],
  },
  {
    id: "react-useid",
    type: "output",
    topic: "React Hooks",
    title: "useId generates stable IDs for hydration",
    prompt: "What is the primary purpose of `useId`?",
    code: "const id = useId();\nreturn <label htmlFor={id}>Name</label><input id={id} />;",
    expected:
      "generate unique, stable IDs that are consistent across server and client hydration",
    explanation:
      "**useId purpose:**\n1. `useId` generates a unique ID string that is **stable** across server‑side rendering and client hydration.\n2. It prevents hydration mismatches caused by non‑deterministic IDs (e.g., `Math.random()`).\n3. It also works with multiple concurrent React roots.\n\n**Key:** Use `useId` for accessibility attributes (`id`, `aria-describedby`, etc.) in server‑rendered applications.",
    options: [
      "generate unique, stable IDs that are consistent across server and client hydration",
      "generate a random ID on each render",
      "create a ref for DOM elements",
      "memoize expensive computations",
    ],
  },
  {
    id: "react-usedeferredvalue",
    type: "output",
    topic: "React Hooks",
    title: "useDeferredValue delays non-urgent updates",
    prompt: "What does `useDeferredValue` do?",
    code: "const deferredValue = useDeferredValue(value);",
    expected:
      "returns a deferred version of the value that updates after urgent state updates (e.g., user input) have been processed",
    explanation:
      "**useDeferredValue:**\n1. `useDeferredValue` returns a new version of the value that lags behind the actual value.\n2. When an urgent update (like typing in an input) happens, React will first render the old deferred value, then re‑render with the new value in the background.\n3. This improves perceived performance for expensive rendering that depends on that value.\n\n**Key:** Useful for filtering large lists during user input without blocking the UI.",
    options: [
      "returns a deferred version of the value that updates after urgent state updates have been processed",
      "cancels all pending state updates",
      "memoizes the value",
      "throws an error if value changes too quickly",
    ],
  },
  {
    id: "react-context-selector",
    type: "output",
    topic: "React Advanced",
    title: "Context selector pattern prevents re-renders",
    prompt:
      "Why would you use a `selector` function with Context (e.g., with `useContextSelector` library)?",
    code: "const name = useContextSelector(AppContext, state => state.user.name);",
    expected:
      "to only re‑render the component when the selected slice of context value changes",
    explanation:
      "**Context selector pattern:**\n1. Without a selector, a component re‑renders whenever **any** part of the context value changes.\n2. A selector function extracts a specific slice (e.g., `state.user.name`). The component only re‑renders when that slice changes.\n3. This is not built‑into React; libraries like `use-context-selector` implement it.\n4. Native React Context does not support selectors; every consumer re‑renders on any change.\n\n**Key:** For performance, split Context into multiple providers or use memoization.",
    options: [
      "to only re‑render when the selected slice of context value changes",
      "to transform the context value before using it",
      "to prevent the context from updating",
      "to memoize the entire context",
    ],
  },
  {
    id: "react-children-map",
    type: "output",
    topic: "React Advanced",
    title: "React.Children.map vs Array.map",
    prompt:
      "What is the main advantage of `React.Children.map` over `Array.map` for `props.children`?",
    code: "React.Children.map(children, child => <div>{child}</div>);",
    expected:
      "handles children that are a single element, an array, or `undefined` without errors",
    explanation:
      "**React.Children utilities:**\n1. `props.children` can be a single element, an array of elements, `undefined`, or a string (text node).\n2. `Array.map` would throw an error if children is not an array.\n3. `React.Children.map` safely iterates over any shape of children and returns a flat array.\n\n**Key:** Use `React.Children.map` when transforming children to ensure robustness with all possible child structures.",
    options: [
      "handles children that are a single element, an array, or undefined without errors",
      "faster performance",
      "automatically clones elements",
      "works only with functional components",
    ],
  },
  {
    id: "react-cloneelement",
    type: "output",
    topic: "React Advanced",
    title: "React.cloneElement adds props to children",
    prompt: "What does `React.cloneElement` do?",
    code: "const cloned = React.cloneElement(child, { extraProp: 'value' });",
    expected:
      "creates a new React element with the same type and key, merging new props with the original",
    explanation:
      "**React.cloneElement:**\n1. `cloneElement` creates a copy of a React element (`child`) and merges additional props.\n2. It preserves the original element's key, ref, and children.\n3. It is commonly used to add props to children passed via `props.children` (e.g., passing `onClick` to each child).\n\n**Key:** `cloneElement` is a lower‑level API; for most cases, you can use composition or render props instead.",
    options: [
      "creates a new React element with the same type and key, merging new props with the original",
      "deeply clones the entire component tree",
      "copies only the type, not the props",
      "throws an error if the child is a function component",
    ],
  },
  {
    id: "react-callback-ref",
    type: "output",
    topic: "React Advanced",
    title: "callback refs",
    prompt: "When is a callback ref function called?",
    code: "<div ref={el => console.log(el)} />",
    expected:
      "called when the element is mounted and again when it unmounts (with null)",
    explanation:
      "**Callback refs:**\n1. A callback ref function is called with the DOM element when the component mounts.\n2. When the component unmounts, the same callback is called with `null` to clean up.\n3. Callback refs give you more control (e.g., resizing observers) than `useRef`.\n\n**Key:** Use callback refs when you need to run code on mount/unmount of a DOM element (e.g., measuring dimensions).",
    options: [
      "called when the element is mounted and again when it unmounts (with null)",
      "called once when the component renders",
      "called only when the element is removed",
      "never called, only stored in a variable",
    ],
  },
  {
    id: "react-error-boundary-nested",
    type: "output",
    topic: "React Error Handling",
    title: "nested Error Boundaries",
    prompt:
      "If both parent and child components have Error Boundaries, and the child's boundary catches an error, which boundary's fallback is shown?",
    code: "<ParentBoundary><ChildBoundary><Buggy /></ChildBoundary></ParentBoundary>",
    expected: "the child boundary's fallback (closest one)",
    explanation:
      "**Nested Error Boundaries:**\n1. React propagates errors up until it finds the first Error Boundary.\n2. The **closest** Error Boundary above the thrown error catches it.\n3. If the child's boundary catches it, the parent never sees the error.\n4. This allows granular error isolation (e.g., a widget crash doesn't break the whole page).\n\n**Key:** Place Error Boundaries at different levels of granularity to control fallback UI.",
    options: [
      "the child boundary's fallback (closest one)",
      "the parent boundary's fallback (outermost)",
      "both boundaries show their fallbacks",
      "the error crashes the whole app",
    ],
  },
  {
    id: "react-profiler",
    type: "output",
    topic: "React Performance",
    title: "Profiler API onRender callback",
    prompt:
      "What information does the `onRender` callback of the `<Profiler>` component receive?",
    code: '<Profiler id="App" onRender={(id, phase, actualDuration) => {}}>...',
    expected:
      "id, phase, actual duration, base duration, start time, commit time, and interactions",
    explanation:
      "**Profiler onRender:**\n1. The `onRender` callback receives seven arguments:\n   - `id` – the `id` prop of the Profiler tree.\n   - `phase` – `'mount'`, `'update'`, or `'nested-update'`.\n   - `actualDuration` – time spent rendering the committed update.\n   - `baseDuration` – estimated time to render the entire subtree without memoization.\n   - `startTime`, `commitTime`, `interactions`.\n2. Used to measure render performance in production.\n\n**Key:** Use `React.Profiler` to identify slow components; do not use in production by default unless conditionally enabled.",
    options: [
      "id, phase, actual duration, base duration, start time, commit time, and interactions",
      "id, timeElapsed, component stack",
      "id, render count, lastRenderTime",
      "only id and actual duration",
    ],
  },
  {
    id: "react-testing-library-render",
    type: "output",
    topic: "React Testing",
    title: "React Testing Library render and screen",
    prompt: "What does `screen.getByText('Hello')` do?",
    code: "render(<Component />); const element = screen.getByText('Hello');",
    expected:
      "returns the DOM element that contains the text 'Hello' (throws if not found or multiple matches)",
    explanation:
      "**React Testing Library queries:**\n1. `screen.getByText` synchronously returns a DOM element that matches the text.\n2. If no element is found, it throws an error (causing the test to fail).\n3. If multiple elements match, it also throws (use `getAllByText` for multiple).\n4. Queries are centred on accessibility – encourage testing how users actually interact.\n\n**Key:** Prefer `getBy*` for assertions that an element exists; use `queryBy*` for testing absence (returns null).",
    options: [
      "returns the DOM element that contains the text 'Hello' (throws if not found or multiple matches)",
      "returns the first element, ignoring others",
      "returns all elements with that text",
      "returns a Promise that resolves to the element",
    ],
  },
  {
    id: "react-testing-library-fireevent",
    type: "output",
    topic: "React Testing",
    title: "fireEvent vs userEvent",
    prompt:
      "What is a limitation of `fireEvent` compared to `userEvent` in React Testing Library?",
    code: "fireEvent.click(button);",
    expected:
      "fireEvent dispatches events synchronously and does not simulate full browser interactions (e.g., focus, hover); userEvent is more realistic",
    explanation:
      "**fireEvent vs userEvent:**\n1. `fireEvent` dispatches a single DOM event immediately; it does not simulate the sequence of events that a real user would cause (e.g., `mousedown`, `mouseup`, `click`).\n2. `userEvent` from `@testing-library/user-event` provides a higher‑level simulation, including focus, keyboard events, and properly ordering events.\n3. For more realistic tests, prefer `userEvent`.\n\n**Key:** Use `fireEvent` for simple unit tests or custom event testing; use `userEvent` for integration tests of user interactions.",
    options: [
      "fireEvent dispatches events synchronously and does not simulate full browser interactions (e.g., focus, hover); userEvent is more realistic",
      "fireEvent only works on buttons; userEvent works on any element",
      "fireEvent cannot be used with async components",
      "fireEvent is deprecated",
    ],
  },
  {
    id: "nextjs-parallel-routes",
    type: "output",
    topic: "Next.js",
    title: "parallel routes (@slot)",
    prompt:
      "What is the purpose of parallel routes in Next.js App Router (e.g., `@dashboard/page.js` and `@analytics/page.js`)?",
    code: "// app/@dashboard/page.js and app/@analytics/page.js",
    expected:
      "to render multiple pages in the same layout simultaneously, each with its own URL segment (using slots)",
    explanation:
      "**Parallel routes:**\n1. Slots (named with `@` prefix, e.g., `@dashboard`) allow rendering multiple independent pages in the same layout.\n2. Each slot has its own URL segment (e.g., `/app/@dashboard/analytics`).\n3. They enable complex dashboards where different sections come from different routes.\n4. Useful for modals, tabs, or independent UI panels.\n\n**Key:** Parallel routes do not affect the main URL path; they are for advanced compositional layouts.",
    options: [
      "to render multiple pages in the same layout simultaneously, each with its own URL segment (using slots)",
      "to conditionally render a page based on user role",
      "to split a page into multiple files for code splitting",
      "to create API routes in the same folder",
    ],
  },
  {
    id: "nextjs-intercepting-routes",
    type: "output",
    topic: "Next.js",
    title: "intercepting routes (..)",
    prompt:
      "What does the `(..)` syntax in a route folder name (e.g., `app/(..)photo/[id]/page.js`) do?",
    code: "// app/(..)photo/[id]/page.js intercepts routes at one level above",
    expected:
      "intercepts routes at the same level as the parent directory (one segment up)",
    explanation:
      "**Intercepting routes:**\n1. Intercepting routes allow you to display a different UI for a route while preserving the original route's URL.\n2. The number of dots indicates the nesting level:\n   - `(.)` – same level\n   - `(..)` – one level up\n   - `(..)(..)` – two levels up\n   - `(...)` – from the root\n3. Common use: modals (e.g., `/feed/1` shows a modal; navigating directly to `/feed/1` shows the full page).\n\n**Key:** Intercepting routes do not change the URL; they are purely a UI layering technique.",
    options: [
      "intercepts routes at the same level as the parent directory (one segment up)",
      "intercepts routes from the root directory",
      "creates a redirect",
      "parallel route for modals",
    ],
  },
  {
    id: "nextjs-route-groups",
    type: "output",
    topic: "Next.js",
    title: "route groups (folder)",
    prompt:
      "What is the effect of placing a route inside a folder named `(auth)` (e.g., `app/(auth)/login/page.js`)?",
    code: "// app/(auth)/login/page.js and app/(auth)/register/page.js",
    expected:
      "the folder `(auth)` does not appear in the URL path; it organises routes without affecting the URL structure",
    explanation:
      "**Route groups:**\n1. Folders with parentheses `(groupname)` are ignored in the URL path.\n2. They group related routes without adding a segment to the URL.\n3. Useful for organising routes by feature (e.g., `(auth)`, `(dashboard)`) without affecting the URL.\n4. Each group can have its own layout.\n\n**Key:** Route groups allow sharing layouts across multiple routes without changing the public URL.",
    options: [
      "the folder `(auth)` does not appear in the URL path; it organises routes without affecting the URL structure",
      "the folder becomes a dynamic route parameter",
      "the folder is a catch‑all segment",
      "the folder is hidden from the file system at runtime",
    ],
  },
  {
    id: "nextjs-not-found",
    type: "output",
    topic: "Next.js",
    title: "notFound() function",
    prompt:
      "What happens when you call `notFound()` inside a Server Component or Route Handler?",
    code: "import { notFound } from 'next/navigation';\nif (!user) notFound();",
    expected:
      "renders the nearest `not-found.js` UI and returns a 404 HTTP status",
    explanation:
      "**`notFound()` function:**\n1. `notFound()` is called from Server Components, Server Actions, or Route Handlers.\n2. It stops execution and triggers the `not-found.js` boundary in the current route segment or its parent.\n3. It also sets the HTTP status to 404.\n4. Does not accept arguments; you must prepare a custom message in the `not-found.js` file.\n\n**Key:** Use `notFound()` for conditional 404 pages (e.g., when a resource is not found in the database).",
    options: [
      "renders the nearest `not-found.js` UI and returns a 404 HTTP status",
      "redirects to the home page",
      "throws an error that crashes the app",
      "logs a warning to the console",
    ],
  },
  {
    id: "nextjs-redirect",
    type: "output",
    topic: "Next.js",
    title: "redirect() function",
    prompt:
      "What is the difference between `redirect()` in a Server Component vs a Route Handler?",
    code: "import { redirect } from 'next/navigation';\nredirect('/login');",
    expected:
      "in both cases, it sends a 307 redirect (temporary) by default, but inside Server Components it throws a special error; in Route Handlers it sends a response",
    explanation:
      "**`redirect()` behavior:**\n1. In Server Components and Server Actions, `redirect()` throws a special error that is caught by Next.js.\n2. The page component stops rendering, and the redirect response is sent.\n3. In Route Handlers, you can return `redirect('/path')` or call `redirect()`; it returns a `NextResponse`.\n4. Default status is 307 (temporary redirect); to change, use `redirect(permanent: true)`.\n\n**Key:** `redirect()` should be used for navigation after form submission, authentication checks, or data mutations.",
    options: [
      "in both cases, it sends a 307 redirect (temporary) by default, but inside Server Components it throws a special error; in Route Handlers it sends a response",
      "only works in Client Components",
      "returns a promise that never resolves",
      "causes an infinite loop if not used with condition",
    ],
  },
  {
    id: "nextjs-force-static",
    type: "output",
    topic: "Next.js",
    title: "dynamic = 'force-static'",
    prompt:
      "What does `export const dynamic = 'force-static'` do in a route segment?",
    code: "export const dynamic = 'force-static';\nexport default async function Page() { ... }",
    expected:
      "forces the route to be statically generated even if it uses dynamic functions like `cookies()` or `headers()`",
    explanation:
      "**`dynamic = 'force-static'`:**\n1. By default, using `cookies()`, `headers()`, or `searchParams` makes a route dynamic.\n2. `force-static` overrides this and forces static generation at build time.\n3. Any dynamic calls will return empty values (e.g., `cookies()` returns empty object).\n4. Useful for partially static pages that occasionally need fallbacks.\n\n**Key:** Use `force-static` when you know the content is static but use helper functions that are normally dynamic.",
    options: [
      "forces the route to be statically generated even if it uses dynamic functions like `cookies()` or `headers()`",
      "forces the route to be fully dynamic",
      "disables caching for the route",
      "makes the route export a static file",
    ],
  },
  {
    id: "nextjs-standalone-output",
    type: "output",
    topic: "Next.js",
    title: "standalone output mode",
    prompt: "What does `output: 'standalone'` in `next.config.js` do?",
    code: "module.exports = { output: 'standalone' };",
    expected:
      "creates a minimal `standalone` folder with only necessary files, optimised for Docker deployments",
    explanation:
      "**Standalone output:**\n1. `output: 'standalone'` reduces the `.next` folder size by including only necessary runtime files and `node_modules` dependencies.\n2. The output is a self‑contained folder (`.next/standalone`) that can be copied into a Docker image.\n3. It omits dev dependencies and `next.config.js`, reducing image size significantly.\n\n**Key:** Use `standalone` in production Dockerfiles to reduce image size and improve deployment speed.",
    options: [
      "creates a minimal `standalone` folder with only necessary files, optimised for Docker deployments",
      "builds a single HTML file without JavaScript",
      "disables all optimizations",
      "exports static HTML for every page",
    ],
  },
  {
    id: "nextjs-public-env",
    type: "output",
    topic: "Next.js",
    title: "NEXT_PUBLIC_ environment variables",
    prompt:
      "Why must React environment variables that need to be used in the browser be prefixed with `NEXT_PUBLIC_`?",
    code: "NEXT_PUBLIC_API_URL=https://api.example.com",
    expected:
      "Next.js replaces `process.env.NEXT_PUBLIC_*` with the actual value at build time, and only these are exposed to the browser",
    explanation:
      "**Environment variable exposure:**\n1. Next.js statically replaces `process.env.NEXT_PUBLIC_VAR` with inline values during build.\n2. Variables without `NEXT_PUBLIC_` are only available on the server and not sent to the client.\n3. This prevents accidental leakage of secrets (e.g., database passwords, API keys).\n4. Changes to `NEXT_PUBLIC_` variables require a rebuild.\n\n**Key:** Use `NEXT_PUBLIC_` only for non‑sensitive configuration (e.g., API URLs, feature flags).",
    options: [
      "Next.js replaces `process.env.NEXT_PUBLIC_*` with the actual value at build time, and only these are exposed to the browser",
      "they are encrypted before being sent to the browser",
      "they are loaded dynamically at runtime",
      "they are available in both server and client without the prefix",
    ],
  },
  {
    id: "nextjs-image-fill",
    type: "output",
    topic: "Next.js",
    title: "next/image fill prop",
    prompt:
      "When should you use the `fill` prop on the `next/image` component?",
    code: '<Image fill src="/hero.jpg" alt="Hero" style={{ objectFit: \'cover\' }} />',
    expected:
      "when the image should fill its parent container, and the parent has `position: relative` or `absolute`",
    explanation:
      "**Image `fill` prop:**\n1. `fill` makes the image fill its parent container by setting `width: 100%; height: 100%` on the `<img>` element.\n2. The parent must have `position: relative`, `absolute`, or `fixed`.\n3. Use `fill` when you don't know the exact dimensions at build time (e.g., responsive images in a flexible grid).\n4. You must provide `sizes` and/or `style={{ objectFit: 'cover' }}` to avoid distortion.\n\n**Key:** Avoid setting `width` and `height` props when using `fill`.",
    options: [
      "when the image should fill its parent container, and the parent has `position: relative` or `absolute`",
      "when the image has a fixed aspect ratio",
      "when the image is an SVG",
      "when the image is used as a background",
    ],
  },
  {
    id: "nextjs-script-strategy",
    type: "output",
    topic: "Next.js",
    title: "next/script strategy options",
    prompt:
      "Which `strategy` for `next/script` loads the script after the page becomes interactive but before `load` event?",
    code: '<Script strategy="afterInteractive" />',
    expected: "afterInteractive",
    explanation:
      "**Script loading strategies:**\n1. `beforeInteractive` – loads script before the page is interactive (e.g., for critical scripts like polyfills).\n2. `afterInteractive` – loads script after the page is interactive (hydration complete), but before the `load` event. Default for `next/script`.\n3. `lazyOnload` – loads script after the page finishes loading (`load` event).\n4. `worker` – (experimental) loads script in a web worker.\n\n**Key:** `afterInteractive` is good for analytics, chat widgets, etc., that should not block page rendering.",
    options: ["beforeInteractive", "afterInteractive", "lazyOnload", "worker"],
  },
  {
    id: "nextjs-font-subsets",
    type: "output",
    topic: "Next.js",
    title: "next/font subsets",
    prompt:
      "What is the benefit of specifying `subsets: ['latin']` when using `next/font/google`?",
    code: "const inter = Inter({ subsets: ['latin'] });",
    expected:
      "reduces the font file size by including only the needed character subsets (e.g., Latin, Latin‑ext, Cyrillic)",
    explanation:
      "**Font subsets:**\n1. Google Fonts provide multiple character sets; including all increases download size.\n2. By specifying `subsets: ['latin']`, Next.js only downloads the Latin characters (most web content).\n3. This reduces the CSS and font file size, improving performance.\n4. Other subsets: `'latin-ext'`, `'cyrillic'`, `'vietnamese'`, etc.\n\n**Key:** Use subsets relevant to your target audience to minimise data transfer.",
    options: [
      "reduces the font file size by including only the needed character subsets",
      "enables variable fonts",
      "disables font fallback",
      "increases font loading priority",
    ],
  },
  {
    id: "nextjs-middleware-rewrite",
    type: "output",
    topic: "Next.js",
    title: "NextResponse.rewrite",
    prompt:
      "What is the difference between `NextResponse.rewrite` and `NextResponse.redirect` in Next.js middleware?",
    code: "return NextResponse.rewrite(new URL('/new', request.url)); vs return NextResponse.redirect(new URL('/new', request.url));",
    expected:
      "`rewrite` maps the request to a different URL internally (URL stays the same in the browser); `redirect` sends a 30x response, changing the URL",
    explanation:
      "**Middleware rewrite vs redirect:**\n1. `rewrite` – The user sees the original URL, but the server serves content from another route (internal mapping).\n2. `redirect` – The server sends a 307/308 status and a `Location` header; the browser navigates to the new URL.\n3. `rewrite` is useful for A/B testing, dynamic routing without exposing implementation, or handling legacy URLs.\n4. `redirect` is for permanent moves, authentication redirection, etc.\n\n**Key:** Use `rewrite` when you want to preserve the URL in the browser address bar; use `redirect` when the URL should change.",
    options: [
      "`rewrite` maps the request to a different URL internally (URL stays the same in the browser); `redirect` sends a 30x response, changing the URL",
      "`rewrite` is only for API routes; `redirect` only for pages",
      "`rewrite` is temporary; `redirect` is permanent",
      "`rewrite` works only in development; `redirect` works in production",
    ],
  },
];

export const outputQuestions = rawOutputQuestions.map((question) => ({
  ...question,
  type: "output",
}));
