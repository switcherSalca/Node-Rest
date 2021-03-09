const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/field_validate');

const router = Router();

router.post('/login', [
    check('email', 'el correo es obligatorio').isEmail(), check('password', 'La contraseña es obligatoria').not().isEmpty(), fieldValidators,
], login);

module.exports = router;