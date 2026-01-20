import { model, Schema } from "mongoose";


const tagschema = new Schema({
    name: { type: String },
    post: [{ type: Schema.Types.ObjectId, ref: "Post" }]
})

const Tag = model("Tag", tagschema)

export default Tag