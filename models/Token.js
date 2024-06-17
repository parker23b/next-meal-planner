import { Schema, SchemaTypes, model, models } from "mongoose";

//import toJSON from "./plugins/toJSON";

const tokenSchema = Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      //   enum: [
      //     tokenTypes.REFRESH,
      //     tokenTypes.RESET_PASSWORD,
      //     tokenTypes.VERIFY_EMAIL,
      //   ],
      required: true,
      default: "access",
    },
    expires: {
      type: Date,
      required: true,
    },
    blackListed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//tokenSchema.plugin(toJSON);

// /**
//  * @typedef Token
//  */

const Token = models.Token || model("Token", tokenSchema);

export default Token;
