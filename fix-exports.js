const fs = require('fs');
const path = require('path');

// Get all tsx, ts, jsx, js files in the app directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      if (/\.(tsx|ts|jsx|js)$/.test(file) && !file.includes('.d.ts')) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Check if a file has a default export
function hasDefaultExport(content) {
  return content.includes('export default');
}

// Add default export based on file content and type
function addDefaultExport(filePath, content) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath);
  
  // Skip certain utility files
  if (fileName.includes('.d.ts') || fileName.includes('types.ts')) {
    return content;
  }
  
  // Check if it's a component file
  const isComponent = /[A-Z][a-zA-Z0-9]*\.(tsx|jsx)$/.test(fileName);
  const isRoute = filePath.includes('app/auth/') || filePath.includes('app/tabs/') || 
                  filePath.includes('app/legal/') || filePath === 'app/index.tsx' || 
                  filePath === 'app/survey.tsx' || filePath === 'app/mood.tsx' || 
                  filePath === 'app/player.tsx';
  
  // Already has a default export
  if (hasDefaultExport(content)) {
    return content;
  }
  
  // Find potential export to make default
  let defaultExport = '';
  
  if (isComponent || isRoute) {
    // For component files, find a function or const that seems to be the component
    const matches = content.match(/export (?:function|const) ([A-Z][a-zA-Z0-9]*)/);
    if (matches && matches[1]) {
      defaultExport = `\n\nexport default ${matches[1]};\n`;
    } else {
      // Fallback for components
      defaultExport = '\n\nexport default function Component() { return null; };\n';
    }
  } else if (content.includes('export class')) {
    // For class exports
    const matches = content.match(/export class ([A-Z][a-zA-Z0-9]*)/);
    if (matches && matches[1]) {
      defaultExport = `\n\nexport default ${matches[1]};\n`;
    }
  } else if (ext === '.ts' || ext === '.js') {
    // For utility files
    defaultExport = '\n\nexport default {};\n';
  } else {
    // Generic fallback
    defaultExport = '\n\nexport default {};\n';
  }
  
  return content + defaultExport;
}

// Process all files in the app directory
const appDir = path.join(__dirname, 'app');
const allFiles = getAllFiles(appDir);

let fixedCount = 0;

allFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const modifiedContent = addDefaultExport(filePath, content);
    
    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent);
      console.log(`Added default export to: ${filePath}`);
      fixedCount++;
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
});

console.log(`Fixed ${fixedCount} files.`);
