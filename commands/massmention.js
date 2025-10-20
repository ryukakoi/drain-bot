const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'massmention',
    description: 'Pings random users (max 5)',
    execute: async (message, args) => {
        const num = Math.max(1, Math.min(parseInt(args[0]) || 1, config.MAX_MASS_MENTION));
        if (!message.guild) return message.channel.send('```Run in a server channel.```');
        const members = message.guild.members.cache.filter(m => !m.user.bot).toArray();
        if (!members.length) return message.channel.send('```No members to mention.```');
        for (let i = 0; i < num; i++) {
            const chosen = members[Math.floor(Math.random() * members.length)];
            await message.channel.send(`\`\`\`${chosen}\`\`\``);
        }
    }
};