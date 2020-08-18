module.exports = {
  name: 'reset',
  aliases: ['r'],
  description: 'Reseta a fila (serve para desbugar o bot).',
  category: 'Música',
  guildOnly: true,
  cooldown: 3,
  async execute(client, message, args, serverQueue, queue, youtube) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send(
        'Você precisa estar em um canal de voz para executar este comando!',
      );
    }

    serverQueue = {};
    return message.channel.send('Resetando!');
  },
};
