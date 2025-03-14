import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");

const Dashboard = () => {
  titleDiv.textContent = "BLOG | DASHBOARD";
  const url_mywork = urlAddresses.my_work;
  const url_posts = urlAddresses.posts;
  const url_comments = urlAddresses.comments;

  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const location = useLocation();
  const [responseData, setResponseData] = useState("{}");

  useEffect(() => {
    if (location.state !== null) {
      const { user, token } = location.state;
      setUser(user);
      setToken(token);
      if (user !== null) {
        if (user.role === "AUTHOR") {
          setAllowed(true);
        }
      }
    }
    if (location.state === null) {
      navigate("/");
    }
  }, [allowed]);

  function navigateToNewPost() {
    setResponseData("{}");
    navigate("/dashboard/new");
  }

  function navigateToMyWork() {
    navigate("/dashboard/my_work");
  }

  function navigateToComments() {
    navigate("/dashboard/posts_comments");
  }

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

  async function updatePutMethod(arg1, arg2, arg3, arg4) {
    const post_id = arg1;
    const title = arg2;
    const content = arg3;
    const published = arg4;
    const url_update = `${url_posts}/${user.id}/${post_id}`;

    const putdata = {
      title: `${title}`,
      content: `${content}`,
      published: published,
    };

    fetch(url_update, {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(putdata),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
        refreshPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteComment(url_delete, token) {
    console.log("funcion borrar comentario");
    console.log(url_delete);
    console.log(token);
    fetch(url_delete, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponseData(data);
        refreshPosts();
        navigateToComments();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deletePost(url_delete, token) {
    console.log("funcion borrar post");
    console.log(url_delete);
    console.log(token);
    fetch(url_delete, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponseData(data);
        refreshPosts();
        navigateToMyWork();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {allowed ? (
        <>
          <div className="dashboardHead">
            <>
              <div>
                <h3>HELLO: {user.username} </h3>
              </div>
            </>
          </div>

          <div className="dashboardHead">
            <button
              onClick={() => {
                navigateToNewPost();
              }}
            >
              NEW POST
            </button>

            <button
              onClick={() => {
                navigateToMyWork();
              }}
            >
              MY WORK
            </button>

            <button
              onClick={() => {
                setResponseData("{}");
                navigateToComments();
              }}
            >
              COMMENTS
            </button>

            <div>
              <button
                onClick={() => {
                  navigate("/logout");
                }}
              >
                LOGOUT
              </button>
            </div>
          </div>

          <div>
            <Outlet
              context={{
                allowed,
                user,
                setUser,
                token,
                setToken,
                responseData,
                setResponseData,
                refreshPosts,
                updatePutMethod,
                deleteComment,
                deletePost,
                url_posts,
              }}
            />
          </div>
        </>
      ) : (
        <>
          <h2> Sorry, maybe: </h2>
          <h2 style={{ textAlign: "left" }}> - your session expired </h2>
          <h2 style={{ textAlign: "left" }}>
            {" "}
            - your role does not have access to this content
          </h2>
          <div className="dashboardHead">
            <Link to="/logout">LOGOUT</Link>
            <Link to="/">HOME</Link>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
