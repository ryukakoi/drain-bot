const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'servernick',
    description: 'Changes the bot’s nickname in the current server',
    execute: async (message, args) => {
        const name = args.join(' ');
        try {
            await message.guild.members.me.setNickname(name);
            await message.channel.send({ embeds: [embedWithFooter('Server Nick Change', `\`\`\`Changed nick in ${message.guild.name} to ${name}\`\`\``, 0x7289DA)] });
        } catch {
            await message.channel.send('```Unable to change nick here (missing permissions).```');
        }
    }
};