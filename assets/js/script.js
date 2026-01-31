// Global variables
let currentMode = 'shapes';
let currentWord = null;
let wordList = [];
let gameScore = 0;
let gameLives = 3;
let isProcessing = false;
let gameTimer = null;

// Selection State
let selectedLetters = [];
const minSelectionCount = 3;
let currentLevel = 1; // For matching mode
let currentWritingIndex = 0; // For writing mode

// --- Helper: Remove Diacritics (Tashkeel) ---
function removeTashkeel(text) {
    // Regex range includes common Arabic diacritics (Fatha, Damma, Kasra, Sukun, Shadda, etc.)
    return text.replace(/[\u064B-\u065F]/g, '');
}

// --- Tone.js Setup ---
const synth = new Tone.Synth().toDestination();

const correctSound = () => {
    try {
        synth.triggerAttackRelease("C5", "8n");
        setTimeout(() => synth.triggerAttackRelease("E5", "8n"), 50);
        setTimeout(() => synth.triggerAttackRelease("G5", "8n"), 100);
    } catch (e) { /* Audio context handling */ }
};

const incorrectSound = () => {
    try {
        const osc = new Tone.Oscillator({ frequency: "C2", type: "sawtooth", volume: -10 }).toDestination().start();
        osc.stop("+0.15");
    } catch (e) { /* Audio context handling */ }
};

// --- UI Elements ---
const welcomeScreen = document.getElementById('welcome-screen');
const selectionScreen = document.getElementById('selection-screen');
const gameScreen = document.getElementById('game-screen');

const wordPlaceholder = document.getElementById('word-placeholder');
const optionsGrid = document.getElementById('options-grid');
const scoreDisplay = document.getElementById('score-display');
const confettiHolder = document.getElementById('confetti-holder');
const positionHint = document.getElementById('position-hint');
const wordVisual = document.getElementById('word-visual');

// --- Selection Screen Logic ---

function showSelectionScreen(mode) {
    currentMode = mode;
    selectedLetters = []; // Reset selection

    welcomeScreen.classList.add('hidden');
    selectionScreen.classList.remove('hidden');

    document.getElementById('game-container').classList.add('flex-col', 'justify-center');

    const toggle = document.getElementById('select-all-toggle');
    if (toggle) toggle.checked = false;

    renderSelectionGrid();
    updateStartButton();
}

// --- Level Selection Screen Logic (for Matching Mode) ---
function showLevelSelectionScreen() {
    currentMode = 'matching';
    welcomeScreen.classList.add('hidden');
    document.getElementById('level-selection-screen').classList.remove('hidden');
    document.getElementById('game-container').classList.add('flex-col', 'justify-center');
}

function startWritingMode() {
    currentMode = 'writing';
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startGameLogic();
}

function startMatchingGame(level) {
    currentLevel = level;
    document.getElementById('level-selection-screen').classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startGameLogic();
}

function renderSelectionGrid() {
    const grid = document.getElementById('alphabet-grid');
    grid.innerHTML = '';

    arabicAlphabet.forEach(letter => {
        const isSupported = supportedLetters.includes(letter);
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.className = 'letter-grid-item font-bold text-xl shadow-sm transition-transform transform active:scale-95';

        if (!isSupported) {
            // Disabled style
            btn.classList.add('bg-gray-200', 'text-gray-400', 'border-gray-300', 'cursor-not-allowed');
            btn.disabled = true;
        } else {
            // Active/Selectable style
            btn.onclick = () => toggleLetterSelection(letter, btn);
            const isSelected = selectedLetters.includes(letter);
            updateLetterButtonStyle(btn, isSelected); // Respect current state
        }

        grid.appendChild(btn);
    });
}

