module.exports = {
  name: 'buriti',
  aliases: ['pergunte', 'oraculo'],
  description: 'Faça uma pergunta ao grande mestre da sabedoria Buriti.',
  usage: '<pergunta>',
  category: 'Diversão',
  cooldown: 3,
  async execute(_, message, args) {
    const result = Math.floor(Math.random() * 2);
    const index = Math.floor(Math.random() * 4);

    const listaNao = ['não.', 'definitivamente não.', 'não acredito que seja verdade.', 'não é verdade.'];
    const listaSim = ['sim.', 'definitivamente sim.', 'sim, é verdade.', 'todo mundo sabe que sim.'];

    result === 1 ? message.reply(listaSim[index])
      : message.reply(listaNao[index]);
  },
};
