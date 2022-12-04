const router = require('express').Router();
const Report = require('../models/CrimeReport');
const fetch = require('node-fetch');
const moment = require('moment');

const mockData = require('../data/mockData');

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

	const now = moment(moment.now()).format('YYYY-MM-DD HH:mm:ss').toString();
	const aWeekAgo = moment(moment.now())
		.day(-7)
		.startOf('day')
		.format('YYYY-MM-DD HH:mm:ss')
		.toString();
	const distance = '10mi';

	const apiUrl = `https://api.crimeometer.com/v1/incidents/raw-data?lat=${lat}&lon=${lng}&distance=${distance}&datetime_ini=${now}&datetime_end=${aWeekAgo}&page=1`;

	const apiRes = await fetch(apiUrl, {
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.API_KEY,
		},
	});
	const response = await apiRes.json();

	// if the API responds with data
	if (response.total_incidents !== 0) {
		const apiResponse = response.incidents.map(
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

		// merge crime arrays and sort to show latest crimes
		const data = apiResponse
			.concat(reports)
			.sort(
				(a, b) =>
					new Date(b.reportedAt).getTime() -
					new Date(a.reportedAt).getTime()
			);

		res.send({ data });
	} else {
		res.send({ data: reports });
	}
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
