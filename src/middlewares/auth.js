import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  try {
    if(!req.headers.authorization) {
      return res.status(401).json(
        {
          suucess: false,
          message: "Unauthorized"
        }
      )
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    

    req.tokenData = {
      id: decoded.id,
      role: decoded.role
    }

    next();
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error authenticadd",
        error: error
      }
    )
  }
}