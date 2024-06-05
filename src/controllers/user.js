const { ResponseCodes } = require("../../constants");
const User = require("../models/User");
const { encrypt } = require("../services/encrypt_decrypt");
const { addUserValidation } = require("../validations/user");

const addUser = async (req, res)=> {
    return addUserValidation(req.body).then(async data => {
        try {
            const cipher = encrypt(data.password);
            const newUser = await User({ ...data, password: cipher });
            console.log('New User ', newUser);
            await newUser.save();
            
            return res.status(ResponseCodes.CREATED).json({ code: ResponseCodes.CREATED, success: true, message: 'User added successfully.' })
        } catch (error) {
            return res.status(200).json({ code: 401, message: 'Something went wrong', error });   
        }
    }).catch(error => {
        return res.status(200).json({ code: 401, message: 'Schema validation error', error: error });   
    });
    
}

module.exports = {
    addUser,
}