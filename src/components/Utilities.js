
export const coreURL = 'https://sagipinasv1.herokuapp.com';

export const ellipsis = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "..."
  } else {
    return text;
  }
}

export const validateEmail = (email) => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

