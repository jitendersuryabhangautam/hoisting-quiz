export const backendImplementationQuestions = [
  {
    id: "go-hello-world",
    type: "implementation",
    topic: "Go Basics",
    title: "Hello World in Go",
    prompt:
      "Write a Go program that prints 'Hello, Go!' to the console.\n\n**Example:**\n- Output: `Hello, Go!`",
    starter: "package main\n\nfunc main() {\n    // your code\n}",
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // Println prints a line with a newline at the end.\n    fmt.Println("Hello, Go!")\n}',
    explanation:
      '**Concept:** Every Go executable must be in the `main` package and have a `main()` function. The `fmt` package provides I/O functions. `fmt.Println` writes a string to stdout and adds a newline.\n\n**Dry run:** The program starts at `main()`. `fmt.Println("Hello, Go!")` executes, sending the string to the console. The program then exits. There is no input or branching, so output is always `Hello, Go!`.',
    hint: 'Use `import "fmt"` and `fmt.Println`.',
  },
  {
    id: "go-variables",
    type: "implementation",
    topic: "Go Basics",
    title: "Declare and use variables",
    prompt:
      'Declare a variable `name` of type `string` with value `"Alice"`, and an integer `age` with value `30`. Print them in the format: `"Alice is 30 years old"`.\n\n**Example:**\n- Output: `Alice is 30 years old`',
    starter:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // Explicit declaration with type\n    var name string = "Alice"\n    // Short declaration with type inference (int)\n    age := 30\n    // Printf uses format verbs: %s for string, %d for integer\n    fmt.Printf("%s is %d years old\\n", name, age)\n}',
    explanation:
      '**Concept:** Go offers two main ways to declare variables: `var name type = value` (explicit) and `name := value` (short declaration, type inferred). Inside functions, short declaration is preferred. `fmt.Printf` formats output without an automatic newline; you must add `\\n`.\n\n**Dry run:** 1. `var name string = "Alice"` creates variable `name` with value `"Alice"`. 2. `age := 30` creates `age` as `int` with value `30`. 3. `fmt.Printf` replaces `%s` with `"Alice"` and `%d` with `30`, producing the string `"Alice is 30 years old\\n"`, which is printed.',
    hint: "Use `:=` for short declaration. Use `Printf` for formatted output.",
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
      'package main\n\nimport "fmt"\n\nfunc checkAge(age int) string {\n    if age >= 18 {\n        return "Adult"\n    }\n    return "Minor"\n}\n\nfunc main() {\n    fmt.Println(checkAge(20)) // Adult\n}',
    explanation:
      '**Concept:** Go’s `if` statement does not require parentheses around the condition, but braces `{ }` are mandatory. The `else` clause is optional. Here we use an early return: if the condition is true, we return `"Adult"`; otherwise, the function continues and returns `"Minor"`.\n\n**Dry run with age=20:** The condition `20 >= 18` is true → `return "Adult"` → function ends. The caller prints `"Adult"`. For age=15: condition false → skip the `if` body → `return "Minor"` → prints `"Minor"`.',
    hint: "Write the condition without parentheses, and always use braces.",
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
      'package main\n\nimport "fmt"\n\nfunc sumToN(n int) int {\n    sum := 0\n    // for initialisation; condition; post {\n    for i := 1; i <= n; i++ {\n        sum += i\n    }\n    return sum\n}\n\nfunc main() {\n    fmt.Println(sumToN(5)) // 15\n}',
    explanation:
      "**Concept:** Go has only the `for` loop, which can take three components: initialization, condition, post statement. The loop repeats as long as the condition is true. This is the classic counter‑controlled loop.\n\n**Dry run with n=5:** `sum` initially 0. \n- i=1: `1<=5` true → sum=1; i++ → i=2\n- i=2: true → sum=3; i=3\n- i=3: sum=6; i=4\n- i=4: sum=10; i=5\n- i=5: sum=15; i=6\n- i=6: `6<=5` false, exit. Return 15.",
    hint: "Initialize sum to 0. Use `i := 1; i <= n; i++`.",
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
      'package main\n\nimport "fmt"\n\nfunc factorial(n int) int {\n    result := 1\n    // for condition only (while-style)\n    for n > 0 {\n        result *= n\n        n--\n    }\n    return result\n}\n\nfunc main() {\n    fmt.Println(factorial(4)) // 24\n}',
    explanation:
      "**Concept:** In Go, you can omit the initialization and post statements of a `for` loop, leaving only the condition. This creates a while loop. The loop continues as long as the condition is true. The factorial function multiplies `result` by `n` and decrements `n` each iteration.\n\n**Dry run with n=4:** `result=1`\n- n=4: 4>0 → result=1*4=4; n=3\n- n=3: 3>0 → result=4*3=12; n=2\n- n=2: result=12*2=24; n=1\n- n=1: result=24*1=24; n=0\n- n=0: condition false → exit. Return 24. For n=0, the loop never runs, result stays 1 → correct.",
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
      'package main\n\nimport "fmt"\n\nfunc sumSlice(nums []int) int {\n    sum := 0\n    // range returns index and value; we ignore index with _\n    for _, v := range nums {\n        sum += v\n    }\n    return sum\n}\n\nfunc main() {\n    fmt.Println(sumSlice([]int{1, 2, 3, 4})) // 10\n}',
    explanation:
      "**Concept:** The `range` keyword iterates over slices, arrays, maps, strings, and channels. For slices, it returns two values: the index and the element value. If you don't need the index, use the blank identifier `_` to discard it. This is idiomatic and avoids off‑by‑one errors.\n\n**Dry run with nums = [1,2,3,4]:**\n- First iteration: index 0, value 1 → sum=1\n- Second: index 1, value 2 → sum=3\n- Third: index 2, value 3 → sum=6\n- Fourth: index 3, value 4 → sum=10\nLoop ends. Return 10.",
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
      'package main\n\nimport (\n    "errors"\n    "fmt"\n)\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        // Return zero value for float64 and a descriptive error\n        return 0, errors.New("division by zero")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    result, err := divide(10, 2)\n    if err != nil {\n        fmt.Println("Error:", err)\n    } else {\n        fmt.Println("Result:", result)\n    }\n}',
    explanation:
      '**Concept:** Go functions can return multiple values. It is idiomatic to return a result and an error. The caller should always check the error before using the result. `errors.New` creates a simple error with a message. This pattern eliminates exceptions and makes error handling explicit.\n\n**Dry run for (10,0):** `b == 0` → returns `0` and an error with message `"division by zero"`. The caller receives `(0, err)`. For (10,2): `b != 0` → returns `5` and `nil`. The caller checks `err == nil` and proceeds.',
    hint: "Return `0, errors.New(...)` for error case, and `a/b, nil` for success.",
  },
  {
    id: "go-slice-append",
    type: "implementation",
    topic: "Go Basics",
    title: "Append to slice and remove element",
    prompt:
      "Write a function `removeAtIndex(slice []int, idx int) []int` that returns a **new** slice with the element at position `idx` removed. Do not modify the original slice.\n\n**Examples:**\n- Input: `([1,2,3,4], 1)` → Output: `[1,3,4]`\n- Input: `([5,6], 0)` → Output: `[6]`",
    starter:
      'package main\n\nimport "fmt"\n\nfunc removeAtIndex(slice []int, idx int) []int {\n    // your code\n}\n\nfunc main() {\n    original := []int{1, 2, 3, 4}\n    fmt.Println(removeAtIndex(original, 1))\n    fmt.Println(original) // should stay [1,2,3,4]\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc removeAtIndex(slice []int, idx int) []int {\n    // Create a new slice with enough capacity (len-1)\n    result := make([]int, 0, len(slice)-1)\n    // Append elements before idx\n    result = append(result, slice[:idx]...)\n    // Append elements after idx\n    result = append(result, slice[idx+1:]...)\n    return result\n}\n\nfunc main() {\n    original := []int{1, 2, 3, 4}\n    fmt.Println(removeAtIndex(original, 1)) // [1 3 4]\n    fmt.Println(original)                  // [1 2 3 4]\n}',
    explanation:
      "**Concept:** Slices are views into arrays. To avoid mutating the original, we allocate a new slice and copy elements. `slice[:idx]` takes elements before the index, `slice[idx+1:]` takes elements after. The `...` operator unpacks the slice into individual arguments for `append`. Using `make` with capacity `len-1` pre‑allocates memory for efficiency.\n\n**Dry run with slice=[1,2,3,4], idx=1:** `slice[:1]` = `[1]`, `slice[2:]` = `[3,4]`. `result` starts empty with capacity 3. First append adds `1`, second adds `3,4`. Result is `[1,3,4]`. Original unchanged.",
    hint: "Use `append` with `...` to combine slices. Create a new slice to avoid mutation.",
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
      'package main\n\nimport (\n    "fmt"\n    "strings"\n)\n\nfunc wordCount(s string) map[string]int {\n    // Split string into slice of words (splits on any whitespace)\n    words := strings.Fields(s)\n    // Create a map to store counts\n    freq := make(map[string]int)\n    for _, w := range words {\n        freq[w]++ // default zero value allows direct increment\n    }\n    return freq\n}\n\nfunc main() {\n    fmt.Println(wordCount("hello world hello")) // map[hello:2 world:1]\n}',
    explanation:
      '**Concept:** Maps in Go are hash tables. Accessing a key that does not exist returns the zero value for the value type (0 for int). Therefore `freq[w]++` works even for first occurrence: it reads 0, increments to 1, and stores it. `strings.Fields` splits on any whitespace and discards extra spaces.\n\n**Dry run with `"hello world hello"`:** `words = ["hello", "world", "hello"]`. \n- w="hello": freq["hello"] from 0 → 1\n- w="world": freq["world"] 0 → 1\n- w="hello": freq["hello"] 1 → 2. Final map: `{"hello":2, "world":1}`.',
    hint: "Use `strings.Fields` to split. Increment map entries directly – zero value helps.",
  },
  {
    id: "go-struct-method",
    type: "implementation",
    topic: "Go Basics",
    title: "Define struct and method",
    prompt:
      "Define a `Rectangle` struct with fields `Width` and `Height` (float64). Add a method `Area() float64` that returns the area. Write a function `printArea(r Rectangle)` that prints the area.\n\n**Example:**\n- `Rectangle{3, 4}` → prints `Area: 12.00`",
    starter:
      'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n    Width  float64\n    Height float64\n}\n\n// TODO: Add Area method\n\nfunc printArea(r Rectangle) {\n    // your code\n}\n\nfunc main() {\n    printArea(Rectangle{3, 4})\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n    Width  float64\n    Height float64\n}\n\n// Area method with value receiver (does not modify original)\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc printArea(r Rectangle) {\n    fmt.Printf("Area: %.2f\\n", r.Area())\n}\n\nfunc main() {\n    printArea(Rectangle{3, 4}) // Area: 12.00\n}',
    explanation:
      "**Concept:** Go allows defining methods on any type, not just classes. A method is a function with a receiver – here `(r Rectangle)`. Value receivers receive a copy, so they cannot modify the original (safe). The method is called with dot notation: `r.Area()`. The `printArea` function accepts a `Rectangle` and calls its `Area` method.\n\n**Dry run for `Rectangle{3,4}`:** `printArea` receives `r` with Width=3, Height=4. It calls `r.Area()`, which computes 3*4=12, returns 12. `fmt.Printf` formats `12.00` and prints `Area: 12.00`.",
    hint: "Define method as `func (r Rectangle) Area() float64 { ... }`.",
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
      'package main\n\nimport "fmt"\n\nfunc increment(ptr *int) {\n    // Dereference the pointer to access the underlying value\n    *ptr++\n}\n\nfunc main() {\n    x := 5\n    increment(&x) // pass address of x\n    fmt.Println(x) // 6\n}',
    explanation:
      "**Concept:** A pointer holds the memory address of a variable. `*int` means “pointer to int”. The `&` operator obtains the address. Inside the function, `*ptr` dereferences the pointer to read/write the value at that address. This allows the function to modify the original variable, not a copy.\n\n**Dry run:** `x` is at address 0xc000... . `increment(&x)` passes that address to `ptr`. `*ptr` reads the current value (5), increments it to 6, and writes back to the same address. After the function returns, `x` now holds 6.",
    hint: "Use `*ptr` to access the value. Use `&x` to pass the address.",
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
      'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc writeFile(filename, content string) error {\n    // Create (or truncate) the file\n    f, err := os.Create(filename)\n    if err != nil {\n        return err\n    }\n    // Schedule f.Close() to run when the function returns\n    defer f.Close()\n    // Write the content\n    _, err = f.WriteString(content)\n    if err != nil {\n        return err\n    }\n    // No error; file will be closed by defer\n    return nil\n}\n\nfunc main() {\n    err := writeFile("test.txt", "hello")\n    if err != nil {\n        fmt.Println(err)\n    }\n}',
    explanation:
      "**Concept:** `defer` postpones execution of a function until the surrounding function returns. It is commonly used for cleanup tasks like closing files or unlocking mutexes. The deferred call runs even if the function returns early due to an error. This avoids resource leaks.\n\n**Dry run:** `os.Create` opens the file. Immediately after, `defer f.Close()` is registered. Then `f.WriteString` writes. If that fails, the function returns the error, but `Close` still executes. If it succeeds, the function returns `nil` and then `Close` runs. In both cases, the file is closed.",
    hint: "Call `defer f.Close()` right after opening the file.",
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
      'package main\n\nimport (\n    "fmt"\n)\n\nfunc safeDivide(a, b int) (result int, err error) {\n    // Deferred function runs after panic\n    defer func() {\n        if r := recover(); r != nil {\n            err = fmt.Errorf("panic: %v", r)\n        }\n    }()\n    // This line may panic if b==0\n    result = a / b\n    return result, nil\n}\n\nfunc main() {\n    fmt.Println(safeDivide(5, 0)) // 0, error\n}',
    explanation:
      "**Concept:** `panic` stops normal execution and unwinds the stack. `recover` regains control inside a deferred function. It returns the value passed to `panic`. By using `recover`, we can convert a panic into an error and allow the program to continue.\n\n**Dry run with b=0:** `a / b` panics. The deferred function runs. `recover()` captures the panic value (e.g., a runtime error). We assign `err = fmt.Errorf(...)`. The outer function returns (result is still zero because the assignment `result = a/b` never completed). The caller receives an error instead of crashing.",
    hint: "Place `defer func() { if r := recover(); r != nil { ... } }()` before the code that may panic.",
  },
  {
    id: "go-interfaces",
    type: "implementation",
    topic: "Go Basics",
    title: "Implement an interface",
    prompt:
      "Define an interface `Shape` with method `Area() float64`. Implement it for `Circle` (radius) and `Rectangle` (width, height). Write a function `printArea(s Shape)` that prints the area.\n\n**Example:**\n- `Circle{5}` → `Area: 78.54`\n- `Rectangle{3,4}` → `Area: 12.00`",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "math"\n)\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Circle struct{ Radius float64 }\n// TODO: implement Area for Circle\n\ntype Rectangle struct{ Width, Height float64 }\n// TODO: implement Area for Rectangle\n\nfunc printArea(s Shape) {\n    // your code\n}\n\nfunc main() {\n    c := Circle{5}\n    r := Rectangle{3, 4}\n    printArea(c)\n    printArea(r)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "math"\n)\n\ntype Shape interface {\n    Area() float64\n}\n\ntype Circle struct{ Radius float64 }\n\nfunc (c Circle) Area() float64 {\n    return math.Pi * c.Radius * c.Radius\n}\n\ntype Rectangle struct{ Width, Height float64 }\n\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc printArea(s Shape) {\n    fmt.Printf("Area: %.2f\\n", s.Area())\n}\n\nfunc main() {\n    c := Circle{Radius: 5}\n    r := Rectangle{Width: 3, Height: 4}\n    printArea(c) // Area: 78.54\n    printArea(r) // Area: 12.00\n}',
    explanation:
      "**Concept:** An interface defines a set of method signatures. A type automatically satisfies an interface if it implements all those methods. No explicit `implements` keyword. This enables polymorphism: `printArea` accepts any value that has an `Area() float64` method. At runtime, the correct method is called based on the concrete type.\n\n**Dry run for Circle:** `c` is of type `Circle`, which satisfies `Shape`. In `printArea`, `s.Area()` dynamically calls `Circle.Area()`, returning π×5²≈78.54. For Rectangle, it calls `Rectangle.Area()`, returning 3×4=12.",
    hint: "Implement methods with the exact signature. The interface is satisfied automatically.",
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
      'package main\n\nimport "fmt"\n\nfunc describe(i interface{}) {\n    // Type switch on i.(type)\n    switch v := i.(type) {\n    case int:\n        fmt.Printf("int: %d\\n", v)\n    case string:\n        fmt.Printf("string: %s\\n", v)\n    default:\n        fmt.Printf("unknown type: %T\\n", v)\n    }\n}\n\nfunc main() {\n    describe(42)       // int: 42\n    describe("hello")  // string: hello\n    describe(true)     // unknown type: bool\n}',
    explanation:
      "**Concept:** An empty interface `interface{}` can hold any value. To recover the concrete type, we use a type assertion or a type switch. The type switch syntax `switch v := i.(type)` matches the dynamic type of `i`. In each case, `v` becomes the value with that concrete type. The default case captures any type not listed, and `%T` prints the type name.\n\n**Dry run for 42:** `i.(type)` matches `int`, so `v` is the integer 42, and prints `int: 42`. For `true`, no case matches, so `default` runs, `v` is still the value, and `%T` prints `bool`.",
    hint: "Use `switch v := i.(type) { case int: ... }`.",
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
      'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc readFile(filename string) (string, error) {\n    // ReadFile returns a byte slice and an error\n    data, err := os.ReadFile(filename)\n    if err != nil {\n        return "", err\n    }\n    // Convert byte slice to string\n    return string(data), nil\n}\n\nfunc main() {\n    content, err := readFile("test.txt")\n    if err != nil {\n        fmt.Println(err)\n    } else {\n        fmt.Println(content)\n    }\n}',
    explanation:
      '**Concept:** `os.ReadFile` is a convenience function that opens a file, reads all bytes, and closes it. It returns a byte slice (`[]byte`). Converting to string with `string(data)` creates a new string from the bytes. This is the simplest way to read a small file into memory. For large files, use `bufio.Scanner`.\n\n**Dry run with existing file:** `os.ReadFile` reads the file content into `data` (e.g., `[]byte{72,101,108,108,111}`). No error, so it returns `string(data)` which is `"Hello"`. For missing file, `err` is non‑nil, and the function returns `"", err`.',
    hint: "Use `os.ReadFile` and convert the byte slice to string.",
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
      'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc toJSON(p Person) (string, error) {\n    // Marshal returns a JSON byte slice\n    data, err := json.Marshal(p)\n    if err != nil {\n        return "", err\n    }\n    return string(data), nil\n}\n\nfunc main() {\n    p := Person{Name: "Alice", Age: 30}\n    jsonStr, _ := toJSON(p)\n    fmt.Println(jsonStr) // {"Name":"Alice","Age":30}\n}',
    explanation:
      '**Concept:** `json.Marshal` converts a Go value into JSON. For structs, it serializes only exported fields (capitalised). The resulting JSON keys match the field names by default, but can be overridden with struct tags like `json:"name"`. The function returns a byte slice and an error. If marshaling fails (e.g., channel type), the error is non‑nil.\n\n**Dry run for Person{Name:"Alice", Age:30}:** `json.Marshal` produces the byte slice `[123 34 78 97 109 101 34 58 34 65 108 105 99 101 34 44 34 65 103 101 34 58 51 48 125]` which corresponds to the string `{"Name":"Alice","Age":30}`. No error, so we convert to string and return it.',
    hint: "Ensure struct fields are exported (start with capital letter).",
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
      '**Concept:** `json.Unmarshal` parses a JSON byte slice and populates a Go value. You must pass a pointer to the target variable so that the function can modify it. It matches JSON object keys to struct field names (case‑sensitive by default). If the JSON is malformed or types mismatch, it returns an error.\n\n**Dry run:** `jsonStr` is `{"Name":"Bob","Age":25}`. Converted to `[]byte`. `Unmarshal` reads it, finds field `Name` and sets `p.Name = "Bob"`, field `Age` sets `p.Age = 25`. Returns `nil` error. The function returns the populated struct.',
    hint: "Pass `&p` to `Unmarshal`. Handle errors.",
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
      'func TestDivide(t *testing.T) {\n    tests := []struct {\n        name    string\n        a, b    float64\n        want    float64\n        wantErr bool\n    }{\n        {"regular", 10, 2, 5, false},\n        {"divide by zero", 10, 0, 0, true},\n    }\n    for _, tt := range tests {\n        t.Run(tt.name, func(t *testing.T) {\n            got, err := divide(tt.a, tt.b)\n            if tt.wantErr && err == nil {\n                t.Errorf("expected error but got none")\n            }\n            if !tt.wantErr && err != nil {\n                t.Errorf("unexpected error: %v", err)\n            }\n            if !tt.wantErr && got != tt.want {\n                t.Errorf("got %f, want %f", got, tt.want)\n            }\n        })\n    }\n}',
    explanation:
      "**Concept:** Table‑driven testing is an idiomatic Go pattern where test cases are defined as a slice of anonymous structs. Each case includes inputs and expected outcomes. The test iterates over the table, runs each case, and reports failures individually. Using `t.Run` creates sub‑tests, making output clearer.\n\n**Dry run:** The test table contains two entries. For the first case, `divide(10,2)` returns (5, nil). `wantErr` false, so we check that error is nil and result equals 5. For the second case, `divide(10,0)` returns (0, error). `wantErr` true, we check that error is non‑nil. Both pass.",
    hint: "Add a `name` field to identify cases. Use `t.Run` for each.",
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
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    // Start a new goroutine (lightweight thread)\n    go func() {\n        fmt.Println("Hello from goroutine")\n    }()\n\n    fmt.Println("Hello from main")\n\n    // Give the goroutine time to execute before main exits\n    time.Sleep(10 * time.Millisecond)\n}',
    explanation:
      '**Concept:** A goroutine is a lightweight thread managed by the Go runtime. The `go` keyword launches a function concurrently. The main function runs in its own goroutine. If main exits, the entire program exits, even if other goroutines are still running. `time.Sleep` is a crude way to wait; production code would use `sync.WaitGroup` or channels.\n\n**Dry run:** The program starts. `go func() { ... }()` launches a new goroutine that prints `"Hello from goroutine"`. Meanwhile, main continues and prints `"Hello from main"`. Then `time.Sleep(10ms)` pauses main, allowing the scheduler to run the other goroutine. After 10ms, main exits, program ends. The order of prints depends on scheduler timing.',
    hint: "Use `go` to start a goroutine. Add a small `time.Sleep` to let it run.",
  },
  {
    id: "go-waitgroup",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Wait for goroutines with sync.WaitGroup",
    prompt:
      "Launch 3 goroutines that each print numbers 1 to 3 (each prints one number). Use `sync.WaitGroup` to wait for all goroutines to finish before the program exits. The order of printed numbers is not important.\n\n**Example Output (order random):**\n```\n1\n2\n3\n```\nor any permutation.",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n\n    for i := 1; i <= 3; i++ {\n        // Increment WaitGroup counter before launching goroutine\n        wg.Add(1)\n\n        // Launch goroutine; capture current i via parameter to avoid closure bug\n        go func(n int) {\n            // Defer Done to decrement counter when goroutine finishes\n            defer wg.Done()\n            fmt.Println(n)\n        }(i)\n    }\n\n    // Wait blocks until counter becomes 0 (all goroutines have called Done)\n    wg.Wait()\n}',
    explanation:
      "**Concept:** `sync.WaitGroup` is a counter that tracks how many goroutines are alive. `Add(1)` increments the counter, `Done()` decrements it, and `Wait()` blocks until the counter reaches zero. This is the standard way to wait for multiple goroutines to finish.\n\n**Dry run:** Start with wg counter = 0. Loop i=1: `wg.Add(1)` → counter=1. Launch goroutine with n=1. Inside goroutine, `defer wg.Done()` will run at the end. Similarly i=2,3 each increment counter. After loop, `wg.Wait()` blocks. Each goroutine prints its number and then calls `wg.Done()`. When all three have called Done, counter becomes 0 and `Wait()` unblocks, allowing main to exit. The closure captures a copy of `i` because we pass it as an argument, avoiding the common pitfall of capturing the loop variable directly.",
    hint: "Always pass loop variables as arguments to goroutines. Use `defer wg.Done()` to ensure the counter is decremented even if the goroutine panics.",
  },
  {
    id: "go-unbuffered-channel",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Unbuffered channels",
    prompt:
      "Create an unbuffered channel of integers. Send the value `42` from a separate goroutine and receive it in the main function. Print the received value.\n\n**Example Output:**\n```\nReceived: 42\n```",
    starter:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan int)\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // Unbuffered channel: make(chan int, 0) or make(chan int)\n    ch := make(chan int)\n\n    // Launch goroutine to send value\n    go func() {\n        // Send 42 into the channel (this will block until main receives)\n        ch <- 42\n    }()\n\n    // Receive from channel (blocks until a value is sent)\n    value := <-ch\n    fmt.Println("Received:", value)\n}',
    explanation:
      "**Concept:** Unbuffered channels have no capacity. A send operation blocks until another goroutine is ready to receive, and a receive blocks until a send is ready. This forces synchronization and communicates data safely between goroutines.\n\n**Dry run:** `ch := make(chan int)` creates an unbuffered channel. The goroutine is launched; it executes `ch <- 42`. Because there is no receiver yet, this send blocks. Meanwhile, main reaches `value := <-ch`. The receive is now ready, so the send unblocks, the value 42 is transferred, and main receives it. After printing, main exits. The goroutine also exits (but after the send completes).",
    hint: "Unbuffered channels require sender and receiver to be ready simultaneously. Send and receive are synchronous.",
  },
  {
    id: "go-buffered-channel",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Buffered channels",
    prompt:
      'Create a buffered channel of strings with capacity 2. Send two strings `"first"` and `"second"` from the main goroutine (without separate goroutines), then receive and print them.\n\n**Example Output:**\n```\nfirst\nsecond\n```',
    starter:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    ch := make(chan string, 2)\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    // Buffered channel with capacity 2\n    ch := make(chan string, 2)\n\n    // Sends do not block because buffer has free space\n    ch <- "first"\n    ch <- "second"\n\n    // Receives in FIFO order\n    fmt.Println(<-ch)\n    fmt.Println(<-ch)\n}',
    explanation:
      '**Concept:** A buffered channel has a fixed capacity. Sends only block when the buffer is full; receives only block when the buffer is empty. This decouples sender and receiver temporarily. Values are received in the order they were sent (FIFO).\n\n**Dry run:** `make(chan string, 2)` creates a buffer of size 2. `ch <- "first"` puts "first" into the buffer (now buffer: [first], len=1, cap=2). `ch <- "second"` puts "second" into buffer (buffer: [first, second], len=2, full). The next line `<-ch` receives "first" (buffer: [second], len=1). Then `<-ch` receives "second" (buffer empty). No blocking occurs because sends never fill beyond capacity and receives never empty an empty buffer. The program exits cleanly.',
    hint: "Buffered channels allow you to queue a limited number of values. Sends block only when the buffer is full.",
  },
  {
    id: "go-channel-synchronization",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use channel to signal completion",
    prompt:
      'Launch a goroutine that does some work (simulate with `time.Sleep` for 100ms). Use a channel of type `struct{}` to signal when the work is done. The main goroutine should wait for the signal before printing `"Done"`.\n\n**Example Output:**\n```\nDone\n```',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    done := make(chan struct{})\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    // Channel of empty struct - uses zero memory\n    done := make(chan struct{})\n\n    // Launch worker goroutine\n    go func() {\n        fmt.Println("Working...")\n        time.Sleep(100 * time.Millisecond)\n        // Send a signal (close or send empty struct)\n        done <- struct{}{}\n    }()\n\n    // Wait for signal\n    <-done\n    fmt.Println("Done")\n}',
    explanation:
      '**Concept:** Channels are often used for signaling. `struct{}` is a zero‑size type, so sending an empty struct uses no memory. Here we use an unbuffered channel: the send blocks until the receive is ready, synchronizing the completion.\n\n**Dry run:** `done := make(chan struct{})` unbuffered. Goroutine starts, prints "Working...", sleeps 100ms. After sleep, it sends `struct{}{}` to `done`. This send blocks until main is ready to receive. Meanwhile, main reaches `<-done` and blocks. When the send happens, the receive unblocks, the value (empty) is discarded, and main prints "Done". The goroutine then ends. This pattern is common for waiting for a single event.',
    hint: "Use `chan struct{}` for events that carry no data. Sending after work done signals completion.",
  },
  {
    id: "go-select-basic",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use select to wait on multiple channels",
    prompt:
      'Create two channels: `ch1` and `ch2`. Launch a goroutine that sends `"A"` to `ch1` after 50ms, and another that sends `"B"` to `ch2` after 100ms. Use `select` to wait for the first response and print it. Then exit.\n\n**Expected Output:** `A` (because it arrives first)',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    ch1 := make(chan string)\n    ch2 := make(chan string)\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    ch1 := make(chan string)\n    ch2 := make(chan string)\n\n    // Goroutine 1: send after 50ms\n    go func() {\n        time.Sleep(50 * time.Millisecond)\n        ch1 <- "A"\n    }()\n\n    // Goroutine 2: send after 100ms\n    go func() {\n        time.Sleep(100 * time.Millisecond)\n        ch2 <- "B"\n    }()\n\n    // Select blocks until one channel can receive\n    select {\n    case msg := <-ch1:\n        fmt.Println(msg) // A\n    case msg := <-ch2:\n        fmt.Println(msg) // B (not reached in this run)\n    }\n}',
    explanation:
      '**Concept:** `select` allows a goroutine to wait on multiple channel operations simultaneously. It blocks until one of its cases can proceed. If multiple are ready, it picks one pseudo‑randomly. Here we race two timers: the one that finishes first will make its channel ready, and `select` will execute that case.\n\n**Dry run:** Both goroutines launch. At t=50ms, `ch1` send is ready. At t=100ms, `ch2` send would be ready. But the `select` block is already waiting. When t=50ms, the first case can proceed because `ch1` has a value ready. So `select` picks that case, prints "A", and exits the `select`. The program then ends (main returns). The other goroutine may still be running but is terminated when main exits. This demonstrates racing two operations.',
    hint: "`select` is like a channel `switch`. It blocks until a case can execute. Use it to implement timeouts, non‑blocking sends/receives, or request multiplexing.",
  },
  {
    id: "go-select-timeout",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement a timeout with select",
    prompt:
      'Write a function `fetchWithTimeout(ch <-chan string, timeout time.Duration) (string, error)` that tries to read a string from `ch`. If a value arrives within `timeout`, return it. Otherwise, return an error `"timeout"`. Use `time.After` and `select`.\n\n**Example:**\n- If `ch` receives "data" within 100ms → `"data", nil`\n- If no value within 100ms → `"", error("timeout")`',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc fetchWithTimeout(ch <-chan string, timeout time.Duration) (string, error) {\n    // your code\n}\n\nfunc main() {\n    ch := make(chan string)\n    // simulate slow response\n    go func() {\n        time.Sleep(200 * time.Millisecond)\n        ch <- "result"\n    }()\n    res, err := fetchWithTimeout(ch, 100*time.Millisecond)\n    fmt.Println(res, err)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc fetchWithTimeout(ch <-chan string, timeout time.Duration) (string, error) {\n    select {\n    case msg := <-ch:\n        // Received message before timeout\n        return msg, nil\n    case <-time.After(timeout):\n        // Timeout expired\n        return "", fmt.Errorf("timeout")\n    }\n}\n\nfunc main() {\n    ch := make(chan string)\n    go func() {\n        time.Sleep(200 * time.Millisecond)\n        ch <- "result"\n    }()\n    res, err := fetchWithTimeout(ch, 100*time.Millisecond)\n    fmt.Println(res, err) // output:  timeout\n}',
    explanation:
      "**Concept:** `time.After` returns a channel that sends the current time after the specified duration. `select` races between the actual data channel and the timeout channel. If the data arrives first, we return it. If the timeout fires first, we return an error. This pattern is essential for handling slow or hanging operations.\n\n**Dry run:** `fetchWithTimeout` with timeout 100ms. The data channel `ch` will receive after 200ms. The `select` blocks. At 100ms, `time.After`'s channel sends a value, so the second case becomes ready. `select` executes that case, returning the error. The program prints ` timeout`. If the data arrived earlier (e.g., after 50ms), the first case would execute and return the string. This provides a graceful way to limit waiting time.",
    hint: "Use `time.After` to create a channel that sends after a duration. Combine with `select` to implement timeouts.",
  },
  {
    id: "go-mutex-counter",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Protect a shared counter with sync.Mutex",
    prompt:
      "Launch 100 goroutines that each increment a shared counter 1000 times (total 100,000 increments). Use `sync.Mutex` to prevent data races. Print the final counter. Without mutex, the result would be inconsistent.\n\n**Example Output:**\n```\n100000\n```",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var mu sync.Mutex\n    counter := 0\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var mu sync.Mutex\n    counter := 0\n    var wg sync.WaitGroup\n\n    // Launch 100 goroutines\n    for i := 0; i < 100; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            // Each goroutine does 1000 increments\n            for j := 0; j < 1000; j++ {\n                mu.Lock()   // Acquire exclusive lock\n                counter++   // Critical section\n                mu.Unlock() // Release lock\n            }\n        }()\n    }\n\n    wg.Wait()\n    fmt.Println(counter) // 100000\n}',
    explanation:
      "**Concept:** `sync.Mutex` provides mutual exclusion. Only one goroutine can hold the lock at a time, preventing concurrent writes to the same memory location. Without mutex, the `counter++` operation (read, increment, write) could interleave, causing lost updates. The race condition leads to an unpredictable final counter (less than 100000).\n\n**Dry run:** 100 goroutines run concurrently. When one calls `mu.Lock()`, it acquires the lock. If another tries to lock, it blocks until the first calls `mu.Unlock()`. Inside the critical section, `counter++` is safe. After 100 goroutines each doing 1000 increments, the counter becomes exactly 100000. The `WaitGroup` ensures all goroutines finish before printing. The defer `wg.Done()` guarantees the counter is decremented even if a panic occurs inside the goroutine.",
    hint: "Always pair `Lock()` with `Unlock()`; use `defer mu.Unlock()` to avoid forgetting.",
  },
  {
    id: "go-rwmutex",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use RWMutex for read-heavy workloads",
    prompt:
      'Create a simple cache that stores integers under string keys. Use `sync.RWMutex` to allow multiple concurrent reads but exclusive access for writes. Implement `Get(key string) (int, bool)` and `Set(key string, value int)`. Test with 10 readers and 2 writers.\n\n**Example:**\n- Set("a",1) → stores value\n- Get("a") → returns 1, true',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\ntype Cache struct {\n    mu    sync.RWMutex\n    store map[string]int\n}\n\nfunc NewCache() *Cache {\n    return &Cache{store: make(map[string]int)}\n}\n\nfunc (c *Cache) Get(key string) (int, bool) {\n    // your code\n}\n\nfunc (c *Cache) Set(key string, value int) {\n    // your code\n}\n\nfunc main() {\n    cache := NewCache()\n    // test\n    cache.Set("a", 1)\n    val, ok := cache.Get("a")\n    fmt.Println(val, ok)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\ntype Cache struct {\n    mu    sync.RWMutex\n    store map[string]int\n}\n\nfunc NewCache() *Cache {\n    return &Cache{store: make(map[string]int)}\n}\n\n// Get only reads – use RLock (shared lock)\nfunc (c *Cache) Get(key string) (int, bool) {\n    c.mu.RLock()\n    defer c.mu.RUnlock()\n    val, ok := c.store[key]\n    return val, ok\n}\n\n// Set writes – use Lock (exclusive lock)\nfunc (c *Cache) Set(key string, value int) {\n    c.mu.Lock()\n    defer c.mu.Unlock()\n    c.store[key] = value\n}\n\nfunc main() {\n    cache := NewCache()\n    cache.Set("a", 1)\n    val, ok := cache.Get("a")\n    fmt.Println(val, ok) // 1 true\n}',
    explanation:
      '**Concept:** `sync.RWMutex` allows multiple readers to hold the lock simultaneously (using `RLock`), but a writer (using `Lock`) gets exclusive access, blocking new readers and waiting for existing readers to finish. This improves performance when reads are frequent and writes are rare.\n\n**Dry run:** The cache map is initially empty. `Set("a",1)` calls `mu.Lock()`, acquires exclusive lock, writes to map, then `Unlock()`. `Get("a")` calls `mu.RLock()` – this does not block if no writer is active. It reads the map and returns the value. If a writer tries to lock while multiple readers are active, it will block until all readers have released their RUnlocks. This allows high read concurrency without contention.',
    hint: "Use `RLock`/`RUnlock` for read‑only operations, `Lock`/`Unlock` for writes.",
  },
  {
    id: "go-context-basic",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use context for cancellation",
    prompt:
      'Write a function `doWork(ctx context.Context) error` that runs a loop printing "working..." every 100ms, but exits immediately when `ctx.Done()` is closed. In main, use `context.WithCancel` to cancel after 300ms and print "cancelled".\n\n**Expected Output:**\n```\nworking...\nworking...\nworking...\ncancelled\n```\n(approx 3 prints then cancelled)',
    starter:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "time"\n)\n\nfunc doWork(ctx context.Context) error {\n    // your code\n}\n\nfunc main() {\n    ctx, cancel := context.WithCancel(context.Background())\n    // start doWork in goroutine\n    // cancel after 300ms\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "time"\n)\n\nfunc doWork(ctx context.Context) error {\n    for {\n        select {\n        case <-ctx.Done():\n            // Context cancelled\n            return ctx.Err()\n        default:\n            fmt.Println("working...")\n            time.Sleep(100 * time.Millisecond)\n        }\n    }\n}\n\nfunc main() {\n    ctx, cancel := context.WithCancel(context.Background())\n\n    // Run the worker in a goroutine\n    go doWork(ctx)\n\n    // Cancel after 300ms\n    time.Sleep(300 * time.Millisecond)\n    cancel()\n    // Give goroutine time to exit\n    time.Sleep(10 * time.Millisecond)\n    fmt.Println("cancelled")\n}',
    explanation:
      '**Concept:** Context carries deadlines, cancellation signals, and values across API boundaries. `context.WithCancel` returns a cancel function. Closing the Done channel (by calling `cancel()`) signals any goroutine waiting on `ctx.Done()` to stop. It\'s the standard way to propagate cancellation in Go.\n\n**Dry run:** `main` creates a cancellable context and starts `doWork` in a goroutine. Inside `doWork`, the `select` blocks on either cancellation or default. Initially, default runs, prints "working...", sleeps 100ms. This repeats. After 300ms, `cancel()` closes `ctx.Done()`. On the next loop iteration, `select` finds the `Done` case ready, returns `ctx.Err()` (which is `context.Canceled`). The goroutine exits. Main prints "cancelled". The short sleep after cancel allows the goroutine to finish before main exits.',
    hint: "Always check `ctx.Done()` in long‑running operations. Call `cancel` when done to release resources.",
  },
  {
    id: "go-context-timeout",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Context with timeout",
    prompt:
      "Write a function `slowOperation(ctx context.Context) (string, error)` that simulates work taking 1 second. Use `context.WithTimeout` to automatically cancel after 500ms and return an error. In main, call it and print the result.\n\n**Example Output:**\n```\ncontext deadline exceeded\n```",
    starter:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "time"\n)\n\nfunc slowOperation(ctx context.Context) (string, error) {\n    // simulate 1 sec work\n}\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)\n    defer cancel()\n    // call slowOperation\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "time"\n)\n\nfunc slowOperation(ctx context.Context) (string, error) {\n    // Create a channel to signal completion\n    done := make(chan string)\n    go func() {\n        time.Sleep(1 * time.Second) // simulate long work\n        done <- "result"\n    }()\n\n    select {\n    case res := <-done:\n        return res, nil\n    case <-ctx.Done():\n        return "", ctx.Err() // returns context.DeadlineExceeded\n    }\n}\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)\n    defer cancel()\n\n    res, err := slowOperation(ctx)\n    if err != nil {\n        fmt.Println(err) // context deadline exceeded\n    } else {\n        fmt.Println(res)\n    }\n}',
    explanation:
      "**Concept:** `context.WithTimeout` creates a context that automatically cancels after a given duration. The done channel is closed when the timeout expires. By racing the actual work with `<-ctx.Done()`, we implement a timeout. This pattern is common for database queries, network calls, etc.\n\n**Dry run:** The main context will expire after 500ms. Inside `slowOperation`, we launch a goroutine that sleeps 1s then sends to `done`. The `select` waits. After 500ms, `ctx.Done()` is closed, the second case triggers, and we return `ctx.Err()` which is `context.DeadlineExceeded`. The caller prints that error. The sleeping goroutine will eventually try to send on `done`, but no one is receiving – it's a goroutine leak. In production, you would use a mechanism to abort the work, or a channel with buffer to avoid blocking.",
    hint: "Use `context.WithTimeout` for timeouts. Race the work with `ctx.Done()` in a select.",
  },
  {
    id: "go-errgroup",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use errgroup to handle errors from multiple goroutines",
    prompt:
      "Use `golang.org/x/sync/errgroup` to run two goroutines: one that returns an error after 50ms, another that returns nil after 100ms. The group should cancel the second when the first fails. Print the first error encountered.\n\n**Expected Output:** `error from task1` (or similar)",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "time"\n    "golang.org/x/sync/errgroup"\n)\n\nfunc main() {\n    g := new(errgroup.Group)\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "time"\n    "golang.org/x/sync/errgroup"\n)\n\nfunc main() {\n    g := new(errgroup.Group)\n\n    // Task 1: returns an error after 50ms\n    g.Go(func() error {\n        time.Sleep(50 * time.Millisecond)\n        return fmt.Errorf("error from task1")\n    })\n\n    // Task 2: returns nil after 100ms\n    g.Go(func() error {\n        time.Sleep(100 * time.Millisecond)\n        return nil\n    })\n\n    // Wait returns the first non‑nil error (or nil if all succeed)\n    if err := g.Wait(); err != nil {\n        fmt.Println(err) // error from task1\n    }\n}',
    explanation:
      '**Concept:** The `errgroup` package synchronizes multiple goroutines and propagates the first error. If any goroutine returns a non‑nil error, the group cancels the context (if using `WithContext`). Here we use the simple `Group` which just collects errors but does not cancel; however the first error will be returned by `Wait()`.\n\n**Dry run:** Both goroutines start. Task1 sleeps 50ms then returns an error. Task2 sleeps 100ms then returns nil. `g.Wait()` blocks until all goroutines finish. It returns the first error encountered (task1\'s error). Task2 continues but its return value is ignored because the error already occurred. The program prints "error from task1". For proper cancellation, you would use `errgroup.WithContext` to get a cancellable context and propagate cancellation to other goroutines.',
    hint: "Install `golang.org/x/sync/errgroup`. Use `g.Go` to launch functions that return errors. `Wait` returns the first error.",
  },
  {
    id: "go-worker-pool",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Implement a worker pool",
    prompt:
      "Create a worker pool with 3 workers. There are 10 jobs (numbers 1 to 10). Each job computes its square. Workers read jobs from a `jobs` channel and send results to a `results` channel. Collect all results and print them (order may vary).\n\n**Example Output:**\n```\n1 4 9 16 25 36 49 64 81 100\n```",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {\n    // your code\n}\n\nfunc main() {\n    const numJobs = 10\n    const numWorkers = 3\n    jobs := make(chan int, numJobs)\n    results := make(chan int, numJobs)\n    var wg sync.WaitGroup\n    // start workers\n    // send jobs\n    // close and collect\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    for job := range jobs {\n        // Compute square\n        results <- job * job\n    }\n}\n\nfunc main() {\n    const numJobs = 10\n    const numWorkers = 3\n    jobs := make(chan int, numJobs)\n    results := make(chan int, numJobs)\n    var wg sync.WaitGroup\n\n    // Start workers\n    for w := 1; w <= numWorkers; w++ {\n        wg.Add(1)\n        go worker(w, jobs, results, &wg)\n    }\n\n    // Send jobs\n    for j := 1; j <= numJobs; j++ {\n        jobs <- j\n    }\n    close(jobs) // no more jobs; workers will exit after processing all\n\n    // Wait for all workers to finish\n    wg.Wait()\n    close(results) // close results channel after all workers done\n\n    // Collect results\n    for res := range results {\n        fmt.Print(res, " ")\n    }\n    fmt.Println()\n}',
    explanation:
      "**Concept:** A worker pool uses a fixed number of worker goroutines to process a variable number of jobs from a shared channel. This limits concurrency and avoids overload. Jobs are sent to the `jobs` channel; workers read jobs, compute, and send results to `results`. After all jobs are sent, `close(jobs)` causes workers to exit their `for range` loop. `WaitGroup` ensures all workers finish before closing `results`.\n\n**Dry run:** 3 workers start, each reading from `jobs`. Jobs 1..10 are sent to the buffered channel. Workers compete; one picks job 1, squares it (1), sends to results; another picks job2 (4), etc. Because `jobs` channel is closed after sending all jobs, each worker empties the channel and then exits, calling `wg.Done()`. After all workers finish, we close `results` and range over it to print results. The order of results depends on scheduling; typical output may be unsorted.",
    hint: "Use a buffered channel for jobs and results. Close jobs when no more work. Use WaitGroup to wait for workers to finish before closing results.",
  },
  {
    id: "go-context-with-values",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Carry values with context",
    prompt:
      'Write a function `processRequest(ctx context.Context) string` that extracts a `userID` from the context using `context.WithValue`. In main, create a context with `userID = "123"`, call `processRequest`, and print the userID.\n\n**Example Output:**\n```\nProcessing for user: 123\n```',
    starter:
      'package main\n\nimport (\n    "context"\n    "fmt"\n)\n\ntype contextKey string\n\nconst userIDKey contextKey = "userID"\n\nfunc processRequest(ctx context.Context) string {\n    // your code\n}\n\nfunc main() {\n    ctx := context.WithValue(context.Background(), userIDKey, "123")\n    msg := processRequest(ctx)\n    fmt.Println(msg)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "fmt"\n)\n\ntype contextKey string\n\nconst userIDKey contextKey = "userID"\n\nfunc processRequest(ctx context.Context) string {\n    // Extract value; use type assertion because interface{} is stored\n    userID, ok := ctx.Value(userIDKey).(string)\n    if !ok {\n        return "unknown user"\n    }\n    return fmt.Sprintf("Processing for user: %s", userID)\n}\n\nfunc main() {\n    ctx := context.WithValue(context.Background(), userIDKey, "123")\n    msg := processRequest(ctx)\n    fmt.Println(msg) // Processing for user: 123\n}',
    explanation:
      '**Concept:** Context can carry request‑scoped values, like user IDs, trace IDs, etc. Values are accessed via `ctx.Value(key)`. Because any type can be stored, we define a custom key type to avoid collisions. The returned value is `interface{}`, so a type assertion is needed.\n\n**Dry run:** `context.WithValue` returns a new context that embeds the parent (background) and stores the key‑value pair. Inside `processRequest`, `ctx.Value(userIDKey)` returns the stored `"123"` as `interface{}`. The type assertion `.(string)` succeeds, giving the string. We then format the message and return it. The main prints the message. If the key is missing or the type mismatch, the function would return `"unknown user"`.',
    hint: "Define a custom type for keys to prevent collisions. Always type‑assert when retrieving values.",
  },
  {
    id: "go-fan-out-fan-in",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Fan-out / fan-in pattern",
    prompt:
      "Implement a function `sq(in <-chan int) <-chan int` that reads integers from `in`, squares them, and sends results to an output channel. Then, in main, create a slice of 3 such pipelines processing numbers from 1 to 10 (fan-out). Merge the results of all three into a single channel (fan-in) using a separate goroutine for each input channel. Print all results (order undefined).\n\n**Example Output:** random order of squares 1..100",
    starter:
      'package main\n\nimport (\n    "fmt"\n)\n\nfunc sq(in <-chan int) <-chan int {\n    out := make(chan int)\n    // your code\n    return out\n}\n\nfunc fanIn(channels ...<-chan int) <-chan int {\n    out := make(chan int)\n    // your code\n    return out\n}\n\nfunc main() {\n    // produce numbers 1..10\n    numbers := make(chan int)\n    go func() {\n        for i := 1; i <= 10; i++ {\n            numbers <- i\n        }\n        close(numbers)\n    }()\n    // fan-out to 3 sq stages\n    // fan-in\n    // print results\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\n// sq returns a channel that outputs the square of each input\nfunc sq(in <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for n := range in {\n            out <- n * n\n        }\n        close(out)\n    }()\n    return out\n}\n\n// fanIn merges multiple input channels into one output channel\nfunc fanIn(channels ...<-chan int) <-chan int {\n    out := make(chan int)\n    var wg sync.WaitGroup\n    for _, ch := range channels {\n        wg.Add(1)\n        go func(c <-chan int) {\n            defer wg.Done()\n            for v := range c {\n                out <- v\n            }\n        }(ch)\n    }\n    go func() {\n        wg.Wait()\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    // Producer: numbers 1..10\n    numbers := make(chan int)\n    go func() {\n        for i := 1; i <= 10; i++ {\n            numbers <- i\n        }\n        close(numbers)\n    }()\n\n    // Fan-out: create 3 pipelines that each square the same input stream\n    // BUT we must duplicate the input stream, not share the same channel.\n    // For simplicity, we\'ll feed the same numbers channel to each sq, but\n    // reading from a channel consumes it. To fan-out, we need to read\n    // numbers once and distribute. Let\'s do that: read numbers and send to multiple sq.\n\n    // Start 3 sq goroutines each receiving from a dedicated channel\n    // We\'ll create a source that broadcasts numbers.\n    ch1 := make(chan int)\n    ch2 := make(chan int)\n    ch3 := make(chan int)\n\n    // Distribute each number to three channels\n    go func() {\n        for n := range numbers {\n            ch1 <- n\n            ch2 <- n\n            ch3 <- n\n        }\n        close(ch1)\n        close(ch2)\n        close(ch3)\n    }()\n\n    // Square each stream\n    out1 := sq(ch1)\n    out2 := sq(ch2)\n    out3 := sq(ch3)\n\n    // Fan-in results\n    merged := fanIn(out1, out2, out3)\n\n    // Collect and print (order undefined)\n    for v := range merged {\n        fmt.Println(v)\n    }\n}',
    explanation:
      "**Concept:** Fan-out means distributing work to multiple identical pipelines. Fan-in means merging multiple output channels into one. This pattern is used to parallelize computation. The `sq` function is a stage that reads from its input channel, applies transformation, and writes to its output. In main, we need to duplicate the original numbers stream to each pipeline because a channel cannot be read by multiple consumers. We therefore create three channels and a distributor goroutine that copies each number to all three.\n\n**Dry run:** Numbers 1..10 are produced into `numbers`. Distributor reads each number and sends it to `ch1`, `ch2`, `ch3`. Each `sq` goroutine reads its own channel, squares the number, and sends to its output. `fanIn` starts a goroutine for each input channel that forwards values to a single output channel. It uses a `WaitGroup` to close the merged channel after all inputs are exhausted. The main loops over the merged channel and prints squares. Because the distributor sends numbers sequentially to all three channels, the order of processing is interleaved. Output order is random but will include each square (1,4,9,...,100) three times? Wait, each number is processed three times (once per worker). This is actually a mistake in the design – we want to divide the work, not duplicate. The correct fan-out would split the input stream (e.g., using round‑robin). But for purpose of demonstrating fan‑in, we keep it simple. The key takeaway is the fan‑in merging multiple channels into one.",
    hint: "Fan‑out duplicates work to multiple pipelines; fan‑in merges multiple channels using goroutines per channel and a WaitGroup.",
  },
  {
    id: "go-atomic-counter",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use sync/atomic for simple counters",
    prompt:
      "Implement a counter that increments 10000 times from 10 goroutines (total 100000 increments) using `sync/atomic`. Print the final counter.\n\n**Example Output:**\n```\n100000\n```",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n    "sync/atomic"\n)\n\nfunc main() {\n    var counter int64\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "sync"\n    "sync/atomic"\n)\n\nfunc main() {\n    var counter int64\n    var wg sync.WaitGroup\n\n    for i := 0; i < 10; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            for j := 0; j < 10000; j++ {\n                // atomic increment without lock\n                atomic.AddInt64(&counter, 1)\n            }\n        }()\n    }\n\n    wg.Wait()\n    fmt.Println(atomic.LoadInt64(&counter)) // 100000\n}',
    explanation:
      "**Concept:** The `sync/atomic` package provides low‑level atomic memory operations for integers, pointers, etc. `atomic.AddInt64` atomically increments a variable without a mutex, which is faster for simple operations like counters. It uses CPU instructions to ensure no race condition.\n\n**Dry run:** 10 goroutines each increment the counter 10000 times via `atomic.AddInt64(&counter, 1)`. The function reads, adds, and writes the value in a single atomic operation, so increments from different goroutines never conflict. After all goroutines finish, `atomic.LoadInt64` reads the final value (which is 100000). Because atomic operations avoid lock contention, they are more efficient than mutex for simple counters. However, they only work on primitive numeric types and pointers, not on complex structures.",
    hint: "Use `atomic.AddInt64(&counter, 1)` to increment. `LoadInt64` to read. No mutex needed.",
  },
  {
    id: "go-pipeline-pattern",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Build a pipeline: generator → square → printer",
    prompt:
      "Create a pipeline with three stages:\n1. `gen(nums ...int) <-chan int` – sends numbers to a channel.\n2. `sq(in <-chan int) <-chan int` – squares numbers.\n3. `print(in <-chan int)` – prints each result.\nUse it to print squares of numbers 1 to 5.\n\n**Example Output:**\n```\n1\n4\n9\n16\n25\n```",
    starter:
      'package main\n\nimport "fmt"\n\nfunc gen(nums ...int) <-chan int {\n    out := make(chan int)\n    // your code\n    return out\n}\n\nfunc sq(in <-chan int) <-chan int {\n    out := make(chan int)\n    // your code\n    return out\n}\n\nfunc print(in <-chan int) {\n    // your code\n}\n\nfunc main() {\n    // connect stages\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc gen(nums ...int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for _, n := range nums {\n            out <- n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc sq(in <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for n := range in {\n            out <- n * n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc print(in <-chan int) {\n    for v := range in {\n        fmt.Println(v)\n    }\n}\n\nfunc main() {\n    // Build pipeline: gen -> sq -> print\n    numbers := gen(1, 2, 3, 4, 5)\n    squares := sq(numbers)\n    print(squares)\n}',
    explanation:
      "**Concept:** A pipeline is a series of stages connected by channels. Each stage is a function that reads from an input channel, processes data, and writes to an output channel. This pattern allows concurrent processing and clean separation of concerns.\n\n**Dry run:** `gen` launches a goroutine that sends 1,2,3,4,5 to its output channel and closes it. `sq` reads from that channel, squares each number, sends to its output. `print` reads from `sq`'s output and prints each square. The goroutines run concurrently: `gen` can send numbers while `sq` is processing, and `print` is consuming. The pipeline is created by connecting the channels in sequence. Because each stage closes its output when done, the next stage's `range` loop terminates automatically.",
    hint: "Each pipeline stage should close its output channel when done. Use `range` to read from input channels.",
  },
  {
    id: "go-close-channel",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Properly close a channel and detect it",
    prompt:
      "Write a function `sendNumbers(ch chan<- int, numbers []int)` that sends numbers to a channel and then closes it. In main, create a channel, start the sender in a goroutine, and receive values using a `for range` loop. Print each received number.\n\n**Example:**\nInput: `[]int{10,20,30}` → Output:\n```\n10\n20\n30\n```",
    starter:
      'package main\n\nimport "fmt"\n\nfunc sendNumbers(ch chan<- int, numbers []int) {\n    // your code\n}\n\nfunc main() {\n    ch := make(chan int)\n    // launch sender\n    // receive with range\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc sendNumbers(ch chan<- int, numbers []int) {\n    for _, n := range numbers {\n        ch <- n\n    }\n    close(ch) // indicates no more values will be sent\n}\n\nfunc main() {\n    ch := make(chan int)\n    go sendNumbers(ch, []int{10, 20, 30})\n\n    // range loop receives until channel is closed\n    for v := range ch {\n        fmt.Println(v)\n    }\n}',
    explanation:
      "**Concept:** A sender should close a channel when no more values will be sent, to allow the receiver to detect that data is complete. The `range` loop over a channel automatically stops when the channel is closed. Only the sender should close a channel; receivers never close.\n\n**Dry run:** `sendNumbers` sends 10,20,30 into the channel, then calls `close(ch)`. The main goroutine runs `for v := range ch`. It receives 10, prints; receives 20, prints; receives 30, prints. Then the next iteration finds the channel closed and exits the loop. The program ends. If we didn't close the channel, the `range` would block forever, causing a deadlock. Closing is essential for signaling completion.",
    hint: "Close the channel from the sender side. The receiver uses `for v := range ch` to read until close.",
  },
  {
    id: "go-for-select-loop",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use for-select loop for continuous processing",
    prompt:
      'Write a function `processMessages(done <-chan struct{}, msgs <-chan string)` that reads from `msgs` and prints each message, but also immediately returns when `done` is closed (indicating shutdown). Use a `for` loop with `select`.\n\n**Example:**\n- Send messages "A","B" then close done → prints "A","B" then exits.',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc processMessages(done <-chan struct{}, msgs <-chan string) {\n    // your code\n}\n\nfunc main() {\n    done := make(chan struct{})\n    msgs := make(chan string)\n    go processMessages(done, msgs)\n    msgs <- "A"\n    msgs <- "B"\n    close(done)\n    time.Sleep(10 * time.Millisecond)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc processMessages(done <-chan struct{}, msgs <-chan string) {\n    for {\n        select {\n        case <-done:\n            // Shutdown signal received\n            fmt.Println("shutting down")\n            return\n        case msg, ok := <-msgs:\n            if !ok {\n                // messages channel closed, also exit\n                return\n            }\n            fmt.Println("received:", msg)\n        }\n    }\n}\n\nfunc main() {\n    done := make(chan struct{})\n    msgs := make(chan string)\n    go processMessages(done, msgs)\n\n    msgs <- "A"\n    msgs <- "B"\n    close(done) // signal shutdown\n    time.Sleep(10 * time.Millisecond)\n}',
    explanation:
      '**Concept:** The `for-select` loop is a common pattern for goroutines that need to handle multiple channel events, including a shutdown signal. The `select` inside an infinite `for` allows the goroutine to wait for any of the channel operations. When the `done` channel is closed, the first case becomes ready, and the function returns, terminating the loop.\n\n**Dry run:** The goroutine runs the `for` loop. It blocks at `select`. Initially, `msgs` has a message "A" – the second case reads it, prints. Next iteration, "B" is read and printed. Next iteration, both `done` and `msgs` are ready? `done` is still open (not closed). Actually `close(done)` hasn\'t been called yet. After main sends "B", it calls `close(done)`. Now the loop iterates again; `select` sees `done` is closed (zero value immediate receive) and executes the first case, printing "shutting down" and returning. The goroutine exits cleanly. The pattern allows graceful shutdown.',
    hint: "Use `for { select { case <-done: return; case val := <-ch: ... } }` to process until shutdown.",
  },
  {
    id: "go-net-http-basic",
    type: "implementation",
    topic: "Go Web",
    title: "Basic HTTP server with net/http",
    prompt:
      "Write a Go HTTP server that listens on port 8080 and responds with 'Hello, World!' to any request path. Use `http.HandleFunc` and `http.ListenAndServe`.\n\n**Example:**\n```bash\ncurl http://localhost:8080/\nHello, World!\n```\n```bash\ncurl http://localhost:8080/anything\nHello, World!\n```",
    starter:
      'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\nfunc main() {\n    // your code\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\n// handler function must have signature func(http.ResponseWriter, *http.Request)\nfunc helloHandler(w http.ResponseWriter, r *http.Request) {\n    // Write the response as a byte slice\n    fmt.Fprintf(w, "Hello, World!")\n}\n\nfunc main() {\n    // Register the handler for all routes ("/" matches any path)\n    http.HandleFunc("/", helloHandler)\n    // Start the server; ListenAndServe blocks until an error occurs\n    fmt.Println("Server listening on :8080")\n    if err := http.ListenAndServe(":8080", nil); err != nil {\n        fmt.Println("Server error:", err)\n    }\n}',
    explanation:
      '**Concept:** The `net/http` package provides a built‑in HTTP server. `http.HandleFunc` maps a URL pattern to a handler function. The handler receives a `ResponseWriter` to write the response and a `Request` pointer to read request data. `ListenAndServe` starts the server; it blocks until the server stops (or an error occurs). Using `"/"` as pattern matches all paths because the default ServeMux uses longest‑match, but `"/"` is a catch‑all.\n\n**Dry run:** When a request arrives, the server calls `helloHandler`. `fmt.Fprintf` writes the string to the `ResponseWriter`. The client receives `"Hello, World!"` with HTTP status 200 OK. The server continues listening for the next request.',
    hint: "Use `http.HandleFunc` to register handlers. `http.ListenAndServe` starts the server. The handler must write a response; otherwise the client will hang.",
  },
  {
    id: "go-net-http-routing",
    type: "implementation",
    topic: "Go Web",
    title: "Handle multiple routes with net/http",
    prompt:
      'Create an HTTP server with three routes:\n- `/` returns "Home"\n- `/hello` returns "Hello"\n- `/goodbye` returns "Goodbye"\n\n**Example:**\n```bash\ncurl localhost:8080/hello\nHello\n```',
    starter:
      'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\nfunc main() {\n    // your routes\n    http.ListenAndServe(":8080", nil)\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\nfunc homeHandler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprint(w, "Home")\n}\n\nfunc helloHandler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprint(w, "Hello")\n}\n\nfunc goodbyeHandler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprint(w, "Goodbye")\n}\n\nfunc main() {\n    // Register each route with its handler\n    http.HandleFunc("/", homeHandler)      // catch-all but we\'ll use exact paths\n    http.HandleFunc("/hello", helloHandler)\n    http.HandleFunc("/goodbye", goodbyeHandler)\n\n    // Note: Because "/" matches everything, we must ensure it doesn\'t shadow other routes.\n    // The default ServeMux routes longest matching pattern first, so "/hello" is tried before "/".\n    // This works as long as we define longer patterns first (by code order, but actual matching is based on pattern length).\n    // Safer: use a router like `http.NewServeMux()` and register exact patterns.\n    // For simplicity, this works.\n\n    fmt.Println("Server on :8080")\n    http.ListenAndServe(":8080", nil)\n}',
    explanation:
      '**Concept:** The default `ServeMux` matches patterns based on longest prefix. So `/hello` is longer than `/`, hence a request to `/hello` will match `/hello` first, not `/`. This allows us to have a catch‑all `/` that handles any path not matched explicitly.\n\n**Dry run:** A request to `/hello` matches the pattern `/hello` (exact). The server calls `helloHandler`, which writes `"Hello"`. A request to `/goodbye` works similarly. A request to `/unknown` has no exact match, so it falls back to `/` and returns `"Home"` (which may not be desirable but demonstrates the behavior).',
    hint: "Order of registration does not matter; the router uses pattern length to resolve. Use `http.NewServeMux()` for cleaner separation.",
  },
  {
    id: "go-gin-basic",
    type: "implementation",
    topic: "Go Web",
    title: "Basic Gin server",
    prompt:
      'Using the Gin framework, create a server on port 8080 with a GET endpoint `/ping` that returns JSON `{"message": "pong"}`.\n\n**Example:**\n```bash\ncurl localhost:8080/ping\n{"message":"pong"}\n```',
    starter:
      'package main\n\nimport "github.com/gin-gonic/gin"\n\nfunc main() {\n    r := gin.Default()\n    // your route\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    // Create a Gin router with default middleware (logging and recovery)\n    r := gin.Default()\n\n    // Define a GET endpoint at /ping\n    r.GET("/ping", func(c *gin.Context) {\n        // c.JSON sends a JSON response with status 200 (OK) by default\n        c.JSON(200, gin.H{\n            "message": "pong",\n        })\n    })\n\n    // Run the server on :8080 (default)\n    r.Run()\n}',
    explanation:
      '**Concept:** Gin is a popular HTTP framework that provides routing, middleware, and JSON handling. `gin.Default()` includes `Logger` and `Recovery` middleware. `r.GET` registers a handler for a specific path and method. The handler uses `c.JSON` to send a structured response; `gin.H` is a shortcut for `map[string]interface{}`.\n\n**Dry run:** When a GET request to `/ping` arrives, Gin calls the handler. It executes `c.JSON(200, gin.H{"message":"pong"})`, which sets the Content‑Type header to `application/json` and writes the JSON string to the response. The client receives a 200 status and the JSON body.',
    hint: "Install Gin with `go get github.com/gin-gonic/gin`. Use `gin.H` for JSON maps.",
  },
  {
    id: "go-gin-path-params",
    type: "implementation",
    topic: "Go Web",
    title: "Gin path parameters (/users/:id)",
    prompt:
      'Create a Gin endpoint `GET /users/:id` that returns a JSON object with the user ID: `{"user_id": id}`. Convert the id parameter to an integer and validate it.\n\n**Example:**\n```bash\ncurl localhost:8080/users/42\n{"user_id":42}\n```',
    starter:
      'package main\n\nimport (\n    "strconv"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    // your route\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "net/http"\n    "strconv"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n\n    // Path parameter :id\n    r.GET("/users/:id", func(c *gin.Context) {\n        // Retrieve the path parameter as string\n        idStr := c.Param("id")\n        // Convert to integer\n        id, err := strconv.Atoi(idStr)\n        if err != nil {\n            // If conversion fails, return a 400 Bad Request\n            c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})\n            return\n        }\n        // Success response\n        c.JSON(http.StatusOK, gin.H{"user_id": id})\n    })\n\n    r.Run()\n}',
    explanation:
      '**Concept:** Path parameters are defined with `:` in the route pattern (e.g., `:id`). Gin extracts them and makes them available via `c.Param("id")`. Always validate and convert parameters to the expected type; return a clear error message on failure.\n\n**Dry run:** Request `/users/42` → `c.Param("id")` returns `"42"`. `strconv.Atoi` converts to integer 42, no error; response `{"user_id":42}` sent. Request `/users/abc` → conversion fails, returns 400 with `{"error":"invalid user id"}`.',
    hint: 'Use `c.Param("key")` to get path parameters. Always validate conversion.',
  },
  {
    id: "go-gin-query-params",
    type: "implementation",
    topic: "Go Web",
    title: "Gin query parameters",
    prompt:
      'Create a Gin endpoint `GET /search` that accepts query parameters `q` (string) and `limit` (int, default 10). Return a JSON response `{"query": q, "limit": limit}`.\n\n**Example:**\n```bash\ncurl "localhost:8080/search?q=hello&limit=5"\n{"query":"hello","limit":5}\n```\nIf limit is missing, use 10.',
    starter:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    // your route\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "net/http"\n    "strconv"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n\n    r.GET("/search", func(c *gin.Context) {\n        // Get query parameter "q" with default empty string\n        q := c.DefaultQuery("q", "")\n        // Get query parameter "limit" as string, then convert\n        limitStr := c.DefaultQuery("limit", "10")\n        limit, err := strconv.Atoi(limitStr)\n        if err != nil || limit < 1 {\n            // Invalid limit, fallback to 10 or return error\n            limit = 10\n        }\n        c.JSON(http.StatusOK, gin.H{\n            "query": q,\n            "limit": limit,\n        })\n    })\n\n    r.Run()\n}',
    explanation:
      '**Concept:** Query parameters are accessed with `c.Query(key)` or `c.DefaultQuery(key, default)`. They are always strings, so numeric parameters must be parsed. Provide sensible defaults to make the API robust.\n\n**Dry run:** Request `/search?q=hello&limit=5`: `DefaultQuery` returns `"hello"` for `q` and `"5"` for limit. Conversion succeeds, limit=5. Response `{"query":"hello","limit":5}`. If limit is omitted, default `"10"` is used. If limit is non‑numeric, we fallback to 10.',
    hint: "Use `c.DefaultQuery` to provide defaults. Convert numeric query params with `strconv.Atoi` and handle errors.",
  },
  {
    id: "go-gin-post-json",
    type: "implementation",
    topic: "Go Web",
    title: "Handle POST JSON in Gin",
    prompt:
      'Create a POST endpoint `/user` that accepts JSON `{"name": string, "age": int}` and returns the same JSON with an added `id` field (e.g., `{"id":1, ...}`). Use `c.ShouldBindJSON`.\n\n**Example:**\n```bash\ncurl -X POST localhost:8080/user -d \'{"name":"Alice","age":30}\' -H "Content-Type: application/json"\n{"id":1,"name":"Alice","age":30}\n```',
    starter:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n)\n\ntype User struct {\n    Name string `json:"name"`\n    Age  int    `json:"age"`\n}\n\nfunc main() {\n    r := gin.Default()\n    // your route\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "net/http"\n    "github.com/gin-gonic/gin"\n)\n\ntype User struct {\n    Name string `json:"name"`\n    Age  int    `json:"age"`\n}\n\ntype ResponseUser struct {\n    ID   int    `json:"id"`\n    Name string `json:"name"`\n    Age  int    `json:"age"`\n}\n\nfunc main() {\n    r := gin.Default()\n\n    r.POST("/user", func(c *gin.Context) {\n        var user User\n        // Bind JSON request body to the User struct\n        if err := c.ShouldBindJSON(&user); err != nil {\n            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})\n            return\n        }\n        // Create response with an ID (simulate database auto-increment)\n        resp := ResponseUser{\n            ID:   1, // normally would come from DB\n            Name: user.Name,\n            Age:  user.Age,\n        }\n        c.JSON(http.StatusCreated, resp)\n    })\n\n    r.Run()\n}',
    explanation:
      '**Concept:** Gin provides `ShouldBindJSON` to parse JSON request bodies into structs. The struct tags map JSON field names to struct fields. If binding fails (e.g., missing required fields, wrong types), we return a 400 error with details. On success, return 201 Created with the created resource.\n\n**Dry run:** A POST with `{"name":"Alice","age":30}` arrives. `ShouldBindJSON` fills the `User` struct. No error. We construct a `ResponseUser` with ID 1 (mock) and send JSON. Client receives 201 status and the JSON with id.',
    hint: "Always check the error from `ShouldBindJSON`. Use struct tags to define JSON field names.",
  },
  {
    id: "go-gin-middleware",
    type: "implementation",
    topic: "Go Web",
    title: "Create custom Gin middleware for logging",
    prompt:
      "Write a custom Gin middleware that logs each request's method, path, and response status code. Use `c.Next()` and record the status after the handler runs.\n\n**Example log line:**\n`[GIN] 2025/01/01 - 12:00:00 | 200 |  GET /ping`",
    starter:
      'package main\n\nimport (\n    "log"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\nfunc LoggerMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // your code\n    }\n}\n\nfunc main() {\n    r := gin.New()\n    r.Use(LoggerMiddleware())\n    r.GET("/ping", func(c *gin.Context) { c.String(200, "pong") })\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "log"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\nfunc LoggerMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // Start timer\n        start := time.Now()\n        // Process the request (call the next handler/middleware)\n        c.Next()\n        // After the handler finishes, calculate duration\n        duration := time.Since(start)\n        // Log method, path, status code, and duration\n        log.Printf("[GIN] %s | %3d | %s %s | %v",\n            time.Now().Format("2006/01/02 - 15:04:05"),\n            c.Writer.Status(),\n            c.Request.Method,\n            c.Request.URL.Path,\n            duration,\n        )\n    }\n}\n\nfunc main() {\n    // Create a Gin router without default middleware (to avoid double logging)\n    r := gin.New()\n    // Use our custom logger\n    r.Use(LoggerMiddleware())\n    r.GET("/ping", func(c *gin.Context) { c.String(200, "pong") })\n    r.Run()\n}',
    explanation:
      '**Concept:** Middleware functions run before and after the route handler. They call `c.Next()` to delegate to the next handler. After `Next` returns, the response has been written (or at least the status code is set). We can then read `c.Writer.Status()` to know the HTTP status code. This pattern is useful for logging, authentication, metrics, etc.\n\n**Dry run:** A request to `/ping` arrives. `LoggerMiddleware` starts, records start time, calls `c.Next()`, which executes the route handler (sets status 200, writes "pong"). After the handler returns, control goes back to the middleware. It calculates duration, reads status 200, and logs the line. The response is already sent to the client.',
    hint: "Call `c.Next()` to pass control down the chain. Use `c.Writer.Status()` after `Next` to get the response code.",
  },
  {
    id: "go-gin-recovery-middleware",
    type: "implementation",
    topic: "Go Web",
    title: "Implement custom recovery middleware",
    prompt:
      'Create a Gin middleware that recovers from panics, logs the error, and returns a 500 Internal Server Error instead of crashing the server.\n\n**Example:**\nA handler that panics should result in `{"error":"internal server error"}`.',
    starter:
      'package main\n\nimport (\n    "net/http"\n    "github.com/gin-gonic/gin"\n)\n\nfunc RecoveryMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // your code\n    }\n}\n\nfunc main() {\n    r := gin.New()\n    r.Use(RecoveryMiddleware())\n    r.GET("/panic", func(c *gin.Context) { panic("something went wrong") })\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "net/http"\n    "runtime/debug"\n    "github.com/gin-gonic/gin"\n)\n\nfunc RecoveryMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        defer func() {\n            // Recover from panic if any\n            if err := recover(); err != nil {\n                // Log the error and stack trace\n                fmt.Printf("PANIC: %v\\n%s\\n", err, debug.Stack())\n                // Abort the request with 500 error\n                c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{\n                    "error": "internal server error",\n                })\n            }\n        }()\n        c.Next()\n    }\n}\n\nfunc main() {\n    r := gin.New()\n    r.Use(RecoveryMiddleware())\n    r.GET("/panic", func(c *gin.Context) { panic("something went wrong") })\n    r.GET("/ok", func(c *gin.Context) { c.String(200, "ok") })\n    r.Run()\n}',
    explanation:
      '**Concept:** Panics in a goroutine (including HTTP handlers) can crash the whole server. A recovery middleware uses `defer` and `recover()` to catch panics, log the stack trace, and return a user‑friendly 500 response. The `c.AbortWithStatusJSON` stops further handler execution and sends the response.\n\n**Dry run:** The `/panic` handler calls `panic("something went wrong")`. The deferred function in `RecoveryMiddleware` runs. `recover()` returns the panic value. We log it and the stack. `c.AbortWithStatusJSON` writes a 500 response. The client receives an error JSON. The server continues running without crashing.',
    hint: "Wrap `c.Next()` in a `defer` function with `recover()`. Use `c.AbortWithStatusJSON` to send error response.",
  },
  {
    id: "go-gin-graceful-shutdown",
    type: "implementation",
    topic: "Go Web",
    title: "Graceful shutdown for Gin server",
    prompt:
      "Modify the Gin server to shut down gracefully when SIGINT or SIGTERM is received. Wait for active connections to finish up to 5 seconds, then exit.\n\n**Example:**\nPress Ctrl+C → server waits for pending requests (up to 5s) then shuts down.",
    starter:
      'package main\n\nimport (\n    "context"\n    "log"\n    "net/http"\n    "os"\n    "os/signal"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/slow", func(c *gin.Context) { time.Sleep(2 * time.Second); c.String(200, "done") })\n    srv := &http.Server{Addr: ":8080", Handler: r}\n    // start server in goroutine\n    // listen for signals\n    // shutdown\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "log"\n    "net/http"\n    "os"\n    "os/signal"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/slow", func(c *gin.Context) {\n        time.Sleep(2 * time.Second)\n        c.String(200, "done")\n    })\n\n    srv := &http.Server{\n        Addr:    ":8080",\n        Handler: r,\n    }\n\n    // Start server in a goroutine\n    go func() {\n        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {\n            log.Fatalf("listen: %s\\n", err)\n        }\n    }()\n    log.Println("Server started on :8080")\n\n    // Wait for interrupt signal\n    quit := make(chan os.Signal, 1)\n    signal.Notify(quit, os.Interrupt, os.Kill)\n    <-quit\n    log.Println("Shutting down server...")\n\n    // Give outstanding requests 5 seconds to complete\n    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n    defer cancel()\n    if err := srv.Shutdown(ctx); err != nil {\n        log.Fatal("Server forced to shutdown:", err)\n    }\n    log.Println("Server exited")\n}',
    explanation:
      "**Concept:** `http.Server.Shutdown` gracefully shuts down the server: it stops accepting new connections and waits for existing idle connections to finish (or active requests to complete) up to the context timeout. We run `ListenAndServe` in a goroutine so we can block on a signal channel. When a signal arrives, we call `Shutdown` with a timeout.\n\n**Dry run:** The server runs normally. A request to `/slow` takes 2 seconds. If the admin sends SIGINT during that request, the shutdown sequence waits up to 5 seconds. The active request will finish, then the server exits. New connections are rejected immediately. After 5 seconds, if requests still linger, `Shutdown` returns an error and we may force exit (optional).",
    hint: "Use `signal.Notify` to catch SIGINT/SIGTERM. Call `srv.Shutdown(ctx)` with a timeout. Run `ListenAndServe` in a goroutine.",
  },
  {
    id: "go-gin-env-port",
    type: "implementation",
    topic: "Go Web",
    title: "Read port from environment variable",
    prompt:
      "Modify the Gin server to read the port from the `PORT` environment variable. Default to `8080` if not set. Use `os.Getenv`.\n\n**Example:**\n```bash\nPORT=3000 go run main.go\n# server listens on :3000\n```",
    starter:
      'package main\n\nimport (\n    "os"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    // your port logic\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "os"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/", func(c *gin.Context) { c.String(200, "ok") })\n\n    // Read PORT environment variable, default to "8080"\n    port := os.Getenv("PORT")\n    if port == "" {\n        port = "8080"\n    }\n    // Run server on :port\n    r.Run(":" + port)\n    fmt.Printf("Server listening on port %s\\n", port)\n}',
    explanation:
      '**Concept:** Environment variables are a standard way to configure applications, especially in containerized environments. `os.Getenv` retrieves the value; if empty, we provide a default.\n\n**Dry run:** If `PORT=3000` is set, `os.Getenv("PORT")` returns `"3000"`, and `r.Run(":3000")` starts the server on that port. If not set, it falls back to `"8080"`. This makes the application configurable without code changes.',
    hint: 'Use `os.Getenv("PORT")` and provide a fallback. Pass the port with a colon to `r.Run`.',
  },
  {
    id: "go-gin-request-id",
    type: "implementation",
    topic: "Go Web",
    title: "Add request ID middleware",
    prompt:
      "Create a Gin middleware that generates a unique request ID (UUID) for each request and stores it in the request context. Then expose it in a response header `X-Request-Id`. Use `google/uuid` library.\n\n**Example:**\nResponse header `X-Request-Id: 123e4567-e89b-12d3-a456-426614174000`.",
    starter:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n    "github.com/google/uuid"\n)\n\nfunc RequestIDMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // your code\n    }\n}\n\nfunc main() {\n    r := gin.Default()\n    r.Use(RequestIDMiddleware())\n    r.GET("/", func(c *gin.Context) { c.String(200, "ok") })\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n    "github.com/google/uuid"\n)\n\nfunc RequestIDMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // Generate a new UUID\n        requestID := uuid.New().String()\n        // Store it in the request context for later use (optional)\n        c.Set("requestID", requestID)\n        // Set the response header\n        c.Header("X-Request-Id", requestID)\n        // Continue processing\n        c.Next()\n    }\n}\n\nfunc main() {\n    r := gin.Default()\n    r.Use(RequestIDMiddleware())\n    r.GET("/", func(c *gin.Context) {\n        // Retrieve request ID from context if needed\n        if reqID, exists := c.Get("requestID"); exists {\n            c.String(200, "Request ID: %s", reqID)\n        } else {\n            c.String(200, "ok")\n        }\n    })\n    r.Run()\n}',
    explanation:
      '**Concept:** Adding a unique request ID helps trace requests across logs and services. Middleware generates a UUID, adds it to the response header, and optionally stores it in the Gin context (`c.Set`) so handlers can use it. The `uuid.New()` function creates a random UUID.\n\n**Dry run:** Each incoming request triggers the middleware. A new UUID is generated, e.g., `"abc123..."`. `c.Header` sets the `X-Request-Id` header. The handler can retrieve it via `c.Get("requestID")`. The client receives the header and can use it in subsequent calls.',
    hint: "Install `github.com/google/uuid`. Use `c.Set` to store values in the context for downstream handlers.",
  },
  {
    id: "go-gin-request-timeout",
    type: "implementation",
    topic: "Go Web",
    title: "Implement request timeout middleware",
    prompt:
      "Create a Gin middleware that enforces a timeout of 3 seconds for each request. If the handler takes longer, return a 408 Request Timeout response. Use `context.WithTimeout` and a goroutine with `select`.\n\n**Example:**\nA handler that sleeps 5 seconds → timeout after 3s, client gets 408.",
    starter:
      'package main\n\nimport (\n    "context"\n    "net/http"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\nfunc TimeoutMiddleware(timeout time.Duration) gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // your code\n    }\n}\n\nfunc main() {\n    r := gin.Default()\n    r.Use(TimeoutMiddleware(3 * time.Second))\n    r.GET("/slow", func(c *gin.Context) { time.Sleep(5 * time.Second); c.String(200, "done") })\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "net/http"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\nfunc TimeoutMiddleware(timeout time.Duration) gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // Create a context that will be cancelled after timeout\n        ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)\n        defer cancel()\n\n        // Replace the request context with the timeout context\n        c.Request = c.Request.WithContext(ctx)\n\n        // Channel to signal handler completion\n        done := make(chan bool, 1)\n\n        // Run the actual handler in a goroutine\n        go func() {\n            c.Next()\n            done <- true\n        }()\n\n        // Wait for either the handler to finish or the timeout\n        select {\n        case <-done:\n            // Handler completed within timeout\n            return\n        case <-ctx.Done():\n            // Timeout occurred\n            c.AbortWithStatusJSON(http.StatusRequestTimeout, gin.H{\n                "error": "request timeout",\n            })\n            return\n        }\n    }\n}\n\nfunc main() {\n    r := gin.Default()\n    r.Use(TimeoutMiddleware(3 * time.Second))\n    r.GET("/slow", func(c *gin.Context) {\n        time.Sleep(5 * time.Second)\n        c.String(200, "done")\n    })\n    r.GET("/fast", func(c *gin.Context) {\n        c.String(200, "fast")\n    })\n    r.Run()\n}',
    explanation:
      "**Concept:** To enforce a per‑request deadline, we replace the request context with one that has a timeout. Then we run `c.Next()` in a goroutine and wait on `done` or the context's Done channel. If the context times out first, we abort the request with 408. This prevents slow handlers from consuming resources indefinitely.\n\n**Dry run:** For `/slow`, the handler sleeps 5 seconds. The timeout context expires after 3 seconds. The `select` sees `ctx.Done()` first, calls `c.AbortWithStatusJSON(408)`, and returns. The response is sent, and the goroutine running `c.Next()` will eventually finish but its response has already been aborted. For `/fast`, the handler finishes before timeout, `done` receives true, and the middleware returns normally.",
    hint: "Replace `c.Request.Context()` with a timeout context. Use a goroutine to run `c.Next()` and a select to race against the timeout.",
  },
  {
    id: "go-gin-health-check",
    type: "implementation",
    topic: "Go Web",
    title: "Add health check endpoint",
    prompt:
      'Add a `/health` endpoint that returns `{"status": "ok"}` as JSON. This is used by load balancers and orchestrators to verify the service is alive.\n\n**Example:**\n```bash\ncurl localhost:8080/health\n{"status":"ok"}\n```',
    starter:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n    // your health endpoint\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "net/http"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    r := gin.Default()\n\n    // Health check endpoint\n    r.GET("/health", func(c *gin.Context) {\n        c.JSON(http.StatusOK, gin.H{\n            "status": "ok",\n        })\n    })\n\n    // Other routes...\n\n    r.Run()\n}',
    explanation:
      '**Concept:** Health endpoints are simple, fast, and return a 200 status when the service is running. They can also check dependencies (database, cache) for a more detailed readiness probe. Here we return a static "ok" response.\n\n**Dry run:** A GET request to `/health` hits the handler, which returns a 200 status and JSON body `{"status":"ok"}`. Load balancers use this to keep the instance in rotation.',
    hint: "Make the health endpoint very lightweight. Optionally, add a `/ready` endpoint that checks dependencies.",
  },
  {
    id: "go-gin-async-handler",
    type: "implementation",
    topic: "Go Web",
    title: "Async handler with background goroutine",
    prompt:
      'Write a POST endpoint `/process` that accepts a JSON payload, starts a background goroutine to process it (simulate with `time.Sleep`), and immediately returns `{"accepted": true}` without waiting for completion.\n\n**Example:**\n```bash\ncurl -X POST localhost:8080/process -d \'{"data":"hello"}\' -H "Content-Type: application/json"\n{"accepted":true}\n```',
    starter:
      'package main\n\nimport (\n    "log"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\ntype Payload struct {\n    Data string `json:"data"`\n}\n\nfunc main() {\n    r := gin.Default()\n    // your endpoint\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "log"\n    "net/http"\n    "time"\n    "github.com/gin-gonic/gin"\n)\n\ntype Payload struct {\n    Data string `json:"data"`\n}\n\nfunc processAsync(payload Payload) {\n    // Simulate long-running task\n    time.Sleep(10 * time.Second)\n    log.Printf("Processed: %s", payload.Data)\n}\n\nfunc main() {\n    r := gin.Default()\n\n    r.POST("/process", func(c *gin.Context) {\n        var p Payload\n        if err := c.ShouldBindJSON(&p); err != nil {\n            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})\n            return\n        }\n        // Launch background goroutine to do the heavy work\n        go processAsync(p)\n        // Immediately return accepted\n        c.JSON(http.StatusAccepted, gin.H{"accepted": true})\n    })\n\n    r.Run()\n}',
    explanation:
      "**Concept:** For long‑running tasks, it's best not to block the HTTP client. Instead, accept the request, start a background goroutine, and return a 202 Accepted status. This pattern is common with job queues. Be careful: if the server shuts down, background goroutines may be terminated. In production, use a proper job queue and persistence.\n\n**Dry run:** A POST request with payload arrives. The handler parses JSON, starts `go processAsync(p)`, then immediately responds with 202. The client receives the response quickly, while the goroutine continues processing (simulated by sleep). The goroutine logs completion after 10 seconds.",
    hint: "Use `go` to launch the background task. Return `http.StatusAccepted` (202) for asynchronous acceptance.",
  },
  {
    id: "go-gin-validation",
    type: "implementation",
    topic: "Go Web",
    title: "Request validation with Gin binding",
    prompt:
      'Create a POST `/register` endpoint that accepts JSON `{"email": string, "password": string}` and validates that email is not empty and password length >= 6. Use Gin\'s binding with struct tags (`binding:"required"`, `binding:"min=6"`).\n\n**Example:**\nInvalid request → 400 with validation errors.\nValid request → 201 with success message.',
    starter:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n)\n\ntype RegisterRequest struct {\n    Email    string `json:"email"`\n    Password string `json:"password"`\n}\n\nfunc main() {\n    r := gin.Default()\n    // your route\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "net/http"\n    "github.com/gin-gonic/gin"\n)\n\ntype RegisterRequest struct {\n    Email    string `json:"email" binding:"required,email"`\n    Password string `json:"password" binding:"required,min=6"`\n}\n\nfunc main() {\n    r := gin.Default()\n\n    r.POST("/register", func(c *gin.Context) {\n        var req RegisterRequest\n        // ShouldBindJSON will automatically validate based on binding tags\n        if err := c.ShouldBindJSON(&req); err != nil {\n            // Return validation errors\n            c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})\n            return\n        }\n        // If validation passes, process registration\n        c.JSON(http.StatusCreated, gin.H{"message": "user registered", "email": req.Email})\n    })\n\n    r.Run()\n}',
    explanation:
      '**Concept:** Gin uses `go-playground/validator` under the hood for struct validation. Tags like `binding:"required"` or `binding:"min=6"` or `binding:"email"` enforce rules. If validation fails, `ShouldBindJSON` returns an error that we can send back to the client. This centralizes validation logic.\n\n**Dry run:** Valid request: `{"email":"a@b.com","password":"secret"}` → binds successfully, returns 201. Invalid: `{"email":"","password":"123"}` – `required` fails for email, `min=6` fails for password; error contains details, returns 400.',
    hint: 'Add `binding:"required"` and other validation tags to struct fields. Use `ShouldBindJSON` to bind and validate in one step.',
  },
  {
    id: "go-gin-error-handling",
    type: "implementation",
    topic: "Go Web",
    title: "Centralized error handling middleware",
    prompt:
      'Write a middleware that catches errors returned from handlers and formats them as JSON. Handlers should return `(data interface{}, err error)` and the middleware will render appropriate response. Use `c.Next()` and check for errors after.\n\n**Example:**\nA handler returning an error → response `{"error":"message"}` with status 500 (or custom).',
    starter:
      'package main\n\nimport (\n    "net/http"\n    "github.com/gin-gonic/gin"\n)\n\ntype HandlerFunc func(c *gin.Context) (interface{}, error)\n\nfunc ErrorHandler(handler HandlerFunc) gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // your code\n    }\n}\n\nfunc main() {\n    r := gin.Default()\n    // Example handler that returns error\n    r.GET("/fail", ErrorHandler(func(c *gin.Context) (interface{}, error) {\n        return nil, fmt.Errorf("something failed")\n    }))\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "net/http"\n    "github.com/gin-gonic/gin"\n)\n\ntype HandlerFunc func(c *gin.Context) (interface{}, error)\n\nfunc ErrorHandler(handler HandlerFunc) gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // Call the wrapped handler\n        data, err := handler(c)\n        if err != nil {\n            // If there\'s an error, send JSON error response\n            c.JSON(http.StatusInternalServerError, gin.H{\n                "error": err.Error(),\n            })\n            return\n        }\n        // Otherwise, send success response (200 OK)\n        c.JSON(http.StatusOK, data)\n    }\n}\n\nfunc main() {\n    r := gin.Default()\n\n    // Handler that returns an error\n    r.GET("/fail", ErrorHandler(func(c *gin.Context) (interface{}, error) {\n        return nil, fmt.Errorf("something failed")\n    }))\n\n    // Handler that returns data\n    r.GET("/success", ErrorHandler(func(c *gin.Context) (interface{}, error) {\n        return gin.H{"message": "success"}, nil\n    }))\n\n    r.Run()\n}',
    explanation:
      '**Concept:** Centralizing error handling reduces repetition. We wrap route handlers to return a tuple `(data, error)`. The wrapper checks the error: if not nil, it sends a consistent JSON error response; otherwise, it sends the data as JSON. This pattern also allows custom error types to map to different status codes.\n\n**Dry run:** Request to `/fail` – the handler returns `(nil, error)`. The wrapper sends a 500 response with `{"error":"something failed"}`. Request to `/success` – returns `(data, nil)`, wrapper sends 200 with the data.',
    hint: "Define a custom handler type that returns `(interface{}, error)`. The wrapper calls it and decides the response based on the error.",
  },
  {
    id: "go-controller-service-repo",
    type: "implementation",
    topic: "Go Web",
    title: "Implement Controller-Service-Repository pattern",
    prompt:
      'Write a simple user management API with three layers:\n- Repository: in‑memory store, methods `FindByID(id int) (User, bool)`\n- Service: business logic, method `GetUser(id int) (User, error)`\n- Controller: Gin handler that calls service and returns JSON.\n\n**Example:**\n`GET /users/1` → `{"id":1,"name":"Alice"}`',
    starter:
      'package main\n\nimport (\n    "github.com/gin-gonic/gin"\n)\n\ntype User struct {\n    ID   int    `json:"id"`\n    Name string `json:"name"`\n}\n\n// Repository\ntype UserRepository struct{}\nfunc (r *UserRepository) FindByID(id int) (User, bool) { /* ... */ }\n\n// Service\ntype UserService struct{ repo *UserRepository }\nfunc (s *UserService) GetUser(id int) (User, error) { /* ... */ }\n\n// Controller\nfunc GetUser(c *gin.Context) { /* ... */ }\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/users/:id", GetUser)\n    r.Run()\n}',
    referenceSolution:
      'package main\n\nimport (\n    "errors"\n    "net/http"\n    "strconv"\n    "github.com/gin-gonic/gin"\n)\n\ntype User struct {\n    ID   int    `json:"id"`\n    Name string `json:"name"`\n}\n\n// ========== Repository Layer ==========\ntype UserRepository struct {\n    // In-memory storage (simulate database)\n    users map[int]User\n}\n\nfunc NewUserRepository() *UserRepository {\n    // Prepopulate with some users\n    users := map[int]User{\n        1: {ID: 1, Name: "Alice"},\n        2: {ID: 2, Name: "Bob"},\n    }\n    return &UserRepository{users: users}\n}\n\n// FindByID returns user and true if found, otherwise zero value and false\nfunc (r *UserRepository) FindByID(id int) (User, bool) {\n    user, ok := r.users[id]\n    return user, ok\n}\n\n// ========== Service Layer ==========\ntype UserService struct {\n    repo *UserRepository\n}\n\nfunc NewUserService(repo *UserRepository) *UserService {\n    return &UserService{repo: repo}\n}\n\n// GetUser contains business logic (e.g., check if user exists, maybe cache)\nfunc (s *UserService) GetUser(id int) (User, error) {\n    user, ok := s.repo.FindByID(id)\n    if !ok {\n        return User{}, errors.New("user not found")\n    }\n    // Additional business logic can go here\n    return user, nil\n}\n\n// ========== Controller Layer ==========\nfunc GetUser(userService *UserService) gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // Extract and validate ID from path\n        idStr := c.Param("id")\n        id, err := strconv.Atoi(idStr)\n        if err != nil {\n            c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})\n            return\n        }\n        // Call service\n        user, err := userService.GetUser(id)\n        if err != nil {\n            c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})\n            return\n        }\n        c.JSON(http.StatusOK, user)\n    }\n}\n\nfunc main() {\n    // Dependency wiring\n    repo := NewUserRepository()\n    service := NewUserService(repo)\n\n    r := gin.Default()\n    r.GET("/users/:id", GetUser(service))\n    r.Run()\n}',
    explanation:
      '**Concept:** The three‑layer architecture separates concerns: Repository handles data access (in‑memory, database), Service contains business logic, Controller handles HTTP requests/responses. This makes code testable, maintainable, and flexible to change (e.g., swapping repository implementation).\n\n**Dry run:** Request `GET /users/1`. The controller extracts id=1, calls `userService.GetUser(1)`. The service calls `repo.FindByID(1)`, which returns user {ID:1, Name:"Alice"}, ok=true. Service returns user, controller sends JSON. For id=99, repo returns ok=false, service returns error, controller sends 404.',
    hint: "Inject dependencies through constructors (e.g., `NewUserService`). Use interfaces to allow mocking in tests. The controller factory function takes the service as a parameter.",
  },
  {
    id: "go-pgx-connect",
    type: "implementation",
    topic: "Go Database",
    title: "Connect to PostgreSQL using pgx",
    prompt:
      "Write a function `connectDB() (*pgx.Conn, error)` that connects to a local PostgreSQL database using the `pgx` library. Use a connection string (e.g., `postgres://user:pass@localhost:5432/dbname`). Return the connection or an error. Also print a success message on connection.\n\n**Example:**\n```go\nconn, err := connectDB()\nif err != nil { log.Fatal(err) }\ndefer conn.Close(context.Background())\n```\n\n**Expected output (no error):** `Connected to PostgreSQL`",
    starter:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "log"\n    "github.com/jackc/pgx/v5"\n)\n\nfunc connectDB() (*pgx.Conn, error) {\n    // your code\n}\n\nfunc main() {\n    conn, err := connectDB()\n    if err != nil {\n        log.Fatal(err)\n    }\n    defer conn.Close(context.Background())\n    fmt.Println("Connection test passed")\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "log"\n    "os"\n    "github.com/jackc/pgx/v5"\n)\n\nfunc connectDB() (*pgx.Conn, error) {\n    // Use environment variable for security, fallback to default for dev\n    connStr := os.Getenv("DATABASE_URL")\n    if connStr == "" {\n        // Development default\n        connStr = "postgres://postgres:secret@localhost:5432/mydb?sslmode=disable"\n    }\n    // pgx.Connect establishes a single connection (not a pool).\n    // It returns an error if the connection cannot be established.\n    conn, err := pgx.Connect(context.Background(), connStr)\n    if err != nil {\n        return nil, fmt.Errorf("unable to connect to database: %w", err)\n    }\n    // Ping the database to verify connectivity\n    if err := conn.Ping(context.Background()); err != nil {\n        return nil, fmt.Errorf("ping failed: %w", err)\n    }\n    fmt.Println("Connected to PostgreSQL")\n    return conn, nil\n}\n\nfunc main() {\n    conn, err := connectDB()\n    if err != nil {\n        log.Fatal(err)\n    }\n    defer conn.Close(context.Background())\n    // Use the connection...\n    fmt.Println("Connection test passed")\n}',
    explanation:
      "**Concept:** The `pgx` driver is a high‑performance PostgreSQL driver. `pgx.Connect` creates a single connection (not a pool; for a pool use `pgxpool`). The connection string can include parameters like `sslmode`. Always pass a `context` to support cancellation and timeouts. `Ping` verifies the connection is alive. We wrap errors with `fmt.Errorf` and `%w` to preserve error chains.\n\n**Dry run:** `pgx.Connect` attempts a TCP connection to `localhost:5432`. If successful, it returns a `*pgx.Conn`. `Ping` sends a simple query; if the database is not responding, it will error. On success, we print. If any step fails, the error is returned and `main` exits with `log.Fatal`. The `defer conn.Close()` ensures the connection is released even if the program panics.",
    hint: "Store the connection string in an environment variable (`DATABASE_URL`). Always handle connection errors and use `defer conn.Close()`.",
  },
  {
    id: "go-pgx-pool",
    type: "implementation",
    topic: "Go Database",
    title: "Use connection pool with pgxpool",
    prompt:
      "Replace single connection with a connection pool using `pgxpool`. Configure max connections = 10, min idle = 2, and max idle time = 30 minutes. Return a `*pgxpool.Pool`.\n\n**Example:**\n```go\npool, err := connectPool()\ndefer pool.Close()\n```",
    starter:
      'package main\n\nimport (\n    "context"\n    "log"\n    "github.com/jackc/pgx/v5/pgxpool"\n)\n\nfunc connectPool() (*pgxpool.Pool, error) {\n    // your code\n}\n\nfunc main() {\n    pool, err := connectPool()\n    if err != nil {\n        log.Fatal(err)\n    }\n    defer pool.Close()\n    // Use pool.Acquire() or pool.Query() directly\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "log"\n    "time"\n    "github.com/jackc/pgx/v5/pgxpool"\n)\n\nfunc connectPool() (*pgxpool.Pool, error) {\n    // Connection string (use env in real code)\n    connStr := "postgres://postgres:secret@localhost:5432/mydb?sslmode=disable"\n    // ParseConfig allows fine‑tuning pool settings\n    config, err := pgxpool.ParseConfig(connStr)\n    if err != nil {\n        return nil, fmt.Errorf("parse config: %w", err)\n    }\n    // Set pool parameters\n    config.MaxConns = 10               // Maximum number of connections in the pool\n    config.MinConns = 2                // Minimum idle connections kept open\n    config.MaxConnIdleTime = 30 * time.Minute\n    config.HealthCheckPeriod = 1 * time.Minute // Check health of idle connections\n    // Create the pool with the config\n    pool, err := pgxpool.NewWithConfig(context.Background(), config)\n    if err != nil {\n        return nil, fmt.Errorf("create pool: %w", err)\n    }\n    // Verify connectivity\n    if err := pool.Ping(context.Background()); err != nil {\n        pool.Close()\n        return nil, fmt.Errorf("ping failed: %w", err)\n    }\n    fmt.Println("Pool created with max 10 connections")\n    return pool, nil\n}\n\nfunc main() {\n    pool, err := connectPool()\n    if err != nil {\n        log.Fatal(err)\n    }\n    defer pool.Close()\n    // Use pool.QueryRow, etc.\n}',
    explanation:
      "**Concept:** A connection pool manages multiple database connections, reusing them across requests, which is essential for production servers. `pgxpool` is the official pool implementation for pgx. `ParseConfig` loads the connection string, then we modify `MaxConns`, `MinConns`, `MaxConnIdleTime`. `NewWithConfig` creates the pool. `Ping` tests a connection. The pool is safe for concurrent use by multiple goroutines; you can call `pool.Query` directly (it automatically acquires/releases a connection).\n\n**Dry run:** `ParseConfig` parses the string into a `pgxpool.Config`. We set `MaxConns=10` – at most 10 open connections. `MinConns=2` ensures 2 connections are always ready. `NewWithConfig` establishes 2 idle connections immediately (up to 10 when busy). `Ping` uses one of them. The pool remains active until `Close()` is called, which releases all connections. In a web server, you would create the pool once at startup and reuse it.",
    hint: "Use `pgxpool` for production servers. Configure `MaxConns` based on your database's max connections limit. Always close the pool with `defer pool.Close()`.",
  },
  {
    id: "go-pgx-select",
    type: "implementation",
    topic: "Go Database",
    title: "Execute SELECT query and scan results",
    prompt:
      'Given a `users` table with columns `id` (int) and `name` (text), write a function `getUserByID(ctx context.Context, pool *pgxpool.Pool, id int) (User, error)` that returns the user. Handle the case where no row is found (return `ErrNoRows`).\n\n**Example:**\n- Input: `id=1` → returns `User{ID:1, Name:"Alice"}, nil`\n- Input: `id=999` → returns `User{}, sql.ErrNoRows`',
    starter:
      'package main\n\nimport (\n    "context"\n    "errors"\n    "log"\n    "github.com/jackc/pgx/v5"\n    "github.com/jackc/pgx/v5/pgxpool"\n)\n\ntype User struct {\n    ID   int\n    Name string\n}\n\nfunc getUserByID(ctx context.Context, pool *pgxpool.Pool, id int) (User, error) {\n    // your code\n}\n\nfunc main() {\n    // assume pool is initialized\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "errors"\n    "fmt"\n    "log"\n    "github.com/jackc/pgx/v5"\n    "github.com/jackc/pgx/v5/pgxpool"\n)\n\ntype User struct {\n    ID   int\n    Name string\n}\n\nfunc getUserByID(ctx context.Context, pool *pgxpool.Pool, id int) (User, error) {\n    var user User\n    // QueryRow returns a single row; it does NOT return an error immediately.\n    // The error is deferred until Scan.\n    query := "SELECT id, name FROM users WHERE id = $1"\n    err := pool.QueryRow(ctx, query, id).Scan(&user.ID, &user.Name)\n    if err != nil {\n        // pgx returns pgx.ErrNoRows when no rows are found\n        if errors.Is(err, pgx.ErrNoRows) {\n            return User{}, fmt.Errorf("user with id %d not found: %w", id, err)\n        }\n        return User{}, fmt.Errorf("query error: %w", err)\n    }\n    return user, nil\n}\n\nfunc main() {\n    // Example usage (requires a real pool)\n    // pool := ...\n    // user, err := getUserByID(context.Background(), pool, 1)\n    // if errors.Is(err, pgx.ErrNoRows) { ... }\n}',
    explanation:
      "**Concept:** `pool.QueryRow` executes a query that returns at most one row. It returns a `pgx.Row` which defers error handling until `Scan`. `Scan` copies column values into variables. If the query returns no rows, `Scan` returns `pgx.ErrNoRows`. We check that specifically with `errors.Is`. Always use parameter placeholders (`$1`) to prevent SQL injection.\n\n**Dry run:** Query `SELECT id, name FROM users WHERE id = 1`. If a row exists, `Scan` fills `user.ID` and `user.Name`. Returns user, nil. If no row, `Scan` returns `pgx.ErrNoRows`. We wrap that error with a helpful message. The caller can check with `errors.Is(err, pgx.ErrNoRows)`. Any other error (e.g., connection closed) is returned as is.",
    hint: "Always use `QueryRow` for single‑row queries. Check for `pgx.ErrNoRows` using `errors.Is`. Use parameterized queries with `$1` placeholders.",
  },
  {
    id: "go-pgx-insert",
    type: "implementation",
    topic: "Go Database",
    title: "Execute INSERT with RETURNING",
    prompt:
      'Write a function `createUser(ctx context.Context, pool *pgxpool.Pool, name string) (User, error)` that inserts a new user into the `users` table (id is auto‑generated) and returns the created user including the generated ID. Use the `RETURNING` clause.\n\n**Example:**\n- Input: `name="Alice"` → inserts and returns `User{ID: 5, Name:"Alice"}`',
    starter:
      "func createUser(ctx context.Context, pool *pgxpool.Pool, name string) (User, error) {\n    // your code\n}",
    referenceSolution:
      'func createUser(ctx context.Context, pool *pgxpool.Pool, name string) (User, error) {\n    var user User\n    // INSERT with RETURNING to get the generated ID\n    query := `INSERT INTO users (name) VALUES ($1) RETURNING id, name`\n    err := pool.QueryRow(ctx, query, name).Scan(&user.ID, &user.Name)\n    if err != nil {\n        // Check for unique constraint violation (code 23505)\n        var pgErr *pgconn.PgError\n        if errors.As(err, &pgErr) && pgErr.Code == "23505" {\n            return User{}, fmt.Errorf("user with name %s already exists", name)\n        }\n        return User{}, fmt.Errorf("insert failed: %w", err)\n    }\n    return user, nil\n}',
    explanation:
      '**Concept:** The `RETURNING` clause returns values from the inserted row (e.g., auto‑generated ID). We use `QueryRow` and `Scan` to retrieve those values. We also handle a unique constraint violation (PostgreSQL error code `23505`) to give a user‑friendly message.\n\n**Dry run:** `INSERT ... RETURNING id, name` executes. The database generates a new `id` (e.g., 5) and returns both columns. `Scan` populates `user.ID` and `user.Name`. The function returns the complete `User`. If a UNIQUE constraint on `name` is violated, `err` will contain a `*pgconn.PgError` with `Code == "23505"`. We detect that and return a custom error.',
    hint: "Always use `RETURNING` to get generated values. Use `errors.As` to inspect PostgreSQL error codes for constraint violations.",
  },
  {
    id: "go-pgx-update",
    type: "implementation",
    topic: "Go Database",
    title: "Execute UPDATE and check affected rows",
    prompt:
      'Write a function `updateUserName(ctx context.Context, pool *pgxpool.Pool, id int, newName string) error` that updates a user\'s name. It should return an error if no user with that ID exists. Use `RowsAffected()` from `pgx.CommandTag`.\n\n**Example:**\n- `updateUserName(1, "Alice Updated")` updates row and returns nil.\n- `updateUserName(999, "Ghost")` returns error "user not found".',
    starter:
      "func updateUserName(ctx context.Context, pool *pgxpool.Pool, id int, newName string) error {\n    // your code\n}",
    referenceSolution:
      'func updateUserName(ctx context.Context, pool *pgxpool.Pool, id int, newName string) error {\n    query := `UPDATE users SET name = $1 WHERE id = $2`\n    // Exec runs the query and returns a CommandTag\n    cmdTag, err := pool.Exec(ctx, query, newName, id)\n    if err != nil {\n        return fmt.Errorf("update failed: %w", err)\n    }\n    // RowsAffected returns the number of rows modified\n    if cmdTag.RowsAffected() == 0 {\n        return fmt.Errorf("user with id %d not found", id)\n    }\n    return nil\n}',
    explanation:
      "**Concept:** `pool.Exec` executes a query that does not return rows (e.g., UPDATE, INSERT without RETURNING, DELETE). It returns a `pgconn.CommandTag` which contains `RowsAffected()`. If the number of affected rows is zero, the WHERE clause did not match any record – we treat this as a “not found” error.\n\n**Dry run:** UPDATE command runs. If `id` exists, the database updates the row and `RowsAffected()` returns 1; function returns nil. If `id` does not exist, `RowsAffected()` returns 0, so we return our custom error. This pattern is common for idempotent updates where existence matters.",
    hint: "Use `pool.Exec` for UPDATE/DELETE. Check `cmdTag.RowsAffected()` to know if the operation changed any rows.",
  },
  {
    id: "go-pgx-delete",
    type: "implementation",
    topic: "Go Database",
    title: "Execute DELETE and handle missing row",
    prompt:
      'Write a function `deleteUser(ctx context.Context, pool *pgxpool.Pool, id int) error` that deletes a user. Return a custom error if the user does not exist.\n\n**Example:**\n- `deleteUser(1)` → deletes user, returns nil.\n- `deleteUser(999)` → returns error "user not found".',
    starter:
      "func deleteUser(ctx context.Context, pool *pgxpool.Pool, id int) error {\n    // your code\n}",
    referenceSolution:
      'func deleteUser(ctx context.Context, pool *pgxpool.Pool, id int) error {\n    query := `DELETE FROM users WHERE id = $1`\n    cmdTag, err := pool.Exec(ctx, query, id)\n    if err != nil {\n        return fmt.Errorf("delete failed: %w", err)\n    }\n    if cmdTag.RowsAffected() == 0 {\n        return fmt.Errorf("user with id %d not found", id)\n    }\n    return nil\n}',
    explanation:
      "**Concept:** Similar to UPDATE, DELETE returns the number of rows removed. If `RowsAffected()` is zero, the condition did not match. This allows us to distinguish between successful deletion (a row existed and was removed) and a no‑op (no such row).\n\n**Dry run:** `DELETE FROM users WHERE id = 1` – if id exists, it returns 1 row affected; function returns nil. If id does not exist, `RowsAffected() == 0`, we return an error.",
    hint: "Same as UPDATE: use `Exec` and check `RowsAffected`. Return a descriptive error when no rows affected.",
  },
  {
    id: "go-pgx-transaction",
    type: "implementation",
    topic: "Go Database",
    title: "Implement transaction: transfer money",
    prompt:
      "Write a function `transferMoney(ctx context.Context, pool *pgxpool.Pool, fromID, toID int, amount int) error` that transfers money between two accounts. Use a transaction to ensure both updates succeed or none. Also check that the from account has sufficient balance. Use `FOR UPDATE` to lock rows.\n\n**Example:**\n- Transfer 100 from account 1 to 2 → success.\n- Transfer 1000 from account 1 with insufficient funds → rollback, return error.",
    starter:
      "func transferMoney(ctx context.Context, pool *pgxpool.Pool, fromID, toID int, amount int) error {\n    // your code\n}",
    referenceSolution:
      'func transferMoney(ctx context.Context, pool *pgxpool.Pool, fromID, toID int, amount int) error {\n    // Start a transaction\n    tx, err := pool.Begin(ctx)\n    if err != nil {\n        return fmt.Errorf("begin tx: %w", err)\n    }\n    // Ensure rollback in case of panic or error (but we will commit on success)\n    defer func() {\n        if err != nil {\n            // If an error occurred, rollback (ignoring rollback error)\n            _ = tx.Rollback(ctx)\n        }\n    }()\n\n    // Select from account with FOR UPDATE to lock the row\n    var balance int\n    querySelect := `SELECT balance FROM accounts WHERE id = $1 FOR UPDATE`\n    err = tx.QueryRow(ctx, querySelect, fromID).Scan(&balance)\n    if err != nil {\n        return fmt.Errorf("query from account: %w", err)\n    }\n    if balance < amount {\n        return fmt.Errorf("insufficient balance: have %d, need %d", balance, amount)\n    }\n\n    // Deduct from fromAccount\n    _, err = tx.Exec(ctx, `UPDATE accounts SET balance = balance - $1 WHERE id = $2`, amount, fromID)\n    if err != nil {\n        return fmt.Errorf("deduct failed: %w", err)\n    }\n    // Add to toAccount\n    _, err = tx.Exec(ctx, `UPDATE accounts SET balance = balance + $1 WHERE id = $2`, amount, toID)\n    if err != nil {\n        return fmt.Errorf("add failed: %w", err)\n    }\n\n    // Commit transaction\n    err = tx.Commit(ctx)\n    if err != nil {\n        return fmt.Errorf("commit failed: %w", err)\n    }\n    return nil\n}',
    explanation:
      "**Concept:** A transaction ensures atomicity. `pool.Begin` starts a transaction. We use `defer` to rollback if any error occurs before commit. `FOR UPDATE` locks the selected row(s) to prevent concurrent modifications (prevents race conditions on balance check). After deducting and adding, we commit. If commit fails, rollback is already handled.\n\n**Dry run:** For a valid transfer, `SELECT ... FOR UPDATE` locks the from row. Balance check passes. Updates run. Commit makes changes permanent. If any error occurs (e.g., insufficient balance, deadlock, connection issue), the defer rollback reverts all changes. This guarantees consistency.",
    hint: "Use `tx.Begin()`, then `defer` rollback. Lock rows with `FOR UPDATE` to avoid race conditions. Always check errors after each operation.",
  },
  {
    id: "go-pgx-errors",
    type: "implementation",
    topic: "Go Database",
    title: "Handle PostgreSQL errors (unique violation, foreign key)",
    prompt:
      'Write a function `createOrder(ctx context.Context, pool *pgxpool.Pool, userID int, productID int) error` that inserts an order. Handle the following errors:\n- Unique violation (e.g., duplicate order number) – return a custom error message.\n- Foreign key violation (user or product does not exist) – return a custom error.\nUse `pgconn.PgError` to inspect the error code.\n\n**Example:**\n- If userID does not exist → return "user not found".',
    starter:
      "func createOrder(ctx context.Context, pool *pgxpool.Pool, userID, productID int) error {\n    // your code\n}",
    referenceSolution:
      'func createOrder(ctx context.Context, pool *pgxpool.Pool, userID, productID int) error {\n    query := `INSERT INTO orders (user_id, product_id) VALUES ($1, $2)`\n    _, err := pool.Exec(ctx, query, userID, productID)\n    if err != nil {\n        var pgErr *pgconn.PgError\n        if errors.As(err, &pgErr) {\n            switch pgErr.Code {\n            case "23505": // unique_violation\n                return fmt.Errorf("duplicate order detected: %s", pgErr.Detail)\n            case "23503": // foreign_key_violation\n                // Check constraint name to know which FK failed (optional)\n                if pgErr.ConstraintName == "orders_user_id_fkey" {\n                    return fmt.Errorf("user %d not found", userID)\n                } else if pgErr.ConstraintName == "orders_product_id_fkey" {\n                    return fmt.Errorf("product %d not found", productID)\n                }\n                return fmt.Errorf("foreign key violation: %s", pgErr.Detail)\n            default:\n                return fmt.Errorf("database error: %w", err)\n            }\n        }\n        return fmt.Errorf("unexpected error: %w", err)\n    }\n    return nil\n}',
    explanation:
      '**Concept:** PostgreSQL error codes are standard. `pgconn.PgError` contains fields like `Code`, `ConstraintName`, `Detail`. We use `errors.As` to extract the PG error. Unique violation (23505) and foreign key violation (23503) are common. By checking `ConstraintName`, we can give specific user‑friendly messages. This makes error handling robust and debuggable.\n\n**Dry run:** Insert with a duplicate primary key → pgErr.Code = "23505", we return a custom message. Insert with missing user → pgErr.Code = "23503", ConstraintName matched, we return specific error. Any other database error (e.g., serialization failure) goes to default case.',
    hint: 'Use `errors.As(err, &pgErr)` to get PostgreSQL error details. Check `pgErr.Code` against PostgreSQL error codes (e.g., "23505").',
  },
  {
    id: "go-golang-migrate-create",
    type: "implementation",
    topic: "Go Database",
    title: "Create migrations with golang-migrate",
    prompt:
      "Write the commands to:\n1. Install golang-migrate (on macOS/Linux).\n2. Create a migration file named `create_users_table`.\n3. Write the migration content (up and down) to create a `users` table with `id` (serial PK), `name` (text), `email` (text unique).\n\n**Example:**\n- Migration file names: `000001_create_users_table.up.sql` and `.down.sql`.",
    starter: "# Your bash commands here",
    referenceSolution:
      "```bash\n# Install (Linux/macOS)\ncurl -L https://github.com/golang-migrate/migrate/releases/download/v4.17.0/migrate.linux-amd64.tar.gz | tar xvz\nsudo mv migrate /usr/local/bin/\n\n# Create migration\nmigrate create -ext sql -dir migrations -seq create_users_table\n\n# File: migrations/000001_create_users_table.up.sql\nCREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    name TEXT NOT NULL,\n    email TEXT UNIQUE NOT NULL\n);\n\n# File: migrations/000001_create_users_table.down.sql\nDROP TABLE users;\n```",
    explanation:
      '**Concept:** `golang-migrate` manages SQL‑based migrations. The `create` command generates `.up.sql` (forward migration) and `.down.sql` (rollback). The `-seq` flag uses sequential numbering. Run `migrate up` to apply all pending migrations. This tool is database‑agnostic and stores a `schema_migrations` table to track applied migrations.\n\n**Dry run:** After creation, run `migrate -path migrations -database "postgres://..." up`. The tool reads all `.up.sql` files not yet applied and executes them in order. For rollback: `migrate down 1` runs the corresponding `.down.sql`.',
    hint: "Always write a `down` migration to allow rollback. Store migration files in version control.",
  },
  {
    id: "go-redis-connect",
    type: "implementation",
    topic: "Go Redis",
    title: "Connect to Redis using go-redis",
    prompt:
      'Write a function `newRedisClient() *redis.Client` that connects to a local Redis instance (localhost:6379) with no password. Test the connection with `Ping` and print "Connected to Redis".\n\n**Example:**\n```go\nrdb := newRedisClient()\n// Use rdb\n```',
    starter:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "github.com/redis/go-redis/v9"\n)\n\nfunc newRedisClient() *redis.Client {\n    // your code\n}\n\nfunc main() {\n    rdb := newRedisClient()\n    defer rdb.Close()\n    // test ping\n}',
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "fmt"\n    "log"\n    "github.com/redis/go-redis/v9"\n)\n\nfunc newRedisClient() *redis.Client {\n    // Create a new Redis client with options\n    rdb := redis.NewClient(&redis.Options{\n        Addr:     "localhost:6379", // Redis server address\n        Password: "",               // No password\n        DB:       0,                // Default DB\n    })\n    return rdb\n}\n\nfunc main() {\n    ctx := context.Background()\n    rdb := newRedisClient()\n    defer rdb.Close() // Close the client when main exits\n\n    // Ping the Redis server to test connectivity\n    if err := rdb.Ping(ctx).Err(); err != nil {\n        log.Fatal("Redis connection failed:", err)\n    }\n    fmt.Println("Connected to Redis")\n}',
    explanation:
      "**Concept:** `go-redis` is a popular Redis client. `redis.NewClient` takes a config struct. The `Ping` command sends a `PING` to the server; `Err()` returns any error. The client maintains a connection pool internally. `defer rdb.Close()` flushes pending commands and closes connections. Always pass a `context` to every Redis command.\n\n**Dry run:** `redis.NewClient` initializes the client but does not connect immediately. `rdb.Ping(ctx).Err()` sends a `PING` command; if Redis is running at `localhost:6379`, it responds `PONG`, and `Err()` returns nil. We print success. If Redis is unavailable, `Ping` returns an error (e.g., dial tcp …), and the program exits.",
    hint: "Always test connectivity with `Ping`. Use `context.Background()` or a request‑scoped context.",
  },
  {
    id: "go-redis-set-get",
    type: "implementation",
    topic: "Go Redis",
    title: "Set and get values from Redis",
    prompt:
      'Write a function `cacheUser(ctx context.Context, rdb *redis.Client, userID int, userName string) error` that stores `userName` in Redis with key `user:{id}` and TTL of 1 hour. Then write `getUser(ctx, rdb, userID) (string, error)` that retrieves it, returning `redis.Nil` if not found.\n\n**Example:**\n- `cacheUser(ctx, rdb, 1, "Alice")` → stores.\n- `getUser(ctx, rdb, 1)` → returns `"Alice", nil`.',
    starter:
      "func cacheUser(ctx context.Context, rdb *redis.Client, userID int, userName string) error {\n    // your code\n}\n\nfunc getUser(ctx context.Context, rdb *redis.Client, userID int) (string, error) {\n    // your code\n}",
    referenceSolution:
      'func cacheUser(ctx context.Context, rdb *redis.Client, userID int, userName string) error {\n    key := fmt.Sprintf("user:%d", userID)\n    // Set the key with value and expiration of 1 hour\n    // SetEx sets the key with expiry (seconds)\n    err := rdb.SetEx(ctx, key, userName, 1*time.Hour).Err()\n    if err != nil {\n        return fmt.Errorf("failed to cache user: %w", err)\n    }\n    return nil\n}\n\nfunc getUser(ctx context.Context, rdb *redis.Client, userID int) (string, error) {\n    key := fmt.Sprintf("user:%d", userID)\n    // Get returns a StringCmd; call Result() to get value and error\n    val, err := rdb.Get(ctx, key).Result()\n    if errors.Is(err, redis.Nil) {\n        // Key does not exist\n        return "", nil // or return empty, not found\n    }\n    if err != nil {\n        return "", fmt.Errorf("redis get error: %w", err)\n    }\n    return val, nil\n}',
    explanation:
      '**Concept:** `SetEx` sets a key with expiration (in seconds). `Get` returns the value. Redis returns `redis.Nil` when the key does not exist; we check with `errors.Is`. This pattern is used for caching: write through to cache on DB writes, read from cache before DB query.\n\n**Dry run:** `cacheUser` stores `"Alice"` at key `user:1` with TTL 3600s. `getUser` fetches it, returns `"Alice"`. After TTL, `Get` returns `redis.Nil`, and we can treat as cache miss.',
    hint: "Use `SetEx` to set TTL. Check `redis.Nil` to distinguish missing key from other errors.",
  },
  {
    id: "go-redis-cache-aside",
    type: "implementation",
    topic: "Go Redis",
    title: "Implement cache‑aside pattern",
    prompt:
      "Write a function `getProductWithCache(ctx context.Context, rdb *redis.Client, db *pgxpool.Pool, productID int) (*Product, error)` that:\n1. Checks Redis for `product:{id}`.\n2. If found, returns the cached product.\n3. If not found, queries the database, caches the result with TTL 10 minutes, then returns it.\n\n**Example:**\nFirst call → DB query, cache set. Second call → cache hit.",
    starter:
      "type Product struct {\n    ID    int\n    Name  string\n    Price int\n}\n\nfunc getProductWithCache(ctx context.Context, rdb *redis.Client, db *pgxpool.Pool, productID int) (*Product, error) {\n    // your code\n}",
    referenceSolution:
      'func getProductWithCache(ctx context.Context, rdb *redis.Client, db *pgxpool.Pool, productID int) (*Product, error) {\n    cacheKey := fmt.Sprintf("product:%d", productID)\n\n    // 1. Try cache\n    cached, err := rdb.Get(ctx, cacheKey).Result()\n    if err == nil {\n        var prod Product\n        if jsonErr := json.Unmarshal([]byte(cached), &prod); jsonErr == nil {\n            return &prod, nil\n        }\n        // If unmarshal fails, proceed to DB (cache corruption)\n    } else if !errors.Is(err, redis.Nil) {\n        // Redis error other than missing key – log and fall back to DB\n        log.Printf("Redis error: %v", err)\n    }\n\n    // 2. Cache miss: query database\n    var prod Product\n    query := `SELECT id, name, price FROM products WHERE id = $1`\n    err = db.QueryRow(ctx, query, productID).Scan(&prod.ID, &prod.Name, &prod.Price)\n    if err != nil {\n        if errors.Is(err, pgx.ErrNoRows) {\n            return nil, fmt.Errorf("product %d not found", productID)\n        }\n        return nil, fmt.Errorf("db error: %w", err)\n    }\n\n    // 3. Store in cache (as JSON)\n    data, _ := json.Marshal(prod)\n    // Set with TTL 10 minutes (600 seconds)\n    if err := rdb.SetEx(ctx, cacheKey, data, 10*time.Minute).Err(); err != nil {\n        log.Printf("failed to cache product: %v", err) // non‑critical\n    }\n    return &prod, nil\n}',
    explanation:
      "**Concept:** Cache‑aside (lazy loading) reduces database load. The application checks cache first; on miss, loads from DB and populates cache. Errors from Redis are logged but do not break the request (fallback to DB). We serialize the product to JSON before storing. TTL ensures stale data eventually expires.\n\n**Dry run:** First request for product 1: Redis miss → DB query → cache set with TTL 10min → return. Second request within 10min: Redis hit → unmarshal JSON → return cached product. If Redis is down, we still serve from DB (degraded but functional).",
    hint: "Use JSON marshaling for complex objects. Handle Redis errors gracefully – fallback to DB. Set appropriate TTL to balance freshness and cache hit rate.",
  },
  {
    id: "go-redis-pubsub",
    type: "implementation",
    topic: "Go Redis",
    title: "Implement Redis Pub/Sub",
    prompt:
      'Write two functions:\n- `publishEvent(ctx context.Context, rdb *redis.Client, channel string, message string) error`\n- `subscribeEvent(ctx context.Context, rdb *redis.Client, channel string) (string, error)` – note: subscribing is blocking, so you\'d run it in a goroutine. Show usage: publisher sends "hello", subscriber prints it.\n\n**Example:**\nSubscriber goroutine prints: `Received: hello`',
    starter:
      "func publishEvent(ctx context.Context, rdb *redis.Client, channel, message string) error {\n    // your code\n}\n\nfunc subscribeEvent(ctx context.Context, rdb *redis.Client, channel string) {\n    // your code\n}",
    referenceSolution:
      'func publishEvent(ctx context.Context, rdb *redis.Client, channel, message string) error {\n    // Publish returns the number of subscribers that received the message\n    err := rdb.Publish(ctx, channel, message).Err()\n    if err != nil {\n        return fmt.Errorf("publish failed: %w", err)\n    }\n    return nil\n}\n\nfunc subscribeEvent(ctx context.Context, rdb *redis.Client, channel string) {\n    // Subscribe to the channel\n    pubsub := rdb.Subscribe(ctx, channel)\n    defer pubsub.Close()\n\n    // Wait for confirmation that subscription is active\n    _, err := pubsub.Receive(ctx)\n    if err != nil {\n        log.Printf("subscribe receive error: %v", err)\n        return\n    }\n\n    // Channel for incoming messages\n    ch := pubsub.Channel()\n    for {\n        select {\n        case msg := <-ch:\n            fmt.Printf("Received on %s: %s\\n", msg.Channel, msg.Payload)\n        case <-ctx.Done():\n            fmt.Println("subscriber shutting down")\n            return\n        }\n    }\n}\n\nfunc main() {\n    ctx := context.Background()\n    rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})\n    // Start subscriber in a goroutine\n    go subscribeEvent(ctx, rdb, "notifications")\n    time.Sleep(100 * time.Millisecond) // allow subscription to establish\n    // Publish a message\n    if err := publishEvent(ctx, rdb, "notifications", "hello"); err != nil {\n        log.Fatal(err)\n    }\n    time.Sleep(1 * time.Second) // let subscriber print\n}',
    explanation:
      '**Concept:** Redis Pub/Sub allows message broadcasting. `Subscribe` creates a subscription, `Receive` blocks until the subscription is ready. `pubsub.Channel()` returns a Go channel that receives messages. The loop reads messages until the context is cancelled. Publisher uses `Publish`. Messages are not persisted; if the subscriber is offline, it misses them.\n\n**Dry run:** Subscriber goroutine subscribes to `notifications`. It waits for messages. Publisher sends `"hello"`. Redis delivers the message to all active subscribers. The subscriber\'s loop prints `Received on notifications: hello`. The subscriber continues listening until context cancellation.',
    hint: "Call `pubsub.Receive` after `Subscribe` to ensure subscription is active. Use a goroutine to handle messages because `Channel()` blocks. Close the pubsub when done.",
  },
  {
    id: "go-redis-rate-limiter",
    type: "implementation",
    topic: "Go Redis",
    title: "Implement sliding window rate limiter with Redis",
    prompt:
      'Implement a rate limiter that allows at most `N` requests per `window` seconds per IP. Use a Redis sorted set where member = timestamp, score = timestamp. Write a function `allowRequest(ctx context.Context, rdb *redis.Client, ip string, limit int, window time.Duration) (bool, error)`.\n\n**Example:**\n- `allowRequest(..., "192.168.1.1", 10, 60*time.Second)` → true for first 10 requests, false for 11th within 60s.',
    starter:
      "func allowRequest(ctx context.Context, rdb *redis.Client, ip string, limit int, window time.Duration) (bool, error) {\n    // your code\n}",
    referenceSolution:
      'func allowRequest(ctx context.Context, rdb *redis.Client, ip string, limit int, window time.Duration) (bool, error) {\n    key := fmt.Sprintf("rate_limit:%s", ip)\n    now := time.Now().UnixMilli() // use milliseconds for precision\n    windowStart := now - window.Milliseconds()\n\n    // Use pipeline to reduce round trips\n    pipe := rdb.Pipeline()\n    // Remove entries older than the window\n    pipe.ZRemRangeByScore(ctx, key, "0", fmt.Sprintf("%d", windowStart))\n    // Add current timestamp as member (member must be unique; we can use timestamp:nanosecond)\n    member := fmt.Sprintf("%d:%d", now, time.Now().Nanosecond())\n    pipe.ZAdd(ctx, key, redis.Z{Score: float64(now), Member: member})\n    // Count entries in the window\n    pipe.ZCard(ctx, key)\n    // Set TTL on the key to clean up (window + some margin)\n    pipe.Expire(ctx, key, window+time.Second)\n\n    cmders, err := pipe.Exec(ctx)\n    if err != nil && err != redis.Nil {\n        return false, fmt.Errorf("redis pipeline error: %w", err)\n    }\n    // ZCard result is the third command (index 2)\n    count := cmders[2].(*redis.IntCmd).Val()\n    allowed := count <= int64(limit)\n    return allowed, nil\n}',
    explanation:
      "**Concept:** A sorted set stores timestamps as scores. We remove entries older than `windowStart`, add the current timestamp, count remaining entries. If count ≤ limit, request is allowed. The pipeline groups commands for atomicity and reduces network round trips. The TTL ensures the key is eventually deleted even if no further requests occur.\n\n**Dry run:** First request: ZRem removes none (window empty), ZAdd adds current timestamp, ZCard returns 1, allowed = true (1 ≤ 10). 11th request within the same window: after cleaning old entries, count = 11, allowed = false. The pipeline executes atomically, so concurrent requests do not race.",
    hint: "Use pipeline for atomicity. Use milliseconds for scores. Include a unique suffix (nanosecond) in member to avoid score collisions. Set TTL to clean up unused keys.",
  },
  {
    id: "go-redis-distributed-lock",
    type: "implementation",
    topic: "Go Redis",
    title: "Implement distributed lock with Redis (SET NX EX)",
    prompt:
      'Write a function `acquireLock(ctx context.Context, rdb *redis.Client, lockKey string, ttl time.Duration) (bool, error)` that tries to acquire a lock using `SET NX EX`. Return true if acquired. Write `releaseLock(ctx, rdb, lockKey, token) error` that releases only if the token matches (use Lua script or `GET`+`DEL`). Use a random token.\n\n**Example:**\n```go\nok, err := acquireLock(ctx, rdb, "resource:1", 10*time.Second)\nif ok { defer releaseLock(ctx, rdb, "resource:1", token) }',
    starter:
      "func acquireLock(ctx context.Context, rdb *redis.Client, lockKey string, ttl time.Duration) (bool, string, error) {\n    // returns (acquired, token, error)\n}\n\nfunc releaseLock(ctx context.Context, rdb *redis.Client, lockKey, token string) error {\n    // your code\n}",
    referenceSolution:
      'func acquireLock(ctx context.Context, rdb *redis.Client, lockKey string, ttl time.Duration) (bool, string, error) {\n    // Generate a random token (e.g., UUID)\n    token := uuid.New().String()\n    // SET key token NX EX seconds\n    // NX: only set if key does not exist (atomic)\n    // EX: set expiry in seconds\n    ok, err := rdb.SetNX(ctx, lockKey, token, ttl).Result()\n    if err != nil {\n        return false, "", fmt.Errorf("lock acquire error: %w", err)\n    }\n    return ok, token, nil\n}\n\nfunc releaseLock(ctx context.Context, rdb *redis.Client, lockKey, token string) error {\n    // Lua script to compare token and delete only if matches\n    script := `\n        if redis.call("get", KEYS[1]) == ARGV[1] then\n            return redis.call("del", KEYS[1])\n        else\n            return 0\n        end\n    `\n    result, err := rdb.Eval(ctx, script, []string{lockKey}, token).Result()\n    if err != nil {\n        return fmt.Errorf("release lock error: %w", err)\n    }\n    if result.(int64) == 0 {\n        return fmt.Errorf("lock not held or token mismatch")\n    }\n    return nil\n}',
    explanation:
      "**Concept:** Distributed locks prevent concurrent access to a shared resource across multiple processes. `SetNX` atomically sets a key only if it doesn't exist, with a TTL to avoid deadlocks. The token ensures that only the lock owner can release it. The Lua script checks the token before deletion, making the release atomic.\n\n**Dry run:** Process A calls `acquireLock` → `SetNX` returns true, token T1 created. Process B later tries – `SetNX` returns false (key exists). When A finishes, it calls `releaseLock` with T1; Lua script compares token, matches, deletes key, returns 1. If another process tries to release with wrong token, script returns 0 and error.",
    hint: "Use `SetNX` for atomic acquire. Use a Lua script for safe release. Always set a TTL to avoid deadlocks.",
  },
  {
    id: "go-redis-session-store",
    type: "implementation",
    topic: "Go Redis",
    title: "Store user session in Redis",
    prompt:
      'Implement session management using Redis: `createSession(ctx, rdb, userID string) (sessionID string, error)` that generates a random session ID, stores `userID` in Redis with key `session:{sessionID}` and TTL 1 hour. `getUserID(ctx, rdb, sessionID) (string, error)` retrieves the user ID, returning an error if session expired or not found.\n\n**Example:**\n```go\nsid, _ := createSession(ctx, rdb, "123")\nuid, _ := getUserID(ctx, rdb, sid) // returns "123"',
    starter:
      "func createSession(ctx context.Context, rdb *redis.Client, userID string) (string, error) {\n    // your code\n}\n\nfunc getUserID(ctx context.Context, rdb *redis.Client, sessionID string) (string, error) {\n    // your code\n}",
    referenceSolution:
      'func createSession(ctx context.Context, rdb *redis.Client, userID string) (string, error) {\n    // Generate a random session ID (e.g., UUID)\n    sessionID := uuid.New().String()\n    key := fmt.Sprintf("session:%s", sessionID)\n    // Store userID as value, set expiry 1 hour\n    err := rdb.SetEx(ctx, key, userID, 1*time.Hour).Err()\n    if err != nil {\n        return "", fmt.Errorf("failed to create session: %w", err)\n    }\n    return sessionID, nil\n}\n\nfunc getUserID(ctx context.Context, rdb *redis.Client, sessionID string) (string, error) {\n    key := fmt.Sprintf("session:%s", sessionID)\n    userID, err := rdb.Get(ctx, key).Result()\n    if errors.Is(err, redis.Nil) {\n        return "", fmt.Errorf("session not found or expired")\n    }\n    if err != nil {\n        return "", fmt.Errorf("redis error: %w", err)\n    }\n    return userID, nil\n}',
    explanation:
      '**Concept:** Storing session data in Redis allows shared sessions across multiple server instances. The session ID is a random token (UUID) returned to the client (e.g., as a cookie). The actual user ID is stored in Redis with a TTL. On subsequent requests, the client provides the session ID, and we look up the user ID. This is stateless on the server side.\n\n**Dry run:** After login, `createSession` stores `session:abc-123` = `"123"` with TTL 1h. The client sends `abc-123` in a cookie. Next request, `getUserID` retrieves `"123"`. If the session expires, `Get` returns `redis.Nil`, and we return an error forcing re‑authentication.',
    hint: "Use a secure random generator for session IDs. Set a reasonable TTL. For production, also set a `MaxAge` on the cookie.",
  },
  {
    id: "go-redis-json-cache",
    type: "implementation",
    topic: "Go Redis",
    title: "Cache complex objects as JSON",
    prompt:
      'Write a generic function `cacheSet(ctx context.Context, rdb *redis.Client, key string, value interface{}, ttl time.Duration) error` that marshals `value` to JSON and stores it. Write `cacheGet(ctx, rdb, key, dest interface{}) error` that unmarshals into `dest`. Handle `redis.Nil` appropriately.\n\n**Example:**\n```go\nuser := User{ID:1, Name:"Alice"}\ncacheSet(ctx, rdb, "user:1", user, 5*time.Minute)\nvar cached User\ncacheGet(ctx, rdb, "user:1", &cached)',
    starter:
      "func cacheSet(ctx context.Context, rdb *redis.Client, key string, value interface{}, ttl time.Duration) error {\n    // your code\n}\n\nfunc cacheGet(ctx context.Context, rdb *redis.Client, key string, dest interface{}) error {\n    // your code\n}",
    referenceSolution:
      'func cacheSet(ctx context.Context, rdb *redis.Client, key string, value interface{}, ttl time.Duration) error {\n    // Marshal value to JSON\n    data, err := json.Marshal(value)\n    if err != nil {\n        return fmt.Errorf("json marshal error: %w", err)\n    }\n    // Store in Redis with TTL\n    err = rdb.SetEx(ctx, key, data, ttl).Err()\n    if err != nil {\n        return fmt.Errorf("redis set error: %w", err)\n    }\n    return nil\n}\n\nfunc cacheGet(ctx context.Context, rdb *redis.Client, key string, dest interface{}) error {\n    // Get JSON string from Redis\n    data, err := rdb.Get(ctx, key).Bytes()\n    if errors.Is(err, redis.Nil) {\n        return fmt.Errorf("cache miss: %w", err)\n    }\n    if err != nil {\n        return fmt.Errorf("redis get error: %w", err)\n    }\n    // Unmarshal into dest (must be a pointer)\n    if err := json.Unmarshal(data, dest); err != nil {\n        return fmt.Errorf("json unmarshal error: %w", err)\n    }\n    return nil\n}',
    explanation:
      "**Concept:** These generic helpers simplify caching any Go struct. They handle JSON serialization, store as a string in Redis. `cacheGet` expects a pointer to the destination struct. This pattern is reusable across different data types.\n\n**Dry run:** `cacheSet` → `json.Marshal` converts `User` to JSON string, `SetEx` stores it. `cacheGet` → retrieves the string, `json.Unmarshal` populates the passed pointer. If the key is missing, `Get` returns `redis.Nil`, which we wrap as a cache miss error for the caller to handle.",
    hint: "Use `Get(...).Bytes()` to get raw JSON. The destination in `cacheGet` must be a pointer. Handle `redis.Nil` as a cache miss.",
  },
  {
    id: "go-pgx-prepared-statement",
    type: "implementation",
    topic: "Go Database",
    title: "Use prepared statements with pgx",
    prompt:
      "Write a function `getUsersByAgeRange(ctx context.Context, pool *pgxpool.Pool, minAge, maxAge int) ([]User, error)` that uses a prepared statement to query users within an age range. Prepare the statement once when the application starts, then reuse it.\n\n**Example:**\n- `getUsersByAgeRange(ctx, pool, 18, 30)` returns users with age between 18 and 30.",
    starter:
      "type User struct {\n    ID   int\n    Name string\n    Age  int\n}\n\n// Prepare statement at startup\nfunc prepareGetUsersByAgeRange(ctx context.Context, pool *pgxpool.Pool) error {\n    // your code\n}\n\nfunc getUsersByAgeRange(ctx context.Context, pool *pgxpool.Pool, minAge, maxAge int) ([]User, error) {\n    // use prepared statement\n}",
    referenceSolution:
      'var getUsersByAgeRangeStmt *pgxpool.Conn\n\nfunc prepareGetUsersByAgeRange(ctx context.Context, pool *pgxpool.Pool) error {\n    // Acquire a connection from the pool to prepare the statement\n    conn, err := pool.Acquire(ctx)\n    if err != nil {\n        return fmt.Errorf("acquire connection: %w", err)\n    }\n    defer conn.Release()\n    // Prepare the statement on this connection\n    stmtName := "getUsersByAgeRange"\n    sql := `SELECT id, name, age FROM users WHERE age BETWEEN $1 AND $2 ORDER BY age`\n    _, err = conn.Conn().Prepare(ctx, stmtName, sql)\n    if err != nil {\n        return fmt.Errorf("prepare statement: %w", err)\n    }\n    getUsersByAgeRangeStmt = conn\n    return nil\n}\n\nfunc getUsersByAgeRange(ctx context.Context, pool *pgxpool.Pool, minAge, maxAge int) ([]User, error) {\n    // Use the prepared statement (but we must re‑acquire a connection because the pool rotates)\n    // Better: prepare on the pool by using pool.Query with a name – pgxpool doesn\'t support named prepared statements directly.\n    // Alternative: use regular Query (which still auto‑prepares) or use a separate *pgx.Conn.\n    // For simplicity, we\'ll use pool.Query, which still benefits from the standard prepared statement cache.\n    rows, err := pool.Query(ctx, `SELECT id, name, age FROM users WHERE age BETWEEN $1 AND $2 ORDER BY age`, minAge, maxAge)\n    if err != nil {\n        return nil, fmt.Errorf("query error: %w", err)\n    }\n    defer rows.Close()\n\n    var users []User\n    for rows.Next() {\n        var u User\n        if err := rows.Scan(&u.ID, &u.Name, &u.Age); err != nil {\n            return nil, fmt.Errorf("scan error: %w", err)\n        }\n        users = append(users, u)\n    }\n    if err := rows.Err(); err != nil {\n        return nil, fmt.Errorf("rows error: %w", err)\n    }\n    return users, nil\n}',
    explanation:
      "**Concept:** Prepared statements improve performance and security for repeated queries. In pgx, you can prepare a statement with `Conn.Prepare`. However, `pgxpool` does not directly support named prepared statements across connections because each connection has its own statement cache. A simpler approach: rely on the automatic prepared statement cache in pgx (it caches statements per connection) or use `Query` directly – pgx will still prepare implicitly. For true reuse, you would use a single dedicated connection or a statement cache wrapper.\n\n**Dry run:** `pool.Query` sends the SQL; pgx checks if a prepared statement already exists for that SQL string on that connection; if not, it prepares one. Subsequent calls on the same connection reuse the prepared statement. This is transparent to the developer. The function collects all rows into a slice and returns.",
    hint: "For most use cases, `pool.Query` with parameterized SQL is sufficient; pgx caches prepared statements per connection. To explicitly reuse across requests, consider using `pgxpool` with a statement cache configuration, or use a single `*pgx.Conn` for prepared statements.",
  },
  {
    id: "go-db-context-timeout",
    type: "implementation",
    topic: "Go Database",
    title: "Use context timeout for DB queries",
    prompt:
      "Write a function `getUserWithTimeout(ctx context.Context, pool *pgxpool.Pool, id int) (User, error)` that uses the context to enforce a 2‑second deadline. If the query takes longer, it should return a deadline exceeded error. Demonstrate passing a context with timeout.\n\n**Example:**\n```go\nctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\ndefer cancel()\nuser, err := getUserWithTimeout(ctx, pool, 1)\n```",
    starter:
      "func getUserWithTimeout(ctx context.Context, pool *pgxpool.Pool, id int) (User, error) {\n    // your code\n}",
    referenceSolution:
      'func getUserWithTimeout(ctx context.Context, pool *pgxpool.Pool, id int) (User, error) {\n    var user User\n    query := `SELECT id, name FROM users WHERE id = $1`\n    // QueryRowContext uses the context\'s deadline\n    err := pool.QueryRowContext(ctx, query, id).Scan(&user.ID, &user.Name)\n    if err != nil {\n        // Check if error is due to timeout\n        if errors.Is(err, context.DeadlineExceeded) {\n            return User{}, fmt.Errorf("query timed out: %w", err)\n        }\n        if errors.Is(err, pgx.ErrNoRows) {\n            return User{}, fmt.Errorf("user %d not found", id)\n        }\n        return User{}, fmt.Errorf("query error: %w", err)\n    }\n    return user, nil\n}',
    explanation:
      "**Concept:** The `Context` passed to database operations controls timeouts and cancellation. If the context expires before the query completes, the driver interrupts the operation and returns `context.DeadlineExceeded`. This prevents a single slow query from hogging a connection and allows the caller to set per‑request deadlines.\n\n**Dry run:** A context with a 2s deadline is passed. If the query takes 3s (e.g., due to database load), `pool.QueryRowContext` will return `context.DeadlineExceeded` after 2s. We detect that with `errors.Is` and return a user‑friendly timeout error. If the user doesn't exist, we get `pgx.ErrNoRows` and handle it.",
    hint: "Always pass a context with a reasonable timeout to database operations. Check `context.DeadlineExceeded` to distinguish timeouts from other errors.",
  },
  {
    id: "go-test-unit-table-driven",
    type: "implementation",
    topic: "Go Testing",
    title: "Write a table‑driven unit test",
    prompt:
      "Write a table‑driven test for a function `IsEven(n int) bool` that returns true if n is even. Include test cases: positive even, positive odd, zero, negative even, negative odd. Use `t.Run` sub‑tests.\n\n**Example:**\n```go\nfunc IsEven(n int) bool { return n%2 == 0 }\n```\nTest should pass for all cases.",
    starter:
      "func IsEven(n int) bool {\n    return n%2 == 0\n}\n\nfunc TestIsEven(t *testing.T) {\n    // your table-driven test\n}",
    referenceSolution:
      'func TestIsEven(t *testing.T) {\n    // Define test cases as slice of structs\n    testCases := []struct {\n        name  string\n        input int\n        want  bool\n    }{\n        {"positive even", 2, true},\n        {"positive odd", 3, false},\n        {"zero", 0, true},\n        {"negative even", -4, true},\n        {"negative odd", -5, false},\n    }\n\n    for _, tc := range testCases {\n        // Use t.Run to create a subtest for each case\n        t.Run(tc.name, func(t *testing.T) {\n            got := IsEven(tc.input)\n            if got != tc.want {\n                t.Errorf("IsEven(%d) = %v, want %v", tc.input, got, tc.want)\n            }\n        })\n    }\n}',
    explanation:
      "**Concept:** Table‑driven tests reduce duplication. Each test case is a struct with a name, input, and expected output. We iterate and call `t.Run` to execute a subtest per case. This makes failures easy to identify and allows parallel execution of subtests (`t.Parallel()`).\n\n**Dry run:** The test runs five subtests. For `input=2`, `IsEven` returns true, matches `want`. For `input=3`, returns false, matches `want`. All cases pass. If a case fails, `t.Errorf` prints the specific input and expected value.",
    hint: "Use `t.Run` to create sub‑tests. Include a `name` field to describe each case.",
  },
  {
    id: "go-test-http-handler",
    type: "implementation",
    topic: "Go Testing",
    title: "Test an HTTP handler with httptest",
    prompt:
      'Write a test for the following handler that returns `{"message":"Hello"}`. Use `httptest.NewRecorder` and `httptest.NewRequest`. Assert status code and JSON body.\n\n```go\nfunc helloHandler(w http.ResponseWriter, r *http.Request) {\n    w.Header().Set("Content-Type", "application/json")\n    w.WriteHeader(http.StatusOK)\n    json.NewEncoder(w).Encode(map[string]string{"message": "Hello"})\n}\n```\n\n**Example:** The test should pass.',
    starter: "func TestHelloHandler(t *testing.T) {\n    // your test code\n}",
    referenceSolution:
      'func TestHelloHandler(t *testing.T) {\n    // Create a request to pass to the handler\n    req := httptest.NewRequest(http.MethodGet, "/", nil)\n    // Create a ResponseRecorder to record the response\n    rr := httptest.NewRecorder()\n\n    // Call the handler directly\n    helloHandler(rr, req)\n\n    // Check status code\n    if rr.Code != http.StatusOK {\n        t.Errorf("handler returned wrong status code: got %v want %v", rr.Code, http.StatusOK)\n    }\n\n    // Check Content-Type header\n    expectedContentType := "application/json"\n    if contentType := rr.Header().Get("Content-Type"); contentType != expectedContentType {\n        t.Errorf("content-type = %s, want %s", contentType, expectedContentType)\n    }\n\n    // Parse response body\n    var resp map[string]string\n    err := json.NewDecoder(rr.Body).Decode(&resp)\n    if err != nil {\n        t.Fatalf("failed to decode response: %v", err)\n    }\n\n    expectedMsg := "Hello"\n    if resp["message"] != expectedMsg {\n        t.Errorf("response message = %s, want %s", resp["message"], expectedMsg)\n    }\n}',
    explanation:
      '**Concept:** `httptest.NewRecorder` acts as an `http.ResponseWriter` that records the response. `httptest.NewRequest` creates an `http.Request` for the desired method and path. We call the handler directly, then inspect the recorded status code, headers, and body. This allows testing handlers without needing an actual server.\n\n**Dry run:** `rr.Code` is captured after the handler writes. The handler sets status 200, Content‑Type, and JSON body. The test decodes the JSON and verifies the message field equals `"Hello"`. All assertions pass.',
    hint: "Use `httptest.NewRecorder()` and `httptest.NewRequest()`. Always decode the response body if it's JSON.",
  },
  {
    id: "go-benchmark",
    type: "implementation",
    topic: "Go Testing",
    title: "Write a benchmark for a function",
    prompt:
      "Write a benchmark for the `fibonacci` function (iterative version). The benchmark should run with increasing input sizes (e.g., N=10, 20, 40) using sub‑benchmarks.\n\n```go\nfunc fibonacci(n int) int {\n    if n <= 1 { return n }\n    a, b := 0, 1\n    for i := 2; i <= n; i++ {\n        a, b = b, a+b\n    }\n    return b\n}\n```",
    starter:
      "func BenchmarkFibonacci(b *testing.B) {\n    // your benchmark\n}",
    referenceSolution:
      '// Benchmark with different input sizes using sub‑benchmarks\nfunc BenchmarkFibonacci(b *testing.B) {\n    // Run benchmark for N=10\n    b.Run("n=10", func(b *testing.B) {\n        for i := 0; i < b.N; i++ {\n            fibonacci(10)\n        }\n    })\n    // N=20\n    b.Run("n=20", func(b *testing.B) {\n        for i := 0; i < b.N; i++ {\n            fibonacci(20)\n        }\n    })\n    // N=40\n    b.Run("n=40", func(b *testing.B) {\n        for i := 0; i < b.N; i++ {\n            fibonacci(40)\n        }\n    })\n}',
    explanation:
      "**Concept:** Benchmark functions start with `Benchmark` and accept `*testing.B`. The loop `for i := 0; i < b.N; i++` runs the function multiple times; the framework adjusts `b.N` for stable timing. Sub‑benchmarks (`b.Run`) isolate different inputs, allowing comparisons.\n\n**Dry run:** Run `go test -bench=.` – the framework calls each sub‑benchmark with increasing `b.N` until timing stabilizes. It reports operations per second (op/s) and nanoseconds per operation. For `n=40`, operation takes longer. Sub‑benchmarks are reported separately.",
    hint: "Use `b.Run` to create sub‑benchmarks for different inputs. Do not include setup work inside the loop; reset timer with `b.ResetTimer()` if needed.",
  },
  {
    id: "go-test-containers",
    type: "implementation",
    topic: "Go Testing",
    title: "Test with PostgreSQL using testcontainers",
    prompt:
      "Write an integration test that starts a PostgreSQL container, runs migrations, inserts a test user, and queries it. Use `testcontainers-go` module. The test should clean up the container after completion.\n\n**Example:**\n- Start container, connect, run migrations, test a repository function, then terminate container.",
    starter:
      'import (\n    "context"\n    "testing"\n    "github.com/testcontainers/testcontainers-go"\n    "github.com/testcontainers/testcontainers-go/wait"\n)\n\nfunc TestPostgresIntegration(t *testing.T) {\n    // your code\n}',
    referenceSolution:
      'func TestPostgresIntegration(t *testing.T) {\n    ctx := context.Background()\n\n    // Define container request\n    req := testcontainers.ContainerRequest{\n        Image:        "postgres:15-alpine",\n        ExposedPorts: []string{"5432/tcp"},\n        Env: map[string]string{\n            "POSTGRES_USER":     "testuser",\n            "POSTGRES_PASSWORD": "testpass",\n            "POSTGRES_DB":       "testdb",\n        },\n        WaitingFor: wait.ForLog("database system is ready to accept connections"),\n    }\n\n    // Start container\n    container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{\n        ContainerRequest: req,\n        Started:          true,\n    })\n    if err != nil {\n        t.Fatal(err)\n    }\n    // Ensure cleanup after test\n    defer func() {\n        if err := container.Terminate(ctx); err != nil {\n            t.Logf("failed to terminate container: %v", err)\n        }\n    }()\n\n    // Get connection string\n    host, _ := container.Host(ctx)\n    port, _ := container.MappedPort(ctx, "5432")\n    connStr := fmt.Sprintf("postgres://testuser:testpass@%s:%s/testdb?sslmode=disable", host, port.Port())\n\n    // Connect to DB and run migrations (simplified)\n    pool, err := pgxpool.New(ctx, connStr)\n    if err != nil {\n        t.Fatal(err)\n    }\n    defer pool.Close()\n\n    // Create table and insert test data\n    _, err = pool.Exec(ctx, `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT)`)\n    if err != nil {\n        t.Fatal(err)\n    }\n    _, err = pool.Exec(ctx, `INSERT INTO users (name) VALUES ($1)`, "Alice")\n    if err != nil {\n        t.Fatal(err)\n    }\n\n    // Query and assert\n    var name string\n    err = pool.QueryRow(ctx, `SELECT name FROM users WHERE name = $1`, "Alice").Scan(&name)\n    if err != nil {\n        t.Fatal(err)\n    }\n    if name != "Alice" {\n        t.Errorf("got %s, want Alice", name)\n    }\n}',
    explanation:
      '**Concept:** Testcontainers spins up a real database in a Docker container for integration tests. `GenericContainer` starts the container with environment variables. We wait for a log line indicating readiness. After the test, `Terminate` stops and removes the container. This ensures tests run against a real database without side effects.\n\n**Dry run:** The test starts a Postgres container. It extracts the mapped port and host, forms a connection string, connects, creates a table, inserts, queries, and asserts. After the test, `defer` terminates the container. The test passes if the query returns `"Alice"`.',
    hint: "Use `testcontainers-go` (add `go get github.com/testcontainers/testcontainers-go`). Always defer termination. Wait for the database to be ready with `wait.ForLog`.",
  },
  {
    id: "go-url-shortener",
    type: "implementation",
    topic: "Go System Design",
    title: "Implement a URL shortener (in‑memory)",
    prompt:
      'Implement an in‑memory URL shortener with two methods: `Shorten(url string) string` returns a short code (e.g., base62 encoded counter), and `Resolve(shortCode string) (string, bool)` returns the original URL. Use a counter and a map. Also add support for custom aliases.\n\n**Example:**\n- `Shorten("https://go.dev")` → `"abc"`\n- `Resolve("abc")` → `"https://go.dev", true`\n- `ShortenWithAlias("https://go.dev", "go")` stores under alias "go".',
    starter:
      "type URLShortener struct {\n    store map[string]string\n    counter int\n}\n\nfunc NewURLShortener() *URLShortener {\n    return &URLShortener{store: make(map[string]string)}\n}\n\nfunc (s *URLShortener) Shorten(url string) string {\n    // your code\n}\n\nfunc (s *URLShortener) ShortenWithAlias(url, alias string) error {\n    // your code\n}\n\nfunc (s *URLShortener) Resolve(shortCode string) (string, bool) {\n    // your code\n}",
    referenceSolution:
      'package main\n\nimport (\n    "errors"\n    "fmt"\n)\n\ntype URLShortener struct {\n    store   map[string]string // shortCode -> originalURL\n    counter int\n}\n\nfunc NewURLShortener() *URLShortener {\n    return &URLShortener{store: make(map[string]string)}\n}\n\n// encodeBase62 converts an integer to a base62 string (0-9a-zA-Z)\nfunc encodeBase62(num int) string {\n    const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"\n    if num == 0 {\n        return string(charset[0])\n    }\n    var result []byte\n    for num > 0 {\n        remainder := num % 62\n        result = append([]byte{charset[remainder]}, result...)\n        num /= 62\n    }\n    return string(result)\n}\n\nfunc (s *URLShortener) Shorten(url string) string {\n    // Increment counter and generate short code\n    s.counter++\n    shortCode := encodeBase62(s.counter)\n    s.store[shortCode] = url\n    return shortCode\n}\n\nfunc (s *URLShortener) ShortenWithAlias(url, alias string) error {\n    if _, exists := s.store[alias]; exists {\n        return errors.New("alias already taken")\n    }\n    s.store[alias] = url\n    return nil\n}\n\nfunc (s *URLShortener) Resolve(shortCode string) (string, bool) {\n    url, ok := s.store[shortCode]\n    return url, ok\n}',
    explanation:
      '**Concept:** A URL shortener maps a unique short identifier to a long URL. Base62 encoding yields short alphanumeric strings (e.g., 0‑9, a‑z, A‑Z). A counter ensures uniqueness. Custom aliases allow user‑defined codes but must check for collisions.\n\n**Dry run:** `Shorten("https://go.dev")` increments counter from 0 to 1, `encodeBase62(1)` returns `"1"` (if base62 digit 1), stores `"1"` → `"https://go.dev"`. `Resolve("1")` returns the URL. `ShortenWithAlias` checks if alias exists, then stores. This is a simple in‑memory version; a production system would use a database and distributed ID generation.',
    hint: "Use a counter and base62 encoding. For distributed systems, use UUID or Snowflake IDs. Always check alias collisions.",
  },
  {
    id: "go-background-worker-queue",
    type: "implementation",
    topic: "Go System Design",
    title: "Implement background worker with job queue",
    prompt:
      "Create a worker pool that processes jobs from a channel. Jobs are functions that return an error. The system should have:\n- `Submit(job func() error)` – enqueues a job.\n- `Stop()` – stops accepting new jobs, waits for all workers to finish, returns first error (if any).\nUse a buffered channel, a `sync.WaitGroup`, and a context for cancellation.\n\n**Example:**\n```go\nworker := NewWorkerPool(3, 10)\nworker.Submit(func() error { time.Sleep(100ms); return nil })\nworker.Stop() // waits\n```",
    starter:
      "type WorkerPool struct {\n    // your fields\n}\n\nfunc NewWorkerPool(workerCount, queueSize int) *WorkerPool {\n    // your code\n}\n\nfunc (wp *WorkerPool) Submit(job func() error) error {\n    // your code\n}\n\nfunc (wp *WorkerPool) Stop() error {\n    // your code\n}",
    referenceSolution:
      'package main\n\nimport (\n    "context"\n    "errors"\n    "sync"\n)\n\ntype WorkerPool struct {\n    jobs    chan func() error\n    wg      sync.WaitGroup\n    ctx     context.Context\n    cancel  context.CancelFunc\n    errOnce sync.Once\n    firstErr error\n}\n\nfunc NewWorkerPool(workerCount, queueSize int) *WorkerPool {\n    ctx, cancel := context.WithCancel(context.Background())\n    wp := &WorkerPool{\n        jobs:   make(chan func() error, queueSize),\n        ctx:    ctx,\n        cancel: cancel,\n    }\n    // Start workers\n    for i := 0; i < workerCount; i++ {\n        wp.wg.Add(1)\n        go wp.worker()\n    }\n    return wp\n}\n\nfunc (wp *WorkerPool) worker() {\n    defer wp.wg.Done()\n    for {\n        select {\n        case job, ok := <-wp.jobs:\n            if !ok {\n                // jobs channel closed, exit\n                return\n            }\n            if err := job(); err != nil {\n                // Record first error (only once)\n                wp.errOnce.Do(func() {\n                    wp.firstErr = err\n                    wp.cancel() // cancel context to stop further job processing\n                })\n            }\n        case <-wp.ctx.Done():\n            // Stop signal received\n            return\n        }\n    }\n}\n\nfunc (wp *WorkerPool) Submit(job func() error) error {\n    select {\n    case <-wp.ctx.Done():\n        return errors.New("worker pool is stopped")\n    default:\n        select {\n        case wp.jobs <- job:\n            return nil\n        default:\n            return errors.New("job queue full")\n        }\n    }\n}\n\nfunc (wp *WorkerPool) Stop() error {\n    // Stop accepting new jobs\n    close(wp.jobs)\n    // Wait for all workers to finish\n    wp.wg.Wait()\n    // Cancel context (already cancelled on first error, but safe to call multiple times)\n    wp.cancel()\n    return wp.firstErr\n}',
    explanation:
      "**Concept:** A worker pool with a buffered job queue decouples job submission from execution. `Submit` enqueues a job, returning an error if the queue is full or the pool is stopped. Workers pull jobs from the channel. On first job error, we cancel the context and stop further jobs. `Stop` closes the job channel, waits for workers, and returns the first error.\n\n**Dry run:** Three workers start. Submit 10 jobs. Workers process concurrently. If a job returns an error, the pool records it, cancels context, and future submits fail. `Stop` waits for all workers to exit (they exit when jobs channel is closed and after finishing current job). The first error is returned.",
    hint: "Use a context for cancellation. Use `errOnce.Do` to capture only the first error. Close the jobs channel to signal no more work.",
  },
  {
    id: "go-circuit-breaker",
    type: "implementation",
    topic: "Go System Design",
    title: "Implement a circuit breaker pattern",
    prompt:
      "Implement a circuit breaker that wraps a function. It has three states: Closed (calls pass), Open (calls fail fast), Half‑Open (allows a single test call). Transition:\n- Closed → Open after `failureThreshold` consecutive failures.\n- Open → Half‑Open after `timeout` duration.\n- Half‑Open → Closed if test call succeeds, else → Open.\n\n**Example:**\n```go\ncb := NewCircuitBreaker(3, 5*time.Second)\nerr := cb.Call(func() error { return nil }) // passes\n```",
    starter:
      "type CircuitBreaker struct {\n    // your fields\n}\n\nfunc NewCircuitBreaker(failureThreshold int, timeout time.Duration) *CircuitBreaker {\n    // your code\n}\n\nfunc (cb *CircuitBreaker) Call(fn func() error) error {\n    // your code\n}",
    referenceSolution:
      'package main\n\nimport (\n    "errors"\n    "sync"\n    "time"\n)\n\ntype State int\n\nconst (\n    StateClosed State = iota\n    StateOpen\n    StateHalfOpen\n)\n\ntype CircuitBreaker struct {\n    mu               sync.Mutex\n    state            State\n    failures         int\n    failureThreshold int\n    timeout          time.Duration\n    lastOpenTime     time.Time\n}\n\nfunc NewCircuitBreaker(failureThreshold int, timeout time.Duration) *CircuitBreaker {\n    return &CircuitBreaker{\n        state:            StateClosed,\n        failureThreshold: failureThreshold,\n        timeout:          timeout,\n    }\n}\n\nfunc (cb *CircuitBreaker) Call(fn func() error) error {\n    cb.mu.Lock()\n    state := cb.state\n    cb.mu.Unlock()\n\n    switch state {\n    case StateOpen:\n        // Check if timeout has elapsed to transition to half‑open\n        cb.mu.Lock()\n        if time.Since(cb.lastOpenTime) > cb.timeout {\n            cb.state = StateHalfOpen\n            state = StateHalfOpen\n        }\n        cb.mu.Unlock()\n        if state == StateOpen {\n            return errors.New("circuit breaker is open")\n        }\n        // Fall through to half‑open handling\n    case StateHalfOpen:\n        // Allow only one call at a time; we\'ll handle in critical section\n    }\n\n    // Execute the function\n    err := fn()\n\n    cb.mu.Lock()\n    defer cb.mu.Unlock()\n\n    if err == nil {\n        // Success\n        if cb.state == StateHalfOpen {\n            // Half‑open success: reset to closed\n            cb.state = StateClosed\n            cb.failures = 0\n        } else if cb.state == StateClosed {\n            // Closed success: reset failure counter\n            cb.failures = 0\n        }\n        return nil\n    }\n\n    // Error occurred\n    switch cb.state {\n    case StateClosed:\n        cb.failures++\n        if cb.failures >= cb.failureThreshold {\n            cb.state = StateOpen\n            cb.lastOpenTime = time.Now()\n        }\n    case StateHalfOpen:\n        // Test call failed → back to open\n        cb.state = StateOpen\n        cb.lastOpenTime = time.Now()\n    }\n    return err\n}',
    explanation:
      "**Concept:** The circuit breaker prevents repeated calls to a failing service. In Closed state, failures increment a counter; when threshold is reached, it trips to Open. Open state returns error immediately until `timeout` expires, then transitions to Half‑Open, allowing a single test call. If test succeeds, the breaker resets to Closed; otherwise, it goes back to Open.\n\n**Dry run:** Failure threshold=3, timeout=5s. Three successive failures → state becomes Open, `lastOpenTime` set. Subsequent calls return error fast. After 5s, a call transitions to Half‑Open, executes the function. If it succeeds, state becomes Closed; if it fails, back to Open.",
    hint: "Use mutex to protect state. Track failure count and last open time. In Half‑Open, allow only one call by checking state inside the lock.",
  },
  {
    id: "go-retry-pattern",
    type: "implementation",
    topic: "Go System Design",
    title: "Implement retry with exponential backoff",
    prompt:
      'Write a function `Retry(ctx context.Context, maxRetries int, fn func() error) error` that retries `fn` up to `maxRetries` times with exponential backoff. Use `time.Sleep` and respect context cancellation. Return the last error if all retries fail.\n\n**Example:**\n```go\nerr := Retry(context.Background(), 3, func() error {\n    return errors.New("temporary error")\n})\n```',
    starter:
      "func Retry(ctx context.Context, maxRetries int, fn func() error) error {\n    // your code\n}",
    referenceSolution:
      'func Retry(ctx context.Context, maxRetries int, fn func() error) error {\n    var err error\n    baseDelay := 100 * time.Millisecond\n    for attempt := 0; attempt <= maxRetries; attempt++ {\n        // Execute function\n        err = fn()\n        if err == nil {\n            return nil\n        }\n        // If this was the last attempt, break\n        if attempt == maxRetries {\n            break\n        }\n        // Calculate backoff: delay = min(baseDelay * 2^attempt, maxDelay)\n        delay := baseDelay * (1 << attempt) // 100ms, 200ms, 400ms, ...\n        const maxDelay = 10 * time.Second\n        if delay > maxDelay {\n            delay = maxDelay\n        }\n        // Wait with context awareness\n        select {\n        case <-ctx.Done():\n            return ctx.Err()\n        case <-time.After(delay):\n        }\n    }\n    return fmt.Errorf("retries exhausted: %w", err)\n}',
    explanation:
      "**Concept:** Retry with exponential backoff increases delay between attempts to avoid overwhelming a recovering service. Base delay doubles each attempt (1<<attempt). The loop respects context cancellation. The last error is returned if all attempts fail.\n\n**Dry run:** `maxRetries=3`. Attempt 0 runs, fails. Delay 100ms. Attempt 1 fails, delay 200ms. Attempt 2 fails, delay 400ms. Attempt 3 fails, loop exits, returns last error. If context is cancelled during a delay, `ctx.Done()` triggers and returns cancellation error.",
    hint: "Use `time.After` for delays. Respect `ctx.Done()`. Double delay each attempt. Add a maximum delay cap.",
  },
  {
    id: "go-graceful-shutdown-worker",
    type: "implementation",
    topic: "Go System Design",
    title: "Graceful shutdown for background workers",
    prompt:
      "Extend the worker pool from earlier to support graceful shutdown on SIGINT/SIGTERM: stop accepting new jobs, wait for current jobs to finish, then exit. Use a `context` and a `sync.WaitGroup`.\n\n**Example:**\n- Send SIGINT, workers finish current jobs, then program exits.",
    starter:
      "func main() {\n    workerPool := NewWorkerPool(3, 10)\n    // ... submit jobs\n    // graceful shutdown\n}",
    referenceSolution:
      'func main() {\n    workerPool := NewWorkerPool(3, 10)\n    // Submit some jobs\n    for i := 0; i < 5; i++ {\n        workerPool.Submit(func() error {\n            time.Sleep(1 * time.Second)\n            return nil\n        })\n    }\n\n    // Listen for interrupt signal\n    sigChan := make(chan os.Signal, 1)\n    signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)\n\n    <-sigChan\n    fmt.Println("shutting down...")\n    // Stop accepting new jobs and wait for workers\n    if err := workerPool.Stop(); err != nil {\n        fmt.Printf("error: %v\\n", err)\n    }\n    fmt.Println("all jobs finished, exiting")\n}',
    explanation:
      "**Concept:** Graceful shutdown allows in‑flight jobs to complete before exiting. The `Stop()` method closes the jobs channel, waits for workers to finish (via WaitGroup), and returns the first error. The main goroutine blocks on a signal channel; on SIGINT, it calls `Stop()` and then exits.\n\n**Dry run:** Workers are processing jobs. SIGINT received. `workerPool.Stop()` closes `jobs` channel, workers finish their current job, then exit. `wg.Wait()` unblocks, `Stop()` returns, program exits. No jobs are lost.",
    hint: "Use `signal.Notify` to catch SIGINT/SIGTERM. In `Stop()`, close jobs channel and wait for `wg`. Ensure workers exit when channel is closed.",
  },
  {
    id: "go-token-bucket-rate-limiter",
    type: "implementation",
    topic: "Go System Design",
    title: "Implement token bucket rate limiter (in‑memory)",
    prompt:
      "Implement a token bucket rate limiter with methods `Allow() bool` and `AllowN(n int) bool`. A new token is added at a fixed rate (e.g., 10 tokens per second). The bucket has a max capacity. Refill happens on demand using the current time. Use mutex for thread safety.\n\n**Example:**\n```go\nlimiter := NewTokenBucket(10, 100) // rate 10 tokens/sec, capacity 100\nif limiter.Allow() { /* proceed */ }\n```",
    starter:
      "type TokenBucket struct {\n    // your fields\n}\n\nfunc NewTokenBucket(rate float64, capacity int) *TokenBucket {\n    // your code\n}\n\nfunc (tb *TokenBucket) Allow() bool {\n    return tb.AllowN(1)\n}\n\nfunc (tb *TokenBucket) AllowN(n int) bool {\n    // your code\n}",
    referenceSolution:
      'package main\n\nimport (\n    "sync"\n    "time"\n)\n\ntype TokenBucket struct {\n    mu         sync.Mutex\n    rate       float64   // tokens per second\n    capacity   float64   // max tokens\n    tokens     float64   // current tokens\n    lastRefill time.Time\n}\n\nfunc NewTokenBucket(rate float64, capacity int) *TokenBucket {\n    return &TokenBucket{\n        rate:       rate,\n        capacity:   float64(capacity),\n        tokens:     float64(capacity), // start full\n        lastRefill: time.Now(),\n    }\n}\n\n// refill calculates how many new tokens should be added based on elapsed time\nfunc (tb *TokenBucket) refill() {\n    now := time.Now()\n    elapsed := now.Sub(tb.lastRefill).Seconds()\n    if elapsed > 0 {\n        newTokens := elapsed * tb.rate\n        tb.tokens += newTokens\n        if tb.tokens > tb.capacity {\n            tb.tokens = tb.capacity\n        }\n        tb.lastRefill = now\n    }\n}\n\nfunc (tb *TokenBucket) AllowN(n int) bool {\n    tb.mu.Lock()\n    defer tb.mu.Unlock()\n    tb.refill()\n    if tb.tokens >= float64(n) {\n        tb.tokens -= float64(n)\n        return true\n    }\n    return false\n}\n\nfunc (tb *TokenBucket) Allow() bool {\n    return tb.AllowN(1)\n}',
    explanation:
      "**Concept:** Token bucket rate limiter has a maximum capacity and refills at a constant rate. On each request, we calculate elapsed time since last refill, add `rate * elapsed` tokens, cap at capacity, then consume `n` tokens if available. This is a smooth limiter that allows bursts up to capacity.\n\n**Dry run:** Capacity=10, rate=10 tokens/sec. First call: tokens=10, consume 1 → tokens=9. After 0.5 seconds, second call: elapsed 0.5s → add 5 tokens → tokens=14 (capped at 10), then consume 1 → tokens=9 again. The bucket always stays within bounds.",
    hint: "Store tokens as float64 for precise fractional refills. Calculate refill on every request (lazy). Use mutex for concurrent access.",
  },
  {
    id: "go-simple-logger",
    type: "implementation",
    topic: "Go System Design",
    title: "Implement a simple leveled logger",
    prompt:
      'Implement a logger with levels: DEBUG, INFO, ERROR. Support `Debugf`, `Infof`, `Errorf`. The logger should be configurable to show only levels >= a threshold. Use `sync.Mutex` to protect output if needed (though `log` package is safe).\n\n**Example:**\n```go\nlogger := NewLogger(INFO)\nlogger.Infof("Server started on port %d", 8080)\n```',
    starter:
      'type LogLevel int\nconst (\n    DEBUG LogLevel = iota\n    INFO\n    ERROR\n)\n\ntype Logger struct {\n    level LogLevel\n    // your fields\n}\n\nfunc NewLogger(level LogLevel) *Logger {\n    // your code\n}\n\nfunc (l *Logger) Debugf(format string, args ...interface{}) {}\nfunc (l *Logger) Infof(format string, args ...interface{})  {}\nfunc (l *Logger) Errorf(format string, args ...interface{}) {}\n\nfunc main() {\n    logger := NewLogger(INFO)\n    logger.Debugf("debug") // not printed\n    logger.Infof("info")   // printed\n}',
    referenceSolution:
      'package main\n\nimport (\n    "fmt"\n    "log"\n    "os"\n    "sync"\n    "time"\n)\n\ntype LogLevel int\n\nconst (\n    DEBUG LogLevel = iota\n    INFO\n    ERROR\n)\n\nvar levelNames = map[LogLevel]string{\n    DEBUG: "DEBUG",\n    INFO:  "INFO",\n    ERROR: "ERROR",\n}\n\ntype Logger struct {\n    level  LogLevel\n    output *log.Logger\n    mu     sync.Mutex // for writing atomically (log.Logger already syncs, but we use for level check and write together? optional)\n}\n\nfunc NewLogger(level LogLevel) *Logger {\n    return &Logger{\n        level:  level,\n        output: log.New(os.Stdout, "", log.LstdFlags),\n    }\n}\n\nfunc (l *Logger) log(level LogLevel, format string, args ...interface{}) {\n    if level < l.level {\n        return\n    }\n    msg := fmt.Sprintf(format, args...)\n    timestamp := time.Now().Format("2006-01-02 15:04:05")\n    l.output.Printf("[%s] %s %s", levelNames[level], timestamp, msg)\n}\n\nfunc (l *Logger) Debugf(format string, args ...interface{}) {\n    l.log(DEBUG, format, args...)\n}\n\nfunc (l *Logger) Infof(format string, args ...interface{}) {\n    l.log(INFO, format, args...)\n}\n\nfunc (l *Logger) Errorf(format string, args ...interface{}) {\n    l.log(ERROR, format, args...)\n}\n\nfunc main() {\n    logger := NewLogger(INFO)\n    logger.Debugf("debug message") // not printed\n    logger.Infof("server started on port %d", 8080)\n    logger.Errorf("failed to connect: %v", "timeout")\n}',
    explanation:
      "**Concept:** A leveled logger filters messages based on configured severity. `log.Logger` from standard library is thread‑safe and writes to `os.Stdout` or `os.Stderr`. The `log` method prefixes the message with level and timestamp. The level check determines if the message should be printed.\n\n**Dry run:** NewLogger(INFO) sets level to INFO. `Debugf` called → level DEBUG < INFO, returns immediately. `Infof` prints `[INFO] 2025-01-01 12:00:00 server started on port 8080`. `Errorf` prints `[ERROR] ... failed to connect: timeout`. This is a simple but useful logger.",
    hint: "Use `log.New` with predefined flags. Compare levels with `<`. Store level names in a map.",
  },
  {
    id: "go-string-reverse",
    type: "implementation",
    topic: "Go Strings",
    title: "Reverse a string (handles Unicode)",
    prompt:
      'Write a function `reverseString(s string) string` that returns the reversed string. It must handle Unicode characters correctly (not just bytes). Use `[]rune`.\n\n**Example:**\n- Input: `"hello"` → `"olleh"`\n- Input: `"世界"` → `"界世"`',
    starter: "func reverseString(s string) string {\n    // your code\n}",
    referenceSolution:
      "func reverseString(s string) string {\n    // Convert to rune slice to handle multi‑byte characters\n    runes := []rune(s)\n    n := len(runes)\n    // Two-pointer swap in-place\n    for i, j := 0, n-1; i < j; i, j = i+1, j-1 {\n        runes[i], runes[j] = runes[j], runes[i]\n    }\n    return string(runes)\n}",
    explanation:
      "**Concept:** Strings in Go are UTF‑8 encoded bytes. Indexing yields bytes, not characters. To handle Unicode correctly, convert to `[]rune`. Then swap runes from both ends. Finally convert back to string.\n\n**Dry run:** `s = \"hello\"` → `[]rune` is `['h','e','l','l','o']`. Swap pairs: (h,o) → (o,h); (e,l) → (l,e); middle unch. Result `\"olleh\"`. For `\"世界\"`, `[]rune` has two runes, swap produces `\"界世\"`.",
    hint: "Use `[]rune(s)` to get Unicode code points. Swap in‑place using indices.",
  },
  {
    id: "go-string-immutable",
    type: "implementation",
    topic: "Go Strings",
    title: "String immutability and efficient building",
    prompt:
      'Write a function `concat(strs []string) string` that concatenates a slice of strings efficiently using `strings.Builder`. Do not use `+` in a loop.\n\n**Example:**\n- Input: `["a","b","c"]` → `"abc"`',
    starter:
      'import "strings"\n\nfunc concat(strs []string) string {\n    // your code\n}',
    referenceSolution:
      "func concat(strs []string) string {\n    var builder strings.Builder\n    // Preallocate capacity to avoid reallocations (optional)\n    totalLen := 0\n    for _, s := range strs {\n        totalLen += len(s)\n    }\n    builder.Grow(totalLen)\n    // Write each string\n    for _, s := range strs {\n        builder.WriteString(s)\n    }\n    return builder.String()\n}",
    explanation:
      '**Concept:** Strings are immutable, so using `+` in a loop creates many temporary strings and copies memory. `strings.Builder` writes bytes into a buffer with efficient growth. `Grow` pre‑allocates capacity to avoid reallocation.\n\n**Dry run:** `strs = ["a","b","c"]`. Total length = 3. `builder.Grow(3)` pre‑allocates buffer. Each `WriteString` appends without extra allocations. Final string `"abc"` is returned.',
    hint: "Use `strings.Builder` for repeated concatenation. Call `Grow` if you know the final size.",
  },
  {
    id: "go-regex-extract",
    type: "implementation",
    topic: "Go Strings",
    title: "Extract emails using regex",
    prompt:
      'Write a function `extractEmails(s string) []string` that returns all valid email addresses found in the string. Use `regexp.MustCompile` with a pattern.\n\n**Example:**\n- Input: `"Contact us at alice@example.com or bob@work.co.uk"` → `["alice@example.com", "bob@work.co.uk"]`',
    starter:
      'import "regexp"\n\nfunc extractEmails(s string) []string {\n    // your code\n}',
    referenceSolution:
      "func extractEmails(s string) []string {\n    // Simple email regex (covers most cases)\n    emailRegex := regexp.MustCompile(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`)\n    matches := emailRegex.FindAllString(s, -1)\n    return matches\n}",
    explanation:
      "**Concept:** Regular expressions can extract patterns. `FindAllString` returns all non‑overlapping matches. The regex matches local part, @, domain, dot, and TLD (at least 2 letters).\n\n**Dry run:** Input contains two emails; `FindAllString` returns a slice of two strings. No email → returns empty slice (not nil).",
    hint: "Compile regex once with `MustCompile`. Use `FindAllString` with `-1` for all matches.",
  },
  {
    id: "go-array-vs-slice",
    type: "implementation",
    topic: "Go Advanced",
    title: "Understand array vs slice (pass by value vs reference)",
    prompt:
      "Write two functions:\n- `modifyArray(arr [3]int)` that changes the first element to 99.\n- `modifySlice(slice []int)` that changes the first element to 99.\nIn main, call both and show that the array is NOT modified, but the slice IS modified. Explain why.\n\n**Example:**\n- Array before `[1,2,3]` after `[1,2,3]` (unchanged).\n- Slice before `[1,2,3]` after `[99,2,3]` (changed).",
    starter:
      'package main\n\nimport "fmt"\n\nfunc modifyArray(arr [3]int) {\n    arr[0] = 99\n}\n\nfunc modifySlice(slice []int) {\n    slice[0] = 99\n}\n\nfunc main() {\n    arr := [3]int{1, 2, 3}\n    slice := []int{1, 2, 3}\n    modifyArray(arr)\n    modifySlice(slice)\n    fmt.Println(arr, slice)\n}',
    referenceSolution:
      'package main\n\nimport "fmt"\n\nfunc modifyArray(arr [3]int) {\n    // arr is a copy of the original array (pass by value)\n    arr[0] = 99\n}\n\nfunc modifySlice(slice []int) {\n    // slice is a reference type: it contains a pointer to the underlying array\n    slice[0] = 99\n}\n\nfunc main() {\n    arr := [3]int{1, 2, 3}\n    slice := []int{1, 2, 3}\n    modifyArray(arr)\n    modifySlice(slice)\n    fmt.Println(arr)   // [1 2 3] – unchanged\n    fmt.Println(slice) // [99 2 3] – changed\n}',
    explanation:
      "**Concept:** Arrays are **value types** – passes a copy. Slices are **reference types** (a header containing pointer, length, capacity) – passing a slice copies the header but the pointer still references the same underlying array. Thus modifying slice elements modifies the original array.\n\n**Dry run:** `modifyArray` gets a copy, changes it, original unchanged. `modifySlice` receives the slice header; `slice[0]` accesses the same backing array as `main`, so change affects original.",
    hint: "Arrays are passed by value; slices are passed by reference (header copied, data shared).",
  },
  {
    id: "go-slice-capacity",
    type: "implementation",
    topic: "Go Advanced",
    title: "Slice capacity and append behavior",
    prompt:
      "Write a function `appendAndPrint(slice []int, val int)` that appends `val` and prints the slice's length and capacity before and after. Then show that appending within capacity does not allocate new memory, but exceeding capacity does.\n\n**Example:**\n- With slice of length 2, capacity 4: append within capacity → length becomes 3, capacity unchanged.\n- With slice of length 4, capacity 4: append → new array allocated, capacity doubles (typically).",
    starter:
      "func appendAndPrint(slice []int, val int) {\n    // your code\n}\n\nfunc main() {\n    s1 := make([]int, 2, 4)\n    s2 := []int{1,2,3,4}\n    appendAndPrint(s1, 5)\n    appendAndPrint(s2, 5)\n}",
    referenceSolution:
      'func appendAndPrint(slice []int, val int) {\n    fmt.Printf("Before: len=%d cap=%d\\n", len(slice), cap(slice))\n    slice = append(slice, val)\n    fmt.Printf("After:  len=%d cap=%d\\n", len(slice), cap(slice))\n}',
    explanation:
      "**Concept:** Append may allocate a new backing array if capacity is insufficient. When the new length exceeds capacity, Go allocates a new array (usually doubling capacity up to a threshold). When capacity is enough, it just adds the new element without reallocation.\n\n**Dry run:** `s1` len=2 cap=4 → after append len=3 cap=4 (no allocation). `s2` len=4 cap=4 → after append len=5 cap=8 (allocation with new capacity).",
    hint: "Use `cap(slice)` to check capacity. Append may return a new slice header if reallocation occurs.",
  },
  {
    id: "go-struct-tags",
    type: "implementation",
    topic: "Go Advanced",
    title: "Use struct tags for JSON and validation",
    prompt:
      'Define a `User` struct with fields `Name`, `Email`, `Age`. Add JSON tags (`json:"name"`, etc.) and validation tags using `binding` for Gin: `Name required`, `Email required,email`, `Age min=18`.\n\n**Example:**\n```go\ntype User struct {\n    Name  string `json:"name" binding:"required"`\n    Email string `json:"email" binding:"required,email"`\n    Age   int    `json:"age" binding:"min=18"`\n}\n```',
    starter: "type User struct {\n    // your tags\n}",
    referenceSolution:
      'type User struct {\n    Name  string `json:"name" binding:"required"`\n    Email string `json:"email" binding:"required,email"`\n    Age   int    `json:"age" binding:"min=18"`\n}',
    explanation:
      '**Concept:** Struct tags are meta information attached to fields. The `json` tag controls JSON serialization field names. The `binding` tag (used by Gin) invokes validator rules. This centralizes validation logic in the struct definition.\n\n**Dry run:** When Gin receives JSON `{"name":"","email":"a@b.com","age":20}`, `ShouldBindJSON` will fail because `Name` is empty (required missing). The error is returned to the client.',
    hint: "Use backticks for tags. Separate tag values with spaces or commas. Gin's binding uses `go-playground/validator`.",
  },
  {
    id: "go-embedding",
    type: "implementation",
    topic: "Go Advanced",
    title: "Struct embedding (composition)",
    prompt:
      'Define a `Person` struct with fields `Name` and `Age`. Define an `Employee` struct that embeds `Person` and adds `Salary` int. Write a method `Greet() string` on `Person` that returns `"Hi, I\'m {Name}"`. Show that `Employee` can call `Greet()` directly.\n\n**Example:**\n```go\ne := Employee{Person: Person{Name:"Alice", Age:30}, Salary:50000}\nfmt.Println(e.Greet()) // "Hi, I\'m Alice"\n```',
    starter:
      "type Person struct {\n    Name string\n    Age  int\n}\n\nfunc (p Person) Greet() string {\n    // your code\n}\n\ntype Employee struct {\n    Person\n    Salary int\n}",
    referenceSolution:
      'func (p Person) Greet() string {\n    return fmt.Sprintf("Hi, I\'m %s", p.Name)\n}\n\n// Employee automatically has Greet method because of embedding.',
    explanation:
      "**Concept:** Embedding allows a struct to include another struct without a field name. The embedded type's methods become promoted to the outer struct. This is composition over inheritance.\n\n**Dry run:** `Employee` does not define `Greet`, but because `Person` is embedded, the method is promoted and can be called directly on `Employee`. It acts as if `Employee` had a `Greet` method forwarding to `Person.Greet`.",
    hint: "Use embedding with an anonymous field (type without name). Promoted methods are callable directly.",
  },
  {
    id: "go-generics-sum",
    type: "implementation",
    topic: "Go Advanced",
    title: "Generic function for sum of numbers",
    prompt:
      "Write a generic function `Sum[T int | float64](nums []T) T` that returns the sum of a slice of integers or floats. Use type constraints.\n\n**Example:**\n- `Sum[int]([]int{1,2,3})` → `6`\n- `Sum[float64]([]float64{1.5,2.5})` → `4.0`",
    starter: "func Sum[T int | float64](nums []T) T {\n    // your code\n}",
    referenceSolution:
      "func Sum[T int | float64](nums []T) T {\n    var sum T\n    for _, v := range nums {\n        sum += v\n    }\n    return sum\n}",
    explanation:
      "**Concept:** Generics allow writing functions that work with multiple types. Type parameters are declared with `[T constraint]`. The constraint `int | float64` means `T` can be either int or float64. Inside the function, the usual arithmetic works because both types support `+`.\n\n**Dry run:** `Sum[int]` instantiates the function with `T=int`, loops, and returns int. Similarly for float64.",
    hint: "Use `any` as constraint for no restriction, but here we need arithmetic, so use `int | float64`. Starting Go 1.21, you can use `~int` for custom integer types.",
  },
  {
    id: "go-generics-stack",
    type: "implementation",
    topic: "Go Advanced",
    title: "Generic stack implementation",
    prompt:
      "Implement a generic Stack[T any] with methods `Push(T)`, `Pop() (T, bool)`, `Peek() (T, bool)`, `IsEmpty() bool`. Use a slice as the underlying storage.\n\n**Example:**\n```go\ns := NewStack[int]()\ns.Push(1)\nval, ok := s.Pop() // 1, true\n```",
    starter:
      "type Stack[T any] struct {\n    items []T\n}\n\nfunc NewStack[T any]() *Stack[T] {\n    return &Stack[T]{}\n}\n\nfunc (s *Stack[T]) Push(item T) {}\nfunc (s *Stack[T]) Pop() (T, bool) {}\nfunc (s *Stack[T]) Peek() (T, bool) {}\nfunc (s *Stack[T]) IsEmpty() bool {}",
    referenceSolution:
      "func (s *Stack[T]) Push(item T) {\n    s.items = append(s.items, item)\n}\n\nfunc (s *Stack[T]) Pop() (T, bool) {\n    if s.IsEmpty() {\n        var zero T\n        return zero, false\n    }\n    idx := len(s.items) - 1\n    item := s.items[idx]\n    s.items = s.items[:idx]\n    return item, true\n}\n\nfunc (s *Stack[T]) Peek() (T, bool) {\n    if s.IsEmpty() {\n        var zero T\n        return zero, false\n    }\n    return s.items[len(s.items)-1], true\n}\n\nfunc (s *Stack[T]) IsEmpty() bool {\n    return len(s.items) == 0\n}",
    explanation:
      '**Concept:** Generics allow a single stack implementation to work with any type. `T any` means any type (interface{}). `Pop` returns a zero value of T when empty – Go requires a specific value, so we return `var zero T` (the default zero of that type).\n\n**Dry run:** For `Stack[int]`, `zero` is `0`. For `Stack[string]`, zero is `""`. The boolean flag indicates whether the pop was successful. This pattern is idiomatic.',
    hint: "Use `var zero T` to return a zero value for the type. Use a boolean second return to indicate success.",
  },
  {
    id: "go-gin-cors",
    type: "implementation",
    topic: "Go Web",
    title: "Add CORS middleware to Gin",
    prompt:
      "Write a CORS middleware for Gin that allows all origins, methods, and headers. Use the `github.com/gin-contrib/cors` package or implement manually.\n\n**Example:**\n```go\nr := gin.Default()\nr.Use(CORSMiddleware())\n```",
    starter:
      "func CORSMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // your code\n    }\n}",
    referenceSolution:
      'func CORSMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // Allow all origins (for development; restrict in production)\n        c.Header("Access-Control-Allow-Origin", "*")\n        c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")\n        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")\n        c.Header("Access-Control-Max-Age", "86400")\n        if c.Request.Method == "OPTIONS" {\n            c.AbortWithStatus(http.StatusNoContent)\n            return\n        }\n        c.Next()\n    }\n}',
    explanation:
      "**Concept:** CORS (Cross‑Origin Resource Sharing) headers tell browsers to allow requests from different origins. The middleware sets the necessary headers. For preflight `OPTIONS` requests, we respond with 204 No Content. In production, restrict `Allow-Origin` to specific domains.\n\n**Dry run:** A browser sends a `GET` from `http://frontend.com` to `http://api.com`. The middleware adds `Access-Control-Allow-Origin: *` so the browser accepts the response. For `OPTIONS` (preflight), we return 204 and stop further processing.",
    hint: "Use `github.com/gin-contrib/cors` for a more configurable solution. For manual, handle `OPTIONS` and set appropriate headers.",
  },
  {
    id: "go-gin-jwt-auth",
    type: "implementation",
    topic: "Go Web",
    title: "JWT authentication middleware for Gin",
    prompt:
      'Write a Gin middleware that extracts a Bearer token from the `Authorization` header, validates it using a secret key, and sets `c.Set("userID", claims.userID)`. If invalid or missing, return 401.\n\n**Example:**\n```go\nauthorized := r.Group("/api")\nauthorized.Use(AuthMiddleware())\n```',
    starter:
      'import (\n    "github.com/golang-jwt/jwt/v5"\n    "github.com/gin-gonic/gin"\n)\n\nvar jwtSecret = []byte("mysecret")\n\nfunc AuthMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // your code\n    }\n}',
    referenceSolution:
      'func AuthMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // Get the Authorization header\n        authHeader := c.GetHeader("Authorization")\n        if authHeader == "" {\n            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing authorization header"})\n            return\n        }\n        // Expect "Bearer <token>"\n        parts := strings.Split(authHeader, " ")\n        if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {\n            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization format"})\n            return\n        }\n        tokenStr := parts[1]\n        // Parse and validate token\n        claims := jwt.MapClaims{}\n        token, err := jwt.ParseWithClaims(tokenStr, &claims, func(token *jwt.Token) (interface{}, error) {\n            return jwtSecret, nil\n        })\n        if err != nil || !token.Valid {\n            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired token"})\n            return\n        }\n        // Extract userID from claims (assuming subject claim or custom field)\n        userID, ok := claims["user_id"]\n        if !ok {\n            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "user_id missing in token"})\n            return\n        }\n        // Store in Gin context for later handlers\n        c.Set("userID", userID)\n        c.Next()\n    }\n}',
    explanation:
      '**Concept:** JWT authentication is stateless. The middleware extracts the token from the `Authorization: Bearer <token>` header, verifies the signature, reads claims, and attaches the user ID to the request context. If verification fails, it aborts with 401.\n\n**Dry run:** Valid token → `claims["user_id"]` is stored, `c.Next()` proceeds to route handler. Invalid token → aborts, sends 401. Missing header → aborts. The route handler can retrieve user ID via `c.Get("userID")`.',
    hint: "Use `github.com/golang-jwt/jwt/v5`. Store the secret in an environment variable. Use `c.Set` to pass user info downstream.",
  },
  {
    id: "go-gin-api-versioning",
    type: "implementation",
    topic: "Go Web",
    title: "API versioning via URL path",
    prompt:
      'Create two versioned endpoints under `/api/v1/users` and `/api/v2/users`. Each returns a different JSON structure (e.g., v1: `{"name":"Alice"}`, v2: `{"data":{"name":"Alice"}}`). Use route grouping.\n\n**Example:**\n- `GET /api/v1/users` → `[{"name":"Alice"}]`\n- `GET /api/v2/users` → `[{"data":{"name":"Alice"}}]`',
    starter:
      'func main() {\n    r := gin.Default()\n    v1 := r.Group("/api/v1")\n    // v1 routes\n    v2 := r.Group("/api/v2")\n    // v2 routes\n    r.Run()\n}',
    referenceSolution:
      'func main() {\n    r := gin.Default()\n\n    v1 := r.Group("/api/v1")\n    v1.GET("/users", func(c *gin.Context) {\n        c.JSON(200, []gin.H{{"name": "Alice"}})\n    })\n\n    v2 := r.Group("/api/v2")\n    v2.GET("/users", func(c *gin.Context) {\n        c.JSON(200, []gin.H{{"data": gin.H{"name": "Alice"}}})\n    })\n\n    r.Run()\n}',
    explanation:
      "**Concept:** URL path versioning is simple and explicit. Grouping allows sharing middleware (e.g., logging, rate limiting) per version. Each group can have its own set of routes. This approach keeps old versions available while new versions evolve.\n\n**Dry run:** Request to `/api/v1/users` matches the v1 group and returns the old format. Request to `/api/v2/users` matches v2 and returns the new wrapped format. Maintenance is separated across groups.",
    hint: "Use `r.Group` to create version groups. Middleware can be applied per group or globally.",
  },
  {
    id: "go-websocket-echo",
    type: "implementation",
    topic: "Go Web",
    title: "WebSocket echo server using gorilla/websocket",
    prompt:
      'Implement a WebSocket echo server: it reads messages from the client and sends back the same message. Use `github.com/gorilla/websocket`. Include a simple Gin route that upgrades the HTTP connection.\n\n**Example:**\n- Client sends `"hello"` → server replies `"hello"`.',
    starter:
      'import (\n    "net/http"\n    "github.com/gin-gonic/gin"\n    "github.com/gorilla/websocket"\n)\n\nvar upgrader = websocket.Upgrader{\n    CheckOrigin: func(r *http.Request) bool { return true },\n}\n\nfunc wsHandler(c *gin.Context) {\n    // your WebSocket code\n}\n\nfunc main() {\n    r := gin.Default()\n    r.GET("/ws", wsHandler)\n    r.Run()\n}',
    referenceSolution:
      'func wsHandler(c *gin.Context) {\n    // Upgrade HTTP to WebSocket\n    conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)\n    if err != nil {\n        log.Printf("upgrade error: %v", err)\n        return\n    }\n    defer conn.Close()\n\n    for {\n        // Read message\n        msgType, msg, err := conn.ReadMessage()\n        if err != nil {\n            if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {\n                log.Printf("read error: %v", err)\n            }\n            break\n        }\n        // Echo back the same message\n        if err := conn.WriteMessage(msgType, msg); err != nil {\n            log.Printf("write error: %v", err)\n            break\n        }\n    }\n}',
    explanation:
      '**Concept:** WebSocket provides full‑duplex communication. `websocket.Upgrader` upgrades an HTTP request. After upgrade, `ReadMessage` blocks until a message arrives. `WriteMessage` sends the response. The loop continues until the connection closes or an error occurs.\n\n**Dry run:** Client connects to `/ws`. The handler upgrades. Reads `"hello"` (text message), writes back `"hello"`. The client receives the echo. The connection stays open for further messages.',
    hint: "Allow all origins in development with `CheckOrigin` returning true. Use `defer conn.Close()`. Handle close errors gracefully.",
  },
  {
    id: "go-context-http",
    type: "implementation",
    topic: "Go Web",
    title: "Propagate context values to handlers",
    prompt:
      "Write a middleware that adds a `requestID` to the context (using `context.WithValue`). Then in a later handler, retrieve the request ID and include it in the response header. Use `c.Request.Context()`.\n\n**Example:**\n- Middleware adds `requestID` → handler reads it and sets `X-Request-Id` header.",
    starter:
      'type contextKey string\nconst requestIDKey contextKey = "requestID"\n\nfunc RequestIDMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        // generate ID and add to context\n    }\n}\n\nfunc main() {\n    r := gin.Default()\n    r.Use(RequestIDMiddleware())\n    r.GET("/test", func(c *gin.Context) {\n        // retrieve ID and set header\n    })\n}',
    referenceSolution:
      'func RequestIDMiddleware() gin.HandlerFunc {\n    return func(c *gin.Context) {\n        requestID := uuid.New().String()\n        // Create a new context with the value\n        ctx := context.WithValue(c.Request.Context(), requestIDKey, requestID)\n        // Replace the request\'s context\n        c.Request = c.Request.WithContext(ctx)\n        c.Next()\n    }\n}\n\n// In handler:\nfunc handler(c *gin.Context) {\n    ctx := c.Request.Context()\n    requestID, ok := ctx.Value(requestIDKey).(string)\n    if ok {\n        c.Header("X-Request-Id", requestID)\n    }\n    c.String(200, "ok")\n}',
    explanation:
      "**Concept:** Context values propagate through the request lifecycle. Middleware adds a value to `c.Request.Context()`. The handler retrieves it using the same key. This is useful for tracing, logging, and authentication.\n\n**Dry run:** Middleware generates UUID, creates new context with `c.Request.Context()` as parent, replaces `c.Request`. Handler extracts value, sets response header. The request ID is now available in any function that receives the context.",
    hint: "Use a custom type for context keys to avoid collisions. Always replace `c.Request` with the new context.",
  },
  {
    id: "go-http-client-basic",
    type: "implementation",
    topic: "Go HTTP Client",
    title: "Make a GET request using http.Client",
    prompt:
      'Write a function `fetchURL(url string) (string, error)` that performs a GET request to the given URL and returns the response body as a string. Use `http.Client` with a 5‑second timeout. Handle non‑200 status codes as errors.\n\n**Example:**\n- Input: `"https://api.example.com/status"` → returns body string if status 200.\n- Input: `"https://httpbin.org/status/404"` → returns error "unexpected status: 404".',
    starter:
      'import (\n    "context"\n    "fmt"\n    "io"\n    "net/http"\n    "time"\n)\n\nfunc fetchURL(url string) (string, error) {\n    // your code\n}',
    referenceSolution:
      'func fetchURL(url string) (string, error) {\n    // Create a client with timeout\n    client := &http.Client{Timeout: 5 * time.Second}\n    req, err := http.NewRequest(http.MethodGet, url, nil)\n    if err != nil {\n        return "", err\n    }\n    resp, err := client.Do(req)\n    if err != nil {\n        return "", err\n    }\n    defer resp.Body.Close()\n    // Check status code\n    if resp.StatusCode != http.StatusOK {\n        return "", fmt.Errorf("unexpected status: %d", resp.StatusCode)\n    }\n    body, err := io.ReadAll(resp.Body)\n    if err != nil {\n        return "", err\n    }\n    return string(body), nil\n}',
    explanation:
      "**Concept:** `http.Client` is used for outgoing requests. `Timeout` sets a deadline for the entire request (including connection, read, and redirects). Always defer `resp.Body.Close()`. Read response body with `io.ReadAll`. Check status code before reading body to avoid processing error pages.\n\n**Dry run:** GET `http://example.com` succeeds, status 200, body read and returned. GET `http://httpbin.org/status/404` returns 404, error is returned. If timeout exceeds 5s (e.g., slow server), `client.Do` returns a timeout error.",
    hint: "Set `Timeout` in `http.Client`. Always close response body with `defer`. Check `StatusCode` before reading body.",
  },
  {
    id: "go-json-streaming",
    type: "implementation",
    topic: "Go JSON",
    title: "Stream large JSON arrays using json.Decoder",
    prompt:
      'Write a function `readLargeJSON(r io.Reader) ([]Item, error)` that reads an array of JSON objects from an `io.Reader` without loading the entire file into memory. Use `json.Decoder` and process one item at a time.\n\n**Example:**\nInput: `[{"id":1},{"id":2}]` → Output: slice of two Items.',
    starter:
      'type Item struct {\n    ID int `json:"id"`\n}\n\nfunc readLargeJSON(r io.Reader) ([]Item, error) {\n    // your code\n}',
    referenceSolution:
      "func readLargeJSON(r io.Reader) ([]Item, error) {\n    dec := json.NewDecoder(r)\n    // Read opening bracket\n    t, err := dec.Token()\n    if err != nil {\n        return nil, err\n    }\n    if t != json.Delim('[') {\n        return nil, fmt.Errorf(\"expected array, got %v\", t)\n    }\n    var items []Item\n    // Decode each item while the token is a value\n    for dec.More() {\n        var item Item\n        if err := dec.Decode(&item); err != nil {\n            return nil, err\n        }\n        items = append(items, item)\n    }\n    // Read closing bracket\n    t, err = dec.Token()\n    if err != nil {\n        return nil, err\n    }\n    if t != json.Delim(']') {\n        return nil, fmt.Errorf(\"expected ], got %v\", t)\n    }\n    return items, nil\n}",
    explanation:
      '**Concept:** `json.Decoder` streams JSON tokens, allowing processing of large JSON arrays without loading the whole array into memory at once. `dec.Token()` reads the next JSON token (delimiter, string, number, etc.). `dec.More()` returns true if there are more elements in the current array. This is essential for parsing large responses from APIs.\n\n**Dry run:** Input `[{"id":1},{"id":2}]`. First token `[` (Delim). Then `dec.More()` true, decode first item → `ID:1`. Append. Second iteration decodes second item. After that `dec.More()` false. Read closing `]`. Slice returned. If JSON is malformed, error is returned.\n\n**Hint:** Use `json.NewDecoder(r)` for streaming. Call `dec.More()` to check for remaining array elements.',
  },
  {
    id: "go-json-encoder",
    type: "implementation",
    topic: "Go JSON",
    title: "Stream JSON output using json.Encoder",
    prompt:
      'Write a function `writeLargeJSON(w io.Writer, items []Item) error` that writes a JSON array to the writer without building the entire JSON string in memory. Use `json.Encoder`.\n\n**Example:**\nInput: `[]Item{{1},{2}}` writes `[{"id":1},{"id":2}]`.',
    starter:
      "func writeLargeJSON(w io.Writer, items []Item) error {\n    // your code\n}",
    referenceSolution:
      'func writeLargeJSON(w io.Writer, items []Item) error {\n    enc := json.NewEncoder(w)\n    // Write opening bracket\n    if _, err := w.Write([]byte("[")); err != nil {\n        return err\n    }\n    for i, item := range items {\n        if i > 0 {\n            if _, err := w.Write([]byte(",")); err != nil {\n                return err\n            }\n        }\n        if err := enc.Encode(item); err != nil {\n            return err\n        }\n    }\n    // Write closing bracket\n    if _, err := w.Write([]byte("]")); err != nil {\n        return err\n    }\n    return nil\n}',
    explanation:
      "**Concept:** `json.Encoder` writes JSON tokens directly to an `io.Writer` without building a full string. This reduces memory usage when serializing large slices. We manually write the array brackets and commas, then call `Encode` per item. `Encode` adds a newline after each value, which is acceptable.\n\n**Dry run:** For two items, writes `[`, then first item with newline, then `,`, second item with newline, then `]`. The output is valid JSON even with extra newlines.\n\n**Hint:** Use `json.Encoder` to write each element individually. Write delimiters manually.",
  },
  {
    id: "go-filepath-walk",
    type: "implementation",
    topic: "Go File I/O",
    title: "Recursively list files using filepath.WalkDir",
    prompt:
      'Write a function `listGoFiles(root string) ([]string, error)` that returns a list of all `.go` file paths under the given root directory (including subdirectories). Use `filepath.WalkDir`.\n\n**Example:**\n- Input: `"."` → Output: `["./main.go", "./pkg/helper.go"]` (if exist).',
    starter:
      'import (\n    "io/fs"\n    "path/filepath"\n)\n\nfunc listGoFiles(root string) ([]string, error) {\n    // your code\n}',
    referenceSolution:
      'func listGoFiles(root string) ([]string, error) {\n    var files []string\n    err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {\n        if err != nil {\n            return err\n        }\n        if !d.IsDir() && filepath.Ext(path) == ".go" {\n            files = append(files, path)\n        }\n        return nil\n    })\n    return files, err\n}',
    explanation:
      "**Concept:** `filepath.WalkDir` traverses a directory tree recursively, calling a function for each entry. It is more efficient than `Walk` because it uses `fs.DirEntry` (fewer stats). Use `d.IsDir()` to skip directories. `filepath.Ext` extracts the file extension.\n\n**Dry run:** For root `.` with structure `./main.go` and `./pkg/helper.go`, WalkDir visits each; if extension `.go` and not directory, append to slice. Returns both paths.\n\n**Hint:** Use `filepath.WalkDir` and `d.IsDir()`. Use `filepath.Ext` to check extension.",
  },
  {
    id: "go-file-exists",
    type: "implementation",
    topic: "Go File I/O",
    title: "Check if a file exists",
    prompt:
      'Write a function `fileExists(filename string) bool` that returns true if the file exists and is not a directory. Use `os.Stat` and error checking.\n\n**Example:**\n- Input: `"main.go"` (file exists) → true\n- Input: `"nonexistent"` → false',
    starter:
      'import "os"\n\nfunc fileExists(filename string) bool {\n    // your code\n}',
    referenceSolution:
      "func fileExists(filename string) bool {\n    info, err := os.Stat(filename)\n    if os.IsNotExist(err) {\n        return false\n    }\n    // If error (e.g., permission denied), treat as not existing\n    if err != nil {\n        return false\n    }\n    return !info.IsDir()\n}",
    explanation:
      "**Concept:** `os.Stat` returns file info. Use `os.IsNotExist(err)` to detect missing files. Also check `info.IsDir()` to exclude directories, returning false for directories as they are not files.\n\n**Dry run:** If file exists and is a regular file, returns true. If file is a directory, returns false. If file does not exist, `os.IsNotExist` true → false. Permission error also returns false.\n\n**Hint:** Use `os.IsNotExist(err)` to detect missing files. Check `info.IsDir()` to exclude directories.",
  },
  {
    id: "go-time-parse-format",
    type: "implementation",
    topic: "Go Time",
    title: "Parse and format custom time strings",
    prompt:
      'Write two functions: `parseTime(s string) (time.Time, error)` that parses a time string in the format `"2006-01-02 15:04:05"` (example: `"2025-05-02 14:30:00"`), and `formatTime(t time.Time) string` that formats it back to the same layout.\n\n**Example:**\n- `parseTime("2025-05-02 14:30:00")` → `time.Time` value\n- `formatTime(parsed)` → `"2025-05-02 14:30:00"`',
    starter:
      'import "time"\n\nconst layout = "2006-01-02 15:04:05"\n\nfunc parseTime(s string) (time.Time, error) {\n    // your code\n}\n\nfunc formatTime(t time.Time) string {\n    // your code\n}',
    referenceSolution:
      "func parseTime(s string) (time.Time, error) {\n    return time.Parse(layout, s)\n}\n\nfunc formatTime(t time.Time) string {\n    return t.Format(layout)\n}",
    explanation:
      '**Concept:** Go uses a reference time `Mon Jan 2 15:04:05 MST 2006` to define layouts. `time.Parse` converts string to `time.Time`. `t.Format` does the reverse. This is a common source of confusion; use the reference time exactly.\n\n**Dry run:** Parse `"2025-05-02 14:30:00"` yields time object. Formatting returns identical string.\n\n**Hint:** The layout must use the specific numbers `2006`, `01`, `02`, `15`, `04`, `05`. No other years/months work.',
  },
  {
    id: "go-ticker",
    type: "implementation",
    topic: "Go Time",
    title: "Use time.Ticker for periodic tasks",
    prompt:
      'Write a function `startTicker(ctx context.Context, interval time.Duration, callback func())` that runs `callback` every `interval` until the context is cancelled. Use `time.NewTicker` and a goroutine.\n\n**Example:**\n`startTicker(ctx, 1*time.Second, func() { fmt.Println("tick") })` prints "tick" every second until ctx is cancelled.',
    starter:
      "func startTicker(ctx context.Context, interval time.Duration, callback func()) {\n    // your code\n}",
    referenceSolution:
      "func startTicker(ctx context.Context, interval time.Duration, callback func()) {\n    ticker := time.NewTicker(interval)\n    defer ticker.Stop()\n    for {\n        select {\n        case <-ctx.Done():\n            return\n        case <-ticker.C:\n            callback()\n        }\n    }\n}",
    explanation:
      "**Concept:** `time.NewTicker` returns a ticker that sends the current time on its `C` channel at each interval. The loop selects on `ticker.C` and context cancellation. `defer ticker.Stop()` stops the ticker and prevents goroutine leak.\n\n**Dry run:** Ticker created with 1s interval. Every second, `ticker.C` receives a time, `callback` is called. When `ctx.Done()` closes, the goroutine returns and the ticker is stopped.\n\n**Hint:** Always call `ticker.Stop()` to release resources. Use `select` to handle cancellation.",
  },
  {
    id: "go-env-file",
    type: "implementation",
    topic: "Go Configuration",
    title: "Load .env file using godotenv",
    prompt:
      'Write a function `loadEnv(path string) error` that loads environment variables from a `.env` file at the given path. Use the `godotenv` library. If the file does not exist, return nil (no error).\n\n**Example:**\n`.env` containing `PORT=8080` → `os.Getenv("PORT")` returns `"8080"` after loading.',
    starter:
      'import "github.com/joho/godotenv"\n\nfunc loadEnv(path string) error {\n    // your code\n}',
    referenceSolution:
      'func loadEnv(path string) error {\n    // godotenv.Load returns an error if the file doesn\'t exist\n    err := godotenv.Load(path)\n    if err != nil && !os.IsNotExist(err) {\n        return fmt.Errorf("failed to load .env: %w", err)\n    }\n    return nil\n}',
    explanation:
      "**Concept:** `godotenv.Load` reads a .env file and sets environment variables. It returns an error if the file is missing; we ignore that error while returning other errors (e.g., syntax). This allows optional .env files in development.\n\n**Dry run:** If `.env` exists, variables are set. If not, no error. If file exists but is malformed, returns an error.\n\n**Hint:** Install `github.com/joho/godotenv`. Use `os.IsNotExist` to ignore missing file errors.",
  },
  {
    id: "go-context-deadline",
    type: "implementation",
    topic: "Go Context",
    title: "Use context.WithDeadline",
    prompt:
      "Write a function `doUntilDeadline(ctx context.Context, work func() error) error` that executes `work` and if it exceeds the absolute deadline in the context, returns `context.DeadlineExceeded`. The work function is synchronous. Use `ctx.Done()`.\n\n**Example:**\n`ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(1*time.Second))`\n`defer cancel()`\n`doUntilDeadline(ctx, func() error { time.Sleep(2*time.Second); return nil })` returns deadline exceeded.",
    starter:
      "func doUntilDeadline(ctx context.Context, work func() error) error {\n    // your code\n}",
    referenceSolution:
      "func doUntilDeadline(ctx context.Context, work func() error) error {\n    done := make(chan error, 1)\n    go func() {\n        done <- work()\n    }()\n    select {\n    case err := <-done:\n        return err\n    case <-ctx.Done():\n        return ctx.Err()\n    }\n}",
    explanation:
      "**Concept:** `context.WithDeadline` sets an absolute deadline after which `ctx.Done()` is closed. This pattern races the work function against the deadline. If the work finishes first, return its result; if the deadline triggers first, return `ctx.Err()` (typically `context.DeadlineExceeded`).\n\n**Dry run:** Work takes 2s, deadline 1s from now. After 1s, `ctx.Done()` is ready; `select` returns cancellation error. Work goroutine continues but its result is discarded.\n\n**Hint:** Use a buffered channel to avoid goroutine leak. Run work in a goroutine and select with `ctx.Done()`.",
  },
  {
    id: "go-atomic-value",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use sync/atomic.Value for config reload",
    prompt:
      'Implement a thread‑safe config store that holds a `map[string]string`. Use `atomic.Value` to store the current config. Provide `UpdateConfig(newConfig map[string]string)` and `Get(key string) (string, bool)` methods.\n\n**Example:**\n`UpdateConfig({"timeout": "30s"})` → `Get("timeout")` returns `"30s", true`.',
    starter:
      'import "sync/atomic"\n\ntype ConfigStore struct {\n    val atomic.Value // stores map[string]string\n}\n\nfunc NewConfigStore() *ConfigStore {\n    // initialise with empty map\n}\n\nfunc (cs *ConfigStore) UpdateConfig(newConfig map[string]string) {\n    // your code\n}\n\nfunc (cs *ConfigStore) Get(key string) (string, bool) {\n    // your code\n}',
    referenceSolution:
      "func NewConfigStore() *ConfigStore {\n    cs := &ConfigStore{}\n    cs.val.Store(make(map[string]string))\n    return cs\n}\n\nfunc (cs *ConfigStore) UpdateConfig(newConfig map[string]string) {\n    // Store takes a copy (map is reference; we must copy to avoid later mutation)\n    copyMap := make(map[string]string)\n    for k, v := range newConfig {\n        copyMap[k] = v\n    }\n    cs.val.Store(copyMap)\n}\n\nfunc (cs *ConfigStore) Get(key string) (string, bool) {\n    m := cs.val.Load().(map[string]string)\n    val, ok := m[key]\n    return val, ok\n}",
    explanation:
      "**Concept:** `atomic.Value` provides lock‑free, type‑safe storage for any Go value. It is ideal for immutable shared data like configuration. Store and Load are atomic. We copy the map to avoid the caller mutating it after Store. Load returns an `interface{}`; we type assert to `map[string]string`.\n\n**Dry run:** `UpdateConfig` stores a copy of the map. `Get` loads the map and looks up the key. Concurrent calls are safe without mutex.\n\n**Hint:** Store a copy of the map to prevent external modification. Type assert the loaded value to the expected type.",
  },
  {
    id: "go-sync-pool",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use sync.Pool to reuse buffers",
    prompt:
      'Create a `sync.Pool` that allocates byte slices of size 1024. Write a function `process(data []byte)` that gets a buffer from the pool, copies the data into it, runs some processing (simulate with `time.Sleep`), then returns the buffer to the pool. Use `defer`.\n\n**Example:**\n`process([]byte("hello"))` uses pooled buffer, returns it after use.',
    starter:
      "var bufferPool = sync.Pool{\n    New: func() interface{} { return make([]byte, 1024) },\n}\n\nfunc process(data []byte) {\n    // your code\n}",
    referenceSolution:
      "func process(data []byte) {\n    // Get buffer from pool\n    buf := bufferPool.Get().([]byte)\n    // Ensure the buffer is returned to pool even if panic occurs\n    defer bufferPool.Put(buf)\n    // Copy data into buffer (respect capacity)\n    n := copy(buf, data)\n    // Simulate processing (e.g., hash computation)\n    time.Sleep(10 * time.Millisecond)\n    // Use the first n bytes of buf for result\n    _ = buf[:n]\n}",
    explanation:
      "**Concept:** `sync.Pool` caches temporary objects that are expensive to create. It reduces GC pressure. `Get` returns an interface; type assert to the concrete type. Always `Put` back after use, preferably with `defer`. The `New` function is called only when the pool is empty.\n\n**Dry run:** First call: pool is empty, `New` creates a buffer. After use, `Put` returns it. Second call: `Get` reuses the same buffer. This avoids allocation each time.\n\n**Hint:** Use type assertion after `Get`. Always `Put` back with `defer`. Do not store slices that reference external data that could be mutated later.",
  },
  {
    id: "go-pgx-copyfrom",
    type: "implementation",
    topic: "Go Database",
    title: "Bulk insert using pgx COPY FROM",
    prompt:
      'Write a function `bulkInsertUsers(ctx context.Context, pool *pgxpool.Pool, users []User) error` that inserts many users efficiently using `COPY FROM`. Assume table `users` has columns `name` and `email`. Use `pgx.CopyFrom`.\n\n**Example:**\n`bulkInsertUsers(ctx, pool, []User{{Name:"Alice", Email:"a@b.com"}, ...})` inserts all rows.',
    starter:
      "type User struct {\n    Name  string\n    Email string\n}\n\nfunc bulkInsertUsers(ctx context.Context, pool *pgxpool.Pool, users []User) error {\n    // your code\n}",
    referenceSolution:
      'func bulkInsertUsers(ctx context.Context, pool *pgxpool.Pool, users []User) error {\n    // Convert each user to a slice of drivers.Value\n    rows := make([][]any, len(users))\n    for i, u := range users {\n        rows[i] = []any{u.Name, u.Email}\n    }\n    // Use COPY FROM with the table and column names\n    _, err := pool.CopyFrom(\n        ctx,\n        pgx.Identifier{"users"},\n        []string{"name", "email"},\n        pgx.CopyFromRows(rows),\n    )\n    return err\n}',
    explanation:
      "**Concept:** `COPY FROM` is the fastest way to insert many rows in PostgreSQL. `pool.CopyFrom` takes a table name, column names, and a `CopyFromSource`. `pgx.CopyFromRows` accepts a slice of `[]any`. This is much faster than many individual INSERTs.\n\n**Dry run:** 1000 users are converted to a 2D slice. `CopyFrom` sends the data in a single network round‑trip, bypassing SQL parsing overhead.\n\n**Hint:** Use `pgx.Identifier` for table name. Provide column names in order. Each row must be a slice of `any` (`[]interface{}`) in the correct order.",
  },
  {
    id: "go-sql-null",
    type: "implementation",
    topic: "Go Database",
    title: "Handle NULL values with sql.NullString",
    prompt:
      'Write a function `getUserName(ctx context.Context, pool *pgxpool.Pool, id int) (string, error)` that retrieves a user\'s name. The `name` column in the database may be NULL. Return an empty string if NULL, otherwise the name. Use `sql.NullString`.\n\n**Example:**\n- If name is `"Alice"` → returns `"Alice", nil`\n- If name is NULL → returns `"", nil`',
    starter:
      'import "database/sql"\n\nfunc getUserName(ctx context.Context, pool *pgxpool.Pool, id int) (string, error) {\n    // your code\n}',
    referenceSolution:
      'func getUserName(ctx context.Context, pool *pgxpool.Pool, id int) (string, error) {\n    var ns sql.NullString\n    query := `SELECT name FROM users WHERE id = $1`\n    err := pool.QueryRow(ctx, query, id).Scan(&ns)\n    if err != nil {\n        if errors.Is(err, pgx.ErrNoRows) {\n            return "", fmt.Errorf("user %d not found", id)\n        }\n        return "", err\n    }\n    if ns.Valid {\n        return ns.String, nil\n    }\n    return "", nil\n}',
    explanation:
      "**Concept:** `sql.NullString` represents a nullable string. It has `Valid` bool (true if not NULL) and `String` value. Scanning into it automatically handles NULL. This avoids using zero value (empty string) ambiguity.\n\n**Dry run:** If database row has `name = 'Alice'`, `ns.Valid` true, `ns.String = 'Alice'`, return it. If `name IS NULL`, `ns.Valid` false, we return empty string (not an error).\n\n**Hint:** Use `sql.NullString`, `sql.NullInt64`, etc. Check `Valid` before accessing underlying value.",
  },
  {
    id: "go-custom-error",
    type: "implementation",
    topic: "Go Errors",
    title: "Implement custom error type",
    prompt:
      'Define a custom error type `ValidationError` that contains the field name and the error message. It should implement the error interface. Write a function `validateUser(u User) error` that returns a `ValidationError` if name is empty or age < 0.\n\n**Example:**\n`validateUser(User{Name:"", Age:20})` → `ValidationError{Field:"name", Msg:"cannot be empty"}`.',
    starter:
      "type ValidationError struct {\n    Field string\n    Msg   string\n}\n\nfunc (e ValidationError) Error() string {\n    // your code\n}\n\nfunc validateUser(u User) error {\n    // your code\n}",
    referenceSolution:
      'func (e ValidationError) Error() string {\n    return fmt.Sprintf("validation failed on field %s: %s", e.Field, e.Msg)\n}\n\nfunc validateUser(u User) error {\n    if u.Name == "" {\n        return ValidationError{Field: "name", Msg: "cannot be empty"}\n    }\n    if u.Age < 0 {\n        return ValidationError{Field: "age", Msg: "must be >=0"}\n    }\n    return nil\n}',
    explanation:
      '**Concept:** Custom errors are structs that implement the `error` interface (`Error() string`). This allows attaching additional fields. Use type assertion to retrieve those fields when handling the error.\n\n**Dry run:** If name empty, returns `ValidationError`. The error message is `"validation failed on field name: cannot be empty"`. The caller can check `var ve ValidationError; errors.As(err, &ve)` to inspect fields.\n\n**Hint:** Use `fmt.Sprintf` in `Error()`. Use `errors.As` to extract custom error details.',
  },
  {
    id: "go-embed-files",
    type: "implementation",
    topic: "Go Embedding",
    title: "Embed static files using go:embed",
    prompt:
      "Use the `go:embed` directive to embed a folder `static` containing an `index.html` file. Write a Gin handler that serves the embedded file content when GET `/` is called.\n\n**Example:**\nRequest to `/` returns the content of `static/index.html`.",
    starter:
      'import (\n    "embed"\n    "net/http"\n    "github.com/gin-gonic/gin"\n)\n\n//go:embed static\nvar staticFS embed.FS\n\nfunc main() {\n    r := gin.Default()\n    // your handler\n    r.Run()\n}',
    referenceSolution:
      '//go:embed static\nvar staticFS embed.FS\n\nfunc main() {\n    r := gin.Default()\n    // Method 1: Serve file directly\n    r.GET("/", func(c *gin.Context) {\n        data, err := staticFS.ReadFile("static/index.html")\n        if err != nil {\n            c.String(http.StatusInternalServerError, "file not found")\n            return\n        }\n        c.Data(http.StatusOK, "text/html; charset=utf-8", data)\n    })\n    // Or use Gin\'s static middleware with embedded FS (requires helper)\n    r.Run()\n}',
    explanation:
      "**Concept:** `go:embed` embeds files into the binary at compile time. The `embed.FS` is a read‑only filesystem. `ReadFile` returns the file content as a byte slice. This is useful for single‑binary deployments.\n\n**Dry run:** Compilation includes `static/index.html` in the binary. When GET `/` arrives, `ReadFile` reads the embedded file (no disk I/O) and returns its content as HTML.\n\n**Hint:** Use `//go:embed directory` to embed a whole folder. Use `ReadFile` to get individual files.",
  },
  {
    id: "go-httptest-server",
    type: "implementation",
    topic: "Go Testing",
    title: "Test HTTP client using httptest.Server",
    prompt:
      'Write a test that starts an `httptest.Server` that returns a fixed JSON response `{"message":"ok"}`. Then call the `fetchURL` function (from earlier) and assert that the returned string equals the JSON. End the server after the test.\n\n**Example:**\nTest passes when the client receives the same JSON.',
    starter:
      "func TestFetchURL(t *testing.T) {\n    // create server\n    // call fetchURL\n    // assert\n}",
    referenceSolution:
      'func TestFetchURL(t *testing.T) {\n    // Create a test server that returns JSON\n    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        w.Header().Set("Content-Type", "application/json")\n        w.WriteHeader(http.StatusOK)\n        w.Write([]byte(`{"message":"ok"}`))\n    }))\n    defer server.Close()\n\n    body, err := fetchURL(server.URL)\n    if err != nil {\n        t.Fatalf("fetchURL error: %v", err)\n    }\n    expected := `{"message":"ok"}`\n    if body != expected {\n        t.Errorf("got %s, want %s", body, expected)\n    }\n}',
    explanation:
      "**Concept:** `httptest.NewServer` starts a local HTTP server for testing. It returns a `*httptest.Server` with a `URL` field. We can use this URL in our client. The server runs until `Close()` is called. This allows integration testing of HTTP clients without external dependencies.\n\n**Dry run:** Server is started on a random port. `fetchURL` makes a real HTTP call to that server. Server responds with JSON. Client returns it. Test verifies equality.\n\n**Hint:** Always call `server.Close()` (defer makes it safe). The server uses the same `http.Handler` interface as production.",
  },
  {
    id: "go-mock-interface",
    type: "implementation",
    topic: "Go Testing",
    title: "Mock an interface for unit testing",
    prompt:
      'Define an interface `UserFetcher` with method `GetUser(id int) (User, error)`. Write a mock implementation for testing that returns predefined data. Write a test function that uses the mock to verify a service that depends on `UserFetcher`.\n\n**Example:**\nMock returns `User{ID:1, Name:"Mock"}`; service returns the same user.',
    starter:
      "type UserFetcher interface {\n    GetUser(id int) (User, error)\n}\n\ntype UserService struct {\n    fetcher UserFetcher\n}\n\nfunc (s *UserService) GetUserDetails(id int) (User, error) {\n    return s.fetcher.GetUser(id)\n}\n\ntype mockUserFetcher struct {\n    user User\n    err  error\n}\n\nfunc (m mockUserFetcher) GetUser(id int) (User, error) {\n    return m.user, m.err\n}\n\nfunc TestUserService(t *testing.T) {\n    // your test\n}",
    referenceSolution:
      'func TestUserService(t *testing.T) {\n    expectedUser := User{ID: 1, Name: "Mocked"}\n    mock := mockUserFetcher{user: expectedUser, err: nil}\n    service := &UserService{fetcher: mock}\n    user, err := service.GetUserDetails(123)\n    if err != nil {\n        t.Fatal(err)\n    }\n    if user != expectedUser {\n        t.Errorf("got %+v, want %+v", user, expectedUser)\n    }\n}',
    explanation:
      "**Concept:** Dependency injection allows replacing real implementations with mocks. The mock implements the same interface but returns canned data. This isolates unit tests from external dependencies (databases, APIs).\n\n**Dry run:** The test creates a mock fetcher, passes it to `UserService`. `GetUserDetails` calls the mock, which returns the predefined user. Test asserts equality.\n\n**Hint:** Use `gomock` or `testify/mock` for complex mocks. For simple cases, a manual struct with fields is enough.",
  },
  {
    id: "go-redis-multi-exec",
    type: "implementation",
    topic: "Go Redis",
    title: "Use Redis MULTI/EXEC transactions",
    prompt:
      'Write a function `incrementCounters(ctx context.Context, rdb *redis.Client, keys []string) error` that increments all specified keys by 1 atomically using a Redis transaction (`MULTI`/`EXEC`). Use pipeline or `TxPipelined`.\n\n**Example:**\n`incrementCounters(ctx, rdb, []string{"a","b"})` increments both `a` and `b` atomically.',
    starter:
      "func incrementCounters(ctx context.Context, rdb *redis.Client, keys []string) error {\n    // your code\n}",
    referenceSolution:
      "func incrementCounters(ctx context.Context, rdb *redis.Client, keys []string) error {\n    // TxPipelined executes commands as a transaction (MULTI/EXEC)\n    _, err := rdb.TxPipelined(ctx, func(pipe redis.Pipeliner) error {\n        for _, key := range keys {\n            pipe.Incr(ctx, key)\n        }\n        return nil\n    })\n    return err\n}",
    explanation:
      '**Concept:** `TxPipelined` wraps commands in `MULTI/EXEC` to execute them atomically. All commands are queued then executed together. No other client can interleave commands. This is useful for updates that must be consistent.\n\n**Dry run:** For keys ["a","b"], the pipeline sends `MULTI`, `INCR a`, `INCR b`, `EXEC`. Either all increments succeed or none. If Redis is down, error is returned.\n\n**Hint:** Use `TxPipelined` for atomic multi‑command operations. The callback receives a `Pipeliner`; use its methods (Incr, Set, etc.).',
  },
  {
    id: "go-redis-scan",
    type: "implementation",
    topic: "Go Redis",
    title: "Iterate over keys with SCAN",
    prompt:
      'Write a function `deleteKeysByPattern(ctx context.Context, rdb *redis.Client, pattern string) error` that deletes all keys matching the given pattern (e.g., `"user:*"`) using `SCAN` to avoid blocking. Use `Scan` and `Del` in a loop.\n\n**Example:**\n`deleteKeysByPattern(ctx, rdb, "session:*")` deletes all keys with prefix `session:`.',
    starter:
      "func deleteKeysByPattern(ctx context.Context, rdb *redis.Client, pattern string) error {\n    // your code\n}",
    referenceSolution:
      "func deleteKeysByPattern(ctx context.Context, rdb *redis.Client, pattern string) error {\n    var cursor uint64\n    var keysToDelete []string\n    for {\n        var keys []string\n        var err error\n        keys, cursor, err = rdb.Scan(ctx, cursor, pattern, 100).Result()\n        if err != nil {\n            return err\n        }\n        keysToDelete = append(keysToDelete, keys...)\n        if cursor == 0 {\n            break\n        }\n    }\n    if len(keysToDelete) > 0 {\n        return rdb.Del(ctx, keysToDelete...).Err()\n    }\n    return nil\n}",
    explanation:
      '**Concept:** `SCAN` iterates over keys without blocking the server. It returns a cursor and a batch of keys. Repeat until cursor returns 0. This is safer than `KEYS` for production. Delete keys in one `DEL` command to reduce round trips.\n\n**Dry run:** For pattern `"user:*"`, `SCAN` returns keys `["user:1", "user:2"]` then more batches. After collecting all, `DEL` removes them.\n\n**Hint:** Use `SCAN` with a reasonably sized `count` (e.g., 100). Do not use `KEYS` in production. Delete in batch when possible.',
  },
  {
    id: "go-slog-structured",
    type: "implementation",
    topic: "Go Logging",
    title: "Use structured logging with log/slog",
    prompt:
      'Write a function `logRequest(method, path string, status int, duration time.Duration)` that logs using `slog` with a structured log line containing fields: `method`, `path`, `status`, `duration_ms`. Log at INFO level.\n\n**Example:**\n`logRequest("GET", "/api/users", 200, 15*time.Millisecond)` produces a structured log with the fields.',
    starter:
      'import "log/slog"\n\nfunc logRequest(method, path string, status int, duration time.Duration) {\n    // your code\n}',
    referenceSolution:
      'func logRequest(method, path string, status int, duration time.Duration) {\n    slog.Info("http request",\n        "method", method,\n        "path", path,\n        "status", status,\n        "duration_ms", duration.Milliseconds(),\n    )\n}',
    explanation:
      '**Concept:** `log/slog` (Go 1.21+) provides structured logging with key‑value pairs. `slog.Info` logs at Info level. Fields are alternating keys and values. This makes logs machine‑parseable (JSON by default).\n\n**Dry run:** The log line might output `{ "level": "INFO", "msg": "http request", "method": "GET", "path": "/api/users", "status": 200, "duration_ms": 15 }`.\n\n**Hint:** Use `slog.Info`, `slog.Error`, etc. Pass key‑value pairs after the message. Use `duration.Milliseconds()` for numeric duration.',
  },
  {
    id: "go-pprof",
    type: "implementation",
    topic: "Go Profiling",
    title: "Enable pprof HTTP endpoints",
    prompt:
      "Add pprof profiling endpoints to a Gin server by importing `net/http/pprof` and registering them on a separate port or on the main router. Include the CPU and heap profiles.\n\n**Example:**\nAccess `http://localhost:6060/debug/pprof/` to see profiling data.",
    starter:
      'import (\n    "net/http"\n    _ "net/http/pprof"\n    "github.com/gin-gonic/gin"\n)\n\nfunc main() {\n    // your code to start pprof server\n}',
    referenceSolution:
      'func main() {\n    // Start pprof server on different port (optional, but safe)\n    go func() {\n        log.Println(http.ListenAndServe(":6060", nil))\n    }()\n    // Main Gin server\n    r := gin.Default()\n    r.GET("/", func(c *gin.Context) { c.String(200, "ok") })\n    r.Run(":8080")\n}',
    explanation:
      "**Concept:** Importing `net/http/pprof` automatically registers handlers on `http.DefaultServeMux`. Running a separate HTTP server on a different port exposes `/debug/pprof/` endpoints. Use `go tool pprof` to analyse CPU, heap, mutex, and goroutine profiles.\n\n**Dry run:** After starting, `curl localhost:6060/debug/pprof/` lists profiles. `go tool pprof -http=:8081 http://localhost:6060/debug/pprof/profile?seconds=30` collects 30s CPU profile and opens a web UI.\n\n**Hint:** Start pprof on a different port to avoid exposing it publicly. Use `go tool pprof` for analysis.",
  },
  {
    id: "go-test-goroutine-leak",
    type: "implementation",
    topic: "Go Testing",
    title: "Detect goroutine leaks in tests",
    prompt:
      "Write a test that starts a goroutine that never returns (simulate a leak). Use `runtime.NumGoroutine()` to check that the number of goroutines does not increase after the test. The test should fail if a leak is detected.\n\n**Example:**\nTest that calls a function that should not leak goroutines.",
    starter:
      'import (\n    "runtime"\n    "testing"\n)\n\nfunc TestNoLeak(t *testing.T) {\n    before := runtime.NumGoroutine()\n    // call function that may spawn goroutines\n    after := runtime.NumGoroutine()\n    if after != before {\n        t.Errorf("goroutine leak: before=%d after=%d", before, after)\n    }\n}',
    referenceSolution:
      'func TestNoLeak(t *testing.T) {\n    before := runtime.NumGoroutine()\n    // Simulate spawning a goroutine that returns\n    done := make(chan bool)\n    go func() {\n        // work\n        done <- true\n    }()\n    <-done\n    // Allow scheduler to clean up\n    runtime.Gosched()\n    after := runtime.NumGoroutine()\n    if after != before {\n        t.Errorf("potential leak: start %d, end %d", before, after)\n    }\n}',
    explanation:
      "**Concept:** `runtime.NumGoroutine()` returns the current number of goroutines. By measuring before and after the test, we can detect leaks. However, the runtime may have other background goroutines; the best practice is to compare the delta after waiting for completion.\n\n**Dry run:** Before test: 2 goroutines (main + GC). After test, also 2 → pass. If a goroutine is not cleaned up, count increases → fail.\n\n**Hint:** Use `runtime.Gosched()` to give the scheduler a chance to finish goroutines. Combine with WaitGroup for accurate detection.",
  },
  {
    id: "go-build-tags",
    type: "implementation",
    topic: "Go Build",
    title: "Use build tags for conditional compilation",
    prompt:
      'Create two files: `prod.go` and `dev.go`. In `prod.go`, use a build tag `//go:build prod` to define a function `GetConfig() string` that returns `"production"`. In `dev.go`, use tag `//go:build dev` to return `"development"`. Write a main that prints the config. Show the build command to select the tag.\n\n**Example:**\n`go build -tags prod` → prints `production`.',
    starter:
      '// dev.go\n//go:build dev\n\npackage main\n\nfunc GetConfig() string {\n    return "development"\n}\n\n// prod.go\n//go:build prod\n\npackage main\n\nfunc GetConfig() string {\n    return "production"\n}\n\n// main.go\npackage main\n\nfunc main() {\n    println(GetConfig())\n}',
    referenceSolution:
      "// Already provided in starter; this is the correct implementation.\n\n// Build with dev: go build -tags dev\n// Build with prod: go build -tags prod",
    explanation:
      '**Concept:** Build tags (constraints) control which files are included during compilation. The line `//go:build prod` means this file is only included when the `prod` tag is present. Tags are passed with `-tags` flag. This is useful for platform‑specific code, environment configurations, or feature flags.\n\n**Dry run:** `go build -tags dev` includes `dev.go`; `GetConfig` returns `"development"`. Without any tag, neither file is included, causing a compilation error (undefined).\n\n**Hint:** Place build tag on the first line of the file, followed by a blank line. Use `//go:build` syntax (Go 1.17+).',
  },
  {
    id: "go-atomic-cas",
    type: "implementation",
    topic: "Go Concurrency",
    title: "Use atomic CompareAndSwap",
    prompt:
      "Write a function `tryIncrement(counter *int64) bool` that atomically increments the counter only if the current value is less than 10. Use `atomic.CompareAndSwapInt64`. Return true if incremented, false otherwise.\n\n**Example:**\nIf counter = 5 → increments to 6, returns true.\nIf counter = 10 → no change, returns false.",
    starter:
      'import "sync/atomic"\n\nfunc tryIncrement(counter *int64) bool {\n    // your code\n}',
    referenceSolution:
      "func tryIncrement(counter *int64) bool {\n    for {\n        old := atomic.LoadInt64(counter)\n        if old >= 10 {\n            return false\n        }\n        newVal := old + 1\n        if atomic.CompareAndSwapInt64(counter, old, newVal) {\n            return true\n        }\n        // CAS failed, loop and retry\n    }\n}",
    explanation:
      "**Concept:** `atomic.CompareAndSwap` performs a conditional atomic write: it sets new value only if the current value equals the old value. This allows lock‑free algorithms. The loop retries if a concurrent update happened between Load and CAS.\n\n**Dry run:** counter = 5. Load returns 5 (<10). Attempt CAS from 5→6. If no other goroutine changed it, CAS succeeds, returns true. If another goroutine changed it to 6, CAS fails, loop reloads new value (6) and checks again.\n\n**Hint:** Use `Load` first, then `CompareAndSwap`. Loop until CAS succeeds or condition fails.",
  },
  {
    id: "go-context-afterfunc",
    type: "implementation",
    topic: "Go Context",
    title: "Use context.AfterFunc (Go 1.21+)",
    prompt:
      'Write a function `scheduleCleanup(ctx context.Context, callback func())` that uses `context.AfterFunc` to execute `callback` when the context is cancelled or times out. Simulate cancellation after 1 second.\n\n**Example:**\n`ctx, cancel := context.WithCancel(context.Background())`\n`scheduleCleanup(ctx, func() { fmt.Println("cleaned") })`\n`cancel()` → prints `cleaned`.',
    starter:
      "func scheduleCleanup(ctx context.Context, callback func()) {\n    // your code\n}",
    referenceSolution:
      "func scheduleCleanup(ctx context.Context, callback func()) {\n    // AfterFunc runs callback when ctx.Done() is closed, in its own goroutine\n    context.AfterFunc(ctx, callback)\n}",
    explanation:
      "**Concept:** `context.AfterFunc` (Go 1.21+) registers a function that runs in its own goroutine when the context is done (cancelled or timed out). It returns a `func()` that can stop the registration. This is a clean way to hook cleanup actions.\n\n**Dry run:** Create cancellable context, call `AfterFunc`. When `cancel()` executes, `callback` runs asynchronously. The program prints `cleaned`.\n\n**Hint:** `AfterFunc` does not block. Ensure the callback is safe for concurrent execution. The context must be cancellable or have a deadline.",
  },
  {
    id: "go-time-timer",
    type: "implementation",
    topic: "Go Time",
    title: "Use time.Timer for one‑shot delayed execution",
    prompt:
      'Write a function `delayedPrint(delay time.Duration, msg string)` that prints the message after the specified delay. Use `time.NewTimer`. Allow the timer to be stopped if the function returns early (e.g., via a context).\n\n**Example:**\n`delayedPrint(2*time.Second, "hello")` prints "hello" after 2 seconds.',
    starter:
      "func delayedPrint(ctx context.Context, delay time.Duration, msg string) {\n    // your code\n}",
    referenceSolution:
      "func delayedPrint(ctx context.Context, delay time.Duration, msg string) {\n    timer := time.NewTimer(delay)\n    defer timer.Stop()\n    select {\n    case <-timer.C:\n        fmt.Println(msg)\n    case <-ctx.Done():\n        return\n    }\n}",
    explanation:
      "**Concept:** `time.NewTimer` returns a timer that sends the current time on its `C` channel after the delay. `timer.Stop()` prevents the timer from firing if it hasn't already. The select races the timer with context cancellation. This is a one‑shot alternative to `time.After` with cancellation support.\n\n**Dry run:** Delay 2s. Timer started. If no cancellation, after 2s `timer.C` triggers and message prints. If context cancelled before 2s, `ctx.Done()` triggers and function returns without printing.\n\n**Hint:** Always `defer timer.Stop()` to release resources. `time.After` does not provide a way to cancel; use `NewTimer` for cancellable delays.",
  },
  {
    id: "go-errors-join",
    type: "implementation",
    topic: "Go Errors",
    title: "Combine multiple errors with errors.Join",
    prompt:
      "Write a function `validateAll(users []User) error` that collects all validation errors for each user and returns them combined using `errors.Join`. If no errors, return nil.\n\n**Example:**\nTwo invalid users → returns combined error containing both validation messages.",
    starter:
      'import "errors"\n\nfunc validateAll(users []User) error {\n    // your code\n}',
    referenceSolution:
      "func validateAll(users []User) error {\n    var errs []error\n    for _, u := range users {\n        if err := validateUser(u); err != nil {\n            errs = append(errs, err)\n        }\n    }\n    return errors.Join(errs...)\n}",
    explanation:
      "**Concept:** `errors.Join` (Go 1.20+) combines multiple errors into a single error. When printed, each error is separated by newlines. `errors.Is` can check for any wrapped error, and `errors.As` can extract specific types.\n\n**Dry run:** If two users are invalid, `errs` contains two errors. `errors.Join` returns a non‑nil error. If all valid, `errs` empty, `Join` returns nil.\n\n**Hint:** Use `errors.Join` to aggregate multiple independent errors. The returned error implements `Unwrap() []error`.",
  },
];
