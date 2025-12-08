# Arabic Alphabet Game (لعبة الأبجدية الممتعة)

A fun, interactive, and educational web-based game designed to help children learn the Arabic alphabet, letter forms (Initial, Medial, Final), and vowel signs (Harakat).

![Game Preview](https://placehold.co/600x400/indigo/white?text=Arabic+Game+Preview)

## 🎮 Game Modes

The application features three distinct game modes to reinforce different aspects of the language:

### 1. Shape Mastery (أشكال الحروف)
Focuses on recognizing how Arabic letters change their shape depending on their position in a word.
- **Goal:** Identify the correct letter form for the given position (Beginning, Middle, End).
- **Example:** Identify the shape of 'Ba' (ب) at the end of a word.

### 2. Missing Letter (الحرف الصحيح)
A "Fill in the blank" style game to test vocabulary and spelling.
- **Goal:** Choose the missing letter to complete the word shown.
- **Example:** `_مَكَة` (Fish) -> Select `س`.

### 3. Vowel Signs (الحركات)
Teaches the short vowels: Fatha (َ ), Damma (ُ ), and Kasra (ِ ).
- **Goal:** Select the correct vowel sign for the highlighted letter in the word.
- **Example:** `أُذُن` (Ear) -> Select `أُ` (Damma).

## ✨ Features

- **Complete Alphabet:** Covers all 28 Arabic letters from Alif (أ) to Ya (ي).
- **Position Context:** Words for Initial, Medial, and Final positions for every letter.
- **Interactive Audio:** Sound effects for correct and incorrect answers using `Tone.js`.
- **Visual Learning:** Rich use of emojis and images to associate words with meaning.
- **Progress Tracking:** Live score and lives system (3 hearts).
- **Responsive Design:** Works beautifully on desktops, tablets, and mobile devices.
- **Dynamic Gameplay:** Distractors are intelligently generated based on the letters selected by the player, ensuring relevant practice.
- **Celebration Animations:** Confetti rewards for correct answers.

## 🛠️ Technologies Used

- **HTML5:** Semantic structure.
- **Tailwind CSS:** Modern utility-first styling for a playful and responsive UI.
- **JavaScript (ES6+):** Game logic, state management, and DOM manipulation.
- **Tone.js:** For synthesizing sound effects directly in the browser.
- **Google Fonts:** Uses the 'Changa' font for clear, readable Arabic typography.

## 🚀 How to Run

Since this is a static web application, no backend installation is required!

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/arabic-alphabet-game.git
   ```
2. **Open the file:**
   Simply double-click `index.html` to open it in your favorite web browser (Chrome, Firefox, Safari, Edge).

## 🧩 Customization

You can easily add new words or modify existing ones by editing the `wordList` arrays in `index.html`:

- `wordListShapes`: For Mode 1.
- `wordListLetters`: For Mode 2.
- `wordListHarakat`: For Mode 3.

**Format:**
```javascript
{
    word_id: 101,
    correct_letter: 'أ',
    blank_word: '_رنب',      // Use underscore for blank
    full_word: 'أَرنب',       // Full word for display after winning
    position: 'أول الكلمة',
    image_emoji: '🐰',       // Emoji visual
    // or use image_url: 'path/to/image.jpg'
}
```

## 📄 License

This project is open-source and available for educational use.