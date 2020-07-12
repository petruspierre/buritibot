module.exports = {
  name: 'caracoroa',
  aliases: ['caraoucoroa', 'moeda'],
  description: 'Joga cara ou coroa',
  usage: '',
  cooldown: 3,
  async execute(_, message, args) {
    const result = Math.floor(Math.random() * 2);

    result === 1 ? message.reply('você tirou coroa!')
      : message.reply('você tirou cara!');
  },
};