function toggleLetterSelection(letter, btnElement) {
    const index = selectedLetters.indexOf(letter);

    if (index > -1) {
        // Deselect
        selectedLetters.splice(index, 1);
        updateLetterButtonStyle(btnElement, false);
    } else {
        // Select (Always allowed)
        selectedLetters.push(letter);
        updateLetterButtonStyle(btnElement, true);
    }

    // Sync Select All toggle state
    const toggle = document.getElementById('select-all-toggle');
    if (toggle) {
        const allSelected = supportedLetters.every(l => selectedLetters.includes(l));
        toggle.checked = allSelected;
    }

    updateStartButton();
}

function selectAllToggle() {
    const toggle = document.getElementById('select-all-toggle');
    if (!toggle) return;

    if (toggle.checked) {
        selectedLetters = [...supportedLetters];
    } else {
        selectedLetters = [];
    }

    renderSelectionGrid();
    updateStartButton();
}

function updateLetterButtonStyle(btn, isSelected) {
    // Base interactive classes
    btn.className = 'letter-grid-item font-bold text-2xl shadow-sm transition-transform transform active:scale-95 border-2';

    if (isSelected) {
        btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-800', 'scale-105');
    } else {
        btn.classList.add('bg-white', 'text-indigo-800', 'border-indigo-200', 'hover:bg-indigo-50', 'hover:border-indigo-300');
    }
}

function updateStartButton() {
    const btn = document.getElementById('start-game-btn');
    const instruction = document.getElementById('selection-instruction');
    const count = selectedLetters.length;

    instruction.textContent = `تم اختيار: ${count} (الحد الأدنى: ${minSelectionCount})`;

    if (count >= minSelectionCount) {
        btn.disabled = false;
        instruction.classList.add('text-green-600', 'font-bold');
        instruction.classList.remove('text-gray-600');
    } else {
        btn.disabled = true;
        instruction.classList.remove('text-green-600', 'font-bold');
        instruction.classList.add('text-gray-600');
    }
}

// --- Game Start Logic ---

async function confirmSelectionAndStart() {
    await Tone.start();

    // Clear previous timer to prevent conflicts
    if (gameTimer) clearTimeout(gameTimer);

    selectionScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    startGameLogic();
}

function goHome() {
    // Clear pending game timer to stop actions after leaving screen
    if (gameTimer) clearTimeout(gameTimer);

    // Reset UI state
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('level-selection-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');

    // Reset layout elements
    document.getElementById('question-card').classList.remove('hidden');
    document.getElementById('options-grid').classList.remove('hidden');
    document.getElementById('lives-display').classList.remove('hidden');

    const existingMsgs = document.getElementById('game-screen').querySelectorAll('.bg-green-100, .bg-red-100');
    existingMsgs.forEach(m => m.remove());

    document.getElementById('game-container').classList.add('flex-col', 'justify-center');

    confettiHolder.classList.add('hidden');
    confettiHolder.innerHTML = '';
}

function startGameLogic() {
    // Reset score
    gameScore = 0;
    document.getElementById('score-display').textContent = `النقاط: ${gameScore}`;

    // Reset layout just in case coming from game over
    document.getElementById('question-card').classList.remove('hidden');
    document.getElementById('options-grid').classList.remove('hidden');
    document.getElementById('lives-display').classList.remove('hidden');
    document.getElementById('game-container').classList.remove('flex-col', 'justify-center');

    const existingMsgs = document.getElementById('game-screen').querySelectorAll('.bg-green-100, .bg-red-100');
    existingMsgs.forEach(m => m.remove());

    gameLives = 3;
    updateHeartsDisplay();

    // 1. Select correct list based on mode
    let fullList = [];
    if (currentMode === 'shapes') {
        fullList = wordListShapes;
    } else if (currentMode === 'letters') {
        fullList = wordListLetters;
    } else if (currentMode === 'harakat') {
        fullList = wordListHarakat;
    } else if (currentMode === 'matching') {
        if (currentLevel === 1) fullList = wordListMatchLevel1;
        else if (currentLevel === 2) fullList = wordListMatchLevel2;
        else fullList = wordListMatchLevel3;
    } else if (currentMode === 'writing') {
        fullList = wordListWriting;
    }

    // 2. Filter list based on selection
    // Keep only words where the correct_letter is in the selectedLetters array
    // NOTE: 'matching' mode skips this as selectedLetters is empty and we want all words
    let filteredList = [];
    if (currentMode === 'matching' || currentMode === 'writing') {
        filteredList = fullList;
    } else {
        filteredList = fullList.filter(word => selectedLetters.includes(word.correct_letter));
    }

    // 3. Clone and shuffle
    wordList = JSON.parse(JSON.stringify(filteredList));
    shuffleArray(wordList);

    // 4. Limit count (Win condition logic)
    // If we have fewer than 10 words, we use all of them. If more, we cap at 10.
    const maxQuestions = Math.min(10, wordList.length);
    if (wordList.length > maxQuestions) {
        wordList = wordList.slice(0, maxQuestions);
    }

    loadQuestion();
}

