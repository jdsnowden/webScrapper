var mongoose = require('mongoose')

var Schema = mongoose.Schema

var ArticleSchema = new Schema ({
    text: String,
    link: String
});

var Article = mongoose.model("Article", ArticleSchema)


module.exports = Article;