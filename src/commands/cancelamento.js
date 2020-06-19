const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'cancelamento',
  aliases: ['cancela'],
  description: 'Cancela alguém por motivos de ...',
  usage: '<@alvo>',
  cooldown: 5,
  args: true,
  async execute(_, message, args) {
    let embed;

    const target = message.mentions.users.first().username;

    console.log(args);

    const messages = [
      'fã da manu gavassi',
      'bonito demais',
      'nao bebeu agua hoje',
      'é hetero',
    ];

    const id = Math.floor(Math.random() * messages.length);

    if (args.length === 1) {
      embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('📣 CANCELAMENTO!!')
        .setDescription(`Então manxss, **${target}** está sendo cancelado por motivos de:\n${messages[id]}`)
        .setThumbnail('https://uploads.metropoles.com/wp-content/uploads/2020/02/21171037/cancelamento-1.gif')
        .setTimestamp();
    } else {
      const msg = args.slice(1);
      embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('📣 CANCELAMENTO!!')
        .setDescription(`Então manxss, **${target}** está sendo cancelado por motivos de:\n${msg.join(' ')}`)
        .setThumbnail('https://uploads.metropoles.com/wp-content/uploads/2020/02/21171037/cancelamento-1.gif')
        .setTimestamp();
    }

    message.channel.send(embed).then((msg) => {
      msg.react('😠');
    });
  },
};
