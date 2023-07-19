import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ status: 0, msg: "Forbidden!" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        return res.status(404).json({ status: 0, msg: "User Not Found." });
      }
      req.user_id = data.user_id;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, msg: "Server Error", error: error.message });
  }
}