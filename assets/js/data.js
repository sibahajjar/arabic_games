// Supported letters (includes everything from Alif to Ya)
const supportedLetters = [
    'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
    'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق',
    'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي',
];

const arabicAlphabet = [
    'أ', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
    'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق',
    'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي', 'ة'
];

// --- Letter Shapes Mapping ---
const letterShapes = {
    'أ': { initial: 'أ', medial: 'ـأ', final: 'ـأ', isolated: 'أ' },
    'ا': { initial: 'ا', medial: 'ـا', final: 'ـا', isolated: 'ا' },
    'ب': { initial: 'بـ', medial: 'ـبـ', final: 'ـب', isolated: 'ب' },
    'ت': { initial: 'تـ', medial: 'ـتـ', final: 'ـت', isolated: 'ت' },
    'ث': { initial: 'ثـ', medial: 'ـثـ', final: 'ـث', isolated: 'ث' },
    'ج': { initial: 'جـ', medial: 'ـجـ', final: 'ـج', isolated: 'ج' },
    'ح': { initial: 'حـ', medial: 'ـحـ', final: 'ـح', isolated: 'ح' },
    'خ': { initial: 'خـ', medial: 'ـخـ', final: 'ـخ', isolated: 'خ' },
    'د': { initial: 'د', medial: 'ـد', final: 'ـد', isolated: 'د' },
    'ذ': { initial: 'ذ', medial: 'ـذ', final: 'ـذ', isolated: 'ذ' },
    'ر': { initial: 'ر', medial: 'ـر', final: 'ـر', isolated: 'ر' },
    'ز': { initial: 'ز', medial: 'ـز', final: 'ـز', isolated: 'ز' },
    'س': { initial: 'سـ', medial: 'ـسـ', final: 'ـس', isolated: 'س' },
    'ش': { initial: 'شـ', medial: 'ـشـ', final: 'ـش', isolated: 'ش' },
    'ص': { initial: 'صـ', medial: 'ـصـ', final: 'ـص', isolated: 'ص' },
    'ض': { initial: 'ضـ', medial: 'ـضـ', final: 'ـض', isolated: 'ض' },
    'ط': { initial: 'طـ', medial: 'ـطـ', final: 'ـط', isolated: 'ط' },
    'ظ': { initial: 'ظـ', medial: 'ـظـ', final: 'ـظ', isolated: 'ظ' },
    'ع': { initial: 'عـ', medial: 'ـعـ', final: 'ـع', isolated: 'ع' },
    'غ': { initial: 'غـ', medial: 'ـغـ', final: 'ـغ', isolated: 'غ' },
    'ف': { initial: 'فـ', medial: 'ـفـ', final: 'ـف', isolated: 'ف' },
    'ق': { initial: 'قـ', medial: 'ـقـ', final: 'ـق', isolated: 'ق' },
    'ك': { initial: 'كـ', medial: 'ـكـ', final: 'ـك', isolated: 'ك' },
    'ل': { initial: 'لـ', medial: 'ـلـ', final: 'ـل', isolated: 'ل' },
    'م': { initial: 'مـ', medial: 'ـمـ', final: 'ـم', isolated: 'م' },
    'ن': { initial: 'نـ', medial: 'ـنـ', final: 'ـن', isolated: 'ن' },
    'هـ': { initial: 'هـ', medial: 'ـهـ', final: 'ـه', isolated: 'هـ' },
    'و': { initial: 'و', medial: 'ـو', final: 'ـو', isolated: 'و' },
    'ي': { initial: 'يـ', medial: 'ـيـ', final: 'ـي', isolated: 'ي' },
};

// --- Harakat Helpers ---
const harakat = {
    fatha: 'َ',
    damma: 'ُ',
    kasra: 'ِ'
};

