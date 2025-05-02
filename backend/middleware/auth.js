import jwt from "jsonwebtoken";


const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  console.log("🛡️ Token:", token);

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", token_decode);

    // ✅ Ensure body exists
    req.body = req.body || {};
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("❌ Token Verification Failed:", error.message);
    res.json({ success: false, message: "Error has Occured" });
  }
};



export default authMiddleware;
