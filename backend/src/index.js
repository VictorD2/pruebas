const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const pool = require('./database');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'build/uploads'),
    filename: (req, file, cb) => {
        cb(null, path.join(Date.now() + '-' + file.originalname));
    }
});


//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://192.168.1.64:4000/api/videos');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(multer({
    storage,
    dest: path.join(__dirname, 'build/uploads')
}).single('image'));


//Routes
app.use(require('./routes/video.routes'));
app.use(require('./routes/index.routes'));
app.post('/api/videos',async(req,res)=>{
    const { nombre } = req.body;
    console.log(nombre);
    const newVideo = {
        Nombre:nombre,
        Ruta_Video: '/uploads/' + req.file.filename
    }
    const data=await pool.query('INSERT INTO videos set ? ',[newVideo]);
    console.log(data);
    console.log(nombre);
    console.log(req.file);
    res.redirect('/');
});
// Public
app.use(express.static(path.join(__dirname, 'build')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
})