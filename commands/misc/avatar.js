const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Return a user(s) avatar picture!',
    usage: 'avatar',
    aliases: ['icon', 'pfp', 'profilepic'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    if (!message.mentions.users.size) {
        return message.channel.send(`${message.author.displayAvatarURL({ dynamic: true })}`);
    }
    const avatar_list = message.mentions.users.map(user => {
        return `${user.displayAvatarURL({ dynamic: true })}`;
    });
    message.channel.send(avatar_list);
}