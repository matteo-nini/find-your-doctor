//On load check if mobile
window.onload = function () {
  let ckMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        ckMobile.Android() ||
        ckMobile.BlackBerry() ||
        ckMobile.iOS() ||
        ckMobile.Opera() ||
        ckMobile.Windows()
      );
    },
  };

  if (ckMobile.any()) {
    //Remove Desktop elements
    let allDesktop = document.querySelectorAll(".desktop");
    allDesktop.forEach((desktop) => {
      desktop.style.display = "none";
    });
    getStarted();
  } else {
    //Remove all mobile elements
    let allMobile = document.querySelectorAll("section");
    allMobile.forEach((mobile) => {
      mobile.style.display = "none";
    });
    console.log("You're in desktop");
  }
};

//Define all the sections
const home = document.querySelector(".homepage");
const login = document.querySelector(".login");
const userDash = document.querySelector(".dashboard");

function getStarted() {
  //Get Started Button
  let startBtn = document.querySelector(".homepage__btn");
  startBtn.addEventListener("click", (event) => {
    changePageAnimation(home, login, "next");
  });

  //GoBack Button in login section
  let goback = document.querySelector(".login__go-back");
  goback.addEventListener("click", (event) => {
    changePageAnimation(login, home, "prew");
  });
}

//page transition animation
function changePageAnimation(currentPage, finalPage, where) {
  let preloader = document.querySelector("#preloader");

  let slideOutKeyFrames = [
    { transform: "translateX(0%)" },
    { transform: "translateX(-120%)" },
  ];

  let slideInKeyFrames = [
    { transform: "translateX(120%)" },
    { transform: "translateX(0)" },
  ];

  let slideOutReverseKeyFrames = [
    { transform: "translateX(0%)" },
    { transform: "translateX(120%)" },
  ];

  let slideInReverseKeyFrames = [
    { transform: "translateX(-120%)" },
    { transform: "translateX(0)" },
  ];
  preloader.style.opacity = "1";
  currentPage.style.filter = "blur(5px)";
  setTimeout(function () {
    if (where == "next") {
      let slideOut = currentPage.animate(slideOutKeyFrames, 700);
      finalPage.animate(slideInKeyFrames, 500);
      finalPage.style.display = "flex";
      slideOut.onfinish = function () {
        currentPage.style.display = "none";
      };
    } else if (where == "prew") {
      currentPage.animate(slideOutReverseKeyFrames, 500);
      finalPage.animate(slideInReverseKeyFrames, 500);
      currentPage.style.display = "none";
      finalPage.style.display = "flex";
    }
    preloader.style.opacity = "0";
  }, 1000);
}

//form validation
function loginValidate(event) {
  let form = document.querySelector(".login__form");
  let log = true; //CHANGE IT FOR TEST
  let name = document.querySelector("#name");
  let password = document.querySelector("#password");
  let Error = document.querySelectorAll(".login__form__validate");
  event.preventDefault();
  if (name.value == "" || name.value == null) {
    name.focus();
    name.style.border = "2px solid #f01f35";
    name.style.color = "#f01f35";
    Error[0].style.color = "#f01f35";
    Error[0].innerHTML = "Please, enter a valid name";
  } else {
    name.style.border = "1px solid #00B1BD";
    name.style.color = "#00B1BD";
    Error[0].style.color = "#00B1BD";
    Error[0].innerHTML = "Ok!";
  }
  if (password.value == "") {
    password.focus();
    password.style.border = "2px solid #f01f35";
    password.style.color = "#f01f35";
    Error[1].style.color = "#f01f35";
    Error[1].innerHTML = "Password cannot be empty";
  } else {
    name.style.border = "1px solid #00B1BD";
    name.style.color = "#00B1BD";
    Error[0].style.color = "#00B1BD";
    Error[0].innerHTML = "Ok!";
    password.style.border = "1px solid #00B1BD";
    password.style.color = "#00B1BD";
    Error[1].style.color = "#00B1BD";
    Error[1].innerHTML = "Ok!";
    log = true;
  }
  if (log == true) form.addEventListener("submit", logged(name.value));
}

//user logged in
function logged(username) {
  changePageAnimation(login, userDash, "next");
}
