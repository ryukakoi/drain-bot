const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');
const { logSecurityAction } = require('../../security');

module.exports = {
    name: 'lockchannel',
    description: 'Locks the channel to prevent non-admins from sending messages',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
            await message.channel.send({ embeds: [embedWithFooter('Channel Locked', '```Non-admins can no longer send messages.```', 0xFF0000)] });
            logSecurityAction('Channel Lock', `Channel ${message.channel.name} locked by ${message.author.tag}`);
        } catch {
            await message.channel.send('```Failed to lock channel.```');
        }
    }
};