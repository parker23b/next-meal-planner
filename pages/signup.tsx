import Link from "next/link";
import React, { useState } from "react";
import apiClient from "@/lib/apiClient";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl p-4 space-y-8">
        <form onSubmit={handleSignup} className="card-body space-y-4">
          <input
            name="email"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            className={`form-control w-full input input-bordered`}
            placeholder="name@domain.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            name="password"
            type="password"
            autoComplete="username"
            className={`form-control w-full input input-bordered $`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
        <div>
          <Link href="/login" className="link">
            login instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
