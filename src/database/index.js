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
