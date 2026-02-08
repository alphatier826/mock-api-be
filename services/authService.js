const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../utils/logger");

async function registerUser(data) {
  const { email, password, full_name } = data;

  logger.info(`Checking if user exists: ${email}`);

  const existing = await User.findOne({ email });
  if (existing) {
    logger.warn(`Registration blocked. User already exists: ${email}`);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    full_name
  });

  await user.save();
  logger.info(`User saved to DB: ${email}`);

  return { id: user._id, email: user.email, full_name: user.full_name };
}

async function loginUser(data) {
  const { email, password } = data;

  logger.info(`Login check for user: ${email}`);

  const user = await User.findOne({ email });
  if (!user) {
    logger.warn(`Login failed. User not found: ${email}`);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    logger.warn(`Login failed. Incorrect password: ${email}`);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  logger.info(`JWT issued for user: ${email}`);

  return { token };
}

module.exports = { registerUser, loginUser };
