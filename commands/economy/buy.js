const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'buy',
    description: 'Buys items from the store',
    usage: '<item>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let user = msg.author;

    let author = db.fetch(`money_${msg.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You need 2000 coins to purchase Bronze VIP`);

    if (args[0] == 'bronze') {
        if (author < 3500) return msg.channel.send(Embed)
        
        db.fetch(`bronze_${msg.guild.id}_${user.id}`);
        db.set(`bronze_${msg.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased Bronze VIP For 3500 Coins`);

        db.subtract(`money_${msg.guild.id}_${user.id}`, 3500)
        msg.channel.send(Embed2)
    } else if(args[0] == 'nikes') {
        let Embed2 = new Discord.MessageEmbed()

        .setColor("#FFFFFF")
        .setDescription(`You need 600 coins to purchase some Nikes`);

        if (author < 600) return msg.channel.send(Embed2)
       
        db.fetch(`nikes_${msg.guild.id}_${user.id}`)
        db.add(`nikes_${msg.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased Fresh Nikes For 600 Coins`);

        db.subtract(`money_${msg.guild.id}_${user.id}`, 600)
        msg.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 800 coins to purchase a new car`);

        if (author < 800) return msg.channel.send(Embed2)
       
        db.fetch(`car_${msg.guild.id}_${user.id}`)
        db.add(`car_${msg.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased a New Car For 800 Coins`);

        db.subtract(`money_${msg.guild.id}_${user.id}`, 800)
        msg.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You need 1200 coins to purchase a Mansion`);

        if (author < 1200) return msg.channel.send(Embed2)
       
        db.fetch(`house_${msg.guild.id}_${user.id}`)
        db.add(`house_${msg.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`Purchased a Mansion For 1200 Coins`);

        db.subtract(`money_${msg.guild.id}_${user.id}`, 1200)
        msg.channel.send(Embed3)
    } else {
        let embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription('Enter an item to buy')
        msg.channel.send(embed3)
    }

}