// --- Game Data: Mode 1 (Shapes) ---
const wordListShapes = [
    // A, B, T, Th
    { word_id: 1, correct_letter: 'ب', blank_word: '_ـاب', full_word: 'بَاب', position: 'الـبـدايـة', image_emoji: '🚪' },
    { word_id: 2, correct_letter: 'أ', blank_word: '_سَد', full_word: 'أَسَد', position: 'الـبـدايـة', image_emoji: '🦁' },
    { word_id: 3, correct_letter: 'ت', blank_word: '_ـفاحة', full_word: 'تُفَاحَة', position: 'الـبـدايـة', image_emoji: '🍎' },
    { word_id: 4, correct_letter: 'ث', blank_word: '_ـعْلَب', full_word: 'ثَعْلَب', position: 'الـبـدايـة', image_emoji: '🦊' },
    { word_id: 5, correct_letter: 'ت', blank_word: 'كـ_ـب', full_word: 'كِتَب', position: 'الـوسـط', image_emoji: '📚' },
    { word_id: 6, correct_letter: 'ب', blank_word: 'خُـ_ـز', full_word: 'خُبْز', position: 'الـوسـط', image_emoji: '🍞' },
    { word_id: 7, correct_letter: 'ث', blank_word: 'مُـ_ـلث', full_word: 'مُثَلث', position: 'الـوسـط', image_emoji: '🔺' },
    { word_id: 8, correct_letter: 'ث', blank_word: 'لَـيْـ_', full_word: 'لَيْت', position: 'الـنـهـايـة', image_emoji: '🐅' },
    { word_id: 9, correct_letter: 'ب', blank_word: 'أَ_', full_word: 'أَب', position: 'الـنـهـايـة', image_emoji: '👨', shape_key: 'isolated' },
    { word_id: 10, correct_letter: 'ت', blank_word: 'بَـيْـ_', full_word: 'بَيْت', position: 'الـنـهـايـة', image_emoji: '🏠' },
    { word_id: 11, correct_letter: 'أ', blank_word: 'يَـقْـرَ_', full_word: 'يَقْرَأ', position: 'الـنـهـايـة', image_emoji: '📖', shape_key: 'isolated' },

    // Jeem (ج)
    { word_id: 12, correct_letter: 'ج', blank_word: '_ـمَل', full_word: 'جَمَل', position: 'الـبـدايـة', image_emoji: '🐪' },
    { word_id: 13, correct_letter: 'ج', blank_word: 'شَـ_ـرَة', full_word: 'شَجَرَة', position: 'الـوسـط', image_emoji: '🌳' },
    { word_id: 14, correct_letter: 'ج', blank_word: 'ثَلْـ_', full_word: 'ثَلْج', position: 'الـنـهـايـة', image_emoji: '❄️' },

    // Haa (ح)
    { word_id: 15, correct_letter: 'ح', blank_word: '_ـصَان', full_word: 'حِصَان', position: 'الـبـدايـة', image_emoji: '🐎' },
    { word_id: 16, correct_letter: 'ح', blank_word: 'بَـ_ـر', full_word: 'بَحْر', position: 'الـوسـط', image_emoji: '🌊' },
    { word_id: 17, correct_letter: 'ح', blank_word: 'مُفْتَا_', full_word: 'مُفْتَاح', position: 'الـنـهـايـة', image_emoji: '🔑', shape_key: 'isolated' },

    // Khaa (خ)
    { word_id: 18, correct_letter: 'خ', blank_word: '_ـرُوف', full_word: 'خَرُوف', position: 'الـبـدايـة', image_emoji: '🐑' },
    { word_id: 19, correct_letter: 'خ', blank_word: 'نَـ_ـلَة', full_word: 'نَخْلَة', position: 'الـوسـط', image_emoji: '🌴' },
    { word_id: 20, correct_letter: 'خ', blank_word: 'صَارُو_', full_word: 'صَارُوخ', position: 'الـنـهـايـة', image_emoji: '🚀', shape_key: 'isolated' },

    // Dal (د)
    { word_id: 21, correct_letter: 'د', blank_word: '_ب', full_word: 'دُب', position: 'الـبـدايـة', image_emoji: '🐻', shape_key: 'initial' },
    { word_id: 22, correct_letter: 'د', blank_word: 'وَرْ_ة', full_word: 'وَرْدَة', position: 'الـوسـط', image_emoji: '🌹', shape_key: 'isolated' },
    { word_id: 23, correct_letter: 'د', blank_word: 'يَـ_', full_word: 'يَد', position: 'الـنـهـايـة', image_emoji: '✋', shape_key: 'final' },

    // Dhal (ذ)
    { word_id: 24, correct_letter: 'ذ', blank_word: '_رَة', full_word: 'ذُرَة', position: 'الـبـدايـة', image_emoji: '🌽', shape_key: 'initial' },
    { word_id: 25, correct_letter: 'ذ', blank_word: 'نَافِـ_ة', full_word: 'نَافِذَة', position: 'الـوسـط', image_emoji: '🪟', shape_key: 'medial' },
    { word_id: 26, correct_letter: 'ذ', blank_word: 'قُنْفُـ_', full_word: 'قُنْفُذ', position: 'الـنـهـايـة', image_emoji: '🦔', shape_key: 'final' },

    // Ra (ر)
    { word_id: 27, correct_letter: 'ر', blank_word: '_يشَة', full_word: 'رِيشَة', position: 'الـبـدايـة', image_emoji: '🪶', shape_key: 'initial' },
    { word_id: 28, correct_letter: 'ر', blank_word: 'كُـ_سِي', full_word: 'كُرْسِي', position: 'الـوسـط', image_emoji: '🪑', shape_key: 'medial' },
    { word_id: 29, correct_letter: 'ر', blank_word: 'قَمَـ_', full_word: 'قَمَر', position: 'الـنـهـايـة', image_emoji: '🌙', shape_key: 'final' },

    // Zay (ز)
    { word_id: 30, correct_letter: 'ز', blank_word: '_هْرَة', full_word: 'زَهْرَة', position: 'الـبـدايـة', image_emoji: '🌼', shape_key: 'initial' },
    { word_id: 31, correct_letter: 'ز', blank_word: 'مَنْـ_ل', full_word: 'مَنْزِل', position: 'الـوسـط', image_emoji: '🏠', shape_key: 'medial' },
    { word_id: 32, correct_letter: 'ز', blank_word: 'مَوْ_', full_word: 'مَوْز', position: 'الـنـهـايـة', image_emoji: '🍌', shape_key: 'isolated' },

    // Ain (ع)
    { word_id: 33, correct_letter: 'ع', blank_word: '_ـيْن', full_word: 'عَيْن', position: 'الـبـدايـة', image_emoji: '👁️' },
    { word_id: 34, correct_letter: 'ع', blank_word: 'كَـ_ـكَة', full_word: 'كَعْكَة', position: 'الـوسـط', image_emoji: '🎂' },
    { word_id: 35, correct_letter: 'ع', blank_word: 'إِصْبَـ_', full_word: 'إِصْبَع', position: 'الـنـهـايـة', image_emoji: '☝️' },

    // Ghain (غ)
    { word_id: 36, correct_letter: 'غ', blank_word: '_ـيْمَة', full_word: 'غَيْمَة', position: 'الـبـدايـة', image_emoji: '☁️' },
    { word_id: 37, correct_letter: 'غ', blank_word: 'بَبْـ_ـاء', full_word: 'بَبْغَاء', position: 'الـوسـط', image_emoji: '🦜' },
    { word_id: 38, correct_letter: 'غ', blank_word: 'صَمْـ_', full_word: 'صَمْغ', position: 'الـنـهـايـة', image_emoji: '🧴' },

    // Seen (س)
    { word_id: 40, correct_letter: 'س', blank_word: '_ـمَكَة', full_word: 'سَمَكَة', position: 'الـبـدايـة', image_emoji: '🐟' },
    { word_id: 41, correct_letter: 'س', blank_word: 'عـ_ـل', full_word: 'عَسَل', position: 'الـوسـط', image_emoji: '🍯' },
    { word_id: 42, correct_letter: 'س', blank_word: 'شَمْـ_', full_word: 'شَمْس', position: 'الـنـهـايـة', image_emoji: '☀️' },

    // Sheen (ش)
    { word_id: 43, correct_letter: 'ش', blank_word: '_ـمْعَة', full_word: 'شَمْعَة', position: 'الـبـدايـة', image_emoji: '🕯️' },
    { word_id: 44, correct_letter: 'ش', blank_word: 'فرا_ـة', full_word: 'فَرَاشَة', position: 'الـوسـط', image_emoji: '🦋', shape_key: 'initial' },
    { word_id: 45, correct_letter: 'ش', blank_word: 'عـ_', full_word: 'عُش', position: 'الـنـهـايـة', image_emoji: '🪹' },

    // Sad (ص)
    { word_id: 46, correct_letter: 'ص', blank_word: '_ـقْر', full_word: 'صَقْر', position: 'الـبـدايـة', image_emoji: '🦅' },
    { word_id: 47, correct_letter: 'ص', blank_word: 'بـ_ـلة', full_word: 'بَصَلَة', position: 'الـوسـط', image_emoji: '🧅' },
    { word_id: 48, correct_letter: 'ص', blank_word: 'مِقَـ_', full_word: 'مِقَص', position: 'الـنـهـايـة', image_emoji: '✂️' },

    // Dhad (ض)
    { word_id: 49, correct_letter: 'ض', blank_word: '_ـفْدَع', full_word: 'ضِفْدَع', position: 'الـبـدايـة', image_emoji: '🐸' },
    { word_id: 50, correct_letter: 'ض', blank_word: 'خـ_ـار', full_word: 'خُضَار', position: 'الـوسـط', image_url: 'https://img.freepik.com/free-vector/vegetarian-food-menu_24877-50875.jpg' },
    { word_id: 51, correct_letter: 'ض', blank_word: 'بَيْـ_', full_word: 'بَيْض', position: 'الـنـهـايـة', image_emoji: '🥚' },

    // Ta (ط)
    { word_id: 52, correct_letter: 'ط', blank_word: '_ـائرة', full_word: 'طَائِرَة', position: 'الـبـدايـة', image_emoji: '✈️' },
    { word_id: 53, correct_letter: 'ط', blank_word: 'قـ_ـار', full_word: 'قِطَار', position: 'الـوسـط', image_emoji: '🚂' },
    { word_id: 54, correct_letter: 'ط', blank_word: 'خَيْـ_', full_word: 'خَيْط', position: 'الـنـهـايـة', image_emoji: '🧵' },

    // Zha (ظ)
    { word_id: 55, correct_letter: 'ظ', blank_word: '_ـرْف', full_word: 'ظَرْف', position: 'الـبـدايـة', image_emoji: '✉️' },
    { word_id: 56, correct_letter: 'ظ', blank_word: 'مـ_ـلة', full_word: 'مِظَلة', position: 'الـوسـط', image_emoji: '☂️' },
    { word_id: 57, correct_letter: 'ظ', blank_word: 'إِسْتَيْقَـ_', full_word: 'إِسْتَيْقَظَ', position: 'الـنـهـايـة', image_url: 'https://img.freepik.com/premium-vector/cartoon-boy-is-waking-up-bed-is-stretching-vector-illustration_851674-46307.jpg' },

    // Fa (ف)
    { word_id: 58, correct_letter: 'ف', blank_word: '_ـيل', full_word: 'فِيل', position: 'الـبـدايـة', image_emoji: '🐘' },
    { word_id: 59, correct_letter: 'ف', blank_word: 'قـ_ـل', full_word: 'قُفْل', position: 'الـوسـط', image_emoji: '🔒' },
    { word_id: 60, correct_letter: 'ف', blank_word: 'أَنْـ_', full_word: 'أَنْف', position: 'الـنـهـايـة', image_emoji: '👃' },

    // Qaf (ق)
    { word_id: 61, correct_letter: 'ق', blank_word: '_ـلَم', full_word: 'قَلَم', position: 'الـبـدايـة', image_emoji: '🖊️' },
    { word_id: 62, correct_letter: 'ق', blank_word: 'مِلْعَـ_ـة', full_word: 'مِلْعَقَة', position: 'الـوسـط', image_emoji: '🥄' },
    { word_id: 63, correct_letter: 'ق', blank_word: 'بَرْ_', full_word: 'بَرْق', position: 'الـنـهـايـة', image_emoji: '🌩️', shape_key: 'isolated' },

    // Kaf (ك)
    { word_id: 64, correct_letter: 'ك', blank_word: '_ـلْب', full_word: 'كَلْب', position: 'الـبـدايـة', image_emoji: '🐕' },
    { word_id: 65, correct_letter: 'ك', blank_word: 'عَنْـ_ـبُوت', full_word: 'عَنْكَبُوت', position: 'الـوسـط', image_emoji: '🕷️' },
    { word_id: 66, correct_letter: 'ك', blank_word: 'دِيـ_', full_word: 'دِيك', position: 'الـنـهـايـة', image_emoji: '🐓' },

    // Lam (ل)
    { word_id: 67, correct_letter: 'ل', blank_word: '_ـيْمُون', full_word: 'لَيْمُون', position: 'الـبـدايـة', image_emoji: '🍋' },
    { word_id: 68, correct_letter: 'ل', blank_word: 'سُـ_ـم', full_word: 'سُلم', position: 'الـوسـط', image_emoji: '🪜' },
    { word_id: 69, correct_letter: 'ل', blank_word: 'جَمَـ_', full_word: 'جَمَل', position: 'الـنـهـايـة', image_emoji: '🐪' },

    // Meem (م)
    { word_id: 70, correct_letter: 'م', blank_word: '_ـفْتَاح', full_word: 'مِفْتَاح', position: 'الـبـدايـة', image_emoji: '🗝️' },
    { word_id: 71, correct_letter: 'م', blank_word: 'نـ_ـلة', full_word: 'نَمْلَة', position: 'الـوسـط', image_emoji: '🐜' },
    { word_id: 72, correct_letter: 'م', blank_word: 'لَحْـ_', full_word: 'لَحْم', position: 'الـنـهـايـة', image_emoji: '🥩' },

    // Noon (ن)
    { word_id: 73, correct_letter: 'ن', blank_word: '_ـمِر', full_word: 'نَمِر', position: 'الـبـدايـة', image_emoji: '🐅' },
    { word_id: 74, correct_letter: 'ن', blank_word: 'عِـ_ـب', full_word: 'عِنَب', position: 'الـوسـط', image_emoji: '🍇' },
    { word_id: 75, correct_letter: 'ن', blank_word: 'جُبْـ_', full_word: 'جُبْن', position: 'الـنـهـايـة', image_emoji: '🧀' },

    // Ha (هـ)
    { word_id: 76, correct_letter: 'هـ', blank_word: '_ـدِيَة', full_word: 'هَدِيَة', position: 'الـبـدايـة', image_emoji: '🎁' },
    { word_id: 77, correct_letter: 'هـ', blank_word: 'نـ_ـر', full_word: 'نَهْر', position: 'الـوسـط', image_url: 'https://static.vecteezy.com/system/resources/thumbnails/054/064/194/small/illustration-of-serene-flowing-river-in-lush-green-forest-landscape-scene-free-vector.jpg' },
    { word_id: 78, correct_letter: 'هـ', blank_word: 'وَجْـ_', full_word: 'وَجْه', position: 'الـنـهـايـة', image_emoji: '😐' },

    // Waw (و)
    { word_id: 79, correct_letter: 'و', blank_word: '_رْدَة', full_word: 'وَرْدَة', position: 'الـبـدايـة', image_emoji: '🌹' },
    { word_id: 80, correct_letter: 'و', blank_word: 'خـ_خ', full_word: 'خَوْخ', position: 'الـوسـط', image_emoji: '🍑', shape_key: 'medial' },
    { word_id: 81, correct_letter: 'و', blank_word: 'دَلْـ_', full_word: 'دَلْو', position: 'الـنـهـايـة', image_emoji: '🪣' },

    // Ya (ي)
    { word_id: 82, correct_letter: 'ي', blank_word: '_د', full_word: 'يَد', position: 'الـبـدايـة', image_emoji: '✋' },
    { word_id: 83, correct_letter: 'ي', blank_word: 'بـ_ـت', full_word: 'بَيْت', position: 'الـوسـط', image_emoji: '🏠' },
    { word_id: 84, correct_letter: 'ي', blank_word: 'شُرْطِـ_', full_word: 'شُرْطِي', position: 'الـنـهـايـة', image_emoji: '👮' },
];

