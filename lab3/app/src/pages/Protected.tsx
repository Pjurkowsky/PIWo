import { useContext, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

function Protected({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);

  if (!user) return <h1>Not Authorized</h1>;
  return children;
}

export default Protected;
