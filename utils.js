const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const chalk = require('chalk');

function clearScreen() {
    try {
        process.stdout.write('\x1Bc'); // ANSI escape code for clearing console
        console.log(chalk.cyan('[UTILS] Console cleared'));
    } catch (error) {
        console.log(chalk.red('[UTILS] Failed to clear console:', error.message));
    }
}

async function fetchBytesFromUrl(url) {
    try {
        console.log(chalk.cyan('[UTILS] Fetching URL:', url));
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}`);
        }
        console.log(chalk.cyan('[UTILS] Successfully fetched URL'));
        return Buffer.from(response.data);
    } catch (error) {
        console.error(chalk.red(`[UTILS] Failed to fetch URL: ${error.message}`));
        throw error;
    }
}

function embedWithFooter(title, description, color = 0x7289DA, footer = 'Drain Bot') {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setFooter({ text: footer });
}

module.exports = { clearScreen, fetchBytesFromUrl, embedWithFooter };