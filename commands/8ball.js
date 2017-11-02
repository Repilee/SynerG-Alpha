exports.run = function(client, message, args) {

  let reason = args.join(' ');

if (reason.length < 1) return message.reply(':x: You must say something in order the bot to say it to you!').catch(console.error);

  var answers = [

    'Um, I guess so!',

    'Nah, no thanks.',

    'What about you?',

    'Yeah, yeah, sure.',

    'I love how you say that!',

    'Excuse me?',

    'Hi! How are you?',

    'Not pretty bad, huh?',

    'Hmmm, I guess it is best thing to have.',

    'Absolutely yes! I wanted that!',

    'Ew, no way!',

    'Oh my god, stop!',

    'Please, I would love that to have!',

    'Love it.',

    'Great to hear that!',

    '*Burps.* Oops, did I do something wrong?',

    'Everything is true, including your comment.',

  ];

  var randomAnswerPicker = answers[Math.floor(Math.random() * answers.length)];

  message.reply(randomAnswerPicker);

  }

  exports.conf = {

    enabled: true,

    guildOnly: false,

    aliases: [],

    permLevel: 0

  };


  exports.help = {

    name: '8ball',

    description: 'Process it and the bot will tell you!',

    usage: '8ball <string>'

  };

 
