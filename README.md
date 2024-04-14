# React-Fullstack-E-commerceFullstack E-commerce MERN Project This is a fullstack e-commerce project built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.

Backend The backend of the project is responsible for handling data storage, authentication, and serving API endpoints.

Technologies Used Express.js: A minimal and flexible Node.js web application framework. 
MongoDB: A NoSQL database used for storing product and user data. 
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js. 
JWT (JSON Web Tokens): A standard for securely transmitting information between parties as a JSON object.
bcrypt: A library to help hash passwords. 
dotenv: A module to load environment variables from a .env file into process.env.

Getting Started

Install dependencies:

cd backend
npm install 
Create a .env file in the root directory of the backend folder and add the following environment variables:

PORT=3001 MONGODB_URI=mongodb+srv://admin:Dif12345@ecommercestore-cluster.uhm6u2h.mongodb.net/?retryWrites=true&w=majority&appName=eCommerceStore-Cluster JWT_SECRET=12345

Start the backend server:

node server.js This will start the backend server on port 3001.

Frontend The frontend of the project is responsible for providing a user interface for browsing products and making purchases.

Technologies Used React.js: A JavaScript library for building user interfaces. 
React Router: A declarative routing library for React.js. 
React Hook Form: A library for managing form state in React. 
Vite: A build tool that aims to provide a faster and more efficient development experience for modern web projects.

Getting Started Install dependencies:

cd frontend npm install

Start the development server:

npm run dev This will start the frontend development server and open the application in your default web browser.

Running Both Backend and Frontend Concurrently To run both the backend and frontend servers concurrently, you can use the concurrently package.

Install concurrently as a devDependency:

npm install --save-dev concurrently Update the scripts section in the parent package.json file to include the following:

json { "scripts": { "dev": "concurrently "cd backend && npm start" "cd frontend && npm run dev"" } } This script will start both the backend and frontend servers concurrently.

Run the following command to start both servers:

npm run dev
