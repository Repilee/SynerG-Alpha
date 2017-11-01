const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = function(client, message, args) {
  .get('http://random.cat/meow');
  const embed = new Discord.RichEmbed()
  .setColor(`${settings.image_link_warning_color}`)
  .setTitle("Meow! :cat:")
  message.channel.send({embed})
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'cat',
  description: 'Gives you a nice kitty meow cat. :cat:',
  usage: 'cat'
};