// --- Game Data: Mode 2 (Letters) ---
const wordListLetters = [
    // Alif (أ)
    { word_id: 101, correct_letter: 'أ', blank_word: '_رنب', full_word: 'أَرنب', position: 'أول الكلمة', image_emoji: '🐰' },
    { word_id: 109, correct_letter: 'أ', blank_word: 'فَـ_ـر', full_word: 'فَأر', position: 'وسط الكلمة', image_emoji: '🐭' },

    // Ba (ب)
    { word_id: 103, correct_letter: 'ب', blank_word: '_طة', full_word: 'بَطة', position: 'أول الكلمة', image_emoji: '🦆' },
    { word_id: 110, correct_letter: 'ب', blank_word: 'حَـ_ـل', full_word: 'حَبْل', position: 'وسط الكلمة', image_emoji: '🧶' },
    { word_id: 114, correct_letter: 'ب', blank_word: 'عِنَـ_', full_word: 'عِنَب', position: 'آخر الكلمة', image_emoji: '🍇' },

    // Ta (ت)
    { word_id: 105, correct_letter: 'ت', blank_word: '_اج', full_word: 'تَاج', position: 'أول الكلمة', image_emoji: '👑' },
    { word_id: 111, correct_letter: 'ت', blank_word: 'كِـ_ـاب', full_word: 'كِتَاب', position: 'وسط الكلمة', image_emoji: '📖' },
    { word_id: 115, correct_letter: 'ت', blank_word: 'بَيْـ_', full_word: 'بَيْت', position: 'آخر الكلمة', image_emoji: '🏠' },

    // Tha (ث)
    { word_id: 107, correct_letter: 'ث', blank_word: '_ور', full_word: 'ثَور', position: 'أول الكلمة', image_emoji: '🐂' },
    { word_id: 116, correct_letter: 'ث', blank_word: 'مُثَلـ_', full_word: 'مُثَلَث', position: 'آخر الكلمة', image_emoji: '🔺' },

    // Jeem (ج)
    { word_id: 120, correct_letter: 'ج', blank_word: '_زَر', full_word: 'جَزَر', position: 'أول الكلمة', image_emoji: '🥕' },
    { word_id: 121, correct_letter: 'ج', blank_word: 'دَ_اجة', full_word: 'دَجَاجَة', position: 'وسط الكلمة', image_emoji: '🐔' },
    { word_id: 122, correct_letter: 'ج', blank_word: 'بُرْ_', full_word: 'بُرْج', position: 'آخر الكلمة', image_emoji: '🗼' },

    // Ha (ح)
    { word_id: 123, correct_letter: 'ح', blank_word: '_وت', full_word: 'حُوت', position: 'أول الكلمة', image_emoji: '🐋' },
    { word_id: 124, correct_letter: 'ح', blank_word: 'نَـ_ـلَة', full_word: 'نَحْلَة', position: 'وسط الكلمة', image_emoji: '🐝' },
    { word_id: 125, correct_letter: 'ح', blank_word: 'تُفَا_', full_word: 'تُفَاح', position: 'آخر الكلمة', image_emoji: '🍎' },

    // Kha (خ)
    { word_id: 126, correct_letter: 'خ', blank_word: '_اتَم', full_word: 'خَاتَم', position: 'أول الكلمة', image_emoji: '💍' },
    { word_id: 127, correct_letter: 'خ', blank_word: 'صَـ_ـرَة', full_word: 'صَخْرَة', position: 'وسط الكلمة', image_emoji: '🪨' },
    { word_id: 128, correct_letter: 'خ', blank_word: 'خَوْ_', full_word: 'خَوْخ', position: 'آخر الكلمة', image_emoji: '🍑' },

    // Dal (د)
    { word_id: 129, correct_letter: 'د', blank_word: '_رَاجَة', full_word: 'دَرَاجَة', position: 'أول الكلمة', image_emoji: '🚲' },
    { word_id: 130, correct_letter: 'د', blank_word: 'هَـ_يَة', full_word: 'هَدِيَة', position: 'وسط الكلمة', image_emoji: '🎁' },
    { word_id: 131, correct_letter: 'د', blank_word: 'قِرْ_', full_word: 'قِرْد', position: 'آخر الكلمة', image_emoji: '🐒' },

    // Dhal (ذ)
    { word_id: 132, correct_letter: 'ذ', blank_word: '_يْل', full_word: 'ذَيْل', position: 'أول الكلمة', image_emoji: '🐕' },
    { word_id: 133, correct_letter: 'ذ', blank_word: 'حِـ_اء', full_word: 'حِذَاء', position: 'وسط الكلمة', image_emoji: '👞' },
    { word_id: 134, correct_letter: 'ذ', blank_word: 'تِلْمِيـ_', full_word: 'تِلْمِيذ', position: 'آخر الكلمة', image_emoji: '🧑‍🎓' },

    // Ra (ر)
    { word_id: 135, correct_letter: 'ر', blank_word: '_جُل', full_word: 'رَجُل', position: 'أول الكلمة', image_emoji: '👨' },
    { word_id: 136, correct_letter: 'ر', blank_word: 'فَـ_اشَة', full_word: 'فَرَاشَة', position: 'وسط الكلمة', image_emoji: '🦋' },
    { word_id: 137, correct_letter: 'ر', blank_word: 'قِطَا_', full_word: 'قِطَار', position: 'آخر الكلمة', image_emoji: '🚂' },

    // Zay (ز)
    { word_id: 138, correct_letter: 'ز', blank_word: '_يْتُون', full_word: 'زَيْتُون', position: 'أول الكلمة', image_emoji: '🫒' },
    { word_id: 139, correct_letter: 'ز', blank_word: 'غَـ_ال', full_word: 'غَزَال', position: 'وسط الكلمة', image_emoji: '🦌' },
    { word_id: 140, correct_letter: 'ز', blank_word: 'خُبْـ_', full_word: 'خُبْز', position: 'آخر الكلمة', image_emoji: '🍞' },

    // Seen (س)
    { word_id: 150, correct_letter: 'س', blank_word: '_مَكَة', full_word: 'سَمَكَة', position: 'أول الكلمة', image_emoji: '🐟' },
    { word_id: 151, correct_letter: 'س', blank_word: 'عـ_ـل', full_word: 'عَسَل', position: 'وسط الكلمة', image_emoji: '🍯' },
    { word_id: 301, correct_letter: 'س', blank_word: 'شَمْـ_', full_word: 'شَمْس', position: 'آخر الكلمة', image_emoji: '☀️' },

    // Sheen (ش)
    { word_id: 152, correct_letter: 'ش', blank_word: '_مْعَة', full_word: 'شَمْعَة', position: 'أول الكلمة', image_emoji: '🕯️' },
    { word_id: 302, correct_letter: 'ش', blank_word: 'فَرَا_ـة', full_word: 'فَرَاشَة', position: 'وسط الكلمة', image_emoji: '🦋' },
    { word_id: 303, correct_letter: 'ش', blank_word: 'عُـ_', full_word: 'عُش', position: 'آخر الكلمة', image_emoji: '🪹' },

    // Sad (ص)
    { word_id: 153, correct_letter: 'ص', blank_word: '_قْر', full_word: 'صَقْر', position: 'أول الكلمة', image_emoji: '🦅' },
    { word_id: 304, correct_letter: 'ص', blank_word: 'بَـ_ـلَة', full_word: 'بَصَلَة', position: 'وسط الكلمة', image_emoji: '🧅' },
    { word_id: 305, correct_letter: 'ص', blank_word: 'مِقَـ_', full_word: 'مِقَص', position: 'آخر الكلمة', image_emoji: '✂️' },

    // Dhad (ض)
    { word_id: 154, correct_letter: 'ض', blank_word: '_فْدَع', full_word: 'ضِفْدَع', position: 'أول الكلمة', image_emoji: '🐸' },
    { word_id: 306, correct_letter: 'ض', blank_word: 'خُـ_ـار', full_word: 'خُضَار', position: 'وسط الكلمة', image_url: 'https://img.freepik.com/free-vector/vegetarian-food-menu_24877-50875.jpg' },
    { word_id: 307, correct_letter: 'ض', blank_word: 'بَيْـ_', full_word: 'بَيْض', position: 'آخر الكلمة', image_emoji: '🥚' },

    // Ta (ط)
    { word_id: 155, correct_letter: 'ط', blank_word: '_ائرة', full_word: 'طَائِرَة', position: 'أول الكلمة', image_emoji: '✈️' },
    { word_id: 308, correct_letter: 'ط', blank_word: 'قِـ_ـار', full_word: 'قِطَار', position: 'وسط الكلمة', image_emoji: '🚂' },
    { word_id: 309, correct_letter: 'ط', blank_word: 'خَيْـ_', full_word: 'خَيْط', position: 'آخر الكلمة', image_emoji: '🧵' },

    // Zha (ظ)
    { word_id: 156, correct_letter: 'ظ', blank_word: '_رْف', full_word: 'ظَرْف', position: 'أول الكلمة', image_emoji: '✉️' },
    { word_id: 310, correct_letter: 'ظ', blank_word: 'مِـ_ـلة', full_word: 'مِظَلة', position: 'وسط الكلمة', image_emoji: '☂️' },
    { word_id: 311, correct_letter: 'ظ', blank_word: 'إِسْتَيْقَـ_', full_word: 'إِسْتَيْقَظَ', position: 'آخر الكلمة', image_url: 'https://img.freepik.com/premium-vector/cartoon-boy-is-waking-up-bed-is-stretching-vector-illustration_851674-46307.jpg' },

    // Ain (ع)
    { word_id: 141, correct_letter: 'ع', blank_word: '_نْكَبُوت', full_word: 'عَنْكَبُوت', position: 'أول الكلمة', image_emoji: '🕷️' },
    { word_id: 142, correct_letter: 'ع', blank_word: 'مُـ_لِم', full_word: 'مُعَلِم', position: 'وسط الكلمة', image_emoji: '👨‍🏫' },
    { word_id: 143, correct_letter: 'ع', blank_word: 'ضِفْدَ_', full_word: 'ضِفْدَع', position: 'آخر الكلمة', image_emoji: '🐸' },

    // Ghain (غ)
    { word_id: 144, correct_letter: 'غ', blank_word: '_وَاص', full_word: 'غَوَاص', position: 'أول الكلمة', image_emoji: '🤿' },
    { word_id: 145, correct_letter: 'غ', blank_word: 'مِـ_نَاطِيس', full_word: 'مِغْنَاطِيس', position: 'وسط الكلمة', image_emoji: '🧲' },
    { word_id: 146, correct_letter: 'غ', blank_word: 'دِمَا_', full_word: 'دِمَاغ', position: 'آخر الكلمة', image_emoji: '🧠' },

    // Fa (ف)
    { word_id: 157, correct_letter: 'ف', blank_word: '_يل', full_word: 'فِيل', position: 'أول الكلمة', image_emoji: '🐘' },
    { word_id: 312, correct_letter: 'ف', blank_word: 'قُـ_ـل', full_word: 'قُفْل', position: 'وسط الكلمة', image_emoji: '🔒' },
    { word_id: 313, correct_letter: 'ف', blank_word: 'أَنْـ_', full_word: 'أَنْف', position: 'آخر الكلمة', image_emoji: '👃' },

    // Qaf (ق)
    { word_id: 158, correct_letter: 'ق', blank_word: '_لَم', full_word: 'قَلَم', position: 'أول الكلمة', image_emoji: '🖊️' },
    { word_id: 314, correct_letter: 'ق', blank_word: 'مِلْعَـ_ـة', full_word: 'مِلْعَقَة', position: 'وسط الكلمة', image_emoji: '🥄' },
    { word_id: 315, correct_letter: 'ق', blank_word: 'بَرْ_', full_word: 'بَرْق', position: 'آخر الكلمة', image_emoji: '🌩️' },

    // Kaf (ك)
    { word_id: 159, correct_letter: 'ك', blank_word: '_لْب', full_word: 'كَلْب', position: 'أول الكلمة', image_emoji: '🐕' },
    { word_id: 316, correct_letter: 'ك', blank_word: 'عَنْـ_ـبُوت', full_word: 'عَنْكَبُوت', position: 'وسط الكلمة', image_emoji: '🕷️' },
    { word_id: 317, correct_letter: 'ك', blank_word: 'دِيـ_', full_word: 'دِيك', position: 'آخر الكلمة', image_emoji: '🐓' },

    // Lam (ل)
    { word_id: 160, correct_letter: 'ل', blank_word: '_يْمُون', full_word: 'لَيْمُون', position: 'أول الكلمة', image_emoji: '🍋' },
    { word_id: 318, correct_letter: 'ل', blank_word: 'سُـ_ـم', full_word: 'سُلم', position: 'وسط الكلمة', image_emoji: '🪜' },
    { word_id: 319, correct_letter: 'ل', blank_word: 'جَمَـ_', full_word: 'جَمَل', position: 'آخر الكلمة', image_emoji: '🐪' },

    // Meem (م)
    { word_id: 161, correct_letter: 'م', blank_word: '_فْتَاح', full_word: 'مِفْتَاح', position: 'أول الكلمة', image_emoji: '🗝️' },
    { word_id: 320, correct_letter: 'م', blank_word: 'نَـ_ـلَة', full_word: 'نَمْلَة', position: 'وسط الكلمة', image_emoji: '🐜' },
    { word_id: 321, correct_letter: 'م', blank_word: 'لَحْـ_', full_word: 'لَحْم', position: 'آخر الكلمة', image_emoji: '🥩' },

    // Noon (ن)
    { word_id: 162, correct_letter: 'ن', blank_word: '_مِر', full_word: 'نَمِر', position: 'أول الكلمة', image_emoji: '🐅' },
    { word_id: 322, correct_letter: 'ن', blank_word: 'عِـ_ـب', full_word: 'عِنَب', position: 'وسط الكلمة', image_emoji: '🍇' },
    { word_id: 323, correct_letter: 'ن', blank_word: 'جُبْـ_', full_word: 'جُبْن', position: 'آخر الكلمة', image_emoji: '🧀' },

    // Ha (هـ)
    { word_id: 163, correct_letter: 'هـ', blank_word: '_دِيَة', full_word: 'هَدِيَة', position: 'أول الكلمة', image_emoji: '🎁' },
    { word_id: 324, correct_letter: 'هـ', blank_word: 'نَـ_ـر', full_word: 'نَهْر', position: 'وسط الكلمة', image_url: 'https://static.vecteezy.com/system/resources/thumbnails/054/064/194/small/illustration-of-serene-flowing-river-in-lush-green-forest-landscape-scene-free-vector.jpg' },
    { word_id: 325, correct_letter: 'هـ', blank_word: 'وَجْـ_', full_word: 'وَجْه', position: 'آخر الكلمة', image_emoji: '😐' },

    // Waw (و)
    { word_id: 164, correct_letter: 'و', blank_word: '_رْدَة', full_word: 'وَرْدَة', position: 'أول الكلمة', image_emoji: '🌹' },
    { word_id: 326, correct_letter: 'و', blank_word: 'خَـ_خ', full_word: 'خَوْخ', position: 'وسط الكلمة', image_emoji: '🍑' },
    { word_id: 327, correct_letter: 'و', blank_word: 'دَلْـ_', full_word: 'دَلْو', position: 'آخر الكلمة', image_emoji: '🪣' },

    // Ya (ي)
    { word_id: 165, correct_letter: 'ي', blank_word: '_د', full_word: 'يَد', position: 'أول الكلمة', image_emoji: '✋' },
    { word_id: 179, correct_letter: 'ي', blank_word: 'بَـ_ـت', full_word: 'بَيْت', position: 'وسط الكلمة', image_emoji: '🏠' },
    { word_id: 328, correct_letter: 'ي', blank_word: 'شُرْطِـ_', full_word: 'شُرْطِي', position: 'آخر الكلمة', image_emoji: '👮' },
];

