const { MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvas-constructor');
const fetch = require('node-fetch');
const shuffle = require('./shuffleArray');

const createPlayer = (user) => {
  const numbers = [];

  for (let i = 0; i < 75; i += 1) {
    numbers.push(i);
  }

  const rawHand = shuffle(numbers);

  const hand = rawHand.splice(0, 20);

  const userData = {
    user,
    numbers: hand.sort((a, b) => a - b),
  };

  return userData;
};

const start = async (serverGame) => {
  const { users, channel } = serverGame;

  const bg = await fetch('https://i.ibb.co/rdNNGJ3/Bingo-nada-generico-365.png');
  const bgBuffer = await bg.buffer();

  users.forEach(({ user, numbers }) => {
    const img = new Canvas(610, 409)
      .addImage(bgBuffer, 0, 0, 610, 409)
      .setTextSize(30)
      .setColor('#fff')
      .setTextAlign('center')
      .addText(numbers[0], 120, 115)
      .addText(numbers[1], 210, 115)
      .addText(numbers[2], 305, 115)
      .addText(numbers[3], 400, 115)
      .addText(numbers[4], 495, 115)

      .addText(numbers[5], 120, 200)
      .addText(numbers[6], 210, 200)
      .addText(numbers[7], 305, 200)
      .addText(numbers[8], 400, 200)
      .addText(numbers[9], 495, 200)

      .addText(numbers[10], 120, 285)
      .addText(numbers[11], 210, 285)
      .addText(numbers[12], 305, 285)
      .addText(numbers[13], 400, 285)
      .addText(numbers[14], 495, 285)

      .addText(numbers[15], 120, 372)
      .addText(numbers[16], 210, 372)
      .addText(numbers[17], 305, 372)
      .addText(numbers[18], 400, 372)
      .addText(numbers[19], 495, 372)
      .toBuffer();

    user.send({ files: [img] });
  });

  const embed = new MessageEmbed()
    .setTitle('Números sorteados')
    .setDescription('Nessa mensagem serão exibidos os números sorteados. Fique atento.');

  channel.send('**BINGO INICIADO**\n\nAs cartelas foram enviadas para o privado de cada um aqui no Discord.\nOs números já irão começar a ser divulgados. Fique atento!');
  channel.send(embed).then((msg) => {
    serverGame.allNumbersMessage = msg;
  });
};

module.exports = {
  createPlayer, start,
};
