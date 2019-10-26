const { ownerid, prefix } = require("../../botconfig.json");
const { inspect } = require("util")
const { RichEmbed } = require("discord.js");

module.exports = { 
    config: {
        name: "eval",
        description: "Evaluates code",
        accessableby: "Bot Owner",
        type: "owner",
        usage: `${prefix}eval <input>`
    },
    run: async (bot, message, args) => {
    if(message.author.id == ownerid) {
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return message.channel.send(`Podczas oblicznia pojawil sie ERROR: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Obliczono w ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
            }
            
        } catch (e) {
            return message.channel.send(`Podczas obliczania pojawil sie ERROR: \`${e.message}\``);
        }

      } else {
        return message.reply("Nie jestes administratorem bota!").then(msg => msg.delete(5000))
      }
    }
}