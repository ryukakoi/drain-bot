const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!user) return message.channel.send('```Mention someone to ban.```');
        try {
            await message.guild.members.ban(user, { reason });
            await message.channel.send({ embeds: [embedWithFooter('User Banned', `\`\`\`${user.user.tag} has been banned. Reason: ${reason}\`\`\``, 0xFF0000)] });
            logSecurityAction('Ban', `${user.user.tag} banned by ${message.author.tag} for: ${reason}`);
        } catch {
            await message.channel.send('```Failed to ban user.```');
        }
    }
};