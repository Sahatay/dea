const discord = require('discord.js')
module.exports = client => {
client.user.setStatus('idle')
setInterval(async () => {
    var playings = ['Rhea 7/24 Guard Systems', '!davet | Botu Sunucunuza Ekleyin']
    const mesaj = playings[Math.floor(Math.random() * playings.length)];
  client.user.setActivity(mesaj, {type: 'LISTENING'})
}, 20000)
}