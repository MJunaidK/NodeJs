const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConncet = (callback) => {
    MongoClient
    .connect('mongodb+srv://:@cluster0.wxcwk.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';  
}

exports.mongoConncet = mongoConncet; 
exports.getDb = getDb;

 

