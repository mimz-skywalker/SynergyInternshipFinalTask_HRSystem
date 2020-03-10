const database = require('../services/database.js');
const oracledb = require('oracledb');

 
const baseQuery = 
 `select id "id",
    first_name "first_name",
    last_name "last_name",
    username "uername",
    result "result"
  from users`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.id = context.id;
 
    query += `\nwhere id = :id`;
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;

const createSql =
 `insert into users (
    first_name,
    last_name,
    username,
    result
  ) values (
    :first_name,
    :last_name,
    :email,
    :phone_number,
  ) returning id
  into :id`;
 
async function create(emp) {
  const user = Object.assign({}, emp);
 
  user.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }
 
  const result = await database.simpleExecute(createSql, user);
 
  user.id = result.outBinds.id[0];
 
  return user;
}
 
module.exports.create = create;