import { requestNoToken, requestSimple } from '../utils/request';

export async function fetchUserInfoList() {
  return requestSimple({
    url: '',
    method: 'GET'
  });
}

export const example = () => {}

export async function redirect(params) {
  return requestNoToken({
    host: 'https://sso.elephantbi.com',
    url: '/wx/sso',
    method: 'POST',
    body: params,
  })
}
