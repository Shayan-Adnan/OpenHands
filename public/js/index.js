document.getElementById("signin-btn").addEventListener("click", () => {
  window.location.href = "/login";
});

document.getElementById("view-profile-btn").addEventListener("click", () => {
  window.location.href = "/"; //need to add this later
});

document
  .getElementById("create-fundraiser-btn")
  .addEventListener("click", () => {
    window.location.href = "/createFundraiser";
  });
