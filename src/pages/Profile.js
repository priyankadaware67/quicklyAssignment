import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://api-dev.quicklyinc.com/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className='text-center text-4xl font-bold'>User Profile</h2>
      {Object.entries(userData).map(([key, value]) => (
        <div key={key}>
          <strong>{key}: </strong>
          {typeof value === 'object' ? (
            <pre>{JSON.stringify(value, null, 2)}</pre>
          ) : (
            <span>{value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;
