const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => 
{

if(!args[0]) {
    return message.channel.send(new discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription(`Bir parametre girmelisiniz!
    \`reklamkoruma aç\`
    \`reklamkoruma kapat\`
    `)
    ).catch(() => {
        return message.channel.send(`Embed atamıyorum.`)
      })
}


if(args[0] === 'aç') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    if(db.has(`reklamkoruma?${message.guild.id}`)) {
        return message.channel.send(`Reklam koruma zaten açık!`)
    }
    db.set(`reklamkoruma?${message.guild.id}`, true)
    message.channel.send(`Reklam koruma başarıyla açıldı!`)
}

if(args[0] === 'kapat') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    if(!db.has(`reklamkoruma?${message.guild.id}`)) {
        return message.channel.send(`Reklam koruma zaten kapalı!`)
    }
    db.delete(`reklamkoruma?${message.guild.id}`)
    message.channel.send(`Reklam koruma başarıyla kapatıldı!`)
}

}


module.exports.config = {
    name: 'reklamkoruma',
    aliases: []
}