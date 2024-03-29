const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const number = document.getElementById('registerPhoneNumber');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const mobileNumberInput = document.getElementById("registerPhoneNumber");

mobileNumberInput.addEventListener("input", (event) => {
  const inputValue = event.target.value;

  
  const allowedKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "Backspace",
  ];
  event.target.value = inputValue.replace(/[^0-9]/g, "");   
  if (!allowedKeys.includes(event.key)) {
    event.preventDefault();
  }
  if (!inputValue.match(/^[0-9]{10}$/)) {
    setError(number, "Please enter a valid 10-digit mobile number");
    }else{
        setSuccess(mobileNumberInput)
    }


  
  if (inputValue.length > 10) {
    event.target.value = inputValue.slice(0, 10);
  }
});
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    const mobilevalue = number.value.trim(); 

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }
    if(mobilevalue.length < 10 || mobilevalue.length > 10){
        setError(number, 'Mobile number should be of 10 digits');
    } else{
        setSuccess(number);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        window.location.href="index.html";
        setSuccess(password2);
    }

};
