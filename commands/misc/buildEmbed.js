const Discord = require('discord.js');

module.exports = {
    name: 'buildEmbed',
    description: 'Using this command will allow you to build an Embed',
    usage: '{prefix}buildEmbed <title> <color> (hex code or a basic color in all caps) <description>',
    aliases: ['bEmbed'],
    permissions: ["MANAGE_MESSAGESS", "EMBED_LINKS"],
    botPermissions: ["MANAGE_MESSAGES", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let title = args[0] // args[0] is the first word or number after the command name
    let color = args[1] 
    let description = args.slice(2).join(" ") // args.slice(2).join(" ") means we're taking all the arguments including and after the second argument. An argument is just a word or number.
    const error = new Discord.msgEmbed() 
    .setColor('RANDOM')
    .setTitle('**ERROR INVALID ARGS**')
    .setDescription('`{prefix}embed, title(one word), color(hex code or basic colors in caps; i.e(YELLOW), description(embed body))`')
    if(!title) return msg.channel.send(error) // ! means no, so if there's no title, return and send the error embed
    if(!color) return msg.channel.send(error)
    if(!description) return msg.channel.send(error)
    const embed = new Discord.msgEmbed()
    .setTitle(`**${title}**`)
    .setColor(color)
    .setDescription(description)
    msg.delete() // this deletes the command
    msg.channel.send(embed)
}
