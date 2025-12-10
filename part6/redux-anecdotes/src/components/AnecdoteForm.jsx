import { useDispatch } from "react-redux";

import { appendAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch(appendAnecdote(event.target.content.value));
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
