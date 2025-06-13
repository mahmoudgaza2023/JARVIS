import * as PlayHT from 'playht';
import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

// Ensure required environment variables are set
if (!process.env.PLAYHT_USER_ID || !process.env.PLAYHT_API_KEY) {
  throw new Error('PLAYHT_USER_ID and PLAYHT_API_KEY must be set in your environment variables.');
}
// Initialize client
PlayHT.init({
  userId: process.env.PLAYHT_USER_ID,
  apiKey: process.env.PLAYHT_API_KEY,
});

async function streamAudio(text: string) {
  // The text to generate audio for
  const stream = await PlayHT.stream(text, {
    voiceEngine: 'PlayDialog',
  });

  // Pipe the stream to a file
  const fileStream = fs.createWriteStream('output.mp3');
  stream.pipe(fileStream);

  // Return a promise that resolves when the stream is finished
  return new Promise<void>((resolve, reject) => {
    stream.on('error', reject); // Handle errors from the source stream
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });
}

// Call the function
streamAudio('All human wisdom is summed up in these two words: Wait and hope.')
  .then(() => {
    console.log('Audio streaming finished.');
  })
  .catch((error) => {
    console.error('Error streaming audio:', error);
  });