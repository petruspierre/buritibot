import guildMemberAdd from './discord/guildMemberAdd';
import guildCreate from './discord/guildCreate';
import guildMemberRemove from './discord/guildMemberRemove';
import listenDiscordCommands from './discord/listenDiscordCommands';
import listenTelegramCommands from './telegram/listenTelegramCommands';

function listenDiscordEvents(discord, youtube) {
  guildMemberRemove(discord);
  guildMemberAdd(discord);
  guildCreate(discord);
  listenDiscordCommands(discord, youtube);
}

function listenTelegramEvents(telegram, discord) {
  listenTelegramCommands(telegram, discord);
}

function listenEvents(discord, telegram, youtube) {
  listenDiscordEvents(discord, youtube);
  listenTelegramEvents(telegram, discord);
}

export default listenEvents;
