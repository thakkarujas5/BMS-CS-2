const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://thakkarujas5:yTPr58WF1RJ3auv0@cluster1.s5hs1pq.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = client;