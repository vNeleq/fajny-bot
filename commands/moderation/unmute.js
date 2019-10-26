const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes a member in the discord!",
        usage: "!unmute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Nie masz permisji by uzyc tej komendy.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie mam permisji aby usuwac role!")

//define the reason and unmutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Napisz jaka osobe chcesz odmutowac!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "Nie podano powodu"

//define mute role and if the mute role doesnt exist then send a message
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("Na tym serwerze nie ma roli do mutowania!")

//remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Czesc, zostales odmutowany na ${message.guild.name} za: ${reason}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} zostal odmutowany!`)
})

//send an embed to the modlogs channel
let embed = new RichEmbed()
.setColor(redlight)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Moderation:", "unmute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
sChannel.send(embed)

    }
}