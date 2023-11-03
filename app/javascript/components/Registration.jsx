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

    fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.data.status === "created") {
          // TODO: redirect to home page with a flash message
          console.log("Registration data", response.data);
        }
      })
      .catch((error) => {
        // TODO: handle errors
        console.log("registration error", error);
      });

    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  return (
    <div className="container d-flex flex-col justify-content-center">
      <form onSubmit={handleSubmit} className="col-md-6 gap-2">
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

        <button type="submit" className="btn btn-primary btn-sm">
          Register
        </button>
        <p>
          Have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};
