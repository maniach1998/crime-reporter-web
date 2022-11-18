const router = require('express').Router();
const Report = require('../models/CrimeReport');

router.get('/', async (req, res) => {
	const lng = Number(req.query.lng);
	const lat = Number(req.query.lat);

	const reports = await Report.aggregate([
		{
			$geoNear: {
				near: {
					type: 'Point',
					coordinates: [lng, lat],
				},
				distanceField: 'distance',
				spherical: true,
				maxDistance: 10000,
			},
		},
	]);

	res.send({ reports });
});

router.post('/new-report', async (req, res) => {
	const lng = Number(req.body.lng);
	const lat = Number(req.body.lat);

	const report = new Report({
		address: req.body.address,
		title: req.body.title,
		description: req.body.description,
		reportedAt: req.body.reportedAt,
		location: { type: 'Point', coordinates: [lng, lat] },
	});

	await report.save();

	res.send({ report });
});

module.exports = router;