// --- Game Data: Mode 3 (Harakat) ---
const wordListHarakat = [
    // Alif
    { word_id: 201, correct_letter: 'أ', correct_haraka: 'fatha', blank_word: '_سَد', full_word: 'أَسَد', image_emoji: '🦁', correct_option: 'أَ' },
    { word_id: 202, correct_letter: 'أ', correct_haraka: 'damma', blank_word: '_ذُن', full_word: 'أُذُن', image_emoji: '👂', correct_option: 'أُ' },
    { word_id: 203, correct_letter: 'أ', correct_haraka: 'kasra', blank_word: '_بْرِيق', full_word: 'إِبْرِيق', image_emoji: '🫖', correct_option: 'إِ' },

    // Baa
    { word_id: 204, correct_letter: 'ب', correct_haraka: 'fatha', blank_word: '_طَة', full_word: 'بَطَة', image_emoji: '🦆', correct_option: 'بَـ' },
    { word_id: 205, correct_letter: 'ب', correct_haraka: 'damma', blank_word: '_رْتُقَال', full_word: 'بُرْتُقَال', image_emoji: '🍊', correct_option: 'بُـ' },
    { word_id: 206, correct_letter: 'ب', correct_haraka: 'kasra', blank_word: '_نْت', full_word: 'بِنْت', image_emoji: '👧', correct_option: 'بِـ' },

    // Taa
    { word_id: 207, correct_letter: 'ت', correct_haraka: 'fatha', blank_word: '_مْر', full_word: 'تَمْر', image_url: 'https://img.freepik.com/premium-vector/dates-clipart-vector-illustration_1123392-3096.jpg', correct_option: 'تَـ' },
    { word_id: 208, correct_letter: 'ت', correct_haraka: 'damma', blank_word: '_فَاح', full_word: 'تُفَاح', image_emoji: '🍎', correct_option: 'تُـ' },
    { word_id: 209, correct_letter: 'ت', correct_haraka: 'kasra', blank_word: '_مْسَاح', full_word: 'تِمْسَاح', image_emoji: '🐊', correct_option: 'تِـ' },

    // Thaa
    { word_id: 210, correct_letter: 'ث', correct_haraka: 'fatha', blank_word: '_عْلَب', full_word: 'ثَعْلَب', image_emoji: '🦊', correct_option: 'ثَـ' },
    { word_id: 211, correct_letter: 'ث', correct_haraka: 'damma', blank_word: '_عْبَان', full_word: 'ثُعْبَان', image_emoji: '🐍', correct_option: 'ثُـ' },
    { word_id: 212, correct_letter: 'ث', correct_haraka: 'kasra', blank_word: '_يَاب', full_word: 'ثِيَاب', image_emoji: '👕', correct_option: 'ثِـ' },

    // Jeem
    { word_id: 213, correct_letter: 'ج', correct_haraka: 'fatha', blank_word: '_زَر', full_word: 'جَزَر', image_emoji: '🥕', correct_option: 'جَـ' },
    { word_id: 214, correct_letter: 'ج', correct_haraka: 'damma', blank_word: '_بْن', full_word: 'جُبْن', image_emoji: '🧀', correct_option: 'جُـ' },
    { word_id: 215, correct_letter: 'ج', correct_haraka: 'kasra', blank_word: '_سْر', full_word: 'جِسْر', image_emoji: '🌉', correct_option: 'جِـ' },

    // Haa
    { word_id: 216, correct_letter: 'ح', correct_haraka: 'fatha', blank_word: '_لِيب', full_word: 'حَلِيب', image_emoji: '🥛', correct_option: 'حَـ' },
    { word_id: 217, correct_letter: 'ح', correct_haraka: 'damma', blank_word: '_وت', full_word: 'حُوت', image_emoji: '🐋', correct_option: 'حُـ' },
    { word_id: 218, correct_letter: 'ح', correct_haraka: 'kasra', blank_word: '_صَان', full_word: 'حِصَان', image_emoji: '🐎', correct_option: 'حِـ' },

    // Khaa
    { word_id: 219, correct_letter: 'خ', correct_haraka: 'fatha', blank_word: '_اتَم', full_word: 'خَاتَم', image_emoji: '💍', correct_option: 'خَـ' },
    { word_id: 220, correct_letter: 'خ', correct_haraka: 'damma', blank_word: '_بْز', full_word: 'خُبْز', image_emoji: '🍞', correct_option: 'خُـ' },
    { word_id: 221, correct_letter: 'خ', correct_haraka: 'kasra', blank_word: '_يَار', full_word: 'خِيَار', image_emoji: '🥒', correct_option: 'خِـ' },

    // Dal (د)
    { word_id: 222, correct_letter: 'د', correct_haraka: 'fatha', blank_word: '_فْتَر', full_word: 'دَفْتَر', image_emoji: '📒', correct_option: 'دَ' },
    { word_id: 223, correct_letter: 'د', correct_haraka: 'damma', blank_word: '_ودَة', full_word: 'دُودَة', image_emoji: '🪱', correct_option: 'دُ' },
    { word_id: 224, correct_letter: 'د', correct_haraka: 'kasra', blank_word: '_يك', full_word: 'دِيك', image_emoji: '🐓', correct_option: 'دِ' },

    // Dhal (ذ)
    { word_id: 225, correct_letter: 'ذ', correct_haraka: 'fatha', blank_word: '_يْل', full_word: 'ذَيْل', image_url: 'https://png.pngtree.com/png-vector/20220216/ourmid/pngtree-cat-tail-vector-element-concept-design-template-pet-kitten-cats-tail-vector-png-image_44305428.jpg', correct_option: 'ذَ' },
    { word_id: 226, correct_letter: 'ذ', correct_haraka: 'damma', blank_word: '_بَابَة', full_word: 'ذُبَابَة', image_emoji: '🪰', correct_option: 'ذُ' },
    { word_id: 227, correct_letter: 'ذ', correct_haraka: 'kasra', blank_word: '_رَاع', full_word: 'ذِرَاع', image_emoji: '💪', correct_option: 'ذِ' },

    // Ra (ر)
    { word_id: 228, correct_letter: 'ر', correct_haraka: 'fatha', blank_word: '_مْل', full_word: 'رَمْل', image_emoji: '🏖️', correct_option: 'رَ' },
    { word_id: 229, correct_letter: 'ر', correct_haraka: 'damma', blank_word: '_كْبَة', full_word: 'رُكْبَة', image_emoji: '🦵', correct_option: 'رُ' },
    { word_id: 230, correct_letter: 'ر', correct_haraka: 'kasra', blank_word: '_سَالَة', full_word: 'رِسَالَة', image_emoji: '📩', correct_option: 'رِ' },

    // Zay (ز)
    { word_id: 231, correct_letter: 'ز', correct_haraka: 'fatha', blank_word: '_رَافَة', full_word: 'زَرَافَة', image_emoji: '🦒', correct_option: 'زَ' },
    { word_id: 232, correct_letter: 'ز', correct_haraka: 'damma', blank_word: '_هُور', full_word: 'زُهُور', image_emoji: '💐', correct_option: 'زُ' },
    { word_id: 233, correct_letter: 'ز', correct_haraka: 'kasra', blank_word: '_ر', full_word: 'زِر', image_url: 'https://img.freepik.com/free-vector/orange-button-isolated_1308-28825.jpg?semt=ais_hybrid&w=740&q=80', correct_option: 'زِ' },

    // Ain (ع)
    { word_id: 234, correct_letter: 'ع', correct_haraka: 'fatha', blank_word: '_لَم', full_word: 'عَلَم', image_emoji: '🏁', correct_option: 'عَـ' },
    { word_id: 235, correct_letter: 'ع', correct_haraka: 'damma', blank_word: '_صْفُور', full_word: 'عُصْفُور', image_emoji: '🐦', correct_option: 'عُـ' },
    { word_id: 236, correct_letter: 'ع', correct_haraka: 'kasra', blank_word: '_نَب', full_word: 'عِنَب', image_emoji: '🍇', correct_option: 'عِـ' },

    // Ghain (غ)
    { word_id: 237, correct_letter: 'غ', correct_haraka: 'fatha', blank_word: '_زَال', full_word: 'غَزَال', image_emoji: '🦌', correct_option: 'غَـ' },
    { word_id: 238, correct_letter: 'غ', correct_haraka: 'damma', blank_word: '_رَاب', full_word: 'غُرَاب', image_emoji: '🐦‍⬛', correct_option: 'غُـ' },
    { word_id: 239, correct_letter: 'غ', correct_haraka: 'kasra', blank_word: '_ذَاء', full_word: 'غِذَاء', image_emoji: '🍱', correct_option: 'غِـ' },

    // Seen (س)
    { word_id: 240, correct_letter: 'س', correct_haraka: 'fatha', blank_word: '_مَكَة', full_word: 'سَمَكَة', image_emoji: '🐟', correct_option: 'سَـ' },
    { word_id: 241, correct_letter: 'س', correct_haraka: 'damma', blank_word: '_لْحَفَاة', full_word: 'سُلْحَفَاة', image_emoji: '🐢', correct_option: 'سُـ' },
    { word_id: 242, correct_letter: 'س', correct_haraka: 'kasra', blank_word: '_نْجَاب', full_word: 'سِنْجَاب', image_emoji: '🐿️', correct_option: 'سِـ' },

    // Sheen (ش)
    { word_id: 243, correct_letter: 'ش', correct_haraka: 'fatha', blank_word: '_مْعَة', full_word: 'شَمْعَة', image_emoji: '🕯️', correct_option: 'شَـ' },
    { word_id: 244, correct_letter: 'ش', correct_haraka: 'damma', blank_word: '_رْطِي', full_word: 'شُرْطِي', image_emoji: '👮', correct_option: 'شُـ' },
    { word_id: 245, correct_letter: 'ش', correct_haraka: 'kasra', blank_word: '_رَاع', full_word: 'شِرَاع', image_emoji: '⛵', correct_option: 'شِـ' },

    // Sad (ص)
    { word_id: 246, correct_letter: 'ص', correct_haraka: 'fatha', blank_word: '_qْر', full_word: 'صَقْر', image_emoji: '🦅', correct_option: 'صَـ' },
    { word_id: 247, correct_letter: 'ص', correct_haraka: 'damma', blank_word: '_نْدُوق', full_word: 'صُنْدُوق', image_emoji: '📦', correct_option: 'صُـ' },
    { word_id: 248, correct_letter: 'ص', correct_haraka: 'kasra', blank_word: '_فْر', full_word: 'صِفْر', image_url: 'https://img.freepik.com/premium-vector/number-zero-cartoon-vector-illustration-cute-zero-cartoon-drawing-playful-zero-character-design_648083-500.jpg', correct_option: 'صِـ' },

    // Dhad (ض)
    { word_id: 249, correct_letter: 'ض', correct_haraka: 'fatha', blank_word: '_ابِط', full_word: 'ضَابِط', image_emoji: '👮', correct_option: 'ضَـ' },
    { word_id: 250, correct_letter: 'ض', correct_haraka: 'damma', blank_word: '_فْدَع', full_word: 'ضُفْدَع', image_emoji: '🐸', correct_option: 'ضُـ' },
    { word_id: 251, correct_letter: 'ض', correct_haraka: 'kasra', blank_word: '_رْس', full_word: 'ضِرْس', image_emoji: '🦷', correct_option: 'ضِـ' },

    // Ta (ط)
    { word_id: 252, correct_letter: 'ط', correct_haraka: 'fatha', blank_word: '_ائِرَة', full_word: 'طَائِرَة', image_emoji: '✈️', correct_option: 'طَـ' },
    { word_id: 253, correct_letter: 'ط', correct_haraka: 'damma', blank_word: '_يُور', full_word: 'طُيُور', image_url: 'http://img.freepik.com/free-vector/birds-illustrations-collection_1096-278.jpg', correct_option: 'طُـ' },
    { word_id: 254, correct_letter: 'ط', correct_haraka: 'kasra', blank_word: '_فْل', full_word: 'طِفْل', image_emoji: '👶', correct_option: 'طِـ' },

    // Zha (ظ)
    { word_id: 255, correct_letter: 'ظ', correct_haraka: 'fatha', blank_word: '_رْف', full_word: 'ظَرْف', image_emoji: '✉️', correct_option: 'ظَـ' },
    { word_id: 256, correct_letter: 'ظ', correct_haraka: 'damma', blank_word: '_فْر', full_word: 'ظُفْر', image_emoji: '💅', correct_option: 'ظُـ' },
    { word_id: 257, correct_letter: 'ظ', correct_haraka: 'kasra', blank_word: '_ل', full_word: 'ظِل', image_url: 'https://img.freepik.com/free-vector/happy-boy-ready-play-with-his-silhouette_1308-50494.jpg', correct_option: 'ظِـ' },

    // Fa (ف)
    { word_id: 258, correct_letter: 'ف', correct_haraka: 'fatha', blank_word: '_رَافَة', full_word: 'فَرَاشَة', image_emoji: '🦋', correct_option: 'فَـ' },
    { word_id: 259, correct_letter: 'ف', correct_haraka: 'damma', blank_word: '_لْفُل', full_word: 'فُلْفُل', image_emoji: '🫑', correct_option: 'فُـ' },
    { word_id: 260, correct_letter: 'ف', correct_haraka: 'kasra', blank_word: '_يل', full_word: 'فِيل', image_emoji: '🐘', correct_option: 'فِـ' },

    // Qaf (ق)
    { word_id: 261, correct_letter: 'ق', correct_haraka: 'fatha', blank_word: '_لَم', full_word: 'قَلَم', image_emoji: '🖊️', correct_option: 'قَـ' },
    { word_id: 262, correct_letter: 'ق', correct_haraka: 'damma', blank_word: '_نْفُذ', full_word: 'قُنْفُذ', image_emoji: '🦔', correct_option: 'قُـ' },
    { word_id: 263, correct_letter: 'ق', correct_haraka: 'kasra', blank_word: '_طَة', full_word: 'قِطَة', image_emoji: '🐈', correct_option: 'قِـ' },

    // Kaf (ك)
    { word_id: 264, correct_letter: 'ك', correct_haraka: 'fatha', blank_word: '_لْب', full_word: 'كَلْب', image_emoji: '🐕', correct_option: 'كَـ' },
    { word_id: 265, correct_letter: 'ك', correct_haraka: 'damma', blank_word: '_رَة', full_word: 'كُرَة', image_emoji: '⚽', correct_option: 'كُـ' },
    { word_id: 266, correct_letter: 'ك', correct_haraka: 'kasra', blank_word: '_تَاب', full_word: 'كِتَاب', image_emoji: '📖', correct_option: 'كِـ' },

    // Lam (ل)
    { word_id: 267, correct_letter: 'ل', correct_haraka: 'fatha', blank_word: '_يْمُون', full_word: 'لَيْمُون', image_emoji: '🍋', correct_option: 'لَـ' },
    { word_id: 268, correct_letter: 'ل', correct_haraka: 'damma', blank_word: '_ؤْلُؤ', full_word: 'لُؤْلُؤ', image_url: 'https://img.freepik.com/premium-photo/white-pearl-golden-seashell-clipart-illustration-white-background_1128301-3466.jpg', correct_option: 'لُـ' },
    { word_id: 269, correct_letter: 'ل', correct_haraka: 'kasra', blank_word: '_سَان', full_word: 'لِسَان', image_emoji: '👅', correct_option: 'لِـ' },

    // Meem (م)
    { word_id: 270, correct_letter: 'م', correct_haraka: 'fatha', blank_word: '_وْز', full_word: 'مَوْز', image_emoji: '🍌', correct_option: 'مَـ' },
    { word_id: 271, correct_letter: 'م', correct_haraka: 'damma', blank_word: '_هَرج', full_word: 'مُهَرج', image_emoji: '🤡', correct_option: 'مُـ' },
    { word_id: 272, correct_letter: 'م', correct_haraka: 'kasra', blank_word: '_قَص', full_word: 'مِقَص', image_emoji: '✂️', correct_option: 'مِـ' },

    // Noon (ن)
    { word_id: 273, correct_letter: 'ن', correct_haraka: 'fatha', blank_word: '_خْلَة', full_word: 'نَخْلَة', image_emoji: '🌴', correct_option: 'نَـ' },
    { word_id: 274, correct_letter: 'ن', correct_haraka: 'damma', blank_word: '_جُوم', full_word: 'نُجُوم', image_emoji: '✨', correct_option: 'نُـ' },
    { word_id: 275, correct_letter: 'ن', correct_haraka: 'kasra', blank_word: '_سْر', full_word: 'نِسْر', image_emoji: '🦅', correct_option: 'نِـ' },

    // Ha (هـ)
    { word_id: 276, correct_letter: 'هـ', correct_haraka: 'fatha', blank_word: '_دِيَة', full_word: 'هَدِيَة', image_emoji: '🎁', correct_option: 'هَـ' },
    { word_id: 277, correct_letter: 'هـ', correct_haraka: 'damma', blank_word: '_دْهُد', full_word: 'هُدْهُد', image_url: 'https://img.freepik.com/premium-vector/hoopoe-eurasia-bird-vector-illustration_679964-181.jpg', correct_option: 'هُـ' },
    { word_id: 278, correct_letter: 'هـ', correct_haraka: 'kasra', blank_word: '_لَال', full_word: 'هِلَال', image_emoji: '🌙', correct_option: 'هِـ' },

    // Waw (و)
    { word_id: 279, correct_letter: 'و', correct_haraka: 'fatha', blank_word: '_رْدَة', full_word: 'وَرْدَة', image_emoji: '🌹', correct_option: 'وَ' },
    { word_id: 280, correct_letter: 'و', correct_haraka: 'damma', blank_word: '_رُود', full_word: 'وُرُود', image_url: 'https://www.shutterstock.com/image-vector/beautiful-flowers-artwork-simple-red-600nw-2602438365.jpg', correct_option: 'وُ' },
    { word_id: 281, correct_letter: 'و', correct_haraka: 'kasra', blank_word: '_سَادَة', full_word: 'وِسَادَة', image_url: 'https://img.freepik.com/premium-vector/pillow-clipart-vector-art-illustration_761413-27778.jpg', correct_option: 'وِ' },

    // Ya (ي)
    { word_id: 282, correct_letter: 'ي', correct_haraka: 'fatha', blank_word: '_د', full_word: 'يَد', image_emoji: '✋', correct_option: 'يَـ' },
    { word_id: 283, correct_letter: 'ي', correct_haraka: 'damma', blank_word: '_سَافِر', full_word: 'يُسَافِر', image_url: 'https://png.pngtree.com/png-vector/20250506/ourmid/pngtree-cartoon-travel-kid-sticker-png-image_16177982.png', correct_option: 'يُـ' },
    // Skipped Kasra for Initial Ya as requested
];

