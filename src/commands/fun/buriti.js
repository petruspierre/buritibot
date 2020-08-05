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
    const result = Math.floor(Math.random() * 2);
    const index = Math.floor(Math.random() * 4);

    const listaNao = ['não.', 'definitivamente não.', 'não acredito que seja verdade.', 'não é verdade.'];
    const listaSim = ['sim.', 'definitivamente sim.', 'sim, é verdade.', 'todo mundo sabe que sim.'];

    result === 1 ? message.reply(listaSim[index])
      : message.reply(listaNao[index]);
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
