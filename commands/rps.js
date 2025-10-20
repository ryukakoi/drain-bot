const { embedWithFooter } = require('../utils');

module.exports = {
    name: 'rps',
    description: 'Plays rock-paper-scissors with the bot',
    execute: async (message, args) => {
        const choice = args[0]?.toLowerCase();
        const options = ['rock', 'paper', 'scissors'];
        if (!options.includes(choice)) return message.channel.send('Usage: `!rps rock|paper|scissors`');
        const botChoice = options[Math.floor(Math.random() * options.length)];
        const result = choice === botChoice ? 'Tie' :
            (choice === 'rock' && botChoice === 'scissors') ||
            (choice === 'paper' && botChoice === 'rock') ||
            (choice === 'scissors' && botChoice === 'paper') ? 'Win' : 'Lose';
        await message.channel.send({ embeds: [embedWithFooter('Rock Paper Scissors', `\`\`\`You: ${choice}\nBot: ${botChoice}\nResult: ${result}\`\`\``, 0xFFD700)] });
    }
};