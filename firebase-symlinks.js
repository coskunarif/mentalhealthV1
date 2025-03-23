const fs = require('fs');
const path = require('path');

console.log('Starting Firebase symlinks script...');

// Function to recursively delete a directory
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

// Paths to the problematic modules
const functionsPath = path.join(__dirname, 'node_modules', 'firebase-functions');
const functionsV2Path = path.join(__dirname, 'node_modules', 'firebase-functions', 'v2');
const functionsLibPath = path.join(__dirname, 'node_modules', 'firebase-functions', 'lib');
const adminPath = path.join(__dirname, 'node_modules', 'firebase-admin');

// Replace the module with our mock
if (fs.existsSync(functionsPath)) {
  console.log('Replacing firebase-functions with mock...');
  
  // First, remove any lib/v2 directory that might cause the error
  const libV2Path = path.join(functionsLibPath, 'v2');
  if (fs.existsSync(libV2Path)) {
    deleteFolderRecursive(libV2Path);
    console.log('Removed lib/v2 directory');
  }
  
  // Create v2 directory that exports our mock
  if (!fs.existsSync(functionsV2Path)) {
    fs.mkdirSync(functionsV2Path, { recursive: true });
  }
  
  // Create index.js that exports our mock
  fs.writeFileSync(
    path.join(functionsV2Path, 'index.js'),
    `module.exports = require('${path.join(__dirname, 'app', 'lib', 'mocks', 'firebase-functions.js').replace(/\\/g, '/')}');\n`
  );
  
  // Create https directory
  const httpsPath = path.join(functionsV2Path, 'https');
  if (!fs.existsSync(httpsPath)) {
    fs.mkdirSync(httpsPath, { recursive: true });
  }
  
  // Create https/index.js
  fs.writeFileSync(
    path.join(httpsPath, 'index.js'),
    `module.exports = { onCall: function() { return function() {} } };\n`
  );
  
  console.log('Successfully replaced firebase-functions/v2');
}

// Do the same for firebase-admin
if (fs.existsSync(adminPath)) {
  console.log('Replacing firebase-admin with mock...');
  
  fs.writeFileSync(
    path.join(adminPath, 'index.js'),
    `module.exports = require('${path.join(__dirname, 'app', 'lib', 'mocks', 'firebase-admin.js').replace(/\\/g, '/')}');\n`
  );
  
  console.log('Successfully replaced firebase-admin');
}

console.log('Firebase symlinks script completed successfully.');
