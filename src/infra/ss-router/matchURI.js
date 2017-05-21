import pathToRegexp from 'path-to-regexp';

function decodeParam(val) {
  if (!(typeof val === 'string' || val.length === 0)) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = `Failed to decode param '${val}'`;
      err.status = 400;
    }
    throw err;
  }
}

function matchURI(route, path) {
  /* eslint-disable no-param-reassign */
  const keys = [];
  route.pattern = route.pattern || pathToRegexp(route.path, keys);
  route.keys = route.keys || keys;
  const match = route.pattern.exec(path);

  if (!match) {
    return null;
  }

  const params = Object.create(null);

  for (let i = 1; i < match.length; i += 1) {
    params[route.keys[i - 1].name] = match[i] !== undefined ? decodeParam(match[i]) : undefined;
  }

  return params;
}

export default matchURI;
