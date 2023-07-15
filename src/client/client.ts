import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';

import commands from '@/client/commands';
import { I18n } from '@/i18n';
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

client.on('ready', async () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${client.user?.tag ?? ''}!`);

  const guilds = await client.guilds.fetch();
  await Promise.all(
    guilds.map(
      (guild) =>
        client.application?.commands.set(
          commands.map((command) => command.data),
          guild.id
        )
    )
  );
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  const target = commands.find((command) => command.name === commandName);

  if (!target) {
    await interaction.reply({
      content: I18n.t('en').common.internal_server_error(),
      ephemeral: false,
    });
    return;
  }

  await target.execute(interaction);
});

client.login(DISCORD_TOKEN).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
