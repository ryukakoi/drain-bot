const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'trollquote',
    description: 'Creates a fake quote from a user',
    execute: async (message, args) => {
        const user = message.mentions.members.first();
        if (!user) return message.channel.send('```Mention someone to fake quote.```');
        const fakeMsg = 'I’m the king of this server, bow down!';
        await message.channel.send({ embeds: [embedWithFooter(`${user.user.username} said:`, `\`\`\`${fakeMsg}\`\`\``, 0x7289DA)] });
    }
};