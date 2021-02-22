import Guild from '../models/Guild';

class GuildController {
  async index() {
    const guilds = await Guild.findAll();

    return { guilds };
  }

  async create(guild) {
    const { id, name } = guild;
    await Guild.create({ id, name });

    return id;
  }
}

export default new GuildController();
