const featuredSlider = document.getElementById("featured-slider");
const browseAllGrid = document.getElementById("browse-all-grid");

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

// browse all features pagination javascript

document.addEventListener("DOMContentLoaded", async function () {
  await populateSliderAndGrid();

  const rowsPerPage = 3; // Number of rows per page(changes in this line)
  const itemsPerRow = 4;
  const itemsPerPage = rowsPerPage * itemsPerRow;
  const gridItems = Array.from(document.querySelectorAll(".grid-item"));
  const totalPages = Math.ceil(gridItems.length / itemsPerPage);
  let currentPage = 1;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageInfo = document.getElementById("page-info");

  function renderPage(page) {
    gridItems.forEach((item, index) => {
      if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    pageInfo.textContent = `Page ${page} of ${totalPages}`;
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  //  pagination buttons
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
    }
  });

  renderPage(currentPage);
});

// text transition
document.addEventListener("DOMContentLoaded", async function () {
  // frontend
  const container = document.querySelector(".flex");
  const handleScroll = () => {
    const containerPosition = container.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    if (containerPosition.top < screenHeight && containerPosition.bottom > 0) {
      container.classList.add("visible");
    } else {
      container.classList.remove("visible");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

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

const createFundraiserItem = (fundraiser) => {
  const fundraiserItem = document.createElement("div");
  fundraiserItem.classList.add("card-item", "swiper-slide");
  fundraiserItem.innerHTML = `<div class="card-item swiper-slide" data-id="${
    fundraiser.id
  }">
            <a href="#" class="card-link">
              <img
                src="${fundraiser.imageName}"
                alt="Card Image"
                class="card-image"
              />
              <p class="badge fire">Goal: ${fundraiser.amountNeeded.toLocaleString(
                "en-US"
              )} PKR</p>
              <h2 class="card-title">
                ${fundraiser.title}
              </h2>
              <!-- verified button -->
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="shield">
            <button id="open-modal-btn" class="shieldbutton" href="#">
              <i class="fa-solid fa-shield"></i>Verified
            </button>
          </div>
        </div>
      </div>
    </div>

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

const createFundraiserGridItem = (fundraiser) => {
  const fundraiserGridItem = document.createElement("div");
  fundraiserGridItem.classList.add("grid-item");
  fundraiserGridItem.setAttribute("data-id", fundraiser.id);

  fundraiserGridItem.innerHTML = `
    <a href="#" class="grid-link">
      <img
        src="${fundraiser.imageName}"
        alt="grid Image"
        class="grid-image"
      />
      <p class="label fire">Goal: ${fundraiser.amountNeeded.toLocaleString(
        "en-US"
      )} PKR</p>
      <h2 class="grid-title">${fundraiser.title}</h2>
      <!-- verified button -->
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="shield">
            <button id="open-modal-btn" class="shieldbutton" href="#">
              <i class="fa-solid fa-shield"></i>Verified
            </button>
          </div>
        </div>
      </div>
    </div>

      <button class="grid-button material-symbols-outlined">arrow_forward</button>
    </a>
  `;

  fundraiserGridItem.addEventListener("click", async (event) => {
    window.location.href = `/fundraisers/${fundraiser.id}`;
  });

  return fundraiserGridItem;
};

const populateSliderAndGrid = async (event) => {
  const fundraisers = await fetchAllFundraisers();
  //putting only first 10 fundraisers in the slider
  for (let i = 0; i < 10 && i < fundraisers.length; i++) {
    const fundraiserItem = createFundraiserItem(fundraisers[i]);
    featuredSlider.appendChild(fundraiserItem);
  }

  fundraisers.forEach((fundraiser) => {
    const fundraiserGridItem = createFundraiserGridItem(fundraiser);
    browseAllGrid.appendChild(fundraiserGridItem);
  });
};
