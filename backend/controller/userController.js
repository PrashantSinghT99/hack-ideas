const bcrypt = require("bcrypt");
const User = require("../models/UserModal");
const generateToken=require("../utils/generateToken")
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
                token: generateToken(existingUser._id)
            });
        }
        else {
            res.status(404).json({
                error: "No employee found pls register!"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { registerUser, loginUser };
