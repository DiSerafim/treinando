const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

// registra um usuário
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "Este é um exemplo de id",
            url: "urlFotoPerfil",
        },
    });
    sendToken(user, 201, res);
});

// Login de usuário
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // Verificar se o usuário forneceu senha e e-mail correto
    if (!email || !password) {
        return next(new ErrorHander("Por favor, insira o e-mail e a senha", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHander("Email & Senha, inválido", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHander("Email ou Senha, inválido", 401));
    }
    sendToken(user, 200, res);
});

// Logout usuário
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Desconectado",
    });
})

// Esqueceu a senha(email para recuperação e senha)
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander("Usuário não encontrado", 404));
    }
    // Obter token de redefinição de senha
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;
    const message = `Seu token de redefinição de senha é :-
      \n\n ${resetPasswordUrl} \n\n se você não solicitou este e-mail, por favor, ignore-o`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Recuperação de senha do ecommerce`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email enviado para: '${user.email}' com sucesso`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHander(error.message, 500));
    }

})

// resetar senha de login
