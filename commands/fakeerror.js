const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'fakeerror',
    description: 'Sends a fake error message',
    execute: async (message, args) => {
        await message.channel.send({ embeds: [embedWithFooter('Critical Error', '```System Failure: Code 0xDEADBEEF. Contact admin immediately.```', 0xff0000)] });
    }
};