import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    },
    tags: [{ // add this field
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }],
    image: {           // Add this field
        type: String     // Stores the image path
    },
});

const Post = model("Post", PostSchema);
export default Post;