// --- Standard Game Functions ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateHeartsDisplay() {
    const livesDisplay = document.getElementById('lives-display');
    livesDisplay.textContent = '❤️'.repeat(gameLives);
}

function gameComplete() {
    document.getElementById('question-card').classList.add('hidden');
    document.getElementById('options-grid').classList.add('hidden');
    document.getElementById('lives-display').classList.add('hidden');

    document.getElementById('game-container').classList.add('flex-col', 'justify-center');

    const completeMessage = document.createElement('div');
    completeMessage.className = "text-center p-8 bg-green-100 rounded-3xl shadow-xl border-4 border-green-500 max-w-lg w-full";
    completeMessage.innerHTML = `
    <div class="text-7xl mb-4">🎉</div>
    <h2 class="text-4xl font-extrabold text-green-600 mb-3">أحسنت!</h2>
    <p class="text-xl text-gray-700 mb-6">أكملت جميع الكلمات بنجاح!</p>
    <p class="text-2xl text-gray-800 mb-6 font-bold">نقاطك: ${gameScore}</p>
    <button onclick="goHome()" class="px-8 py-3 bg-blue-600 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 w-full transform hover:scale-105">القائمة الرئيسية</button>
`;
    document.getElementById('game-screen').appendChild(completeMessage);
}

function gameOver() {
    document.getElementById('question-card').classList.add('hidden');
    document.getElementById('options-grid').classList.add('hidden');
    document.getElementById('lives-display').classList.add('hidden');

    document.getElementById('game-container').classList.add('flex-col', 'justify-center');

    const gameOverMessage = document.createElement('div');
    gameOverMessage.className = "text-center p-8 bg-red-100 rounded-3xl shadow-xl border-4 border-red-500 max-w-lg w-full";
    gameOverMessage.innerHTML = `
    <div class="text-7xl mb-4">💔</div>
    <h2 class="text-4xl font-extrabold text-red-600 mb-3">انتهت اللعبة</h2>
    <p class="text-2xl text-gray-800 mb-6 font-bold">نقاطك: ${gameScore}</p>
    <button onclick="goHome()" class="px-8 py-3 bg-red-600 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-red-700 transition duration-300 w-full transform hover:scale-105">خروج</button>
    <button onclick="startGameLogic()" class="mt-4 px-8 py-3 bg-green-600 text-white text-2xl font-bold rounded-full shadow-lg hover:bg-green-700 transition duration-300 w-full transform hover:scale-105">إعادة المحاولة</button>
`;
    document.getElementById('game-screen').appendChild(gameOverMessage);
}

function getCorrectShape(word) {
    if (word.shape_key) return letterShapes[word.correct_letter][word.shape_key];

    let correctShapeKey;
    if (word.position.includes('الـبـدايـة')) correctShapeKey = 'initial';
    else if (word.position.includes('الـوسـط')) correctShapeKey = 'medial';
    else correctShapeKey = 'final';

    return letterShapes[word.correct_letter][correctShapeKey];
}

