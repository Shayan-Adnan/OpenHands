const container = document.getElementById("container");
const submitRequest = async (e) => {
  const formData = new FormData(e.target);
  e.preventDefault();

  try {
    const response = await fetch("/api/fundraiser/createFundraiserRequest", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred.");
    }

    displaySuccessMessage();
  } catch (error) {
    console.log(error); //for testing
    displayErrorMessage();
  }
};

const displaySuccessMessage = () => {
  //success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
    <div class="alert alert-success p-4 shadow rounded-3">
      <h2 class="mb-3" style="font-weight: bold; color: #155724;">🎉 Success! 🎉</h2>
      <p style="font-size: 18px;">Your fundraiser request has been sent successfully and will now undergo the validation process.</p>
      <p style="font-size: 16px;">We'll email you once it has been validated.</p>
      <p id="countdown" class="mt-3 fw-bold" style="font-size: 16px; color: #155724;">
        Redirecting you to the homepage in <span id="redirectTimer">4</span>...
      </p>
    </div>
  `;

  // clear existing content and show the message
  container.innerHTML = "";
  container.appendChild(successMessage);

  countdown();
};

const displayErrorMessage = () => {
  let timeoutID;
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent =
    "An error occurred during the request creation process. Please try again.";
  errorMessage.classList.remove("d-none");

  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    errorMessage.textContent = "";
  }, 3000);
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

document.querySelector("form").addEventListener("submit", submitRequest);
