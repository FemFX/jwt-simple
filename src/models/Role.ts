import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  value: {
    type: String,
    unique: true,
    default: "USER",
  },
});

export default model("Role", roleSchema);
