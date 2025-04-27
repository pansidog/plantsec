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
};

// Reverse map for decryption
const reversePlantMap = Object.fromEntries(
    Object.entries(plantMap).map(([key, value]) => [value, key])
);

// Helper function to shift characters based on the key
function shiftChar(c, shift) {
    const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let isLower = lowerAlphabet.includes(c);
    let isUpper = upperAlphabet.includes(c);

    if (!isLower && !isUpper) return c; // Not a letter, return as is

    const alphabet = isLower ? lowerAlphabet : upperAlphabet;
    let idx = alphabet.indexOf(c);
    let shiftedIdx = (idx + shift + 26) % 26;
    return alphabet[shiftedIdx];
}

// Encrypt function using plant names and shift key
function encrypt(text, key) {
    let encrypted = [];
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let shiftedChar = shiftChar(char, key);

        // Use the plantMap for encryption
        if (plantMap[shiftedChar]) {
            encrypted.push(plantMap[shiftedChar]);
        } else {
            encrypted.push(shiftedChar); // Keep unknown characters (symbols, numbers)
        }
    }
    return encrypted.join(' ');
}

// Decrypt function
function decrypt(text, key) {
    const words = text.trim().split(/\s+/);
    let decrypted = '';

    for (let word of words) {
        // Check for exact plant mapping
        if (reversePlantMap[word]) {
            let originalChar = reversePlantMap[word];
            decrypted += shiftChar(originalChar, -key); // Shift back using negative key
        } else {
            decrypted += word; // Keep unknown characters as-is (for better consistency)
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
    let key = parseInt(document.getElementById('decryptionKey').value) || 0; // Default shift 0
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
