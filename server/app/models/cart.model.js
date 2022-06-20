const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    products: [
      {
        title:{type: String, required: true},
        _id: mongoose.Schema.Types.ObjectId,
        img:{type: String, required: true},
        quantity:{type: Number, required: true},
        price:{type: Number, required: true},
        color:{type: String, required: true},
        size:{type: String, required: true},
      }
    ],
    quantity: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);