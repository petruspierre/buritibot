const { MessageEmbed } = require('discord.js');
const { createPlayer } = require('../../util/bingoFunctions');

module.exports = {
  name: 'bingo',
  description: 'Jogar bingo',
  category: 'Jogos',
  cooldown: 3,
  async execute(_, message, args, serverGame, bingo) {
    const guildID = message.guild.id;

    message.delete();

    const channel = message.guild.channels.cache.find((ch) => ch.name === '👴🏽│bingo');

    if (args[0] === 'start') {
      if (!serverGame) {
        const deck = [];
        for (let i = 0; i < 76; i += 1) {
          deck.push(i);
        }
        console.log(deck);

        const gameContract = {
          users: [],
          previousNumbers: [],
        };

        bingo.set(guildID, gameContract);
        serverGame = bingo.get(guildID);

        const firstPlayer = createPlayer(message.author);
        gameContract.users.push(firstPlayer);

        const description = 'Aguarde novos jogadores entrarem!\n\nPara entrar no jogo, basta reagir a esta mensagem com ➕\n\nO tempo limite para aceitar o convite é de 5 minutos, caso ultrapasse o tempo, o bingo será iniciada caso haja 2 ou mais jogadores ou cancelado se não atingir 2 jogadores!\n\n**JOGADORES NO BINGO:**';
        let jogadores = `\n${message.author.username}`;

        const embed = new MessageEmbed()
          .setTitle('Bingo criado!')
          .setDescription(description + jogadores);

        const filter = (reaction, user) => ['➕', '▶️'].includes(reaction.emoji.name) && user.bot === false;

        channel.send(embed).then((msg) => {
          msg.react('➕');

          const collector = msg.createReactionCollector(filter, { time: 300000 });
          collector.on('collect', (r, user) => {
            if (r.emoji.name === '➕') {
              const filteredServerGame = serverGame.users
                .filter(({ user: u }) => u.id === user.id);

              if (filteredServerGame.length === 0) {
                const newPlayer = createPlayer(user);
                serverGame.users.push(newPlayer);
                jogadores += `\n${user.username}`;
                embed.setDescription(description + jogadores);

                r.message.edit(embed);
              }
            } else if (r.emoji.name === '▶️') {
              if (serverGame.users.length < 2) return msg.channel.send('O bingo precisa ter pelo menos 2 jogadores para iniciar!');
              serverGame.hasStarted = true;

              // start(serverGame);
            }
            if (serverGame.users.length === 2) msg.react('▶️');
          });
        });
      } else {
        message.reply('Um já está sendo iniciada ou em andamento!');
      }
    }
  },
};
