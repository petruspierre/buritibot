module.exports = {
  name: 'skip',
  aliases: ['sk', 'pular'],
  description: 'Pula a música que está tocando.',
  category: 'Música',
  guildOnly: true,
  cooldown: 2,
  async execute(client, message, args, serverQueue, queue, youtube) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send(
        'Você precisa estar em um canal de voz para executar este comando!',
      );
    }

    if (serverQueue) {
      serverQueue.connection.dispatcher.end();
      return message.channel.send('Pulando a música atual');
    }
    return message.channel.send('Não estou tocando nada no momento!');
  },
};
