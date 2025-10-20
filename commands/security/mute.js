const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'mute',
    description: 'Mutes a user for a duration',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        const duration = parseInt(args[1]) || 10;
        if (!user) return message.channel.send('```Mention someone to mute.```');
        try {
            await user.timeout(duration * 60 * 1000, 'Muted by command');
            await message.channel.send({ embeds: [embedWithFooter('User Muted', `\`\`\`${user.user.tag} has been muted for ${duration} minutes.\`\`\``, 0xFF0000)] });
            logSecurityAction('Mute', `${user.user.tag} muted by ${message.author.tag} for ${duration} minutes`);
        } catch {
            await message.channel.send('```Failed to mute user. Ensure I have permission to manage roles.```');
        }
    }
};