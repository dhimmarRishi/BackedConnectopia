const { User} = require("../models/User")

const handleAddFriend = async (req,res) => {
    const {id} = req;
    const {friend_handle} = req.body;
    // console.log(id);
    // console.log("Adding a new friend")

    const user = await User.findOne({_id : id});
    // console.log(user);

    user.friends.push(friend_handle);
    // console.log(user);

    //bug : not to add the same friend twice...
    
    await user.save();


    res.send("Adding friend...")
}

module.exports = {
    handleAddFriend,
}