const logoutUser = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/auth/logout", { method: "GET" });
    const data = await response.json();

    if (data.success) {
      window.location.href = "/";
    } else {
      alert("Logout failed!");
    }
  } catch (error) {
    console.error("Error during logout: ", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logout").addEventListener("click", logoutUser);
});
