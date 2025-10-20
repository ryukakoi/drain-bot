const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'unlockchannel',
    description: 'Unlocks the channel',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: null });
            await message.channel.send({ embeds: [embedWithFooter('Channel Unlocked', '```Channel is now open for messages.```', 0x00FF00)] });
            logSecurityAction('Channel Unlock', `Channel ${message.channel.name} unlocked by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to unlock channel.```');
        }
    }
};