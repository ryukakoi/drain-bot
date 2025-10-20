const { embedWithFooter } = require('../utils');
const config = require('../config'); // Added missing import

module.exports = {
    name: 'help',
    description: 'Show a user-friendly list of all commands',
    slashOptions: [], // No options needed for help
    execute: async (message, args) => {
        const commandsList = [
            { name: 'ping', desc: 'Shows bot latency in milliseconds' },
            { name: 'say <msg>', desc: 'Echoes your message in an embed' },
            { name: 'clear <num>', desc: 'Deletes the last N messages (requires manage messages permission)' },
            { name: 'serverbanner', desc: 'Displays the server’s banner image' },
            { name: 'userroles <@user>', desc: 'Lists the roles of a user (defaults to you)' },
            { name: 'channelperms', desc: 'Shows the bot’s permissions in the current channel' },
            { name: 'invitelink', desc: 'Creates a temporary server invite (requires create invite permission)' },
            { name: 'messagecount', desc: 'Counts up to 1000 messages in the current channel' },
            { name: 'massmention <num>', desc: 'Pings random users (max 5)' },
            { name: 'floodemoji <emoji> <num>', desc: 'Spams an emoji (max 10)' },
            { name: 'fakeban <@user>', desc: 'Sends a fake ban message for a user' },
            { name: 'trollquote <@user>', desc: 'Creates a fake quote from a user' },
            { name: 'spamembed <num> <title>', desc: 'Sends multiple embeds with a title (max 5)' },
            { name: 'snipeall', desc: 'Shows recently deleted messages' },
            { name: 'editspam <num> <msg>', desc: 'Edits the bot’s last message multiple times (max 5)' },
            { name: 'silentleave', desc: 'Makes the bot leave the server' },
            { name: 'servernick <name>', desc: 'Changes the bot’s nickname in the current server' },
            { name: 'clearstatus', desc: 'Resets the bot’s activity status' },
            { name: 'rps <rock/paper/scissors>', desc: 'Plays rock-paper-scissors with the bot' },
            { name: '8ball <question>', desc: 'Asks the magic 8-ball a question' },
            { name: 'randuser', desc: 'Picks a random server member' },
            { name: 'fakeerror', desc: 'Sends a fake error message' },
            { name: 'countdown <seconds>', desc: 'Runs a countdown timer (max 30 seconds)' },
            { name: 'cmds', desc: 'Shows the command list in a compact format' },
            { name: 'ban <@user> [reason]', desc: 'Bans a user from the server (requires ban members permission)' },
            { name: 'kick <@user> [reason]', desc: 'Kicks a user from the server (requires kick members permission)' },
            { name: 'mute <@user> [duration]', desc: 'Mutes a user for a duration (requires manage roles)' },
            { name: 'unmute <@user>', desc: 'Unmutes a user (requires manage roles)' },
            { name: 'warn <@user> [reason]', desc: 'Warns a user and logs it (requires manage messages)' },
            { name: 'warnings <@user>', desc: 'Shows a user’s warning history' },
            { name: 'clearwarnings <@user>', desc: 'Clears a user’s warnings (requires manage guild)' },
            { name: 'lockchannel', desc: 'Locks the channel to prevent non-admins from sending messages' },
            { name: 'unlockchannel', desc: 'Unlocks the channel' },
            { name: 'slowmode [seconds]', desc: 'Sets slowmode for the channel (requires manage channels)' },
            { name: 'monitorlinks [on/off]', desc: 'Toggles link monitoring to delete unauthorized links' },
            { name: 'monitorwords <add/remove> <word>', desc: 'Manages banned words for message filtering' },
            { name: 'auditlog [limit]', desc: 'Shows recent audit log entries (requires view audit log)' },
            { name: 'rolelock <@role>', desc: 'Restricts a role from sending messages (requires manage roles)' },
            { name: 'roleunlock <@role>', desc: 'Removes message restrictions from a role' },
            { name: 'antispam [on/off]', desc: 'Toggles anti-spam protection for rapid messages' },
            { name: 'verifyuser <@user>', desc: 'Assigns a verified role to a user (requires manage roles)' },
            { name: 'unverifyuser <@user>', desc: 'Removes verified role from a user (requires manage roles)' },
            { name: 'serverlock', desc: 'Locks the server to prevent new members (requires manage guild)' },
            { name: 'serverunlock', desc: 'Unlocks the server for new members (requires manage guild)' },
        ];
        const desc = `Use the \`${config.PREFIX}\` prefix for all commands.\n\n` + commandsList.map(cmd => `**${config.PREFIX}${cmd.name}**\n${cmd.desc}`).join('\n');
        await message.channel.send({ embeds: [embedWithFooter('Drain Bot Help', desc, 0x00FF00, 'Use responsibly')] });
    }
};