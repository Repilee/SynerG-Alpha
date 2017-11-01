 const Discord = require('discord.js');

const settings = require('../settings.json');

exports.run = function(client, message, args) {

  let remind = args.slice(2).join(' ')

  let modlog = client.channels.find('name', settings.logchannel);

  let violog = client.channels.find('name', 'punish-logs');

  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Suspended');

    if (!muteRole) return message.reply('Error: suspended role not found.').catch(console.error);

  if (!modlog) return message.reply(":x: There is no log channel available in this server.")

  var seconds = args[1]

    let user = message.guild.member(message.mentions.users.first())

    if (message.mentions.users.size < 1) return message.reply(':x: You must mention someone to violate them.').catch(console.error);

    if (!seconds) return message.reply(':x: You must define how long the violator period will be. Must be (days).').catch(console.error);

    if (remind.length < 1) return message.reply(':x: You must provide a reason for this action.').catch(console.error);

  message.channel.send(`Please confirm: Is ${user} the person you intended? Command usage is $mute <mention> <days> <string>.\nYou have 30 seconds to answer. Y/N?`);

  return message.channel.awaitMessages(m => m.author.id === message.author.id, {

    'errors': ['time'],

    'max': 1,

    time: 30000

  }).then(resp => {

    if (!resp) return;

    resp = resp.array()[0];

    let validAnswers = ['yes', 'y', 'no', 'n', 'cancel', 'sure', 'Yes', 'Y', 'nvm'];

    if (validAnswers.includes(resp.content)) {

      if (resp.content === 'cancel' || resp.content === 'no' || resp.content === 'n' || resp.content === 'nvm') {

        return message.channel.send('Cancelling.');

      } else {

      if (resp.content === 'yes' || resp.content === 'y' || resp.content === 'Y' || resp.content === 'Yes' || resp.content === 'sure' || resp.content === 'Yes') {

console.log("Violated " + user.user.username + " for " + seconds + " days.");

      message.reply(":ok_hand: Muted **" + user.user.username + "**!");

      user.addRole(muteRole)

             client.channels.get(violog.id).send(`${user}` + " is now suspended for **" + remind + "** and will expire in **" + seconds + "** days.");

	 const embed = new Discord.RichEmbed()

          .setColor(`${settings.image_link_warning_color}`)
          .setTimestamp()

          .setFooter('SynerG Moderation Bot')

          .setAuthor('A moderator has muted you!', `${settings.image_link_warning}`)

          .addField('Moderator:', `${message.author}`)

          .addField('Reason:', remind)

          .addField('Days', seconds)

        user.sendEmbed(embed).catch(console.error);

      setTimeout(continueExecution, Math.round(seconds * 100000000));


      function continueExecution() {

        console.log("Violator of " + user.user.username + " has expired!");

        client.channels.get(violog.id).send(`${user}'s suspension has expired after **` + seconds + `** days.`);

		user.send("You are no longer suspended. Abide by the rules.").catch(console.error);

        const embed = new Discord.RichEmbed()

          .setColor(`${settings.image_link_affirmative_color}`)

          .setTimestamp()

          .setFooter('SynerG Moderation Bot')

          .setAuthor('Mute System - Expired', `${settings.image_link_affirmative}`)

          .addField('Who:', `${user}`)

          .addField('Moderator:', `${message.author}`)

          .addField('Reason:', remind)

         client.channels.get(modlog.id).sendEmbed(embed);

           user.removeRole(muteRole)

      }

    }

}

}

})

}

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 1

};


exports.help = {

  name: 'mute',

  description: 'The bot adds the suspended role to the specified person for up to 7 days.',

  usage: 'mute <mention> <days> <string>'

};

