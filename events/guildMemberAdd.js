module.exports = (member) => {
      member.send(`Welcome, **${member.user.username}**! Your first step is to read the rules and verify. If you're going to talk here, you hereby agree to the rules.`).catch(e => {
          member.guild.defaultChannel.send(`You have disabled direct messages, welcome, your first step to do is to please read the rules, and verify yourself. Have a great day here! ${member}`);
  })
};
