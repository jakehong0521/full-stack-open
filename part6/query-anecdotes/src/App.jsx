import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, patchAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const patchAecdoteMutation = useMutation({
    mutationFn: patchAnecdote,
    onSuccess: (patchedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === patchedAnecdote.id ? patchedAnecdote : anecdote,
        ),
      )
    },
  })

  const handleVote = (anecdote) => {
    patchAecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const anecdotesResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (anecdotesResult.isLoading) {
    return <div>loading data...</div>
  }

  if (anecdotesResult.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = anecdotesResult.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
