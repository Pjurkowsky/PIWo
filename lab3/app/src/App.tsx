import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Find from "./pages/Find";

import Navbar from "./components/Navbar";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Hotel from "./pages/Hotel";
import AuthProvider from "./context/AuthContext";
import Protected from "./pages/Protected";
import Chat from "./pages/Chat";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="" element={<Home />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="find" element={<Find />}></Route>
      <Route
        path="my-offers"
        element={
          <Protected>
            <Find />
          </Protected>
        }
      ></Route>
      <Route path="chat" element={<Chat />}></Route>
      <Route path="hotel/:id" element={<Hotel />}></Route>
    </Route>
  )
);

function AppLayout() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />;{" "}
      </AuthProvider>
    </>
  );
}

export default App;
