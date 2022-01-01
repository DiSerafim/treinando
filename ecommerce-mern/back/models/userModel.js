const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, insira seu nome"],
        maxlength:[30, "O nome não pode ter mais de 30 "],
        minlength:[4, "O nome deve ter mais de 4 caracteres"],
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
        minlength: [8, "A senha deve ter mais de 8 caracteres"],
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);