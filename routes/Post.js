const express = require("express");
const multer = require("multer");
const { handleNewPost , handleGetPosts , handleGetRandomPosts , handleLikePost , handleCommentPost} = require("../Handlers/handleNewPost");


const postRouter = express.Router();

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/posts");
  },
  filename: (req, file, cb) => {
    cb(null, "post_" + Date.now().toString() + "_" + file.originalname);
  },
});

const upload2 = multer({ storage: storage2 });


postRouter.post("/",upload2.single('img'), handleNewPost);
postRouter.get("/userPost", handleGetPosts);

postRouter.get('/' , handleGetRandomPosts);

postRouter.patch('/:post_id/like', handleLikePost)
postRouter.patch('/:post_id/comment', handleCommentPost);


module.exports = {
  postRouter,
};
