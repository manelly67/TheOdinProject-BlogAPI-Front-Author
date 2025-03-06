import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";

const titleDiv = document.querySelector("title");

const Dashboard = () => {
  titleDiv.textContent = "BLOG | DASHBOARD";

  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const location = useLocation();

  /* location.state = {
    user: { id: 3, role: "AUTHOR", username: "someone" },
    token: "tok",
  }; 
 */
  useEffect(() => {
    console.log(location.state);
    if (location.state !== null) {
      const { user, token } = location.state;
      console.log(user);
      setUser(user);
      setToken(token);
      if (user.role === "AUTHOR") {
        setAllowed(true);
      }
    }
  }, []);

  function navigateToNewPost() {
    navigate("/dashboard/new");
  }

  function navigateToMyWork() {
    navigate("/dashboard/my_work");
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
                navigate,
                allowed,
                user,
                setUser,
                token,
                setToken,
              }}
            />
          </div>
        </>
      ) : (
        <>
          <h2> sorry, your role does not have access to this content</h2>
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
