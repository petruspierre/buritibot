const createPlayer = (user) => {
  const userData = {
    user,
    numbers: [],
  };

  return userData;
};

module.exports = {
  createPlayer,
};
