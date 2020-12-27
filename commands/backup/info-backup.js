const Discord = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    name: 'info-backup',
    description: 'Displays the information of a backup.',
    usage: '<id>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    const backupID = args.join(' ');

    if (!backupID)
        return msg.channel.send(' Please specify a valid backup ID!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.msgEmbed()
            .setAuthor(':information_source: Backup', backup.data.iconURL)
            .addField('Server name', backup.data.name)
            .addField('Size', backup.size + ' kb')
            .addField('Created at', formattedDate)
            .setFooter('Backup ID: '+backup.id);

        return msg.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return msg.channel.send(' No backup found for ID '+backupID+'!');
        else
            return msg.channel.send(' An error occurred: '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

}
