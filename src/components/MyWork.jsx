import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");

const MyWork = () => {
  titleDiv.textContent = "BLOG | MY WORK";
  const { navigate, allowed, user, setUser, token, setToken } =
    useOutletContext();
  const [myblogs, setMyblogs] = useState(
    user === undefined ? null : user.posts
  );

  return (
    <>
      <h3>AUTHOR: {user.username}</h3>
      <div className="blog-content">
        {!myblogs ? (
          <div>Loading...</div>
        ) : myblogs.length > 0 ? (
          <ul>
            {myblogs.map((post) => {
              return (
                <li key={post.id}>
                  <p>{post.title}</p>
                  <p style={{ width: "200px" }}>
                    {post.content.slice(0, 40)}...
                  </p>
                 { post.published === true ? 
                  <p>status: "published" </p> :
                  <p>status: "unpublished" </p>}

                  <button style={{ height: "60px" }}>
                    {post.published === true ? "unpublish" : "publish"}
                  </button>
                  <button style={{ height: "60px" }}>EDIT</button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>There are no posts published!</div>
        )}
      </div>
    </>
  );
};

export default MyWork;
