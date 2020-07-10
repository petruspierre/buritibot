const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'morrepraga',
  aliases: ['morre', 'praga'],
  description: 'Cria uma imagem morre praga com o avatar ou o nome da pessoa ou imagem da internet',
  usage: '<@usuario> ou <nome> ou <link para imagem>',
  cooldown: 10,
  args: true,
  async execute(_, message, args) {
    const bg = await fetch('https://pbs.twimg.com/media/EWI1_WkWkAEcgul.jpg');

    let target = message.mentions.members.first();

    if (!target) {
      target = args[0];
      message.channel.send('Carregando...');

      if (target.includes('https://') || target.includes('http://')) {
        const avatar = await fetch(args[0]);
        const img = new Canvas(1080, 649)
          .addImage(await bg.buffer(), 0, 0, 1080, 649)
          .addCircularImage(await avatar.buffer(), 270, 330, 120)
          .toBuffer();

        message.channel.bulkDelete(2);
        message.channel.send({ files: [img] }).catch((err) => {
          console.log(err);
          message.reply('não consegui fazer esta imagem');
        });

        return;
      }
      const img = new Canvas(1080, 649)
        .addImage(await bg.buffer(), 0, 0, 1080, 649)
        .setColor('#000000')
        .setTextSize(46)
        .addText(target, 200, 335, 150)
        .toBuffer();

      message.channel.bulkDelete(2);
      message.channel.send({ files: [img] }).catch((err) => {
        console.log(err);
        message.reply('não consegui fazer esta imagem');
      });

      return;
    }
    const avatar = await fetch(target.user.avatarURL({ format: 'jpg' }));

    message.channel.send('Carregando...');

    const img = new Canvas(1080, 649)
      .addImage(await bg.buffer(), 0, 0, 1080, 649)
      .addCircularImage(await avatar.buffer(), 280, 330, 100)
      .setTextSize(30)
      .addText(target.user.username, 230, 460, 120)
      .toBuffer();

    message.channel.bulkDelete(2);

    message.channel.send({ files: [img] }).catch((err) => {
      console.log(err);
      message.reply('não consegui fazer esta imagem');
    });
  },
};
