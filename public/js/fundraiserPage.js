const title = document.getElementById("title");
const amount = document.getElementById("goal-amount");
const firstAndLastName = document.getElementById("name");
const details = document.getElementById("text-content");
const image = document.getElementById("image");
const featuredSlider = document.getElementById("featured-slider");
const btnContainer = document.querySelector(".goal-buttons");
const tabTitle = document.getElementById("tabTitle");
const modal = document.querySelector(".donation-modal");
const closeModalBtn = document.querySelector(".donation-modal-close");
const donateBtn = document.getElementById("donate-btn");
const confirmDonationBtn = document.getElementById("confirm-donation-btn");
let fundraiser;

const populatePage = async (event) => {
  try {
    const id = window.location.pathname.split("/")[2]; //getting fundraiserId from url
    fundraiser = await fetchFundraiser(id);

    //populating page
    title.innerText = fundraiser.title;

    const amountNeeded = fundraiser.amountNeeded.toLocaleString("en-US"); //with commas
    amount.innerText = `${amountNeeded} PKR`;
    firstAndLastName.innerText = `${fundraiser.firstName} ${fundraiser.lastName} is organizing this fundraiser.`;
    details.innerText = fundraiser.details;
    createDownloadButton(fundraiser.documentName);

    //adding image
    let imagePath = fundraiser.imageName;
    imagePath = imagePath.replace(/\\/g, "/"); //replacing back slashes with forward

    image.style.backgroundImage = `url('/${imagePath}')`;

    //populating slider
    const fundraisers = await fetchAllFundraisers();
    //putting only first 10 fundraisers in the slider
    for (let i = 0; i < 10 && i < fundraisers.length; i++) {
      const fundraiserItem = createFundraiserItem(fundraisers[i]);
      featuredSlider.appendChild(fundraiserItem);
    }

    tabTitle.innerText = `${fundraiser.title}`;
  } catch (error) {
    console.log(error);
  }
};

const createFundraiserItem = (fundraiser) => {
  const fundraiserItem = document.createElement("div");
  fundraiserItem.classList.add("card-item", "swiper-slide");
  fundraiserItem.innerHTML = `<div class="card-item swiper-slide" data-id="${
    fundraiser.id
  }">
            <a href="#" class="card-link">
              <img
                src="/${fundraiser.imageName}"
                alt="Card Image"
                class="card-image"
              />
              <p class="badge fire">Goal: ${fundraiser.amountNeeded.toLocaleString(
                "en-US"
              )} PKR</p>
              <h2 class="card-title">
                ${fundraiser.title}
              </h2>
              <button class="card-button material-symbols-outlined">
                arrow_forward
              </button>
            </a>
          </div>`;
  fundraiserItem.addEventListener("click", async (event) => {
    window.location.href = `/fundraisers/${fundraiser.id}`;
  });
  return fundraiserItem;
};

const createDownloadButton = (documentName) => {
  documentPath = `/${documentName.replace(/\\/g, "/")}`;

  // create an anchor element for the download button
  const downloadLink = document.createElement("a");
  downloadLink.href = `${documentPath}`;
  downloadLink.setAttribute("download", "");

  // create the button inside the anchor
  const downloadButton = document.createElement("button");
  downloadButton.classList.add("goal-button", "download-button");
  downloadButton.innerHTML = `<i class="fas fa-download"></i>Download Source Of Proof`;

  downloadLink.appendChild(downloadButton);

  btnContainer.appendChild(downloadLink);
};

//api calling
const fetchFundraiser = async (id) => {
  try {
    const response = await fetch(`/api/fundraiser/fetchFundraiser/${id}`);

    const data = await response.json();

    if (data.success) {
      return data.fundraiser;
    } else {
      window.location.href = "/index"; //redirect to home page if fundraiser not found
    }
  } catch (error) {
    console.error("Error in fundraiserpage.js file:", error); //for testing
  }
};

const fetchAllFundraisers = async () => {
  try {
    const response = await fetch("/api/fundraiser/fetchApprovedFundraisers");

    const data = await response.json();

    if (data.success) {
      return data.approvedFundraisers;
    }

    return [];
  } catch (error) {
    console.log("Error fetching approved fundraisers: ", error); //for testing
  }
};

const loadCheckoutPage = async (donationAmount) => {
  try {
    const response = await fetch("/api/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fundraiser.firstName,
        lastName: fundraiser.lastName,
        donationAmount,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.url;
    } else {
      alert("An error occurred!");
    }
  } catch (error) {
    console.log("Error occurred when loading checkout page: ", error);
  }
};

//show the donation modal
function showModal() {
  modal.classList.add("show");
}

//hide the donation modal
function hideModal() {
  modal.classList.remove("show");
}

new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,

  // Pagination Bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation Arrow
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive BreakPoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Donation Protection script
document
  .getElementById("open-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("modal").style.display = "block";
  });

document
  .getElementById("close-modal-btn")
  .addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
  });

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//populate page
document.addEventListener("DOMContentLoaded", populatePage());

//show/hide the donation modal
document.addEventListener("DOMContentLoaded", () => {
  donateBtn.addEventListener("click", showModal);
  closeModalBtn.addEventListener("click", hideModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal(); // Close if clicking outside modal content
  });
  confirmDonationBtn.addEventListener("click", (e) => {
    e.preventDefault();
    donationAmount = document.getElementById("donation-amount").value;

    if (donationAmount < 150) {
      alert("Minimum accepted donation amount is 150 PKR.");
    } else {
      loadCheckoutPage(donationAmount);
    }
  });
});

//show entire description
document.getElementById("show-more-btn").addEventListener("click", function () {
  const textContent = document.getElementById("text-content");
  textContent.classList.toggle("expanded");

  this.style.display = "none";
});
