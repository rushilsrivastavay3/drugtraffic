const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'withdraw',
    description: 'Withdraws a payment',
    usage: 'withdraw',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let user = msg.author;

    let member = db.fetch(`money_${msg.guild.id}_${user.id}`)
    let member2 = db.fetch(`bank_${msg.guild.id}_${user.id}`)
  
    if (args[0] == 'all') {
      let money = await db.fetch(`bank_${msg.guild.id}_${user.id}`)
      
      db.subtract(`bank_${msg.guild.id}_${user.id}`, money)
      db.add(`money_${msg.guild.id}_${user.id}`, money)
      let embed5 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have withdrawn all your coins from your bank`);
    msg.channel.send(embed5)
    
    } else {
  
    let embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Specify an amount to withdraw`);
    
    if (!args[0]) {
        return msg.channel.send(embed2)
    }
    let embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You can't withdraw negative money`);
  
    if (msg.content.includes('-')) { 
        return msg.channel.send(embed3)
    }
    let embed4 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You don't have that much money in the bank`);
  
    if (member2 < args[0]) {
        return msg.channel.send(embed4)
    }
  
    let embed5 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have withdrawn ${args[0]} coins from your bank`);
  
    msg.channel.send(embed5)
    db.subtract(`bank_${msg.guild.id}_${user.id}`, args[0])
    db.add(`money_${msg.guild.id}_${user.id}`, args[0])
    }
}
