const discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
module.exports.run = async(client, message, args) => {
  moment.locale('tr')
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`Bu komutu kullanabilmek için mesajları yönet yetkisine sahip olmanız gerekiyor.`)
let sniped = await db.fetch(`sniped?${message.guild.id}`)
if(!sniped) {
return message.channel.send(`Silinen mesaj bulunmuyor.`)
}
let atan = await db.fetch(`snipedatan?${message.guild.id}`)
let snipedatan = message.guild.member(atan)
let snipedzaman = await db.fetch(`snipedzaman?${message.guild.id}`)
var tarih = new Date(Date.now())
  var tarih2 = ms(snipedzaman)
  var tarih3 = Date.now() + tarih2 + 10800000

  let atılmaay = moment(Date.now()+10800000).format("MM")
  let atılmagün = moment(Date.now()+10800000).format("DD")
  let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
  let bitişay = moment(tarih3).format("MM")
  let bitişgün = moment(tarih3).format("DD")
  let bitişsaat = moment(tarih3).format("HH:mm:ss")
  let atilma = `${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}`




message.channel.send(new discord.MessageEmbed()
.setAuthor(snipedatan.user.username, snipedatan.user.avatarURL())
                     .setFooter(`${atilma} tarihinde silindi.`, message.guild.iconURL())
                     .setDescription(`
                     ${sniped}
                     `)
).catch(() => {
          return message.channel.send(`Embed atamıyorum.`)
        })

}
module.exports.config = {
name: 'snipe',
aliases: ['snipe']
}