import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { urlAddresses } from "./assets/urlAddresses";
import { homepage } from "./mock_data";

import "./App.css";

const titleDiv = document.querySelector("title");
const url = urlAddresses.home;
const url_mywork = urlAddresses.my_work;

function App() {
  titleDiv.textContent = "BLOG | HOME";
  const initialData = homepage;
  const navigate = useNavigate();

  const [blogdata, setBlogdata] = useState(initialData);
  const [user, setUser] = useState(null);
  console.log(user);

  const [token, setToken] = useState(
    localStorage.getItem("token") !== undefined
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const [userlogin, setUserlogin] = useState(token === null ? false : true);

  console.log(blogdata);
  console.log(userlogin);
  console.log(token);

// AGREGAR UN MEMOIZE PARA CONSERVAR LA DATA ALLPOST CUANDO NO HA VARIADO

  useEffect(() => {
    /* getData(url); */
    if ((token !== null) ) {
      refreshPosts();
    }
  }, [token]);

  /* async function getData(url) {
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

  async function refreshPosts() {
  
    fetch(url_mywork, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user !== undefined) {
          setUser(data.user);
          return data.user;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <div>
              <Link
                to="/dashboard"
                replace={true}
                state={{ user: user, token: token }}
              >
                DASHBOARD
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
                  <p style={{ maxWidth: "200px" }}>{post.title}</p>
                  <p>{post.author.username}</p>

                  <button
                    style={{ height: "55px" }}
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
