module.exports = { 
    config: {
        name: "ping",
        description: "PONG! Displays the api & bot latency",
        usage: "!ping",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

    message.channel.send("Pingowanie...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["To jest moj ping", "Jest okej? Nie moge zobaczyc", "Mysle ze jest slaby"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}: Ping Bota: \`${ping}\`, Ping API: \`${Math.round(bot.ping)}\``)
    })
  }
}