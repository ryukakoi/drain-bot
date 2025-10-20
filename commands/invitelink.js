const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'invitelink',
    description: 'Creates a temporary server invite',
    execute: async (message, args) => {
        if (!message.guild) return message.channel.send('```Run in a server channel.```');
        try {
            const invite = await message.channel.createInvite({ maxAge: 300, maxUses: 1 });
            await message.channel.send({ embeds: [embedWithFooter('Invite Link', `\`\`\`${invite.url}\`\`\``, 0x7289DA)] });
        } catch {
            await message.channel.send('```No perms to create invite.```');
        }
    }
};