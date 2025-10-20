const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'unverifyuser',
    description: 'Removes verified role from a user',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        if (!user) return message.channel.send('```Mention someone to unverify.```');
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'verified');
        if (!role) return message.channel.send('```No "Verified" role found.```');
        try {
            await user.roles.remove(role);
            await message.channel.send({ embeds: [embedWithFooter('User Unverified', `\`\`\`${user.user.tag} has been unverified.\`\`\``, 0x00FF00)] });
            logSecurityAction('Unverify User', `${user.user.tag} unverified by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to unverify user.```');
        }
    }
};