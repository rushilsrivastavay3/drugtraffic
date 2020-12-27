const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'profile',
    description: 'Allows you to check your valuables',
    usage: 'profile',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    if(!msg.content.startsWith('e!'))return;  

    let user = msg.mentions.members.first() || msg.author;
  
    let money = await db.fetch(`money_${msg.guild.id}_${user.id}`)
    if (money === null) money = 0;
  
    let bank = await db.fetch(`bank_${msg.guild.id}_${user.id}`)
    if (bank === null) bank = 0;
  
    let vip = await db.fetch(`bronze_${msg.guild.id}_${user.id}`)
      if(vip === null) vip = 'None'
      if(vip === true) vip = 'Bronze'
  
    let shoes = await db.fetch(`nikes_${msg.guild.id}_${user.id}`)
    if(shoes === null) shoes = '0'
  
    let newcar = await db.fetch(`car_${msg.guild.id}_${user.id}`)
    if(newcar === null) newcar = '0'
  
    let newhouse = await db.fetch(`house_${msg.guild.id}_${user.id}`)
    if(newhouse === null) newhouse = '0'
  
    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`**${user}'s Profile**\n\nPocket: ${money}\nBank: ${bank}\nVIP Rank: ${vip}\n\n**Inventory**\n\nNikes: ${shoes}\nCars: ${newcar}\nMansions: ${newhouse}`);
    msg.channel.send(moneyEmbed)
}
