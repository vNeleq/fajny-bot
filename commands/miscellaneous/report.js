module.exports = { 
    config: {
        name: "report",
        description: "reports a user of the guild",
        usage: "!report <user> <reason>",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {

        message.delete()
        // mentioned or grabbed user
        let target = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!target) return message.channel.send("Napisz kogo chcesz zglosic").then(m => m.delete(15000))

        // reasoning definition
        let reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(`Napisz dlaczego chcesz go zglosic **${target.user.tag}**`).then(m => m.delete(15000))

        // grab reports channel
        let sChannel = message.guild.channels.find(x => x.name === "Reporty")

        // send to reports channel and add tick or cross

        message.channel.send("Your report has been filed to the staff team. Thank you!").then(m => m.delete(15000))
        sChannel.send(`**${message.author.tag}** zreportowal **${target.user.tag}** za **${reason}**.`).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")
        })

  }
}
