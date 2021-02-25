const router = require('express').Router();
const dbConfig = require('../../data/db-config');
const accountsModel = require('./accounts-model');
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const accounts = await accountsModel.getAll();
		res.json(accounts);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', checkAccountId(), async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const account = await accountsModel.getById(req.params.id);
		res.status(200).json(account);
	} catch (err) {
		next(err);
	}
});

router.post('/', checkAccountPayload(), checkAccountNameUnique(), async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const account = await accountsModel.create(req.body);
		res.status(201).json(account);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', checkAccountPayload(), checkAccountId(), async (req, res, next) => {
	// DO YOUR MAGIC
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
