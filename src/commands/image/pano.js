const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'pano',
  aliases: ['aiai'],
  description: 'Passa pano para alguém',
  usage: '[@usuário] <alguem | algo>',
  flags: ['-a', '-u'],
  category: 'Imagem',
  cooldown: 5,
  args: true,
  telegram: true,
  async execute(_, message, args) {
    const bg = await fetch('https://i.pinimg.com/736x/bd/1b/8a/bd1b8a5cf03ed3a414fe19b0312010a9.jpg');

    let suffix = 'e';

    if (args[args.length - 1] === '-a') {
      suffix = 'a';
      args.splice(args.length - 1, 1);
    } else if (args[args.length - 1] === '-u') {
      suffix = 'u';
      args.splice(args.length - 1, 1);
    }

    const target = message.mentions.members.first();

    if (!target) {
      const img = new Canvas(720, 521)
        .addImage(await bg.buffer(), 0, 0, 720, 521)
        .setTextSize(34)
        .setColor('#fff')
        .setTextAlign('center')
        .addResponsiveText(`aiai ess${suffix} ${args.join(' ')}`, 530, 300, 260)
        .toBuffer();

      message.channel.send({ files: [img] }).catch((err) => {
        console.log(err);
        message.reply('não consegui fazer esta imagem');
      });

      return;
    }

    const avatarURL = target.user.avatarURL({ format: 'jpg' });

    const avatar = await fetch(avatarURL || 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png');

    const title = args.slice(1);

    const avatarBuffer = await avatar.buffer();

    const img = new Canvas(720, 521)
      .addImage(await bg.buffer(), 0, 0, 720, 521)
      .addCircularImage(avatarBuffer, 320, 150, 80)
      .setTextSize(34)
      .setColor('#fff')
      .setTextAlign('center')
      .addResponsiveText(`aiai ess${suffix} ${title.join(' ')}`, 530, 300, 260)
      .toBuffer();

    message.channel.send({ files: [img] }).catch((err) => {
      console.log(err);
      message.reply('não consegui fazer esta imagem');
    });
  },
  async execute_telegram(bot, msg, args) {
    const bg = await fetch('https://i.pinimg.com/736x/bd/1b/8a/bd1b8a5cf03ed3a414fe19b0312010a9.jpg');

    let suffix = 'e';

    if (args[args.length - 1] === '-a') {
      suffix = 'a';
      args.splice(args.length - 1, 1);
    } else if (args[args.length - 1] === '-u') {
      suffix = 'u';
      args.splice(args.length - 1, 1);
    }

    const img = new Canvas(720, 521)
      .addImage(await bg.buffer(), 0, 0, 720, 521)
      .setTextSize(34)
      .setColor('#fff')
      .setTextAlign('center')
      .addResponsiveText(`aiai ess${suffix} ${args.join(' ')}`, 530, 300, 260)
      .toBuffer();

    bot.sendPhoto(msg.chat.id, img).catch((err) => {
      bot.sendMessage(msg.chat.id, 'Não consegui fazer esta imagem');
    });
  },
};
