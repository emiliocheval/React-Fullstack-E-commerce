const express = require('express');
const router = express.Router();
const validate = require('validate.js');

const constraints = {
    name: {
      presence: true, // Ensures name is present
      length: {
        minimum: 2,
        maximum: 100, // Set limits for name length
      },
    },
    email: {
      presence: true,
      email: true, // Validates email format
    },
    message: {
      presence: true,
    },
  };

// Implement message handling logic here (validation, sending email, saving, etc.)
router.post('/', (req, res) => {
    const validationResult = validate(req.body, constraints);

  // Check for validation errors
  if (validationResult) {
    // Extract the first error message
    const errorMessage = Object.values(validationResult)[0][0];
    return res.status(400).json({ error: errorMessage });
  }

  // If validation passes, handle the message
  // (exempel: skicka e-post, spara i databas)

  // Send a success response
  res.status(200).json({ success: true });
});
  
module.exports = router;