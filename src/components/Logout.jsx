import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");
const url = urlAddresses.logout;

const Logout = () => {
  const [responseData, setResponseData] = useState("{}");
  const [title, setTitle] = useState("TITLE");
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  
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
      setUser(undefined);
      setToken(undefined);
      localStorage.setItem("token", JSON.stringify(null));
      return setResponseData;
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }

  return (
    <>
      <Link to="/">HOME</Link>

      {!responseData.text ? (
        <div>Loading...</div>
      ) : (
        <h2>{responseData.text}</h2>
      )}
    </>
  );
};

export default Logout;
