export const implementationQuestions = [
  {
    id: "impl-fizzbuzz",
    type: "implementation",
    topic: "Loops",
    title: "FizzBuzz",
    prompt:
      "Write a function that prints numbers from 1 to n. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz'.\n\nExample:\nInput: n = 5\nOutput: 1, 2, 'Fizz', 4, 'Buzz'\n\nInput: n = 15\nOutput: 1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'",
    starter: "function fizzBuzz(n) {\n  // your solution here\n}",
    referenceSolution:
      'function fizzBuzz(n) {\n  // Loop from 1 to n (inclusive)\n  for (let i = 1; i <= n; i++) {\n    // Check divisibility by 15 first (3 and 5 together)\n    if (i % 15 === 0) {\n      console.log("FizzBuzz");\n    } \n    // Then check only 3\n    else if (i % 3 === 0) {\n      console.log("Fizz");\n    } \n    // Then check only 5\n    else if (i % 5 === 0) {\n      console.log("Buzz");\n    } \n    // Otherwise print the number\n    else {\n      console.log(i);\n    }\n  }\n}',
    explanation:
      "Check divisibility by 15 first because it includes both 3 and 5. The order matters: if we checked 3 first, 15 would be caught as 'Fizz' incorrectly.",
    hint: "Use modulo (%) and test 15 before 3 and 5.",
  },
  {
    id: "impl-sum-array",
    type: "implementation",
    topic: "Arrays",
    title: "Sum of array",
    prompt:
      "Write a function that returns the sum of all numbers in an array.\n\nExample:\nInput: [1, 2, 3, 4]\nOutput: 10\n\nInput: []\nOutput: 0",
    starter: "function sumArray(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function sumArray(arr) {\n  // Use reduce to accumulate the sum\n  // acc is the running total, val is the current element\n  // Start with 0 so empty array returns 0\n  return arr.reduce((acc, val) => acc + val, 0);\n}",
    explanation:
      "reduce iterates over the array, adding each value to an accumulator. Initial value 0 handles empty arrays correctly.",
    hint: "Use reduce or a simple for loop.",
  },
  {
    id: "impl-max-array",
    type: "implementation",
    topic: "Arrays",
    title: "Find maximum",
    prompt:
      "Write a function that returns the maximum number in an array. If the array is empty, return undefined.\n\nExample:\nInput: [3, 7, 2, 9, 5]\nOutput: 9\n\nInput: [-5, -1, -3]\nOutput: -1",
    starter: "function findMax(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function findMax(arr) {\n  // If the array is empty, return undefined\n  if (arr.length === 0) return undefined;\n  // Spread syntax passes each array element as an argument to Math.max\n  return Math.max(...arr);\n}",
    explanation:
      "Math.max expects separate arguments. Spread operator expands the array into arguments. For very large arrays, consider reduce to avoid stack issues.",
    hint: "Use Math.max with spread, or reduce with a comparison.",
  },
  {
    id: "reverse-string",
    type: "implementation",
    topic: "Strings",
    title: "Reverse a string",
    prompt:
      "Write a function that reverses a string.\n\nExample:\nInput: 'hello'\nOutput: 'olleh'\n\nInput: 'JavaScript'\nOutput: 'tpircSavaJ'",
    starter: "function reverseString(str) {\n  // your solution here\n}",
    referenceSolution:
      "function reverseString(str) {\n  // Step 1: split the string into an array of characters\n  // Step 2: reverse the array\n  // Step 3: join the array back into a string\n  return str.split('').reverse().join('');\n}",
    explanation:
      "split('') creates an array of characters, reverse() reverses it in place, join('') concatenates the characters.",
    hint: "Use split, reverse, join.",
  },
  {
    id: "impl-palindrome",
    type: "implementation",
    topic: "Strings",
    title: "Palindrome check",
    prompt:
      "Check if a string is a palindrome (ignoring case and non‑alphanumeric characters).\n\nExample:\nInput: 'A man, a plan, a canal: Panama'\nOutput: true\n\nInput: 'race a car'\nOutput: false",
    starter: "function isPalindrome(str) {\n  // your solution here\n}",
    referenceSolution:
      "function isPalindrome(str) {\n  // 1. Convert to lowercase and remove non-alphanumeric characters\n  //    Regex: ^a-z0-9 means any character NOT a-z or 0-9 -> replace with ''\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  // 2. Compare cleaned string with its reverse\n  const reversed = cleaned.split('').reverse().join('');\n  return cleaned === reversed;\n}",
    explanation:
      "Normalize the string by removing punctuation/spaces and lowercasing, then compare with its reverse.",
    hint: "Use regex to clean, then compare with reversed string.",
  },
  {
    id: "count-vowels",
    type: "implementation",
    topic: "Strings",
    title: "Count vowels in a string",
    prompt:
      "Write a function that returns the number of vowels (a, e, i, o, u) in a string. Count both uppercase and lowercase.\n\nExample:\nInput: 'Hello World'\nOutput: 3 (e, o, o)\n\nInput: 'JavaScript is fun'\nOutput: 5 (a, a, i, u, u)",
    starter: "function countVowels(str) {\n  // your solution here\n}",
    referenceSolution:
      "function countVowels(str) {\n  // match() returns an array of all matches, or null if none\n  // The regex /[aeiou]/gi finds all vowels case-insensitively and globally\n  const matches = str.match(/[aeiou]/gi);\n  // If matches is null, return 0; otherwise return the array length\n  return matches ? matches.length : 0;\n}",
    explanation:
      "match() with regex /[aeiou]/gi returns an array of all vowels. If no match, returns null – handle that case.",
    hint: "Use match() with a regular expression and check the length.",
  },
  {
    id: "capitalize",
    type: "implementation",
    topic: "Strings",
    title: "Capitalize first letter of each word",
    prompt:
      "Write a function that capitalizes the first letter of every word in a sentence. Words are separated by spaces.\n\nExample:\nInput: 'hello world'\nOutput: 'Hello World'\n\nInput: 'javaScript is awesome'\nOutput: 'JavaScript Is Awesome'",
    starter: "function capitalize(str) {\n  // your solution here\n}",
    referenceSolution:
      "function capitalize(str) {\n  // Replace every word boundary followed by a letter with its uppercase\n  // \\b matches a word boundary, \\w matches a word character (letter, digit, underscore)\n  // The replacement function converts the matched character to uppercase\n  return str.replace(/\\b\\w/g, char => char.toUpperCase());\n}",
    explanation:
      "Regex /\\b\\w/g finds the first character of each word. The callback converts that character to uppercase.",
    hint: "Use replace with a regex and a callback.",
  },
  {
    id: "truncate",
    type: "implementation",
    topic: "Strings",
    title: "Truncate a string",
    prompt:
      "Write a function that truncates a string to a given maximum length and adds '...' if it was truncated. If the string is shorter or equal, return it unchanged.\n\nExample:\nInput: ('This is a long sentence', 10)\nOutput: 'This is a...'\n\nInput: ('Short', 10)\nOutput: 'Short'",
    starter: "function truncate(str, maxLen) {\n  // your solution here\n}",
    referenceSolution:
      "function truncate(str, maxLen) {\n  // If the string is already short enough, return it as is\n  if (str.length <= maxLen) return str;\n  // Otherwise, slice from 0 to maxLen and append '...'\n  // slice(0, maxLen) takes the first maxLen characters\n  return str.slice(0, maxLen) + '...';\n}",
    explanation:
      "Check length first; if too long, slice the string up to maxLen and add ellipsis.",
    hint: "Use slice and check length.",
  },
  {
    id: "camelCase",
    type: "implementation",
    topic: "Strings",
    title: "Convert to camelCase",
    prompt:
      "Write a function that converts a hyphenated or underscored string to camelCase. Words are separated by '-' or '_'. The first word stays lowercase; subsequent words are capitalized.\n\nExample:\nInput: 'hello-world'\nOutput: 'helloWorld'\n\nInput: 'java_script_is_fun'\nOutput: 'javaScriptIsFun'",
    starter: "function camelCase(str) {\n  // your solution here\n}",
    referenceSolution:
      "function camelCase(str) {\n  // Replace each hyphen or underscore followed by a letter\n  // The matched pattern: [-_] then a letter (captured in group (\\w))\n  // The replacement function takes the matched letter and converts it to uppercase\n  return str.replace(/[-_](\\w)/g, (_, char) => char.toUpperCase());\n}",
    explanation:
      "The regex /[-_](\\w)/g matches a hyphen or underscore then any word character. The replacement function turns that character to uppercase, removing the separator.",
    hint: "Use replace with a regex capturing group.",
  },
  {
    id: "merge-arrays",
    type: "implementation",
    topic: "Arrays",
    title: "Merge two arrays",
    prompt:
      "Write a function that merges two arrays without mutating either one. Return a new array.\n\nExample:\nInput: [1, 2], [3, 4]\nOutput: [1, 2, 3, 4]\n\nInput: ['a'], ['b', 'c']\nOutput: ['a', 'b', 'c']",
    starter:
      "function mergeArrays(first, second) {\n  // your solution here\n}",
    referenceSolution:
      "function mergeArrays(first, second) {\n  // Use the spread operator to create a new array containing all elements of first, then second\n  return [...first, ...second];\n}",
    explanation:
      "Spread syntax creates a shallow copy of each array, then combines them into a new array. Original arrays are not modified.",
    hint: "Keep the inputs unchanged and preserve order.",
  },
  {
    id: "merge-unique",
    type: "implementation",
    topic: "Arrays",
    title: "Merge and dedupe",
    prompt:
      "Write a function that merges two arrays and removes duplicate values. The order of elements should be preserved (first occurrence remains).\n\nExample:\nInput: [1, 2, 2, 3], [2, 3, 4]\nOutput: [1, 2, 3, 4]\n\nInput: ['a', 'b'], ['b', 'c', 'a']\nOutput: ['a', 'b', 'c']",
    starter:
      "function mergeUnique(first, second) {\n  // your solution here\n}",
    referenceSolution:
      "function mergeUnique(first, second) {\n  // Step 1: Combine both arrays using spread\n  const combined = [...first, ...second];\n  // Step 2: Create a Set from the combined array.\n  //        A Set automatically removes duplicates and preserves insertion order.\n  // Step 3: Spread the Set back into an array.\n  return [...new Set(combined)];\n}",
    explanation:
      "Combine the arrays immutably with spread syntax, then wrap the result in a Set to eliminate duplicates. Because Set iterates in insertion order, the first occurrence of each value is kept. Finally spread the Set back to an array.",
    hint: "Set is ideal for deduping while preserving order.",
  },
  {
    id: "remove-duplicates",
    type: "implementation",
    topic: "Arrays",
    title: "Remove duplicates from array",
    prompt:
      "Write a function that removes duplicate values from a single array while preserving the order of first occurrences.\n\nExample:\nInput: [1, 2, 2, 3, 1, 4]\nOutput: [1, 2, 3, 4]\n\nInput: ['x', 'x', 'y', 'z', 'y']\nOutput: ['x', 'y', 'z']",
    starter: "function removeDuplicates(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function removeDuplicates(arr) {\n  // A Set automatically discards duplicates and remembers insertion order.\n  // Using the Set constructor on the array creates a set of unique values.\n  // Spread the set back into an array to return an array.\n  return [...new Set(arr)];\n}",
    explanation:
      "Sets only store unique values, and they maintain the order in which elements were added. By converting the array to a Set and then back to an array, duplicates are removed and order is preserved – all in O(n) time.",
    hint: "Use Set for O(n) time complexity.",
  },
  {
    id: "flatten-one-level",
    type: "implementation",
    topic: "Arrays",
    title: "Flatten one level",
    prompt:
      "Write a function that flattens only one level of nesting. That is, if an array contains sub‑arrays, those sub‑arrays are expanded into the parent array, but deeper nesting remains unchanged.\n\nExample:\nInput: [1, [2, 3], [4, [5, 6]]]\nOutput: [1, 2, 3, 4, [5, 6]]\n\nInput: [[1, 2], [3, 4]]\nOutput: [1, 2, 3, 4]",
    starter: "function flattenOneLevel(items) {\n  // your solution here\n}",
    referenceSolution:
      "function flattenOneLevel(items) {\n  // Array.prototype.flat() with depth 1 (or no argument, default is 1) does exactly this.\n  // It concatenates the elements of any sub‑arrays one level deep into the parent array.\n  return items.flat();\n\n  // Alternative manual implementation using reduce:\n  // return items.reduce((acc, val) => acc.concat(val), []);\n  // That works because concat flattens arrays one level when passed as argument.\n}",
    explanation:
      "JavaScript's built‑in `flat()` method with depth 1 (the default) flattens exactly one level of nesting. The manual alternative uses `reduce` and `concat` – `concat` also flattens one level when it receives an array as an argument.",
    hint: "One level only, not deep flattening.",
  },
  {
    id: "chunk-array",
    type: "implementation",
    topic: "Arrays",
    title: "Chunk array into groups",
    prompt:
      "Write a function that splits an array into chunks of a given size. The last chunk may be smaller if the array length is not divisible by the size.\n\nExample:\nInput: [1, 2, 3, 4, 5, 6, 7], size = 3\nOutput: [[1, 2, 3], [4, 5, 6], [7]]\n\nInput: [1, 2, 3], size = 5\nOutput: [[1, 2, 3]]",
    starter: "function chunkArray(arr, size) {\n  // your solution here\n}",
    referenceSolution:
      "function chunkArray(arr, size) {\n  const result = [];\n  // Loop through the array with step = size\n  for (let i = 0; i < arr.length; i += size) {\n    // Slice extracts a chunk from i to i+size (not including i+size)\n    // This chunk is pushed into the result array\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}",
    explanation:
      "We iterate over the original array with an increment of `size`. At each step, we use `slice(i, i+size)` to get the next chunk. `slice` returns a new array, so the original is not mutated. The chunk is added to the result array. The final chunk automatically becomes shorter if there are not enough elements left.",
    hint: "Use slice to extract chunks.",
  },
  {
    id: "intersection",
    type: "implementation",
    topic: "Arrays",
    title: "Array intersection",
    prompt:
      "Find the common elements between two arrays. Return a new array containing the elements that appear in both arrays, preserving the order from the second array (or any order – common approach: use the first array as reference).\n\nExample:\nInput: [1, 2, 3, 4], [3, 4, 5, 6]\nOutput: [3, 4]\n\nInput: ['a', 'b', 'c'], ['b', 'c', 'd']\nOutput: ['b', 'c']",
    starter: "function intersection(arr1, arr2) {\n  // your solution here\n}",
    referenceSolution:
      "function intersection(arr1, arr2) {\n  // Step 1: Convert the first array into a Set for O(1) lookup time.\n  const set1 = new Set(arr1);\n  // Step 2: Filter the second array, keeping only elements that exist in set1.\n  // The filter callback returns true for elements in the intersection.\n  return arr2.filter(item => set1.has(item));\n}",
    explanation:
      "Using a Set allows constant‑time membership tests. We build a Set from `arr1`, then iterate through `arr2` and collect every element that is present in the Set. This is efficient (O(n+m)) and preserves the order of `arr2`.",
    hint: "Sets provide fast membership testing.",
  },
  {
    id: "uniqBy",
    type: "implementation",
    topic: "Arrays",
    title: "Unique array by mapper",
    prompt:
      "Write a function that returns a new array containing only unique elements based on a mapper function (like Lodash's uniqBy). For each element, the mapper produces a key; the first occurrence with a given key is kept.\n\nExample:\nInput: arr = [2.1, 1.2, 2.3], mapper = Math.floor\nKey: floor(2.1)=2, floor(1.2)=1, floor(2.3)=2 → output: [2.1, 1.2]\n\nInput: [{id:1}, {id:2}, {id:1}], mapper = obj => obj.id\nOutput: [{id:1}, {id:2}]",
    starter: "function uniqBy(arr, mapper) {\n  // your solution here\n}",
    referenceSolution:
      "function uniqBy(arr, mapper) {\n  // A Map stores the first occurrence of each key.\n  const seen = new Map();\n  // Filter the array; if the key is already in the Map, skip this element.\n  return arr.filter(item => {\n    const key = mapper(item);\n    if (seen.has(key)) return false;   // duplicate key → skip\n    seen.set(key, true);                // first time → mark as seen and keep\n    return true;\n  });\n}",
    explanation:
      "We use a Map to track which keys have been seen. For each item, we compute its key via the mapper. If the key is already in the Map, we skip the item. Otherwise, we store the key in the Map and keep the item. This preserves the order of first occurrences.",
    hint: "Use a Map to store seen keys.",
  },
  {
    id: "zip",
    type: "implementation",
    topic: "Arrays",
    title: "Zip two arrays",
    prompt:
      "Write a function that zips two arrays into an array of pairs. The result has length equal to the shorter array. Each pair is an array of two elements: the i‑th element from the first array and the i‑th element from the second array.\n\nExample:\nInput: [1, 2, 3], ['a', 'b', 'c']\nOutput: [[1, 'a'], [2, 'b'], [3, 'c']]\n\nInput: [1, 2], ['a', 'b', 'c']\nOutput: [[1, 'a'], [2, 'b']]",
    starter: "function zip(arr1, arr2) {\n  // your solution here\n}",
    referenceSolution:
      "function zip(arr1, arr2) {\n  // Determine the length of the shortest array\n  const minLen = Math.min(arr1.length, arr2.length);\n  const result = [];\n  // Loop up to minLen, pairing elements by index\n  for (let i = 0; i < minLen; i++) {\n    result.push([arr1[i], arr2[i]]);\n  }\n  return result;\n}",
    explanation:
      "We cannot pair beyond the shorter array’s length. `Math.min` gives us the number of valid pairs. Then we iterate index by index, constructing a new array of two elements and pushing it into the result. This is a classic zip operation.",
    hint: "Use Math.min to determine the length of the result.",
  },
  {
    id: "counter-closure",
    type: "implementation",
    topic: "Closures",
    title: "Counter with closure",
    prompt:
      "Create a counter that remembers its private state. The function `createCounter` should return an object with two methods: `increment()` (increases count by 1 and returns the new count) and `get()` (returns the current count without changing it). The count should not be accessible from outside.\n\nExample:\nconst c = createCounter();\nc.get() → 0\nc.increment() → 1\nc.increment() → 2\nc.get() → 2",
    starter:
      "function createCounter() {\n  // return increment and get methods\n}",
    referenceSolution:
      'function createCounter() {\n  // Private variable, only accessible inside this function\n  let count = 0;\n  // Return an object with two methods. Both methods "close over" the count variable,\n  // meaning they retain access to it even after createCounter returns.\n  return {\n    increment() {\n      count += 1;   // increment the private count\n      return count; // return the new value\n    },\n    get() {\n      return count; // just return the current count\n    }\n  };\n}',
    explanation:
      "JavaScript closures allow a function to remember the environment in which it was created. The `count` variable is local to `createCounter` and cannot be accessed from outside. However, the returned methods (`increment`, `get`) capture that variable and can read/update it. Each call to `createCounter` creates a new independent closure with its own `count`.",
    hint: "Use a factory function and keep count in local scope.",
  },
  {
    id: "once-function",
    type: "implementation",
    topic: "Functions",
    title: "Once - call function only once",
    prompt:
      "Create a function `once(fn)` that ensures `fn` is called only once. Subsequent calls to the returned function return the result of the first call. The `this` context and arguments should be preserved for the first call.\n\nExample:\nlet callCount = 0;\nconst myFn = () => { callCount++; return 'result'; };\nconst onceFn = once(myFn);\nconsole.log(onceFn()); // 'result', callCount = 1\nconsole.log(onceFn()); // 'result', callCount = 1 (no second call)",
    starter: "function once(fn) {\n  // your solution here\n}",
    referenceSolution:
      "function once(fn) {\n  let called = false;   // tracks whether fn has been executed\n  let result;           // stores the result of the first execution\n  return function (...args) {\n    // If not called yet, invoke fn with the provided arguments and context\n    if (!called) {\n      result = fn.apply(this, args); // preserve `this` and args\n      called = true;\n    }\n    return result; // return the stored result on any subsequent call\n  };\n}",
    explanation:
      "We use a closure to keep two private variables: `called` (a flag) and `result` (the cached return value). When the returned function is invoked, if `called` is false, we call the original `fn` with `apply` to capture the correct `this` and arguments, store its result, and set `called` to true. All future calls simply return the cached result.",
    hint: "Use closure to remember called state and result.",
  },
  {
    id: "partial",
    type: "implementation",
    topic: "Functions",
    title: "Partial application",
    prompt:
      "Implement a `partial` function that fixes some arguments of a function (left to right). It should return a new function that expects the remaining arguments.\n\nExample:\nfunction add(a, b, c) { return a + b + c; }\nconst add5and10 = partial(add, 5, 10);\nconsole.log(add5and10(3)); // 18 (5+10+3)\n\nconst add5 = partial(add, 5);\nconsole.log(add5(10, 3)); // 18 (5+10+3)",
    starter: "function partial(fn, ...fixedArgs) {\n  // your solution here\n}",
    referenceSolution:
      "function partial(fn, ...fixedArgs) {\n  // Return a new function that collects the remaining arguments\n  return function (...remainingArgs) {\n    // When called, combine the fixed arguments with the new ones\n    // and invoke the original function with them.\n    // The `this` from the returned function is passed through because\n    // we call fn with `fn(...)`; if we wanted to keep context we could use fn.apply(this, ...).\n    // Here we simply use spread concatenation.\n    return fn(...fixedArgs, ...remainingArgs);\n  };\n}",
    explanation:
      "The `partial` function takes a function `fn` and some arguments (`fixedArgs`). It returns a new function that, when called, combines the pre‑fixed arguments with any additional arguments passed later, then calls `fn` with the full argument list. This is a form of currying limited to one step.",
    hint: "Use spread operator to concatenate fixed and remaining arguments.",
  },
  {
    id: "sleep-promise",
    type: "implementation",
    topic: "Promises",
    title: "Sleep with promises",
    prompt:
      "Create a function `sleep(ms)` that returns a promise which resolves after the given number of milliseconds. This is useful for adding delays in async/await code.\n\nExample:\nconsole.log('Start');\nawait sleep(1000);\nconsole.log('End after 1 second');\n\nInput: ms = 2000\nOutput: a promise that resolves after 2000ms",
    starter: "function sleep(ms) {\n  // return a promise\n}",
    referenceSolution:
      "function sleep(ms) {\n  // Return a new Promise. The executor function receives 'resolve' as a parameter.\n  // We call setTimeout, which will invoke 'resolve' after 'ms' milliseconds.\n  // When 'resolve' is called, the promise transitions from pending to fulfilled.\n  return new Promise(resolve => setTimeout(resolve, ms));\n}",
    explanation:
      "The `sleep` function creates a Promise that remains pending until the timer completes. After `ms` milliseconds, `setTimeout` calls the `resolve` function, which fulfills the Promise. This pattern is fundamental for delaying execution in asynchronous code.",
    hint: "Use Promise constructor and setTimeout. The resolve function is the first argument of the executor.",
  },
  {
    id: "impl-simple-promise",
    type: "implementation",
    topic: "Promises",
    title: "Create a promise (delay)",
    prompt:
      "Write a function `delay(ms)` that returns a promise which resolves after a given delay. It is essentially the same as `sleep`. Include an example.\n\nExample:\ndelay(500).then(() => console.log('500ms passed'));",
    starter: "function delay(ms) {\n  // return a promise\n}",
    referenceSolution:
      "function delay(ms) {\n  // The Promise constructor takes an executor function with resolve and reject.\n  // Here we only need resolve, as we never reject.\n  // setTimeout schedules resolve to be called after ms milliseconds.\n  return new Promise(resolve => {\n    setTimeout(resolve, ms);\n  });\n}",
    explanation:
      "Same as `sleep`. The executor function is called immediately by the Promise constructor. Inside it, `setTimeout(resolve, ms)` ensures that after `ms` milliseconds, the `resolve` function is invoked, fulfilling the promise.",
    hint: "Use Promise constructor and setTimeout.",
  },
  {
    id: "isPrime",
    type: "implementation",
    topic: "Numbers",
    title: "Check if number is prime",
    prompt:
      "Write a function that returns `true` if a number is prime, `false` otherwise. A prime number is a natural number greater than 1 with no positive divisors other than 1 and itself.\n\nExample:\nInput: 7 → true\nInput: 10 → false\nInput: 2 → true\nInput: 1 → false",
    starter: "function isPrime(n) {\n  // your solution here\n}",
    referenceSolution:
      "function isPrime(n) {\n  // 1. Numbers <= 1 are not prime.\n  if (n <= 1) return false;\n  // 2. 2 and 3 are prime.\n  if (n <= 3) return true;\n  // 3. Eliminate even numbers and multiples of 3.\n  if (n % 2 === 0 || n % 3 === 0) return false;\n  // 4. Check divisibility by numbers of the form 6k ± 1 up to sqrt(n).\n  //    All primes > 3 can be written as 6k±1.\n  for (let i = 5; i * i <= n; i += 6) {\n    if (n % i === 0 || n % (i + 2) === 0) return false;\n  }\n  return true;\n}",
    explanation:
      "We first handle small cases. Then, because all primes greater than 3 can be expressed as 6k±1, we only need to check divisors of that form up to the square root of n. This reduces the number of iterations significantly compared to checking every number up to √n. The loop increments by 6 each time, checking both i and i+2.",
    hint: "Optimize by checking only up to sqrt(n) and using the 6k±1 pattern.",
  },
  {
    id: "isPowerOfTwo",
    type: "implementation",
    topic: "Numbers",
    title: "Check if number is power of two",
    prompt:
      "Write a function that returns `true` if a number is a power of two, `false` otherwise. A power of two is a number that can be written as 2^k for some integer k ≥ 0.\n\nExample:\nInput: 1 → true (2^0)\nInput: 16 → true (2^4)\nInput: 18 → false",
    starter: "function isPowerOfTwo(n) {\n  // your solution here\n}",
    referenceSolution:
      "function isPowerOfTwo(n) {\n  // A power of two in binary form has exactly one '1' bit.\n  // For example: 1 (1), 2 (10), 4 (100), 8 (1000).\n  // The expression n & (n-1) clears the lowest set bit.\n  // If n is a power of two, it has exactly one set bit, so n & (n-1) === 0.\n  // Also, n must be positive (since 0 or negative numbers are not powers of two).\n  return n > 0 && (n & (n - 1)) === 0;\n}",
    explanation:
      "This classic bit‑manipulation trick works because powers of two have a single 1 in their binary representation. Subtracting 1 flips all bits after that 1. For example, 8 (1000) minus 1 = 7 (0111); 1000 & 0111 = 0. Any other number will have more than one 1, so the bitwise AND will not be zero. The check for n > 0 excludes zero and negative numbers.",
    hint: "Use bitwise AND: n & (n-1) === 0 for positive numbers.",
  },
  {
    id: "gcd",
    type: "implementation",
    topic: "Numbers",
    title: "Greatest common divisor",
    prompt:
      "Compute the greatest common divisor (GCD) of two numbers using the Euclidean algorithm. The GCD is the largest positive integer that divides both numbers without a remainder.\n\nExample:\nInput: (48, 18) → 6\nInput: (100, 35) → 5\nInput: (0, 5) → 5 (by convention, gcd(0, a) = |a|)",
    starter: "function gcd(a, b) {\n  // your solution here\n}",
    referenceSolution:
      "function gcd(a, b) {\n  // Euclidean algorithm: repeatedly replace (a, b) with (b, a % b) until b becomes 0.\n  // At that point, a is the GCD.\n  // We'll use a while loop for clarity and efficiency (iterative).\n  // First, take absolute values to handle negatives.\n  a = Math.abs(a);\n  b = Math.abs(b);\n  while (b !== 0) {\n    const temp = b;\n    b = a % b;  // remainder\n    a = temp;\n  }\n  return a;\n}",
    explanation:
      "The Euclidean algorithm is based on the principle that gcd(a, b) = gcd(b, a mod b). We repeat this until the remainder becomes zero; the last non‑zero remainder is the GCD. The algorithm is fast (logarithmic time) and works for any integers, including negatives (we take absolute values).",
    hint: "Use a loop or recursion with modulo operator. Check also the absolute values.",
  },
  {
    id: "randomInRange",
    type: "implementation",
    topic: "Math",
    title: "Random number in range",
    prompt:
      "Write a function that returns a random integer between `min` and `max` (inclusive).\n\nExample:\nrandomInRange(1, 10) → e.g., 7 (possible values: 1,2,...,10)\nrandomInRange(5, 5) → 5",
    starter: "function randomInRange(min, max) {\n  // your solution here\n}",
    referenceSolution:
      "function randomInRange(min, max) {\n  // Math.random() returns a floating-point number in [0, 1).\n  // To get a number in [min, max], we scale the random value to the range length.\n  // The length of the range is (max - min + 1) because inclusive.\n  // Then we add min to shift it.\n  // Math.floor gives us an integer.\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}",
    explanation:
      "This formula produces uniformly distributed integers. The term `(max - min + 1)` is the number of possible integers. Multiplying by `Math.random()` gives a number in `[0, rangeLength)`. Floored and then shifted by `min` yields the final integer.",
    hint: "Use Math.random and scaling: `Math.floor(Math.random() * (max - min + 1)) + min`.",
  },
  {
    id: "formatDate",
    type: "implementation",
    topic: "Date",
    title: "Format date as YYYY-MM-DD",
    prompt:
      "Given a `Date` object, return a string in the format `YYYY-MM-DD`. Month and day should be zero‑padded to two digits.\n\nExample:\nInput: new Date(2025, 0, 5) → '2025-01-05'\nInput: new Date(2025, 11, 25) → '2025-12-25'",
    starter: "function formatDate(date) {\n  // your solution here\n}",
    referenceSolution:
      "function formatDate(date) {\n  // Extract the year using .getFullYear()\n  const year = date.getFullYear();\n  // getMonth() returns 0‑11, so add 1 to get 1‑12.\n  // Convert to string and padStart to ensure two digits.\n  const month = String(date.getMonth() + 1).padStart(2, '0');\n  // getDate() returns the day of the month (1‑31).\n  const day = String(date.getDate()).padStart(2, '0');\n  // Return the formatted string using template literals.\n  return `${year}-${month}-${day}`;\n}",
    explanation:
      "We extract year, month (adjusting for zero‑based index), and day. Each numeric component is converted to a string; `padStart(2, '0')` ensures exactly two digits. Finally, we combine them with hyphens.",
    hint: "Use padStart to ensure two digits.",
  },
  {
    id: "impl-factorial",
    type: "implementation",
    topic: "Recursion",
    title: "Factorial",
    prompt:
      "Write a recursive function to compute factorial(n) = n × (n-1) × ... × 1, with factorial(0) = 1.\n\nExample:\nInput: 5 → 120\nInput: 0 → 1",
    starter: "function factorial(n) {\n  // your solution here\n}",
    referenceSolution:
      "function factorial(n) {\n  // Base case: factorial of 0 or 1 is 1.\n  if (n <= 1) return 1;\n  // Recursive case: n! = n * (n-1)!\n  return n * factorial(n - 1);\n}",
    explanation:
      "Recursion is a natural fit for factorial because the problem can be broken down into a smaller subproblem of the same kind. The base case stops recursion when n reaches 0 or 1. Each recursive call multiplies the current number by the factorial of the next smaller number.",
    hint: "Handle base case first (n <= 1), then recursive call.",
  },
  {
    id: "fibonacci-iterative",
    type: "implementation",
    topic: "Recursion",
    title: "Fibonacci (iterative)",
    prompt:
      "Compute the nth Fibonacci number iteratively. The Fibonacci sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n ≥ 2.\n\nExample:\nInput: 6 → 8 (0,1,1,2,3,5,8)\nInput: 0 → 0\nInput: 1 → 1",
    starter: "function fibonacciIterative(n) {\n  // your solution here\n}",
    referenceSolution:
      "function fibonacciIterative(n) {\n  // Handle base cases directly\n  if (n <= 1) return n;\n  // Use two variables to store the last two Fibonacci numbers\n  let a = 0; // F(0)\n  let b = 1; // F(1)\n  // Start loop from 2 up to n (inclusive)\n  for (let i = 2; i <= n; i++) {\n    const next = a + b; // current Fibonacci number\n    a = b;              // shift a to previous b\n    b = next;           // update b to next\n  }\n  return b; // b holds F(n)\n}",
    explanation:
      "Instead of recursion, we use a loop to build the sequence from the bottom up. We keep only the last two values (a and b) because each new Fibonacci requires only those. This runs in O(n) time and O(1) space, avoiding the exponential overhead of naive recursion.",
    hint: "Use a loop updating a and b without storing the whole sequence.",
  },
  {
    id: "binary-search",
    type: "implementation",
    topic: "Algorithms",
    title: "Binary search",
    prompt:
      "Find the index of a target value in a **sorted** array using binary search. Return the index if found, otherwise return -1.\n\nExample:\nInput: arr = [1, 3, 5, 7, 9], target = 5 → Output: 2\nInput: arr = [1, 3, 5, 7, 9], target = 2 → Output: -1",
    starter: "function binarySearch(arr, target) {\n  // return index or -1\n}",
    referenceSolution:
      "function binarySearch(arr, target) {\n  let left = 0;                // left boundary (inclusive)\n  let right = arr.length - 1; // right boundary (inclusive)\n  while (left <= right) {\n    // Calculate mid; use floor to avoid fractional indices\n    const mid = Math.floor((left + right) / 2);\n    // If target is found, return its index\n    if (arr[mid] === target) return mid;\n    // If target is greater, ignore left half\n    if (arr[mid] < target) {\n      left = mid + 1;\n    }\n    // If target is smaller, ignore right half\n    else {\n      right = mid - 1;\n    }\n  }\n  // Target not present\n  return -1;\n}",
    explanation:
      "Binary search repeatedly divides the search interval in half. It requires the array to be sorted. We maintain two pointers, `left` and `right`, representing the current subarray. The middle element is compared with the target. Depending on the comparison, we adjust the boundaries to narrow the search. This yields O(log n) time complexity.",
    hint: "Use two pointers to track the current search range. The while condition is `left <= right`.",
  },
  {
    id: "two-sum",
    type: "implementation",
    topic: "Arrays",
    title: "Two sum",
    prompt:
      "Given an array of integers `nums` and an integer `target`, return the indices of two numbers that add up to `target`. You may assume exactly one solution exists, and you cannot use the same element twice. Return the indices in any order.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9 → Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)\nInput: nums = [3, 2, 4], target = 6 → Output: [1, 2]\nInput: nums = [3, 3], target = 6 → Output: [0, 1]",
    starter: "function twoSum(nums, target) {\n  // your solution here\n}",
    referenceSolution:
      "function twoSum(nums, target) {\n  // Create a Map to store numbers and their indices as we iterate.\n  const map = new Map();\n  // Loop through the array once.\n  for (let i = 0; i < nums.length; i++) {\n    const num = nums[i];\n    const complement = target - num;\n    // If the complement exists in the map, we have found the pair.\n    if (map.has(complement)) {\n      // Return the index of the complement (stored in map) and the current index.\n      return [map.get(complement), i];\n    }\n    // Otherwise, store the current number with its index for future checks.\n    map.set(num, i);\n  }\n  // If no solution (though problem guarantees one), return empty array.\n  return [];\n}",
    explanation:
      "We use a hash map to achieve O(n) time. As we iterate, we check whether the complement (target - current number) has been seen before. If yes, we return the stored index and the current index. If not, we store the current number with its index. This single pass avoids the O(n²) nested loop.",
    hint: "Use a hash map to store values and indices. For each element, check if complement exists in the map.",
  },
  {
    id: "singleNumber",
    type: "implementation",
    topic: "Algorithms",
    title: "Find single number",
    prompt:
      "Given a non‑empty array of integers where every element appears twice except for one, find that single element. Your algorithm should run in O(n) time and use O(1) extra space.\n\nExample:\nInput: [2, 2, 1] → Output: 1\nInput: [4, 1, 2, 1, 2] → Output: 4\nInput: [1] → Output: 1",
    starter: "function singleNumber(nums) {\n  // your solution here\n}",
    referenceSolution:
      "function singleNumber(nums) {\n  // XOR has the following properties:\n  // a ^ a = 0 (a number XOR itself is 0)\n  // a ^ 0 = a\n  // XOR is commutative and associative.\n  // Therefore, XORing all numbers together will cancel out pairs (a ^ a = 0)\n  // and leave the single number (single ^ 0 = single).\n  return nums.reduce((xor, num) => xor ^ num, 0);\n}",
    explanation:
      "This elegant solution uses the bitwise XOR operator. XORing a number with itself yields 0; XORing with 0 leaves the number unchanged. Since all numbers except one appear twice, XORing the entire array will cancel the duplicated numbers and leave the unique one. The reduce function accumulates the XOR result, starting from 0.",
    hint: "Use bitwise XOR. XOR of all elements gives the single number because duplicates cancel out.",
  },
  {
    id: "anagram-check",
    type: "implementation",
    topic: "Strings",
    title: "Check if two strings are anagrams",
    prompt:
      'Write a function that checks if two strings are anagrams of each other. Anagrams use the same letters with the same frequency, ignoring case and spaces. Return true if they are anagrams, false otherwise.\n\nExample:\nInput: ("listen", "silent") → true\nInput: ("Hello", "Olelh") → true (case‑insensitive)\nInput: ("test", "tsetT") → true\nInput: ("hello", "world") → false',
    starter: "function isAnagram(str1, str2) {\n  // your solution here\n}",
    referenceSolution:
      "function isAnagram(str1, str2) {\n  // Helper function to normalize a string: lowercase, remove spaces/non‑letters?\n  // Here we'll only lowercase because spaces are usually not considered anagrams.\n  // But if spaces matter, we can remove them with replace.\n  // For simplicity, we lowercase and then sort characters.\n  const normalize = (s) => s.toLowerCase().split('').sort().join('');\n  return normalize(str1) === normalize(str2);\n}",
    explanation:
      "We normalize each string by converting to lowercase, splitting into an array of characters, sorting the array alphabetically, and joining back into a string. If the normalized strings are equal, they are anagrams. This method is straightforward and works for any characters, but sorting is O(n log n). For large strings, a frequency counter (hash map) would be more efficient.",
    hint: "Sort the characters after converting to lowercase and compare.",
  },
  {
    id: "anagramGroups",
    type: "implementation",
    topic: "Algorithms",
    title: "Group anagrams",
    prompt:
      'Given an array of strings, group anagrams together. Return an array of arrays, where each inner array contains all words that are anagrams of each other. The order of groups and words within groups does not matter.\n\nExample:\nInput: ["eat", "tea", "tan", "ate", "nat", "bat"]\nOutput: [["eat","tea","ate"], ["tan","nat"], ["bat"]]\n\nInput: [""] → [[""]]\nInput: ["a"] → [["a"]]',
    starter: "function groupAnagrams(words) {\n  // your solution here\n}",
    referenceSolution:
      "function groupAnagrams(words) {\n  // Use a Map where the key is the sorted string, and value is the list of original words.\n  const map = new Map();\n  for (const word of words) {\n    // Normalize by sorting characters (lowercase if needed, but we'll assume same case)\n    const key = word.split('').sort().join('');\n    if (!map.has(key)) {\n      map.set(key, []);\n    }\n    map.get(key).push(word);\n  }\n  // Return the grouped words as an array of arrays.\n  return Array.from(map.values());\n}",
    explanation:
      "Two words are anagrams if their sorted character sequences are identical. We iterate over each word, compute its sorted version (the key), and use a map to accumulate words that share that key. Finally, we extract the values of the map as the result. Time complexity is O(n * k log k) where k is the average word length.",
    hint: "Use a hash map with sorted string as key to group anagrams.",
  },
  {
    id: "move-zeroes",
    type: "implementation",
    topic: "Arrays",
    title: "Move zeroes to end",
    prompt:
      "Given an array `nums`, move all zeroes to the end while maintaining the relative order of the non‑zero elements. Do this in‑place (modify the original array) and return it.\n\nExample:\nInput: [0,1,0,3,12] → Output: [1,3,12,0,0]\nInput: [0,0,1] → Output: [1,0,0]",
    starter: "function moveZeroes(nums) {\n  // your solution here\n}",
    referenceSolution:
      "function moveZeroes(nums) {\n  // Pointer for the position to insert the next non-zero element.\n  let insertPos = 0;\n  // First pass: move all non-zero elements to the front.\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] !== 0) {\n      nums[insertPos++] = nums[i];\n    }\n  }\n  // Second pass: fill the remaining positions with zeros.\n  while (insertPos < nums.length) {\n    nums[insertPos++] = 0;\n  }\n  return nums;\n}",
    explanation:
      "We use a two‑pointer approach. The `insertPos` tracks where the next non‑zero should be placed. As we scan, every non‑zero element is copied forward. After that, all positions from `insertPos` to the end are filled with zeros. This modifies the array in‑place, preserving the order of non‑zeros, and runs in O(n) time.",
    hint: "Use a pointer to track where to place non-zero elements, then fill the rest with zeros.",
  },
  {
    id: "find-missing-number",
    type: "implementation",
    topic: "Arrays",
    title: "Find missing number",
    prompt:
      "Given an array containing `n` distinct numbers taken from the range `1, 2, ..., n+1`, find the missing number. The array length is n, so exactly one number is missing.\n\nExample:\nInput: [1, 2, 4, 5] → Output: 3 (since n=4, range 1..5, missing 3)\nInput: [2, 3, 1, 5] → Output: 4\nInput: [1] → Output: 2 (range 1..2, missing 2)",
    starter: "function findMissingNumber(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function findMissingNumber(arr) {\n  // n is the length of the array, but the range is 1..n+1.\n  const n = arr.length;\n  // Sum of numbers from 1 to n+1: (n+1)*(n+2)/2\n  const total = (n + 1) * (n + 2) / 2;\n  // Sum of elements in the given array\n  const sum = arr.reduce((acc, val) => acc + val, 0);\n  // The missing number is the difference\n  return total - sum;\n}",
    explanation:
      "We use the arithmetic series formula to compute the expected sum of the full range. Then we subtract the actual sum of the array. The difference is the missing number. This approach is O(n) time and O(1) extra space.",
    hint: "Calculate expected sum using arithmetic series, then subtract actual sum.",
  },
  {
    id: "rotate-array",
    type: "implementation",
    topic: "Arrays",
    title: "Rotate array",
    prompt:
      "Rotate an array to the right by `k` steps. Return the rotated array (you may create a new array or modify in‑place). For positive `k`, rotate to the right; if `k` is larger than the length, rotate effectively by `k % length`.\n\nExample:\nInput: [1,2,3,4,5], k = 2 → Output: [4,5,1,2,3]\nInput: [1,2,3], k = 4 → (4 % 3 = 1) → Output: [3,1,2]\nInput: [1,2], k = 0 → [1,2]",
    starter: "function rotateArray(arr, k) {\n  // your solution here\n}",
    referenceSolution:
      "function rotateArray(arr, k) {\n  // Handle empty array or no rotation\n  if (arr.length === 0) return arr;\n  const n = arr.length;\n  // Effective rotation steps (reduce unnecessary full cycles)\n  k = k % n;\n  // If k is 0, no change needed\n  if (k === 0) return arr;\n  // Using slice: take last k elements and then first n-k elements, then concatenate.\n  // This creates a new array and does not mutate the original.\n  return [...arr.slice(n - k), ...arr.slice(0, n - k)];\n}",
    explanation:
      "We first reduce `k` modulo the array length to avoid unnecessary full rotations. Then we use array slicing: the last `k` elements become the beginning, and the first `n-k` elements follow. Spreading them into a new array returns the rotated result without mutating the original.",
    hint: "Take last k elements and move them to the front. Use slice and spread.",
  },
  {
    id: "product-except-self",
    type: "implementation",
    topic: "Arrays",
    title: "Product of array except self",
    prompt:
      "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`. You must write an algorithm that runs in O(n) time and without using division.\n\nExample:\nInput: [1,2,3,4] → Output: [24,12,8,6]\nInput: [-1,1,0,-3,3] → Output: [0,0,9,0,0]",
    starter: "function productExceptSelf(nums) {\n  // your solution here\n}",
    referenceSolution:
      "function productExceptSelf(nums) {\n  const n = nums.length;\n  const result = new Array(n).fill(1);\n  // First pass: left products (product of all elements to the left of i)\n  let leftProduct = 1;\n  for (let i = 0; i < n; i++) {\n    result[i] = leftProduct;\n    leftProduct *= nums[i];\n  }\n  // Second pass: right products (multiply by product of all elements to the right)\n  let rightProduct = 1;\n  for (let i = n - 1; i >= 0; i--) {\n    result[i] *= rightProduct;\n    rightProduct *= nums[i];\n  }\n  return result;\n}",
    explanation:
      "We calculate the product of all elements left of each index in the first pass, storing it in `result`. In the second pass (right to left), we multiply each `result[i]` by the product of all elements to the right. This avoids division and achieves O(n) time with O(1) extra space (excluding output).",
    hint: "Use two passes: left-to-right to compute prefix products, then right-to-left to multiply suffix products.",
  },
  {
    id: "debounce",
    type: "implementation",
    topic: "Functions",
    title: "Debounce",
    prompt:
      "Implement a debounce function. `debounce(fn, delay)` returns a new function that, when called repeatedly, will only execute `fn` after the last call has been idle for `delay` milliseconds. If the debounced function is called again before the delay expires, the timer resets.\n\nExample (conceptual):\nconst debounced = debounce(() => console.log('Called'), 300);\ndebounced(); // no immediate log\ndebounced(); // resets timer\n// after 300ms of no calls, 'Called' appears once.",
    starter: "function debounce(fn, delay) {\n  // your solution here\n}",
    referenceSolution:
      "function debounce(fn, delay) {\n  // Variable to hold the timer ID\n  let timerId;\n  // Return a new function that wraps the original\n  return function (...args) {\n    // Clear any existing timer\n    clearTimeout(timerId);\n    // Set a new timer that will call fn after delay\n    timerId = setTimeout(() => {\n      // Call fn with the correct `this` context and arguments\n      fn.apply(this, args);\n    }, delay);\n  };\n}",
    explanation:
      "Each time the debounced function is invoked, we clear the previous timer and start a new one. This ensures that `fn` is only executed after the last call and a quiet period of `delay` milliseconds. The timer ID is stored in a closure to persist between function calls. We use `apply` to preserve the `this` binding and pass all arguments.",
    hint: "You need a timer variable that survives between calls. Use `clearTimeout` and `setTimeout`.",
  },
  {
    id: "throttle",
    type: "implementation",
    topic: "Functions",
    title: "Throttle function calls",
    prompt:
      "Implement a throttle function. `throttle(fn, delay)` returns a new function that, when called repeatedly, will execute `fn` at most once per `delay` milliseconds. The first call is executed immediately; subsequent calls within the delay window are ignored until the window passes.\n\nExample:\nconst throttled = throttle(() => console.log('Called'), 1000);\nthrottled(); // logs immediately\nthrottled(); // ignored (within 1s)\n// after 1s, another call would log again.",
    starter: "function throttle(fn, delay) {\n  // your solution here\n}",
    referenceSolution:
      "function throttle(fn, delay) {\n  // Track the timestamp of the last execution\n  let lastCall = 0;\n  return function (...args) {\n    const now = Date.now();\n    // If enough time has passed since the last call\n    if (now - lastCall >= delay) {\n      lastCall = now;        // update last call time\n      return fn.apply(this, args); // execute function\n    }\n    // Otherwise, do nothing (ignore this call)\n  };\n}",
    explanation:
      "Throttling ensures a function is executed at most once every `delay` milliseconds. We store the timestamp of the last execution. When the throttled function is called, we compare the current time with the last call time. If the difference is at least `delay`, we execute `fn` and update the timestamp. Otherwise, the call is ignored. This is useful for scroll or resize event handlers.",
    hint: "Use timestamps to control execution frequency. Store the last execution time in a closure.",
  },
  {
    id: "debounce-advanced",
    type: "implementation",
    topic: "Functions",
    title: "Debounce with immediate option",
    prompt:
      "Implement a debounce function with an `immediate` option. When `immediate` is `true`, the function `fn` is executed immediately on the first call, and then subsequent calls are ignored until the delay has passed. After the delay, the next call will trigger again immediately. Standard debounce (immediate = false) behaves normally.\n\nExample:\nconst debounced = debounce(() => console.log('Called'), 300, true);\ndebounced(); // logs 'Called' immediately\ndebounced(); // ignored\n// after 300ms, another call would log again immediately.",
    starter:
      "function debounce(fn, delay, immediate = false) {\n  // your solution here\n}",
    referenceSolution:
      "function debounce(fn, delay, immediate = false) {\n  let timerId;\n  // For immediate mode, we need to track if we've already called in the current cooldown\n  let lastCallTime = 0;\n  return function (...args) {\n    const now = Date.now();\n    // If immediate mode is on AND we are not in a cooldown period\n    if (immediate && !lastCallTime) {\n      fn.apply(this, args);\n      lastCallTime = now;\n    } else {\n      // Standard debounce: clear previous timer and start a new one\n      clearTimeout(timerId);\n      timerId = setTimeout(() => {\n        if (!immediate) fn.apply(this, args);\n        // Reset lastCallTime after delay so next call can be immediate again\n        lastCallTime = 0;\n      }, delay);\n    }\n  };\n}",
    explanation:
      "In immediate mode, we execute `fn` right away on the first call and set `lastCallTime`. Then any calls before the delay passes are ignored. After the delay, `lastCallTime` is reset, allowing the next call to execute immediately again. In non‑immediate mode, we behave like a regular debounce: each call resets the timer, and `fn` runs only after the last call has been quiet for `delay` ms.",
    hint: "Track the last execution time to handle the immediate case. Use `lastCallTime` to know if cooldown is active.",
  },
  {
    id: "memoize",
    type: "implementation",
    topic: "Functions",
    title: "Memoize a function",
    prompt:
      "Implement a `memoize` function that caches the results of a pure function based on its arguments. If the same arguments are provided again, return the cached result instead of recomputing.\n\nExample:\nconst slowSquare = (n) => { console.log('computing'); return n * n; };\nconst memoizedSquare = memoize(slowSquare);\nmemoizedSquare(5); // logs 'computing', returns 25\nmemoizedSquare(5); // returns 25 (no log)\nmemoizedSquare(6); // logs 'computing', returns 36",
    starter: "function memoize(fn) {\n  // return memoized version\n}",
    referenceSolution:
      "function memoize(fn) {\n  // Use a Map to store cached results.\n  const cache = new Map();\n  return function (...args) {\n    // Create a cache key from the arguments (stringify is simple but limited).\n    // For more complex arguments, a custom resolver would be better.\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      // Return cached result\n      return cache.get(key);\n    }\n    // Compute the result, store it, and return it\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}",
    explanation:
      "We wrap the original function with a closure that includes a cache (Map). When the returned function is called, we serialize the arguments into a string key. If the key exists, we return the stored result. Otherwise, we call the original function with the correct `this` and arguments, store the result, and return it. This trades memory for speed, which is beneficial for expensive pure functions.",
    hint: "Use a Map or object to store cached results. Stringify arguments to create a key.",
  },
  {
    id: "memoize-advanced",
    type: "implementation",
    topic: "Functions",
    title: "Memoize with custom resolver",
    prompt:
      "Implement an advanced `memoize` function that accepts a `resolver` function to generate the cache key from the arguments. If no resolver is provided, default to `JSON.stringify`.\n\nExample:\nconst resolver = (...args) => args[0].id;\nconst getItem = memoizeAdvanced(fetchItem, resolver);\ngetItem({id: 1}); // fetches\ngetItem({id: 1}); // uses cache (same id)\ngetItem({id: 2}); // fetches",
    starter:
      "function memoizeAdvanced(fn, resolver) {\n  // your solution here\n}",
    referenceSolution:
      "function memoizeAdvanced(fn, resolver) {\n  const cache = new Map();\n  return function (...args) {\n    // Use the resolver if provided; otherwise fallback to JSON.stringify\n    const key = resolver ? resolver(...args) : JSON.stringify(args);\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}",
    explanation:
      "This improves upon basic memoization by allowing a custom function to determine the cache key. This is essential when arguments are objects that may have different references but represent the same logical entity (e.g., using an `id` field). The resolver is called with the same arguments, and its return value becomes the key. If no resolver is given, we use `JSON.stringify` as a default (which works for simple primitives).",
    hint: "Pass a resolver to generate the key; otherwise default to stringified arguments.",
  },
  {
    id: "curry",
    type: "implementation",
    topic: "Functions",
    title: "Curry a function",
    prompt:
      "Write a `curry` function that transforms a function that takes multiple arguments into a sequence of functions that each take a single argument (or partial arguments). The curried function can be called with fewer arguments than the original arity, and it returns a new function that expects the remaining arguments.\n\nExample:\nfunction add(a, b, c) { return a + b + c; }\nconst curriedAdd = curry(add);\ncurriedAdd(1)(2)(3); // 6\ncurriedAdd(1, 2)(3); // 6\ncurriedAdd(1, 2, 3); // 6",
    starter: "function curry(fn) {\n  // return curried version\n}",
    referenceSolution:
      "function curry(fn) {\n  // Return a curried function that collects arguments\n  return function curried(...args) {\n    // If we have received enough arguments (>= fn.length), call the original function\n    if (args.length >= fn.length) {\n      return fn.apply(this, args);\n    }\n    // Otherwise return a function that expects the rest\n    return function (...moreArgs) {\n      // Concatenate previous args with new ones and recurse\n      return curried.apply(this, [...args, ...moreArgs]);\n    };\n  };\n}",
    explanation:
      "Currying transforms a function so that it can be called with a subset of arguments and returns a new function waiting for the rest. We check if the total arguments received (`args.length`) is at least the function's arity (`fn.length`). If yes, we call `fn`. If not, we return a new function that, when called, concatenates the new arguments with the previous ones and applies `curried` again (recursively).",
    hint: "Use fn.length to check the expected number of parameters. Keep collecting arguments until enough are provided.",
  },
  {
    id: "compose-functions",
    type: "implementation",
    topic: "Functions",
    title: "Function composition (compose)",
    prompt:
      "Implement `compose` that accepts any number of functions and returns a new function. The new function applies the functions from right to left: first the rightmost function, then the next, and so on, passing the result of each to the next.\n\nExample:\nconst add1 = (x) => x + 1;\nconst double = (x) => x * 2;\nconst composed = compose(double, add1);\ncomposed(5); // double(add1(5)) = double(6) = 12",
    starter: "function compose(...fns) {\n  // your solution here\n}",
    referenceSolution:
      "function compose(...fns) {\n  // Return a function that takes an initial value\n  return function (x) {\n    // reduceRight applies functions from rightmost to leftmost\n    // The initial accumulator is x\n    return fns.reduceRight((acc, fn) => fn(acc), x);\n  };\n}",
    explanation:
      "Function composition is a fundamental concept in functional programming. `compose(f, g)(x)` is equivalent to `f(g(x))`. Using `reduceRight` on the array of functions, we start with the input value `x` and apply each function from right to left, passing the result forward. This is the opposite of `pipe` (left to right).",
    hint: "Use reduceRight to apply functions from rightmost to leftmost.",
  },
  {
    id: "pipe-functions",
    type: "implementation",
    topic: "Functions",
    title: "Function piping (pipe)",
    prompt:
      "Implement `pipe` that accepts any number of functions and returns a new function. The new function applies the functions from left to right: first the leftmost function, then the next, passing the result of each to the next. This is the opposite of `compose`.\n\nExample:\nconst add1 = (x) => x + 1;\nconst double = (x) => x * 2;\nconst piped = pipe(add1, double);\npiped(5); // double(add1(5)) = 12 (same as compose in this order, but generic)\n// Actually pipe(first, second)(x) = second(first(x))",
    starter: "function pipe(...fns) {\n  // your solution here\n}",
    referenceSolution:
      "function pipe(...fns) {\n  // Return a function that takes an initial value\n  return function (x) {\n    // reduce applies functions from left to right\n    return fns.reduce((acc, fn) => fn(acc), x);\n  };\n}",
    explanation:
      "Pipe is the left‑to‑right version of compose. It's often more readable for data transformation pipelines. Using `reduce`, we start with the input value `x` and sequentially apply each function, passing the result to the next. This is equivalent to `fn3(fn2(fn1(x)))` when using `pipe(fn1, fn2, fn3)(x)`.",
    hint: "Reduce left to right (standard reduce).",
  },
  {
    id: "bind-polyfill",
    type: "implementation",
    topic: "Functions",
    title: "Implement Function.prototype.bind",
    prompt:
      "Create a custom `myBind` function that mimics `Function.prototype.bind`. It should return a new function that, when called, has its `this` keyword set to the provided context, with specified initial arguments (partial application).\n\nExample:\nfunction greet(greeting, punctuation) {\n  return greeting + ' ' + this.name + punctuation;\n}\nconst bound = myBind(greet, {name: 'Alice'}, 'Hello');\nbound('!'); // 'Hello Alice!'",
    starter:
      "function myBind(fn, context, ...boundArgs) {\n  // return bound function\n}",
    referenceSolution:
      "function myBind(fn, context, ...boundArgs) {\n  // Return a new function that captures the bound arguments\n  return function (...args) {\n    // Combine the bound arguments with the ones provided at call time\n    // Use apply to set the context and pass the combined arguments\n    return fn.apply(context, [...boundArgs, ...args]);\n  };\n}",
    explanation:
      "`bind` partially applies a function and fixes its `this` context. Our implementation returns a function that, when invoked, concatenates the pre‑bound arguments (`boundArgs`) with any additional arguments (`args`) and calls the original `fn` with `apply` using the given `context` and the combined arguments. This covers the basic behavior of bind.",
    hint: "Use apply to set the context and combine arguments.",
  },
  {
    id: "call-polyfill",
    type: "implementation",
    topic: "Functions",
    title: "Implement Function.prototype.call",
    prompt:
      "Create a custom `myCall` function that mimics `Function.prototype.call`. It should invoke a function with a specified `this` context and individual arguments.\n\nExample:\nfunction introduce(age, city) {\n  return `${this.name} is ${age} and lives in ${city}`;\n}\nconst person = {name: 'Bob'};\nconsole.log(myCall(introduce, person, 25, 'NYC')); // 'Bob is 25 and lives in NYC'",
    starter:
      "function myCall(fn, context, ...args) {\n  // your solution here\n}",
    referenceSolution:
      "function myCall(fn, context, ...args) {\n  // Use a unique symbol to avoid property name collisions\n  const fnKey = Symbol();\n  // Temporarily assign the function to the context object\n  context[fnKey] = fn;\n  // Invoke the function with the provided arguments\n  const result = context[fnKey](...args);\n  // Remove the temporary property\n  delete context[fnKey];\n  // Return the result\n  return result;\n}",
    explanation:
      "We need to call `fn` with `context` as its `this`. One way is to attach `fn` as a method of `context`, call it, and then delete the method. Using a Symbol ensures we don't accidentally overwrite an existing property. This simulates the behavior of `call`.",
    hint: "Use a unique property (Symbol) to avoid collisions, assign the function to the context, call it, then delete.",
  },
  {
    id: "apply-polyfill",
    type: "implementation",
    topic: "Functions",
    title: "Implement Function.prototype.apply",
    prompt:
      "Create a custom `myApply` function that mimics `Function.prototype.apply`. It should invoke a function with a specified `this` context and an array of arguments.\n\nExample:\nfunction sum(a, b, c) { return this.multiplier * (a + b + c); }\nconst ctx = {multiplier: 2};\nconsole.log(myApply(sum, ctx, [1, 2, 3])); // 2 * (1+2+3) = 12",
    starter:
      "function myApply(fn, context, args) {\n  // your solution here\n}",
    referenceSolution:
      "function myApply(fn, context, args) {\n  // Similar to myCall, but args is an array (or array-like).\n  // We spread the array into the function call.\n  const fnKey = Symbol();\n  context[fnKey] = fn;\n  // Spread args when calling\n  const result = context[fnKey](...args);\n  delete context[fnKey];\n  return result;\n}",
    explanation:
      "`apply` is identical to `call` except that it takes an array (or array‑like object) of arguments instead of individual parameters. We use the same technique of temporarily assigning the function to the context object, then call it using spread syntax `...args` to pass the array elements as separate arguments.",
    hint: "Similar to call, but spread the array of arguments.",
  },
  {
    id: "hoist-function-factory",
    type: "implementation",
    topic: "Closures",
    title: "Function factory with hoisting (closure in loop)",
    prompt:
      "Create a function `createFunctions(count)` that returns an array of functions. Each function, when called, should return its creation index (i.e., the i‑th function returns i). Be careful with how you capture the loop variable.\n\nExample:\nconst funcs = createFunctions(3);\nfuncs[0](); // 0\nfuncs[1](); // 1\nfuncs[2](); // 2",
    starter:
      "function createFunctions(count) {\n  // return an array of functions\n}",
    referenceSolution:
      "function createFunctions(count) {\n  const functions = [];\n  // Use 'let' in the loop to create a new binding per iteration\n  for (let i = 0; i < count; i++) {\n    // Each function closes over its own 'i' because let creates a new variable each iteration\n    functions.push(() => i);\n  }\n  return functions;\n\n  // If you used 'var', all functions would share the same 'i' and return count (the final value).\n  // With 'let', each iteration gets its own lexical environment.\n}",
    explanation:
      "This question tests understanding of closures and block scoping. Using `let` inside a `for` loop creates a new `i` binding for each iteration. Each returned function captures that specific binding, so it returns the correct index. If you used `var`, there would be only one `i` shared across iterations, and all functions would return the final value of `i` (which is `count`).",
    hint: "Avoid var in the loop – use let to create a fresh binding for each iteration.",
  },
  {
    id: "deep-clone",
    type: "implementation",
    topic: "Objects",
    title: "Deep clone an object",
    prompt:
      "Create a deep copy of an object without references. The clone should have no shared references with the original – all nested objects and arrays should be recursively copied. Handle special cases like Date objects.\n\nExample:\nconst original = { a: 1, b: { c: 2 }, d: [3, 4] };\nconst clone = deepClone(original);\nclone.b.c = 99;\nconsole.log(original.b.c); // 2 (unchanged, because deep copy)\n\nInput: Date object → new Date(original) should be returned.\nInput: Array → recursively map each element.\nInput: null or primitive → return as is.",
    starter: "function deepClone(obj) {\n  // your solution here\n}",
    referenceSolution:
      "function deepClone(obj) {\n  // Handle null, undefined, and primitives (strings, numbers, booleans)\n  if (obj === null || typeof obj !== 'object') return obj;\n  \n  // Handle Date objects: create a new Date with the same timestamp\n  if (obj instanceof Date) return new Date(obj);\n  \n  // Handle Arrays: map each element recursively\n  if (Array.isArray(obj)) return obj.map(item => deepClone(item));\n  \n  // Handle plain objects: create a new object and copy all enumerable properties\n  const clonedObj = {};\n  for (const key in obj) {\n    // Only copy own properties (ignore prototype chain)\n    if (obj.hasOwnProperty(key)) {\n      clonedObj[key] = deepClone(obj[key]);\n    }\n  }\n  return clonedObj;\n}",
    explanation:
      "Deep cloning creates a completely independent copy. We first check for primitives and null – they are immutable, so return as is. Date objects need special handling because they are objects but we want a new Date instance. Arrays are iterated with `map` that calls deepClone on each element. Plain objects are handled by iterating over own enumerable properties and recursively cloning each value. This approach avoids circular reference issues (not handled here, but can be added with a cache Map).",
    hint: "Check for primitives first, then handle Date, Array, and plain objects recursively.",
  },
  {
    id: "deepEqual",
    type: "implementation",
    topic: "Objects",
    title: "Deep equality check",
    prompt:
      "Write a function that deeply compares two values for equality. It should return `true` if they are deeply equal, `false` otherwise. Handle primitives, arrays, objects, and nested structures.\n\nExample:\ndeepEqual(1, 1) → true\ndeepEqual([1,2], [1,2]) → true\ndeepEqual({a:1, b:{c:2}}, {a:1, b:{c:2}}) → true\ndeepEqual({a:1}, {a:2}) → false\n\nInput: null vs undefined → false\nInput: Date objects – compare by timestamp.",
    starter: "function deepEqual(a, b) {\n  // your solution here\n}",
    referenceSolution:
      "function deepEqual(a, b) {\n  // 1. Strict equality handles primitives and same reference\n  if (a === b) return true;\n  \n  // 2. If either is null or not an object, they are not equal (because a !== b already)\n  if (a == null || b == null) return false;\n  if (typeof a !== 'object' || typeof b !== 'object') return false;\n  \n  // 3. Handle Date objects\n  if (a instanceof Date && b instanceof Date) {\n    return a.getTime() === b.getTime();\n  }\n  \n  // 4. Handle Arrays\n  if (Array.isArray(a) && Array.isArray(b)) {\n    if (a.length !== b.length) return false;\n    for (let i = 0; i < a.length; i++) {\n      if (!deepEqual(a[i], b[i])) return false;\n    }\n    return true;\n  }\n  \n  // 5. Handle plain objects\n  const keysA = Object.keys(a);\n  const keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  for (const key of keysA) {\n    if (!keysB.includes(key)) return false;\n    if (!deepEqual(a[key], b[key])) return false;\n  }\n  return true;\n}",
    explanation:
      "Deep equality compares value by value, recursively. We first check reference equality. Then we handle null and non‑object cases. For objects, we treat Dates specially (compare timestamps). For arrays, we compare lengths and recursively compare each element. For plain objects, we compare key sets and recursively compare values. This is a basic implementation that doesn't handle circular references (would cause infinite recursion).",
    hint: "Check reference equality first, then handle primitives, then recursively compare objects/arrays.",
  },
  {
    id: "shallowEqual",
    type: "implementation",
    topic: "Objects",
    title: "Shallow equality check",
    prompt:
      "Implement a function that performs shallow comparison of two objects (or arrays). It should return `true` if they have the same own enumerable properties and the values are strictly equal (`===`). This is similar to React's `shallowEqual` or `PureComponent`.\n\nExample:\nconst obj1 = {a: 1, b: 2};\nconst obj2 = {a: 1, b: 2};\nshallowEqual(obj1, obj2) → true\n\nconst obj3 = {a: 1, b: {c: 2}};\nconst obj4 = {a: 1, b: {c: 2}};\nshallowEqual(obj3, obj4) → false (because b is a different object reference)",
    starter: "function shallowEqual(objA, objB) {\n  // your solution here\n}",
    referenceSolution:
      "function shallowEqual(objA, objB) {\n  // Same reference -> equal\n  if (objA === objB) return true;\n  // If either is null/undefined or not an object, they are not equal\n  if (!objA || !objB) return false;\n  if (typeof objA !== 'object' || typeof objB !== 'object') return false;\n  \n  // Get own property keys\n  const keysA = Object.keys(objA);\n  const keysB = Object.keys(objB);\n  if (keysA.length !== keysB.length) return false;\n  \n  // Check each key: it must exist in B and values must be strictly equal\n  for (const key of keysA) {\n    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;\n    if (objA[key] !== objB[key]) return false;\n  }\n  return true;\n}",
    explanation:
      "Shallow equality only compares top‑level properties using `===`. It does not recurse into nested objects. This is efficient and used in React to decide if a component should re‑render. We compare the length of own property keys, then verify that each key exists in the other object and the values are strictly equal. Primitive values are compared by value, but object references are compared by reference.",
    hint: "Check that both have the same keys and values match using ===.",
  },
  {
    id: "getNestedValue",
    type: "implementation",
    topic: "Objects",
    title: "Safely get nested property",
    prompt:
      "Write a function that retrieves a value from a nested object using a dot‑separated path. Return `undefined` (or a default value) if any part of the path is missing. Avoid throwing errors.\n\nExample:\nconst obj = { a: { b: { c: 42 } } };\nget(obj, 'a.b.c') → 42\nget(obj, 'a.b.d') → undefined\nget(obj, 'a.x.c') → undefined\nget(obj, 'a.b.c', 'default') → 42\nget(obj, 'a.x.c', 'default') → 'default'",
    starter:
      "function get(obj, path, defaultValue) {\n  // your solution here\n}",
    referenceSolution:
      "function get(obj, path, defaultValue = undefined) {\n  // Convert path to array: either split by '.' or accept array directly\n  const keys = Array.isArray(path) ? path : path.split('.');\n  let current = obj;\n  for (const key of keys) {\n    // If current is null/undefined or not an object, we cannot go deeper\n    if (current == null || typeof current !== 'object') {\n      return defaultValue;\n    }\n    current = current[key];\n  }\n  // If we successfully traversed, return current, otherwise defaultValue\n  return current !== undefined ? current : defaultValue;\n}",
    explanation:
      "We first normalize the path into an array of keys. Then we loop over each key, checking at each level if the current value is an object (non‑null) before accessing the next key. If any level fails, we return the default value. If we complete the loop, we return the found value (which might be undefined). This safely handles nested property access without try/catch.",
    hint: "Use split('.') and a loop, checking for null/undefined at each step.",
  },
  {
    id: "object-assign",
    type: "implementation",
    topic: "Objects",
    title: "Implement Object.assign",
    prompt:
      "Implement your own version of `Object.assign(target, ...sources)`. It copies all enumerable own properties from source objects to the target object and returns the target. Later sources override earlier ones.\n\nExample:\nconst target = { a: 1 };\nconst source1 = { b: 2, c: 3 };\nconst source2 = { c: 4 };\nobjectAssign(target, source1, source2);\nconsole.log(target); // { a: 1, b: 2, c: 4 }",
    starter:
      "function objectAssign(target, ...sources) {\n  // your solution here\n}",
    referenceSolution:
      "function objectAssign(target, ...sources) {\n  // If target is null or undefined, throw (simulating native behavior)\n  if (target == null) {\n    throw new TypeError('Cannot convert undefined or null to object');\n  }\n  // Coerce target to an object\n  const to = Object(target);\n  \n  for (const source of sources) {\n    if (source == null) continue; // skip null/undefined sources\n    // Get all enumerable own properties from source\n    const keys = Object.keys(source);\n    for (const key of keys) {\n      to[key] = source[key];\n    }\n  }\n  return to;\n}",
    explanation:
      "`Object.assign` copies properties from sources to target. We first ensure target is an object (coercion). For each source, we skip null/undefined, then iterate over its enumerable own property keys (using `Object.keys`) and assign each value to the target. Later sources overwrite earlier ones because we assign in order. This implementation does not handle symbol keys (native `Object.assign` does, but for simplicity we omit).",
    hint: "Iterate through sources and copy their enumerable own properties.",
  },
  {
    id: "pick-properties",
    type: "implementation",
    topic: "Objects",
    title: "Pick properties",
    prompt:
      "Create a new object by picking specific properties from an object. The function `pick(obj, keys)` returns a new object containing only the keys specified in the `keys` array (if they exist in `obj`).\n\nExample:\nconst obj = { a: 1, b: 2, c: 3 };\npick(obj, ['a', 'c']) → { a: 1, c: 3 }\npick(obj, ['d']) → {}",
    starter: "function pick(obj, keys) {\n  // your solution here\n}",
    referenceSolution:
      "function pick(obj, keys) {\n  // Initialize an empty object\n  const result = {};\n  // Iterate over the keys array\n  for (const key of keys) {\n    // If the key exists in the source object (using 'in' or hasOwnProperty)\n    if (key in obj) {\n      result[key] = obj[key];\n    }\n  }\n  return result;\n  // Alternative using reduce:\n  // return keys.reduce((acc, key) => {\n  //   if (key in obj) acc[key] = obj[key];\n  //   return acc;\n  // }, {});\n}",
    explanation:
      "We create a new object and iterate over the list of keys. For each key, if it exists in the original object (using `key in obj` to check own or inherited properties, or `hasOwnProperty` for own only), we copy the value. This is a common utility for extracting a subset of properties.",
    hint: "Use reduce to build a new object, copying only the keys that exist in the source.",
  },
  {
    id: "omit-properties",
    type: "implementation",
    topic: "Objects",
    title: "Omit properties",
    prompt:
      "Create a new object by omitting specific properties from an object. The function `omit(obj, keys)` returns a new object that includes all properties of `obj` except those listed in the `keys` array.\n\nExample:\nconst obj = { a: 1, b: 2, c: 3 };\nomit(obj, ['b']) → { a: 1, c: 3 }\nomit(obj, ['a', 'c']) → { b: 2 }",
    starter: "function omit(obj, keys) {\n  // your solution here\n}",
    referenceSolution:
      "function omit(obj, keys) {\n  // Create a shallow copy of obj using spread\n  const result = { ...obj };\n  // Delete each key from the copy\n  for (const key of keys) {\n    delete result[key];\n  }\n  return result;\n  \n  // Alternative without mutating a copy: use reduce\n  // return Object.keys(obj).reduce((acc, key) => {\n  //   if (!keys.includes(key)) acc[key] = obj[key];\n  //   return acc;\n  // }, {});\n}",
    explanation:
      "Omit is the inverse of pick. We create a shallow copy of the original object (to avoid mutation) and then delete the specified keys from the copy. Alternatively, we can build a new object by iterating over the original's keys and including only those not in the omit list. The first approach is simpler but uses `delete` (which is fine for this utility).",
    hint: "Use spread to copy, then delete unwanted properties.",
  },
  {
    id: "invert-object",
    type: "implementation",
    topic: "Objects",
    title: "Invert object",
    prompt:
      "Swap keys and values of an object. The function `invertObject(obj)` returns a new object where the keys are the original values and the values are the original keys. Assume all original values are strings or numbers that can be used as keys. If duplicate values exist, the later key will overwrite the earlier one.\n\nExample:\nconst obj = { a: 'apple', b: 'banana', c: 'apple' };\ninvertObject(obj) → { apple: 'c', banana: 'b' } (last duplicate wins)\n\nInput: { name: 'John', age: 30 } → { John: 'name', 30: 'age' }",
    starter: "function invertObject(obj) {\n  // your solution here\n}",
    referenceSolution:
      "function invertObject(obj) {\n  const result = {};\n  // Use Object.entries to get [key, value] pairs\n  for (const [key, value] of Object.entries(obj)) {\n    // Set the value as the key, and the original key as the value\n    result[value] = key;\n  }\n  return result;\n}",
    explanation:
      "Inverting an object swaps keys and values. We iterate over each entry of the original object, and for each, we assign `result[value] = key`. If multiple entries have the same value, the last assigned key will overwrite previous ones. This is a simple utility useful for lookups.",
    hint: "Use Object.entries and build a new object with value as key.",
  },
  {
    id: "deep-merge",
    type: "implementation",
    topic: "Objects",
    title: "Deep merge objects",
    prompt:
      "Recursively merge two or more objects. If a key exists in both objects and both values are plain objects, merge them recursively. Otherwise, the value from the later object overwrites the earlier one. Return a new object (no mutation of sources).\n\nExample:\nconst obj1 = { a: 1, b: { x: 10, y: 20 } };\nconst obj2 = { b: { y: 30, z: 40 }, c: 3 };\ndeepMerge(obj1, obj2);\n// → { a: 1, b: { x: 10, y: 30, z: 40 }, c: 3 }",
    starter:
      "function deepMerge(target, source) {\n  // your solution here\n}\n\n// Helper to detect plain object\nfunction isPlainObject(item) {\n  return item && typeof item === 'object' && !Array.isArray(item);\n}",
    referenceSolution:
      "function deepMerge(target, source) {\n  // Create a shallow copy of target to avoid mutating it\n  const output = { ...target };\n  for (const key in source) {\n    if (source.hasOwnProperty(key)) {\n      const targetVal = output[key];\n      const sourceVal = source[key];\n      // If both values are plain objects, merge recursively\n      if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {\n        output[key] = deepMerge(targetVal, sourceVal);\n      } else {\n        // Otherwise, overwrite with source value\n        output[key] = sourceVal;\n      }\n    }\n  }\n  return output;\n}\n\nfunction isPlainObject(item) {\n  return item && typeof item === 'object' && !Array.isArray(item);\n}",
    explanation:
      "Deep merge combines objects recursively. We start with a shallow copy of the target. For each key in the source, if both the target and source values are plain objects (not arrays or other built‑ins), we recursively merge them. Otherwise, we assign the source value directly (overwriting). This creates a new object without mutating the original inputs. This implementation does not handle arrays specially (they are overwritten, not merged).",
    hint: "Check if both values are plain objects before recursing.",
  },
  {
    id: "event-emitter",
    type: "implementation",
    topic: "Objects",
    title: "Simple event emitter",
    prompt:
      "Create an `EventEmitter` class with `on(event, callback)`, `off(event, callback)`, and `emit(event, ...args)` methods. It should allow multiple callbacks per event, and `off` should remove a specific callback.\n\nExample:\nconst emitter = new EventEmitter();\nconst cb = (data) => console.log(data);\nemitter.on('click', cb);\nemitter.emit('click', 'Hello'); // logs 'Hello'\nemitter.off('click', cb);\nemitter.emit('click', 'World'); // nothing",
    starter:
      "class EventEmitter {\n  constructor() {\n    // initialize events object\n  }\n  on(event, callback) {}\n  off(event, callback) {}\n  emit(event, ...args) {}\n}",
    referenceSolution:
      "class EventEmitter {\n  constructor() {\n    // Store events as key (event name) -> array of callbacks\n    this.events = {};\n  }\n\n  on(event, callback) {\n    // If event doesn't exist, create an empty array\n    if (!this.events[event]) {\n      this.events[event] = [];\n    }\n    // Add the callback to the array\n    this.events[event].push(callback);\n    // Return a function to unsubscribe (optional convenience)\n    return () => this.off(event, callback);\n  }\n\n  off(event, callback) {\n    if (!this.events[event]) return;\n    // Filter out the callback to remove it\n    this.events[event] = this.events[event].filter(cb => cb !== callback);\n    // Optional: if array becomes empty, delete the key\n    if (this.events[event].length === 0) delete this.events[event];\n  }\n\n  emit(event, ...args) {\n    if (!this.events[event]) return;\n    // Call each callback with the provided arguments\n    for (const callback of this.events[event]) {\n      callback(...args);\n    }\n  }\n}",
    explanation:
      "The EventEmitter pattern is fundamental for pub‑sub and event‑driven programming. The `events` object maps event names to arrays of listener functions. `on` adds a listener, `emit` invokes all listeners for that event with the given arguments, and `off` removes a specific listener (by reference equality). This implementation is simple and covers the core functionality.",
    hint: "Use an object to map event names to arrays of callbacks.",
  },
  {
    id: "promise-all",
    type: "implementation",
    topic: "Promises",
    title: "Implement Promise.all",
    prompt:
      "Implement `promiseAll(promises)` that behaves like `Promise.all`. It takes an iterable of promises and returns a single Promise that resolves to an array of results when all input promises resolve, or rejects immediately with the reason of the first promise that rejects. The order of results must match the order of the input promises.\n\nExample:\nconst p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\npromiseAll([p1, p2, p3]).then(results => console.log(results)); // [1,2,3]\n\nconst p4 = Promise.reject('error');\npromiseAll([p1, p4, p3]).catch(err => console.log(err)); // 'error'",
    starter: "function promiseAll(promises) {\n  // your solution here\n}",
    referenceSolution:
      "function promiseAll(promises) {\n  // Return a new Promise that we control\n  return new Promise((resolve, reject) => {\n    const results = [];          // store resolved values in order\n    let completed = 0;           // count how many have resolved\n    const total = promises.length;\n    \n    // If no promises, resolve immediately with empty array\n    if (total === 0) return resolve(results);\n    \n    // Iterate over each promise\n    for (let i = 0; i < total; i++) {\n      // Use Promise.resolve to handle non-promise values as well\n      Promise.resolve(promises[i])\n        .then(value => {\n          results[i] = value;    // store in correct index\n          completed++;\n          if (completed === total) {\n            resolve(results);    // all promises resolved\n          }\n        })\n        .catch(reject);          // any rejection rejects the whole promise\n    }\n  });\n}",
    explanation:
      "We create a new promise that manually tracks resolution. We store results in an array at the same index as the input. A counter `completed` increments each time a promise resolves. When `completed` equals the total number of promises, we resolve with the results array. If any promise rejects, we immediately reject the outer promise. This matches the behavior of `Promise.all`.",
    hint: "Use a counter to know when all promises have settled. Store results in order.",
  },
  {
    id: "promise-race",
    type: "implementation",
    topic: "Promises",
    title: "Implement Promise.race",
    prompt:
      "Implement `promiseRace(promises)` that returns a promise that resolves or rejects as soon as the first input promise settles (either resolves or rejects). The result/reason is the one from that first settled promise.\n\nExample:\nconst p1 = new Promise(resolve => setTimeout(() => resolve('slow'), 100));\nconst p2 = new Promise(resolve => setTimeout(() => resolve('fast'), 50));\npromiseRace([p1, p2]).then(result => console.log(result)); // 'fast'\n\nconst p3 = Promise.reject('error');\npromiseRace([p1, p3]).catch(err => console.log(err)); // 'error' (rejects immediately)",
    starter: "function promiseRace(promises) {\n  // your solution here\n}",
    referenceSolution:
      "function promiseRace(promises) {\n  // Return a new promise\n  return new Promise((resolve, reject) => {\n    // Iterate over all promises\n    for (const promise of promises) {\n      // Attach then/catch to each; the first to settle triggers resolve/reject\n      Promise.resolve(promise).then(resolve).catch(reject);\n    }\n  });\n}",
    explanation:
      "`Promise.race` returns a promise that settles (resolves or rejects) with the result of the first promise in the iterable that settles. We loop through each input, convert non‑promises via `Promise.resolve`, and attach `then(resolve).catch(reject)`. The first one to call either `resolve` or `reject` will settle the outer promise. Subsequent calls have no effect.",
    hint: "Don't wait for all promises – just the first one. Attach resolve/reject to each promise.",
  },
  {
    id: "promise-any",
    type: "implementation",
    topic: "Promises",
    title: "Implement Promise.any",
    prompt:
      "Implement `promiseAny(promises)` that returns a promise that resolves as soon as any of the input promises resolves. If all promises reject, it rejects with an `AggregateError` containing all rejection reasons.\n\nExample:\nconst p1 = Promise.reject('error1');\nconst p2 = Promise.resolve('success');\nconst p3 = Promise.reject('error2');\npromiseAny([p1, p2, p3]).then(result => console.log(result)); // 'success'\n\nconst allReject = [Promise.reject('a'), Promise.reject('b')];\npromiseAny(allReject).catch(err => console.log(err.errors)); // ['a', 'b']",
    starter: "function promiseAny(promises) {\n  // your solution here\n}",
    referenceSolution:
      "function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    const errors = [];\n    let rejectedCount = 0;\n    const total = promises.length;\n    \n    if (total === 0) {\n      reject(new AggregateError([], 'All promises rejected'));\n      return;\n    }\n    \n    for (let i = 0; i < total; i++) {\n      Promise.resolve(promises[i])\n        .then(resolve)  // first fulfillment resolves\n        .catch(err => {\n          errors[i] = err;\n          rejectedCount++;\n          if (rejectedCount === total) {\n            reject(new AggregateError(errors, 'All promises rejected'));\n          }\n        });\n    }\n  });\n}",
    explanation:
      "`Promise.any` waits for the first fulfilled promise. If none fulfill, it rejects with an `AggregateError` containing all rejection reasons. We track rejections in an array with indices. On each rejection, we increment a counter and store the error. If a promise resolves, we call `resolve` immediately. If all promises reject, we call `reject` with an `AggregateError`.",
    hint: "Track number of rejections and store errors. Resolve on first fulfillment.",
  },
  {
    id: "promise-allSettled",
    type: "implementation",
    topic: "Promises",
    title: "Implement Promise.allSettled",
    prompt:
      "Implement `promiseAllSettled(promises)` that returns a promise that resolves after all input promises have settled (either resolved or rejected). The result is an array of objects describing each outcome: `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`.\n\nExample:\nconst p1 = Promise.resolve(1);\nconst p2 = Promise.reject('error');\nconst p3 = Promise.resolve(3);\npromiseAllSettled([p1, p2, p3]).then(results => console.log(results));\n// [\n//   { status: 'fulfilled', value: 1 },\n//   { status: 'rejected', reason: 'error' },\n//   { status: 'fulfilled', value: 3 }\n// ]",
    starter:
      "function promiseAllSettled(promises) {\n  // your solution here\n}",
    referenceSolution:
      "function promiseAllSettled(promises) {\n  return new Promise((resolve) => {\n    const results = [];\n    let settledCount = 0;\n    const total = promises.length;\n    \n    if (total === 0) return resolve(results);\n    \n    for (let i = 0; i < total; i++) {\n      Promise.resolve(promises[i])\n        .then(value => {\n          results[i] = { status: 'fulfilled', value };\n        })\n        .catch(reason => {\n          results[i] = { status: 'rejected', reason };\n        })\n        .finally(() => {\n          settledCount++;\n          if (settledCount === total) {\n            resolve(results);\n          }\n        });\n    }\n  });\n}",
    explanation:
      "`Promise.allSettled` never rejects; it always resolves after all promises settle. We track each settled promise via `finally`. When a promise fulfills, we store `{ status: 'fulfilled', value }`; when it rejects, we store `{ status: 'rejected', reason }`. Once `settledCount` reaches the total, we resolve with the results array, preserving order.",
    hint: "Use finally to detect when each promise settles. Store status objects in order.",
  },
  {
    id: "retry-promise",
    type: "implementation",
    topic: "Promises",
    title: "Retry a promise",
    prompt:
      "Write a function `retry(fn, retries, delay)` where `fn` is a function that returns a promise. It should attempt to call `fn()`. If it rejects, it should retry after `delay` milliseconds, up to `retries` times. If all retries fail, it should propagate the last error.\n\nExample:\nlet attempt = 0;\nconst flakyFn = () => new Promise((resolve, reject) => {\n  attempt++;\n  if (attempt < 3) reject('fail');\n  else resolve('success');\n});\nretry(flakyFn, 3, 100).then(console.log); // after ~200ms, logs 'success'",
    starter: "function retry(fn, retries, delay) {\n  // your solution here\n}",
    referenceSolution:
      "function retry(fn, retries, delay) {\n  // Attempt the function\n  return fn().catch(err => {\n    // If no retries left, throw the error\n    if (retries <= 0) throw err;\n    // Otherwise wait for delay, then retry with decreased retries\n    return new Promise(resolve => setTimeout(resolve, delay)).then(() =>\n      retry(fn, retries - 1, delay)\n    );\n  });\n}",
    explanation:
      "We call `fn()` and catch its rejection. If retries are available, we wait for `delay` milliseconds using a timer promise, then recursively call `retry` with one fewer retry. The recursion continues until either `fn()` resolves or retries run out. The last error is thrown. This pattern is useful for unreliable network calls.",
    hint: "Use recursion and setTimeout for delay. Decrease retries each time.",
  },
  {
    id: "async-series",
    type: "implementation",
    topic: "Async",
    title: "Run async functions in series",
    prompt:
      "Given an array of async functions (each returning a promise), execute them one after another (sequentially). Return a promise that resolves with an array of results in order.\n\nExample:\nconst task1 = () => Promise.resolve(1);\nconst task2 = () => Promise.resolve(2);\nconst task3 = () => Promise.resolve(3);\nasyncSeries([task1, task2, task3]).then(console.log); // [1,2,3]",
    starter: "function asyncSeries(tasks) {\n  // your solution here\n}",
    referenceSolution:
      "function asyncSeries(tasks) {\n  const results = [];\n  // Start with an already resolved promise, then chain each task\n  let promiseChain = Promise.resolve();\n  for (const task of tasks) {\n    promiseChain = promiseChain\n      .then(() => task())\n      .then(result => {\n        results.push(result);\n      });\n  }\n  return promiseChain.then(() => results);\n\n  // Alternative using reduce:\n  // return tasks.reduce((promise, task) => {\n  //   return promise.then(() => task()).then(result => {\n  //     results.push(result);\n  //     return results;\n  //   });\n  // }, Promise.resolve());\n}",
    explanation:
      "We build a chain of promises. Starting with `Promise.resolve()`, we then for each task add a `then` that executes the task and stores its result. Because we always wait for the previous promise to resolve before starting the next, tasks run in series. Finally, we return a promise that resolves with the collected results.",
    hint: "Start with a resolved promise, then chain each task sequentially.",
  },
  {
    id: "async-parallel-limit",
    type: "implementation",
    topic: "Async",
    title: "Async parallel with concurrency limit",
    prompt:
      "Implement `asyncParallelLimit(tasks, limit)` where `tasks` is an array of functions that return promises. It runs up to `limit` tasks in parallel. Once a task finishes, it starts the next pending task. It returns a promise that resolves with an array of results (in original order).\n\nExample:\nconst tasks = [\n  () => new Promise(resolve => setTimeout(() => resolve(1), 100)),\n  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),\n  () => new Promise(resolve => setTimeout(() => resolve(3), 30)),\n];\nasyncParallelLimit(tasks, 2).then(console.log); // [1,2,3]",
    starter:
      "function asyncParallelLimit(tasks, limit) {\n  // your solution here\n}",
    referenceSolution:
      "function asyncParallelLimit(tasks, limit) {\n  const results = new Array(tasks.length);\n  let inProgress = 0;\n  let nextIndex = 0;\n  \n  return new Promise((resolve, reject) => {\n    function runNext() {\n      // If all tasks are done and nothing is running, resolve\n      if (nextIndex === tasks.length && inProgress === 0) {\n        resolve(results);\n        return;\n      }\n      // Start new tasks while under limit and tasks remain\n      while (inProgress < limit && nextIndex < tasks.length) {\n        const i = nextIndex++;\n        inProgress++;\n        tasks[i]()\n          .then(result => {\n            results[i] = result;\n            inProgress--;\n            runNext(); // after finishing, try to start more\n          })\n          .catch(reject); // any error rejects the whole promise\n      }\n    }\n    runNext();\n  });\n}",
    explanation:
      "We track `inProgress` (number of currently running tasks) and `nextIndex` (next task to start). As tasks complete, we call `runNext()` to start new tasks if under the limit. Results are stored in the correct index to preserve order. If any task rejects, we reject the whole promise. This ensures at most `limit` tasks run concurrently.",
    hint: "Use a queue-like pattern with a while loop to start tasks up to limit.",
  },
  {
    id: "flatten-deep",
    type: "implementation",
    topic: "Recursion",
    title: "Deep flatten array",
    prompt:
      "Flatten an array of arbitrarily nested arrays into a single‑level array. Do not use `Array.flat(Infinity)` – implement it recursively.\n\nExample:\nInput: [1, [2, [3, 4], 5], 6]\nOutput: [1, 2, 3, 4, 5, 6]\n\nInput: [[1, 2], [3, [4, 5]]] → [1,2,3,4,5]",
    starter: "function flattenDeep(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function flattenDeep(arr) {\n  // Use reduce to accumulate the flattened result\n  return arr.reduce((acc, val) => {\n    // If the current value is an array, recursively flatten it\n    if (Array.isArray(val)) {\n      // concat allows us to add all elements of the flattened subarray\n      return acc.concat(flattenDeep(val));\n    } else {\n      // Otherwise, just add the value\n      return acc.concat(val);\n    }\n  }, []);\n}",
    explanation:
      "We iterate over the array with `reduce`. For each element, if it is an array, we recursively call `flattenDeep` on it and concatenate the result. If it is not an array, we directly concatenate it. This recursively processes all levels of nesting until only non‑array elements remain, producing a flat array.",
    hint: "If element is an array, recurse; otherwise add to result.",
  },
  {
    id: "fibonacci-memo",
    type: "implementation",
    topic: "Recursion",
    title: "Fibonacci with memoization",
    prompt:
      "Compute the nth Fibonacci number efficiently using memoization (caching). The Fibonacci sequence: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).\n\nExample:\nfibonacci(0) → 0\nfibonacci(6) → 8\nfibonacci(40) should be fast (not exponential).",
    starter: "function fibonacci(n, memo = {}) {\n  // your solution here\n}",
    referenceSolution:
      "function fibonacci(n, memo = {}) {\n  // Base cases\n  if (n <= 1) return n;\n  // If already computed, return cached value\n  if (memo[n]) return memo[n];\n  // Compute and cache before returning\n  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);\n  return memo[n];\n}",
    explanation:
      "Naive recursion recomputes the same values many times (exponential). Memoization stores results in a `memo` object keyed by `n`. Before computing, we check the cache. If the value is not present, we compute it recursively and store it. This reduces time complexity to O(n).",
    hint: "Use an object or Map to store computed values. Check cache before recursing.",
  },
  {
    id: "permutations",
    type: "implementation",
    topic: "Recursion",
    title: "Generate permutations",
    prompt:
      "Return all permutations of an array (or string). Permutations are all possible ordered arrangements of the elements. The order of the permutations themselves does not matter.\n\nExample:\npermutations([1,2,3]) → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\npermutations('abc') → ['abc','acb','bac','bca','cab','cba'] (if working with strings)",
    starter: "function permutations(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function permutations(arr) {\n  const result = [];\n  \n  function backtrack(current, remaining) {\n    // If no elements left, we have a complete permutation\n    if (remaining.length === 0) {\n      result.push([...current]);\n      return;\n    }\n    // For each element in remaining, try it and recurse\n    for (let i = 0; i < remaining.length; i++) {\n      // Choose element at index i\n      current.push(remaining[i]);\n      // Create new remaining array without the chosen element\n      const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];\n      backtrack(current, newRemaining);\n      // Backtrack: remove the element for next iteration\n      current.pop();\n    }\n  }\n  \n  backtrack([], arr);\n  return result;\n}",
    explanation:
      "We use backtracking: at each step, we pick one element from the remaining pool, add it to the current permutation, and recurse with the remaining elements. When no elements are left, we record the permutation. After returning, we backtrack (remove the last element) to try the next possibility. This generates all n! permutations.",
    hint: "Use recursion and a visited set or slice to remove selected element.",
  },
  {
    id: "stack",
    type: "implementation",
    topic: "Data Structures",
    title: "Stack implementation",
    prompt:
      "Implement a Stack data structure with `push`, `pop`, `peek`, and `isEmpty` methods. The stack should follow Last‑In‑First‑Out (LIFO) order.\n\nExample:\nconst stack = new Stack();\nstack.push(1);\nstack.push(2);\nstack.peek(); // 2\nstack.pop();  // 2\nstack.pop();  // 1\nstack.isEmpty(); // true",
    starter:
      "class Stack {\n  constructor() {\n    // your code here\n  }\n  push(element) {}\n  pop() {}\n  peek() {}\n  isEmpty() {}\n}",
    referenceSolution:
      "class Stack {\n  constructor() {\n    // Use an array to store elements\n    this.items = [];\n  }\n\n  // Push: add element to the top (end of array)\n  push(element) {\n    this.items.push(element);\n  }\n\n  // Pop: remove and return the top element\n  pop() {\n    if (this.isEmpty()) return undefined;\n    return this.items.pop();\n  }\n\n  // Peek: return the top element without removing\n  peek() {\n    if (this.isEmpty()) return undefined;\n    return this.items[this.items.length - 1];\n  }\n\n  // Check if stack is empty\n  isEmpty() {\n    return this.items.length === 0;\n  }\n\n  // Optional: get size\n  size() {\n    return this.items.length;\n  }\n}",
    explanation:
      "A stack can be easily implemented with a JavaScript array, using `push` for adding, `pop` for removing, and reading the last element for `peek`. All operations are O(1). This is the standard LIFO structure used in depth‑first search, undo/redo, etc.",
    hint: "Use array's built‑in push/pop for O(1) operations.",
  },
  {
    id: "queue",
    type: "implementation",
    topic: "Data Structures",
    title: "Queue implementation",
    prompt:
      "Implement a Queue data structure with `enqueue`, `dequeue`, `peek`, and `isEmpty` methods. The queue should follow First‑In‑First‑Out (FIFO) order. Optimize `dequeue` to be O(1) (avoid `shift`).\n\nExample:\nconst queue = new Queue();\nqueue.enqueue(1);\nqueue.enqueue(2);\nqueue.peek(); // 1\nqueue.dequeue(); // 1\nqueue.dequeue(); // 2\nqueue.isEmpty(); // true",
    starter:
      "class Queue {\n  constructor() {\n    // your code here\n  }\n  enqueue(element) {}\n  dequeue() {}\n  peek() {}\n  isEmpty() {}\n}",
    referenceSolution:
      "class Queue {\n  constructor() {\n    // Use an object for storage and two pointers to avoid shift\n    this.items = {};\n    this.front = 0;   // index of the front element\n    this.rear = 0;    // index where next element will be added\n  }\n\n  enqueue(element) {\n    // Add element at `rear` index, then increment rear\n    this.items[this.rear] = element;\n    this.rear++;\n  }\n\n  dequeue() {\n    if (this.isEmpty()) return undefined;\n    const element = this.items[this.front];\n    delete this.items[this.front]; // remove the element\n    this.front++;\n    return element;\n  }\n\n  peek() {\n    if (this.isEmpty()) return undefined;\n    return this.items[this.front];\n  }\n\n  isEmpty() {\n    return this.front === this.rear;\n  }\n\n  size() {\n    return this.rear - this.front;\n  }\n}",
    explanation:
      "Using an object with pointers (`front` and `rear`) allows O(1) enqueue and dequeue. When enqueuing, we add at `items[rear]` and increment `rear`. Dequeuing returns `items[front]` and increments `front`. This avoids the O(n) cost of `Array.shift()`. The queue is empty when `front === rear`.",
    hint: "Store elements in an object and use front/rear indices to avoid shifting.",
  },
  {
    id: "linked-list",
    type: "implementation",
    topic: "Data Structures",
    title: "Singly linked list",
    prompt:
      "Implement a singly linked list with `add(value)`, `remove(value)`, and `find(value)` methods. The list should store nodes with `value` and `next` pointer.\n\nExample:\nconst list = new LinkedList();\nlist.add(1); list.add(2); list.add(3);\nlist.find(2); // returns node with value 2\nlist.remove(2);\nlist.find(2); // null",
    starter:
      "class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\nclass LinkedList {\n  constructor() {\n    this.head = null;\n  }\n  add(value) {}\n  remove(value) {}\n  find(value) {}\n}",
    referenceSolution:
      "class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}\n\nclass LinkedList {\n  constructor() {\n    this.head = null;\n  }\n\n  // Add to the end (append)\n  add(value) {\n    const newNode = new Node(value);\n    if (!this.head) {\n      this.head = newNode;\n      return;\n    }\n    let current = this.head;\n    while (current.next) {\n      current = current.next;\n    }\n    current.next = newNode;\n  }\n\n  // Remove first occurrence of value\n  remove(value) {\n    if (!this.head) return false;\n    // If head itself holds the value\n    if (this.head.value === value) {\n      this.head = this.head.next;\n      return true;\n    }\n    let current = this.head;\n    while (current.next && current.next.value !== value) {\n      current = current.next;\n    }\n    if (current.next) {\n      current.next = current.next.next;\n      return true;\n    }\n    return false;\n  }\n\n  // Find node by value\n  find(value) {\n    let current = this.head;\n    while (current) {\n      if (current.value === value) return current;\n      current = current.next;\n    }\n    return null;\n  }\n\n  // Helper to convert to array for testing\n  toArray() {\n    const result = [];\n    let current = this.head;\n    while (current) {\n      result.push(current.value);\n      current = current.next;\n    }\n    return result;\n  }\n}",
    explanation:
      "A singly linked list consists of nodes that point to the next node. `add` traverses to the end and appends. `remove` finds the previous node and updates its `next` pointer to skip the target node. `find` linearly searches for a value. All operations are O(n) in worst case.",
    hint: "Traverse the list to perform operations. Maintain the head reference.",
  },
  {
    id: "lru-cache",
    type: "implementation",
    topic: "Data Structures",
    title: "LRU Cache",
    prompt:
      "Implement an LRU (Least Recently Used) cache with `get(key)` and `put(key, value)` methods. The cache has a fixed capacity. When full, the least recently used item should be evicted. Both methods must run in O(1) average time.\n\nExample:\nconst cache = new LRUCache(2);\ncache.put(1, 1);\ncache.put(2, 2);\ncache.get(1); // returns 1 (now 1 is most recent)\ncache.put(3, 3); // evicts key 2\ncache.get(2); // returns -1 (not found)",
    starter:
      "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {}\n  put(key, value) {}\n}",
    referenceSolution:
      "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    // Use a Map – it preserves insertion order.\n    this.cache = new Map();\n  }\n\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    // To mark as recently used, delete and re‑insert\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n\n  put(key, value) {\n    // If key exists, delete it first (to update order)\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    }\n    // Add the new entry (now most recent)\n    this.cache.set(key, value);\n    // If over capacity, delete the least recent (first key in Map)\n    if (this.cache.size > this.capacity) {\n      const oldestKey = this.cache.keys().next().value;\n      this.cache.delete(oldestKey);\n    }\n  }\n}",
    explanation:
      "JavaScript's `Map` maintains insertion order. On `get`, we delete and reinsert the key to move it to the end (most recent). On `put`, we delete if exists, then set (adds to end). If size exceeds capacity, we delete the first key (least recent). All operations are O(1).",
    hint: "Map maintains order; use delete and set to update order.",
  },
  {
    id: "bubble-sort",
    type: "implementation",
    topic: "Algorithms",
    title: "Bubble sort",
    prompt:
      "Implement bubble sort to sort an array of numbers in ascending order. Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Optimize by stopping early if no swaps are made.\n\nExample:\nInput: [5, 1, 4, 2, 8]\nOutput: [1, 2, 4, 5, 8]\n\nInput: [3, 0, 1]\nOutput: [0, 1, 3]",
    starter: "function bubbleSort(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function bubbleSort(arr) {\n  // Make a copy to avoid mutating the original\n  const sorted = [...arr];\n  const n = sorted.length;\n  // Outer loop: each pass moves the largest unsorted element to the end\n  for (let i = 0; i < n - 1; i++) {\n    let swapped = false;\n    // Inner loop: compare adjacent elements\n    for (let j = 0; j < n - i - 1; j++) {\n      if (sorted[j] > sorted[j + 1]) {\n        // Swap using destructuring assignment\n        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];\n        swapped = true;\n      }\n    }\n    // If no swaps, the array is already sorted\n    if (!swapped) break;\n  }\n  return sorted;\n}",
    explanation:
      "Bubble sort repeatedly bubbles the largest element to the end. After each pass, the last `i` elements are in final position. The `swapped` flag optimizes by breaking early if no swaps occur. Time complexity: O(n²) worst/average, O(n) best (already sorted).",
    hint: "Use nested loops, compare adjacent elements, swap if needed. Track if any swap happened.",
  },
  {
    id: "merge-sort",
    type: "implementation",
    topic: "Algorithms",
    title: "Merge sort",
    prompt:
      "Implement merge sort recursively. Merge sort divides the array into halves, recursively sorts each half, and then merges the two sorted halves.\n\nExample:\nInput: [38, 27, 43, 3, 9, 82, 10]\nOutput: [3, 9, 10, 27, 38, 43, 82]",
    starter:
      "function mergeSort(arr) {\n  // your solution here\n}\n\nfunction merge(left, right) {\n  // helper to merge two sorted arrays\n}",
    referenceSolution:
      "function mergeSort(arr) {\n  // Base case: arrays of length 0 or 1 are already sorted\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0;\n  let j = 0;\n  // Compare elements from both halves and add the smaller\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) {\n      result.push(left[i]);\n      i++;\n    } else {\n      result.push(right[j]);\n      j++;\n    }\n  }\n  // Add any remaining elements from left or right\n  return result.concat(left.slice(i)).concat(right.slice(j));\n}",
    explanation:
      "Merge sort is divide and conquer. It splits the array into halves recursively until each sub‑array has one element, then merges them in sorted order. The merge function combines two sorted arrays by repeatedly taking the smaller front element. Time complexity: O(n log n) in all cases; stable sort.",
    hint: "Use recursion to split, then merge sorted halves with two pointers.",
  },
  {
    id: "quick-sort",
    type: "implementation",
    topic: "Algorithms",
    title: "Quick sort",
    prompt:
      "Implement quick sort recursively. Choose a pivot, partition the array into elements less than pivot and greater than pivot, then recursively sort the partitions. For simplicity, use the first element as pivot.\n\nExample:\nInput: [10, 7, 8, 9, 1, 5]\nOutput: [1, 5, 7, 8, 9, 10]",
    starter: "function quickSort(arr) {\n  // your solution here\n}",
    referenceSolution:
      "function quickSort(arr) {\n  // Base case: arrays with 0 or 1 element are sorted\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n  // Partition: all elements smaller than pivot go left, larger or equal go right\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < pivot) {\n      left.push(arr[i]);\n    } else {\n      right.push(arr[i]);\n    }\n  }\n  // Recursively sort left and right, then combine\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}",
    explanation:
      "Quick sort picks a pivot and partitions the array. This simpler version uses extra arrays for clarity. Elements less than pivot go to `left`, greater or equal to `right`. Then recursively sort each side and combine. This approach is easy to understand but uses O(n) extra memory. Average time O(n log n), worst O(n²) (if pivot is always smallest/largest).",
    hint: "Use recursion and divide‑and‑conquer: choose a pivot, split into smaller and larger, then combine.",
  },
  {
    id: "dfs-graph",
    type: "implementation",
    topic: "Algorithms",
    title: "Depth First Search on graph",
    prompt:
      "Implement Depth First Search (DFS) traversal on a graph represented as an adjacency list. DFS should visit nodes recursively, using a visited set to avoid cycles. Return the nodes in the order they are visited.\n\nExample:\ngraph = {\n  A: ['B', 'C'],\n  B: ['A', 'D', 'E'],\n  C: ['A', 'F'],\n  D: ['B'],\n  E: ['B', 'F'],\n  F: ['C', 'E']\n}\ndfs(graph, 'A') → ['A', 'B', 'D', 'E', 'F', 'C'] (order may vary based on neighbor order)",
    starter:
      "function dfs(graph, start) {\n  // return array of nodes in DFS order\n}",
    referenceSolution:
      "function dfs(graph, start) {\n  const visited = new Set();\n  const result = [];\n  \n  function traverse(node) {\n    if (visited.has(node)) return;\n    visited.add(node);\n    result.push(node);\n    // Recursively visit all neighbors\n    for (const neighbor of graph[node] || []) {\n      traverse(neighbor);\n    }\n  }\n  \n  traverse(start);\n  return result;\n}",
    explanation:
      "DFS explores as far as possible along each branch before backtracking. We use a recursive function that marks the current node as visited, records it, and then recursively visits each unvisited neighbor. A `Set` prevents revisiting nodes. This works for connected graphs; for disconnected graphs, you would call traverse on each unvisited node.",
    hint: "Recursively visit neighbors after marking current node as visited.",
  },
  {
    id: "bfs-graph",
    type: "implementation",
    topic: "Algorithms",
    title: "Breadth First Search on graph",
    prompt:
      "Implement Breadth First Search (BFS) traversal on a graph represented as an adjacency list. Use a queue to explore nodes level by level. Return the nodes in the order they are visited.\n\nExample:\ngraph = {\n  A: ['B', 'C'],\n  B: ['A', 'D', 'E'],\n  C: ['A', 'F'],\n  D: ['B'],\n  E: ['B', 'F'],\n  F: ['C', 'E']\n}\nbfs(graph, 'A') → ['A', 'B', 'C', 'D', 'E', 'F'] (level order)",
    starter:
      "function bfs(graph, start) {\n  // return array of nodes in BFS order\n}",
    referenceSolution:
      "function bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  const result = [];\n  visited.add(start);\n  \n  while (queue.length > 0) {\n    const node = queue.shift(); // dequeue\n    result.push(node);\n    // Enqueue all unvisited neighbors\n    for (const neighbor of graph[node] || []) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return result;\n}",
    explanation:
      "BFS explores neighbors before moving to the next level. We use a queue: start with the start node marked visited. While the queue is not empty, dequeue a node, record it, and enqueue all its unvisited neighbors. This yields nodes in order of increasing distance from the start. BFS is useful for shortest path in unweighted graphs.",
    hint: "Use a queue (array with shift/push) and a visited set.",
  },
  {
    id: "impl-deep-freeze",
    type: "implementation",
    topic: "Objects",
    title: "Deep freeze",
    prompt:
      "Write a function that deeply freezes an object, preventing any modifications to the object itself and all nested objects. Use `Object.freeze` recursively.\n\nExample:\nconst obj = { a: 1, b: { c: 2 } };\ndeepFreeze(obj);\nobj.a = 99;          // no effect (silent fail or error in strict mode)\nobj.b.c = 99;        // no effect\nObject.isFrozen(obj.b); // true",
    starter: "function deepFreeze(obj) {\n  // your solution here\n}",
    referenceSolution:
      "function deepFreeze(obj) {\n  // Freeze the top-level object\n  Object.freeze(obj);\n  // Iterate over all properties\n  for (const key in obj) {\n    if (obj.hasOwnProperty(key)) {\n      const value = obj[key];\n      // If the value is an object (and not null) and is not frozen, recurse\n      if (value && typeof value === 'object' && !Object.isFrozen(value)) {\n        deepFreeze(value);\n      }\n    }\n  }\n  return obj;\n}",
    explanation:
      "`Object.freeze` makes an object immutable (no new properties, cannot modify existing ones). Deep freezing recursively applies `Object.freeze` to all nested objects. We check `!Object.isFrozen(value)` to avoid infinite recursion on circular references (though that would still be a problem; a more robust solution would also track visited objects).",
    hint: "Use Object.freeze and recursion. Check if value is an object and not already frozen.",
  },
  {
    id: "new-useState",
    type: "implementation",
    topic: "React",
    title: "Custom useState implementation",
    prompt:
      "Implement a basic version of React's `useState` that returns a stateful value and a setter function. Use a closure to store state across calls. This is a simplified, non‑rendering version for understanding the concept.\n\nExample:\nconst [getCount, setCount] = useState(0);\nconsole.log(getCount()); // 0\nsetCount(5);\nconsole.log(getCount()); // 5\nsetCount(prev => prev + 1);\nconsole.log(getCount()); // 6",
    starter: "function useState(initialValue) {\n  // your solution here\n}",
    referenceSolution:
      "function useState(initialValue) {\n  // Store the state in a closure variable (not exposed directly)\n  let state = initialValue;\n  \n  // Getter function returns current state\n  const getState = () => state;\n  \n  // Setter function updates state; can accept a new value or an updater function\n  const setState = (newValue) => {\n    state = typeof newValue === 'function' ? newValue(state) : newValue;\n  };\n  \n  // Return array with getter and setter (like React's useState returns [value, setter])\n  // Note: React's useState returns the value directly, not a getter.\n  // This simplified version uses a getter to demonstrate closure.\n  return [getState, setState];\n}",
    explanation:
      "This is a conceptual implementation. The actual React `useState` works with fibers and triggers re‑renders. Here, we demonstrate closure: the `state` variable is private to the returned functions. The getter returns the current value; the setter updates it, optionally using an updater function that receives the previous state. This helps understand how state persists between calls.",
    hint: "Store the state inside the closure. Return an array with a getter and a setter.",
  },
  {
    id: "new-useEffect",
    type: "implementation",
    topic: "React",
    title: "Custom useEffect implementation (mock)",
    prompt:
      "Implement a basic version of React's `useEffect` that runs a callback after render and cleans up, with dependency tracking. This is a mock for educational purposes – it uses global state to simulate multiple effect calls.\n\nExample:\n\nlet renderCount = 0;\nfunction mockRender() {\n  renderCount++;\n  // Reset effect index on each render\n  window.effectIndex = 0;\n}\n\nuseEffect(() => { console.log('Effect runs'); }, []);\n\nNote: The actual implementation is much more complex; this is a simplified version to illustrate the mechanism.",
    starter:
      "// Mock implementation using global arrays\nconst effectDependencies = [];\nlet effectIndex = 0;\n\nfunction useEffect(callback, dependencies) {\n  // your solution here\n}",
    referenceSolution:
      '// Global storage for effect dependencies and cleanup functions\nconst effectDependencies = [];\nlet effectIndex = 0;\n\nfunction useEffect(callback, dependencies) {\n  const index = effectIndex; // capture current index\n  const prevDeps = effectDependencies[index];\n  \n  // Determine if dependencies have changed\n  let hasChanged = true;\n  if (prevDeps) {\n    hasChanged = dependencies.some((dep, i) => dep !== prevDeps[i]);\n  }\n  \n  if (hasChanged) {\n    // Run cleanup if exists\n    if (effectDependencies[index]?.cleanup) {\n      effectDependencies[index].cleanup();\n    }\n    // Run the effect and store its cleanup\n    const cleanup = callback();\n    // Store dependencies and cleanup for this effect\n    effectDependencies[index] = { deps: dependencies, cleanup };\n  }\n  effectIndex++;\n}\n\n// Helper to reset index before each "render"\nfunction resetEffectIndex() {\n  effectIndex = 0;\n}',
    explanation:
      'This mock implementation shows the core idea: effects are stored globally with their dependencies. Before each "render", `effectIndex` is reset. When `useEffect` is called, we compare the current dependencies with the previous ones. If any changed, we run the callback (and its cleanup). This is not production‑ready but illustrates the dependency tracking mechanism.',
    hint: "Store previous dependencies and compare; run cleanup if available.",
  },
  {
    id: "new-useFetch",
    type: "implementation",
    topic: "React",
    title: "Custom useFetch hook",
    prompt:
      "Create a custom React hook that fetches data from a URL and returns `{ data, loading, error }`. The hook should handle loading state, success, and error. It should also cancel the request on unmount to avoid memory leaks.\n\nExample:\nfunction UserProfile() {\n  const { data, loading, error } = useFetch('https://api.example.com/user');\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n  return <div>{data.name}</div>;\n}",
    starter: "function useFetch(url) {\n  // your solution here\n}",
    referenceSolution:
      "function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  \n  useEffect(() => {\n    let isMounted = true;  // flag to prevent state updates after unmount\n    const controller = new AbortController(); // optional: for aborting fetch\n    \n    const fetchData = async () => {\n      setLoading(true);\n      setError(null);\n      try {\n        const response = await fetch(url, { signal: controller.signal });\n        if (!response.ok) throw new Error(`HTTP error ${response.status}`);\n        const result = await response.json();\n        if (isMounted) setData(result);\n      } catch (err) {\n        // Ignore abort errors\n        if (isMounted && err.name !== 'AbortError') setError(err);\n      } finally {\n        if (isMounted) setLoading(false);\n      }\n    };\n    \n    fetchData();\n    \n    return () => {\n      isMounted = false;\n      controller.abort(); // cancel request on unmount\n    };\n  }, [url]); // re-run when url changes\n  \n  return { data, loading, error };\n}",
    explanation:
      "The hook uses `useState` for data, loading, and error. Inside `useEffect`, we set an `isMounted` flag to avoid setting state after component unmounts. We use `AbortController` to cancel the fetch on cleanup. The effect re‑runs when `url` changes. This hook is reusable across components and handles edge cases like race conditions.",
    hint: "Use useState for data/loading/error; useEffect with cleanup flag and AbortController.",
  },
  {
    id: "new-useLocalStorage",
    type: "implementation",
    topic: "React",
    title: "Custom useLocalStorage hook",
    prompt:
      "Create a custom hook that syncs state with localStorage. It reads the initial value from localStorage (or uses a default), and whenever the state changes, it updates localStorage. The state should be reactive across tabs (optional, using storage event).\n\nExample:\nconst [name, setName] = useLocalStorage('name', 'Guest');\n// If localStorage has 'name', it uses that; otherwise 'Guest'.\n// setName('Alice') updates both state and localStorage.",
    starter:
      "function useLocalStorage(key, initialValue) {\n  // your solution here\n}",
    referenceSolution:
      "function useLocalStorage(key, initialValue) {\n  // Lazy initialization: read from localStorage once\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      console.warn('Error reading localStorage', error);\n      return initialValue;\n    }\n  });\n  \n  // Return a wrapped version of useState's setter that also updates localStorage\n  const setValue = (value) => {\n    try {\n      const valueToStore = value instanceof Function ? value(storedValue) : value;\n      setStoredValue(valueToStore);\n      localStorage.setItem(key, JSON.stringify(valueToStore));\n    } catch (error) {\n      console.warn('Error writing to localStorage', error);\n    }\n  };\n  \n  // Optional: listen to storage events to sync across tabs\n  useEffect(() => {\n    const handleStorageChange = (e) => {\n      if (e.key === key) {\n        try {\n          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;\n          setStoredValue(newValue);\n        } catch {}\n      }\n    };\n    window.addEventListener('storage', handleStorageChange);\n    return () => window.removeEventListener('storage', handleStorageChange);\n  }, [key, initialValue]);\n  \n  return [storedValue, setValue];\n}",
    explanation:
      "The hook lazily reads from localStorage on first render. The returned setter updates both state and localStorage. An optional `storage` event listener keeps the state in sync across different browser tabs/windows. The function updater form supports using previous state (like React's setState).",
    hint: "Use useState with a function to read localStorage once. The setter should also write to localStorage.",
  },
  {
    id: "new-debounceHook",
    type: "implementation",
    topic: "React",
    title: "Custom useDebounce hook",
    prompt:
      "Implement a React hook that returns a debounced version of a value. This is useful for search inputs to avoid making API calls on every keystroke. The debounced value updates only after the input has been idle for a specified delay.\n\nExample:\nconst [searchTerm, setSearchTerm] = useState('');\nconst debouncedSearchTerm = useDebounce(searchTerm, 500);\nuseEffect(() => {\n  if (debouncedSearchTerm) {\n    apiCall(debouncedSearchTerm);\n  }\n}, [debouncedSearchTerm]);",
    starter: "function useDebounce(value, delay) {\n  // your solution here\n}",
    referenceSolution:
      "function useDebounce(value, delay) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n  \n  useEffect(() => {\n    // Set a timer to update the debounced value after the delay\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n    \n    // Cleanup: if value changes before the delay, clear the previous timer\n    return () => {\n      clearTimeout(handler);\n    };\n  }, [value, delay]); // Re-run effect when value or delay changes\n  \n  return debouncedValue;\n}",
    explanation:
      "The hook uses `useState` to hold the debounced version. Inside `useEffect`, we set a timeout that updates the debounced value after `delay` milliseconds. If `value` changes before the delay, we clear the previous timeout and start a new one. This ensures the debounced value only changes after the last change followed by a quiet period.",
    hint: "Use useEffect with setTimeout and cleanup to delay updating the debounced value.",
  },
  {
    id: "spiralMatrix",
    type: "implementation",
    topic: "Algorithms",
    title: "Spiral matrix",
    prompt:
      "Write a function that returns all elements of a 2D matrix in spiral order. Start from the top‑left corner, move right, down, left, up, and repeat, like a spiral.\n\nExample:\nInput: [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]\n\nInput: [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\nOutput: [1,2,3,4,8,12,11,10,9,5,6,7]",
    starter: "function spiralOrder(matrix) {\n  // your solution here\n}",
    referenceSolution:
      "function spiralOrder(matrix) {\n  if (!matrix.length || !matrix[0].length) return [];\n  const result = [];\n  let top = 0;\n  let bottom = matrix.length - 1;\n  let left = 0;\n  let right = matrix[0].length - 1;\n  \n  while (top <= bottom && left <= right) {\n    // Traverse right along top row\n    for (let i = left; i <= right; i++) {\n      result.push(matrix[top][i]);\n    }\n    top++;\n    \n    // Traverse down along right column\n    for (let i = top; i <= bottom; i++) {\n      result.push(matrix[i][right]);\n    }\n    right--;\n    \n    // Traverse left along bottom row (if still within bounds)\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) {\n        result.push(matrix[bottom][i]);\n      }\n      bottom--;\n    }\n    \n    // Traverse up along left column (if still within bounds)\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) {\n        result.push(matrix[i][left]);\n      }\n      left++;\n    }\n  }\n  return result;\n}",
    explanation:
      "We maintain four boundaries: top, bottom, left, right. In each layer, we traverse right, down, left, up, shrinking the boundaries after each direction. The `if` conditions prevent double‑counting on the last row/column when the matrix has a single row or column. This achieves O(m×n) time and O(1) extra space (excluding output).",
    hint: "Track top, bottom, left, right pointers; shrink after each traversal.",
  },
  {
    id: "rotateMatrix",
    type: "implementation",
    topic: "Algorithms",
    title: "Rotate image (matrix) 90 degrees clockwise in‑place",
    prompt:
      "Given an N x N matrix, rotate it 90 degrees clockwise **in‑place**. Do not allocate another matrix.\n\nExample:\nInput: [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]\n\nInput: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\nOutput: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
    starter: "function rotate(matrix) {\n  // your solution here\n}",
    referenceSolution:
      "function rotate(matrix) {\n  const n = matrix.length;\n  // Process layer by layer\n  for (let layer = 0; layer < Math.floor(n / 2); layer++) {\n    const first = layer;\n    const last = n - 1 - layer;\n    for (let i = first; i < last; i++) {\n      const offset = i - first;\n      // Save top element\n      const top = matrix[first][i];\n      // Move left to top\n      matrix[first][i] = matrix[last - offset][first];\n      // Move bottom to left\n      matrix[last - offset][first] = matrix[last][last - offset];\n      // Move right to bottom\n      matrix[last][last - offset] = matrix[i][last];\n      // Move top (saved) to right\n      matrix[i][last] = top;\n    }\n  }\n  return matrix;\n}",
    explanation:
      "We rotate the matrix in layers (rings) from outer to inner. For each layer, we perform a 4‑way swap: top -> right, right -> bottom, bottom -> left, left -> top. We iterate within the layer using an offset. This rotates 90° clockwise in O(n²) time and O(1) extra space.",
    hint: "Work on layers from outer to inner, rotating elements in groups of four.",
  },
  {
    id: "reverse-integer",
    type: "implementation",
    topic: "Numbers",
    title: "Reverse integer",
    prompt:
      "Reverse the digits of an integer. If the reversed integer overflows 32‑bit signed integer range [-2³¹, 2³¹-1], return 0. Handle negative numbers.\n\nExample:\nInput: 123 → 321\nInput: -123 → -321\nInput: 120 → 21\nInput: 1534236469 → 0 (because overflow)",
    starter: "function reverseInteger(x) {\n  // your solution here\n}",
    referenceSolution:
      "function reverseInteger(x) {\n  const sign = Math.sign(x);\n  // Work with absolute value\n  let num = Math.abs(x);\n  let reversed = 0;\n  \n  while (num > 0) {\n    const digit = num % 10;\n    // Check for overflow before multiplying\n    // 2^31 - 1 = 2147483647, -2^31 = -2147483648\n    if (reversed > (Math.pow(2, 31) - 1 - digit) / 10) {\n      return 0;\n    }\n    reversed = reversed * 10 + digit;\n    num = Math.floor(num / 10);\n  }\n  \n  const result = sign * reversed;\n  // Final overflow check (though the loop check should suffice)\n  if (result < -Math.pow(2, 31) || result > Math.pow(2, 31) - 1) return 0;\n  return result;\n}",
    explanation:
      "We reverse the digits mathematically by repeatedly taking the last digit (`num % 10`) and building the reversed number (`reversed * 10 + digit`). Overflow is checked before multiplying: if `reversed > (MAX - digit) / 10`, then multiplying by 10 would overflow. We use `Math.sign` to preserve the sign. Time O(log₁₀ n).",
    hint: "Reverse mathematically using modulo and division. Check for 32‑bit overflow before each multiplication.",
  },
  {
    id: "palindrome-number",
    type: "implementation",
    topic: "Numbers",
    title: "Check if number is palindrome (without string)",
    prompt:
      "Determine whether an integer is a palindrome without converting it to a string. Negative numbers are not palindromes.\n\nExample:\nInput: 121 → true\nInput: -121 → false\nInput: 10 → false\nInput: 1221 → true",
    starter: "function isPalindromeNumber(x) {\n  // your solution here\n}",
    referenceSolution:
      "function isPalindromeNumber(x) {\n  // Negative numbers are not palindromes (the '-' sign makes them invalid)\n  if (x < 0) return false;\n  // Numbers ending with 0 cannot be palindromes unless the number is 0 itself\n  if (x !== 0 && x % 10 === 0) return false;\n  \n  let reversedHalf = 0;\n  let original = x;\n  // Build the reversed half of the number\n  while (original > reversedHalf) {\n    reversedHalf = reversedHalf * 10 + (original % 10);\n    original = Math.floor(original / 10);\n  }\n  \n  // For even length: original === reversedHalf\n  // For odd length: original === floor(reversedHalf/10) (middle digit can be ignored)\n  return original === reversedHalf || original === Math.floor(reversedHalf / 10);\n}",
    explanation:
      "We avoid full reversal and overflow by only reversing half the digits. While the original > reversed half, we keep transferring digits. At the end, if the original equals the reversed half (even digits) or equals floor(reversedHalf/10) (odd digits, the middle digit is ignored), it's a palindrome. Also, we handle the trivial case of numbers ending with 0 (except 0 itself) – they can't be palindromes because leading zeros are not allowed.",
    hint: "Reverse only half the number and compare. Check edge cases: negative numbers, numbers ending with 0.",
  },
  {
    id: "pow-implementation",
    type: "implementation",
    topic: "Numbers",
    title: "Implement pow(x, n) (exponentiation)",
    prompt:
      "Implement `pow(x, n)`, which calculates `x` raised to the power `n` (n is an integer). Handle negative exponents and optimize using exponentiation by squaring (O(log n)).\n\nExample:\nInput: x = 2.0, n = 10 → 1024.0\nInput: x = 2.0, n = -2 → 0.25\nInput: x = 0.00001, n = 2147483647 → 0.0 (handles large exponents efficiently)",
    starter: "function myPow(x, n) {\n  // your solution here\n}",
    referenceSolution:
      "function myPow(x, n) {\n  // Base case: any number to the power 0 is 1\n  if (n === 0) return 1;\n  \n  // If exponent is negative, compute reciprocal of positive exponent\n  if (n < 0) {\n    return 1 / myPow(x, -n);\n  }\n  \n  // Exponentiation by squaring (recursive)\n  // If n is even: x^n = (x^(n/2))^2\n  if (n % 2 === 0) {\n    const half = myPow(x, n / 2);\n    return half * half;\n  }\n  // If n is odd: x^n = x * x^(n-1)\n  else {\n    return x * myPow(x, n - 1);\n  }\n}",
    explanation:
      "We use recursion with exponentiation by squaring. For even n, we square the result of `pow(x, n/2)`. For odd n, we multiply by x and reduce n by 1. Negative exponents are handled by returning the reciprocal of the positive exponent. This reduces time complexity from O(n) to O(log n). Note: This implementation works for integer exponents but may overflow for very large n; in practice, iterative version is safer to avoid recursion depth issues.",
    hint: "Use recursion with exponentiation by squaring. Handle negative exponents and the even/odd cases.",
  },
  {
    id: "extract-emails",
    type: "implementation",
    topic: "RegExp",
    title: "Extract emails from text",
    prompt:
      "Write a function that extracts all email addresses from a string using a regular expression. Return an array of unique email addresses (order of first occurrence).\n\nExample:\nInput: 'Contact us at support@example.com or sales@example.co.uk.'\nOutput: ['support@example.com', 'sales@example.co.uk']\n\nInput: 'No emails here!'\nOutput: []",
    starter: "function extractEmails(text) {\n  // your solution here\n}",
    referenceSolution:
      "function extractEmails(text) {\n  // Regular expression for common email formats:\n  // - Local part: letters, digits, dots, underscores, percent, plus, hyphen\n  // - Domain: letters, digits, hyphens, dots (with at least one dot after the @)\n  // - TLD: at least 2 letters\n  // The 'g' flag finds all matches, 'i' makes it case-insensitive.\n  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;\n  const matches = text.match(emailRegex);\n  // Return deduplicated array using Set\n  return matches ? [...new Set(matches)] : [];\n}",
    explanation:
      "The regex matches a standard email pattern: local part, @, domain name, dot, and TLD (at least 2 letters). `match()` returns an array of all matches or null. We use a Set to deduplicate (in case the same email appears multiple times), then spread back to an array.",
    hint: "Use match() with a regex that captures emails, then deduplicate with Set.",
  },
  {
    id: "try-catch-wrapper",
    type: "implementation",
    topic: "Error Handling",
    title: "Try-catch wrapper",
    prompt:
      "Create a function `tryCatch(fn)` that wraps another function and catches any errors, returning a tuple `[error, result]`. If the function succeeds, error is `null` and result is the return value. If it throws, result is `null` and error is the caught error. This is similar to Go‑style error handling.\n\nExample:\nconst safeParse = tryCatch(JSON.parse);\nconst [err, data] = safeParse('{\"a\":1}');\nconsole.log(data); // { a: 1 }\nconst [err2, data2] = safeParse('invalid json');\nconsole.log(err2.message); // 'Unexpected token i...'",
    starter: "function tryCatch(fn) {\n  // your solution here\n}",
    referenceSolution:
      "function tryCatch(fn) {\n  // Return a new function that captures any error and returns [error, result]\n  return function (...args) {\n    try {\n      const result = fn(...args);\n      return [null, result];\n    } catch (error) {\n      return [error, null];\n    }\n  };\n}",
    explanation:
      "The wrapper returns a function that, when called, executes the original `fn` inside a try‑catch block. If successful, it returns `[null, result]`. If an error is thrown, it returns `[error, null]`. This pattern is useful for avoiding try‑catch bloat and for functional pipelines.",
    hint: "Use try-catch inside the returned function, returning a tuple.",
  },
  {
    id: "group-by",
    type: "implementation",
    topic: "Arrays",
    title: "Group objects by key",
    prompt:
      "Write a function `groupBy(list, key)` that groups an array of objects by a specified property `key`. The function returns an object where each key is the distinct property value, and the value is an array of objects having that property.\n\nExample:\nconst people = [\n  { name: 'Alice', age: 25 },\n  { name: 'Bob', age: 30 },\n  { name: 'Charlie', age: 25 }\n];\ngroupBy(people, 'age');\n// Output: { 25: [{name:'Alice',age:25}, {name:'Charlie',age:25}], 30: [{name:'Bob',age:30}] }",
    starter: "function groupBy(list, key) {\n  // your solution here\n}",
    referenceSolution:
      "function groupBy(list, key) {\n  // Use reduce to build the grouped object\n  return list.reduce((acc, item) => {\n    const groupKey = item[key]; // the value to group by\n    // If the group doesn't exist yet, create an empty array\n    if (!acc[groupKey]) {\n      acc[groupKey] = [];\n    }\n    // Add the current item to the appropriate group\n    acc[groupKey].push(item);\n    return acc;\n  }, {});\n\n  // Alternative using nullish coalescing assignment (ES2020)\n  // return list.reduce((acc, item) => {\n  //   const groupKey = item[key];\n  //   (acc[groupKey] ??= []).push(item);\n  //   return acc;\n  // }, {});\n}",
    explanation:
      "We reduce the array into an object. For each item, we extract the grouping key (value of the `key` property). If that key does not yet exist in the accumulator, we initialize it with an empty array. Then we push the current item into that array. This is a classic grouping utility.",
    hint: "Return an object whose values are arrays. Use reduce to build it.",
  },
  {
    id: "impl-map-polyfill",
    type: "implementation",
    topic: "Arrays",
    title: "Polyfill for Array.map",
    prompt:
      "Implement your own version of `Array.prototype.map`. It should work on any array, call the callback with `(element, index, array)`, and return a new array of the results.\n\nExample:\nconst doubled = customMap([1,2,3], x => x * 2);\nconsole.log(doubled); // [2,4,6]",
    starter: "function customMap(arr, callback) {\n  // your solution here\n}",
    referenceSolution:
      "function customMap(arr, callback) {\n  // Create a new array to hold the results\n  const result = [];\n  // Iterate over the original array\n  for (let i = 0; i < arr.length; i++) {\n    // Only process indices that exist (skip sparse holes)\n    if (i in arr) {\n      result.push(callback(arr[i], i, arr));\n    }\n  }\n  return result;\n}",
    explanation:
      "We manually loop over the array, for each index we check if the property exists (to mimic the behavior of `map` on sparse arrays). We call the callback with the element, index, and the original array, then push the returned value into the result array. The original array is not mutated.",
    hint: "Iterate over the array, apply callback to each element, and push the result into a new array.",
  },
  {
    id: "impl-filter-polyfill",
    type: "implementation",
    topic: "Arrays",
    title: "Polyfill for Array.filter",
    prompt:
      "Implement your own version of `Array.prototype.filter`. It should return a new array containing only elements for which the callback returns a truthy value.\n\nExample:\nconst evens = customFilter([1,2,3,4], x => x % 2 === 0);\nconsole.log(evens); // [2,4]",
    starter:
      "function customFilter(arr, callback) {\n  // your solution here\n}",
    referenceSolution:
      "function customFilter(arr, callback) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (i in arr) { // handle sparse arrays\n      const shouldKeep = callback(arr[i], i, arr);\n      if (shouldKeep) {\n        result.push(arr[i]);\n      }\n    }\n  }\n  return result;\n}",
    explanation:
      "Similar to `customMap`, we iterate over the array. For each element, we call the callback; if the callback returns a truthy value, we push the element to the result array. We check `i in arr` to correctly handle sparse arrays (holes are skipped, as in native filter).",
    hint: "Only include elements that pass the test.",
  },
  {
    id: "impl-reduce-polyfill",
    type: "implementation",
    topic: "Arrays",
    title: "Polyfill for Array.reduce",
    prompt:
      "Implement your own version of `Array.prototype.reduce`. It should take a callback `(accumulator, currentValue, index, array)` and an optional initial value. If no initial value is provided, the first element is used as the accumulator and iteration starts from the second element.\n\nExample:\nconst sum = customReduce([1,2,3], (acc, val) => acc + val, 0);\nconsole.log(sum); // 6\nconst product = customReduce([2,3,4], (acc, val) => acc * val);\nconsole.log(product); // 24 (2 * 3 * 4)",
    starter:
      "function customReduce(arr, callback, initialValue) {\n  // your solution here\n}",
    referenceSolution:
      "function customReduce(arr, callback, initialValue) {\n  // Determine accumulator and starting index\n  let accumulator;\n  let startIndex;\n  \n  if (initialValue !== undefined) {\n    accumulator = initialValue;\n    startIndex = 0;\n  } else {\n    // If no initial value, take first element as accumulator\n    // but if array is empty, throw TypeError (same as native reduce)\n    if (arr.length === 0) {\n      throw new TypeError('Reduce of empty array with no initial value');\n    }\n    // Find first existing index in sparse array\n    startIndex = 0;\n    while (!(startIndex in arr) && startIndex < arr.length) {\n      startIndex++;\n    }\n    if (startIndex >= arr.length) throw new TypeError('Reduce of empty array with no initial value');\n    accumulator = arr[startIndex];\n    startIndex++;\n  }\n  \n  // Iterate from startIndex to end\n  for (let i = startIndex; i < arr.length; i++) {\n    if (i in arr) { // skip holes\n      accumulator = callback(accumulator, arr[i], i, arr);\n    }\n  }\n  return accumulator;\n}",
    explanation:
      "We first handle the accumulator and start index based on whether `initialValue` is provided. If not, we take the first existing element as accumulator and start from the next index. Empty arrays with no initial value throw a TypeError. Then we iterate, skipping holes, and update the accumulator with the callback's return value. This mimics the native `reduce` behavior, including sparse array handling.",
    hint: "Set accumulator and start index based on presence of initialValue. Handle empty array error case.",
  },
  {
    id: "shallowEqual",
    type: "implementation",
    topic: "Objects",
    title: "Shallow equality (React style)",
    prompt:
      "Implement a shallow equality check commonly used in React (`React.memo`, `shouldComponentUpdate`). It compares two objects (or arrays) by reference equality for each of their own enumerable properties.\n\nExample:\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { a: 1, b: 2 };\nshallowEqual(obj1, obj2); // true (values are primitives)\n\nconst obj3 = { a: 1, b: { c: 2 } };\nconst obj4 = { a: 1, b: { c: 2 } };\nshallowEqual(obj3, obj4); // false (b is a different object reference)",
    starter: "function shallowEqual(objA, objB) {\n  // your solution here\n}",
    referenceSolution:
      "function shallowEqual(objA, objB) {\n  // Same reference -> equal\n  if (objA === objB) return true;\n  // If either is not an object (or null), they cannot be equal\n  if (!objA || !objB || typeof objA !== 'object' || typeof objB !== 'object') return false;\n  const keysA = Object.keys(objA);\n  const keysB = Object.keys(objB);\n  if (keysA.length !== keysB.length) return false;\n  for (const key of keysA) {\n    // Must check that key exists in objB (not just value comparison, because undefined might be a value)\n    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;\n    if (objA[key] !== objB[key]) return false;\n  }\n  return true;\n}",
    explanation:
      "Shallow equality only checks top‑level property values with `===`. It does not recursively compare nested objects. We first check reference equality, then ensure both are non‑null objects, then compare the number of own keys, then verify each key exists in the other object and that the values are strictly equal. This is O(n) where n is the number of properties.",
    hint: "Check that both have the same keys and values match using ===.",
  },
  {
    id: "getNestedValue",
    type: "implementation",
    topic: "Objects",
    title: "Safely get nested value (Lodash get)",
    prompt:
      "Write a function that retrieves a value from a nested object using a dot‑separated path. Return a default value if any part of the path is missing.\n\nExample:\nconst obj = { a: { b: { c: 42 } } };\nget(obj, 'a.b.c'); // 42\nget(obj, 'a.b.d', 'default'); // 'default'\nget(obj, 'a.x.c'); // undefined",
    starter:
      "function get(obj, path, defaultValue) {\n  // your solution here\n}",
    referenceSolution:
      "function get(obj, path, defaultValue = undefined) {\n  const keys = Array.isArray(path) ? path : path.split('.');\n  let current = obj;\n  for (const key of keys) {\n    if (current == null || typeof current !== 'object') {\n      return defaultValue;\n    }\n    current = current[key];\n  }\n  return current !== undefined ? current : defaultValue;\n}",
    explanation:
      "We split the path by dots into an array of keys. Then we traverse the object step by step: at each key, we check if the current value exists and is an object. If not, we return the default value. If we complete the loop, we return the final value (or default if it's undefined). This safely handles missing properties without throwing errors.",
    hint: "Use split('.') and a loop, checking for null/undefined at each step.",
  },
  {
    id: "deepMerge",
    type: "implementation",
    topic: "Objects",
    title: "Deep merge two objects (no mutation)",
    prompt:
      "Implement a deep merge function that recursively combines two objects, merging nested objects and overwriting primitive values with those from the source. Return a new object.\n\nExample:\nconst target = { a: 1, b: { x: 10, y: 20 } };\nconst source = { b: { y: 30, z: 40 }, c: 3 };\ndeepMerge(target, source);\n// → { a: 1, b: { x: 10, y: 30, z: 40 }, c: 3 }",
    starter:
      "function deepMerge(target, source) {\n  // your solution here\n}\n\nfunction isPlainObject(item) {\n  return item && typeof item === 'object' && !Array.isArray(item);\n}",
    referenceSolution:
      "function deepMerge(target, source) {\n  // Create a shallow copy of target\n  const output = { ...target };\n  for (const key in source) {\n    if (source.hasOwnProperty(key)) {\n      const targetVal = output[key];\n      const sourceVal = source[key];\n      // If both values are plain objects, merge recursively\n      if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {\n        output[key] = deepMerge(targetVal, sourceVal);\n      } else {\n        // Otherwise, overwrite with source value (including arrays)\n        output[key] = sourceVal;\n      }\n    }\n  }\n  return output;\n}\n\nfunction isPlainObject(item) {\n  return item && typeof item === 'object' && !Array.isArray(item);\n}",
    explanation:
      "We create a shallow copy of the target (to avoid mutation). For each key in the source, if both the target value and source value are plain objects, we recursively merge them. Otherwise, we directly assign the source value (overwriting). This merges nested objects while preserving non‑object values from the source. Arrays are not merged (they are overwritten, which is typical for deep merge utilities).",
    hint: "Check if both values are plain objects before recursing.",
  },
  {
    id: "reactive-object",
    type: "implementation",
    topic: "Proxy",
    title: "Create a reactive object with Proxy",
    prompt:
      "Use JavaScript `Proxy` to create a reactive object that logs whenever a property is read or set. This simulates a simple version of Vue's reactivity system.\n\nExample:\nconst obj = { a: 1, b: 2 };\nconst reactive = createReactive(obj);\nreactive.a; // logs 'Reading a'\nreactive.b = 3; // logs 'Setting b to 3'",
    starter: "function createReactive(obj) {\n  // return a reactive proxy\n}",
    referenceSolution:
      "function createReactive(obj) {\n  return new Proxy(obj, {\n    // Trap for property access (get)\n    get(target, prop, receiver) {\n      console.log(`Reading ${String(prop)}`);\n      // Use Reflect to get the property value (also handles getters, etc.)\n      return Reflect.get(target, prop, receiver);\n    },\n    // Trap for property assignment (set)\n    set(target, prop, value, receiver) {\n      console.log(`Setting ${String(prop)} to ${value}`);\n      // Use Reflect to perform the actual assignment\n      return Reflect.set(target, prop, value, receiver);\n    },\n    // Optional: trap for property deletion\n    deleteProperty(target, prop) {\n      console.log(`Deleting ${String(prop)}`);\n      return Reflect.deleteProperty(target, prop);\n    }\n  });\n}",
    explanation:
      "A `Proxy` allows us to intercept fundamental operations on an object. The `get` trap logs property reads, then returns the value using `Reflect.get`. The `set` trap logs assignments, then performs the assignment via `Reflect.set`. This is a minimal reactive example; full reactive systems also track dependencies and trigger updates.",
    hint: "Use Proxy traps (get and set) and Reflect to forward operations.",
  },
  {
    id: "event-emitter",
    type: "implementation",
    topic: "Objects",
    title: "Simple event emitter (with once)",
    prompt:
      "Extend the basic EventEmitter with a `once(event, callback)` method that listens to an event only once, then automatically unsubscribes.\n\nExample:\nconst emitter = new EventEmitter();\nemitter.once('click', () => console.log('Clicked'));\nemitter.emit('click'); // logs 'Clicked'\nemitter.emit('click'); // nothing (callback removed)",
    starter:
      "class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n  on(event, callback) {}\n  once(event, callback) {}\n  off(event, callback) {}\n  emit(event, ...args) {}\n}",
    referenceSolution:
      "class EventEmitter {\n  constructor() {\n    this.events = {};\n  }\n\n  on(event, callback) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(callback);\n    return () => this.off(event, callback); // optional: return unsubscribe\n  }\n\n  once(event, callback) {\n    // Wrap the callback so it unsubscribes after one call\n    const onceWrapper = (...args) => {\n      callback(...args);\n      this.off(event, onceWrapper);\n    };\n    // Store the wrapped callback so we can remove it later if needed\n    this.on(event, onceWrapper);\n  }\n\n  off(event, callback) {\n    if (!this.events[event]) return;\n    this.events[event] = this.events[event].filter(cb => cb !== callback);\n    if (this.events[event].length === 0) delete this.events[event];\n  }\n\n  emit(event, ...args) {\n    if (!this.events[event]) return;\n    for (const callback of this.events[event]) {\n      callback(...args);\n    }\n  }\n}",
    explanation:
      "The `once` method creates a wrapper function that first calls the original callback, then removes itself using `off`. The wrapper is passed to `on` so it gets added to the listener list. When the event is emitted, the wrapper executes, and after execution it unsubscribes, ensuring the callback fires only once.",
    hint: "Wrap the callback in a function that calls the original and then unsubscribes.",
  },
  {
    id: "pubSub",
    type: "implementation",
    topic: "Design Patterns",
    title: "Publish‑subscribe pattern (message bus)",
    prompt:
      "Implement a simple publish‑subscribe (pub‑sub) system with `subscribe(event, callback)`, `unsubscribe(event, callback)`, and `publish(event, data)` methods. This is similar to EventEmitter but decouples publishers from subscribers.\n\nExample:\nconst bus = new PubSub();\nconst unsubscribe = bus.subscribe('userLoggedIn', (user) => console.log(user));\nbus.publish('userLoggedIn', { name: 'Alice' }); // logs { name: 'Alice' }\nunsubscribe(); // removes the listener",
    starter:
      "class PubSub {\n  constructor() {\n    this.events = {};\n  }\n  subscribe(event, callback) {}\n  unsubscribe(event, callback) {}\n  publish(event, data) {}\n}",
    referenceSolution:
      "class PubSub {\n  constructor() {\n    this.events = {};\n  }\n\n  subscribe(event, callback) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(callback);\n    // Return an unsubscribe function for convenience\n    return () => this.unsubscribe(event, callback);\n  }\n\n  unsubscribe(event, callback) {\n    if (!this.events[event]) return;\n    this.events[event] = this.events[event].filter(cb => cb !== callback);\n    if (this.events[event].length === 0) delete this.events[event];\n  }\n\n  publish(event, data) {\n    if (!this.events[event]) return;\n    for (const callback of this.events[event]) {\n      callback(data);\n    }\n  }\n}",
    explanation:
      "The PubSub pattern allows loose coupling: publishers emit events without knowing which subscribers exist. We store subscribers by event name. `publish` calls all registered callbacks for an event with the provided data. `subscribe` returns an unsubscribe function, making it easy to remove a listener. This is foundational for many application architectures.",
    hint: "Store callbacks per event name; publish calls them with data.",
  },
];
