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
// const bananaInput = document.getElementById('bananaInput');
const result = document.getElementById('result');
const playAgain = document.getElementById('playAgain');
const bananaInput = document.getElementsByClassName("ansBtn");
// const ans0 = document.getElementById("ans0");
const loginPage = document.getElementById('loginPage');
const themePage = document.getElementById('themePage');


const BASE_URL = "http://localhost:3000/api/";

// document.getElementById("bgMusic").play();

//////UI Events////////

btnPlay.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_LOGIN");
  document.getElementById("bgMusic").play();
});

const bgMusic = document.getElementById("bgMusic");
const soundToggle = document.getElementById("soundToggle");
const icon = soundToggle.querySelector("i");

let isMuted = false;

soundToggle.addEventListener("click", () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    icon.className = isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
});
soundToggle.classList.toggle("playing", !isMuted);




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



/////////////Login//////////////////////////

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



///////////Register/////////////

regBtn.addEventListener("click", async (event) => {
  
  event.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const imgUploader = document.getElementById("imgUploader");

  if (!username || !password) {
    errorMsgReg.textContent = "Username and password cannot be empty!";
    errorMsgReg.style.color = "red";
    return;
  }

  if (!imgUploader.files || imgUploader.files.length === 0) {
    errorMsgReg.textContent = "Please upload an avatar image!";
    errorMsgReg.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("avatar", imgUploader.files[0]); // send actual file!

  try {
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      errorMsgReg.style.color = "green";
      errorMsgReg.textContent = "Registration successful!";
      imgUploader.value = "";
      // loginPage.style.display = "block";
      
      setTimeout(() => {
        errorMsgReg.textContent = "";
      }, 3000);

    } else {
      errorMsgReg.style.color = "red";
      errorMsgReg.textContent = data.error;
    }
  } catch (err) {
    errorMsgReg.textContent = "Network error. Backend not running.";
  }
});



// regBtn.addEventListener("click", async () => {
//   const username = document.getElementById("regUsername").value.trim();
//   const password = document.getElementById("regPassword").value.trim();
//   const errorMsgReg = document.getElementById("errorMsgReg");
//   const avator = document.getElementById("avatorImg");

//  if(!avator){
//     errorMsgReg.textContent = "Please upload an avator image!";
//     return;
//   }

//   if (!username || !password) {
//     errorMsgReg.textContent = "Username and password cannot be empty!";
//     return;
//   }

 

//   try {
//     const res = await fetch("http://localhost:3000/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password })
//     });

//     const data = await res.json();

//     if (res.ok) {
//       errorMsgReg.style.color = "green";
//       errorMsgReg.textContent = "Registration successful! You can login now.";
//     } else {
//       errorMsgReg.style.color = "red";
//       errorMsgReg.textContent = data.error;
//     }

//   } catch (err) {
//     errorMsgReg.textContent = "Network error. Backend not running.";
//   }
// });

const imgUploader = document.getElementById('imgUploader');
const avatorImg = document.getElementById('avatorImg');

imgUploader.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatorImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

btnLogout.addEventListener('click', () => {
  EventBus.emit("NAVIGATE_LOGIN");
});

btnTh1.addEventListener('click', async () => {
  EventBus.emit("NAVIGATE_THEME_1");

  const loader = document.querySelector('.loader'); // your loader element
  const bananaImg = document.getElementById("bananaImg");

  /////Show loader/////
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

// document.addEventListener("DOMContentLoaded", () => {
//   const bananaInput = document.getElementById("bananaInput");
//   const result = document.getElementById("result");

//   bananaInput.addEventListener("input", () => {

//     bananaInput.value = bananaInput.value.replace(/[^0-9]/g, "");

//     let value = parseInt(bananaInput.value, 10);

//     if (isNaN(value)) {
//       result.textContent = "";
//       return;
//     }

//     const correctAnswer = parseInt(localStorage.getItem("bananaAnswer"));

//     if (value > 9) {
//       bananaInput.value = 9;
//       result.textContent = "Max value is 9";
//     } else {
//       if(value==correctAnswer){
//         result.textContent = "You won!";
//         playAgain.style.display = "block";
//       }else{
//         result.textContent = "Try Again!";
//         playAgain.style.display = "none";
//       }
//     }
//   });
// });

const answerButtons = document.querySelectorAll(".ansBtn");
// const result = document.getElementById("result");
// const playAgain = document.getElementById("playAgain");

answerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = parseInt(btn.textContent); 
    const correctAnswer = parseInt(localStorage.getItem("bananaAnswer"));

    console.log("Button clicked:", value);

    if (value === correctAnswer) {
      result.textContent = "You won!";
      result.style.color = "White";
      result.classList.remove("pop"); 
  void result.offsetWidth;      
  result.classList.add("pop");     
  playAgain.style.display = "block";
    } else {
  result.textContent = "Try Again!";
  result.style.color = "Red";
  result.classList.remove("pop"); 
  void result.offsetWidth;      
  result.classList.add("pop");     
  playAgain.style.display = "none";
}

  });
});

playAgain.addEventListener('click', async () => {

  const loader = document.getElementById("bananaLoader");
  const image = document.getElementById("bananaImg");

  loader.style.display = "block";
  image.style.opacity = "0";

  try {
    const res = await fetch("http://localhost:3000/api/banana");
    const data = await res.json();

    if (res.ok) {
      const img = data.image;
      const ans = data.answer;

      localStorage.setItem("bananaAnswer", ans);

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








