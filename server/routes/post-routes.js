import {Router} from "express";

//Controllers
import * as postController from "../controllers/post-controller.js";

//Middlewares
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = Router();

//Public
router.get("/",postController.getAllPosts)
router.get("/slug/:slug",postController.getPost);
router.get("/category/:category",postController.getPostsByCategory);
router.get("/search",postController.getPostsBySearch);
router.get("/search/:query",postController.getPostsBySearchQuery);
  
//Protected
router.get("/user-all",verifyToken,postController.getUserAllPosts);
router.get("/:id",verifyToken,postController.getUserPost);
router.post("/",verifyToken,postController.addPost);
router.put("/:id",verifyToken,postController.updatePost);
router.delete("/:id",verifyToken,postController.deletePost);

export default router;
