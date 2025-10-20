const deletedMessages = [];

module.exports = (client, message) => {
    if (message.author && (message.content || message.embeds.length || message.attachments.size)) {
        deletedMessages.push(message);
        if (deletedMessages.length > 50) deletedMessages.shift();
    }
    client.deletedMessages = deletedMessages;
};