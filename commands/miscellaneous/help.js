const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${message.guild.me.displayName} Pomoc`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`Aktualne komendy dla bota: ${message.guild.me.displayName}\nPrefix bota to: **${prefix}**`)
            embed.setFooter(`© ${message.guild.me.displayName} | Aktualnie komend: ${bot.commands.size}`, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.setDescription(stripIndents`
                    :zap:Komendy - NOKSBOT:zap:
                    ——————————————————
                    [4FUN] /alkomat uzytkownik - Sprawdza promile uzytkownika 

                    [4FUN] /alpaka - Wyswietla randomowe zdjecie alpaki

                    [STATY] /apex gracz tryb - Wyswietla statystyki gracza w grze Apex 

                    [MOD] /ban [nick] [powód] - Banowanie uzytkownikow

                    [MOD] /kick [nick] - Wyrzucanie uzytkownikow

                    [4FUN] /kot - Randomowe zdjecie kota

                    [4FUN] /pies - Randomowe zdjecie psa

                    [STATY] /fortnite gracz tryb - Sprawdza statystyki uzytkownika w grze Fortnite

                    [4FUN] /lama - Randomowe zdjecie lamy

                    [4FUN] /mem - Randomowy ANGIELSKI mem**

                    [STATY] /overwatch uzytkownik tryb - Sprawdza statystyki uzytkownika w grze Fortnite

                    [SPR] /ping - Sprawdza ping serwerow bota // serwerow discorda

                    [4FUN] /foka - Wysyla randomowe zdjecie foki

                    [SPR] /serverinfo - Informacje o serwerze

                    [STATY] /steam uzytkownik - Sprawdza statystyki uzytkownika serwisu Steam 

                    [SPR] /uptime - Sprawdza ile bot dziala bez przeszkod

                    [SPR] /informacje uzytkownik - Wysyla informacje o uzytkowniku 

                    [MOD] /dodajrole uzytkownik ranga - Dodaje role

                    [MOD] /mute uzytkownik - Daje muta uzytkownikowi

                    [MOD] /usunrole uzytkownik ranga - Usuwa uzytkownikowi range

                    [MOD] /say - Wysyla ogloszenie

                    [MOD] /softban uzytkownik powod - SoftBanuje uzytkownika

                    [MOD] /unban uzytkownik - Odbanowuje uzytkownika

                    [MOD] /unmute uzytkownik - odmutowuje uzytkownika
                     ——————————————————
                    BOT zrobiony przez ( Negziu#6246 ) ©`)
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Nie poprawna komenda.").setDescription(`Wpisz \`${prefix}help\` aby dostac lise komend!`))
            command = command.config

            embed.setDescription(stripIndents`Prefix bota to: \`${prefix}\`\n
            **Komenda:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Opis:** ${command.description || "No Description provided."}
            **Uzycie:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Skroty:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send(embed)
        }
    }
}
