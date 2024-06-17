import jwt from "jsonwebtoken";
import moment from "moment";
//const httpStatus = require("http-status");
// const config = require("../config/config");
//const userService = require("./user.service");
import Token from "@/models/Token";
//const ApiError = require("../utils/ApiError");
//const { tokenTypes } = require("../config/tokens");
import config from "@/config";
import { ApiError } from "next/dist/server/api-utils";

// /**
//  * Generate Token
//  * @param {ObjectId} userId
//  * @param {Moment} expires
//  * @param {string} type
//  * @param {string} [secret]
//  * @returns {string}
//  */

const generateToken = (userId, expires, type, secret = config.jwt) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

// /**
//  * Save a Token
//  * @param {string} token
//  * @param {ObjectId} userId
//  * @param {Moment} expires
//  * @param {string} type
//  * @param {boolean} [blacklisted]
//  * @returns {Promise<Token>}
//  */

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

// /**
//  * Verify token and reutrn token doc or throw an error if it is not valid
//  * @param {string} token
//  * @param {string} type
//  * @returns {Promise<Token}
//  */

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt);
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

// /**
//  * Generate auth tokens
//  * @param {User} user
//  * @returns {Promise<Object>}
//  */

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(30, "days");
  const accessToken = generateToken(user.id, accessTokenExpires, "access");

  const refreshTokenExpires = moment().add(30, "days");
  const refreshToken = generateToken(user.id, refreshTokenExpires, "refresh");
  await saveToken(refreshToken, user.id, refreshTokenExpires, "refresh");
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

// /**
//  * Generate reset password token
//  * @param {string} email
//  * @returns {Promise<string>}
//  */

// const generateResetPasswordToken = async (email) => {
//   const user = await userService.getUserByEmail(email);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
//   } else if (!user.password) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       "Please log in with google instead."
//     );
//   }
//   const expires = moment().add(
//     config.jwt.resetPasswordExpirationMinutes,
//     "minutes"
//   );
//   const resetPasswordToken = generateToken(
//     user.id,
//     expires,
//     tokenTypes.RESET_PASSWORD
//   );
//   await saveToken(resetPasswordToken, user.id, expires, "reset");
//   return resetPasswordToken;
// };

// /**
//  * Generate verify email token
//  * @param {User} user
//  * @returns {Promise<string>}
//  */

// const generateVerifyEmailToken = async (user) => {
//   const expires = moment().add(
//     config.jwt.verifyEmailExpirationMinutes,
//     "minutes"
//   );
//   const verifyEmailToken = generateToken(
//     user.id,
//     expires,
//     tokenTypes.VERIFY_EMAIL
//   );
//   await this.saveToken(
//     verifyEmailToken,
//     user.id,
//     expires,
//     tokenTypes.VERIFY_EMAIL
//   );
//   return verifyEmailToken;
// };

export {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  // generateResetPasswordToken,
  // generateVerifyEmailToken,
};
