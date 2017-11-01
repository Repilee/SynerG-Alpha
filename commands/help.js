const Discord = require('discord.js');
const settings = require('../settings.json');
exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    const embed = new Discord.RichEmbed()
    .setColor(`${settings.image_link_affirmative_color}`)
    .setTimestamp()
    .setAuthor('Bot Commands',`${settings.image_link_affirmative}`)
    .setDescription('A list of commands has sent to your DM!')
      .setFooter('SynerG Moderation Bot');
  message.channel.send({embed})
    message.author.sendCode('asciidoc', `= Command List =\n\n[Use ${settings.prefix}help <command> for information]\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} = ${c.help.description}`).join('\n')}`).catch(e => {
        message.reply(`Unable to send you a list of commands. Please check your DM settings.`);
      });
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nUsage: ${command.help.usage}`).catch(e => {
          message.reply(`Unable to send you a list of commands. Please check your DM settings.`);
        })
  }
};
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'cmds', 'commands'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};
