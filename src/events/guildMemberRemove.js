function guildMemberRemove(client) {
  client.on('guildMemberRemove', (member) => {
    const channel = member.guild.channels.cache.find((ch) => ch.name === '🚪entradas-e-saidas');
    if (!channel) return;

    channel.send(`${member.nickname || member.displayName} nos abandonou...`);
  });
}

export default guildMemberRemove;
