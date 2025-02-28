import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const titleDiv = document.querySelector("title");
const url = "https://top-backend-blogapi.onrender.com/sign_up";

const SingUp = () => {
  const [responseData, setResponseData] = useState("{}");
  const [title, setTitle] = useState("TITLE");
  const [user, setUser] = useState(undefined);
  const [errors, setErrors] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  titleDiv.textContent = title;
  const passwordRequirements =
    responseData.passwordRequirements === undefined
      ? " "
      : responseData.passwordRequirements;

  useEffect(() => {
    switch (responseData === "{}") {
      case true:
        getData(url);
        break;
      case false:
        console.log(responseData);
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
    console.log("listening handleSubmit");
    e.preventDefault();
    const userdata = {
      username,
      user_password: password,
      confirm_password: confirm,
      email,
      role: "AUTHOR",
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
      body: JSON.stringify(userdata),
    })
    .then((res) => res.json())
    .then((data) => {
        setResponseData(data);
        setErrors(data.errors);
        setUser(data.user);
        console.log(responseData);
        console.log(errors);
     })
     .catch((err) => {
        console.log(err.message);
     });
  }

  return (
    <>
      <Link to="/">HOME</Link>
      {user === undefined ? ( <>
      <h2>Sign Up Here:</h2>
      <div>
        {responseData.errors === undefined
          ? null
          : responseData.errors.map((e) => {
              return <p className="error"> {e.msg} </p>;
            })}
      </div>

      <form
        id="sign_up"
        action="https://top-backend-blogapi.onrender.com/sign_up"
        method="POST"
        mode="cors"
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
            email address:
            <input
              type="email"
              name="email"
              autoComplete="on"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type="password"
              name="user_password"
              autoComplete="off"
              title={passwordRequirements}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            confirm password:
            <input
              type="password"
              name="confirm_password"
              autoComplete="off"
              onChange={(event) => setConfirm(event.target.value)}
              required
            />
          </label>
        </div>
        <label>
          Role:
          <input type="text" name="role" value="AUTHOR" readOnly="AUTHOR" />
        </label>
        <button
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Submit
        </button>
      </form>
      
      </>): ( 
        <> 
        <h2> {responseData.text} </h2> 
        <p> {`username: ${user.username}`} </p> 
        <div>
        <Link to="/">LOGIN</Link>
        <Link to="/">LOGOUT</Link>
        </div>
      </> )}
    </>
  );
};

export default SingUp;
