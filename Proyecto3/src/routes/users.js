const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')

router.get('/', usersController.list)
router.get('/Asc', usersController.listAsc)
router.get('/Desc', usersController.listDesc)
router.post('/add', usersController.save);
router.get('/delete/:id', usersController.delete);
router.get('/update/:id', usersController.edit);
router.post('/update/:id', usersController.insertUpdate);

module.exports = router;