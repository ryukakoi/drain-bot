const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'clearstatus',
    description: 'Resets the bot’s activity status',
    execute: async (message, args) => {
        await message.client.user.setPresence({ activities: [] });
        await message.channel.send('```Status cleared. Back to default.```');
    }
};