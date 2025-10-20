const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'snipeall',
    description: 'Shows recently deleted messages',
    execute: async (message, args) => {
        const deletedMessages = message.client.deletedMessages || [];
        if (!deletedMessages.length) return message.channel.send('```No deleted messages logged.```');
        const toShow = deletedMessages.slice(-5);
        const descLines = toShow.map(m => `${m.author?.tag || 'Unknown'}: ${m.content || '[embed/attachment]'}`);
        await message.channel.send({ embeds: [embedWithFooter('Snipe All', `\`\`\`${descLines.join('\n')}\`\`\``, 0x7289DA)] });
    }
};