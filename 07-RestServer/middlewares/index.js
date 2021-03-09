const fieldValidate = require('../middlewares/field_validate');
const validateJwt = require('../middlewares/validate-jwt');
const rolesValidators = require('../middlewares/validate-role');


module.exports = {
    ...validateJwt,
    ...fieldValidate,
    ...rolesValidators,
}