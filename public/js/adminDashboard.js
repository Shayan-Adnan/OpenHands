document.addEventListener("DOMContentLoaded", async () => {
  const requestsList = document.getElementById("requestsList");
  const pendingRequestsCount = document.getElementById("pendingRequestsCount");
  requestsList.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch("/api/fundraiser/fetchFundraiserRequests");
    const data = await response.json();

    if (data.success) {
      requestsList.innerHTML = ""; //clear the list
      const requests = data.pendingRequests;
      pendingRequestsCount.innerHTML = `${requests.length}`; //updating pending requests count -  need to make this dynamic so it refreshes each time a req is approved

      if (requests.length === 0) {
        requestsList.innerHTML = `<p class="text-muted">No pending requests at the moment.</p>`;
      } else {
        // go through the requestlist and create a button for each request then append it to the list
        //<h5 class="fw-bold">${request.title}</h5> need to add title
        requests.forEach((request) => {
          const requestItem = document.createElement("button");
          requestItem.className = "list-group-item list-group-item-action p-3";
          requestItem.onclick = () => displayRequestDetails(request);

          requestItem.innerHTML = `
          <p class="text-muted mb-2">Need: PKR ${request.amountNeeded}</p>
          <p class="text-truncate mb-2">${request.details}</p>
          <img src="${request.imageName}" class="img-fluid rounded mb-2" alt="Request Image" />
          <a href="${request.documentName}" download class="btn btn-secondary btn-sm">
            <i class="fa fa-download"></i> Download Document
          </a>
        `;

          requestsList.appendChild(requestItem);
        });
      }
    } else {
      requestsList.innerHTML = `<p class="text-danger">Failed to load requests.</p>`;
    }
  } catch (error) {
    console.error("Error fetching requests:", error); //for testing
    requestsList.innerHTML = `<p class="text-danger">An error occurred while loading requests.</p>`;
  }
});

const displayRequestDetails = (request) => {
  // document.getElementById("requestHeadingDisplay").innerText = request.title;
  document.getElementById(
    "requestneedAmountDisplay"
  ).innerText = `PKR ${request.amountNeeded}`;
  document.getElementById("requestDescriptionDisplay").innerText =
    request.details;
  document.getElementById("requestImageDisplay").src = request.imageName;
  document.getElementById("downloadDocumentButton").href = request.documentName;
};
