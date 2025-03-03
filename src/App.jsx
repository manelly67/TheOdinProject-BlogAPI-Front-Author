import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { urlAddresses } from "./assets/urlAddresses";


import "./App.css";

const titleDiv = document.querySelector("title");
const url = urlAddresses.home;

function App() {
  titleDiv.textContent = "BLOG | HOME";
  const initialData = {};

  const [blogdata, setBlogdata] = useState(initialData);
  const [user, setUser] = useState(
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") !== undefined
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  console.log(blogdata);
  console.log(user);
  console.log(token);

  useEffect(() => {
    getData(url);
  }, []);

  async function getData(arg) {
    try {
      const response = await fetch(arg, { mode: "cors" });
      const responseData = await response.json();
      setBlogdata(responseData);
      return setBlogdata;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }

  return (
    <>
      <nav>
        <div>
          <Link to="sign_up">SIGN UP</Link>
        </div>
        <div>
          <Link to={"login"} state={{ user: user, token: token }}>
            LOGIN
          </Link>
        </div>
        <div>
          <Link to="logout">LOGOUT</Link>
        </div>
      </nav>

      <div className="blog-content">
        <h2>website for authoring and editing posts</h2>

        <p> {blogdata.message === undefined ? null : blogdata.message} </p>

        {!blogdata.allPosts ? (
          <div>Loading...</div>
        ) : blogdata.allPosts.length > 0 ? (
          <ul>
            {blogdata.allPosts.map((post) => {
              return (
                <li key={post.id}>
                  <p>{post.title}</p>
                  <p>{post.authorId}</p>

                  <button>
                    {post.published === true ? "published" : "unpublished"}
                  </button>
                  <button>EDIT</button>
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
}

export default App;
