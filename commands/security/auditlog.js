const { PermissionsBitField } = require('discord.js');
const { embedWithFooter } = require('../../utils');

module.exports = {
    name: 'auditlog',
    description: 'Shows recent audit log entries',
    execute: async (message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) {
            return message.channel.send('```You lack permissions to run this command.```');
        }
        const limit = Math.min(parseInt(args[0]) || 5, 50);
        try {
            const auditLogs = await message.guild.fetchAuditLogs({ limit });
            const entries = auditLogs.entries.map(entry => `${entry.action} by ${entry.executor.tag} at ${new Date(entry.createdTimestamp).toLocaleString()}`).join('\n');
            await message.channel.send({ embeds: [embedWithFooter('Audit Log', `\`\`\`${entries || 'No recent audit logs'}\`\`\``, 0x7289DA)] });
        } catch {
            await message.channel.send('```Failed to fetch audit logs.```');
        }
    }
};