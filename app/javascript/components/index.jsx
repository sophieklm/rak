import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

export const currentUserId = document
  .querySelector("meta[name='user_id']")
  .getAttribute("content");

document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
  root.render(<App />);
});
