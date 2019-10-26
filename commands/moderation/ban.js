const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "!ban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["b", "banish", "remove"]
    },
    run: async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie masz permisji do tej komendy!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("Napisz jakiego uzytkownika chcesz zbanowac!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "Brak podanego powodu!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie masz permisji do tej komendy")

   banMember.send(`Czesc, zostales zbanowany na ${message.guild.name} za: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** zostal zbanowany`).then(m => m.delete(5000))

    let embed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "ban")
    .addField("Mutee:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
        sChannel.send(embed)
    }
}