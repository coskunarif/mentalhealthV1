// exclude-firebase-functions.js
const fs = require('fs');
const path = require('path');

// Create a temporary file to replace Firebase Functions imports
const createEmptyModule = (directory) => {
  const emptyModulePath = path.join(directory, 'empty-firebase-functions.js');
  const emptyModuleContent = `
// This is a placeholder for Firebase Functions
// It prevents client-side bundling of server-side code
module.exports = {
  // Mock implementations for client-side
  https: {
    onCall: () => () => {},
  },
  region: () => {},
  auth: {
    user: () => ({ onCreate: () => {} }),
  },
  // Add other mock implementations as needed
};
`;

  fs.writeFileSync(emptyModulePath, emptyModuleContent);
  return emptyModulePath;
};

// Replace Firebase Functions imports in the specific files
const replaceImports = (filePath, emptyModulePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace Firebase Functions v1 and v2 imports
    content = content.replace(
      /require\(['"]firebase-functions(?:\/v1|\/v2)?['"]\)/g,
      `require("${emptyModulePath.replace(/\\/g, '\\\\')}")`
    );
    
    content = content.replace(
      /from ['"]firebase-functions(?:\/v1|\/v2)?['"]/g,
      `from "${emptyModulePath.replace(/\\/g, '\\\\')}"`
    );

    fs.writeFileSync(filePath, content);
    console.log(`Replaced Firebase Functions imports in ${filePath}`);
  }
};

// Main execution
console.log('Excluding Firebase Functions from client bundle...');

// Create empty module
const emptyModulePath = createEmptyModule(path.join(__dirname, 'app', 'lib', 'utils'));

// Handle potential compiled JavaScript files
const functionsLibDir = path.join(__dirname, 'firebase', 'functions', 'lib');
if (fs.existsSync(functionsLibDir)) {
  // Handle all compiled JS files recursively
  const processDirectory = (directory) => {
    fs.readdirSync(directory, { withFileTypes: true }).forEach(entry => {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        replaceImports(fullPath, emptyModulePath);
      }
    });
  };
  
  processDirectory(functionsLibDir);
}

// Handle the client-side Firebase service file
const firebaseFunctionsService = path.join(__dirname, 'app', 'services', 'firebase-functions.ts');
replaceImports(firebaseFunctionsService, emptyModulePath);

console.log('Firebase Functions successfully excluded from client bundle.');
