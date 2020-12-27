const db = require("quick.db");//require the packages
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'whitelist',
    description: 'descWhitelist a user',
    usage: '<user>',
    aliases: ['unblock'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    
let user;
if (msg.mentions.users.first()) {
  user = msg.mentions.users.first();
} else if (args[0]) {
  user = msg.guild.members.cache.get(args[0]).user;
} 

if(!user) return msg.channel.send("You forgot to specify a user!")

let blacklist = db.get(`blacklist_${user.id}`)

if(blacklist === 0 || blacklist === null) return msg.channel.send(`${user}, isn't blacklisted!`)

const embed = new MessageEmbed()
.setAuthor('Hydra', bot.user.displayAvatarURL())
.setTitle('Appeal Accepted')
.setDescription('Your appeal was accepted by py#0507, you can now continue to use Hydra!')
.setTimestamp()
user.send(embed)

msg.channel.send(`${user} was whitelisted!`)
db.delete(`blacklist_${user.id}`, 1)
}