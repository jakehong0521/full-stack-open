import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import userService from './services/users';

const Users = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  let content = null;

  if (isLoading) {
    content = <div>Loading users...</div>;
  } else if (!users.length) {
    content = <div>There are no users</div>;
  } else {
    content = (
      <table>
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <h2>Users</h2>
      {content}
    </div>
  );
};

export default Users;
