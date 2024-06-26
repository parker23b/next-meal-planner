import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      if (response) {
        router.push("/mealPlans");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl p-4 space-y-8">
        <form onSubmit={handleLogin} className="card-body space-y-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
