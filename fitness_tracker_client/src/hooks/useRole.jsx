import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';

const useRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (user?.email) {
      axios.get(`https://fitness-tracker-server-theta.vercel.app/users?email=${user.email}`)
        .then((res) => {
          setUserRole(res.data.role || 'member');
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching role:', err);
          setUserRole('member'); // Default to member on error or 404
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  return { userRole, loading };
};

export default useRole;
