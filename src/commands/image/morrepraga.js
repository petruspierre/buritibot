const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');

module.exports = {
  name: 'morrepraga',
  aliases: ['morre', 'praga'],
  description: 'Cria uma imagem morre praga com o avatar ou o nome da pessoa ou imagem da internet',
  usage: '<@usuario> ou <nome> ou <link para imagem>',
  category: 'Imagem',
  cooldown: 5,
  telegram: true,
  args: true,
  async execute(_, message, args) {
    try {
      const bg = await fetch('https://i.ibb.co/PWpFskt/New-Project.png');

      let target = message.mentions.members.first();

      if (!target) {
        target = args.join(' ');

        if (target.includes('https://') || target.includes('http://')) {
          const avatar = await fetch(args[0]);
          const img = new Canvas(1080, 649)
            .addImage(await bg.buffer(), 0, 0, 1080, 649)
            .addCircularImage(await avatar.buffer(), 270, 330, 120)
            .toBuffer();

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
          .setTextAlign('center')
          .addResponsiveText(target, 260, 335, 360)
          .toBuffer();

        message.channel.send({ files: [img] }).catch((err) => {
          console.log(err);
          message.reply('não consegui fazer esta imagem');
        });

        return;
      }

      const avatarURL = target.user.avatarURL({ format: 'jpg' });

      const avatar = await fetch(avatarURL || 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png');

      const img = new Canvas(1080, 649)
        .addImage(await bg.buffer(), 0, 0, 1080, 649)
        .addCircularImage(await avatar.buffer(), 280, 330, 100)
        .setTextSize(30)
        .addText(target.nickname || target.user.username, 230, 460, 120)
        .toBuffer();

      message.channel.send({ files: [img] }).catch((err) => {
        console.log(err);
        message.reply('não consegui fazer esta imagem');
      });
    } catch (err) {
      console.error(err);
    }
  },
  async execute_telegram(bot, msg, args) {
    const bg = await fetch('https://i.ibb.co/PWpFskt/New-Project.png');

    if (msg.entities && msg.entities[0].type === 'text_mention') {
      const entity = msg.entities[0];
      const id = entity.user.id;
      try {
        const photo = await bot.getUserProfilePhotos(id);
        if (!photo) {
          bot.sendMessage(msg.chat.id, 'Não consegui pegar a foto dessa pessoa ai');
          return;
        }

        const img = new Canvas(1080, 649)
          .addImage(await bg.buffer(), 0, 0, 1080, 649)
          .addCircularImage(await photo.buffer(), 280, 330, 100)
          .setTextSize(30)
          // .addText(target.user.username, 230, 460, 120)
          .toBuffer();

        bot.sendPhoto(msg.chat.id, photo.photos[0]);
      } catch (err) {
        bot.sendMessage(msg.chat.id, 'Não consegui pegar a foto dessa pessoa ai');
      }
    } else {
      const target = args.join(' ');

      if (target.includes('https://') || target.includes('http://')) {
        const avatar = await fetch(args[0]);
        const img = new Canvas(1080, 649)
          .addImage(await bg.buffer(), 0, 0, 1080, 649)
          .addCircularImage(await avatar.buffer(), 270, 330, 120)
          .toBuffer();

        bot.sendPhoto(msg.chat.id, img).catch((err) => {
          bot.sendMessage(msg.chat.id, 'Não consegui fazer esta imagem');
        });

        return;
      }
      const img = new Canvas(1080, 649)
        .addImage(await bg.buffer(), 0, 0, 1080, 649)
        .setColor('#000000')
        .setTextSize(46)
        .setTextAlign('center')
        .addResponsiveText(target, 260, 335, 360)
        .toBuffer();

      bot.sendPhoto(msg.chat.id, img).catch((err) => {
        bot.sendMessage(msg.chat.id, 'Não consegui fazer esta imagem');
      });
    }
  },
};
