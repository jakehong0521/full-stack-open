import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdotes";

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

const { setAnecdotes } = anecdotesSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const { createAnecdote, voteForAnecdote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
