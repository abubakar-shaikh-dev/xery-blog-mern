import mongoose from 'mongoose';

const postSchema =  mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    cloudinary_id:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const Post = new mongoose.model("Post",postSchema);

export default Post;