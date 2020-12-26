import fs from 'fs';
import { resolve } from 'path';
import Discord from 'discord.js';
import TelegramBot from 'node-telegram-bot-api';

import listenEvents from './events';

require('dotenv').config();

const telegramBot = new TelegramBot(process.env.TELEGRAM_KEY, { polling: true });
const discordClient = new Discord.Client();
discordClient.commands = new Discord.Collection();

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

listenEvents(discordClient, telegramBot);

discordClient.login(process.env.TOKEN);
