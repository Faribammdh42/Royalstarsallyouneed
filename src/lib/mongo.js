                                    const { MongoClient } = require('mongodb');

// Replace the following with your MongoDB connection string
const uri = "mongodb+srv://fariba:<db_password>@cluster0.hczdhei.mongodb.net/";

// Create a new MongoClient
const client = new MongoClient(uri);

module.exports = client;
