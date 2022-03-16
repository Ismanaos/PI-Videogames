const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api/', require('./Videogames.js'))
router.use('/api/', require('./Genres.js'))

module.exports = router;
