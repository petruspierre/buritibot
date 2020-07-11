const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'frase',
  aliases: ['frase', 'cita'],
  description: 'Faz uma citação de Albert Einsten',
  usage: '<frase>',
  cooldown: 10,
  args: true,
  async execute(_, message, args) {
    const backgrounds = [
      'https://i.ibb.co/Wsdcd2x/berti.png',
      'https://i.ibb.co/B3f3gJW/philo.png',
      'https://i.ibb.co/9gkQy9N/chaves.png',
      'https://i.ibb.co/k5qJ2LD/edukof.png',
    ];

    const index = Math.floor(Math.random() * backgrounds.length);

    const bg = await fetch(backgrounds[index]);
    const bgBuffer = await bg.buffer();

    message.channel.send('Carregando...');
    const target = message.mentions.members.first();

    if (!target) {
      const img = new Canvas(600, 315)
        .addImage(bgBuffer, 0, 0, 600, 315)
        .setTextSize(30)
        .setColor('#fff')
        .addWrappedText(`— ${args.join(' ')}`, 30, 80, 300)
        .toBuffer();

      message.channel.bulkDelete(2);

      message.channel.send({ files: [img] }).catch((err) => {
        console.log(err);
        message.reply('não consegui fazer esta imagem');
      });

      return;
    }

    const avatar = await fetch(target.user.avatarURL({ format: 'jpg' }));

    const newBg = await fetch('https://i.ibb.co/vDS4vbH/blank.png');
    const newBgBuffered = await newBg.buffer();

    const img = new Canvas(600, 315)
      .addImage(newBgBuffered, 0, 0, 600, 315)
      .addCircularImage(await avatar.buffer(), 480, 150, 80)
      .setColor('#fff')
      .setTextSize(24)
      .addText(target.user.username, 30, 255, 100)
      .setTextSize(30)
      .addWrappedText(`— ${args.slice(1).join(' ')}`, 30, 80, 300)
      .toBuffer();

    message.channel.bulkDelete(2);

    message.channel.send({ files: [img] }).catch((err) => {
      console.log(err);
      message.reply('não consegui fazer esta imagem');
    });
  },
};
