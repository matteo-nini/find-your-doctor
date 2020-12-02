//Define all the sections
const homePage = document.querySelector(".homepage");
const loginPage = document.querySelector(".login");
const dashboardPage = document.querySelector(".dashboard");
const doctorPage = document.querySelector(".selected__doctor");

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

//login form validation
function loginValidate(event) {
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
    localStorage.setItem("username", name.value);
    changePageAnimation(loginPage, dashboardPage, "next");
    dashboard();
  } else return false;
}

//user logged in
function dashboard() {
  createDoctorsList();
}

//function for create doctor list
function createDoctorsList() {
  //Define doctors array
  let doctors = [
    {
      avatar: "assets/images/avatars/doc_avatar_1.svg",
      name: "Dr. Stella Kane",
      category: "Heart Surgeon - Flower Hospitals",
      about:
        "Dr. Stella is the top most heart surgeon in Flower Hospital. She has done over 100 successful sugeries within past 3 years. She has achieved several awards for her wonderful contribution in her own field. She’s available for private consultation for given schedules.",
    },
    {
      avatar: "assets/images/avatars/doc_avatar_2.svg",
      name: "Dr. Joseph Car",
      category: "Dental Surgeon - Flower Hospitals",
      about: "lorem ipsum",
    },
    {
      avatar: "assets/images/avatars/doc_avatar_3.svg",
      name: "Dr. Stefani Albert",
      category: "Heart Surgeon - Flower Hospitals",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam fugit maxime nesciunt, at neque reiciendis eos, consequuntur omnis, modi totam aliquid qui iste eius odit deleniti facere! Nisi, cumque fugiat.",
    },
  ];

  let colors = ["#edf1fa", "#faf2ea", "#f9edeb"];

  let startPoint = document.querySelector(".dashboard__doctors h3"); //where start to append items
  let list = document.createElement("ul");
  list.className = "list";
  startPoint.appendChild(list);

  //loop from frist object 0 to last and start writing the list
  doctors.forEach((doctor, i) => {
    let listItem = document.createElement("li");
    listItem.className = "list__item";
    listItem.style.background = colors[i];
    if (doctor.category.includes("Heart")) listItem.classList.add("heart");
    else if (doctor.category.includes("Dental"))
      listItem.classList.add("dental");
    else if (doctor.category.includes("Eye")) listItem.classList.add("eye");
    let avatar = document.createElement("img");
    avatar.src = doctor.avatar;
    let infoBox = document.createElement("div");
    infoBox.className = "list__item__info";
    let name = document.createElement("h3");
    let spec = document.createElement("p");
    list.appendChild(listItem);
    listItem.appendChild(avatar);
    listItem.appendChild(infoBox);
    infoBox.appendChild(name);
    name.innerText = doctor.name;
    infoBox.appendChild(spec);
    spec.innerText = doctor.category;
    listItem.addEventListener("click", (event) => {
      changePageAnimation(dashboardPage, doctorPage, "next");
      docInfoPage(doctor);
    });
  });
}

//Function for Selected Doctor Page
function docInfoPage(selectedDoc) {
  let docPic = document.querySelector(".doctor__profile__pic"); //Take the avatar
  let docName = document.querySelector(".doctor__profile__info__name"); //Take the name
  let docSpec = document.querySelector("doctor__profile__info__spec"); //Take the specialization
  let docAbout = document.querySelector(".doctor__about__about");

  docPic.src = selectedDoc.avatar;
  docName.innerHTML = selectedDoc.name;
  docSpec.innerHTML = selectedDoc.category;
  docAbout.innerHTML = selectedDoc.about;
}

/*************************************** SEARCHING & FILTERING FUNCTIONS */

//handle the search button
function handleSearch() {
  let submitSearch = document.querySelector(".dashboard__search button");
  if (submitSearch.classList.contains("active")) cleanSearch();
  //if search is alredy done, clean it
  else searchDoctors(); //else search for doctors
  submitSearch.classList.toggle("active"); //change the button status
}

//function for search doctors by name
function searchDoctors() {
  let input = document.querySelector("#search").value.toUpperCase();
  let doctors = document.querySelectorAll(".list__item");

  // Loop through all list items, and hide those who don't match the search query
  doctors.forEach((doctor) => {
    let nameTag = doctor.getElementsByTagName("h3")[0]; //take the h3 tag
    let name = nameTag.innerText || nameTag.textContent; //take the h3 content
    if (name.toUpperCase().indexOf(input) > -1) {
      doctor.style.display = "";
    } else {
      doctor.style.display = "none";
    }
  });
}

//function for clear the search results
function cleanSearch() {
  let input = document.querySelector("#search");
  let doctors = document.querySelectorAll(".list__item");
  input.value = "";
  doctors.forEach((doctor) => {
    doctor.style.display = "";
  });
}

function filterCategory(whatCategory) {
  let doctors = document.querySelectorAll(".list__item");
  switch (whatCategory) {
    case "dental":
      doctors.forEach((doc) => {
        if (doc.classList.contains("dental")) doc.style.display = "";
        else doc.style.display = "none";
      });
      break;
    case "heart":
      doctors.forEach((doc) => {
        if (doc.classList.contains("heart")) doc.style.display = "";
        else doc.style.display = "none";
      });
      break;
    case "eye":
      doctors.forEach((doc) => {
        if (doc.classList.contains("eye")) doc.style.display = "";
        else doc.style.display = "none";
      });
      break;
  }
}

/***************************************************** UTILITY FUNCTIONS */

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

//function for show the central menu
function showMenu(whatMenu) {
  let menus = document.querySelectorAll(".menu--center"); //Center menu hidden
  let menuElements = document.querySelectorAll(".menu--center li"); //Center menu elements*/

  menus.forEach((menu) => {
    if (menu.style.display == "none") menu.style.display = "flex";
    else if (menu.style.display == "flex") menu.style.display = "none";
    else menu.style.display = "none";
  });

  if (whatMenu === "dashedmenu") {
    menuElements[0].innerHTML = "<a href='#categories'>Categories</a>"; //add link to Categories section
    menuElements[1].innerHTML = "<a href='#doctors'>Top Doctors</a>"; //add link to Top Doctors section
    menuElements[2].innerHTML = "";
  } else if (whatMenu === "user") {
    let username = localStorage.getItem("username");
    menuElements[0].innerHTML = `Hi ${username}!`; //Take the username to show it
    menuElements[1].innerHTML = "<a href='#'>Options</a>"; //Fake page link
    menuElements[2].innerHTML =
      "<a href='#' onclick='changePageAnimation(dashboardPage, loginPage, \"prew\");'>Exit</a>"; //Exit link send user to login page
  } else if (whatMenu === "doctor") {
    menuElements[3].innerHTML = "Add to Favourites"; //Fake page link
    menuElements[4].innerHTML = "Vote Doctor"; //Fake page link
    menuElements[5].innerHTML = "Report Doctor"; //Fake page link
  }
}
