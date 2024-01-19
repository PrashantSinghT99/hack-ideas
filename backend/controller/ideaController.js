const { get } = require("mongoose");
const Idea = require("../models/IdeaModal");
const User = require("../models/UserModal");
const addIdea = async (req, res) => {
  const { id } = req.user;
  const { title, description, tags } = req.body;

  if (!title || !description || !tags) {
    res.send(400).json({ error: "Please enter all the fields" });
  }
  try {
    const newIdea = await Idea.create({
      title: title,
      description: description,
      tags: tags,
      createdBy: id,
    });

    const populatedIdea = await Idea.findById(newIdea._id).populate(
      "createdBy"
    );
    res.status(201).json(populatedIdea);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//on click of edit button
const editIdea = async (req, res) => {
  const { title, description, tags } = req.body;
  const { id: ideaId } = req.params;
  try {
    const currentIdea = await Idea.findById(ideaId);

    if (!currentIdea) {
      return res.status(404).json({ error: "Idea not found" });
    }
    if (title) currentIdea.title = title;
    if (description) currentIdea.description = description;
    if (tags) currentIdea.tags = tags;

    await currentIdea.save();
    res.status(204).json(currentIdea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//like

const updateLike = async (req, res) => {
  const { ideaId } = req.params;
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) res.send(401).json({ message: "Unauthorized" });

    const getIdea = await Idea.findById(ideaId);

    if (!getIdea) {
      return res.status(404).json({ error: "Idea not found" });
    }

    const alreadyLiked = getIdea.likedBy.includes(userId);

    if (!alreadyLiked) {
      // User likes the idea
      await Idea.findByIdAndUpdate(ideaId, {
        $addToSet: { likedBy: userId },
        $pull: { dislikedBy: userId }
      }, { new: true });

    }
    const updatedIdea = await Idea.findById(ideaId);
    res.status(200).json({ updatedIdea, likeCount: updatedIdea.likedBy.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//dislike
const updateDislike = async (req, res) => {
  const { ideaId } = req.params;
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) res.send(401).json({ message: "Unauthorized" });

    const getIdea = await Idea.findById(ideaId);

    if (!getIdea) {
      return res.status(404).json({ error: "Idea not found" });
    }
    const alreadyDisliked = getIdea.dislikedBy.includes(userId);

    if (!alreadyDisliked) {
      // User dislikes the idea
      await Idea.findByIdAndUpdate(ideaId, {
        $addToSet: { dislikedBy: userId },
        $pull: { likedBy: userId }
      }, { new: true });

    }


    const updatedIdea = await Idea.findById(ideaId);
    res.status(200).json({ updatedIdea, dislikeCount: updatedIdea.dislikedBy.length });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//sorting vote counts and creation date

module.exports = { addIdea, editIdea, updateLike, updateDislike };
