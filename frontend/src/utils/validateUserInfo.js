const validateUserInfo = (name, value) => {
  let message = "";

  switch (name) {
    case "email":
      // Validate email only if it's not empty, allowing for deletion or changes
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "Please enter a valid email address.";
      }
      break;
    case "Fname":
    case "Lname":
      // Validate names to allow letters and spaces, but don't block input
      if (!/^[a-zA-Z]*$/.test(value)) {
        message = "Names should only contain letters.";
      }
      break;
    case "phone":
      // Validate phone number format, allowing changes or corrections
      if (value && !/^(0\d{9})$|^\+251\d{9}$/.test(value)) {
        message = "Not a valid phone number. Format: 0XXXXXXXXX or +251XXXXXXXXX.";
      }
      break;
    default:
      break;
  }

  return message;
};

export default validateUserInfo;
