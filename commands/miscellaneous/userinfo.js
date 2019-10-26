const { RichEmbed } = require("discord.js")
const { red_light } = require("../../colours.json");

module.exports = {
    config: {
        name: "informacje",
        description: "Pulls the userinfo of yourself or a user!",
        usage: "!userinfo (@mention)",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["ui"]
    },
    run: async (bot, message, args) => {
    let uEmbed = new RichEmbed()
        .setColor(red_light)
        .setTitle("User Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
        .addField("**Nick:**", `${message.author.username}`, true)
        .addField("**Opis:**", `${message.author.discriminator}`, true)
        .addField("**ID:**", `${message.author.id}`, true)
        .addField("**Status:**", `${message.author.presence.status}`, true)
        .addField("**Stworzono:**", `${message.author.createdAt}`, true)
        .setFooter(`NOKSBOT | Informacje o uzytkowniku`, bot.user.displayAvatarURL);

    message.channel.send(uEmbed);
    }
}
