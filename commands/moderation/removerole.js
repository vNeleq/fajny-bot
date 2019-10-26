const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "usunrole",
        description: "Removes a role to a member of the guild!",
        usage: "!removerole",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["rr", "roleremove"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie masz permisji do tej komendy!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Podaj komu chcesz wziac role.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Napisz jaka role chcesz zabrac wybranej osobie.") 
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Napisz powod")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie mam permisji by uzyc tej komendy.")

    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, nie posiada tej roli!`)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`Rola, ${role.name}, zostala usunieta uzytkownikowi ${rMember.displayName}.`)
    }

    let embed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
        sChannel.send(embed)
    }   
}