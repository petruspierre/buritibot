const { prefix, defaultCooldown } = require('../../config.json');

module.exports = {
  name: 'ajuda',
  aliases: ['comandos', 'help'],
  description: 'Lista todos os comandos ou mostra mais informações sobre um específico.',
  usage: '[comando]',
  cooldown: 10,
  execute(_, message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Aqui vai a lista de comandos:\n');
      data.push(commands.map((command) => `\`+${command.name}\` - ${command.description}`).join('\n'));
      data.push(`\nVocê pode também usar \`${prefix}ajuda [comando]\` para obter informações de um comando específico`);

      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('te mandei a lista de comandos no privado');
        })
        .catch((error) => {
          console.error(`Erro ao enviar DM para ${message.author.tag}.\n`, error);
          message.reply('Parece que não consigo enviar mensagem privada para você. Sua DM está desativada?');
        });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name)
      || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('esse comando não existe!');
    }

    data.push(`**Nome:** ${command.name}`);

    if (command.aliases) data.push(`**Sinônimos:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Descrição:** ${command.description}`);
    if (command.usage) data.push(`**Uso:** \`${prefix}${command.name} ${command.usage}\``);

    data.push(`**Cooldown:** ${command.cooldown || defaultCooldown} segundos`);

    message.channel.send(data, { split: true });
  },
};
