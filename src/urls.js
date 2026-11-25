const base = import.meta.env.BASE_URL;

export function imageUrl(path) {
  return typeof path === 'string' && path.startsWith('/images/') ? base + path.slice(1) : path;
}

export function routeHref(path) {
  if (base === '/') return path;
  return path === '/' ? base : base + '#' + path;
}
