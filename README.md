## Drain Bot

Drain Bot is a versatile Discord bot built with Node.js and Discord.js (v14.x.x). It offers 46 commands for server management, fun interactions, and moderation, including anti-spam protection and link monitoring. The bot features a clean console output with ASCII art and clears logs after every 20 command-related logs for a streamlined experience.

## Features

- Prefix Commands: Use `!` (configurable in `config.js`) for commands like `!ping`, `!help`, and `!antispam`.
- Slash Commands: Supports slash commands (e.g., `/ping`, `/say`) for modern Discord interactions.
- Moderation Tools: Includes `!ban`, `!mute`, `!antispam`, and `!monitorlinks` for server management.
- Anti-Spam: Automatically times out users sending 5+ messages in 10 seconds (when enabled with `!antispam on`).
- Link Monitoring: Deletes messages containing URLs and DMs users (when enabled with `!monitorlinks on`).
- Console Management: Clears the console and redisplays ASCII art after 20 command logs for a clean interface.

# Command Overview

## General Commands (26):
- !8ball: Answers a yes/no question with a random response.
- !avatar: Displays a user's avatar.
- !botinfo: Shows bot information (e.g., uptime, version).
- !channelperms: Checks bot permissions in the current channel.
- !clear: Deletes up to 100 messages (requires `Manage Messages`).
- !coinflip: Flips a virtual coin (heads/tails).
- !countdown: Starts a countdown timer (up to 30 seconds).
- !embed: Creates a custom embed message.
- !help: Lists all available commands.
- !invite: Generates an invite link for the bot.
- !kick: Kicks a user from the server (requires `Kick Members`).
- !meme: Fetches a random meme.
- !ping: Shows bot latency.
- !poll: Creates a simple poll with reactions.
- !profile: Displays a user's profile information.
- !purge: Deletes messages in bulk (up to 100).
- !say: Echoes a message in the channel.
- !serverbanner: Displays the server's banner.
- !serverinfo: Shows server details (e.g., member count, channels).
- !snipe: Shows the last deleted message in the channel.
- !snipeall: Shows all deleted messages in recent history.
- !timer: Sets a timer with a custom duration.
- !urban: Looks up a term on Urban Dictionary.
- !usercount: Counts total users in the server.
- !userinfo: Displays detailed user information.
- !weather: Fetches weather for a specified location.

Security Commands (20):
- !antispam: Enables/disables anti-spam protection (times out spammers).
- !ban: Bans a user from the server (requires `Ban Members`).
- !clearwarns: Clears warnings for a user.
- !lock: Locks a channel, restricting message sending.
- !lockdown: Locks all channels in the server.
- !massban: Bans multiple users at once (requires `Ban Members`).
- !masskick: Kicks multiple users at once (requires `Kick Members`).
- !monitorlinks: Enables/disables link monitoring (deletes URLs).
- !mute: Mutes a user by assigning a mute role (requires `Manage Roles`).
- !purgeuser: Deletes all messages from a specific user.
- !raidmode: Enables strict anti-raid measures.
- !restrict: Restricts a user’s permissions in a channel.
- !roleadd: Adds a role to a user (requires `Manage Roles`).
- !roleremove: Removes a role from a user (requires `Manage Roles`).
- !slowmode: Sets slowmode for a channel (requires `Manage Channels`).
- !timeout: Times out a user for a specified duration (requires `Moderate Members`).
- !unban: Unbans a user from the server (requires `Ban Members`).
- !unlock: Unlocks a previously locked channel.
- !unmute: Removes a mute role from a user (requires `Manage Roles`).
- !warnings: Shows warnings issued to a user.

## Prerequisites

