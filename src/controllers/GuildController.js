import Guild from '../models/Guild';

class GuildController {
  async index() {
    const guilds = await Guild.findAll();

    return { guilds };
  }

  async show(id) {
    const guild = await Guild.findByPk(id);

    return guild;
  }

  async update(id, payload) {
    const guild = await Guild.findByPk(id);

    const updatedGuild = await guild.update(payload);

    return updatedGuild;
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
