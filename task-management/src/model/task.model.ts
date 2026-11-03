import mongoose from "mongoose";


interface ITask extends mongoose.Document {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending"
        },
        dueDate: { type: Date, required: true }
    }
)

export const Task =mongoose.model<ITask>("Task", taskSchema);