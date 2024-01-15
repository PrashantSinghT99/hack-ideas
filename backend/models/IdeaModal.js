const mongoose=require("mongoose");
const ideaSchema = new mongoose.Schema({
  ideaId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
  }
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
