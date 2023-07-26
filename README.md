<div align="center">
<samp>

# Orgel-Si-Node

## Bot for Discord to play Youtube on voice channel

</samp>
</div>

## Requirements

- Node.js
- PNPM
- Docker
- Docker Compose

## Environment Variables

```.env
API_ENDPOINT=http://127.0.0.1:3000
DISCORD_TOKEN=<YOUR_DISCORD_API_TOKEN>
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

## Usage

```bash
cd orgel-si-node
```

```bash
pnpm install
```

```bash
docker compose up -d --build
```

```bash
pnpm dlx prisma migrate deploy
```

```bash
pnpm build
```

```bash
pnpm start
```

## Commands

### `setting`

#### `language`

Change the language of Orgel.

arguments:

| name     | value        | description       | required |
| :------- | :----------- | :---------------- | :------- |
| language | `en` or `ja` | Language of Orgel | true     |

### `play`

Play a video on the voice channel.

arguments:

| name      | value   | description                                           | required |
| :-------- | :------ | :---------------------------------------------------- | :------- |
| video_url | string  | YouTube URL                                           | true     |
| interrupt | boolean | If enabled, a video is added to the head of the queue | false    |

### `skip`

Skip the current video.

### `resume`

Resumes playback when Orgel leaves the voice channel in the middle of a playback, for example.

### `history`

Show the history of the video played.

arguments:

| name  | value | description                | required |
| :---- | :---- | :------------------------- | :------- |
| limit | int   | Number of items to display | false    |

### `queue`

Show the queue of videos to play. (Max. 10 videos)

## Issues

If you find a bug or problem, please open an issue!:bug:

## Author

- Github: [airRnot1106](https://github.com/airRnot1106)
- Misskey: [@bot](https://misskey.dev/@bot)

## LICENSE

MIT
