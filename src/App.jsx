import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import "./App.css";

let didInit = false;
const titleDiv = document.querySelector("title");

function App() {
  const initialData = {};
  const initialTitle = "Blog API";
  const [blogdata, setBlogdata] = useState(initialData);
  titleDiv.textContent =
    blogdata.title === undefined ? initialTitle : blogdata.title;

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Only runs once per app load
      getData("https://top-backend-blogapi.onrender.com/");
    }
  });

  async function getData(arg) {
    try {
      const response = await fetch(arg, { mode: "cors" });
      const responseData = await response.json();
      setBlogdata(responseData);
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }

  return (
    <>
      <nav>
        <div>
          <Link to="">SIGN UP</Link>
        </div>
        <div>
          <Link to="">LOGIN</Link>
        </div>
      </nav>

      <div className="blog-content">
      <h2 >website for authoring and editing posts</h2>

      <p> {blogdata.message === undefined ? null : blogdata.message} </p>

      {!blogdata.allPosts ? (
        <div>Loading...</div>
      ) : blogdata.allPosts.length > 0 ? (
        <ul>
          {blogdata.allPosts.map((post) => {
            return <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.authorId}</p>
              
              <button>{post.published===true ? "published" : "unpublished"}</button>
              <button>EDIT</button>
              </li>;
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
