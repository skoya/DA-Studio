import { startTransition, useDeferredValue, useMemo, useState } from 'react';

type SearchItem = {
  id: string;
  type: string;
  label: string;
  href: string;
  summary: string;
  keywords?: string[];
};

export default function SearchPanel({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    if (!normalized) return items.slice(0, 8);
    return items
      .filter((item) =>
        [item.label, item.summary, item.type, ...(item.keywords ?? [])].join(' ').toLowerCase().includes(normalized),
      )
      .slice(0, 12);
  }, [deferredQuery, items]);

  return (
    <section className="surface card" aria-label="Search experience" data-testid="search-panel">
      <div className="field">
        <label htmlFor="search-input">Ask a question or search the studio</label>
        <input
          id="search-input"
          value={query}
          onChange={(event) => startTransition(() => setQuery(event.target.value))}
          placeholder="Try: tokenized fund, custody, stablecoin, family office"
        />
      </div>
      <div className="grid" style={{ marginTop: '0.9rem' }}>
        {results.map((item) => (
          <a key={item.id} href={item.href} className="card" style={{ textDecoration: 'none' }}>
            <span className="pill">{item.type}</span>
            <h3 style={{ marginTop: '0.5rem' }}>{item.label}</h3>
            <p>{item.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
