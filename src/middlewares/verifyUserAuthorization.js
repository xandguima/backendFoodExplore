const AppError = require("../utils/AppError")

function verifyUserAuthorization(ruleToVerify) {
  return (request, response, next) => {
    const { rule } = request.user

    if (rule !== ruleToVerify) {
      throw new AppError("unauthorized", 401)
    }

    return next()
  }
} 
module.exports = verifyUserAuthorization