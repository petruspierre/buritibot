const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'pano',
  aliases: ['aiai'],
  description: 'Cria uma imagem o chão é... com a imagem de alguém',
  usage: '<@usuario> <chão>',
  cooldown: 5,
  args: true,
  async execute(_, message, args) {
    const bg = await fetch('https://i.pinimg.com/736x/bd/1b/8a/bd1b8a5cf03ed3a414fe19b0312010a9.jpg');

    message.channel.send('Carregando...');

    const img = new Canvas(720, 521)
      .addImage(await bg.buffer(), 0, 0, 720, 521)
      .setTextSize(34)
      .setColor('#fff')
      .setTextAlign('center')
      .addResponsiveText(`aiai esse ${args.join(' ')}`, 530, 300, 260)
      .toBuffer();

    message.channel.bulkDelete(1);

    message.channel.send({ files: [img] }).catch((err) => {
      console.log(err);
      message.reply('não consegui fazer esta imagem');
    });
  },
};
