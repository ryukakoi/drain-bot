const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'roleunlock',
    description: 'Removes message restrictions from a role',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const role = message.mentions.roles.first();
        if (!role) return message.channel.send('```Mention a role to unlock.```');
        try {
            await message.channel.permissionOverwrites.edit(role, { SendMessages: null });
            await message.channel.send({ embeds: [embedWithFooter('Role Unlocked', `\`\`\`${role.name} can now send messages.\`\`\``, 0x00FF00)] });
            logSecurityAction('Role Unlock', `${role.name} unlocked by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to unlock role.```');
        }
    }
};