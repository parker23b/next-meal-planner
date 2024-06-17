import Link from "next/link";
import { useState } from "react";
import apiClient from "@/lib/apiClient";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("api/auth/register", {
        email,
        password,
      });
      console.log(res);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Signup</button>
      </form>
      <div>
        <Link href="/login" className="link">
          login instead
        </Link>
      </div>
    </div>
  );
};

export default Signup;
