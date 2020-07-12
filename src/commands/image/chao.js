const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'chao',
  aliases: ['lava', 'ochãoé'],
  description: 'Cria uma imagem o chão é... com a imagem de alguém',
  usage: '<@usuario> <chão>',
  cooldown: 10,
  args: true,
  async execute(_, message, args) {
    const bg = await fetch('https://i.ibb.co/pjvyJqc/lava.png');

    const target = message.mentions.members.first();

    const avatar = await fetch(target.user.avatarURL({ format: 'jpg' }));

    message.channel.send('Carregando...');

    const title = args.slice(1);

    const avatarBuffer = await avatar.buffer();

    const img = new Canvas(1024, 642)
      .addImage(await bg.buffer(), 0, 0, 1024, 642)
      .addCircularImage(avatarBuffer, 230, 150, 20)
      .addCircularImage(avatarBuffer, 720, 170, 35)
      .setTextSize(42)
      .addText(`- o chão é ${title.join(' ')}`, 45, 50, 600)
      .addText(`- ${target.user.username}:`, 45, 100, 600)
      .toBuffer();

    message.channel.bulkDelete(1);

    message.channel.send({ files: [img] }).catch((err) => {
      console.log(err);
      message.reply('não consegui fazer esta imagem');
    });
  },
};
