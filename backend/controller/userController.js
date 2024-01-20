const bcrypt = require("bcrypt");
const User = require("../models/UserModal");
const generateToken = require("../utils/generateToken");
const Idea=require("../models/IdeaModal")
const registerUser = async (req, res) => {
  const { empId } = req.body;
  if (!empId) {
    res.status(400).json({ error: "Please Enter all the Fields" });
  }
  try {
    const existingUser = await User.findOne({ employeeId: empId });

    if (existingUser) {
      return res.status(400).json({
        error: "Employee already exists",
      });
    }

    const user = await User.create({ employeeId: empId });

    if (user) {
      res.status(201).json({
        employeeId: empId,
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { empId } = req.body;
  if (!empId) {
    res.status(400).json({ error: "Please Enter all the Fields" });
  }
  try {
    const existingUser = await User.findOne({ employeeId: empId });

    if (existingUser) {
      return res.status(201).json({
        message: "Login Successful",
        _id: existingUser._id,
        empId: existingUser.employeeId,
        token: generateToken(existingUser._id),
      });
    } else {
      res.status(404).json({
        error: "No employee found pls register!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllIdeas = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    res.send(401).json({ error: "Unauthorized user" });
  }
  try {
    const allIdeas = await Idea.find().populate("createdBy");
    res.status(200).json(allIdeas);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: "Internal Server Error" });
  }
};

//filter on basis creation dates and upvotes aka likes

const getFilterIdea=async(req,res)=>{

}

module.exports = { registerUser, loginUser, getAllIdeas,getFilterIdea };
