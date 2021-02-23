module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.DATABASE_URL,
    username: 'postgres',
    password: 'docker',
    database: 'buriti',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
