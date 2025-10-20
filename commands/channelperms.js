const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'channelperms',
    description: 'Shows the bot’s permissions in the current channel',
    execute: async (message, args) => {
        const perms = message.channel.permissionsFor(message.guild.members.me);
        const permList = perms.toArray().map(p => `${p}: true`).join('\n') || 'None';
        await message.channel.send({ embeds: [embedWithFooter('Channel Permissions (bot)', `\`\`\`${permList}\`\`\``, 0x7289DA)] });
    }
};