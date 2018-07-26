import { requestNoToken, requestSimple } from '../utils/request';

export async function fetchUserInfoList(params) {
  return requestSimple({
    url: '/users',
    method: 'GET',
    params
  });
}

export const example = () => {}

export async function redirect(params) {
  return requestNoToken({
    host: 'https://sso.elephantbi.com',
    url: '/wx/sso',
    method: 'GET',
    body: params,
  })
}

export async function fetchDashBoardList(id, params) {
  return requestSimple({
    url: `/user/${id}/dash/list`,
    method: 'GET',
    params,
  })
}
