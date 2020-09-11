/**
 * Basic application functions
 */
export function getQueryStringParams(search) {
  if (!search) {
    return {};
  }
  if (search.indexOf('?') === 0) {
    search = search.substring(1);
  }
  const searchSet = search.split('&');
  if (!searchSet.length) {
    return {};
  }
  return searchSet.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key.trim()] = value.trim();
    return acc;
  }, {});
}

export function getCurrentPath(fullPath) {
  if (fullPath.length <= 1) {
    return '';
  }
  return fullPath.split('/').pop();
}
