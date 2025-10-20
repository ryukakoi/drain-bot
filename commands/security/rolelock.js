const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'rolelock',
    description: 'Restricts a role from sending messages',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const role = message.mentions.roles.first();
        if (!role) return message.channel.send('```Mention a role to lock.```');
        try {
            await message.channel.permissionOverwrites.edit(role, { SendMessages: false });
            await message.channel.send({ embeds: [embedWithFooter('Role Locked', `\`\`\`${role.name} can no longer send messages.\`\`\``, 0xFF0000)] });
            logSecurityAction('Role Lock', `${role.name} locked by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to lock role.```');
        }
    }
};