import React from "react";
import { useNavigate } from "react-router-dom";
import Acts from "./Acts";
import { Link } from "react-router-dom";
import { currentUserId } from "./index";
import ActivityCalendar from "react-activity-calendar";
import { Tooltip } from "react-tooltip";

export default () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [showSuggested, setShowSuggested] = React.useState(false);
  const date = new Date();
  const [data, setData] = React.useState([
    {
      date: new Date(date.getFullYear(), 0, 1).toISOString().split("T")[0],
      count: 0,
      level: 0,
    },
    {
      date: new Date(date.getFullYear(), 11, 31).toISOString().split("T")[0],
      count: 0,
      level: 0,
    },
  ]);
  const completions = currentUser?.completions;

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

  React.useEffect(() => {
    completions?.forEach((completion) => {
      const date = new Date(completion.created_at);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const completionDate = new Date(year, month, day)
        .toISOString()
        .split("T")[0];
      const index = data.findIndex((d) => d.date === completionDate);
      if (index === -1) {
        data.push({ date: completionDate.split("T")[0], count: 1, level: 1 });
      } else {
        data[index].count += 1;
        data[index].level = Math.min(data[index].count, 4);
      }
    });
    data.sort((a, b) => (a.date > b.date ? 1 : -1));
    setData([...data]);
  }, [completions]);

  const theme = {
    dark: ["#272f30", "#0dcaf0", "#0df0bb", "#f3d841", "#f3418a"],
  };

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
            {currentUser && (
              <>
                <ActivityCalendar
                  data={data}
                  theme={theme}
                  showWeekdayLabels
                  labels={{ totalCount: "{{count}} completed in {{year}}" }}
                  renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                      "data-tooltip-id": "react-tooltip",
                      "data-tooltip-html": `${activity.count} completions on ${activity.date}`,
                    })
                  }
                />
                <Tooltip id="react-tooltip" />
              </>
            )}
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
