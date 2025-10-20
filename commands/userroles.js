const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'userroles',
    description: 'Lists the roles of a user',
    execute: async (message, args) => {
        const user = message.mentions.members.first() || message.member;
        const roles = user.roles.cache.filter(r => r.name !== '@everyone').map(r => r.name).join(', ') || 'None';
        await message.channel.send({ embeds: [embedWithFooter(`${user.user.username}'s Roles`, `\`\`\`${roles}\`\`\``, 0x7289DA)] });
    }
};