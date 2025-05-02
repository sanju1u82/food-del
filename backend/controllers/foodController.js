import foodModel from "../models/foodModel.js";
import multer from "multer";
import fs from "fs";

// Add food item (no file, image is a string)
const addFood = async (req, res) => {
  console.log(req.body); // Logs text fields
  console.log(req.file); // Logs the uploaded file info

  const { name, description, price, category } = req.body;

  // Check for missing fields
  if (!name || !description || !price || !category || !req.file) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const imagePath = req.file.path; // path to uploaded image

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: imagePath,
  });

  try {
    await food.save();
    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};


const listFood = async (req, res) => {
  console.log("✅ /api/food/list endpoint hit");
  try {
    const foods = await foodModel.find({});
    console.log("Foods from DB:", foods); // Log what's coming from DB
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error in listFood:", error);
    res.json({ success: false, message: "error" });
  }
};

const removeFood = async (req, res) => {
  const { id } = req.params;
  console.log("🗑️ Deleting food with ID:", id);

  try {
    const food = await foodModel.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error in removeFood:", error);
    res.status(500).json({ success: false, message: "Error deleting food" });
  }
};






export { addFood, listFood, removeFood };
