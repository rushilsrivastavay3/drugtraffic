const Discord = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    name: 'backup-create',
    description: 'Creates a backup of the server',
    usage: 'backup-create',
    aliases: ['bc'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    backup.create(msg.guild).then((backupData) => {

        return msg.channel.send('Backup created! Here is your ID: `'+backupData.id+'` Use `qload-backup '+backupData.id+'` to load the backup on another server!');

    }).catch(() => {

        return msg.channel.send(' An error occurred, please report to the Support server ');

    });
}