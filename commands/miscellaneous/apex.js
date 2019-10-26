const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const API = require("apextab-api"), ApexTab  = API.Apextab_API;

module.exports = {
    config: {
        name: "apex",
        description: "Displays a user's apex stats!",
        usage: "<user> <platform>",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["apec"] 
    }, 
    run: async (bot, message, args) => {
        if(!args[0]) return message.channel.send("Napisz jaki nick ma wybrana osoba.");
        if(!args[1]) return message.channel.send("Z jakiej platwormy mamy wyszukiwac?. `pc`, `xbox` or `ps4`");

        const platformCheck = { pc: API.Platform.PC, xbox: API.Platform.XBOX_ONE, ps4: API.Platform.PS4 };
        const platform = platformCheck[args[1].toLowerCase()];

        try {
            const results = await ApexTab.searchPlayer(args[0], platform ? platform : API.Platform.PC)
            
                for (let playerResult of results.results) {
                    const player = await ApexTab.getPlayerById(playerResult.aid)
                    const { name, skillratio, visits, avatar, legend, level, kills, headshots, matches, globalrank, utime } = player;

                        const embed = new RichEmbed()
                            .setColor(cyan)
                            .setAuthor(`Origin (Apex Legends) | ${name}`, avatar)
                            .setThumbnail(avatar)
                            .setDescription(stripIndents`
                                **Aktywna Legenda:** ${legend || "Not Found."}
                                **Globalna Ranga w rankingu:** ${globalrank || "Not Ranked."}
                                **Level:** ${level || 0}
                                **Skill Radio:** ${skillratio || "0%"}
                                **Mecze:** ${matches || 0}
                                **Kille:** ${kills || 0}
                                **HeadShoty:** ${headshots || 0}
                                **Wizyty:** ${visits || 0}
                                **Czas Grania:** ${Math.ceil(utime / (1000 * 60 * 60 * 24)) || 0} days
                            `)
                            .setTimestamp()

                        message.channel.send(embed)
                }
        } catch(err) {
            return message.channel.send("Nie moge znalesc takiej osoby!")
        }
    }
}