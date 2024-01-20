const mongoose=require("mongoose");
const ideaSchema = new mongoose.Schema({
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
  updatedAt: {
    type: Date,
    default: null,
  },
  likedBy:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  dislikedBy:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  tags: {
    type: [String],
  }
});

ideaSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

ideaSchema.virtual('likeCount').get(function () {
  return this.likedBy.length;
});

ideaSchema.virtual('dislikeCount').get(function () {
  return this.dislikedBy.length;
});


ideaSchema.set('toJSON', { virtuals: true });

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
