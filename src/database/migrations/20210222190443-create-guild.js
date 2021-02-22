module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('guilds', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    prefix: {
      type: Sequelize.STRING,
      defaultValue: '+',
      allowNull: false,
    },
    wellcome_message: {
      type: Sequelize.STRING,
      defaultValue: 'Bem-vindo ao servidor!',
    },
    wellcome_channel: Sequelize.STRING,
    music_channel: Sequelize.STRING,
    bot_channel: Sequelize.STRING,
    alert_command_dont_exist: Sequelize.BOOLEAN,
    default_cooldown: {
      type: Sequelize.INTEGER,
      defaultValue: 3,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('guilds'),
};
