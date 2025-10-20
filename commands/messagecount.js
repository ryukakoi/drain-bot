const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'messagecount',
    description: 'Counts up to 1000 messages in the current channel',
    execute: async (message, args) => {
        let count = 0;
        const messages = await message.channel.messages.fetch({ limit: config.MAX_MESSAGECOUNT_HISTORY });
        count = messages.size;
        await message.channel.send({ embeds: [embedWithFooter('Message Count', `\`\`\`Found ${count} messages in channel.\`\`\``, 0x7289DA)] });
    }
};