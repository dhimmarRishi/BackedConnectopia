const { User } = require("../models/User");

const handleUserInfo = async (req, res) => {
  console.log("Getting the user");
  
  const { id } = req;
  const user = await User.findOne({ _id: id }).lean();
  if (!user) return res.json({ msg: "User not found" });

  
  console.log(user)
  res.status(200).json({user});
};

module.exports = { handleUserInfo };
