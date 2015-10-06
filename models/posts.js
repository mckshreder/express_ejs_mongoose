var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: String,
    body: String
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;