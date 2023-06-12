const express = require('express')
const {
    Sequelize
} = require('sequelize');
const {
    DataTypes
} = require('sequelize');
const Movie = require('./models/movie')
const Comment = require('./models/comment')
const Rating = require('./models/rating')
const User = require('./models/user')

const client = require('./nosqldb')



const app = express();

function sqlsync() {

    sequelize.sync({
            force: false
        }) // Set 'force' to true to drop existing tables
        .then(() => {
            console.log('Models synchronized with the database.');
        })
        .catch((error) => {
            console.error('Error synchronizing models:', error);
        });
}

async function nosqlconnect() {

    try {

        await client.connect();
        await client.db("admin").command({
            ping: 1
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } catch {

        console.log('Connection failed');
    }
}

async function createCollection() {

    const database = client.db('Cluster1');

    await database.createCollection('Movies');
    await database.createCollection('Theatre');
}

createCollection();

function setup() {

    Comment.belongsTo(User);
    User.hasMany(Comment);
    Rating.belongsTo(User);
    User.hasMany(Rating);
    Movie.hasMany(Comment);
    Comment.belongsTo(Movie);
    Movie.hasMany(Rating);
    Rating.belongsTo(Movie);


    sqlsync();

     nosqlconnect();



}

app.get('/getmoviedata/:movieName', async (req, res) => {

    const database = client.db('Cluster1');

    const Movie = database.collection('Movies');


    try {

        const ans = await Movie.find({
            name: req.params.movieName
        }).toArray(function (err, data) {

            if (err) {
                console.error('Error retrieving data from MongoDB:', err);
                return;
            }
            // Display the retrieved documents
            console.log('Retrieved data:');
            console.log(data);

            return data

        });

        res.send(ans);

    } catch (err) {
        console.error('Error searching movies', err);
        res.status(404).send('Resource not found');
    }

})

app.get('gettheatredata/:theatreName', async (req,res) => {

    const database = client.db('Cluster1');

    const Theatre = database.collection('Theatre');


    try {
       
        const ans = await Theatre.find({name: req.params.theatreName}).toArray(function (err, data) {

            if (err) {
                console.error('Error retrieving data from MongoDB:', err);
                return;
            }
            // Display the retrieved documents
            console.log('Retrieved data:');
            console.log(data);
    
            return data
    
        });

        res.send(ans);
      } catch (err) {
        console.error('Error searching movies', err);
        res.status(404).send('Resource not found');
      }
})

app.get('/getratingandcomment/:movieId', async (req, res) => {

    const movieId = req.params.movieId;

    try {
        const movie = await Movie.findByPk(movieId, {
            include: [{
                    model: Comment,
                    include: User, // Include User model to retrieve user information
                },
                {
                    model: Rating,
                    include: User, // Include User model to retrieve user information
                },
            ],
        });

        // Extract comments and ratings from the movie object
        const comments = movie.Comments;
        const ratings = movie.Ratings;

        const respobj = {
            ...comments,
            ...ratings
        }

        res.send(respobj);
    } catch (error) {
        console.error('Error retrieving comments and ratings:', error);
        res.send(404).json({
            message: 'Resource not found'
        })
    }
})

app.get('/filters', async (req, res) => {

    const database = client.db('Cluster1');

    const Movie = database.collection('Movies');

    try {
      const { query, language, genre, format } = req.query;
      const filters = {};
  
      if (query) {
        filters.title = { $regex: query, $options: 'i' };
      }
      if (language) {
        filters.language = language;
      }
      if (genre) {
        filters.genre = genre;
      }
      if (format) {
        filters.format = format;
      }
  
      const movies = await Movie.find(filters);
      res.json(movies);
    } catch (err) {
      console.error('Error searching movies', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(5001, () => {
    console.log('Server started');
})