// Ensure visual update of placeholders (Writing Mode)
function updateWritingPlaceholders() {
    if (currentMode !== 'writing' || !currentWord) return;

    const container = document.getElementById('word-placeholder');
    container.innerHTML = ''; // Rebuild

    currentWord.letters.forEach((l, idx) => {
        const span = document.createElement('span');
        span.className = "mx-1 text-4xl border-b-4 border-gray-300 w-10 text-center inline-block";

        if (idx < currentWritingIndex) {
            // Completed letter - No underline, just the letter
            span.textContent = l.shape;
            span.classList.add('text-indigo-700');
        } else if (idx === currentWritingIndex) {
            // Current target - Keep underline/placeholder style
            span.textContent = '؟';
            span.classList.add('text-gray-400', 'animate-pulse', 'border-b-4', 'border-gray-300');
        } else {
            // Future - Keep underline
            span.textContent = '';
            span.classList.add('border-b-4', 'border-gray-300');
        }
        container.appendChild(span);
    });
}

function generateHarakatOptions(letter) {
    if (letter === 'أ') {
        return ['أَ', 'أُ', 'إِ'];
    }

    const initialShape = letterShapes[letter]['initial'];

    // Correct logic for handling non-connectors
    if (initialShape.includes('ـ')) {
        return [
            initialShape.replace('ـ', 'َـ'), // Fatha
            initialShape.replace('ـ', 'ُـ'), // Damma
            initialShape.replace('ـ', 'ِـ')  // Kasra
        ];
    } else {
        // Non-connectors (d, dh, r, z, etc.)
        return [
            initialShape + 'َ', // Fatha
            initialShape + 'ُ', // Damma
            initialShape + 'ِ'  // Kasra
        ];
    }
}

