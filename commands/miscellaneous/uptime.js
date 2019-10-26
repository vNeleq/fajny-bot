module.exports = {
    config: {
        name: "uptime",
        description: "Displays the bots current uptime!",
        usage: "!uptime",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["ut"]
    },
    run: async (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} dni, ${hrs.padStart(2, '0')} godzin, ${min.padStart(2, '0')} minut, ${sec.padStart(2, '0')} sekund, `
    }

    message.channel.send(`Jestem juz online: ${duration(bot.uptime)}`)

    }
}
