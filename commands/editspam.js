const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'editspam',
    description: 'Edits the bot’s last message multiple times (max 5)',
    execute: async (message, args) => {
        const num = Math.max(1, Math.min(parseInt(args[0]) || 1, config.MAX_EDIT_SPAM));
        const msgContent = args.slice(1).join(' ');
        let sent = await message.channel.send('```Starting edit spam...```');
        for (let i = 0; i < num; i++) {
            try {
                await sent.edit(`\`\`\`${msgContent} (${i + 1}/${num})\`\`\``);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch {}
        }
    }
};