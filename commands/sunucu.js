const Discord = require("discord.js");
const moment = require("moment");
const useful = require("useful-tools")
const ayarlar = require("../config.json");

exports.run = (client, message, params) => {
  const tarih = useful.tarih(message.guild.createdTimestamp)
    const sunucubilgi = new Discord.MessageEmbed()
      .setColor("DARK")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("👑 Sunucu Sahibi", message.guild.owner)
    .addField("🔖 Sunucu Adı", message.guild.name)
      .addField("🆔 Sunucu ID", message.guild.id)
      .addField("🎭 Rol Sayısı", message.guild.roles.cache.size)
      .addField(
        "🏰 Kanal Sayısı",
        message.guild.channels.cache.size
      )
      .addField("😍 Emoji Sayısı", message.guild.emojis.cache.size)
      .addField("🌍 Sunucu Bölgesi", message.guild.region)
      .addField("🗽 Üye Sayısı", message.guild.memberCount)
      .addField(
        "🔇 AFK Kanalı", message.guild.afkChannel
      )
    .addField('⏰ AFK Zaman Aşımı', message.guild.afkTimeout)
    .addField('☑ Sistem Mesaj Kanalı ', message.guild.systemChannel || 'Yok')
      
      .addField("🔻 Oluşturulma Tarihi", `${tarih}`)
      .setThumbnail(message.guild.iconURL);
    return message.channel.send(sunucubilgi).catch(() => {
        return message.channel.send(`Embed atamıyorum.`)
      })
  }

module.exports.config = {
    name: 'sunucu',
    aliases: ['sv']
}