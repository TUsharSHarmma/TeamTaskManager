import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    submission: {
      type: String,
      default: ""
    },
    
    submittedAt: {
      type: Date
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: [
        "Todo",
        "In Progress",
        "Submitted",
        "Completed"
      ],
      default: "Todo"
    },

    submissionNote: {
      type: String,
      default: ""
    },

    dueDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Task",
  taskSchema
);