const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!user) return message.channel.send('```Mention someone to kick.```');
        try {
            await user.kick(reason);
            await message.channel.send({ embeds: [embedWithFooter('User Kicked', `\`\`\`${user.user.tag} has been kicked. Reason: ${reason}\`\`\``, 0xFF0000)] });
            logSecurityAction('Kick', `${user.user.tag} kicked by ${message.author.tag} for: ${reason}`);
        } catch {
            await message.channel.send('```Failed to kick user.```');
        }
    }
};