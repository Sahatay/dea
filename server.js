const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
const db = require('quick.db');
const config = require("./config.json");
client.commands = new discord.Collection();
client.aliases = new discord.Collection()
fs.readdir("./commands", (err, files) => {
if(err) console.log(err)

let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0) {
    return console.log("[LOGS] couldnt find commands.")
}

jsfile.forEach((f, i) => {
let pull = require(`./commands/${f}`);
client.commands.set(pull.config.name, pull);
pull.config.aliases.forEach(alias => {
    client.aliases.set(alias, pull.config.name)
});
});

});

//cmd

////events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
   
      if (!file.endsWith(".js")) return;
     
      const event = require(`./events/${file}`);
      
      let eventName = file.split(".")[0];
   
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

//events
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
if(message.author.bot || message.channel.type === 'dm') return;

let prefix = db.fetch(`prefix?${message.guild.id}`) || config.prefix
if(!message.content.startsWith(prefix)) return;
let messageArray = message.content.split(" ")
let cmd = messageArray[0];
let args = messageArray.slice(1)

let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
if(commandfile) commandfile.run(client, message, args)
});

client.on('roleDelete', async role => {
  if(!db.has(`rolkoruma?${role.guild.id}`)) return;
  if(!role.guild.me.permissions.has('MANAGE_ROLES')) return;
  if(!role.guild.me.permissions.has('VIEW_AUDIT_LOG')) return;
  const log = role.guild.channels.cache.get(db.fetch(`korumalog?${role.guild.id}`))
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'})
  const haha = entry.entries.first().executor
  if(haha.id === client.user.id) return
  if(haha.bot) return;
  if(haha.id === role.guild.owner.id) return;
  let kisi = role.guild.member(haha.id)
  let content = []
  if(role.position >= role.guild.me.roles.highest.position) return;
  await role.guild.roles.create({
    data: {
      name: role.name,
      hoist: role.hoist,
      color: role.color,
      permissions: role.permissions,
      position: role.position,
      reason: 'Rhea Rol Koruma Sistemi'
    }
  })
  if(kisi.roles.highest.position >= role.guild.me.roles.highest.position) {
    content.push(`${kisi} üyesi bir rol sildi, rolü geri açtım ama kişinin rollerini alamadım.
    
    Silinen Rol: \`${role.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\`
    `)
  } else {
    content.push(`${kisi} üyesi bir rol sildi, rolü geri açtım ve kişinin **ROLLERİ_YÖNET** yetkisi olan bütün rollerini aldım.
   
    Silinen Rol: \`${role.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\``)
  }
   kisi.roles.cache.filter(x => x.permissions.has('MANAGE_ROLES')).map(e => {
     kisi.roles.remove(e).catch(()=>{})
   })
   
   const embed = new discord.MessageEmbed()
   .setAuthor(kisi.user.username, kisi.user.avatarURL())
   .setDescription(content)
   .setColor('RED')
   .setFooter(`Rhea`, client.user.avatarURL())

try {
 log.send(embed) 
} catch {
  role.guild.owner.send(`Dikkat! Bu mesaj sunucunuzda koruma logu ayarlamadığınız için size atılmıştır.`).catch(()=>{return;})
role.guild.owner.send(embed)
}

})

