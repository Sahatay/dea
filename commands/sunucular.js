const discord = require("discord.js");
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
if(message.author.id !== config.owner) return;
  let c = client.guilds.cache.map(e => e.name);
  let s = client.guilds.cache.map(e => e.id);
  let o = client.guilds.cache.map(e => e.owner.id);
  let data = [];
  let ss;
  if (client.guilds.cache.size > 30) {
    ss = 30;
  } else if (client.guilds.cache.size <= 30) {
    ss = client.guilds.cache.size;
  }
  for (let i = 0; i < ss; i++) {
    data.push(`> \`${i + 1}\` ${c[i]} | Owner: <@${o[i]}>`);
  }

  message.channel.send(
    new discord.MessageEmbed()
      .setTitle(`${ss} sunucuda varım;`)
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setDescription(data)
      .setThumbnail(client.user.avatarURL())
      .setColor("PURPLE")
      .setFooter(client.user.username, client.user.avatarURL())
  );
};

module.exports.config = {
  name: "sunucular",
  aliases: ["sunucular", "svler", "svs"]
};
