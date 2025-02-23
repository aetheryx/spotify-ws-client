import { SpotifyAuthorizationStrategy } from './auth/spotify-authorization-strategy.js';
import { SpotifyClient } from './client/client.js';

const client = new SpotifyClient({
  authorizationStrategy: new SpotifyAuthorizationStrategy(process.env.SPOTIFY_COOKIE!),
});

client.socket.on('stateChanged', (s) => {
  console.log(`state = ${s}`)
});

// client.socket.on('event', e => {
//   console.log('event', e);
// })

client.player.on('volumeChanged', d => {
  console.log('volumeChanged', d);
});
client.player.on('shuffleChanged', d => {
  console.log('shuffleChanged', d);
});
client.player.on('repeatChanged', d => {
  console.log('repeatChanged', d);
});
client.player.on('isPlayingChanged', d => {
  console.log('isPlayingChanged', d);
});
client.player.on('itemChanged', d => {
  console.log('itemChanged', d);
});
client.player.on('progressChanged', d => {
  console.log('progressChanged', d);
});

client.playlists.on('likesMutation', d => {
  console.log('likesMutation', d);
});
client.playlists.on('playlistMutation', d => {
  console.log('playlistMutation', d);
});


await client.connect();
