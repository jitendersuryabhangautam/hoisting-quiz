export const roadmapData = {
  metadata: {
    version: "2.0",
    generated: "2026-05-04",
    total_questions: 0,
    description:
      "Comprehensive AI Engineer curriculum with per‑concept practice questions",
  },
  tracks: {
    6: {
      title: "6‑Month Intensive",
      total_phases: 6,
      phases: [
        {
          id: "6_p1",
          title: "Python Foundations",
          weeks: "Weeks 1‑2",
          topics: [
            {
              name: "Variables, Data Types & Operators",
              concepts: [
                {
                  name: "Basic types & operations",
                  questions: [
                    "Write a program to swap two numbers without a temporary variable.",
                    "Demonstrate the difference between `==` and `is` in Python.",
                    "Convert a string to integer, float, and boolean – handle possible errors.",
                    "Find the memory size of different data types using `sys.getsizeof()`.",
                  ],
                },
                {
                  name: "Collections (list, tuple, set, dict)",
                  questions: [
                    "Flatten a nested list using both recursion and iteration.",
                    "Remove duplicates from a list while preserving the original order.",
                    "Merge two dictionaries (using Python 3.5+ and 3.9+ methods).",
                    "Use `itertools` to generate all unique permutations of a string.",
                  ],
                },
              ],
            },
            {
              name: "Control Flow & Functions",
              concepts: [
                {
                  name: "Conditionals and loops",
                  questions: [
                    "Print the first N Fibonacci numbers using both `for` and `while` loops.",
                    "Check if a number is prime; also find all prime numbers up to N.",
                    "Implement a simple calculator using `if‑elif‑else`.",
                    "Use a ternary operator to assign a value based on a condition.",
                  ],
                },
                {
                  name: "Functions & scope",
                  questions: [
                    "Write a function that accepts any number of arguments (`*args`, `**kwargs`).",
                    "Create a closure that counts how many times it has been called.",
                    "Explain and demonstrate the use of `global` and `nonlocal`.",
                    "Build a decorator that prints the execution time of a function.",
                  ],
                },
              ],
            },
            {
              name: "Error Handling & File I/O",
              concepts: [
                {
                  name: "Exceptions",
                  questions: [
                    "Write a safe division function that catches `ZeroDivisionError` and `TypeError`.",
                    "Create a custom exception `NegativeNumberError` and raise it when appropriate.",
                    "Use `try/except/else/finally` to read a file and ensure it is closed.",
                    "Implement a retry decorator that re‑executes a function up to 3 times on failure.",
                  ],
                },
                {
                  name: "File operations",
                  questions: [
                    "Read a large CSV file line by line without loading it entirely into memory.",
                    "Write a function that appends a line to a file and then reads the last line.",
                    "Use a context manager (`with`) to write JSON data to a file.",
                    "Copy a binary file in chunks of 4KB.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "6_p2",
          title: "Data Structures & Algorithms (Core)",
          weeks: "Weeks 3‑4",
          topics: [
            {
              name: "Arrays & Strings",
              concepts: [
                {
                  name: "Array operations",
                  questions: [
                    "Reverse an array in‑place (O(1) extra space).",
                    "Rotate an array to the right by k positions.",
                    "Find the missing number in an array containing numbers from 1 to n.",
                    "Implement a dynamic array (with resizing) from scratch.",
                  ],
                },
                {
                  name: "String algorithms",
                  questions: [
                    "Check if two strings are anagrams.",
                    "Find the first non‑repeating character in a string.",
                    "Implement `atoi` (string to integer conversion).",
                    "Longest substring without repeating characters (sliding window).",
                  ],
                },
              ],
            },
            {
              name: "Hash Tables",
              concepts: [
                {
                  name: "Hashing basics",
                  questions: [
                    "Implement a hash map with separate chaining.",
                    "Find the first duplicate element in an array using a hash set.",
                    "Group a list of strings into anagrams (using dict of tuple).",
                    "Design and implement an LRU cache (using `OrderedDict` or dict + list).",
                  ],
                },
              ],
            },
            {
              name: "Stacks & Queues",
              concepts: [
                {
                  name: "Stack",
                  questions: [
                    "Implement a stack using a Python list (with push, pop, peek, is_empty).",
                    "Validate parentheses: given a string containing (, ), {, }, [, ], check if it is valid.",
                    "Implement a min‑stack that returns the minimum element in O(1) time.",
                    "Evaluate a postfix expression using a stack.",
                  ],
                },
                {
                  name: "Queue / Deque",
                  questions: [
                    "Implement a queue using two stacks.",
                    "Implement a circular queue.",
                    "Use `collections.deque` to solve the sliding window maximum problem.",
                    "Implement a priority queue using a heap (use `heapq`).",
                  ],
                },
              ],
            },
            {
              name: "Recursion & Binary Search",
              concepts: [
                {
                  name: "Recursion basics",
                  questions: [
                    "Compute the factorial of a number using recursion.",
                    "Generate the nth Fibonacci number recursively (then memoize).",
                    "Implement a recursive function to traverse a nested list (depth‑first).",
                    "Write a recursive function to compute the sum of digits of a number.",
                  ],
                },
                {
                  name: "Binary search",
                  questions: [
                    "Classic binary search: find a target in a sorted array.",
                    "Find the first and last position of a target in a sorted array (leftmost/rightmost).",
                    "Search in a rotated sorted array (with unique elements).",
                    "Find the square root of an integer (floor) using binary search.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "6_p3",
          title: "Advanced Python & OOP",
          weeks: "Weeks 5‑6",
          topics: [
            {
              name: "Object‑Oriented Programming (Deep)",
              concepts: [
                {
                  name: "Classes, inheritance, polymorphism",
                  questions: [
                    "Define a `BankAccount` class with `deposit`, `withdraw`, and a `balance` property (use `@property`).",
                    "Create a class attribute `interest_rate` and a class method to update it.",
                    "Implement `__str__` and `__repr__` for a `Person` class.",
                    "Demonstrate method resolution order (MRO) with multiple inheritance (e.g., `A`, `B`, `C(A,B)`).",
                  ],
                },
                {
                  name: "Magic methods & descriptors",
                  questions: [
                    "Overload the `+` operator for a `Vector` class (implement `__add__`).",
                    "Make a class iterable by implementing `__iter__` and `__next__`.",
                    "Use `__slots__` in a class with many instances and compare memory usage.",
                    "Write a descriptor that validates an attribute to be a positive integer.",
                  ],
                },
              ],
            },
            {
              name: "Functional Programming & Decorators",
              concepts: [
                {
                  name: "Lambda, map, filter, reduce",
                  questions: [
                    "Use `map` to square every element in a list.",
                    "Filter a list of strings to keep only those with length > 3.",
                    "Compute the product of all numbers in a list using `reduce` from `functools`.",
                    "Convert a `for` loop that builds a dictionary into a dictionary comprehension.",
                  ],
                },
                {
                  name: "Decorators",
                  questions: [
                    "Write a decorator that caches the return value of a function (manual LRU).",
                    "Create a decorator with arguments, e.g., `@repeat(3)` that repeats a function.",
                    "Chain two decorators: one for logging and one for timing.",
                    "Use `functools.wraps` to preserve function metadata in a decorator.",
                  ],
                },
              ],
            },
            {
              name: "Generators, Iterators, Context Managers",
              concepts: [
                {
                  name: "Generators",
                  questions: [
                    "Write a generator that yields infinite Fibonacci numbers.",
                    "Use `yield from` to flatten a nested list generator.",
                    "Build a generator pipeline that reads a file, filters lines, and yields transformed data.",
                    "Create a custom iterator class that reads lines from a file one by one.",
                  ],
                },
                {
                  name: "Context managers",
                  questions: [
                    "Write a context manager using `__enter__` / `__exit__` to manage a file.",
                    "Use `contextlib.contextmanager` to create a database transaction manager.",
                    "Suppress specific exceptions using a context manager.",
                    "Implement a timer context manager that prints how long the block took.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "6_p4",
          title: "Math for ML & Classical ML",
          weeks: "Weeks 7‑8",
          topics: [
            {
              name: "Mathematics Foundations",
              concepts: [
                {
                  name: "Linear Algebra basics",
                  questions: [
                    "Multiply two matrices by hand and verify with NumPy.",
                    "Compute the dot product of two vectors using both a loop and NumPy.",
                    "Find the determinant and inverse of a 2x2 matrix.",
                    "Explain eigenvalues and eigenvectors geometrically; compute them for a 2x2 matrix.",
                  ],
                },
                {
                  name: "Calculus & Gradient",
                  questions: [
                    "Compute the gradient of the MSE loss function with respect to model weights.",
                    "Implement gradient descent from scratch for simple linear regression (one feature).",
                    "Explain the chain rule and apply it to backpropagation through a tiny neural network.",
                    "Use numerical differentiation to verify your gradient computation.",
                  ],
                },
              ],
            },
            {
              name: "Classical Machine Learning (Scikit‑learn)",
              concepts: [
                {
                  name: "Data preprocessing & split",
                  questions: [
                    "Handle missing values in a dataset using mean/median imputation (pandas + sklearn).",
                    "Standardise and normalise features – explain when each is appropriate.",
                    "Encode categorical variables using one‑hot encoding and label encoding.",
                    "Split data into train, validation, and test sets (e.g., 70/15/15).",
                  ],
                },
                {
                  name: "Supervised learning",
                  questions: [
                    "Implement linear regression with `sklearn.linear_model` and evaluate R², MSE.",
                    "Train a logistic regression classifier and plot the ROC curve.",
                    "Build a decision tree and prune it using `max_depth` and `min_samples_split`.",
                    "Train a random forest and compare its performance to a single decision tree.",
                  ],
                },
                {
                  name: "Model evaluation & tuning",
                  questions: [
                    "Compute confusion matrix, precision, recall, and F1‑score for a classifier.",
                    "Perform k‑fold cross‑validation and print average accuracy.",
                    "Use `GridSearchCV` to tune hyperparameters of an SVM.",
                    "Plot learning curves to diagnose overfitting / underfitting.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "6_p5",
          title: "Deep Learning & NLP Essentials",
          weeks: "Weeks 9‑10",
          topics: [
            {
              name: "PyTorch Fundamentals",
              concepts: [
                {
                  name: "Tensors & autograd",
                  questions: [
                    "Create tensors from lists and NumPy arrays; perform basic operations.",
                    "Compute gradient of y = x**2 with respect to x using `torch.autograd`.",
                    "Build a custom autograd Function (e.g., a simple ReLU).",
                    "Move tensors to GPU and back (if available).",
                  ],
                },
                {
                  name: "Neural network building blocks",
                  questions: [
                    "Implement a two‑layer neural network for MNIST classification.",
                    "Add dropout and batch normalisation layers; compare performance.",
                    "Use `nn.Module` to define a custom layer (e.g., a linear layer from scratch).",
                    "Implement a residual block and test it on a small dataset.",
                  ],
                },
                {
                  name: "Training loop & DataLoader",
                  questions: [
                    "Write a full training loop with mini‑batches, loss, and optimizer.",
                    "Use `torch.utils.data.Dataset` and `DataLoader` to load images.",
                    "Plot training and validation loss curves after each epoch.",
                    "Implement early stopping and model checkpointing (save best model).",
                  ],
                },
              ],
            },
            {
              name: "NLP & Transformers",
              concepts: [
                {
                  name: "Tokenization & embeddings",
                  questions: [
                    "Load a pretrained BERT tokenizer and tokenize a sentence.",
                    "Extract word embeddings from a pretrained model (e.g., GloVe or BERT).",
                    "Fine‑tune a small transformer (DistilBERT) for sentiment analysis.",
                    "Explain the attention mechanism and implement scaled dot‑product attention in NumPy.",
                  ],
                },
                {
                  name: "Using Hugging Face",
                  questions: [
                    "Load a pretrained pipeline for text classification or NER.",
                    "Fine‑tune a transformer model with `Trainer` API.",
                    "Save and reload a fine‑tuned model.",
                    "Use a model for inference on a CPU and GPU.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "6_p6",
          title: "LLMs, RAG & Deployment",
          weeks: "Weeks 11‑12",
          topics: [
            {
              name: "Prompt Engineering & LLM Basics",
              concepts: [
                {
                  name: "Prompt design",
                  questions: [
                    "Design a zero‑shot prompt that forces the output to be JSON.",
                    "Create a few‑shot prompt for a classification task (e.g., sentiment).",
                    "Use chain‑of‑thought prompting to solve a multi‑step reasoning problem.",
                    "Implement prompt versioning and tracking (e.g., using a simple JSON log).",
                  ],
                },
              ],
            },
            {
              name: "RAG (Retrieval Augmented Generation)",
              concepts: [
                {
                  name: "Building a RAG pipeline",
                  questions: [
                    "Chunk a PDF document with overlap and embed chunks using a sentence transformer.",
                    "Build a vector database with FAISS and implement similarity search.",
                    "Combine retrieval with an LLM (e.g., OpenAI or local) to answer questions with citations.",
                    "Add re‑ranking using a cross‑encoder to improve retrieval quality.",
                  ],
                },
                {
                  name: "Evaluation for RAG",
                  questions: [
                    "Compute recall@k for the retriever.",
                    "Use RAGAS metrics (faithfulness, answer relevance) to evaluate the RAG system.",
                    "Measure end‑to‑end latency and token usage.",
                    "Implement query transformation (e.g., HyDE) and compare results.",
                  ],
                },
              ],
            },
            {
              name: "Deployment & MLOps Basics",
              concepts: [
                {
                  name: "Model serving",
                  questions: [
                    "Create a FastAPI endpoint that loads a PyTorch model and returns predictions.",
                    "Containerise the FastAPI app with Docker (write a Dockerfile).",
                    "Use MLflow to log hyperparameters, metrics, and the model.",
                    "Write a GitHub Action that runs tests and builds the Docker image.",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    12: {
      title: "12‑Month Standard",
      total_phases: 8,
      phases: [
        {
          id: "12_p0",
          title: "Programming Foundations",
          weeks: "Months 1‑1.5",
          topics: [
            {
              name: "Python Fundamentals (Complete)",
              concepts: [
                {
                  name: "Variables, data types, operators",
                  questions: [
                    "Write a program to swap two numbers without a temporary variable.",
                    "Demonstrate the difference between `==` and `is` in Python.",
                    "Convert a string to integer, float, and boolean – handle errors.",
                    "Find the memory size of different data types using `sys.getsizeof()`.",
                    "Explain and demonstrate integer, float, string, bytes, and None types.",
                  ],
                },
                {
                  name: "Collections (list, tuple, set, dict)",
                  questions: [
                    "Flatten a nested list using recursion and iteration.",
                    "Remove duplicates from a list while preserving order.",
                    "Merge two dictionaries (using Python 3.5+ and 3.9+ methods).",
                    "Use `itertools` to generate all unique permutations of a string.",
                    "Implement a function that returns the intersection of two sets.",
                  ],
                },
                {
                  name: "Control flow & functions",
                  questions: [
                    "Print first N Fibonacci numbers using `for` and `while` loops.",
                    "Check if a number is prime; find all primes up to N using Sieve of Eratosthenes.",
                    "Implement a simple calculator with if‑elif‑else.",
                    "Use ternary operator to assign a value based on a condition.",
                    "Write a function that accepts any number of arguments (`*args`, `**kwargs`), sums numbers, and merges dicts.",
                  ],
                },
                {
                  name: "Error handling & file I/O",
                  questions: [
                    "Safe division: catch `ZeroDivisionError`, `TypeError`.",
                    "Create custom exception `NegativeNumberError` and raise it.",
                    "Use `try/except/else/finally` to read a file and close it properly.",
                    "Implement a retry decorator that tries a function up to 3 times.",
                    "Read a large CSV line‑by‑line without loading into memory.",
                  ],
                },
              ],
            },
            {
              name: "Version Control (Git)",
              concepts: [
                {
                  name: "Git basics & branching",
                  questions: [
                    "Initialize a Git repository, add a file, commit, and check status.",
                    "Create a branch, switch to it, make changes, and merge back to main.",
                    "Resolve a merge conflict (simulate two branches editing same line).",
                    "Use `git log --oneline --graph` to visualise commit history.",
                    "Squash the last 3 commits into one using interactive rebase.",
                  ],
                },
              ],
            },
            {
              name: "Virtual Environments & Dependencies",
              concepts: [
                {
                  name: "Environment management",
                  questions: [
                    "Create a virtual environment using `venv` and install a package.",
                    "Generate a `requirements.txt` and install from it.",
                    "Use `pip freeze` vs `pip list` – explain differences.",
                    "Set up `pyproject.toml` for a simple project.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "12_p1",
          title: "Data Structures & Algorithms (Core)",
          weeks: "Months 2‑3",
          topics: [
            {
              name: "Arrays & Strings",
              concepts: [
                {
                  name: "Array operations",
                  questions: [
                    "Reverse an array in‑place (O(1) extra space).",
                    "Rotate an array to the right by k positions.",
                    "Find the missing number in array [1..n].",
                    "Implement a dynamic array (resizing) from scratch.",
                    "Find the maximum product of two adjacent elements.",
                  ],
                },
                {
                  name: "String algorithms",
                  questions: [
                    "Check if two strings are anagrams.",
                    "Find the first non‑repeating character in a string.",
                    "Implement `atoi` (string to integer).",
                    "Longest substring without repeating characters (sliding window).",
                    "Check if a string is a palindrome (ignore non‑alphanumeric).",
                  ],
                },
                {
                  name: "Two‑pointer & sliding window",
                  questions: [
                    "Three‑sum problem (find all unique triplets summing to zero).",
                    "Container with most water.",
                    "Minimum window substring (hard).",
                    "Maximum sum subarray of size k.",
                    "Longest substring with at most K distinct characters.",
                  ],
                },
              ],
            },
            {
              name: "Linked Lists, Stacks, Queues",
              concepts: [
                {
                  name: "Singly & Doubly Linked Lists",
                  questions: [
                    "Implement linked list with insert, delete, search.",
                    "Reverse a linked list (iterative and recursive).",
                    "Detect cycle using Floyd’s algorithm.",
                    "Find intersection of two linked lists.",
                    "Implement a doubly linked list with `prev` pointer.",
                  ],
                },
                {
                  name: "Stacks & Queues",
                  questions: [
                    "Implement a stack using array (with resizing).",
                    "Valid parentheses (with multiple bracket types).",
                    "Min‑stack that returns minimum in O(1).",
                    "Evaluate postfix expression.",
                    "Implement queue using two stacks (amortized O(1)).",
                  ],
                },
              ],
            },
            {
              name: "Hash Tables & Heaps",
              concepts: [
                {
                  name: "Hash tables",
                  questions: [
                    "Implement a hash map with separate chaining.",
                    "Find first duplicate in array.",
                    "Group anagrams together.",
                    "Design LRU cache using `OrderedDict` or dict + list.",
                    "Two‑sum problem (return indices).",
                  ],
                },
                {
                  name: "Heaps (Priority Queues)",
                  questions: [
                    "Implement a min‑heap (heapify, push, pop).",
                    "Merge k sorted lists using heap.",
                    "Find median from data stream (two heaps).",
                    "Top K frequent elements.",
                    "K closest points to origin.",
                  ],
                },
              ],
            },
            {
              name: "Trees & Binary Search Trees",
              concepts: [
                {
                  name: "Binary tree basics",
                  questions: [
                    "Inorder, preorder, postorder traversal (recursive and iterative).",
                    "Maximum depth of binary tree.",
                    "Invert binary tree.",
                    "Lowest common ancestor (binary tree, no parent pointer).",
                  ],
                },
                {
                  name: "Binary Search Tree",
                  questions: [
                    "Implement BST insert, delete, search.",
                    "Validate if a tree is a BST (using inorder or bounds).",
                    "Find kth smallest element in BST.",
                    "Convert sorted array to balanced BST.",
                    "Find the closest value in BST to a target.",
                  ],
                },
              ],
            },
            {
              name: "Sorting & Binary Search",
              concepts: [
                {
                  name: "Sorting algorithms",
                  questions: [
                    "Implement quicksort (in‑place).",
                    "Implement merge sort.",
                    "Implement counting sort (small integer range).",
                    "Implement heap sort.",
                  ],
                },
                {
                  name: "Binary search variants",
                  questions: [
                    "Classic binary search.",
                    "Find first and last position of target.",
                    "Search in rotated sorted array.",
                    "Find square root (integer) with binary search.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "12_p2",
          title: "Mathematics & Statistics for ML",
          weeks: "Month 4",
          topics: [
            {
              name: "Linear Algebra",
              concepts: [
                {
                  name: "Vectors & matrices",
                  questions: [
                    "Multiply two matrices by hand and with NumPy.",
                    "Compute dot product of two vectors (loop and NumPy).",
                    "Find determinant and inverse of a 2x2 matrix.",
                    "Compute eigenvalues and eigenvectors of a 2x2 matrix manually and using NumPy.",
                    "Perform SVD on a matrix and interpret singular values.",
                  ],
                },
              ],
            },
            {
              name: "Calculus & Optimization",
              concepts: [
                {
                  name: "Derivatives & gradients",
                  questions: [
                    "Compute gradient of MSE loss w.r.t. weights.",
                    "Implement gradient descent from scratch for linear regression (one feature).",
                    "Explain the chain rule with a simple neural network example.",
                    "Find the Hessian matrix of a simple quadratic loss.",
                    "Implement stochastic gradient descent and compare to batch GD.",
                  ],
                },
              ],
            },
            {
              name: "Probability & Statistics",
              concepts: [
                {
                  name: "Probability basics",
                  questions: [
                    "Compute mean, variance, standard deviation of a dataset.",
                    "Apply Bayes’ theorem to a spam detection problem.",
                    "Generate and plot a normal distribution using NumPy/Matplotlib.",
                    "Explain the central limit theorem with an example.",
                    "Perform a hypothesis test (t‑test) on two samples.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "12_p3",
          title: "Databases & Backend Development",
          weeks: "Months 5‑6",
          topics: [
            {
              name: "SQL & Relational Databases",
              concepts: [
                {
                  name: "Basic SQL queries",
                  questions: [
                    "Write a query to find employees with salary > company average.",
                    "Second highest salary using `LIMIT` and `OFFSET`.",
                    "Join three tables (customers, orders, products) to show order details.",
                    "Group by with `HAVING`: find customers with more than 5 orders.",
                    "Use `DISTINCT`, `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.",
                  ],
                },
                {
                  name: "Advanced SQL",
                  questions: [
                    "Window functions: `ROW_NUMBER`, `RANK`, `DENSE_RANK` over partitions.",
                    "Running total of sales over time using `SUM(...) OVER (ORDER BY date)`.",
                    "Lag/Lead to compare current row with previous month.",
                    "Recursive CTE to generate a date series or traverse a hierarchy (org chart).",
                    "Use `EXPLAIN` to diagnose slow query and add an index.",
                  ],
                },
              ],
            },
            {
              name: "Database Design & Normalization",
              concepts: [
                {
                  name: "Normal forms",
                  questions: [
                    "Identify functional dependencies and normalize to 3NF.",
                    "Given a denormalised table (e.g., `order_product` with denormalised product names), propose a normalised schema.",
                    "When would you denormalise? Provide a real‑world example.",
                    "Explain primary key, foreign key, and unique constraints.",
                  ],
                },
              ],
            },
            {
              name: "API Design (REST)",
              concepts: [
                {
                  name: "REST principles & CRUD",
                  questions: [
                    "Design a REST API for a task manager (create, read, update, delete).",
                    "Correct HTTP methods and status codes for each operation.",
                    "Implement pagination (page, limit) and filtering.",
                    "Version your API – URL path vs custom header – pros and cons.",
                    "Return consistent error JSON (error code, message, timestamp).",
                  ],
                },
                {
                  name: "Authentication & Authorization",
                  questions: [
                    "Implement JWT authentication: login returns token, protected route validates token.",
                    "Add refresh token rotation.",
                    "Basic OAuth 2.0 flow (e.g., login with Google).",
                    "Role‑based access control (RBAC) middleware (admin vs user).",
                  ],
                },
              ],
            },
            {
              name: "FastAPI (Minimal Backend)",
              concepts: [
                {
                  name: "Building endpoints",
                  questions: [
                    "Create a FastAPI app with a GET endpoint that returns { 'message': 'Hello World' }.",
                    "Add a POST endpoint that accepts JSON and returns a processed result.",
                    "Use Pydantic models for request/response validation.",
                    "Add dependency injection for database session.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "12_p4",
          title: "Classical Machine Learning (Scikit‑learn)",
          weeks: "Months 7‑8",
          topics: [
            {
              name: "Supervised Learning",
              concepts: [
                {
                  name: "Regression & classification",
                  questions: [
                    "Implement linear regression; evaluate R², MSE, MAE.",
                    "Train logistic regression; plot ROC curve and compute AUC.",
                    "Build a decision tree; tune `max_depth`, `min_samples_split`.",
                    "Random Forest: train, compare with single tree, and plot feature importances.",
                    "Support Vector Machine with RBF kernel; tune C and gamma.",
                  ],
                },
                {
                  name: "Unsupervised Learning",
                  questions: [
                    "K‑means clustering: find optimal k using elbow method and silhouette score.",
                    "Perform PCA; reduce dimensionality to keep 95% variance and visualise.",
                    "DBSCAN on spatial data; interpret clusters.",
                    "Hierarchical clustering; plot a dendrogram.",
                  ],
                },
              ],
            },
            {
              name: "Model Evaluation & Tuning",
              concepts: [
                {
                  name: "Metrics & validation",
                  questions: [
                    "Compute confusion matrix, precision, recall, F1‑score.",
                    "Perform k‑fold cross‑validation (e.g., 5‑fold) and report average accuracy.",
                    "Use GridSearchCV or RandomizedSearchCV for hyperparameter tuning.",
                    "Plot learning curves and validation curves to diagnose over/underfitting.",
                  ],
                },
              ],
            },
            {
              name: "Ensemble Methods",
              concepts: [
                {
                  name: "Bagging, boosting, stacking",
                  questions: [
                    "Implement bagging manually (bootstrap aggregation).",
                    "Train XGBoost classifier with early stopping and plot feature importance.",
                    "Stacking: combine three models (e.g., RF, SVM, logistic) with a meta‑learner.",
                    "Compare AdaBoost vs Gradient Boosting on a classification dataset.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "12_p5",
          title: "Deep Learning & Neural Networks",
          weeks: "Months 9‑10",
          topics: [
            {
              name: "PyTorch Advanced",
              concepts: [
                {
                  name: "Custom layers & training",
                  questions: [
                    "Implement a custom `nn.Module` (e.g., a linear layer from scratch).",
                    "Use `torch.utils.data.Dataset` to load images from a folder.",
                    "Write a training loop with mini‑batches, loss, optimizer, and metrics.",
                    "Plot training vs validation loss curves after each epoch.",
                    "Implement early stopping and model checkpointing (save best model).",
                  ],
                },
                {
                  name: "CNNs & transfer learning",
                  questions: [
                    "Build a CNN for CIFAR‑10 (two conv + pooling + fc).",
                    "Add dropout and batch norm, compare performance.",
                    "Use `torchvision` transforms (RandomHorizontalFlip, Normalize) for augmentation.",
                    "Fine‑tune a pretrained ResNet18 on a custom dataset (e.g., flowers).",
                    "Freeze early layers and only train the classifier, then unfreeze and fine‑tune.",
                  ],
                },
              ],
            },
            {
              name: "RNNs & Sequence Models",
              concepts: [
                {
                  name: "LSTM for NLP",
                  questions: [
                    "Implement an LSTM for sentiment analysis on IMDb reviews.",
                    "Generate text character‑by‑character using an RNN (train on Shakespeare).",
                    "Use `pack_padded_sequence` for variable‑length sequences.",
                    "Build a bidirectional LSTM for named entity recognition (CoNLL).",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "12_p6",
          title: "NLP & Large Language Models",
          weeks: "Month 11",
          topics: [
            {
              name: "Tokenization & Embeddings",
              concepts: [
                {
                  name: "Tokenizers and vectors",
                  questions: [
                    "Train a Byte‑Pair Encoding (BPE) tokenizer on a text corpus using Hugging Face.",
                    "Load pretrained GloVe embeddings and find nearest neighbours for a word.",
                    "Implement a simple word2vec (skip‑gram) from scratch on a small corpus.",
                    "Extract sentence embeddings from BERT (mean pooling of last hidden states).",
                    "Compare word2vec, GloVe, and BERT embeddings on a similarity task.",
                  ],
                },
              ],
            },
            {
              name: "Transformers & Fine‑tuning",
              concepts: [
                {
                  name: "Hugging Face ecosystem",
                  questions: [
                    "Load a pretrained BERT model and fine‑tune it for text classification with `Trainer`.",
                    "Use LoRA (PEFT) to fine‑tune GPT‑2 for story generation on a consumer GPU.",
                    "Evaluate fine‑tuned model with perplexity and ROUGE/BLEU.",
                    "Implement scaled dot‑product attention from scratch using NumPy or PyTorch.",
                    "Use a pretrained pipeline for question answering (e.g., DistilBERT).",
                  ],
                },
              ],
            },
            {
              name: "Prompt Engineering & LLM basics",
              concepts: [
                {
                  name: "Prompt design",
                  questions: [
                    "Design a zero‑shot prompt that forces JSON output with fields: sentiment, keywords.",
                    "Create a few‑shot prompt for a classification task (e.g., email intent).",
                    "Use chain‑of‑thought prompting to solve a math word problem.",
                    "Implement prompt versioning and tracking (e.g., store prompts in a JSON file).",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "12_p7",
          title: "Production & Deployment",
          weeks: "Month 12",
          topics: [
            {
              name: "Model Serving & Containerization",
              concepts: [
                {
                  name: "FastAPI + Docker",
                  questions: [
                    "Create a FastAPI endpoint that loads a PyTorch model and returns predictions.",
                    "Write a Dockerfile that installs dependencies, copies code, and runs the API.",
                    "Use Docker Compose to run the API alongside a Redis cache.",
                    "Optimise Docker image size (multi‑stage build, slim base image).",
                  ],
                },
              ],
            },
            {
              name: "Experiment Tracking & Model Registry",
              concepts: [
                {
                  name: "MLflow basics",
                  questions: [
                    "Log hyperparameters, metrics, and the model using MLflow in a training script.",
                    "Compare two runs in the MLflow UI and select the best model.",
                    "Register a model to the MLflow Model Registry and transition stages (Staging, Production).",
                  ],
                },
              ],
            },
            {
              name: "CI/CD for ML",
              concepts: [
                {
                  name: "GitHub Actions",
                  questions: [
                    "Write a GitHub Action that runs unit tests (pytest) on every push.",
                    "Add a step to lint with `flake8` and format with `black` (check only).",
                    "Create a workflow that builds a Docker image and pushes to Docker Hub.",
                    "Trigger model retraining when data changes (e.g., using DVC or a schedule).",
                  ],
                },
              ],
            },
            {
              name: "Basic Monitoring",
              concepts: [
                {
                  name: "Prometheus & Grafana",
                  questions: [
                    "Instrument a FastAPI app to expose Prometheus metrics (request count, latency).",
                    "Set up a local Prometheus server to scrape metrics.",
                    "Create a Grafana dashboard with panels for request rate and error rate.",
                    "Add a custom metric for model confidence (e.g., softmax max probability).",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    18: {
      title: "18‑Month Comprehensive",
      total_phases: 7,
      phases: [
        {
          id: "18_p1",
          title: "Foundations (Python, DS&A, Math)",
          weeks: "Months 1‑3",
          topics: [
            {
              name: "Python Mastery (All Levels)",
              concepts: [
                {
                  name: "Advanced OOP & metaclasses",
                  questions: [
                    "Implement a singleton pattern using a metaclass.",
                    "Write a descriptor that validates an attribute is a positive integer.",
                    "Use `__slots__` in a class with 1 million instances and measure memory reduction.",
                    "Create a metaclass that automatically adds a `created_at` timestamp to every instance.",
                    "Implement a custom `__getattr__` and `__setattr__` for attribute proxying.",
                  ],
                },
                {
                  name: "Decorators & context managers (advanced)",
                  questions: [
                    "Write a decorator with arguments that retries a function (exponential backoff).",
                    "Create a context manager for database transactions (commit on success, rollback on error).",
                    "Use `contextlib.contextmanager` to temporarily change the current working directory.",
                    "Chain multiple decorators and preserve metadata with `functools.wraps`.",
                  ],
                },
                {
                  name: "Concurrency (threading, multiprocessing, asyncio)",
                  questions: [
                    "Download 100 URLs concurrently using `asyncio` and `aiohttp`; measure total time.",
                    "Use `multiprocessing.Pool` to compute squares of a large list (CPU‑bound).",
                    "Implement producer‑consumer using `queue.Queue` and threading with a lock.",
                    "Compare performance of asyncio vs threading for I/O‑bound tasks.",
                    "Write an async generator that yields data from a paginated API.",
                  ],
                },
              ],
            },
            {
              name: "Data Structures (Deep Dive)",
              concepts: [
                {
                  name: "Advanced trees & tries",
                  questions: [
                    "Implement an AVL tree with rotations (left, right, left‑right, right‑left).",
                    "Build a Red‑Black tree (insertion only) and verify its properties.",
                    "Implement a trie with prefix search, delete, and auto‑complete suggestions.",
                    "Segment tree for range sum queries with point updates.",
                  ],
                },
                {
                  name: "Graph algorithms",
                  questions: [
                    "Implement Dijkstra’s algorithm using a heap; return distances and paths.",
                    "Detect cycles in a directed graph using DFS (three‑state coloring).",
                    "Topological sort using Kahn’s algorithm (BFS) and DFS.",
                    "Find strongly connected components using Kosaraju’s algorithm.",
                    "Implement Kruskal’s minimum spanning tree with union‑find (disjoint set).",
                  ],
                },
                {
                  name: "Dynamic Programming",
                  questions: [
                    "0/1 knapsack – generate the selected items in addition to max value.",
                    "Longest common subsequence – print the actual subsequence.",
                    "Edit distance – print the sequence of operations (insert, delete, replace).",
                    "Matrix chain multiplication – find optimal parenthesization.",
                    "DP with bitmask: travelling salesman problem (small number of cities).",
                  ],
                },
              ],
            },
            {
              name: "Mathematics Bootcamp",
              concepts: [
                {
                  name: "Linear algebra (advanced)",
                  questions: [
                    "Compute SVD of a matrix by hand (2x2) and interpret U, Σ, V^T.",
                    "Prove that eigenvectors of a symmetric matrix are orthogonal.",
                    "Implement PCA from scratch using SVD and apply to a high‑dim dataset.",
                    "Compute the pseudoinverse of a non‑square matrix.",
                  ],
                },
                {
                  name: "Probability & information theory",
                  questions: [
                    "Derive maximum likelihood estimate (MLE) for Gaussian distribution.",
                    "Compute Kullback‑Leibler divergence between two normal distributions.",
                    "Implement Monte Carlo simulation to estimate π.",
                    "Explain the central limit theorem with a simulation.",
                    "Calculate entropy of a discrete probability distribution.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "18_p2",
          title: "Classical ML & Feature Engineering",
          weeks: "Month 4",
          topics: [
            {
              name: "From‑scratch implementations",
              concepts: [
                {
                  name: "Algorithms from scratch (no sklearn)",
                  questions: [
                    "Implement k‑means clustering from scratch (initialisation, assignment, update).",
                    "Build a decision tree classifier with Gini impurity and pruning.",
                    "Write AdaBoost from scratch (weighted decision stumps).",
                    "Implement a simple neural network with one hidden layer using only NumPy.",
                    "Code linear regression using the normal equation and also gradient descent.",
                  ],
                },
              ],
            },
            {
              name: "Feature Engineering & Pipelines",
              concepts: [
                {
                  name: "Real‑world preprocessing",
                  questions: [
                    "Create a preprocessing pipeline that imputes missing values, scales, and selects features.",
                    "Use feature selection methods (mutual information, recursive elimination) and compare.",
                    "Generate polynomial features and evaluate trade‑off (more features vs overfitting).",
                    "Handle high cardinality categorical features with target encoding.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "18_p3",
          title: "Deep Learning Specialisation",
          weeks: "Months 5‑7",
          topics: [
            {
              name: "Advanced PyTorch & Optimisation",
              concepts: [
                {
                  name: "Performance & customisation",
                  questions: [
                    "Implement batch normalisation and layer normalisation from scratch in PyTorch.",
                    "Use mixed‑precision training with `torch.cuda.amp` and measure speedup.",
                    "Profile GPU memory with `torch.cuda.memory_summary()` and optimise.",
                    "Implement a custom training loop with gradient clipping, learning rate scheduler (cosine annealing).",
                    "Use `torch.jit.script` to compile a model and compare inference speed.",
                  ],
                },
              ],
            },
            {
              name: "Generative Models",
              concepts: [
                {
                  name: "VAE, GAN, Diffusion",
                  questions: [
                    "Implement a Variational Autoencoder (VAE) on the MNIST dataset.",
                    "Train a DCGAN to generate images (e.g., CelebA or CIFAR‑10).",
                    "Use a pretrained Stable Diffusion model for text‑to‑image inpainting.",
                    "Implement a simple Denoising Diffusion Probabilistic Model (DDPM) on low‑resolution images.",
                  ],
                },
              ],
            },
            {
              name: "Computer Vision (Optional but deep)",
              concepts: [
                {
                  name: "Object detection & segmentation",
                  questions: [
                    "Fine‑tune a YOLOv8 model on a custom object detection dataset.",
                    "Implement a U‑Net from scratch for semantic segmentation.",
                    "Use a pretrained Mask R‑CNN for instance segmentation on a few images.",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "18_p4",
          title: "LLMs, RAG & Agents",
          weeks: "Months 8‑10",
          topics: [
            {
              name: "Transformer Internals",
              concepts: [
                {
                  name: "Attention & pre‑training",
                  questions: [
                    "Implement scaled dot‑product attention from scratch (NumPy/PyTorch).",
                    "Implement multi‑head attention manually, then compare with `nn.MultiheadAttention`.",
                    "Write a simple decoder‑only transformer (GPT‑like) and train it on a small text corpus.",
                    "Explain and implement KV caching for autoregressive generation.",
                    "Load a 7B parameter model (e.g., Llama 2) and use `accelerate` for CPU/GPU offloading.",
                  ],
                },
                {
                  name: "Fine‑tuning (PEFT, QLoRA)",
                  questions: [
                    "Fine‑tune Llama 2 7B with LoRA on a custom instruction dataset using `peft`.",
                    "Use QLoRA (4‑bit quantisation) to fit a larger model on a single GPU.",
                    "Compare full fine‑tuning vs LoRA in terms of memory and downstream accuracy.",
                    "Evaluate fine‑tuned model on a held‑out set (ROUGE, BLEU, or custom metrics).",
                  ],
                },
              ],
            },
            {
              name: "Advanced RAG",
              concepts: [
                {
                  name: "Hybrid search & reranking",
                  questions: [
                    "Implement hybrid search combining BM25 (sparse) with dense vector retrieval.",
                    "Add a cross‑encoder re‑ranking stage to improve final answer accuracy.",
                    "Chunk documents with overlap and use semantic splitting (by sentences).",
                    "Implement query transformation: HyDE (hypothetical document embedding) and query rewriting.",
                  ],
                },
                {
                  name: "RAG Evaluation",
                  questions: [
                    "Compute retrieval metrics: recall@k, MMR.",
                    "Use RAGAS to evaluate faithfulness, answer relevance, and context relevance.",
                    "Build a small evaluation set with human‑annotated answers and run automated metrics.",
                  ],
                },
              ],
            },
            {
              name: "Agentic Workflows",
              concepts: [
                {
                  name: "ReAct agents & tools",
                  questions: [
                    "Build a ReAct agent with tools: search, calculator, and code executor.",
                    "Add conversation memory (buffer) to the agent.",
                    "Implement a multi‑agent system where two agents debate and then vote.",
                    "Add guardrails: input filtering (block harmful queries), output validation (JSON schema).",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "18_p5",
          title: "Production AI Systems",
          weeks: "Months 11‑13",
          topics: [
            {
              name: "Scalable Model Serving",
              concepts: [
                {
                  name: "High‑performance inference",
                  questions: [
                    "Serve an LLM (e.g., Llama 2 7B) using vLLM and compare throughput to Hugging Face pipelines.",
                    "Write a FastAPI endpoint that accepts a prompt, batches multiple requests, and returns generations.",
                    "Implement model caching with Redis: cache exact‑match prompts for 1 hour.",
                    "Deploy a PyTorch model on Kubernetes with horizontal pod autoscaling (HPA) based on CPU usage.",
                    "Optimise inference with TensorRT or ONNX Runtime; measure latency improvement.",
                  ],
                },
                {
                  name: "Model registry & versioning",
                  questions: [
                    "Set up MLflow model registry with staging and production stages.",
                    "Implement a CI/CD pipeline that promotes a model from staging to production only when tests pass.",
                    "Use DVC to version a large dataset and the model weights; track changes in Git.",
                  ],
                },
              ],
            },
            {
              name: "ML Pipelines & Orchestration",
              concepts: [
                {
                  name: "Data & feature pipelines",
                  questions: [
                    "Build a data pipeline with Apache Airflow or Prefect: extract, transform, load (ETL) daily.",
                    "Create a feature store (using Feast or custom) that serves features for training and inference.",
                    "Implement a real‑time feature pipeline using Kafka and Bytewax (stream processing).",
                  ],
                },
              ],
            },
            {
              name: "Monitoring & Observability",
              concepts: [
                {
                  name: "Model & data drift",
                  questions: [
                    "Use Evidently AI to detect data drift between training and production data.",
                    "Set up Prometheus to collect custom metrics: prediction count, average confidence, latency per endpoint.",
                    "Create a Grafana dashboard with alerts when accuracy drops below 70% or drift exceeds threshold.",
                    "Implement structured logging (JSON logs) with request IDs; send them to a logging service (e.g., Loki).",
                    "Add distributed tracing with Jaeger to debug slow RAG pipelines (retrieval vs generation).",
                  ],
                },
              ],
            },
            {
              name: "Security for ML Systems",
              concepts: [
                {
                  name: "Adversarial & privacy",
                  questions: [
                    "Explain how a model poisoning attack works and how to mitigate it (data validation, outlier detection).",
                    "Implement differential privacy using PyTorch Opacus to train a model with privacy guarantees.",
                    "Use federated learning with Flower to train a model across multiple clients without sharing raw data.",
                    "Redact sensitive information (PII) from prompts before sending to LLM (using spaCy or custom regex).",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "18_p6",
          title: "System Design & Architecture",
          weeks: "Months 14‑16",
          topics: [
            {
              name: "Designing AI Systems at Scale",
              concepts: [
                {
                  name: "Recommendation system",
                  questions: [
                    "Design a personalised news recommender for 10 million users with real‑time updates.",
                    "Choose and justify between collaborative filtering, two‑tower neural model, or LLM‑based.",
                    "How do you handle cold start for new users or new articles?",
                    "Estimate storage for user embeddings (10M × 100 dims × 4 bytes) and compute cost for serving.",
                  ],
                },
                {
                  name: "Large‑scale RAG",
                  questions: [
                    "Design a RAG system that ingests 1 million PDF documents per day.",
                    "Architect hybrid search (BM25 + vector) with index sharding across multiple nodes.",
                    "How to keep the index fresh when documents are updated (real‑time vs hourly batch)?",
                    "Estimate query latency (retrieval + generation) and optimise for < 2 seconds.",
                  ],
                },
                {
                  name: "Real‑time inference platform",
                  questions: [
                    "Design a model serving platform that supports canary, shadow, and A/B testing.",
                    "How to autoscale inference pods based on queue length and target latency (e.g., SLO = 100ms).",
                    "Discuss tradeoffs: batch vs real‑time, GPU vs CPU, on‑prem vs cloud.",
                    "Calculate cost per 1 million requests for a 7B parameter model (cloud provider pricing).",
                  ],
                },
                {
                  name: "Multi‑modal search (text + image)",
                  questions: [
                    "Design a system that accepts an image or text and returns similar products (e.g., search).",
                    "Use CLIP embeddings for both modalities; index with vector DB (e.g., Milvus).",
                    "How to handle scaling to 100 million items? (sharding, quantisation).",
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "18_p7",
          title: "Interview Prep & Portfolio",
          weeks: "Months 17‑18",
          topics: [
            {
              name: "Behavioural & Technical Interviews",
              concepts: [
                {
                  name: "Behavioural (STAR method)",
                  questions: [
                    "Tell me about a time you resolved a technical disagreement within a team.",
                    "Describe a project where you had to learn a new technology or library quickly.",
                    "How do you handle missing a deadline? Give a specific example.",
                    "Provide an example of showing leadership without formal authority.",
                    "Describe a time when you made a mistake in production; how did you recover?",
                  ],
                },
                {
                  name: "ML System Design (mock)",
                  questions: [
                    "Design YouTube’s recommendation feed (1 billion users, real‑time).",
                    "Design a fraud detection system for credit card transactions (sub‑50ms latency).",
                    "Design an LLM‑powered customer support bot that can call external APIs (e.g., refund, order status).",
                    "Design a feature store for a ride‑hailing company (Latency < 10ms, freshness < 1 minute).",
                  ],
                },
                {
                  name: "LeetCode & ML concepts",
                  questions: [
                    "Solve 30 medium/hard LeetCode problems (focus on graphs, DP, strings).",
                    "Explain the bias‑variance tradeoff and how you detect it in learning curves.",
                    "Derive the gradient for cross‑entropy loss with softmax.",
                    "What is the difference between batch norm and layer norm? When to use each?",
                    "Explain the attention mechanism and why it is effective for long sequences.",
                  ],
                },
              ],
            },
            {
              name: "Portfolio Building",
              concepts: [
                {
                  name: "Production‑grade projects",
                  questions: [
                    "Build an end‑to‑end RAG assistant (e.g., PDF question answering) with FastAPI, Docker, and a frontend (Streamlit).",
                    "Write a detailed case study for each project: problem statement, architecture, metrics, tradeoffs, cost.",
                    "Deploy the project on a free tier (Render, Hugging Face Spaces, or AWS free tier) and include a live demo link.",
                    "Contribute to an open‑source ML project (e.g., LangChain, Transformers, or a RAG framework) with a meaningful PR.",
                    "Create a public GitHub repository with clean code, tests, CI/CD, and thorough documentation.",
                  ],
                },
              ],
            },
            {
              name: "Career Preparation",
              concepts: [
                {
                  name: "Resume & networking",
                  questions: [
                    "Tailor your resume for an AI Engineer role: highlight projects with quantifiable impact.",
                    "Write a LinkedIn profile summary that reflects your roadmap completion.",
                    "Prepare a 2‑minute elevator pitch explaining your transition from fullstack to AI.",
                    "Mock interview with a peer (record yourself) and iterate based on feedback.",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
