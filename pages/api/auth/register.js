// import bcrypt from "bcryptjs";
// import User from "../../../models/User";
// import connectDB from "../../../lib/db";

// export const register = async (req, res) => {
//   await connectDB();

//   if (req.method === "POST") {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ username, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered" });
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// };

import connectMongo from "@/lib/mongo";
import { createUser } from "@/lib/user";
import { generateAuthTokens } from "@/lib/token";
import User from "@/models/User";

export default async function register(req, res) {
  try {
    if (req.method === "POST") {
      if (!req.body?.email) {
        return res.status(400).json({ error: "Please enter a valid email." });
      }
      console.log("1");
      await connectMongo();
      console.log("2");
      if (await User.isEmailTaken(req.body.email)) {
        return res.status(400).json({
          error:
            "Email already taken - if this is yours, please log in instead.",
        });
      }
      const user = await createUser(req.body?.email, req.body?.password);
      console.log("3");
      const tokens = await generateAuthTokens(user);
      await user.save();

      res.status(200).json({ user, tokens });
    } else {
      res.status(400).json({ error: "invalid params" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
