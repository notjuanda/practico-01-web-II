const express = require('express');
const session = require('express-session'); 
const fileUpload = require('express-fileupload'); 
const db = require('./models');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.use(session({
    secret: 'mi-secreto', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  
}));

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.usuarioNombre = req.session.usuarioNombre;
    res.locals.usuarioId = req.session.usuarioId;
    next();
});

db.sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa.');
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Base de datos sincronizada.");
    });

    app.get('/', async (req, res) => {
        try {
            const lugares = await db.lugares.findAll();  
            res.render('index', { title: 'Inicio', lugares });  
        } catch (error) {
            console.error('Error al obtener los lugares:', error);
            res.status(500).send('Error al cargar la página de inicio.');
        }
    });

require('./routes/index')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
