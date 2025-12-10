import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newAnecdote = await anecdotesService.createNew(
      event.target.content.value
    );
    dispatch(createAnecdote(newAnecdote));
    event.target.content.value = "";
  };

  return (
    <div>
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

export default AnecdoteForm;
