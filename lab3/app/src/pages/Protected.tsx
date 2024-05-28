import { useContext, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

function Protected({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);

  if (!user)
    return (
      <h1 className="pt-24 h-auto mb-6 w-full m-auto px-8 font-[Italiana] text-7xl">
        Not Authorized
      </h1>
    );
  return children;
}

export default Protected;
