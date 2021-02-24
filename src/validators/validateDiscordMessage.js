import Discord from 'discord.js';

function validateDiscordMessage(message, client, cooldowns, databaseGuild) {
  const { prefix, defaultCooldown, alertCommandDontExist } = databaseGuild;

  if (!message.content.startsWith(prefix) || message.author.bot) return false;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) {
    if (alertCommandDontExist) {
      message.reply('não entendi, tem certeza que esse comando existe?');
    }
    return false;
  }

  if (command.disabled) {
    message.reply('esse comando está temporariamente desativado :(');
    return false;
  }

  if (command.args && !args.length) {
    let reply = 'preciso de mais informações para executar esse comando!';

    if (command.usage) {
      reply += `\nA maneira correta é: \`${prefix}${command.name} ${command.usage}\``;
    }
    message.reply(reply);

    return false;
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    message.reply('não realizo esse comando na DM, use em um servidor!');
    return false;
  }

  if (command.dmOnly && message.channel.type !== 'dm') {
    message.reply('não realizo esse comando em um servidor, use a DM!');
    return false;
  }

  if (command.permissions && message.channel.type !== 'dm') {
    const author = message.guild.members.cache.get(message.author.id);
    if (!(author.hasPermission(command.permissions))) {
      message.reply('você não tem permissão para realizar este comando');
      return false;
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
      message.reply(`por favor aguarde ${timeLeft.toFixed(1)} segundos antes de tentar o comando \`${command.name}\` novamente.`);
      return false;
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  return true;
}

export default validateDiscordMessage;
