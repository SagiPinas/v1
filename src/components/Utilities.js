
export const coreURL = 'https://sagipinasv1.herokuapp.com';

export const ellipsis = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "..."
  } else {
    return text;
  }
}
// export const coreURL = 'http://localhost:7000';

