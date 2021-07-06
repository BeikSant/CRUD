const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categoriesController')

router.get('/', categoriesController.list)
router.post('/add', categoriesController.save);
router.get('/delete/:id', categoriesController.delete);
router.get('/update/:id', categoriesController.edit);
router.post('/update/:id', categoriesController.insertUpdate);

module.exports = router;