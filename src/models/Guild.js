import Sequelize, { Model } from 'sequelize';

class Guild extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      prefix: {
        type: Sequelize.STRING,
        defaultValue: '+',
        allowNull: false,
      },
      wellcome_message: Sequelize.STRING,
      wellcome_channel: Sequelize.STRING,
      music_channel: Sequelize.STRING,
      bot_channel: Sequelize.STRING,
      alert_command_dont_exist: Sequelize.BOOLEAN,
      default_cooldown: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
        allowNull: false,
      },
    }, {
      sequelize,
    });

    return this;
  }
}

export default Guild;
