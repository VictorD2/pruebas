const { Router } = require('express');
const router = Router();
const videoControllers = require('../controllers/video.controllers');


router.get('/api/videos', videoControllers.getAll);
// router.post('/api/videos', videoControllers.obtener);


module.exports = router;