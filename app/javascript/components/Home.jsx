import React from "react";
import Acts from "./Acts";
import { Link } from "react-router-dom";
import { currentUserId } from "./index";

export default () => {
  const [currentUser, setCurrentUser] = React.useState(undefined);

  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        // TODO: handle errors
        console.log("Logout error", error);
      });
  };

  React.useEffect(() => {
    if (!currentUserId) return;
    const url = `/api/v1/users/${currentUserId}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setCurrentUser(res))
      .catch(() => navigate("/"));
  }, [currentUserId]);

  return (
    <div className="align-items-center justify-content-center">
      <div className="d-flex flex-row px-4 gap-4">
        {currentUser ? (
          <>
            <div className="ms-auto">
              You are logged in as: {currentUser.email}
            </div>
            <Link onClick={logout} className="">
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="ms-auto">
              Log in
            </Link>
            <Link to="/signup" className="">
              Sign Up
            </Link>
          </>
        )}
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center">
          <h2 className="display-4 font-bold text-2xl text-blue-700 font-weight-bold">
            Random Acts of Kindness
          </h2>
          <p className="lead pb-4">
            Generate ideas, save suggestions and track random acts of kindness
          </p>
          <button className="btn btn-info text-white font-bold py-2 px-3 rounded">
            Generate RAK
          </button>
        </div>
        <Acts />
      </div>
    </div>
  );
};
