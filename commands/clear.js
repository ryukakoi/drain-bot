const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'clear',
    description: 'Deletes the last N messages',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const num = parseInt(args[0]) || 0;
        const amount = Math.min(num, config.MAX_PURGE);
        try {
            const deleted = await message.channel.bulkDelete(amount, true);
            const temp = await message.channel.send({ embeds: [embedWithFooter('Cleanup Crew', `\`\`\`Deleted ${deleted.size} messages.\`\`\``, 0xFF0000)] });
            setTimeout(() => temp.delete().catch(() => {}), 3000);
        } catch {
            await message.channel.send('```No perms to delete messages.```');
        }
    }
};