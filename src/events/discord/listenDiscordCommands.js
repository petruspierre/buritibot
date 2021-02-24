import Discord from 'discord.js';

import validateDiscordMessage from '../../validators/validateDiscordMessage';
import GuildController from '../../controllers/GuildController';
import { guildCamelCase } from '../../serializers/guild';

const queue = new Map();
const bingo = new Map();
const cooldowns = new Discord.Collection();

function listenDiscordCommands(client, youtube) {
  client.on('message', async (message) => {
    if (message.channel.type !== 'text') {
      message.reply('No momento respondendo a comandos apenas em servidores!');
    }

    const databaseGuild = guildCamelCase(await GuildController.show(message.guild.id));

    if (!validateDiscordMessage(message, client, cooldowns, databaseGuild)) return;

    const { prefix, musicChannel } = databaseGuild;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
      || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    try {
      if (command.category === 'Música') {
        const channel = message.guild.channels.cache.find(
          (ch) => ch.id === musicChannel || ch.name === musicChannel,
        );

        if (channel) {
          if (message.channel.name !== channel.name) return message.reply(`Por favor utilize o canal ${channel}`);
        }

        const serverQueue = queue.get(message.guild.id);
        command.execute(client, message, args, serverQueue, queue, youtube);
      } else if (command.name === 'bingo') {
        let serverBingo;
        if (message.channel.type !== 'dm') {
          serverBingo = bingo.get(message.guild.id);
        }
        // else {
        //   serverBingo = bingo.get(serverID);
        // }
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
