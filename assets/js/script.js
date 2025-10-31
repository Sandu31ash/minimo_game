const themePage = document.getElementById('themePage');
const loginPage = document.getElementById('loginPage');
const btnPlay = document.getElementById('btnPlay');
const backBtn = document.getElementById('backBtn');

btnPlay.addEventListener('click', () => {
  mainPage.style.display = 'none';
  loginPage.style.display = 'flex';
  document.body.classList.remove('bg-main');
  document.body.classList.add('bg-login');
  document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
});

backBtn.addEventListener('click', () => {
  loginPage.style.display = 'none';
  mainPage.style.display = 'block';
  document.body.classList.remove('bg-login');
  document.body.classList.add('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/minimo_bg.png")';
});

login.addEventListener('click', () => {
  loginPage.style.display = 'none';
  themePage.style.display = 'block';
  document.body.classList.remove('bg-login');
  document.body.classList.add('bg-main');
  document.body.style.backgroundImage = 'url("assets/images/minimo_bg.png")';
});