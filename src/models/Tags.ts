import { model, Schema } from "mongoose";


const tagschema = new Schema({
    name: { type: Schema },
    post: [{ type: Schema.Types.ObjectId, ref: "post" }]
})

const Tag = model("Tag", tagschema)

export default Tag