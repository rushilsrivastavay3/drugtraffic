const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans the mentioned member',
    usage: '<user> <reason>',
    aliases: ['b'],
    permissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    nsfw: false,
    cooldown: 5,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    const target = msg.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!args[0]) return msg.reply(`Please mention a valid user`)
    
    if(!target) return msg.reply(`I can't find that member!`)
    
    if(target.roles.highest.position >= msg.member.roles.highest.position || msg.author.id !== msg.guild.owner.id) {
      return msg.reply(`Unfortunately, you can't ban that member`)
    }
    
    if(target.id === msg.author.id) return msg.reply(`Unfortunately, you can't ban yourself`)
    
    if(target.bannable) {
      let embed = new discord.msgEmbed()
      .setColor("RANDOM")
      .setDescription(`Banned \`${target}\` for \`${reason || "No Reason Provided"}\``)
      
      msg.channel.send(embed)
      
      target.ban()
      
      msg.delete()
      
    } else {
      return msg.reply(`I can't ban them, make sure that my role is the highest in the role list!`)
    }
    return undefined
}
