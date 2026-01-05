import { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import userService from './services/users';

const User = () => {
  const [user, setUser] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      userService.getById(userId).then(setUser);
    }
  }, [userId]);

  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>

        {!!user.blogs.length && (
          <>
            <h3>added blogs</h3>
            <ul>
              {user.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          </>
        )}

        {!user.blogs.length && <h3>added no blogs</h3>}
      </div>
    );
  } else {
    return <div>No user</div>;
  }
};

export default User;
