function guildCamelCase(guild) {
  if (!guild.prefix) guild.prefix = '+';
  return {
    prefix: guild.prefix,
    wellcomeMessage: guild.wellcome_message,
    wellcomeChannel: guild.wellcome_channel,
    musicChannel: guild.music_channel,
    botChannel: guild.bot_channel,
    alertCommandDontExist: guild.alert_command_dont_exist,
    defaultCooldown: guild.default_cooldown,
  };
}

export { guildCamelCase };
