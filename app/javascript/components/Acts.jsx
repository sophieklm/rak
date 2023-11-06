import React from "react";
import { useNavigate } from "react-router-dom";
import Act from "./Act";

const Acts = (props) => {
  const navigate = useNavigate();
  const [acts, setActs] = React.useState([]);
  const user = props.user;
  const showSuggested = props.showSuggested;
  const unsavedActs = acts.filter((act) => {
    const userAct = user?.user_acts?.find(
      (userAct) => userAct.act_id === act.id
    );
    return !userAct;
  });
  const suggestedAct =
    unsavedActs[Math.floor(Math.random() * unsavedActs.length)];
  const actsToShow = showSuggested ? [suggestedAct] : acts;

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

  const allActs = actsToShow.map((act, index) => (
    <div key={index} className="">
      <Act act={act} user={user} />
    </div>
  ));

  return (
    <main className="container d-flex flex-col justify-content-center">
      <div className="row col-md-6">{allActs}</div>
    </main>
  );
};

export default Acts;
