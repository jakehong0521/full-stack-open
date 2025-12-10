import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
      return state;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteForAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
      return state;
    },
  },
});

export const { createAnecdote, setAnecdotes, voteForAnecdote } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
