import React, { useMemo, useState } from 'react';
import useUsers from '../hooks/useUsers';
import UsersTable from '../components/UsersTable';
import Pagination from '../components/Pagination';

export default function Dashboard(){
  const { users, loading, error } = useUsers();
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('All City');
  const [companyFilter, setCompanyFilter] = useState('All Company');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const cityOptions = useMemo(()=>['All City', ...Array.from(new Set(users.map(u=>u.address?.city).filter(Boolean))).sort()], [users]);
  const companyOptions = useMemo(()=>['All Company', ...Array.from(new Set(users.map(u=>u.company?.name).filter(Boolean))).sort()], [users]);

  const processed = useMemo(()=>{
    const q = query.trim().toLowerCase();
    let out = users.slice();

    if (cityFilter !== 'All City') out = out.filter(u=>u.address?.city === cityFilter);
    if (companyFilter !== 'All Company') out = out.filter(u=>u.company?.name === companyFilter);

    if (q.length > 0) {
      out = out.filter(u => (
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q))
      ));
    }

    out.sort((a,b)=>{
      const A = ((a[sortBy]||'')+'').toString().toLowerCase();
      const B = ((b[sortBy]||'')+'').toString().toLowerCase();
      if (A < B) return sortDir === 'asc' ? -1 : 1;
      if (A > B) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return out;
  }, [users, query, cityFilter, companyFilter, sortBy, sortDir]);

  // reset page when filters change
  React.useEffect(()=>{ setPage(1); }, [query, cityFilter, companyFilter, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / perPage));
  const paginated = processed.slice((page-1)*perPage, page*perPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Users Dashboard</h1>
        </div>
      </header>

      <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border dark:border-gray-700 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name, username or email..." className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-900" />

          <select value={cityFilter} onChange={(e)=>setCityFilter(e.target.value)} className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            {cityOptions.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={companyFilter} onChange={(e)=>setCompanyFilter(e.target.value)} className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            {companyOptions.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <label className="text-sm">Sort by:</label>
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>

          <button onClick={()=>setSortDir(d=> d==='asc' ? 'desc' : 'asc')} className="px-3 py-2 rounded-md border dark:border-gray-700">
            {sortDir === 'asc' ? 'Ascending' : 'Descending'}
          </button>

          <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">Showing <strong>{processed.length}</strong> results</div>
        </div>
      </section>

      <main>
        {loading ? (
          <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-sm border dark:border-gray-700">Loading...</div>
        ) : error ? (
          <div className="p-6 bg-red-50 text-red-800 rounded">Error: {error}</div>
        ) : (
          <>
            <UsersTable users={paginated} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </main>

    </div>
  );
}
