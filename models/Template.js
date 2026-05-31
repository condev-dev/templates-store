import mongoose from "mongoose"

const TemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categories: [{ type: String }],
  price: { type: Number, required: true },
  demo_url: { type: String, default: "/" },
  file_url: { type: String, default: "/" },
  image: { type: String, required: true },
  sell_count: { type: Number, default: 0 }
})

export default mongoose.models.Template || mongoose.model("Template", TemplateSchema)
