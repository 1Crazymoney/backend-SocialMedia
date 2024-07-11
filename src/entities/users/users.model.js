import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    first_name: {
        type: String,
        required: false,
      },
    last_name: {
        type: String,
        required: false,
      },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    is_active: {
        type: Boolean,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "admin", "super_admin"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const User = model("User", UserSchema);
export default User; //Solo
