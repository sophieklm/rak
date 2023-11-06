import React from "react";
import { Link } from "react-router-dom";
import { HeartStraight, CheckCircle, PlusCircle } from "phosphor-react";
import { Tooltip } from "react-tooltip";

const Act = ({ act, user }) => {
  const userAct = user?.user_acts?.find((userAct) => userAct.act_id === act.id);
  const completions = user?.completions?.filter(
    (completion) =>
      completion.act_id === act.id && completion.user_id === user.id
  );

  const toggleSave = () => {
    const url = userAct
      ? `/api/v1/user_acts/${userAct.id}`
      : `/api/v1/user_acts`;
    const method = userAct ? "DELETE" : "POST";

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
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((error) => {
        console.log("Toggle save error", error);
      });
  };

  const onClickComplete = (completeAgain) => {
    const url = `/api/v1/completions`;
    const method = completeAgain
      ? "POST"
      : completions.length > 0
      ? "DELETE"
      : "POST";

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
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((error) => {
        console.log("Toggle complete error", error);
      });
  };

  return (
    <div className="card mb-4">
      <div className="d-flex card-body flex-row justify-content-between">
        <div>
          <p className="card-title fw-bold">{act.title}:</p>
          <p className="">{act.description}</p>
        </div>
        {user && (
          <div className="d-flex flex-row gap-2 fit-content">
            <Link as="button" onClick={toggleSave} className="save">
              <HeartStraight
                size={24}
                weight={userAct ? "fill" : null}
                color="#0dcaf0"
              />
            </Link>
            <Tooltip anchorSelect=".save" place="bottom">
              {userAct ? "Unsave" : "Save"}
            </Tooltip>
            <Link
              as="button"
              onClick={() => onClickComplete(false)}
              className={completions.length > 0 ? "uncomplete" : "complete"}
            >
              <CheckCircle
                size={24}
                weight={completions.length > 0 ? "fill" : null}
                color="#0dcaf0"
              />
            </Link>
            {completions.length > 0 ? (
              <Tooltip anchorSelect=".uncomplete" place="bottom">
                Uncomplete
              </Tooltip>
            ) : (
              <Tooltip anchorSelect=".complete" place="bottom">
                Complete
              </Tooltip>
            )}
            {completions.length > 0 && (
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
