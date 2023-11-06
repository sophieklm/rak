import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    const body = {
      user: {
        email: email,
        password: password,
      },
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          // TODO: redirect to home page with a flash message
          window.location.href = "/";
        }
      })
      .catch((error) => {
        // TODO: handle errors
        // There was a problem loging in, please check your credentials and try again.
        console.log("Login error", error);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h2 className="display-5 font-bold text-2xl text-blue-700 font-weight-bold py-4">
        Login
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

        <button type="submit" className="btn btn-primary bg-primary btn-sm">
          Login
        </button>
        <p>
          Don't have an account yet? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};
