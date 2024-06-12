const { ResponseCodes, UserResponseCodes } = require("../../constants");
const multer = require("multer");
const MedicalReport = require("../models/MedicalReport");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 * 5 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  const filetypes = /pdf|doc|docx|jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Files Only!");
  }
}

// Create a new service
const uploadMedicalReport = async (req, res) => {
  try {
    upload(req, res, (error) => {
      if (error) {
        return res.status(ResponseCodes.BAD_REQUEST).json({
          code: ResponseCodes.BAD_REQUEST,
          success: false,
          message: "Something went wrong",
          error,
        });
      } else {
        if (req.file == undefined) {
          return res.status(ResponseCodes.BAD_REQUEST).json({
            code: ResponseCodes.BAD_REQUEST,
            success: false,
            message: "No file selected.",
          });
        } else {
          const newReport = new MedicalReport({
            title: req.body.title,
            description: req.body.description,
            filePath: `/uploads/${req.file.filename}`,
          });

          newReport
            .save()
            .then((report) =>
              res.status(ResponseCodes.OK).json({
                code: ResponseCodes.OK,
                success: true,
                message: "File uploaded successfully.",
                data: report,
              })
            )
            .catch((err) =>
              res.status(ResponseCodes.BAD_REQUEST).json({
                code: ResponseCodes.BAD_REQUEST,
                success: false,
                message: "No file selected.",
              })
            );
        }
      }
    });
  } catch (error) {
    return res.status(ResponseCodes.BAD_REQUEST).json({
      code: ResponseCodes.BAD_REQUEST,
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  uploadMedicalReport,
};
