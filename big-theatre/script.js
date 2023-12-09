import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
import "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";

const numberToastTrigger = document.getElementById("copyNumber");
const numberToast = document.getElementById("copyNumberToast");
const swiperWrapper = document.querySelector(".mySecondSwiper .swiper-wrapper");
let currentClickedSlide = null;

const documentClickHandler = () => {
  if (currentClickedSlide) {
    const previousCover = currentClickedSlide.querySelector(".swiper-cover");
    const previousBtn = currentClickedSlide.querySelector(".swiper-moreBtn");
    if (previousCover) {
      previousCover.style.display = "block";
      previousBtn.style.display = "none";
      currentClickedSlide = null;
    }
  }
};

const navigationfunc = function (e) {
  e.preventDefault();

  // Matching strategy
  if (
    e.target.classList.contains("nav-link") ||
    e.target.classList.contains("nav-offcanvas-link")
  ) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
};

numberToastTrigger.addEventListener("click", function () {
  const copyText = this.innerText;
  const textArea = document.createElement("textarea");
  textArea.value = copyText;

  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
});

if (numberToastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(numberToast, {
    delay: 1000,
  });

  numberToastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

const swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  slideShadows: false,

  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },

  cardsEffect: {
    perSlideRotate: 0,
  },
});

const swiperSecond = new Swiper(".mySecondSwiper", {
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 0,
});

swiperWrapper.addEventListener("click", function (e) {
  const clickedSlide = e.target.closest(".swiper-slide");
  if (!clickedSlide) return;

  e.stopPropagation();

  if (currentClickedSlide && currentClickedSlide !== clickedSlide) {
    const previousCover = currentClickedSlide.querySelector(".swiper-cover");
    const previousBtn = currentClickedSlide.querySelector(".swiper-moreBtn");

    if (previousCover) {
      previousCover.style.display = "block";
      previousBtn.style.display = "none";
    }
  }

  const cover = clickedSlide.querySelector(".swiper-cover");
  const moreBtn = clickedSlide.querySelector(".swiper-moreBtn");
  if (cover) {
    cover.style.display = "none";
    moreBtn.style.display = "block";
    currentClickedSlide = clickedSlide;
  }
});

document.addEventListener("click", documentClickHandler);

document.querySelector(".navbar-nav").addEventListener("click", navigationfunc);

document
  .querySelector(".navs-offcanvas")
  .addEventListener("click", navigationfunc);
