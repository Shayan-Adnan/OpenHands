const container = document.getElementById("container");
const errorMessageElement = document.getElementById("error-message");
const handleSignUp = async (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const country = document.getElementById("country").value.trim();
  const city = document.getElementById("city").value.trim();

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        country,
        city,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred during signup");
    }

    // signup success message
    displaySuccessMessage(firstName, lastName);

    //automatically logging in the user after sign up
    await login(email, password);

    //counting down to redirection
    countdown();
  } catch (error) {
    console.error("Error during signup:", error);
    displayErrorMessage(error);
  }
};

// Dynamic City Selector
function changeStatus() {
  const country = document.getElementById("country").value;
  const citySelect = document.getElementById("city");

  const cityOptions = {
    usa: ["Washington DC", "Chicago", "Los Angeles", "New York"],
    uk: ["London", "Westminster", "Birmingham", "Manchester"],
    india: ["Delhi", "Mumbai", "Lucknow", "Bangalore"],
    pakistan: ["Islamabad", "Karachi", "Lahore", "Faisalabad"],
  };

  citySelect.innerHTML = `<option selected disabled value="">Select City</option>`;
  if (cityOptions[country]) {
    cityOptions[country].forEach((city) => {
      const option = document.createElement("option");
      option.value = city.toLowerCase();
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }
}

const displaySuccessMessage = (firstName, lastName) => {
  // signup success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `<h2>🎉 Sign Up Successful! 🎉</h2> <p>Welcome, <strong>${firstName} ${lastName}!</strong></p><p id="countdown">Redirecting you to the homepage in 4...</p>`;

  // clear existing content and show the message
  container.innerHTML = "";
  container.appendChild(successMessage);
};

const login = async (email, password) => {
  const login = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

const countdown = async () => {
  let countdown = 4;
  const countDownElement = document.getElementById("countdown");
  const countdownInterval = setInterval(() => {
    countdown -= 1;
    if (countdown > 0) {
      countDownElement.textContent = `Redirecting you to the homepage in ${countdown}...`;
    } else {
      clearInterval(countdownInterval);
      window.location.href = "/";
    }
  }, 1000);
};

const displayErrorMessage = (error) => {
  if (error.message === "An account is already registered with this email.") {
    errorMessageElement.textContent = error.message;

    setTimeout(() => {
      errorMessageElement.textContent = "";
    }, 3000);
  } else {
    errorMessageElement.textContent = "An error occurred! Please try again.";
    setTimeout(() => {
      errorMessageElement.textContent = "";
    }, 3000);
  }
};

document.getElementById("signup-form").addEventListener("submit", handleSignUp);
