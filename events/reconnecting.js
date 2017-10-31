const chalk = require('chalk');
module.exports = client => {
  console.log(chalk.bgWhite.black(`Alert: Reconnecting at ${new Date()}`));
};
