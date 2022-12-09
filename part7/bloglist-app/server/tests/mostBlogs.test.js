const listHelper = require('../utils/list_helper')
const { emptyBlog, listWithOneBlog, blogs } = require('./blogsForTest')

describe('Most blogs ', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs(emptyBlog)
    expect(result).toEqual(null)
  })

  test('when list has only one item, equals to that author and one blog ', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('when list has many blogs, equals to the author with most blogs ', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})
