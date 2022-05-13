const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedShowsSchema = new Schema(
  {
    savedItem: [
      {
        name: String,
        qty: Number,
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

let savedShowsModel = mongoose.model("SavedShow", savedShowsSchema);
module.exports = savedShowsModel;
