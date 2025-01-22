const requestsList = document.getElementById("requestsList");
const pendingRequestsCount = document.getElementById("pendingRequestsCount");

const createRequestButton = (request) => {
  const requestItem = document.createElement("button");
  requestItem.className = "list-group-item list-group-item-action p-3";
  requestItem.onclick = () => displayRequestDetails(request);

  requestItem.innerHTML = `
  <h5 class="fw-bold">${request.title}</h5> 
  <p class="text-muted mb-2">Need: PKR ${request.amountNeeded}</p>
  <p class="text-truncate mb-2">${request.details}</p>
  <img src="${request.imageName}" class="img-fluid rounded mb-2" alt="Request Image" />
  <a href="${request.documentName}" download class="btn btn-secondary btn-sm">
    <i class="fa fa-download"></i> Download Document
  </a>
`;

  requestsList.appendChild(requestItem);
};

const loadRequestList = async () => {
  requestsList.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("/api/fundraiser/fetchFundraiserRequests");
    const data = await response.json();

    if (data.success) {
      requestsList.innerHTML = ""; //clear the list
      const requests = data.pendingRequests;
      pendingRequestsCount.innerHTML = `${requests.length}`;

      if (requests.length === 0) {
        requestsList.innerHTML = `<p class="text-muted">No pending requests at the moment.</p>`;
      } else {
        // go through the requestlist and create a button for each request then append it to the list
        requests.forEach((request) => {
          createRequestButton(request);
        });
      }
    } else {
      requestsList.innerHTML = `<p class="text-danger">Failed to load requests.</p>`;
    }
  } catch (error) {
    console.error("Error fetching requests:", error); //for testing
    requestsList.innerHTML = `<p class="text-danger">An error occurred while loading requests.</p>`;
  }
};

const displayRequestDetails = (request) => {
  document.getElementById("requestHeadingDisplay").innerText = request.title;
  document.getElementById(
    "requestneedAmountDisplay"
  ).innerText = `PKR ${request.amountNeeded}`;
  document.getElementById("requestDescriptionDisplay").innerText =
    request.details;
  document.getElementById("requestImageDisplay").src = request.imageName;
  document.getElementById("downloadDocumentButton").href = request.documentName;

  // Update the data-request-id attribute for both buttons
  document.querySelector(".accept-btn").dataset.requestId = request.id;
  document.querySelector(".reject-btn").dataset.requestId = request.id;
};

const rejectRequest = async (event) => {
  const id = event.target.dataset.requestId;
  try {
    const response = await fetch("/api/fundraiser/rejectFundraiserRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();

    if (data.success) {
      showConfirmationMessage("Request rejected successfully!", "danger");
      loadRequestList(); //reload the list after rejecting a request
      resetRequestDetails(); //reset the req details section
    }
  } catch (error) {
    console.error(error); // for testing
  }
};

const resetRequestDetails = () => {
  document.getElementById("requestHeadingDisplay").innerText =
    "No Request Selected";
  document.getElementById("requestneedAmountDisplay").innerText = "";
  document.getElementById("requestDescriptionDisplay").innerText = "";
  document.getElementById("requestImageDisplay").src = "";
  document.getElementById("downloadDocumentButton").href = "#";
  document.querySelector(".accept-btn").dataset.requestId = "";
  document.querySelector(".reject-btn").dataset.requestId = "";
};

const showConfirmationMessage = (message, type) => {
  const confirmationMessage = document.getElementById("confirmationMessage");
  const confirmationText = document.getElementById("confirmationText");

  // update the message text and alert type
  confirmationText.innerText = message;
  confirmationMessage.className = `alert alert-${type} alert-dismissible fade show`;

  // show the message
  confirmationMessage.classList.remove("d-none");

  // automatically hide after 3 seconds
  setTimeout(() => {
    confirmationMessage.classList.add("d-none");
  }, 3000);
};

document.addEventListener("DOMContentLoaded", loadRequestList);

document.querySelector(".reject-btn").addEventListener("click", rejectRequest);
