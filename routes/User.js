const express = require("express");
const { handleUserInfo } = require("../Handlers/handleUser");
const { handleAddFriend } = require('../Handlers/handleFriends')


const userRouter = express.Router();
userRouter.get("/", handleUserInfo);
userRouter.post('/friend' , handleAddFriend);

module.exports = {
  userRouter,
};

