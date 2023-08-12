const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const { initializeApp } = require('firebase/app');
require('dotenv').config();
const app = express();
const port = 8080;
const firebaseConfig = require('./config/firebase.config');

initializeApp(firebaseConfig);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cookieSession({
		name: 'MST-test-session',
		keys: [process.env.COOKIE_SECRET],
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 1,
	})
);
app.get('/', (req, res) => {
	res.send('Hello World!');
});

const db = require('./models');

db.sequelize
	.sync()
	.then(() => {
		console.log('Synced db.');
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});

require('./routes/user.route')(app);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
