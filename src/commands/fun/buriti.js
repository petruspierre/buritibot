module.exports = {
  name: 'buriti',
  aliases: ['pergunte', 'oraculo'],
  description: 'Faça uma pergunta ao grande mestre da sabedoria Buriti.',
  usage: '<pergunta>',
  category: 'Diversão',
  telegram: true,
  args: true,
  cooldown: 3,
  async execute(_, message, args) {
    const index = Math.floor(Math.random() * 22);

    const respostas = [
      'não.',
      'definitivamente não.',
      'não acredito que seja verdade.',
      'não é verdade.',
      'sim.',
      'definitivamente sim.',
      'sim, é verdade.',
      'todo mundo sabe que sim.',
      'não sei e nem quero saber.',
      'siga seu coração.',
      '\*\*\*.',
      'por favor me deixa em paz.',
      'parece que sim.',
      'acho que não.',
      'pode ser que sim, mas também pode ser que não.',
      'não posso revelar a verdade sobre isso.',
      'talvez não.',
      'de jeito nenhum.',
      'claro.',
      'talvez sim.',
      'me pergunta daqui 5 minutos.',
      'não sei e não quero saber.',
      'se você acredita que sim, essa é a resposta correta.',
    ];

    message.reply(respostas[index]);
  },
  async execute_telegram(bot, msg, args) {
    const index = Math.floor(Math.random() * 22);

    const respostas = [
      'Não.',
      'Definitivamente não.',
      'Não acredito que seja verdade.',
      'Não é verdade.',
      'Sim.',
      'Definitivamente sim.',
      'Sim, é verdade.',
      'Todo mundo sabe que sim.',
      'Não sei e nem quero saber.',
      'Siga seu coração.',
      '***.',
      'Por favor me deixa em paz.',
      'Parece que sim.',
      'Acho que não.',
      'Pode ser que sim, mas também pode ser que não.',
      'Não posso revelar a verdade sobre isso.',
      'Talvez não.',
      'De jeito nenhum.',
      'Claro.',
      'Talvez sim.',
      'Me pergunta daqui 5 minutos.',
      'Não sei e não quero saber.',
      'Se você acredita que sim, essa é a resposta correta.',
    ];

    bot.sendMessage(msg.chat.id, respostas[index], { reply_to_message_id: msg.message_id });
  },
};
