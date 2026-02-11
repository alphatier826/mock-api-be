const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      default: ""
    },
    base_path: {
      type: String,
      default: ""
    },
    is_active: {
      type: Boolean,
      default: true
    },
    total_requests: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// unique slug per user
projectSchema.index({ user_id: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model("Project", projectSchema);
