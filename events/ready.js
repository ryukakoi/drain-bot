const chalk = require('chalk');
const { clearScreen, fetchBytesFromUrl } = require('../utils');
const config = require('../config');

module.exports = async (client) => {
    try {
        console.log(chalk.cyan('[READY] Starting ready event...'));
        console.log(chalk.cyan('[READY] Clearing console...'));
        clearScreen();
        
        if (!config.ASCII_ART) {
            console.log(chalk.yellow('[READY] Warning: ASCII_ART not defined in config.js'));
        } else {
            console.log(chalk.magenta(config.ASCII_ART));
        }
        console.log(chalk.red(`[READY] Logged in as: ${client.user.tag} (ID: ${client.user.id})`));
        console.log(chalk.blue('[READY] Discord Bot - Drain Activated'));
        console.log('-'.repeat(60));

        // Attempt to set username
        if (client.user.username !== config.BOT_NAME) {
            try {
                console.log(chalk.cyan('[READY] Attempting to set username to', config.BOT_NAME));
                await client.user.setUsername(config.BOT_NAME);
                console.log(chalk.greenBright(`[✔] Username set to '${config.BOT_NAME}'`));
            } catch (error) {
                console.log(chalk.redBright(`[READY] Failed to set username: ${error.message}`));
            }
        } else {
            console.log(chalk.cyan('[READY] Username already set to', config.BOT_NAME));
        }

        // Attempt to set avatar
        if (config.PFP_URL) {
            try {
                console.log(chalk.cyan('[READY] Fetching avatar from URL:', config.PFP_URL));
                const data = await fetchBytesFromUrl(config.PFP_URL);
                await client.user.setAvatar(data);
                console.log(chalk.greenBright('[✔] Avatar updated successfully'));
            } catch (error) {
                console.log(chalk.redBright(`[READY] Failed to set avatar: ${error.message}`));
            }
        } else {
            console.log(chalk.yellow('[READY] No PFP_URL defined in config.js'));
        }

        console.log(chalk.green('[READY] Bot setup complete.'));
    } catch (error) {
        console.error(chalk.redBright(`[READY] Error in ready event: ${error.message}`));
        console.error(chalk.redBright(error.stack));
    }
};