// utils/validate.js

<<<<<<< HEAD
export function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

export function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,13}$/;
    return re.test(password);
=======
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
}

function validatePassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,13}$/;
  return re.test(password);
>>>>>>> be59806 (Sigin page displaying error from backend)
}

export function handleBlurEmail(e, setEmailError) {
  if (!validateEmail(e.target.value)) {
    setEmailError("Please enter valid email");
    setTimeout(() => setEmailError(""), 3000);
  } else {
    setEmailError("");
  }
}

export function handleBlurPassword(e, setPasswordError) {
  if (!validatePassword(e.target.value)) {
    setPasswordError("Password should be > 5 characters");
    setTimeout(() => setPasswordError(""), 3000);
  } else {
    setPasswordError("");
  }
}
