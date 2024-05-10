import React, { useContext } from "react";
import { UserContext } from "../App";
function Info() {

  const { currentUser } = useContext(UserContext)

  return (<>
    {currentUser && <div><form>
      <p>ID: {currentUser.id}</p>
      <p>Name: {currentUser.name}</p>
      <p>UserName: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <p>street: {currentUser.address.street}</p>
      <p>Suite: {currentUser.address.suite}</p>
      <p>City: {currentUser.address.city}</p>
      <p>Zipcode: {currentUser.address.zipcode}</p>
      <p>Geo Lat: {currentUser.address.geo.lat}</p>
      <p>Geo Lng: {currentUser.address.geo.lng}</p>
      <p>Phone: {currentUser.phone}</p>
      <p>Company's Name: {currentUser.company.name}</p>
      <p>Company's CatchPhrase: {currentUser.company.catchPhrase}</p>
      <p>Company's Bs: {currentUser.company.bs}</p>
    </form></div>}</>)
} export default Info