import User from "@/models/User";

const createUser = async (email, password) => {
  const user = await User.create({ email, password });
  return user;
};

export { createUser };
