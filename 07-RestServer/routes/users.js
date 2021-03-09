const { Router } = require('express');
const { check } = require('express-validator');
const {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
} = require('../controllers/users');
const { roleValidator, emailValidator, userIdValidator } = require('../helpers/db-validators');
const { fieldValidators } = require('../middlewares/field_validate');
const validateJWT = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('id', 'No es un ID válido').isMongoId().custom(userIdValidator),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'es obligatorio y deve de tener 6 letras').isLength({ min: 6, }),
    check('email', 'el correo no es valido').isEmail().custom(emailValidator),
    // este role sera consumido desde models
    check('role').custom(roleValidator),
    // check('role', 'no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    fieldValidators
], postUsers);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId().custom(userIdValidator),
    check('role').custom(roleValidator),
    fieldValidators
], putUsers);
router.patch('/', patchUsers);
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId().custom(userIdValidator),
    fieldValidators
], deleteUsers);

module.exports = router;