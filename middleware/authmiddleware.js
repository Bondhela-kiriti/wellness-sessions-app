const jwt = require("jsonwebtoken")

 const authmiddleware = (req, res, next) => {

   
     const authHeader = req.headers["authorization"];
     if (!authHeader) {
       return res.status(401).json({ error: "No token provided" });
     }

     const token = authHeader.split(" ")[1]; // "Bearer <token>"

     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       if (err) {
         return res.status(401).json({ error: "Invalid token" });
       }

       // Attach user info to req.user
       req.user = { id: decoded.id, email: decoded.email };
       next();
     });
   };

   

module.exports = authmiddleware