// --- Game Data: Mode 4 (Matching) ---
const wordListMatchLevel1 = [
    { word_id: 401, full_word: 'أَب', image_emoji: '👨🏻' },
    { word_id: 402, full_word: 'أَخ', image_emoji: '👦🏻' },
    { word_id: 403, full_word: 'أُخْت', image_emoji: '👧🏻' },
    { word_id: 404, full_word: 'دُب', image_emoji: '🐻' },
    { word_id: 405, full_word: 'بَاب', image_emoji: '🚪' },
    { word_id: 406, full_word: 'تَاج', image_emoji: '👑' },
    { word_id: 407, full_word: 'جَد', image_emoji: '👴🏻' },
    { word_id: 408, full_word: 'حُب', image_emoji: '❤️' },
    { word_id: 409, full_word: 'جَزَر', image_emoji: '🥕' },
    { word_id: 410, full_word: 'بَحْث', image_emoji: '🔍' },
    { word_id: 411, full_word: 'حَجّ', image_emoji: '🕋' },
    { word_id: 412, full_word: 'بَحْر', image_emoji: '🌊' },
    { word_id: 413, full_word: 'أَرُز', image_emoji: '🍚' },
    { word_id: 414, full_word: 'بِذْر', image_emoji: '🫘' },
    { word_id: 415, full_word: 'حَجَر', image_emoji: '🪨' },
    { word_id: 416, full_word: 'بَدْر', image_emoji: '🌕' },
    { word_id: 417, full_word: 'بَرْد', image_emoji: '❄️' },
];

