const Discord = require('discord.js');
const settings = require('../settings.json');
module.exports = (message) => {
     let client = message.client;
	if (!message.content.startsWith(settings.prefix)) return;
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
		if (message.channel.type === 'dm') {
		} else {
				if (perms >= cmd.conf.permLevel) {
        cmd.run(client, message, params, perms);
       } else {
         console.log(`${message.author.username} doesn't have the permission to run a command.`)
         const embed = new Discord.RichEmbed()
       		.setColor(settings.image_link_negative_color)
       		.setTimestamp()
       		.setAuthor('Command Error!', `${settings.image_link_negative}`)
       		.setDescription(`You do not have permission to run this command. For a list of commands, run ${settings.prefix}help.`)
       		 .setFooter('Insufficient Permissions - SynerG Moderation Bot');
       		 message.channel.send({embed}).then(
       	 response => response.delete(3500).catch(error => console.log(error.stack)))
}
}
}
if (!cmd) {
	const embed = new Discord.RichEmbed()
		.setColor(settings.image_link_negative_color)
		.setTimestamp()
		.setAuthor('Command Error!', `${settings.image_link_negative}`)
		.setDescription('The command you typed is not vaild. For a list of commands, run $help.')
		 .setFooter('Command Not Found - SynerG Moderation Bot');
		 message.channel.send({embed}).then(
	 response => response.delete(3500).catch(error => console.log(error.stack)))
}
};
