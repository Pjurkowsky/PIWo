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
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../fbconfig";

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(collection(firestore, "users"), {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      });

      return userCredential;
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
      const userCredential = await signInWithPopup(auth, provider);
      const q = query(
        collection(firestore, "users"),
        where("uid", "==", userCredential.user.uid)
      );
      const results = await getDocs(q);
      if (results.empty) {
        await addDoc(collection(firestore, "users"), {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
      }

      return userCredential;
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
