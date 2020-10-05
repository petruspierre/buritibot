const { MessageEmbed } = require('discord.js');
const { createPlayer, start } = require('../../util/bingoFunctions');

module.exports = {
  name: 'bingo',
  description: 'Jogar bingo',
  permissions: ['ADMINISTRATOR'],
  usage: '<start | next>',
  category: 'Jogos',
  args: true,
  disabled: true,
  cooldown: 3,
  async execute(_, message, args, serverGame, bingo) {
    if (args[0] === 'start') {
      const channel = message.guild.channels.cache.find((ch) => ch.name === '👴🏽│bingo');
      const guildID = message.guild.id;
      message.delete();
      if (!serverGame) {
        const gameContract = {
          users: [],
          previousNumbers: [],
          allNumbersMessage: null,
          channel,
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

              start(serverGame);
            }
            if (serverGame.users.length === 2) msg.react('▶️');
          });
        });
      } else {
        message.reply('Um bingo já está sendo iniciado ou em está andamento!');
      }
    } else if (args[0] === 'next') {
      let number;
      do {
        number = Math.floor(Math.random() * 75);
      } while (serverGame.previousNumbers.includes(number));

      serverGame.previousNumbers.push(number);

      serverGame.channel.send(`Número sorteado -> **${number}**`);

      const embed = new MessageEmbed()
        .setTitle('Números sorteados')
        .setDescription('Nessa mensagem serão exibidos os números sorteados. Fique atento.')
        .addField('Todos', serverGame.previousNumbers.join(' - ') || 'Nenhum número foi sorteado, aguarde.')
        .addField('Último', serverGame.previousNumbers[serverGame.previousNumbers.length - 1] || 'Nenhum número foi sorteado, aguarde.');

      serverGame.allNumbersMessage.edit(embed);
    }
  },
};
