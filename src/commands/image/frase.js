const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'frase',
  aliases: ['frase', 'cita'],
  description: 'Faz uma citação de Albert Einsten',
  usage: '<frase>',
  category: 'Imagem',
  cooldown: 10,
  args: true,
  async execute(_, message, args) {
    const backgrounds = [
      'https://i.ibb.co/Wsdcd2x/berti.png',
      'https://i.ibb.co/B3f3gJW/philo.png',
      'https://i.ibb.co/9gkQy9N/chaves.png',
      'https://i.ibb.co/k5qJ2LD/edukof.png',
      'https://i.ibb.co/fv7bNw8/tony-stark.png',
      'https://i.ibb.co/yYfCNDJ/dilma.png',
      'https://i.ibb.co/CWtnVvt/holt.png',
      'https://i.ibb.co/0jfQbxp/gilbala.png',
    ];

    const index = Math.floor(Math.random() * backgrounds.length);

    const bg = await fetch(backgrounds[index]);
    const bgBuffer = await bg.buffer();

    const target = message.mentions.members.first();

    if (!target) {
      const img = new Canvas(600, 315)
        .addImage(bgBuffer, 0, 0, 600, 315)
        .setTextSize(30)
        .setColor('#fff')
        .addWrappedText(`— ${args.join(' ')}`, 30, 80, 300)
        .toBuffer();

      message.channel.send({ files: [img] }).catch((err) => {
        console.log(err);
        message.reply('não consegui fazer esta imagem');
      });

      return;
    }

    const avatarURL = target.user.avatarURL({ format: 'jpg' });

    const avatar = await fetch(avatarURL || 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png');

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

    message.channel.send({ files: [img] }).catch((err) => {
      console.log(err);
      message.reply('não consegui fazer esta imagem');
    });
  },
};
