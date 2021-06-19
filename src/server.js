// Server.js : tiene tan solo el código del servidor
const express = require('express');
const exphbs = require('express-handlebars');
const { extname } = require('path');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const expSession = require('express-session');



// Inicializaciones
const app = express();


// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));  // Esto sirve para que nos de la ruta entera de una carpeta, en este caso de Views
// Handlebars para express
app.engine('.hbs' , exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname : '.hbs'   // Extendemos la extension handlebars a .hbs
}))

app.set('view engine', '.hbs');


// Middlewares
app.use(express.urlencoded({extended: false})); // Lo que hace esta configuracion, es decirle al servidor que cada vez que llegan datos de un formulario a traves de cualquier tipo de metodo vamos a tratar de convertir esos datos en un objeto JSON para así manipularlo en código
app.use(morgan('dev'));
// app.use(session ({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized:true

// }))
app.use(flash());
// Para la sesion
app.use(
    expSession({
      secret: ["empanadas tucumanas sin pasas de uva ni papa"],
      resave: true,
      saveUninitialized: true
    })
  );

// Global Variables



// Routes
app.use(require('./routes/index.routes'));  // Aca definimos las rutas, pero que vaya a buscarla a estos archivos
app.use('/operaciones', require('./routes/operaciones.routes'));
app.use(require('./routes/users.routes'));
// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public'))); // Sirve para que el navegador o cualquier aplicacion pueda acceder facilmente a la carpeta public



module.exports = app;