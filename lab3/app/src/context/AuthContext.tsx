import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";

type AuthContextType = {
  user: User | null;
  createUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  loginUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  loginUserWithGoogle: () => Promise<UserCredential | undefined>;
  logOut: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  createUser: async () => {
    return undefined;
  },
  loginUser: async () => {
    return undefined;
  },
  loginUserWithGoogle: async () => {
    return undefined;
  },
  logOut: async () => {},
  loading: true,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createUser = async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const loginUserWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authValue = {
    user,
    createUser,
    loginUser,
    loginUserWithGoogle,
    logOut,
    loading,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
