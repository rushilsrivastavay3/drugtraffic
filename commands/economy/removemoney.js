const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'removemoney',
    description: 'Removes money from a uesr',
    usage: '<amount>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let user = msg.mentions.members.first() || msg.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${msg.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${msg.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`Removed ${args[1]} coins\n\nNew Balance: ${bal}`);
    msg.channel.send(moneyEmbed)

}
