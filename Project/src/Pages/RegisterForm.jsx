import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { UserContext } from "../App";

function RegisterForm(props) {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { userName, password } = props;
  const [error, setError] = useState(null);

  async function confirmRegistration(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/nextID");
      const json = await response.json();
      const { nextUserId } = json[0];

      await fetch("http://localhost:3000/nextID/1", {
        method: "PATCH",
        body: JSON.stringify({
          "nextUserId": nextUserId + 1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const newUser = {
        "id": nextUserId.toString(),
        "name": event.target[0].value,
        "username": userName,
        "email": event.target[1].value,
        "address": {
          "street": event.target[2].value,
          "suite": event.target[3].value,
          "city": event.target[4].value,
          "zipcode": event.target[5].value,
          "geo": {
            "lat": event.target[6].value,
            "lng": event.target[7].value
          }
        },
        "phone": event.target[8].value,
        "website": password,
        "company": {
          "name": event.target[9].value,
          "catchPhrase": event.target[10].value,
          "bs": event.target[11].value
        }
      };

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      };
      const postResponse = await fetch('http://localhost:3000/users', requestOptions);
      const responseData = await postResponse.json();

      if (!postResponse.ok) {
        throw new Error(responseData.message || 'Registration failed. Please try again.');
      }

      delete newUser["website"];
      localStorage.setItem("User", [JSON.stringify(newUser)]);
      setCurrentUser(newUser);
      navigate(`/users/${newUser.id}/home`);
    } catch (error) {
      console.error("Error during registration:", error.message);
      setError(error.message);
    }
  }

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={confirmRegistration}>
      <p >Name</p>
      <input type="text" placeholder="Enter your name..." required></input><br />
      <p >Email</p>
      <input type="email" placeholder="Enter your email..." required></input><br />
      <p>Street</p>
      <input type="text" placeholder="Enter your street..." required></input><br />
      <p>suite</p>
      <input type="text" placeholder="Enter your suite..." required></input><br />
      <p>City</p>
      <input type="text" placeholder="Enter your city..." required></input><br />
      <p>Zipcode</p>
      <input type="text" placeholder="Enter your zipcode..." required></input><br />
      <p>Geo Lat</p>
      <input type="number" placeholder="Enter your lat..." required></input><br />
      <p>Geo Lng</p>
      <input type="number" placeholder="Enter your lng..." required></input><br />
      <p>Phone number</p>
      <input type="number" placeholder="Enter your phone number..." required></input><br />
      <p>Enter name of company</p>
      <input type="text" placeholder="Enter company's name..."></input><br />
      <p>Enter catchPhrase</p>
      <input type="text" placeholder="Enter company's catchPhrase..."></input><br />
      <p>Enter bs</p>
      <input type="text" placeholder="Enter company's bs..."></input><br /><div />
      <button type="submit">Confirm registration</button>
    </form>
    </>
  );
}

export default RegisterForm;