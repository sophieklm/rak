import React from "react";
import { useNavigate } from "react-router-dom";
import Act from "./Act";

const Acts = (props) => {
  const navigate = useNavigate();
  const [acts, setActs] = React.useState([]);
  const user = props.user;
  const userActs = user?.user_acts;

  React.useEffect(() => {
    const url = "/api/v1/acts";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setActs(res))
      .catch(() => navigate("/"));
  }, []);

  const allActs = acts.map((act, index) => (
    <div key={index} className="">
      <Act act={act} user={user} userActs={userActs} />
    </div>
  ));

  return (
    <>
      <div className="py-5">
        <main className="container d-flex flex-col justify-content-center">
          <div className="row col-md-6">{allActs}</div>
        </main>
      </div>
    </>
  );
};

export default Acts;
