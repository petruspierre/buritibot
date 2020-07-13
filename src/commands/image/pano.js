const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'pano',
  aliases: ['aiai'],
  description: 'Passa pano para alguém',
  usage: '<alguem | algo> ou <@usuario> <alguem | algo>',
  cooldown: 5,
  args: true,
  async execute(_, message, args) {
    const bg = await fetch('https://i.pinimg.com/736x/bd/1b/8a/bd1b8a5cf03ed3a414fe19b0312010a9.jpg');

    const target = message.mentions.members.first();

    if (!target) {
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

      return;
    }

    const avatarURL = target.user.avatarURL({ format: 'jpg' });

    const avatar = await fetch(avatarURL || 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png');

    message.channel.send('Carregando...');

    const title = args.slice(1);

    const avatarBuffer = await avatar.buffer();

    const img = new Canvas(720, 521)
      .addImage(await bg.buffer(), 0, 0, 720, 521)
      .addCircularImage(avatarBuffer, 320, 150, 80)
      .setTextSize(34)
      .setColor('#fff')
      .setTextAlign('center')
      .addResponsiveText(`aiai esse ${title.join(' ')}`, 530, 300, 260)
      .toBuffer();

    message.channel.bulkDelete(1);

    message.channel.send({ files: [img] }).catch((err) => {
      console.log(err);
      message.reply('não consegui fazer esta imagem');
    });
  },
};
