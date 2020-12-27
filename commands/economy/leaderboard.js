const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'leaderboard',
    description: 'Check the leaderboard for the guild',
    usage: 'leaderboard',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    const embed = new Discord.MessageEmbed()
    .setDescription(`**Input a Leaderboard Option**\n\nCoin Leaderboard: m!leaderboard coins\nFresh Nikes Leaderboard: m!leaderboard nikes\nCar Leaderboard: m!leaderboard car\nMansion Leaderboard: m!leaderboard mansion`)
    .setColor("#FFFFFF")


  if(!args[0]) return msg.channel.send(embed)

    if (args[0] == 'coins') {
    let money = db.startsWith(`money_${msg.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = bot.users.get(money[i].ID.split('_')[2]).username

      

        content += `${i+1}. ${user} ~ ${money[i].data}\n`
    
      }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${msg.guild.name}'s Coin Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    msg.channel.send(embed)
  } else if(args[0] == 'nikes') {
    let nike = db.startsWith(`nikes_${msg.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < nike.length; i++) {
        let user = bot.users.get(nike[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${nike[i].data}\n`
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${msg.guild.name}'s Fresh Nikes Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    msg.channel.send(embed)
  } else if(args[0] == 'car') {
    let cars = db.startsWith(`car_${msg.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < cars.length; i++) {
        let user = bot.users.get(cars[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${cars[i].data}\n`
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${msg.guild.name}'s Car Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    msg.channel.send(embed)
  } else if(args[0] == 'mansion') {
    let mansions = db.startsWith(`house_${msg.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < mansions.length; i++) {
        let user = bot.users.get(mansions[i].ID.split('_')[2]).username

        content += `${i+1}. ${user} ~ ${mansions[i].data}\n`
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${msg.guild.name}'s Mansion Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    msg.channel.send(embed)
  }

}
