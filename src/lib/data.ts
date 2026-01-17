export type Character = {
  id: string;
  name: string;
  description: string;
  personality: string;
  difficulty: 'Beginner' | 'Advanced' | 'Final Boss';
  image: string;
  dataAiHint: string;
  unlocksStone?: 'Space' | 'Mind' | 'Reality' | 'Power' | 'Time' | 'Soul';
  storyline?: {
    learningRole: string;
    motivation: string;
    scenarioText: string;
    learningBehavior: string[];
    steps?: StoryStep[];
  };
};

export type Question = {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: string;
};

export type StoryStep = {
  narrative: string;
  question: Question;
  feedback: {
    correct: string;
    incorrect: string;
  };
};

export const quizQuestions: Question[] = [
  // HTML Easy
  { topic: 'HTML', difficulty: 'easy', question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper-Tool Markup Language'], correctAnswer: 'HyperText Markup Language' },
  { topic: 'HTML', difficulty: 'easy', question: 'Which HTML element is used for the largest heading?', options: ['<h6>', '<h1>', '<heading>', '<head>'], correctAnswer: '<h1>' },
  { topic: 'HTML', difficulty: 'easy', question: 'What is the correct HTML element for inserting a line break?', options: ['<break>', '<br>', '<lb>', '<lnbr>'], correctAnswer: '<br>' },
  { topic: 'HTML', difficulty: 'easy', question: 'What is the correct HTML for creating a hyperlink?', options: ['<a url="...">', '<a href="...">', '<a>...</a>', '<link>...</a>'], correctAnswer: '<a href="...">' },
  { topic: 'HTML', difficulty: 'easy', question: 'Which character is used to indicate an end tag?', options: ['<', '/', '*', '^'], correctAnswer: '/' },
  { topic: 'HTML', difficulty: 'easy', question: 'How can you make a numbered list?', options: ['<ol>', '<ul>', '<dl>', '<list>'], correctAnswer: '<ol>' },
  { topic: 'HTML', difficulty: 'easy', question: 'Which HTML element is used to specify a footer for a document or section?', options: ['<bottom>', '<footer>', '<section>', '<foot>'], correctAnswer: '<footer>' },
  { topic: 'HTML', difficulty: 'easy', question: 'What is the correct HTML element for playing video files?', options: ['<media>', '<movie>', '<video>', '<vid>'], correctAnswer: '<video>' },

  // HTML Medium
  { topic: 'HTML', difficulty: 'medium', question: 'Which HTML element is used to define an unordered list?', options: ['<ol>', '<li>', '<ul>', '<list>'], correctAnswer: '<ul>' },
  { topic: 'HTML', difficulty: 'medium', question: 'Which attribute is used to specify a unique id for an HTML element?', options: ['id', 'class', 'name', 'identity'], correctAnswer: 'id' },
  { topic: 'HTML', difficulty: 'medium', question: 'What is the correct HTML for referring to an external style sheet?', options: ['<stylesheet>style.css</stylesheet>', '<style src="style.css">', '<link rel="stylesheet" type="text/css" href="style.css">', '<link href="style.css">'], correctAnswer: '<link rel="stylesheet" type="text/css" href="style.css">' },
  { topic: 'HTML', difficulty: 'medium', question: 'In HTML, which attribute is used to specify that an input field must be filled out?', options: ['required', 'validate', 'placeholder', 'must-fill'], correctAnswer: 'required' },
  { topic: 'HTML', difficulty: 'medium', question: 'Which HTML element defines navigation links?', options: ['<nav>', '<navigate>', '<navigation>', '<links>'], correctAnswer: '<nav>' },
  { topic: 'HTML', difficulty: 'medium', question: 'Which input type defines a slider control?', options: ['slider', 'range', 'controls', 'drag'], correctAnswer: 'range' },
  { topic: 'HTML', difficulty: 'medium', question: 'What does the `alt` attribute in an `<img>` tag provide?', options: ['Alternate text for the image', 'A caption for the image', 'A link to a high-resolution version', 'The alignment of the image'], correctAnswer: 'Alternate text for the image' },
  { topic: 'HTML', difficulty: 'medium', question: 'Which element is used to define a table?', options: ['<table>', '<tr>', '<td>', '<tabular>'], correctAnswer: '<table>' },
  { topic: 'HTML', difficulty: 'medium', question: 'Which element is a container for different types of input elements like text fields, checkboxes, and submit buttons?', options: ['<form>', '<input>', '<fieldset>', '<container>'], correctAnswer: '<form>' },
  { topic: 'HTML', difficulty: 'medium', question: 'Which semantic HTML element represents a self-contained composition in a document, such as a forum post or a blog entry?', options: ['<section>', '<article>', '<aside>', '<details>'], correctAnswer: '<article>' },

  // HTML Hard
  { topic: 'HTML', difficulty: 'hard', question: 'Which HTML element is used to specify a container for multiple-choice questions in a form?', options: ['<select>', '<dropdown>', '<options>', '<datalist>'], correctAnswer: '<select>' },
  { topic: 'HTML', difficulty: 'hard', question: 'What is the purpose of the `<canvas>` element in HTML5?', options: ['To display video', 'To draw graphics on the fly', 'To create a container for 3D objects', 'To embed another HTML page'], correctAnswer: 'To draw graphics on the fly' },
  { topic: 'HTML', difficulty: 'hard', question: 'What does the `async` attribute on a `<script>` tag do?', options: ['The script is executed after the page has finished parsing', 'The script is executed synchronously', 'The script is downloaded in parallel and executed as soon as it is available', 'The script is executed only on user interaction'], correctAnswer: 'The script is downloaded in parallel and executed as soon as it is available' },
  { topic: 'HTML', difficulty: 'hard', question: 'What is the difference between `<strong>` and `<b>` tags?', options: ['They are identical', '<strong> is semantic, while <b> is for styling', '<b> is for paragraphs, <strong> for headings', '<b> is deprecated, <strong> is not'], correctAnswer: '<strong> is semantic, while <b> is for styling' },
  { topic: 'HTML', difficulty: 'hard', question: 'Which element is used to embed another document within the current HTML document?', options: ['<iframe>', '<embed>', '<frame>', '<object>'], correctAnswer: '<iframe>' },
  { topic: 'HTML', difficulty: 'hard', question: 'What is the purpose of the `aria-label` attribute?', options: ['To define a keyboard shortcut', 'To provide an accessible label for an element', 'To specify the language of the element', 'To link to another part of the page'], correctAnswer: 'To provide an accessible label for an element' },
  { topic: 'HTML', difficulty: 'hard', question: 'What is the primary difference between a `<div>` and a `<span>` element?', options: ['`<div>` is a block-level element, `<span>` is an inline element', '`<span>` is a block-level element, `<div>` is an inline element', 'There is no difference', '`<div>` is for text, `<span>` is for layout'], correctAnswer: '`<div>` is a block-level element, `<span>` is an inline element' },
  { topic: 'HTML', difficulty: 'hard', question: 'What does the `defer` attribute on a `<script>` tag instruct the browser to do?', options: ['Execute the script after the document has been parsed', 'Execute the script as soon as it is downloaded', 'Delay the script execution by 5 seconds', 'Load the script from a different server'], correctAnswer: 'Execute the script after the document has been parsed' },

  // CSS Easy
  { topic: 'CSS', difficulty: 'easy', question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], correctAnswer: 'Cascading Style Sheets' },
  { topic: 'CSS', difficulty: 'easy', question: 'Which HTML attribute is used to define inline styles?', options: ['style', 'class', 'styles', 'font'], correctAnswer: 'style' },
  { topic: 'CSS', difficulty: 'easy', question: 'Which property is used to change the background color?', options: ['color', 'bgcolor', 'background-color', 'background'], correctAnswer: 'background-color' },
  { topic: 'CSS', difficulty: 'easy', question: 'Which CSS property is used to change the text color of an element?', options: ['fgcolor', 'text-color', 'color', 'font-color'], correctAnswer: 'color' },

  // CSS Medium
  { topic: 'CSS', difficulty: 'medium', question: 'Which property is used to control the spacing between elements?', options: ['margin', 'padding', 'space', 'border'], correctAnswer: 'margin' },
  { topic: 'CSS', difficulty: 'medium', question: 'How do you select an element with id "demo"?', options: ['.demo', 'demo', '#demo', '*demo'], correctAnswer: '#demo' },
  { topic: 'CSS', difficulty: 'medium', question: 'How do you make the text bold?', options: ['font-weight: bold;', 'text-style: bold;', 'font-style: bold;', 'style: bold;'], correctAnswer: 'font-weight: bold;' },
  
  // CSS Hard
  { topic: 'CSS', difficulty: 'hard', question: 'What is the purpose of the `z-index` property?', options: ['To set the zoom level of an element', 'To control the vertical stacking order of elements', 'To specify the font size', 'To add a shadow to an element'], correctAnswer: 'To control the vertical stacking order of elements' },
  { topic: 'CSS', difficulty: 'hard', question: 'What does `display: flex;` do?', options: ['Makes an element a block-level element', 'Makes an element an inline element', 'Enables a flex container for flexible box layouts', 'Hides the element'], correctAnswer: 'Enables a flex container for flexible box layouts' },

  // JS Easy
  { topic: 'JavaScript', difficulty: 'easy', question: 'Inside which HTML element do we put the JavaScript?', options: ['<script>', '<js>', '<javascript>', '<scripting>'], correctAnswer: '<script>' },
  { topic: 'JavaScript', difficulty: 'easy', question: 'What is the correct way to write a JavaScript array?', options: ['var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green")', 'var colors = 1 = ("red")'], correctAnswer: 'var colors = ["red", "green", "blue"]' },
  { topic: 'JavaScript', difficulty: 'easy', question: 'How do you write "Hello World" in an alert box?', options: ['msgBox("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");', 'msg("Hello World");'], correctAnswer: 'alert("Hello World");' },
  { topic: 'JavaScript', difficulty: 'easy', question: 'How do you create a function in JavaScript?', options: ['function = myFunction()', 'function:myFunction()', 'function myFunction()', 'create function myFunction()'], correctAnswer: 'function myFunction()' },
  { topic: 'JavaScript', difficulty: 'easy', question: 'How do you call a function named "myFunction"?', options: ['myFunction()', 'call function myFunction()', 'call myFunction()', 'execute myFunction()'], correctAnswer: 'myFunction()' },
  { topic: 'JavaScript', difficulty: 'easy', question: 'How to write an IF statement in JavaScript?', options: ['if i = 5 then', 'if (i == 5)', 'if i == 5', 'if i = 5'], correctAnswer: 'if (i == 5)' },

  // JS Medium
  { topic: 'JavaScript', difficulty: 'medium', question: 'How do you declare a JavaScript variable?', options: ['v carName;', 'variable carName;', 'var carName;', 'string carName;'], correctAnswer: 'var carName;' },
  { topic: 'JavaScript', difficulty: 'medium', question: 'What will the following code return: Boolean(10 > 9)?', options: ['true', 'false', 'NaN', 'undefined'], correctAnswer: 'true' },
  { topic: 'JavaScript', difficulty: 'medium', question: 'How does a WHILE loop start?', options: ['while (i <= 10; i++)', 'while i = 1 to 10', 'while (i <= 10)', 'while (i from 1 to 10)'], correctAnswer: 'while (i <= 10)' },
  { topic: 'JavaScript', difficulty: 'medium', question: 'How can you add a comment in a JavaScript?', options: ['//This is a comment', '<!--This is a comment-->', "'This is a comment", '#This is a comment'], correctAnswer: '//This is a comment' },
  { topic: 'JavaScript', difficulty: 'medium', question: 'What is the correct way to write a JavaScript object?', options: ['const person = {firstName:"John", lastName:"Doe"};', 'const person = ["John", "Doe"];', 'const person = {firstName="John", lastName="Doe"};', 'const person = "John", "Doe";'], correctAnswer: 'const person = {firstName:"John", lastName:"Doe"};' },

  // JS Hard
  { topic: 'JavaScript', difficulty: 'hard', question: 'What is a "closure" in JavaScript?', options: ['A function having access to the parent scope, even after the parent function has closed', 'A way to lock a variable to a specific value', 'A built-in method for closing browser windows', 'A security feature that prevents cross-site scripting'], correctAnswer: 'A function having access to the parent scope, even after the parent function has closed' },
  { topic: 'JavaScript', difficulty: 'hard', question: 'What is the difference between "==" and "==="?', options: ['They are identical', '"===" performs a type conversion before comparing', '"==" performs a type conversion before comparing', 'They are used for assignment, not comparison'], correctAnswer: '"==" performs a type conversion before comparing' },
  { topic: 'JavaScript', difficulty: 'hard', question: 'What does `this` keyword refer to in an arrow function?', options: ['The calling function', 'The global window object', 'The object that defined the arrow function', 'The enclosing lexical scope\'s `this`'], correctAnswer: 'The enclosing lexical scope\'s `this`' },
  { topic: 'JavaScript', difficulty: 'hard', question: 'What is a Promise in JavaScript?', options: ['A guarantee that a function will return a value', 'An object representing the eventual completion or failure of an asynchronous operation', 'A type of variable that cannot be changed', 'A function that runs in a separate thread'], correctAnswer: 'An object representing the eventual completion or failure of an asynchronous operation' }
];

