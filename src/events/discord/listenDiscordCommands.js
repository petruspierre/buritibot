import Discord from 'discord.js';

import validateDiscordMessage from '../../validators/validateDiscordMessage';
import { prefix, serverID } from '../../../config.json';

const queue = new Map();
const bingo = new Map();
const cooldowns = new Discord.Collection();

function listenDiscordCommands(client, youtube) {
  client.on('message', async (message) => {
    if (!validateDiscordMessage(message, client, cooldowns)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
      || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    try {
      if (command.category === 'Música') {
        const channel = message.guild.channels.cache.find((ch) => ch.name === '🎶bot-de-musica');
        if (!channel) return message.reply('Por favor crie o canal `🎶bot-de-musica`');
        if (message.channel.name !== '🎶bot-de-musica') return message.reply(`Por favor utilize o canal ${channel}`);

        const serverQueue = queue.get(message.guild.id);
        command.execute(client, message, args, serverQueue, queue, youtube);
      } else if (command.name === 'bingo') {
        let serverBingo;
        if (message.channel.type !== 'dm') {
          serverBingo = bingo.get(message.guild.id);
        } else {
          serverBingo = bingo.get(serverID);
        }
        command.execute(client, message, args, serverBingo, bingo);
      } else {
        command.execute(client, message, args);
      }
    } catch (error) {
      console.error(error);
      message.reply('ocorreu um erro ao tentar executar esse comando');
    }
  });
}

export default listenDiscordCommands;
