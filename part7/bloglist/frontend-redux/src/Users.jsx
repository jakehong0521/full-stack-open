import { useEffect, useState } from 'react';

import userService from './services/users';

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then(setUsers);
  }, []);

  let content;

  if (!users) {
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
              <td>{user.name}</td>
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
