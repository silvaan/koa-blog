const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (ctx) => {
  try {
    const hash = await bcrypt.hash(ctx.request.body.password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: ctx.request.body.email,
      password: hash
    });

    const savedUser = await user.save();
    ctx.body = savedUser;
  } catch (err) {
    ctx.throw(err, 500);
  }
}

exports.signin = async (ctx) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  try {
    const user = await User.findOne({ email: email });
    const payload = { id: user.id };
    const token = jwt.sign(payload, 'secret');
    ctx.user = { id: user.id };
    ctx.status = 200;
    ctx.body = { token: token };
  } catch(err) {
    ctx.throw(err, 404);
  }
}
