export function withBase(path: string) {
  const base = import.meta.env.BASE_URL || '/';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (base === '/' || path.startsWith(base)) {
    return path;
  }

  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function absoluteUrl(path: string) {
  const site = import.meta.env.SITE;
  if (!site) {
    return withBase(path);
  }

  return new URL(withBase(path), site).toString();
}
