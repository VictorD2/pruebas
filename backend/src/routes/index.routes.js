const { Router } = require('express');
const router = Router();
const pool = require('../database');
const path = require('path');

router.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

router.get('/home', async(req, res) => {
    const datos = await pool.query('SELECT * FROM videos');
    res.render('index', { datos });
});


module.exports = router;