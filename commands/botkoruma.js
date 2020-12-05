const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => 
{

if(!args[0]) {
    return message.channel.send(new discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription(`Bir parametre girmelisiniz!
    \`botkoruma aç\`
    \`botkoruma kapat\`
    `)
    ).catch(() => {
        return message.channel.send(`Embed atamıyorum.`)
      })
}


if(args[0] === 'aç') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    if(db.has(`botkoruma?${message.guild.id}`)) {
        return message.channel.send(`Bot koruma zaten açık!`)
    }
    db.set(`botkoruma?${message.guild.id}`, true)
    message.channel.send(`Bot koruma başarıyla açıldı!`)
}

if(args[0] === 'kapat') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    if(!db.has(`botkoruma?${message.guild.id}`)) {
        return message.channel.send(`Bot koruma zaten kapalı!`)
    }
    db.delete(`botkoruma?${message.guild.id}`)
    message.channel.send(`Bot koruma başarıyla kapatıldı!`)
}

}


module.exports.config = {
    name: 'botkoruma',
    aliases: []
}