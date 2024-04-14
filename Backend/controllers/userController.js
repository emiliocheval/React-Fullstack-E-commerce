const User = require('../models/User'); // Import user model
const bcrypt = require('bcrypt'); // For secure password hashing
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Include the name field in the request body

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10); // Increase rounds for better security

    // Create and save new user
    const user = new User({ name, email, password: hashedPassword }); // Include the name field in user creation
    const savedUser = await user.save();

    // Create JWT payload with user ID and email
    const payload = { id: savedUser._id, email: savedUser.email };

    // Sign JWT using a strong secret key (store securely in environment variable)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration time as needed

    res.status(201).json({ success: true, message: 'User registered successfully.', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust expiration time as needed

    res.status(200).json({ success: true, message: 'Login successful.', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};
