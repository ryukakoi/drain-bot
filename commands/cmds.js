const { embedWithFooter } = require('../utils');
const config = require('../config');

module.exports = {
    name: 'cmds',
    description: 'Show commands list in a compact format',
    execute: async (message, args) => {
        const commandsList = [
            '!ping          - Pong in embed',
            '!say <msg>     - Echo message in embed',
            '!clear <num>   - Delete last N messages (bot deletes, not user)',
            '!serverbanner  - Grab server banner',
            '!userroles <@user> - List user\'s roles',
            '!channelperms  - Show channel permissions for the bot',
            '!invitelink    - Create temp invite (requires create invite perms)',
            '!messagecount  - Count up to 1000 messages in channel',
            '!massmention <num> - Ping random users (limited)',
            '!floodemoji <emoji> <num> - Spam emoji (limited)',
            '!fakeban <@user> - Fake ban message (embed)',
            '!trollquote <@user> - Fake user quote (embed)',
            '!spamembed <num> <title> - Spam embeds (limited)',
            '!snipeall      - Show recent deleted messages',
            '!editspam <num> <msg> - Edit last bot message N times',
            '!silentleave   - Bot leaves the server',
            '!servernick <name> - Change bot\'s nick across servers (where allowed)',
            '!clearstatus   - Reset bot activity',
            '!rps <rock/paper/scissors> - Play rock-paper-scissors',
            '!8ball <question> - Magic 8-ball',
            '!randuser      - Pick random server member',
            '!fakeerror     - Send fake error embed',
            '!countdown <seconds> - Countdown timer',
            '!ban <@user> [reason] - Ban a user',
            '!kick <@user> [reason] - Kick a user',
            '!mute <@user> [duration] - Mute a user',
            '!unmute <@user> - Unmute a user',
            '!warn <@user> [reason] - Warn a user',
            '!warnings <@user> - Show user warnings',
            '!clearwarnings <@user> - Clear user warnings',
            '!lockchannel - Lock the channel',
            '!unlockchannel - Unlock the channel',
            '!slowmode [seconds] - Set channel slowmode',
            '!monitorlinks [on/off] - Toggle link monitoring',
            '!monitorwords <add/remove> <word> - Manage banned words',
            '!auditlog [limit] - Show audit log',
            '!rolelock <@role> - Restrict role messaging',
            '!roleunlock <@role> - Unlock role messaging',
            '!antispam [on/off] - Toggle anti-spam protection',
            '!verifyuser <@user> - Verify a user',
            '!unverifyuser <@user> - Unverify a user',
            '!serverlock - Lock server to new members',
            '!serverunlock - Unlock server for new members',
        ];
        const desc = '```\n' + commandsList.join('\n') + '\n```';
        await message.channel.send({ embeds: [embedWithFooter('Commands loaded', desc, 0x00CED1, 'Use responsibly')] });
    }
};