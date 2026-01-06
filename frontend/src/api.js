const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const opts = { ...options };

  // If body is an object and content-type not set, assume JSON
  if (opts.body && !(opts.body instanceof FormData) && !opts.headers?.['Content-Type']) {
    opts.headers = { ...(opts.headers || {}), 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts);
  let payload = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) payload = await res.json();
  else payload = await res.text();

  if (!res.ok) {
    const err = new Error(payload?.message || payload?.error || `${res.status} ${res.statusText}`);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

export { apiFetch, BASE };
