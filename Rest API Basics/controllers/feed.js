const { validationResult } = require('express-validator/check');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            { 
                title: 'First Post', 
                content: 'This is the first post!', 
                imageUrl: 'images/drinks.png',
                creator: {
                    name: 'Mohammd Junaid Khan'
                },
                createdAt: new Date()
            }]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.errors.length > 0){
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }

    const title = req.body.title;
    const content = req.body.content;
    // Create post in db;
    res.status(201).json({
        message: 'Post created successfully!',
        post: { _id: new Date().toISOString(), title: title, content: content, creator: { name: 'Mohammad Junaid Khan', createdAt: new Date()}}
    });
};