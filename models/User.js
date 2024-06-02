const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        min : 4,
        max : 40
    },
    lastName : {
        type : String,
    },
    handle : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required: true,
        min : 8,
        max : 12,
    },
    pfp : {
        type:String,
    },
    followers : {
        type : Number,
        default : 0,
    },
    following : {
        type : Number,
        default : 0,
    },
    friends : [String]
})

const User = mongoose.model("User" , userSchema);

module.exports = {
    User
}



// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema({

//     handle : {
//         type : String,
//         required : true,
//         unique : true,
//     },
//     password : {
//         type : String,
//         required: true,
//         min : 8,
//         max : 12,
//     },

//     followers : {
//         type : Number,
//         default : 0,
//     },
//     following : {
//         type : Number,
//         default : 0,
//     },

// })

// const User = mongoose.model("User" , userSchema);

// module.exports = {
//     User
// }