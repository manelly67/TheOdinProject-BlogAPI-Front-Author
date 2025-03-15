import { useState, useEffect, useCallback } from "react";
import { urlAddresses } from "../assets/urlAddresses";
import { useOutletContext, useNavigate } from "react-router-dom";

const titleDiv = document.querySelector("title");

const Comments = () => {
  const url = urlAddresses.home;
  titleDiv.textContent = "BLOG | COMMENTS";

  const { responseData } = useOutletContext();
  const [blogdata, setBlogdata] = useState("{}");
  const allPosts = blogdata.allPosts !== undefined ? blogdata.allPosts : null;
  const navigate = useNavigate();

  function navigateToDetails(arg) {
    navigate(arg);
  }

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setBlogdata(responseData);
      return setBlogdata;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    if (!allPosts) {
      getData();
    }
  });

  return (
    <>
      <div className="blog-content">
        <h2>Comments Dashboard</h2>

        <p style={{ color: "blue" }}>
          {" "}
          {responseData.text === undefined ? null : responseData.text}{" "}
        </p>

        {!blogdata.allPosts ? (
          <div>Loading...</div>
        ) : blogdata.allPosts.length > 0 ? (
          <ul>
            {blogdata.allPosts.map((post) => {
              return (
                <li key={post.id}>
                  <p style={{ maxWidth: "200px" }}>{post.title}</p>
                  <p>{post.author.username}</p>

                  <button
                    style={{ height: "55px" }}
                    onClick={() => {
                      navigateToDetails(
                        `/dashboard/posts_comments/${post.authorId}/${post.id}`
                      );
                    }}
                  >
                    DETAILS
                  </button>
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

export default Comments;
