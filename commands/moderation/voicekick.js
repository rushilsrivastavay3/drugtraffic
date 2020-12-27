
const Discord = require('discord.js');

module.exports = {
    name: 'voicekick',
    description: 'Kicks a user from a voice channel',
    usage: '<id>',
    aliases: [],
    permissions: ["CONNECT"],
    botPermissions: ["CONNECT"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async (bot, msg, args, data) => {
    if (!message.mentions.members.first())
        return message.channel.send(
            `Please Mention User That You Want To Kick From Voice Channel!`
        );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
        return message.channel.send(`User Is Not In Any Voice Channel!`);

    message.mentions.members.first().voice.kick();

    message.channel.send(`User Has Been Kicked From Voice Channel!`)
}