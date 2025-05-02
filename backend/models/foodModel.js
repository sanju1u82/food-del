import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

const foodModel = mongoose.models.foods || mongoose.model("foods", foodSchema);

export default foodModel;
