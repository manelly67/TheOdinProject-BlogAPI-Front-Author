import { useOutletContext, useNavigate } from "react-router-dom";

const titleDiv = document.querySelector("title");

const MyWork = () => {
  titleDiv.textContent = "BLOG | MY WORK";

  const { user, responseData, setResponseData, updatePutMethod } =
    useOutletContext();

  const navigate = useNavigate();
  const myblogs = user === undefined ? null : user.posts;

  async function togglePublish(arg1, arg2, arg3, arg4, event) {
    event.preventDefault();
    const id = arg1;
    const title = arg2;
    const content = arg3;
    const toggleTo = arg4 === true ? false : true;
    setResponseData("{}");
    await updatePutMethod(id, title, content, toggleTo);
    navigate("/dashboard");
  }

  return (
    <>
      <div className="error">
        {responseData.err !== undefined ? (
          <p>{responseData.err.message}/ logout: new login is required</p>
        ) : null}
      </div>

      <h3>AUTHOR: {user.username}</h3>
      <div className="blog-content">
        {!myblogs ? (
          <div>Loading...</div>
        ) : myblogs.length > 0 ? (
          <ul>
            {myblogs.map((post) => {
              return (
                <li key={post.id}>
                  <p style={{ width: "200px" }}>{post.title}</p>
                  <p style={{ width: "200px" }}>
                    {post.content.slice(0, 40)}...
                  </p>
                  {post.published === true ? (
                    <p>status: &quot;published&quot; </p>
                  ) : (
                    <p>status: &quot;unpublished&quot; </p>
                  )}

                  <button
                    style={{ height: "60px" }}
                    onClick={(event) => {
                      togglePublish(
                        post.id,
                        post.title,
                        post.content,
                        post.published,
                        event
                      );
                    }}
                  >
                    {post.published === true ? "unpublish" : "publish"}
                  </button>
                  <button
                    onClick={() => {
                      setResponseData("{}");
                      navigate(`/dashboard/update_post/${user.id}/${post.id}`);
                    }}
                    style={{ height: "60px" }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => {
                     
                    }}
                    style={{ height: "60px" }}
                  >
                    DELETE
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
};

export default MyWork;
