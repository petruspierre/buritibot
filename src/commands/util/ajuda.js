const { MessageEmbed } = require('discord.js');
const { prefix, defaultCooldown } = require('../../../config.json');

module.exports = {
  name: 'ajuda',
  aliases: ['comandos', 'help'],
  description: 'Lista todos os comandos ou mostra mais informações sobre um específico.',
  usage: '[comando]',
  category: 'Util',
  cooldown: 3,
  execute(_, message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Aqui vai a lista de comandos:');

      let lastCategory = '';
      commands.forEach((command, index) => {
        if (lastCategory !== command.category) {
          lastCategory = command.category;
          data.push(`\nCategoria: **${lastCategory}**`);
        }
        data.push(`\`+${command.name}\` - ${command.description}`);
      });
      data.push(`\nVocê pode também usar \`${prefix}ajuda [comando]\` para obter informações de um comando específico`);

      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('te mandei a lista de comandos no privado');
        })
        .catch((error) => {
          message.reply('parece que não consigo enviar mensagem privada para você. Sua DM está desativada?');
        });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name)
      || commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('esse comando não existe!');
    }

    const embed = new MessageEmbed()
      .setColor('#ffe467')
      .setTitle(`Informação de comando - \`${command.name}\``)
      .addField('Como usar:', `\`${prefix}${command.name} ${command.usage}\``)

      .setDescription(command.description)
      .setFooter('<> indica campos obrigatórios e [] opcionais');

    if (command.cooldown) {
      embed.addField('Intervalo de uso:', `**${command.cooldown}** segundos`);
    }
    if (command.aliases) {
      embed.addField('Sinônimos:', `\`+${(command.aliases).join('`, +`')}\``);
    }
    if (command.flags) {
      embed.addField('Flags:', `\`${(command.flags).join('`, `')}\`\nPara usar as flags, insira no **final** do comando!`);
    }

    message.channel.send(embed);
  },
};
