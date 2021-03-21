const { MessageEmbed } = require('discord.js');
const { createPlayer, start } = require('../../util/bingoFunctions');

module.exports = {
  name: 'bingo',
  description: 'Jogar bingo',
  permissions: ['ADMINISTRATOR'],
  usage: '<start | next>',
  category: 'Jogos',
  args: true,
  disabled: false,
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
          starter: message.author.id,
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
              if (user.id === serverGame.starter) {
                if (serverGame.users.length < 2) return msg.channel.send('O bingo precisa ter pelo menos 2 jogadores para iniciar!');

                start(serverGame);
              }
            }
            if (serverGame.users.length === 2) msg.react('▶️');
          });
        });
      } else {
        message.reply('Um bingo já está sendo iniciado ou em está andamento!');
      }
    } else if (args[0] === 'next') {
      message.delete();
      if (!serverGame) {
        serverGame = bingo.get('548636877675298816');
      }

      let number;
      do {
        number = Math.floor(Math.random() * 75);
      } while (serverGame.previousNumbers.includes(number));

      serverGame.previousNumbers.push(number);

      const emojis = {
        1: '1️⃣',
        2: '2️⃣',
        3: '3️⃣',
        4: '4️⃣',
        5: '5️⃣',
        6: '6️⃣',
        7: '7️⃣',
        8: '8️⃣',
        9: '9️⃣',
      };

      const prefix = {
        1: '🥇 Começou o jogo!',
        2: '🦆 Só um patinho na lagoa!',
        11: '🚶🏻🚶🏻 Um atrás do outro!',
        13: 'Viniccius',
        22: '🦆🦆 Dois patinhos na lagoa!',
        44: '🦶🏻 Pé de marcelo!',
        45: '⚽ Fim do primeiro tempo!',
      };

      const sufix = {
        7: ' grande homem. 🙇',
        66: ' um tapa atrás da orelha 👂',
      };

      serverGame.channel.send('<a:thinkloading:798334868819804163> Sorteando...').then((msg) => {
        setTimeout(() => {
          let formatedNumber = '';
          const stringNumber = String(number);
          if (stringNumber === '8') {
            formatedNumber = '🎱';
          } else if (stringNumber === '17') {
            formatedNumber = '1️⃣6️⃣ ➕ 1️⃣';
          } else {
            for (let i = 0; i < stringNumber.length; i += 1) {
              if (stringNumber[i] === '0') {
                formatedNumber += '0️⃣';
              } else {
                formatedNumber += emojis[stringNumber[i]];
              }
            }
          }
          let numbersMessage = '';
          prefix[number] ? numbersMessage += prefix[number] : numbersMessage += '📣 Número sorteado:';
          numbersMessage += ` ${formatedNumber}`;
          if (sufix[number]) numbersMessage += sufix[number];

          msg.edit(numbersMessage);
        }, 1000);
      });

      const embed = new MessageEmbed()
        .setTitle('Números sorteados')
        .setDescription('Nessa mensagem serão exibidos os números sorteados. Fique atento.')
        .addField('Todos', serverGame.previousNumbers.sort((a, b) => a - b).join(' - ') || 'Nenhum número foi sorteado, aguarde.')
        .addField('Último', serverGame.previousNumbers[serverGame.previousNumbers.length - 1] || 'Nenhum número foi sorteado, aguarde.')
        .addField('Sorteados', serverGame.previousNumbers.length);

      setTimeout(() => {
        serverGame.allNumbersMessage.edit(embed);
      }, 1500);
    }
  },
};
