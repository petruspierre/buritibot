import GuildController from '../../controllers/GuildController';

function guildCreate(client) {
  client.on('guildCreate', async (guild) => {
    await GuildController.create(guild);
  });
}

export default guildCreate;
