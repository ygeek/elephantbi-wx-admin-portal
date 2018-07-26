import fetch from 'dva/fetch';
import _ from 'lodash';
import urljoin from 'url-join';
import { HOST } from 'constants/APIConstants';
import jsonToQuery from 'utils/url_helper';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function requestUrl({ host, url, params }) {
  const reqHost = host || HOST;
  const queryString = _.isEmpty(params) ? '' : jsonToQuery(params);
  if (queryString) {
    return `${urljoin(reqHost, url)}${queryString}`;
  }
  return `${urljoin(reqHost, url)}`
}
export function getRequestHeaders() {
  const storageState = JSON.parse(localStorage.getItem('reduxState'));
  const token = _.get(storageState, 'currentUser.token');

  return {
    token
  }
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function requestNoToken({ url, method, headers, params, body, token, host }) {
  const reqURL = requestUrl({ host, url, params });
  return request(reqURL, {
    method,
    headers: _.pickBy({
      'Content-Type': 'application/json',
      ...headers
    }),
    body: JSON.stringify(body)
  });
}

export function requestSimple({ url, method, headers, params, body, token, host }) {
  const reqURL = requestUrl({ host, url, params });
  const requestHeaders = getRequestHeaders();
  return request(reqURL, {
    method,
    headers: _.pickBy({
      'Content-Type': 'application/json',
      Authorization: `jwt ${requestHeaders.token}`,
      ...headers
    }),
    body: JSON.stringify(body)
  });
}