function loadQuestion() {
    if (wordList.length === 0) {
        gameComplete();
        return;
    }


    isProcessing = false;
    currentWord = wordList.pop();
    currentWritingIndex = 0; // Reset for writing mode

    // 1. Display Visual
    wordVisual.innerHTML = ''; // Clear previous

    if (currentMode === 'matching') {
        // In Matching mode, we HIDE the visual (image) and show the word clearly
        wordVisual.classList.add('hidden');
    } else {
        wordVisual.classList.remove('hidden');
        if (currentWord.image_url) {
            const img = document.createElement('img');
            img.src = currentWord.image_url;
            img.className = 'w-full h-full object-contain drop-shadow-md';
            img.alt = currentWord.full_word;
            // Added referrerpolicy and onerror for robustness
            img.setAttribute('referrerpolicy', 'no-referrer');
            img.setAttribute('onerror', 'this.onerror=null; this.src="https://placehold.co/128x128/9CA3AF/FFFFFF?text=خطأ+صورة"');
            wordVisual.appendChild(img);
            wordVisual.classList.remove('text-6xl');
        } else {
            wordVisual.textContent = currentWord.image_emoji;
            wordVisual.classList.add('text-6xl');
        }
    }

    // 2. Display the blank word (CLEANED of harakat)
    // We use the helper function to strip harakat from the blank word pattern

    if (currentMode === 'matching') {
        // In matching mode, we show the FULL WORD (no blanks)
        wordPlaceholder.innerHTML = currentWord.full_word;
    } else if (currentMode === 'writing') {
        // Build placeholders
        updateWritingPlaceholders();
    } else {
        let blankWordDisplay = currentWord.blank_word;

        const highlightedWord = blankWordDisplay.replace(
            '_',
            '<span class="highlight-blank">ـ</span>'
        );

        wordPlaceholder.innerHTML = highlightedWord;
    }

    // Hint text changes slightly based on mode
    // Hint text changes slightly based on mode
    if (currentMode === 'shapes') {
        positionHint.textContent = `(الشكل الصحيح لحرف ${currentWord.correct_letter})`;
    } else if (currentMode === 'harakat') {
        positionHint.textContent = `(الحركة الصحيحة لحرف ${currentWord.correct_letter})`;
    } else if (currentMode === 'matching') {
        positionHint.textContent = `(اختر الصورة المناسبة)`;
    } else if (currentMode === 'writing') {
        positionHint.textContent = `(اكتب الكلمة بالترتيب)`;
    } else {
        positionHint.textContent = `(ما هو الحرف الناقص؟)`;
    }

    // 3. Generate options
    optionsGrid.innerHTML = '';
    if (currentMode === 'writing') {
        optionsGrid.classList.remove('gap-4');
        optionsGrid.classList.add('gap-1');
    } else {
        optionsGrid.classList.remove('gap-1');
        optionsGrid.classList.add('gap-4');
    }
    let options = [];

    if (currentMode === 'shapes') {
        const allShapesRaw = Object.values(letterShapes[currentWord.correct_letter]);
        options = [...new Set(allShapesRaw)];
    } else if (currentMode === 'harakat') {
        // Generate the 3 harakat options for the correct letter
        options = generateHarakatOptions(currentWord.correct_letter);
    } else if (currentMode === 'matching') {
        // Options are objects: { image_emoji: ..., isTimeout: ... }
        // 1. Correct option
        options = [currentWord];

        // 2. Distractors (2 random from list)
        let currentMatchList = [];
        if (currentLevel === 1) currentMatchList = wordListMatchLevel1;
        else if (currentLevel === 2) currentMatchList = wordListMatchLevel2;
        else currentMatchList = wordListMatchLevel3;

        let distractors = currentMatchList.filter(w => w.word_id !== currentWord.word_id);
        shuffleArray(distractors);
        options.push(...distractors.slice(0, 2));
    } else if (currentMode === 'writing') {
        // Show ALL alphabet letters
        options = [...arabicAlphabet];
        // Don't shuffle the alphabet (keep order A-Ya)
    } else {
        // Letters mode - Dynamic Distractors Logic
        // 1. Get other selected letters (excluding the correct one)
        let availableDistractors = selectedLetters.filter(l => l !== currentWord.correct_letter);

        // 2. Shuffle ensuring variety
        shuffleArray(availableDistractors);

        // 3. Take up to 3 distractors from selection
        let chosenDistractors = availableDistractors.slice(0, 3);

        // 4. If we don't have enough (e.g. user selected fewer than 4 letters total), fill with random from alphabet
        while (chosenDistractors.length < 3) {
            const randomLetter = arabicAlphabet[Math.floor(Math.random() * arabicAlphabet.length)];
            // Avoid duplicates: correct letter or strictly existing chosen distractors
            if (randomLetter !== currentWord.correct_letter && !chosenDistractors.includes(randomLetter)) {
                chosenDistractors.push(randomLetter);
            }
        }

        options = [currentWord.correct_letter, ...chosenDistractors];
    }

    if (currentMode !== 'writing') {
        shuffleArray(options);
    }

    options.forEach(val => {
        const button = document.createElement('button');

        if (currentMode === 'matching') {
            // val is a word object here
            button.textContent = val.image_emoji;
            button.onclick = () => checkAnswer(val, button);
        } else {
            button.textContent = val;
            button.onclick = () => checkAnswer(val, button);
        }

        if (currentMode === 'writing') {
            // Use style similar to letter picker
            button.className = 'option-button font-bold text-2xl shadow-sm transition-transform transform active:scale-95 border-2 bg-white text-indigo-800 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 w-12 h-12 flex items-center justify-center rounded-xl';
        } else {
            button.className = 'option-button bg-yellow-500 text-white font-extrabold p-4 rounded-2xl shadow-xl hover:bg-yellow-600 active:scale-95 transition duration-150 transform flex items-center justify-center';
        }

        optionsGrid.appendChild(button);
    });
}