client.on('roleCreate', async role => {
  if(!db.has(`rolkoruma?${role.guild.id}`)) return;
  if(!role.guild.me.permissions.has('MANAGE_ROLES')) return;
  if(!role.guild.me.permissions.has('VIEW_AUDIT_LOG')) return;
  const log = role.guild.channels.cache.get(db.fetch(`korumalog?${role.guild.id}`))
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'})
  const haha = entry.entries.first().executor
  if(haha.id === client.user.id) return
  if(haha.bot) return;
  if(haha.id === role.guild.owner.id) return;
  let kisi = role.guild.member(haha.id)
  let content = []
 role.delete({reason: 'Rhea Rol Koruma Sistemi'})
  if(kisi.roles.highest.position >= role.guild.me.roles.highest.position) {
    content.push(`${kisi} üyesi bir rol açtı, rolü geri sildim ama kişinin rollerini alamadım.
    
    Açılan Rol: \`${role.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\`
    `)
  } else {
    content.push(`${kisi} üyesi bir rol açtı, rolü geri sildim ve kişinin **ROLLERİ_YÖNET** yetkisi olan bütün rollerini aldım.
   
    Açılan Rol: \`${role.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\``)
  }
   kisi.roles.cache.filter(x => x.permissions.has('MANAGE_ROLES')).map(e => {
     kisi.roles.remove(e).catch(() => {})
   })
   
   const embed = new discord.MessageEmbed()
   .setAuthor(kisi.user.username, kisi.user.avatarURL())
   .setDescription(content)
   .setColor('RED')
   .setFooter(`Rhea`, client.user.avatarURL())

try {
 log.send(embed) 
} catch {
  role.guild.owner.send(`Dikkat! Bu mesaj sunucunuzda koruma logu ayarlamadığınız için size atılmıştır.`).catch(()=>{return;})
role.guild.owner.send(embed)
}

})

client.on('channelCreate', async channel => {
  if(!db.has(`kanalkoruma?${channel.guild.id}`)) return;
  if(!channel.guild.me.permissions.has('MANAGE_CHANNELS')) return;
  if(!channel.guild.me.permissions.has('VIEW_AUDIT_LOG')) return;
  const log = channel.guild.channels.cache.get(db.fetch(`korumalog?${channel.guild.id}`))
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'})
  const haha = entry.entries.first().executor
  if(haha.id === client.user.id) return
  if(haha.bot) return;
  if(haha.id === channel.guild.owner.id) return;
  await channel.delete()
  let kisi = channel.guild.member(haha.id)
  let content = []
  if(kisi.roles.highest.position >= channel.guild.me.roles.highest.position) {
    content.push(`${kisi} üyesi bir kanal açtı, kanalı geri sildim ama kişinin rollerini alamadım.
    
    Açılan Kanal: \`${channel.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\`
    `)
  } else {
    content.push(`${kisi} üyesi bir kanal açtı, kanalı geri sildim ve kişinin **KANALLARI_YONET** yetkisi olan bütün rollerini aldım.
   
    Açılan Kanal: \`${channel.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\``)
  }
   kisi.roles.cache.filter(x => x.permissions.has('MANAGE_CHANNELS')).map(e => {
     kisi.roles.remove(e).catch(() => {})
   })
   
   const embed = new discord.MessageEmbed()
   .setAuthor(kisi.user.username, kisi.user.avatarURL())
   .setDescription(content)
   .setColor('RED')
   .setFooter(`Rhea`, client.user.avatarURL())

try {
 await log.send(embed) 
} catch {
  channel.guild.owner.send(`Dikkat! Bu mesaj sunucunuzda koruma logu ayarlamadığınız için size atılmıştır.`).catch(()=>{return;})
  channel.guild.owner.send(embed)
}

})

