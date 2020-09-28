const getUserFromMention = require('../../util/getUserFromMention');

module.exports = {
  name: 'kick',
  description: 'Expulsar um usuário.',
  usage: '<@alvo> <motivo>',
  category: 'Moderação',
  permissions: ['KICK_MEMBERS'],
  cooldown: 3,
  async execute(client, message, args) {
    const rawTarget = getUserFromMention(args[0], client);
    const target = message.guild.members.cache.get(rawTarget.id);

    args = args.slice(1);

    target.send(`Você foi expulso do servidor **${message.guild.name}** por: ${message.author}\n**Motivo**: ${args.join(' ')}`)
      .then(() => {
        target.kick(args.join(' '))
          .then(() => {
            message.channel.send('O usuário foi expulso com **sucesso**.');
          })
          .catch((err) => {
            message.channel.send('**Não** foi possível expulsar o usuário');
          });
      }).catch(() => {
        message.guild.members.ban(target, { reason: args.join(' ') })
          .then(() => {
            message.channel.send('O usuário foi expulso com **sucesso**.');
          })
          .catch((err) => {
            message.channel.send('**Não** foi possível expulsar o usuário');
          });
      });
  },
};
