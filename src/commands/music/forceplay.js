const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');
const timeFormat = require('../../util/timeFormat');

module.exports = {
  name: 'forceplay',
  aliases: ['fp'],
  description: 'Toque uma música (e caso procure por título, toca a primeira que for encontrada automaticamente).',
  usage: '<titulo> ou <Youtube link>',
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

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send(
        'Preciso das permissões para todar musica nesse canal!',
      );
    }

    function play(guild, song) {
      const squeue = queue.get(guild.id);

      if (!song) {
        squeue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }

      const dispatcher = squeue.connection
        .play(ytdl(song.url))
        .on('finish', () => {
          squeue.songs.shift();
          play(guild, squeue.songs[0]);
        })
        .on('error', (error) => console.error(error));

      dispatcher.setVolumeLogarithmic(squeue.volume / 5);

      const duration = timeFormat(song.length);

      const embed = new MessageEmbed()
        .setColor('#de3025')
        .setTitle('Música tocando')
        .addField(song.title, `${song.author} - ${duration}`)
        .setThumbnail(song.thumb)
        .setTimestamp()
        .setURL(song.url)
        .setFooter(`Pedido por ${message.member.user.tag}`);
      squeue.textChannel.send(embed);
    }

    async function process(id) {
      const songInfo = await ytdl.getInfo(id);

      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        author: songInfo.videoDetails.author.name,
        thumb: songInfo.videoDetails.thumbnail.thumbnails[0].url,
        length: songInfo.videoDetails.lengthSeconds,
      };

      if (!serverQueue) {
        const queueContract = {
          textChannel: message.channel,
          voiceChannel,
          connection: null,
          songs: [],
          volume: 3,
          playing: true,
        };

        queue.set(message.guild.id, queueContract);

        queueContract.songs.push(song);

        try {
          const connection = await voiceChannel.join();
          queueContract.connection = connection;
          play(message.guild, queueContract.songs[0]);
        } catch (err) {
          console.error(err);
          queue.delete(message.guild.id);
          serverQueue.voiceChannel.leave();
          return message.channel.send('Ocorreu um erro ao reproduzir a música :(');
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(`**${song.title}** foi adicionado à fila!`);
      }
    }

    if (ytdl.validateURL(args.join(' '))) {
      const videoID = args.join(' ');
      process(videoID);
    } else {
      youtube.search(args.join(' '), 3, async (error, result) => {
        if (error) return console.error(error);

        const videoID = result.items[0].id.videoId;
        process(videoID);
      });
    }
  },
};
