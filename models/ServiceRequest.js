const { default: mongoose } = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
  url: String,
  type: String,
  originalName: String,
  format: String,
}, { _id: false }); 


const requestService = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Hardware", "Software", "Network", "Account", "Other"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "RESOLVED", "CANCELLED"],
      default: "PENDING",
    },
    attachments: [AttachmentSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
if (mongoose.models.services) {
  delete mongoose.models.services;
}

module.exports = mongoose.model("services", requestService);
