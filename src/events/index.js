import guildMemberAdd from './discord/guildMemberAdd';
import guildMemberRemove from './discord/guildMemberRemove';
import listenDiscordCommands from './discord/listenDiscordCommands';
import listenTelegramCommands from './telegram/listenTelegramCommands';

function listenDiscordEvents(discord) {
  guildMemberRemove(discord);
  guildMemberAdd(discord);
  listenDiscordCommands(discord);
}

function listenTelegramEvents(telegram, discord) {
  listenTelegramCommands(telegram, discord);
}

function listenEvents(discord, telegram) {
  listenDiscordEvents(discord);
  listenTelegramEvents(telegram, discord);
}

export default listenEvents;
