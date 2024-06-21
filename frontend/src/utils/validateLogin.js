// utils/validate.js

export function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
}

export function validatePassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.)[A-Za-z\d]{5,13}$/;
  return re.test(password);
}

export function validateName(name) {
  const re = /^[a-zA-Z]{2,30}$/;
  return re.test(name);
}

export function validateLName(Lname) {
  const re = /^[a-zA-Z]{2,30}$/;
  return re.test(Lname);
}

export function validatePhone(phone) {
    const re = /^(0(9|7)\d{8})$/;
    return re.test(phone);

}

export function handleBlurEmail(e, setEmailError) {
  if (!validateEmail(e.target.value)) {
    console.log("edit em: ", e.target.value);
    setEmailError("Please enter valid email");
    // setTimeout(() => setEmailError(""), 2000);
  } else {
    setEmailError("");
  }
}

export function handleBlurPassword(e, setPasswordError) {
  if (!validatePassword(e.target.value)) {
    setPasswordError("Password should be > 8 characters");
    // setTimeout(() => setPasswordError(""), 2000);
  } else {
    setPasswordError("");
  }
}

export function handleBlurName(e, setNameError) {
  if (!validateName(e.target.value)) {
    setNameError("Name should be atleast 2 characters");
    // setTimeout(() => setNameError(""), 2000);
  } else {
    setNameError("");
  }
}

export function handleBlurPhone(e, setPhoneError) {
    if (!validatePhone(e.target.value)) {
        setPhoneError("valid format: 09XXXXXXXX or 07XXXXXXXX");
        // setTimeout(() => setPhoneError(""), 3000);
    } else {
        setPhoneError("");
    }
}
