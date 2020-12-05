const discord = require('discord.js')
const colors = require("../colors.json")
module.exports.run = async(client, message, args) => {
message.channel.send(new discord.MessageEmbed()
.setDescription(`**Pingim: ${client.ws.ping}**`)
.setColor(colors["favouritered"])
.setAuthor(`${client.user.username}`,client.user.avatarURL())
).catch(() => {
    return message.channel.send(`Embed atamıyorum.`)
  })
}

module.exports.config = {
    
    name: "ping",
    aliases: ["ping"],
}



