// prep-build.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure the empty-firebase-functions.js file exists
const emptyFunctionsDir = path.join(__dirname, 'app', 'lib', 'utils');
if (!fs.existsSync(emptyFunctionsDir)) {
  fs.mkdirSync(emptyFunctionsDir, { recursive: true });
}

// Function to run an npm script if it exists
const runNpmScript = (scriptName) => {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
    if (packageJson.scripts && packageJson.scripts[scriptName]) {
      console.log(`Running ${scriptName} script...`);
      execSync(`npm run ${scriptName}`, { stdio: 'inherit' });
    }
  } catch (error) {
    console.error(`Error running ${scriptName} script:`, error);
  }
};

// Run the exclude script
console.log('Preparing build by excluding Firebase Functions...');
execSync('node exclude-firebase-functions.js', { stdio: 'inherit' });

// Run the fix-exports script if it exists
runNpmScript('fix-exports');

console.log('Build preparation complete.');

// Temporarily move the firebase functions lib directory
const functionsLibDir = path.join(__dirname, 'firebase', 'functions', 'lib');
if (fs.existsSync(functionsLibDir)) {
  console.log('Temporarily moving compiled Firebase functions...');
  try {
    // Check if backup exists and remove it first
    const backupDir = path.join(__dirname, 'firebase', 'functions', 'lib.bak');
    if (fs.existsSync(backupDir)) {
      fs.rmSync(backupDir, { recursive: true, force: true });
    }
    
    // Rename the directory
    fs.renameSync(functionsLibDir, backupDir);
    console.log('Compiled functions temporarily moved to lib.bak');
  } catch (error) {
    console.error('Error moving lib directory:', error);
  }
}
