const mongoose = require("mongoose");

const endpointSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      required: true
    },

    path: {
      type: String,
      required: true,
      trim: true
    },

    enabled: {
      type: Boolean,
      default: true
    },

    is_private: {
      type: Boolean,
      default: false
    },

    status_code: {
      type: Number,
      default: 200
    },

    response_headers: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    response_body: {
      type: String
    },

    response_type: {
      type: String,
      enum: ["json", "text", "xml"],
      default: "json"
    },

    delay_ms: {
      type: Number,
      default: 0
    },

    match_conditions: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    total_requests: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

//
// 🔹 ADD THIS PART HERE
// Ensures unique (project_id + method + path)
//
endpointSchema.index(
  { project_id: 1, method: 1, path: 1 },
  { unique: true }
);

module.exports = mongoose.model("Endpoint", endpointSchema);
