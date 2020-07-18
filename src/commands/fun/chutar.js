const Discord = require('discord.js');

module.exports = {
  name: 'chutar',
  aliases: ['voadora', 'chuta'],
  description: 'Chutar alguem',
  usage: '<@alvo>',
  category: 'Diversão',
  cooldown: 5,
  args: true,
  execute(_, message, args) {
    if (!message.mentions.users.size) {
      return message.reply('você precisa marcar alguem para ser chutado');
    }

    const target = message.mentions.users.first();
    const embed = new Discord.MessageEmbed()
      .setColor('#de3025')
      .setTitle('VOADORA')
      .addField('TRETA', `${message.member.displayName.toUpperCase()} METEU-LHE UMA VOADORA EM ${target}`)
      .setThumbnail('https://thumbs.gfycat.com/RepentantJitteryDogwoodtwigborer-size_restricted.gif')
      .setTimestamp();

    message.channel.send(embed).then((msg) => {
      msg.react('👊🏼');
    });
  },
};
