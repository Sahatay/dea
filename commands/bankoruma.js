const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => 
{

if(!args[0]) {
    return message.channel.send(new discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription(`Bir parametre girmelisiniz!
    \`bankoruma aç\`
    \`bankoruma kapat\`
    `)
    ).catch(() => {
        return message.channel.send(`Embed atamıyorum.`)
      })
}


if(args[0] === 'aç') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    if(db.has(`bankoruma?${message.guild.id}`)) {
        return message.channel.send(`Sağ tık ban koruma zaten açık!`)
    }
    db.set(`bankoruma?${message.guild.id}`, true)
    message.channel.send(`Sağ tık ban koruma başarıyla açıldı!`)
}

if(args[0] === 'kapat') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    if(!db.has(`bankoruma?${message.guild.id}`)) {
        return message.channel.send(`Sağ tık ban koruma zaten kapalı!`)
    }
    db.delete(`bankoruma?${message.guild.id}`)
    message.channel.send(`Sağ tık ban koruma başarıyla kapatıldı!`)
}

}


module.exports.config = {
    name: 'bankoruma',
    aliases: []
}