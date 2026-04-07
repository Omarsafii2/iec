// src/api/drupal.js  ← create this file ONCE, never touch again

export const DRUPAL_JSONAPI_ORIGIN = "http://backend.iec-new-2026.com.dedi8785.your-server.de";

const BASE_URL = DRUPAL_JSONAPI_ORIGIN;

export async function fetchDrupalContent({
  contentType,          // required  — "news", "events", "academic" …
  uuid    = null,       // optional  — fetch single node by UUID
  limit   = 10,         // optional  — number of items
  filters = {},         // optional  — { "filter[status]": 1 }
  include = [],         // optional  — ["field_media_image"]
}) {
  // auto-builds: /jsonapi/node/{contentType} or /jsonapi/node/{contentType}/{uuid}
  let url = `${BASE_URL}/jsonapi/node/${contentType}`;
  if (uuid) url += `/${uuid}`;

  const params = new URLSearchParams();
  if (!uuid) params.set("page[limit]", limit);
  if (include.length) params.set("include", include.join(","));
  for (const [k, v] of Object.entries(filters)) params.set(k, v);

  const query = params.toString();
  if (query) url += `?${query}`;

  const res = await fetch(url, { headers: { Accept: "application/vnd.api+json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}