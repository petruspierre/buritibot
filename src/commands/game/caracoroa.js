module.exports = {
  name: 'caracoroa',
  aliases: ['caraoucoroa', 'moeda'],
  description: 'Joga cara ou coroa',
  category: 'Jogos',
  cooldown: 3,
  telegram: true,
  async execute(_, message, args) {
    const result = Math.floor(Math.random() * 2);

    result === 1 ? message.reply('você tirou coroa!')
      : message.reply('você tirou cara!');
  },
  async execute_telegram(bot, msg, args) {
    const result = Math.floor(Math.random() * 2);

    result === 1
      ? bot.sendMessage(msg.chat.id, 'Você tirou coroa!', { reply_to_message_id: msg.message_id })
      : bot.sendMessage(msg.chat.id, 'Você tirou cara!', { reply_to_message_id: msg.message_id });
  },
};
