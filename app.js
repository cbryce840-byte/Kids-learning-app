const state = {
    customWords: ["cereal", "bicycle", "circus", "city", "face"],
    generalWords: ["apple", "banana", "cat", "dog", "elephant", "fish", "giraffe", "house", "ice", "jump", "kite", "lion", "monkey", "nest", "orange", "pencil", "queen", "rabbit", "sun", "tree", "umbrella", "van", "water", "box", "yellow", "zebra", "book", "chair", "desk", "park"]
};

function showMenu() {
    document.getElementById('main-menu').style.display = 'grid';
    document.getElementById('activity-container').style.display = 'none';
}

function startModule(moduleName) {
    document.getElementById('main-menu').style.display = 'none';
    const container = document.getElementById('activity-container');
    const content = document.getElementById('activity-content');
    container.style.display = 'block';

    if (moduleName === 'maths') {
        loadMathsActivity(content);
    } else if (moduleName === 'spelling') {
        loadSpellingActivity(content);
    } else if (moduleName === 'punctuation') {
        loadPunctuationActivity(content);
    } else if (moduleName === 'capitalization') {
        loadCapitalizationActivity(content);
    } else if (moduleName === 'prepositions') {
        loadPrepositionActivity(content);
    }
}

/* 1. MATHS: SIDE-BY-SIDE SETS */
function loadMathsActivity(content) {
    const numLeft = Math.floor(Math.random() * 8) + 1;
    const numRight = Math.floor(Math.random() * 8) + 1;
    const items = ['🍎', '🚗', '⭐', '🎈', '🐶', '🏀'];
    const chosenEmoji = items[Math.floor(Math.random() * items.length)];

    let leftEmojis = Array(numLeft).fill(chosenEmoji).map(e => `<span class="item-emoji">${e}</span>`).join('');
    let rightEmojis = Array(numRight).fill(chosenEmoji).map(e => `<span class="item-emoji">${e}</span>`).join('');

    content.innerHTML = `
        <h2>Comparing Sets</h2>
        <p>Count the objects on each side. Pick $<$, $>$, or $=$</p>
        <div class="side-by-side-container">
            <div class="set-box">${leftEmojis}</div>
            <div class="symbol-slot" id="selected-symbol">?</div>
            <div class="set-box">${rightEmojis}</div>
        </div>
        <div class="options-row">
            <button class="btn-option" onclick="checkMathAnswer('<', ${numLeft}, ${numRight})">&lt;</button>
            <button class="btn-option" onclick="checkMathAnswer('=', ${numLeft}, ${numRight})">=</button>
            <button class="btn-option" onclick="checkMathAnswer('>', ${numLeft}, ${numRight})">&gt;</button>
        </div>
        <div id="math-feedback" style="margin-top:15px; font-weight:bold; text-align:center;"></div>
    `;
}

function checkMathAnswer(selected, left, right) {
    let correct = '=';
    if (left < right) correct = '<';
    if (left > right) correct = '>';

    const feedback = document.getElementById('math-feedback');
    if (selected === correct) {
        feedback.innerHTML = "<span style='color:green;'>🎉 Great job Dillon! That's correct!</span>";
        setTimeout(() => startModule('maths'), 1500);
    } else {
        feedback.innerHTML = "<span style='color:red;'>Try again! Count carefully.</span>";
    }
}

/* 2. SPELLING & PHONICS */
function loadSpellingActivity(content) {
    const word = state.generalWords[Math.floor(Math.random() * state.generalWords.length)];
    content.innerHTML = `
        <h2>Spelling Practice</h2>
        <p>Listen and type the word you hear:</p>
        <button class="btn-option" onclick="speakWord('${word}')">🔊 Listen to Word</button>
        <br><br>
        <input type="text" id="spelling-input" placeholder="Type word here">
        <br><br>
        <button class="btn-option" onclick="checkSpelling('${word}')">Submit</button>
        <div id="spelling-feedback" style="margin-top:15px; font-weight:bold;"></div>
    `;
}

function speakWord(word) {
    const msg = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(msg);
}

function checkSpelling(correctWord) {
    const val = document.getElementById('spelling-input').value.toLowerCase().trim();
    const feedback = document.getElementById('spelling-feedback');
    if (val === correctWord) {
        feedback.innerHTML = "<span style='color:green;'>🌟 Awesome spelling, Dillon!</span>";
        setTimeout(() => startModule('spelling'), 1500);
    } else {
        feedback.innerHTML = "<span style='color:red;'>Not quite, try listening again!</span>";
    }
}

