export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button onClick={() => onPageChange(1)} disabled={page===1} className="px-3 py-1 border rounded disabled:opacity-50">First</button>
      <button onClick={() => onPageChange(Math.max(1, page-1))} disabled={page===1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      <span>Page {page} of {totalPages}</span>
      <button onClick={() => onPageChange(Math.min(totalPages, page+1))} disabled={page===totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      <button onClick={() => onPageChange(totalPages)} disabled={page===totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Last</button>
    </div>
  );
}
