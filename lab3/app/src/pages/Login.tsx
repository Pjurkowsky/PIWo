import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, loginUserWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await loginUser(email, password)) navigate("/");
  };

  const handleGoogleLogin = async () => {
    if (await loginUserWithGoogle()) navigate("/");
  };

  return (
    <div className="h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-y-4 h-screen"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-medium p-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-medium p-4"
        />
        <button type="submit" className="border rounded-medium p-4">
          Login
        </button>
        <button
          type="button"
          className="border rounded-medium p-4"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
