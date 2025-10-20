const { embedWithFooter } = require('../../utils');

// Simple in-memory link monitoring state
let linkMonitoringEnabled = false;

module.exports = {
    name: 'monitorlinks',
    description: 'Enable or disable link monitoring in the server',
    slashOptions: [
        {
            name: 'action',
            description: 'Enable or disable link monitoring (on/off)',
            type: 'string',
            required: true,
        },
    ],
    execute: async (message, args) => {
        // Check if user has administrator permission
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply({
                embeds: [embedWithFooter('Error', 'You need Administrator permission to use this command.', 0xFF0000)],
            });
        }

        // Get the action argument
        const action = args[0]?.toLowerCase();
        if (!action || !['on', 'off'].includes(action)) {
            return message.reply({
                embeds: [embedWithFooter('Error', 'Please specify `on` or `off`. Usage: `!monitorlinks on` or `!monitorlinks off`', 0xFF0000)],
            });
        }

        // Update link monitoring state
        if (action === 'on') {
            if (linkMonitoringEnabled) {
                return message.reply({
                    embeds: [embedWithFooter('Link Monitoring', 'Link monitoring is already enabled.', 0xFFFF00)],
                });
            }
            linkMonitoringEnabled = true;
            return message.reply({
                embeds: [embedWithFooter('Link Monitoring', 'Link monitoring has been enabled.', 0x00FF00)],
            });
        } else {
            if (!linkMonitoringEnabled) {
                return message.reply({
                    embeds: [embedWithFooter('Link Monitoring', 'Link monitoring is already disabled.', 0xFFFF00)],
                });
            }
            linkMonitoringEnabled = false;
            return message.reply({
                embeds: [embedWithFooter('Link Monitoring', 'Link monitoring has been disabled.', 0x00FF00)],
            });
        }
    },
};