/* 3. PUNCTUATION */
function loadPunctuationActivity(content) {
    const questions = [
        { text: "Where is the dog", answer: "?" },
        { text: "I love to play games", answer: "." },
        { text: "What is your name", answer: "?" },
        { text: "The sun is shining bright", answer: "." }
    ];
    const q = questions[Math.floor(Math.random() * questions.length)];

    content.innerHTML = `
        <h2>Punctuation Quest</h2>
        <p>Does this sentence need a period <strong>.</strong> or a question mark <strong>?</strong></p>
        <h3>"${q.text} <span id='punc-slot'>__</span>"</h3>
        <div class="options-row">
            <button class="btn-option" onclick="checkPunc('.', '${q.answer}')">. (Period)</button>
            <button class="btn-option" onclick="checkPunc('?', '${q.answer}')">? (Question Mark)</button>
        </div>
        <div id="punc-feedback" style="margin-top:15px; font-weight:bold; text-align:center;"></div>
    `;
}

function checkPunc(selected, correct) {
    const feedback = document.getElementById('punc-feedback');
    if (selected === correct) {
        feedback.innerHTML = "<span style='color:green;'>🎯 Spot on!</span>";
        setTimeout(() => startModule('punctuation'), 1500);
    } else {
        feedback.innerHTML = "<span style='color:red;'>Oops, try the other one!</span>";
    }
}

/* 4. CAPITALIZATION */
function loadCapitalizationActivity(content) {
    content.innerHTML = `
        <h2>Capitalization Rules</h2>
        <div style="text-align:left; background:#fff3cd; padding:15px; border-radius:10px; margin-bottom:15px;">
            📌 <strong>Rules:</strong><br>
            1. Always capitalize the first letter of a sentence.<br>
            2. Capitalize names (like <strong>Dillon</strong>).<br>
            3. Always capitalize the word <strong>I</strong>.
        </div>
        <p>Which sentence is capitalized correctly?</p>
        <div class="options-row" style="flex-direction:column; gap:10px;">
            <button class="btn-option" onclick="checkCap(true)">Dillon went to the park.</button>
            <button class="btn-option" onclick="checkCap(false)">dillon went to the park.</button>
        </div>
        <div id="cap-feedback" style="margin-top:15px; font-weight:bold; text-align:center;"></div>
    `;
}

function checkCap(isCorrect) {
    const feedback = document.getElementById('cap-feedback');
    if (isCorrect) {
        feedback.innerHTML = "<span style='color:green;'>✨ You got it right!</span>";
        setTimeout(() => startModule('capitalization'), 1500);
    } else {
        feedback.innerHTML = "<span style='color:red;'>Remember: Names must start with a CAPITAL letter!</span>";
    }
}

/* 5. PREPOSITION QUEST */
function loadPrepositionActivity(content) {
    content.innerHTML = `
        <h2>Preposition Quest</h2>
        <p>Drag the <strong>🦕 Dino</strong> into the <strong>Box</strong>!</p>
        <div class="prep-canvas" id="canvas">
            <div class="target-zone" style="top:80px; left:220px; width:100px; height:100px;">📦 Box</div>
            <div class="draggable-character" id="dino-char">🦕</div>
        </div>
        <div id="prep-feedback" style="font-weight:bold; text-align:center;"></div>
    `;
    initDraggable();
}

function initDraggable() {
    const char = document.getElementById('dino-char');
    let isDragging = false;

    const onMove = (e) => {
        if (!isDragging) return;
        const canvas = document.getElementById('canvas').getBoundingClientRect();
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let clientY = e.touches ? e.touches[0].clientY : e.clientY;

        let x = clientX - canvas.left - 30;
        let y = clientY - canvas.top - 30;

        char.style.left = `${x}px`;
        char.style.top = `${y}px`;
    };

    const onStart = () => { isDragging = true; };
    const onEnd = () => { isDragging = false; };

    char.addEventListener('mousedown', onStart);
    char.addEventListener('touchstart', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
}

/* PARENT GATE FUNCTIONS */
function openParentGate() {
    document.getElementById('parent-modal').style.display = 'flex';
}

function closeParentGate() {
    document.getElementById('parent-modal').style.display = 'none';
    document.getElementById('parent-dashboard').style.display = 'none';
}

function verifyParentGate() {
    const ans = document.getElementById('gate-answer').value.trim();
    if (ans === '9') {
        document.getElementById('parent-dashboard').style.display = 'block';
    } else {
        alert("Incorrect answer! Gate locked.");
    }
}

function addCustomWord() {
    const input = document.getElementById('new-word-input');
    if (input.value.trim() !== "") {
        state.customWords.push(input.value.trim());
        alert(`Added word: ${input.value.trim()}`);
        input.value = "";
    }
}

