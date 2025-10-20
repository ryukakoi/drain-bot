const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'randuser',
    description: 'Picks a random server member',
    execute: async (message, args) => {
        if (!message.guild) return message.channel.send('Run this in a server channel.');
        const members = message.guild.members.cache.filter(m => !m.user.bot).toArray();
        if (!members.length) return message.channel.send('No members found.');
        const member = members[Math.floor(Math.random() * members.length)];
        await message.channel.send({ embeds: [embedWithFooter('Random User', `\`\`\`${member.user.tag}\`\`\``, 0x7289DA)] });
    }
};