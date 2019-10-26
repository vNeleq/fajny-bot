const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "alpaka",
        description: "sends a picture of a alpaca!",
        usage: "",
        category: "images",
        accessableby: "Members",
        aliases: ["catto"]
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generowanie...")

        fetch("https://apis.duncte123.me/alpaca")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply("O Nie! Cos poszlo nie tak, sprobuj ponownie!")

            let embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} Alpaka!`, message.guild.iconURL)
            .setImage(body.data.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}