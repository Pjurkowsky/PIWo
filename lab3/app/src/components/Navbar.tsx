import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import AddHotelModal from "./AddHotelModal";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const addHotelModal = useRef<HTMLDialogElement>(null);

  const openAddHotelModal = () => {
    if (addHotelModal.current) {
      addHotelModal.current.showModal();
    }
  };

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("Signed out");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <nav className="w-full py-6 px-8 lg:px-16 flex flex-row justify-between items-center bg-white fixed top-0">
        <NavLink to="">
          <img
            className="h-9 w-auto"
            src={logo}
            alt="Logo"
            title="Website Logo"
          />
        </NavLink>
        <ul className="flex flex-row lg:gap-x-12 justify-center items-center list-none">
          <li>
            <NavLink
              className="hidden lg:block lg:hover:text-hover lg:transition-colors lg:duration-300"
              to=""
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hidden lg:block lg:hover:text-hover lg:transition-colors lg:duration-300"
              to="find"
            >
              Find Offer
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                className="hidden lg:block lg:hover:text-hover lg:transition-colors lg:duration-300"
                to="chat"
              >
                Chat
              </NavLink>
            </li>
          )}

          {user && (
            <li>
              <button
                className="hidden lg:block lg:hover:text-hover lg:transition-colors lg:duration-300 cursor-pointer"
                onClick={() => openAddHotelModal()}
              >
                Add Offer
              </button>
            </li>
          )}
          {user && (
            <li>
              <NavLink
                className="hidden lg:block hover:text-hover transition-colors duration-300"
                to="my-offers"
              >
                My offers
              </NavLink>
            </li>
          )}
          <li>
            <a
              className="hidden lg:block hover:text-hover transition-colors duration-300"
              href="#rent"
            >
              Rent with us
            </a>
          </li>
          {!user && (
            <li>
              <NavLink
                to="signup"
                className="hidden lg:block hover:text-hover transition-colors duration-300"
              >
                Sign up
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink
                to="login"
                className="hidden lg:flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-8 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
              >
                Log in
              </NavLink>
            </li>
          )}
          {user && (
            <button
              className="hidden lg:flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-8 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          )}
        </ul>
        <button className="lg:hidden flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-8 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300 ">
          Menu
        </button>
      </nav>

      <AddHotelModal dialogRef={addHotelModal} />
    </>
  );
}

export default Navbar;
