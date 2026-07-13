const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user: {  //logined user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contact: {  //contact user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel

// owner - user
// contact - saved person