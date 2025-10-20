const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'slowmode',
    description: 'Sets slowmode for the channel',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const seconds = parseInt(args[0]) || 0;
        try {
            await message.channel.setRateLimitPerUser(seconds);
            await message.channel.send({ embeds: [embedWithFooter('Slowmode', `\`\`\`Set slowmode to ${seconds} seconds.\`\`\``, 0x00FF00)] });
            logSecurityAction('Slowmode', `Set slowmode to ${seconds}s in ${message.channel.name} by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to set slowmode.```');
        }
    }
};