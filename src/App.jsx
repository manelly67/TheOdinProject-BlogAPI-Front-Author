import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { urlAddresses } from "./assets/urlAddresses";
import { homepage } from "./mock_data";

import "./App.css";

const titleDiv = document.querySelector("title");
const url = urlAddresses.home;

function App() {
  titleDiv.textContent = "BLOG | HOME";
  const initialData = homepage;
  const navigate = useNavigate();

  const [blogdata, setBlogdata] = useState(initialData);

  const [token, setToken] = useState(
    localStorage.getItem("token") !== undefined
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const [userlogin, setUserlogin] = useState(token === null ? false : true);

  console.log(blogdata);
  console.log(userlogin);
  console.log(token);

  /* useEffect(() => {
    getData(url);
  }, []); 

  async function getData(url) {
    try {
      const response = await fetch(url);  
      const responseData = await response.json();
      setBlogdata(responseData);
      return setBlogdata;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  } ACTIVAR LUEGO DE PROBAR*/

  function navigateToDetails(arg1) {
    navigate(arg1);
  }

  return (
    <>
      <nav>
        {!userlogin ? (
          <>
            <div>
              <Link to="sign_up">SIGN UP</Link>
            </div>
            <div>
              <Link to={"login"} state={{ token: token, userlogin: userlogin }}>
                LOGIN
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="logout">LOGOUT</Link>
            </div>
          </>
        )}
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
                  <p style={{maxWidth:'200px'}}>{post.title}</p>
                  <p>{post.author.username}</p>

                  <button style={{height:'55px'}}
                    onClick={() => {
                      navigateToDetails(`posts/${post.authorId}/${post.id}`);
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
}

export default App;
