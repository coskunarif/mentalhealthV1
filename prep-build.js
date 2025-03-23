// prep-build.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure the empty-firebase-functions.js file exists
const emptyFunctionsDir = path.join(__dirname, 'app', 'lib', 'utils');
if (!fs.existsSync(emptyFunctionsDir)) {
  fs.mkdirSync(emptyFunctionsDir, { recursive: true });
}

// Run the exclude script
console.log('Preparing build by excluding Firebase Functions...');
execSync('node exclude-firebase-functions.js', { stdio: 'inherit' });
console.log('Build preparation complete.');
