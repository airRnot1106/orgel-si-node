import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';

import { envSchema } from '@/schema/env';

const { DISCORD_TOKEN } = envSchema.parse(process.env);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${client.user?.tag ?? ''}!`);
});

client.login(DISCORD_TOKEN).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
