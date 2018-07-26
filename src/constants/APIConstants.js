export const HOST = window.host;
export const env = 'dev';
const CORPID = window.CORPID;

// fixed url
const FIXED_URL = window.fixedUrl;
export const gennerateFixedUrlRedirect = (rUrl) => {
  return `${FIXED_URL}/wx/redirect?redirect_url=${rUrl}`;
};

// 单点登录
export const REDIRECT_URL_SSO = `https://sso.elephantbi.com/wx/sso`;
export const gennerateWxSSO = (redirectUri) => {
  return `https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=${CORPID}&redirect_uri=${redirectUri}&usertype=admin`;
};