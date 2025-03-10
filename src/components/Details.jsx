import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { post } from "../mock_data";
import { urlAddresses } from "../assets/urlAddresses";
import { useLocation } from "react-router-dom";

const Details = () => {
  const [postd, setPostd] = useState(null);

  const location = useLocation();
  console.log(location.pathname);
  const { authorid } = useParams();
  const { postid } = useParams();
  console.log(authorid);
  console.log(postid);
  const url = `${urlAddresses.posts}/${authorid}/${postid}`;
  console.log(url);

  useEffect(() => {
    /* setPostd(post); */
   if (postd === null) {
      getData(url);
    } 
  }, []);

  async function getData(url) {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      setPostd(responseData);
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }

  console.log(postd);

  return (
    <>
      <Link to="/">HOME</Link>
      <article className="postDetails">
        {postd === null ? (
          <>
            <p>loading...</p>
          </>
        ) : (
          <>
            {postd.text !== undefined ? (
              <p>{postd.text}</p>
            ) : (
              <>
                <h2
                  style={{ gridRow: 1, gridColumnStart: 1, gridColumnEnd: 3 }}
                >
                  {postd.post.title}
                </h2>
                <h3
                  style={{ gridRow: 2, gridColumnStart: 1, gridColumnEnd: 2 }}
                >
                  Author: {postd.post.author.username}
                </h3>
                <p style={{ gridRow: 2, gridColumnStart: 2, gridColumnEnd: 3 }}>
                  Publish at: {new Date(postd.post.createdAt).toLocaleString('en-US', { timeZone: 'America/Guayaquil' })}
                </p>
                <p style={{ gridRow: 3, gridColumnStart: 1, gridColumnEnd: 3, textAlign:"justify" }}>
                  {postd.post.content}
                </p>
                <div
                  style={{ gridRow: 4, gridColumnStart: 1, gridColumnEnd: 3 }}
                >
                  <p> COMMENTS:</p>
                </div>
                <Link to="/">CLOSE</Link>
              </>
            )}
          </>
        )}
      </article>
    </>
  );
};

export default Details;
