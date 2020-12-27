const Discord = require('discord.js');
const request = require('superagent');

module.exports = {
    name: 'advice',
    description: 'Sends life advice',
    usage: 'advice',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
request
.get('http://api.adviceslip.com/advice')
.end((err, res) => {
    if (!err && res.status === 200) {
        try {
            JSON.parse(res.text)
        } catch (e) {
            return msg.channel.send('An API error occurred.');
        }
        const advice = JSON.parse(res.text)
        msg.channel.send(advice.slip.advice)
    } else {
    console.error(`REST call failed: ${err}, status code: ${res.status}`)
    }
});
}