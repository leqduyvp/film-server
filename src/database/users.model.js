const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  accType: {
    type: Number,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: Date.now(),
    required: true
  },
  ratedFilms: [{
    filmId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    }
  }]
});

UserSchema.pre('update', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;