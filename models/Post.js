// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     author : {
//         type :  mongoose.Schema.Types.ObjectId,
//         ref : 'User',
//         required : true,
//     } ,
//     Content : {
//         type : String,
//         required : true,
//     } ,
//     Image : {
//         type : String,
//     }
// });

// const Post = mongoose.model("posts" , postSchema);

// module.exports = {
//     Post
// }


const mongoose = require('mongoose');
const { User } = require('./User');

const postSchema = new mongoose.Schema({
    author : {
        u_id : {
            type : String,
            required : true,
        },
        firstName : {
            type : String,
            required : true,
        },
        handle : {
            type : String,
            required : true,
            // unique : true
        },
        lastname : {
            type : String,
        },
        pfp : {
            type : String,
        }
    } ,
    Content : {
        type : String,
        required : true,
    } ,
    Image : {
        type : String,
    },
    Likes : {
        type : Map,
        of : Boolean,
        default : {}
    },
    Comment : [
        {  
            text : {
                type : String,
                required : true
            },
            a_handle : {
                type : String,
                required : true
            },
            pfp : String
        }
    ]
}, {timestamps : true});

const Post = mongoose.model("posts" , postSchema);

module.exports = {
    Post
}
