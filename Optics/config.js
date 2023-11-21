// config.js
const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://arshkaur10:Mongo2626@webcluster.6spnxy4.mongodb.net/?retryWrites=true&w=majority',
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
};

export default config;
