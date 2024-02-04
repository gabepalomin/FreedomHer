const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  console.log(req.signedCookies);
  if (!token) {
    return next(
      new CustomError.UnauthenticatedError(
        "Authentication Invalid | JWT Cookie not found"
      )
    );
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    next(
      new CustomError.UnauthenticatedError(
        "Authentication Invalid | Invalid JWT Token from Cookie"
      )
    );
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomError.UnauthorizedError("Unauthorized to access this route")
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
