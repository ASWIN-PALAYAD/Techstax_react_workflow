import mongoose from "mongoose";

const flowSchema = new mongoose.Schema({
    nodes:{
        type:Array,
    },
    edges:{
        type:Array
    }
})

const flow = mongoose.model("Flow",flowSchema);
export default flow