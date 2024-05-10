import React, { useState } from "react";
import DisplayAlbum from "./DisplayAlbum";
function AlbumsDisplay(props) {
  const { albums, setAlbums } = props;
  const [filter, setFilter] = useState("All")
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')

  function isFiltered(album) {
    switch (filter) {
      case "All":
        return true
      case "ID":
        return (album.id.includes(id)) ? true : false;
      case "Title":
        return (album.title.includes(title)) ? true : false
    }
  }

   
   

  const showSelectFilter = () => {
    return <select name="filter by" id="filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
      <option value="All">All</option>
      <option value="ID">ID</option>
      <option value="Title">Title</option>
    </select>
  }
  return (<>
    {showSelectFilter()}
    {filter === 'Title' &&
      <>  <label>Enter wanted Title</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input></>}
    {filter === 'ID' &&
      <>  <label>Enter wanted Id</label>
        <input type="number" value={id} onChange={(event) => setId(event.target.value)}></input></>}
    {albums.map((album) => isFiltered(album) && <div key={album.id}><DisplayAlbum album={album} setAlbums={setAlbums} albums={albums} /></div>)}
  </>)
} export default AlbumsDisplay