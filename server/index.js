import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//components
import connect from "./database/connect.js";
import userRouter from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";

//Initialization
const app = express();
dotenv.config();
app.use(cors({
  origin: '*', // Or specify a specific origin like 'http://example.com'
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Middleware to parse JSON data
app.use(express.json());

//connection
connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/BlogDB");

app.get("/", (req, res) => {
  res.status(403).send("Forbidden");
});

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[PASS] listening on port ${PORT}.`);
});
