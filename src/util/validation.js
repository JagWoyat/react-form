export function isEmailValid(email) {
  return /^[a-z0-9_.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i.test(email);
}

export function isPhoneValid(phone) {
  return /^\d{9}$/.test(phone);
}

export function randomizeErrorTest(email, chanceToFail) {
  if (Math.random() > chanceToFail) {
    return email;
  } else {
    return "";
  }
}
