import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'Title for Testing',
    author: 'Sample Author',
    url: 'testingurl.com',
    likes: 2,
    user: {
      name: 'User',
      username: 'username',
    }
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateLike={mockHandler}
      />
    ).container
  })

  test('component renders the blogs title and author', async () => {
    await screen.getByText(`${blog.title} ${blog.author}`)
  })

  test('at start the url, likes and user are not rendered', () => {
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(blog.likes)
    expect(container).not.toHaveTextContent(blog.user.name)
  })

  test('after clicking the button, url, likes and user are shown', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(blog.likes)
    expect(container).toHaveTextContent(blog.user.name)
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})