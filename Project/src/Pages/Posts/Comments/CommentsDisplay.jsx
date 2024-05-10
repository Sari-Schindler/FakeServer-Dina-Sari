import React  from "react";
import DisplayComment from "./DisplayComment";

function CommentsDisplay(props) {
  const { comments, setComments } = props;
  return (<>
     {comments.map((comment) => <div key={comment.id}><DisplayComment comment={comment} setComments={setComments} comments={comments} /></div>)}
  </>)
} export default CommentsDisplay