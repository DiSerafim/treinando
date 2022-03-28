const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, insira o nome do produto"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Por favor, insira a descrição do produto"],
  },
  price: {
    type: Number,
    required: [true, "Por favor, Insira o preço do produto"],
    maxLength: [8, "O preço não pode exceder 8 caracteres"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Por favor, insira a categoria do produto"],
  },
  Stock: {
    type: Number,
    required: [true, "Por favor, insira o estoque do produto"],
    maxLength: [4, "O estoque não pode exceder 4 caracteres"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);