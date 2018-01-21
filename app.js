var express = require('express') //getting require app

var app = express(); // declaring what app it is

var port =  process.env.PORT || 5000; //port declaration

var nav = [{
    Link:'/Books',
    Text: 'Book'
},
{
    Link:'/Authors',
    Text:'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var authorRouter = express.Router();

app.use(express.static('public')); // using the static data
app.set('views','./src/views'); // setting up the views what we 've got

authorRouter.route('/Authors')
    .get(function(req,res) {
        res.send('Authors are here');
    });

app.use('/Books', bookRouter);
app.use('/Authors', authorRouter);
var handlebars = require('express-handlebars'); //intilaizing express-handlebars
app.engine('.hbs', handlebars({extname: '.hbs'})) //engune using handlebars

// app.set('view engine','.hbs'); //seetting up handlebar engines
app.set('view engine','ejs'); //seetting up ejs engines


app.get('/', function(req, res) { //simple routing 
    //rendering the index with title obj and arrey of list obj to display on theview
    res.render('index', {
        title: 'hello from renders',
        nav: [{
            Link:'/Books',
            Text: 'Books'
        },
        {
            Link:'/Authors',
            Text:'Authors'
        }]
    });
});

app.get('/books', function(req, res) {  //simple routing 
    res.send('books are here');
});

app.get('/authors', function(req, res) {  //simple routing 
    res.send('Authors are here');
});

app.listen(port, function(err) { //to know port to listen
    console.log('running server on port' + port)
});