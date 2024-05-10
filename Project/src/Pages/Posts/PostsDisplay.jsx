import React, { useState } from "react";
import DisplayPost from "./DisplayPost";
function PostsDisplay(props) {
  const { posts, setPosts } = props;
  const [filter, setFilter] = useState("All")
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [id, setId] = useState('')

  function isFiltered(post) {
    switch (filter) {
      case "All":
        return true
      case "ID":
        return (post.id.includes(id)) ? true : false;
      case "Title":
        return (post.title.includes(title)) ? true : false;
      case "Body":
        return (post.body.includes(body)) ? true : false;
    }
  }

  const showSelectFilter = () => {
    return <select name="filter by" id="filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
      <option value="All">All</option>
      <option value="ID">ID</option>
      <option value="Title">Title</option>
      <option value="Body">Body</option>
    </select>
  }
const showFilterInputs=()=>{
  return(<>
  {filter === 'Title' &&
      <>  <label>Enter wanted Title</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input></>}
    {filter === 'ID' &&
      <>  <label>Enter wanted Id</label>
        <input type="number" value={id} onChange={(event) => setId(event.target.value)}></input></>}
    {filter === 'Body' &&
      <>  <label>Enter wanted Body</label>
        <input type="text" value={body} onChange={(event) => setBody(event.target.value)}></input></>}
        </>)
}
  return (<>
    {showSelectFilter()}
    {showFilterInputs()}
    {posts.map((post) => (isFiltered(post) && <DisplayPost key={post.id} post={post} setPosts={setPosts} posts={posts} />))}
  </>)
} export default PostsDisplay