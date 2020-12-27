const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'balance',
    description: 'Allows you to check how much money you have stored in your account',
    usage: 'balance',
    aliases: ['bal'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let user = msg.mentions.members.first() || msg.author;
  
    let bal = db.fetch(`money_${msg.guild.id}_${user.id}`)
  
    if (bal === null) bal = 0;
  
    let bank = await db.fetch(`bank_${msg.guild.id}_${user.id}`)
    if (bank === null) bank = 0;
  
    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
    msg.channel.send(moneyEmbed)
}
