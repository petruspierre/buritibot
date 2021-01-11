import Sequelize, { Model } from 'sequelize';

class Guild extends Model {
  static init() {
    super.init({
      name: Sequelize.STRING,
      prefix: {
        type: Sequelize.STRING,
        defaultValue: '+',
        allowNull: false,
      },
      welcomeMessage: Sequelize.STRING,
      welcomeChannel: Sequelize.STRING,
      musicChannbel: Sequelize.STRING,
      botChannel: Sequelize.STRING,
      alertCommandDontExist: Sequelize.BOOLEAN,
      defaultCooldown: Sequelize.INTEGER,
    });

    return this;
  }
}

export default Guild;
