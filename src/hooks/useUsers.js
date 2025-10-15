import { useEffect, useState } from 'react';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then(data => { if(mounted) setUsers(data); })
      .catch(err => { if(mounted) setError(err.message); })
      .finally(() => { if(mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return { users, loading, error };
}
