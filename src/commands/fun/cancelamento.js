const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'cancelamento',
  aliases: ['cancela'],
  description: 'Cancela alguém por motivos de ...',
  usage: '<@alvo> [motivo]',
  category: 'Diversão',
  cooldown: 5,
  args: true,
  async execute(_, message, args) {
    let embed;

    const target = message.mentions.users.first();

    const messages = [
      'fã da manu gavassi',
      'bonitx demais',
      'não bebeu água hoje',
      'é hetero',
      'não tomou banho hoje',
      'gado d++',
    ];

    const id = Math.floor(Math.random() * messages.length);

    if (args.length === 1) {
      embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('📣 CANCELAMENTO!!')
        .setDescription(`Então manxss, **${target}** está sendo canceladx por motivos de:\n${messages[id]}`)
        .setThumbnail('https://uploads.metropoles.com/wp-content/uploads/2020/02/21171037/cancelamento-1.gif')
        .setTimestamp();
    } else {
      const msg = args.slice(1);
      embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('📣 CANCELAMENTO!!')
        .setDescription(`Então manxss, **${target}** está sendo canceladx por motivos de:\n${msg.join(' ')}`)
        .setThumbnail('https://uploads.metropoles.com/wp-content/uploads/2020/02/21171037/cancelamento-1.gif')
        .setTimestamp();
    }

    message.channel.send(embed).then((msg) => {
      msg.react('😠');
    });
  },
};
