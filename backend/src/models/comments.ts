import { InferSchemaType, model, Schema } from "mongoose";

const commentSchema = new Schema({
    // userId: { type: Schema.Types.ObjectId, required: true },
    // title: { type: String, required: true },
    noteId: {type: String, required: true},
    username: { type: String,},
    text: { type: String },
}, { timestamps: true });

type Comment = InferSchemaType<typeof commentSchema>;

export default model<Comment>("Comment", commentSchema);