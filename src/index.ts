import { SpotifyAuthorizationStrategy } from './auth/spotify-authorization-strategy.js';
import { SpotifyClient, State } from './client/client.js';

const client = new SpotifyClient({
  authorizationStrategy: new SpotifyAuthorizationStrategy(process.env.SPOTIFY_COOKIE!),
});

client.on('stateChanged', (s) => {
  console.log(`state = ${State[s]}`)
})

client.on('playerVolumeChanged', (n, old) => {
  console.log('playerVolumeChanged', n);
});

client.on('playerRepeatChanged', (n, old) => {
  console.log('playerRepeatChanged', n);
});

client.on('playerShuffleChanged', (n) => {
  console.log('playerShuffleChanged', n);
});

client.on('playerIsPlayingChanged', (n) => {
  console.log('playerIsPlayingChanged', n);
});

client.on('playerItemChanged', (n, o) => {
  console.log('playerItemChanged', {
    name: n.name,
    artists: n.artists.map(a => a.name)
  });
});

client.on('playerDeviceChanged', (d, o) => {
  console.log('playerDeviceChanged', d);
})

// client.on('playerProgressChanged', progress => {
//   console.log('playerProgressChanged', `${Math.floor(progress / 1000)}s`);
// });

client.on('playlistItemAdded', (playlistURI, item) => {
  console.log('playlistItemAdded', { playlistURI, item });
})

client.on('playlistItemRemoved', (playlistURI, item) => {
  console.log('playlistItemRemoved', { playlistURI, item });
})

client.on('playlistItemMoved', (playlistURI, item) => {
  console.log('playlistItemMoved', { playlistURI, from: item.fromIndex, to: item.toIndex });
})


// client.on('playerVolumeChanged', (n, old) => {
//   console.log('playerVolumeChanged', n, old);
// });


// client.on('playerStateChangedRaw', ({ item }) => {
//   console.log(item.artists.map(a => a.name), item.name);
// });

// client.on('deviceStateChangedRaw', (n, old) => {
//   console.log(n);
//   console.log(old);
// });

await client.connect();
