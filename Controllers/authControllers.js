const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const User = require("../Models/User");
const { model } = require("mongoose");



const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash: hashedPassword });
    res.json({ message: "✅ User registered", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) =>{
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
}


model.export= {register, login}