const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    
    fs.readFile(p, (err, fileContent) => {
        if(err) {
           cb([]);
        }else {
            try{
            console.log(JSON.parse(fileContent));
            let products= JSON.parse(fileContent);
            cb(products);
            } catch(err){
                cb([]);
            }
        }
        
    })
}

module.exports = class Product {

    constructor(t){
        this.title = t;        
    }

    save(){
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }
}