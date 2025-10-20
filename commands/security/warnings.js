const { embedWithFooter } = require('../../utils');
const { warnings } = require('../../security');

module.exports = {
    name: 'warnings',
    description: 'Shows a user’s warning history',
    execute: async (message, args) => {
        const user = message.mentions.members.first();
        if (!user) return message.channel.send('```Mention someone to check warnings.```');
        const userWarnings = warnings.get(user.id) || [];
        const desc = userWarnings.length ? userWarnings.map(w => `Reason: ${w.reason} (at ${new Date(w.timestamp).toLocaleString()})`).join('\n') : 'No warnings';
        await message.channel.send({ embeds: [embedWithFooter(`${user.user.tag}'s Warnings`, `\`\`\`${desc}\`\`\``, 0x7289DA)] });
    }
};