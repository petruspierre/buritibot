module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: 'postgres',
  password: 'docker',
  database: 'buriti',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
