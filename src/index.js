import './database';

import fs from 'fs';
import { resolve } from 'path';
import Discord from 'discord.js';
import TelegramBot from 'node-telegram-bot-api';
import YouTube from 'youtube-node';

import listenEvents from './events';

require('dotenv').config();

const intents = new Discord.Intents();
intents.add('GUILDS', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS', 'GUILD_EMOJIS');

const telegramBot = new TelegramBot(process.env.TELEGRAM_KEY, { polling: true });
const discordClient = new Discord.Client({ ws: { intents } });
discordClient.commands = new Discord.Collection();

const youtube = new YouTube();
youtube.setKey(process.env.YOUTUBE_KEY);

const commandDir = fs.readdirSync(resolve(__dirname, 'commands'));

for (const dir of commandDir) {
  const commandFiles = fs.readdirSync(resolve(__dirname, 'commands', dir)).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(resolve(__dirname, 'commands', dir, file));
    discordClient.commands.set(command.name, command);
  }
}

discordClient.once('ready', () => {
  console.log('-> Buriti online ✅');
});

listenEvents(discordClient, telegramBot, youtube);

discordClient.login(process.env.TOKEN);
