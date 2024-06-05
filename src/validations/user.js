const Joi = require('joi');

const addUserValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            firstName: Joi.string().required().min(2).max(50),
            lastName: Joi.string().required().min(2).max(50),
            email: Joi.string().email(),
            phoneNumber: Joi.string().regex(/^[0-9]{10}$/).messages({'error': `Phone number must have 10 digits.`}),
            password: Joi.string().pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*])[A-Za-z0-9!@#$%^&*()-_+=]{8,}$")),
            profilePhoto: Joi.string().allow(""),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

module.exports = { addUserValidation };