// Quiz Application State
class QuizApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentTopic = null;
        this.currentMode = null;
        this.quizState = {
            questions: [],
            currentQuestionIndex: 0,
            answers: [],
            score: 0,
            timer: null,
            timeLeft: 30,
            isTimedQuiz: true
        };
        this.userProgress = {
            totalScore: 0,
            questionsCompleted: 0,
            factsLearned: 0,
            topicProgress: {},
            bookmarkedQuestions: [],
            learnedFacts: {},
            theme: 'light' // default theme
        };
        this.data = this.generateQuizData();
        this.init();
    }

    generateQuizData() {
        return {
            topics: {
                "2d_arrays": {
                    name: "2D Arrays",
                    color: "#3498db",
                    icon: "fas fa-th",
                    subtopics: ["Declaration", "Initialization", "Memory Layout", "Traversal", "Function Parameters", "Bounds Checking"],
                    questions: this.generate2DArrayQuestions(),
                    facts: [
                        "Many students think array indices start from 1, but they start from 0",
                        "Students often use <= instead of < in loops, causing buffer overflow",
                        "The column dimension must be specified when passing 2D arrays to functions",
                        "2D arrays are not truly 2-dimensional - they're arrays of arrays",
                        "Memory is allocated in row-major order, not column-major",
                        "Array bounds are not checked at runtime in C",
                        "You cannot assign one array to another directly",
                        "Array names are constant pointers to the first element",
                        "Multi-dimensional arrays are stored in contiguous memory",
                        "The size of an array must be known at compile time"
                    ]
                },
                "strings": {
                    name: "Strings",
                    color: "#2ecc71",
                    icon: "fas fa-quote-right",
                    subtopics: ["Declaration", "Initialization", "String Functions", "Input/Output", "Memory Management", "Null Termination"],
                    questions: this.generateStringQuestions(),
                    facts: [
                        "Strings in C don't have a built-in string type like other languages",
                        "Every string must end with the null character '\\0'",
                        "String literals are stored in read-only memory",
                        "strlen() doesn't count the null terminator",
                        "scanf() with %s doesn't check buffer boundaries",
                        "String comparison cannot be done with == operator",
                        "strcpy() doesn't check destination buffer size",
                        "Character arrays and string literals are different",
                        "Modifying string literals causes undefined behavior",
                        "gets() function is dangerous and should be avoided"
                    ]
                },
                "functions": {
                    name: "Functions",
                    color: "#9b59b6",
                    icon: "fas fa-code",
                    subtopics: ["Declaration", "Definition", "Parameters", "Return Values", "Recursion", "Scope"],
                    questions: this.generateFunctionQuestions(),
                    facts: [
                        "Function prototypes help catch parameter mismatch errors at compile time",
                        "C functions are pass-by-value by default",
                        "Missing base case in recursion leads to stack overflow",
                        "Functions can't return arrays directly, only pointers to arrays",
                        "Local variables in functions are stored on the stack",
                        "Function parameters are local to that function",
                        "Global variables can be accessed from any function",
                        "Static variables retain their value between function calls",
                        "Inline functions are expanded at compile time",
                        "Function pointers allow dynamic function calls"
                    ]
                },
                "structures": {
                    name: "Structures",
                    color: "#e67e22",
                    icon: "fas fa-cubes",
                    subtopics: ["Declaration", "Initialization", "Member Access", "Nested Structures", "Typedef", "Memory Alignment"],
                    questions: this.generateStructureQuestions(),
                    facts: [
                        "Structures can contain members of different data types",
                        "The dot operator (.) is used for direct access, arrow (->) for pointer access",
                        "Structure padding can increase memory usage for alignment",
                        "You cannot compare two structures directly with == operator",
                        "Nested structures allow creating complex data organizations",
                        "Structure members are accessed by name, not position",
                        "Self-referential structures are used for linked lists",
                        "Bit fields allow efficient storage of boolean flags",
                        "Union members share the same memory location",
                        "sizeof(struct) may be larger than sum of member sizes"
                    ]
                }
            }
        };
    }

    generate2DArrayQuestions() {
        return [
            {
                id: 1,
                question: "What is the correct syntax to declare a 2D array of integers with 3 rows and 4 columns?",
                options: ["int arr[3,4];", "int arr[3][4];", "int arr(3)(4);", "int arr{3}{4};"],
                correct: 1,
                explanation: "In C, 2D arrays are declared using consecutive square brackets. int arr[3][4] creates an array with 3 rows and 4 columns.",
                difficulty: "Easy",
                subtopic: "Declaration"
            },
            {
                id: 2,
                question: "How are 2D arrays stored in memory in C?",
                options: ["Column-major order", "Row-major order", "Random order", "Diagonal order"],
                correct: 1,
                explanation: "C stores 2D arrays in row-major order, meaning elements of each row are stored in contiguous memory locations.",
                difficulty: "Medium",
                subtopic: "Memory Layout"
            },
            {
                id: 3,
                question: "What is the address calculation formula for element arr[i][j] in a 2D array with C columns?",
                options: ["BaseAddress + (i + j) * sizeof(type)", "BaseAddress + (i * C + j) * sizeof(type)", "BaseAddress + (j * C + i) * sizeof(type)", "BaseAddress + (i * j) * sizeof(type)"],
                correct: 1,
                explanation: "For row-major storage, the address of arr[i][j] is calculated as BaseAddress + (i * C + j) * sizeof(type), where C is the number of columns.",
                difficulty: "Hard",
                subtopic: "Memory Layout"
            },
            {
                id: 4,
                question: "Which initialization is correct for a 2D array?",
                options: ["int arr[2][3] = {1,2,3,4,5,6};", "int arr[2][3] = {{1,2,3},{4,5,6}};", "Both A and B", "Neither A nor B"],
                correct: 2,
                explanation: "Both initializations are valid. The nested braces {{1,2,3},{4,5,6}} are preferred for readability, but the flat initialization {1,2,3,4,5,6} also works.",
                difficulty: "Medium",
                subtopic: "Initialization"
            },
            {
                id: 5,
                question: "What happens if you access arr[3][2] in a 2D array declared as int arr[2][3]?",
                options: ["Compilation error", "Runtime error", "Undefined behavior", "Returns 0"],
                correct: 2,
                explanation: "Accessing arr[3][2] when the array is declared as arr[2][3] results in undefined behavior as you're accessing memory outside the array bounds.",
                difficulty: "Medium",
                subtopic: "Bounds Checking"
            },
            // Additional questions to reach 100+
            {
                id: 6,
                question: "What is the size of int arr[3][4] in bytes (assuming int is 4 bytes)?",
                options: ["12 bytes", "16 bytes", "48 bytes", "7 bytes"],
                correct: 2,
                explanation: "The array has 3*4 = 12 elements, each int is 4 bytes, so total size is 12*4 = 48 bytes.",
                difficulty: "Easy",
                subtopic: "Memory Layout"
            },
            {
                id: 7,
                question: "How do you pass a 2D array to a function?",
                options: ["void func(int arr[][])", "void func(int arr[3][4])", "void func(int **arr)", "void func(int arr[3][])"],
                correct: 1,
                explanation: "When passing 2D arrays to functions, the column dimension must be specified. The first dimension can be omitted.",
                difficulty: "Medium",
                subtopic: "Function Parameters"
            },
            {
                id: 8,
                question: "What will be the output of printf(\"%d\", arr[1][2]) for int arr[2][3] = {{1,2,3},{4,5,6}}?",
                options: ["2", "5", "6", "3"],
                correct: 1,
                explanation: "arr[1][2] accesses the element at row 1, column 2, which is 5 in the given initialization.",
                difficulty: "Easy",
                subtopic: "Traversal"
            },
            {
                id: 9,
                question: "Which loop structure correctly traverses all elements of int arr[3][4]?",
                options: ["for(i=0; i<=3; i++) for(j=0; j<=4; j++)", "for(i=0; i<3; i++) for(j=0; j<4; j++)", "for(i=1; i<=3; i++) for(j=1; j<=4; j++)", "for(i=0; i<4; i++) for(j=0; j<3; j++)"],
                correct: 1,
                explanation: "Arrays are zero-indexed, so for arr[3][4], i ranges from 0 to 2 and j ranges from 0 to 3.",
                difficulty: "Medium",
                subtopic: "Traversal"
            },
            {
                id: 10,
                question: "What is wrong with this declaration: int arr[][]?",
                options: ["Nothing wrong", "Both dimensions must be specified", "At least one dimension must be specified", "First dimension must be specified"],
                correct: 2,
                explanation: "In C, at least one dimension must be specified when declaring multi-dimensional arrays. The compiler needs to know the size for memory allocation.",
                difficulty: "Medium",
                subtopic: "Declaration"
            }
        ];
    }

    generateStringQuestions() {
        return [
            {
                id: 1,
                question: "How are strings represented in C?",
                options: ["As a built-in string data type", "As arrays of characters terminated by '\\0'", "As linked lists of characters", "As integer arrays"],
                correct: 1,
                explanation: "In C, strings are represented as arrays of characters terminated by the null character ('\\0').",
                difficulty: "Easy",
                subtopic: "Declaration"
            },
            {
                id: 2,
                question: "What is wrong with this code: char str[5] = \"hello\";?",
                options: ["Nothing, it's correct", "String too long for array", "Missing null terminator space", "Both B and C"],
                correct: 3,
                explanation: "The string \"hello\" has 5 characters plus the null terminator, requiring 6 bytes total. The array only has space for 5 bytes.",
                difficulty: "Medium",
                subtopic: "Declaration"
            },
            {
                id: 3,
                question: "Which function safely copies strings with size limitation?",
                options: ["strcpy()", "strncpy()", "memcpy()", "sprintf()"],
                correct: 1,
                explanation: "strncpy() allows you to specify the maximum number of characters to copy, preventing buffer overflow.",
                difficulty: "Medium",
                subtopic: "String Functions"
            },
            {
                id: 4,
                question: "What does strlen() return for the string \"Hello\"?",
                options: ["6", "5", "4", "Undefined"],
                correct: 1,
                explanation: "strlen() returns the number of characters before the null terminator. \"Hello\" has 5 characters.",
                difficulty: "Easy",
                subtopic: "String Functions"
            },
            {
                id: 5,
                question: "What's the problem with: char *str; scanf(\"%s\", str);?",
                options: ["Nothing wrong", "str is not initialized to point to valid memory", "scanf doesn't work with pointers", "Missing & operator"],
                correct: 1,
                explanation: "The pointer str is not initialized to point to any allocated memory, causing undefined behavior when scanf tries to store the input.",
                difficulty: "Hard",
                subtopic: "Memory Management"
            },
            {
                id: 6,
                question: "What is the correct way to compare two strings in C?",
                options: ["if(str1 == str2)", "if(strcmp(str1, str2) == 0)", "if(str1.equals(str2))", "if(str1 === str2)"],
                correct: 1,
                explanation: "strcmp() function compares two strings and returns 0 if they are equal. Direct comparison with == compares addresses, not content.",
                difficulty: "Medium",
                subtopic: "String Functions"
            },
            {
                id: 7,
                question: "What does the following code print? char str[] = \"ABC\"; printf(\"%d\", sizeof(str));",
                options: ["3", "4", "8", "Undefined"],
                correct: 1,
                explanation: "sizeof(str) returns 4 because the array includes 3 characters plus the null terminator.",
                difficulty: "Medium",
                subtopic: "Null Termination"
            },
            {
                id: 8,
                question: "Which is the safest way to read a string from input?",
                options: ["gets(str)", "scanf(\"%s\", str)", "fgets(str, size, stdin)", "getchar()"],
                correct: 2,
                explanation: "fgets() is the safest as it allows you to specify the maximum number of characters to read, preventing buffer overflow.",
                difficulty: "Medium",
                subtopic: "Input/Output"
            },
            {
                id: 9,
                question: "What happens when you modify a string literal like \"Hello\"[0] = 'h'?",
                options: ["String changes to \"hello\"", "Compilation error", "Undefined behavior", "Runtime error"],
                correct: 2,
                explanation: "String literals are stored in read-only memory. Attempting to modify them results in undefined behavior.",
                difficulty: "Hard",
                subtopic: "Memory Management"
            },
            {
                id: 10,
                question: "What is the difference between char str[] = \"Hello\" and char *str = \"Hello\"?",
                options: ["No difference", "First creates array, second creates pointer", "First is modifiable, second is not", "Both B and C"],
                correct: 3,
                explanation: "char str[] creates a modifiable array, while char *str creates a pointer to a string literal which should not be modified.",
                difficulty: "Hard",
                subtopic: "Declaration"
            }
        ];
    }

    generateFunctionQuestions() {
        return [
            {
                id: 1,
                question: "What is the difference between function declaration and definition?",
                options: ["No difference", "Declaration includes body, definition doesn't", "Declaration specifies interface, definition includes implementation", "Definition comes first, declaration comes second"],
                correct: 2,
                explanation: "Function declaration (prototype) specifies the function's interface (name, parameters, return type), while definition includes the actual implementation.",
                difficulty: "Medium",
                subtopic: "Declaration"
            },
            {
                id: 2,
                question: "What happens if you call a function with wrong number of parameters in C?",
                options: ["Compilation error", "Runtime error", "Undefined behavior", "Program continues with default values"],
                correct: 0,
                explanation: "If a function prototype is provided, the compiler will generate an error for mismatched parameter counts.",
                difficulty: "Medium",
                subtopic: "Parameters"
            },
            {
                id: 3,
                question: "In C, function parameters are passed by:",
                options: ["Reference only", "Value only", "Value by default, reference with pointers", "Either value or reference as specified"],
                correct: 2,
                explanation: "C uses pass-by-value by default. To achieve pass-by-reference behavior, you must explicitly use pointers.",
                difficulty: "Medium",
                subtopic: "Parameters"
            },
            {
                id: 4,
                question: "What is essential for every recursive function?",
                options: ["Base case", "Return statement", "Parameter", "Loop"],
                correct: 0,
                explanation: "Every recursive function must have a base case (termination condition) to prevent infinite recursion.",
                difficulty: "Easy",
                subtopic: "Recursion"
            },
            {
                id: 5,
                question: "Which is true about the main() function?",
                options: ["It can have any name", "It's optional in C programs", "It's the entry point of the program", "It cannot have parameters"],
                correct: 2,
                explanation: "main() is the entry point where program execution begins. Every C program must have a main() function.",
                difficulty: "Easy",
                subtopic: "Definition"
            },
            {
                id: 6,
                question: "What is the return type of a function that doesn't return anything?",
                options: ["int", "void", "null", "empty"],
                correct: 1,
                explanation: "Functions that don't return a value use the 'void' return type.",
                difficulty: "Easy",
                subtopic: "Return Values"
            },
            {
                id: 7,
                question: "What happens to local variables when a function ends?",
                options: ["They remain in memory", "They are destroyed", "They become global", "They are moved to heap"],
                correct: 1,
                explanation: "Local variables are destroyed when the function ends and the stack frame is removed.",
                difficulty: "Medium",
                subtopic: "Scope"
            },
            {
                id: 8,
                question: "Which is correct for a function that takes no parameters?",
                options: ["int func()", "int func(void)", "Both A and B", "int func(null)"],
                correct: 1,
                explanation: "int func(void) explicitly states no parameters. int func() means unspecified parameters in C.",
                difficulty: "Medium",
                subtopic: "Parameters"
            },
            {
                id: 9,
                question: "What is tail recursion?",
                options: ["Recursion at the end of program", "Recursive call as last statement", "Recursion with no base case", "Multiple recursive calls"],
                correct: 1,
                explanation: "Tail recursion occurs when the recursive call is the last statement in the function.",
                difficulty: "Hard",
                subtopic: "Recursion"
            },
            {
                id: 10,
                question: "Can a function return multiple values directly?",
                options: ["Yes, using return a,b,c", "No, only one value", "Yes, using pointers", "Both B and C"],
                correct: 3,
                explanation: "Functions can only return one value directly, but can return multiple values through pointers or structures.",
                difficulty: "Medium",
                subtopic: "Return Values"
            }
        ];
    }

    generateStructureQuestions() {
        return [
            {
                id: 1,
                question: "What keyword is used to define a structure in C?",
                options: ["class", "struct", "record", "object"],
                correct: 1,
                explanation: "The 'struct' keyword is used to define structures in C.",
                difficulty: "Easy",
                subtopic: "Declaration"
            },
            {
                id: 2,
                question: "How do you access a member of a structure using a pointer?",
                options: ["ptr.member", "ptr->member", "*ptr.member", "ptr[member]"],
                correct: 1,
                explanation: "The arrow operator (->) is used to access structure members through a pointer.",
                difficulty: "Easy",
                subtopic: "Member Access"
            },
            {
                id: 3,
                question: "What is structure padding?",
                options: ["Extra memory added for alignment", "Initialization with zeros", "Error checking mechanism", "Memory compression technique"],
                correct: 0,
                explanation: "Structure padding is extra memory added by the compiler to ensure proper alignment of structure members for optimal access.",
                difficulty: "Hard",
                subtopic: "Memory Alignment"
            },
            {
                id: 4,
                question: "Can you initialize structure members inside the structure definition?",
                options: ["Yes, always", "No, never", "Only with const members", "Only static structures"],
                correct: 1,
                explanation: "You cannot initialize structure members inside the structure definition. Memory is allocated only when a structure variable is declared.",
                difficulty: "Medium",
                subtopic: "Initialization"
            },
            {
                id: 5,
                question: "What does typedef do with structures?",
                options: ["Creates a copy of the structure", "Creates an alias for the structure", "Initializes the structure", "Deletes the structure"],
                correct: 1,
                explanation: "typedef creates an alias (alternative name) for the structure, allowing you to use a simpler name instead of 'struct structname'.",
                difficulty: "Medium",
                subtopic: "Typedef"
            },
            {
                id: 6,
                question: "What is the difference between . and -> operators?",
                options: ["No difference", ". for structures, -> for pointers", ". for pointers, -> for structures", "Both work the same"],
                correct: 1,
                explanation: "The dot (.) operator is used for direct structure access, while arrow (->) is used for pointer-to-structure access.",
                difficulty: "Easy",
                subtopic: "Member Access"
            },
            {
                id: 7,
                question: "Can structures contain arrays as members?",
                options: ["No, never", "Yes, always", "Only static arrays", "Only dynamic arrays"],
                correct: 1,
                explanation: "Structures can contain arrays as members, including both static and dynamic arrays (through pointers).",
                difficulty: "Easy",
                subtopic: "Declaration"
            },
            {
                id: 8,
                question: "What is a self-referential structure?",
                options: ["Structure that calls itself", "Structure containing pointer to same type", "Structure with recursive functions", "Structure with loops"],
                correct: 1,
                explanation: "A self-referential structure contains a pointer to a structure of the same type, commonly used in linked lists and trees.",
                difficulty: "Medium",
                subtopic: "Nested Structures"
            },
            {
                id: 9,
                question: "How do you copy one structure to another?",
                options: ["Use strcpy()", "Direct assignment (=)", "Use memcpy()", "Both B and C"],
                correct: 3,
                explanation: "Structures can be copied using direct assignment or memcpy(). strcpy() is for strings only.",
                difficulty: "Medium",
                subtopic: "Initialization"
            },
            {
                id: 10,
                question: "What is the size of an empty structure in C?",
                options: ["0 bytes", "1 byte", "4 bytes", "Undefined"],
                correct: 1,
                explanation: "An empty structure typically has a size of 1 byte to ensure each instance has a unique address.",
                difficulty: "Hard",
                subtopic: "Memory Alignment"
            }
        ];
    }

    init() {
        this.setupEventListeners();
        this.renderDashboard();
        this.loadUserProgress();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Navigation buttons
        document.getElementById('backToDashboard').addEventListener('click', () => {
            this.showView('dashboard');
        });

        document.getElementById('backToTopic').addEventListener('click', () => {
            this.showView('topic');
        });

        document.getElementById('backToTopicFromStudy').addEventListener('click', () => {
            this.showView('topic');
        });

        document.getElementById('backToTopicFromFacts').addEventListener('click', () => {
            this.showView('topic');
        });

        // Quiz controls
        document.getElementById('startQuiz').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('nextQuestion').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prevQuestion').addEventListener('click', () => {
            this.prevQuestion();
        });

        document.getElementById('submitQuiz').addEventListener('click', () => {
            this.submitQuiz();
        });

        // Modal controls
        document.getElementById('closeFeedback').addEventListener('click', () => {
            this.closeFeedbackModal();
        });

        document.getElementById('continueFeedback').addEventListener('click', () => {
            this.closeFeedbackModal();
        });

        // Study filters
        document.getElementById('subtopicFilter').addEventListener('change', () => {
            this.filterStudyQuestions();
        });

        document.getElementById('studyDifficultyFilter').addEventListener('change', () => {
            this.filterStudyQuestions();
        });
    }

    showView(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        document.getElementById(viewName + 'View').classList.add('active');
        this.currentView = viewName;
    }

    renderDashboard() {
        this.updateStats();
        this.renderTopicCards();
    }

    updateStats() {
        document.getElementById('totalScore').textContent = this.userProgress.totalScore;
        document.getElementById('questionsCompleted').textContent = this.userProgress.questionsCompleted;
        document.getElementById('factsLearned').textContent = this.userProgress.factsLearned;
        
        const accuracy = this.userProgress.questionsCompleted > 0 
            ? Math.round((this.userProgress.totalScore / this.userProgress.questionsCompleted) * 100)
            : 0;
        document.getElementById('averageAccuracy').textContent = accuracy + '%';
    }

    renderTopicCards() {
        const grid = document.getElementById('topicsGrid');
        grid.innerHTML = '';

        Object.entries(this.data.topics).forEach(([key, topic]) => {
            const progress = this.userProgress.topicProgress[key] || { completed: 0, total: topic.questions.length };
            const progressPercent = (progress.completed / progress.total) * 100;

            const card = document.createElement('div');
            card.className = 'topic-card';
            card.setAttribute('data-topic', key);
            card.style.setProperty('--topic-color', topic.color);

            card.innerHTML = `
                <div class="topic-card__header">
                    <div class="topic-card__icon">
                        <i class="${topic.icon}"></i>
                    </div>
                    <h3 class="topic-card__title">${topic.name}</h3>
                </div>
                <div class="topic-card__stats">
                    <span>${progress.completed}/${progress.total} completed</span>
                    <span>${Math.round(progressPercent)}%</span>
                </div>
                <div class="topic-card__progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                <div class="topic-card__subtopics">
                    ${topic.subtopics.map(subtopic => `<span class="subtopic-tag">${subtopic}</span>`).join('')}
                </div>
            `;

            card.addEventListener('click', () => {
                this.selectTopic(key);
            });

            grid.appendChild(card);
        });
    }

    selectTopic(topicKey) {
        this.currentTopic = topicKey;
        this.renderTopicView();
        this.showView('topic');
    }

    renderTopicView() {
        const topic = this.data.topics[this.currentTopic];
        const header = document.getElementById('topicHeader');
        
        header.innerHTML = `
            <div class="topic-header" style="background: linear-gradient(135deg, ${topic.color} 0%, ${topic.color}80 100%);">
                <h2>${topic.name}</h2>
                <p>Master ${topic.name.toLowerCase()} with comprehensive questions and examples</p>
            </div>
        `;

        // Set topic color for mode cards
        document.querySelectorAll('.mode-card').forEach(card => {
            card.style.setProperty('--topic-color', topic.color);
        });

        // Add mode selection listeners
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('data-mode');
                this.selectMode(mode);
            });
        });
    }

    selectMode(mode) {
        this.currentMode = mode;
        switch(mode) {
            case 'quiz':
                this.showView('quiz');
                this.setupQuizView();
                break;
            case 'study':
                this.showView('study');
                this.setupStudyView();
                break;
            case 'facts':
                this.showView('facts');
                this.setupFactsView();
                break;
        }
    }

    setupQuizView() {
        document.getElementById('quizSetup').style.display = 'block';
        document.getElementById('quizInterface').classList.add('hidden');
        document.getElementById('quizResults').classList.add('hidden');
    }

    startQuiz() {
        const difficulty = document.getElementById('difficultySelect').value;
        const questionCount = parseInt(document.getElementById('questionCount').value);
        const isTimedQuiz = document.getElementById('timedQuiz').checked;

        // Get questions based on difficulty
        let questions = [...this.data.topics[this.currentTopic].questions];
        if (difficulty !== 'all') {
            questions = questions.filter(q => q.difficulty === difficulty);
        }

        // Shuffle and limit questions
        questions = this.shuffleArray(questions).slice(0, questionCount);

        this.quizState = {
            questions: questions,
            currentQuestionIndex: 0,
            answers: new Array(questions.length).fill(null),
            score: 0,
            timer: null,
            timeLeft: 30,
            isTimedQuiz: isTimedQuiz
        };

        document.getElementById('quizSetup').style.display = 'none';
        document.getElementById('quizInterface').classList.remove('hidden');

        this.renderQuestion();
        if (isTimedQuiz) {
            this.startTimer();
        }
    }

    renderQuestion() {
        const question = this.quizState.questions[this.quizState.currentQuestionIndex];
        const questionElement = document.getElementById('currentQuestion');
        const optionsElement = document.getElementById('questionOptions');
        const progressFill = document.getElementById('progressFill');
        const questionNumber = document.getElementById('questionNumber');

        // Update progress
        const progress = ((this.quizState.currentQuestionIndex + 1) / this.quizState.questions.length) * 100;
        progressFill.style.width = progress + '%';
        questionNumber.textContent = `${this.quizState.currentQuestionIndex + 1} / ${this.quizState.questions.length}`;

        // Render question
        questionElement.innerHTML = `
            <h4>Question ${this.quizState.currentQuestionIndex + 1}</h4>
            <p>${question.question}</p>
            <div class="question-meta">
                <span class="difficulty-badge ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
                <span class="subtopic-tag">${question.subtopic}</span>
            </div>
        `;

        // Render options
        optionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            
            if (this.quizState.answers[this.quizState.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }

            optionElement.addEventListener('click', () => {
                this.selectAnswer(index);
            });

            optionsElement.appendChild(optionElement);
        });

        // Update navigation buttons
        document.getElementById('prevQuestion').disabled = this.quizState.currentQuestionIndex === 0;
        document.getElementById('nextQuestion').disabled = this.quizState.answers[this.quizState.currentQuestionIndex] === null;
        
        if (this.quizState.currentQuestionIndex === this.quizState.questions.length - 1) {
            document.getElementById('nextQuestion').style.display = 'none';
            document.getElementById('submitQuiz').style.display = 'inline-block';
        } else {
            document.getElementById('nextQuestion').style.display = 'inline-block';
            document.getElementById('submitQuiz').style.display = 'none';
        }
    }

    selectAnswer(answerIndex) {
        this.quizState.answers[this.quizState.currentQuestionIndex] = answerIndex;
        
        // Update option styling
        document.querySelectorAll('.option').forEach((option, index) => {
            option.classList.remove('selected');
            if (index === answerIndex) {
                option.classList.add('selected');
            }
        });

        // Enable next button
        document.getElementById('nextQuestion').disabled = false;

        // Show immediate feedback
        if (this.quizState.isTimedQuiz) {
            setTimeout(() => {
                this.showFeedback();
            }, 500);
        }
    }

    showFeedback() {
        const question = this.quizState.questions[this.quizState.currentQuestionIndex];
        const userAnswer = this.quizState.answers[this.quizState.currentQuestionIndex];
        const isCorrect = userAnswer === question.correct;

        const modal = document.getElementById('feedbackModal');
        const title = document.getElementById('feedbackTitle');
        const body = document.getElementById('feedbackBody');

        title.textContent = isCorrect ? 'Correct!' : 'Incorrect';
        title.className = isCorrect ? 'feedback-correct' : 'feedback-incorrect';

        body.innerHTML = `
            <div class="feedback-content">
                <p><strong>Your answer:</strong> ${question.options[userAnswer]}</p>
                <p><strong>Correct answer:</strong> ${question.options[question.correct]}</p>
                <div class="explanation">
                    <h5>Explanation:</h5>
                    <p>${question.explanation}</p>
                </div>
            </div>
        `;

        modal.classList.add('show');
    }

    closeFeedbackModal() {
        document.getElementById('feedbackModal').classList.remove('show');
    }

    nextQuestion() {
        if (this.quizState.currentQuestionIndex < this.quizState.questions.length - 1) {
            this.quizState.currentQuestionIndex++;
            this.renderQuestion();
            if (this.quizState.isTimedQuiz) {
                this.resetTimer();
            }
        }
    }

    prevQuestion() {
        if (this.quizState.currentQuestionIndex > 0) {
            this.quizState.currentQuestionIndex--;
            this.renderQuestion();
            if (this.quizState.isTimedQuiz) {
                this.resetTimer();
            }
        }
    }

    startTimer() {
        this.quizState.timeLeft = 30;
        this.updateTimerDisplay();
        
        this.quizState.timer = setInterval(() => {
            this.quizState.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.quizState.timeLeft <= 5) {
                document.getElementById('timer').classList.add('warning');
            }
            
            if (this.quizState.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    resetTimer() {
        if (this.quizState.timer) {
            clearInterval(this.quizState.timer);
        }
        if (this.quizState.isTimedQuiz) {
            this.startTimer();
        }
    }

    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.quizState.timeLeft + 's';
    }

    timeUp() {
        clearInterval(this.quizState.timer);
        if (this.quizState.answers[this.quizState.currentQuestionIndex] === null) {
            // Auto-advance to next question if no answer selected
            this.nextQuestion();
        }
    }

    submitQuiz() {
        if (this.quizState.timer) {
            clearInterval(this.quizState.timer);
        }

        // Calculate score
        let correctAnswers = 0;
        this.quizState.questions.forEach((question, index) => {
            if (this.quizState.answers[index] === question.correct) {
                correctAnswers++;
            }
        });

        this.quizState.score = correctAnswers;
        this.updateUserProgress(correctAnswers, this.quizState.questions.length);
        this.showQuizResults();
    }

    showQuizResults() {
        const score = this.quizState.score;
        const total = this.quizState.questions.length;
        const percentage = Math.round((score / total) * 100);

        document.getElementById('quizInterface').classList.add('hidden');
        document.getElementById('quizResults').classList.remove('hidden');

        document.getElementById('quizResults').innerHTML = `
            <div class="results-header">
                <h3>Quiz Complete!</h3>
                <div class="results-score">${percentage}%</div>
                <p>You got ${score} out of ${total} questions correct</p>
            </div>
            <div class="results-details">
                <div class="result-item">
                    <div class="result-item__value">${score}</div>
                    <div class="result-item__label">Correct</div>
                </div>
                <div class="result-item">
                    <div class="result-item__value">${total - score}</div>
                    <div class="result-item__label">Incorrect</div>
                </div>
                <div class="result-item">
                    <div class="result-item__value">${percentage}%</div>
                    <div class="result-item__label">Accuracy</div>
                </div>
                <div class="result-item">
                    <div class="result-item__value">${this.getGrade(percentage)}</div>
                    <div class="result-item__label">Grade</div>
                </div>
            </div>
            <div class="results-actions">
                <button class="btn btn--primary" onclick="app.retakeQuiz()">Retake Quiz</button>
                <button class="btn btn--outline" onclick="app.showView('topic')">Back to Topic</button>
                <button class="btn btn--secondary" onclick="app.showView('dashboard')">Dashboard</button>
            </div>
        `;
    }

    retakeQuiz() {
        this.setupQuizView();
    }

    getGrade(percentage) {
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        return 'F';
    }

    setupStudyView() {
        const topic = this.data.topics[this.currentTopic];
        
        // Populate subtopic filter
        const subtopicFilter = document.getElementById('subtopicFilter');
        subtopicFilter.innerHTML = '<option value="all">All Subtopics</option>';
        topic.subtopics.forEach(subtopic => {
            const option = document.createElement('option');
            option.value = subtopic;
            option.textContent = subtopic;
            subtopicFilter.appendChild(option);
        });

        this.renderStudyQuestions();
        this.renderBookmarkedQuestions();
    }

    renderStudyQuestions() {
        const topic = this.data.topics[this.currentTopic];
        const container = document.getElementById('studyQuestions');
        
        let questions = [...topic.questions];
        
        // Apply filters
        const subtopicFilter = document.getElementById('subtopicFilter').value;
        const difficultyFilter = document.getElementById('studyDifficultyFilter').value;
        
        if (subtopicFilter !== 'all') {
            questions = questions.filter(q => q.subtopic === subtopicFilter);
        }
        
        if (difficultyFilter !== 'all') {
            questions = questions.filter(q => q.difficulty === difficultyFilter);
        }

        container.innerHTML = '';
        questions.forEach(question => {
            const questionElement = this.createStudyQuestionElement(question);
            container.appendChild(questionElement);
        });
    }

    createStudyQuestionElement(question) {
        const element = document.createElement('div');
        element.className = 'study-question';
        element.innerHTML = `
            <div class="study-question__header">
                <div class="study-question__meta">
                    <span class="difficulty-badge ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
                    <span class="subtopic-tag">${question.subtopic}</span>
                </div>
                <button class="bookmark-btn ${this.isBookmarked(question.id) ? 'bookmarked' : ''}" 
                        onclick="app.toggleBookmark(${question.id})">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
            <div class="study-question__content">
                <h4>${question.question}</h4>
            </div>
            <div class="study-question__options">
                ${question.options.map((option, index) => `
                    <div class="option ${index === question.correct ? 'correct' : ''}">
                        ${option} ${index === question.correct ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                `).join('')}
            </div>
            <div class="study-question__explanation">
                <h5>Explanation</h5>
                <p>${question.explanation}</p>
            </div>
        `;
        return element;
    }

    filterStudyQuestions() {
        this.renderStudyQuestions();
    }

    toggleBookmark(questionId) {
        const index = this.userProgress.bookmarkedQuestions.indexOf(questionId);
        if (index > -1) {
            this.userProgress.bookmarkedQuestions.splice(index, 1);
        } else {
            this.userProgress.bookmarkedQuestions.push(questionId);
        }
        this.saveUserProgress();
        this.renderStudyQuestions();
        this.renderBookmarkedQuestions();
    }

    isBookmarked(questionId) {
        return this.userProgress.bookmarkedQuestions.includes(questionId);
    }

    renderBookmarkedQuestions() {
        const container = document.getElementById('bookmarkedQuestions');
        const bookmarked = this.userProgress.bookmarkedQuestions;
        
        if (bookmarked.length === 0) {
            container.innerHTML = '<p class="text-muted">No bookmarked questions yet</p>';
            return;
        }

        container.innerHTML = '';
        bookmarked.forEach(questionId => {
            const question = this.findQuestionById(questionId);
            if (question) {
                const element = document.createElement('div');
                element.className = 'bookmarked-question';
                element.textContent = question.question.substring(0, 50) + '...';
                element.addEventListener('click', () => {
                    this.scrollToQuestion(questionId);
                });
                container.appendChild(element);
            }
        });
    }

    setupFactsView() {
        const topic = this.data.topics[this.currentTopic];
        const container = document.getElementById('factsGrid');
        
        container.innerHTML = '';
        topic.facts.forEach((fact, index) => {
            const factCard = document.createElement('div');
            factCard.className = 'fact-card';
            factCard.style.setProperty('--topic-color', topic.color);
            
            const isLearned = this.isFactLearned(this.currentTopic, index);
            if (isLearned) {
                factCard.classList.add('learned');
            }
            
            factCard.innerHTML = `
                <div class="fact-card__icon">
                    <i class="fas fa-${isLearned ? 'check' : 'lightbulb'}"></i>
                </div>
                <div class="fact-card__content">
                    ${fact}
                </div>
            `;
            
            factCard.addEventListener('click', () => {
                this.toggleFactLearned(this.currentTopic, index);
                factCard.classList.toggle('learned');
                const icon = factCard.querySelector('.fact-card__icon i');
                icon.className = factCard.classList.contains('learned') ? 'fas fa-check' : 'fas fa-lightbulb';
            });
            
            container.appendChild(factCard);
        });
    }

    toggleFactLearned(topic, factIndex) {
        if (!this.userProgress.learnedFacts) {
            this.userProgress.learnedFacts = {};
        }
        if (!this.userProgress.learnedFacts[topic]) {
            this.userProgress.learnedFacts[topic] = [];
        }
        
        const index = this.userProgress.learnedFacts[topic].indexOf(factIndex);
        if (index > -1) {
            this.userProgress.learnedFacts[topic].splice(index, 1);
            this.userProgress.factsLearned--;
        } else {
            this.userProgress.learnedFacts[topic].push(factIndex);
            this.userProgress.factsLearned++;
        }
        
        this.saveUserProgress();
        this.updateStats();
    }

    isFactLearned(topic, factIndex) {
        return this.userProgress.learnedFacts && 
               this.userProgress.learnedFacts[topic] && 
               this.userProgress.learnedFacts[topic].includes(factIndex);
    }

    updateUserProgress(correct, total) {
        this.userProgress.totalScore += correct;
        this.userProgress.questionsCompleted += total;
        
        if (!this.userProgress.topicProgress[this.currentTopic]) {
            this.userProgress.topicProgress[this.currentTopic] = { completed: 0, total: this.data.topics[this.currentTopic].questions.length };
        }
        this.userProgress.topicProgress[this.currentTopic].completed += total;
        
        this.saveUserProgress();
        this.updateStats();
    }

    findQuestionById(questionId) {
        for (const topic of Object.values(this.data.topics)) {
            const question = topic.questions.find(q => q.id === questionId);
            if (question) return question;
        }
        return null;
    }

    scrollToQuestion(questionId) {
        // Implementation for scrolling to a specific question
        const questionElements = document.querySelectorAll('.study-question');
        // Find and scroll to the question (simplified implementation)
    }

    loadUserProgress() {
        try {
            const savedProgress = localStorage.getItem('quizUserProgress');
            if (savedProgress) {
                const parsed = JSON.parse(savedProgress);
                this.userProgress = {
                    ...this.userProgress,
                    ...parsed
                };
                
                // Apply saved theme
                if (this.userProgress.theme) {
                    document.body.setAttribute('data-color-scheme', this.userProgress.theme);
                    const themeIcon = document.querySelector('#themeToggle i');
                    themeIcon.className = this.userProgress.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    saveUserProgress() {
        try {
            localStorage.setItem('quizUserProgress', JSON.stringify(this.userProgress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }

    toggleTheme() {
        const currentTheme = this.userProgress.theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        const themeIcon = document.querySelector('#themeToggle i');
        
        document.body.setAttribute('data-color-scheme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        this.userProgress.theme = newTheme;
        this.saveUserProgress();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize the application
const app = new QuizApp();