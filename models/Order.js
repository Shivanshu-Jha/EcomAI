import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  _id: String,
  title: String,
  price: Number,
  quantity: Number,
  image: String,
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  customer: {
    name: String,
    address: String,
    phone: String,
  },
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
