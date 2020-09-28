require('dotenv').config();
const fs = require('fs');
const { resolve } = require('path');
const Discord = require('discord.js');
const TelegramBot = require('node-telegram-bot-api');
const YouTube = require('youtube-node');

const { prefix, defaultCooldown } = require('../config.json');

const bot = new TelegramBot(process.env.TELEGRAM_KEY, { polling: true });
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

const youtube = new YouTube();
youtube.setKey(process.env.YOUTUBE_KEY);

const queue = new Map();
const bingo = new Map();

const commandDir = fs.readdirSync(resolve(__dirname, 'commands'));

for (const dir of commandDir) {
  const commandFiles = fs.readdirSync(resolve(__dirname, 'commands', dir)).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(resolve(__dirname, 'commands', dir, file));
    client.commands.set(command.name, command);
  }
}

client.once('ready', () => {
  console.log('-> Buriti online');
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return message.reply('não entendi, tem certeza que esse comando existe?');

  if (command.disabled) {
    return message.reply('esse comando está temporariamente desativado :(');
  }

  if (command.args && !args.length) {
    let reply = 'preciso de mais informações para executar esse comando!';

    if (command.usage) {
      reply += `\nA maneira correta é: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.reply(reply);
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('não realizo esse comando na DM, use em um servidor!');
  }

  if (command.dmOnly && message.channel.type !== 'dm') {
    return message.reply('não realizo esse comando em um servidor, use a DM!');
  }

  if (command.permissions) {
    const author = message.guild.members.cache.get(message.author.id);
    if (!(author.hasPermission(command.permissions))) {
      return message.reply('você não tem permissão para realizar este comando');
    }
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || defaultCooldown) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`por favor aguarde ${timeLeft.toFixed(1)} segundos antes de tentar o comando \`${command.name}\` novamente.`);
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    if (command.category === 'Música') {
      const channel = message.guild.channels.cache.find((ch) => ch.name === '🎶bot-de-musica');
      if (!channel) return message.reply('Por favor crie o canal `🎶bot-de-musica`');
      if (message.channel.name !== '🎶bot-de-musica') return message.reply(`Por favor utilize o canal ${channel}`);

      const serverQueue = queue.get(message.guild.id);
      command.execute(client, message, args, serverQueue, queue, youtube);
    } else if (command.name === 'bingo') {
      const serverBingo = bingo.get(message.guild.id);
      command.execute(client, message, args, serverBingo, bingo);
    } else {
      command.execute(client, message, args);
    }
  } catch (error) {
    console.error(error);
    message.reply('ocorreu um erro ao tentar executar esse comando');
  }
});

bot.on('message', async (msg) => {
  if (msg.text) {
    const content = msg.text.toLowerCase();
    if (!content.startsWith(prefix)) return;

    const args = content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
      || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return bot.sendMessage(msg.chat.id, 'Não entendi, tem certeza que esse comando existe?');

    if (!command.telegram) return bot.sendMessage(msg.chat.id, 'Desculpe, esse comando não está disponível para o Telegram');

    if (command.disabled) return bot.sendMessage(msg.chat.id, 'Desculpe, esse comando está desativado');

    if (command.args && !args.length) {
      let reply = 'Preciso de mais informações para executar esse comando!';

      if (command.usage) {
        reply += `\nA maneira correta é: \`\`\` ${prefix}${command.name} ${command.usage}\`\`\``;
      }

      return bot.sendMessage(msg.chat.id, reply, { parse_mode: 'Markdown' });
    }

    try {
      command.execute_telegram(bot, msg, args, client.commands);
    } catch (error) {
      console.error(error);
      bot.sendMessage(msg.chat.id, 'ocorreu um erro ao tentar executar esse comando');
    }
  }
});

function events() {
  client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.cache.find((ch) => ch.name === '🚪entradas-e-saidas');
    member.setNickname(`${(member.displayName).toUpperCase()} WTFF`);
    if (!channel) return;

    const cargoPrincipal = member.guild.roles.cache.find((role) => role.name === 'wonkru');
    member.roles.add(cargoPrincipal);

    channel.send(`Bem vindo ao ${member.guild.name}, ${member}\nBeba bastante água 🥛`);
  });

  client.on('guildMemberRemove', (member) => {
    const channel = member.guild.channels.cache.find((ch) => ch.name === '🚪entradas-e-saidas');
    if (!channel) return;

    channel.send(`${member.nickname} nos abandonou...`);
  });
}

events();

client.login(process.env.TOKEN);

module.exports = client;
