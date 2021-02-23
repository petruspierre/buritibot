import Sequelize from 'sequelize';

import Guild from '../models/Guild';
import databaseConfig from '../config/database';

const models = [Guild];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(
      process.env.NODE_ENV === 'development'
        ? databaseConfig.development
        : databaseConfig.production,
    );

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
