const config = {
  apiUrl:
    process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "",
  jwt: process.env.JWT_SECRET,
};

export default config;
