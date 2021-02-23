const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');
const timeFormat = require('../../util/timeFormat');

module.exports = {
  name: 'play',
  aliases: ['p', 'tocar'],
  description: 'Toque uma música.',
  usage: '<titulo> ou <link>',
  category: 'Música',
  guildOnly: true,
  args: true,
  cooldown: 3,
  disabled: true,
  async execute(client, message, args, serverQueue, queue, youtube) {
    const { channel } = message;
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return channel.send(
        'Você precisa estar em um canal de voz para executar este comando!',
      );
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return channel.send(
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
          textChannel: channel,
          voiceChannel,
          connection: null,
          songs: [],
          volume: 2,
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
          return channel.send('Ocorreu um erro ao reproduzir a música :(');
        }
      } else {
        serverQueue.songs.push(song);
        return channel.send(`**${song.title}** foi adicionado à fila!`);
      }
    }

    if (ytdl.validateURL(args.join(' '))) {
      const videoID = args.join(' ');
      process(videoID);
    } else {
      youtube.search(args.join(' '), 6, async (error, result) => {
        if (error) return console.error(error);

        const searchEmbed = new MessageEmbed()
          .setColor('#15e5e0')
          .setTitle(`Resultados encontrados para: \`${args.join(' ')}\``);

        result.items.forEach((item, index) => {
          if (index < 3) searchEmbed.addField(`#${index + 1} - ${item.snippet.title}`, `${item.snippet.channelTitle}`);
        });

        channel.send(searchEmbed).then((msg) => {
          msg.react('1️⃣')
            .then(() => {
              msg.react('2️⃣')
                .then(() => msg.react('3️⃣')
                  .then(() => {
                    msg.react('➕')
                      .catch((_) => {});
                  }))
                .catch((_) => {});
            })
            .catch((_) => {});

          const filter = (reaction, user) => ['1️⃣', '2️⃣', '3️⃣', '➕']
            .includes(reaction.emoji.name) && user.id === message.author.id;

          msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then((collected) => {
              const reaction = collected.first();

              let videoID;

              if (reaction.emoji.name === '1️⃣') {
                videoID = result.items[0].id.videoId;
                process(videoID);
              } else if (reaction.emoji.name === '2️⃣') {
                videoID = result.items[1].id.videoId;
                process(videoID);
              } else if (reaction.emoji.name === '3️⃣') {
                videoID = result.items[2].id.videoId;
                process(videoID);
              } else {
                msg.delete();
                const secondPage = new MessageEmbed()
                  .setColor('#15e5e0')
                  .setTitle(`Resultados encontrados para: \`${args.join(' ')}\``);

                result.items.forEach((item, index) => {
                  if (index >= 3) secondPage.addField(`#${index + 1} - ${item.snippet.title}`, `${item.snippet.channelTitle}`);
                });

                channel.send(secondPage).then((secondMsg) => {
                  secondMsg.react('4️⃣')
                    .then(() => {
                      secondMsg.react('5️⃣')
                        .then(() => secondMsg.react('6️⃣')
                          .then(() => {
                            secondMsg.react('✖️')
                              .catch((_) => {});
                          }))
                        .catch((_) => {});
                    })
                    .catch((_) => {});

                  const secondFilter = (secondReaction, user) => ['4️⃣', '5️⃣', '6️⃣', '✖️']
                    .includes(secondReaction.emoji.name) && user.id === message.author.id;

                  secondMsg.awaitReactions(secondFilter, { max: 1, time: 60000, errors: ['time'] })
                    .then((secondCollected) => {
                      const secondReaction = secondCollected.first();

                      if (secondReaction.emoji.name === '4️⃣') {
                        videoID = result.items[3].id.videoId;
                        process(videoID);
                      } else if (secondReaction.emoji.name === '5️⃣') {
                        videoID = result.items[4].id.videoId;
                        process(videoID);
                      } else if (secondReaction.emoji.name === '6️⃣') {
                        videoID = result.items[5].id.videoId;
                        process(videoID);
                      } else {
                        message.reply('sua escolha foi cancelada!');
                        secondMsg.delete();
                      }
                    })
                    .catch((secondCollected) => {
                      message.reply('acabou o tempo e você não escolheu uma música. Nada será adicionado à fila.');
                    });
                });
              }
            })
            .catch((collected) => {
              message.reply('acabou o tempo e você não escolheu uma música. Nada será adicionado à fila.');
            });
        });
      });
    }
  },
};
