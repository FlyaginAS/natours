//создать схему и модель юзера и экспортировать
const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on Create() or save()!!
      validator: function(el) {
        return el === this.password;  // abc === abc
      },
      message: 'Passwords are not the same',
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function(next) {
  //only run this function if password was actually modified
  if(!this.isModified('password')) return next();
  //hash password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10);
    return JWTTimestamp < changedTimestamp;
  }
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
  //незашифрованный токен для отсылки юзеру
  const resetToken = crypto.randomBytes(32).toString('hex');
  //зашифрованный токен для базы данных
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10*60*1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
