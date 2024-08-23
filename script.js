const form = document.querySelector("form");
const fullname = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const msg = document.getElementById("message");

function sendMail() {
  const bodyMessage = `Full Name: ${fullname.value}<br>
        Email: ${email.value}<br>
        Phone Number: ${phone.value}<br>
        Message: ${msg.value}`;

  // smtpjs function
  Email.send({
    SecureToken: "c2e1b26c-6005-4afb-b85d-89562fa5342f",
    To: "michaeldacanay958@gmail.com",
    From: "michaeldacanay958@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      // sweet alert function
      Swal.fire({
        title: "Success!",
        text: "Message Sent Successfully!",
        icon: "success",
      });
    }
  });
}

// check inputs
function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }
    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    if (item === phone) {
      checkPhoneNumber();
    }

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

// check email
function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTextEmail = document.querySelector(".error.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTextEmail.innerText = "Enter a valid Email Address";
    } else {
      errorTextEmail.innerText = "Email Address Required";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

// check phone number
function checkPhoneNumber() {
  const phoneRegex =
    /((\+[0-9]{2})|0)[.\- ]?9[0-9]{2}[.\- ]?[0-9]{3}[.\- ]?[0-9]{4}/; // 11 digits
  // /^\d{11}$/

  const errorTextPhone = document.querySelector(".error.phone");

  if (!phone.value.match(phoneRegex)) {
    phone.classList.add("error");
    phone.parentElement.classList.add("error");

    if (phone.value != "") {
      errorTextPhone.innerText = "Enter a valid 11-digit Phone Number";
    } else {
      errorTextPhone.innerText = "Phone Number Required";
    }
  } else {
    phone.classList.remove("error");
    phone.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullname.classList.contains("error") &&
    !email.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !msg.classList.contains("error")
  ) {
    sendMail();
    form.reset();
    return false;
  }
  //
});
