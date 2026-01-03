# top songs

Display a list of an artist's top songs on Spotify

## setup

1. Clone this repo

```bash
git clone https://codeberg.org/luminousherbs/top-songs.git
```

2. Install [NodeJS](https://nodejs.org/en/download)

3. Sign up to [Spotify for Developers](https://developer.spotify.com/)

4. Create a [Spotify application](https://developer.spotify.com/dashboard/create) with permission to access the Web API

5. Copy your client ID and paste it into a new file at [`data/client-id`](data/client-id)

6. Copy your client secret and paste it into a new file at [`data/client-secret`](data/client-secret)

7. Create an empty file at [`data/access-token`](data/access-token)

8. Run the server

```bash
node serve
```

9. Visit [localhost:8000](http://localhost:8000)
