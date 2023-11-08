import React from "react";
import { useNavigate } from "react-router-dom";
import Acts from "./Acts";
import { Link } from "react-router-dom";
import { currentUserId } from "./index";
import ActivityCalendar from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { subDays, addDays, set } from "date-fns";
import { HeartStraight, Sparkle } from "phosphor-react";

export default () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(undefined);
  const [showSuggested, setShowSuggested] = React.useState(false);
  const [generatedAct, setGeneratedAct] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [acts, setActs] = React.useState([]);

  const [data, setData] = React.useState([
    {
      date: subDays(new Date(), 365).toISOString().split("T")[0],
      count: 0,
      level: 0,
    },
    {
      date: addDays(new Date(), 1).toISOString().split("T")[0],
      count: 0,
      level: 0,
    },
  ]);

  const theme = {
    dark: ["#272f30", "#0dcaf0", "#0df0bb", "#f3d841", "#f3418a"],
  };

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

  const getOpenAiResponse = () => {
    const url = "/api/v1/open_ai";
    setGeneratedAct(undefined);
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setGeneratedAct(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Open AI error", error);
      });
  };

  const saveAct = () => {
    const url = `/api/v1/acts`;
    const method = "POST";
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...generatedAct,
        user_id: currentUser.id,
        ai_generated: true,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setGeneratedAct(undefined);
        fetch(`/api/v1/user_acts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            act_id: data.id,
            user_id: currentUser.id,
          }),
        }).then((res) => {
          if (res.ok) {
            console.log("Saved act", data);
            setActs([...acts, data]);
            return res.json();
          }
          throw new Error("Network response was not ok.");
        });
      })
      .catch((error) => {
        console.log("Save act error", error);
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
    // setGeneratedAct({
    //   title: "Donate Books to a Local Library",
    //   description:
    //     "Gather some books that you no longer need and donate them to your local library to share the joy of reading with others.",
    // });
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
            Generate ideas, save suggestions and track completions
          </p>
          <div className="d-flex flex-column gap-4 align-items-center">
            {currentUser && (
              <>
                <ActivityCalendar
                  data={data}
                  theme={theme}
                  showWeekdayLabels
                  labels={{
                    totalCount: "{{count}} completed in the last year",
                  }}
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
            <div className="d-flex gap-4">
              <button
                onClick={() => {
                  setGeneratedAct(undefined);
                  setShowSuggested(true);
                }}
                className="btn btn-info text-white font-bold py-2 px-3 rounded"
              >
                Suggest RAK
              </button>
              {currentUser && (
                <button
                  onClick={() => getOpenAiResponse()}
                  className="btn btn-info text-white font-bold py-2 px-3 rounded"
                >
                  Generate RAK
                </button>
              )}
            </div>
            {showSuggested && (
              <Link onClick={() => setShowSuggested(false)} className="">
                Show All
              </Link>
            )}
          </div>
        </div>
        {loading && (
          <div className="d-flex justify-content-center mb-4">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {generatedAct && (
          <main className="container d-flex flex-column align-items-center">
            <div className="row col-md-6">
              <div>
                <div className="card mb-4 border-blue">
                  <div className="d-flex card-body flex-row justify-content-between">
                    <div>
                      <p className="card-title fw-bold">
                        {generatedAct.title}:
                      </p>
                      <p className="">{generatedAct.description}</p>
                    </div>
                    <div className="d-flex flex-row gap-2 fit-content">
                      <Link as="button" onClick={saveAct} className="save">
                        <HeartStraight
                          size={24}
                          weight={null}
                          color="#0dcaf0"
                        />
                      </Link>
                      <Tooltip anchorSelect=".save" place="bottom">
                        Save
                      </Tooltip>
                      <Sparkle size={24} color="#0dcaf0" className="ai" />
                      <Tooltip anchorSelect=".ai" place="bottom">
                        AI Generated
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
        <div className="fill-width">
          <Acts user={currentUser} acts={acts} showSuggested={showSuggested} />
        </div>
      </div>
    </div>
  );
};
