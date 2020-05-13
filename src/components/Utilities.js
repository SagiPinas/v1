import Toastify from 'toastify-js'
import sha1 from 'sha1'
import axios from 'axios'


export const coreURL = 'https://sagipinasv1.herokuapp.com';
export const googleMapsAPIKEY = "AIzaSyD5kFZMwUIUDZ25nTtLx0_0G3x1d2GMiCY";
export const mapbox_key = 'pk.eyJ1IjoiYnJ5Y2UwNiIsImEiOiJjazNmbndybm4wMDk3M29wZ2dicjlmb29iIn0.NVknKG525ZpQVmIAbFiqfw'


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

export const authSSO = (data) => {

  console.log(data);

  let email = data.email
  let password = sha1(data.email + data.googleId);

  axios(
    {
      method: 'post',
      url: `${coreURL}/login`,
      data: {
        email: email,
        password: password,
      }
    }
  )
    .then(res => {
      if (res.data.status === "success") {
        localStorage.user = JSON.stringify(res.data.userData);
        window.location.href = "/dashboard"
      } else {
        toast('Creating Account...', 'success')
        axios(
          {
            method: 'post',
            url: `${coreURL}/signup`,
            data: {
              email: data.email,
              name: data.name,
              password: password,
              avatar: data.imageUrl,
              city: '-'
            }
          }
        )
          .then(res => {
            if (res.data.status === "success") {
              let newUserData = {
                id: res.data.userId,
                email: data.email,
                name: data.name,
                avatar: data.imageUrl,
                city: '-'
              }

              localStorage.user = JSON.stringify(newUserData);
              window.location.href = "/dashboard"
            } else {
              toast('Sign up Error: Server Failed to respond!', 'error');
            }
          })

          .catch(err => {
            console.log(err)
            toast('Server Failed to respond!', 'error');
          })
      }
    })

    .catch(err => {
      if (err) {
        console.log(err)
        toast('Server Failed to respond!', 'error');
      }
    })
}

export const notifySound = () => {
  if (localStorage.sound === "true") {
    let notifSound = document.getElementById('tone');
    notifSound.pause();
    notifSound.currentTime = 0;
    notifSound.play();
  }
}

export const isMobile = () => {
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

export const closeSidebarMobile = () => {
  if (isMobile()) {
    document.getElementById('sidebar').style.display = 'none';
  }
}

export const openSidebarMobile = () => {
  if (isMobile()) {
    document.getElementById('sidebar').style.display = 'block';
  }
}

export const currentIncident = () => {
  let data = null;
  if (localStorage.currentIncident) {
    data = JSON.parse(localStorage.currentIncident)
  }

  return data;
}




