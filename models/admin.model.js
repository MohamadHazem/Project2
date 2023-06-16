const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

});

adminSchema.pre("save", function (next) {
  const admin = this;
  if (!admin.isModified("password")) {
    return next();
  }
  admin.password = bcrypt.hashSync(admin.password, 10);
  next();
});

adminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
