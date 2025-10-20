const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'serverlock',
    description: 'Locks the server to prevent new members',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        try {
            await message.guild.setVerificationLevel(4); // High verification level
            await message.channel.send({ embeds: [embedWithFooter('Server Locked', '```Server is now locked to new members.```', 0xFF0000)] });
            logSecurityAction('Server Lock', `Server locked by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to lock server.```');
        }
    }
};