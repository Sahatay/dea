const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {
let rolkoruma = await db.fetch(`rolkoruma?${message.guild.id}`)
if(!rolkoruma) {
    rolkoruma = "<:kapali:784586378822418433>"
} else {
    rolkoruma = "<:acik:784586319212314625>"
}
let bankoruma = await db.fetch(`bankoruma?${message.guild.id}`)
if(!bankoruma) {
    bankoruma = `<:kapali:784586378822418433>`
} else {
    bankoruma = '<:acik:784586319212314625>'
}
let kanalkoruma = await db.fetch(`kanalkoruma?${message.guild.id}`)
if(!kanalkoruma) {
    kanalkoruma = `<:kapali:784586378822418433>`
} else {
    kanalkoruma = '<:acik:784586319212314625>'
}
let botkoruma = await db.fetch(`botkoruma?${message.guild.id}`)
if(!botkoruma) {
    botkoruma = `<:kapali:784586378822418433>`
} else {
    botkoruma = '<:acik:784586319212314625>'
}
let korumalog = await db.fetch(`korumalog?${message.guild.id}`)
if(!korumalog) {
    korumalog = '\`Yok\`'
} else {
    korumalog = `<#${korumalog}>`
}
let reklamkoruma = await db.fetch(`reklamkoruma?${message.guild.id}`)
if(!reklamkoruma) {
    reklamkoruma = '<:kapali:784586378822418433>'
} else {
    reklamkoruma = `<:acik:784586319212314625>`
}
message.channel.send(new discord.MessageEmbed()
.addField(`Rol koruma:`, `${rolkoruma}`, true)
.addField(`Bot koruma:`, `${botkoruma}`, true)
.addField(`Ban koruma:`, `${bankoruma}`, true)
.addField(`Reklam koruma:`, `${reklamkoruma}`, true)
.addField(`Kanal koruma:`, `${kanalkoruma}`, true)
.addField(`Koruma logu:`, `${korumalog}`, true)
.setColor('RANDOM')
.setThumbnail(message.guild.iconURL())
.setAuthor(client.user.username, client.user.avatarURL())
.setFooter(message.author.tag, message.author.avatarURL())
)
 }

module.exports.config = {
    name: 'korumalar',
    aliases: []
}