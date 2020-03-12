const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select id "id",
    first_name "first_name",
    last_name "last_name",
    username "username",
    password "password",
    result "result"
  from users
  where 1 = 1`;

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
  const employee = Object.assign({}, emp);

  employee.id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, employee);

  employee.id = result.outBinds.id[0];

  return employee;
}

module.exports.create = create;

const updateSql =
 `update users
  set first_name = :first_name,
    last_name = :last_name,
    username = :username,
    password = :password,
    result = :result
  where id = :id`;

async function update(emp) {
  const employee = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, employee);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return employee;
  } else {
    return null;
  }
}

module.exports.update = update;

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