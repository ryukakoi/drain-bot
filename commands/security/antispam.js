const { embedWithFooter } = require('../../utils');

// Simple in-memory anti-spam state (persistence can be added later)
let antiSpamEnabled = false;

module.exports = {
    name: 'antispam',
    description: 'Enable or disable anti-spam protection',
    slashOptions: [
        {
            name: 'action',
            description: 'Enable or disable anti-spam (on/off)',
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
                embeds: [embedWithFooter('Error', 'Please specify `on` or `off`. Usage: `!antispam on` or `!antispam off`', 0xFF0000)],
            });
        }

        // Update anti-spam state
        if (action === 'on') {
            if (antiSpamEnabled) {
                return message.reply({
                    embeds: [embedWithFooter('Anti-Spam', 'Anti-spam protection is already enabled.', 0xFFFF00)],
                });
            }
            antiSpamEnabled = true;
            return message.reply({
                embeds: [embedWithFooter('Anti-Spam', 'Anti-spam protection has been enabled.', 0x00FF00)],
            });
        } else {
            if (!antiSpamEnabled) {
                return message.reply({
                    embeds: [embedWithFooter('Anti-Spam', 'Anti-spam protection is already disabled.', 0xFFFF00)],
                });
            }
            antiSpamEnabled = false;
            return message.reply({
                embeds: [embedWithFooter('Anti-Spam', 'Anti-spam protection has been disabled.', 0x00FF00)],
            });
        }
    },
};