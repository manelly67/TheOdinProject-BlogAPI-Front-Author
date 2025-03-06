import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { urlAddresses } from "./assets/urlAddresses";
import { homepage } from "../mock_data";

import "./App.css";

const titleDiv = document.querySelector("title");
const url = urlAddresses.home;

function App() {
  titleDiv.textContent = "BLOG | HOME";
  const initialData = homepage;

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
      const response = await fetch(url, { mode: "cors" });  
      const responseData = await response.json();
      setBlogdata(responseData);
      return setBlogdata;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  } ACTIVAR LUEGO DE PROBAR*/

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
              <Link to="logout" >
                LOGOUT
              </Link>
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
                  <p>{post.title}</p>
                  <p>{post.author.username}</p>

                  <button>DETAILS</button>
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
