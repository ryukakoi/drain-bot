const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { addWarning, logSecurityAction } = require('../../security');

module.exports = {
    name: 'warn',
    description: 'Warns a user and logs it',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        if (!user) return message.channel.send('```Mention someone to warn.```');
        addWarning(user.id, reason);
        await message.channel.send({ embeds: [embedWithFooter('User Warned', `\`\`\`${user.user.tag} has been warned. Reason: ${reason}\`\`\``, 0xFF0000)] });
        logSecurityAction('Warn', `${user.user.tag} warned by ${message.author.tag} for: ${reason}`);
    }
};