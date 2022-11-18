const router = require('express').Router();
const Report = require('../models/CrimeReport');

const mockData = require('../data/mockData');

router.get('/', async (req, res) => {
	const lng = Number(req.query.lng);
	const lat = Number(req.query.lat);

	const apiResponse = mockData.incidents.map(
		(crime) =>
			new Report({
				address: crime.incident_address,
				title: crime.incident_offense,
				description: crime.incident_offense_detail_description,
				reportedAt: crime.incident_date,
				location: {
					type: 'Point',
					coordinates: [
						crime.incident_longitude,
						crime.incident_latitude,
					],
				},
			})
	);

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

	// merge crime arrays and sort to show latest crimes
	const data = apiResponse
		.concat(reports)
		.sort(
			(a, b) =>
				new Date(b.reportedAt).getTime() -
				new Date(a.reportedAt).getTime()
		);

	res.send({ data });
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
