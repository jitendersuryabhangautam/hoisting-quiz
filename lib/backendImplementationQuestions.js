export const backendImplementationQuestions = [
  {
    id: "go-hello-world",
    type: "implementation",
    topic: "Go Basics",
    title: "Hello World in Go",
    prompt:
      "Write a Go program that prints 'Hello, Go!' to the console.\n\n**Input/Output example:**\n- No input.\n- Output: `Hello, Go!`",
    starter: "package main\n\nfunc main() {\n    // your code\n}",
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // fmt.Println prints a line to standard output.\n    fmt.Println("Hello, Go!")\n}',
    explanation:
      "Every Go program starts with `package main` and a `main()` function. The `fmt` package provides formatted I/O. `fmt.Println` adds a newline after the text. When executed, the program outputs exactly `Hello, Go!`.",
    hint: "Use the `fmt` package and the `Println` function.",
  },
  {
    id: "go-variables",
    type: "implementation",
    topic: "Go Basics",
    title: "Declare and use variables",
    prompt:
      'Declare a variable `name` of type `string` with value `"Alice"`, and an integer `age` with value `30`. Print them in the format: `"Alice is 30 years old"`.\n\n**Example:**\n- No input.\n- Output: `Alice is 30 years old`',
    starter:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // Explicit declaration with type\n    var name string = "Alice"\n    // Short declaration (type inferred)\n    age := 30\n    // Printf formats with verb %s for string, %d for integer\n    fmt.Printf("%s is %d years old\\n", name, age)\n}',
    explanation:
      '**Dry run:** 1. `var name string = "Alice"` creates a variable `name` of type `string` with value `"Alice"`. 2. `age := 30` creates `age` as an `int` with value `30` (type inference). 3. `fmt.Printf` replaces `%s` with `name` and `%d` with `age`. The output is exactly `Alice is 30 years old` followed by a newline.',
    hint: "Use `:=` for short variable declaration inside functions. Use `Printf` for formatted output.",
  },
  {
    id: "go-if-else",
    type: "implementation",
    topic: "Go Basics",
    title: "Use if-else conditionals",
    prompt:
      'Write a function `checkAge(age int) string` that returns `"Adult"` if `age >= 18`, otherwise `"Minor"`.\n\n**Examples:**\n- Input: `20` → Output: `"Adult"`\n- Input: `15` → Output: `"Minor"`',
    starter:
      'package main\n\nimport "fmt"\n\nfunc checkAge(age int) string {\n    // your code\n}\n\nfunc main() {\n    fmt.Println(checkAge(20))\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc checkAge(age int) string {\n    // If the condition is true, return "Adult"\n    if age >= 18 {\n        return "Adult"\n    }\n    // Otherwise, return "Minor"\n    return "Minor"\n}\n\nfunc main() {\n    fmt.Println(checkAge(20)) // Output: Adult\n}',
    explanation:
      '**Dry run for `age = 20`:** `20 >= 18` is true, so the function returns `"Adult"`. For `age = 15`, the condition is false, so it skips the if block and returns `"Minor"`. Go does not require parentheses around the condition, but braces are mandatory.',
    hint: "Remember to return a string from both branches.",
  },
  {
    id: "go-for-loop",
    type: "implementation",
    topic: "Go Basics",
    title: "Write a for loop (sum 1..n)",
    prompt:
      "Write a function `sumToN(n int) int` that returns the sum of integers from 1 to `n` using a for loop.\n\n**Examples:**\n- Input: `5` → Output: `15` (1+2+3+4+5)\n- Input: `0` → Output: `0`",
    starter:
      'package main\n\nimport "fmt"\n\nfunc sumToN(n int) int {\n    // your code\n}\n\nfunc main() {\n    fmt.Println(sumToN(5))\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc sumToN(n int) int {\n    sum := 0\n    // THREE-COMPONENT LOOP: init; condition; post\n    for i := 1; i <= n; i++ {\n        sum += i\n    }\n    return sum\n}\n\nfunc main() {\n    fmt.Println(sumToN(5)) // 15\n}',
    explanation:
      "**Dry run with n=5:**\n- `sum` starts at 0.\n- `i=1`: `i≤5` true → `sum=1`; i becomes 2.\n- `i=2`: true → `sum=3`; i=3.\n- `i=3`: `sum=6`; i=4.\n- `i=4`: `sum=10`; i=5.\n- `i=5`: `sum=15`; i=6.\n- `i=6`: condition false, loop exits. Returns 15.",
    hint: "Initialize sum to 0. Use `i <= n` as the condition.",
  },
  {
    id: "go-while-loop",
    type: "implementation",
    topic: "Go Basics",
    title: "Emulate a while loop (factorial)",
    prompt:
      "Write a function `factorial(n int) int` that returns `n!` using a while‑style loop ( `for condition { }` ).\n\n**Examples:**\n- Input: `4` → Output: `24` (4×3×2×1)\n- Input: `0` → Output: `1` (by definition)",
    starter:
      'package main\n\nimport "fmt"\n\nfunc factorial(n int) int {\n    // your code\n}\n\nfunc main() {\n    fmt.Println(factorial(4))\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc factorial(n int) int {\n    result := 1\n    // While n > 0: multiply result by n, then decrement n\n    for n > 0 {\n        result *= n\n        n--\n    }\n    return result\n}\n\nfunc main() {\n    fmt.Println(factorial(4)) // 24\n}',
    explanation:
      "**Dry run with n=4:**\n- `result=1`\n- Loop 1: `4>0` → `result=1*4=4`, `n=3`\n- Loop 2: `3>0` → `result=4*3=12`, `n=2`\n- Loop 3: `2>0` → `result=12*2=24`, `n=1`\n- Loop 4: `1>0` → `result=24*1=24`, `n=0`\n- Loop ends (0>0 false). Return 24.\nThe function modifies the input parameter `n`; this is fine because `n` is a copy (pass by value).",
    hint: "Use `for n > 0` and decrement `n` inside the loop.",
  },
  {
    id: "go-range-slice",
    type: "implementation",
    topic: "Go Basics",
    title: "Use range with slice",
    prompt:
      "Write a function `sumSlice(nums []int) int` that returns the sum of all elements using `range`.\n\n**Examples:**\n- Input: `[1,2,3,4]` → Output: `10`\n- Input: `[]` → Output: `0`",
    starter:
      'package main\n\nimport "fmt"\n\nfunc sumSlice(nums []int) int {\n    // your code\n}\n\nfunc main() {\n    fmt.Println(sumSlice([]int{1, 2, 3, 4}))\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc sumSlice(nums []int) int {\n    sum := 0\n    // range returns (index, value). We ignore the index with _\n    for _, v := range nums {\n        sum += v\n    }\n    return sum\n}\n\nfunc main() {\n    fmt.Println(sumSlice([]int{1, 2, 3, 4})) // 10\n}',
    explanation:
      "**Dry run with nums = [1,2,3,4]:**\n- `sum=0`\n- First iteration: `_ = 0`, `v = 1` → `sum=1`\n- Second: `_ = 1`, `v = 2` → `sum=3`\n- Third: `v=3` → `sum=6`\n- Fourth: `v=4` → `sum=10`\n- Return 10.\nUsing `_` discards the index because we don't need it.",
    hint: "Use `for _, v := range nums` and add `v` to the sum.",
  },
  {
    id: "go-function-multi-return",
    type: "implementation",
    topic: "Go Basics",
    title: "Multiple return values and error handling",
    prompt:
      'Write a function `divide(a, b float64) (float64, error)` that returns the quotient and an error if `b` is zero. Use `errors.New`.\n\n**Examples:**\n- Input: `(10, 2)` → Output: `5, nil`\n- Input: `(10, 0)` → Output: `0, error("division by zero")`',
    starter:
      'package main\n\nimport (\n    "errors"\n    "fmt"\n)\n\nfunc divide(a, b float64) (float64, error) {\n    // your code\n}\n\nfunc main() {\n    res, err := divide(10, 0)\n    fmt.Println(res, err)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "errors"\n    "fmt"\n)\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        // Return 0 and a descriptive error\n        return 0, errors.New("division by zero")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    result, err := divide(10, 2)\n    if err != nil {\n        fmt.Println("Error:", err)\n    } else {\n        fmt.Println("Result:", result)\n    }\n}',
    explanation:
      "**Dry run for (10,2):** `b != 0` → returns `10/2 = 5` and `nil` error. For (10,0): condition triggers, returns `0` and an error object. In Go, it is idiomatic to return the error as the last value and check it immediately.",
    hint: "Check `b == 0` and return an error with `errors.New`.",
  },
  {
    id: "go-slice-append",
    type: "implementation",
    topic: "Go Basics",
    title: "Append to slice and remove element",
    prompt:
      "Write a function `removeAtIndex(slice []int, idx int) []int` that returns a **new** slice with the element at position `idx` removed. Do not modify the original slice.\n\n**Examples:**\n- Input: `([1,2,3,4], 1)` → Output: `[1,3,4]`\n- Input: `([5,6], 0)` → Output: `[6]`",
    starter:
      'package main\n\nimport "fmt"\n\nfunc removeAtIndex(slice []int, idx int) []int {\n    // your code\n}\n\nfunc main() {\n    original := []int{1, 2, 3, 4}\n    fmt.Println(removeAtIndex(original, 1))\n    fmt.Println(original) // should remain unchanged\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc removeAtIndex(slice []int, idx int) []int {\n    // Create a new slice with enough capacity (len-1)\n    result := make([]int, 0, len(slice)-1)\n    // Append elements before idx\n    result = append(result, slice[:idx]...)\n    // Append elements after idx\n    result = append(result, slice[idx+1:]...)\n    return result\n}\n\nfunc main() {\n    original := []int{1, 2, 3, 4}\n    fmt.Println(removeAtIndex(original, 1)) // [1 3 4]\n    fmt.Println(original)                  // [1 2 3 4] unchanged\n}',
    explanation:
      "**Dry run with slice=[1,2,3,4], idx=1:**\n- `slice[:1]` is `[1]`; `slice[2:]` is `[3,4]`.\n- `append` first adds `1`, then adds `3,4`.\n- Result is `[1,3,4]`. The original slice is untouched because we never modify it directly.\nThe `...` operator unpacks the slice elements into individual arguments to `append`.",
    hint: "Use `append(slice[:idx], slice[idx+1:]...)` to create a new slice. But careful: the first argument to `append` would be a slice of the original, which could still share memory. Safer: allocate a new slice with `make`.",
  },
  {
    id: "go-map-wordcount",
    type: "implementation",
    topic: "Go Basics",
    title: "Word count using map",
    prompt:
      'Write a function `wordCount(s string) map[string]int` that returns a map of word frequencies. Words are separated by spaces. Use `strings.Fields`.\n\n**Example:**\n- Input: `"hello world hello"` → Output: `map[hello:2 world:1]`',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "strings"\n)\n\nfunc wordCount(s string) map[string]int {\n    // your code\n}\n\nfunc main() {\n    fmt.Println(wordCount("hello world hello"))\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "strings"\n)\n\nfunc wordCount(s string) map[string]int {\n    // Split string into slice of words\n    words := strings.Fields(s)\n    // Create a map to hold counts\n    freq := make(map[string]int)\n    for _, w := range words {\n        freq[w]++ // zero value for int is 0, so ++ works\n    }\n    return freq\n}\n\nfunc main() {\n    fmt.Println(wordCount("hello world hello")) // map[hello:2 world:1]\n}',
    explanation:
      '**Dry run:** `strings.Fields("hello world hello")` → `["hello", "world", "hello"]`. Loop:\n- w="hello": `freq["hello"]` initially 0 → becomes 1\n- w="world": `freq["world"]` becomes 1\n- w="hello": `freq["hello"]` from 1 → 2\n- Return map with counts.',
    hint: "Use `strings.Fields` to split. Accessing a map entry returns the zero value if not present, so you can increment directly.",
  },
  {
    id: "go-struct-method",
    type: "implementation",
    topic: "Go Basics",
    title: "Define struct and method",
    prompt:
      "Define a `Rectangle` struct with fields `Width` and `Height` (float64). Add a method `Area() float64` that returns the area. Write a function `printArea(r Rectangle)` that prints the area.\n\n**Example:**\n- `Rectangle{3, 4}` → prints `Area: 12.00`",
    starter:
      'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n    Width  float64\n    Height float64\n}\n\n// Method Area\nfunc (r Rectangle) Area() float64 {\n    // your code\n}\n\nfunc printArea(r Rectangle) {\n    // your code\n}\n\nfunc main() {\n    printArea(Rectangle{3, 4})\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n    Width  float64\n    Height float64\n}\n\n// Area method with value receiver (does not modify original)\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc printArea(r Rectangle) {\n    fmt.Printf("Area: %.2f\\n", r.Area())\n}\n\nfunc main() {\n    printArea(Rectangle{3, 4}) // Area: 12.00\n}',
    explanation:
      "**Flow:** 1. `printArea` is called with `Rectangle{3,4}`. 2. Inside `printArea`, `r.Area()` invokes the method. 3. The method multiplies `r.Width` and `r.Height` (3*4=12) and returns 12. 4. `fmt.Printf` formats it as `12.00`. The receiver `r` is a copy (value receiver), so the method cannot modify the original struct.",
    hint: "Define the method with `func (r Rectangle) Area() float64`. Use `%f` in `Printf` to format floats.",
  },
  {
    id: "go-pointers",
    type: "implementation",
    topic: "Go Basics",
    title: "Use pointers to modify value",
    prompt:
      "Write a function `increment(ptr *int)` that increments the value pointed to by `ptr` by 1. Test it with `x := 5; increment(&x); fmt.Println(x)`.\n\n**Example:**\n- `x` starts at 5 → after `increment(&x)`, `x` becomes 6.",
    starter:
      'package main\n\nimport "fmt"\n\nfunc increment(ptr *int) {\n    // your code\n}\n\nfunc main() {\n    x := 5\n    increment(&x)\n    fmt.Println(x)\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc increment(ptr *int) {\n    // Dereference the pointer to access the underlying value, then increment\n    *ptr++\n}\n\nfunc main() {\n    x := 5\n    increment(&x) // pass memory address of x\n    fmt.Println(x) // 6\n}',
    explanation:
      "**Dry run:** `x` is stored at memory address `0xc000...`. `&x` gives that address. `ptr` receives the address. `*ptr` reads the value at that address (5). `*ptr++` writes 6 back to the same address. After the function returns, `x` reflects the new value.",
    hint: "Use `*ptr` to dereference the pointer. Use `&` to get the address of a variable.",
  },
  {
    id: "go-defer-cleanup",
    type: "implementation",
    topic: "Go Basics",
    title: "Use defer to close a file",
    prompt:
      'Write a function `writeFile(filename, content string) error` that creates the file, writes `content` to it, and ensures the file is closed using `defer`. Return any error that occurs.\n\n**Example:**\n`writeFile("test.txt", "hello")` should create a file with content "hello" and close it.',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc writeFile(filename, content string) error {\n    // your code\n}\n\nfunc main() {\n    err := writeFile("test.txt", "hello")\n    if err != nil {\n        fmt.Println(err)\n    }\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc writeFile(filename, content string) error {\n    // Create file (or truncate if exists)\n    f, err := os.Create(filename)\n    if err != nil {\n        return err\n    }\n    // Defer the Close call – runs even if later code fails\n    defer f.Close()\n    // Write the content as a byte slice\n    _, err = f.WriteString(content)\n    if err != nil {\n        return err\n    }\n    // Flush to disk (optional, WriteString usually does)\n    return nil\n}\n\nfunc main() {\n    err := writeFile("test.txt", "hello")\n    if err != nil {\n        fmt.Println(err)\n    }\n}',
    explanation:
      "**Flow:** 1. `os.Create` opens/creates the file. If error, return it. 2. `defer f.Close()` schedules the file to be closed when the function returns – regardless of whether later code succeeds or panics. 3. `f.WriteString` writes the content. 4. If write fails, the function returns the error, but `Close` still runs. This prevents resource leaks.",
    hint: "Always defer `Close()` right after opening a file to avoid forgetting.",
  },
  {
    id: "go-panic-recover",
    type: "implementation",
    topic: "Go Basics",
    title: "Recover from a panic",
    prompt:
      'Write a function `safeDivide(a, b int) (result int, err error)` that recovers from a panic (e.g., division by zero panic) and returns an error instead. Use `defer` and `recover`.\n\n**Example:**\n- `safeDivide(5, 0)` → returns `0, error("panic: runtime error: integer divide by zero")`',
    starter:
      'package main\n\nimport (\n    "fmt"\n)\n\nfunc safeDivide(a, b int) (result int, err error) {\n    // your code\n}\n\nfunc main() {\n    fmt.Println(safeDivide(5, 0))\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n)\n\nfunc safeDivide(a, b int) (result int, err error) {\n    // Defer a function that checks for panic and converts to error\n    defer func() {\n        if r := recover(); r != nil {\n            err = fmt.Errorf("panic: %v", r)\n        }\n    }()\n    // This line may panic if b == 0\n    result = a / b\n    return result, nil\n}\n\nfunc main() {\n    fmt.Println(safeDivide(5, 0)) // 0, error\n}',
    explanation:
      "**Dry run with b=0:** 1. The deferred anonymous function is set up. 2. `a / b` panics because of integer division by zero. 3. The normal execution stops, and the deferred function runs. 4. `recover()` catches the panic value (e.g., a runtime error). 5. We assign `err = fmt.Errorf(...)`. 6. The deferred function ends, and the outer function returns (result is still its zero value, 0) with the error. The caller receives an error instead of a crash.",
    hint: "Place `defer func() { if r := recover(); r != nil { ... } }()` before the code that may panic. Use `recover` only inside deferred functions.",
  },
  {
    id: "go-interfaces",
    type: "implementation",
    topic: "Go Basics",
    title: "Implement an interface",
    prompt:
      "Define an interface `Shape` with method `Area() float64`. Implement it for `Circle` (radius) and `Rectangle` (width, height). Write a function `printArea(s Shape)` that prints the area.\n\n**Example:**\n- `Circle{5}` → `Area: 78.54`\n- `Rectangle{3,4}` → `Area: 12.00`",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "math"\n)\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Circle struct{ Radius float64 }\n// Implement Area for Circle\n\ntype Rectangle struct{ Width, Height float64 }\n// Implement Area for Rectangle\n\nfunc printArea(s Shape) {\n    // your code\n}\n\nfunc main() {\n    c := Circle{5}\n    r := Rectangle{3, 4}\n    printArea(c)\n    printArea(r)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "math"\n)\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Circle struct{ Radius float64 }\n\n// Circle implements Shape\nfunc (c Circle) Area() float64 {\n    return math.Pi * c.Radius * c.Radius\n}\n\ntype Rectangle struct{ Width, Height float64 }\n\n// Rectangle implements Shape\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc printArea(s Shape) {\n    fmt.Printf("Area: %.2f\\n", s.Area())\n}\n\nfunc main() {\n    c := Circle{Radius: 5}\n    r := Rectangle{Width: 3, Height: 4}\n    printArea(c) // Area: 78.54\n    printArea(r) // Area: 12.00\n}',
    explanation:
      "**Flow:** 1. `Shape` interface declares `Area()` method. 2. `Circle` and `Rectangle` each define an `Area` method with the exact signature. 3. In Go, a type implicitly satisfies an interface if it implements all required methods – no explicit `implements` keyword. 4. `printArea` accepts any `Shape`; it calls the `Area` method, and the correct implementation is selected based on the concrete type. This demonstrates polymorphism.",
    hint: "Define the methods with a receiver that matches the type (value receiver is fine here). The interface is satisfied automatically.",
  },
  {
    id: "go-type-assertion-switch",
    type: "implementation",
    topic: "Go Basics",
    title: "Type assertion and type switch",
    prompt:
      'Write a function `describe(i interface{})` that prints the underlying value and its type using a type switch. Support `int`, `string`, and a default case.\n\n**Examples:**\n- Input: `42` → prints `int: 42`\n- Input: `"hello"` → prints `string: hello`\n- Input: `true` → prints `unknown type: bool`',
    starter:
      'package main\n\nimport "fmt"\n\nfunc describe(i interface{}) {\n    // your code\n}\n\nfunc main() {\n    describe(42)\n    describe("hello")\n    describe(true)\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc describe(i interface{}) {\n    // Type switch: i.(type) gives the dynamic type\n    switch v := i.(type) {\n    case int:\n        fmt.Printf("int: %d\\n", v)\n    case string:\n        fmt.Printf("string: %s\\n", v)\n    default:\n        fmt.Printf("unknown type: %T\\n", v)\n    }\n}\n\nfunc main() {\n    describe(42)       // int: 42\n    describe("hello")  // string: hello\n    describe(true)     // unknown type: bool\n}',
    explanation:
      "**Dry run:** `describe(42)` – `i` holds an `int`. The type switch checks `int` case, assigns `v` (value) and prints `int: 42`. For `true`, no case matches, so `default` prints the type using `%T` format verb. A type switch is the only place you can use `i.(type)` notation.",
    hint: "Use `switch v := i.(type) { case int: ... }`. The variable `v` holds the value as the concrete type.",
  },
  {
    id: "go-file-read",
    type: "implementation",
    topic: "Go Intermediate",
    title: "Read entire file into string",
    prompt:
      'Write a function `readFile(filename string) (string, error)` that reads the entire file and returns its content as a string. Use `os.ReadFile` (Go ≥1.16).\n\n**Example:**\nIf `test.txt` contains `"Hello world"`, `readFile("test.txt")` returns `"Hello world", nil`.\nIf the file does not exist, returns an error.',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc readFile(filename string) (string, error) {\n    // your code\n}\n\nfunc main() {\n    content, err := readFile("test.txt")\n    if err != nil {\n        fmt.Println(err)\n    } else {\n        fmt.Println(content)\n    }\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc readFile(filename string) (string, error) {\n    // ReadFile returns a byte slice and an error\n    data, err := os.ReadFile(filename)\n    if err != nil {\n        return "", err // propagate error\n    }\n    // Convert byte slice to string\n    return string(data), nil\n}\n\nfunc main() {\n    content, err := readFile("test.txt")\n    if err != nil {\n        fmt.Println(err)\n    } else {\n        fmt.Println(content)\n    }\n}',
    explanation:
      "**Flow:** `os.ReadFile` does three things: opens the file, reads all data into a byte slice, and closes the file. If any step fails (e.g., file not found), it returns a non‑nil error. We check the error and return it. On success, we convert the byte slice to a string. This is the simplest way to read an entire file in Go.",
    hint: "`os.ReadFile` is available since Go 1.16. For older versions, use `ioutil.ReadFile`.",
  },
  {
    id: "go-json-encode",
    type: "implementation",
    topic: "Go Intermediate",
    title: "Encode struct to JSON",
    prompt:
      'Define a `Person` struct with fields `Name` (string) and `Age` (int). Write a function `toJSON(p Person) (string, error)` that returns the JSON representation using `json.Marshal`.\n\n**Example:**\n`Person{"Alice", 30}` → `{"Name":"Alice","Age":30}`',
    starter:
      'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc toJSON(p Person) (string, error) {\n    // your code\n}\n\nfunc main() {\n    p := Person{Name: "Alice", Age: 30}\n    jsonStr, _ := toJSON(p)\n    fmt.Println(jsonStr)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc toJSON(p Person) (string, error) {\n    // Marshal returns a JSON byte slice\n    data, err := json.Marshal(p)\n    if err != nil {\n        return "", err\n    }\n    // Convert byte slice to string\n    return string(data), nil\n}\n\nfunc main() {\n    p := Person{Name: "Alice", Age: 30}\n    jsonStr, _ := toJSON(p)\n    fmt.Println(jsonStr) // {"Name":"Alice","Age":30}\n}',
    explanation:
      '**Flow:** `json.Marshal` examines the struct fields (they must be exported – capitalised) and produces a JSON byte slice. If the struct contains unsupported types or cycles, it returns an error. We convert the byte slice to a string. The JSON keys match the field names by default; you can override them with `json:"name"` struct tags.',
    hint: "Field names must be exported (start with capital letter) for `json.Marshal` to see them.",
  },
  {
    id: "go-json-decode",
    type: "implementation",
    topic: "Go Intermediate",
    title: "Decode JSON to struct",
    prompt:
      'Write a function `fromJSON(jsonStr string) (Person, error)` that parses a JSON string into a `Person` struct using `json.Unmarshal`.\n\n**Example:**\nInput: `{"Name":"Bob","Age":25}` → Output: `Person{Name:"Bob", Age:25}, nil`',
    starter:
      'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc fromJSON(jsonStr string) (Person, error) {\n    // your code\n}\n\nfunc main() {\n    p, err := fromJSON(`{"Name":"Bob","Age":25}`)\n    if err != nil {\n        fmt.Println(err)\n    } else {\n        fmt.Printf("%+v\\n", p)\n    }\n}',
    referenceSolution:
      'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc fromJSON(jsonStr string) (Person, error) {\n    var p Person\n    // Unmarshal parses JSON into the struct pointer\n    err := json.Unmarshal([]byte(jsonStr), &p)\n    if err != nil {\n        return p, err\n    }\n    return p, nil\n}\n\nfunc main() {\n    p, err := fromJSON(`{"Name":"Bob","Age":25}`)\n    if err != nil {\n        fmt.Println(err)\n    } else {\n        fmt.Printf("%+v\\n", p) // {Name:Bob Age:25}\n    }\n}',
    explanation:
      "**Flow:** `json.Unmarshal` expects a JSON byte slice and a pointer to the target struct. It fills the struct fields if the JSON keys match (case‑sensitive by default). If the JSON is malformed or fields mismatch, it returns an error. Because we pass `&p`, the function can modify `p` directly. After successful unmarshaling, we return the populated struct.",
    hint: "Pass the address of the struct (`&p`) so `Unmarshal` can set its fields.",
  },
  {
    id: "go-table-driven-test",
    type: "implementation",
    topic: "Go Testing",
    title: "Write a table‑driven test",
    prompt:
      "Write a test function `TestDivide` for the previous `divide` function. Use a slice of structs with inputs and expected outputs (quotient and whether error is expected). Use `t.Errorf` on failure.\n\n**Example test cases:**\n- (10,2) → quotient 5, no error\n- (10,0) → quotient 0, error expected",
    starter:
      "func TestDivide(t *testing.T) {\n    tests := []struct {\n        a, b   float64\n        want    float64\n        wantErr bool\n    }{\n        // your cases\n    }\n    for _, tt := range tests {\n        // your test logic\n    }\n}",
    referenceSolution:
      'func TestDivide(t *testing.T) {\n    tests := []struct {\n        name    string\n        a, b    float64\n        want    float64\n        wantErr bool\n    }{\n        {"divide regular", 10, 2, 5, false},\n        {"divide by zero", 10, 0, 0, true},\n    }\n    for _, tt := range tests {\n        t.Run(tt.name, func(t *testing.T) {\n            got, err := divide(tt.a, tt.b)\n            if tt.wantErr && err == nil {\n                t.Errorf("expected error but got none")\n            }\n            if !tt.wantErr && err != nil {\n                t.Errorf("unexpected error: %v", err)\n            }\n            if !tt.wantErr && got != tt.want {\n                t.Errorf("got %f, want %f", got, tt.want)\n            }\n        })\n    }\n}',
    explanation:
      "**Flow:** 1. Define a slice of anonymous structs holding test case data (including a name). 2. For each case, use `t.Run` to create a sub‑test (makes output clearer). 3. Inside the sub‑test, call `divide`. 4. Check if an error was expected: if `wantErr` is true but error is nil, fail. If `wantErr` is false but error is non‑nil, fail. 5. If no error expected, compare the result. Table‑driven tests make it easy to add more cases without duplicating code.",
    hint: "Use `t.Run` to give each test case a name and isolate failures.",
  },
  {
    id: "go-goroutine-basic",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Start a goroutine",
    prompt:
      'Write a program that launches a goroutine that prints `"Hello from goroutine"` and the main function also prints `"Hello from main"`. Use `time.Sleep` to allow the goroutine to finish before the program exits.\n\n**Example Output (order may vary):**\n```\nHello from main\nHello from goroutine\n```\nor the reverse.',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    // launch goroutine here\n    // print from main\n    // sleep\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    // Start a new goroutine\n    go func() {\n        fmt.Println("Hello from goroutine")\n    }()\n\n    fmt.Println("Hello from main")\n\n    // Give the goroutine time to execute before main ends\n    time.Sleep(10 * time.Millisecond)\n}',
    explanation:
      '**Flow:** `go func() { ... }()` launches an anonymous function concurrently. The main function continues immediately and prints `"Hello from main"`. Without `time.Sleep`, the program might exit before the goroutine runs. `time.Sleep` gives the scheduler a chance to run the goroutine. In real code, we would use a `sync.WaitGroup` instead of a sleep, but this demonstrates the concept.',
    hint: "Use `go` keyword to start a goroutine. A small `time.Sleep` ensures the goroutine executes before main exits.",
  },
];
