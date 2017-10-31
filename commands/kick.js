const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', settings.logchannel);
  if (!modlog) {
  const embed = new Discord.RichEmbed()
  .setColor(settings.image_link_negative_color)
  .setTimestamp()
  .setAuthor('Kick Error',`${settings.image_link_negative}`)
  .setDescription(`Oops! There is no log channel available in this server. Please insert a log channel named ${settings.logchannel}`)
  .setFooter('Kick Error - SynerG');
      message.channel.send({embed}).catch(console.error); return
  }
  if (message.mentions.users.size < 1) {
  const embed = new Discord.RichEmbed()
  .setColor(settings.image_link_negative_color)
  .setTimestamp()
  .setAuthor('Kick Error',`${settings.image_link_negative}`)
  .setDescription(`Oops! You forgot a mention! Please mention someone by using @{DISCORDNAME}`)
  .setFooter('Kick Error - SynerG');
      message.channel.send({embed}).catch(console.error); return
    }
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
  const embed = new Discord.RichEmbed()
  .setColor(settings.image_link_negative_color)
  .setTimestamp()
  .setAuthor('Kick Error',`${settings.image_link_negative}`)
  .setDescription(`Oops! I do not have the permission to kick people. Please enable the permission to kick members.`)
  .setFooter('Kick Error - SynerG');
      message.channel.send({embed}).catch(console.error); return
    }
let kickMember = message.guild.member(user);
 if (!message.guild.member(user).kickable) {
      const embed = new Discord.RichEmbed()
      .setColor(settings.image_link_negative_color)
      .setTimestamp()
      .setAuthor('Kick Error',`${settings.image_link_negative}`)
      .setDescription('Unable to kick a user, this user has a higher role.')
        .setFooter('Kick Error - SynerG');
    message.channel.send({embed}).catch(console.error); return
  } else {
     if (reason.length < 1) {
const embed = new Discord.RichEmbed()
.setColor({settings.image_link_negative_color})
.setTimestamp()
.setAuthor('A server moderator has attempted to kick you.',`${settings.image_link_negative}`)
.addField('Reason:', 'No reason specified.')
.addField('Moderator:', `${message.author}`)
.setFooter('Kicked - SynerG Moderation Bot');
user.send({embed}).catch(console.error).then
  kickMember.kick().then(member => {
    const embed = new Discord.RichEmbed()
      .setColor(0x76b352)
      .setTimestamp()
      .setAuthor('Kick System', `${settings.image_link_affirmative}`)
      .setFooter('SynerG Moderation Bot')
      .addField('User:', `${user} ID: ${user.id}`)
      .addField('Reason:', 'The moderator did not specify a reason.')
      .addField('Moderator:', `${message.author}`);
    client.channels.get(modlog.id).send({embed}).catch(console.error);
    message.channel.send(`:ok_hand: Successfully kicked ${user}`).then(
      response => response.delete(2500).catch(error => console.log(error.stack)))
  }).catch(e => {
    console.error(e);
  });
}
} else {
  const embed = new Discord.RichEmbed()
  .setColor({settings.image_link_negative_color})
  .setTimestamp()
  .setAuthor('A server moderator has attempted to kick you.',`${settings.image_link_negative}`)
  .addField('Reason:', reason)
  .addField('Moderator:', `${message.author}`)
  .setFooter('Kicked - SynerG Moderation Bot');
  user.send({embed}).catch(console.error).then
    kickMember.kick().then(member => {
      const embed = new Discord.RichEmbed()
        .setColor(0x76b352)
        .setTimestamp()
        .setAuthor('Kick System', `${settings.image_link_affirmative}`)
        .setFooter('SynerG Moderation Bot')
        .addField('User:', `${user} ID: ${user.id}`)
        .addField('Reason:', reason)
        .addField('Moderator:', `${message.author}`);
      client.channels.get(modlog.id).send({embed}).catch(console.error);
      message.channel.send(`:ok_hand: Successfully kicked ${user}`).then(
        response => response.delete(2500).catch(error => console.log(error.stack)))
    }).catch(e => {
      console.error(e);
    });
  }
  }

  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the targeted user.',
  usage: 'kick <mention> <reason>'
};
