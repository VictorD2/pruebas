const videoControllers = {};
const pool = require('../database');

videoControllers.getAll = async(req, res) => {
    const data = await pool.query('SELECT * FROM empleado');
    res.json(data);
};

// videoControllers.obtener = async(req, res) => {
//     const { nombre } = req.body;
//     const newVideo = {
//         Nombre:nombre,
//         Ruta_Video: '/uploads/' + req.file.filename
//     }
//     const data=await pool.query('INSERT INTO videos set ? ',[newVideo]);
//     console.log(data);
//     console.log(nombre);
//     console.log(req.file);
//     res.redirect('/');
// };

module.exports = videoControllers;