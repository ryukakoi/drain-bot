const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { warnings, logSecurityAction } = require('../../security');

module.exports = {
    name: 'clearwarnings',
    description: 'Clears a user’s warnings',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        if (!user) return message.channel.send('```Mention someone to clear warnings.```');
        warnings.delete(user.id);
        await message.channel.send({ embeds: [embedWithFooter('Warnings Cleared', `\`\`\`${user.user.tag}'s warnings have been cleared.\`\`\``, 0x00FF00)] });
        logSecurityAction('Clear Warnings', `${user.user.tag}'s warnings cleared by ${message.author.tag}`);
    }
};