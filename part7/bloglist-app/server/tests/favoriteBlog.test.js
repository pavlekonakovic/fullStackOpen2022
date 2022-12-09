const listHelper = require('../utils/list_helper')
const { emptyBlog, listWithOneBlog, blogs } = require('./blogsForTest')

describe('Favorite blog ', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(emptyBlog)
    expect(result).toEqual(null)
  })

  test('when list has only one item, equals to that blog ', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
      title: 'Go To Statement Considered Harmful',
    })
  })

  test('when list has many blogs, equals to the most liked blog ', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 12,
      title: 'Canonical string reduction',
    })
  })
})
