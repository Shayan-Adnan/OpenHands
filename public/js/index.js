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

document.addEventListener("DOMContentLoaded", function () {
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
document.addEventListener("DOMContentLoaded", function () {
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
