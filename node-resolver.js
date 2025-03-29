const fs = require('fs');
const path = require('path');

function createSymlink(target) {
  const source = path.join('node_modules', target);
  const destination = path.join(__dirname, 'firebase', 'functions', target);

  try {
    fs.symlinkSync(source, destination, 'file');
    console.log(`Symlink created: ${destination} -> ${source}`);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error(`Error creating symlink for ${target}:`, error);
    } else {
      console.log(`Symlink already exists: ${destination}`);
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  createSymlink('firebase-functions/index.js');
  createSymlink('firebase-functions/v2/index.js');
  createSymlink('firebase-functions/v2/scheduler.js');
  createSymlink('firebase-admin/index.js');
}
