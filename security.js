const chalk = require('chalk');

const warnings = new Map();
let linkMonitoring = false;
const bannedWords = new Set();
let antiSpam = false;
const spamTrack = new Map();

function logSecurityAction(action, details) {
    const timestamp = new Date().toISOString();
    console.log(chalk.yellow(`[SECURITY] ${timestamp} - ${action}: ${details}`));
}

function addWarning(userId, reason) {
    const userWarnings = warnings.get(userId) || [];
    userWarnings.push({ reason, timestamp: Date.now() });
    warnings.set(userId, userWarnings);
}

module.exports = {
    warnings,
    linkMonitoring,
    setLinkMonitoring: (value) => { linkMonitoring = value; },
    bannedWords,
    antiSpam,
    setAntiSpam: (value) => { antiSpam = value; },
    spamTrack,
    logSecurityAction,
    addWarning
};