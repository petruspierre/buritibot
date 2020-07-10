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

    const cargoPrincipal = message.guild.roles.cache.find((role) => role.name === 'wonkru');
    const cargoSecundario = message.guild.roles.cache.find((role) => role.name === '🌈☄️');
    const cargoCastigo = message.guild.roles.cache.find((role) => role.name === 'Castigo');

    if (!cargoPrincipal) {
      return message.reply('não encontrei o cargo wonkru');
    }

    if (!cargoCastigo) {
      return message.reply('crie o cargo de castigo');
    }

    const embed = new MessageEmbed()
      .setColor('#de3025')
      .setTitle('Castigo')
      .addField('Votação iniciada!', `Com cinco votos ${target} será castigado(a).\nVote pelas reações dessa mensagem!`)
      .setFooter(`Pedido por ${message.member.user.tag}`)
      .setThumbnail('https://media.giphy.com/media/6BZaFXBVPBtok/giphy.gif')
      .setTimestamp();

    message.channel.send(embed).then((msg) => {
      msg.react('✅');
      msg.react('❌');
    });

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.emoji.name === '✅') {
        if (reaction.count >= 3) {
          target.roles.remove(cargoPrincipal);
          target.roles.remove(cargoSecundario);
          target.roles.add(cargoCastigo);

          message.channel.send(`${target.user.username} foi castigado por 5 minutos`);
          reaction.remove();

          setTimeout(() => {
            target.roles.add(cargoPrincipal);
            target.roles.add(cargoSecundario);
            target.roles.remove(cargoCastigo);
          }, 300000);
        }
      }
    });
  },
};
