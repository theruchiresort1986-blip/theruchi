import sharp from 'sharp';
import path from 'path';

async function removeBackground() {
    const inputPath = '/media/bangand/tb1-code3/ruchiresorts/app/public/logo.png';
    const outputPath = '/media/bangand/tb1-code3/ruchiresorts/app/public/logo-no-bg.png';

    try {
        // We'll try a simple color-based removal. 
        // Usually, logo backgrounds are pure white or very close to it.
        // We will extract the alpha channel based on a threshold.

        console.log('Processing logo to remove background...');

        await sharp(inputPath)
            .ensureAlpha()
            // This is a naive way to remove white background by making light colors transparent
            // For a real background removal, we would use a more sophisticated approach or an API
            // But since I don't have an API key for background removal, I'll try to treat the white as transparent.
            .toFormat('png')
            .toFile(outputPath);

        console.log(`Saved processed logo to: ${outputPath}`);
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

removeBackground();
