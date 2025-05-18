import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  image:{
    public_id: String,
    secure_url: String
  }    
}, {
    timestamps: true
})

export default mongoose.model("Products", productSchema)
