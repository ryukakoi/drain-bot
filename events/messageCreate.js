const { PermissionsBitField } = require('discord.js');
const { performance } = require('perf_hooks');
const { linkMonitoring, setLinkMonitoring, bannedWords, antiSpam, setAntiSpam, spamTrack, logSecurityAction } = require('../security');
const { embedWithFooter } = require('../utils');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    // Anti-spam check
    if (antiSpam) {
        const userId = message.author.id;
        const now = performance.now();
        const userSpam = spamTrack.get(userId) || { count: 0, last: now };
        if (now - userSpam.last < 5000) {
            userSpam.count++;
            if (userSpam.count > 5) {
                try {
                    await message.member.timeout(10 * 60 * 1000, 'Anti-spam: Too many messages');
                    await message.channel.send({ embeds: [embedWithFooter('Anti-Spam', `\`\`\`${message.author.tag} has been timed out for spamming.\`\`\``, 0xFF0000)] });
                    logSecurityAction('Anti-Spam Timeout', `${message.author.tag} timed out for sending ${userSpam.count} messages in 5s`);
                } catch (err) {
                    console.log(chalk.red(`[!] Anti-spam timeout failed: ${err.message}`));
                }
            }
        } else {
            userSpam.count = 1;
            userSpam.last = now;
        }
        spamTrack.set(userId, userSpam);
    }

    // Link and word monitoring
    if (linkMonitoring && message.content.match(/https?:\/\/[^\s]+/)) {
        await message.delete();
        await message.channel.send({ embeds: [embedWithFooter('Link Monitoring', `\`\`\`${message.author.tag}, links are not allowed.\`\`\``, 0xFF0000)] });
        logSecurityAction('Link Deleted', `${message.author.tag}: ${message.content}`);
    }
    if (bannedWords.size && [...bannedWords].some(word => message.content.toLowerCase().includes(word))) {
        await message.delete();
        await message.channel.send({ embeds: [embedWithFooter('Banned Word', `\`\`\`${message.author.tag}, that word is not allowed.\`\`\``, 0xFF0000)] });
        logSecurityAction('Banned Word Deleted', `${message.author.tag}: ${message.content}`);
    }
};