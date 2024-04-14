require('dotenv').config({ path: '../.env' }); // Replace with the actual path
const Product = require('../models/Product');
const connectDB = require('../db'); // Import connectDB function


const productsToAdd = [
    {
      name: 'HP Pavilion 15-eh3004no',
      price: 11999,
      description: 'The HP Pavilion 15-eh3004no is a reliable and powerful laptop that wont break the bank. Its perfect for everyday tasks like browsing the web, working on documents, and streaming entertainment.',
      category: 'Laptops',
      images: [
        "https://www.komplett.se/img/p/1200/1247160.jpg",
        "https://www.komplett.se/img/p/1200/1247160_1.jpg",
        "https://www.komplett.se/img/p/1200/1247160_3.jpg",
        "https://www.komplett.se/img/p/1200/1247160_4.jpg"
      ]
      
  },
];


async function seedDatabase() {
  try {
    await connectDB(); // Connect to MongoDB before seeding

    for (const product of productsToAdd) {
      const newProduct = new Product(product);
      await newProduct.save();
      console.log('Product added:', product.name);
    }
    console.log('All products added successfully!');
  } catch (error) {
    console.error('Error adding products:', error.message);
  }
}

seedDatabase();
