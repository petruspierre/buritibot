const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'amor',
  aliases: ['shipp', 'love'],
  description: 'Calcular o amor entre duas pessoas',
  usage: '<@alvo> ou <@alvo 1> <@alvo 2>',
  cooldown: 5,
  args: true,
  async execute(_, message, args) {
    let embed;

    const users = message.mentions.users.map((user) => user.username);

    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = '❤️'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

    if (args.length === 1) {
      embed = new MessageEmbed()
        .setColor('#ffb6c1')
        .setTitle('O amor está no ar...')
        .setDescription(`**${message.member.displayName}** ama **${users[0]}** esse tanto:`)
        .addField(`💟 ${Math.floor(love)}%`, `${loveLevel}`)
        .setThumbnail('https://media3.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif')
        .setTimestamp();
    } else {
      embed = new MessageEmbed()
        .setColor('#ffb6c1')
        .setTitle('O amor está no ar...')
        .setDescription(`**${users[0]}** ama **${users[1]}** esse tanto:`)
        .addField(`💟 ${Math.floor(love)}%`, `${loveLevel}`)
        .setThumbnail('https://media3.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif')
        .setTimestamp();
    }

    message.channel.send(embed);
  },
};
