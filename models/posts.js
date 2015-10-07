var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = Schema({
    title: String,
    body: String,
    _creator : { type: Schema.Types.ObjectId, ref: 'User' }
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;