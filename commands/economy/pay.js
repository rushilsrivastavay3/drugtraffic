const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'pay',
    description: 'Allows you to give money to other people',
    usage: '<user> <amount>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let user = msg.mentions.members.first() 

    let member = db.fetch(`money_${msg.guild.id}_${msg.author.id}`)
  
    let embed1 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Mention someone to pay`);
  
    if (!user) {
        return msg.channel.send(embed1)
    }
    let embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Specify an amount to pay`);
    
    if (!args[1]) {
        return msg.channel.send(embed2)
    }
    let embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You can't pay someone negative money`);
  
    if (msg.content.includes('-')) { 
        return msg.channel.send(embed3)
    }
    let embed4 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You don't have that much money`);
  
    if (member < args[1]) {
        return msg.channel.send(embed4)
    }
  
    let embed5 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have payed ${user.user.username} ${args[1]} coins`);
  
    msg.channel.send(embed5)
    db.add(`money_${msg.guild.id}_${user.id}`, args[1])
    db.subtract(`money_${msg.guild.id}_${msg.author.id}`, args[1])
  
}
