function guildMemberAdd(client) {
  client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.cache.find((ch) => ch.name === '🚪entradas-e-saidas');
    if (!channel) return;
    member.setNickname(`${(member.displayName).toUpperCase()} WTFF`);

    const cargoPrincipal = member.guild.roles.cache.find((role) => role.name === 'wonkru');
    member.roles.add(cargoPrincipal);

    channel.send(`Bem vindo ao ${member.guild.name}, ${member}\nBeba bastante água 🥛`);
  });
}

export default guildMemberAdd;
