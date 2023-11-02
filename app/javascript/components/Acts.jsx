import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Acts = () => {
  const navigate = useNavigate();
  const [acts, setActs] = useState([]);

  useEffect(() => {
    const url = "/api/v1/acts/index";
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
      <div className="card mb-4">
        <div className="card-body flex-column">
          <p className="card-title fw-bold">{act.title}:</p>
          <p className="">{act.description}</p>
        </div>
      </div>
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
