console.log("JS is running...");
import EventBus from "./events.js";

const btnPlay = document.getElementById('btnPlay');
const btnBack = document.getElementById('btnBack');
const btnBackReg = document.getElementById('btnBackReg');
const btnBackTh1 = document.getElementById('btnBackTh1');
const btnBackTh2 = document.getElementById('btnBackTh2');
const btnBackTh3 = document.getElementById('btnBackTh3');
const btnBackTh4 = document.getElementById('btnBackTh4');
const btnBackTh5 = document.getElementById('btnBackTh5');
const login = document.getElementById('login');
const btnLogout = document.getElementById('btnLogout');
const btnTh1 = document.getElementById('btnTh1');
const btnTh2 = document.getElementById('btnTh2');
const btnTh3 = document.getElementById('btnTh3');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const errorMsg = document.getElementById('errorMsg');
const btnRegPage = document.getElementById('btnRegPage')
const regBtn = document.getElementById('regBtn')
const errorMsgReg = document.getElementById('errorMsgReg');
const regUsername = document.getElementById('regUsername');
const btnLoginPage = document.getElementById('btnLoginPage');
const bananaInput = document.getElementById('bananaInput');
const result = document.getElementById('result');
const playAgain = document.getElementById('playAgain');

const BASE_URL = "http://localhost:3000/api/";

//UI Events

btnPlay.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_LOGIN");
});

btnBack.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_MAIN");
});

btnBackReg.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_MAIN");
});

btnRegPage.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_REG");
});

btnLoginPage.addEventListener('click', () =>{
  EventBus.emit("NAVIGATE_LOGIN");
});

login.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!username || !password) {
    errorMsg.textContent = "Username and password cannot be empty.";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Login successful");
      loginPage.style.display = "none";
      themePage.style.display = "grid";
      errorMsg.textContent = "";
      showName(username);
      // clearFields();
    } else {
      errorMsg.textContent = data.error;
    }

  } catch (err) {
    errorMsg.textContent = "Network error. Backend not running.";
  }
});

function showName(username){

  // const usernameField = document.getElementById('username');
  // const username = usernameField.value;

  const showUsername = document.getElementById('showUsername');
  showUsername.textContent = username;

}

regBtn.addEventListener("click", async () => {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const errorMsgReg = document.getElementById("errorMsgReg");

  if (!username || !password) {
    errorMsgReg.textContent = "Username and password cannot be empty!";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      errorMsgReg.style.color = "green";
      errorMsgReg.textContent = "Registration successful! You can login now.";
    } else {
      errorMsgReg.style.color = "red";
      errorMsgReg.textContent = data.error;
    }

  } catch (err) {
    errorMsgReg.textContent = "Network error. Backend not running.";
  }
});


// document.getElementById("registerBtn").addEventListener("click", async () => {
//   const username = document.getElementById("regUsername").value;
//   const password = document.getElementById("regPassword").value;

//   const res = await fetch("http://localhost:3000/api/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password })
//   });

//   const data = await res.json();
//   alert(data.message || data.error);
// });


btnLogout.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_LOGIN");
});

btnTh1.addEventListener('click', async () => {
  EventBus.emit("NAVIGATE_THEME_1");

  const loader = document.querySelector('.loader'); // your loader element
  const bananaImg = document.getElementById("bananaImg");

  // Show loader
  loader.style.display = "block";

  try {
    const res = await fetch("http://localhost:3000/api/banana", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      const img = data.image;
      const ans = data.answer;

      localStorage.setItem("bananaAnswer", ans);

      const correctAnswer = localStorage.getItem("bananaAnswer");

      // Wait until the image is fully loaded before hiding loader
      bananaImg.onload = () => {
        loader.style.display = "none";
      };

      bananaImg.src = img;
    } else {
      loader.style.display = "none";
      console.error("Failed to fetch image");
    }

  } catch (err) {
    loader.style.display = "none";
    errorMsgReg.textContent = "Network error. Backend not running.";
  }
});


btnTh2.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_2");
});

btnTh3.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_3");
});

btnTh4.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_4");
});

btnTh5.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_5");
});

btnBackTh1.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_MENU", usernameField.value);
});

btnBackTh2.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_MENU", usernameField.value);
});

btnBackTh3.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_MENU", usernameField.value);
});

btnBackTh4.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_MENU", usernameField.value);
});

btnBackTh5.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_THEME_MENU", usernameField.value);
});

document.addEventListener("DOMContentLoaded", () => {
  const bananaInput = document.getElementById("bananaInput");
  const result = document.getElementById("result");

  bananaInput.addEventListener("input", () => {

    // Remove anything not a number
    bananaInput.value = bananaInput.value.replace(/[^0-9]/g, "");

    // Convert value to number
    let value = parseInt(bananaInput.value, 10);

    // If invalid or empty, clear message and stop
    if (isNaN(value)) {
      result.textContent = "";
      return;
    }

    const correctAnswer = parseInt(localStorage.getItem("bananaAnswer"));

    // If value exceeds max (9), reset to 9 (or do what you prefer)
    if (value > 9) {
      bananaInput.value = 9;
      result.textContent = "Max value is 9";
    } else {
      if(value==correctAnswer){
        result.textContent = "You won!";
        playAgain.style.display = "block";
      }else{
        result.textContent = "Try Again!";
        playAgain.style.display = "none";
      }
    }
  });
});

playAgain.addEventListener('click', async () => {

  const loader = document.getElementById("bananaLoader");
  const image = document.getElementById("bananaImg");

  // Show loader & hide image temporarily
  loader.style.display = "block";
  image.style.opacity = "0";

  try {
    const res = await fetch("http://localhost:3000/api/banana");
    const data = await res.json();

    if (res.ok) {
      const img = data.image;
      const ans = data.answer;

      localStorage.setItem("bananaAnswer", ans);

      // Load image fully before showing it
      image.onload = () => {
        loader.style.display = "none";
        image.style.opacity = "1";
      };

      image.src = img;
      playAgain.style.display = "none";
      result.textContent = "Find Banana!";
      bananaInput.value = "";
    }

  } catch (err) {
    errorMsgReg.textContent = "Network error. Backend not running.";
    loader.style.display = "none";
  }
});




// bananaInput.addEventListener("input", () => {
  
//   bananaInput.value = bananaInput.value.replace(/[^0-9]/g, "");

//   if(parseInt(bananaInput.value)>9){
//     result.value = "Invalid input!";
//   }

// });


















// const themePage5 = document.getElementById('themePage5');
// const themePage4 = document.getElementById('themePage4');
// const themePage3 = document.getElementById('themePage3');
// const themePage2 = document.getElementById('themePage2');
// const themePage1 = document.getElementById('themePage1');
// const themePage = document.getElementById('themePage');
// const show = document.getElementById('showUsername');
// const loginPage = document.getElementById('loginPage');
// const mainPage = document.getElementById('mainPage')
// const btnPlay = document.getElementById('btnPlay');
// const btnBack = document.getElementById('btnBack');
// const btnLogout = document.getElementById('btnLogout');
// const btnTh1 = document.getElementById('btnTh1');
// const btnTh2 = document.getElementById('btnTh2');
// const btnTh3 = document.getElementById('btnTh3');
// const btnTh4 = document.getElementById('btnTh4');
// const btnTh5 = document.getElementById('btnTh5');
// const btnBackTh1 = document.getElementById('btnBackTh1');
// const btnBackTh2 = document.getElementById('btnBackTh2');
// const btnBackTh3 = document.getElementById('btnBackTh3');
// const btnBackTh4 = document.getElementById('btnBackTh4');
// const btnBackTh5 = document.getElementById('btnBackTh5');
// const login = document.getElementById('login');

