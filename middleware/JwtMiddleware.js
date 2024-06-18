const jwt = require("jsonwebtoken");
const { data } = require("../controller/UserController");
exports.getToken = (userid) => {
  const token = jwt.sign({ userID: userid }, "secret", { expiresIn: "1hr" });
  return token;
};

exports.checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err, decode) => {
      if (err) {
        console.log(err);
      }
      console.log(new Date(decode.iat * 1000));
      console.log(new Date(decode.exp * 1000));
      console.log(decode.userID);
      req.user = decode;
      next();
    });
  }
  else{
    res.status(400).send({message:"Access denaid"})
  }
};
