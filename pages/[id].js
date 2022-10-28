import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Post from "../components/Post";
import { auth, db } from "../utils/firebase";
import styles from "../styles/home.module.css";
import { AuthContext } from "../context/AuthContext";
import { format } from "timeago.js";

const PostDetails = () => {
  const route = useRouter();
  const [post, setPost] = useState(null);
  const [postId, setPostId] = useState(route.query.id);
  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);

  const getPost = async () => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost(docSnap.data());
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (comment.trim().length > 0) {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion({
          content: comment,
          date: Timestamp.now(),
          author: {
            id: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
          },
        }),
      });
      console.log(post);
      setComment("");
    }
  };

  useEffect(() => {
    !auth.currentUser && route.push("/auth/login");
  }, []);

  useEffect(() => {
    postId && getPost();
  }, [handleSubmit]);

  return (
    <div className={styles.postDetailesWrapper}>
      {post && <Post post={post}></Post>}

      <form onSubmit={handleSubmit} className="mt-3 d-flex align-items-center">
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
          type="text"
          placeholder="Write a comment..."
        />
        <button disabled={comment.trim().length === 0} type="submit">
          Submit
        </button>
      </form>

      <span className="fw-bolder mt-3">Comments</span>

      <div className="d-flex flex-column gap-3 mt-3">
        {post?.comments
          .sort((a, b) => b.date - a.date)
          .map((c, index) => (
            <div key={index} className="d-flex flex-column border p-3 gap-3">
              <div className="d-flex align-items-center gap-2">
                <img
                  className="avatar"
                  src={c.author.photoURL}
                  alt={c.author.displayName}
                />
                <span>{c.author.displayName}</span>
                <span className="text-muted">{format(c.date)}</span>
              </div>
              <span>{c.content}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostDetails;
