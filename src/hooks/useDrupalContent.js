// src/hooks/useDrupalContent.js  ← create this file ONCE, never touch again

import { useState, useEffect } from "react";
import { fetchDrupalContent } from "../api/drupal";

export function useDrupalContent({ contentType, uuid, limit = 10, filters = {}, include = [] }) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!contentType) return;
    setLoading(true);
    setError(null);

    fetchDrupalContent({ contentType, uuid, limit, filters, include })
      .then((json) => {
        const raw = Array.isArray(json.data) ? json.data : [json.data];
        setData(raw.filter(Boolean));  // raw Drupal nodes, no mapping here
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

  }, [contentType, uuid, limit]);

  return { data, loading, error };
}