// const usernameField = document.getElementById('username');
// const passwordField = document.getElementById('password');
// const errorMsg = document.getElementById('errorMsg');

// // document.getElementById('showUsername').textContent = localStorage.getItem("username");

// btnPlay.addEventListener('click', () => {
//   mainPage.style.display = 'none';
//   loginPage.style.display = 'flex';
//   // document.body.classList.remove('bg-main');
//   // document.body.classList.add('bg-login');
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });

// btnBack.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   mainPage.style.display = 'block';
//   // document.body.classList.remove('bg-login');
//   // document.body.classList.add('bg-main');
//   document.body.style.backgroundImage = 'url("assets/images/minimo_bg.png")';
// });

// login.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   themePage.style.display = 'grid';
//   // document.body.classList.remove('bg-login');
//   // document.body.classList.remove('bg-main');
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';

//   const username = usernameField.value.trim();
//   const password = passwordField.value.trim();

//   if (username === "" || password === "") {
//     errorMsg.textContent = "Please fill all fields";
//     return;
//   }

//   localStorage.setItem("username", username);
//   localStorage.setItem("password", password);
//   // window.print(username);
//   // show.value(username);
//   // usernameField.addEventListener('input', showName);
//   showName(username);

// });

// function showName(username){

//   // const usernameField = document.getElementById('username');
//   // const username = usernameField.value;

//   const showUsername = document.getElementById('showUsername');
//   showUsername.textContent = username;

// }

// btnLogout.addEventListener('click', () => {
//   loginPage.style.display = 'flex';
//   mainPage.style.display = 'none';
//   themePage.style.display = 'none';
//   // document.body.classList.remove('bg-login');
//   // document.body.classList.remove('bg-main');
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });

// btnTh1.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   themePage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage1.style.display = 'block';
//   // document.body.classList.remove('bg-login');
//   // document.body.classList.remove('bg-main');
//   document.body.style.backgroundImage = 'url("assets/images/theme_minimo_bg.png")';
// });

// btnBackTh1.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage1.style.display = 'none';
//   themePage.style.display = 'grid';
//   // document.body.classList.remove('bg-login');
//   // document.body.classList.remove('bg-main');
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });

// btnTh2.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   themePage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'block';
//   // document.body.classList.remove('bg-login');
//   // document.body.classList.remove('bg-main');
//   document.body.style.backgroundImage = 'url("assets/images/theme_carrot_bg.png")';
// });

// btnBackTh2.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage.style.display = 'grid';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'none';  
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });

// btnTh3.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   themePage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'none';
//   themePage3.style.display = 'block';
//   document.body.style.backgroundImage = 'url("assets/images/theme_acorn_bg.png")';
// });

// btnBackTh3.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage.style.display = 'grid';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'none';
//   themePage3.style.display = 'none';  
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });

// btnTh4.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   themePage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'none';
//   themePage3.style.display = 'none';
//   themePage4.style.display = 'block';
//   document.body.style.backgroundImage = 'url("assets/images/theme_clover_bg.png")';
// });

// btnBackTh4.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage.style.display = 'grid';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'none';
//   themePage3.style.display = 'none';  
//   themePage4.style.display = 'none';
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });

// btnTh5.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   themePage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'none';
//   themePage3.style.display = 'none';
//   themePage4.style.display = 'none';
//   themePage5.style.display = 'block';
//   document.body.style.backgroundImage = 'url("assets/images/theme_pawpsicle_bg.png")';
// });

// btnBackTh5.addEventListener('click', () => {
//   loginPage.style.display = 'none';
//   mainPage.style.display = 'none';
//   themePage.style.display = 'grid';
//   themePage1.style.display = 'none';
//   themePage2.style.display = 'none';
//   themePage3.style.display = 'none';  
//   themePage4.style.display = 'none';
//   themePage5.style.display = 'none';
//   document.body.style.backgroundImage = 'url("assets/images/login_bg.png")';
// });




