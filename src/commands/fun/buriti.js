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
    const result = Math.floor(Math.random() * 2);
    const index = Math.floor(Math.random() * 4);

    const listaNao = ['Não.', 'Definitivamente não.', 'Não acredito que seja verdade.', 'Não é verdade.'];
    const listaSim = ['Sim.', 'Definitivamente sim.', 'Sim, é verdade.', 'Todo mundo sabe que sim.'];

    result === 1
      ? bot.sendMessage(msg.chat.id, listaSim[index], { reply_to_message_id: msg.message_id })
      : bot.sendMessage(msg.chat.id, listaNao[index], { reply_to_message_id: msg.message_id });
  },
};
