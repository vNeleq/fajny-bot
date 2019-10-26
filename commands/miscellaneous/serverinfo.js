const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: "!serverinfo",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["si", "serverdesc"]
    },
    run: async (bot, message, args) => {
    let sEmbed = new RichEmbed()
        .setColor(cyan)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Nazwa serwera:**", `${message.guild.name}`, true)
        .addField("**Tworca serwera:**", `${message.guild.owner}`, true)
        .addField("**Liczba czlonkow:**", `${message.guild.memberCount}`, true)
        .addField("**Liczba rang:**", `${message.guild.roles.size}`, true)
        .setFooter(`NOKSBOT | Info o serwerze`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
    }
}