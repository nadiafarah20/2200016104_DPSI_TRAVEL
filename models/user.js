// user.js - Model

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Hashing password before saving to the database
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, 'your_jwt_secret_key');
    return token;
};

// Method to verify password
userSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this;
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
