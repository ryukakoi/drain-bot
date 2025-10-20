const { embedWithFooter } = require('../utils');
const chalk = require('chalk');

module.exports = {
    name: 'silentleave',
    description: 'Makes the bot leave the server',
    execute: async (message, args) => {
        if (!message.guild) return message.channel.send('```Run in a server channel.```');
        try {
            await message.guild.leave();
            console.log(chalk.red(`[LEFT] Left guild: ${message.guild.name}`));
        } catch {
            await message.channel.send('```Can’t leave server. Permission issue.```');
        }
    }
};