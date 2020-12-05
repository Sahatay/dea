const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {

if(!args[0]) {
    return message.channel.send(new discord.MessageEmbed()
    .setDescription(`Kullanım şekilleri:
    \`korumalog ch #kanal\`
    \`korumalog sifirla\`
    `)
    .setColor('RED')
    .setAuthor(client.user.username, client.user.avatarURL())
    ).catch(() => {
        return message.channel.send(`Embed atamıyorum.`)
      })
}
if(args[0] === 'ch') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    let kanal = message.guild.channels.cache.get(args[1])
    if(!kanal) return message.channel.send(`Bir kanalın idsini girmelisin!`)
    db.set(`korumalog?${message.guild.id}`, kanal.id)
    message.channel.send(`Koruma logu ${kanal} olarak ayarlandı.`)
}
if(args[0] === 'sifirla') {
    if(message.author.id !== message.guild.owner.id) return message.channel.send(`Korumaları sadece **sunucu sahibi** açıp kapatabilir.`)
    db.delete(`korumalog?${message.guild.id}`)
    return message.channel.send(`Koruma logu sıfırlandı, artık koruma mesajları sunucu sahibine gidecek.`)
}
}
module.exports.config = {
    name: 'korumalog',
    aliases: []
}