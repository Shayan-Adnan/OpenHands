const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const errorMessageElement = document.getElementById("error-message");

import { handleLoginErrors } from "./errorHandlingService.js";

const handleLogin = async (event) => {
  event.preventDefault();

  const email = emailField.value.trim();
  const password = passwordField.value;

  let timeoutID;

  try {
    const response = await fetch("/api/adminAuth/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred during login");
    }

    window.location.href = "/"; //redirect user to homepage after successful login
  } catch (error) {
    console.error("Error during login:", error); // for testing

    handleLoginErrors(error, emailField, passwordField, errorMessageElement);
  }
};

document.getElementById("loginForm").addEventListener("submit", handleLogin);
