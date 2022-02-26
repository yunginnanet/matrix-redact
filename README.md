# [matrix-redact](https://codeberg.org/video-prize-ranch/matrix-redact) (fork)
Redact all your Matrix events in a room.
> ⚠️ This will put a lot of load on your homeserver, it's probably not be a good idea to run this on large rooms or on public homeservers.

Currently only redacts messages and images but other event types can be added easily.

## Usage
Install `node_modules`
```
[npm/pnpm/yarn] install
```

Edit `config.json` with your credentials.
```
cp config.example.json config.json
[your favorite text editor] config.json
```
You can find the base URL by going to `https://your-homeserver.tld/.well-known/matrix/client` and the access token can be found in Settings > Help & About on Element.

```
node . -r "INTERNAL_ROOM_ID"
```
The internal room ID can be found by clicking on the room name then Settings > Advanced
