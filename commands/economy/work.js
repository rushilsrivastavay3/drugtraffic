const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'work',
    description: 'You can work for money!',
    usage: 'work',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 30,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let user = msg.author;
    let author = await db.fetch(`work_${msg.guild.id}_${user.id}`)

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic','Bot Developer']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`You worked as a ${replies[result]} and earned ${amount} coins`);
        msg.channel.send(embed1)
        
        db.add(`money_${msg.guild.id}_${user.id}`, amount)
        db.set(`work_${msg.guild.id}_${user.id}`, Date.now())
    };
