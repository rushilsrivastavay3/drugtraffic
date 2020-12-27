const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'deposit',
    description: 'Allows you to deposit cash from your account',
    usage: '<amount>',
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
      let money = await db.fetch(`money_${msg.guild.id}_${user.id}`)
      let bank = await db.fetch(`bank_${msg.guild.id}_${user.id}`)
  
      let embedbank = new Discord.MessageEmbed()
      .setColor('#FFFFFF')
      .setDescription("You don't have any money to deposit")
  
      if(money === 0) return msg.channel.send(embedbank)
  
      db.add(`bank_${msg.guild.id}_${user.id}`, money)
      db.subtract(`money_${msg.guild.id}_${user.id}`, money)
      let embed5 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have deposited all your coins into your bank`);
    msg.channel.send(embed5)
    
    } else {
    
    let embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Specify an amount to deposit`);
    
    if (!args[0]) {
        return msg.channel.send(embed2)
        .catch(err => console.log(err))
    }
    let embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You can't deposit negative money`);
  
    if (msg.content.includes('-')) { 
        return msg.channel.send(embed3)
    }
    let embed4 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You don't have that much money`);
  
    if (member < args[0]) {
        return msg.channel.send(embed4)
    }
  
    let embed5 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You have deposited ${args[0]} coins into your bank`);
  
    msg.channel.send(embed5)
    db.add(`bank_${msg.guild.id}_${user.id}`, args[0])
    db.subtract(`money_${msg.guild.id}_${user.id}`, args[0])
    }
}
