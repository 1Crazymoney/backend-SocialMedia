
export const isSuperAdmin = (req, res, next) => {
  try {
    if (!req.tokenData || req.tokenData.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "You don't have permissions",
      error: error.message
    });
  }
};
