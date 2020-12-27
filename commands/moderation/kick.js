const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the guild',
    usage: '<member> <reason>',
    aliases: [],
    permissions: ["KICK_MEMBERS"],
    botPermissions: ["KICK_MEMBERS"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async (bot, msg, args, data) => {
    const mentionedMember = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(" ")
    if (!args[0]) return msg.channel.send("Specify someone to kick.")
    if (!mentionedMember) return msg.channel.send("I can't find that member.")
    if (mentionedMember.id === msg.author.id) return msg.channel.send("You can't kick yourself.")
    if (mentionedMember.roles.highest.position >= msg.member.roles.highest.position && msg.author.id !== msg.guild.owner.id) {
        return msg.channel.send("You can\'t kick this member due to your role being lower than that member role.")
    }
    if (mentionedMember.kickable) {
        const embed = new MessageEmbed()
            .setAuthor(`${msg.author.username} - (${msg.author.id})`, msg.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
            .setColor(`RANDOM`)
            .setDescription(`
    **Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
    **Reason:** ${reason || "None"}
                `)
        msg.channel.send(embed)
        mentionedMember.kick()
    } else {
        return msg.channel.send("I can\'t kick this user make sure that the users role is lower than my role.")
    }
    return undefined
    let channel = db.fetch(`modlog_${msg.guild.id}`)
    if (!channel) return;

    const embed = new MessageEmbed()
        .setAuthor(`${msg.guild.name} Modlogs`, msg.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(msg.guild.name, msg.guild.iconURL())
        .addField("**Moderation**", "kick")
        .addField("**User Kicked**", kickMember.user.username)
        .addField("**Kicked By**", msg.author.username)
        .addField("**Reason**", `${reason || "**No Reason**"}`)
        .addField("**Date**", msg.createdAt.toLocaleString())
        .setTimestamp();

    var sChannel = msg.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(embed)
}
