const { embedWithFooter } = require('../utils');

module.exports = {
    name: '8ball',
    description: 'Asks the magic 8-ball a question',
    execute: async (message, args) => {
        if (!args.length) return message.channel.send('Usage: `!8ball <question>`');
        const responses = ['Yes', 'No', 'Maybe', 'Ask again later', 'Hell yeah', 'Nope', 'Doubt it'];
        await message.channel.send({ embeds: [embedWithFooter('Magic 8-Ball', `\`\`\`${responses[Math.floor(Math.random() * responses.length)]}\`\`\``, 0xFFD700)] });
    }
};