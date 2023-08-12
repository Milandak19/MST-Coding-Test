const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rwt = require('random-web-token');
const db = require('../models');
const { uploader } = require('../helpers/upload.helper');
const { sendEmail } = require('../helpers/sendmail.helper');
const User = db.user;

exports.signup = async (req, res) => {
	// Save User to Database
	try {
		const photo = await uploader(req.file);
		const token = rwt.genSync('extra', 25);
		sendEmail(
			req.body.email,
			'Verify your account',
			`<p>Verify your email, click this url <a href="http://localhost:3000/auth/verify-email/${token}">http://localhost:3000/auth/verify-email/${token}</a></p>`
		);

		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			photo,
			fullname: req.body.fullname,
			token,
		});

		res.status(200).send({
			message:
				'Register success, please check your email to verify your account.',
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.signin = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!user) {
			return res.status(404).send({ message: 'User Not found.' });
		}

		if (user.status === 'unverified') {
			return res.status(400).send({
				message:
					'Please verified your account first, click link that we have send to your email.',
			});
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				message: 'Invalid Password!',
			});
		}

		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				photo: user.photo,
				fullname: user.fullname,
			},
			process.env.SECRET_KEY,
			{
				algorithm: 'HS256',
				allowInsecureKeySizes: true,
				expiresIn: 86400, // 24 hours
			}
		);

		req.session.token = token;

		return res.status(200).send({
			username: user.username,
			email: user.email,
			photo: user.photo,
		});
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.signout = async (req, res) => {
	try {
		req.session = null;
		return res.status(200).send({
			message: "You've been signed out!",
		});
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.verifyEmail = async (req, res) => {
	try {
		const { token } = req.body;
		const user = await User.findOne({
			where: {
				token,
			},
		});
		if (!user) {
			return res.status(400).send({ message: 'Verify failed.' });
		}
		const userUpdate = await User.update(
			{ token: '', status: 'verified' },
			{ where: { token } }
		);
		return res.status(200).send({ message: 'Verify successfuly.' });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const token = rwt.genSync('extra', 25);
		const user = await User.findOne({
			where: {
				email,
			},
		});
		if (!user) {
			return res.status(404).send({ message: 'User not found.' });
		}
		await User.update({ token }, { where: { id: user.id } });
		sendEmail(
			user.email,
			'Reset Your Password',
			`
        <p>You are receiving this email because we received a password reset request for your account. To proceed with resetting your password, click the link below:</p>
        <p><a href="http://localhost:3000/api/auth/reset-password/${token}">Reset Password</a></p>
      `
		);
		return res
			.status(200)
			.send({ message: 'Forgot password success, please check your email.' });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.resetPassword = async (req, res) => {
	try {
		const { password, token } = req.body;
		const user = await User.findOne({ where: { token } });
		if (!user) {
			return res.status(404).send({ message: 'User not found.' });
		}
		await User.update(
			{ password: bcrypt.hashSync(password, 8), token: '' },
			{ where: { token } }
		);
		return res.status(200).send({ message: 'Reset password success.' });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.reuploadPhoto = async (req, res) => {
	try {
		const { id } = req.user;
		const user = await User.findOne({ where: { id } });
		if (!user) {
			return res.status(404).send({ message: 'User not found.' });
		}
		const photo = await uploader(req.file);
		await User.update({ photo }, { where: { id } });
		return res.status(200).send({ message: 'Photo change successfuly.' });
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};