export const characters: Character[] = [
  {
    id: 'spider-man',
    name: 'Spider-Man',
    description: 'Your friendly neighborhood tutor. Provides hints and encourages retries.',
    personality: 'Helpful & Forgiving',
    difficulty: 'Beginner',
    image: 'spider-man',
    dataAiHint: 'spider suit',
    unlocksStone: 'Mind',
    storyline: {
      learningRole: 'Beginner Guide (HTML)',
      motivation: 'With great power comes great responsibility... to write clean code!',
      scenarioText: `Web-Slinging into Code\nHey there! Spider-Man here 🕷️\nI was just swinging through the city when I noticed you’re starting your coding journey. That’s awesome!\nHTML is like the web I swing on — it holds everything together.\nDon’t worry if you make mistakes. I’ll give you hints and help you learn step by step.\nLet’s build your first webpage and save the city one tag at a time!`,
      learningBehavior: ['Gives hints', 'Encouraging tone', 'Simple questions'],
      steps: [
        {
          narrative: "Alright, let's start with the basics. Every great webpage needs a strong foundation. The most important heading tells everyone what the page is about. What tag do you use for that?",
          question: quizQuestions.find(q => q.question === 'Which HTML element is used for the largest heading?')!,
          feedback: {
            correct: "Exactly! `<h1>` is the one. You're a natural at this!",
            incorrect: "Not quite, but good try! Remember, 'h' for heading and '1' for the most important. So it's `<h1>`. You got this!",
          },
        },
        {
          narrative: "Awesome! Now that we have a title, let's add a line break to give our page some space. What's the correct tag for a line break?",
          question: quizQuestions.find(q => q.question === 'What is the correct HTML element for inserting a line break?')!,
          feedback: {
            correct: "You got it! `<br>` for break. Simple, right? We're building this page piece by piece.",
            incorrect: "Close! The tag you're looking for is `<br>`. It's short for 'break'. Let's try the next one!",
          },
        },
        {
          narrative: "Great job! Now, let's connect our page to the rest of the web. What's the right tag to create a hyperlink to another page?",
          question: quizQuestions.find(q => q.question === 'What is the correct HTML for creating a hyperlink?')!,
          feedback: {
            correct: 'Perfect! The `<a>` tag with its `href` attribute is how we build the "web" in web-slinging. You\'re doing great!',
            incorrect: 'Almost! You\'re looking for the anchor tag, which is `<a>`. Then you use the `href` attribute to set the link destination. Keep at it!',
          },
        },
      ]
    },
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    description: 'A genius billionaire playboy philanthropist. Expects analytical precision.',
    personality: 'Analytical & Strict',
    difficulty: 'Advanced',
    image: 'iron-man',
    dataAiHint: 'iron suit',
    unlocksStone: 'Power',
    storyline: {
        learningRole: 'Advanced HTML & JavaScript',
        motivation: 'Why follow the rules when you can make your own?',
        scenarioText: `Genius, Billionaire, Coder\nOkay, listen up. Iron Man here.\nForget the basics. HTML has some powerful, lesser-known features. I expect you to know them.\nI won’t slow down for you, and I don’t give hints. Think fast, analyze the problem, and prove you can code like a genius.\nReady? Let’s see what your brain can really do.`,
        learningBehavior: ['No hints', 'Higher difficulty', 'Logic-heavy questions'],
        steps: [
            {
                narrative: "Let's start with something simple... for me. Semantic tags are important for my AI to read the page. What's the difference between `<strong>` and `<b>`?",
                question: quizQuestions.find(q => q.question === 'What is the difference between `<strong>` and `<b>` tags?')!,
                feedback: {
                    correct: "Obviously. One has meaning, the other is just for looks. Glad we're on the same page. Don't waste my time.",
                    incorrect: "Seriously? `<strong>` is semantic; it tells bots and screen readers something is important. `<b>` just makes it bold. Try to keep up.",
                },
            },
            {
                narrative: "My suit's HUD needs to draw some complex tactical displays on the fly. Which HTML5 element allows for that kind of dynamic rendering with JavaScript?",
                question: quizQuestions.find(q => q.question === 'What is the purpose of the `<canvas>` element in HTML5?')!,
                feedback: {
                    correct: "Correct. The `<canvas>` element. At least you know the tools of the trade. Now, can you actually use it?",
                    incorrect: "Wrong. It's `<canvas>`. How do you expect to build advanced tech if you don't know the basic components? Study up.",
                },
            },
            {
                narrative: "I need to load a script for my arc reactor diagnostics, but I can't have it blocking the main UI thread. What attribute on the `<script>` tag will download the script in parallel and execute it as soon as it's ready?",
                question: quizQuestions.find(q => q.question === 'What does the `async` attribute on a `<script>` tag do?')!,
                feedback: {
                    correct: "`async`. Good. Efficiency is key. Maybe you're not a total beginner after all.",
                    incorrect: "It's `async`. Using `defer` or nothing at all would slow things down. Performance matters. Don't be a bottleneck.",
                },
            },
        ],
    },
  },
  {
    id: 'captain-america',
    name: 'Captain America',
    description: 'A strategic and inspiring leader. Focuses on fundamentals and core concepts.',
    personality: 'Strategic & Principled',
    difficulty: 'Advanced',
    image: 'captain-america',
    dataAiHint: 'captain america shield',
    unlocksStone: 'Reality',
    storyline: {
        learningRole: 'Structured HTML Training',
        motivation: 'Discipline and structure are the keys to victory.',
        scenarioText: `The Discipline of Design\nSoldier, Captain America here.\nCoding isn’t about rushing — it’s about structure, balance, and consistency.\nHTML provides the skeleton. Let's make sure it's strong and orderly.\nStay focused, follow the rules, and let’s build a solid foundation.`,
        learningBehavior: ['Balanced difficulty', 'Limited hints', 'Concept-focused'],
        steps: [
            {
                narrative: "Alright, soldier. A good structure starts with organization. How do you group related items in a list that doesn't need a specific order?",
                question: quizQuestions.find(q => q.question === 'Which HTML element is used to define an unordered list?')!,
                feedback: {
                    correct: "Good. `<ul>` provides structure without unnecessary hierarchy. That's the kind of efficiency we need.",
                    incorrect: "Incorrect. An unordered list uses `<ul>`. Remember your training: structure is key. Pay attention to the details.",
                },
            },
            {
                narrative: "Next up: data. We need to display information clearly. What element defines a table for arranging data in rows and columns?",
                question: quizQuestions.find(q => q.question === 'Which element is used to define a table?')!,
                feedback: {
                    correct: "Correct. `<table>` is the foundation for presenting data. Clean, organized, effective.",
                    incorrect: "No. The correct element is `<table>`. A mission requires precise tools. Learn them.",
                },
            },
            {
                narrative: "Forms are critical for gathering intelligence. Which element is a container for various input elements?",
                question: quizQuestions.find(q => q.question === 'Which element is a container for different types of input elements like text fields, checkboxes, and submit buttons?')!,
                feedback: {
                    correct: "Excellent. The `<form>` element is crucial for user interaction. Mission accomplished.",
                    incorrect: "Wrong. A `<form>` element contains the inputs. Without the right container, your intelligence is scattered. Stay sharp.",
                },
            },
        ],
    },
  },
  {
    id: 'thor',
    name: 'Thor',
    description: 'The God of Thunder. His questions are powerful and direct, testing your might.',
    personality: 'Powerful & Direct',
    difficulty: 'Advanced',
    image: 'thor',
    dataAiHint: 'thor hammer',
    unlocksStone: 'Space',
    storyline: {
        learningRole: 'HTML Power Rounds',
        motivation: 'Your strength in code must be worthy of Mjölnir!',
        scenarioText: `Power of Knowledge\nHA! Thor, son of Odin, welcomes you!\nKnowledge is power — and power must be earned.\nAnswer correctly, and strike with lightning.\nFail, and feel the weight of Mjölnir’s challenge.\nShow me you are worthy of advanced concepts!`,
        learningBehavior: ['Medium-hard questions', 'Big rewards', 'Confidence-building'],
        steps: [
            {
                narrative: "HA! Are you worthy to wield the power of HTML? First, prove your strength! How do you make a list for warriors whose order of entry is paramount?",
                question: quizQuestions.find(q => q.question === 'How can you make a numbered list?')!,
                feedback: {
                    correct: "WORTHY! `<ol>` shows true order, fit for the heroes of Asgard! Your strength is impressive!",
                    incorrect: "UNWORTHY! A true warrior respects order! The answer is `<ol>`. You are not yet ready to lift the hammer of knowledge.",
                },
            },
            {
                narrative: "Now, a greater challenge! Every hero needs a shield, and every image needs alternate text for when it cannot be seen! Which attribute provides this vital backup?",
                question: quizQuestions.find(q => q.question === 'What does the `alt` attribute in an `<img>` tag provide?')!,
                feedback: {
                    correct: "YES! The `alt` attribute! A mighty blow for accessibility! You fight with both power and wisdom!",
                    incorrect: "A shieldless warrior is a defeated one! `alt` is the answer. A simple yet powerful tool you have overlooked.",
                },
            },
            {
                narrative: "For your final trial! A warrior must declare their intentions. Which input attribute declares that a field must be filled before the form is sent to battle... I mean, submitted?",
                question: quizQuestions.find(q => q.question === 'In HTML, which attribute is used to specify that an input field must be filled out?')!,
                feedback: {
                    correct: "`required`! You have proven your might and your commitment! The Bifrost of knowledge is open to you!",
                    incorrect: "You hesitate! A true champion never shirks their duty! The answer is `required`. Train harder!",
                },
            },
        ]
    },
  },
  {
    id: 'hulk',
    name: 'Hulk',
    description: 'The Incredible Hulk. His challenges are straightforward and smash bad code.',
    personality: 'Direct & Smashing',
    difficulty: 'Advanced',
    image: 'hulk',
    dataAiHint: 'green monster'
  },
  {
    id: 'doctor-strange',
    name: 'Doctor Strange',
    description: 'Guardian of time. His challenges are a race against the clock.',
    personality: 'Mysterious & Demanding',
    difficulty: 'Advanced',
    image: 'doctor-strange',
    dataAiHint: 'mystic arts',
    unlocksStone: 'Time',
    storyline: {
      learningRole: 'CSS Styling Sorcerer',
      motivation: 'The visual plane is just another dimension to master.',
      scenarioText: 'Welcome, apprentice.\nI am Doctor Strange. The Ancient One taught me to see all realities, including the visual design of the web.\nCSS is the incantation that shapes the appearance of the digital world.\nWe will bend colors, shapes, and layouts to our will. But be warned, precision is key. A single misplaced symbol can unravel the entire spell.\nAre you ready to look into the Eye of Agamotto and master the mystic arts of styling?',
      learningBehavior: ['Focus on visual properties', 'Puzzles about layout', 'Cryptic feedback'],
      steps: [
        {
          narrative: "First, let's change the very fabric of this element's background. What is the incantation to change its background color?",
          question: { topic: 'CSS', difficulty: 'easy', question: 'Which property is used to change the background color?', options: ['color', 'bgcolor', 'background-color', 'background'], correctAnswer: 'background-color' },
          feedback: {
            correct: "Indeed. `background-color` is the fundamental spell for altering an element's essence.",
            incorrect: 'Not quite. The correct incantation is `background-color`. Every detail matters in the mystic arts.',
          },
        },
        {
          narrative: 'Now, we must give our element space to breathe, pushing other elements away. What property controls the space outside an element?',
          question: { topic: 'CSS', difficulty: 'medium', question: 'Which property is used to control the spacing between elements?', options: ['margin', 'padding', 'space', 'border'], correctAnswer: 'margin' },
          feedback: {
            correct: 'Precisely. `margin` manipulates the astral plane around the element.',
            incorrect: 'Incorrect. `margin` is the force that pushes other elements away. `padding` is the space within.',
          },
        },
        {
          narrative: 'We must stack realities. An element needs to appear above another. Which property controls this vertical stacking order?',
          question: { topic: 'CSS', difficulty: 'hard', question: 'What is the purpose of the `z-index` property?', options: ['To set the zoom level of an element', 'To control the vertical stacking order of elements', 'To specify the font size', 'To add a shadow to an element'], correctAnswer: 'To control the vertical stacking order of elements' },
          feedback: {
            correct: 'You perceive the layers of reality. `z-index` is the key to controlling which elements are seen and which are hidden.',
            incorrect: 'Your perception is clouded. `z-index` controls the stacking order. It is a powerful but dangerous tool.',
          },
        },
      ]
    },
  },
  {
    id: 'thanos',
    name: 'Thanos',
    description: 'The Mad Titan. An adaptive final boss who will test your mastery.',
    personality: 'Adaptive & Unforgiving',
    difficulty: 'Final Boss',
    image: 'thanos',
    dataAiHint: 'infinity gauntlet',
    unlocksStone: 'Soul',
    storyline: {
        learningRole: 'HTML Mastery Boss',
        motivation: 'Perfectly balanced, as all things should be. Including your skillset.',
        scenarioText: `The Balance of Knowledge\nI am Thanos.\nYou have learned much… but learning must be balanced with mastery.\nI adapt to your strengths and expose your weaknesses.\nNo hints. No mercy. Only truth.\nDefeat me, and prove your knowledge is inevitable.`,
        learningBehavior: ['Fully adaptive', 'No hints', 'Mastery check'],
        steps: [
            {
                narrative: "You seek mastery. To achieve balance, you must understand the fine details. What is the difference between a `<div>` and a `<span>`?",
                question: quizQuestions.find(q => q.question === 'What is the primary difference between a `<div>` and a `<span>` element?')!,
                feedback: {
                    correct: "You understand the nature of things. One occupies its own space. The other exists within a line. Perfectly balanced.",
                    incorrect: "Imbalance. `<div>` is a block. `<span>` is an inline. Your understanding is flawed. This universe requires perfection.",
                },
            },
            {
                narrative: "Accessibility is not a suggestion. It is a reality. What is the purpose of an `aria-label`?",
                question: quizQuestions.find(q => q.question === 'What is the purpose of the `aria-label` attribute?')!,
                feedback: {
                    correct: "Correct. It provides access to those who cannot see. A small price to pay for salvation... and a usable web.",
                    incorrect: "You ignore half the universe of users. `aria-label` provides an accessible name. Your knowledge is incomplete.",
                },
            },
            {
                narrative: "Your final test. Some scripts are essential to the rendering of the page. Others can wait. What does the `defer` attribute on a `<script>` tag do?",
                question: quizQuestions.find(q => q.question === 'What does the `defer` attribute on a `<script>` tag instruct the browser to do?')!,
                feedback: {
                    correct: "It waits. It allows balance. The page renders, then the script runs. You have achieved mastery. You are... inevitable.",
                    incorrect: "You would sacrifice stability for speed. `defer` ensures the page is ready before execution. Your methods are chaotic. You have failed.",
                },
            },
        ]
    },
  },
];
