 
require('dotenv').config();
const express = require('express');
const method = require('method-override');
const routes = require('./routes/product');

const app = express();
const port = process.env.PORT;

//Setup Engine
app.set('view engine', 'jsx');

app.engine('jsx', require('express-react-views').createEngine());

app.use(method('_method'));

app.use(express.static(__dirname+'/public'));

app.use(express.urlencoded({extended:false}));
//Use express middleware to parse JSON
app.use(express.json());


//======= Middleware ======
app.use((req, res, next) => {
    console.log('I run for all the routes.');
    next();
});

app.use('/', routes);

app.listen(port, () =>console.log(`Listening to port ${port}`));