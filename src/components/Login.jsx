import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");
const url = urlAddresses.login;

const Login = () => {
  const [responseData, setResponseData] = useState("{}");
  const [title, setTitle] = useState("TITLE");
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  titleDiv.textContent = title;

  useEffect(() => {
    switch (responseData === "{}") {
      case true:
        getData(url);
        break;
      case false:
        break;
    }
  });

  async function getData(arg) {
    try {
      const response = await fetch(arg, { mode: "cors" });
      const temp = await response.json();
      setResponseData(temp);
      setTitle(temp.title);
      setUser(temp.user);
      return setResponseData;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const logindata = {
      username,
     password,
    };
    fetch(`${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(logindata),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", JSON.stringify(data.token));
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <>
      <Link to="/">HOME</Link>
      {user === undefined ? (
        <>
          <h2>Login in your account:</h2>
          <ErrorMessage errors={responseData.errors} />
          <form
            id="sign_up"
            action={url}
            method="POST"
            autoComplete="off"
            noValidate
          >
            <div>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  autoComplete="on"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                password:
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>
            <button
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2> {responseData.text} </h2>
          <p> {`username: ${user.username}`} </p>
          <div>
            <Link to="/logout">LOGOUT</Link>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
