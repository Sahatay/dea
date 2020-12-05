const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => 
{

if(!args[0]) {
    return message.channel.send(new discord.MessageEmbed()
    .setColor('RED')
    .setAuthor(client.user.username, client.user.avatarURL())
    .setDescription(`Bir parametre girmelisiniz!
    \`rolkoruma aç\`
    \`rolkoruma kapat\`
    `)
    )
}


if(args[0] === 'aç') {
    if(db.has(`rolkoruma?${message.guild.id}`)) {
        return message.channel.send(`Rol koruma zaten açık!`)
    }
    db.set(`rolkoruma?${message.guild.id}`, true)
    message.channel.send(`Rol koruma başarıyla açıldı!`)
}

if(args[0] === 'kapat') {
    if(!db.has(`rolkoruma?${message.guild.id}`)) {
        return message.channel.send(`Rol koruma zaten kapalı!`)
    }
    db.delete(`rolkoruma?${message.guild.id}`)
    message.channel.send(`Rol koruma başarıyla kapatıldı!`)
}

}


module.exports.config = {
    name: 'rolkoruma',
    aliases: []
}