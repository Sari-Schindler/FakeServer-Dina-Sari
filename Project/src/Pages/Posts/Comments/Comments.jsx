 
 
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import CommentsDisplay from "./CommentsDisplay";

function Comments(props) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = props
  useEffect(() => {
    fetch(`http://localhost:3000/comments/?postId=${postId}`)
      .then((response) => response.json())
      .then((res) => {
        setComments(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching comments. Please try again.");
        setLoading(false);
      });
  }, [postId]);

  return (
    <>
      <br />
      <AddComment comments={comments} setComments={setComments} postId={postId} />
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h3>Comments</h3>
          <CommentsDisplay setComments={setComments} comments={comments} />
        </>
      )}
    </>
  );
}

export default Comments; 