const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const reportRoutes = require('./routes/report');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, () => {
	console.log('Connected to db!');
});

app.use('/api/reports', reportRoutes);

app.listen(4000, (url) => {
	console.log(`🚀 Server ready at: http://localhost:4000`);
});