const wordListMatchLevel2 = [
    { word_id: 418, full_word: 'أَسَد', image_emoji: '🦁' },
    { word_id: 419, full_word: 'ذُرَة', image_emoji: '🌽' },
    { word_id: 420, full_word: 'خُبْز', image_emoji: '🍞' },
    { word_id: 421, full_word: 'شَجَرَة', image_emoji: '🌳' },
    { word_id: 422, full_word: 'بَبْغَاء', image_emoji: '🦜' },
    { word_id: 423, full_word: 'عُش', image_emoji: '🪹' },
    { word_id: 424, full_word: 'خُضَار', image_emoji: '🥗' },
    { word_id: 425, full_word: 'طَائِرَة', image_emoji: '✈️' },
    { word_id: 426, full_word: 'جَرَس', image_emoji: '🔔' },
    { word_id: 427, full_word: 'خَشَب', image_emoji: '🪵' },
    { word_id: 428, full_word: 'صَقْر', image_emoji: '🦅' },
    { word_id: 429, full_word: 'ضِفْدَع', image_emoji: '🐸' },
];

const wordListMatchLevel3 = [
    { word_id: 430, full_word: 'قَلَم', image_emoji: '🖊️' },
    { word_id: 431, full_word: 'سَمَكَة', image_emoji: '🐟' },
    { word_id: 432, full_word: 'كَلْب', image_emoji: '🐕' },
    { word_id: 433, full_word: 'نَمِر', image_emoji: '🐅' },
    { word_id: 434, full_word: 'هَدِيَة', image_emoji: '🎁' },
    { word_id: 435, full_word: 'مَوْز', image_emoji: '🍌' },
    { word_id: 436, full_word: 'فِيل', image_emoji: '🐘' },
    { word_id: 437, full_word: 'لَيْمُون', image_emoji: '🍋' },
    { word_id: 438, full_word: 'عِنَب', image_emoji: '🍇' },
    { word_id: 439, full_word: 'قِطَة', image_emoji: '🐈' },
    { word_id: 440, full_word: 'وَرْدَة', image_emoji: '🌹' },
    { word_id: 441, full_word: 'يَد', image_emoji: '✋' },
];

