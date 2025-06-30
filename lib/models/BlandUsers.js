import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    otcDataRef: {
      type: Schema.Types.ObjectId,
      ref: "otcData", // 👈 This should match the model name used for the OTC data schema
    }
  },
  {
    timestamps: true,
  }
);


const BlandUser = mongoose.models?.BlandUser || mongoose.model("BlandUser", userSchema);

export default BlandUser;