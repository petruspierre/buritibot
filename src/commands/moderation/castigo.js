const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'castigo',
  description: 'Castiga uma pessoa',
  usage: '<@alvo>',
  cooldown: 120,
  args: true,
  async execute(client, message, args) {
    const target = message.mentions.members.first();

    if (!target) {
      return message.reply('não consegui achar esse cara');
    }

    let cargos = target.roles.cache.array();
    cargos = cargos.map((cargo) => cargo.name);

    if (cargos.length === 1) {
      return message.reply('vai com calma, esse usuário já está castigado!');
    }

    const embed = new MessageEmbed()
      .setColor('#de3025')
      .setTitle('Castigo')
      .addField('Votação iniciada!', `O alvo do castigo é ${target}\nA votação deverá receber **5 votos**, a maioria ganha\n\nA votação expira em 1 minuto.\n\nVote pelas reações dessa mensagem!`)
      .setFooter(`Pedido por ${message.member.user.tag}`)
      .setThumbnail('https://media.giphy.com/media/6BZaFXBVPBtok/giphy.gif')
      .setTimestamp();

    message.channel.send(embed).then((msg) => {
      msg.react('✅').then(() => msg.react('❌'));

      const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.bot === false;

      msg.awaitReactions(filter, { max: 5, time: 60000, errors: ['time'] })
        .then((collected) => {
          const upvote = collected.get('✅') || 0;
          const downvote = collected.get('❌') || 0;
          if (upvote.count > downvote.count) {
            cargos.forEach((cargo) => {
              if (cargo !== '@everyone') {
                const tempCargo = message.guild.roles.cache.find((role) => role.name === cargo);

                target.roles.remove(tempCargo).catch((err) => message.channel.send('Não foi possível castigar este usuário'));
              }
            });

            message.channel.send(`${target} foi castigado por 2 minutos!`);

            setTimeout(() => {
              cargos.forEach((cargo) => {
                if (cargo !== '@everyone') {
                  const tempCargo = message.guild.roles.cache.find((role) => role.name === cargo);

                  target.roles.add(tempCargo).catch((err) => message.channel.send('Não foi possível castigar este usuário'));
                }
              });
              message.channel.send(`${target} foi descastigado!`);
            }, 120000);
          } else {
            message.channel.send(`A maioria votou ❌ e o castigo para ${target} foi cancelado!`);
          }
        })
        .catch((collected) => {
          message.reply(`acabou o tempo e a votação não atingiu um resultado.\n${target} não será castigado.`);
        });
    });
  },
};
