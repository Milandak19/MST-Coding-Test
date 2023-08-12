module.exports = (app) => {
	const { verifyToken } = require('../middlewares/auth.middleware');
	const user = require('../controllers/user.controller');
	const multer = require('multer');

	var router = require('express').Router();
	const upload = multer({ storage: multer.memoryStorage() });

	router.post('/signup', upload.single('photo'), user.signup);

	router.post('/verify-email', user.verifyEmail);

	router.post('/signin', user.signin);

	router.post('/signout', user.signout);

	router.post('/forgot-password', user.forgotPassword);

	router.post('/reset-password', user.resetPassword);

	router.use(verifyToken);
	router.get('/profile', (req, res) =>
		res.status(200).send({
			email: req.user.email,
			fullname: req.user.fullname,
			photo: req.user.photo,
		})
	);

	router.patch('/reupload-photo', upload.single('photo'), user.reuploadPhoto);

	app.use('/api/auth', router);
};
