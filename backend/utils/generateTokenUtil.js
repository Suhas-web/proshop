import jwt from "jsonwebtoken";

//Generate JWT token
const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId }, //payload
    process.env.jwtSecret, //secret
    {
      expiresIn: "30d", //options: expires in 30day
    }
  );

  // Set JWT as HTTP-Only Cookie
  res.cookie(
    "jwt", // name
    token, // value
    {
      // options
      httpOnly: true, //prevent access from javascript DOM
      secure: process.env.NODE_ENV === "PROD", //only send with https sites
      sameSite: "strict", // client sends cookie for only same server site which had sent cookie in first place
      maxAge: 30 * 24 * 60 * 60, // expires in 30day
    }
  );
};

export default generateToken;
