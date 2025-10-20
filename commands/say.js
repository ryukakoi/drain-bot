const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'say',
    description: 'Echoes a message',
    execute: async (message, args) => {
        if (!args.length) return message.channel.send('Usage: `!say <message>`');
        await message.channel.send({ embeds: [embedWithFooter('Echo Chamber', `\`\`\`${args.join(' ')}\`\`\``, 0xff9900, 'Boss says...')] });
    }
};