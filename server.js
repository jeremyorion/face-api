const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

const app = express();
app.use( cors() );
app.use( bodyParser.json() );


// Establish the port that the app listens to
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`);
})

app.get('/', (request, response) => { response.send('it working') });
app.post('/signin', (request, response) => { signin.handleSignin(request, response, db, bcrypt) })
app.post('/register', (request, response) => { register.handleRegister(request, response, db, bcrypt) })
app.get('/profile/:id', (request, response) => { profile.handleProfile(request, response, db) })
app.put('/image', (request, response) => { image.handleImage(request, response, db) })
app.post('/imageURL', (request, response) => { image.handleAPI(request, response) })