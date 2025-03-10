import { useState, useEffect } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { urlAddresses } from "../assets/urlAddresses";
import { ErrorMessage } from "./ErrorMessage";

const titleDiv = document.querySelector('title');

const Update = () => {

    titleDiv.textContent = "BLOG | UPDATE POST";
  
    const {
      allowed,
      user,
      setUser,
      token,
      setToken,
      responseData,
      setResponseData,
      refreshPosts,
      updatePutMethod,
    } = useOutletContext();

    const { authorid } = useParams();
  const { postid } = useParams();
  console.log(authorid);
  console.log(postid);
  const url = `${urlAddresses.posts}/${authorid}/${postid}`;
  console.log(url);

  const [myblogs, setMyblogs] = useState(
    user === undefined ? null : user.posts
  );
  console.log(myblogs);

  const [title, setTitle] = useState(myblogs!== undefined ? findPost(myblogs,postid)[0].title : null);
  const [content, setContent] = useState(myblogs!== undefined ? findPost(myblogs,postid)[0].content : null);
  const [published, setPublished] = useState(myblogs!== undefined ? findPost(myblogs,postid)[0].published : null);
  console.log(title);
  console.log(content);
  console.log(published);

  function findPost(myblogs,postid) {
    return myblogs.filter((e)=> e.id===postid);
  }

  const handleChange = (event) => {
    setPublished(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setResponseData("{}");
    console.log(postid);
    await updatePutMethod(postid, title, content, published);
    navigate("/dashboard");
  }

return(
    <>
        <div className="error">
        {responseData.err !== undefined ? (
          <p>{responseData.err.message}/ logout: new login is required</p>
        ) : null}
        </div>

        {responseData.text !== undefined ? (
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
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                ></textarea>

                <label htmlFor="content"> CONTENT </label>
                <textarea
                  id="content"
                  name="content"
                  title="max 2.500 words"
                  value={content}
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
);

};

export default Update;