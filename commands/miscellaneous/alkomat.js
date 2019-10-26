const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");
const { cyan } = require("../../colours.json");
const { red_dark } = require("../../colours.json")
const fetch = require('node-fetch');
const Discord = require("discord.js");

module.exports = { 
    config: {
        name: "alkomat",
        description: "Wykrywa promile uzytkownika!",
        usage: "",
        category: "images",
        accessableby: "miscellaneous",
        aliases: ["alko"]
    },
    run: async (bot, message, args) => {
        let Uzytkownik = message.mentions.members.first()
        const embed = new RichEmbed()
        let calc = Math.floor((Math.random() * 10) + 1);
        
        
        embed.setTitle("NOKSBOT - Alkomat")
        embed.setColor(red_dark)
        embed.setDescription(stripIndents`**ALKOMAT NOKSBOT**
        
        *Uzytkownik: ${Uzytkownik}*
        *Dmuchano do alkomatu: ${message.author}
        *Promili: ${calc}`);
        message.channel.send(embed);
        console.log(`Wyliczylem: ${calc}`);
    }
}