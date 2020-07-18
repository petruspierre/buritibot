const Font = require('ascii-art-font');

module.exports = {
  name: 'titulo',
  aliases: ['banner', 'ascii'],
  description: 'Cria um título em ascii de até 6 caracteres',
  usage: '<titulo>',
  category: 'Diversão',
  cooldown: 5,
  disabled: true,
  args: true,
  async execute(_, message, args) {
    const title = args.join(' ');
    if (title.length > 6) return message.reply('digite um titulo de até 6 caracteres');

    Font.write(args.join(' '), 'Doom', (rendered) => {
      message.channel.send(`\`${rendered}\``);
    });
  },
};
