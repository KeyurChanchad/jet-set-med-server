// username
// address user
// country user want to go
// purpose not required
// issubscriptiontaken
// ispaidby admin
// company ref

// RegisteredStudent model

const { Schema, model } = require("mongoose");

const registeredStudentSchema = new Schema({
   name : {
    type: String,
    require: true,
  },
  address: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    default: ''
  },
  isSubscriptionTaken: {
    type: Boolean,
    required: true,
  },
  amountPaidByAdmin: {
    type: Boolean,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field before each save
registeredStudentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model("RegisteredStudent", registeredStudentSchema);