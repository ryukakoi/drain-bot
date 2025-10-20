const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'fakeban',
    description: 'Sends a fake ban message for a user',
    execute: async (message, args) => {
        const user = message.mentions.members.first();
        if (!user) return message.channel.send('```Mention someone to fake ban.```');
        await message.channel.send({ embeds: [embedWithFooter('User Banned', `\`\`\`${user.user.username} has been banned. Reason: Trolling too hard.\`\`\``, 0xff0000)] });
    }
};