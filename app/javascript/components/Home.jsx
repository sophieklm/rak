import React from "react";
import Acts from "./Acts";
import { Link } from "react-router-dom";

export default () => (
  <div className="align-items-center justify-content-center">
    <div className="d-flex flex-row px-4 gap-4">
      <Link to="/login" className="ms-auto">
        Log in
      </Link>
      <Link to="/signup" className="">
        Sign Up
      </Link>
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
