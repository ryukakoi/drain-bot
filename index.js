const { Client, IntentsBitField, SlashCommandBuilder } = require('discord.js');
const prompt = require('prompt-sync')({ sigint: true });
const chalk = require('chalk');
const fs = require('fs').promises;
const path = require('path');
const { clearScreen } = require('./utils');
const config = require('./config');

const TOKEN = prompt('Enter your Discord bot token: ', { echo: '*' });
if (!TOKEN) {
    console.error(chalk.red('A valid Discord bot token is required. Exiting.'));
    process.exit(1);
}

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ],
});

let commandLogCount = 0;
const COMMAND_LOG_LIMIT = 20;

function customCommandLog(message, colorFn = chalk.cyan) {
    commandLogCount++;
    console.log(colorFn(message));
    if (commandLogCount === COMMAND_LOG_LIMIT) {
        clearScreen();
        commandLogCount = 0; 
        console.log(chalk.magenta(config.ASCII_ART || '[ERROR] ASCII_ART not defined in config.js'));
    }
}

const commands = new Map();

async function loadCommands() {
    try {
        const commandFiles = await fs.readdir(path.join(__dirname, 'commands'));
        console.log(chalk.cyan(`[COMMANDS] Loading ${commandFiles.length} command(s) from commands/...`));
        for (const file of commandFiles) {
            if (file.endsWith('.js')) {
                const command = require(`./commands/${file}`);
                commands.set(command.name, command);
                console.log(chalk.cyan(`[COMMANDS] Loaded ${command.name}`));
            }
        }
        const securityFiles = await fs.readdir(path.join(__dirname, 'commands/security'));
        console.log(chalk.cyan(`[COMMANDS] Loading ${securityFiles.length} command(s) from commands/security/...`));
        for (const file of securityFiles) {
            if (file.endsWith('.js')) {
                const command = require(`./commands/security/${file}`);
                commands.set(command.name, command);
                console.log(chalk.cyan(`[COMMANDS] Loaded ${command.name}`));
            }
        }
    } catch (error) {
        console.error(chalk.red(`[COMMANDS] Failed to load commands: ${error.message}`));
    }
}

async function registerSlashCommands() {
    const slashCommands = Array.from(commands.values())
        .filter(cmd => cmd.slashOptions && Array.isArray(cmd.slashOptions))
        .map(cmd => {
            const builder = new SlashCommandBuilder()
                .setName(cmd.name)
                .setDescription(cmd.description);
            if (cmd.slashOptions.length > 0) {
                cmd.slashOptions.forEach(option => {
                    if (option.type === 'string') {
                        builder.addStringOption(opt =>
                            opt.setName(option.name)
                               .setDescription(option.description)
                               .setRequired(option.required || false)
                        );
                    } else if (option.type === 'user') {
                        builder.addUserOption(opt =>
                            opt.setName(option.name)
                               .setDescription(option.description)
                               .setRequired(option.required || false)
                        );
                    } else if (option.type === 'role') {
                        builder.addRoleOption(opt =>
                            opt.setName(option.name)
                               .setDescription(option.description)
                               .setRequired(option.required || false)
                        );
                    }
                });
            }
            return builder;
        });
    try {
        await client.application.commands.set(slashCommands);
        console.log(chalk.green('[SLASH COMMANDS] Registered successfully'));
    } catch (error) {
        console.error(chalk.red(`[SLASH COMMANDS] Failed to register: ${error.message}`));
    }
}

async function loadEvents() {
    try {
        const eventFiles = await fs.readdir(path.join(__dirname, 'events'));
        console.log(chalk.cyan(`[EVENTS] Loading ${eventFiles.length} event(s)...`));
        for (const file of eventFiles) {
            if (file.endsWith('.js') && file !== 'ready.js') {
                const event = require(`./events/${file}`);
                const eventName = file.split('.')[0];
                client.on(eventName, (...args) => event(client, ...args));
                console.log(chalk.cyan(`[EVENTS] Loaded ${eventName}`));
            }
        }
    } catch (error) {
        console.error(chalk.red(`[EVENTS] Failed to load events: ${error.message}`));
    }
}

client.once('clientReady', async () => {
    try {
        console.log(chalk.cyan('[INIT] Starting bot initialization...'));
        await loadEvents();
        await loadCommands();
        await registerSlashCommands();
        console.log(chalk.cyan('[INIT] All loading complete, triggering ready event...'));
        const ready = require('./events/ready');
        await ready(client);
    } catch (error) {
        console.error(chalk.red(`[INIT] Failed to initialize bot: ${error.message}`));
        process.exit(1);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = commands.get(interaction.commandName);
    if (!command) {
        customCommandLog(`[INTERACTION] Command not found: ${interaction.commandName}`, chalk.yellow);
        return;
    }
    try {
        await command.execute(interaction, interaction.options.getString('args')?.split(' ') || []);
        customCommandLog(`[INTERACTION] Executed command: ${interaction.commandName}`);
    } catch (error) {
        customCommandLog(`[INTERACTION] Error executing ${interaction.commandName}: ${error.message}`, chalk.red);
        await interaction.reply({ content: '```An error occurred while executing this command.```', ephemeral: true });
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(config.PREFIX)) return;
    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    customCommandLog(`[MESSAGE] Processing command: ${commandName}`);
    const command = commands.get(commandName);
    if (!command) {
        customCommandLog(`[MESSAGE] Command not found: ${commandName}`, chalk.yellow);
        return;
    }
    try {
        await command.execute(message, args);
        customCommandLog(`[MESSAGE] Executed command: ${commandName}`);
    } catch (error) {
        customCommandLog(`[MESSAGE] Error executing ${commandName}: ${error.message}`, chalk.red);
        await message.channel.send('```An error occurred while executing this command.```');
    }
});

console.log(chalk.magenta('Launching Drain Bot...'));
client.login(TOKEN).catch(error => {
    console.error(chalk.red(`[!] Failed to start bot: ${error.message}`));
    process.exit(1);
});