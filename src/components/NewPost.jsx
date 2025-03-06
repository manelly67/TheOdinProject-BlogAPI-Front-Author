import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { useOutletContext } from "react-router-dom";
import { urlAddresses } from "../assets/urlAddresses";

const titleDiv = document.querySelector("title");
const url = urlAddresses.new_post;

const NewPost = () => {
  
titleDiv.textContent = "BLOG | NEW POST";
const { navigate, allowed, user, setUser, token, setToken } = useOutletContext();
const [responseData, setResponseData] = useState("{}");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [published, setPublished] = useState(false);
console.log(responseData);

const handleChange = (event) => {
  setPublished(event.target.value);
};

function handleSubmit(e){
    e.preventDefault();
    const postdata = {
      title : `${title}`,
      content : `${content}`,
      published : published,
    };
    console.log(postdata);
    fetch( url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
        'authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify(postdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResponseData(data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="error">
        {responseData.err !== undefined ? (<p>{responseData.err.message}/ logout: new login is required</p>):null}
      </div>

      {user === null ? (
        <>
          <p>LOGIN REQUIRED</p>
        </>
      ) : (
        <>
          {responseData.text !== undefined  ? (
            <>
              <p>{responseData.text} </p>
            </>
          ) : (
            <>
              <ErrorMessage errors={responseData.errors} />
              <form
                id="newPost"
                action={url}
                method="POST"
                autoComplete="off"
                noValidate
                className="newPostForm"
              >
                <label htmlFor="title"> TITLE </label>
                <textarea
                  id="title"
                  name="title"
                  title="max 60 characters"
                  onChange={(event) => setTitle(event.target.value)}
                ></textarea>

                <label htmlFor="content"> CONTENT </label>
                <textarea
                  id="content"
                  name="content"
                  title="max 2.500 words"
                  onChange={(event) => setContent(event.target.value)}
                ></textarea>
                <div>
                  <div>
                    <label>
                      UNPUBLISHED
                      <input
                        type="radio"
                        id="unpublished"
                        name="published"
                        value={false}
                        defaultChecked={published === false}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <label>
                    PUBLISHED
                    <input
                      type="radio"
                      id="published"
                      name="published"
                      value={true}
                      defaultChecked={published === true}
                      onChange={handleChange}
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
          )}
        </>
      )}
    </>
  );
};

export default NewPost;
