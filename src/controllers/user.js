const { ResponseCodes } = require("../../constants");
const User = require("../models/User");
const { addUserValidation } = require("../validations/user");

const updateUser = async (req, res) => {
  return addUserValidation(req.body)
    .then(async (data) => {
      const updates = Object.keys(data);
      console.log("req body keys ", updates)
      try {
        const user = await User.findById(req.user_id); // Assuming the user ID is stored in req.user by authMiddleware
        if (!user) {
          return res
            .status(ResponseCodes.NOT_FOUND)
            .send({
              code: ResponseCodes.NOT_FOUND,
              success: false,
              message: "User not found",
            });
        }
        console.log("data ", data);
        updates.forEach((update) => (user[update] = data[update]));
        await user.save();
        return res
          .status(ResponseCodes.OK)
          .json({
            code: ResponseCodes.OK,
            success: true,
            message: "User updated successfully.",
            data: user
          });
      } catch (error) {
        return res
          .status(ResponseCodes.FORBIDDEN)
          .json({ code: ResponseCodes.FORBIDDEN, success: false, message: "Something went wrong", error });
      }
    })
    .catch((error) => {
      return res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({ code: ResponseCodes.INTERNAL_SERVER_ERROR, message: "Schema validation error", error: error, success: false });
    });
};

module.exports = {
  updateUser,
};
