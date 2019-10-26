const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "softban",
        description: "Softbans a user from the guild!",
        usage: "!softban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["sb", "sbanish", "sremove"]
    },
    run: async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie masz permisji do uzycia tej komendy!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("Napisz jakiemu uzytkownikowi chcesz dac bana!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie mam permisji by to zrobic!")

   banMember.send(`Czesc, zostales zbanowany na ${message.guild.name} za: ${reason}`).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).then(() => message.guild.unban(banMember.id, { reason: "Softban"})).catch(err => console.log(err))

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