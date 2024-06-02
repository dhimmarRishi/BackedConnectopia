const { Post } = require("../models/Post");
const { User } = require("../models/User");

const handleNewPost = async (req, res) => {
  //console.log("Reached");
  //console.log(req.body);
  //console.log(req.file);

  try {
    const { text } = req.body;
    const { id } = req;
    const filename = req.file ? req.file.filename : "";

    const getUser = await User.findOne({ _id: id });
    // //console.log(getUser);

    const thePost = {
      Content: text,
      author: {
        u_id: id,
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        handle: getUser.handle,
        pfp: getUser.pfp,
      },
      Image: filename,
    };
    const newPost = new Post(thePost);

    const savedPost = await newPost.save();
    // //console.log("Saved Post : " + savedPost);
  } catch (e) {
    console.log("err : " + e);
    return res.json({ msg: "Error in creating post" });
  }

  res.json({ msg: "GO" });
};

const handleGetPosts = async (req, res) => {
  //console.log("Getting user's posts");
  try {
    const { id } = req;

    const posts = await Post.find({ "author.u_id": id });
    const user = await User.findById(id);
    const handle = user.handle;

    posts.Likes.get(handle);
    if (posts.Likes.get(handle)) {
      posts.isliked = true;
    } else {
      posts.isliked = false;
    }

    return res.json({ posts: posts });
  } catch (e) {
    console.log("err" + e);
    return res.json({ err: "Error in gettin the user posts" });
  }
};

const handleGetRandomPosts = async (req, res) => {
  try {
    const { id } = req;

    const posts = await Post.find().lean();
    const user = await User.findById(id).lean();

    const handle = user.handle;
    //console.log(handle);

    //console.log("Posts to be sent to the user are : ");

    posts.map((post) => {
      if (post.Likes[handle]) {
        post.isLiked = true;
      } else {
        post.isLiked = false;
      }
      return post;
    });

    return res.json({ posts: posts });
  } catch (e) {
    console.log("Error getting the posts : " + e);
    return res.json({ err: "Error in grttin the posts" });
  }
};

const handleLikePost = async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findById(post_id);
    if (!post) {
      res.status(404).json({ err: "No post match the id" });
    }
    const user = await User.findById(req?.id);
    if (!user) {
      res.status(404).json({ err: "No users match the id" });
    }

    if (post.Likes.get(user.handle)) {
      post.Likes.delete(user.handle);
    } else {
      post.Likes.set(user.handle, true);
    }

    await Post.findByIdAndUpdate(post_id, post, { new: true });

    res.status(200).json({ msg: "Works fine", post: post });
  } catch (e) {
    console.log("Err : " + e);
    res.json({ msg: "Error in liking the post" });
  }
};

const handleCommentPost = async (req, res) => {
  //console.log("Adding a comment")
  try {
    const { post_id } = req.params;
    const { id } = req;
    const { text } = req.body;

    const post = await Post.findById(post_id);

    const user = await User.findById(id);

    const newComment = {
      text: text,
      a_handle: user.handle,
      pfp: user.pfp,
    };

    post.Comment.push(newComment);

    await post.save();

    return res.status(200).json({ post: post });
  } catch (e) {
    console.log("Error : " + e);
  }
};

module.exports = {
  handleNewPost,
  handleGetPosts,
  handleGetRandomPosts,
  handleLikePost,
  handleCommentPost,
};
