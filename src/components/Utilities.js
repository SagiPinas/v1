import Toastify from 'toastify-js'


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

export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}


export const toast = (msg, type) => {
  let bg = `linear-gradient(to right, #00b09b, #96c93d)`;

  switch (type) {
    case 'success':
      bg = `linear-gradient(to right, #11998e, #38ef7d)`
      break;
    case 'error':
      bg = `linear-gradient(to right, #c31432, #240b36)`
      break;
    case 'alert':
      bg = `linear-gradient(to right, #FF512F,#F09819)`;
      break;
    default:
  }

  Toastify({
    text: msg,
    backgroundColor: bg,
    gravity: "top",
    position: "right"
  }).showToast();

}

