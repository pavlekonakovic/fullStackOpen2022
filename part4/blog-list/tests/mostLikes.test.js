const listHelper = require('../utils/list_helper')
const { emptyBlog, listWithOneBlog, blogs } = require('./blogsForTest')

describe('Most likes ', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes(emptyBlog)
    expect(result).toEqual(null)
  })

  test('when list has only one item, equals to that author and his likes ', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has many blogs, equals to the author with most likes ', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
