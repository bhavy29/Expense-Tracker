// const jwt = require('jsonwebtoken')

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token
//   const data = JSON.parse(localStorage.getItem("user-info")); // token form google login

//   if (!token) {
//     return res.status(401).json({
//       message: 'Not authenticated'
//     })
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     // decoded = { id: user._id }
//     req.user = {
//       id: decoded.id
//     }

//     next()
//   } catch (error) {
//     return res.status(401).json({
//       message: 'Invalid or expired token'
//     })
//   }
// }

// module.exports = authMiddleware

const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email
    };

    next();
  }

  catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }

}

module.exports = authMiddleware