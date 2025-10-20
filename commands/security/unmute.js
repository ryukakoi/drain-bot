const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'unmute',
    description: 'Unmutes a user',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        if (!user) return message.channel.send('```Mention someone to unmute.```');
        try {
            await user.timeout(null, 'Unmuted by command');
            await message.channel.send({ embeds: [embedWithFooter('User Unmuted', `\`\`\`${user.user.tag} has been unmuted.\`\`\``, 0x00FF00)] });
            logSecurityAction('Unmute', `${user.user.tag} unmuted by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to unmute user.```');
        }
    }
};