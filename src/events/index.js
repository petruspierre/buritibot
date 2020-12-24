import guildMemberAdd from './guildMemberAdd';
import guildMemberRemove from './guildMemberRemove';

function listenEvents(client) {
  guildMemberRemove(client);
  guildMemberAdd(client);
}

export default listenEvents;
