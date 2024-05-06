import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await createUser(email, password)) navigate("/");
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
