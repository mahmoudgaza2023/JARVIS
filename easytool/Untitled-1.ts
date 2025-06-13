import * as PlayHT from 'playht';
import fs from 'fs';

// Initialize client
PlayHT.init({
  userId: '<BhNq6j9IUherUqiDzIwgIUFQWsO2>',
  apiKey: '<ak-ad31510598bc4de59c71193f22edbf72>',
});

async function streamAudio(text) {
  const stream = await PlayHT.stream('All human wisdom is summed up in these two words: Wait and hope.', { voiceEngine: 'PlayDialog' });
  stream.on('data', (chunk) => {
    // Do whatever you want with the stream, you could save it to a file, stream it in realtime to the browser or app, or to a telephony system
    fs.appendFileSync('output.mp3', chunk);
  });
  return stream;
}