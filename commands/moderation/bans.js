const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: 'bans',
    description: 'Shows all banned members',
    usage: '',
    aliases: [],
    permissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    const fetchBans = msg.guild.fetchBans();

    let bansSize = (await fetchBans).size;

    let bannedMembers =(await fetchBans).map((member) => `${member.user.tag} - ${member.user.id}`).join('\n')

    const embed = new MessageEmbed()
    .setAuthor(`Found ${bansSize} members banned` ,msg.guild.iconURL({dynamic: true}))
    .setDescription(bannedMembers)

    msg.channel.send(embed)
}
