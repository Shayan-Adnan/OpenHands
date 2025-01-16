const handleSignUp = async (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const country = document.getElementById("country").value.trim();
  const city = document.getElementById("city").value.trim();

  const errorMessageElement = document.getElementById("error-message");

  console.log(firstName, lastName, username, email, password, country, city); // for testing

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

    alert("signup successful"); //for testing - should make a proper html element for this
  } catch (error) {
    console.error("Error during signup:", error);
    if (error.message === "An account is already registered with this email.") {
      errorMessageElement.textContent = error.message;

      setTimeout(() => {
        errorMessageElement.textContent = "";
      }, 3000);
    }
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

document.getElementById("signup-form").addEventListener("submit", handleSignUp);
