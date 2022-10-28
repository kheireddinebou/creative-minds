import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/home.module.css";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { useTheme } from "../context/theme";

const Navbar = () => {
  const { navBtn } = styles;
  const { user } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="d-flex shadow-lg rounded-3 p-3 align-items-center justify-content-between w-100 mt-5">
      <Link href="/">
        <h3 className="pointer fw-semibold mb-0">Creative Minds</h3>
      </Link>
      <div className="d-flex align-items-center gap-3">
        {user ? (
          <div className="d-flex align-items-center gap-3">
            <Link href="/newPost">
              <span className={navBtn}>Post</span>
            </Link>

            <Link href="/dashboard">
              <img
                className="avatar pointer"
                src={user.photoURL}
                alt={user.dispalyName}
              />
            </Link>
          </div>
        ) : (
          <Link href="/auth/login">
            <span className={navBtn}>Join Now</span>
          </Link>
        )}
        <button
          className={`btn fs-2 p-1 d-flex alig-items-center justify-content-center border rounded-circle ${
            theme === "dark" ? "text-white" : ""
          }`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <MdOutlineDarkMode /> : <BsSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
