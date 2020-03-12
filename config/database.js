module.exports = {
    hrPool: {
      user: "kosara",
      password: "kosara",
      connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
  };