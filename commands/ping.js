const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'ping',
    description: 'Shows bot latency',
    execute: async (message, args) => {
        const latency = message.client.ws.ping;
        await message.channel.send({ embeds: [embedWithFooter('Pong!', `\`\`\`Latency: ${latency}ms\`\`\``, 0x00FF00)] });
    }
};