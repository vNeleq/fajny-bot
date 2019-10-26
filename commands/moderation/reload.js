module.exports = {
    config: {
        name: "reload",
        description: "reloads a bot command!",
        usage: "!reload",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["creload"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != "203104843479515136") return message.channel.send("You're the bot the owner!")

    if(!args[0]) return message.channel.send("Napisz jaka komende chcesz zrestartowac!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Nie moge zrestartowac: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`Komenda \`${args[0].toUpperCase()}\` zostala zreloadowana!`)

    }
}