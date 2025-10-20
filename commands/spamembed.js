const { EmbedBuilder } = require('discord.js');
const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'spamembed',
    description: 'Sends multiple embeds with a title (max 5)',
    execute: async (message, args) => {
        const num = Math.max(1, Math.min(parseInt(args[0]) || 1, config.MAX_SPAM_EMBED));
        const title = args.slice(1).join(' ');
        for (let i = 0; i < num; i++) {
            await message.channel.send({ embeds: [new EmbedBuilder().setTitle(title).setDescription('```Spam mode activated.```').setColor(0xff9900)] });
        }
    }
};