function checkAnswer(chosenValue, buttonElement) {
    if (isProcessing) return;

    let isCorrect = false;

    if (currentMode === 'shapes') {
        const correctShape = getCorrectShape(currentWord);
        isCorrect = (chosenValue === correctShape);
    } else if (currentMode === 'harakat') {
        // Compare with the pre-defined correct visual option
        isCorrect = (chosenValue === currentWord.correct_option);
    } else if (currentMode === 'matching') {
        // chosenValue is the whole word object
        isCorrect = (chosenValue.word_id === currentWord.word_id);
    } else if (currentMode === 'writing') {
        // Check current letter index
        const targetLetter = currentWord.letters[currentWritingIndex].letter;
        isCorrect = (chosenValue === targetLetter);
    } else {
        isCorrect = (chosenValue === currentWord.correct_letter);
    }

    if (isCorrect) {
        if (currentMode === 'writing') {
            // Writing Logic: Advance one letter
            currentWritingIndex++;
            updateWritingPlaceholders();
            correctSound();
            isProcessing = true; // Briefly block? Actually no, let them type fast if they want.
            setTimeout(() => { isProcessing = false; }, 200);

            if (currentWritingIndex >= currentWord.letters.length) {
                // Word Complete
                gameScore++;
                scoreDisplay.textContent = `النقاط: ${gameScore}`;

                // Show Full Connected Word
                wordPlaceholder.innerHTML = '';
                wordPlaceholder.textContent = currentWord.full_word;
                wordPlaceholder.classList.add('text-6xl', 'text-indigo-700');

                showReward();
                document.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);
                gameTimer = setTimeout(() => {
                    wordPlaceholder.classList.remove('text-6xl');
                    loadQuestion();
                }, 3000);
            }
        } else {
            isProcessing = true;
            gameScore++;
            scoreDisplay.textContent = `النقاط: ${gameScore}`;

            correctSound();
            wordPlaceholder.textContent = currentWord.full_word;
            showReward();

            document.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);

            // Assign timeout to variable so it can be cleared
            gameTimer = setTimeout(() => {
                loadQuestion();
            }, 2500);
        }

    } else {
        incorrectSound();

        // In Writing mode, we don't necessarily lose a life immediately or maybe we do?
        // Prompt says: "if they get one letter wrong, we don't place it... if they get a letter wrong we make a buzz sound"
        // It doesn't explicitly say lose a life, but standard game logic suggests penalty.
        // I will keep life loss for consistency but maybe make it less harsh visually?
        // Let's stick to standard penalty.

        gameLives--;
        updateHeartsDisplay();

        if (gameLives <= 0) {
            isProcessing = true;
            gameOver();
            return;
        }

        buttonElement.classList.add('bg-red-500', 'ring-4', 'ring-red-300', 'text-white');
        if (currentMode === 'writing') buttonElement.classList.remove('bg-white', 'text-indigo-800');
        else buttonElement.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');

        setTimeout(() => {
            buttonElement.classList.remove('bg-red-500', 'ring-4', 'ring-red-300', 'text-white');
            if (currentMode === 'writing') buttonElement.classList.add('bg-white', 'text-indigo-800');
            else buttonElement.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
        }, 500);
    }
}

// --- Fun Reward Implementation ---

function showReward() {
    startConfetti();
    // REMOVED: Bouncing Emoji horizontal animation logic as per request.
    // Only confetti remains.
}

function startConfetti() {
    confettiHolder.classList.remove('hidden');
    const colors = ['#f43f5e', '#facc15', '#4ade80', '#3b82f6', '#ec4899'];
    const count = 50;

    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.left = `${Math.random() * 100}vw`;
        c.style.top = `${Math.random() * 10 - 20}vh`;
        c.style.animationDelay = `${Math.random() * 0.5}s`;
        c.style.animationDuration = `${1.5 + Math.random() * 1}s`;
        confettiHolder.appendChild(c);
    }

    setTimeout(() => {
        confettiHolder.innerHTML = '';
        confettiHolder.classList.add('hidden');
    }, 2500);
}

