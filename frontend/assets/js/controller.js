import EventBus from "./events.js";

const mainPage = document.getElementById('mainPage');
const loginPage = document.getElementById('loginPage');
const themePage = document.getElementById('themePage');
const themePage1 = document.getElementById('themePage1');
const themePage2 = document.getElementById('themePage2');
const themePage3 = document.getElementById('themePage3');
const themePage4 = document.getElementById('themePage4');
const themePage5 = document.getElementById('themePage5');
const regPage = document.getElementById('regPage');
// const regUsername = document.getElementById('regUsername');
// const usernameField = document.getElementById('username');

function hideAll() {
  mainPage.style.display = 'none';
  loginPage.style.display = 'none';
  regPage.style.display = 'none';
  themePage.style.display = 'none';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
  themePage3.style.display = 'none';
  themePage4.style.display = 'none';
  themePage5.style.display = 'none';
}

// function clearFields(){
//   usernameField.value("");
//   regUsername.value("");
// }

EventBus.on("NAVIGATE_MAIN", () => {
  hideAll();
  mainPage.style.display = 'flex';
  document.body.style.backgroundImage = 'url("assets/images/minimo_bg.png")';
});

// EventBus.on("NAVIGATE_LOGIN", () => {
//   hideAll();
//   loginPage.style.display = 'flex';
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });

EventBus.on("NAVIGATE_LOGIN", () => {
    hideAll();
  loginPage.style.display = 'flex';
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';

  loginPage.style.display = "grid";
  themePage.style.display = "none";

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  
  const errorMsg = document.getElementById("errorMsg");
  if (errorMsg) errorMsg.textContent = "";
});


EventBus.on("NAVIGATE_REG", () => {
  hideAll();
  regPage.style.display = 'flex';
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
  
  regPage.style.display = "grid";
  themePage.style.display = "none";

  document.getElementById("regUsername").value = "";
  document.getElementById("regPassword").value = "";

  const errorMsg = document.getElementById("errorMsg");
  if (errorMsg) errorMsg.textContent = "";
});

EventBus.on("NAVIGATE_THEME_MENU", (username) => {
  hideAll();
  themePage.style.display = 'grid';
  document.getElementById("showUsername").textContent = username;
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

EventBus.on("NAVIGATE_THEME_1", () => {
  hideAll();
  themePage1.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_minimo_bg.png")';
});

EventBus.on("NAVIGATE_THEME_2", () => {
  hideAll();
  themePage2.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_carrot_bg.png")';
});

EventBus.on("NAVIGATE_THEME_3", () => {
  hideAll();
  themePage3.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_acorn_bg.png")';
});

EventBus.on("NAVIGATE_THEME_4", () => {
  hideAll();
  themePage4.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_clover_bg.png")';
});

EventBus.on("NAVIGATE_THEME_5", () => {
  hideAll();
  themePage5.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_pawpsicle_bg.png")';
});

// EventBus.on("NAVIGATE_THEME_PAGE", (username) => {
//   hideAll();
//   themePage.style.display = 'grid';
//   document.getElementById("showUsername").textContent = username;
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });