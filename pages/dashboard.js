import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import styles from "../styles/Home.module.css";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Post from "../components/Post";
import Lougout from "../components/Lougout";
import Link from "next/link";

const { userPostWrppaer, logoutBtn } = styles;

const Dashboard = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [showConf, setShowConf] = useState(false);

  const { user } = useContext(AuthContext);
  const route = useRouter();

  const handleDelete = async id => {
    await deleteDoc(doc(db, "posts", id));
  };

  const handleSignOut = () => {
    signOut(auth);
    route.push("/");
  };

  const getUserPosts = () => {
    const q = query(collection(db, "posts"), where("authorId", "==", user.uid));

    const unsub = onSnapshot(q, snapshot => {
      setUserPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => {
      unsub();
    };
  };

  useEffect(() => {
    user ? route.push("/dashboard") : route.push("/auth/login");
    user && user.uid && getUserPosts();
  }, [user]);

  return (
    <>
      {showConf && (
        <Lougout handleSignOut={handleSignOut} setShowConf={setShowConf} />
      )}

      <div className={userPostWrppaer}>
        <span className="h3 ps-2">Your Posts</span>

        {userPosts.length > 0 ? (
          userPosts
            .sort((a, b) => b.date - a.date)
            .map(p => (
              <Post post={p} key={p.id}>
                <Link href={{ pathname: `/${p.id}`, query: p }}>
                  <span className="mt-4 pointer text-decoration-underline">
                    2 comments
                  </span>
                </Link>
                <div className="d-flex alig-items-center gap-5 mt-3">
                  <Link href={{ pathname: "/newPost", query: { ...p } }}>
                    <button className="btn btn-primary">edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </div>
              </Post>
            ))
        ) : (
          <span className="display-6 text-center mt-5">
            You dont creat posts yet!
          </span>
        )}
      </div>

      <div className={logoutBtn}>
        <button onClick={() => setShowConf(true)}>Logout</button>
      </div>
    </>
  );
};

export default Dashboard;
