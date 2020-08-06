const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'pedrapapeltesoura',
  aliases: ['ppt', 'jokenpo'],
  description: 'Joga pedra papel ou tesoura',
  usage: '<pedra | papel | tesoura>',
  category: 'Jogos',
  cooldown: 3,
  args: true,
  telegram: true,
  async execute(_, message, _args) {
    let args = _args[0].toLowerCase();
    if (args !== 'pedra' && args !== 'papel' && args !== 'tesoura') {
      return message.reply('digite um objeto válido!');
    }

    args === 'pedra' ? args = 0
      : (args === 'papel' ? args = 1 : args = 2);

    const play = Math.floor(Math.random() * 3);
    let result = 0;

    // 0 pedra / 1 papel / 2 tesoura
    // 0 empate / 1 perdeu / 2 ganhou
    if (play === args) result = 0;
    else if (play === 0 && args === 2) result = 1;
    else if (play === 1 && args === 0) result = 1;
    else if (play === 2 && args === 1) result = 1;
    else if (args === 0 && play === 2) result = 2;
    else if (args === 1 && play === 0) result = 2;
    else if (args === 2 && play === 1) result = 2;

    let finalMsg;

    if (result === 0) finalMsg = 'Empate!!!';
    else if (result === 1) finalMsg = 'Perdeu!!';
    else if (result === 2) finalMsg = 'Ganhou!!!';

    const playString = play === 0 ? 'pedra'
      : (play === 1 ? 'papel' : 'tesoura');

    const embed = new MessageEmbed()
      .setColor('#de3025')
      .setTitle('Pedra, papel ou tesoura')
      .addField(`${finalMsg}`, `Você jogou ${_args[0]} e eu ${playString}`)
      .setFooter(`Desafio por ${message.member.user.tag}`)
      .setThumbnail('https://imgur.com/osWR1ji.gif')
      .setTimestamp();

    message.channel.send(embed);
  },
  async execute_telegram(bot, msg, _args) {
    let args = _args[0].toLowerCase();
    if (args !== 'pedra' && args !== 'papel' && args !== 'tesoura') {
      return bot.sendMessage(msg.chat.id, 'Digite um objeto válido!', { reply_to_message_id: msg.message_id });
    }

    args === 'pedra' ? args = 0
      : (args === 'papel' ? args = 1 : args = 2);

    const play = Math.floor(Math.random() * 3);
    let result = 0;

    // 0 pedra / 1 papel / 2 tesoura
    // 0 empate / 1 perdeu / 2 ganhou
    if (play === args) result = 0;
    else if (play === 0 && args === 2) result = 1;
    else if (play === 1 && args === 0) result = 1;
    else if (play === 2 && args === 1) result = 1;
    else if (args === 0 && play === 2) result = 2;
    else if (args === 1 && play === 0) result = 2;
    else if (args === 2 && play === 1) result = 2;

    let finalMsg;

    if (result === 0) finalMsg = '*Empate*';
    else if (result === 1) finalMsg = '*Perdeu*';
    else if (result === 2) finalMsg = '*Ganhou*';

    const playString = play === 0 ? 'pedra'
      : (play === 1 ? 'papel' : 'tesoura');

    bot.sendMessage(
      msg.chat.id,
      `${finalMsg}!!\nVocê jogou *${_args[0]}* e eu *${playString}*`,
      {
        reply_to_message_id: msg.message_id,
        parse_mode: 'Markdown',
      },
    );
  },
};
