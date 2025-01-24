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

    alert("created successfully"); //for testing
  } catch (error) {
    console.log(error); //for testing

    let timeoutID;
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent =
      "An error occurred during the request creation process. Please try again.";
    errorMessage.classList.remove("d-none");

    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      errorMessage.textContent = "";
    }, 3000);
  }
};

document.querySelector("form").addEventListener("submit", submitRequest);
