# Muzify

Muzify is a React + Firebase-ready music player built with Vite and Tailwind CSS. It combines free music APIs so you can search previews, open artist pages, save likes and playlists, and keep listening with live radio when preview clips end.

## What makes it different

The standout feature is `Blend Journey`.

Instead of only queuing songs, Muzify lets you enter two artists or moods and creates a bridge playlist between them. It tries to move from the starting sound toward the destination sound with a smoother listening arc, then lets you save that journey into your library.

## APIs used

- iTunes Search API for song previews and artwork
- MusicBrainz for artist metadata and tags
- Radio Browser for live radio stations

## Firebase setup

Muzify works without Firebase by falling back to local storage, but cloud sync is enabled when these Vite env variables are present:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Create a `.env` file with those values, then run:

```bash
npm install
npm run dev
```

## Included library features

- Search songs, artists, and stations
- Artist deep-dive pages
- Likes, history, and playlists
- Firebase-ready persistence with local fallback
- Live radio playback
- Blend Journey generation and saving
