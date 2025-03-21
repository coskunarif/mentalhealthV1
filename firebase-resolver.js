const fs = require('fs');
const path = require('path');

function setupReactNativeAuth() {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  const firebasePath = path.join(nodeModulesPath, 'firebase');
  const authPath = path.join(firebasePath, 'auth');
  const rnPath = path.join(authPath, 'react-native');

  // Ensure directories exist
  if (!fs.existsSync(authPath)) {
    fs.mkdirSync(authPath, { recursive: true });
  }
  
  if (!fs.existsSync(rnPath)) {
    fs.mkdirSync(rnPath, { recursive: true });
    
    // Create package.json pointing to @firebase/auth
    fs.writeFileSync(
      path.join(rnPath, 'package.json'),
      JSON.stringify({
        name: "firebase-auth-rn-resolver",
        main: "../../../@firebase/auth/dist/rn/index.js"
      }, null, 2)
    );
    
    // Create index.js that re-exports
    fs.writeFileSync(
      path.join(rnPath, 'index.js'),
      `module.exports = require('@firebase/auth/dist/rn');`
    );
    
    console.log('Created resolver for firebase/auth/react-native');
  }
}

setupReactNativeAuth();
