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

//Create Statement
const createSql =
 `insert into users (
    username,
    password,
    first_name,
    last_name,
    result
  ) values (
    :username,
    :password,
    :first_name,
    :last_name,
    :result
  ) returning id
  into :id`;
 
async function create(emp) {
  const user = Object.assign({}, emp);
 
  user.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }
 
  const result = await database.simpleExecute(createSql, user);
 
  user.id = result.outBinds.id[3];
 
  return user;
}
 
module.exports.create = create;


//Update Statement
const updateSql =
 `update users
  set first_name = :first_name,
    last_name = :last_name,
    username = :username,
    result = :result,
  where id = :id`;
 
async function update(emp) {
  const user = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, user);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}
 
module.exports.update = update;

//Delete Statement
const deleteSql =
 `begin
 
    delete from users
    where id = :id;

 
    :rowcount := sql%rowcount;
 
  end;`
 
async function del(id) {
  const binds = {
    id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);
 
  return result.outBinds.rowcount === 1;
}
 
module.exports.delete = del;