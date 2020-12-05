const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
if(!args[0]) {
    return message.channel.send(new discord.MessageEmbed()
    .setDescription(`Kullanım şekilleri:
    \`prefix ayarla\`
    \`prefix sıfırla\`
    `)
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor('RED')
    )
}

if(args[0] === 'ayarla') {
if(message.author.id !== message.guild.owner.id) return message.channel.send("Prefiximi sadece sunucu sahibi ayarlayabilir.")
    let prefix = args[1]
      if(!prefix) return message.channel.send(`Bir prefix girmelisiniz!`)
    if(prefix.length >= 3) {
        return message.channel.send(`Prefix uzunluğu 3 ten büyük olmamalıdır!`)
    }
  
    db.set(`prefix?${message.guild.id}`, prefix)
    message.channel.send(`Prefix: ${prefix} olarak ayarlandı.`)
}

    if (args[0] === 'sıfırla') {
        if (message.author.id !== message.guild.owner.id) return message.channel.send("Prefiximi sadece sunucu sahibi ayarlayabilir.")
    if(!db.has(`prefix?${message.guild.id}`)) return message.channel.send(`Prefix zaten ayarlanmamış.`)
    db.delete(`prefix?${message.guild.id}`)
    message.channel.send(`Prefix sıfırlandı.`)
}
}

module.exports.config = {
    name: 'prefix',
    aliases: ['prefix']
}