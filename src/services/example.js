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
    params,
  })
}

export async function fetchDashBoardList(id, params) {
  return requestSimple({
    url: `/user/${id}/dash/list`,
    method: 'GET',
    params,
  })
}

export async function fetchDataSourceList(id, params) {
  return requestSimple({
    url: `/user/${id}/ds/list`,
    method: 'GET',
    params,
  })
}

export async function deleteDashBoard(id) {
  return requestSimple({
    url: `/dash/${id}`,
    method: 'delete'
  })
}

export async function deleteDataSource(id) {
  return requestSimple({
    url: `/ds/${id}`,
    method: 'delete'
  })
}

export async function fetchUserProfile() {
  return requestSimple({
    url: '/user/profile',
    method: 'GET',
    params: {
      check_wx_admin: 1
    }
  })
}