// --- Game Data: Mode 5 (Teaching Writing) ---
const wordListWriting = [
    {
        word_id: 501,
        full_word: 'دَرَج',
        image_url: 'https://img.freepik.com/premium-vector/illustration-wooden-stairs-isolated_756535-8346.jpg?semt=ais_user_personalization&w=740&q=80',
        letters: [
            { letter: 'د', shape: 'د' },
            { letter: 'ر', shape: 'ر' },
            { letter: 'ج', shape: 'ج' }
        ]
    },
    {
        word_id: 502,
        full_word: 'جَزَر',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZUR26Zrmb_OMqTgZo30tMZSoSXXDOptz2g&s',
        letters: [
            { letter: 'ج', shape: 'جـ' },
            { letter: 'ز', shape: 'ـز' },
            { letter: 'ر', shape: 'ر' }
        ]
    },
    {
        word_id: 503,
        full_word: 'دُب',
        image_emoji: '🐻',
        letters: [
            { letter: 'د', shape: 'د' },
            { letter: 'ب', shape: 'ب' }
        ]
    },
    {
        word_id: 504,
        full_word: 'بَاب',
        image_emoji: '🚪',
        letters: [
            { letter: 'ب', shape: 'بـ' },
            { letter: 'ا', shape: 'ـا' },
            { letter: 'ب', shape: 'ب' }
        ]
    },
    {
        word_id: 505,
        full_word: 'بَحْر',
        image_emoji: '🌊',
        letters: [
            { letter: 'ب', shape: 'بـ' },
            { letter: 'ح', shape: 'ـحـ' },
            { letter: 'ر', shape: 'ـر' }
        ]
    },
    {
        word_id: 506,
        full_word: 'حَجّ',
        image_url: 'https://media.istockphoto.com/id/1400218347/de/vektor/tawaf-wandert-sieben-mal-durch-kaaba.jpg?s=612x612&w=0&k=20&c=DV5OoDAd_iMH46Y17yNE73akyX0eK-G0CL9A2m33qDQ=',
        letters: [
            { letter: 'ح', shape: 'حـ' },
            { letter: 'ج', shape: 'ـج' }
        ]
    },
    {
        word_id: 507,
        full_word: 'تَاج',
        image_emoji: '👑',
        letters: [
            { letter: 'ت', shape: 'تـ' },
            { letter: 'ا', shape: 'ـا' },
            { letter: 'ج', shape: 'ج' }
        ]
    },
    {
        word_id: 508,
        full_word: 'تُرَاب',
        image_url: 'https://media.istockphoto.com/id/924159336/vector/pile-of-ground-with-hayfork.jpg?s=612x612&w=0&k=20&c=HLihLWj6LIxGozhbjF2wA93eSKvuyCNSOeEWTvA9k8M=',
        letters: [
            { letter: 'ت', shape: 'تـ' },
            { letter: 'ر', shape: 'ـر' },
            { letter: 'ا', shape: 'ا' },
            { letter: 'ب', shape: 'ب' }
        ]
    },
    {
        word_id: 509,
        full_word: 'شَبَح',
        image_emoji: '👻',
        letters: [
            { letter: 'ش', shape: 'شـ' },
            { letter: 'ب', shape: 'ـبـ' },
            { letter: 'ح', shape: 'ـح' }
        ]
    },
    {
        word_id: 510,
        full_word: 'شَمْس',
        image_emoji: '☀️',
        letters: [
            { letter: 'ش', shape: 'شـ' },
            { letter: 'م', shape: 'ـمـ' },
            { letter: 'س', shape: 'ـس' }
        ]
    },
    {
        word_id: 511,
        full_word: 'شَجَر',
        image_url: 'https://t4.ftcdn.net/jpg/15/64/22/51/360_F_1564225104_jXzRIRoyLVzd68jkU4gGVhPQRS24QiRT.jpg',
        letters: [
            { letter: 'ش', shape: 'شـ' },
            { letter: 'ج', shape: 'ـجـ' },
            { letter: 'ر', shape: 'ـر' }
        ]
    },
    {
        word_id: 512,
        full_word: 'جَرَس',
        image_emoji: '🔔',
        letters: [
            { letter: 'ج', shape: 'جـ' },
            { letter: 'ر', shape: 'ـر' },
            { letter: 'س', shape: 'س' }
        ]
    },
    {
        word_id: 513,
        full_word: 'بَرَّاد',
        image_url: 'https://img.freepik.com/premium-vector/refrigerator-clipart-vector-art-illustration_761413-26639.jpg',
        letters: [
            { letter: 'ب', shape: 'بـ' },
            { letter: 'ر', shape: 'ـر' },
            { letter: 'ا', shape: 'ا' },
            { letter: 'د', shape: 'د' }
        ]
    },
    {
        word_id: 514,
        full_word: 'رَأْس',
        image_url: 'https://static.vecteezy.com/system/resources/previews/054/996/337/non_2x/man-pointing-finger-at-his-head-isolated-on-white-background-vector.jpg',
        letters: [
            { letter: 'ر', shape: 'ر' },
            { letter: 'أ', shape: 'أ' },
            { letter: 'س', shape: 'س' }
        ]
    }
];