client.on('channelDelete', async channel => {
  if(!db.has(`kanalkoruma?${channel.guild.id}`)) return;
  if(!channel.guild.me.permissions.has('MANAGE_CHANNELS')) return;
  if(!channel.guild.me.permissions.has('VIEW_AUDIT_LOG')) return;
  const log = channel.guild.channels.cache.get(db.fetch(`korumalog?${channel.guild.id}`))
  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'})
  const haha = entry.entries.first().executor
  if(haha.id === client.user.id) return
  if(haha.bot) return;
  if(haha.id === channel.guild.owner.id) return;
  let kisi = channel.guild.member(haha.id)
  let content = []
  if(channel.type === 'voice') {
    channel.clone({name: this.name, topic: this.topic, bitrate: this.bitrate, reason: 'Lespare Kanal Koruma Sistemi'})
  } else {
    channel.clone({reason: 'Rhea Kanal Koruma Sistemi'}).then(c => {
      c.send(`Bu kanal Rhea tarafından geri açılmıştır.`)
    })
  }
  if(kisi.roles.highest.position >= channel.guild.me.roles.highest.position) {
    content.push(`${kisi} üyesi bir kanal sildi, kanalı geri açtım ama kişinin rollerini alamadım.
    
    Silinen Kanal: \`${channel.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\`
    `)
  } else {
    content.push(`${kisi} üyesi bir kanal sildi, kanalı geri açtım ve kişinin **KANALLARI_YONET** yetkisi olan bütün rollerini aldım.
   
    Silinen Kanal: \`${channel.name}\`
    Kişi ID: \`${kisi.id}\`
    Kişi Tag: \`${kisi.user.tag}\``)
  }
   kisi.roles.cache.filter(x => x.permissions.has('MANAGE_CHANNELS')).map(e => {
     kisi.roles.remove(e).catch(() => {})
   })
   
   const embed = new discord.MessageEmbed()
   .setAuthor(kisi.user.username, kisi.user.avatarURL())
   .setDescription(content)
   .setColor('RED')
   .setFooter(`Rhea`, client.user.avatarURL())

try {
 log.send(embed) 
} catch {
  channel.guild.owner.send(`Dikkat! Bu mesaj sunucunuzda koruma logu ayarlamadığınız için size atılmıştır.`).catch(()=>{return;})
  channel.guild.owner.send(embed)
}

})

