module.exports = {
  name: 'limpar',
  aliases: ['limpa', 'clear'],
  description: 'Limpar mensagens do chat',
  cooldown: 5,
  args: true,
  usage: '<mensagens>',
  execute(message, args) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('parece que voce nao digitou um numero valido');
    } if (amount <= 1 || amount > 100) {
      return message.reply('informe um numero entre 1 e 99.');
    }

    message.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);
      return message.channel.send('Ocorreu algum erro');
    });

    message.channel.send(`Apagando ${amount - 1} mensagens...`);
  },
};
