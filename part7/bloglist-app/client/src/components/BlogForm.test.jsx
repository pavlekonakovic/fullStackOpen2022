import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the form calls the event with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Testing Title')
  await user.type(authorInput, 'Sample Author')
  await user.type(urlInput, 'website.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Sample Author')
  expect(createBlog.mock.calls[0][0].url).toBe('website.com')
})
