import React from "react";
import { Link } from "react-router-dom";
import { HeartStraight, CheckCircle, PlusCircle } from "phosphor-react";
import { Tooltip } from "react-tooltip";

const Act = ({ act, user }) => {
  const [userAct, setUserAct] = React.useState(
    user?.user_acts?.find((userAct) => userAct.act_id === act.id)
  );
  const completions = user?.completions?.filter(
    (completion) =>
      completion.act_id === act.id && completion.user_id === user.id
  );
  const [saved, setSaved] = React.useState(userAct ? true : false);
  const [completed, setCompleted] = React.useState(completions?.length > 0);

  const toggleSave = () => {
    const url = saved
      ? `/api/v1/user_acts/${userAct?.id}`
      : `/api/v1/user_acts`;
    const method = saved ? "DELETE" : "POST";

    body = {
      act_id: act.id,
      user_id: user.id,
    };

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          setSaved(!saved);
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setUserAct(data);
      })
      .catch((error) => {
        console.log("Toggle save error", error);
      });
  };

  const onClickComplete = (completeAgain) => {
    const url = `/api/v1/completions`;
    const method = completeAgain ? "POST" : completed ? "DELETE" : "POST";

    body = {
      act_id: act.id,
      user_id: user.id,
    };

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          setCompleted(completeAgain ? true : !completed);
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((error) => {
        console.log("Toggle complete error", error);
      });
  };

  return (
    <div className="card mb-4 border-blue">
      <div className="d-flex card-body flex-row justify-content-between">
        <div>
          <p className="card-title fw-bold">{act.title}:</p>
          <p className="">{act.description}</p>
        </div>
        {user && (
          <div className="d-flex flex-row gap-2 fit-content">
            <Link
              as="button"
              onClick={toggleSave}
              className={saved ? "unsave" : "save"}
            >
              <HeartStraight
                size={24}
                weight={saved ? "fill" : null}
                color="#0dcaf0"
              />
            </Link>
            <Tooltip anchorSelect={saved ? ".unsave" : ".save"} place="bottom">
              {saved ? "Unsave" : "Save"}
            </Tooltip>
            <Link
              as="button"
              onClick={() => onClickComplete(false)}
              className={completed ? "uncomplete" : "complete"}
            >
              <CheckCircle
                size={24}
                weight={completed ? "fill" : null}
                color="#0dcaf0"
              />
            </Link>
            <Tooltip
              anchorSelect={completed ? ".uncomplete" : ".complete"}
              place="bottom"
            >
              {completed ? "Uncomplete" : "Complete"}
            </Tooltip>
            {completed && (
              <>
                <Link
                  as="button"
                  onClick={() => onClickComplete(true)}
                  className="complete-again"
                >
                  <PlusCircle size={24} color="#0dcaf0" />
                </Link>
                <Tooltip anchorSelect=".complete-again" place="bottom">
                  Complete Again
                </Tooltip>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Act;
