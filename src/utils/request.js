import axios from 'axios';
import qs from 'qs';
import constants from '../configs/constants';
import apis from '../configs/apis';

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
 * @param  {string}  url                The URL we want to request
 * @param  {object}  [options]          The options we want to pass to "fetch"
 * @param  {boolean} [requireResponse]  Whether require response data
 * @return {object}                     An object containing either "data" or "err"
 */
async function request(url, options, requireResponse = false) {
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
  if(requireResponse) {
    return await response;
  }
  return await response.data;
}

export function get(url, params) {
  return request(url, {
    params,
  });
}

export function getResponse(url, params) {
  return request(url, {
    params,
  }, true);
}

export function getCsrf() {
  return request(apis.general.csrf);
}

export async function post(url, data) {
  const csrf = await getCsrf();
  return request(url, {
    method: 'post',
    data: qs.stringify({ ...data, csrfmiddlewaretoken: csrf.csrfmiddlewaretoken }),
  });
}

export function postWithoutCsrf(url, data) {
  return request(url, {
    method: 'post',
    data: qs.stringify(data),
  });
}

export async function put(url, data) {
  const csrf = await getCsrf();
  return request(url, {
    method: 'put',
    data: qs.stringify({ ...data, csrfmiddlewaretoken: csrf.csrfmiddlewaretoken }),
  });
}

export async function patch(url, data) {
  const csrf = await getCsrf();
  return request(url, {
    method: 'patch',
    data: qs.stringify({ ...data, csrfmiddlewaretoken: csrf.csrfmiddlewaretoken }),
  });
}

export async function del(url, data) {
  const csrf = await getCsrf();
  return request(url, {
    method: 'delete',
    data: qs.stringify({ ...data, csrfmiddlewaretoken: csrf.csrfmiddlewaretoken }),
  });
}

export default request;
