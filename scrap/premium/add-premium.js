const premiumSchema = require("../../models/premium");
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'add-premium',
    description: 'Adds premium commands to a user',
    usage: '<mention>',
    aliases: ["ap"],
    permissions: [],
    botPermissions: [],
    nsfw: true,
    cooldown: 1000,
    ownerOnly: false
}

module.exports.execute = async (bot, msg, args, data) => {
    if (msg.author.id !== '852676978402394112') return;

    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    if (!member) return msg.reply('Please specify a valid member!');

    premiumSchema.findOne({
        User: member.id
    }, async (err, data) => {
        if (data)
            return msg.reply(
                "This user has already gained premium features!"
            );
        
            new premiumSchema({
                User: member.id
            }).save();
            return msg.reply(`Added ${member} to the database!`)
    })
}
