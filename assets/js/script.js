// Toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
}

// Plant name mappings for encryption and decryption
const plantMap = {
    'A': 'Aloe Vera', 'B': 'Bamboo', 'C': 'Cactus', 'D': 'Daisy', 'E': 'Elm', 'F': 'Fern',
    'G': 'Geranium', 'H': 'Hibiscus', 'I': 'Iris', 'J': 'Jasmine', 'K': 'Kangaroo Paw',
    'L': 'Lavender', 'M': 'Magnolia', 'N': 'Narcissus', 'O': 'Orchid', 'P': 'Pansy',
    'Q': 'Quince', 'R': 'Rose', 'S': 'Sunflower', 'T': 'Tulip', 'U': 'Uva', 'V': 'Violet',
    'W': 'Willow', 'X': 'Xerophyte', 'Y': 'Yarrow', 'Z': 'Zinnia',
    'a': 'Ageratum', 'b': 'Begonia', 'c': 'Camellia', 'd': 'Dahlia', 'e': 'Echinacea',
    'f': 'Foxglove', 'g': 'Gladiolus', 'h': 'Heliotrope', 'i': 'Impatiens', 'j': 'Jasmine',
    'k': 'Kalanchoe', 'l': 'Lilac', 'm': 'Marigold', 'n': 'Nasturtium', 'o': 'Oleander',
    'p': 'Petunia', 'q': 'Quince', 'r': 'Ranunculus', 's': 'Snapdragon', 't': 'Thyme',
    'u': 'Upland Cress', 'v': 'Verbena', 'w': 'Wisteria', 'x': 'Xerophilous', 'y': 'Yellow Bell',
    'z': 'Zucchini', '0': 'Oregano', '1': 'Onion', '2': 'Okra', '3': 'Olive', '4': 'Aloe Vera',
    '5': 'Balsam', '6': 'Bellflower', '7': 'Cress', '8': 'Daisy', '9': 'Fuchsia',
    '~': 'Geranium', '!': 'Heliotrope', '@': 'Ivy', '#': 'Jasmine', '$': 'Kale', '%': 'Lavender'
};

// Reverse map for decryption
const reversePlantMap = Object.fromEntries(Object.entries(plantMap).map(([key, value]) => [value, key]));

// Helper function to shift characters based on the key
function shiftChar(char, key) {
    const isUpperCase = char >= 'A' && char <= 'Z';
    const isLowerCase = char >= 'a' && char <= 'z';
    const isDigit = char >= '0' && char <= '9';

    if (isUpperCase) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65);
    } else if (isLowerCase) {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + key) % 26) + 97);
    } else if (isDigit) {
        return String.fromCharCode(((char.charCodeAt(0) - 48 + key) % 10) + 48);
    }
    return char; // Return the character unchanged if not alphanumeric
}

// Encrypt function using plant names as substitutions and key
function encrypt(text, key) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let shiftedChar = shiftChar(char, key); // Apply the shift based on the key
        encrypted += plantMap[shiftedChar] ? plantMap[shiftedChar] + ' ' : char + ' ';
    }
    return encrypted.trim(); // Remove last space
}

// Decrypt function using reverse plant names and key
function decrypt(text, key) {
    let decrypted = '';
    const words = text.split(' '); // Split by space to extract plant names
    for (let i = 0; i < words.length; i++) {
        let originalChar = reversePlantMap[words[i]] || words[i]; // Get the original character from the reverse map
        decrypted += shiftChar(originalChar, -key); // Reverse the shift using the negative key
    }
    return decrypted; // Return the decrypted text
}

// Test encryption
function testEncryption() {
    let inputText = document.getElementById('inputText').value;
    let key = parseInt(document.getElementById('encryptionKey').value) || 1; // Default key is 0
    let encryptedText = encrypt(inputText, key);

    // Display encrypted text
    document.getElementById('encryptedText').value = encryptedText;
}

// Test decryption
function testDecryption() {
    let inputEncryptedText = document.getElementById('inputEncryptedText').value;
    let key = parseInt(document.getElementById('encryptionKey').value) || 1; // Default key is 0
    let decryptedText = decrypt(inputEncryptedText, key);

    // Display decrypted text
    document.getElementById('decryptedText').value = decryptedText;
}
function startSpeech(targetId) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Use final results only
    recognition.maxAlternatives = 1;

    recognition.start(); // Start recognition

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript; // Capture spoken text
        document.getElementById(targetId).value += speechResult; // Append to the target input
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event);
        alert(`Speech recognition error: ${event.error}`);
    };
}
