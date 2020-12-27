const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'roulette',
    description: 'Gives you a daily payment!',
    usage: 'roulette',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let user = msg.author;

    function isOdd(num) { 
      if ((num % 2) == 0) return false;
      else if ((num % 2) == 1) return true;
  }
      
  let colour = args[0];
  let money = parseInt(args[1]);
  let moneydb = await db.fetch(`money_${msg.guild.id}_${user.id}`)
  
  let random = Math.floor(Math.random() * 37);
  
  let moneyhelp = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify an amount to gamble | m!roulette <color> <amount>`);
  
  let moneymore = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You are betting more than you have`);
  
  let colorbad = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`Specify a color | Red [1.5x] Black [2x] Green [15x]`);
  
  
      if (!colour)  return msg.channel.send(colorbad);
      colour = colour.toLowerCase()
      if (!money) return msg.channel.send(moneyhelp); 
      if (money > moneydb) return msg.channel.send(moneymore);
      
      if (colour == "b" || colour.includes("black")) colour = 0;
      else if (colour == "r" || colour.includes("red")) colour = 1;
      else if (colour == "g" || colour.includes("green")) colour = 2;
      else return msg.channel.send(colorbad);
      
      
      
      if (random == 0 && colour == 2) { // Green
          money *= 15
          db.add(`money_${msg.guild.id}_${user.id}`, money)
          let moneyEmbed1 = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`You won ${money} coins\n\nMultiplier: 15x`);
          msg.channel.send(moneyEmbed1)
          console.log(`${msg.author.tag} Won ${money} on green`)
      } else if (isOdd(random) && colour == 1) { // Red
          money = parseInt(money * 1.5)
          db.add(`money_${msg.guild.id}_${user.id}`, money)
          let moneyEmbed2 = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`You won ${money} coins\n\nMultiplier: 1.5x`);
          msg.channel.send(moneyEmbed2)
      } else if (!isOdd(random) && colour == 0) { // Black
          money = parseInt(money * 2)
          db.add(`money_${msg.guild.id}_${user.id}`, money)
          let moneyEmbed3 = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`You won ${money} coins\n\nMultiplier: 2x`);
          msg.channel.send(moneyEmbed3)
      } else { // Wrong
          db.subtract(`money_${msg.guild.id}_${user.id}`, money)
          let moneyEmbed4 = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(`You lost ${money} coins\n\nMultiplier: 0x`);
          msg.channel.send(moneyEmbed4)
      }
}
