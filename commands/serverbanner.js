const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'serverbanner',
    description: 'Displays the server’s banner image',
    execute: async (message, args) => {
        if (!message.guild) return message.channel.send('```Run in a server text channel.```');
        const banner = message.guild.bannerURL();
        if (banner) {
            await message.channel.send({ embeds: [embedWithFooter(`${message.guild.name} Banner`, '```Check the vibes.```', 0x7289DA).setImage(banner)] });
        } else {
            await message.channel.send('```No banner in this server.```');
        }
    }
};