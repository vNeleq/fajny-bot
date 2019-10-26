const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json")

module.exports= {
    config: {
        name: "dodajrole",
        description: "Adds a role to a member of the guild!",
        usage: "!addrole",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["ar", "roleadd"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Napisz jakiemu uzytkownikowi chcesz dac ta role!.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Napisz jaka role chcesz dac uzytkownikowi.") 
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Please provide a reason")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie masz permisji aby uzywac tej komendy.")

    if(rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, Aktualnie posiada ta role!`)
    } else {
        await rMember.addRole(role.id).catch(e => console.log(e.message))
        message.channel.send(`Rola, ${role.name}, zostala dodana uzytkownikowi ${rMember.displayName}.`)
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