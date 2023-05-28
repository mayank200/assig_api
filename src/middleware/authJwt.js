const jwt = require("jsonwebtoken");
require("dotenv").config();

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

verifyToken = (req, res, next) => {
  let token = getTokenFrom(req);
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.Secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        msg: "Invalid Token"
      });
    }
    //  req.id = (decoded.id);
    //  req.userid = (decoded.userid);
    //  req.user_ip = (decoded.user_ip);
    //  req.role = (decoded.role);
    //  req.name = (decoded.name);
    // req.UserId = decrypt(decoded.id);
    // req.email = (decoded.email);
    // req.name = (decoded.fullname);
    // req.mobile_no = (decoded.mobilenumber);
    //req.admin_fullname=decoded.admin_fullname;
    next();
  });
};

verifyToken_mob = (req, res, next) => {
  let token = getTokenFrom(req);
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.Secret_mobile, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        msg: "Invalid Token"
      });
    }
     req['credentials'] = decoded;
  
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
  verifyToken_mob: verifyToken_mob
};
module.exports = authJwt;