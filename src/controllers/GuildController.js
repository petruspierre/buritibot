import Guild from '../models/Guild';

class GuildController {
  async index() {
    const guilds = await Guild.findAll();

    return { guilds };
  }

  async create(guild) {
    const { id, name } = guild;

    const alreadyExists = await Guild.findByPk(id);
    if (!alreadyExists) {
      await Guild.create({ id, name });
    }

    return id;
  }
}

export default new GuildController();
