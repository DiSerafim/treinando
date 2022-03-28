const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, insira seu nome"],
    maxLength: [30, "O nome não pode ter mais de 30"],
    minLength: [4, "O nome deve ter mais de 4 caracteres"],
  },
  email: {
    type: String,
    required: [true, "Por favor, insira seu email"],
    unique: true,
    validate: [validator.isEmail, "Por favor, insira um email válido"],
  },
  password: {
    type: String,
    required: [true, "Por favor, insira sua senha"],
    minLength: [8, "A senha deve ter mais de 8 caracteres"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// comparar senha
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Gerando token de redefinição de senha
userSchema.methods.getResetPasswordToken = function () {
    // Gerando token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hashing e adicionando o token de senha de redefinição para userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);