const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const { jwtSecret, emailService, UserResponseCodes, ResponseCodes } = require('../../constants');
const { encrypt, decrypt } = require('../services/encrypt_decrypt');

// Signup
exports.signup = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, profilePhoto } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(ResponseCodes.BAD_REQUEST).json({ code: UserResponseCodes.USER_ALREADY_EXIST, success: false, message: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      profilePhoto,
    });

    const encryptedPassword = encrypt(password);
    user.password = encryptedPassword;

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(ResponseCodes.CREATED).json({ code: UserResponseCodes.USER_SUCCESS, success: true, message: 'Signup successfully', token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({code: ResponseCodes.INTERNAL_SERVER_ERROR, success: false, message: 'Internal server error'});
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login body ", req.body);
  try {
    const user = await User.findOne({ email });
    console.log('user ', user.password);
    if (!user) {
      return res.status(ResponseCodes.BAD_REQUEST).json({ code: UserResponseCodes.USER_FETCH_FAILED, success: false, message: 'Invalid Credentials' });
    }

    const decryptedPassword = (await decrypt(user.password)).toString();
    const isMatch = decryptedPassword === password;
    if (!isMatch) {
        return res.status(ResponseCodes.BAD_REQUEST).json({ code: UserResponseCodes.USER_PASSWORD_MATCH_ERROR, success: false, message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(ResponseCodes.CREATED).json({ code: UserResponseCodes.USER_SUCCESS, success: true, message: 'Login successfully', token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({code: ResponseCodes.INTERNAL_SERVER_ERROR, success: false, message: 'Internal server error'});
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(ResponseCodes.BAD_REQUEST).json({ code: UserResponseCodes.USER_FETCH_FAILED, success: false, message: 'No account with that email found' });
    }

    const token = CryptoJS.lib.WordArray.random(20).toString(CryptoJS.enc.Hex);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport(emailService);

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@example.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:5000/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send('Error sending email');
      }
      res.status(200).json({ msg: 'Recovery email sent' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reset Password
// exports.resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({ msg: 'Password has been reset' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// Update Email
// exports.updateEmail = async (req, res) => {
//   const { userId, newEmail, otp } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({ msg: 'User not found' });
//     }

//     // Assume OTP verification step is completed here

//     user.email = newEmail;
//     await user.save();

//     res.status(200).json({ msg: 'Email updated successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
