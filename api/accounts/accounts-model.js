const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id: id }).first();
};

const getByName = (name) => {
  return db("accounts").where({ name: name }).first();
};

const create = (account) => {
  return db("accounts")
    .insert(account)
    .then((id) => getById(id));
};

const updateById = (id, account) => {
  return db("accounts")
    .where({ id: id })
    .update(account)
    .then((count) => (count > 0 ? getById(id) : null));
};

const deleteById = (id) => {
  return db("accounts").where({ id: id }).del();
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
};
