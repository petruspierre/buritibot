const getUserFromMention = require('../../util/getUserFromMention');

module.exports = {
  name: 'ban',
  description: 'Banir um usuário.',
  usage: '<@alvo> <motivo>',
  category: 'Moderação',
  permissions: ['BAN_MEMBERS'],
  cooldown: 3,
  async execute(client, message, args) {
    const rawTarget = getUserFromMention(args[0], client);
    const target = message.guild.members.cache.get(rawTarget.id);

    args = args.slice(1);

    target.send(`Você foi banido do servidor **${message.guild.name}** por: ${message.author}\n**Motivo**: ${args.join(' ')}`)
      .then(() => {
        message.guild.members.ban(target, { reason: args.join(' ') })
          .then(() => {
            message.channel.send('O usuário foi banido com sucesso.');
          })
          .catch((err) => {
            message.channel.send('Não foi possível banir o usuário');
          });
      });
  },
};
