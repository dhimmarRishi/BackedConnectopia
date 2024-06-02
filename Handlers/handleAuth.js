const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  // console.log("Register request");
  // console.log(req.body , req.file);
  try {
    const { file } = req;
    const filename = file ? file.filename : "";
    let { firstName, lastName, handle, password } = req.body;

    const noUser = await User.findOne({ handle });
    if (!firstName || !handle || !password) {
      return res.json({ msg: "Empty fields detected" }).status(400);
    } else if (noUser) {
      return res.json({ msg: "handle alredy in use"}).status(409);
    }

    const salt = await bcrypt.genSalt(12);
    const bpass = await bcrypt.hash(password, salt);

    const user = {
      handle,
      firstName,
      lastName,
      password: bpass,
      pfp: filename,
    };

    let newUser = await new User(user);
    const savedUser = await newUser.save();

    // console.log(savedUser)

    await delete savedUser.password

    // console.log("New User created...");

    return res.json({
      msg: "User created sucessfully",
      user: savedUser,
      status: 200,
    });
  } catch (e) {
    console.log("Error : " + e);
    res.status(404);
  }
};

const handleUserLogin = async (req, res) => {
  // console.log(req.body);

  const { handle, password } = req.body;
  const user = await User.findOne({ handle });


  if (!user) return res.status(403).json({ msg: "No user found" });

  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass) return res.status(800).json({ msg: "Wrong Password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  if (!token) return res.json({ msg: "oh hsit not good" });


  return res
    .status(200)
    .json({ msg: "Login successful", token: token });
};

module.exports = {
  handleRegister,
  handleUserLogin,
};
