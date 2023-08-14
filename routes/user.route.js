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

	router.post('/verify-token', user.verifyToken);

	router.use(verifyToken);
	router.get('/profile', user.getProfile);

	router.patch('/reupload-photo', upload.single('photo'), user.reuploadPhoto);

	app.use('/api/auth', router);
};
