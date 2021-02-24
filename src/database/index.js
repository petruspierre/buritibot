import Sequelize from 'sequelize';

import Guild from '../models/Guild';
import databaseConfigs from '../config/database';

const models = [Guild];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const databaseConfig = process.env.NODE_ENV === 'production'
      ? databaseConfigs.production
      : databaseConfigs.development;

    this.connection = new Sequelize(databaseConfig);

    this.connection
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
