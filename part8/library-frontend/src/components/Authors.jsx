import { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client/react';

import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries';

const Authors = (props) => {
  const [author, setAuthor] = useState('');
  const [birthyear, setBirthyear] = useState('');

  const query = useQuery(ALL_AUTHORS);
  const [mutateBirthyear, mutateBirthyearResult] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [ALL_AUTHORS],
  });

  if (!props.show) {
    return null;
  }

  if (query.loading) {
    return <div>Loading...</div>;
  }

  const authors = query.data?.allAuthors || [];

  const handleSubmit = (event) => {
    event.preventDefault();
    mutateBirthyear({
      variables: {
        name: author,
        born: parseInt(birthyear),
      },
    });
    setAuthor('');
    setBirthyear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form disabled={mutateBirthyearResult.loading} onSubmit={handleSubmit}>
        <div>
          author
          <select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            <option value="">--Please choose an option--</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
