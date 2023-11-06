import React from "react";
import { useNavigate } from "react-router-dom";
import Acts from "./Acts";
import { Link } from "react-router-dom";
import { currentUserId } from "./index";

export default () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [showSuggested, setShowSuggested] = React.useState(false);

  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((res) => {
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
        <div className="d-flex flex-column align-items-center mb-4">
          <h2 className="display-4 font-bold text-2xl text-blue-700 font-weight-bold">
            Random Acts of Kindness
          </h2>
          <p className="lead pb-4">
            Generate ideas, save suggestions and track random acts of kindness
          </p>
          <div className="d-flex flex-column gap-4 align-items-center">
            <button
              onClick={() => setShowSuggested(true)}
              className="btn btn-info text-white font-bold py-2 px-3 rounded"
            >
              Suggest RAK
            </button>
            {showSuggested && (
              <Link onClick={() => setShowSuggested(false)} className="">
                Show All
              </Link>
            )}
          </div>
        </div>
        <div className="fill-width">
          <Acts user={currentUser} showSuggested={showSuggested} />
        </div>
      </div>
    </div>
  );
};
