const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'floodemoji',
    description: 'Spams an emoji (max 10)',
    execute: async (message, args) => {
        const emoji = args[0];
        const num = Math.max(1, Math.min(parseInt(args[1]) || 1, config.MAX_FLOOD_EMOJI));
        for (let i = 0; i < num; i++) {
            await message.channel.send(`\`\`\`${emoji}\`\`\``);
        }
    }
};