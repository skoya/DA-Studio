import http from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const rootBuildDir = path.join(rootDir, 'dist-root');
const basepathBuildDir = path.join(rootDir, 'dist-basepath');
const port = Number(process.env.PORT || 4321);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.wasm', 'application/wasm'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function getBuildRoot(requestPath) {
  return requestPath.startsWith('/da-studio/') ? basepathBuildDir : rootBuildDir;
}

function normalizeRequestPath(requestPath) {
  if (requestPath.startsWith('/da-studio/')) {
    return requestPath.slice('/da-studio'.length) || '/';
  }
  return requestPath;
}

function toCandidatePaths(buildRoot, requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split('?')[0] || '/');
  const normalizedPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const relativePath = normalizedPath.replace(/^\/+/, '');
  const directPath = path.join(buildRoot, relativePath);
  const directoryPath = path.join(buildRoot, relativePath, 'index.html');
  const htmlPath = path.extname(relativePath) ? directPath : `${directPath}.html`;

  return [directPath, directoryPath, htmlPath];
}

async function resolveFilePath(buildRoot, requestPath) {
  for (const candidate of toCandidatePaths(buildRoot, requestPath)) {
    if (!candidate.startsWith(buildRoot)) continue;
    if (!existsSync(candidate)) continue;
    const candidateStat = await stat(candidate);
    if (candidateStat.isFile()) return candidate;
  }

  const fallback = path.join(buildRoot, '404.html');
  if (existsSync(fallback)) return fallback;
  return null;
}

const server = http.createServer(async (req, res) => {
  const requestPath = req.url || '/';
  const buildRoot = getBuildRoot(requestPath);
  const filePath = await resolveFilePath(buildRoot, normalizeRequestPath(requestPath));

  if (!filePath) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const extension = path.extname(filePath);
  const contentType = contentTypes.get(extension) || 'application/octet-stream';
  const statusCode = filePath.endsWith('404.html') ? 404 : 200;

  res.writeHead(statusCode, { 'content-type': contentType });
  createReadStream(filePath).pipe(res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`E2E static server listening on http://127.0.0.1:${port}`);
});
