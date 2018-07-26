import _ from 'lodash';

const parseCookie = () => {
  const values = _.split(document.cookie, '; ');
  let res = {};
  _.forEach(values, (item) => {
    const itemSplit = _.split(item, '=') || [];
    res = {
      ...res,
      [`${itemSplit[0]}`]: itemSplit[1],
    };
  });
  return res;
};

export { parseCookie };

export default parseCookie;