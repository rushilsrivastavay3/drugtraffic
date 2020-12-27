const Discord = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    name: 'backup-load',
    description: 'Loads a server backup',
    usage: '<id>',
    aliases: ['bload'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 5,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        msg.channel.send(':warning: All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!');

        const collector = msg.channel.createmsgCollector((m) => m.author.id === msg.author.id && ['-confirm', 'cancel'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {

                backup.load(backupID, msg.guild).then(() => {

                    return msg.author.send('Backup loaded successfully!');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return msg.channel.send(' No backup found for ID '+backupID+'!');
                    else
                        return msg.author.send(' An error occurred: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return msg.channel.send(' Cancelled.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return msg.channel.send(' Command timed out! Please retry.');
        })

    }).catch(() => {
        return msg.channel.send(' No backup found for ID '+backupID+'!');
    });

}