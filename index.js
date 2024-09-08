const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const fileUpload = require('express-fileupload'); 

// Importar modelos
const db = require('./models');

// Inicializar express
const app = express();

// Configurar el uso de sesiones con almacenamiento en Sequelize
app.use(session({
    secret: 'juanda-secreto',  // Cambia este valor por algo más seguro en producción
    store: new SequelizeStore({
        db: db.sequelize,
    }),
    resave: false,  // No vuelve a guardar la sesión si no ha cambiado
    saveUninitialized: false,  // No guarda sesiones vacías
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  // La sesión expira en 1 día
        secure: false,  // Asegúrate de que esto sea `false` en desarrollo para no requerir HTTPS
        httpOnly: true  // Previene que el lado del cliente acceda a la cookie
    }
}));

// Usar fileUpload para manejar subida de archivos
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },  // Limite de tamaño de archivo de 50MB
}));

// Middleware para hacer que la variable `user` esté disponible en todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Configurar ejs para las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar middleware para manejar datos enviados en formularios
app.use(express.urlencoded({ extended: true }));

// Cargar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Cargar archivos estáticos desde la carpeta 'utils'
app.use('/utils', express.static(path.join(__dirname, 'utils')));

// Importar middleware de autenticación
const authMiddleware = require('./middlewares/authMiddleware');

// Importar las rutas centralizadas
const routes = require('./routes');  // Rutas centralizadas en 'routes/index.js'

// Cargar las rutas desde 'routes/index.js'
app.use('/', routes);

// Ruta para la página principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Página Principal' });  // Renderizar la vista 'index.ejs'
});

// Conexión a la base de datos y sincronización
db.sequelize.sync().then(() => {
    console.log("Base de datos conectada y sincronizada.");
}).catch((err) => {
    console.log("Error al sincronizar la base de datos:", err);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
