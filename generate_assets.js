const sharp = require('sharp');
const path = require('path');

async function createPlaceholderImage(width, height, text, outputPath) {
  const svgImage = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="white"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial"
        font-size="32"
        text-anchor="middle"
        dy=".3em"
        fill="black">${text}</text>
    </svg>
  `;

  await sharp(Buffer.from(svgImage))
    .resize(width, height)
    .png()
    .toFile(outputPath);
}

async function generateAssets() {
  try {
    // Generate placeholder images
    await createPlaceholderImage(1024, 1024, 'App Icon', path.join(__dirname, 'assets', 'icon.png'));
    await createPlaceholderImage(1024, 1024, 'Adaptive Icon', path.join(__dirname, 'assets', 'adaptive-icon.png'));
    await createPlaceholderImage(2048, 2048, 'Splash Screen', path.join(__dirname, 'assets', 'splash.png'));
    console.log('Assets generated successfully!');
  } catch (error) {
    console.error('Error generating assets:', error);
  }
}

generateAssets();
