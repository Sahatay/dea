const discord = require('discord.js')
const db  = require('quick.db')

module.exports.run = async(client, message, args) => {

message.channel.send(new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setColor('RANDOM')
.addField(`> \`!botkoruma\``, `Sunucuya bot sokma koruması.`, true)
.addField(`> \`!bankoruma\``, `Sağ tık ban koruması.`, true)
.addField(`> \`!reklamkoruma\``, `Reklam koruması.`, true)
.addField(`> \`!kanalkoruma\``, `Kanal koruması.`, true)
.addField(`> \`!rolkoruma\``, `Rol koruması.`, true)
.addField(`> \`!korumalog\``, `Koruma logu.`, true)
.setThumbnail(message.guild.iconURL())
.setFooter(`Diğer komutlar için ➡️`)
).catch(() => {
    return message.channel.send(`Embed atamıyorum.`)
  }).then(async embed => {
   
    embed.react('⬅️')
     embed.react('➡️')
    const digerfilter = (reaction, user) => {
        return user.id === message.author.id && reaction.emoji.name === '➡️'
    }
    const korumafiter = (reaction, user) => {
        return user.id === message.author.id && reaction.emoji.name === '⬅️'
    }
    
const koruma = embed.createReactionCollector(korumafiter, {time: 30000, errors: ['time']})
const diger = embed.createReactionCollector(digerfilter, {time: 30000, errors: ['time']})

koruma.on('collect', async () => {
    embed.edit(new discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor('RANDOM')
    .addField(`> \`!botkoruma\``, `Sunucuya bot sokma koruması.`, true)
    .addField(`> \`!bankoruma\``, `Sağ tık ban koruması.`, true)
    .addField(`> \`!reklamkoruma\``, `Reklam koruması.`, true)
    .addField(`> \`!kanalkoruma\``, `Kanal koruması.`, true)
    .addField(`> \`!rolkoruma\``, `Rol koruması.`, true)
    .addField(`> \`!korumalog\``, `Koruma logu.`, true)
    .setThumbnail(message.guild.iconURL())
    .setFooter(`Diğer komutlar için ➡️`))
})

diger.on('collect', async () => {
    embed.edit(new discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setColor('RANDOM')
    .addField(`> \`!sunucu\``, `Sunucu hakkında bilgi verir. `, true)
        .addField(`> \`!snipe\``, `Son silinen mesajı gösterir.`, true)
    .addField(`> \`!korumalar\``, `Açık/kapalı korumalar.`, true)
        .addField(`> \`!ping\``, `Rhea'nın pingini gösterir.`, true)
    .addField(`> \`!istatistik\``, `Rhea hakkında bilgi verir.`, true)
    .addField(`> \`!prefix\``, `Prefixi değiştirirsiniz.`, true)
    .setFooter(`Koruma komutları için ⬅️`)
    )
})

})

}
module.exports.config = {
    name: 'help',
    aliases: ['y', 'yardim', 'yardım', 'h']
}