const Discord = require('discord.js');

module.exports = {
    name: 'name',
    description: 'desc',
    usage: 'usage',
    aliases: ['aliases'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    // code
}
