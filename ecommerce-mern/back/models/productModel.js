const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, insira o nome do produto"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Por favor, insira a descrição do produto"]
    },
    price: {
        type: Number,
        required: [true, "Por favor, Insira o preço do produto"],
        maxlength: [8, "O preço não pode exceder 8 caracteres"]
    },
    rating: { // avaliação
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Por favor, insira a categoria do produto"]
    },
    stock: {
        type: Number,
        required: [true, "Por favor, insira o estoque do produto"],
        maxlength: [4, "O estoque não pode exceder 4 caracteres"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);