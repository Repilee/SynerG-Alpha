const Discord = require('discord.js');
const bot = new Discord.Client();
const moment = require('moment');
const client = new Discord.Client();
require('./util/eventLoader')(client);
const settings = require('./settings.json');
const ddiff = require('return-deep-diff')
const fs = require('fs');
process.on('unhandledRejection', console.error);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

//client.on('guildMemberAdd', member => {
//  let guild = member.guild;
//    let FanRole = client.guilds.get(member.guild.id).roles.find('name', 'Pending');
//    member.addRole(FanRole)
//    console.log("Gave " + member.user.username + " a pending role!")
//});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on('message', message => { //Message listener
  if (message.channel.type === 'text') {
  forbidenWords = ["http:", ".be", "https:",
  "/invite", "www.", ".com", ".net", "http", "https", "discordapp.com", "invite/",
   "www.discordapp", "pornhub.com"]
  try {
    let modlog = client.channels.find('name', settings.logchannel);
      let permit = message.guild.member(message.author).roles.has('374295179831672844')
      for (var i = 0; i < forbidenWords.length; i++) { //Does the math for each arrays
        if (message.content.includes(forbidenWords[i])) { //Checks if it includes it from the array.
        if (!permit)
        if (settings.filterresponse == "true") {
          if (message.content.includes('/invite')) {
        message.delete(5) //Deletes if it doesn't have permit, and is one of the forbidden words in the array.
        client.channels.get(modlog.id).send(`${message.author} attempted to type "${message.content}" Action: Discord Invite`).catch(console.error);
          message.reply("Do not post invite links. This server does not allow advertising.")
          break;
        }
  }
}
}
}
catch(e) {
}
}
})

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
      if (message.channel.type === 'dm') {
        const embed = new Discord.RichEmbed()
        .setColor(0xDF3046)
        .setTimestamp()
        .setAuthor('Command Error!', `${settings.image_link_negative}`)
       .setDescription('In DMs (Direct Messages), all the commands for this bot has disabled.')
        .setFooter('SynerG Moderation Bot');
        message.channel.send({embed}).catch(console.error)
} else {
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  let owner_role = message.guild.roles.find('name', settings.ownerrolename);
  if (owner_role && message.member.roles.has(owner_role.id)) permlvl = 4;
  if (message.author.id === settings.botdeveloperid) permlvl = 5;
  return permlvl;
}
};


client.login(process.env.BOT_TOKEN);

var regtoken = /[\w\d{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('error', e => {
  console.log(e.replace(regtoken, 'that was redacted'));
});

client.on('warn', e => {
  console.log(e.replace(regtoken, 'that was redacted'));
});

client.on('debug', e => {
  console.log(e.replace(regtoken, 'that was redacted'));
});


//-CLIENT EVENTS-\\
//bot.on('guildCreate'), guild => {
//guild.defaultChannel.send('**Hello everyone in this server, thank you for inviting me!**')
//});
