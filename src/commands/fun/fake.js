const Discord = require('discord.js');

module.exports = {
  name: 'fake',
  description: 'Faz uma mensagem fake de alguem',
  usage: '<@alvo> <mensagem>',
  category: 'Diversão',
  cooldown: 5,
  args: true,
  async execute(_, message, args) {
    if (!message.mentions.users.size) {
      return message.reply('você precisa marcar alguem para ser fakeado!');
    }

    if (args.length === 1) {
      return message.reply('você precisa mandar uma mensagem pra fakear!');
    }

    const target = message.mentions.members.first();

    const avatarURL = target.user.avatarURL({ format: 'jpg' });

    try {
      const webhooks = await message.channel.fetchWebhooks();
      const webhook = webhooks.first();

      await webhook.send(args.slice(1).join(' '), {
        username: target.nickname || target.user.username,
        avatarURL: avatarURL || 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png',
      });

      message.delete();
    } catch (err) {
      console.log(err);
      message.channel.send('Não funcionou, tente em outro canal.');
    }
  },
};
