const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
		required: true,
	},
	coordinates: {
		type: [Number],
		required: true,
	},
});

const crimeReportSchema = new mongoose.Schema({
	address: { type: String, required: true },
	title: { type: String, max: 256 },
	description: { type: String, max: 1000 },
	reportedAt: { type: Date, default: Date.now },
	location: {
		type: pointSchema,
		required: true,
	},
});

crimeReportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('CrimeReport', crimeReportSchema);
