const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'serverunlock',
    description: 'Unlocks the server for new members',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        try {
            await message.guild.setVerificationLevel(0); // No verification
            await message.channel.send({ embeds: [embedWithFooter('Server Unlocked', '```Server is now open for new members.```', 0x00FF00)] });
            logSecurityAction('Server Unlock', `Server unlocked by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to unlock server.```');
        }
    }
};