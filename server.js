var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require("mongoose");
//var mongoose = require("mongoose");


var PORT = process.env.PORT || 3000;
var app = express();

//app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

var scrapeURL = "https://old.reddit.com/r/FloridaMan/";

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var Article = require("./models/Article")

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: "main"
}));

var scrapeData = []

app.set('view engine', '.hbs');

app.get("/scrape", function (req, res) {
    request(scrapeURL, function(err, status, html){
        var $ = cheerio.load(html)
        $("p.title").each(function(err, elem){
            var text = $(elem).find("a").text();
            var data = {}
            data.text = text;
            data.link = $(elem).find("a").attr("href")
            scrapeData.push(data)
            Article.create(data)
            console.log(text)
        })
    });
    res.send("Scrape Complete");
});


app.get("/", function(req,res){
    Article.find ({}).then(function(dbArticles){
        console.log(dbArticles);
        res.render("index", {Article: dbArticles})
    });
});

app.get("/articles/:id", function(req, res){
    dbArticles.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbArticles){
    })
    .catch(function(err){
        res.render(err)
    })
})

app.post("/articles/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote){
        return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbnote._id}, {new: true})
    })
    .then(function(dbArticles){
        res.render(dbArticles)
    })
    .catch(function(err){
        res.render(err)
    })
})

app.listen(PORT, function () {
    console.log('app listening on localhost')
})

//index.js!!!