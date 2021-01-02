const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConncet = (callback) => {
    MongoClient
    .connect('mongodb+srv://:@cluster0.wxcwk.mongodb.net/node?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = mongoConncet; 

 

