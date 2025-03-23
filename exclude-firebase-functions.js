// In your exclude-firebase-functions.js script, add these lines to the replacement patterns:

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
    'firebase-functions/v2/logger': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js'),
    'firebase-admin': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js'),
    'firebase-admin/messaging': path.resolve(__dirname, 'app/lib/utils/empty-firebase-functions.js')
  }
};
`;
  fs.writeFileSync(moduleMapPath, content);
  console.log(`Created module map resolver at ${moduleMapPath}`);
};

// Also update the replaceImports function to handle firebase-admin imports:
const replaceImports = (filePath, emptyModulePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all kinds of Firebase Functions imports
    const importPatterns = [
      /require\(['"]firebase-functions(?:\/v1|\/v2)?(?:\/[a-zA-Z]+)?['"]\)/g,
      /from ['"]firebase-functions(?:\/v1|\/v2)?(?:\/[a-zA-Z]+)?['"]/g,
      /require\(['"]firebase-admin(?:\/[a-zA-Z]+)?['"]\)/g,
      /from ['"]firebase-admin(?:\/[a-zA-Z]+)?['"]/g
    ];
    
    importPatterns.forEach(pattern => {
      content = content.replace(pattern, `require("${emptyModulePath.replace(/\\/g, '\\\\')}")`);
    });

    fs.writeFileSync(filePath, content);
    console.log(`Replaced Firebase imports in ${filePath}`);
  }
};
