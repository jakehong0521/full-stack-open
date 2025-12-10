import { useDispatch, useSelector } from "react-redux";

import { createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({
      type: "VOTE",
      payload: {
        id: id,
      },
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.content.value));
    event.target.content.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .toSorted((a1, a2) => a2.votes - a1.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
