const Font = require('ascii-art-font');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'titulo',
  aliases: ['banner', 'ascii'],
  description: 'Cria um título em ascii de até 6 caracteres',
  usage: '<titulo>',
  cooldown: 5,
  args: true,
  async execute(_, message, args) {
    const title = args.join(' ');
    if (title.length > 6) return message.reply('digite um titulo de até 6 caracteres');

    Font.write(args.join(' '), 'Doom', (rendered) => {
      message.channel.send(`\`${rendered}\``);
    });
  },
};
