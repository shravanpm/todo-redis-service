import mongoose, { Document, Schema, Model } from "mongoose";

export interface ITask extends Document {
  content: string;
}

const taskSchema: Schema<ITask> = new Schema({
  content: {
    type: String,
    required: true,
  },
});

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
