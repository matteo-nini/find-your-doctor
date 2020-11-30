//On load check device
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
    //If is mobile
    //Remove Desktop elements
    let allDesktop = document.querySelectorAll(".desktop");
    allDesktop.forEach((desktop) => {
      desktop.style.display = "none";
    });
    getStarted(); //first function that handle the clickable Get Started Button
  } else {
    //if is desktop
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

//Function for handle the eventListeners
function getStarted() {
  //Get Started Button
  let startBtn = document.querySelector(".homepage__btn");
  startBtn.addEventListener("click", (event) => {
    changePageAnimation(home, login, "next"); //Show login page
  });

  //GoBack Button in login section
  let goback = document.querySelector(".login__go-back");
  goback.addEventListener("click", (event) => {
    changePageAnimation(login, home, "prew");
  });
}

//login form validation
function loginValidate(event) {
  let form = document.querySelector(".login__form"); //login form
  let canLog = true; //Flag for check the log status False: not logged | True: logged CHANGE IT FOR TEST
  let name = document.querySelector("#name"); //input name
  let password = document.querySelector("#password"); //input password
  let Error = document.querySelectorAll(".login__form__validate"); //span
  event.preventDefault();
  //Add some basic check for the inputs
  if (name.value == "" || name.value == null) {
    name.focus();
    name.style.border = "2px solid #f01f35";
    name.style.color = "#f01f35";
    Error[0].style.color = "#f01f35";
    Error[0].innerHTML = "Please, enter a valid name";
  } else if (password.value == "") {
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
    canLog = true;
  }
  //If all is ok, on submit,change page, than go to logged() and take the name value for showing later
  if (canLog == true) {
    changePageAnimation(login, userDash, "next");
    form.addEventListener("submit", logged(name.value));
  }
}

//user logged in
function logged(username) {
  let menu = document.querySelector(".dashboard__menu__ico"); //menu icon
  let avatar = document.querySelector(".dashboard__menu__user"); //user icon
  let sideMenu = document.querySelector(".menu__center"); //Center menu hidden
  let menuElements = document.querySelectorAll(".menu__center li"); //Center menu elements

  menu.addEventListener("click", (event) => {
    if (sideMenu.style.display == "flex") sideMenu.style.display = "none";
    else {
      sideMenu.style.display = "flex"; //show menu
      menuElements[0].innerHTML = "<a href='#'>Categories</a>"; //add link to Categories section
      menuElements[1].innerHTML = "<a href='#'>Top Doctors</a>"; //add link to Top Doctors section
      menuElements[2].style.display = "none"; //don't show it
    }
  });

  avatar.addEventListener("click", (event) => {
    if (sideMenu.style.display == "none") {
      sideMenu.style.display = "flex";
      menuElements[0].innerHTML = `Hi ${username}!`; //Take the username to show it
      menuElements[1].innerHTML = "<a href='#'>Options</a>"; //Fake option page link
      menuElements[2].innerHTML =
        "<a href='#' onclick='changePageAnimation(userDash, login, \"prew\");'>Exit</a>"; //Exit link send user to login page
    } else {
      sideMenu.style.display = "none";
    }
  });
}

//Function for page transition animation
function changePageAnimation(currentPage, finalPage, where) {
  let preloader = document.querySelector("#preloader");

  //Define Keyframes
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
  //Let show preloader page and blur the current page
  preloader.style.opacity = "1";
  currentPage.style.filter = "blur(5px)";
  //After one second, let change the page
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
    currentPage.style.filter = "blur(0)";
  }, 1000);
}

function showMenu() {}
