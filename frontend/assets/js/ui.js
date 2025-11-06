// import EventBus from "./eventBus.js";

// const pages = {
//   mainPage: document.getElementById("mainPage"),
//   loginPage: document.getElementById("loginPage"),
//   themePage: document.getElementById("themePage"),
// };

// function showPage(pageName, bgImage) {
//   Object.values(pages).forEach(p => p.style.display = "none");
//   pages[pageName].style.display = (pageName === "loginPage" ? "flex" : "block");
//   document.body.style.backgroundImage = `url(${bgImage})`;
// }

// EventBus.on("PLAY_CLICKED", () =>
//   showPage("loginPage", "assets/images/login_bg.png")
// );

// EventBus.on("BACK_TO_MAIN", () =>
//   showPage("mainPage", "assets/images/minimo_bg.png")
// );

// EventBus.on("LOGIN_SUCCESS", (username) => {
//   document.getElementById("showUsername").textContent = username;
//   showPage("themePage", "assets/images/login_bg.png");
// });
