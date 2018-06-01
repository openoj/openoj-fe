import axios from 'axios';
import qs from 'qs';
import constants from '../configs/constants';

function checkStatus(response) {
  if(response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 * Powered by dva/examples
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request(url, options) {
  const response = await axios({
    url,
    timeout: constants.requestTimeout,
    headers: {
      'Cache-Control': 'no-cache, no-store',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...options,
  });
  checkStatus(response);
  return await response.data;
}

export function get(url, params) {
  return request(url, {
    params,
  });
}

export function post(url, data) {
  return request(url, {
    method: 'post',
    data: qs.stringify(data),
  });
}

export function put(url, data) {
  return request(url, {
    method: 'put',
    data: qs.stringify(data),
  });
}

export function patch(url, data) {
  return request(url, {
    method: 'patch',
    data: qs.stringify(data),
  });
}

export function del(url, data) {
  return request(url, {
    method: 'delete',
    data: qs.stringify(data),
  });
}

export default request;
