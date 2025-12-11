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
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
      return state;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
      return state;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { addVote, createAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(anecdoteContent);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.patchAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(addVote(updatedAnecdote.id));
  };
};

export default anecdotesSlice.reducer;
