document.addEventListener('DOMContentLoaded', function() {
    const nav_link = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    nav_link.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            nav_link.forEach(navLink => navLink.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            if (document.getElementById(sectionId)) {
                document.getElementById(sectionId).classList.add('active');
            }
        });
    });


    document.querySelector('.nav-link[data-section="home"]').classList.add('active');
    document.getElementById('home').classList.add('active');

    loadSettings();

    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        document.getElementById('save-settings').addEventListener('click', saveSettings);
        document.getElementById('reset-data').addEventListener('click', resetUserData);
        document.getElementById('track-progress').addEventListener('change', toggleProgressDisplay);
    }

    const topicCards = document.querySelectorAll('.topic-card');
    const topicDetailSection = document.getElementById('topic-detail');
    const backToTopicsBtn = document.getElementById('back-to-topics');

    const topicsData = {
        'vars': {
            title: 'Variables & Data Types',
            description: '<p>Variables are containers for storing data values in C++. Each variable has a specific type, which determines the size and layout of the variable\'s memory.</p>' +
                         '<p><strong>Key Concepts:</strong></p>' +
                         '<ul>' +
                         '<li>Variable declaration and initialization</li>' +
                         '<li>Fundamental data types (int, float, double, char, bool)</li>' +
                         '<li>Type modifiers (signed, unsigned, short, long)</li>' +
                         '<li>Type conversion</li>' +
                         '</ul>',
            code: '#include <iostream>\n' +
                  'using namespace std;\n\n' +
                  'int main() {\n' +
                  '    int age = 25;\n' +
                  '    double height = 1.75;\n' +
                  '    char grade = \'A\';\n' +
                  '    bool isStudent = true;\n' +
                  '    string name = "Alice";\n' +
                  '    \n' +
                  '    cout << name << " is " << age << " years old" << endl;\n' +
                  '    cout << "Height: " << height << " meters" << endl;\n' +
                  '    cout << "Grade: " << grade << endl;\n' +
                  '    cout << "Is student? " << boolalpha << isStudent << endl;\n' +
                  '    \n' +
                  '    return 0;\n' +
                  '}'
        },
        'conditions': {
            title: 'Conditional Statements',
            description: '<p>Conditional statements allow your program to make decisions and execute different code blocks based on conditions.</p>' +
                         '<p><strong>Key Concepts:</strong></p>' +
                         '<ul>' +
                         '<li>if, else if, else statements</li>' +
                         '<li>Switch statements</li>' +
                         '<li>Ternary operator</li>' +
                         '<li>Logical operators (&&, ||, !)</li>' +
                         '</ul>',
            code: '#include <iostream>\n' +
                  'using namespace std;\n\n' +
                  'int main() {\n' +
                  '    int score;\n' +
                  '    cout << "Enter your test score: ";\n' +
                  '    cin >> score;\n' +
                  '    \n' +
                  '    if (score >= 90) {\n' +
                  '        cout << "Excellent! Grade: A" << endl;\n' +
                  '    } \n' +
                  '    else if (score >= 80) {\n' +
                  '        cout << "Good! Grade: B" << endl;\n' +
                  '    }\n' +
                  '    else if (score >= 70) {\n' +
                  '        cout << "Average. Grade: C" << endl;\n' +
                  '    }\n' +
                  '    else {\n' +
                  '        cout << "Needs improvement. Grade: D" << endl;\n' +
                  '    }\n' +
                  '    \n' +
                  '    int day = 3;\n' +
                  '    switch(day) {\n' +
                  '        case 1: cout << "Monday"; break;\n' +
                  '        case 2: cout << "Tuesday"; break;\n' +
                  '        case 3: cout << "Wednesday"; break;\n' +
                  '        case 4: cout << "Thursday"; break;\n' +
                  '        case 5: cout << "Friday"; break;\n' +
                  '        default: cout << "Weekend day";\n' +
                  '    }\n' +
                  '    \n' +
                  '    return 0;\n' +
                  '}'
        },
        'loops': {
            title: 'Loops',
            description: '<p>Loops allow you to execute a block of code repeatedly.</p>' +
                         '<p><strong>Key Concepts:</strong></p>' +
                         '<ul>' +
                         '<li>for loops</li>' +
                         '<li>while loops</li>' +
                         '<li>do-while loops</li>' +
                         '<li>Loop control (break, continue)</li>' +
                         '</ul>',
            code: '#include <iostream>\n' +
                  'using namespace std;\n\n' +
                  'int main() {\n' +
                  '    cout << "Counting from 1 to 5:" << endl;\n' +
                  '    for (int i = 1; i <= 5; i++) {\n' +
                  '        cout << i << " ";\n' +
                  '    }\n' +
                  '    cout << endl << endl;\n' +
                  '    \n' +
                  '    int count = 5;\n' +
                  '    cout << "Countdown from 5:" << endl;\n' +
                  '    while (count > 0) {\n' +
                  '        cout << count << " ";\n' +
                  '        count--;\n' +
                  '    }\n' +
                  '    cout << endl << endl;\n' +
                  '    \n' +
                  '    int number;\n' +
                  '    do {\n' +
                  '        cout << "Enter a positive number: ";\n' +
                  '        cin >> number;\n' +
                  '    } while (number <= 0);\n' +
                  '    \n' +
                  '    cout << "You entered: " << number << endl;\n' +
                  '    \n' +
                  '    return 0;\n' +
                  '}'
        },
        'functions': {
            title: 'Functions',
            description: '<p>Functions allow you to group code into reusable blocks.</p>' +
                         '<p><strong>Key Concepts:</strong></p>' +
                         '<ul>' +
                         '<li>Function declaration and definition</li>' +
                         '<li>Parameters and return values</li>' +
                         '<li>Function overloading</li>' +
                         '<li>Recursion</li>' +
                         '</ul>',
            code: '#include <iostream>\n' +
                  'using namespace std;\n\n' +
                  'int addNumbers(int a, int b);\n\n' +
                  'int main() {\n' +
                  '    int result = addNumbers(5, 7);\n' +
                  '    cout << "The sum is: " << result << endl;\n' +
                  '    return 0;\n' +
                  '}\n\n' +
                  'int addNumbers(int a, int b) {\n' +
                  '    return a + b;\n' +
                  '}'
        },
        'data-structures': {
            title: 'Data Structures',
            description: '<p>Data structures allow you to organize and store data efficiently.</p>' +
                         '<p><strong>Key Concepts:</strong></p>' +
                         '<ul>' +
                         '<li>Arrays</li>' +
                         '<li>Vectors</li>' +
                         '<li>Structs</li>' +
                         '<li>Memory management</li>' +
                         '</ul>',
            code: '#include <iostream>\n' +
                  '#include <vector>\n' +
                  'using namespace std;\n\n' +
                  'struct Person {\n' +
                  '    string name;\n' +
                  '    int age;\n' +
                  '};\n\n' +
                  'int main() {\n' +
                  '    int numbers[5] = {1, 2, 3, 4, 5};\n' +
                  '    \n' +
                  '    vector<string> names = {"Alice", "Bob", "Charlie"};\n' +
                  '    names.push_back("David");\n' +
                  '    \n' +
                  '    Person p1;\n' +
                  '    p1.name = "John";\n' +
                  '    p1.age = 30;\n' +
                  '    \n' +
                  '    cout << "First number: " << numbers[0] << endl;\n' +
                  '    cout << "Last name: " << names.back() << endl;\n' +
                  '    cout << p1.name << " is " << p1.age << " years old" << endl;\n' +
                  '    \n' +
                  '    return 0;\n' +
                  '}'
        }
    };

    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            loadTopic(topic);
        });
    });

    if (backToTopicsBtn) {
        backToTopicsBtn.addEventListener('click', function() {
            document.getElementById('topics').classList.add('active');
            topicDetailSection.classList.remove('active');
        });
    }

    function loadTopic(topic) {
        const topicData = topicsData[topic];
        if (!topicData) return;

        document.getElementById('topic-title').textContent = topicData.title;
        document.getElementById('topic-description').innerHTML = topicData.description;
        document.getElementById('code-example').textContent = topicData.code;
        document.getElementById('output-result').textContent = '';
        document.getElementById('topics').classList.remove('active');
        topicDetailSection.classList.add('active');
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('run-code')) {
            runCodeExample();
        }
        if (e.target.classList.contains('copy-code')) {
            copyCodeToClipboard();
        }
    });

    function runCodeExample() {
        const outputBox = document.getElementById('output-result');
        const code = document.getElementById('code-example').textContent;

        outputBox.innerHTML = "Running code...";

        setTimeout(() => {
            if (code.includes("cout << name <<") && code.includes("Alice")) {
                outputBox.innerHTML = "Alice is 25 years old<br>Height: 1.75 meters<br>Grade: A<br>Is student? true";
            } else if (code.includes("Enter your test score")) {
                outputBox.innerHTML = "Enter your test score: 85<br>Good! Grade: B<br>Wednesday";
            } else if (code.includes("Counting from 1 to 5")) {
                outputBox.innerHTML = "Counting from 1 to 5:<br>1 2 3 4 5<br><br>Countdown from 5:<br>5 4 3 2 1<br><br>Enter a positive number: 7<br>You entered: 7";
            } else if (code.includes("addNumbers")) {
                outputBox.innerHTML = "The sum is: 12";
            } else if (code.includes("vector<string>")) {
                outputBox.innerHTML = "First number: 1<br>Last name: David<br>John is 30 years old";
            } else {
                outputBox.innerHTML = "Program executed successfully! (Simulated output)";
            }
        }, 800);
    }

    function copyCodeToClipboard() {
        const code = document.getElementById('code-example').textContent;
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        }, () => {
            alert('Failed to copy code.');
        });
    }

    function ProgressDisplay() {
        const trackProgressCheckbox = document.getElementById('track-progress');
        const progressDisplay = document.getElementById('progress-display');
        if (trackProgressCheckbox && progressDisplay) {
            progressDisplay.style.display = trackProgressCheckbox.checked ? 'block' : 'none';
        }
    }

    function loadSettings() {
        const userName = localStorage.getItem('cppMasterUserName') || '';
        const theme = localStorage.getItem('cppMasterTheme') || 'default';
        const trackProgress = localStorage.getItem('cppMasterTrackProgress') !== 'false';

        const userNameInput = document.getElementById('user-name');
        if (userNameInput) {
            userNameInput.value = userName;
            const userWelcome = document.querySelector('#user-welcome');
            if (userWelcome) {
                userWelcome.textContent = userName || 'there';
            }
        }

        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.value = theme;
            applyTheme(theme);
        }

        const trackProgressCheckbox = document.getElementById('track-progress');
        if (trackProgressCheckbox) {
            trackProgressCheckbox.checked = trackProgress;
            ProgressDisplay();
        }

        updateProgress();
    }

    function saveSettings() {
        const userName = document.getElementById('user-name').value;
        const theme = document.getElementById('theme-select').value;
        const trackProgress = document.getElementById('track-progress').checked;

        localStorage.setItem('cppMasterUserName', userName);
        localStorage.setItem('cppMasterTheme', theme);
        localStorage.setItem('cppMasterTrackProgress', trackProgress.toString());

        const userWelcome = document.querySelector('#user-welcome');
        if (userWelcome) {
            userWelcome.textContent = userName || 'there';
        }
        applyTheme(theme);
        ProgressDisplay();
        updateProgress();

        alert('Settings saved successfully!');
    }

    function resetUserData() {
        if (confirm('Are you sure you want to reset all your data? This will remove your name, progress, and settings. This cannot be undone.')) {
            localStorage.removeItem('cppMasterUserName');
            localStorage.removeItem('cppMasterTheme');
            localStorage.removeItem('cppMasterTrackProgress');

            document.getElementById('user-name').value = '';
            const userWelcome = document.querySelector('#user-welcome');
            if (userWelcome) {
                userWelcome.textContent = 'there';
            }

            document.getElementById('theme-select').value = 'default';
            applyTheme('default');

            document.getElementById('track-progress').checked = true;
            ProgressDisplay();

            document.getElementById('progress-percent').textContent = '0';
            document.getElementById('progress-bar').value = 0;

            alert('All data has been reset. You can start fresh now!');
        }
    }

    function applyTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme', 'high-contrast-theme');
        if (theme !== 'default') {
            document.body.classList.add(`${theme}-theme`);
        }
    }

    function updateProgress() {
        const trackProgressCheckbox = document.getElementById('track-progress');
        if (!trackProgressCheckbox || !trackProgressCheckbox.checked) {
            return;
        }

        const currentHour = new Date().getHours();
        const randomFactor = Math.floor(Math.random() * 10) + 1;
        const progress = Math.min(currentHour * 3 + randomFactor, 100);

        const progressPercent = document.getElementById('progress-percent');
        const progressBar = document.getElementById('progress-bar');

        if (progressPercent) progressPercent.textContent = progress;
        if (progressBar) progressBar.value = progress;
    }

    setInterval(updateProgress, 30000);
});