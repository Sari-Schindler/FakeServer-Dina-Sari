import React from "react";
import DeleteComment from "./DeleteComment";
import UpdateComment from "./UpdateComment";

function DisplayComments(props) {
    const { comment, comments, setComments } = props;
    let user=JSON.parse(localStorage.getItem("User"));
    function isUsers(){
        console.log(user.email)
        console.log(comment.email)
        if(user.email===comment.email)
            return true
        return false
    }
   
    return (<>
        <strong>comment name: </strong>{comment.name} <br />
        <strong>comment: </strong>{comment.body} <br />
        {isUsers() && <><UpdateComment comment={comment} setComments={setComments} comments={comments} />
        <DeleteComment comment={comment} setComments={setComments} comments={comments} /></>}
    </>)
}
export default DisplayComments