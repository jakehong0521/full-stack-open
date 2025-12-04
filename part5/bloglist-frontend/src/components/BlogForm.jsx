import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    await createBlog({ author, title, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>
            title:{' '}
            <input
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              value={title}
            />
          </label>
        </div>
        <div>
          <label>
            author:{' '}
            <input
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
              value={author}
            />
          </label>
        </div>
        <div>
          <label>
            url:{' '}
            <input
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              value={url}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
