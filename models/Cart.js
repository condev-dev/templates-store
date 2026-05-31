import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Template" }],
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
