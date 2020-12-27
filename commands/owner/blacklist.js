const db = require("quick.db");//require the packages
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'blacklist',
    description: 'Blacklists a user from using Hydra',
    usage: '<user>',
    aliases: ['block'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let user;
    if (msg.mentions.users.first()) {
      user = msg.mentions.users.first();
    } else if (args[0]) {
      user = msg.guild.members.cache.get(args[0]).user;
    } 
    
    if(!user) return msg.channel.send("You forgot to specify a user!")
    let blacklist = db.get(`blacklist_${user.id}`)

    if(blacklist === null) {
        db.set(`blacklist_${user.id}`, 1);
    const embed = new MessageEmbed()
    .setAuthor('Hydra', bot.user.displayAvatarURL())
    .setTitle('Blacklist Notification')
    .setDescription('You were blacklisted from Hydra, to appeal DM py#0507')
    .setTimestamp()
    user.send(embed)

    msg.channel.send(`${user} is now blacklisted!`)
    } else if(blacklist !== null) {
        msg.channel.send(`${user} is now blacklisted!`)
        msg.channel.send(`User is already blacklisted!`)
    } return;
}