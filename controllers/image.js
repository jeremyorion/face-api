const Clarifai = require('clarifai');

// Required API initiation for using Clarifai API
const app = new Clarifai.App({
    apiKey: '623084a2e89941229482a7c154796096'
   });

const handleAPI = (request, response) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
    .then(data => {
        response.json(data);
    })
    .catch(err => response.status(400).json('Unable to work with API'))
}


const handleImage = (request, response, db) => {
    const { id } = request.body;
    
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        response.json(entries[0]);
    })
    .catch(err => response.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleAPI: handleAPI
}