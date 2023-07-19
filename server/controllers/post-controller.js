import mongoose from "mongoose";
import Post from "../models/post-model.js";
import User from "../models/user-model.js";

//Utils
import cloudinary from "../utils/cloudinary.js";
import slugify, { slugifyUpdate } from "../utils/slugify.js";

export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find({}, { description: 0, cloudinary_id: 0 }).populate("user", "name username");

    if (posts.length === 0) {
      return res.status(404).json({ posts: [] });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function getUserAllPosts(req, res) {
  try {
    const userId = req.user_id;

    const posts = await Post.find({ user: userId }).sort({ _id: -1 });

    if (posts.length === 0) {
      return res.status(200).json({ posts: [] });
    }

    const userIds = posts.map((post) => post.user);

    const users = await User.find({ _id: { $in: userIds } });

    const userMap = users.reduce((map, user) => {
      map[user._id] = user;
      return map;
    }, {});

    const postsWithUser = posts.map((post) => {
      const user = userMap[post.user];
      return {
        ...post.toObject(),
        user: {
          _id: user._id,
          name: user.name,
        },
      };
    });

    return res.status(200).json({ posts: postsWithUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

export async function  addPost(req, res) {

  
  try {
    //USER ID COMING FROM DECODING THE JWT TOKEN
    const user = req.user_id;
    
    //Cloudinary ID & URL declarations
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.body.imageURL)
    const cloudinary_id = public_id;
    const imageURL = secure_url;

    // Data Declaration Coming From Frontend through FORM-DATA
    const { title, category,summary, description, date } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ msg: "Invalid title" });
    }

    if (!category || typeof category !== "string") {
      return res.status(400).json({ msg: "Invalid Category" });
    }

    if (!summary || typeof summary !== "string") {
      return res.status(400).json({ msg: "Invalid summary" });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({ msg: "Invalid description" });
    }

    if (!imageURL || typeof imageURL !== "string") {
      return res.status(400).json({ msg: "Invalid imageURL" });
    }

    if (!cloudinary_id || typeof cloudinary_id !== "string") {
      return res.status(400).json({ msg: "Invalid cloudinary_id" });
    }

    if (!date) {
      return res.status(400).json({ msg: "Invalid date" });
    }

    if (!user || typeof user !== "string") {
      return res.status(400).json({ msg: "Invalid user" });
    }

    let userExist;

    try {
      userExist = await User.findById(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }

    if (!userExist) {
      return res.status(404).json({ msg: "User not Found." });
    }

    const slug = slugify(title)

    const newPost = new Post({
      title,
      category,
      summary,
      description,
      slug,
      date,
      imageURL,
      cloudinary_id,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    userExist.posts.push(newPost);
    await userExist.save({ session });

    await newPost
      .save({ session })
      .then(() => {
        session.commitTransaction();
        return res.status(201).json({ msg: "Post created successfully" });
      })
      .catch((error) => {
        return res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function updatePost(req, res) {
  try {
    const user = req.user_id; //Get the user id from JWT token verify middleware
    const post_id = req.params.id;
    
    // Data Declaration Coming From Frontend through FORM-DATA
    const { title, category, summary, description } = req.body;

    
    const checkPost = await Post.findById(post_id);
    if (!checkPost) {
      return res.status(404).json({ msg: "Post not found" });
    }
    
    //Check if Post's User_id is = Jwt User_id
    if(checkPost.user != user){
      return res.status(401).json({ msg: "Unauthorized" }); // Send a Unauthorized response
    }

    //Cloudinary Delete
    await cloudinary.uploader.destroy(checkPost.cloudinary_id)

    //Cloudinary Upload New Image
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.body.imageURL)
    
    //Cloudinary ID & URL declarations
    const cloudinary_id = public_id;
    const imageURL = secure_url;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ msg: "Invalid title" });
    }

    if (!category || typeof category !== "string") {
      return res.status(400).json({ msg: "Invalid Category" });
    }

    if (!summary || typeof summary !== "string") {
      return res.status(400).json({ msg: "Invalid summary" });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({ msg: "Invalid description" });
    }

    if (!imageURL || typeof imageURL !== "string") {
      return res.status(400).json({ msg: "Invalid imageURL" });
    }

    if (!cloudinary_id || typeof cloudinary_id !== "string") {
      return res.status(400).json({ msg: "Invalid cloudinary_id" });
    }

    if (!user || typeof user !== "string") {
      return res.status(400).json({ msg: "Invalid user" });
    }

    const slug = slugifyUpdate(title,checkPost.slug)

    await Post.findByIdAndUpdate(post_id, {
      title,
      category,
      summary,
      description,
      slug,
      date:checkPost.date,
      imageURL,
      cloudinary_id,
      user,
    })
      .then((data) => {
        return res.status(200).json({ msg: "Post updated successfully" ,data});
      })
      .catch((error) => {
        return res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function getUserPost(req, res) {
  try {
    const user = req.user_id; //Get the user id from JWT token verify middleware
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //Check if Post's User_id is = Jwt User_id
    if(post.user != user){
      return res.status(401).json({ msg: "Unauthorized" }); // Send a Unauthorized response
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

export async function getPost(req, res) {
  try {
    const slug = req.params.slug;
    const posts = await Post.find({ slug: slug }).populate("user","username name profileImageURL");

    if (posts.length === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }

    return res.status(200).json({ post: posts[0] });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}


export async function deletePost(req, res) {
  try {
    const id = req.params.id; // Get the post ID from the request parameters
    const jwt_user_id = req.user_id; //Get the user id from JWT token verify middleware

    if (!id || id.trim() === "") {
      // Check if ID is missing or empty
      return res.status(400).json({ msg: "ID is required" }); // Send a bad request response
    }

    const session = await mongoose.startSession(); // Start a MongoDB session
    session.startTransaction(); // Start the transaction

    const post = await Post.findById(id).populate("user"); // Find the post by ID and populate the "user" field

    //Check if Post's User_id is = Jwt User_id
    if(post.user._id != jwt_user_id){
      return res.status(401).json({ msg: "Unauthorized" }); // Send a Unauthorized response
    }

    if (!post) {
      // Check if post is found
      session.abortTransaction(); // Abort the transaction
      session.endSession(); // End the session
      return res.status(404).json({ msg: "Post not found" }); // Send a not found response
    }

    //Delete Image From Cloudinary
    cloudinary.uploader.destroy(post.cloudinary_id,(error, result) => {
      if (error) {
        return res.status(404).json({ msg: "Error deleting image" ,error}); // Send a not found response
      }
    })

    // Remove post id from user collection
    post.user.posts.pull(post); // Remove the post from the user's posts array
    await post.user.save({ session }); // Save the user with the updated posts array using the session

    await Post.findByIdAndDelete(id); // Delete the post by ID
    session.commitTransaction(); // Commit the transaction
    return res.status(200).json({ msg: "Post deleted successfully" }); // Send a success response
  } catch (error) {
    return res.status(500).json({ msg: error.message }); // Send an error response
  }
}

export async function getPostsByCategory(req, res) {
  try {
    const { category } = req.params;

    const posts = await Post.find({ category:category },{ description: 0, cloudinary_id: 0 }).populate("user","name username");

    if (posts.length === 0) {
      return res.status(200).json({ status: 0, msg: "Posts Not Found.",posts });
    }

    return res.status(200).json({ status: 1, msg: "Posts Found", posts });
  } catch (error) {
    return res.status(500).json({ status: 0, msg: `Server Error: ${error.message}` });
  }
}

export async function getPostsBySearch (req, res) {
  try {
    const { key, limit } = req.query;

    if (!key) {
      return res.status(400).json({ error: "Search key is required." });
    }

    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res
        .status(400)
        .json({ error: "Limit should be a positive number." });
    }

    const regex = new RegExp(key, "i");
    const results = await Post.find({ title: regex })
      .limit(parsedLimit)
      .select("title slug imageURL")
      .exec();

    // Check if the results array is empty and return an empty array if no posts are found.
    if (results.length === 0) {
      return res.json([]);
    }

    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
}

export async function getPostsBySearchQuery (req, res) {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({ error: "Search key is required." });
    }

    const regex = new RegExp(query, "i");
    const results = await Post.find({ title: regex },{ description: 0, cloudinary_id: 0 })
      .populate("user","name username");

    // Check if the results array is empty and return an empty array if no posts are found.
    if (results.length === 0) {
      return res.json([]);
    }

    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "An error occurred while processing the request.",error:error.message });
  }
}