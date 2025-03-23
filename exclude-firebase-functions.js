const fs = require('fs');
const path = require('path');

console.log('Running Firebase Functions exclusion script...');

// Create empty directory to prevent Metro bundler from including firebase functions
const functionsDir = path.join(__dirname, 'node_modules', 'firebase-functions', 'lib', 'v2');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Create empty index.js file to satisfy imports
const indexPath = path.join(functionsDir, 'index.js');
fs.writeFileSync(indexPath, '// Mock index file to satisfy imports\n' +
  'module.exports = {\n' +
  '  https: {},\n' +
  '  scheduler: {}\n' +
  '};\n');

console.log('Created mock firebase-functions/v2 directory:', functionsDir);

// Create mock for https
const httpsDir = path.join(functionsDir, 'https');
if (!fs.existsSync(httpsDir)) {
  fs.mkdirSync(httpsDir, { recursive: true });
}
const httpsPath = path.join(httpsDir, 'index.js');
fs.writeFileSync(httpsPath, '// Mock https file to satisfy imports\n' +
  'module.exports = {\n' +
  '  onCall: function() { return function() {} }\n' +
  '};\n');

console.log('Created mock firebase-functions/v2/https directory:', httpsDir);

// Create mock for scheduler
const schedulerDir = path.join(functionsDir, 'scheduler');
if (!fs.existsSync(schedulerDir)) {
  fs.mkdirSync(schedulerDir, { recursive: true });
}
const schedulerPath = path.join(schedulerDir, 'index.js');
fs.writeFileSync(schedulerPath, '// Mock scheduler file to satisfy imports\n' +
  'module.exports = {\n' +
  '  onSchedule: function() { return function() {} }\n' +
  '};\n');

console.log('Created mock firebase-functions/v2/scheduler directory:', schedulerDir);

console.log('Firebase Functions exclusion script completed successfully.');
