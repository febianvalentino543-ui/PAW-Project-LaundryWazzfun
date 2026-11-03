const path = require('path');

module.exports = {
  appName: 'Wazzfun Laundry',
  port: process.env.PORT || 3000,
  logDir: path.join(__dirname, '..', 'logs'),
  logFile: 'logger.md',
};