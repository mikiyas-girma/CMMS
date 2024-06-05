export const generateRandomPassword = (prefix) => {
  const length = 12;
  let password = "";

  const emailPrefix = prefix.split("@")[0];

  const selectedCharacters = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * emailPrefix.length);
    selectedCharacters.push(emailPrefix.charAt(randomIndex));
  }

  password += selectedCharacters.join("");

  const remainingLength = length - selectedCharacters.length;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  for (let i = 0; i < remainingLength; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return password;
};
