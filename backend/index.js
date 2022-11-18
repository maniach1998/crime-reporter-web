const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const reportRoutes = require('./routes/report');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
	'mongodb+srv://default:RSScHJUBgczq7vn7@cluster0.mb5jehj.mongodb.net/?retryWrites=true&w=majority',
	() => {
		console.log('Connected to db!');
	}
);

app.use('/api/reports', reportRoutes);

app.listen(4000, (url) => {
	console.log(`🚀 Server ready at: http://localhost:4000`);
});
