const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Displays information of the server.',
    usage: 'serverinfo',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "singapore": "Singapore",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "London",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong"
    };
    var emojis;
    if (msg.guild.emojis.cache.size === 0) {
        emojis = 'None';
    } else {
        emojis = msg.guild.emojis.cache.size;
    }
    var tierLvl = msg.guild.premiumTier;
    var tierEmote = msg.guild.premiumTier;
    if (tierLvl === 0) tierEmote = Number(tierLvl + 1);
    if (tierLvl > 1) tierEmote = Number(tierLvl  + 1);
    if (tierLvl > 2) tierEmote = Number(tierLvl  + 2);
    let maxEmotes = Number(tierEmote * 50 * 2);

    const embed = new Discord.MessageEmbed()
  .setThumbnail(msg.guild.iconURL())
  .setTimestamp()
  .addField("Created", `${msg.guild.createdAt.toString().substr(0, 15)},\n(${checkDays(msg.guild.createdAt)})`, true)
  .addField("ID", msg.guild.id, true)
  .addField("Owner", `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, true)
  .addField("Region", region[msg.guild.region], true)
  .addField("User Count", msg.guild.memberCount, true)
  .addField("Member Count", msg.guild.members.cache.filter(m => !m.user.bot).size, true)
  .addField("Bot Count", msg.guild.members.cache.filter(m => m.user.bot).size, true)
  .addField("AFK Timeout", msg.guild.afkTimeout / 60 + ' minutes', true)
  .addField("Roles", msg.guild.roles.cache.size, true)
  .addField("Channels", msg.guild.channels.cache.size, true)
  .addField("Emojis", `${emojis}`, true)
  .addField("Verification Level", msg.guild.verificationLevel, true)
  .setColor("#eb4034")
  msg.channel.send({embed});
}
