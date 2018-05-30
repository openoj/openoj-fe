import axios from 'axios';
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
    ...{
      url,
      timeout: constants.requestTimeout,
      headers: {
        'Cache-Control': 'no-cache, no-store',
        'Content-Type': 'multipart/form-data',
      },
      ...options,
    }
  });
  checkStatus(response);
  return await response.data;
}

export default request;
