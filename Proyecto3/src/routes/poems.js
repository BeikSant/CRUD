const express = require('express');
const router = express.Router();

const poemsController = require('../controllers/poemsController')

router.get('/:user_id', poemsController.list)
router.post('/add/:user_id', poemsController.save);
router.get('/delete/:id/:user_id', poemsController.delete);
router.get('/update/:id/:user_id', poemsController.edit);
router.post('/update/:id/:user_id', poemsController.insertUpdate);

module.exports = router;