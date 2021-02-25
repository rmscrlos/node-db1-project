const db = require('../../data/db-config');

const getAll = () => {
	// DO YOUR MAGIC
	return db('accounts');
};

const getById = id => {
	// DO YOUR MAGIC
	return db('accounts').where('id', id).limit(1);
};

const create = async account => {
	// DO YOUR MAGIC
	const [id] = await db.insert({ name: account.name, budget: account.budget }).into('accounts');
	const newAccount = await db('accounts').where('id', id).first();
	return newAccount;
};

const updateById = async (id, account) => {
	// DO YOUR MAGIC
};

const deleteById = async id => {
	// DO YOUR MAGIC
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById
};
