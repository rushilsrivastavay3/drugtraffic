const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    name: 'eval',
    description: 'Run short pices of code with a command',
    usage: '<javascript>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async (bot, msg, args, data) => {

    if (!args[0]) return msg.channel.send(client.main);
    let code = args.join(' ')
    code = code.replace(/[""]/g, '"').replace(/['']/g, "'")

    let evaled;
    try {
        const start = process.hrtime()
        evaled = eval(code);
        if (evaled instanceof Promise) {
            evaled = await eval
        }
        const stop = process.hrtime(start);
        let response = [
            `**OutPut: \`\`\`js\n${(inspect(evaled, { depth: 0 }))}\n\`\`\``
            //, `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``
            , `**Time taken: \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
        ]
        const res = response.join('\n')
        if (res.length < 2000) {
            await msg.channel.send(res)
        } else {
            const output = new msgAttachment(Buffer.from(res), 'output.txt');
            await msg.channel.send(output);

        }
    } catch (error) {
        msg.reply(`An error has occured \n \n \`${error}\``)
    }
}