const discord = require("discord.js");
const moment = require("moment");
const os = require("os");
const ayarlar = require("../config.json");
const sahip = ayarlar.owner;
module.exports.run = async (client, message, args) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(`Embed atma iznim yok.`).catch();
  const istatistikler = new discord.MessageEmbed()
    .setColor("PURPLE")
    .setThumbnail(client.user.avatarURL())
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setDescription(`**Geliştirici:** <@${sahip}>
  
  • **RAM Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
    2
  )} MB**
  • **Kullanıcı sayısı: \`${client.users.cache.size}\`**
  • **Sunucu sayısı: \`${client.guilds.cache.size}\`**
  • **Kanal sayısı: \`${client.channels.cache.size}\`**
  • **Ping: \`${client.ws.ping}\`**
  • **CPU:** \`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\`
  • **OS: \`${os.platform()}\`**
  `);

  return message.channel.send(istatistikler).catch(() => {
          return message.channel.send(`Embed atamıyorum.`)
        })
};

module.exports.config = {
  name: "istatistik",
  aliases: ["stat"]
};
