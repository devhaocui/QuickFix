// NOTE: /models/user.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/],
    },

    password: {
      type: String,
      required: true,
      minLength: 2,
    },

    avatar: {
      type: String,
    },

    aboutMe: {
      type: String,
      default: "", // NOTE: would render 'undefined' on Vue's frontend without this
    },

    workPhotos: {
      type: [String],
      default: [], // NOTE: mongoose already does this by default, but still good to have.
    },

    // NOTE: an array of each ratings for this provider
    userRatings: {
      type: [
        {
          name: { type: String },
          rated: { type: Number, min: 1, max: 5 },
          avatar: String,
          comment: String,
        },
      ],
    },

    averageRating: { type: Number },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
