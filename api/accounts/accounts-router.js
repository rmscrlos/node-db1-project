const router = require('express').Router();
const dbConfig = require('../../data/db-config');
const accountsModel = require('./accounts-model');

router.get('/', async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const accounts = await accountsModel.getAll();
		res.json(accounts);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const account = await accountsModel.getById(req.params.id);
		res.status(200).json(account);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	// DO YOUR MAGIC
	if (req.body.name === undefined || req.body.budget === undefined) {
		return res.status(400).json({
			message: 'name and budget required.'
		});
	}
	if (typeof req.body.name !== 'string' || req.body.name === 0) {
		return res.status(400).json({
			message: 'Name of account must be a string.'
		});
	}
	if (req.body.name.length < 3) {
		return res.status(400).json({
			message: 'Name of account must be between 3 and 100.'
		});
	}
	if (typeof req.body.budget === 'string') {
		return res.status(400).json({
			message: 'Budget of account must be a number.'
		});
	}
	if (req.body.budget < 0 || req.body.budget > 1000000) {
		return res.status(400).json({
			message: 'Budget of account is too large or too small.'
		});
	}

	try {
		const account = await accountsModel.create(req.body);
		res.status(201).json(account);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	// DO YOUR MAGIC
	if (req.body.name === undefined || req.body.budget === undefined) {
		return res.status(400).json({
			message: 'name and budget required.'
		});
	}
	if (typeof req.body.name !== 'string' || req.body.name === 0) {
		return res.status(400).json({
			message: 'Name of account must be a string.'
		});
	}
	if (req.body.name.length < 3) {
		return res.status(400).json({
			message: 'Name of account must be between 3 and 100.'
		});
	}
	if (typeof req.body.budget === 'string') {
		return res.status(400).json({
			message: 'Budget of account must be a number.'
		});
	}
	if (req.body.budget < 0 || req.body.budget > 1000000) {
		return res.status(400).json({
			message: 'Budget of account is too large or too small.'
		});
	}

	try {
		const account = await accountsModel.updateById(req.params.id, req.body);
		res.status(200).json(account);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', (req, res, next) => {
	// DO YOUR MAGIC
	try {
		accountsModel.deleteById(req.params.id);
		res.status(200).json({
			message: 'Account has been deteled.'
		});
	} catch (err) {
		next(err);
	}
});

router.use((err, req, res, next) => {
	// eslint-disable-line
	// CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
	res.status(500).json({
		message: 'something went wrong inside the accounts router',
		errMessage: err.message
	});
});

module.exports = router;
