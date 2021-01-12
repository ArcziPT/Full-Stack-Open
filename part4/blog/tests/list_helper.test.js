const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
})

describe('favourite blog', () => {
    const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'New Blog',
          author: 'Cormen',
          url: 'http://algorithms.com',
          likes: 999,
          __v: 0
        },{
          _id: '5a422aa71b54a676234d1700',
          title: 'JS',
          author: 'JS Master',
          url: 'http://js.js',
          likes: 100,
          __v: 0
        }
    ]

    test('from list of blogs', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual(blogs[1])
    })
})

describe('most blogs', () => {
    const blogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'John',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        ,{
          _id: '5a422aa7af54a676234d1700',
          title: 'JS for dummies',
          author: 'John',
          url: 'http://jsfordummies.js',
          likes: 1100,
          __v: 0
        },
        {
          _id: '5a422aa71b54a676234d17f9',
          title: 'New Blog',
          author: 'Cormen',
          url: 'http://algorithms.com',
          likes: 999,
          __v: 0
        },{
          _id: '5a422aa71b54a676234d1700',
          title: 'JS',
          author: 'JS Master',
          url: 'http://js.js',
          likes: 100,
          __v: 0
        }
    ]

    test('from list of blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author: 'John', blogs: 2})
    })
})