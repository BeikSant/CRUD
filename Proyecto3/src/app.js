const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//import rutas
const userRoustes = require('./routes/users');
const categorieRoustes = require('./routes/categories');
const poemRoustes = require('./routes/poems');
const { urlencoded } = require('express');

// settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'proyectodb'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', userRoustes);
app.use('/categories', categorieRoustes);
app.use('/poems', poemRoustes);


//static files
app.use(express.static(path.join(__dirname, 'public')))


//starting server
app.listen(app.get('port'), () => {
    console.log(`Server started on port 3000`);
});