const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.rzp_live_hoGPJY2ykACPY4,
  key_secret: process.env.hX7omaLq4JliT8LAZxrWPYj7,
});

// Route to create an order
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise (INR * 100)
      currency: 'INR',
    });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
