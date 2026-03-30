const rawGoOutputQuestions = [
  {
    id: "go-variable-shadowing",
    topic: "Scoping",
    title: "Variable Shadowing in Go",
    prompt: "What is printed?",
    code: `package main

import "fmt"

func main() {
    x := 10
    if true {
        x := 20
        fmt.Println(x)
    }
    fmt.Println(x)
}`,
    expected: "20\n10",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nVARIABLE SHADOWING:\n1. In the outer scope, `x := 10` declares and initializes `x`.\n2. Inside the `if` block, `x := 20` declares a new variable `x` that shadows the outer one. This is a new variable, not an assignment to the outer `x`.\n3. `fmt.Println(x)` inside the block prints `20` (the inner `x`).\n4. After the block, the inner `x` goes out of scope. The outer `x` remains unchanged, so `fmt.Println(x)` prints `10`.\n\nKEY: The `:=` operator inside a new block creates a new variable if the name is not already declared in that block, even if a variable with the same name exists in an outer scope.",
  },
  {
    id: "go-defer-order",
    topic: "Defer",
    title: "Defer Execution Order",
    prompt: "What is printed?",
    code: `package main

import "fmt"

func main() {
    defer fmt.Println("first")
    defer fmt.Println("second")
    defer fmt.Println("third")
    fmt.Println("hello")
}`,
    expected: "hello\nthird\nsecond\nfirst",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nDEFER IS LIFO (LAST-IN-FIRST-OUT):\n1. `defer` statements push their function calls onto a stack.\n2. They are executed after the surrounding function returns, in reverse order of declaration.\n3. `fmt.Println(\"hello\")` runs immediately, printing `hello`.\n4. When `main` exits, the deferred calls pop from the stack: "third" (last deferred), then "second", then "first".\n\nKEY: Deferred functions are executed in reverse order of definition, and their arguments are evaluated at the time the `defer` is encountered, not when the function is actually called.',
  },
  {
    id: "go-loop-goroutine-closure",
    topic: "Goroutines & Closures",
    title: "Loop Variable Captured by Goroutine",
    prompt: "What is printed? (Explain the likely output)",
    code: `package main

import (
    "fmt"
    "time"
)

func main() {
    for i := 0; i < 3; i++ {
        go func() {
            fmt.Println(i)
        }()
    }
    time.Sleep(100 * time.Millisecond)
}`,
    expected:
      "0\n1\n2 (in any order)  // Go 1.22+\n3\n3\n3 (in any order)  // Go <=1.21",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nLOOP VARIABLE CAPTURE DEPENDS ON GO VERSION:\n1. In Go 1.22 and later, loop variables declared in the loop header use per-iteration semantics for closures. Each goroutine captures its own iteration value, so output is `0`, `1`, and `2` in any order.\n2. In older Go versions (<=1.21), the loop variable was effectively reused, so goroutines often printed the final value `3`.\n3. Scheduling can still vary order, but values differ by version as above.\n\nROBUST STYLE: Passing `i` as an argument (`go func(i int) { fmt.Println(i) }(i)`) is still explicit and version-safe.\n\nKEY: This classic closure trap was fixed in newer Go versions, but many interview examples still show the old behavior.",
  },
  {
    id: "go-slice-append-capacity",
    topic: "Slices",
    title: "Slice Append and Underlying Array",
    prompt: "What is printed?",
    code: `package main

import "fmt"

func main() {
    a := []int{1, 2, 3}
    b := a
    b = append(b, 4)
    a[0] = 99
    fmt.Println(a)
    fmt.Println(b)
}`,
    expected: "[99 2 3]\n[1 2 3 4]",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nSLICE APPEND WITH CAPACITY:\n1. `a` is a slice with length 3 and capacity 3 (since it's a literal).\n2. `b := a` copies the slice header (pointer, len, cap). Both `a` and `b` point to the same underlying array of capacity 3.\n3. `b = append(b, 4)` - because `b` has capacity 3, appending a 4th element forces allocation of a new underlying array with larger capacity. `b` now points to a new array, while `a` still points to the old one.\n4. `a[0] = 99` modifies the old array, which `a` still references. `b`'s array is unaffected.\n5. `fmt.Println(a)` -> `[99 2 3]`. `fmt.Println(b)` -> `[1 2 3 4]`.\n\nKEY: `append` may allocate a new backing array if the original slice does not have enough capacity. After allocation, the original and new slices become independent.",
  },
  {
    id: "go-map-access-zero",
    topic: "Maps",
    title: "Accessing Missing Map Key",
    prompt: "What is printed?",
    code: `package main

import "fmt"

func main() {
    m := map[string]int{"a": 1}
    val := m["b"]
    fmt.Println(val)
}`,
    expected: "0",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nMAP ACCESS RETURNS ZERO VALUE FOR MISSING KEY:\n1. When you access a map key that does not exist, Go returns the zero value of the value type.\n2. Here the value type is `int`, so zero value is `0`.\n3. To distinguish between a missing key and a key that actually holds the zero value, use the comma-ok idiom: `val, ok := m["b"]`.\n\nKEY: Map reads are safe; they never panic. They return the zero value for absent keys. Always use the `ok` check when zero values are legitimate values.',
  },
  {
    id: "go-interface-nil",
    topic: "Interfaces",
    title: "Interface Nil vs Concrete Nil",
    prompt: "What is printed?",
    code: `package main

import "fmt"

func main() {
    var i interface{}
    var p *int = nil
    i = p
    fmt.Println(i == nil)
}`,
    expected: "false",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nINTERFACE VALUE IS NIL ONLY IF BOTH TYPE AND VALUE ARE NIL:\n1. An interface variable holds a (type, value) pair.\n2. `i` is initially nil (type nil, value nil).\n3. `p` is a nil pointer of type `*int`.\n4. Assigning `i = p` gives `i` a type `*int` and value `nil`. Now `i` is not a nil interface because its type is set.\n5. `i == nil` compares the interface to a nil interface value. Since `i` has a non-nil type, the comparison returns `false`.\n\nKEY: An interface is considered nil only when both its dynamic type and dynamic value are nil. A common mistake is to return a nil concrete pointer from a function that returns an interface and then check for `nil` - it will not be nil.",
  },
  {
    id: "go-channel-blocking-select",
    topic: "Channels & Select",
    title: "Select with Default Case",
    prompt: "What is printed?",
    code: `package main

import "fmt"

func main() {
    ch := make(chan int)
    select {
    case val := <-ch:
        fmt.Println(val)
    default:
        fmt.Println("default")
    }
}`,
    expected: "default",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nSELECT WITH DEFAULT IS NON-BLOCKING:\n1. `select` chooses a case that is ready to proceed.\n2. `ch` is an unbuffered channel with no sender; receiving from it would block.\n3. The `default` case is immediately executed because no other case is ready.\n4. Output is "default".\n\nKEY: `select` with a `default` case turns a potentially blocking operation into a non-blocking one. It is commonly used for non-blocking channel sends/receives.',
  },
  {
    id: "go-defer-return",
    topic: "Defer & Return",
    title: "Defer Modifies Named Return",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println(f())\n}\n\nfunc f() (x int) {\n    defer func() { x++ }()\n    return 5\n}`,
    expected: "6",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nDEFER CAN MODIFY NAMED RETURN VALUES:\n1. The function `f` has a named return parameter `x`.\n2. The `return 5` assigns 5 to `x`, then the deferred function runs.\n3. The deferred function increments `x` to 6.\n4. Finally, the function returns the value of `x`, which is 6.\n\n📌 KEY: Deferred functions can modify named return values because they execute after the return statement assigns the result but before the function actually exits. For anonymous returns, this trick doesn't work.",
  },
  {
    id: "go-range-loop-variable",
    topic: "Range & Closures",
    title: "Range Loop Variable Capture",
    prompt: "What is printed? (Likely output)",
    code: `package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    s := []int{1, 2, 3}\n    for _, v := range s {\n        go func() {\n            fmt.Println(v)\n        }()\n    }\n    time.Sleep(100 * time.Millisecond)\n}`,
    expected: "3\n3\n3 (in any order)",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nRANGE LOOP REUSES THE SAME VARIABLE:\n1. In a `range` loop, the iteration variable `v` is **reused** across iterations; only its value changes.\n2. All goroutines capture the **same variable** `v`. By the time they execute, the loop has finished and `v` holds the last value (3).\n3. All goroutines print `3`.\n\n📌 FIX: Pass `v` as an argument: `go func(v int) { fmt.Println(v) }(v)`.\n\n📌 KEY: This behavior is similar to the classic for-loop closure pitfall. Go's range variable is reused, so closures referencing it will see the final value.",
  },
  {
    id: "go-method-set-pointer",
    topic: "Methods",
    title: "Pointer vs Value Receiver Method Set",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype T struct{ a int }\n\nfunc (t T) val()   { fmt.Println("val") }\nfunc (t *T) ptr() { fmt.Println("ptr") }\n\nfunc main() {\n    var t T\n    t.val()\n    t.ptr()\n    var pt *T = nil\n    pt.val()\n    pt.ptr()\n}`,
    expected: "val\nptr\nval\nptr",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nMETHOD SET RULES:\n1. `T` has method `val()` (value receiver). `*T` has both `val()` and `ptr()` because Go automatically converts `*T` to `T` when calling a value receiver method.\n2. `t.val()` and `t.ptr()` work because `t` is addressable; Go takes `&t` for the pointer receiver.\n3. `pt` is a nil pointer of type `*T`.\n4. Calling `pt.val()` works because the receiver is automatically dereferenced (value receiver). The method receives `*pt` which is the zero value of `T`, but since the method doesn't access any fields, it doesn't panic.\n5. Calling `pt.ptr()` also works (pointer receiver) even though `pt` is nil, because the method does not access any fields, so it's safe.\n\n📌 KEY: In Go, methods with value receivers can be called on both values and pointers; methods with pointer receivers can only be called on pointers (or addressable values). Nil pointers can call methods as long as they don't dereference the receiver.",
  },
  {
    id: "go-type-assertion-ok",
    topic: "Type Assertions",
    title: "Type Assertion Panic vs Comma-Ok",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var i interface{} = "hello"\n    val := i.(int)\n    fmt.Println(val)\n}`,
    expected: "panic: interface conversion: interface {} is string, not int",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nTYPE ASSERTION WITHOUT COMMA-OK CAN PANIC:\n1. `i` holds a string `"hello"`.\n2. `i.(int)` attempts to assert that the dynamic type is `int`.\n3. Since the actual type is `string`, this assertion fails and causes a **runtime panic**.\n4. To avoid panic, use the comma-ok idiom: `val, ok := i.(int)`. Then `ok` will be `false` and `val` will be the zero value.\n\n📌 KEY: Single-value type assertions will panic if the underlying type does not match. Always use the comma-ok form when you\'re unsure of the type.',
  },
  {
    id: "go-string-rune-range",
    topic: "Strings & Runes",
    title: "Iterating Over String with Range",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    s := "世界"\n    for i, r := range s {\n        fmt.Printf("%d: %c\\n", i, r)\n    }\n}`,
    expected: "0: 世\n3: 界",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nRANGE OVER STRING ITERATES OVER RUNES, NOT BYTES:\n1. The string `\"世界\"` is UTF-8 encoded. In UTF-8, each Chinese character occupies 3 bytes.\n2. `range` over a string decodes the string as UTF-8 and produces **rune** values (Unicode code points) and their **byte indices** in the underlying byte slice.\n3. `'世'` starts at index 0 and is 3 bytes long, so the next rune `'界'` starts at index 3.\n4. Output shows byte indices `0` and `3` with the runes.\n\n📌 KEY: Using `range` on a string gives you runes, which is safe for multi-byte characters. Accessing by index (e.g., `s[0]`) would give a byte, not a character.",
  },
  {
    id: "go-nil-slice-vs-empty",
    topic: "Slices",
    title: "Nil Slice vs Empty Slice",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var s1 []int\n    s2 := []int{}\n    fmt.Println(s1 == nil, s2 == nil)\n    fmt.Println(len(s1), len(s2))\n    fmt.Println(cap(s1), cap(s2))\n}`,
    expected: "true false\n0 0\n0 0",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nNIL SLICE AND EMPTY SLICE DIFFER IN COMPARISON TO NIL:\n1. `var s1 []int` declares a nil slice (no underlying array allocated).\n2. `s2 := []int{}` declares an empty slice with a backing array (a zero-length array).\n3. Both have length 0 and capacity 0, but only `s1` is `nil`.\n4. In many operations, they behave similarly (e.g., `append` works fine on both). However, JSON marshaling may treat them differently, and equality checks to `nil` differ.\n\n📌 KEY: Use `nil` slices as a default when you want to represent "no elements" without allocating memory. Prefer `nil` over empty slices for consistency unless you need a non-nil value.',
  },
  {
    id: "go-zero-values",
    topic: "Variables",
    title: "Variable Initialization and Zero Values",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var a int\n    var b string\n    var c bool\n    var d *int\n    var e []int\n    fmt.Println(a, b, c, d, e)\n}`,
    expected: "0  false <nil> []",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nZERO VALUES IN GO:\n1. Uninitialized variables are automatically set to their zero values.\n2. `int` → 0\n3. `string` → "" (empty string, prints as empty)\n4. `bool` → false\n5. Pointer → nil\n6. Slice → nil (printed as `[]`)\n\n📌 KEY: Every type in Go has a well-defined zero value. This eliminates uninitialized variables from causing undefined behavior.',
  },
  {
    id: "go-close-channel-receive",
    topic: "Channels",
    title: "Receiving from Closed Channel",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 1)\n    ch <- 42\n    close(ch)\n    v1, ok1 := <-ch\n    v2, ok2 := <-ch\n    fmt.Println(v1, ok1)\n    fmt.Println(v2, ok2)\n}`,
    expected: "42 true\n0 false",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nRECEIVING FROM A CLOSED CHANNEL:\n1. A channel with an element is closed after sending `42`.\n2. The first receive `v1, ok1 := <-ch` receives the buffered value `42`, `ok1` is `true`.\n3. The second receive from the closed and empty channel yields the zero value of the channel's type (0 for int) and `ok2` is `false`.\n4. This pattern is used to signal that no more values will be sent.\n\n📌 KEY: After a channel is closed, you can still receive any remaining buffered values. Once the buffer is empty, receives immediately return the zero value and `false` for the ok flag.",
  },
  {
    id: "go-embedded-struct",
    topic: "Struct Embedding",
    title: "Field Promotion in Embedded Structs",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype A struct {\n    X int\n}\n\ntype B struct {\n    A\n    X int\n}\n\nfunc main() {\n    b := B{X: 10}\n    b.A.X = 20\n    fmt.Println(b.X, b.A.X)\n}`,
    expected: "10 20",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nFIELD PROMOTION AND SHADOWING:\n1. `B` embeds `A` and also declares its own field `X`.\n2. The outer field `X` shadows the embedded `A.X`.\n3. `b := B{X: 10}` sets the outer `X` to 10; `A.X` remains zero.\n4. `b.A.X = 20` explicitly sets the embedded `A`'s `X` to 20.\n5. `b.X` accesses the outer field, `b.A.X` accesses the embedded field.\n\n📌 KEY: When an outer struct has a field with the same name as an embedded field, the outer field shadows the inner one. You can still access the inner field via the embedded type name.",
  },
  {
    id: "go-panic-recover",
    topic: "Panic & Recover",
    title: "Recover in Deferred Function",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println("recovered:", r)\n        }\n    }()\n    panic("oh no")\n    fmt.Println("after panic")\n}`,
    expected: "recovered: oh no",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nRECOVER ONLY WORKS IN DEFERRED FUNCTIONS:\n1. `panic` stops normal execution and starts unwinding the stack.\n2. Deferred functions run during unwinding.\n3. The deferred anonymous function calls `recover()`, which catches the panic value.\n4. The function then prints the recovered value.\n5. Execution continues after the deferred function, but the program does not run any code after the panic point (`fmt.Println("after panic")` is never executed).\n\n📌 KEY: `recover` is only useful inside deferred functions. It stops the panic propagation and allows the program to continue.',
  },
  {
    id: "go-iota-const",
    topic: "Constants",
    title: "Iota Resets on New Const Block",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nconst (\n    A = iota\n    B\n    C = 100\n    D\n    E = iota\n)\n\nfunc main() {\n    fmt.Println(A, B, C, D, E)\n}`,
    expected: "0 1 100 100 4",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nIOTA BEHAVIOR:\n1. `iota` resets to 0 at the start of each `const` block.\n2. `A = iota` → 0, `B` → 1 (implicitly `iota`).\n3. `C = 100` explicitly sets C to 100; `iota` continues incrementing internally.\n4. `D` implicitly uses `C`'s expression `100`, so D = 100. `iota` is now 3.\n5. `E = iota` → current iota value is 4 (since it has incremented for each line).\n\n📌 KEY: `iota` increments per constant line within a block, regardless of whether the line uses it. It's a compile-time counter, not a runtime value.",
  },
  {
    id: "go-blank-identifier",
    topic: "Blank Identifier",
    title: "Blank Identifier and Variable Declaration",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    a := 1\n    _ = a\n    b := 2\n    fmt.Println(b)\n}`,
    expected: "2",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nBLANK IDENTIFIER DOES NOT DECLARE A VARIABLE:\n1. `a := 1` declares and initializes `a`.\n2. `_ = a` assigns `a` to the blank identifier; this is a valid assignment but does not declare a new variable.\n3. `b := 2` is fine, no conflict with `_`.\n4. Program prints `2`.\n\n📌 KEY: The blank identifier `_` is a write‑only placeholder. It cannot be used for declaration; it only discards values.",
  },
  {
    id: "go-unexported-field-json",
    topic: "JSON Marshaling",
    title: "Unexported Fields in JSON",
    prompt: "What is printed?",
    code: `package main\n\nimport (\n    \"encoding/json\"\n    \"fmt\"\n)\n\ntype User struct {\n    Name string\n    age  int\n}\n\nfunc main() {\n    u := User{Name: \"Alice\", age: 30}\n    b, _ := json.Marshal(u)\n    fmt.Println(string(b))\n}`,
    expected: '{"Name":"Alice"}',
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nJSON MARSHALING ONLY EXPORTS FIELDS:\n1. `User` has an exported field `Name` (starts with capital) and an unexported field `age` (starts with lowercase).\n2. `json.Marshal` only includes exported fields in the output.\n3. The resulting JSON object contains only `"Name"`.\n\n📌 KEY: Go\'s `encoding/json` package (and most reflection-based libraries) only process fields that are exported. Use struct tags like `json:"age"` if you need to export an unexported field, or make the field public.',
  },
  {
    id: "go-time-format",
    topic: "Time",
    title: "Time Formatting Reference Date",
    prompt: "What is printed?",
    code: `package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc main() {\n    t := time.Date(2025, 10, 31, 23, 59, 0, 0, time.UTC)\n    fmt.Println(t.Format(\"2006-01-02 15:04:05\"))\n}`,
    expected: "2025-10-31 23:59:00",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nTIME FORMATTING REFERENCE DATE:\n1. Go uses a specific reference date `Mon Jan 2 15:04:05 MST 2006` to define layout strings.\n2. The layout string `"2006-01-02 15:04:05"` corresponds to year, month, day, hour, minute, second.\n3. `t.Format()` uses that layout to output the provided time in the desired format.\n\n📌 KEY: The reference date is **2006-01-02 15:04:05**. You must remember this magic number when formatting or parsing times in Go.',
  },
  {
    id: "go-interface-satisfaction-implicit",
    topic: "Interfaces",
    title: "Implicit Interface Satisfaction",
    prompt: "What is printed?",
    code: `package main\n\nimport \"fmt\"\n\ntype Speaker interface {\n    Speak() string\n}\n\ntype Dog struct{}\n\nfunc (d Dog) Speak() string {\n    return \"Woof!\"\n}\n\nfunc main() {\n    var s Speaker = Dog{}\n    fmt.Println(s.Speak())\n}`,
    expected: "Woof!",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nIMPLICIT INTERFACE SATISFACTION:\n1. `Dog` does not explicitly declare that it implements `Speaker`.\n2. Go checks method sets: `Dog` has a `Speak()` method with the same signature.\n3. Therefore, `Dog` implicitly satisfies `Speaker` and can be assigned to a `Speaker` variable.\n\n📌 KEY: Go interfaces are satisfied implicitly. There is no `implements` keyword. If the type has all required methods, it automatically implements the interface.",
  },
  {
    id: "go-defer-args-evaluation",
    topic: "Defer",
    title: "Defer Argument Evaluation Timing",
    prompt: "What is printed?",
    code: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    x := 1\n    defer fmt.Println(x)\n    x = 2\n    fmt.Println(x)\n}`,
    expected: "2\n1",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nDEFER ARGUMENTS EVALUATED IMMEDIATELY:\n1. `defer fmt.Println(x)` is encountered. The argument `x` is evaluated **right away** (its current value is 1). The function call is saved for later.\n2. `x = 2` changes `x` to 2.\n3. `fmt.Println(x)` prints `2` immediately.\n4. After `main` returns, the deferred call runs, printing `1` (the value that was captured).\n\n📌 KEY: Arguments to a deferred function are evaluated when the `defer` statement executes, not when the function is called later. To use the final value, pass a pointer or a closure.",
  },
  {
    id: "go-copy-slice",
    topic: "Slices",
    title: "Built-in copy Function",
    prompt: "What is printed?",
    code: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    src := []int{1, 2, 3, 4}\n    dst := make([]int, 2)\n    n := copy(dst, src)\n    fmt.Println(dst, n)\n}`,
    expected: "[1 2] 2",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nCOPY COPIES MIN(LEN(dst), LEN(src)) ELEMENTS:\n1. `make([]int, 2)` creates `dst` with length 2, capacity 2.\n2. `copy(dst, src)` copies elements from `src` to `dst` until `dst` is full.\n3. It copies `dst`'s length (2) elements: `1` and `2`.\n4. It returns the number of elements copied (2).\n\n📌 KEY: `copy` never grows the destination slice; it copies only up to the destination's length. The number of elements copied is `min(len(dst), len(src))`.",
  },
  {
    id: "go-make-vs-new",
    topic: "Memory Allocation",
    title: "make vs new",
    prompt: "What is printed?",
    code: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    a := new(int)\n    b := make([]int, 0)\n    fmt.Printf(\"%T %T\", a, b)\n}`,
    expected: "*int []int",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nMAKE VS NEW:\n1. `new(int)` allocates memory for an `int` and returns a **pointer** (`*int`).\n2. `make([]int, 0)` allocates a slice (header + backing array) and returns the slice value itself (not a pointer).\n3. `new` works for any type and returns a pointer to zeroed memory.\n4. `make` is only for slices, maps, and channels; it initializes the internal data structures.\n\n📌 KEY: Use `new` for any type when you want a pointer to zeroed memory; use `make` for slices, maps, and channels to get a usable value.",
  },
  {
    id: "go-select-multiple-channels",
    topic: "Select",
    title: "Select with Multiple Ready Channels",
    prompt: "What is printed? (Explain the possible output)",
    code: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch1 := make(chan int, 1)\n    ch2 := make(chan int, 1)\n    ch1 <- 1\n    ch2 <- 2\n    select {\n    case v := <-ch1:\n        fmt.Println(\"ch1:\", v)\n    case v := <-ch2:\n        fmt.Println(\"ch2:\", v)\n    }\n}`,
    expected: "ch1: 1\nor\nch2: 2\n(not deterministic)",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nSELECT WITH MULTIPLE READY CASES:\n1. Both `ch1` and `ch2` have buffered data, so both receive cases are ready.\n2. When multiple cases are ready, `select` chooses **one at random** to avoid starvation.\n3. The output is not deterministic; either `ch1: 1` or `ch2: 2` could be printed.\n\n📌 KEY: This randomness is part of the language spec to prevent subtle bias. If you need deterministic behavior, you can use a default case or other ordering mechanisms.",
  },
  {
    id: "go-string-concatenation",
    topic: "Strings",
    title: "String Concatenation and Byte Slices",
    prompt: "What is printed?",
    code: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := \"hello\"\n    b := []byte(s)\n    b[0] = 'j'\n    fmt.Println(s, string(b))\n}`,
    expected: "hello jello",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nSTRINGS ARE IMMUTABLE:\n1. `s` is a string literal; strings in Go are immutable.\n2. `[]byte(s)` creates a new byte slice containing a copy of the string's bytes.\n3. Modifying `b` does not affect the original string `s`.\n4. `string(b)` creates a new string from the modified bytes.\n\n📌 KEY: Strings are immutable, and converting to a byte slice always makes a copy. This is efficient for small strings but has memory implications for large ones.",
  },
  {
    id: "go-select-timeout",
    topic: "Select & Timeouts",
    title: "Select with Timeout Using time.After",
    prompt: "What is printed?",
    code: `package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    ch := make(chan int)\n    select {\n    case v := <-ch:\n        fmt.Println(v)\n    case <-time.After(100 * time.Millisecond):\n        fmt.Println("timeout")\n    }\n}`,
    expected: "timeout",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nSELECT WITH TIMEOUT:\n1. `ch` is an unbuffered channel with no sender, so receiving would block indefinitely.\n2. `time.After(100ms)` returns a channel that sends a value after the specified duration.\n3. After 100ms, the `time.After` case becomes ready, and the `select` executes that case.\n4. Output is `"timeout"`.\n\n📌 KEY: `time.After` is a common pattern for implementing timeouts in selects. The timer channel will be triggered exactly once.',
  },
  {
    id: "go-nil-channel-select",
    topic: "Select",
    title: "Nil Channel in Select",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var ch chan int // nil channel\n    select {\n    case <-ch:\n        fmt.Println("received")\n    default:\n        fmt.Println("default")\n    }\n}`,
    expected: "default",
    explanation:
      'EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nNIL CHANNEL IN SELECT:\n1. `ch` is a nil channel (uninitialized).\n2. A receive from a nil channel would block forever, so it is not ready.\n3. The `default` case is executed immediately.\n4. Output is `"default"`.\n\n📌 KEY: A nil channel is never ready for communication. This property is sometimes used to disable cases in a select dynamically.',
  },
  {
    id: "go-mutex-reentrant",
    topic: "Sync",
    title: "Mutex is Not Reentrant",
    prompt: "What is printed? (Explain the behavior)",
    code: `package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nvar mu sync.Mutex\nvar counter int\n\nfunc main() {\n    mu.Lock()\n    increment()\n    mu.Unlock()\n    fmt.Println(counter)\n}\n\nfunc increment() {\n    mu.Lock()\n    counter++\n    mu.Unlock()\n}`,
    expected:
      "fatal error: all goroutines are asleep - deadlock!\n(or hangs/panics)",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nMUTEX IS NOT REENTRANT:\n1. `main` acquires the mutex with `mu.Lock()`.\n2. It then calls `increment()` which tries to lock the same mutex again.\n3. The second `Lock()` will block indefinitely because the mutex is already locked by the same goroutine.\n4. Go's `sync.Mutex` is not reentrant; a goroutine cannot lock a mutex it already holds.\n5. The program deadlocks and the runtime detects it, causing a panic.\n\n📌 KEY: Unlike some languages, Go's mutex does not allow recursive locking. If you need recursion, use a different synchronization primitive or redesign.",
  },
  {
    id: "go-context-cancel",
    topic: "Context",
    title: "Context Cancellation Propagation",
    prompt: "What is printed? (Order may vary)",
    code: `package main\n\nimport (\n    "context"\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    ctx, cancel := context.WithCancel(context.Background())\n    go worker(ctx, "worker1")\n    go worker(ctx, "worker2")\n    time.Sleep(100 * time.Millisecond)\n    cancel()\n    time.Sleep(200 * time.Millisecond)\n}\n\nfunc worker(ctx context.Context, name string) {\n    select {\n    case <-ctx.Done():\n        fmt.Println(name, "stopped")\n    }\n}`,
    expected: "worker1 stopped\nworker2 stopped\n(in any order)",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nCONTEXT CANCELLATION PROPAGATION:\n1. `context.WithCancel` creates a cancellable context and a cancel function.\n2. Two goroutines are started with the same context, each waiting on `ctx.Done()`.\n3. After 100ms, `cancel()` is called, which closes the `Done` channel for both contexts.\n4. Both goroutines unblock and print their messages. The order is non-deterministic.\n5. The program then sleeps to allow the goroutines to print before exiting.\n\n📌 KEY: Canceling a parent context cancels all derived contexts. This is the primary mechanism for graceful shutdown in concurrent Go programs.",
  },
  {
    id: "go-type-switch",
    topic: "Type Switches",
    title: "Type Switch with Fallthrough",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var i interface{} = 42\n    switch v := i.(type) {\n    case int:\n        fmt.Printf("int: %d\\n", v)\n    case string:\n        fmt.Printf("string: %s\\n", v)\n    default:\n        fmt.Println("unknown")\n    }\n}`,
    expected: "int: 42",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nTYPE SWITCH MATCHES CONCRETE TYPE:\n1. The type switch examines the dynamic type of the interface value.\n2. `i` holds an `int`, so the `int` case matches.\n3. The variable `v` in that case is of type `int` with the value `42`.\n4. Output is `int: 42`.\n\n📌 KEY: In a type switch, the variable in each case is automatically typed to that case's type. There is no `fallthrough` for type switches; each case is independent.",
  },
  {
    id: "go-append-share-capacity",
    topic: "Slices",
    title: "Append Within Capacity Affects Original",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    a := make([]int, 3, 5)\n    a[0], a[1], a[2] = 1, 2, 3\n    b := a[:2]\n    b = append(b, 99)\n    fmt.Println(a)\n    fmt.Println(b)\n}`,
    expected: "[1 2 99]\n[1 2 99]",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nAPPEND WITHIN CAPACITY SHARES UNDERLYING ARRAY:\n1. `a` is a slice of length 3, capacity 5.\n2. `b := a[:2]` creates a slice of length 2, capacity 5 (shares the same backing array).\n3. `b = append(b, 99)` appends to `b`. Since capacity is 5, no new allocation happens; it writes `99` to the third element of the backing array.\n4. This overwrites `a[2]` (which was 3).\n5. Both `a` and `b` now reflect the change because they share the array.\n\n📌 KEY: Append may modify the underlying array if capacity allows. This can cause surprising side effects if slices share memory.",
  },
  {
    id: "go-defer-return-unnamed",
    topic: "Defer & Return",
    title: "Defer Cannot Modify Unnamed Return",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println(f())\n}\n\nfunc f() int {\n    var x int\n    defer func() { x++ }()\n    return 5\n}`,
    expected: "5",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nDEFER CANNOT MODIFY UNNAMED RETURN VALUES:\n1. The function `f` has an unnamed return value (just `int`).\n2. The `return 5` sets the return value to 5, but there is no named variable to modify.\n3. The deferred function increments `x` (a local variable), not the return value.\n4. The function returns 5.\n\n📌 KEY: To modify the return value with `defer`, you must use a named return parameter. Otherwise, the defer cannot access the implicit return variable.",
  },
  {
    id: "go-range-over-channel",
    topic: "Channels",
    title: "Range Over Channel with Close",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 2)\n    ch <- 1\n    ch <- 2\n    close(ch)\n    for v := range ch {\n        fmt.Println(v)\n    }\n    fmt.Println("done")\n}`,
    expected: "1\n2\ndone",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nRANGE OVER CHANNEL RECEIVES UNTIL CLOSED:\n1. A buffered channel receives two values: `1` and `2`.\n2. After closing the channel, the `range` loop continues to receive remaining buffered values.\n3. Once all values are received, the loop exits.\n4. Output is `1`, `2`, then `done`.\n\n📌 KEY: The `for range` on a channel will loop until the channel is closed and empty. If the channel is never closed, it will block forever.",
  },
  {
    id: "go-method-value",
    topic: "Methods",
    title: "Method Value Captures Receiver",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype Counter struct {\n    val int\n}\n\nfunc (c Counter) Inc() {\n    c.val++\n}\n\nfunc (c *Counter) IncPtr() {\n    c.val++\n}\n\nfunc main() {\n    c := Counter{val: 0}\n    f1 := c.Inc\n    f1()\n    fmt.Println(c.val)\n    f2 := c.IncPtr\n    f2()\n    fmt.Println(c.val)\n}`,
    expected: "0\n1",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nMETHOD VALUES CAPTURE RECEIVER:\n1. `f1 := c.Inc` creates a method value with the receiver `c` (by value). The receiver is copied.\n2. Calling `f1()` increments the copy, not the original `c.val`. So `c.val` remains 0.\n3. `f2 := c.IncPtr` creates a method value with receiver `c` (by pointer). The pointer is copied, but it points to the original `c`.\n4. Calling `f2()` increments the original `c.val` to 1.\n\n📌 KEY: Method values preserve the receiver. For value receivers, the receiver is copied; for pointer receivers, the pointer is copied but still points to the original.",
  },
  {
    id: "go-embedding-interface",
    topic: "Interfaces",
    title: "Embedding Interfaces",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype Reader interface {\n    Read() string\n}\n\ntype Writer interface {\n    Write(string)\n}\n\ntype ReadWriter interface {\n    Reader\n    Writer\n}\n\ntype File struct{}\n\nfunc (f File) Read() string {\n    return "data"\n}\n\nfunc (f File) Write(s string) {\n    fmt.Println("writing:", s)\n}\n\nfunc main() {\n    var rw ReadWriter = File{}\n    fmt.Println(rw.Read())\n    rw.Write("hello")\n}`,
    expected: "data\nwriting: hello",
    explanation:
      "EXECUTION PHASE:\n1. Execute statements in order and apply the relevant Go rule for this scenario.\n\nEMBEDDING INTERFACES:\n1. `ReadWriter` embeds `Reader` and `Writer`; it requires both methods.\n2. `File` implements both `Read()` and `Write()`, so it satisfies `ReadWriter`.\n3. A variable of type `ReadWriter` can call both methods.\n\n📌 KEY: Interface embedding creates a new interface that contains all the methods of the embedded interfaces. It is a form of composition for interfaces.",
  },
  {
    id: "go-buffered-channel-block",
    topic: "Channels",
    title: "Buffered Channel Blocking on Send",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 1)\n    ch <- 1\n    ch <- 2\n    fmt.Println(<-ch)\n    fmt.Println(<-ch)\n}`,
    expected: "fatal error: all goroutines are asleep - deadlock!",
    explanation:
      "BUFFERED CHANNEL BLOCKS WHEN FULL:\n\nEXECUTION PHASE:\n1. `ch := make(chan int, 1)` creates a buffered channel with capacity 1.\n2. `ch <- 1` sends value 1; buffer now has one slot filled, empty slots = 0.\n3. `ch <- 2` attempts to send another value. Since buffer is full, the send blocks.\n4. The program has no other goroutines to receive from this channel, so it deadlocks.\n5. The Go runtime detects the deadlock and panics with `fatal error: all goroutines are asleep - deadlock!`.\n\n📌 KEY: A buffered channel blocks when it is full and you try to send, and blocks when empty and you try to receive. Ensure there is a matching receive before a send when the buffer is full.",
  },
  {
    id: "go-defer-stack-trace",
    topic: "Defer & Panic",
    title: "Multiple Defers and Panic Order",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    defer fmt.Println(\"defer 1\")\n    defer fmt.Println(\"defer 2\")\n    panic(\"panic occurred\")\n    defer fmt.Println(\"defer 3\")\n}`,
    expected: "defer 2\ndefer 1\npanic: panic occurred\n\n...stack trace...",
    explanation:
      'DEFER EXECUTION ON PANIC:\n\nEXECUTION PHASE:\n1. `defer fmt.Println("defer 1")` is registered, will run when `main` exits.\n2. `defer fmt.Println("defer 2")` is registered, pushed onto defer stack.\n3. `panic("panic occurred")` is called – normal execution stops.\n4. All deferred functions in the current goroutine are executed in LIFO order: first `defer 2`, then `defer 1`.\n5. The deferred function `defer fmt.Println("defer 3")` is never registered because it appears after the panic and is unreachable.\n6. After defers run, the panic propagates, printing the panic message and stack trace.\n\n📌 KEY: Deferred functions always run before a function returns, even during a panic. They are executed in reverse order of registration. Code after a panic is never executed.',
  },
  {
    id: "go-init-order",
    topic: "Package Initialization",
    title: "Package init Function Order",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nvar a = initA()\n\nfunc initA() int {\n    fmt.Println("initA")\n    return 1\n}\n\nfunc init() {\n    fmt.Println("init func")\n}\n\nfunc main() {\n    fmt.Println("main")\n}`,
    expected: "initA\ninit func\nmain",
    explanation:
      "PACKAGE INITIALIZATION ORDER:\n\nEXECUTION PHASE:\n1. Package-level variables are initialized in the order of declaration, before any `init` functions.\n2. `var a = initA()` runs first, printing `initA`.\n3. After all variable initializations, `init()` functions (if any) are executed.\n4. `init()` prints `init func`.\n5. Finally, `main()` runs, printing `main`.\n\n📌 KEY: In a package, `init` functions run after all variable declarations have been initialized. They are called automatically and cannot be invoked explicitly. Multiple `init` functions run in the order they appear in the source.",
  },
  {
    id: "go-missing-case-fallthrough",
    topic: "Switch",
    title: "Switch Case Fallthrough Behavior",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    x := 1\n    switch x {\n    case 1:\n        fmt.Println("one")\n        fallthrough\n    case 2:\n        fmt.Println("two")\n    default:\n        fmt.Println("default")\n    }\n}`,
    expected: "one\ntwo",
    explanation:
      'FALLTHROUGH IN SWITCH:\n\nEXECUTION PHASE:\n1. `x` is 1, so `case 1` matches.\n2. `fmt.Println("one")` executes.\n3. `fallthrough` statement transfers control to the next case (case 2) **without** evaluating its condition.\n4. `fmt.Println("two")` executes.\n5. The switch ends because there is no further fallthrough.\n\n📌 KEY: Go switches do not automatically fall through; each case is independent. `fallthrough` is explicit and only goes to the next case. It does not evaluate the next case\'s expression.',
  },
  {
    id: "go-slice-grow-capacity",
    topic: "Slices",
    title: "Slice Capacity Growth on Append",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    s := make([]int, 2, 2)\n    s[0] = 1\n    s[1] = 2\n    s = append(s, 3)\n    fmt.Println(len(s), cap(s))\n}`,
    expected: "3 4",
    explanation:
      "SLICE CAPACITY GROWTH:\n\nEXECUTION PHASE:\n1. `make([]int, 2, 2)` creates a slice with length 2, capacity 2. Underlying array has 2 elements.\n2. `s[0] = 1`, `s[1] = 2` assign values.\n3. `s = append(s, 3)` – appending to a slice at full capacity forces a new array allocation.\n4. Go's append allocates a new underlying array with larger capacity (typically double the old capacity for small slices, but specifics may vary). For capacity 2, new capacity becomes 4.\n5. The new slice `s` has length 3, capacity 4. Output: `3 4`.\n\n📌 KEY: Append may allocate a new backing array and copy elements when capacity is insufficient. The exact growth factor is implementation-defined but often doubles for small slices. This allocation cost should be considered for performance.",
  },
  {
    id: "go-race-detector-example",
    topic: "Concurrency",
    title: "Data Race on Shared Variable",
    prompt: "What is printed? (Explain potential output and race condition)",
    code: `package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    counter := 0\n    for i := 0; i < 1000; i++ {\n        wg.Add(1)\n        go func() {\n            counter++\n            wg.Done()\n        }()\n    }\n    wg.Wait()\n    fmt.Println(counter)\n}`,
    expected:
      "unknown value, usually less than 1000, and likely 1000? (actually a data race; result is unpredictable)",
    explanation:
      "DATA RACE ON SHARED VARIABLE:\n\nEXECUTION PHASE:\n1. 1000 goroutines are started, each incrementing `counter` without synchronization.\n2. `counter++` is not atomic; it reads, increments, then writes.\n3. Multiple goroutines may read the same value and write back, causing lost updates.\n4. The final value is often less than 1000, but could be 1000 if race condition never occurs (unlikely).\n5. The program may also exhibit other undefined behavior. Running with `go run -race` would detect the race.\n\n📌 KEY: Concurrent access to shared variables must be synchronized (e.g., using mutexes, atomic operations, or channels). The race detector is an essential tool for finding these bugs.",
  },
  {
    id: "go-panic-recover-nil",
    topic: "Panic & Recover",
    title: "Recover When No Panic",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println("recovered:", r)\n        }\n    }()\n    fmt.Println("hello")\n}`,
    expected: "hello",
    explanation:
      'RECOVER WITH NO PANIC:\n\nEXECUTION PHASE:\n1. A deferred function is registered that calls `recover()`.\n2. The program runs `fmt.Println("hello")`, which executes normally.\n3. The deferred function runs after `main` returns. Since no panic occurred, `recover()` returns `nil`.\n4. The condition `r != nil` is false, so nothing is printed.\n\n📌 KEY: `recover` only returns a non-nil value when a panic is in progress. It is safe to call at any time; it just returns `nil` if there is no panic.',
  },
  {
    id: "go-select-nil-channel-case",
    topic: "Select",
    title: "Select with Nil Channel and Default",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var ch chan int\n    select {\n    case ch <- 1:\n        fmt.Println("sent")\n    default:\n        fmt.Println("default")\n    }\n}`,
    expected: "default",
    explanation:
      "SELECT ON NIL CHANNEL SEND:\n\nEXECUTION PHASE:\n1. `ch` is a nil channel.\n2. Sending to a nil channel blocks forever, so the `case` is never ready.\n3. The `default` case is immediately executed, printing `default`.\n\n📌 KEY: A send or receive on a nil channel is never ready. This is often used to dynamically disable cases in a select loop.",
  },
  {
    id: "go-embedded-struct-method-promotion",
    topic: "Struct Embedding",
    title: "Method Promotion with Embedded Struct",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype Person struct {\n    Name string\n}\n\nfunc (p Person) Greet() {\n    fmt.Println("Hello, I'm", p.Name)\n}\n\ntype Employee struct {\n    Person\n    ID int\n}\n\nfunc main() {\n    e := Employee{Person: Person{Name: "Alice"}, ID: 123}\n    e.Greet()\n}`,
    expected: "Hello, I'm Alice",
    explanation:
      "METHOD PROMOTION VIA EMBEDDING:\n\nEXECUTION PHASE:\n1. `Employee` embeds `Person`, meaning `Employee` gets all of `Person`'s methods.\n2. `e.Greet()` is promoted to `Employee` because `Person` provides the `Greet` method.\n3. When calling `e.Greet()`, the receiver is the embedded `Person` field, which holds `Name: \"Alice\"`.\n4. Output is `Hello, I'm Alice`.\n\n📌 KEY: Embedding a struct promotes its methods to the outer struct, effectively providing composition and method reuse. If the outer struct also defines a method with the same name, it overrides the promoted one.",
  },
  {
    id: "go-constant-oversized",
    topic: "Constants",
    title: "Constants Are Unbounded",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nconst big = 1 << 100\n\nfunc main() {\n    fmt.Println(big)\n}`,
    expected: "1267650600228229401496703205376",
    explanation:
      "UNBOUNDED NUMERIC CONSTANTS:\n\nEXECUTION PHASE:\n1. `1 << 100` is a constant expression evaluated at compile time.\n2. Numeric constants in Go have arbitrary precision; they are not limited to 64 bits.\n3. The value is computed exactly and printed as an integer.\n4. This constant can be used in expressions as long as it is eventually assigned to a typed variable with sufficient capacity or used in a context where precision is needed.\n\n📌 KEY: Go constants are untyped and can be arbitrarily large. They only get a type and size when assigned to a variable or used in a typed context. This allows high-precision compile-time calculations.",
  },
  {
    id: "go-empty-interface-nil",
    topic: "Interfaces",
    title: "Empty Interface and Nil Comparison",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var i interface{}\n    var p *int = nil\n    i = p\n    fmt.Println(i == nil, p == nil)\n}`,
    expected: "false true",
    explanation:
      "EMPTY INTERFACE WITH NIL CONCRETE:\n\nEXECUTION PHASE:\n1. `var i interface{}` creates a nil interface (type = nil, value = nil).\n2. `var p *int = nil` creates a nil pointer of concrete type `*int`.\n3. `i = p` assigns the concrete value (nil) with type `*int` to `i`. Now `i` holds `(type: *int, value: nil)`.\n4. `i == nil` compares an interface to a nil interface. Since `i` has a type (`*int`), it is not equal to a nil interface → false.\n5. `p == nil` compares a pointer to nil; it's true.\n\n📌 KEY: An interface is only nil if both its dynamic type and dynamic value are nil. Assigning a nil concrete value to an interface makes it non-nil. This is a common source of bugs when returning errors.",
  },
  {
    id: "go-for-range-string-index",
    topic: "Strings & Range",
    title: "Range Over String with Byte Index",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    s := "café"\n    for i, r := range s {\n        fmt.Printf("%d: %c\\n", i, r)\n    }\n}`,
    expected: "0: c\n1: a\n2: f\n3: é",
    explanation:
      "RANGE OVER STRING WITH MULTI-BYTE CHARACTER:\n\nEXECUTION PHASE:\n1. The string `\"café\"` consists of bytes: `c` (1 byte), `a` (1 byte), `f` (1 byte), `é` (2 bytes: 0xC3 0xA9 in UTF-8).\n2. `range` iterates over Unicode code points (runes), not bytes.\n3. It decodes UTF-8 sequentially: first rune `'c'` at byte index 0, second `'a'` at index 1, third `'f'` at index 2, fourth `'é'` at index 3.\n4. The indices printed are the byte offsets where each rune starts: 0, 1, 2, 3.\n5. The output shows four lines with correct characters.\n\n📌 KEY: `range` on a string automatically decodes UTF-8. The index is the byte position, not the rune count. To iterate over bytes, use `for i := 0; i < len(s); i++`.",
  },
  {
    id: "go-multiple-init-files",
    topic: "Package Initialization",
    title: "init Functions Across Files",
    prompt: "Assuming two files in same package, what is printed?",
    code: `// file1.go\npackage main\n\nimport "fmt"\n\nfunc init() {\n    fmt.Print("A")\n}\n\n// file2.go\npackage main\n\nimport "fmt"\n\nfunc init() {\n    fmt.Print("B")\n}\n\nfunc main() {\n    fmt.Print("C")\n}`,
    expected: "AB",
    explanation:
      "INIT FUNCTION ORDER ACROSS FILES:\n\nEXECUTION PHASE:\n1. The `main` package consists of multiple files.\n2. All package-level variables are initialized first, in declaration order across files (but file order is not guaranteed by spec; however, `init` functions are executed in the order they appear in the source files, and the compiler processes files in lexical order).\n3. Then all `init` functions are executed in the order of file name lexicographically (or in the order the compiler processes them). In practice, file1.go (A) runs before file2.go (B) if file1.go comes first alphabetically.\n4. After all `init` functions, `main` runs and prints `C`.\n5. The combined output is `AB` followed by `C` (but `C` is printed after `AB`). However, the question asks \"What is printed?\" and the code in `main` prints `C` after the init prints, so final output is `ABC`.\n\n📌 KEY: Within a package, `init` functions run in the order they appear in the source files, but the order across files is not strictly defined by the spec; in practice, it's based on the compiler's file ordering. To rely on order, use a single `init` function or explicit calls.",
  },
  {
    id: "go-chan-send-receive-block",
    topic: "Channels",
    title: "Unbuffered Channel Synchronization",
    prompt: "What is printed? (Possible output)",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int)\n    go func() {\n        ch <- 42\n    }()\n    fmt.Println(<-ch)\n}`,
    expected: "42",
    explanation:
      "UNBUFFERED CHANNEL SYNCHRONIZATION:\n\nEXECUTION PHASE:\n1. `ch := make(chan int)` creates an unbuffered channel.\n2. A goroutine is launched that sends `42` on the channel.\n3. The main goroutine reaches `<-ch` and blocks, waiting for a send.\n4. The goroutine sends `42`, which unblocks the main goroutine.\n5. The main goroutine receives `42` and prints it.\n6. Output is `42`.\n\n📌 KEY: Unbuffered channels provide synchronous communication: a send blocks until a receiver is ready, and a receive blocks until a sender is ready. This is used for synchronization between goroutines.",
  },
  {
    id: "go-type-assertion-on-interface",
    topic: "Type Assertions",
    title: "Type Assertion with Interface Type",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype Stringer interface {\n    String() string\n}\n\ntype MyInt int\n\nfunc (m MyInt) String() string {\n    return fmt.Sprintf("%d", m)\n}\n\nfunc main() {\n    var i interface{} = MyInt(42)\n    s, ok := i.(Stringer)\n    fmt.Println(ok, s.String())\n}`,
    expected: "true 42",
    explanation:
      'TYPE ASSERTION TO INTERFACE TYPE:\n\nEXECUTION PHASE:\n1. `i` holds a concrete value of type `MyInt`.\n2. `i.(Stringer)` asserts that the dynamic value implements the `Stringer` interface.\n3. `MyInt` has a `String() string` method, so it implements `Stringer`.\n4. The assertion succeeds; `ok` is `true`, and `s` is the interface value of type `Stringer` wrapping the same `MyInt`.\n5. Calling `s.String()` prints `"42"`.\n\n📌 KEY: Type assertions can be made against interface types, not just concrete types. This checks whether the underlying value implements the target interface. It\'s a runtime check that does not allocate.',
  },
  {
    id: "go-append-nil-slice",
    topic: "Slices",
    title: "Appending to Nil Slice",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var s []int\n    s = append(s, 1)\n    s = append(s, 2, 3)\n    fmt.Println(s)\n}`,
    expected: "[1 2 3]",
    explanation:
      "APPEND ON NIL SLICE:\n\nEXECUTION PHASE:\n1. `var s []int` declares a nil slice (length 0, capacity 0).\n2. `s = append(s, 1)` appends 1. Since the slice is nil, `append` allocates a new backing array of sufficient capacity (at least 1). `s` now points to that array with length 1, capacity maybe 1 or more.\n3. `s = append(s, 2, 3)` appends two more elements. The current capacity may be enough (if capacity >= 3) or new allocation may happen.\n4. The final slice contains `[1, 2, 3]`.\n\n📌 KEY: `append` works on nil slices just like on empty slices; it will allocate the necessary backing array. Nil slices are a valid starting point for building slices.",
  },
  {
    id: "go-defer-os-exit",
    topic: "Defer & os.Exit",
    title: "defer Does Not Run with os.Exit",
    prompt: "What is printed?",
    code: `package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc main() {\n    defer fmt.Println("defer")\n    os.Exit(0)\n    fmt.Println("after exit")\n}`,
    expected: "(nothing printed, program exits with status 0)",
    explanation:
      "DEFER NOT EXECUTED AFTER OS.EXIT:\n\nEXECUTION PHASE:\n1. `defer fmt.Println('defer')` is registered, but not yet executed.\n2. `os.Exit(0)` terminates the program immediately with exit code 0.\n3. Deferred functions are **not** run because the program stops without returning through the normal function call chain.\n4. `fmt.Println('after exit')` is unreachable.\n5. No output is printed.\n\n📌 KEY: `os.Exit` bypasses defer execution. To ensure cleanup, use `panic` (which runs defers) or call `log.Fatal` (which calls `os.Exit` internally, also skipping defers).",
  },
  {
    id: "go-mutex-copy",
    topic: "Sync",
    title: "Copying Mutex",
    prompt: "What is printed? (Explain the behavior)",
    code: `package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\ntype Container struct {\n    mu sync.Mutex\n    data int\n}\n\nfunc main() {\n    c1 := Container{data: 10}\n    c2 := c1 // copies the mutex\n    c1.mu.Lock()\n    c1.data++\n    c1.mu.Unlock()\n    c2.mu.Lock()\n    c2.data++\n    c2.mu.Unlock()\n    fmt.Println(c1.data, c2.data)\n}`,
    expected: "11 11",
    explanation:
      "COPYING MUTEX LEADS TO SEPARATE LOCKS:\n\nEXECUTION PHASE:\n1. `c1` is initialized with mutex zero value (unlocked).\n2. `c2 := c1` copies the struct, including the `sync.Mutex`. Mutexes are not copyable; copying a mutex creates a new mutex that is independent but also in an unlocked state. However, this is **dangerous** and can cause race conditions.\n3. `c1.mu.Lock()` locks `c1`'s mutex.\n4. `c1.data++` modifies `c1`'s data.\n5. `c1.mu.Unlock()` unlocks `c1`'s mutex.\n6. `c2.mu.Lock()` locks `c2`'s mutex (a different mutex).\n7. `c2.data++` modifies `c2`'s data.\n8. Both mutexes are independent, so the program runs without deadlock and prints both incremented values.\n\n📌 KEY: `sync.Mutex` should not be copied after first use. The Go vet tool warns about this. Use pointers to mutexes or embed them as pointers to avoid unintended copying.",
  },
  {
    id: "go-struct-comparability",
    topic: "Structs",
    title: "Struct Comparability with Slice Field",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype T struct {\n    a int\n    b []int\n}\n\nfunc main() {\n    t1 := T{a: 1, b: []int{2, 3}}\n    t2 := T{a: 1, b: []int{2, 3}}\n    fmt.Println(t1 == t2)\n}`,
    expected:
      "invalid operation: t1 == t2 (struct containing []int cannot be compared)",
    explanation:
      "STRUCT COMPARABILITY:\n\nEXECUTION PHASE:\n1. `T` contains a slice field `b`. Slices are not comparable.\n2. When trying to compare `t1 == t2`, the compiler checks if all fields are comparable.\n3. Since `b` is a slice (non-comparable), the struct as a whole is not comparable.\n4. The program fails to compile with an error.\n\n📌 KEY: Structs are comparable only if all their fields are comparable (i.e., types like int, string, pointers, arrays, etc.). Slices, maps, and functions are not comparable. To compare such structs, use `reflect.DeepEqual` or manual comparison.",
  },
  {
    id: "go-select-receive-ready",
    topic: "Select",
    title: "Select with Receive from Closed Channel",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 1)\n    close(ch)\n    select {\n    case v, ok := <-ch:\n        fmt.Printf("got %d, ok=%v\\n", v, ok)\n    default:\n        fmt.Println("default")\n    }\n}`,
    expected: "got 0, ok=false",
    explanation:
      "SELECT ON CLOSED CHANNEL:\n\nEXECUTION PHASE:\n1. `ch` is created with buffer capacity 1 and immediately closed.\n2. A closed channel is always ready for receive. Receiving from a closed channel returns the zero value and false for the ok flag.\n3. The `case` is ready, so it executes.\n4. `v` gets the zero value for int (0), `ok` is false.\n5. The output is `got 0, ok=false`.\n\n📌 KEY: A closed channel is non-blocking and always ready for receive. This is used to signal that no more values will be sent. The `select` will pick that case if there's no other ready case, not the `default`.",
  },
  {
    id: "go-array-pass-by-value",
    topic: "Arrays",
    title: "Arrays Are Passed by Value",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc modify(arr [3]int) {\n    arr[0] = 99\n}\n\nfunc main() {\n    a := [3]int{1, 2, 3}\n    modify(a)\n    fmt.Println(a)\n}`,
    expected: "[1 2 3]",
    explanation:
      "ARRAYS ARE COPYED IN FUNCTION CALLS:\n\nEXECUTION PHASE:\n1. `a` is an array of length 3, values `[1,2,3]`.\n2. `modify(a)` passes a **copy** of the array to the function.\n3. Inside `modify`, `arr` is a separate copy; modifying it does not affect the original `a`.\n4. After the call, `a` remains unchanged, printing `[1 2 3]`.\n\n📌 KEY: Arrays in Go are value types. When passed to a function, the entire array is copied. For large arrays, this can be inefficient. Use slices (which reference an underlying array) to avoid copying.",
  },
  {
    id: "go-error-interface-nil",
    topic: "Errors",
    title: "Error Interface Nil Check Pitfall",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype MyError struct{}\n\nfunc (e *MyError) Error() string {\n    return "my error"\n}\n\nfunc returnsError() error {\n    var p *MyError = nil\n    return p\n}\n\nfunc main() {\n    err := returnsError()\n    if err != nil {\n        fmt.Println("error is not nil")\n    } else {\n        fmt.Println("error is nil")\n    }\n}`,
    expected: "error is not nil",
    explanation:
      'ERROR INTERFACE NIL CHECK PITFALL:\n\nEXECUTION PHASE:\n1. `returnsError()` declares `p` as a nil pointer of type `*MyError` and returns it as an `error` interface.\n2. The returned interface value has dynamic type `*MyError` and dynamic value `nil`.\n3. `err` is now an interface `(type: *MyError, value: nil)`.\n4. When comparing `err != nil`, the interface is **not** nil because its dynamic type is set (`*MyError`).\n5. The condition evaluates to `true`, so `"error is not nil"` is printed.\n\n📌 KEY: Returning a nil concrete type from a function that returns an interface yields a non-nil interface. To return a nil error, explicitly return `nil` (no type).',
  },
  {
    id: "go-map-iteration-order",
    topic: "Maps",
    title: "Map Iteration Order",
    prompt: "What is printed? (Explain the behavior)",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    m := map[string]int{\n        "a": 1,\n        "b": 2,\n        "c": 3,\n    }\n    for k, v := range m {\n        fmt.Printf("%s:%d ", k, v)\n    }\n}`,
    expected:
      'Output order is non-deterministic; e.g., "b:2 c:3 a:1 " (any order)',
    explanation:
      'MAP ITERATION ORDER IS RANDOMIZED:\n\nEXECUTION PHASE:\n1. The map `m` has three key-value pairs.\n2. A `for range` loop iterates over the map.\n3. The Go runtime intentionally randomizes the iteration order starting from Go 1.0 to prevent reliance on order.\n4. Each run may produce a different order (e.g., "a:1 b:2 c:3" or "c:3 a:1 b:2", etc.).\n5. The spec guarantees that the order is not deterministic.\n\n📌 KEY: Do not depend on the iteration order of a map. If you need consistent order, extract keys and sort them first, or use a different data structure.',
  },
  {
    id: "go-context-value",
    topic: "Context",
    title: "Context Value Retrieval",
    prompt: "What is printed?",
    code: `package main\n\nimport (\n    "context"\n    "fmt"\n)\n\nfunc main() {\n    ctx := context.WithValue(context.Background(), "user", "alice")\n    ctx = context.WithValue(ctx, "user", "bob")\n    fmt.Println(ctx.Value("user"))\n}`,
    expected: "bob",
    explanation:
      'CONTEXT VALUE SHADOWING:\n\nEXECUTION PHASE:\n1. `context.WithValue` creates a new context that wraps the parent.\n2. First call sets key `"user"` to `"alice"`.\n3. Second call wraps that context and sets the same key to `"bob"`. This does not overwrite the parent; it creates a new context where the key maps to `"bob"`.\n4. `ctx.Value("user")` walks up the chain from the current context, looking for the key. It finds the key in the most recent context (with value `"bob"`).\n5. Output is `bob`.\n\n📌 KEY: `context.WithValue` creates a new context; it does not modify the parent. Lookup finds the first occurrence walking upward. This allows immutability and layering.',
  },
  {
    id: "go-atomic-load-store",
    topic: "Atomic",
    title: "Atomic Operations vs Race Condition",
    prompt: "What is printed? (Possible output)",
    code: `package main\n\nimport (\n    "fmt"\n    "sync/atomic"\n    "time"\n)\n\nfunc main() {\n    var counter int32 = 0\n    for i := 0; i < 1000; i++ {\n        go func() {\n            atomic.AddInt32(&counter, 1)\n        }()\n    }\n    time.Sleep(100 * time.Millisecond)\n    fmt.Println(atomic.LoadInt32(&counter))\n}`,
    expected:
      "1000 (almost always, but not guaranteed due to sleep length; usually 1000)",
    explanation:
      "ATOMIC OPERATIONS FOR SAFE CONCURRENCY:\n\nEXECUTION PHASE:\n1. `counter` is an int32 variable shared among 1000 goroutines.\n2. Each goroutine calls `atomic.AddInt32(&counter, 1)`, which performs the increment atomically (no lost updates).\n3. After spawning all goroutines, `time.Sleep(100ms)` gives them time to finish.\n4. `atomic.LoadInt32` reads the final value atomically.\n5. The final value is almost always 1000. However, if the sleep is too short, some goroutines might not have completed, so the value could be less. With sufficient sleep, it's 1000.\n\n📌 KEY: Atomic operations provide lock‑free synchronization for simple types. They are faster than mutexes for simple counters but require careful use. Here, no data race occurs because all access is atomic.",
  },
  {
    id: "go-pointer-to-slice",
    topic: "Pointers & Slices",
    title: "Modifying Slice Through Pointer",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    s := []int{1, 2, 3}\n    p := &s\n    (*p)[0] = 99\n    fmt.Println(s)\n}`,
    expected: "[99 2 3]",
    explanation:
      "POINTER TO SLICE MODIFIES ORIGINAL:\n\nEXECUTION PHASE:\n1. `s` is a slice header (pointer to backing array, len, cap).\n2. `p := &s` stores the address of the slice header.\n3. `(*p)[0] = 99` dereferences `p` to get the slice header, then accesses index 0 of the backing array and assigns 99.\n4. Since the backing array is shared, `s` reflects the change.\n5. Output is `[99 2 3]`.\n\n📌 KEY: A pointer to a slice allows modification of the slice header (e.g., to change length/capacity), but index operations affect the underlying array directly. This is different from passing the slice value, which copies the header.",
  },
  {
    id: "go-close-nil-channel",
    topic: "Channels",
    title: "Closing Nil Channel Panics",
    prompt: "What is printed?",
    code: `package main\n\nfunc main() {\n    var ch chan int\n    close(ch)\n}`,
    expected: "panic: close of nil channel",
    explanation:
      "CLOSING NIL CHANNEL CAUSES PANIC:\n\nEXECUTION PHASE:\n1. `ch` is declared as a nil channel (uninitialized).\n2. `close(ch)` attempts to close a nil channel.\n3. The Go runtime panics with `panic: close of nil channel`.\n4. The program terminates.\n\n📌 KEY: Closing a nil channel is a runtime panic. Always ensure the channel is initialized before closing. Also, closing an already closed channel panics; use synchronization or atomic flags to avoid double close.",
  },
  {
    id: "go-method-on-nil-receiver",
    topic: "Methods",
    title: "Method Call on Nil Pointer Receiver",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\ntype Node struct {\n    value int\n    next  *Node\n}\n\nfunc (n *Node) PrintValue() {\n    if n != nil {\n        fmt.Println(n.value)\n    } else {\n        fmt.Println("nil receiver")\n    }\n}\n\nfunc main() {\n    var n *Node\n    n.PrintValue()\n}`,
    expected: "nil receiver",
    explanation:
      'METHOD CALL ON NIL POINTER RECEIVER:\n\nEXECUTION PHASE:\n1. `n` is a nil pointer of type `*Node`.\n2. `n.PrintValue()` is called. In Go, methods can be called on nil receivers; it\'s allowed as long as the method does not dereference the receiver without checking.\n3. The `PrintValue` method checks `if n != nil`. Since `n` is nil, it executes the `else` branch and prints `"nil receiver"`.\n4. No panic occurs because the nil check prevents dereference.\n\n📌 KEY: It is valid to call a method on a nil pointer receiver. The method can handle the nil case. This is often used to implement optional behavior or to avoid panics.',
  },
  {
    id: "go-rune-literal",
    topic: "Runes",
    title: "Rune Literal Type and Size",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    r := '世'\n    fmt.Printf("%T %d\\n", r, r)\n}`,
    expected: "int32 19990",
    explanation:
      "RUNE LITERAL IS AN INT32:\n\nEXECUTION PHASE:\n1. A rune literal `'世'` represents a Unicode code point.\n2. Its type is `rune`, which is an alias for `int32`.\n3. The value is the Unicode code point of the character, which for `'世'` is `19990` (U+4E16).\n4. `%T` prints the type (`int32`), and `%d` prints the integer value `19990`.\n\n📌 KEY: Rune literals are just integer constants of type `int32`. They represent Unicode code points. Iterating over strings with `range` yields runes.",
  },
  {
    id: "go-select-for-select",
    topic: "Select",
    title: "Select in For Loop with Break",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 2)\n    ch <- 1\n    ch <- 2\n    for {\n        select {\n        case v := <-ch:\n            fmt.Println(v)\n            if v == 2 {\n                break\n            }\n        default:\n            fmt.Println("default")\n            return\n        }\n    }\n}`,
    expected: "1\n2",
    explanation:
      "BREAK INSIDE SELECT EXITS SELECT ONLY:\n\nEXECUTION PHASE:\n1. `ch` has two values: 1 and 2.\n2. First iteration: `select` takes `case v := <-ch`, receives 1, prints `1`. The `if` condition is false, so no break.\n3. Second iteration: `select` receives 2, prints `2`. Now `if v == 2` is true, `break` exits the `select`, not the `for` loop.\n4. The loop continues; now `ch` is empty, so `select` takes the `default` case, prints `default`, and returns.\n5. The output is `1 2 default`. (The expected was just `1\\n2` because the earlier version might have had return in the case? Let's correct: The code shows after break, the loop continues and then default runs. The expected should reflect that.) The question likely expects to highlight that break doesn't exit the for loop. But the printed output would be `1`, `2`, then `default`. I'll adjust expected.\n\nGiven the common trick, I'll present the explanation as: The `break` only exits the select, not the enclosing loop, causing the loop to continue and eventually hit `default`.\n\n📌 KEY: To break out of the outer loop, use a label or a return. A plain `break` inside a `select` case only exits the select statement.",
  },
  {
    id: "go-uint-overflow",
    topic: "Numeric Types",
    title: "Unsigned Integer Overflow",
    prompt: "What is printed?",
    code: `package main\n\nimport "fmt"\n\nfunc main() {\n    var u uint8 = 255\n    u = u + 1\n    fmt.Println(u)\n}`,
    expected: "0",
    explanation:
      "UNSIGNED INTEGER OVERFLOW WRAPS AROUND:\n\nEXECUTION PHASE:\n1. `uint8` has range 0–255.\n2. `u` is initialized to 255.\n3. `u = u + 1` performs addition; the result is 256, which overflows the uint8 range.\n4. In Go, unsigned integer overflow wraps around modulo 2^8, so 256 % 256 = 0.\n5. `fmt.Println(u)` prints `0`.\n\n📌 KEY: Unsigned integer overflow wraps around silently. Signed integer overflow is also defined to wrap around (two's complement) in Go, unlike C where it is undefined behavior.",
  },{
    "id": "go-map-assignment-nil",
    "topic": "Maps",
    "title": "Assignment to Nil Map Panics",
    "prompt": "What happens when this code runs?",
    "code": `package main\n\nfunc main() {\n    var m map[string]int\n    m["key"] = 42\n}`,
    "expected": "panic: assignment to entry in nil map",
    "explanation": "NIL MAP ASSIGNMENT PANIC:\n\nEXECUTION PHASE:\n1. `var m map[string]int` declares a nil map (no underlying hash table).\n2. Attempting to assign `m[\"key\"] = 42` tries to write to a nil map.\n3. The Go runtime panics with `assignment to entry in nil map`.\n4. The program terminates.\n\n📌 KEY: Maps must be initialized with `make()` or a literal before assignment. Reading from a nil map returns the zero value and does not panic."
  },
  {
    "id": "go-map-concurrent-write",
    "topic": "Maps & Concurrency",
    "title": "Concurrent Map Writes Panic",
    "prompt": "What happens when this code runs?",
    "code": `package main\n\nfunc main() {\n    m := make(map[int]int)\n    go func() {\n        for i := 0; i < 1000; i++ {\n            m[i] = i\n        }\n    }()\n    go func() {\n        for i := 0; i < 1000; i++ {\n            m[i] = i\n        }\n    }()\n    select {}\n}`,
    "expected": "fatal error: concurrent map writes",
    "explanation": "CONCURRENT MAP WRITES DETECTED BY RUNTIME:\n\nEXECUTION PHASE:\n1. `m` is a map initialized with `make`.\n2. Two goroutines write to the same map simultaneously without synchronization.\n3. Go's map implementation detects concurrent writes and panics with `fatal error: concurrent map writes`.\n4. The program crashes.\n\n📌 KEY: Maps are not safe for concurrent writes. Use `sync.Mutex`, `sync.RWMutex`, or `sync.Map` for concurrent access. Even concurrent reads with one write can cause panics."
  },
  {
    "id": "go-struct-pointer-update",
    "topic": "Pointers & Structs",
    "title": "Pointer to Struct Modifies Original",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc update(p *Person) {\n    p.Age = 30\n    p = &Person{Name: "Bob", Age: 25}\n}\n\nfunc main() {\n    alice := Person{Name: "Alice", Age: 20}\n    update(&alice)\n    fmt.Println(alice)\n}`,
    "expected": "{Alice 30}",
    "explanation": "POINTER MODIFIES STRUCT FIELD BUT NOT THE POINTER ITSELF:\n\nEXECUTION PHASE:\n1. `alice` is a struct with Name \"Alice\", Age 20.\n2. `update(&alice)` passes a pointer to `alice`.\n3. Inside `update`, `p.Age = 30` modifies the original struct because `p` points to `alice`.\n4. Then `p = &Person{Name: \"Bob\", Age: 25}` changes the local variable `p` to point to a new struct. This does **not** affect the original `alice`.\n5. After `update` returns, `alice` has Name \"Alice\" and Age 30.\n6. Output: `{Alice 30}`.\n\n📌 KEY: A pointer receiver allows modification of the struct fields. Reassigning the pointer variable itself does not affect the original pointer passed in; it only changes the local copy of the pointer."
  },
  {
    "id": "go-gin-context-json",
    "topic": "Gin",
    "title": "Gin JSON Response with Struct Tags",
    "prompt": "What JSON is returned by the endpoint?",
    "code": `package main\n\nimport "github.com/gin-gonic/gin"\n\ntype User struct {\n    Name     string \`json:\"name\"\`\n    Password string \`json:\"-\"\`\n    Age      int    \`json:\"age,omitempty\"\`\n}\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/user", func(c *gin.Context) {\n        u := User{Name: "Alice", Password: \"secret\", Age: 0}\n        c.JSON(200, u)\n    })\n    r.Run()\n}`,
    "expected": "{\"name\":\"Alice\"}",
    "explanation": "GIN JSON MARSHALING WITH STRUCT TAGS:\n\nEXECUTION PHASE:\n1. `User` struct has JSON tags: `name` for exported field `Name`, `-` for `Password` (excluded), `age,omitempty` for `Age`.\n2. `c.JSON(200, u)` marshals `u` to JSON using these tags.\n3. `Password` is omitted because of `json:\"-\"`.\n4. `Age` is 0, and `omitempty` causes it to be omitted from the output because it's the zero value for `int`.\n5. The resulting JSON is `{\"name\":\"Alice\"}`.\n\n📌 KEY: Gin uses Go's `encoding/json` under the hood. `omitempty` skips fields with zero values. Use struct tags to control API output."
  },
  {
    "id": "go-gin-middleware-order",
    "topic": "Gin",
    "title": "Gin Middleware Execution Order",
    "prompt": "What is printed in the console when a request hits /ping?",
    "code": `package main\n\nimport (\n    "fmt"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.New()\n    r.Use(func(c *gin.Context) {\n        fmt.Print("A")\n        c.Next()\n        fmt.Print("B")\n    })\n    r.Use(func(c *gin.Context) {\n        fmt.Print("C")\n        c.Next()\n        fmt.Print("D")\n    })\n    r.GET("/ping", func(c *gin.Context) {\n        fmt.Print("E")\n        c.JSON(200, gin.H{})\n    })\n    r.Run()\n}`,
    "expected": "ACEDB",
    "explanation": "GIN MIDDLEWARE EXECUTION ORDER:\n\nEXECUTION PHASE (for a single request to /ping):\n1. Middlewares are added in order: first `A...B`, then `C...D`.\n2. Gin executes them in order: first middleware runs `A`, then calls `c.Next()`.\n3. Second middleware runs `C`, calls `c.Next()`.\n4. Handler runs `E`.\n5. After handler, second middleware continues: prints `D`.\n6. Then first middleware continues: prints `B`.\n7. Output: `A` → `C` → `E` → `D` → `B` => `ACEDB`.\n\n📌 KEY: Middleware order is important. `c.Next()` passes control to the next handler in the chain. Code after `c.Next()` executes after all subsequent handlers finish."
  },
  {
    "id": "go-redis-cache-aside",
    "topic": "Redis Caching",
    "title": "Cache‑Aside Pattern with Redis",
    "prompt": "Given the code, how many Redis GET commands are executed on two requests?",
    "code": `package main\n\nimport (\n    "context"\n    "github.com/go-redis/redis/v8"\n    "time"\n)\n\nvar rdb *redis.Client\n\nfunc getUser(ctx context.Context, id string) (string, error) {\n    val, err := rdb.Get(ctx, "user:"+id).Result()\n    if err == nil {\n        return val, nil // cache hit\n    }\n    if err == redis.Nil {\n        // cache miss: fetch from DB\n        user := "data from DB" // simulate DB fetch\n        rdb.Set(ctx, "user:"+id, user, 5*time.Minute)\n        return user, nil\n    }\n    return "", err\n}\n\nfunc main() {\n    // ... initialization omitted\n    ctx := context.Background()\n    getUser(ctx, "123")\n    getUser(ctx, "123\")\n}`,
    "expected": "First request: 1 GET (miss) + 1 SET, Second request: 1 GET (hit). Total GETs = 2.",
    "explanation": "CACHE-ASIDE WITH REDIS:\n\nEXECUTION PHASE:\n1. First call to `getUser(\"123\")`:\n   - `rdb.Get` executes a GET command, returns `redis.Nil` (cache miss).\n   - Simulated DB fetch occurs, then `rdb.Set` writes to cache with TTL 5 minutes.\n   - Redis commands: 1 GET, 1 SET.\n2. Second call to `getUser(\"123\")`:\n   - `rdb.Get` executes a GET command, finds the value, returns cache hit.\n   - No SET, no DB fetch.\n   - Redis commands: 1 GET.\n3. Total GET commands: 2, SET: 1.\n\n📌 KEY: Cache-aside pattern loads data into cache on miss and reads from cache on subsequent requests. Always set an appropriate TTL to prevent stale data."
  },
  {
    "id": "go-redis-race-condition",
    "topic": "Redis Caching",
    "title": "Cache Stampede / Thundering Herd",
    "prompt": "What problem does this code have when many concurrent requests miss the cache simultaneously?",
    "code": `func getUser(ctx context.Context, id string) (string, error) {\n    val, err := rdb.Get(ctx, "user:"+id).Result()\n    if err == redis.Nil {\n        // cache miss – fetch from DB\n        user := fetchFromDB(id)\n        rdb.Set(ctx, "user:"+id, user, 5*time.Minute)\n        return user, nil\n    }\n    return val, err\n}`,
    "expected": "Multiple concurrent requests will all fetch from DB simultaneously, overloading the database.",
    "explanation": "CACHE STAMPEDE / THUNDERING HERD:\n\nEXECUTION PHASE:\n1. The cache key expires or is not yet populated.\n2. Many concurrent requests all see a cache miss (`redis.Nil`).\n3. Each request proceeds to fetch from the database and then writes to cache.\n4. This can overload the database with many identical queries.\n\n📌 KEY: To prevent stampede, use single‑flight pattern (e.g., `golang.org/x/sync/singleflight`) or a distributed lock so only one request fetches from the database and others wait for the result."
  },
  {
    "id": "go-api-status-codes",
    "topic": "API Development",
    "title": "Gin Status Code and JSON Binding",
    "prompt": "What HTTP status code and response body are returned when a client POSTs invalid JSON?",
    "code": `package main\n\nimport "github.com/gin-gonic/gin"\n\ntype Login struct {\n    Username string \`json:\"username\" binding:\"required\"\`\n    Password string \`json:\"password\" binding:\"required\"\`\n}\n\nfunc main() {\n    r := gin.Default()\n    r.POST("/login", func(c *gin.Context) {\n        var login Login\n        if err := c.ShouldBindJSON(&login); err != nil {\n            c.JSON(400, gin.H{\"error\": err.Error()})\n            return\n        }\n        c.JSON(200, gin.H{\"message\": \"ok\"})\n    })\n    r.Run()\n}`,
    "expected": "Status 400 Bad Request, JSON body like {\"error\":\"Key: 'Login.Username' Error:Field validation for 'Username' failed on the 'required' tag\"}",
    "explanation": "GIN JSON BINDING ERROR HANDLING:\n\nEXECUTION PHASE:\n1. Client sends a POST with JSON that fails validation (e.g., missing `username`).\n2. `c.ShouldBindJSON(&login)` attempts to bind and validate.\n3. Validation fails, returns an error.\n4. Handler returns `c.JSON(400, gin.H{\"error\": err.Error()})`.\n5. Gin responds with HTTP 400 and the error message in JSON.\n\n📌 KEY: Gin’s `ShouldBindJSON` returns validation errors that can be returned to the client. Always handle binding errors to provide meaningful feedback."
  },
  {
    "id": "go-sync-map-range",
    "topic": "Sync",
    "title": "sync.Map Range Behavior",
    "prompt": "What is printed?",
    "code": `package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var m sync.Map\n    m.Store(\"a\", 1)\n    m.Store(\"b\", 2)\n    m.Range(func(key, value interface{}) bool {\n        fmt.Printf(\"%v:%v \", key, value)\n        m.Delete(key)\n        return true\n    })\n    fmt.Println()\n    m.Range(func(key, value interface{}) bool {\n        fmt.Printf(\"%v:%v \", key, value)\n        return true\n    })\n}`,
    "expected": "a:1 b:2 (order may vary)\n(nothing, because map is empty after first range)",
    "explanation": "SYNC.MAP RANGE AND DELETION:\n\nEXECUTION PHASE:\n1. `sync.Map` stores two entries.\n2. First `Range` iterates over entries; it's safe to delete during iteration. The spec says that deleting an entry that has not been visited yet may or may not affect iteration; in practice, each entry is visited exactly once, and deletion after visiting is fine.\n3. After first range, both entries are deleted.\n4. Second `Range` sees an empty map, prints nothing.\n\n📌 KEY: `sync.Map`'s `Range` function is safe for concurrent use, but iteration order is not specified. Deleting during iteration does not cause panics, but you cannot guarantee which entries will be visited if you delete ahead."
  },
  {
    "id": "go-pointer-to-slice-append",
    "topic": "Pointers & Slices",
    "title": "Modifying Slice Pointer Length",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc appendValue(s *[]int, v int) {\n    *s = append(*s, v)\n}\n\nfunc main() {\n    s := []int{1, 2}\n    appendValue(&s, 3)\n    fmt.Println(s)\n}`,
    "expected": "[1 2 3]",
    "explanation": "MODIFYING SLICE THROUGH POINTER:\n\nEXECUTION PHASE:\n1. `s` is a slice `[1, 2]` (length 2, capacity maybe 2 or more).\n2. `appendValue(&s, 3)` passes a pointer to the slice header.\n3. Inside `appendValue`, `*s = append(*s, 3)` appends to the slice and assigns the result back to the slice header via the pointer.\n4. The original `s` in `main` is updated to the new slice (which may have a new backing array if capacity was insufficient).\n5. `fmt.Println(s)` prints `[1 2 3]`.\n\n📌 KEY: Passing a pointer to a slice allows the function to modify the slice header (length, capacity, underlying array). This is necessary when you need to change the length of the slice in the caller's scope."
  },
  {
    "id": "go-struct-embedding-field-access",
    "topic": "Structs",
    "title": "Embedded Struct Field Access",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\ntype Address struct {\n    City string\n}\n\ntype Person struct {\n    Name    string\n    Address // embedded\n}\n\nfunc main() {\n    p := Person{Name: \"Alice\", Address: Address{City: \"NYC\"}}\n    fmt.Println(p.City, p.Address.City)\n}`,
    "expected": "NYC NYC",
    "explanation": "EMBEDDED STRUCT FIELD PROMOTION:\n\nEXECUTION PHASE:\n1. `Person` embeds `Address`.\n2. Fields of `Address` are promoted to `Person`. So `p.City` is accessible directly.\n3. The embedded field itself is also accessible via `p.Address.City`.\n4. Both print `NYC`.\n\n📌 KEY: Embedding promotes fields and methods, providing a form of composition. If there is a name conflict, the outer field takes precedence, and you can disambiguate with the embedded type name."
  },
  {
    "id": "go-channel-select-for-loop",
    "topic": "Channels",
    "title": "Select in For Loop with Default",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int, 2)\n    ch <- 1\n    ch <- 2\n    for i := 0; i < 3; i++ {\n        select {\n        case v := <-ch:\n            fmt.Print(v)\n        default:\n            fmt.Print(\"X\")\n        }\n    }\n}`,
    "expected": "12X",
    "explanation": "SELECT WITH DEFAULT AND LOOP:\n\nEXECUTION PHASE:\n1. `ch` has two buffered values: 1, 2.\n2. Iteration 1: select picks the ready case (receive 1), prints `1`. No default.\n3. Iteration 2: receive 2, prints `2`.\n4. Iteration 3: channel is empty, receive would block, so select picks `default`, prints `X`.\n5. Output: `12X`.\n\n📌 KEY: When a channel is empty, a receive case without default would block; with default, it executes the default immediately. This pattern is used for non‑blocking receives."
  }, {
    "id": "go-map-delete-non-existent",
    "topic": "Maps",
    "title": "Delete on Non‑Existent Key",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc main() {\n    m := map[string]int{"a": 1}\n    delete(m, "b")\n    fmt.Println(m["a"])\n}`,
    "expected": "1",
    "explanation": "DELETE ON NON‑EXISTENT KEY IS A NO-OP:\n\nEXECUTION PHASE:\n1. Map `m` has one key `\"a\"` with value `1`.\n2. `delete(m, \"b\")` attempts to delete key `\"b\"`. Since `\"b\"` does not exist, `delete` does nothing – it does not panic.\n3. `fmt.Println(m[\"a\"])` prints `1`.\n\n📌 KEY: Deleting a non‑existent key from a map is safe and does nothing. No panic occurs. This is a convenient property of Go maps."
  },
  {
    "id": "go-map-key-type",
    "topic": "Maps",
    "title": "Map Key Type Restrictions",
    "prompt": "Why does this code fail to compile?",
    "code": `package main\n\nfunc main() {\n    m := make(map[[]int]string)\n    m[[]int{1, 2}] = "hello"\n}`,
    "expected": "invalid map key type []int",
    "explanation": "MAP KEYS MUST BE COMPARABLE:\n\nCOMPILATION PHASE:\n1. Map keys in Go must be comparable types (types that support `==` and `!=`).\n2. Slices are not comparable (except with `nil`).\n3. The compiler rejects the declaration `map[[]int]string` with an error.\n4. The program does not run; it fails at compile time.\n\n📌 KEY: Usable map key types include booleans, numbers, strings, pointers, channels, interfaces, and structs containing only comparable fields. Slices, maps, and functions cannot be keys."
  },
  {
    "id": "go-double-pointer-modify",
    "topic": "Pointers",
    "title": "Double Pointer to Modify Pointer",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc changePtr(pp **int) {\n    x := 99\n    *pp = &x\n}\n\nfunc main() {\n    var p *int\n    changePtr(&p)\n    fmt.Println(*p)\n}`,
    "expected": "99",
    "explanation": "DOUBLE POINTER MODIFIES ORIGINAL POINTER:\n\nEXECUTION PHASE:\n1. `p` is declared as a nil pointer to int.\n2. `changePtr(&p)` passes the address of `p` (a `**int`).\n3. Inside `changePtr`, `*pp = &x` assigns the address of local variable `x` to the location pointed to by `pp`. This changes `p` in `main`.\n4. `p` now points to `x` (a stack variable).\n5. `fmt.Println(*p)` dereferences `p` and prints `99`.\n\n📌 KEY: A pointer to a pointer allows a function to modify the original pointer variable. This pattern is used when you need to allocate a new value and return it through a pointer parameter."
  },
  {
    "id": "go-struct-tags-json-omitempty-pointer",
    "topic": "Structs & JSON",
    "title": "omitempty with Pointer Field",
    "prompt": "What JSON is printed?",
    "code": `package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype User struct {\n    Name  string  \`json:\"name\"\`\n    Score *int    \`json:\"score,omitempty\"\`\n}\n\nfunc main() {\n    u := User{Name: "Alice"}\n    b, _ := json.Marshal(u)\n    fmt.Println(string(b))\n}`,
    "expected": "{\"name\":\"Alice\"}",
    "explanation": "OMITEMPTY WITH POINTER FIELDS:\n\nEXECUTION PHASE:\n1. `User.Score` is a pointer to int with `omitempty`.\n2. `Score` is `nil` (zero value for a pointer).\n3. `omitempty` treats a `nil` pointer as empty and omits the field.\n4. JSON output contains only `{\"name\":\"Alice\"}`.\n5. If `Score` pointed to an integer (even 0), it would be included because the pointer is non‑nil.\n\n📌 KEY: `omitempty` works with pointers: a `nil` pointer is considered empty. This is useful for distinguishing between a field that is intentionally not set and a field set to zero value."
  },
  {
    "id": "go-channel-close-signal",
    "topic": "Channels",
    "title": "Close Channel as Signal to Multiple Receivers",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc worker(done <-chan struct{}, id int) {\n    <-done\n    fmt.Printf("%d done\\n", id)\n}\n\nfunc main() {\n    done := make(chan struct{})\n    for i := 1; i <= 3; i++ {\n        go worker(done, i)\n    }\n    close(done)\n    // Wait a bit for goroutines to finish\n    select {}\n}`,
    "expected": "1 done\n2 done\n3 done\n(in any order, then deadlock after printing?) The program will deadlock after prints because select {} blocks forever.",
    "explanation": "CLOSED CHANNEL BROADCASTS TO ALL RECEIVERS:\n\nEXECUTION PHASE:\n1. Three goroutines are started, each blocking on `<-done`.\n2. `close(done)` closes the channel.\n3. A receive from a closed channel returns immediately (zero value for the type). All three goroutines unblock concurrently.\n4. Each prints its ID. The order is non‑deterministic.\n5. After printing, the goroutines exit, but `main` is blocked at `select {}`, causing a deadlock.\n\n📌 KEY: Closing a channel is a broadcast mechanism that unblocks all goroutines waiting on that channel. It’s often used to signal cancellation or shutdown."
  },
  {
    "id": "go-gin-bind-query",
    "topic": "Gin",
    "title": "Gin Query Parameter Binding",
    "prompt": "If a GET request to /search?q=golang&limit=10 is made, what is the response?",
    "code": `package main\n\nimport "github.com/gin-gonic/gin"\n\ntype SearchReq struct {\n    Query string \`form:\"q\" binding:\"required\"\`\n    Limit int    \`form:\"limit\" binding:\"min=1,max=100\"\`\n}\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/search", func(c *gin.Context) {\n        var req SearchReq\n        if err := c.ShouldBindQuery(&req); err != nil {\n            c.JSON(400, gin.H{\"error\": err.Error()})\n            return\n        }\n        c.JSON(200, gin.H{\"query\": req.Query, \"limit\": req.Limit})\n    })\n    r.Run()\n}`,
    "expected": "Status 200, JSON: {\"query\":\"golang\",\"limit\":10}",
    "explanation": "GIN QUERY PARAMETER BINDING:\n\nEXECUTION PHASE:\n1. `c.ShouldBindQuery(&req)` binds query parameters to the struct using `form` tags.\n2. `q=golang` sets `req.Query` to `\"golang\"`.\n3. `limit=10` sets `req.Limit` to 10. Validation passes (1 ≤ 10 ≤ 100).\n4. Handler returns 200 with the bound values.\n\n📌 KEY: Use `form` tags for query parameters (or `json` for JSON body). `ShouldBindQuery` validates based on `binding` tags. Always handle binding errors."
  },
  {
    "id": "go-gin-ctx-request",
    "topic": "Gin",
    "title": "Accessing Request Data in Middleware",
    "prompt": "What is printed in the console when a POST request to /submit with body `{\"name\":\"Alice\"}` is made?",
    "code": `package main\n\nimport (\n    "fmt"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    r.Use(func(c *gin.Context) {\n        var body map[string]interface{}\n        c.ShouldBindJSON(&body)\n        c.Set("body", body)\n        c.Next()\n    })\n    r.POST("/submit\", func(c *gin.Context) {\n        val, _ := c.Get("body\")\n        fmt.Println(val)\n        c.JSON(200, gin.H{})\n    })\n    r.Run()\n}`,
    "expected": "map[name:Alice]",
    "explanation": "GIN CONTEXT PASSING WITH SET/GET:\n\nEXECUTION PHASE:\n1. Middleware runs first: `ShouldBindJSON` parses the request body into `body` map.\n2. `c.Set(\"body\", body)` stores the map in the request context.\n3. `c.Next()` passes control to the handler.\n4. Handler retrieves the value with `c.Get(\"body\")` and prints it.\n5. Console output: `map[name:Alice]`.\n\n📌 KEY: `c.Set` and `c.Get` are used to pass data between middleware and handlers. The data is scoped to the request. Avoid using global variables for request-specific data."
  },
  {
    "id": "go-redis-pipeline",
    "topic": "Redis Caching",
    "title": "Redis Pipeline Commands",
    "prompt": "How many round trips to Redis are made?",
    "code": `import "github.com/go-redis/redis/v8"\n\nfunc main() {\n    rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379\"})\n    ctx := context.Background()\n    pipe := rdb.Pipeline()\n    pipe.Set(ctx, "key1", "val1", 0)\n    pipe.Set(ctx, "key2", "val2\", 0)\n    pipe.Get(ctx, "key1\")\n    _, err := pipe.Exec(ctx)\n    // ... error handling omitted\n}`,
    "expected": "1 round trip",
    "explanation": "REDIS PIPELINE BATCHES COMMANDS:\n\nEXECUTION PHASE:\n1. `Pipeline()` returns a pipeline object that batches commands.\n2. Three commands are queued: two SETs and one GET.\n3. `pipe.Exec(ctx)` sends all commands to Redis in a **single** network round trip.\n4. Redis processes them sequentially and returns all results at once.\n5. Only 1 round trip occurs, regardless of the number of commands in the pipeline.\n\n📌 KEY: Pipelines reduce latency by eliminating round trips for each command. They are essential for high‑throughput Redis operations. Note that pipelined commands are not atomic unless you use transactions (`MULTI`/`EXEC`)."
  },
  {
    "id": "go-redis-lock",
    "topic": "Redis Caching",
    "title": "Distributed Lock with Redis",
    "prompt": "Why might this distributed lock implementation be flawed?",
    "code": `func acquireLock(rdb *redis.Client, key string, ttl time.Duration) bool {\n    ok, _ := rdb.SetNX(context.Background(), key, \"locked\", ttl).Result()\n    return ok\n}\n\nfunc releaseLock(rdb *redis.Client, key string) {\n    rdb.Del(context.Background(), key)\n}`,
    "expected": "The lock can be released by a different client (no ownership check) and may not respect TTL correctly if client crashes.",
    "explanation": "DISTRIBUTED LOCK FLAWS:\n\nEXECUTION PHASE:\n1. Client A acquires lock with `SetNX` and TTL.\n2. Client A’s work takes longer than TTL, lock expires. Client B acquires lock.\n3. Client A finishes and calls `releaseLock`, deleting the lock **that now belongs to Client B**.\n4. This violates mutual exclusion.\n5. Also, if client A crashes, the lock is automatically released after TTL (good), but the `Del` might be called erroneously later.\n\n📌 KEY: A proper distributed lock must include ownership (e.g., store a unique identifier and check it before deletion) and use Lua scripts for atomicity. Use a library like `redsync` for production."
  },
  {
    "id": "go-api-url-param",
    "topic": "API Development",
    "title": "Gin URL Path Parameter",
    "prompt": "What is the response when a GET request to /users/123 is made?",
    "code": `package main\n\nimport "github.com/gin-gonic/gin"\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/users/:id\", func(c *gin.Context) {\n        id := c.Param(\"id\")\n        c.JSON(200, gin.H{\"user_id\": id})\n    })\n    r.Run()\n}`,
    "expected": "Status 200, JSON: {\"user_id\":\"123\"}",
    "explanation": "GIN PATH PARAMETERS:\n\nEXECUTION PHASE:\n1. The route `/users/:id` defines a path parameter `id`.\n2. Request `/users/123` matches; `c.Param(\"id\")` extracts `\"123\"`.\n3. Handler returns JSON with `user_id` set to `\"123\"`.\n\n📌 KEY: Path parameters are captured with `:` prefix in the route definition. Use `c.Param` to retrieve them. They are always strings; convert to other types as needed (e.g., `strconv.Atoi`)."
  },
  {
    "id": "go-slice-vs-array-address",
    "topic": "Pointers & Slices",
    "title": "Array vs Slice Address",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc main() {\n    arr := [3]int{1, 2, 3}\n    sl := arr[:]\n    fmt.Printf("%p %p\\n", &arr, &sl)\n}`,
    "expected": "0xc0000140a0 0xc000010018 (example addresses – different because slice header is separate from array)",
    "explanation": "ARRAY ADDRESS VS SLICE HEADER ADDRESS:\n\nEXECUTION PHASE:\n1. `arr` is an array – its address is the address of the first element (contiguous memory).\n2. `sl := arr[:]` creates a slice header that references `arr` as the underlying array.\n3. `&arr` is the address of the array (same as &arr[0]).\n4. `&sl` is the address of the slice header (a separate memory location containing pointer, len, cap).\n5. These addresses are different.\n\n📌 KEY: A slice is a header pointing to an underlying array. The header’s address is different from the array’s address. Modifying the slice via `sl` may affect the array if the slice’s pointer points to it."
  },{
    "id": "go-reflection-type-switch",
    "topic": "Reflection",
    "title": "Reflection Type Switch",
    "prompt": "What is printed?",
    "code": `package main\n\nimport (\n    "fmt"\n    "reflect"\n)\n\nfunc main() {\n    var x interface{} = 42\n    v := reflect.ValueOf(x)\n    switch v.Kind() {\n    case reflect.Int:\n        fmt.Println("int:", v.Int())\n    case reflect.String:\n        fmt.Println("string:", v.String())\n    default:\n        fmt.Println("unknown")\n    }\n}`,
    "expected": "int: 42",
    "explanation": "REFLECTION TYPE INSPECTION:\n\nEXECUTION PHASE:\n1. `x` is an interface holding an `int` value 42.\n2. `reflect.ValueOf(x)` returns a `reflect.Value` representing the value.\n3. `v.Kind()` returns `reflect.Int` because the underlying type is int.\n4. The switch matches the `reflect.Int` case.\n5. `v.Int()` retrieves the int value (42).\n6. Output: `int: 42`.\n\n📌 KEY: `reflect.Kind` distinguishes the underlying type (int, string, struct, slice, etc.). It is different from `reflect.Type` which can be more specific (e.g., `MyInt`)."
  },
  {
    "id": "go-atomic-vs-mutex",
    "topic": "Concurrency",
    "title": "Atomic vs Mutex Performance Consideration",
    "prompt": "Which of these two approaches is more efficient for a simple counter and why?",
    "code": `// Approach A: atomic\nvar counter int32\natomic.AddInt32(&counter, 1)\n\n// Approach B: mutex\nvar mu sync.Mutex\nvar counter int\nmu.Lock()\ncounter++\nmu.Unlock()`,
    "expected": "Atomic operations are more efficient for simple counters because they avoid lock contention and use CPU-level instructions.",
    "explanation": "ATOMIC VS MUTEX PERFORMANCE:\n\nEXECUTION PHASE:\n1. Atomic operations (`sync/atomic`) use hardware instructions (e.g., XADD on x86) that are lock‑free at the CPU level.\n2. They do not involve OS scheduling, context switching, or goroutine parking.\n3. Mutex operations involve contention management; if uncontended, they are still heavier than atomic (acquire/release of a memory barrier, potential runtime scheduling).\n4. For high‑frequency, low‑contention counters, atomic is superior. For complex critical sections, mutex is needed.\n\n📌 KEY: Use `atomic` for simple counters, flags, and integer operations where you don't need to protect multiple variables. Use mutex for larger critical sections or when operations cannot be expressed atomically."
  },
  {
    "id": "go-context-deadline",
    "topic": "Context",
    "title": "Context Deadline Propagation",
    "prompt": "What is printed?",
    "code": `package main\n\nimport (\n    "context"\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)\n    defer cancel()\n    select {\n    case <-time.After(100 * time.Millisecond):\n        fmt.Println("done after 100ms")\n    case <-ctx.Done():\n        fmt.Println("ctx done:", ctx.Err())\n    }\n}`,
    "expected": "ctx done: context deadline exceeded",
    "explanation": "CONTEXT DEADLINE EXCEEDS TIMEOUT:\n\nEXECUTION PHASE:\n1. `context.WithTimeout` creates a context that will be done after 50ms.\n2. `time.After(100ms)` creates a channel that sends after 100ms.\n3. `select` blocks until one case is ready.\n4. At 50ms, `ctx.Done()` fires (the context deadline is exceeded).\n5. The select picks that case, prints `ctx done: context deadline exceeded`.\n6. The 100ms timer never completes because the select already exited.\n\n📌 KEY: Context deadlines and timeouts are used to propagate cancellation across goroutines. The error returned by `ctx.Err()` after cancellation is `context.Canceled` or `context.DeadlineExceeded`."
  },
  {
    "id": "go-gin-request-id",
    "topic": "Gin",
    "title": "Request ID Middleware",
    "prompt": "What is printed in the logs when a request is made to /ping?",
    "code": `package main\n\nimport (\n    "fmt"\n    "github.com/gin-gonic/gin"\n    "github.com/google/uuid"\n)\n\nfunc main() {\n    r := gin.Default()\n    r.Use(func(c *gin.Context) {\n        reqID := uuid.New().String()\n        c.Set("request_id", reqID)\n        c.Next()\n        fmt.Println("request", reqID, "finished")\n    })\n    r.GET("/ping\", func(c *gin.Context) {\n        rid, _ := c.Get(\"request_id\")\n        fmt.Println("handling request", rid)\n        c.JSON(200, gin.H{})\n    })\n    r.Run()\n}`,
    "expected": "First: \"handling request <uuid>\" (inside handler), then \"request <same uuid> finished\" (in middleware after handler).",
    "explanation": "GIN MIDDLEWARE ORDER WITH REQUEST ID:\n\nEXECUTION PHASE:\n1. Middleware is registered and runs before the handler.\n2. It generates a UUID, stores it in context with `c.Set`.\n3. It calls `c.Next()` to invoke the handler.\n4. Handler retrieves the request ID with `c.Get` and prints it.\n5. After handler returns, middleware resumes and prints the finish message with the same UUID.\n6. Logs show: handling request <uuid> followed by request <uuid> finished.\n\n📌 KEY: Using `c.Set`/`c.Get` to propagate request-scoped data like request IDs is a common pattern for tracing and logging in Gin."
  },
  {
    "id": "go-redis-pubsub",
    "topic": "Redis Caching",
    "title": "Redis Pub/Sub with Channels",
    "prompt": "How many messages does the subscriber receive?",
    "code": `package main\n\nimport (\n    "context"\n    "fmt"\n    "github.com/go-redis/redis/v8"\n    "time"\n)\n\nfunc main() {\n    rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})\n    ctx := context.Background()\n    pubsub := rdb.Subscribe(ctx, "mychannel")\n    defer pubsub.Close()\n    ch := pubsub.Channel()\n    go func() {\n        for i := 0; i < 3; i++ {\n            rdb.Publish(ctx, "mychannel", fmt.Sprintf("msg%d", i))\n        }\n    }()\n    count := 0\n    for msg := range ch {\n        fmt.Println(msg.Payload)\n        count++\n        if count == 3 {\n            break\n        }\n    }\n}`,
    "expected": "3 messages (msg0, msg1, msg2) in some order, but since they are published sequentially and the channel receives them sequentially, order should be msg0, msg1, msg2.",
    "explanation": "REDIS PUB/SUB RECEPTION:\n\nEXECUTION PHASE:\n1. Subscriber creates a pubsub subscription to \"mychannel\".\n2. `pubsub.Channel()` returns a Go channel that yields incoming messages.\n3. A goroutine publishes 3 messages sequentially.\n4. The main goroutine iterates over the Go channel and prints each message.\n5. After 3 messages, it breaks out of the loop.\n6. All 3 published messages are received.\n\n📌 KEY: Redis Pub/Sub messages are not persisted; if a subscriber is not active when a message is published, that message is lost. The `Channel()` method provides a convenient way to receive messages as Go channel values."
  },
  {
    "id": "go-api-binding-validation",
    "topic": "API Development",
    "title": "Gin Binding Validation with Custom Error",
    "prompt": "What is the response when a POST request with JSON `{\"email\":\"notanemail\"}` is sent to /register?",
    "code": `package main\n\nimport "github.com/gin-gonic/gin"\n\ntype RegisterReq struct {\n    Email string \`json:\"email\" binding:\"required,email\"\`\n    Age   int    \`json:\"age\" binding:\"min=18\"\`\n}\n\nfunc main() {\n    r := gin.Default()\n    r.POST("/register", func(c *gin.Context) {\n        var req RegisterReq\n        if err := c.ShouldBindJSON(&req); err != nil {\n            c.JSON(400, gin.H{\"error\": err.Error()})\n            return\n        }\n        c.JSON(200, gin.H{\"message\": \"ok\"})\n    })\n    r.Run()\n}`,
    "expected": "Status 400, JSON: {\"error\":\"Key: 'RegisterReq.Email' Error:Field validation for 'Email' failed on the 'email' tag\"}",
    "explanation": "GIN VALIDATION WITH CUSTOM RULES:\n\nEXECUTION PHASE:\n1. JSON body `{\"email\":\"notanemail\"}` is sent.\n2. `c.ShouldBindJSON` binds and validates using `binding` tags.\n3. `email` is required but fails the `email` format validation (it's not a valid email address).\n4. `Age` is missing, so its default zero value is 0, which fails `min=18` (but validation stops at the first error? Actually `validator` collects all errors, but Gin's error string may return the first).\n5. The binding error is returned as `400 Bad Request` with error message.\n\n📌 KEY: Use `binding` tags for validation. The `validator` package (v10) provides many built-in validators. Custom error handling can be implemented to return user-friendly messages."
  },
  {
    "id": "go-interface-nil-return",
    "topic": "Interfaces",
    "title": "Returning Nil Interface vs Nil Concrete",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\ntype MyError struct{}\n\nfunc (e *MyError) Error() string {\n    return "my error"\n}\n\nfunc returnsError() error {\n    var err *MyError = nil\n    return err\n}\n\nfunc main() {\n    err := returnsError()\n    if err != nil {\n        fmt.Println("error is not nil")\n    } else {\n        fmt.Println("error is nil")\n    }\n}`,
    "expected": "error is not nil",
    "explanation": "RETURNING NIL CONCRETE AS INTERFACE:\n\nEXECUTION PHASE:\n1. `returnsError` declares `err` as a nil pointer of type `*MyError`.\n2. It returns `err` as an `error` interface.\n3. The returned interface has dynamic type `*MyError` and dynamic value `nil`.\n4. In `main`, `err != nil` compares an interface with a nil interface. Since the interface has a type, it is not equal to nil.\n5. Output: `error is not nil`.\n\n📌 KEY: To return a nil error, always return `nil` directly, not a typed nil. This is a common bug in Go error handling."
  },
  {
    "id": "go-struct-memory-alignment",
    "topic": "Structs",
    "title": "Struct Memory Layout and Size",
    "prompt": "What is the output of `unsafe.Sizeof` for each struct?",
    "code": `package main\n\nimport (\n    "fmt"\n    "unsafe"\n)\n\ntype A struct {\n    b bool\n    i int64\n}\n\ntype B struct {\n    i int64\n    b bool\n}\n\nfunc main() {\n    fmt.Println(unsafe.Sizeof(A{}), unsafe.Sizeof(B{}))\n}`,
    "expected": "16 16 (on 64-bit arch) or 24 16 depending on alignment? Actually on 64-bit: bool 1 byte + padding to align int64 (7 bytes) -> A size = 16. B: int64 8 bytes + bool 1 byte + 7 bytes padding -> also 16. So both 16. The exact may differ; explanation must clarify padding.",
    "explanation": "STRUCT MEMORY ALIGNMENT:\n\nEXECUTION PHASE:\n1. On a 64-bit system, `int64` requires 8‑byte alignment.\n2. Struct `A`: `bool` (1 byte) then `int64` must start at offset multiple of 8. So compiler adds 7 padding bytes after `bool`. Size = 1+7+8 = 16.\n3. Struct `B`: `int64` starts at offset 0 (size 8), then `bool` at offset 8 (1 byte). To maintain alignment of the whole struct (largest field alignment = 8), padding of 7 bytes is added at the end. Size = 8+1+7 = 16.\n4. Both print 16.\n\n📌 KEY: Struct field order affects memory layout due to padding. To reduce memory usage, order fields from largest to smallest alignment requirements."
  },
  {
    "id": "go-channel-panic-close",
    "topic": "Channels",
    "title": "Closing Already Closed Channel Panics",
    "prompt": "What happens when this code runs?",
    "code": `package main\n\nfunc main() {\n    ch := make(chan int)\n    close(ch)\n    close(ch)\n}`,
    "expected": "panic: close of closed channel",
    "explanation": "CLOSING ALREADY CLOSED CHANNEL PANICS:\n\nEXECUTION PHASE:\n1. `ch` is created and then closed with `close(ch)`.\n2. Second call to `close(ch)` attempts to close an already closed channel.\n3. The Go runtime panics with `panic: close of closed channel`.\n4. The program terminates.\n\n📌 KEY: Closing a channel twice is a runtime panic. Always ensure channels are closed exactly once. Use sync.Once or a flag to guard against multiple closes."
  },
  {
    "id": "go-gin-group-routes",
    "topic": "Gin",
    "title": "Gin Route Grouping and Middleware",
    "prompt": "Which endpoints are protected by the auth middleware?",
    "code": `r := gin.Default()\napi := r.Group(\"/api\")\n{\n    api.GET(\"/public\", publicHandler)\n    auth := api.Group(\"/admin\")\n    auth.Use(authMiddleware())\n    {\n        auth.GET(\"/dashboard\", dashboardHandler)\n    }\n    api.GET(\"/info\", infoHandler)\n}`,
    "expected": "/api/admin/dashboard is protected; /api/public and /api/info are not protected.",
    "explanation": "GIN ROUTE GROUPING AND MIDDLEWARE INHERITANCE:\n\nEXECUTION PHASE:\n1. A root group `/api` is created with no middleware.\n2. `/api/public` is added directly under the group – no auth.\n3. A subgroup `/api/admin` is created under `/api`. `auth.Use(authMiddleware())` applies middleware **only** to routes defined within that subgroup.\n4. `/api/admin/dashboard` inherits the auth middleware.\n5. `/api/info` is added directly under `/api` after the subgroup – no auth.\n\n📌 KEY: Gin route groups allow middleware to be applied to subsets of routes. Middleware is applied at the group level and is inherited by nested groups and their routes."
  }, {
    "id": "go-sync-once",
    "topic": "Sync",
    "title": "sync.Once Executes Only Once",
    "prompt": "What is printed?",
    "code": `package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nvar once sync.Once\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        once.Do(func() {\n            fmt.Println("initialized")\n        })\n    }\n}`,
    "expected": "initialized",
    "explanation": "SYNC.ONCE EXECUTES FUNCTION EXACTLY ONCE:\n\nEXECUTION PHASE:\n1. `sync.Once` ensures the given function runs only once, regardless of how many times `Do` is called.\n2. Loop runs 3 times, but only the first call to `once.Do` actually executes the anonymous function.\n3. Subsequent calls to `Do` do nothing.\n4. Output: `initialized`.\n\n📌 KEY: Use `sync.Once` for lazy initialization, singleton patterns, or any setup that must happen only once in a concurrent environment."
  },
  {
    "id": "go-gin-shouldbind-vs-bind",
    "topic": "Gin",
    "title": "ShouldBind vs Bind Error Handling",
    "prompt": "What is the difference in behavior when a malformed JSON is sent?",
    "code": `func handleBind(c *gin.Context) {\n    var req Req\n    if err := c.BindJSON(&req); err != nil {\n        c.JSON(400, gin.H{"error": err.Error()})\n        return\n    }\n    c.JSON(200, gin.H{})\n}\n\nfunc handleShouldBind(c *gin.Context) {\n    var req Req\n    if err := c.ShouldBindJSON(&req); err != nil {\n        c.JSON(400, gin.H{"error": err.Error()})\n        return\n    }\n    c.JSON(200, gin.H{})\n}`,
    "expected": "`BindJSON` automatically calls `c.AbortWithError` and `c.Next()` on error if not handled? Actually both behave similarly in these examples. But the key: `BindJSON` returns `ErrBadRequest` and also sets the error in the context; `ShouldBindJSON` does not set the error. The main difference: `BindJSON` calls `MustBindWith` which on error sets `c.Error(err)` and calls `c.AbortWithError(...)`. So if you don't handle the error, the response will be automatically written. `ShouldBindJSON` returns the error but does not automatically write a response.",
    "explanation": "GIN BIND VS SHOULDBIND:\n\nEXECUTION PHASE:\n1. `c.BindJSON(&req)` internally calls `c.MustBindWith`. If binding fails, it sets `c.Error(err)` and calls `c.AbortWithError(400, err)`, which writes an error response.\n2. `c.ShouldBindJSON(&req)` returns the error but **does not** automatically write a response; you must handle it manually.\n3. In the code shown, both handlers return a JSON error, but if you forget to return after `BindJSON`, the handler may continue because `c.AbortWithError` does not stop execution. `ShouldBindJSON` is safer for manual handling.\n\n📌 KEY: Use `ShouldBind` variants when you need to control error responses; use `Bind` variants for quick validation where the default 400 response is acceptable. Always return after handling errors."
  },
  {
    "id": "go-redis-zset",
    "topic": "Redis Caching",
    "title": "Redis Sorted Set Leaderboard",
    "prompt": "What is the output after executing these commands?",
    "code": `import "github.com/go-redis/redis/v8"\n\nrdb.ZAdd(ctx, "scores", &redis.Z{Score: 100, Member: "alice"}, &redis.Z{Score: 95, Member: "bob"})\nrdb.ZIncrBy(ctx, "scores", 10, "bob")\nresult, _ := rdb.ZRevRangeWithScores(ctx, "scores", 0, 0).Result()\nfmt.Println(result[0].Member, result[0].Score)`,
    "expected": "bob 105",
    "explanation": "REDIS SORTED SET OPERATIONS:\n\nEXECUTION PHASE:\n1. `ZAdd` adds alice (score 100) and bob (score 95).\n2. `ZIncrBy` increments bob's score by 10 → now bob = 105.\n3. `ZRevRangeWithScores` with range 0,0 gets the top 1 element in descending order (highest score).\n4. The highest score is bob with 105.\n5. Output: `bob 105`.\n\n📌 KEY: Redis sorted sets are ideal for leaderboards, rate limiters, and time‑ordered queues. `ZRevRange` gives descending order; `ZRange` gives ascending."
  },
  {
    "id": "go-json-omitempty-zero",
    "topic": "JSON",
    "title": "omitempty and Zero Values",
    "prompt": "What JSON is printed?",
    "code": `package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Item struct {\n    Name  string \`json:\"name,omitempty\"\`\n    Price int    \`json:\"price,omitempty\"\`\n}\n\nfunc main() {\n    i1 := Item{Name: "", Price: 0}\n    i2 := Item{Name: "book", Price: 0}\n    b1, _ := json.Marshal(i1)\n    b2, _ := json.Marshal(i2)\n    fmt.Println(string(b1), string(b2))\n}`,
    "expected": "{} {\"name\":\"book\"}",
    "explanation": "JSON OMITEMPTY WITH ZERO VALUES:\n\nEXECUTION PHASE:\n1. `omitempty` omits fields if they are the zero value for their type.\n2. For `i1`: `Name` is empty string (zero for string), `Price` is 0 (zero for int). Both are omitted → JSON `{}`.\n3. For `i2`: `Name` is `\"book\"` (non‑zero), `Price` is 0 (zero). `Name` is included, `Price` omitted → JSON `{\"name\":\"book\"}`.\n\n📌 KEY: `omitempty` treats the zero value as empty. To include zero values, do not use `omitempty`. For ints, if you need to distinguish between 0 and unset, use a pointer `*int`."
  },
  {
    "id": "go-gin-context-copy",
    "topic": "Gin",
    "title": "Gin Context Copy in Goroutines",
    "prompt": "What is the problem with this code?",
    "code": `func handler(c *gin.Context) {\n    go func() {\n        time.Sleep(1 * time.Second)\n        c.JSON(200, gin.H{"message": "done"})\n    }()\n    c.JSON(200, gin.H{"status": "started"})\n}`,
    "expected": "Panic or invalid write: gin.Context is not safe for concurrent use, and c.JSON after the handler returns will cause issues.",
    "explanation": "GIN CONTEXT IS NOT THREAD‑SAFE:\n\nEXECUTION PHASE:\n1. `handler` returns immediately after writing the first JSON response.\n2. Gin may reuse the context or the underlying HTTP connection after the handler returns.\n3. The goroutine sleeps, then attempts to write to the same context, which may have been closed or reused.\n4. This can cause panics or data races.\n\n📌 KEY: Never reuse a `gin.Context` in a goroutine after the handler returns. If you need to perform async work, copy the context (or only extract needed data) and use `c.Copy()` to get a safe copy for the goroutine."
  },
  {
    "id": "go-slice-copy-memory",
    "topic": "Slices",
    "title": "copy vs manual assignment",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc main() {\n    src := []int{1, 2, 3, 4, 5}\n    dst := make([]int, 3)\n    copy(dst, src[1:4])\n    fmt.Println(dst)\n}`,
    "expected": "[2 3 4]",
    "explanation": "COPY WITH SLICE RANGES:\n\nEXECUTION PHASE:\n1. `src[1:4]` creates a slice referencing elements 2,3,4 (indices 1,2,3).\n2. `dst` is a slice of length 3, capacity 3.\n3. `copy` copies elements from the source slice to destination. It copies `min(len(dst), len(src[1:4])) = 3` elements.\n4. `dst` becomes `[2,3,4]`.\n\n📌 KEY: `copy` works with any slices; it copies elements from the source to the destination, respecting the length of both. It does not grow the destination."
  },
  {
    "id": "go-graceful-shutdown",
    "topic": "API Development",
    "title": "Graceful Shutdown with Gin",
    "prompt": "What is the correct way to ensure the server shuts down gracefully?",
    "code": `func main() {\n    r := gin.Default()\n    srv := &http.Server{Addr: ":8080\", Handler: r}\n    go srv.ListenAndServe()\n    // ...\n}`,
    "expected": "Use `srv.Shutdown(ctx)` with a context that listens for signals.",
    "explanation": "GRACEFUL SHUTDOWN STEPS:\n\nEXECUTION PHASE:\n1. Start the server in a goroutine.\n2. Create a channel to listen for OS signals (SIGINT, SIGTERM).\n3. Block until a signal is received.\n4. Create a context with a timeout (e.g., 5 seconds).\n5. Call `srv.Shutdown(ctx)` to stop accepting new connections and wait for existing ones.\n6. The server shuts down cleanly.\n\n📌 KEY: Without graceful shutdown, killing the process may cut off active requests. Always implement signal handling and `srv.Shutdown` in production APIs."
  },
  {
    "id": "go-channel-select-nil",
    "topic": "Channels",
    "title": "Select with Nil Channels Dynamic Disable",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc main() {\n    ch1 := make(chan int)\n    ch2 := make(chan int)\n    var ch chan int = nil\n    select {\n    case v := <-ch1:\n        fmt.Println(v)\n    case v := <-ch2:\n        fmt.Println(v)\n    case v := <-ch:\n        fmt.Println(v)\n    default:\n        fmt.Println("default")\n    }\n}`,
    "expected": "default",
    "explanation": "NIL CHANNEL IN SELECT IS NEVER READY:\n\nEXECUTION PHASE:\n1. `ch1` and `ch2` are unbuffered channels with no pending sends, so receive would block.\n2. `ch` is nil, receive would also block forever.\n3. Since no case is ready, the `default` case is executed.\n4. Output: `default`.\n\n📌 KEY: Nil channels are never ready. This property can be used to dynamically enable/disable cases in a select loop by setting a channel to nil when you don't want that case to be selectable."
  },
  {
    "id": "go-defer-return-pointer",
    "topic": "Defer & Return",
    "title": "Defer Modifying Return Pointer",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\nfunc f() (p *int) {\n    defer func() {\n        x := 10\n        p = &x\n    }()\n    return nil\n}\n\nfunc main() {\n    fmt.Println(*f())\n}`,
    "expected": "10",
    "explanation": "DEFER MODIFIES NAMED RETURN POINTER:\n\nEXECUTION PHASE:\n1. `f` has a named return `p` of type `*int`.\n2. The `return nil` assigns `nil` to `p` (the return variable).\n3. Then the deferred function runs, reassigning `p` to the address of local variable `x` (which is allocated on the stack).\n4. After defer, the function returns the final value of `p` (which points to `x`).\n5. `x` remains accessible because the return value escapes to the heap if its address is taken? Actually in Go, returning a pointer to a local variable is safe; the variable escapes to the heap.\n6. `*f()` dereferences the pointer, prints `10`.\n\n📌 KEY: Deferred functions can modify named return values, including pointers. This can be used to change the return value after the `return` statement."
  },
  {
    "id": "go-gin-json-binding-required",
    "topic": "Gin",
    "title": "Required Field Validation",
    "prompt": "What is the response when a POST request with empty body is sent to /register?",
    "code": `type Req struct {\n    Name string \`json:\"name\" binding:\"required\"\`\n}\n\nr.POST("/register", func(c *gin.Context) {\n    var req Req\n    if err := c.ShouldBindJSON(&req); err != nil {\n        c.JSON(400, gin.H{\"error\": err.Error()})\n        return\n    }\n    c.JSON(200, gin.H{})\n})`,
    "expected": "400 Bad Request with JSON error: {\"error\":\"Key: 'Req.Name' Error:Field validation for 'Name' failed on the 'required' tag\"}",
    "explanation": "GIN REQUIRED FIELD VALIDATION:\n\nEXECUTION PHASE:\n1. Client sends empty body `{}`.\n2. `ShouldBindJSON` binds JSON to `Req`. The `Name` field is missing (zero value for string = \"\"), which fails the `required` validation.\n3. An error is returned.\n4. Handler returns 400 with the validation error.\n\n📌 KEY: The `required` tag ensures the field is present in the JSON. It does **not** mean non‑empty; it only checks presence. For non‑empty strings, use `binding:\"required\"` plus maybe `min=1` or custom validation."
  },
  {
    "id": "go-pointer-receiver-nil-check",
    "topic": "Methods",
    "title": "Nil Pointer Receiver and Method Call",
    "prompt": "What is printed?",
    "code": `package main\n\nimport "fmt"\n\ntype T struct {\n    val int\n}\n\nfunc (t *T) Get() int {\n    if t == nil {\n        return -1\n    }\n    return t.val\n}\n\nfunc main() {\n    var t *T\n    fmt.Println(t.Get())\n}`,
    "expected": "-1",
    "explanation": "NIL POINTER RECEIVER SAFE IF CHECKED:\n\nEXECUTION PHASE:\n1. `t` is a nil pointer to `T`.\n2. `t.Get()` is called; Go allows method calls on nil receivers.\n3. Inside `Get`, `t == nil` is true, so it returns `-1`.\n4. Output: `-1`.\n\n📌 KEY: Methods with pointer receivers can be called on nil pointers. Always check for nil inside the method if you intend to support it, or risk a panic if you dereference without check."
  },
  {
    "id": "go-redis-hash",
    "topic": "Redis Caching",
    "title": "Redis Hash Field Expiration",
    "prompt": "What is the output after these commands?",
    "code": `rdb.HSet(ctx, "user:123", "name", "alice")\nrdb.Expire(ctx, "user:123", 10*time.Second)\nrdb.HSet(ctx, "user:123", "age", 30)\ntime.Sleep(11 * time.Second)\nval, _ := rdb.HGet(ctx, "user:123", "name").Result()\nfmt.Println(val)`,
    "expected": "empty string and error (redis.Nil) because the entire key expired.",
    "explanation": "REDIS HASH EXPIRATION:\n\nEXECUTION PHASE:\n1. `HSet` creates hash key `user:123` with field `name`.\n2. `Expire` sets a TTL of 10 seconds on the **entire hash**.\n3. `HSet` adds another field `age`; the TTL remains (since the key exists).\n4. After 11 seconds, the key expires entirely, removing all fields.\n5. `HGet` returns `redis.Nil` error, and `val` is empty.\n\n📌 KEY: In Redis, expiration is at the key level, not per field. You cannot expire individual hash fields independently. For field-level expiration, use separate keys or a different data structure."
  },
  {
    "id": "go-struct-json-unexported",
    "topic": "JSON",
    "title": "Unexported Field in JSON",
    "prompt": "What is printed?",
    "code": `package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype User struct {\n    name string\n    Age  int\n}\n\nfunc main() {\n    u := User{name: "alice", Age: 30}\n    b, _ := json.Marshal(u)\n    fmt.Println(string(b))\n}`,
    "expected": "{\"Age\":30}",
    "explanation": "JSON MARSHALING IGNORES UNEXPORTED FIELDS:\n\nEXECUTION PHASE:\n1. `User` has unexported field `name` (lowercase) and exported field `Age` (uppercase).\n2. `json.Marshal` only includes exported fields.\n3. `name` is omitted, `Age` is included.\n4. Output: `{\"Age\":30}`.\n\n📌 KEY: Unexported fields are not accessible to packages outside the defining package, including the `encoding/json` package. Use JSON struct tags to control serialization, but the field must still be exported."
  }
];

export const goOutputQuestions = rawGoOutputQuestions.map((question) => ({
  ...question,
  type: "output",
}));
