const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "mem",
        description: "Sends a meme from a website!",
        usage: "",
        category: "images",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generowanie...")

        fetch("https://apis.duncte123.me/meme")
        .then(res => res.json()).then(body => {
            if(!body || !body.data.image) return message.reply("O nie! Cos poszlo nie tak, sprobuj ponownie!")

            let embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} Mem!`, message.guild.iconURL)
            .setImage(body.data.image)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            if(body.data.title) {
                embed.setTitle(body.data.title).setURL(body.data.url)
            }
                msg.edit(embed)
        })
    }
}