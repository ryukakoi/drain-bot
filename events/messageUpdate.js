module.exports = (client, oldMessage, newMessage) => {
    client.lastEdited = { oldMessage, newMessage };
};