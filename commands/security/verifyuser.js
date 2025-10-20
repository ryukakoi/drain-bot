const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'verifyuser',
    description: 'Assigns a verified role to a user',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        if (!user) return message.channel.send('```Mention someone to verify.```');
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'verified');
        if (!role) return message.channel.send('```No "Verified" role found. Create one first.```');
        try {
            await user.roles.add(role);
            await message.channel.send({ embeds: [embedWithFooter('User Verified', `\`\`\`${user.user.tag} has been verified.\`\`\``, 0x00FF00)] });
            logSecurityAction('Verify User', `${user.user.tag} verified by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to verify user.```');
        }
    }
};