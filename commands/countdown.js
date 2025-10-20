const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'countdown',
    description: 'Runs a countdown timer (max 30 seconds)',
    execute: async (message, args) => {
        let seconds = Math.max(0, Math.min(parseInt(args[0]) || 0, config.MAX_COUNTDOWN));
        for (let i = seconds; i >= 0; i--) {
            const msg = await message.channel.send({ embeds: [embedWithFooter('Countdown', `\`\`\`${i} seconds remaining...\`\`\``, 0xFF4500)] });
            await new Promise(resolve => setTimeout(resolve, 1000));
            await msg.delete().catch(() => {});
        }
        await message.channel.send({ embeds: [embedWithFooter('Countdown', '```BOOM! Time’s up.```', 0xFF4500)] });
    }
};