export function downloadText(filename: string, content: string, type = 'text/plain;charset=utf-8') {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function exportSvg(elementId: string, filename: string) {
  if (typeof window === 'undefined') return;
  const node = document.getElementById(elementId);
  if (!node) return;
  downloadText(filename, node.outerHTML, 'image/svg+xml;charset=utf-8');
}