- Node.js: Version 16.x or higher.
- Discord Bot Token: Obtain from the Discord Developer Portal (https://discord.com/developers/applications).
- Git: For cloning the repository.
- A Discord server: Where you have permission to invite the bot and manage roles/channels.

## Installation

1. Clone the Repository:
   ```
   git clone https://github.com/ryukakoi/drain-bot.git
   cd drain-bot
   ```

2. Install Dependencies:
   ```
   npm install
   ```
   Required packages:
   - discord.js: ^14.14.1
   - prompt-sync: For secure token input
   - chalk: For colored console output
   - axios: For fetching avatar images

3. Configure the Bot:
   - Edit `config.js` to customize settings:
     ```
     module.exports = {
         PREFIX: '!', // Command prefix
         BOT_NAME: 'Drain', // Bot's display name
         PFP_URL: 'https://i.postimg.cc/Cxm5PYGc/Screenshot-2025-10-20-172220.png', // Bot avatar URL
         MAX_PURGE: 100, // Max messages to purge
         MAX_MASS_MENTION: 5, // Max mentions in mass mention
         MAX_SPAM_EMBED: 5, // Max embeds for spam
         MAX_EDIT_SPAM: 5, // Max edits for spam
         MAX_FLOOD_EMOJI: 10, // Max emojis for flood
         MAX_COUNTDOWN: 30, // Max countdown seconds
         MAX_MESSAGECOUNT_HISTORY: 1000, // Max messages to count
         ASCII_ART: `...` // ASCII art for console
     };
     ```

4. Invite the Bot:
   - Go to the Discord Developer Portal (https://discord.com/developers/applications).
   - Create a new application and bot.
   - Enable Privileged Gateway Intents (Message Content Intent required).
   - Generate an invite URL with `bot` and `applications.commands` scopes and the following permissions:
     - View Channels
     - Send Messages
     - Embed Links
     - Read Message History
     - Moderate Members
     - Manage Messages
     - Manage Roles
     - Manage Channels
   - Invite the bot to your server.

5. Run the Bot:
   ```
   npm start
   ```
   or
   ```
   node index.js
   ```
   - Enter your bot token when prompted (kept secure with `prompt-sync`).

## Usage

Example Commands
- General Commands:
  - `!ping`: Shows bot latency.
  - `!help`: Lists available commands.
  - `!say <message>`: Echoes a message.
  - `/ping`: Slash command to show latency.
- Moderation Commands:
  - `!ban @user <reason>`: Bans a user (requires `Ban Members` permission).
  - `!antispam on`: Enables anti-spam protection (times out users sending 5+ messages in 10 seconds).
  - `!antispam off`: Disables anti-spam.
  - `!monitorlinks on`: Enables link monitoring (deletes messages with URLs).
  - `!monitorlinks off`: Disables link monitoring.
- Utility Commands:
  - `!channelperms`: Checks bot permissions in the current channel.
  - `!clear <amount>`: Deletes up to 100 messages (requires `Manage Messages`).

Console Output
- The bot logs initialization (events, commands, slash command registration).
- Command-related logs (e.g., `[MESSAGE] Processing command: antispam`, `[MESSAGE] Executed command: antispam`) are displayed.
- After 20 command-related logs, the console clears and redisplays the ASCII art from `config.js`.

## Project Structure

```
drain-bot/
├── commands/
│   ├── ping.js
│   ├── help.js
│   ├── say.js
│   └── security/
│       ├── antispam.js
│       ├── monitorlinks.js
│       └── ...
├── events/
│   ├── ready.js
│   ├── messageCreate.js
│   ├── messageDelete.js 
│   └── messageUpdate.js
│   
├── utils.js
├── config.js
├── index.js
├── package.json
└── README.md
```

## Troubleshooting

- Bot Not Responding:
  - Ensure `Message Content Intent` is enabled in the Discord Developer Portal.
  - Verify the bot has `View Channels` and `Send Messages` permissions in the channel.
  - Check console for errors like `[MESSAGE] Error executing ...` and share them for debugging.
- Slash Commands Not Appearing:
  - Reinvite the bot with `applications.commands` scope.
  - Wait a few minutes for Discord to sync commands or test in a new server.
- Console Not Clearing:
  - Try running in PowerShell or VS Code’s terminal instead of Windows Command Prompt:
    ```
    cd path/to/drain-bot
    node index.js
    ```
  - Check for `[UTILS] Failed to clear console` errors in the console.
- Anti-Spam/Link Monitoring Not Working:
  - Ensure the bot has `Moderate Members` and `Manage Messages` permissions.
  - Verify `!antispam on` or `!monitorlinks on` was run by an administrator.
- Errors in Commands:
  - For errors like `[MESSAGE] Error executing antispam: ...`, ensure `antispam.js` and `monitorlinks.js` are correctly implemented.
  - Share error messages for further assistance.


License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For issues or feature requests, open an issue on GitHub or contact the maintainer at your-email@example.com.
