// Toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
}

// 🔥 Clean and Unique Plant Mappings
const plantMap = {
    'A': 'Aloe Vera', 'B': 'Bamboo', 'C': 'Cactus', 'D': 'Daisy', 'E': 'Eucalyptus', 'F': 'Fern',
    'G': 'Gardenia', 'H': 'Hyacinth', 'I': 'Iris', 'J': 'Jasmine', 'K': 'Kalanchoe',
    'L': 'Lavender', 'M': 'Magnolia', 'N': 'Nasturtium', 'O': 'Oleander', 'P': 'Poppy',
    'Q': 'Quince', 'R': 'Rose', 'S': 'Sunflower', 'T': 'Tulip', 'U': 'Uva Ursi', 'V': 'Verbena',
    'W': 'Willow', 'X': 'Xerophyte', 'Y': 'Yarrow', 'Z': 'Zinnia',
    'a': 'Ageratum', 'b': 'Begonia', 'c': 'Camellia', 'd': 'Dahlia', 'e': 'Echinacea',
    'f': 'Foxglove', 'g': 'Gladiolus', 'h': 'Heliotrope', 'i': 'Impatiens', 'j': 'Jacobinia',
    'k': 'Kangaroo Paw', 'l': 'Lilac', 'm': 'Marigold', 'n': 'Nemesia', 'o': 'Orchid',
    'p': 'Petunia', 'q': 'Queen Anne\'s Lace', 'r': 'Ranunculus', 's': 'Snapdragon', 't': 'Thyme',
    'u': 'Upland Cress', 'v': 'Violet', 'w': 'Wisteria', 'x': 'Xerophilous', 'y': 'Yellow Bell',
    'z': 'Zucchini'
    // 🔥 No numbers or symbols anymore! You can add them later safely if you want, but no conflicts!
};

// Reverse map for decryption
const reversePlantMap = Object.fromEntries(Object.entries(plantMap).map(([key, value]) => [value, key]));

// Helper function to shift characters based on the key
function shiftChar(c, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const idx = alphabet.indexOf(c.toLowerCase());
    if (idx === -1) return c; // Not a letter

    let shiftedIdx = (idx + shift) % 26;
    if (shiftedIdx < 0) shiftedIdx += 26;

    let shiftedChar = alphabet[shiftedIdx];
    return c === c.toUpperCase() ? shiftedChar.toUpperCase() : shiftedChar;
}

// Encrypt function using plant names and shift key
function encrypt(text, key) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let shiftedChar = shiftChar(char, key);
        if (plantMap[shiftedChar]) {
            encrypted += plantMap[shiftedChar] + ' ';
        } else {
            encrypted += char + ' '; // Preserve unknown characters
        }
    }
    return encrypted.trim();
}

// Decrypt function
function decrypt(text, key) {
    const words = text.trim().split(/\s+/);
    let decrypted = '';

    for (let word of words) {
        if (reversePlantMap[word]) {
            let originalChar = reversePlantMap[word];
            decrypted += shiftChar(originalChar, -key);
        } else {
            decrypted += '?'; // Unknown mapping
        }
    }
    return decrypted;
}

// Test encryption
function testEncryption() {
    let inputText = document.getElementById('inputText').value;
    let key = parseInt(document.getElementById('encryptionKey').value) || 0; // Default shift 0
    let encryptedText = encrypt(inputText, key);

    document.getElementById('encryptedText').value = encryptedText;
}

// Test decryption
function testDecryption() {
    let inputEncryptedText = document.getElementById('inputEncryptedText').value;
    let key = parseInt(document.getElementById('encryptionKey').value) || 0; // Default shift 0
    let decryptedText = decrypt(inputEncryptedText, key);

    document.getElementById('decryptedText').value = decryptedText;
}

// Speech recognition to input
function startSpeech(targetId) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        document.getElementById(targetId).value += speechResult;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event);
        alert(`Speech recognition error: ${event.error}`);
    };
}
