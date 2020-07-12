const getUserFromMention = require('../util/getUserFromMention');

module.exports = {
  name: 'ban',
  description: 'Banir um usuário.',
  usage: '<@alvo> <motivo>',
  permissions: ['BAN_MEMBERS'],
  cooldown: 3,
  needClient: true,
  async execute(_, message, args, client) {
    const rawTarget = getUserFromMention(args[0], client);
    const target = message.guild.members.cache.get(rawTarget.id);

    args = args.slice(1);

    target.send(`Você foi banido do servidor **${message.guild.name}** por: ${message.author}\n**Motivo**: ${args.join(' ')}`)
      .then(() => {
        message.guild.members.ban(target, { reason: args.join(' ') });
      });
  },
};
