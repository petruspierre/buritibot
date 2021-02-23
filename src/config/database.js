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
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_TABLE,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
