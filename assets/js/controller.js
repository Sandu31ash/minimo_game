import { EventBus } from "./events.js";

const mainPage = document.getElementById('mainPage');
const loginPage = document.getElementById('loginPage');
const themePage = document.getElementById('themePage');
const themePage1 = document.getElementById('themePage1');
const themePage2 = document.getElementById('themePage2');

function hideAll() {
  mainPage.style.display = 'none';
  loginPage.style.display = 'none';
  themePage.style.display = 'none';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
}

EventBus.on("NAVIGATE_MAIN", () => {
  hideAll();
  mainPage.style.display = 'flex';
  document.body.style.backgroundImage = 'url("assets/images/minimo_bg.png")';
});

EventBus.on("NAVIGATE_LOGIN", () => {
  hideAll();
  loginPage.style.display = 'flex';
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
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
