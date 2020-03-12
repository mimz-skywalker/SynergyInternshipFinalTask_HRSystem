
module.exports = {
  hrPool: {
    user: "maria",
    password: "localdbm",
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};