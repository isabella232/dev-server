const execSync = require('child_process').execSync
const graphicConfig = require('../graphic_config.js').configureTargets('localhost');

const cmd = `gdrive export -f --mime application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ${graphicConfig.GOOGLE_DOC_ID}`;

execSync(cmd);
