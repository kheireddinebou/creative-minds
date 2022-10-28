import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/home.module.css";
import { db } from "../utils/firebase";

const { form, newPost, redOutline } = styles;

const NewPost = () => {
  const route = useRouter();
  const [updatedData, setUpdatedData] = useState(route.query);
  const [post, setPost] = useState(updatedData.description || "");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setErr(false);
    if (!updatedData.description) {
      //  Submit new post
      try {
        setLoading(true);
        await addDoc(collection(db, "posts"), {
          description: post,
          date: serverTimestamp(),
          authorId: user.uid,
          author: {
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          comments: [],
        });
        setLoading(false);
        route.push("/");
      } catch (err) {
        setLoading(false);
        setErr(true);
      }
    } else {
      // edit existing post
      try {
        setLoading(true);
        await updateDoc(doc(db, "posts", updatedData.id), {
          description: post,
        });
        setLoading(false);
        route.push("/");
      } catch (error) {
        setLoading(false);
        setErr(true);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setLoading(false);
    user ? route.push("/newPost") : route.push("/auth/login");
  }, [user]);

  return (
    <div style={{ cursor: loading && "wait" }} className={newPost}>
      <span className="h3">
        {" "}
        {updatedData.description ? "Edit your post" : "Create new post"}
      </span>
      <div className={form} onSubmit={handleSubmit}>
        <label className="text-muted">Description</label>
        <textarea
          value={post}
          onChange={e => setPost(e.target.value)}
          className={`bg-dark text-white ${
            post.length > 300 ? redOutline : ""
          }`}
        />
        <span className={post.length > 300 ? "text-danger" : "text-muted"}>
          {post.length}/300
        </span>
        {err && (
          <span className="text-center text-danger fs-5">
            Something went wrong!
          </span>
        )}
        <button
          style={{ cursor: loading ? "wait" : "auto" }}
          disabled={loading || err || post.length > 300 || post.length === 0}
          onClick={handleSubmit}
        >
          {updatedData.description ? "edit" : "submit"}
        </button>
      </div>
    </div>
  );
};

export default NewPost;
