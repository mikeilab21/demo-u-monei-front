const addEventOnElem = function (elem, type, callback) {
  if (elem.length !== undefined) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};



/**
 * Navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
};

for (let i = 0; i < navLinks.length; i++) {
  addEventOnElem(navLinks[i], "click", closeNavbar);
}

/**
 * Header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const handleScroll = function () {
  if (window.scrollY > 100) {
    if (header !== null) {
      header.classList.add("active");
    }
    if (backTopBtn !== null) {
      backTopBtn.classList.add("active");
    }
  } else {
    if (header !== null) {
      header.classList.remove("active");
    }
    if (backTopBtn !== null) {
      backTopBtn.classList.remove("active");
    }
  }
};



window.addEventListener("scroll", handleScroll);
