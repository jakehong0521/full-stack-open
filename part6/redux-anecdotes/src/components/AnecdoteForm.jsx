import { useDispatch } from "react-redux";

import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.content.value));
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
