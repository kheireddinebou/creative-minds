import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Router, useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";

const { loginWrapper, joinWithGoogle } = styles;

const Login = () => {
  const [err, setErr] = useState(false);

  const { user } = useContext(AuthContext);

  const route = useRouter();

  const provider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      route.push("/");
    } catch (err) {
      setErr(true);
    }
  };

  useEffect(() => {
    user ? route.push("/") : route.push("/auth/login");
  }, [user]);

  return (
    <div className={loginWrapper}>
      <span className="fs-1 ">Join Today</span>
      <div
        onClick={GoogleLogin}
        className={`bg-dark p-3 rounded mt-4 text-white  pointer ${joinWithGoogle}`}
      >
        <FcGoogle style={{ fontSize: "2rem", marginRight: "10px" }} />
        Sign in with your google account
      </div>{" "}
      {err && (
        <span className="text-danger text-center pt-2 fs-5">
          Something went wrong!
        </span>
      )}
    </div>
  );
};

export default Login;
