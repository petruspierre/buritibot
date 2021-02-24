import Guild from '../models/Guild';

class GuildController {
  async index() {
    const guilds = await Guild.findAll();

    return { guilds };
  }

  async create(guild) {
    const { id, name } = guild;

    console.log('Searching Guild');
    const alreadyExists = await Guild.findByPk(id);
    console.log('Creating Guild');
    if (!alreadyExists) {
      await Guild.create({ id, name });
    }

    return id;
  }
}

export default new GuildController();
