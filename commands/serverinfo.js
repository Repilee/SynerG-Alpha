const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setColor(`${settings.image_link_affirmative_color}`)
  .setTimestamp()
  .setThumbnail()
  .setAuthor('Server Information', `${settings.image_link_sG}`)
  .addField('**Total users in this server:** ', client.users.size )
  .addField('**Total channels in this server:**', client.channels.size)
  .setFooter('SynerG Alpha');
     message.channel.send({embed})
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'serverinfo',
  description: 'Shows information about this server.',
  usage: 'serverinfo'
};
