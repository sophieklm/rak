import React from "react";
import { Link } from "react-router-dom";
import { HeartStraight, CheckCircle } from "phosphor-react";
import { Tooltip } from "react-tooltip";

const Act = ({ act, user, userActs }) => {
  const userAct = userActs?.find((userAct) => userAct.act_id === act.id);

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
              Save
            </Tooltip>
            <Link as="button" onClick="" className="complete">
              <CheckCircle size={24} color="#0dcaf0" />
            </Link>
            <Tooltip anchorSelect=".complete" place="bottom">
              Complete
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default Act;
