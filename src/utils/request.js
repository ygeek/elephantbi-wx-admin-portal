import fetch from 'dva/fetch';
import _ from 'lodash';
import urljoin from 'url-join';
import Message from 'antd/lib/message'
import 'antd/lib/message/style/css'
import { HOST } from 'constants/APIConstants';
import jsonToQuery from 'utils/url_helper';

function parseJSON(response) {
  return response.json();
}
const getHost = () => {
  const storageState = JSON.parse(localStorage.getItem('reduxState'));
  const corpId = _.get(storageState, 'currentUser.corpId');
  // const corpId = "wwbf3eaab416f2a8a4";
  const matchHost = /^(.*)\/\/(.*)$/.exec(HOST)
  return `${matchHost[1]}//wx_${corpId}.${matchHost[2]}`
}

function checkStatus(response) {
  if (response.status === 502) {
    Message.error('当前网络连接异常，请稍后重试');
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function requestUrl({ host, url, params }) {
  const reqHost = host || getHost();
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
      // Authorization: `jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzUyNTAzMDgsImlhdCI6MTUzMjY1ODMwOCwibmJmIjoxNTMyNjU4MzA4LCJpZGVudGl0eSI6MTU1fQ.NhJt6t-4zZK7T-TuGC0fTDtw_xHH2p5PueL1yxKmSK4`,
      ...headers
    }),
    body: JSON.stringify(body)
  });
}
