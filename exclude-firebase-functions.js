// exclude-firebase-functions.js
const fs = require('fs');
const path = require('path');

// Create a temporary file to replace Firebase Functions imports
const createEmptyModule = (directory) => {
  const emptyModulePath = path.join(directory, 'empty-firebase-functions.js');
  
  // Create more comprehensive mock implementations
  const emptyModuleContent = `
// This is a placeholder for Firebase Functions
// It prevents client-side bundling of server-side code
module.exports = {
  // Mock implementations for client-side
  https: {
    onCall: () => () => {},
  },
  region: () => ({}),
  auth: {
    user: () => ({ onCreate: () => {} }),
  },
  v2: {
    https: { onCall: () => () => {} },
    scheduler: { onSchedule: () => () => {} },
    logger: { info: () => {}, error: () => {} }
  },
  onSchedule: () => () => {},
  setGlobalOptions: () => {},
  // Add other mock implementations as needed
};
`;

  // Ensure directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFileSync(emptyModulePath, emptyModuleContent);
  return emptyModulePath;
};

// Replace Firebase Functions imports in the specific files
// Replace this in your exclude-firebase-functions.js file
const replaceImports = (filePath, emptyModulePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix: use correct replacement patterns for different import styles
    // Replace require statements
    content = content.replace(
      /require\(['"]firebase-functions(?:\/v1|\/v2)?(?:\/[a-zA-Z]+)?['"]\)/g,
      `require("${emptyModulePath.replace(/\\/g, '\\\\')}")`
    );
    
    // Replace ES6 import statements
    content = content.replace(
      /from ['"]firebase-functions(?:\/v1|\/v2)?(?:\/[a-zA-Z]+)?['"]/g,
      `from "${emptyModulePath.replace(/\\/g, '\\\\')}"`
    );

    fs.writeFileSync(filePath, content);
    console.log(`Replaced Firebase Functions imports in ${filePath}`);
  }
};

// Main execution
console.log('Excluding Firebase Functions from client bundle...');

// Create empty module
const utilsDir = path.join(__dirname, 'app', 'lib', 'utils');
const emptyModulePath = createEmptyModule(utilsDir);

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

// Create a module map resolver for Metro
const createModuleMapResolver = () => {
  const moduleMapPath = path.join(__dirname, 'metro.module-mapper.js');
  const content = `
// This file is auto-generated - do not modify
const path = require('path');

module.exports = {
  moduleMap: {
    'firebase-functions': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js'),
    'firebase-functions/v1': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js'),
    'firebase-functions/v2': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js'),
    'firebase-functions/v2/https': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js'),
    'firebase-functions/v2/scheduler': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js'),
    'firebase-functions/v2/logger': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js')
  }
};
`;
  fs.writeFileSync(moduleMapPath, content);
  console.log(`Created module map resolver at ${moduleMapPath}`);
};

createModuleMapResolver();

// Handle the client-side Firebase service file
const firebaseFunctionsService = path.join(__dirname, 'app', 'services', 'firebase-functions.ts');
replaceImports(firebaseFunctionsService, emptyModulePath);

console.log('Firebase Functions successfully excluded from client bundle.');
