const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Replace with your actual bot token
const token = 'YOUR_TELEGRAM_BOT_TOKEN'; // <<< IMPORTANT: Replace this!

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let foodLinks = [];

// Load links from the JSON file
try {
    foodLinks = JSON.parse(fs.readFileSync('foodLinks.json', 'utf8'));
    console.log(`Loaded ${foodLinks.length} food links.`);
} catch (error) {
    console.error('Error loading food links from foodLinks.json:', error);
    console.log('Please run "node scrape.js" first to generate the file.');
}

// Listen for the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hi! I can suggest you a random dish from SAS.am. Type /food to get a recommendation!');
});

// Listen for the /food command
bot.onText(/\/food/, (msg) => {
    const chatId = msg.chat.id;

    if (foodLinks.length === 0) {
        bot.sendMessage(chatId, 'Sorry, I don\'t have a list of dishes. Please ask the administrator to run the scraper.');
        return;
    }

    // Get a random link
    const randomIndex = Math.floor(Math.random() * foodLinks.length);
    const randomLink = foodLinks[randomIndex];

    bot.sendMessage(chatId, `Here's a random dish for you: ${randomLink}`);
});

// Basic error handling
bot.on('polling_error', (error) => {
    console.error(`Polling error: ${error.code} - ${error.message}`);
});

console.log('Bot started. Send /start or /food in Telegram!');