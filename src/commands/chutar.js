const Discord = require('discord.js');

module.exports = {
  name: 'chutar',
  aliases: ['voadora', 'chuta'],
  description: 'Chutar alguem',
  usage: '<@alvo>',
  args: true,
  execute(message, args) {
    if (!message.mentions.users.size) {
      return message.reply('você precisa marcar alguem para ser chutado');
    }

    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed()
      .setColor('#de3025')
      .setTitle('VOADORA')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`METEU-LHE UMA VOADORA EM ${target}`)
      .setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKCpLo30w8_4hCD0UPSKzbAS2_K3fJNEVC_744fCGbgIsWOBS1&usqp=CAU')
      .setTimestamp();

    message.channel.send(embed);
  },
};
