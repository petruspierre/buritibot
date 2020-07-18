module.exports = {
  name: 'stop',
  aliases: ['st', 'parar'],
  description: 'Para de tocar.',
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

    if (serverQueue) {
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
      return message.channel.send('Parando de tocar');
    }
    return message.channel.send('Não estou tocando nada no momento!');
  },
};