client.on('message', async message => {
if(!db.has(`reklamkoruma?${message.guild.id}`)) return;
  const reklam = ["discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
  if (reklam.some(word => message.content.toLowerCase().includes(word))) {
    message.delete({reason: 'Rhea Reklam Koruma Sistemi'}).catch(() => {return;})
    try {
       message.channel.send(new discord.MessageEmbed()
   .setAuthor(client.user.username, client.user.avatarURL())
   .setDescription(`${message.author} bu sunucuda reklam yapmana izin veremem.`)
   .setColor('RED')
   .setFooter(message.author.tag, message.author.avatarURL())
   ).then(c => c.delete({timeout: 10000}))
    } catch {
return message.channel.send(`${message.author} bu sunucuda reklam yapmana izin veremem.`).then(msg => msg.delete({timeout: 10000}))
    }
     
  
  }
})

client.on('guildBanAdd', async (guild, user) => {
  if(!db.has(`bankoruma?${guild.id}`)) return;
  if(!guild.me.permissions.has('BAN_MEMBERS')) return;
  if(!guild.me.permissions.has('VIEW_AUDIT_LOG')) return;
  const log = guild.channels.cache.get(db.fetch(`korumalog?${guild.id}`))
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'})
  const haha = entry.entries.first().executor
  if(haha.id === client.user.id) return
  if(haha.bot) return;
  if(haha.id === guild.owner.id) return;
  let kisi = guild.member(haha.id)
  let content = []
  guild.members.unban(user, 'Rhea Sağ Tık Ban Koruma Sistemi')
  if(kisi.roles.highest.position >= guild.me.roles.highest.position) {
    content.push(`${kisi} üyesi bir kullanıcıyı sağ tık ile banladı, banlanan üyenin banını geri açtım ama kişinin rollerini alamadım.
    
    Banlana Kişi: \`${user.username}\`
    Banlanan Kişi ID: \`${user.id}\`
    Banlanan Kişi Tag: \`${user.tag}\`

    Banlayan ID: \`${kisi.id}\`
    Banlayan Tag: \`${kisi.user.tag}\`
    `)
  } else {
    content.push(`${kisi} üyesi bir kanal sildi, banlanan üyenin banını geri açtım ve kişinin **UYELERI_YASAKLA** yetkisi olan bütün rollerini aldım.
   
      
    Banlana Kişi: \`${user.username}\`
    Banlanan Kişi ID: \`${user.id}\`
    Banlanan Kişi Tag: \`${user.tag}\`

    Banlayan ID: \`${kisi.id}\`
    Banlayan Tag: \`${kisi.user.tag}\``)
  }
   kisi.roles.cache.filter(x => x.permissions.has('BAN_MEMBERS')).map(e => {
     kisi.roles.remove(e).catch(() => {})
   })
   
   const embed = new discord.MessageEmbed()
   .setAuthor(kisi.user.username, kisi.user.avatarURL())
   .setDescription(content)
   .setColor('RED')
   .setFooter(`Rhea`, client.user.avatarURL())

try {
 log.send(embed) 
} catch {
  guild.owner.send(`Dikkat! Bu mesaj sunucunuzda koruma logu ayarlamadığınız için size atılmıştır.`).catch(()=>{return;})
  guild.owner.send(embed)
}

})

client.on('guildMemberAdd', async member => {
  if(!db.has(`botkoruma?${member.guild.id}`)) return;
  if(!member.user.bot) return;
  if(!member.guild.me.permissions.has('KICK_MEMBERS')) return;
  if(!member.guild.me.permissions.has('VIEW_AUDIT_LOG')) return;
  const log = await member.guild.fetchAuditLogs({type: 'BOT_ADD'})
  const korumalog = member.guild.channels.cache.get(db.fetch(`korumalog?${member.guild.id}`))
  const executor = log.entries.first().executor
  let kisi = member.guild.member(executor)
  if(executor.id === member.guild.owner.id) return;
  await member.kick({reason: 'Rhea Bot Koruma Sistemi'}) 
  let content = []
  if(kisi.roles.highest.position >= member.guild.me.role.highest.position) {
    content.push(`${kisi} üyesi sunucuya ${member} botunu ekledi, botu kickledim ama kişinin rollerini alamadım.`)
  } else {
    content.push(`${kisi} üyesi sunucuya ${member} botunu ekledi, botu kickledim ve kişinin SUNUCUYU_YONET yetkisi olan rollerini aldım.`)
  }
  kisi.roles.cache.filter(e => e.permissions.has('MANAGE_GUILD')).map(e => {
    kisi.roles.remove(e).catch(()=>{})
  })
  const embed = new discord.MessageEmbed()
   .setAuthor(kisi.user.username, kisi.user.avatarURL())
   .setDescription(content)
   .setColor('RED')
   .setFooter(`Rhea`, client.user.avatarURL())
  try {
korumalog.send(embed)
  } catch {
    member.guild.owner.send(`Dikkat! Bu mesaj sunucunuzda koruma logu ayarlamadığınız için size atılmıştır.`).catch(()=>{return;})
    member.guild.owner.send(embed)
  }
})

client.on('messageDelete', async message => {

  await db.set(`sniped?${message.guild.id}`, message.content)
  await db.set(`snipedatan?${message.guild.id}`, message.author.id)
  await db.set(`snipedzaman?${message.guild.id}`, Date.now())
})

client.on('guildDelete', async guild => {
  db.delete(`korumalog?${guild.id}`)
  db.delete(`rolkoruma?${guild.id}`)
  db.delete(`kanalkoruma?${guild.id}`)
  db.delete(`reklamkoruma?${guild.id}`)
  db.delete(`botkoruma?${guild.id}`)
  db.delete(`bankoruma??${guild.id}`)
  db.delete(`sniped?${guild.id}`)
  db.delete(`snipedzaman?${guild.id}`)
  db.delete(`snipedatan?${guild.id}`)
})

client.on('message', async message => {
if(message.content === '!davet') {
message.channel.send(new discord.MessageEmbed()
.setDescription('[Ekle](https://discord.com/oauth2/authorize?client_id=784534681290670100&scope=bot&permissions=8)')
.setColor('PURPLE')
)
}
})

client.login(config.token)