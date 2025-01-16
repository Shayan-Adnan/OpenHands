let timeoutID;

export const handleLoginErrors = (
  error,
  emailField,
  passwordField,
  errorMessageElement
) => {
  console.log(error.message);
  if (error.message === "User not found.") {
    errorMessageElement.textContent = error.message;
    emailField.value = "";
    passwordField.value = "";
  } else if (error.message === "Invalid credentials.") {
    errorMessageElement.textContent = error.message;
    passwordField.value = "";
  } else {
    errorMessageElement.textContent =
      "An error occurred during the login process. Please try again.";
  }

  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    errorMessageElement.textContent = "";
  }, 3000);
};
