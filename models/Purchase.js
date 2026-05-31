import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchases: [
    {
      templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
        required: true,
      },
    },
  ],
});

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", PurchaseSchema);
