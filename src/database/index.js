import Sequelize from 'sequelize';

import Guild from '../models/Guild';
import databaseConfigs from '../config/database';

const models = [Guild];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const databaseConfig = process.env.NODE_ENV === 'development'
      ? databaseConfigs.development
      : databaseConfigs.production;

    console.log(process.env.NODE_ENV);
    console.log(databaseConfig);

    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
