const themePage5 = document.getElementById('themePage5');
const themePage4 = document.getElementById('themePage4');
const themePage3 = document.getElementById('themePage3');
const themePage2 = document.getElementById('themePage2');
const themePage1 = document.getElementById('themePage1');
const themePage = document.getElementById('themePage');
const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage')
const btnPlay = document.getElementById('btnPlay');
const btnBack = document.getElementById('btnBack');
const btnLogout = document.getElementById('btnLogout');
const btnTh1 = document.getElementById('btnTh1');
const btnTh2 = document.getElementById('btnTh2');
const btnTh3 = document.getElementById('btnTh3');
const btnTh4 = document.getElementById('btnTh4');
const btnTh5 = document.getElementById('btnTh5');
const btnBackTh1 = document.getElementById('btnBackTh1');
const btnBackTh2 = document.getElementById('btnBackTh2');
const btnBackTh3 = document.getElementById('btnBackTh3');
const btnBackTh4 = document.getElementById('btnBackTh4');
const btnBackTh5 = document.getElementById('btnBackTh5');
const login = document.getElementById('login');

const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const errorMsg = document.getElementById('errorMsg');

// document.getElementById('showUsername').textContent = localStorage.getItem("username");

btnPlay.addEventListener('click', () => {
  mainPage.style.display = 'none';
  loginPage.style.display = 'flex';
  // document.body.classList.remove('bg-main');
  // document.body.classList.add('bg-login');
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

btnBack.addEventListener('click', () => {
  loginPage.style.display = 'none';
  mainPage.style.display = 'block';
  // document.body.classList.remove('bg-login');
  // document.body.classList.add('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/minimo_bg.png")';
});

login.addEventListener('click', () => {
  loginPage.style.display = 'none';
  themePage.style.display = 'grid';
  // document.body.classList.remove('bg-login');
  // document.body.classList.remove('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';

  const username = usernameField.value.trim();
  const password = passwordField.value.trim();

  if (username === "" || password === "") {
    errorMsg.textContent = "Please fill all fields";
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("password", password);

});

btnLogout.addEventListener('click', () => {
  loginPage.style.display = 'flex';
  mainPage.style.display = 'none';
  themePage.style.display = 'none';
  // document.body.classList.remove('bg-login');
  // document.body.classList.remove('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

btnTh1.addEventListener('click', () => {
  loginPage.style.display = 'none';
  themePage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage1.style.display = 'block';
  // document.body.classList.remove('bg-login');
  // document.body.classList.remove('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/theme_minimo_bg.png")';
});

btnBackTh1.addEventListener('click', () => {
  loginPage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage1.style.display = 'none';
  themePage.style.display = 'grid';
  // document.body.classList.remove('bg-login');
  // document.body.classList.remove('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

btnTh2.addEventListener('click', () => {
  loginPage.style.display = 'none';
  themePage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage1.style.display = 'none';
  themePage2.style.display = 'block';
  // document.body.classList.remove('bg-login');
  // document.body.classList.remove('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/theme_carrot_bg.png")';
});

btnBackTh2.addEventListener('click', () => {
  loginPage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage.style.display = 'grid';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';  
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

btnTh3.addEventListener('click', () => {
  loginPage.style.display = 'none';
  themePage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
  themePage3.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_acorn_bg.png")';
});

btnBackTh3.addEventListener('click', () => {
  loginPage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage.style.display = 'grid';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
  themePage3.style.display = 'none';  
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

btnTh4.addEventListener('click', () => {
  loginPage.style.display = 'none';
  themePage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
  themePage3.style.display = 'none';
  themePage4.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_clover_bg.png")';
});

btnBackTh4.addEventListener('click', () => {
  loginPage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage.style.display = 'grid';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
  themePage3.style.display = 'none';  
  themePage4.style.display = 'none';
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

btnTh5.addEventListener('click', () => {
  loginPage.style.display = 'none';
  themePage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
  themePage3.style.display = 'none';
  themePage4.style.display = 'none';
  themePage5.style.display = 'block';
  document.body.style.backgroundImage = 'url("assets/images/theme_pawpsicle_bg.png")';
});

btnBackTh5.addEventListener('click', () => {
  loginPage.style.display = 'none';
  mainPage.style.display = 'none';
  themePage.style.display = 'grid';
  themePage1.style.display = 'none';
  themePage2.style.display = 'none';
  themePage3.style.display = 'none';  
  themePage4.style.display = 'none';
  themePage5.style.display = 'none';
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});
