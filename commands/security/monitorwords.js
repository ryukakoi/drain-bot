const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { bannedWords, logSecurityAction } = require('../../security');

module.exports = {
    name: 'monitorwords',
    description: 'Manages banned words for message filtering',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const action = args[0]?.toLowerCase();
        const word = args[1]?.toLowerCase();
        if (!action || !word || !['add', 'remove'].includes(action)) {
            return message.channel.send('Usage: `!monitorwords <add/remove> <word>`');
        }
        if (action === 'add') {
            bannedWords.add(word);
            await message.channel.send({ embeds: [embedWithFooter('Banned Word Added', `\`\`\`${word} added to banned words.\`\`\``, 0x00FF00)] });
            logSecurityAction('Banned Word Added', `${word} added by ${message.author.tag}`);
        } else {
            bannedWords.delete(word);
            await message.channel.send({ embeds: [embedWithFooter('Banned Word Removed', `\`\`\`${word} removed from banned words.\`\`\``, 0x00FF00)] });
            logSecurityAction('Banned Word Removed', `${word} removed by ${message.author.tag}`);
        }
    }
};