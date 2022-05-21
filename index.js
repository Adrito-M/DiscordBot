const Discord = require("discord.js")
const WOKCommands = require("wokcommands");
const path = require("path");
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        testServers: [process.env.CYBERSEC_SERVER_ID]
    })
})

client.on("messageCreate", (message) => {
    if (message.content == "hi") {
        message.reply("Hello to you too!")
    }
})

client.login(process.env.TOKEN)