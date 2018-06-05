import { get, post } from '../../utils/request';
import qs from 'qs';
import cookie from 'js-cookie';
import apis from '../../configs/apis';
import pages from '../../configs/pages';
import constants from '../../configs/constants';

export function fetch() {
  return get(apis.session.status);
}

export function login(data) {
  return post(apis.session.login, data);
}


export async function getAccessToken(csrf) {
  let checkOauthFrame = (frame, resolve) => {
    const hash = frame.contentWindow.location.hash;
    if(hash) {
      const { access_token: accessToken, expires_in: expires } = qs.parse(hash.slice(1));
      resolve({ accessToken, expires });
    }
  };

  const query = qs.stringify({ csrf});
  let oauthFrame = document.createElement('iframe');
  oauthFrame.src = `${pages.session.oauth}?${query}`;
  oauthFrame.style.display = 'none';
  document.body.appendChild(oauthFrame);
  let timer = null;
  let ok = false;
  await new Promise((resolve, reject) => {
    timer = setInterval(() => checkOauthFrame(oauthFrame, resolve), constants.oauthCheckInterval);
    setTimeout(() => {
      reject();
    }, constants.requestTimeout);
  }).then(({ accessToken, expires }) => {
    cookie.set('access_token_openoj', accessToken, { expires: expires / 3600 / 24 });
    ok = true;
  }).catch(err => {
  });
  clearInterval(timer);
  oauthFrame.parentNode.removeChild(oauthFrame);

  if(ok) {
    return {
      result: 'success',
      msg: 'Welcome back',
    };
  }
  else {
    return {
      result: 'error',
      msg: 'Authorization failed. Please try again',
    }
  }
}

export function logout() {
  return get(apis.session.logout);
}


export function getRegisterVerificationCode(data) {
  return post(apis.session.registerVerificationCode, data);
}

export function register(data) {
  return post(apis.session.register, data);
}
