const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let number = args[1];
    let reason = args.splice(2, args.length).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', settings.logchannel);
  if (!modlog) {
  const embed = new Discord.RichEmbed()
  .setColor(settings.image_link_negative_color)
  .setTimestamp()
  .setAuthor('Ban Error',`${settings.image_link_negative}`)
  .setDescription(`Oops! There is no log channel available in this server. Please insert a log channel named ${settings.logchannel}`)
  .setFooter('Ban Error - SynerG');
      message.channel.send({embed}).catch(console.error); return
  }
  if (message.mentions.users.size < 1) {
  const embed = new Discord.RichEmbed()
  .setColor(settings.image_link_negative_color)
  .setTimestamp()
  .setAuthor('Ban Error',`${settings.image_link_negative}`)
  .setDescription(`Oops! You forgot a mention! Please mention someone by using @{DISCORDNAME}`)
  .setFooter('Ban Error - SynerG');
      message.channel.send({embed}).catch(console.error); return
    }
//ADD !NUMBER
  if (reason.length < 1) {
  const embed = new Discord.RichEmbed()
    .setColor(settings.image_link_negative_color)
    .setTimestamp()
    .setAuthor('Ban Error!', `${settings.image_link_negative}`)
    .setDescription('Please specify a reason for the banning.')
    .setFooter('Ban Error - SynerG Bot');
  message.channel.send({embed}).catch(console.error);
}
  if (number > 7) {
    const embed = new Discord.RichEmbed()
    .setColor(settings.image_link_negative_color)
    .setTimestamp()
    .setAuthor('Ban Error!', `${settings.image_link_negative}`)
    .setDescription('Please specify a number less than or equal to 7 days.')
    .setFooter('Ban Error - SynerG Bot');
  message.channel.send({embed}).catch(console.error);
}
  if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
  const embed = new Discord.RichEmbed()
  .setColor(settings.image_link_negative_color)
  .setTimestamp()
  .setAuthor('Ban Error',`${settings.image_link_negative}`)
  .setDescription(`Oops! I do not have the permission to ban people. Please enable the permission to ban members.`)
  .setFooter('Ban Error - SynerG');
      message.channel.send({embed}).catch(console.error); return
    }
  let banMember = message.guild.member(user);
  if (!message.guild.member(user).bannable) {
      const embed = new Discord.RichEmbed()
      .setColor(settings.image_link_negative_color)
      .setTimestamp()
      .setAuthor('Ban Error!', '$(settings.image_link_negative).png')
      .setDescription('The user you\'re trying to ban has a role that is higher than the bots role.')
      .setFooter('Ban Error - SynerG Bot');
    message.channel.send({embed}).catch(console.error);
  } else {
    if (!number) {
      const embed = new Discord.RichEmbed()
      .setColor(settings.image_link_negative_color)
      .setTimestamp()
      .setAuthor('The ban hammer strikes you! You have been banned from the server by a moderator!' ,`${settings.image_link_ban}`)
      .addField('Reason:', reason)
      .addField('Days:', number)
      .addField('Moderator:', `${message.author}`)
      .setFooter('BAN HAMMER STRIKES - BANNED FROM SERVER');
      user.send({embed}).catch(console.error).then
      banMember.ban(number).then(member => {
        const embed = new Discord.RichEmbed()
          .setColor(settings.image_link_negative_color)
          .setTimestamp()
          .setFooter('BAN HAMMER - SynerG')
          .setAuthor(`Banned user: ${user}`, `${settings.image_link_ban}`)
          .addField('Reason:', reason)
          .addField('Days:', 'Forever')
          .addField('Moderator:', `${message.author}`);
        client.channels.get(modlog.id).send({embed}).catch(console.error);
        message.channel.send(`:white_check_mark:  Successfully banned ${user}!`).then(
          response => response.delete(2500).catch(error => console.log(error.stack)))
      }).catch(e => {
        console.error(e);
      });
    } else {
      const embed = new Discord.RichEmbed()
      .setColor(settings.image_link_negative_color)
      .setTimestamp()
      .setAuthor('The ban hammer strikes you! You have been banned from the server by a moderator!' ,`${settings.image_link_ban}`)
      .addField('Reason:', reason)
      .addField('Days:', number)
      .addField('Moderator:', `${message.author}`)
      .setFooter('BAN HAMMER STRIKES - BANNED FROM SERVER');
      user.send({embed}).catch(console.error).then
      banMember.ban(number).then(member => {
        const embed = new Discord.RichEmbed()
          .setColor(settings.image_link_negative_color)
          .setTimestamp()
          .setFooter('BAN HAMMER - SynerG')
          .setAuthor(`Banned user: ${user}`, `${settings.image_link_ban}`)
          .addField('Reason:', reason)
          .addField('Days:', number)
          .addField('Moderator:', `${message.author}`);
        client.channels.get(modlog.id).send({embed}).catch(console.error);
        message.channel.send(`:white_check_mark:  Successfully banned ${user}!`).then(
          response => response.delete(2500).catch(error => console.log(error.stack)))
      }).catch(e => {
        console.error(e);
      });
    }
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'The bot will ban the mentioned user.',
  usage: 'ban <mention> <days> <reason>'
};
