import React from "react";
import { Link } from "react-router-dom";

export const Registration = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password_confirmation, setPasswordConfirmation] = React.useState("");

  const handleSubmit = () => {
    const body = {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          // TODO: redirect to home page with a flash message
          console.log("Registration data", response.data);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        // TODO: handle errors
        // There was a problem signing up, please try again or login if you already have an account.
        console.log("registration error", error);
      });

    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="display-5 font-bold text-2xl text-blue-700 font-weight-bold py-4">
        Sign Up
      </h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column col-md-6 gap-2"
      >
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            required
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary bg-primary btn-sm">
          Register
        </button>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
